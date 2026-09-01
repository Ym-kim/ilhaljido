import { NextResponse } from 'next/server'

import { executeStaySearch } from '@/lib/stays/liveSearch'
import { isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'
import { validateStayPilotRequest } from '@/lib/stays/pilotValidation'

export const dynamic = 'force-dynamic'
export const maxDuration = 20

const responseHeaders = (latencyMs?: number) => ({
  'Cache-Control': 'no-store, max-age=0',
  ...(typeof latencyMs === 'number' ? { 'Server-Timing': `stay;dur=${latencyMs}` } : {}),
})

export async function POST(request: Request) {
  if (!isAgodaStayPilotEnabled()) {
    return NextResponse.json({ error: 'pilot_not_available' }, { status: 404, headers: responseHeaders() })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400, headers: responseHeaders() })
  }

  const validated = validateStayPilotRequest(payload)
  if (!validated.ok) {
    return NextResponse.json({ error: validated.reason }, { status: 400, headers: responseHeaders() })
  }

  const execution = await executeStaySearch(validated.value, 'agoda')
  return NextResponse.json(
    {
      ...execution,
      destinationId: validated.value.destinationId,
      meta: { latencyMs: execution.latencyMs, resultCount: execution.mode === 'results' ? execution.results.length : 0 },
    },
    { headers: responseHeaders(execution.latencyMs) },
  )
}

