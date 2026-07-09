import type { Metadata } from 'next'
import { GuideHubView } from '@/components/guide/GuideHubView'
import { guideLanguageAlternates } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'ワーケーション都市ガイド — 時差・フライト・シーズン比較',
  description:
    '東京・福岡・ダナン・バリ・チェンマイ・済州・大阪・セブ・シドニーのワーケーションガイド。時差、直行便、ベストシーズン、働きやすいエリアを比較して、宿と航空券にすぐつながります。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/guide',
    languages: guideLanguageAlternates('/guide'),
  },
  openGraph: { locale: 'ja_JP', alternateLocale: ['ko_KR', 'en_US'] },
  robots: { index: true, follow: true },
}

export default function GuideHubPageJa() {
  return <GuideHubView forceLang="JP" />
}
