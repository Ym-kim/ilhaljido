import type { Metadata } from 'next'
import { TripMatchExperience } from '@/components/trip-match/TripMatchExperience'
import { getTripMatchTripContent } from '@/lib/tripMatchContent'
import { parseTripMatchAnswer, parseTripMatchCampaign } from '@/lib/tripMatch'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export const metadata: Metadata = {
  title: '30-second trip match',
  description: 'Choose three things to find a practical Trip Set that fits your time, mood and company. No sign-in or personal details required.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/en/trip-match' },
  openGraph: {
    title: 'Which trip fits you now?',
    description: 'Choose three things and get a practical trip suggestion.',
    images: ['/campaign/home-workation-editorial-v1.webp'],
  },
}

export default async function EnglishTripMatchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  return (
    <TripMatchExperience
      forceLang="EN"
      trips={getTripMatchTripContent('EN')}
      initialAnswer={parseTripMatchAnswer(params)}
      initialCampaign={parseTripMatchCampaign(params.campaign)}
    />
  )
}
