import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StaySearchPilotView } from '@/components/stays/StaySearchPilotView'
import { getStayPilotDateDefaults, isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'

export const metadata: Metadata = {
  title: '숙소 실시간 검색 Pilot',
  description: '후쿠오카·오사카·도쿄 숙소의 현재 제휴사 요금을 검색하는 Wakation 파일럿입니다.',
  robots: { index: false, follow: false },
}

export default function StaySearchPilotPage() {
  if (!isAgodaStayPilotEnabled()) notFound()
  const dates = getStayPilotDateDefaults()
  return <StaySearchPilotView forceLang="KO" initialToday={dates.today} initialCheckin={dates.checkin} initialCheckout={dates.checkout} />
}
