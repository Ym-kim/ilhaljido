import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StaySearchPilotView } from '@/components/stays/StaySearchPilotView'
import { getStayPilotDateDefaults, isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'

export const metadata: Metadata = {
  title: '宿のリアルタイム検索 Pilot',
  description: '福岡・大阪・東京の現在の提携先宿泊検索結果を確認するWakation限定パイロットです。',
  robots: { index: false, follow: false },
}

export default function StaySearchPilotPageJa() {
  if (!isAgodaStayPilotEnabled()) notFound()
  const dates = getStayPilotDateDefaults()
  return <StaySearchPilotView forceLang="JP" initialToday={dates.today} initialCheckin={dates.checkin} initialCheckout={dates.checkout} />
}
