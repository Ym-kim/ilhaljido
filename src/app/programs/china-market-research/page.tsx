import type { Metadata } from 'next'
import { ChinaMarketResearchView } from '@/components/campaign/ChinaMarketResearchView'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '중국 시장조사 비교 — 이우 도매시장·광저우 전시회',
  description: '이우 도매시장형 시장조사와 광저우 전시회형 시장조사를 일정, 목적, 현재 모집 상태와 공개 출처로 비교합니다.',
  alternates: { canonical: 'https://www.wakation.kr/programs/china-market-research', languages: { ko: 'https://www.wakation.kr/programs/china-market-research', en: 'https://www.wakation.kr/en/programs/china-market-research', ja: 'https://www.wakation.kr/ja/programs/china-market-research', 'x-default': 'https://www.wakation.kr/programs/china-market-research' } },
  openGraph: { title: '이우 vs 광저우 중국 시장조사 | Wakation', description: '소상품 도매시장과 산업별 전시회, 내 목적에 맞는 중국 시장조사 방식을 비교해 보세요.', url: 'https://www.wakation.kr/programs/china-market-research', siteName: 'Wakation', locale: 'ko_KR', type: 'article', images: OG_DEFAULT_IMAGES },
}

export default function ChinaMarketResearchPage() {
  return <ChinaMarketResearchView forceLang="KO" yiwuApplicationOpen={isChinaHomeCampaignActive()} />
}
