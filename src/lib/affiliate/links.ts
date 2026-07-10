// ─────────────────────────────────────────────────────────────────────────────
// Wakation Affiliate Links — 페이지별 필터 뷰
//
// 단일 진실 공급원(single source of truth)은 items.ts입니다.
// 이 파일은 items.ts의 showOn 필터를 page별로 re-export합니다.
//
// 링크 교체 시 → items.ts의 해당 항목을 수정하세요.
// ─────────────────────────────────────────────────────────────────────────────

export { AFFILIATE_BASE } from './items'
import { getItemsFor } from './items'

// /programs/global 하단 섹션
export const GLOBAL_PREP_ITEMS = getItemsFor('global')

// /programs/market 하단 섹션
export const MARKET_PREP_ITEMS = getItemsFor('market')

// /visa-ai 하단 섹션
export const VISA_PREP_ITEMS = getItemsFor('visa')

// /programs 하단 섹션
export const PROGRAMS_LEARN_ITEMS = getItemsFor('programs')

// /programs/domestic 하단 섹션
export const DOMESTIC_PREP_ITEMS = getItemsFor('domestic')

// /select/esim — 제휴 링크 대기(Airalo) 중 활성 파트너 병행 노출
export const ESIM_ALT_ITEMS = getItemsFor('esim')

// /select/learn — 강의 링크 대기(인프런) 중 활성 파트너 병행 노출
export const LEARN_ALT_ITEMS = getItemsFor('learn')

// 홈 피처드 추천 상품 섹션
export const HOME_FEATURED_ITEMS = getItemsFor('home')
