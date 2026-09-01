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
      status: 'unavailable',
      reason: 'ip_allowlist_or_account_access_401',
      verifiedAt: '2026-09-02',
    },
    property_redirect: { status: 'active' },
    live_property: NOT_SUPPORTED,
    availability: {
      status: 'unavailable',
      reason: 'ip_allowlist_or_account_access_401',
      verifiedAt: '2026-09-02',
    },
    booking: NOT_SUPPORTED,
  },
} satisfies StayProviderDefinition

