import type { StayProviderDefinition } from '@/lib/stays/domain'

const NOT_SUPPORTED = { status: 'not_supported' as const }

export const AGODA_STAY_PROVIDER = {
  id: 'agoda',
  label: 'Agoda',
  affiliate: true,
  publicTrackingId: '1968994',
  capabilities: {
    // Verified city-level affiliate redirects remain active in the existing destination catalog.
    search_redirect: { status: 'active' },
    live_search: {
      status: 'active',
      verifiedAt: '2026-09-02',
    },
    property_redirect: { status: 'active' },
    live_property: NOT_SUPPORTED,
    availability: {
      status: 'unavailable',
      reason: 'pilot_live_search_only',
      verifiedAt: '2026-09-02',
    },
    booking: NOT_SUPPORTED,
  },
} satisfies StayProviderDefinition

