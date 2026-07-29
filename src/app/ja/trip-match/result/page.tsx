import type { Metadata } from 'next'
import { TripMatchExperience } from '@/components/trip-match/TripMatchExperience'
import { getTripMatchTripContent } from '@/lib/tripMatchContent'
import { matchTripSets, parseTripMatchAnswer, parseTripMatchCampaign } from '@/lib/tripMatch'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams
  const answer = parseTripMatchAnswer(params)
  const campaign = parseTripMatchCampaign(params.campaign)
  const result = matchTripSets(answer, 'JP', campaign)
  const trip = getTripMatchTripContent('JP').find((item) => item.slug === result.primary)

  return {
    title: `${trip?.title ?? '私の旅'} — 30秒旅マッチ`,
    description: trip?.tagline ?? '3つの選択から見つけたWakation Trip Setです。',
    robots: { index: false, follow: true },
    alternates: { canonical: '/ja/trip-match/result' },
    openGraph: {
      title: `${trip?.title ?? '私の旅'} — 私の30秒旅マッチ`,
      description: trip?.tagline ?? '今の気分に合うTrip Setを一緒に見てみませんか。',
      images: trip ? [trip.image] : ['/campaign/home-workation-editorial-v1.webp'],
    },
  }
}

export default async function JapaneseTripMatchResultPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  return (
    <TripMatchExperience
      forceLang="JP"
      trips={getTripMatchTripContent('JP')}
      initialAnswer={parseTripMatchAnswer(params)}
      initialCampaign={parseTripMatchCampaign(params.campaign)}
      resultMode
    />
  )
}
