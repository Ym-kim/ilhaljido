import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StaySearchPilotView } from '@/components/stays/StaySearchPilotView'
import { getStayPilotInitialState, type StayPilotPageSearchParams } from '@/lib/stays/pilotInitialState'
import { isKoreaStayPilotRolloutEnabled } from '@/lib/stays/pilotDestinations'
import { isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'

export const metadata: Metadata = {
  title: '宿のリアルタイム検索 Pilot',
  description: isKoreaStayPilotRolloutEnabled()
    ? '福岡・大阪・東京とソウル・釜山・済州の現在の提携先宿泊検索結果を確認するWakation限定パイロットです。'
    : '福岡・大阪・東京の現在の提携先宿泊検索結果を確認するWakation限定パイロットです。',
  robots: { index: false, follow: false },
}

export default async function StaySearchPilotPageJa({
  searchParams,
}: {
  searchParams: Promise<StayPilotPageSearchParams>
}) {
  if (!isAgodaStayPilotEnabled()) notFound()
  const initial = getStayPilotInitialState(await searchParams, 'JP')
  return <StaySearchPilotView forceLang="JP" {...initial} />
}
