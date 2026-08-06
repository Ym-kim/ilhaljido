import type { Metadata } from 'next'
import { DestinationsHubView } from '@/components/destinations/DestinationsHubView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/destinations — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN와 상호 연결)

export const metadata: Metadata = {
  title: 'ワーケーション都市ガイド — ネット・生活費・ビザ・シーズン',
  description:
    '人気ワーケーション8都市（東京・大阪・福岡・バリ・ダナン・チェンマイ・セブ・シドニー）のネット速度・生活費・ビザ・ベストシーズンを比較。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/destinations',
    languages: cityLanguageAlternates('/destinations'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'ワーケーション都市ガイド | Wakation',
    description: '人気ワーケーション8都市のネット・生活費・ビザ・ベストシーズンを一目で。',
    url: 'https://www.wakation.kr/ja/destinations',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function DestinationsPageJa() {
  return <DestinationsHubView forceLang="JP" />
}
