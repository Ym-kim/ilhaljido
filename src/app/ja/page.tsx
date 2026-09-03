import type { Metadata } from 'next'
import HomePage from '@/components/home/HomePage'
import { LanguageProvider } from '@/context/LanguageContext'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '仕事も旅も、自分らしく。',
  // 検索キーワード「ワーケーション」を明記 — ブランドコピーのみだと日本検索の一致テキストが無い (2026-08-05)
  description: '週末の韓国旅から、海外ワーケーション滞在まで。Wakationが検証した都市ガイドとTrip Setを紹介します。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja',
    languages: {
      ko: 'https://www.wakation.kr',
      en: 'https://www.wakation.kr/en',
      ja: 'https://www.wakation.kr/ja',
      'x-default': 'https://www.wakation.kr',
    },
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '仕事も旅も、自分らしく。 | Wakation',
    description: '韓国と海外で見つける、働く人のための滞在と旅。',
    url: 'https://www.wakation.kr/ja',
    locale: 'ja_JP',
    siteName: 'Wakation',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function JapaneseHomePage() {
  return (
    <LanguageProvider forceLang="JP">
      <HomePage forceLang="JP" chinaCampaignActive={isChinaHomeCampaignActive()} />
    </LanguageProvider>
  )
}
