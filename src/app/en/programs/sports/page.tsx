import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /en/programs/sports — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Sports Watching Workation',
  description:
    'Workations paired with live sports. Trips and work schedules built around games in Busan, Tokyo Dome and beyond.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/sports',
    languages: cityLanguageAlternates('/programs/sports'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Sports Watching Workation | Wakation',
    description: 'Workations paired with live sports — trips built around games in Busan, Tokyo Dome and beyond.',
    url: 'https://www.wakation.kr/en/programs/sports',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function SportsPageEn() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.sports} forceLang="EN" />
}
