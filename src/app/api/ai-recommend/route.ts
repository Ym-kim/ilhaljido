import { NextRequest, NextResponse } from 'next/server'
import { getWorkcationRecommendation } from '@/lib/anthropic'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    // 토큰 비용 보호 — 로그인 사용자만 AI 호출 가능
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'AI 추천은 로그인 후 이용할 수 있습니다.', requiresAuth: true },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { query, spaces, userContext } = body

    if (!query || !spaces) {
      return NextResponse.json({ error: '필수 파라미터가 없습니다.' }, { status: 400 })
    }
    // 입력 크기 검증 — 클라이언트가 보낸 대용량 페이로드로 인한 토큰 비용 증폭 차단
    if (typeof query !== 'string' || query.length > 500) {
      return NextResponse.json({ error: '검색어가 너무 깁니다.' }, { status: 400 })
    }
    if (userContext !== undefined && (typeof userContext !== 'string' || userContext.length > 500)) {
      return NextResponse.json({ error: '입력 형식이 올바르지 않습니다.' }, { status: 400 })
    }
    if (!Array.isArray(spaces) || spaces.length > 50 || JSON.stringify(spaces).length > 20_000) {
      return NextResponse.json({ error: '검색 대상이 올바르지 않습니다.' }, { status: 400 })
    }

    const result = await getWorkcationRecommendation(query, spaces, userContext)
    return NextResponse.json(result)
  } catch (error) {
    console.error('AI recommendation error:', error)
    return NextResponse.json({ error: 'AI 추천 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
