import type { Lang } from '@/lib/i18n/types'

export const STAY_EXPANSION_READINESS_CRITERIA = [
  'verified_city_id',
  'guide_and_trip_set',
  'active_affiliate_redirect',
  'verified_local_media',
  'live_result_quality',
] as const

export type StayExpansionReadinessCriterion = (typeof STAY_EXPANSION_READINESS_CRITERIA)[number]
export type StayExpansionCandidateId = 'korea-seoul' | 'korea-busan' | 'korea-jeju'

export type StayExpansionCandidate = {
  id: StayExpansionCandidateId
  cityId: number
  label: Record<Lang, string>
  guideSlug: string
  tripSetSlug: string
  mediaPath: string
  affiliateDestinationId: StayExpansionCandidateId
  evidenceVerifiedAt: string
  liveQualityEvidence: {
    checkedAt: string
    sampleOffsetDays: number
    resultCount: number
    validResultCount: number
    displayableResultCount: number
    providerImageResultCount: number
    latencyMs: number
  }
  readiness: Record<StayExpansionReadinessCriterion, 'verified' | 'pending'>
  rolloutStatus: 'qa_verified_not_enabled'
}

/**
 * Readiness data only. This array is intentionally not consumed by the public
 * search form or request validator until Phase 7 evidence passes operator review.
 */
export const STAY_EXPANSION_CANDIDATES: readonly StayExpansionCandidate[] = [
  {
    id: 'korea-busan',
    cityId: 17172,
    label: { KO: '부산', EN: 'Busan', JP: '釜山' },
    guideSlug: 'busan',
    tripSetSlug: 'busan-weekend',
    mediaPath: '/media/destinations/busan-editorial-v1.webp',
    affiliateDestinationId: 'korea-busan',
    evidenceVerifiedAt: '2026-09-02',
    liveQualityEvidence: {
      checkedAt: '2026-09-02T09:37:09.548Z',
      sampleOffsetDays: 21,
      resultCount: 8,
      validResultCount: 8,
      displayableResultCount: 8,
      providerImageResultCount: 8,
      latencyMs: 257,
    },
    readiness: {
      verified_city_id: 'verified',
      guide_and_trip_set: 'verified',
      active_affiliate_redirect: 'verified',
      verified_local_media: 'verified',
      live_result_quality: 'verified',
    },
    rolloutStatus: 'qa_verified_not_enabled',
  },
  {
    id: 'korea-jeju',
    cityId: 16901,
    label: { KO: '제주', EN: 'Jeju', JP: '済州' },
    guideSlug: 'jeju',
    tripSetSlug: 'jeju-solo-reset',
    mediaPath: '/media/destinations/jeju-editorial-v1.webp',
    affiliateDestinationId: 'korea-jeju',
    evidenceVerifiedAt: '2026-09-02',
    liveQualityEvidence: {
      checkedAt: '2026-09-02T09:37:09.548Z',
      sampleOffsetDays: 21,
      resultCount: 8,
      validResultCount: 8,
      displayableResultCount: 8,
      providerImageResultCount: 7,
      latencyMs: 42,
    },
    readiness: {
      verified_city_id: 'verified',
      guide_and_trip_set: 'verified',
      active_affiliate_redirect: 'verified',
      verified_local_media: 'verified',
      live_result_quality: 'verified',
    },
    rolloutStatus: 'qa_verified_not_enabled',
  },
  {
    id: 'korea-seoul',
    cityId: 14690,
    label: { KO: '서울', EN: 'Seoul', JP: 'ソウル' },
    guideSlug: 'seoul',
    tripSetSlug: 'seoul-3n4d',
    mediaPath: '/media/destinations/seoul-editorial-v1.webp',
    affiliateDestinationId: 'korea-seoul',
    evidenceVerifiedAt: '2026-09-02',
    liveQualityEvidence: {
      checkedAt: '2026-09-02T09:37:09.548Z',
      sampleOffsetDays: 21,
      resultCount: 8,
      validResultCount: 8,
      displayableResultCount: 8,
      providerImageResultCount: 8,
      latencyMs: 35,
    },
    readiness: {
      verified_city_id: 'verified',
      guide_and_trip_set: 'verified',
      active_affiliate_redirect: 'verified',
      verified_local_media: 'verified',
      live_result_quality: 'verified',
    },
    rolloutStatus: 'qa_verified_not_enabled',
  },
] as const

export function scoreStayExpansionCandidate(candidate: StayExpansionCandidate): number {
  return STAY_EXPANSION_READINESS_CRITERIA.reduce(
    (score, criterion) => score + (candidate.readiness[criterion] === 'verified' ? 20 : 0),
    0,
  )
}

export function isStayExpansionCandidateReady(candidate: StayExpansionCandidate): boolean {
  return scoreStayExpansionCandidate(candidate) >= 100
}
