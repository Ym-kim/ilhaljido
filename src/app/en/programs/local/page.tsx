import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /en/programs/local — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Gourmet & Local Workation',
  description:
    'Workations built around local food and culture. Programs with food tours and local experiences in cities like Jeonju and Osaka.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/local',
    languages: cityLanguageAlternates('/programs/local'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Gourmet & Local Workation | Wakation',
    description: 'Workations built around local food and culture — food tours and local experiences.',
    url: 'https://www.wakation.kr/en/programs/local',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function LocalPageEn() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.local} forceLang="EN" />
}
