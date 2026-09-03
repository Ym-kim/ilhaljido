import type { StaySearchResult } from '@/lib/stays/domain'

export type StayResultSort = 'recommended' | 'rate_asc' | 'review_desc' | 'property_rating_desc'
export type StayResultFilterKey = 'freeWifi' | 'breakfastIncluded' | 'reviewEightPlus'

export type StayResultFilters = Record<StayResultFilterKey, boolean>

export type StayResultFilterAvailability = Record<StayResultFilterKey, boolean>

export const EMPTY_STAY_RESULT_FILTERS: StayResultFilters = {
  freeWifi: false,
  breakfastIncluded: false,
  reviewEightPlus: false,
}

export function getStayResultFilterAvailability(results: readonly StaySearchResult[]): StayResultFilterAvailability {
  return {
    freeWifi: results.some((result) => result.amenities?.freeWifi === true),
    breakfastIncluded: results.some((result) => result.amenities?.breakfastIncluded === true),
    reviewEightPlus: results.some((result) => typeof result.reviewScore === 'number' && result.reviewScore >= 8),
  }
}

export function refineStayResults(
  results: readonly StaySearchResult[],
  sort: StayResultSort,
  filters: StayResultFilters,
): StaySearchResult[] {
  const filtered = results.filter((result) => {
    if (filters.freeWifi && result.amenities?.freeWifi !== true) return false
    if (filters.breakfastIncluded && result.amenities?.breakfastIncluded !== true) return false
    if (filters.reviewEightPlus && !(typeof result.reviewScore === 'number' && result.reviewScore >= 8)) return false
    return true
  })

  if (sort === 'recommended') return filtered

  return filtered
    .map((result, providerIndex) => ({ result, providerIndex }))
    .sort((left, right) => {
      if (sort === 'rate_asc') {
        return left.result.rate.amount - right.result.rate.amount || left.providerIndex - right.providerIndex
      }

      if (sort === 'property_rating_desc') {
        return (right.result.starRating ?? -1) - (left.result.starRating ?? -1) || left.providerIndex - right.providerIndex
      }

      return (right.result.reviewScore ?? -1) - (left.result.reviewScore ?? -1) || left.providerIndex - right.providerIndex
    })
    .map(({ result }) => result)
}
