import type { StayCapability, StayProviderDefinition, StayProviderId, StaySearchPlan, StaySearchRequest } from '@/lib/stays/domain'
import { AGODA_STAY_PROVIDER } from '@/lib/stays/providers/agoda'
import { BOOKING_STAY_PROVIDER, buildBookingStayRedirect } from '@/lib/stays/providers/booking'
import { DIRECT_STAY_PROVIDER } from '@/lib/stays/providers/direct'
import { TRIP_STAY_PROVIDER } from '@/lib/stays/providers/trip'

const PROVIDERS: readonly StayProviderDefinition[] = [
  BOOKING_STAY_PROVIDER,
  AGODA_STAY_PROVIDER,
  TRIP_STAY_PROVIDER,
  DIRECT_STAY_PROVIDER,
]

export function getStayProviders(): readonly StayProviderDefinition[] {
  return PROVIDERS
}

export function getStayProvider(providerId: StayProviderId): StayProviderDefinition {
  const provider = PROVIDERS.find((candidate) => candidate.id === providerId)
  if (!provider) throw new Error(`Unknown stay provider: ${providerId}`)
  return provider
}

export function isStayCapabilityActive(providerId: StayProviderId, capability: StayCapability): boolean {
  return getStayProvider(providerId).capabilities[capability].status === 'active'
}

type RedirectOnlySearchPlan = Exclude<StaySearchPlan, { mode: 'live' }>

export function resolveStaySearchPlan(
  request: StaySearchRequest,
  options?: { preferredProvider?: StayProviderId; requestedCapability?: 'search_redirect' },
): RedirectOnlySearchPlan
export function resolveStaySearchPlan(
  request: StaySearchRequest,
  options: { preferredProvider?: StayProviderId; requestedCapability: 'live_search' },
): StaySearchPlan
export function resolveStaySearchPlan(
  request: StaySearchRequest,
  options: { preferredProvider?: StayProviderId; requestedCapability?: 'search_redirect' | 'live_search' } = {},
): StaySearchPlan {
  const requestedProvider = options.preferredProvider ?? 'booking'
  const requestedCapability = options.requestedCapability ?? 'search_redirect'
  const capability = getStayProvider(requestedProvider).capabilities[requestedCapability]

  if (requestedCapability === 'live_search' && capability.status === 'active') {
    return {
      mode: 'live',
      requestedProvider,
      capability: 'live_search',
    }
  }

  if (requestedProvider === 'booking' && requestedCapability === 'search_redirect' && capability.status === 'active') {
    return {
      mode: 'redirect',
      requestedProvider,
      redirect: buildBookingStayRedirect(request),
    }
  }

  // Any unavailable live provider fails over to the verified Booking redirect.
  if (isStayCapabilityActive('booking', 'search_redirect')) {
    return {
      mode: 'redirect',
      requestedProvider,
      redirect: buildBookingStayRedirect(request),
      fallbackFrom: requestedProvider,
      reason: capability.reason ?? `${requestedProvider}_${requestedCapability}_adapter_unavailable`,
    }
  }

  return {
    mode: 'unavailable',
    requestedProvider,
    reason: capability.reason ?? 'stay_search_unavailable',
  }
}

