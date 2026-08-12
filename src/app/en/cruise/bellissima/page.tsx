import type { Metadata } from 'next'
import { BellissimaArticle } from '@/components/cruise/BellissimaArticle'

const languages = {
  ko: 'https://www.wakation.kr/cruise/bellissima',
  en: 'https://www.wakation.kr/en/cruise/bellissima',
  ja: 'https://www.wakation.kr/ja/cruise/bellissima',
  'x-default': 'https://www.wakation.kr/cruise/bellissima',
}

export const metadata: Metadata = {
  title: 'A Starlink Office at Sea — MSC Bellissima Cruise Workation Guide',
  description:
    'How to work on a 171,598-ton mega ship: Starlink Wi-Fi, twelve dining venues, and Incheon as year-round home port from June 2027 — the complete MSC Bellissima guide.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    title: 'A Starlink Office at Sea — MSC Bellissima | Wakation',
    description: 'A 171,598-ton workation guide: Starlink Wi-Fi, 12 dining venues, Incheon home port from 2027.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
}

export default function BellissimaCruisePageEn() {
  return <BellissimaArticle lang="EN" />
}
