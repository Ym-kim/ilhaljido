import type { Lang } from '@/lib/i18n/types'

export const STAY_CAPABILITIES = [
  'search_redirect',
  'live_search',
  'property_redirect',
  'live_property',
  'availability',
  'booking',
] as const

export type StayCapability = (typeof STAY_CAPABILITIES)[number]
export type StayProviderId = 'booking' | 'agoda' | 'trip' | 'direct'
export type StayCapabilityStatus = 'active' | 'unavailable' | 'not_supported'

export type StayCapabilityState = {
  status: StayCapabilityStatus
  reason?: string
  verifiedAt?: string
}

export type StayProviderDefinition = {
  id: StayProviderId
  label: string
  affiliate: boolean
  publicTrackingId?: string
  capabilities: Record<StayCapability, StayCapabilityState>
}

export type StaySearchRequest = {
  destination: string
  destinationId?: string
  checkin?: string
  checkout?: string
  adults?: number
  rooms?: number
  children?: number
  locale: Lang
}

export type StaySearchRedirect = {
  provider: StayProviderId
  providerLabel: string
  href: string
  rel: 'sponsored noopener noreferrer'
}

export type StayRate = {
  amount: number
  currency: string
  crossedOutAmount?: number
  discountPercentage?: number
}

export type StayAmenities = {
  freeWifi?: boolean
  breakfastIncluded?: boolean
}

/** Wakation-owned research only. Provider data must never populate these fields. */
export type StayIntelligence = {
  workNote: string
  longStayNote?: string
  access?: string
  sourceLabel: string
  sourceUrl: string
  sourceItemId: string
  verifiedAt: string
}

export type StaySearchResult = {
  provider: StayProviderId
  propertyId: string
  name: string
  bookingHref: string
  imageUrl?: string
  starRating?: number
  reviewScore?: number
  rate: StayRate
  amenities?: StayAmenities
  intelligence?: StayIntelligence
}

export type StayLiveSearchFailureReason =
  | 'configuration_error'
  | 'timeout'
  | 'network'
  | 'http_error'
  | 'bad_payload'
  | 'empty_result'
  | 'adapter_unavailable'

export type StaySearchPlan =
  | {
      mode: 'live'
      requestedProvider: StayProviderId
      capability: 'live_search'
    }
  | {
      mode: 'redirect'
      requestedProvider: StayProviderId
      redirect: StaySearchRedirect
      fallbackFrom?: StayProviderId
      reason?: string
    }
  | {
      mode: 'unavailable'
      requestedProvider: StayProviderId
      reason: string
    }

