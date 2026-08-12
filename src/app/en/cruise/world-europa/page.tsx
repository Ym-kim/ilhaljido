import type { Metadata } from 'next'
import { WorldEuropaArticle } from '@/components/cruise/WorldEuropaArticle'

const languages = {
  ko: 'https://www.wakation.kr/cruise/world-europa',
  en: 'https://www.wakation.kr/en/cruise/world-europa',
  ja: 'https://www.wakation.kr/ja/cruise/world-europa',
  'x-default': 'https://www.wakation.kr/cruise/world-europa',
}

export const metadata: Metadata = {
  title: 'A Midwinter Caribbean Workation — MSC World Europa Guide',
  description:
    "Eight Caribbean days in Korean winter. MSC's largest and first LNG flagship, Starlink Wi-Fi, Martinique home port — the complete MSC World Europa cruise workation guide.",
  alternates: { canonical: languages.en, languages },
  openGraph: {
    title: 'A Midwinter Caribbean Workation — MSC World Europa | Wakation',
    description: 'Eight Caribbean days on a 215,000-ton LNG flagship. Starlink Wi-Fi, 13 dining venues, winter-season Caribbean home ports.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
}

export default function WorldEuropaCruisePageEn() {
  return <WorldEuropaArticle lang="EN" />
}
