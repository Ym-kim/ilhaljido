import type { Metadata } from 'next'
import { EsimSelectView } from '@/components/select/EsimSelectView'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/select/esim — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'eSIM | Wakation Select',
  description:
    'eSIMs for Japan, Vietnam, Bali and Portugal. Install before departure, connect the moment you land. Airalo partner products.',
  keywords: ['eSIM', 'Airalo', 'Japan eSIM', 'Vietnam eSIM', 'Bali eSIM', 'Portugal eSIM', 'travel internet'],
  alternates: {
    canonical: 'https://www.wakation.kr/en/select/esim',
    languages: cityLanguageAlternates('/select/esim'),
  },
  openGraph: {
    title: 'eSIM | Wakation Select',
    description: 'Skip the airport SIM queue — install before departure, connect on arrival with Airalo eSIMs.',
    url: 'https://www.wakation.kr/en/select/esim',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function EsimSelectPageEn() {
  return <EsimSelectView forceLang="EN" />
}
