import type { StayProviderDefinition } from '@/lib/stays/domain'

const NOT_SUPPORTED = { status: 'not_supported' as const }

export const DIRECT_STAY_PROVIDER = {
  id: 'direct',
  label: 'Wakation Host',
  affiliate: false,
  capabilities: {
    search_redirect: NOT_SUPPORTED,
    live_search: NOT_SUPPORTED,
    property_redirect: { status: 'active' },
    live_property: NOT_SUPPORTED,
    availability: NOT_SUPPORTED,
    booking: NOT_SUPPORTED,
  },
} satisfies StayProviderDefinition

export function buildDirectStayPropertyHref(slug: string): string {
  return `/stays/${encodeURIComponent(slug)}`
}
