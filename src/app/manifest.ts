import type { MetadataRoute } from 'next'

// ─────────────────────────────────────────────────────────────────────────────
// PWA 매니페스트 — "웹뷰 → 앱스토어" 의 첫 단계(설치 가능한 웹앱).
// 홈 화면 추가 / 스탠드얼론 실행 지원. 네이티브 스토어 등록(Capacitor 래핑 +
// Apple·Google 개발자 계정)은 이후 단계.
// ─────────────────────────────────────────────────────────────────────────────

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wakation · 일하고 쉬고 성장하는 워케이션 플랫폼',
    short_name: 'Wakation',
    description:
      '국내외 워케이션, 성장캠프, 시장조사단, 어학·유학, 비자·체류 정보까지 일하는 사람을 위한 체류 플랫폼.',
    start_url: '/',
    display: 'standalone',
    background_color: '#04121f',
    theme_color: '#0284c7',
    lang: 'ko',
    orientation: 'portrait',
    categories: ['travel', 'business', 'lifestyle'],
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180', purpose: 'maskable' },
    ],
  }
}
