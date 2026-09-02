import type { Lang } from '@/lib/i18n/types'
import { AGODA_CITY_IDS } from '@/lib/affiliate/agodaCities'
import { trackEvent } from '@/lib/track'
import type { StayCapability, StayProviderId } from '@/lib/stays/domain'

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
  hotelId?: string | number
  position?: number
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
    capability: input.capability ?? 'none',
    dates_supplied: input.datesSupplied ? 'true' : 'false',
    result_count: typeof input.resultCount === 'number' && Number.isFinite(input.resultCount)
      ? String(Math.max(0, Math.floor(input.resultCount)))
      : 'unknown',
    refinement: input.refinement ?? 'none',
    outcome: input.outcome ?? 'view',
  })
}

