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
  | 'placeholder'                // 가입 전
  | 'pending_approval'           // 가입 신청, 심사 대기
  | 'approved_needs_link'        // 승인 완료, tracking/deep link 수령 전
  | 'approved_needs_course_links'// 승인 완료, 강의별 링크 생성 전 (인프런)
  | 'needs_referral_link'        // 가입 완료, referral link 확인 전 (Airalo)
  | 'active_affiliate'           // tracking link 적용, 수익 발생
  | 'manual_link'                // 비제휴 외부 링크
  | 'api_ready'                  // API/위젯 연동, 수익 발생
  | 'coming_soon'                // 보류/미오픈, 섹션 자동 제외

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

export interface AffiliateItem {
  id: string
  name: string
  category: AffiliateCategory
  status: AffiliateStatus
  emoji: string
  desc: string
  cta: string
  href: string
  badge?: string
  trackingId?: string
  deepLinks?: AffiliateDeepLinks
}
