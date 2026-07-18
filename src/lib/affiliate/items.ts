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

  // ✅ active_affiliate — Allianceid=9024807 적용 완료
  tripcom:    'https://kr.trip.com/?Allianceid=9024807',
  kkday:      'https://www.kkday.com/ko?cid=25833',

  // 🔶 approved_needs_course_links — 강의별 링크 생성 전
  inflearn:   'https://www.inflearn.com',

  // ✅ active_affiliate — Impact 추적 링크 (2026-07-15, ?u= 딥링크 실물검증)
  airalo:     'https://airalo.pxf.io/c/7451946/1268485/15608',

  // ✅ active_affiliate — aid=126848 적용 (2026-07-15)
  klook:      'https://www.klook.com/ko/?aid=126848',

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
    coverPhoto: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
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
    showOn: ['global', 'select', 'programs', 'learn'],
    sourceNote: 'affiliate tracking active — aid=7854081',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 숙소 — Trip.com
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'hotel-tripcom',
    coverPhoto: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=700&q=80',
    name: 'Trip.com',
    category: 'hotel',
    productType: 'stay',
    status: 'active_affiliate',
    emoji: '🏨',
    desc: '숙소·항공·투어를 한 곳에서. 워케이션 목적지별 장기체류 숙소를 검색해보세요.',
    cta: '숙소 찾아보기',
    href: 'https://kr.trip.com/?Allianceid=9024807',
    badge: '숙소·항공',
    trackingId: 'Allianceid=9024807',
    deepLinks: {
      japan:    'https://kr.trip.com/hotels/japan-hotels/?Allianceid=9024807',
      bali:     'https://kr.trip.com/hotels/bali-hotels/?Allianceid=9024807',
      vietnam:  'https://kr.trip.com/hotels/vietnam-hotels/?Allianceid=9024807',
      portugal: 'https://kr.trip.com/hotels/portugal-hotels/?Allianceid=9024807',
    },
    priority: 3,
    showOn: ['global', 'select', 'esim'],
    sourceNote: 'affiliate tracking active — Allianceid=9024807',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 현지 체험 — KKday
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'activity-kkday',
    coverPhoto: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=700&q=80',
    name: 'KKday',
    category: 'activity',
    productType: 'activity',
    status: 'active_affiliate',
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
    showOn: ['global', 'market', 'select', 'programs', 'esim', 'learn'],
    sourceNote: 'KKpartners cid=25833 tracking active (2026-07-09)',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // eSIM — Airalo
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'esim-airalo',
    coverPhoto: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80',
    name: 'Airalo',
    category: 'esim',
    productType: 'esim',
    status: 'active_affiliate',
    emoji: '📡',
    desc: '200개국 eSIM 즉시 구매. 해외 도착 전 스마트폰에 설치, 공항 유심 줄 없이 바로 연결.',
    cta: 'eSIM 구매하기',
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
    trackingId: 'impact 7451946',
    priority: 4,
    showOn: ['global', 'market', 'select'],
    sourceNote: 'Impact 추적 링크 활성 (2026-07-15) — 커미션은 Impact 대시보드에서 확인',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 강의 — 인프런
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'edu-inflearn',
    coverPhoto: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80',
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
  // 현지 체험 — Klook (aid=126848 활성, 2026-07-15)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'activity-klook',
    name: 'Klook',
    category: 'activity',
    productType: 'activity',
    status: 'active_affiliate',
    emoji: '🌿',
    desc: '현지 투어·액티비티·교통패스·입장권. 워케이션 목적지 체험 상품을 큐레이션합니다.',
    cta: '체험 찾아보기',
    href: 'https://www.klook.com/ko/?aid=126848',
    badge: '현지 체험',
    trackingId: 'aid=126848',
    priority: 6,
    showOn: ['select'],
    sourceNote: 'aid=126848 부착 (2026-07-15) — aid 파라미터 형식은 실유통 Klook 어필리에이트 URL로 실물검증. 대시보드 승인·집계 확인 필요',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 여행자보험 — Klook (2026-07-16: 기존 Klook 제휴 재활용, 신규 가입 0. SafetyWing 대체)
  // Klook 코리아가 AIG·Sompo·AXA·FWD 인수 여행자보험 판매, 제휴 보험 IR 5% 카테고리
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'insurance-klook',
    coverPhoto: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80',
    name: 'Klook',
    category: 'insurance',
    productType: 'insurance',
    status: 'active_affiliate',
    emoji: '🛡',
    productTitle: '여행자보험',
    destination: 'AIG·AXA·FWD 인수',
    desc: '워케이션 장기체류엔 여행자보험이 필수. 하루 단위로 가입, 대형 보험사가 인수하는 안심 보장.',
    cta: '여행자보험 보기',
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Finsurance%2Fproducts%2F',
    badge: '여행자보험',
    trackingId: 'aid=126848',
    priority: 7,
    showOn: ['visa', 'home', 'select', 'global', 'programs'],
    sourceNote: 'affiliate — Klook aid=126848, 제휴 보험 IR 5% 카테고리. klook.com/ko/insurance/products curl 200 검증 2026-07-16. ⚠️부착 후 대시보드에서 보험 결제 IR 집계 1건 확인 필요',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 비자 컨텍스트 — Booking.com (비자 확인서 용도)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'hotel-booking-visa',
    coverPhoto: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=700&q=80',
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
    coverPhoto: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80',
    name: 'Airalo eSIM',
    category: 'esim',
    productType: 'esim',
    status: 'active_affiliate',
    emoji: '📡',
    desc: '비자 수령 전에도 미리 설치해두면 입국 즉시 데이터 연결 가능. 200개국 커버.',
    cta: 'eSIM 구매하기',
    href: AFFILIATE_BASE.airalo,
    badge: 'eSIM',
    trackingId: 'impact 7451946',
    priority: 2,
    showOn: ['visa'],
    sourceNote: 'Impact 추적 링크 활성 (2026-07-15)',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 시장조사 컨텍스트 — Booking.com
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'hotel-booking-market',
    coverPhoto: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80',
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
    // 시장조사단은 프로그램으로 취급 — 숙소 제휴 연동 제외 (2026-07-15 운영자 지시, showOn에서 market 제거)
    showOn: [],
    sourceNote: 'affiliate tracking active — aid=7854081 (market 노출 중단)',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 국내 워케이션 컨텍스트 — /programs/domestic 하단 (showOn: domestic)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'hotel-booking-domestic',
    coverPhoto: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=700&q=80',
    name: 'Booking.com',
    category: 'hotel',
    productType: 'stay',
    status: 'active_affiliate',
    emoji: '🏖',
    desc: '양양·강릉·제주 등 프로그램 일정 전후로 머물 국내 숙소를 검색해보세요.',
    cta: '국내 숙소 검색',
    href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=South+Korea',
    badge: '국내 숙소',
    trackingId: 'aid=7854081',
    priority: 1,
    showOn: ['domestic'],
    sourceNote: 'affiliate tracking active — aid=7854081 (기존 검증된 searchresults 패턴)',
  },

  {
    id: 'activity-kkday-domestic',
    coverPhoto: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=700&q=80',
    name: 'KKday',
    category: 'activity',
    productType: 'activity',
    status: 'active_affiliate',
    emoji: '🇰🇷',
    desc: '강원·부산·제주 로컬 투어와 입장권. 워케이션 저녁·주말을 채울 국내 체험 상품.',
    cta: '국내 체험 보기',
    href: 'https://www.kkday.com/ko/destination/kr-south-korea?cid=25833',
    badge: '국내 체험',
    trackingId: 'cid=25833',
    priority: 2,
    showOn: ['domestic'],
    sourceNote: 'KKpartners cid=25833 tracking active — 한국 목적지 페이지 WebFetch 실물검증 (2026-07-11)',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 홈 피처드 — 목적지별 추천 상품 (showOn: home)
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'feat-tokyo-hotel',
    name: 'Booking.com',
    category: 'hotel',
    productType: 'stay',
    status: 'active_affiliate',
    emoji: '🗼',
    productTitle: '도쿄 장기체류 숙소',
    destination: '도쿄 · 일본',
    country: '일본',
    desc: '아파트먼트·서비스드 레지던스·비즈니스 호텔. 워케이션에 최적화된 도쿄 숙소.',
    cta: '도쿄 숙소 검색',
    href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Tokyo',
    badge: '장기체류',
    trackingId: 'aid=7854081',
    coverPhoto: '/covers/stay-tokyo-city-real.jpeg',
    coverGradient: 'from-rose-900 via-red-950 to-[#0d0d0d]',
    priority: 1,
    showOn: ['home'],
    sourceNote: 'affiliate tracking active — aid=7854081',
  },

  {
    id: 'feat-osaka-hotel',
    name: 'Trip.com',
    category: 'hotel',
    productType: 'stay',
    status: 'active_affiliate',
    emoji: '🏯',
    productTitle: '오사카 호텔·아파트 예약',
    destination: '오사카 · 일본',
    country: '일본',
    desc: '숙소·항공·투어를 한 곳에서. Trip.com으로 오사카 장기체류 숙소를 검색하세요.',
    cta: '오사카 숙소 검색',
    href: 'https://kr.trip.com/hotels/osaka-hotels-list-219/?Allianceid=9024807',
    badge: '숙소·항공',
    trackingId: 'Allianceid=9024807',
    coverPhoto: '/covers/stay-osaka-city-real.jpeg',
    coverGradient: 'from-amber-900 via-orange-950 to-[#0d0d0d]',
    priority: 2,
    showOn: ['home'],
    sourceNote: 'affiliate tracking active — Allianceid=9024807',
    operatorAction: 'Trip.com 파트너 대시보드에서 오사카 deeplink 생성 후 href 교체',
  },

  {
    id: 'feat-fukuoka-hotel',
    name: 'Booking.com',
    category: 'hotel',
    productType: 'stay',
    status: 'active_affiliate',
    emoji: '🍜',
    productTitle: '후쿠오카 워케이션 숙소',
    destination: '후쿠오카 · 일본',
    country: '일본',
    desc: '텐진·하카타 비즈니스 호텔·서비스드 아파트. 한국에서 가장 가까운 해외 워케이션 도시.',
    cta: '후쿠오카 숙소 검색',
    href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Fukuoka',
    badge: '장기체류',
    trackingId: 'aid=7854081',
    coverPhoto: '/covers/stay-fukuoka-city-real.jpeg',
    coverGradient: 'from-pink-900 via-rose-950 to-[#0d0d0d]',
    priority: 3,
    showOn: ['home'],
    sourceNote: 'affiliate tracking active — aid=7854081',
  },

  {
    id: 'feat-bali-hotel',
    name: 'Booking.com',
    category: 'hotel',
    productType: 'stay',
    status: 'active_affiliate',
    emoji: '🌴',
    productTitle: '발리 빌라·리조트 예약',
    destination: '발리 · 인도네시아',
    country: '인도네시아',
    desc: '우붓·꾸따·스미냑 빌라, 코워킹 숙소, 리조트. 장기체류에 최적화된 발리 숙소.',
    cta: '발리 숙소 검색',
    href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Bali',
    badge: '장기체류',
    trackingId: 'aid=7854081',
    coverPhoto: '/covers/stay-bali-city-real.jpeg',
    coverGradient: 'from-teal-900 via-emerald-950 to-[#0d0d0d]',
    priority: 4,
    showOn: ['home'],
    sourceNote: 'affiliate tracking active — aid=7854081',
  },

  {
    id: 'feat-japan-activity',
    name: 'KKday',
    category: 'activity',
    productType: 'activity',
    status: 'active_affiliate',
    emoji: '🎌',
    productTitle: '일본 현지 투어·액티비티',
    destination: '일본 전역',
    country: '일본',
    desc: '도쿄·오사카·후쿠오카 현지 투어, 교통패스, 입장권. 워케이션 목적지별 체험 상품.',
    cta: '체험 둘러보기',
    href: 'https://www.kkday.com/ko/destination/jp-japan?cid=25833',
    badge: '현지 체험',
    trackingId: 'cid=25833',
    coverPhoto: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
    coverGradient: 'from-red-900 via-rose-950 to-[#0d0d0d]',
    priority: 5,
    showOn: ['home'],
    sourceNote: 'KKpartners cid=25833 tracking active (2026-07-09)',
    operatorAction: 'KKpartners cid=25833 적용 완료 (2026-07-09)',
  },

  {
    id: 'feat-japan-esim',
    name: 'Airalo',
    category: 'esim',
    productType: 'esim',
    status: 'active_affiliate',
    emoji: '📡',
    productTitle: '일본 eSIM 즉시 구매',
    destination: '일본',
    country: '일본',
    desc: '일본 도착 전 스마트폰에 설치. 무제한·일일 데이터 플랜 선택. 200개국 커버.',
    cta: 'eSIM 구매하기',
    href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim',
    badge: 'eSIM',
    trackingId: 'impact 7451946',
    coverPhoto: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
    coverGradient: 'from-violet-900 via-purple-950 to-[#0d0d0d]',
    priority: 6,
    showOn: ['home'],
    sourceNote: 'Impact 추적 딥링크 활성 (2026-07-15, japan-esim 랜딩 실물검증)',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 항공 — Trip.com (2026-07-09 신설: 활성 파트너로 고단가 항공 커미션 채널 개설)
  // 도시별 노선 페이지는 guides.ts flightUrl 참고 (실물 검증 완료)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'feat-flight-tripcom',
    name: 'Trip.com',
    category: 'transport',
    productType: 'transport',
    status: 'active_affiliate',
    emoji: '✈️',
    productTitle: '항공권 요금 비교·예약',
    destination: '인천·김포 출발 전 노선',
    desc: '워케이션 목적지행 항공권을 항공사별로 비교. 편도·왕복·다구간 실시간 검색.',
    cta: '항공권 요금 비교',
    href: 'https://kr.trip.com/flights/?Allianceid=9024807',
    badge: '항공',
    trackingId: 'Allianceid=9024807',
    coverGradient: 'from-sky-900 via-blue-950 to-[#0d0d0d]',
    priority: 4,
    showOn: ['home', 'select', 'global', 'visa', 'programs', 'esim', 'learn'],
    sourceNote: 'affiliate tracking active — Allianceid=9024807 (flights 랜딩 실물 검증 2026-07-09)',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 렌터카 — Trip.com (2026-07-15: 현지 이동 지출 채널. carhire 랜딩 curl 200 검증)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'feat-carhire-tripcom',
    name: 'Trip.com',
    category: 'transport',
    productType: 'transport',
    status: 'active_affiliate',
    emoji: '🚗',
    productTitle: '렌터카 요금 비교·예약',
    destination: '현지 셀프드라이브',
    desc: '워케이션 현지 이동은 렌터카로. 공항 수령·업체별 실시간 요금 비교.',
    cta: '렌터카 요금 비교',
    href: 'https://kr.trip.com/carhire/?Allianceid=9024807',
    badge: '렌터카',
    trackingId: 'Allianceid=9024807',
    coverPhoto: '/covers/carhire-tripcom-ai.jpeg',
    coverGradient: 'from-emerald-900 via-teal-950 to-[#0d0d0d]',
    priority: 5,
    showOn: ['home', 'select', 'global', 'programs', 'domestic'],
    sourceNote: 'affiliate tracking active — Allianceid=9024807 (carhire 랜딩 curl 200 검증 2026-07-15)',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 공항 픽업·샌딩 — Klook (2026-07-15: airport-transfers 카테고리 실존 검증, aid=126848)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'feat-transfer-klook',
    name: 'Klook',
    category: 'transport',
    productType: 'transport',
    status: 'active_affiliate',
    emoji: '🚐',
    productTitle: '공항 픽업·샌딩 예약',
    destination: '공항 ↔ 숙소 프라이빗 이동',
    desc: '짐 들고 헤매지 않게. 도착 즉시 기사 대기, 도시별 정찰가 프라이빗 픽업.',
    cta: '공항 픽업 예약',
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Fairport-transfers%2F',
    badge: '공항 이동',
    trackingId: 'aid=126848',
    coverPhoto: '/covers/transfer-klook-ai.jpeg',
    coverGradient: 'from-indigo-900 via-violet-950 to-[#0d0d0d]',
    priority: 6,
    showOn: ['home', 'select', 'global', 'programs'],
    sourceNote: 'affiliate tracking — Klook aid=126848 (airport-transfers 카테고리 실존 검증 2026-07-15, 403=봇차단이라 curl 불가)',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 공항 택시 — Booking.com Taxis (2026-07-16: CJ 공지 '택시 4% CPA 신설' 반영)
  // ⚠️ CJ 대시보드의 전용 Taxis 트래킹 링크 수령 시 href 교체 검토 (현재는 표준 aid 방식)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'feat-taxi-booking',
    name: 'Booking.com',
    category: 'transport',
    productType: 'transport',
    status: 'active_affiliate',
    emoji: '🚕',
    productTitle: '공항 택시 예약',
    destination: '전 세계 공항 ↔ 시내',
    desc: '도착 공항에서 숙소까지 사전 확정 요금 택시. 항공편 지연 시 무료 대기.',
    cta: '공항 택시 예약',
    href: 'https://www.booking.com/taxi/index.html?aid=7854081',
    badge: '공항 택시',
    trackingId: 'aid=7854081',
    coverPhoto: '/covers/taxi-booking-ai.jpeg',
    coverGradient: 'from-amber-900 via-yellow-950 to-[#0d0d0d]',
    priority: 8,
    showOn: ['select', 'global', 'programs'],
    sourceNote: 'Booking Taxis — CJ 2026-07-15 공지(택시 4% CPA). booking.com/taxi 202(봇챌린지=생존) 검증. ⚠️CJ 전용 Taxis 트래킹 링크 수령 시 교체 검토',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 공항 라운지 — Klook 인천공항 라운지(출국 전, 한국인 인기). aid=126848
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'feat-lounge-klook',
    name: 'Klook',
    category: 'transport',
    productType: 'transport',
    status: 'active_affiliate',
    emoji: '🛋️',
    productTitle: '인천공항 T1 라운지 패스',
    destination: '스카이허브 라운지 · 서편 24시간',
    desc: '제1터미널 스카이허브 라운지 입장권. 서편 24시간 운영, 식음료·와이파이 — 출국 전 편하게.',
    cta: '라운지 패스 보기',
    href: 'https://affiliate.klook.com/redirect?aid=126848&aff_adid=1342451&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F128530-incheon-international-airport-lounge-pass-terminal-1',
    badge: '공항 라운지',
    trackingId: 'aid=126848',
    coverPhoto: '/covers/lounge-klook-ai.jpeg',
    coverGradient: 'from-rose-900 via-pink-950 to-[#0d0d0d]',
    priority: 7,
    showOn: ['home', 'select', 'global', 'programs'],
    sourceNote: '공식 어필리에이트 리다이렉트(운영자 Product Explorer 생성, aff_adid=1342451, 2026-07-16). activity/128530 T1 라운지 패스 — 스카이허브(서편24h·동편·탑승동) 운영자 확인 정보',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 철도패스 — 일본 전역 JR 패스 (2026-07-18: 장기체류 다도시 이동, 고단가 커미션)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'feat-jrpass-klook',
    name: 'Klook',
    category: 'transport',
    productType: 'transport',
    status: 'active_affiliate',
    emoji: '🚄',
    productTitle: '일본 전역 JR 패스 7·14·21일',
    destination: '신칸센 포함 무제한',
    desc: '2주+ 일본 워케이션의 다도시 이동은 JR 패스가 정답. 신칸센 포함 전국 무제한.',
    cta: 'JR 패스 보기',
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F',
    badge: '철도패스',
    trackingId: 'aid=126848',
    coverGradient: 'from-green-900 via-emerald-950 to-[#0d0d0d]',
    priority: 9,
    showOn: ['global', 'programs', 'select'],
    sourceNote: 'Klook activity/1420 (WebSearch KO확정·403=생존 검증 2026-07-18). 간사이 3276·큐슈 2371·도쿄지하철 1552은 도시 상세(cities.ts railPassHref) 연동',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 포켓와이파이 — 일본 무제한 (eSIM 보완: 노트북 다중기기 워케이셔너)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'feat-wifi-kkday',
    name: 'KKday',
    category: 'esim',
    productType: 'esim',
    status: 'active_affiliate',
    emoji: '📶',
    productTitle: '일본 포켓와이파이 무제한 4G',
    destination: '일본 공항 수령',
    desc: '노트북·폰 여러 대를 하나로. 무제한 데이터 포켓와이파이, 일본 공항에서 바로 수령.',
    cta: '포켓와이파이 보기',
    href: 'https://www.kkday.com/ko/product/146171-unlimited-4g-pocket-wifi-airport-pick-up-japan?cid=25833',
    badge: '포켓와이파이',
    trackingId: 'cid=25833',
    coverGradient: 'from-cyan-900 via-sky-950 to-[#0d0d0d]',
    priority: 10,
    showOn: ['esim', 'global'],
    sourceNote: 'KKday product/146171 (WebSearch KO확정·403=봇챌린지 생존 2026-07-18). eSIM 보완재 — 다중기기·장기체류용',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 철도패스 — 유레일 글로벌 (유럽 33개국, 고단가. 포르투갈 목적지 크로스셀)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'feat-eurail-klook',
    name: 'Klook',
    category: 'transport',
    productType: 'transport',
    status: 'active_affiliate',
    emoji: '🚆',
    productTitle: '유레일 글로벌 패스 (유럽 33개국)',
    destination: '유럽 전역 무제한',
    desc: '유럽 여러 도시를 도는 워케이션이라면 패스 하나로 33개국 열차 무제한. 리스본·포르투 거점 이동에도.',
    cta: '유레일 패스 보기',
    rating: '4.6',
    reviews: '2,533',
    priceFrom: '₩477,300~',
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F9868-eurail-global-rail-pass%2F',
    badge: '철도패스',
    trackingId: 'aid=126848',
    coverGradient: 'from-indigo-900 via-blue-950 to-[#0d0d0d]',
    priority: 11,
    showOn: ['global', 'select'],
    sourceNote: 'Klook activity/9868-eurail-global-rail-pass (WebSearch KO확정·403=생존 검증 2026-07-18). 가격 ₩477,300~=Klook 검색 리스팅 실브라우저 실측(기준 2026-07-19 — 상세 페이지는 옵션 선택 전 미노출). 유럽 33개국 — 포르투갈 목적지 크로스셀',
  },

  {
    id: 'feat-vietnam-hotel',
    name: 'Booking.com',
    category: 'hotel',
    productType: 'stay',
    status: 'active_affiliate',
    emoji: '🌿',
    productTitle: '베트남 호이안·다낭 숙소',
    destination: '다낭 · 베트남',
    country: '베트남',
    desc: '호이안·다낭·하노이 장기체류 숙소. 저렴하고 쾌적한 워케이션 베이스캠프.',
    cta: '베트남 숙소 검색',
    href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Vietnam',
    badge: '장기체류',
    trackingId: 'aid=7854081',
    coverPhoto: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
    coverGradient: 'from-teal-900 via-cyan-950 to-[#0d0d0d]',
    priority: 7,
    showOn: ['home'],
    sourceNote: 'affiliate tracking active — aid=7854081',
  },

  {
    id: 'feat-bali-activity',
    name: 'KKday',
    category: 'activity',
    productType: 'activity',
    status: 'active_affiliate',
    emoji: '🏄',
    productTitle: '발리 현지 투어·체험',
    destination: '발리 · 인도네시아',
    country: '인도네시아',
    desc: '우붓 라이스테라스, 서핑 레슨, 사원 투어. 발리에서만 할 수 있는 체험을 예약하세요.',
    cta: '발리 체험 보기',
    href: 'https://www.kkday.com/ko/destination/id-bali?cid=25833',
    badge: '현지 체험',
    trackingId: 'cid=25833',
    coverPhoto: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80',
    coverGradient: 'from-orange-900 via-amber-950 to-[#0d0d0d]',
    priority: 8,
    showOn: ['home'],
    sourceNote: 'KKpartners cid=25833 tracking active (2026-07-09)',
    operatorAction: 'KKpartners cid=25833 적용 완료 (2026-07-09)',
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
