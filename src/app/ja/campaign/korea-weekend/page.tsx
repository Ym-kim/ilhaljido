import type { Metadata } from 'next'
import { CampaignLanding } from '@/components/campaign/CampaignLanding'
import { CAMPAIGN_LANDINGS } from '@/data/campaign-landings'

const config = CAMPAIGN_LANDINGS['korea-weekend']

export const metadata: Metadata = {
  title: 'ソウル vs 釜山、韓国の週末旅を選ぶ',
  description: '街の日常に近づくソウルと、海のそばで余白を取り戻す釜山。今の気分に合う韓国Trip Setを20秒で選べます。',
  alternates: { canonical: `https://www.wakation.kr${config.canonicalPath}` },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'ソウルと釜山、今の気分はどちら？',
    description: 'カフェと街歩きのソウル、海とローカルフードの釜山。短い韓国旅を気分から選んでください。',
    url: `https://www.wakation.kr${config.canonicalPath}`,
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/social/trip-sets/seoul-3n4d/og-ja.webp', width: 1200, height: 630, alt: config.heroAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ソウルと釜山、今の気分はどちら？',
    description: '短い韓国旅を、街の日常と海の余白から選んでください。',
    images: ['/social/trip-sets/seoul-3n4d/og-ja.webp'],
  },
}

export default function KoreaWeekendCampaignPage() {
  return <CampaignLanding config={config} />
}
