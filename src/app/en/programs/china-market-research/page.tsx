import type { Metadata } from 'next'
import { ChinaMarketResearchView } from '@/components/campaign/ChinaMarketResearchView'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'China Market Research — Yiwu vs Guangzhou',
  description: 'Compare Yiwu wholesale-market research with Guangzhou trade-fair research using published dates, objectives, availability and sources.',
  alternates: { canonical: 'https://www.wakation.kr/en/programs/china-market-research', languages: { ko: 'https://www.wakation.kr/programs/china-market-research', en: 'https://www.wakation.kr/en/programs/china-market-research', ja: 'https://www.wakation.kr/ja/programs/china-market-research', 'x-default': 'https://www.wakation.kr/programs/china-market-research' } },
  openGraph: { title: 'Yiwu vs Guangzhou market research | Wakation', description: 'Choose between a wholesale-market route and a trade-fair route.', url: 'https://www.wakation.kr/en/programs/china-market-research', siteName: 'Wakation', locale: 'en_US', type: 'article', images: OG_DEFAULT_IMAGES },
}

export default function ChinaMarketResearchPageEn() {
  return <ChinaMarketResearchView forceLang="EN" yiwuApplicationOpen={isChinaHomeCampaignActive()} />
}
