import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'
import { geminiGenerate, hasGeminiKey } from '@/lib/gemini'
import type { ApplicationInsert } from '@/types/database'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// AI 추천 생성이 뒤따르므로 함수 타임아웃 상향
export const maxDuration = 60

// In-memory rate limit: max 3 submissions per IP per 60 seconds
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: '잠시 후 다시 시도해주세요. (1분에 최대 3건)' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '잘못된 요청 형식입니다.' }, { status: 400 })
  }

  // Required field validation
  const required = ['name', 'phone', 'email', 'job_type']
  for (const field of required) {
    if (!body[field] || typeof body[field] !== 'string' || !(body[field] as string).trim()) {
      return NextResponse.json({ error: `${field} 필드가 필요합니다.` }, { status: 400 })
    }
  }

  // Email format
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(body.email as string)) {
    return NextResponse.json({ error: '올바른 이메일 형식이 아닙니다.' }, { status: 400 })
  }

  // Message length
  if (body.message && typeof body.message === 'string' && body.message.length > 1000) {
    return NextResponse.json({ error: '메시지는 1000자 이내로 작성해주세요.' }, { status: 400 })
  }

  try {
    // Get optional logged-in user (anon submissions are allowed)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Use admin client for INSERT so service_role bypasses RLS
    const admin = createAdminClient()

    // 지속형 레이트리밋 — 서버리스 콜드스타트에도 유효 (in-memory Map 보완)
    // 동일 이메일 10분 내 3건 초과 시 차단 → 스팸 제출로 인한 토큰 낭비·DB 오염 방지
    const email = (body.email as string).trim().toLowerCase()
    const tenMinAgo = new Date(Date.now() - 10 * 60_000).toISOString()
    const { count: recentCount } = await admin
      .from('applications')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', tenMinAgo)
    if ((recentCount ?? 0) >= 3) {
      return NextResponse.json(
        { error: '동일 이메일로 신청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
        { status: 429 }
      )
    }

    const applicationData: ApplicationInsert = {
      program_id: typeof body.program_id === 'string' ? body.program_id : null,
      name: (body.name as string).trim().slice(0, 100),
      phone: (body.phone as string).trim().slice(0, 30),
      email: (body.email as string).trim().toLowerCase().slice(0, 200),
      job_type: (body.job_type as string).trim().slice(0, 100),
      work_style: (['focus', 'relaxed', 'balanced'].includes(body.work_style as string)
        ? body.work_style
        : null) as 'focus' | 'relaxed' | 'balanced' | null,
      interests: Array.isArray(body.interests) ? (body.interests as string[]).slice(0, 20) : [],
      rest_preferences: Array.isArray(body.rest_preferences)
        ? (body.rest_preferences as string[]).slice(0, 20)
        : [],
      duration_preference: typeof body.duration_preference === 'string' ? body.duration_preference.slice(0, 50) : null,
      budget_range: typeof body.budget_range === 'string' ? body.budget_range.slice(0, 50) : null,
      message: typeof body.message === 'string' ? body.message.slice(0, 1000) : null,
      status: 'pending',
      admin_memo: null,
      user_id: user?.id ?? null,
    }

    // expand migration 실행 전 user_id 컬럼이 없을 수 있으므로 조건부로 제외
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const insertPayload: any = user?.id
      ? applicationData
      : (({ user_id: _uid, ...rest }) => rest)(applicationData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: application, error: appError } = await (admin as any)
      .from('applications')
      .insert(insertPayload)
      .select()
      .single()

    if (appError) throw appError

    // AI recommendation — fire-and-forget
    const { data: programs } = await admin
      .from('programs')
      .select('id, title, category, location, date_start, date_end, price, status, tags, description')
      .in('status', ['open', 'soon'])

    // AI 추천은 로그인 사용자에게만 생성 — 익명 제출發 무제한 Anthropic 호출(denial-of-wallet) 차단
    // 프롬프트엔 raw body가 아닌 길이 제한된 applicationData를 전달 (토큰 증폭 방지)
    if (user?.id && programs && programs.length > 0) {
      generateAIRecommendation(application.id, applicationData, programs).catch(console.error)
    }

    return NextResponse.json({ success: true, id: application.id }, { status: 201 })
  } catch (error) {
    console.error('Application error:', error)
    return NextResponse.json({ error: '신청 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

async function generateAIRecommendation(
  applicationId: string,
  applicant: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  programs: Record<string, any>[]
) {
  const admin = createAdminClient()

  const prompt = `당신은 일할지도(Wakation) 워케이션 플랫폼의 AI 어시스턴트입니다.
신청자 정보를 바탕으로 가장 적합한 워케이션 프로그램을 추천해주세요.

신청자 정보:
- 직업: ${applicant.job_type}
- 업무 스타일: ${applicant.work_style === 'focus' ? '집중 근무 필요' : applicant.work_style === 'relaxed' ? '여유롭게' : '균형 선호'}
- 관심 분야: ${(applicant.interests as string[])?.join(', ') || '없음'}
- 휴식 선호: ${(applicant.rest_preferences as string[])?.join(', ') || '없음'}
- 예산: ${applicant.budget_range || '미정'}
- 희망 기간: ${applicant.duration_preference || '미정'}

현재 운영중인 프로그램 목록:
${programs.map((p, i) => `${i + 1}. [${p.id}] ${p.title} - ${p.location} (${p.price}원) - ${p.description}`).join('\n')}

다음 JSON 형식으로만 응답해주세요:
{
  "recommended": [
    {"program_id": "uuid", "match_score": 95, "reason": "추천 이유 (1-2문장)"},
    {"program_id": "uuid", "match_score": 80, "reason": "추천 이유"}
  ],
  "summary": "신청자에게 맞는 워케이션 스타일 요약 (2-3문장)"
}`

  // 1차: Gemini 무료 (JSON 강제) / 실패 시 Anthropic 폴백
  let rawText = ''
  if (hasGeminiKey()) {
    try {
      rawText = await geminiGenerate({ user: prompt, json: true, maxOutputTokens: 1024 })
      console.log('[applications-ai] provider=gemini')
    } catch (e) {
      console.error('[applications-ai] gemini failed, falling back to anthropic:', e)
    }
  }
  if (!rawText) {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })
    console.log('[applications-ai] provider=anthropic')
    const content = message.content[0]
    if (content.type !== 'text') return
    rawText = content.text
  }

  try {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : rawText)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (admin as any).from('ai_recommendations').insert({
      application_id: applicationId,
      recommended_programs: parsed.recommended,
      recommendation_reason: parsed.summary,
      ai_model: 'claude-sonnet-4-6',
    })
  } catch {
    console.error('AI recommendation parsing failed')
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
