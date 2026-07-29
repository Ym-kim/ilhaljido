import type { Metadata } from 'next'
import { TripMatchExperience } from '@/components/trip-match/TripMatchExperience'
import { getTripMatchTripContent } from '@/lib/tripMatchContent'
import { parseTripMatchAnswer, parseTripMatchCampaign } from '@/lib/tripMatch'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export const metadata: Metadata = {
  title: '30초 여행 찾기',
  description: '세 가지 선택으로 지금 내게 맞는 Trip Set과 대안을 찾아보세요. 로그인이나 개인정보 입력은 필요하지 않습니다.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/trip-match' },
  openGraph: {
    title: '지금 나에게 맞는 여행은?',
    description: '세 가지만 고르면 바로 추천해드려요.',
    images: ['/campaign/home-workation-editorial-v1.webp'],
  },
}

export default async function TripMatchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  return (
    <TripMatchExperience
      forceLang="KO"
      trips={getTripMatchTripContent('KO')}
      initialAnswer={parseTripMatchAnswer(params)}
      initialCampaign={parseTripMatchCampaign(params.campaign)}
    />
  )
}
