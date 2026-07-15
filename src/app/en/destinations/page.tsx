import type { Metadata } from 'next'
import { DestinationsHubView } from '@/components/destinations/DestinationsHubView'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/destinations — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Workation City Guides — Internet, Cost, Visa & Seasons',
  description:
    'Compare internet speed, cost of living, visa and best seasons for 8 popular workation cities: Tokyo, Osaka, Fukuoka, Bali, Da Nang, Chiang Mai, Cebu and Sydney.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/destinations',
    languages: cityLanguageAlternates('/destinations'),
  },
  openGraph: {
    title: 'Workation City Guides | Wakation',
    description: 'Internet, cost of living, visa and best seasons for 8 popular workation cities — at a glance.',
    url: 'https://www.wakation.kr/en/destinations',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function DestinationsPageEn() {
  return <DestinationsHubView forceLang="EN" />
}
