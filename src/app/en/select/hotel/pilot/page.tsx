import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StaySearchPilotView } from '@/components/stays/StaySearchPilotView'
import { getStayPilotDateDefaults, isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'

export const metadata: Metadata = {
  title: 'Live Stay Search Pilot',
  description: 'A limited Wakation pilot for current partner stay results in Fukuoka, Osaka and Tokyo.',
  robots: { index: false, follow: false },
}

export default function StaySearchPilotPageEn() {
  if (!isAgodaStayPilotEnabled()) notFound()
  const dates = getStayPilotDateDefaults()
  return <StaySearchPilotView forceLang="EN" initialToday={dates.today} initialCheckin={dates.checkin} initialCheckout={dates.checkout} />
}
