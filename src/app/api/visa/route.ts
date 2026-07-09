import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { geminiGenerate, hasGeminiKey } from '@/lib/gemini'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─────────────────────────────────────────────────────────────────────────────
// 비자·체류 실시간 AI 분석 (베타)
// - 로그인 필수 (토큰 비용 보호 + 정식 오픈 시 연간 멤버십 전환 기반)
// - 웹 검색 툴로 최신 비자 정보 반영 (max_uses로 비용 캡)
// - 정식 오픈 시: 사용량 테이블(visa_queries) 기반 일일 한도 추가 예정
// ─────────────────────────────────────────────────────────────────────────────

// web_search 툴(최대 3회) + 생성으로 기본 타임아웃 초과 가능 → 60초로 상향 (504 방지)
export const maxDuration = 60

const LANG_NAME: Record<string, string> = { KO: '한국어', EN: 'English', JP: '日本語' }

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: '실시간 AI 분석은 로그인 후 이용할 수 있습니다.', requiresAuth: true },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { country, purpose, duration, lang = 'KO' } = body
    if (!country || !purpose || !duration) {
      return NextResponse.json({ error: '필수 파라미터가 없습니다.' }, { status: 400 })
    }
    // 입력 타입·길이 검증 — 초대형 문자열로 인한 입력 토큰 비용 증폭 차단
    if (
      typeof country !== 'string' || typeof purpose !== 'string' || typeof duration !== 'string' ||
      country.length > 60 || purpose.length > 100 || duration.length > 60
    ) {
      return NextResponse.json({ error: '입력 형식이 올바르지 않습니다.' }, { status: 400 })
    }

    const langName = LANG_NAME[lang] ?? '한국어'

    const systemPrompt = `당신은 Wakation(워케이션 플랫폼)의 비자·체류 전문 AI 어시스턴트입니다.
한국 여권 소지자 기준으로 답변합니다. 웹 검색으로 최신 정보를 확인한 뒤 답하세요.
반드시 ${langName}로 답변하세요.

답변 구조 (마크다운 헤더 없이, 각 섹션을 이모지+굵은 제목 한 줄로):
🛂 **추천 비자/체류 방식** — 목적·기간에 맞는 옵션 1-2개와 핵심 조건
📋 **필요 서류·요건** — 간결한 목록
⏱ **처리 기간·비용** — 알려진 범위
⚠️ **주의사항** — 최근 변경사항이 있으면 반드시 언급
전체 350단어 이내. 마지막 줄에 "※ 최종 확인은 해당국 대사관/공식 사이트에서 하세요."`
    const userPrompt = `대상 국가: ${country}\n체류 목적: ${purpose}\n체류 기간: ${duration}\n\n한국 여권 기준 최신 비자/체류 요건을 분석해주세요.`

    // 1차: Gemini 무료 (Google Search 그라운딩 = 최신성 유지) / 실패 시 Anthropic 폴백
    let analysis = ''
    if (hasGeminiKey()) {
      try {
        analysis = await geminiGenerate({
          system: systemPrompt,
          user: userPrompt,
          search: true,
          maxOutputTokens: 2048,
        })
        console.log('[visa] provider=gemini')
      } catch (e) {
        console.error('[visa] gemini failed, falling back to anthropic:', e)
      }
    }
    if (!analysis) {
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1600,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 } as any],
      })
      analysis = message.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('\n')
        .trim()
      console.log('[visa] provider=anthropic')
    }

    if (!analysis) {
      return NextResponse.json({ error: 'AI 분석 결과가 비어 있습니다.' }, { status: 502 })
    }

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('Visa AI error:', error)
    return NextResponse.json({ error: 'AI 분석 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
