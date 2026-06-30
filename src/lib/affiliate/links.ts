// ─────────────────────────────────────────────────────────────────────────────
// Wakation Affiliate Links — 중앙 관리 파일
//
// 운영자 가입 후 각 링크를 어필리에이트 트래킹 URL로 교체해주세요.
// 현재 값은 각 서비스 공식 홈페이지 URL입니다.
//
// 교체 방법:
//   Trip.com → kr.trip.com/partners 대시보드 → 링크 생성
//   Booking.com → partners.booking.com 대시보드 → 위젯/링크 생성
//   Klook → affiliate.klook.com/ko 대시보드 → 목적지별 링크 생성
//   KKday → kkpartners.kkday.com 대시보드 → 링크 생성
//   Airalo → airalo.com/affiliate 대시보드 → 레퍼럴 링크 복사
//   SafetyWing → safetywing.com/affiliate 대시보드 → 레퍼럴 링크 복사
//   인프런 → inflearn.com/partners 대시보드 → 링크 생성
// ─────────────────────────────────────────────────────────────────────────────

import type { AffiliateItem } from './types'

// TODO: 운영자 가입 완료 후 아래 URL을 각 어필리에이트 트래킹 URL로 교체
export const AFFILIATE_BASE = {
  tripcom:     'https://kr.trip.com',          // Trip.com 어필리에이트 트래킹 링크로 교체
  booking:     'https://www.booking.com',       // Booking.com 어필리에이트 링크로 교체
  klook:       'https://www.klook.com/ko',      // Klook 어필리에이트 링크로 교체
  kkday:       'https://www.kkday.com/ko',      // KKday 어필리에이트 링크로 교체
  airalo:      'https://www.airalo.com',        // Airalo 레퍼럴 링크로 교체
  safetywing:  'https://safetywing.com/nomad-insurance', // SafetyWing 레퍼럴 링크로 교체
  inflearn:    'https://www.inflearn.com',      // 인프런 파트너스 링크로 교체
} as const

// ─────────────────────────────────────────────────────────────────────────────
// 글로벌 워케이션 준비 — /programs/global 하단 섹션
// ─────────────────────────────────────────────────────────────────────────────
export const GLOBAL_PREP_ITEMS: AffiliateItem[] = [
  {
    id: 'hotel-tripcom',
    name: 'Trip.com',
    category: 'hotel',
    emoji: '🏨',
    desc: '숙소·항공·투어를 한 곳에서. 워케이션 목적지별 장기체류 숙소를 검색해보세요.',
    cta: '숙소 찾아보기',
    href: AFFILIATE_BASE.tripcom,
    badge: '숙소·항공',
  },
  {
    id: 'hotel-booking',
    name: 'Booking.com',
    category: 'hotel',
    emoji: '🛎',
    desc: '전 세계 숙박 예약. 장기체류·아파트먼트·서비스드 레지던스 검색에 적합합니다.',
    cta: '숙소 예약하기',
    href: AFFILIATE_BASE.booking,
    badge: '장기체류',
  },
  {
    id: 'activity-klook',
    name: 'Klook',
    category: 'activity',
    emoji: '🌿',
    desc: '현지 투어·액티비티·교통패스·입장권. 워케이션 목적지 체험 상품을 큐레이션합니다.',
    cta: '체험 찾아보기',
    href: AFFILIATE_BASE.klook,
    badge: '현지 체험',
  },
  {
    id: 'activity-kkday',
    name: 'KKday',
    category: 'activity',
    emoji: '🎌',
    desc: '국내외 투어·문화 체험·티켓. 한국 로컬 체험 및 일본·동남아 상품이 풍부합니다.',
    cta: '체험 예약하기',
    href: AFFILIATE_BASE.kkday,
    badge: '현지 체험',
  },
  {
    id: 'esim-airalo',
    name: 'Airalo',
    category: 'esim',
    emoji: '📡',
    desc: '200개국 eSIM 즉시 구매. 해외 도착 전 스마트폰에 설치, 공항 유심 줄 없이 바로 연결.',
    cta: 'eSIM 구매하기',
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
  },
  {
    id: 'insurance-safetywing',
    name: 'SafetyWing',
    category: 'insurance',
    emoji: '🛡',
    desc: '디지털 노마드·장기체류 여행자를 위한 월 단위 여행자보험. 188개국 커버.',
    cta: '보험 알아보기',
    href: AFFILIATE_BASE.safetywing,
    badge: '여행자보험',
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
    emoji: '📡',
    desc: '200개국 eSIM 즉시 구매. 비자 수령 전에도 미리 설치해두면 입국 즉시 데이터 연결 가능.',
    cta: 'eSIM 구매하기',
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
  },
  {
    id: 'insurance-safetywing-visa',
    name: 'SafetyWing 여행자보험',
    category: 'insurance',
    emoji: '🛡',
    desc: '장기체류·워케이션에 특화된 여행자보험. 일부 비자에서 보험 증명서 요구 시 활용 가능.',
    cta: '보험 알아보기',
    href: AFFILIATE_BASE.safetywing,
    badge: '여행자보험',
  },
  {
    id: 'hotel-tripcom-visa',
    name: 'Trip.com',
    category: 'hotel',
    emoji: '✈️',
    desc: '항공·숙소 예약. 비자 신청 시 필요한 항공권 예약 확인서·숙소 예약 확인서를 발급받을 수 있습니다.',
    cta: '항공·숙소 예약',
    href: AFFILIATE_BASE.tripcom,
    badge: '항공·숙소',
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
    emoji: '🎓',
    desc: 'IT·개발·디자인·비즈니스 강의. 워케이션 이동 중 배우고, 도착해서 바로 적용하세요. 첫 구매 최대 30% 할인.',
    cta: '강의 둘러보기',
    href: AFFILIATE_BASE.inflearn,
    badge: '최대 30% 할인',
  },
]
