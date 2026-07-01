// ─────────────────────────────────────────────────────────────────────────────
// Wakation Affiliate Links — 중앙 관리 파일
//
// 상태(status) 기준:
//   placeholder      → 가입 전. 홈페이지 URL만. 배지/제휴 표시 없이 일반 외부 링크로 노출.
//   pending_approval → 가입 신청 완료. 승인 대기 중. "신청 검토중" 표시.
//   active_affiliate → tracking URL 적용. rel="sponsored". disclosure 표시. 수익 발생.
//   manual_link      → 비제휴 외부 링크. 일반 외부 링크로 노출.
//   coming_soon      → AffiliateSection에서 자동 제외.
//
// 운영자 가입 완료 후 해야 할 일:
//   1. AFFILIATE_BASE의 해당 서비스 URL을 실제 tracking URL로 교체
//   2. status를 'pending_approval' → 'active_affiliate'로 변경
//   3. trackingId에 파트너 ID 입력 (공개 가능, 개발팀 전달 OK)
//   4. 필요 시 deepLinks에 목적지별 딥링크 추가
//   5. 개발팀에 변경 요청 또는 직접 PR 수정
//
// Google Sheet 연동:
//   각 AffiliateItem 필드 = Sheet 컬럼 1:1 대응
//   id | name | status | href | trackingId | badge | deepLinks(JSON)
//   MCP 연동 시 Sheet 값 변경 → links.ts 자동 업데이트 가능
// ─────────────────────────────────────────────────────────────────────────────

import type { AffiliateItem } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// 베이스 URL — 운영자 가입 후 tracking URL로 교체
// ─────────────────────────────────────────────────────────────────────────────
export const AFFILIATE_BASE = {
  // status: placeholder → 가입 후 tracking URL로 교체
  tripcom:    'https://kr.trip.com',
  booking:    'https://www.booking.com',
  klook:      'https://www.klook.com/ko',
  kkday:      'https://www.kkday.com/ko',
  airalo:     'https://www.airalo.com',
  safetywing: 'https://safetywing.com/nomad-insurance',
  inflearn:   'https://www.inflearn.com',
  // active_affiliate 예시 (tracking URL 적용 후):
  // booking: 'https://www.booking.com/?aid=1234567',
  // inflearn: 'https://www.inflearn.com/?aff=WAKXXX',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// 글로벌 워케이션 준비 — /programs/global 하단 섹션
// ─────────────────────────────────────────────────────────────────────────────
export const GLOBAL_PREP_ITEMS: AffiliateItem[] = [
  {
    id: 'hotel-tripcom',
    name: 'Trip.com',
    category: 'hotel',
    status: 'placeholder',             // → 가입 승인 후 'active_affiliate'로 변경
    emoji: '🏨',
    desc: '숙소·항공·투어를 한 곳에서. 워케이션 목적지별 장기체류 숙소를 검색해보세요.',
    cta: '숙소 찾아보기',
    href: AFFILIATE_BASE.tripcom,
    badge: '숙소·항공',
    trackingId: '',                    // 승인 후 파트너 ID 입력 (예: 'WK-TRIP-001')
    deepLinks: {
      japan:    '',                    // 예: 'https://kr.trip.com/hotels/japan/?Allianceid=XXX'
      bali:     '',
      vietnam:  '',
      portugal: '',
    },
  },
  {
    id: 'hotel-booking',
    name: 'Booking.com',
    category: 'hotel',
    status: 'placeholder',
    emoji: '🛎',
    desc: '전 세계 숙박 예약. 장기체류·아파트먼트·서비스드 레지던스 검색에 적합합니다.',
    cta: '숙소 예약하기',
    href: AFFILIATE_BASE.booking,
    badge: '장기체류',
    trackingId: '',                    // 예: 'aid=1234567'
  },
  {
    id: 'activity-klook',
    name: 'Klook',
    category: 'activity',
    status: 'placeholder',
    emoji: '🌿',
    desc: '현지 투어·액티비티·교통패스·입장권. 워케이션 목적지 체험 상품을 큐레이션합니다.',
    cta: '체험 찾아보기',
    href: AFFILIATE_BASE.klook,
    badge: '현지 체험',
    trackingId: '',
    deepLinks: {
      japan:   '',
      bali:    '',
      vietnam: '',
    },
  },
  {
    id: 'activity-kkday',
    name: 'KKday',
    category: 'activity',
    status: 'placeholder',
    emoji: '🎌',
    desc: '국내외 투어·문화 체험·티켓. 한국 로컬 체험 및 일본·동남아 상품이 풍부합니다.',
    cta: '체험 예약하기',
    href: AFFILIATE_BASE.kkday,
    badge: '현지 체험',
    trackingId: '',
  },
  {
    id: 'esim-airalo',
    name: 'Airalo',
    category: 'esim',
    status: 'placeholder',
    emoji: '📡',
    desc: '200개국 eSIM 즉시 구매. 해외 도착 전 스마트폰에 설치, 공항 유심 줄 없이 바로 연결.',
    cta: 'eSIM 구매하기',
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
    trackingId: '',                    // 예: 'referral_code=WAKATION'
  },
  {
    id: 'insurance-safetywing',
    name: 'SafetyWing',
    category: 'insurance',
    status: 'placeholder',
    emoji: '🛡',
    desc: '디지털 노마드·장기체류 여행자를 위한 월 단위 여행자보험. 188개국 커버.',
    cta: '보험 알아보기',
    href: AFFILIATE_BASE.safetywing,
    badge: '여행자보험',
    trackingId: '',                    // 예: 'referral=WAKXXX'
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 비자·체류 준비 — /visa-ai 하단 섹션
// ─────────────────────────────────────────────────────────────────────────────
export const VISA_PREP_ITEMS: AffiliateItem[] = [
  {
    id: 'esim-airalo-visa',
    name: 'Airalo eSIM',
    category: 'esim',
    status: 'placeholder',
    emoji: '📡',
    desc: '200개국 eSIM 즉시 구매. 비자 수령 전에도 미리 설치해두면 입국 즉시 데이터 연결 가능.',
    cta: 'eSIM 구매하기',
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
    trackingId: '',
  },
  {
    id: 'insurance-safetywing-visa',
    name: 'SafetyWing 여행자보험',
    category: 'insurance',
    status: 'placeholder',
    emoji: '🛡',
    desc: '장기체류·워케이션에 특화된 여행자보험. 일부 비자에서 보험 증명서 요구 시 활용 가능.',
    cta: '보험 알아보기',
    href: AFFILIATE_BASE.safetywing,
    badge: '여행자보험',
    trackingId: '',
  },
  {
    id: 'hotel-tripcom-visa',
    name: 'Trip.com',
    category: 'hotel',
    status: 'placeholder',
    emoji: '✈️',
    desc: '항공·숙소 예약. 비자 신청 시 필요한 항공권·숙소 예약 확인서를 발급받을 수 있습니다.',
    cta: '항공·숙소 예약',
    href: AFFILIATE_BASE.tripcom,
    badge: '항공·숙소',
    trackingId: '',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 워케이션 중 성장 — /programs 하단 섹션
// ─────────────────────────────────────────────────────────────────────────────
export const PROGRAMS_LEARN_ITEMS: AffiliateItem[] = [
  {
    id: 'edu-inflearn',
    name: '인프런',
    category: 'education',
    status: 'placeholder',
    emoji: '🎓',
    desc: 'IT·개발·디자인·비즈니스 강의. 워케이션 이동 중 배우고, 도착해서 바로 적용하세요.',
    cta: '강의 둘러보기',
    href: AFFILIATE_BASE.inflearn,
    badge: '외부 서비스',
    trackingId: '',                    // 승인 후: 'inflearn.com/partners' 링크로 교체
  },
]
