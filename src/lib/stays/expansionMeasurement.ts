import 'server-only'

import { nightWindow, searchAgodaCity } from '@/lib/affiliate/agodaApi'
import type { Lang } from '@/lib/i18n/types'
import { STAY_EXPANSION_CANDIDATES } from '@/lib/stays/expansionReadiness'
import type { StayExpansionCandidateId } from '@/lib/stays/expansionReadiness'
import { mapAgodaHotelToStayResult } from '@/lib/stays/providers/agodaLive'

export type StayExpansionMeasurement = {
  candidateId: StayExpansionCandidateId
  cityId: number
  status: 'passed' | 'failed'
  failureReason?: string
  httpStatus?: number
  latencyMs: number
  resultCount: number
  validResultCount: number
  displayableResultCount: number
  providerImageResultCount: number
  reviewMetricCount: number
  propertyClassCount: number
  freeWifiSignalCount: number
  breakfastSignalCount: number
  affiliateLinkCount: number
  currencies: string[]
}

export type StayExpansionMeasurementReport = {
  checkedAt: string
  sampleOffsetDays: number
  passed: boolean
  candidates: StayExpansionMeasurement[]
}

const SAMPLE_OFFSET_DAYS = 21
const REQUIRED_VALID_RESULTS = 3

export async function measureStayExpansionCandidates(): Promise<StayExpansionMeasurementReport> {
  const window = nightWindow(SAMPLE_OFFSET_DAYS)
  const candidates: StayExpansionMeasurement[] = []

  for (const candidate of STAY_EXPANSION_CANDIDATES) {
    const startedAt = performance.now()
    const outcome = await searchAgodaCity({
      cityId: candidate.cityId,
      ...window,
      language: 'ko-kr',
      currency: 'KRW',
      maxResult: 8,
      adults: 2,
      children: 0,
    })
    const latencyMs = Math.round(performance.now() - startedAt)

    if (!outcome.ok) {
      candidates.push({
        candidateId: candidate.id,
        cityId: candidate.cityId,
        status: 'failed',
        failureReason: outcome.reason,
        httpStatus: outcome.status,
        latencyMs,
        resultCount: 0,
        validResultCount: 0,
        displayableResultCount: 0,
        providerImageResultCount: 0,
        reviewMetricCount: 0,
        propertyClassCount: 0,
        freeWifiSignalCount: 0,
        breakfastSignalCount: 0,
        affiliateLinkCount: 0,
        currencies: [],
      })
      continue
    }

    const request = {
      destination: candidate.label.KO,
      destinationId: candidate.id,
      checkin: window.checkInDate,
      checkout: window.checkOutDate,
      adults: 2,
      children: 0,
      rooms: 1,
      locale: 'KO' as Lang,
    }
    const validResults = outcome.hotels
      .map((hotel) => mapAgodaHotelToStayResult(hotel, request))
      .filter((hotel) => hotel !== null)
    const providerImageResults = validResults.filter((hotel) => hotel.imageStatus === 'provider_image')
    const affiliateLinkCount = validResults.filter((hotel) => hotel.bookingHref.includes('cid=1968994')).length
    const currencies = [...new Set(validResults.map((hotel) => hotel.rate.currency))]
    const passed = validResults.length >= REQUIRED_VALID_RESULTS
      && affiliateLinkCount === validResults.length
      && currencies.length === 1

    candidates.push({
      candidateId: candidate.id,
      cityId: candidate.cityId,
      status: passed ? 'passed' : 'failed',
      latencyMs,
      resultCount: outcome.hotels.length,
      validResultCount: validResults.length,
      // A valid result remains displayable through the neutral placeholder when no provider image exists.
      displayableResultCount: validResults.length,
      providerImageResultCount: providerImageResults.length,
      reviewMetricCount: validResults.filter((hotel) => typeof hotel.reviewScore === 'number').length,
      propertyClassCount: validResults.filter((hotel) => typeof hotel.starRating === 'number').length,
      freeWifiSignalCount: validResults.filter((hotel) => hotel.amenities?.freeWifi === true).length,
      breakfastSignalCount: validResults.filter((hotel) => hotel.amenities?.breakfastIncluded === true).length,
      affiliateLinkCount,
      currencies,
    })
  }

  return {
    checkedAt: new Date().toISOString(),
    sampleOffsetDays: SAMPLE_OFFSET_DAYS,
    passed: candidates.every((candidate) => candidate.status === 'passed'),
    candidates,
  }
}
