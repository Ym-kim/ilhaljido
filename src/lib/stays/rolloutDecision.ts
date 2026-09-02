export const STAY_PILOT_ROLLOUT_GUARDRAILS = {
  minimumObservationDays: 7,
  minimumSearches: 200,
  minimumBookingClicks: 1,
  minimumSuccessfulResultRate: 0.9,
  maximumFallbackRate: 0.1,
  maximumP75LatencyMs: 2_500,
  maximumAffiliateSafetyFailures: 0,
  maximumBrokenImages: 0,
} as const

export type StayPilotMeasurementSnapshot = {
  observationDays: number
  searches: number
  successfulResultViews: number
  fallbackViews: number
  unavailableViews: number
  bookingClicks: number
  p75LatencyMs: number
  affiliateSafetyFailures: number
  brokenImages: number
}

export type StayPilotRolloutBlocker =
  | 'insufficient_observation_window'
  | 'insufficient_search_sample'
  | 'no_booking_click_evidence'
  | 'successful_result_rate_below_guardrail'
  | 'fallback_rate_above_guardrail'
  | 'latency_above_guardrail'
  | 'affiliate_safety_failure'
  | 'broken_result_image'

export type StayPilotRolloutDecision = {
  status: 'collecting' | 'hold' | 'eligible_for_operator_review'
  blockers: StayPilotRolloutBlocker[]
  metrics: {
    successfulResultRate: number
    fallbackRate: number
    unavailableRate: number
    searchToBookingRate: number
  }
}

function safeRate(numerator: number, denominator: number): number {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || numerator < 0 || denominator <= 0) return 0
  return Math.min(1, numerator / denominator)
}

/**
 * This never graduates the pilot automatically. Passing the guardrails only
 * makes the evidence eligible for an operator review and a separate release.
 */
export function evaluateStayPilotRollout(snapshot: StayPilotMeasurementSnapshot): StayPilotRolloutDecision {
  const metrics = {
    successfulResultRate: safeRate(snapshot.successfulResultViews, snapshot.searches),
    fallbackRate: safeRate(snapshot.fallbackViews, snapshot.searches),
    unavailableRate: safeRate(snapshot.unavailableViews, snapshot.searches),
    searchToBookingRate: safeRate(snapshot.bookingClicks, snapshot.searches),
  }
  const blockers: StayPilotRolloutBlocker[] = []

  if (snapshot.observationDays < STAY_PILOT_ROLLOUT_GUARDRAILS.minimumObservationDays) blockers.push('insufficient_observation_window')
  if (snapshot.searches < STAY_PILOT_ROLLOUT_GUARDRAILS.minimumSearches) blockers.push('insufficient_search_sample')
  if (snapshot.bookingClicks < STAY_PILOT_ROLLOUT_GUARDRAILS.minimumBookingClicks) blockers.push('no_booking_click_evidence')
  if (metrics.successfulResultRate < STAY_PILOT_ROLLOUT_GUARDRAILS.minimumSuccessfulResultRate) blockers.push('successful_result_rate_below_guardrail')
  if (metrics.fallbackRate > STAY_PILOT_ROLLOUT_GUARDRAILS.maximumFallbackRate) blockers.push('fallback_rate_above_guardrail')
  if (snapshot.p75LatencyMs > STAY_PILOT_ROLLOUT_GUARDRAILS.maximumP75LatencyMs) blockers.push('latency_above_guardrail')
  if (snapshot.affiliateSafetyFailures > STAY_PILOT_ROLLOUT_GUARDRAILS.maximumAffiliateSafetyFailures) blockers.push('affiliate_safety_failure')
  if (snapshot.brokenImages > STAY_PILOT_ROLLOUT_GUARDRAILS.maximumBrokenImages) blockers.push('broken_result_image')

  const collecting = blockers.includes('insufficient_observation_window') || blockers.includes('insufficient_search_sample')
  const safetyFailure = blockers.includes('affiliate_safety_failure') || blockers.includes('broken_result_image')
  return {
    status: blockers.length === 0
      ? 'eligible_for_operator_review'
      : safetyFailure || !collecting
        ? 'hold'
        : 'collecting',
    blockers,
    metrics,
  }
}
