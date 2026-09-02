import type { StayProviderId } from './domain.ts'

export type StayComparisonEvidenceStatus = 'verified' | 'not_configured' | 'not_confirmed'
export type StayComparisonCandidateId = Extract<StayProviderId, 'agoda' | 'booking' | 'trip'>

export type StayComparisonCandidate = {
  provider: StayComparisonCandidateId
  currentRole: 'pilot_live_search' | 'fallback_redirect' | 'alternate_redirect'
  liveSearchCapability: StayComparisonEvidenceStatus
  serverAdapter: StayComparisonEvidenceStatus
  credentials: StayComparisonEvidenceStatus
  commercialAccess: StayComparisonEvidenceStatus
  resultContract: StayComparisonEvidenceStatus
  liveAttribution: StayComparisonEvidenceStatus
  requiredCredentialNames: string[]
  verifiedAt: string
  sourceUrls: string[]
}

export type StayComparisonProviderEvaluation = {
  provider: StayComparisonCandidateId
  eligible: boolean
  blockers: string[]
}

export type StayProviderComparisonReadiness = {
  status: 'blocked' | 'eligible_for_preview'
  eligibleProviders: StayComparisonCandidateId[]
  providerEvaluations: StayComparisonProviderEvaluation[]
  blockers: string[]
}

const REQUIRED_EVIDENCE_FIELDS = [
  'liveSearchCapability',
  'serverAdapter',
  'credentials',
  'commercialAccess',
  'resultContract',
  'liveAttribution',
] as const satisfies readonly (keyof StayComparisonCandidate)[]

/**
 * Operator-maintained evidence only. A normal affiliate redirect ID never
 * satisfies live-search credential, contract or adapter requirements.
 */
export const STAY_COMPARISON_CANDIDATES: readonly StayComparisonCandidate[] = [
  {
    provider: 'agoda',
    currentRole: 'pilot_live_search',
    liveSearchCapability: 'verified',
    serverAdapter: 'verified',
    credentials: 'verified',
    commercialAccess: 'verified',
    resultContract: 'verified',
    liveAttribution: 'verified',
    requiredCredentialNames: ['AGODA_SITE_ID', 'AGODA_API_KEY'],
    verifiedAt: '2026-09-02',
    sourceUrls: [
      'docs/audits/stay-engine-monetization-audit-2026-09-02.md',
      'docs/audits/stay-pilot-cohort-measurement-v1-2026-09.md',
    ],
  },
  {
    provider: 'booking',
    currentRole: 'fallback_redirect',
    liveSearchCapability: 'not_configured',
    serverAdapter: 'not_configured',
    credentials: 'not_configured',
    commercialAccess: 'not_confirmed',
    resultContract: 'not_configured',
    liveAttribution: 'not_configured',
    requiredCredentialNames: ['BOOKING_DEMAND_API_TOKEN', 'BOOKING_DEMAND_AFFILIATE_ID'],
    verifiedAt: '2026-09-02',
    sourceUrls: [
      'https://developers.booking.com/demand/docs/getting-started/prerequisites',
      'https://developers.booking.com/demand/docs/development-guide/authentication',
      'https://developers.booking.com/demand/docs/accommodations/search-for-available-properties',
    ],
  },
  {
    provider: 'trip',
    currentRole: 'alternate_redirect',
    liveSearchCapability: 'not_confirmed',
    serverAdapter: 'not_configured',
    credentials: 'not_configured',
    commercialAccess: 'not_confirmed',
    resultContract: 'not_confirmed',
    liveAttribution: 'not_configured',
    requiredCredentialNames: [],
    verifiedAt: '2026-09-02',
    sourceUrls: [],
  },
] as const

export function evaluateStayProviderComparisonReadiness(
  candidates: readonly StayComparisonCandidate[] = STAY_COMPARISON_CANDIDATES,
): StayProviderComparisonReadiness {
  const providerEvaluations = candidates.map<StayComparisonProviderEvaluation>((candidate) => {
    const blockers = REQUIRED_EVIDENCE_FIELDS
      .filter((field) => candidate[field] !== 'verified')
      .map((field) => `${candidate.provider}:${field}:${candidate[field]}`)
    return { provider: candidate.provider, eligible: blockers.length === 0, blockers }
  })
  const eligibleProviders = providerEvaluations
    .filter((evaluation) => evaluation.eligible)
    .map((evaluation) => evaluation.provider)
  const blockers = providerEvaluations.flatMap((evaluation) => evaluation.blockers)

  if (eligibleProviders.length < 2) blockers.unshift('requires_two_verified_live_search_providers')

  return {
    status: eligibleProviders.length >= 2 ? 'eligible_for_preview' : 'blocked',
    eligibleProviders,
    providerEvaluations,
    blockers,
  }
}
