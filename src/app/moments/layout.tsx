import type { Metadata } from 'next'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /moments 고유 메타 — 클라이언트 페이지라 layout에서 지정 (2026-07-21 SEO 감사)
// 기존: 메타 없어 홈 기본 타이틀 상속(카니발라이제이션) — sitemap 0.7 등록됨

export const metadata: Metadata = {
  title: '워케이션 모먼트 — 에디터가 고른 순간들',
  description:
    '도쿄·발리·다낭·치앙마이·제주… 워케이션의 결정적 순간을 세로 숏츠로. 에디터 큐레이션 모먼트에서 다음 목적지의 영감을 얻으세요.',
  alternates: {
    canonical: 'https://www.wakation.kr/moments',
    // 2026-08-04 i18n-routes-v1 — EN/JA 라우트 신설과 함께 hreflang 상호 연결
    languages: {
      ko: 'https://www.wakation.kr/moments',
      en: 'https://www.wakation.kr/en/moments',
      ja: 'https://www.wakation.kr/ja/moments',
      'x-default': 'https://www.wakation.kr/moments',
    },
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '워케이션 모먼트 | Wakation',
    description: '워케이션의 결정적 순간을 세로 숏츠로 — 에디터가 고른 목적지 영감.',
    url: 'https://www.wakation.kr/moments',
    siteName: 'Wakation',
  },
}

export default function MomentsLayout({ children }: { children: React.ReactNode }) {
  return children
}
