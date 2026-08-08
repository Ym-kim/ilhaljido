import type { Metadata } from 'next'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /moments 고유 메타 — 클라이언트 페이지라 layout에서 지정 (2026-07-21 SEO 감사)
// 기존: 메타 없어 홈 기본 타이틀 상속(카니발라이제이션) — sitemap 0.7 등록됨

export const metadata: Metadata = {
  title: '여행자 노트 — 여행지 소개와 회원 리뷰',
  description:
    'Wakation 에디터의 여행지 소개와 가입자가 직접 남긴 체류 리뷰를 한곳에서 읽고, 나만의 여행 노트를 공유해보세요.',
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
    title: '여행자 노트 — 여행지 소개와 회원 리뷰',
    description: '에디터 소개로 시작해 가입자의 솔직한 체류 리뷰가 함께 쌓이는 여행자 노트.',
    url: 'https://www.wakation.kr/moments',
    siteName: 'Wakation',
  },
}

export default function MomentsLayout({ children }: { children: React.ReactNode }) {
  return children
}
