import type { Metadata } from 'next'
import { TripMatchExperience } from '@/components/trip-match/TripMatchExperience'
import { getTripMatchTripContent } from '@/lib/tripMatchContent'
import { matchTripSets, parseTripMatchAnswer, parseTripMatchCampaign } from '@/lib/tripMatch'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams
  const answer = parseTripMatchAnswer(params)
  const campaign = parseTripMatchCampaign(params.campaign)
  const result = matchTripSets(answer, 'EN', campaign)
  const trip = getTripMatchTripContent('EN').find((item) => item.slug === result.primary)

  return {
    title: `${trip?.title ?? 'Your trip'} — 30-second trip match`,
    description: trip?.tagline ?? 'A practical Wakation Trip Set based on your three choices.',
    robots: { index: false, follow: true },
    alternates: { canonical: '/en/trip-match/result' },
    openGraph: {
      title: `${trip?.title ?? 'Your trip'} — your trip match`,
      description: trip?.tagline ?? 'Open the Trip Set that fits your time, mood and company.',
      images: trip ? [trip.image] : ['/campaign/home-workation-editorial-v1.webp'],
    },
  }
}

export default async function EnglishTripMatchResultPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  return (
    <TripMatchExperience
      forceLang="EN"
      trips={getTripMatchTripContent('EN')}
      initialAnswer={parseTripMatchAnswer(params)}
      initialCampaign={parseTripMatchCampaign(params.campaign)}
      resultMode
    />
  )
}
