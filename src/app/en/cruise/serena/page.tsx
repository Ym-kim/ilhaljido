import type { Metadata } from 'next'
import { SerenaArticle } from '@/components/cruise/SerenaArticle'

const languages = {
  ko: 'https://www.wakation.kr/cruise/serena',
  en: 'https://www.wakation.kr/en/cruise/serena',
  ja: 'https://www.wakation.kr/ja/cruise/serena',
  'x-default': 'https://www.wakation.kr/cruise/serena',
}

export const metadata: Metadata = {
  title: 'A Month at Sea — Costa Serena Grand Voyage Workation Guide',
  description:
    'A 19–23 day Atlantic crossing from South America to Europe. Around ₩80K a day with lodging and meals, on a Starlink fleet — the repositioning-cruise way to spend a month at sea.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    title: 'A Month at Sea — Costa Serena Grand Voyage | Wakation',
    description: 'A 19–23 day transatlantic repositioning cruise workation guide. Lodging and meals from about ₩80K a day.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
}

export default function SerenaCruisePageEn() {
  return <SerenaArticle lang="EN" />
}
