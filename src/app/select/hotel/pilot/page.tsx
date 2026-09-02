import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StaySearchPilotView } from '@/components/stays/StaySearchPilotView'
import { getStayPilotInitialState, type StayPilotPageSearchParams } from '@/lib/stays/pilotInitialState'
import { isKoreaStayPilotRolloutEnabled } from '@/lib/stays/pilotDestinations'
import { isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'

export const metadata: Metadata = {
  title: '숙소 실시간 검색 Pilot',
  description: isKoreaStayPilotRolloutEnabled()
    ? '후쿠오카·오사카·도쿄와 서울·부산·제주 숙소의 현재 제휴사 요금을 검색하는 Wakation 파일럿입니다.'
    : '후쿠오카·오사카·도쿄 숙소의 현재 제휴사 요금을 검색하는 Wakation 파일럿입니다.',
  robots: { index: false, follow: false },
}

export default async function StaySearchPilotPage({
  searchParams,
}: {
  searchParams: Promise<StayPilotPageSearchParams>
}) {
  if (!isAgodaStayPilotEnabled()) notFound()
  const initial = getStayPilotInitialState(await searchParams, 'KO')
  return <StaySearchPilotView forceLang="KO" {...initial} />
}
