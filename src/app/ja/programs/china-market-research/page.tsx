import type { Metadata } from 'next'
import { ChinaMarketResearchView } from '@/components/campaign/ChinaMarketResearchView'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '10月中国市場調査団 — 義烏第126回・広州第127回',
  description: '2026年10月の義烏第126回と広州第127回を、公開日程・目的・外部申込情報から比較します。',
  alternates: { canonical: 'https://www.wakation.kr/ja/programs/china-market-research', languages: { ko: 'https://www.wakation.kr/programs/china-market-research', en: 'https://www.wakation.kr/en/programs/china-market-research', ja: 'https://www.wakation.kr/ja/programs/china-market-research', 'zh-CN': 'https://www.wakation.kr/zh/programs/china-market-research', 'x-default': 'https://www.wakation.kr/programs/china-market-research' } },
  openGraph: { title: '10月 義烏第126回 vs 広州第127回 | Wakation', description: '10月の2つの中国市場調査団を公開日程と調査目的から比較できます。', url: 'https://www.wakation.kr/ja/programs/china-market-research', siteName: 'Wakation', locale: 'ja_JP', type: 'article', images: OG_DEFAULT_IMAGES },
}

export default function ChinaMarketResearchPageJa() {
  return <ChinaMarketResearchView forceLang="JP" externalApplicationWindowOpen={isChinaHomeCampaignActive()} />
}
