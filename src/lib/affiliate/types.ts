// ─────────────────────────────────────────────────────────────────────────────
// AffiliateStatus — 각 링크의 현재 상태
//
// ┌─ 가입 전 ────────────────────────────────────────────────────────────────┐
//   placeholder                가입 전. 홈페이지 URL만. rel=noopener.
// ├─ 심사 중 ────────────────────────────────────────────────────────────────┤
//   pending_approval           가입 신청, 심사 결과 대기 중.
// ├─ 승인 완료, 링크 대기 ─────────────────────────────────────────────────────┤
//   approved_needs_link        승인 완료. tracking/deep link 수령 전.
//   approved_needs_course_links 승인 완료. 강의별 파트너 링크 생성 전. (인프런)
//   needs_referral_link        가입 완료. referral link 확인/수령 전. (Airalo)
// ├─ 활성 (수익 발생) ──────────────────────────────────────────────────────┤
//   active_affiliate           tracking link 적용. rel="sponsored". 수익 발생.
//   api_ready                  API/위젯 연동. rel="sponsored". 수익 발생.
// ├─ 기타 ───────────────────────────────────────────────────────────────────┤
//   manual_link                비제휴 외부 링크 (콘텐츠 목적).
//   coming_soon                보류/미오픈. 섹션에서 자동 제외.
// └──────────────────────────────────────────────────────────────────────────┘
//
// 운영자 다음 액션:
//   approved_needs_link        → 파트너 도구에서 tracking link 생성 후 개발팀 전달
//   approved_needs_course_links → 인프런 파트너스에서 강의별 링크 생성 후 전달
//   needs_referral_link        → 파트너스 대시보드에서 referral link 복사 후 전달
//   → 전달 시: href=실제링크, trackingId=파트너ID, status='active_affiliate'
//
// Google Sheet 연동: id | name | category | status | href | trackingId | badge | deepLinks(JSON)
// ─────────────────────────────────────────────────────────────────────────────

export type AffiliateStatus =
  | 'placeholder'                 // 가입 전 — 홈페이지 URL만 사용
  | 'public_external_link'        // 비제휴 외부 링크 (클릭 가능, 수익 추적 없음)
  | 'pending_approval'            // 가입 신청, 심사 결과 대기
  | 'approved_needs_link'         // 승인 완료, tracking/deep link 수령 전
  | 'approved_needs_course_links' // 승인 완료, 강의별 파트너 링크 생성 전 (인프런)
  | 'needs_referral_link'         // 가입 완료, referral link 확인/수령 전 (Airalo)
  | 'active_affiliate'            // tracking link 적용, rel="sponsored", 수익 발생
  | 'manual_link'                 // 비제휴 외부 링크 (레거시 — public_external_link 사용 권장)
  | 'api_ready'                   // API/위젯 연동, rel="sponsored", 수익 발생
  | 'coming_soon'                 // 보류/미오픈, 섹션 자동 제외

// ─── 상품 유형 ────────────────────────────────────────────────────────────────
export type ProductType =
  | 'stay'
  | 'activity'
  | 'transport'
  | 'esim'
  | 'insurance'
  | 'education'
  | 'visa'
  | 'workspace'

// ─── 노출 페이지 ──────────────────────────────────────────────────────────────
export type ShowOnPage =
  | 'home'     // 홈 피처드 섹션
  | 'select'
  | 'programs'
  | 'global'
  | 'market'
  | 'visa'
  | 'domestic' // /programs/domestic 하단 섹션
  | 'esim'     // /select/esim 활성 파트너 병행 섹션
  | 'learn'    // /select/learn 활성 파트너 병행 섹션

// ─── 카테고리 (레거시 — ProductType 사용 권장) ────────────────────────────────
export type AffiliateCategory =
  | 'hotel'
  | 'activity'
  | 'transport'
  | 'esim'
  | 'insurance'
  | 'education'
  | 'visa'

export interface AffiliateDeepLinks {
  [destination: string]: string
}

// ─── 가격 표시 정책 (docs/PRICE_POLICY.md, 2026-07-27) ────────────────────────
// priceFrom을 표시하려면 실측 기준일(priceAsOf, YYYY-MM-DD)이 반드시 함께 있어야
// 한다 — 아래 유니온이 컴파일 타임에 강제한다. 기준일은 카드에 사용자 노출된다.
// 미충족 상품은 가격 없이 CTA 폴백('실시간 요금 확인' 계열)으로 표시.
export type PricedFields =
  | { priceFrom: string; priceAsOf: string }
  | { priceFrom?: undefined; priceAsOf?: undefined }

// ─── 아이템 인터페이스 ─────────────────────────────────────────────────────────
interface AffiliateItemBase {
  id: string
  name: string
  category: AffiliateCategory
  productType?: ProductType       // 상세 유형 (category보다 세분화)
  status: AffiliateStatus
  emoji: string
  desc: string
  cta: string
  href: string                    // 실제 URL (active_affiliate면 tracking URL)
  badge?: string                  // 카테고리 레이블 칩
  trackingId?: string             // 파트너 ID (공개 안전한 값만)
  deepLinks?: AffiliateDeepLinks
  // ── 기존 추가 필드 ──────────────────────────────────────────────────────────
  displayTitle?: string           // 화면 표시명 (name과 다를 경우)
  priority?: number               // 노출 우선순위 (낮을수록 먼저)
  showOn?: ShowOnPage[]           // 노출 페이지 지정
  sourceNote?: string             // 운영자용 상태 메모

  // ── B2C 상품 표시 필드 ────────────────────────────────────────────────────
  productTitle?: string           // 상품명 (e.g. "도쿄 장기체류 숙소 예약")
  destination?: string            // 목적지 표시 (e.g. "🗼 도쿄 · 일본")
  country?: string                // 국가 (e.g. "일본")
  coverGradient?: string          // 카드 헤더 Tailwind 그라디언트 (사진 없을 때 fallback)
  coverPhoto?: string             // 실제 목적지 사진 URL (visual 모드)
  illustrative?: boolean          // 실제 상품 사진이 아닌 편집·생성 이미지 여부
  rating?: string                 // 실제 평점 표시 (e.g. "8.7" — 리서치로 확인된 값만)
  reviews?: string                // 리뷰 수 표시 (e.g. "2,005")
  operatorAction?: string         // 다음 운영자 액션 요약
}

// priceFrom("₩79,000~")은 PricedFields로 결합 — 기준일 없는 가격은 타입 에러
export type AffiliateItem = AffiliateItemBase & PricedFields
