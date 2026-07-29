import type { Metadata } from 'next'
import { TripMatchExperience } from '@/components/trip-match/TripMatchExperience'
import { getTripMatchTripContent } from '@/lib/tripMatchContent'
import { parseTripMatchAnswer, parseTripMatchCampaign } from '@/lib/tripMatch'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export const metadata: Metadata = {
  title: '30秒で旅を見つける',
  description: '3つ選ぶだけで、今の気分に合う韓国Trip Setともうひとつの候補を提案します。',
  robots: { index: false, follow: true },
  alternates: { canonical: '/ja/trip-match' },
  openGraph: {
    title: '今の私に合う旅は？',
    description: '3つ選ぶだけで、ぴったりの旅を提案します。',
    images: ['/campaign/home-workation-editorial-v1.webp'],
  },
}

export default async function JapaneseTripMatchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  return (
    <TripMatchExperience
      forceLang="JP"
      trips={getTripMatchTripContent('JP')}
      initialAnswer={parseTripMatchAnswer(params)}
      initialCampaign={parseTripMatchCampaign(params.campaign)}
    />
  )
}
