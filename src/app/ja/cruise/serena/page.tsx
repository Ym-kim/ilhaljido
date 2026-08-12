import type { Metadata } from 'next'
import { SerenaArticle } from '@/components/cruise/SerenaArticle'

const languages = {
  ko: 'https://www.wakation.kr/cruise/serena',
  en: 'https://www.wakation.kr/en/cruise/serena',
  ja: 'https://www.wakation.kr/ja/cruise/serena',
  'x-default': 'https://www.wakation.kr/cruise/serena',
}

export const metadata: Metadata = {
  title: '海の上でひと月暮らし — コスタ・セレーナ グランドボヤージュ ワーケーションガイド',
  description:
    '南米からヨーロッパへ19〜23日の大西洋横断。宿泊・食事込みで1日約8万ウォン台、スターリンク船団 — リポジショニングクルーズでする海の上のひと月暮らし。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    title: '海の上でひと月暮らし — コスタ・セレーナ グランドボヤージュ | Wakation',
    description: '19〜23日の大西洋横断リポジショニングクルーズのワーケーションガイド。宿泊・食事込み1日約8万ウォン台。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
}

export default function SerenaCruisePageJa() {
  return <SerenaArticle lang="JP" />
}
