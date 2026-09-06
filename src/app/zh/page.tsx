import type { Metadata } from 'next'

import { ChineseHomePage } from '@/components/zh/ChineseHomePage'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '工作与旅行，都按你的方式',
  description: '从周末短住到远程生活，Wakation 用真实日期、城市信息与旅行准备工具帮你规划工作与旅行。',
  alternates: { canonical: 'https://www.wakation.kr/zh', languages: { ko: 'https://www.wakation.kr', en: 'https://www.wakation.kr/en', ja: 'https://www.wakation.kr/ja', 'zh-CN': 'https://www.wakation.kr/zh', 'x-default': 'https://www.wakation.kr' } },
  openGraph: { title: '工作与旅行，都按你的方式 | Wakation', description: '用真实日期查住宿，再按城市与旅行目的继续规划。', url: 'https://www.wakation.kr/zh', locale: 'zh_CN', alternateLocale: ['ko_KR', 'en_US', 'ja_JP'], siteName: 'Wakation', type: 'website', images: OG_DEFAULT_IMAGES },
  robots: { index: true, follow: true },
}

type PageProps = { searchParams: Promise<{ hero?: string | string[] }> }

export default async function ChineseHome({ searchParams }: PageProps) {
  const hero = (await searchParams).hero
  const heroVariant = hero === 'control-static' ? 'control-static' : 'video-story'
  return <ChineseHomePage heroVariant={heroVariant} chinaCampaignActive={isChinaHomeCampaignActive()} />
}
