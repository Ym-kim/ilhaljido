import type { NextConfig } from 'next'

// 전 경로 공통 보안 헤더 — 클릭재킹·MIME 스니핑·리퍼러 유출 방어
// HSTS는 Vercel 플랫폼이 자동 부여하므로 여기서 중복 설정하지 않음
const SECURITY_HEADERS = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
    // WebP 유지(기본) — 2026-07-21 실측: Vercel AVIF 인코더가 이 사이트 사진 커버(q75)에서
    // WebP보다 3~20% 더 큼(도쿄 118KB AVIF vs 98KB WebP 등) → AVIF 미채택. 측정 기반 결정
    formats: ['image/webp'],
    // 최적화 이미지 캐시 31일 — 기존 max-age=0(매 요청 재검증) → 재방문·CDN 히트 개선
    minimumCacheTTL: 2678400,
    // 자체 제작 SVG 커버(/public/covers) 서빙용 — 스크립트 실행 차단 CSP로 안전
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }]
  },
  async redirects() {
    return [
      // 료칸·온천 테마를 /programs/* 로 통일 — 구 URL 영구 리다이렉트(SEO·기존 링크 보존)
      { source: '/japan-towns', destination: '/programs/onsen', permanent: true },
      // 레거시 중복 페이지를 정식 /select·/infrastructure 허브로 통합 (2026-07-14 전체점검)
      // — 얇은 중복이 검색에서 정식 허브와 카니발라이즈되던 것 해소
      { source: '/stay', destination: '/select/hotel', permanent: true },
      { source: '/activities', destination: '/select/activity', permanent: true },
      { source: '/workspace', destination: '/infrastructure', permanent: true },
      // /spaces 통폐합 (2026-07-21): mock 데이터·AI 토큰 비용·죽은 카드(링크 0)의 레거시.
      // 워크스페이스 검증 컨셉은 /infrastructure가 정식 커버 → /workspace와 동일 목적지로 통합
      { source: '/spaces', destination: '/infrastructure', permanent: true },
      // 로케일 루트 인덱스 부재 해소 (2026-07-27, GSC 404 적발): /en·/ja 하위 44라우트는
      // 있으나 루트 자체는 미존재 — EN/JA 콘텐츠 허브(destinations)로 영구 리다이렉트
      { source: '/en', destination: '/en/destinations', permanent: true },
    ]
  },
}

export default nextConfig
