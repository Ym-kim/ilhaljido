import type { Metadata } from 'next'
import { StoriesHubView } from '@/components/editorial/StoriesHubView'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

const languages = {
  ko: 'https://www.wakation.kr/stories',
  en: 'https://www.wakation.kr/en/stories',
  ja: 'https://www.wakation.kr/ja/stories',
  'x-default': 'https://www.wakation.kr/stories',
}

export const metadata: Metadata = {
  title: 'Travel Stories — Editorials Written from Verified Facts',
  description:
    'Cruise workations, slow trains and new places to stay — Wakation editorials researched with verified facts only.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Travel Stories | Wakation',
    description: 'New places to stay and new ways to move — workation editorials from verified facts.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function StoriesPageEn() {
  return <StoriesHubView forceLang="EN" />
}
