// ─────────────────────────────────────────────────────────────────────────────
// Wakation Affiliate — 마스터 상품 카탈로그
//
// 이 파일이 단일 진실 공급원(single source of truth)입니다.
// links.ts는 이 파일에서 showOn 필터링으로 파생됩니다.
//
// ┌─ 링크 상태별 처리 ──────────────────────────────────────────────────────────┐
// │  active_affiliate        → rel="sponsored noopener noreferrer"            │
// │                            badge="제휴 링크"  수익 추적: active             │
// │  public_external_link    → rel="noopener noreferrer"                      │
// │                            badge="외부 링크"  수익 추적: not active         │
// │  approved_needs_link     → 클릭 가능 (공개 URL 임시), badge="링크 준비중"    │
// │  needs_referral_link     → 클릭 가능 (공개 URL 임시), badge="추천 준비중"    │
// │  pending_approval        → 가능하면 비활성, badge="승인 확인중"              │
// │  coming_soon             → 화면 자동 미노출                                 │
// └────────────────────────────────────────────────────────────────────────────┘
//
// 운영자 액션 (링크 수령 시):
//   1. href → 실제 tracking/referral URL로 교체
//   2. status → 'active_affiliate'
//   3. trackingId → 파트너 ID 입력
//   4. sourceNote → 'affiliate tracking active'
//
// 절대 공유 금지: Client Secret, API Secret, OAuth Secret, Supabase service role key
// 공유 가능: aid 값, partner ID, public tracking URL, widget embed code, deep link
// ─────────────────────────────────────────────────────────────────────────────

import type { AffiliateItem, ShowOnPage } from './types'

// ─── 베이스 URL ───────────────────────────────────────────────────────────────
export const AFFILIATE_BASE = {
  // ✅ active_affiliate — aid=7854081 적용 완료
  booking:    'https://www.booking.com/?aid=7854081',

  // 🔶 approved_needs_link — 승인 완료, tracking link 수령 전
  tripcom:    'https://kr.trip.com',
  kkday:      'https://www.kkday.com/ko',

  // 🔶 approved_needs_course_links — 강의별 링크 생성 전
  inflearn:   'https://www.inflearn.com',

  // 🔶 needs_referral_link — referral link 확인 전
  airalo:     'https://www.airalo.com',

  // ⬜ placeholder — 가입 전
  klook:      'https://www.klook.com/ko',

  // 🔴 coming_soon — 보류
  safetywing: 'https://safetywing.com/nomad-insurance',
} as const

// ─── 마스터 카탈로그 ──────────────────────────────────────────────────────────
export const ALL_AFFILIATE_ITEMS: AffiliateItem[] = [

  // ──────────────────────────────────────────────────────────────────────────
  // 숙소 — Booking.com
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'hotel-booking',
    name: 'Booking.com',
    category: 'hotel',
    productType: 'stay',
    status: 'active_affiliate',
    emoji: '🛎',
    desc: '전 세계 숙박 예약. 장기체류·아파트먼트·서비스드 레지던스 검색에 적합합니다.',
    cta: '숙소 예약하기',
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
    priority: 1,
    showOn: ['global', 'market', 'visa', 'select'],
    sourceNote: 'affiliate tracking active — aid=7854081',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 숙소 — Trip.com
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'hotel-tripcom',
    name: 'Trip.com',
    category: 'hotel',
    productType: 'stay',
    status: 'approved_needs_link',
    emoji: '🏨',
    desc: '숙소·항공·투어를 한 곳에서. 워케이션 목적지별 장기체류 숙소를 검색해보세요.',
    cta: '숙소 찾아보기',
    href: AFFILIATE_BASE.tripcom,
    badge: '숙소·항공',
    trackingId: '',
    deepLinks: {
      japan:    '',
      bali:     '',
      vietnam:  '',
      portugal: '',
    },
    priority: 3,
    showOn: ['global', 'select'],
    sourceNote: 'public URL, tracking not active — operator needs to replace with tracking link from Trip.com partner dashboard',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 현지 체험 — KKday
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'activity-kkday',
    name: 'KKday',
    category: 'activity',
    productType: 'activity',
    status: 'approved_needs_link',
    emoji: '🎌',
    desc: '현지 투어·액티비티·입장권·교통패스. 일본·대만·동남아 체험 상품이 풍부합니다.',
    cta: '체험 예약하기',
    href: AFFILIATE_BASE.kkday,
    badge: '현지 체험',
    trackingId: '',
    deepLinks: {
      japan:   '',
      taiwan:  '',
      bali:    '',
      vietnam: '',
    },
    priority: 2,
    showOn: ['global', 'market', 'select'],
    sourceNote: 'public URL, tracking not active — operator needs to replace with partner deep link from KKpartners dashboard',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // eSIM — Airalo
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'esim-airalo',
    name: 'Airalo',
    category: 'esim',
    productType: 'esim',
    status: 'needs_referral_link',
    emoji: '📡',
    desc: '200개국 eSIM 즉시 구매. 해외 도착 전 스마트폰에 설치, 공항 유심 줄 없이 바로 연결.',
    cta: 'eSIM 구매하기',
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
    trackingId: '',
    priority: 4,
    showOn: ['global', 'market', 'visa', 'select'],
    sourceNote: 'public URL, tracking not active — operator needs to replace with referral link from Airalo partner dashboard',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 강의 — 인프런
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'edu-inflearn',
    name: '인프런',
    category: 'education',
    productType: 'education',
    status: 'approved_needs_course_links',
    emoji: '🎓',
    desc: 'IT·개발·디자인·비즈니스 강의. 워케이션 이동 중 배우고, 도착해서 바로 적용하세요.',
    cta: '강의 둘러보기',
    href: AFFILIATE_BASE.inflearn,
    badge: '온라인 강의',
    trackingId: '',
    priority: 5,
    showOn: ['global', 'programs', 'select'],
    sourceNote: 'public URL, tracking not active — operator needs to generate course-level partner links from 인프런 파트너스',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 현지 체험 — Klook (가입 전)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'activity-klook',
    name: 'Klook',
    category: 'activity',
    productType: 'activity',
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
    priority: 6,
    showOn: ['select'],
    sourceNote: 'public URL, tracking not active — 가입 전 placeholder',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 여행자보험 — SafetyWing (보류)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'insurance-safetywing',
    name: 'SafetyWing',
    category: 'insurance',
    productType: 'insurance',
    status: 'coming_soon',
    emoji: '🛡',
    desc: '디지털 노마드·장기체류 여행자를 위한 월 단위 여행자보험. 188개국 커버.',
    cta: '보험 알아보기',
    href: AFFILIATE_BASE.safetywing,
    badge: '여행자보험',
    trackingId: '',
    priority: 7,
    showOn: ['visa'],
    sourceNote: 'coming_soon — 파트너십 검토 보류',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 비자 컨텍스트 — Booking.com (비자 확인서 용도)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'hotel-booking-visa',
    name: 'Booking.com',
    category: 'hotel',
    productType: 'stay',
    status: 'active_affiliate',
    emoji: '✈️',
    displayTitle: '항공·숙소 예약',
    desc: '비자 신청 시 필요한 항공권·숙소 예약 확인서를 발급받을 수 있습니다.',
    cta: '항공·숙소 예약',
    href: AFFILIATE_BASE.booking,
    badge: '항공·숙소',
    trackingId: 'aid=7854081',
    priority: 1,
    showOn: ['visa'],
    sourceNote: 'affiliate tracking active — aid=7854081',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 비자 컨텍스트 — Airalo eSIM
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'esim-airalo-visa',
    name: 'Airalo eSIM',
    category: 'esim',
    productType: 'esim',
    status: 'needs_referral_link',
    emoji: '📡',
    desc: '비자 수령 전에도 미리 설치해두면 입국 즉시 데이터 연결 가능. 200개국 커버.',
    cta: 'eSIM 구매하기',
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
    trackingId: '',
    priority: 2,
    showOn: ['visa'],
    sourceNote: 'public URL, tracking not active — referral link pending',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 시장조사 컨텍스트 — Booking.com
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'hotel-booking-market',
    name: 'Booking.com',
    category: 'hotel',
    productType: 'stay',
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
    priority: 1,
    showOn: ['market'],
    sourceNote: 'affiliate tracking active — aid=7854081',
  },
]

// ─── 페이지별 필터 헬퍼 ──────────────────────────────────────────────────────
export function getItemsFor(page: ShowOnPage): AffiliateItem[] {
  return ALL_AFFILIATE_ITEMS
    .filter((i) => i.showOn?.includes(page) ?? false)
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
}

// ─── 링크 현황 보고 (운영자용) ────────────────────────────────────────────────
// sourceNote 기준:
//   'affiliate tracking active'           → 수익 추적 중
//   'public URL, tracking not active'     → 공개 URL, 추적 없음
//   'coming_soon'                         → 보류
