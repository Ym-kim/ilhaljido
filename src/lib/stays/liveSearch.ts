import 'server-only'

import type {
  StayLiveSearchFailureReason,
  StayProviderId,
  StaySearchRedirect,
  StaySearchRequest,
  StaySearchResult,
  StaySearchQualitySummary,
} from '@/lib/stays/domain'
import { resolveStaySearchPlan } from '@/lib/stays/providerRegistry'
import { buildBookingStayRedirect } from '@/lib/stays/providers/booking'
import { searchAgodaStays, type StayAdapterOutcome } from '@/lib/stays/providers/agodaLive'

type StayLiveSearchAdapter = (request: StaySearchRequest) => Promise<StayAdapterOutcome>

const LIVE_SEARCH_ADAPTERS: Partial<Record<StayProviderId, StayLiveSearchAdapter>> = {
  agoda: searchAgodaStays,
}

export type StaySearchExecution =
  | { mode: 'results'; provider: StayProviderId; results: StaySearchResult[]; quality: StaySearchQualitySummary; latencyMs: number }
  | {
      mode: 'fallback'
      provider: 'booking'
      fallbackFrom: StayProviderId
      reason: StayLiveSearchFailureReason
      redirect: StaySearchRedirect
      latencyMs: number
    }

export async function executeStaySearch(
  request: StaySearchRequest,
  preferredProvider: StayProviderId = 'agoda',
): Promise<StaySearchExecution> {
  const plan = resolveStaySearchPlan(request, { preferredProvider, requestedCapability: 'live_search' })
  if (plan.mode !== 'live') {
    return {
      mode: 'fallback',
      provider: 'booking',
      fallbackFrom: preferredProvider,
      reason: 'adapter_unavailable',
      redirect: plan.mode === 'redirect' ? plan.redirect : buildBookingStayRedirect(request),
      latencyMs: 0,
    }
  }

  const adapter = LIVE_SEARCH_ADAPTERS[plan.requestedProvider]
  if (!adapter) {
    return {
      mode: 'fallback',
      provider: 'booking',
      fallbackFrom: plan.requestedProvider,
      reason: 'adapter_unavailable',
      redirect: buildBookingStayRedirect(request),
      latencyMs: 0,
    }
  }

  const outcome = await adapter(request)
  if (outcome.ok) {
    return { mode: 'results', provider: plan.requestedProvider, results: outcome.results, quality: outcome.quality, latencyMs: outcome.latencyMs }
  }
  return {
    mode: 'fallback',
    provider: 'booking',
    fallbackFrom: plan.requestedProvider,
    reason: outcome.reason,
    redirect: buildBookingStayRedirect(request),
    latencyMs: outcome.latencyMs,
  }
}
