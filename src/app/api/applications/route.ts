import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'
import type { ApplicationInsert } from '@/types/database'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

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
      ...(user?.id ? { user_id: user.id } : {}),
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: application, error: appError } = await (admin as any)
      .from('applications')
      .insert(applicationData)
      .select()
      .single()

    if (appError) throw appError

    // AI recommendation — fire-and-forget
    const { data: programs } = await admin
      .from('programs')
      .select('id, title, category, location, date_start, date_end, price, status, tags, description')
      .in('status', ['open', 'soon'])

    if (programs && programs.length > 0) {
      generateAIRecommendation(application.id, body, programs).catch(console.error)
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

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') return

  try {
    const parsed = JSON.parse(content.text)
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
