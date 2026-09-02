import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StaySearchPilotView } from '@/components/stays/StaySearchPilotView'
import { getStayPilotInitialState, type StayPilotPageSearchParams } from '@/lib/stays/pilotInitialState'
import { isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'

export const metadata: Metadata = {
  title: 'Live Stay Search Pilot',
  description: 'A limited Wakation pilot for current partner stay results in Fukuoka, Osaka and Tokyo.',
  robots: { index: false, follow: false },
}

export default async function StaySearchPilotPageEn({
  searchParams,
}: {
  searchParams: Promise<StayPilotPageSearchParams>
}) {
  if (!isAgodaStayPilotEnabled()) notFound()
  const initial = getStayPilotInitialState(await searchParams, 'EN')
  return <StaySearchPilotView forceLang="EN" {...initial} />
}
