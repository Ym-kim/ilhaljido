import type { Metadata } from 'next'
import { CompareView } from '@/components/destinations/CompareView'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/destinations/compare — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Compare Workation Cities — Internet, Cost, Visa & Time Zone',
  description:
    'Put 2–3 of Tokyo, Osaka, Fukuoka, Bali, Chiang Mai, Da Nang, Cebu and Sydney side by side. Internet speed, monthly cost, visa, time zone and best season on one screen.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/destinations/compare',
    languages: cityLanguageAlternates('/destinations/compare'),
  },
  openGraph: {
    title: 'Compare Workation Cities | Wakation',
    description: 'Put 2–3 workation cities side by side — internet, cost, visa and time zone at a glance.',
    url: 'https://www.wakation.kr/en/destinations/compare',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function ComparePageEn() {
  return <CompareView forceLang="EN" />
}
