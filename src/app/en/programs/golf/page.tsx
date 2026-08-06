import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /en/programs/golf — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Golf Networking Workation',
  description:
    'Golf workations in Jeju and Okinawa. Premium programs that pair rounds of golf with business networking, plus tee-time booking guidance.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/golf',
    languages: cityLanguageAlternates('/programs/golf'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Golf Networking Workation | Wakation',
    description: 'Premium workations that pair rounds of golf with business networking in Jeju and Okinawa.',
    url: 'https://www.wakation.kr/en/programs/golf',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function GolfPageEn() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.golf} forceLang="EN" />
}
