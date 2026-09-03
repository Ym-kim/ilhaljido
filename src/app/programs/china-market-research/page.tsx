import type { Metadata } from 'next'
import { ChinaMarketResearchView } from '@/components/campaign/ChinaMarketResearchView'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '10월 중국 시장조사단 — 이우 126차·광저우 127차',
  description: '2026년 10월 이우 126차와 광저우 127차 시장조사단을 공개 일정, 목적과 외부 신청 정보로 비교합니다.',
  alternates: { canonical: 'https://www.wakation.kr/programs/china-market-research', languages: { ko: 'https://www.wakation.kr/programs/china-market-research', en: 'https://www.wakation.kr/en/programs/china-market-research', ja: 'https://www.wakation.kr/ja/programs/china-market-research', 'x-default': 'https://www.wakation.kr/programs/china-market-research' } },
  openGraph: { title: '10월 이우 126차 vs 광저우 127차 | Wakation', description: '10월 두 중국 시장조사단의 공개 일정과 조사 목적을 비교해 보세요.', url: 'https://www.wakation.kr/programs/china-market-research', siteName: 'Wakation', locale: 'ko_KR', type: 'article', images: OG_DEFAULT_IMAGES },
}

export default function ChinaMarketResearchPage() {
  return <ChinaMarketResearchView forceLang="KO" externalApplicationWindowOpen={isChinaHomeCampaignActive()} />
}
