import type { Metadata } from 'next'

import { ChinaMarketResearchView } from '@/components/campaign/ChinaMarketResearchView'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '10月中国市场考察—义乌第126期与广州第127期',
  description: '按公开日期、调研目标与外部申请信息，比较2026年10月义乌第126期与广州第127期。',
  alternates: { canonical: 'https://www.wakation.kr/zh/programs/china-market-research', languages: { ko: 'https://www.wakation.kr/programs/china-market-research', en: 'https://www.wakation.kr/en/programs/china-market-research', ja: 'https://www.wakation.kr/ja/programs/china-market-research', 'zh-CN': 'https://www.wakation.kr/zh/programs/china-market-research', 'x-default': 'https://www.wakation.kr/programs/china-market-research' } },
  openGraph: { title: '10月义乌与广州市场考察 | Wakation', description: '比较两条10月中国市场考察路线的日期与目标。', url: 'https://www.wakation.kr/zh/programs/china-market-research', siteName: 'Wakation', locale: 'zh_CN', type: 'article', images: OG_DEFAULT_IMAGES },
  robots: { index: true, follow: true },
}

export default function ChineseChinaMarketResearchPage() {
  return <ChinaMarketResearchView forceLang="EN" forceDisplayLocale="ZH" externalApplicationWindowOpen={isChinaHomeCampaignActive()} />
}
