// ─────────────────────────────────────────────────────────────────────────────
// Wakation Affiliate Links — 중앙 관리 파일
//
// 운영자 링크 전달 후 처리 순서:
//   1. AFFILIATE_BASE의 해당 URL을 실제 tracking URL로 교체
//   2. status → 'active_affiliate'
//   3. trackingId에 파트너 ID 입력
//   4. deepLinks에 목적지별 딥링크 추가
//
// 전달해도 되는 값: tracking URL, partner ID, aid 값, deep link, 강의별 링크
// 절대 공유 금지: Client Secret, API Secret, Private Key, OAuth secret
//
// Google Sheet 연동: id | name | category | status | href | trackingId | badge | deepLinks(JSON)
// ─────────────────────────────────────────────────────────────────────────────

import type { AffiliateItem } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// 베이스 URL
// ─────────────────────────────────────────────────────────────────────────────
export const AFFILIATE_BASE = {
  // ✅ active_affiliate
  // NOTE: Booking.com 딥링크 형식: /searchresults.html?aid=7854081&ss={destination}
  // 실제 캠페인 링크는 affiliate.booking.com 파트너 도구에서 생성·검증 후 사용 권장
  booking:    'https://www.booking.com/?aid=7854081',

  // ✅ 승인 완료, tracking link 수령 전 (approved_needs_link)
  tripcom:    'https://kr.trip.com',
  kkday:      'https://www.kkday.com/ko',

  // ✅ 승인 완료, 강의별 링크 생성 전 (approved_needs_course_links)
  inflearn:   'https://www.inflearn.com',

  // ✅ 가입 완료, referral link 확인 전 (needs_referral_link)
  airalo:     'https://www.airalo.com',

  // placeholder — 아직 가입 전
  klook:      'https://www.klook.com/ko',

  // coming_soon — 보류
  safetywing: 'https://safetywing.com/nomad-insurance',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// 글로벌 워케이션 준비 — /programs/global 하단 섹션
// 순서: Booking.com(1) → KKday(2) → Trip.com(3) → Airalo(4) → Klook(5)
// ─────────────────────────────────────────────────────────────────────────────
export const GLOBAL_PREP_ITEMS: AffiliateItem[] = [
  // 1순위: Booking.com — active, 실제 수익 발생
  {
    id: 'hotel-booking',
    name: 'Booking.com',
    category: 'hotel',
    status: 'active_affiliate',
    emoji: '🛎',
    desc: '전 세계 숙박 예약. 장기체류·아파트먼트·서비스드 레지던스 검색에 적합합니다.',
    cta: '숙소 예약하기',
    // NOTE: 딥링크 형식은 affiliate.booking.com에서 검증 권장
    href: AFFILIATE_BASE.booking,
    badge: '장기체류',
    trackingId: 'aid=7854081',
    deepLinks: {
      japan:    'https://www.booking.com/searchresults.html?aid=7854081&ss=Japan',
      vietnam:  'https://www.booking.com/searchresults.html?aid=7854081&ss=Vietnam',
      bali:     'https://www.booking.com/searchresults.html?aid=7854081&ss=Bali',
      portugal: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Portugal',
      korea:    'https://www.booking.com/searchresults.html?aid=7854081&ss=South+Korea',
    },
  },

  // 2순위: KKday — 승인 완료, 파트너 링크 수령 전
  {
    id: 'activity-kkday',
    name: 'KKday',
    category: 'activity',
    status: 'approved_needs_link',
    emoji: '🎌',
    desc: '현지 투어·액티비티·입장권·교통패스. 일본·대만·동남아 체험 상품이 풍부합니다.',
    cta: '체험 예약하기',
    // TODO: KKday 파트너 도구에서 tracking link / deep link 생성 후 교체
    href: AFFILIATE_BASE.kkday,
    badge: '현지 체험',
    trackingId: '',
    deepLinks: {
      japan:   '',
      taiwan:  '',
      bali:    '',
      vietnam: '',
    },
  },

  // 3순위: Trip.com — 승인 완료, tracking link 수령 전
  {
    id: 'hotel-tripcom',
    name: 'Trip.com',
    category: 'hotel',
    status: 'approved_needs_link',
    emoji: '🏨',
    desc: '숙소·항공·투어를 한 곳에서. 워케이션 목적지별 장기체류 숙소를 검색해보세요.',
    cta: '숙소 찾아보기',
    // TODO: Trip.com 파트너 도구에서 tracking link / deep link / widget 확인 후 교체
    href: AFFILIATE_BASE.tripcom,
    badge: '숙소·항공',
    trackingId: '',
    deepLinks: {
      japan:    '',
      bali:     '',
      vietnam:  '',
      portugal: '',
    },
  },

  // 4순위: Airalo — 가입 완료, referral link 확인 전
  {
    id: 'esim-airalo',
    name: 'Airalo',
    category: 'esim',
    status: 'needs_referral_link',
    emoji: '📡',
    desc: '200개국 eSIM 즉시 구매. 해외 도착 전 스마트폰에 설치, 공항 유심 줄 없이 바로 연결.',
    cta: 'eSIM 구매하기',
    // TODO: Airalo 파트너스 대시보드에서 referral link 복사 후 교체
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
    trackingId: '',
  },

  // 5순위: Klook — 가입 전 (승인 확인 후 approved_needs_link로 변경)
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

  // SafetyWing — 보류, 화면 미노출
  {
    id: 'insurance-safetywing',
    name: 'SafetyWing',
    category: 'insurance',
    status: 'coming_soon',
    emoji: '🛡',
    desc: '디지털 노마드·장기체류 여행자를 위한 월 단위 여행자보험. 188개국 커버.',
    cta: '보험 알아보기',
    href: AFFILIATE_BASE.safetywing,
    badge: '여행자보험',
    trackingId: '',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 시장조사·박람회 준비 — /programs/market 하단 섹션
// KKday 현지 체험·투어를 시장조사단 연계로 활용
// ─────────────────────────────────────────────────────────────────────────────
export const MARKET_PREP_ITEMS: AffiliateItem[] = [
  {
    id: 'activity-kkday-market',
    name: 'KKday',
    category: 'activity',
    status: 'approved_needs_link',
    emoji: '🎌',
    desc: '현지 투어·문화 체험·교통패스. 시장조사단 일정 전후 현지 탐방·네트워킹에 활용하세요.',
    cta: '현지 체험 보기',
    // TODO: KKday 파트너 링크 수령 후 교체
    href: AFFILIATE_BASE.kkday,
    badge: '현지 체험',
    trackingId: '',
    deepLinks: {
      japan:   '',
      taiwan:  '',
      vietnam: '',
    },
  },
  {
    id: 'hotel-booking-market',
    name: 'Booking.com',
    category: 'hotel',
    status: 'active_affiliate',
    emoji: '🛎',
    desc: '현지 숙소·아파트먼트 예약. 시장조사 기간 장기체류에 적합한 숙소를 찾아보세요.',
    cta: '숙소 예약하기',
    href: AFFILIATE_BASE.booking,
    badge: '장기체류',
    trackingId: 'aid=7854081',
    deepLinks: {
      japan:   'https://www.booking.com/searchresults.html?aid=7854081&ss=Japan',
      taiwan:  'https://www.booking.com/searchresults.html?aid=7854081&ss=Taiwan',
      vietnam: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Vietnam',
    },
  },
  {
    id: 'esim-airalo-market',
    name: 'Airalo eSIM',
    category: 'esim',
    status: 'needs_referral_link',
    emoji: '📡',
    desc: '200개국 eSIM 즉시 구매. 현지 도착 전 미리 설치해두면 공항에서 바로 인터넷 연결.',
    cta: 'eSIM 구매하기',
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
    trackingId: '',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 비자·체류 준비 — /visa-ai 하단 섹션
// ─────────────────────────────────────────────────────────────────────────────
export const VISA_PREP_ITEMS: AffiliateItem[] = [
  {
    id: 'hotel-booking-visa',
    name: 'Booking.com',
    category: 'hotel',
    status: 'active_affiliate',
    emoji: '✈️',
    desc: '항공·숙소 예약. 비자 신청 시 필요한 항공권·숙소 예약 확인서를 발급받을 수 있습니다.',
    cta: '항공·숙소 예약',
    href: AFFILIATE_BASE.booking,
    badge: '항공·숙소',
    trackingId: 'aid=7854081',
  },
  {
    id: 'esim-airalo-visa',
    name: 'Airalo eSIM',
    category: 'esim',
    status: 'needs_referral_link',
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
    status: 'coming_soon',
    emoji: '🛡',
    desc: '장기체류·워케이션에 특화된 여행자보험. 일부 비자에서 보험 증명서 요구 시 활용 가능.',
    cta: '보험 알아보기',
    href: AFFILIATE_BASE.safetywing,
    badge: '여행자보험',
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
    status: 'approved_needs_course_links',
    emoji: '🎓',
    desc: 'IT·개발·디자인·비즈니스 강의. 워케이션 이동 중 배우고, 도착해서 바로 적용하세요.',
    cta: '강의 둘러보기',
    // TODO: 인프런 파트너스에서 강의별 파트너 링크 생성 후 교체 (강의 3개 이상 권장)
    href: AFFILIATE_BASE.inflearn,
    badge: '온라인 강의',
    trackingId: '',
  },
]
