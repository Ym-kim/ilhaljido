import type { Metadata } from 'next'
import { HostApplyView } from '@/components/host/HostApplyView'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

const languages = {
  ko: 'https://www.wakation.kr/host',
  en: 'https://www.wakation.kr/en/host',
  ja: 'https://www.wakation.kr/ja/host',
  'x-default': 'https://www.wakation.kr/host',
}

export const metadata: Metadata = {
  title: 'Become a Host — Put Your Stay in Front of Working Travelers',
  description:
    'Already hosting on Airbnb? Apply with just your listing link. After review, Wakation builds a dedicated workation-angle page for your stay. Bali and Osaka first.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Become a Host | Wakation',
    description: 'Apply with one listing link — introduce your stay to working travelers.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function HostPageEn() {
  return <HostApplyView forceLang="EN" />
}
