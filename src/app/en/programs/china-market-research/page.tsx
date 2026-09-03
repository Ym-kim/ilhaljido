import type { Metadata } from 'next'
import { ChinaMarketResearchView } from '@/components/campaign/ChinaMarketResearchView'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'October China Market Research — Yiwu 126 vs Guangzhou 127',
  description: 'Compare the published October 2026 dates and objectives for Yiwu Group 126 and Guangzhou Group 127.',
  alternates: { canonical: 'https://www.wakation.kr/en/programs/china-market-research', languages: { ko: 'https://www.wakation.kr/programs/china-market-research', en: 'https://www.wakation.kr/en/programs/china-market-research', ja: 'https://www.wakation.kr/ja/programs/china-market-research', 'x-default': 'https://www.wakation.kr/programs/china-market-research' } },
  openGraph: { title: 'October Yiwu 126 vs Guangzhou 127 | Wakation', description: 'Compare two October China market-research programs by dates and objective.', url: 'https://www.wakation.kr/en/programs/china-market-research', siteName: 'Wakation', locale: 'en_US', type: 'article', images: OG_DEFAULT_IMAGES },
}

export default function ChinaMarketResearchPageEn() {
  return <ChinaMarketResearchView forceLang="EN" externalApplicationWindowOpen={isChinaHomeCampaignActive()} />
}
