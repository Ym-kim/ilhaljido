import 'server-only'

import { nightWindow, searchAgodaCity } from '@/lib/affiliate/agodaApi'
import { AGODA_CITY_IDS } from '@/lib/affiliate/agodaCities'
import { AGODA_STAY_PROVIDER } from '@/lib/stays/providers/agoda'
import { mapAgodaHotelToStayResult } from '@/lib/stays/providers/agodaLive'
import { isHealthyProviderImageResponse, isSafeAgodaAffiliateUrl } from '@/lib/stays/pilotSafetyEvidence'
import type { Lang } from '@/lib/i18n/types'

const SAMPLE_DESTINATIONS = [
  { id: 'japan-fukuoka', label: 'Fukuoka' },
  { id: 'korea-busan', label: 'Busan' },
] as const
const SAMPLE_OFFSET_DAYS = 21
const MAX_RESULTS = 5
const IMAGE_TIMEOUT_MS = 5_000

type SafetyDestinationResult = {
  destinationId: (typeof SAMPLE_DESTINATIONS)[number]['id']
  status: 'passed' | 'failed'
  failureReason?: string
  resultCount: number
  validResultCount: number
  affiliateSafetyFailures: number
  checkedImages: number
  brokenImages: number
  missingImages: number
}

export type StayPilotSafetyReport = {
  checkedAt: string
  complete: boolean
  sampleOffsetDays: number
  destinations: SafetyDestinationResult[]
  resultCount: number
  affiliateSafetyFailures: number
  checkedImages: number
  brokenImages: number
  missingImages: number
}

async function checkProviderImage(url: string): Promise<boolean> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), IMAGE_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
        range: 'bytes=0-2047',
        'user-agent': 'Wakation-Stay-Pilot-Safety/1.0',
      },
      signal: controller.signal,
      cache: 'no-store',
    })
    const healthy = isHealthyProviderImageResponse(response.status, response.headers.get('content-type'))
    await response.body?.cancel().catch(() => undefined)
    return healthy
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

async function measureDestination(
  destination: (typeof SAMPLE_DESTINATIONS)[number],
  checkInDate: string,
  checkOutDate: string,
): Promise<SafetyDestinationResult> {
  const cityId = AGODA_CITY_IDS[destination.id]
  const outcome = await searchAgodaCity({
    cityId,
    checkInDate,
    checkOutDate,
    language: 'ko-kr',
    currency: 'KRW',
    maxResult: MAX_RESULTS,
    adults: 2,
    children: 0,
  })

  if (!outcome.ok) {
    return {
      destinationId: destination.id,
      status: 'failed',
      failureReason: outcome.reason,
      resultCount: 0,
      validResultCount: 0,
      affiliateSafetyFailures: 0,
      checkedImages: 0,
      brokenImages: 0,
      missingImages: 0,
    }
  }

  const request = {
    destination: destination.label,
    destinationId: destination.id,
    checkin: checkInDate,
    checkout: checkOutDate,
    adults: 2,
    children: 0,
    rooms: 1,
    locale: 'KO' as Lang,
  }
  const results = outcome.hotels
    .map((hotel) => mapAgodaHotelToStayResult(hotel, request))
    .filter((hotel) => hotel !== null)
  const imageUrls = results.flatMap((hotel) => hotel.imageUrl ? [hotel.imageUrl] : [])
  const imageChecks = await Promise.all(imageUrls.map(checkProviderImage))
  const affiliateSafetyFailures = outcome.hotels.filter((hotel) => !isSafeAgodaAffiliateUrl(
    hotel.landingURL,
    AGODA_STAY_PROVIDER.publicTrackingId,
  )).length
  const brokenImages = imageChecks.filter((healthy) => !healthy).length

  return {
    destinationId: destination.id,
    status: affiliateSafetyFailures === 0 && brokenImages === 0 && imageUrls.length > 0 ? 'passed' : 'failed',
    resultCount: outcome.hotels.length,
    validResultCount: results.length,
    affiliateSafetyFailures,
    checkedImages: imageUrls.length,
    brokenImages,
    missingImages: results.length - imageUrls.length,
  }
}

/**
 * Hourly aggregate probe for one Japan and one Korea pilot destination.
 * No property name, ID, URL, date, guest data or credential leaves this module.
 */
export async function measureStayPilotSafety(): Promise<StayPilotSafetyReport> {
  const window = nightWindow(SAMPLE_OFFSET_DAYS)
  const destinations = await Promise.all(SAMPLE_DESTINATIONS.map((destination) => measureDestination(
    destination,
    window.checkInDate,
    window.checkOutDate,
  )))

  const totals = destinations.reduce((total, destination) => ({
    resultCount: total.resultCount + destination.resultCount,
    affiliateSafetyFailures: total.affiliateSafetyFailures + destination.affiliateSafetyFailures,
    checkedImages: total.checkedImages + destination.checkedImages,
    brokenImages: total.brokenImages + destination.brokenImages,
    missingImages: total.missingImages + destination.missingImages,
  }), { resultCount: 0, affiliateSafetyFailures: 0, checkedImages: 0, brokenImages: 0, missingImages: 0 })

  return {
    checkedAt: new Date().toISOString(),
    complete: destinations.every((destination) => destination.status === 'passed'),
    sampleOffsetDays: SAMPLE_OFFSET_DAYS,
    destinations,
    ...totals,
  }
}
