import { NextResponse } from 'next/server'

import { measureStayPilotSafety } from '@/lib/stays/pilotSafety'

export const dynamic = 'force-static'
export const revalidate = 3600
export const maxDuration = 30

export async function GET() {
  const report = await measureStayPilotSafety()
  return NextResponse.json(report, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300',
    },
  })
}
