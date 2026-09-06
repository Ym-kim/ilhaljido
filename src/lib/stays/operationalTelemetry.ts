import 'server-only'

import type { Lang } from '@/lib/i18n/types'
import type { DisplayLocale } from '@/lib/i18n/displayLocale'
import type { StaySearchExecution } from '@/lib/stays/liveSearch'

type StaySearchOperationalInput = {
  destinationId: string
  locale: Lang
  execution: StaySearchExecution
}

type StayBookingOperationalInput = {
  destinationId: string
  locale: DisplayLocale
  provider: 'agoda' | 'booking'
  mode: 'results' | 'fallback'
}

/**
 * A deliberately narrow server log for pilot reliability measurement.
 * It cannot accept dates, guest counts, property URLs, credentials or free-form destinations.
 */
export function logStaySearchExecution({ destinationId, locale, execution }: StaySearchOperationalInput): void {
  const resultCount = execution.mode === 'results' ? execution.results.length : 0
  const record = {
    event: 'stay_search_execution',
    pilot: 'agoda_stay_v1',
    destination_id: destinationId,
    locale: locale === 'JP' ? 'ja' : locale.toLowerCase(),
    mode: execution.mode,
    provider: execution.provider,
    fallback_from: execution.mode === 'fallback' ? execution.fallbackFrom : 'none',
    failure_reason: execution.mode === 'fallback' ? execution.reason : 'none',
    latency_ms: Math.max(0, Math.round(execution.latencyMs)),
    result_count: resultCount,
    candidate_count: execution.mode === 'results' ? execution.quality.candidateCount : 0,
    display_count: execution.mode === 'results' ? execution.quality.displayCount : 0,
    avg_review_score: execution.mode === 'results' ? execution.quality.averageReviewScore ?? 'unavailable' : 'unavailable',
    avg_review_count: execution.mode === 'results' ? execution.quality.averageReviewCount ?? 'unavailable' : 'unavailable',
    placeholder_count: execution.mode === 'results' ? execution.quality.placeholderCount : 0,
    sort_mode: execution.mode === 'results' ? execution.quality.sortMode : 'none',
  }

  console.info(`[stay-pilot] ${JSON.stringify(record)}`)
}

/**
 * Aggregate booking-click evidence for the pilot graduation report. The input
 * deliberately cannot accept a property ID, URL, date, guest count or user ID.
 */
export function logStayBookingClick({ destinationId, locale, provider, mode }: StayBookingOperationalInput): void {
  const record = {
    event: 'stay_booking_click',
    pilot: 'agoda_stay_v1',
    destination_id: destinationId,
    locale: locale === 'JP' ? 'ja' : locale === 'ZH' ? 'zh-cn' : locale.toLowerCase(),
    provider,
    mode,
  }

  console.info(`[stay-pilot-booking] ${JSON.stringify(record)}`)
}
