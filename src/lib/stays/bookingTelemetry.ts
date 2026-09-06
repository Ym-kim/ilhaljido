import type { DisplayLocale } from '@/lib/i18n/displayLocale'

export type StayBookingTelemetryInput = {
  destinationId: string
  locale: DisplayLocale
  provider: 'agoda' | 'booking'
  mode: 'results' | 'fallback'
}

/**
 * Best-effort operational telemetry. The affiliate link remains a direct
 * provider URL and must never wait for or depend on this request.
 */
export function recordStayBookingClick(input: StayBookingTelemetryInput): void {
  try {
    void fetch('/api/stays/booking-click', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
      credentials: 'same-origin',
      keepalive: true,
    }).catch(() => undefined)
  } catch {
    // Measurement failure must never block the provider redirect.
  }
}
