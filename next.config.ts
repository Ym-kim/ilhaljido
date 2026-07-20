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
    ]
  },
}

export default nextConfig
