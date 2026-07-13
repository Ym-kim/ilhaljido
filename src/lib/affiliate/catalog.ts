import type { AffiliateItem } from './types'
import { ALL_AFFILIATE_ITEMS } from './items'
import {
  FEATURED_STAYS,
  FEATURED_STAYS_V2,
  FEATURED_STAYS_V3,
  FEATURED_ACTIVITIES,
  FEATURED_ESIM,
  FEATURED_CRUISES,
  FEATURED_COURSES,
  THEME_EXPERIENCES,
} from './featured'

// 전체 카탈로그 통합 뷰 — 위시리스트·기획전 id → 아이템 복원용
export const FULL_CATALOG: AffiliateItem[] = [
  ...ALL_AFFILIATE_ITEMS,
  ...FEATURED_STAYS,
  ...FEATURED_STAYS_V2,
  ...FEATURED_STAYS_V3,
  ...FEATURED_ACTIVITIES,
  ...FEATURED_ESIM,
  ...FEATURED_CRUISES,
  ...FEATURED_COURSES,
  ...THEME_EXPERIENCES,
]

export function getCatalogItems(ids: string[]): AffiliateItem[] {
  return ids
    .map((id) => FULL_CATALOG.find((i) => i.id === id))
    .filter((i): i is AffiliateItem => !!i)
}
