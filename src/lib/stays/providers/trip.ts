import type { StayProviderDefinition } from '@/lib/stays/domain'

const NOT_SUPPORTED = { status: 'not_supported' as const }

export const TRIP_STAY_PROVIDER = {
  id: 'trip',
  label: 'Trip.com',
  affiliate: true,
  publicTrackingId: '9024807',
  capabilities: {
    search_redirect: { status: 'active' },
    live_search: NOT_SUPPORTED,
    property_redirect: { status: 'active' },
    live_property: NOT_SUPPORTED,
    availability: NOT_SUPPORTED,
    booking: NOT_SUPPORTED,
  },
} satisfies StayProviderDefinition

