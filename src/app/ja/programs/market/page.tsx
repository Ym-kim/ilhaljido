import type { Metadata } from 'next'
import { MarketProgramsView } from '@/components/programs/MarketProgramsView'
import { cityLanguageAlternates } from '@/lib/cities'

// /ja/programs/market — 일본어 정적 로케일 라우트

export const metadata: Metadata = {
  title: '市場調査団 — 海外展示会・B2Bネットワーキング',
  description:
    '海外の展示会・市場の現場で直接調査しネットワーキングする市場調査団プログラム。起業家・マーケター・貿易担当者のための実践型海外プログラム。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/market',
    languages: cityLanguageAlternates('/programs/market'),
  },
  openGraph: {
    title: '市場調査団 | Wakation',
    description: '海外の展示会・市場の現場で直接調査しネットワーキングする市場調査団プログラム。',
    url: 'https://www.wakation.kr/ja/programs/market',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function MarketPageJa() {
  return <MarketProgramsView forceLang="JP" />
}
