import { NextResponse } from 'next/server'

import { measureStayExpansionCandidates } from '@/lib/stays/expansionMeasurement'

export const dynamic = 'force-static'
export const revalidate = 3600
export const maxDuration = 30

export async function GET() {
  if (process.env.VERCEL_ENV !== 'preview') {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const report = await measureStayExpansionCandidates()
  return NextResponse.json(report, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300',
    },
  })
}
