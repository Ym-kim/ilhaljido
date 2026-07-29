import type { Metadata } from 'next'
import { CampaignLanding } from '@/components/campaign/CampaignLanding'
import { CAMPAIGN_LANDINGS } from '@/data/campaign-landings'

const config = CAMPAIGN_LANDINGS['japan-short-stay']

export const metadata: Metadata = {
  title: '후쿠오카 vs 오사카, 가까운 일본 3박 4일',
  description: '후쿠오카와 오사카 중 지금 내 여행에 맞는 도시를 20초 안에 비교하고, Trip Set으로 필요한 준비를 이어가세요.',
  alternates: { canonical: `https://www.wakation.kr${config.canonicalPath}` },
  robots: { index: false, follow: true },
  openGraph: {
    title: '후쿠오카 vs 오사카, 지금 내게 맞는 쪽은?',
    description: '카페와 온천의 후쿠오카, 친구와 장면을 모으는 오사카. 가까운 일본 여행을 빠르게 골라보세요.',
    url: `https://www.wakation.kr${config.canonicalPath}`,
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/social/trip-sets/fukuoka-3n4d/og-ko.webp', width: 1200, height: 630, alt: config.heroAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '후쿠오카 vs 오사카, 지금 내게 맞는 쪽은?',
    description: '가까운 일본 3박 4일을 여행의 분위기부터 골라보세요.',
    images: ['/social/trip-sets/fukuoka-3n4d/og-ko.webp'],
  },
}

export default function JapanShortStayCampaignPage() {
  return <CampaignLanding config={config} />
}
