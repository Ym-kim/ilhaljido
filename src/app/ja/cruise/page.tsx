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
  title: 'クルーズワーケーション',
  description:
    '釜山発の韓日クルーズからスターリンク搭載の超大型船まで — 船上Wi-Fi事情も正直に伝える、海の上で働くための航路ガイド。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'クルーズワーケーション | Wakation',
    description: '海の上で働くための航路ガイド — 船上Wi-Fi・料金・シーズンを正直に。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function CruisePageJa() {
  return <CruiseHubView forceLang="JP" />
}
