import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StaySearchPilotView } from '@/components/stays/StaySearchPilotView'
import { getStayPilotInitialState, type StayPilotPageSearchParams } from '@/lib/stays/pilotInitialState'
import { isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'

export const metadata: Metadata = {
  title: '实时住宿搜索',
  description: '用真实日期与人数查询 Wakation 合作伙伴当前返回的住宿。',
  robots: { index: false, follow: false },
}

export default async function ChineseStayPilotPage({ searchParams }: { searchParams: Promise<StayPilotPageSearchParams> }) {
  if (!isAgodaStayPilotEnabled()) notFound()
  const initial = getStayPilotInitialState(await searchParams, 'EN')
  return <StaySearchPilotView forceLang="EN" forceDisplayLocale="ZH" {...initial} />
}
