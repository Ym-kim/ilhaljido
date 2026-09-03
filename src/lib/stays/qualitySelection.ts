import type { StaySearchQualitySummary, StaySearchResult } from './domain'

export const STAY_CANDIDATE_POOL_SIZE = 30
export const STAY_DISPLAY_TARGET = 12
export const STAY_MINIMUM_REVIEW_SCORE = 8
export const STAY_PREFERRED_REVIEW_SCORE = 8.5

type RateBand = 'value' | 'mid' | 'premium'

type RankedCandidate = {
  result: StaySearchResult
  sourceIndex: number
  quality: number
  rateBand: RateBand
}

function finiteNumber(value: number | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function structurallyValidCandidate(result: StaySearchResult): boolean {
  return Boolean(result.propertyId && result.name.trim() && result.bookingHref)
    && finiteNumber(result.rate.amount)
    && result.rate.amount > 0
}

function qualityEligibleCandidate(result: StaySearchResult): boolean {
  return structurallyValidCandidate(result)
    && finiteNumber(result.reviewScore)
    && result.reviewScore >= STAY_MINIMUM_REVIEW_SCORE
    && result.reviewScore <= 10
}

function reviewConfidence(reviewCount: number | undefined): number {
  if (!finiteNumber(reviewCount) || reviewCount < 0) return 0
  if (reviewCount >= 100) return 8
  if (reviewCount >= 30) return 4
  return 1
}

function baseQuality(result: StaySearchResult): number {
  const review = result.reviewScore ?? STAY_MINIMUM_REVIEW_SCORE
  const preferredBonus = review >= STAY_PREFERRED_REVIEW_SCORE ? 5 : 0
  const imageBonus = result.imageStatus === 'provider_image' ? 5 : 0
  const wifiBonus = result.amenities?.freeWifi === true ? 2 : 0
  const breakfastBonus = result.amenities?.breakfastIncluded === true ? 1 : 0
  const propertySignal = finiteNumber(result.starRating) ? result.starRating * 0.4 : 0
  return review * 20 + preferredBonus + reviewConfidence(result.reviewCount) + imageBonus + wifiBonus + breakfastBonus + propertySignal
}

function assignRateBands(results: readonly StaySearchResult[]): Map<string, RateBand> {
  const byRate = [...results].sort((left, right) => left.rate.amount - right.rate.amount)
  const bands = new Map<string, RateBand>()
  byRate.forEach((result, index) => {
    const percentile = (index + 1) / byRate.length
    const band: RateBand = percentile <= 1 / 3 ? 'value' : percentile <= 2 / 3 ? 'mid' : 'premium'
    bands.set(`${result.provider}:${result.propertyId}`, band)
  })
  return bands
}

function average(values: number[]): number | undefined {
  if (values.length === 0) return undefined
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10
}

function qualitySummary(candidates: readonly StaySearchResult[], displayed: readonly StaySearchResult[]): StaySearchQualitySummary {
  const reviewScores = displayed.flatMap((result) => finiteNumber(result.reviewScore) ? [result.reviewScore] : [])
  const reviewCounts = displayed.flatMap((result) => finiteNumber(result.reviewCount) && result.reviewCount >= 0 ? [result.reviewCount] : [])
  const providerImageCount = displayed.filter((result) => result.imageStatus === 'provider_image').length
  return {
    candidateCount: candidates.length,
    displayCount: displayed.length,
    averageReviewScore: average(reviewScores),
    minimumReviewScore: reviewScores.length > 0 ? Math.min(...reviewScores) : undefined,
    averageReviewCount: average(reviewCounts),
    providerImageCount,
    placeholderCount: displayed.length - providerImageCount,
    sortMode: 'recommended',
  }
}

/**
 * Selects a small, useful set from a broader provider pool.
 *
 * Review quality is the dominant signal. Review volume, real provider imagery,
 * Wi-Fi, breakfast and the provider property rating add bounded confidence.
 * Price never earns a quality bonus; a small repeated-band penalty only keeps
 * similarly qualified value, mid-range and premium stays from crowding each
 * other out. The internal score is intentionally never returned to clients.
 */
export function curateStayResults(
  input: readonly StaySearchResult[],
  target = STAY_DISPLAY_TARGET,
): { results: StaySearchResult[]; quality: StaySearchQualitySummary } {
  const candidatePool = [...new Map(
    input.filter(structurallyValidCandidate).map((result) => [`${result.provider}:${result.propertyId}`, result]),
  ).values()]
  const eligible = candidatePool.filter(qualityEligibleCandidate)
  const rateBands = assignRateBands(eligible)
  const ranked: RankedCandidate[] = eligible.map((result, sourceIndex) => ({
    result,
    sourceIndex,
    quality: baseQuality(result),
    rateBand: rateBands.get(`${result.provider}:${result.propertyId}`) ?? 'mid',
  }))
  const selected: StaySearchResult[] = []
  const selectedKeys = new Set<string>()
  const selectedBandCounts: Record<RateBand, number> = { value: 0, mid: 0, premium: 0 }

  while (selected.length < Math.max(0, target) && selected.length < ranked.length) {
    const next = ranked
      .filter(({ result }) => !selectedKeys.has(`${result.provider}:${result.propertyId}`))
      .sort((left, right) => {
        const leftAdjusted = left.quality - selectedBandCounts[left.rateBand] * 1.5
        const rightAdjusted = right.quality - selectedBandCounts[right.rateBand] * 1.5
        return rightAdjusted - leftAdjusted
          || (right.result.reviewCount ?? -1) - (left.result.reviewCount ?? -1)
          || left.sourceIndex - right.sourceIndex
      })[0]
    if (!next) break
    selected.push(next.result)
    selectedKeys.add(`${next.result.provider}:${next.result.propertyId}`)
    selectedBandCounts[next.rateBand] += 1
  }

  return { results: selected, quality: qualitySummary(candidatePool, selected) }
}
