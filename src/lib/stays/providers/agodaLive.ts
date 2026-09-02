import 'server-only'

import { searchAgodaCity } from '@/lib/affiliate/agodaApi'
import type { AgodaHotel, AgodaSearchOutcome } from '@/lib/affiliate/agodaApi'
import type { StayLiveSearchFailureReason, StaySearchRequest, StaySearchResult } from '@/lib/stays/domain'
import { getVerifiedStayIntelligence } from '@/lib/stays/intelligence'
import { getStayPilotDestination } from '@/lib/stays/pilotDestinations'

export type StayAdapterOutcome =
  | { ok: true; results: StaySearchResult[]; latencyMs: number }
  | { ok: false; reason: StayLiveSearchFailureReason; latencyMs: number }

function safeHttpsUrl(value: string | undefined, agodaOnly = false): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return undefined
    if (agodaOnly && url.hostname !== 'agoda.com' && !url.hostname.endsWith('.agoda.com')) return undefined
    return value
  } catch {
    return undefined
  }
}

function safeProviderImageUrl(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    const trustedHost = url.hostname === 'agoda.net'
      || url.hostname.endsWith('.agoda.net')
      || url.hostname === 'agoda.com'
      || url.hostname.endsWith('.agoda.com')
    if (!trustedHost || (url.protocol !== 'https:' && url.protocol !== 'http:')) return undefined
    // Affiliate Lite can still return legacy http://pix*.agoda.net image URLs.
    // Upgrade only Agoda-owned hosts; never proxy or rewrite the booking URL.
    url.protocol = 'https:'
    return url.toString()
  } catch {
    return undefined
  }
}

function safeMetric(value: number | undefined, min: number, max: number): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max ? value : undefined
}

export function mapAgodaHotelToStayResult(hotel: AgodaHotel, request: StaySearchRequest): StaySearchResult | null {
  const bookingHref = safeHttpsUrl(hotel.landingURL, true)
  if (!bookingHref || !Number.isFinite(hotel.dailyRate) || hotel.dailyRate < 0) return null

  const crossedOutAmount = typeof hotel.crossedOutRate === 'number'
    && Number.isFinite(hotel.crossedOutRate)
    && hotel.crossedOutRate > 0
    ? hotel.crossedOutRate
    : undefined

  const amenities = hotel.freeWifi === true || hotel.includeBreakfast === true
    ? { freeWifi: hotel.freeWifi === true || undefined, breakfastIncluded: hotel.includeBreakfast === true || undefined }
    : undefined

  const propertyId = String(hotel.hotelId)
  const intelligence = request.destinationId
    ? getVerifiedStayIntelligence({
        provider: 'agoda',
        propertyId,
        destinationId: request.destinationId,
        locale: request.locale,
      })
    : undefined

  return {
    provider: 'agoda',
    propertyId,
    name: hotel.hotelName.slice(0, 200),
    bookingHref,
    imageUrl: safeProviderImageUrl(hotel.imageURL),
    starRating: safeMetric(hotel.starRating, 0, 5),
    reviewScore: safeMetric(hotel.reviewScore, 0, 10),
    rate: {
      amount: hotel.dailyRate,
      currency: hotel.currency.slice(0, 8),
      crossedOutAmount,
      discountPercentage: safeMetric(hotel.discountPercentage, 0, 100),
    },
    amenities,
    intelligence,
  }
}

function failureReason(outcome: Extract<AgodaSearchOutcome, { ok: false }>): StayLiveSearchFailureReason {
  if (outcome.reason === 'missing_site_id' || outcome.reason === 'missing_key' || outcome.reason === 'configuration_error') {
    return 'configuration_error'
  }
  return outcome.reason
}

export async function searchAgodaStays(request: StaySearchRequest): Promise<StayAdapterOutcome> {
  const startedAt = performance.now()
  const destination = request.destinationId ? getStayPilotDestination(request.destinationId) : undefined
  if (!destination || !request.checkin || !request.checkout) {
    return { ok: false, reason: 'configuration_error', latencyMs: Math.round(performance.now() - startedAt) }
  }

  const outcome = await searchAgodaCity({
    cityId: destination.cityId,
    checkInDate: request.checkin,
    checkOutDate: request.checkout,
    language: request.locale === 'KO' ? 'ko-kr' : request.locale === 'JP' ? 'ja-jp' : 'en-us',
    currency: request.locale === 'KO' ? 'KRW' : request.locale === 'JP' ? 'JPY' : 'USD',
    maxResult: 8,
    adults: request.adults,
    children: request.children,
  })
  const latencyMs = Math.round(performance.now() - startedAt)
  if (!outcome.ok) return { ok: false, reason: failureReason(outcome), latencyMs }

  const results = outcome.hotels.map((hotel) => mapAgodaHotelToStayResult(hotel, request)).filter((hotel): hotel is StaySearchResult => hotel !== null)
  return results.length > 0
    ? { ok: true, results, latencyMs }
    : { ok: false, reason: 'empty_result', latencyMs }
}
