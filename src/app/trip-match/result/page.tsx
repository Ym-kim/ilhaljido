import type { Metadata } from 'next'
import { TripMatchExperience } from '@/components/trip-match/TripMatchExperience'
import { getTripMatchTripContent } from '@/lib/tripMatchContent'
import { matchTripSets, parseTripMatchAnswer, parseTripMatchCampaign } from '@/lib/tripMatch'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams
  const answer = parseTripMatchAnswer(params)
  const campaign = parseTripMatchCampaign(params.campaign)
  const result = matchTripSets(answer, 'KO', campaign)
  const trip = getTripMatchTripContent('KO').find((item) => item.slug === result.primary)

  return {
    title: `${trip?.title ?? '나의 여행'} — 30초 여행 추천`,
    description: trip?.tagline ?? '세 가지 선택으로 찾은 나의 Wakation Trip Set입니다.',
    robots: { index: false, follow: true },
    alternates: { canonical: '/trip-match/result' },
    openGraph: {
      title: `${trip?.title ?? '나의 여행'} — 나의 30초 여행 추천`,
      description: trip?.tagline ?? '내게 맞는 Trip Set을 같이 확인해보세요.',
      images: trip ? [trip.image] : ['/campaign/home-workation-editorial-v1.webp'],
    },
  }
}

export default async function TripMatchResultPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  return (
    <TripMatchExperience
      forceLang="KO"
      trips={getTripMatchTripContent('KO')}
      initialAnswer={parseTripMatchAnswer(params)}
      initialCampaign={parseTripMatchCampaign(params.campaign)}
      resultMode
    />
  )
}
