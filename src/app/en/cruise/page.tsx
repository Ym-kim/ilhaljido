import type { Metadata } from 'next'
import { CruiseHubView } from '@/components/cruise/CruiseHubView'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

const languages = {
  ko: 'https://www.wakation.kr/cruise',
  en: 'https://www.wakation.kr/en/cruise',
  ja: 'https://www.wakation.kr/ja/cruise',
  'x-default': 'https://www.wakation.kr/cruise',
}

export const metadata: Metadata = {
  title: 'Cruise Workations',
  description:
    'From Korea–Japan cruises out of Busan to Starlink-equipped mega ships — routes for working at sea, with onboard Wi-Fi covered honestly.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Cruise Workations | Wakation',
    description: 'Routes for working at sea — onboard Wi-Fi, fares and seasons, covered honestly.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function CruisePageEn() {
  return <CruiseHubView forceLang="EN" />
}
