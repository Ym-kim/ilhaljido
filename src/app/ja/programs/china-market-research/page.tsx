import type { Metadata } from 'next'
import { ChinaMarketResearchView } from '@/components/campaign/ChinaMarketResearchView'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '中国市場調査 — 義烏と広州を比較',
  description: '義烏の卸売市場型と広州の見本市型を、公開日程・目的・募集状況・出典から比較します。',
  alternates: { canonical: 'https://www.wakation.kr/ja/programs/china-market-research', languages: { ko: 'https://www.wakation.kr/programs/china-market-research', en: 'https://www.wakation.kr/en/programs/china-market-research', ja: 'https://www.wakation.kr/ja/programs/china-market-research', 'x-default': 'https://www.wakation.kr/programs/china-market-research' } },
  openGraph: { title: '義烏 vs 広州 中国市場調査 | Wakation', description: '小商品卸売市場と業種別見本市。目的に合う中国市場調査を比較できます。', url: 'https://www.wakation.kr/ja/programs/china-market-research', siteName: 'Wakation', locale: 'ja_JP', type: 'article', images: OG_DEFAULT_IMAGES },
}

export default function ChinaMarketResearchPageJa() {
  return <ChinaMarketResearchView forceLang="JP" yiwuApplicationOpen={isChinaHomeCampaignActive()} />
}
