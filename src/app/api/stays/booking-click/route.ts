import { getStayPilotDestination } from '@/lib/stays/pilotDestinations'
import { isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'
import { logStayBookingClick } from '@/lib/stays/operationalTelemetry'
import type { Lang } from '@/lib/i18n/types'

export const dynamic = 'force-dynamic'

const ALLOWED_KEYS = ['destinationId', 'locale', 'mode', 'provider'] as const
const ALLOWED_LOCALES: readonly Lang[] = ['KO', 'EN', 'JP']

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return false

  try {
    const originUrl = new URL(origin)
    const requestUrl = new URL(request.url)
    const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
    const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
    const expectedHost = forwardedHost || requestUrl.host
    const expectedProtocol = `${forwardedProto || requestUrl.protocol.replace(':', '')}:`
    const fetchSite = request.headers.get('sec-fetch-site')

    return originUrl.host === expectedHost
      && originUrl.protocol === expectedProtocol
      && (!fetchSite || fetchSite === 'same-origin')
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  if (!isAgodaStayPilotEnabled()) return new Response(null, { status: 404 })
  if (!isSameOrigin(request)) return new Response(null, { status: 403 })

  const contentLength = Number(request.headers.get('content-length') ?? '0')
  if (!Number.isFinite(contentLength) || contentLength > 512) return new Response(null, { status: 413 })

  let rawPayload: string
  try {
    rawPayload = await request.text()
  } catch {
    return new Response(null, { status: 400 })
  }

  if (new TextEncoder().encode(rawPayload).byteLength > 512) {
    return new Response(null, { status: 413 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawPayload)
  } catch {
    return new Response(null, { status: 400 })
  }

  if (!isObject(payload) || Object.keys(payload).some((key) => !ALLOWED_KEYS.includes(key as (typeof ALLOWED_KEYS)[number]))) {
    return new Response(null, { status: 400 })
  }

  const destinationId = typeof payload.destinationId === 'string' ? payload.destinationId : ''
  const locale = typeof payload.locale === 'string' && ALLOWED_LOCALES.includes(payload.locale as Lang)
    ? payload.locale as Lang
    : null
  const provider = payload.provider === 'agoda' || payload.provider === 'booking' ? payload.provider : null
  const mode = payload.mode === 'results' || payload.mode === 'fallback' ? payload.mode : null
  const providerMatchesMode = (mode === 'results' && provider === 'agoda') || (mode === 'fallback' && provider === 'booking')

  if (!getStayPilotDestination(destinationId) || !locale || !provider || !mode || !providerMatchesMode) {
    return new Response(null, { status: 400 })
  }

  logStayBookingClick({ destinationId, locale, provider, mode })
  return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store, max-age=0' } })
}
