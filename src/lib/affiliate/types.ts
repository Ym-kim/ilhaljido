// ─────────────────────────────────────────────────────────────────────────────
// AffiliateStatus — 각 링크의 현재 상태
//
//   placeholder      가입 전. 서비스 홈페이지 URL만 있음. rel=noopener only.
//   pending_approval 가입 신청 완료, 승인 대기 중.
//   active_affiliate 실제 tracking link 적용. rel="sponsored" 사용. 수익 발생.
//   manual_link      트래킹 없는 일반 외부 링크 (비제휴, 콘텐츠 목적).
//   api_ready        API/위젯 연동 완료. rel="sponsored" 사용. 수익 발생.
//   coming_soon      미오픈. 섹션에서 자동 제외됨.
//
// Google Sheet 연동 구조:
//   id | name | category | status | href | trackingId | badge | deepLinks(JSON)
//   MCP로 Sheet → links.ts 자동 동기화 가능 (각 필드가 Sheet 컬럼에 1:1 대응)
// ─────────────────────────────────────────────────────────────────────────────

export type AffiliateStatus =
  | 'placeholder'       // 가입 전 — 홈페이지 URL, 배지·제휴 표시 없음
  | 'pending_approval'  // 가입 완료, 승인 대기 — "신청 검토중" 표시
  | 'active_affiliate'  // tracking link 적용 — "외부 제휴" 배지, disclosure 표시
  | 'manual_link'       // 비제휴 외부 링크 — "외부 링크" 배지
  | 'api_ready'         // API/위젯 연동 완료 — "제휴 API" 배지, disclosure 표시
  | 'coming_soon'       // 미오픈 — AffiliateSection에서 자동 제외

export type AffiliateCategory =
  | 'hotel'
  | 'activity'
  | 'transport'
  | 'esim'
  | 'insurance'
  | 'education'
  | 'visa'

export interface AffiliateDeepLinks {
  [destination: string]: string  // e.g. { japan: 'https://...', bali: 'https://...' }
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
  trackingId?: string           // 파트너 ID (공개 가능, 개발팀 전달 OK)
  deepLinks?: AffiliateDeepLinks // 목적지별 딥링크 (active_affiliate 이후 추가)
}
