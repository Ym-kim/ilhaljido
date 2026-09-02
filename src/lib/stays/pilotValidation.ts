import type { Lang } from '@/lib/i18n/types'
import { getStayPilotDestination } from '@/lib/stays/pilotDestinations'
import type { StaySearchRequest } from '@/lib/stays/domain'

export type ValidatedStayPilotRequest = StaySearchRequest & {
  destinationId: string
  checkin: string
  checkout: string
  adults: number
  children: number
  rooms: 1
}

export type StayPilotValidationResult =
  | { ok: true; value: ValidatedStayPilotRequest }
  | { ok: false; reason: 'invalid_destination' | 'invalid_dates' | 'invalid_guests' | 'invalid_locale' }

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function utcDay(value: unknown): number | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const parsed = Date.parse(`${value}T00:00:00.000Z`)
  return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value ? parsed : null
}

function isLang(value: unknown): value is Lang {
  return value === 'KO' || value === 'EN' || value === 'JP'
}

export function validateStayPilotRequest(payload: unknown): StayPilotValidationResult {
  if (!isObject(payload)) return { ok: false, reason: 'invalid_destination' }
  const destinationId = typeof payload.destinationId === 'string' ? payload.destinationId : ''
  const destination = getStayPilotDestination(destinationId)
  if (!destination) return { ok: false, reason: 'invalid_destination' }
  if (!isLang(payload.locale)) return { ok: false, reason: 'invalid_locale' }

  const checkin = typeof payload.checkin === 'string' ? payload.checkin : ''
  const checkout = typeof payload.checkout === 'string' ? payload.checkout : ''
  const start = utcDay(checkin)
  const end = utcDay(checkout)
  const today = Date.parse(`${new Date().toISOString().slice(0, 10)}T00:00:00.000Z`)
  const nights = start !== null && end !== null ? (end - start) / 86_400_000 : 0
  if (start === null || end === null || start < today || nights < 1 || nights > 30) {
    return { ok: false, reason: 'invalid_dates' }
  }

  const adults = payload.adults
  const children = payload.children
  if (!Number.isInteger(adults) || (adults as number) < 1 || (adults as number) > 8
    || !Number.isInteger(children) || (children as number) < 0 || (children as number) > 6) {
    return { ok: false, reason: 'invalid_guests' }
  }

  return {
    ok: true,
    value: {
      destination: destination.label[payload.locale],
      destinationId,
      checkin,
      checkout,
      adults: adults as number,
      children: children as number,
      rooms: 1,
      locale: payload.locale,
    },
  }
}
