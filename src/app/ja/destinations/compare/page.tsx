import type { Metadata } from 'next'
import { CompareView } from '@/components/destinations/CompareView'
import { cityLanguageAlternates } from '@/lib/cities'

// /ja/destinations/compare — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN와 상호 연결)

export const metadata: Metadata = {
  title: 'ワーケーション都市を比較 — ネット・生活費・ビザ・時差',
  description:
    '東京・大阪・福岡・バリ・チェンマイ・ダナン・セブ・シドニーから2〜3都市を並べて比較。ネット速度・月の生活費・ビザ・時差・ベストシーズンをひとつの画面で。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/destinations/compare',
    languages: cityLanguageAlternates('/destinations/compare'),
  },
  openGraph: {
    title: 'ワーケーション都市を比較 | Wakation',
    description: '迷っている2〜3都市を並べて、ネット・生活費・ビザ・時差を一度に比較。',
    url: 'https://www.wakation.kr/ja/destinations/compare',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function ComparePageJa() {
  return <CompareView forceLang="JP" />
}
