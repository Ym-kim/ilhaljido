import type { Metadata } from 'next'
import { MiracleArticle } from '@/components/cruise/MiracleArticle'

const languages = {
  ko: 'https://www.wakation.kr/cruise/miracle',
  en: 'https://www.wakation.kr/en/cruise/miracle',
  ja: 'https://www.wakation.kr/ja/cruise/miracle',
  'x-default': 'https://www.wakation.kr/cruise/miracle',
}

export const metadata: Metadata = {
  title: '17 Hours at Sea — the Busan–Osaka Cruise Workation Guide',
  description:
    'A transit workation on the Panstar Miracle: a ticket with two buffet meals, satellite Wi-Fi and no baggage anxiety — how to work your way from Busan to Osaka overnight.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    title: '17 Hours at Sea — the Busan–Osaka Cruise Workation | Wakation',
    description: 'The Panstar Miracle cruise workation guide: two buffet meals, satellite Wi-Fi, zero baggage stress.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
}

export default function MiracleCruisePageEn() {
  return <MiracleArticle lang="EN" />
}
