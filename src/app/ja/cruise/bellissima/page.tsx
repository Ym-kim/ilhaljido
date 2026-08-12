import type { Metadata } from 'next'
import { BellissimaArticle } from '@/components/cruise/BellissimaArticle'

const languages = {
  ko: 'https://www.wakation.kr/cruise/bellissima',
  en: 'https://www.wakation.kr/en/cruise/bellissima',
  ja: 'https://www.wakation.kr/ja/cruise/bellissima',
  'x-default': 'https://www.wakation.kr/cruise/bellissima',
}

export const metadata: Metadata = {
  title: '海の上のスターリンク・オフィス — MSCベリッシマ クルーズワーケーションガイド',
  description:
    '171,598トンの超大型船で働く方法。スターリンクWi-Fi、ダイニング12カ所、2027年6月から仁川通年母港 — MSCベリッシマのワーケーション完全ガイド。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    title: '海の上のスターリンク・オフィス — MSCベリッシマ | Wakation',
    description: '171,598トン超大型船のワーケーションガイド。スターリンクWi-Fi・ダイニング12カ所・2027年仁川母港。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
}

export default function BellissimaCruisePageJa() {
  return <BellissimaArticle lang="JP" />
}
