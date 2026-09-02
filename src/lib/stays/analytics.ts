import type { Lang } from '@/lib/i18n/types'
import { AGODA_CITY_IDS } from '@/lib/affiliate/agodaCities'
import { trackEvent } from '@/lib/track'
import type { StayCapability, StayImageStatus, StayLiveSearchFailureReason, StayProviderId } from '@/lib/stays/domain'

export type StayLatencyBucket = 'under_500ms' | '500_999ms' | '1_1999s' | '2_3999s' | '4_7999s' | '8s_plus' | 'unknown'
export type StayResultCountBand = 'zero' | '1_4' | '5_9' | '10_plus' | 'unknown'
export type StayMeasurementFailureReason = StayLiveSearchFailureReason | 'request_failed'
export type StayAnalyticsImageStatus = StayImageStatus | 'mixed' | 'unknown'

export type StayEventName =
  | 'stay_search'
  | 'stay_result_view'
  | 'stay_result_refine'
  | 'stay_property_click'
  | 'stay_search_result_view'
  | 'stay_property_view'
  | 'stay_booking_click'
  | 'affiliate_redirect'

export type StayAnalyticsInput = {
  locale: Lang
  sourceSection: string
  provider?: StayProviderId
  destinationId?: string
  capability?: StayCapability
  datesSupplied?: boolean
  resultCount?: number
  latencyMs?: number
  failureReason?: StayMeasurementFailureReason
  hotelId?: string | number
  position?: number
  imageStatus?: StayAnalyticsImageStatus
  discountPresent?: boolean
  wakationNotePresent?: boolean
  refinement?: 'sort_provider_order' | 'sort_rate_asc' | 'sort_review_desc' | 'filter_free_wifi' | 'filter_breakfast' | 'filter_review_8_plus' | 'reset'
  outcome?: 'view' | 'redirect' | 'fallback' | 'unavailable'
}

function safeDestinationId(destinationId?: string): string {
  if (!destinationId) return 'custom_search'
  return Object.hasOwn(AGODA_CITY_IDS, destinationId) ? destinationId : 'custom_search'
}

function safeToken(value: string, fallback: string): string {
  return /^[a-z0-9_-]{1,64}$/i.test(value) ? value : fallback
}

function safeHotelId(value?: string | number): string {
  if (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0) return String(value)
  if (typeof value === 'string' && /^[a-z0-9_-]{1,64}$/i.test(value)) return value
  return 'unknown'
}

export function getStayLatencyBucket(value?: number): StayLatencyBucket {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return 'unknown'
  if (value < 500) return 'under_500ms'
  if (value < 1_000) return '500_999ms'
  if (value < 2_000) return '1_1999s'
  if (value < 4_000) return '2_3999s'
  if (value < 8_000) return '4_7999s'
  return '8s_plus'
}

export function getStayResultCountBand(value?: number): StayResultCountBand {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return 'unknown'
  const count = Math.floor(value)
  if (count === 0) return 'zero'
  if (count < 5) return '1_4'
  if (count < 10) return '5_9'
  return '10_plus'
}

/**
 * Stay funnel events deliberately exclude free-form destination text, guest names,
 * emails, phone numbers and provider URLs. Only trusted IDs and bounded enums leave the browser.
 */
export function trackStayEvent(name: StayEventName, input: StayAnalyticsInput): void {
  trackEvent(name, {
    locale: input.locale === 'JP' ? 'ja' : input.locale.toLowerCase(),
    source_section: safeToken(input.sourceSection, 'unknown'),
    provider: input.provider ?? 'none',
    destination_id: safeDestinationId(input.destinationId),
    destination: safeDestinationId(input.destinationId),
    hotel_id: safeHotelId(input.hotelId),
    position: typeof input.position === 'number' && Number.isFinite(input.position)
      ? String(Math.max(0, Math.floor(input.position)))
      : 'unknown',
    image_status: input.imageStatus ?? 'unknown',
    discount_present: input.discountPresent === undefined ? 'unknown' : input.discountPresent ? 'true' : 'false',
    wakation_note_present: input.wakationNotePresent === undefined ? 'unknown' : input.wakationNotePresent ? 'true' : 'false',
    capability: input.capability ?? 'none',
    dates_supplied: input.datesSupplied ? 'true' : 'false',
    result_count: typeof input.resultCount === 'number' && Number.isFinite(input.resultCount)
      ? String(Math.max(0, Math.floor(input.resultCount)))
      : 'unknown',
    result_count_band: getStayResultCountBand(input.resultCount),
    latency_bucket: getStayLatencyBucket(input.latencyMs),
    failure_reason: input.failureReason ?? 'none',
    refinement: input.refinement ?? 'none',
    outcome: input.outcome ?? 'view',
  })
}

