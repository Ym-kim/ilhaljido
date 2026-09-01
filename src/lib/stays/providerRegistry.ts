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

export function resolveStaySearchPlan(
  request: StaySearchRequest,
  options: { preferredProvider?: StayProviderId; requestedCapability?: 'search_redirect' | 'live_search' } = {},
): StaySearchPlan {
  const requestedProvider = options.preferredProvider ?? 'booking'
  const requestedCapability = options.requestedCapability ?? 'search_redirect'
  const capability = getStayProvider(requestedProvider).capabilities[requestedCapability]

  if (requestedProvider === 'booking' && requestedCapability === 'search_redirect' && capability.status === 'active') {
    return {
      mode: 'redirect',
      requestedProvider,
      redirect: buildBookingStayRedirect(request),
    }
  }

  // Live Agoda results stay dark until the API health check is genuinely healthy.
  // The existing Booking redirect is the only generic search adapter currently verified end-to-end.
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

