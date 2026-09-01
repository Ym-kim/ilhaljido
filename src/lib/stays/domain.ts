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

export type StaySearchPlan =
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

