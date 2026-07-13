import { NextResponse, type NextRequest } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// Proxy (Next.js 16 — 구 middleware) : 방문 국가(IP)를 쿠키로 남긴다
//   → 클라이언트 언어 기본값 자동 선택에 활용 (LanguageContext).
//
// Vercel이 주입하는 x-vercel-ip-country 헤더만 읽어 쿠키로 전달한다.
// (Next 15+에서 request.geo는 제거됨 — 헤더 방식이 표준)
// 페이지는 이 쿠키를 서버에서 읽지 않으므로 정적 렌더가 유지된다.
// 언어 강제 리다이렉트는 하지 않는다 — 사용자의 명시 선택(wakation_lang)이 항상 우선.
// ─────────────────────────────────────────────────────────────────────────────

export function proxy(req: NextRequest) {
  const res = NextResponse.next()
  // 이미 감지값이 있으면 매 요청마다 다시 심지 않는다
  if (!req.cookies.get('wakation_geo')) {
    const country = req.headers.get('x-vercel-ip-country') ?? ''
    res.cookies.set('wakation_geo', country, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30일
      sameSite: 'lax',
    })
  }
  return res
}

export const config = {
  // 정적 자산·API·파일 확장자 경로는 제외
  matcher: ['/((?!_next|api|.*\\.).*)'],
}
