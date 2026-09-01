// ─────────────────────────────────────────────────────────────────────────────
// Wakation Select — 목적지별 상품 데이터
//
// 이 파일은 /select/* 페이지용 목적지 데이터를 관리합니다.
// - active_affiliate: tracking link 적용, rel="sponsored"
// - approved_needs_link: 승인 완료, tracking link 수령 전 (공개 URL 임시 사용)
// - needs_referral_link: 가입 완료, referral link 대기 (공개 URL 임시 사용)
//
// 운영자 링크 수령 시: href → 실제 tracking URL, status → 'active_affiliate'
// ─────────────────────────────────────────────────────────────────────────────

import type { AffiliateStatus } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// 서비스 링크 타입
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceLink {
  provider: 'Booking.com' | 'Trip.com' | 'KKday' | 'Klook' | 'Airalo' | '인프런' | 'Agoda'
  status: AffiliateStatus
  href: string
  label: string     // CTA 텍스트: "숙소 예약" | "체험 보기" | "eSIM 구매"
  emoji: string     // 서비스 아이콘
}

// ─────────────────────────────────────────────────────────────────────────────
// 목적지 카드 타입
// ─────────────────────────────────────────────────────────────────────────────

export interface DestinationEntry {
  id: string
  flag: string       // 국가/도시 플래그 이모지
  city: string       // 한국어 도시명
  cityEn: string     // 영문 도시명 (URL 등에 사용)
  country: string    // 한국어 국가명
  gradient: string   // Tailwind gradient for card bg (photo 없을 때 fallback)
  photo?: string     // 목적지 실사진 URL (카드 헤더)
  tags: string[]     // 최대 2개
  links: ServiceLink[]
  /**
   * 가격 비교용 보조 링크 (2026-09-01, 아고다 Phase 2 · 운영자 결정 '정책 C').
   * 대표 CTA는 links에서 뽑은 1개를 유지하고, 이 링크는 카드 하단에 작은 텍스트 링크로만 렌더한다.
   * → 단일 CTA 원칙(2026-07-15)을 깨지 않으면서 비교 파트너 노출을 확보하는 절충안.
   * pickPrimaryLink 대상이 아니며 hasActive 판정에도 넣지 않는다(카드 테두리 강조는 대표 CTA 기준 유지).
   */
  compare?: ServiceLink
}

// ─────────────────────────────────────────────────────────────────────────────
// 강의 카테고리 타입 (/select/learn)
// ─────────────────────────────────────────────────────────────────────────────

export interface LearnCategory {
  id: string
  emoji: string
  photo?: string   // 카드 헤더 사진
  title: string
  desc: string
  status: AffiliateStatus
  href: string    // 인프런 카테고리/검색 URL
  tags: string[]  // 추천 키워드
}

// ─────────────────────────────────────────────────────────────────────────────
// 숙소 허브 — /select/hotel
// ─────────────────────────────────────────────────────────────────────────────

export const HOTEL_DESTINATIONS: DestinationEntry[] = [
  {
    id: 'japan-tokyo',
    photo: '/media/destinations/tokyo-editorial-v1.webp',
    flag: '🗼',
    city: '도쿄',
    cityEn: 'Tokyo',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['장기체류 특화', 'Wi-Fi 완비'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/tokyo-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Tokyo',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/tokyo-hotels-list-228/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-osaka',
    photo: '/media/destinations/osaka-editorial-v1.webp',
    flag: '🏯',
    city: '오사카',
    cityEn: 'Osaka',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['미식 도시', '교통 편리'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/osaka-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Osaka',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/osaka-hotels-list-219/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-fukuoka',
    photo: '/media/destinations/fukuoka-editorial-v1.webp',
    flag: '🍜',
    city: '후쿠오카',
    cityEn: 'Fukuoka',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['한국 근거리', '라멘·포장마차'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/fukuoka-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Fukuoka',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/fukuoka-hotels-list-248/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'vietnam-danang',
    photo: '/media/destinations/danang-editorial-v1.webp',
    flag: '🌊',
    city: '다낭',
    cityEn: 'Da Nang',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    tags: ['해변 코워킹', '무비자 45일'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/da-nang-vn.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Da+Nang',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/da-nang-hotels-list-1356/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'vietnam-hcmc',
    photo: '/media/verified/unsplash/1583417319070-4a69db38a482.webp',
    flag: '🛵',
    city: '호치민',
    cityEn: 'Ho Chi Minh City',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    tags: ['스타트업 허브', '카페 문화'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/ho-chi-minh-city-vn.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Ho+Chi+Minh+City',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — ho-chi-minh-city-hotels-list-301 (2026-07-13 WebFetch 실물검증)
        href: 'https://kr.trip.com/hotels/ho-chi-minh-city-hotels-list-301/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'indonesia-bali',
    photo: '/media/destinations/bali-editorial-v1.webp',
    flag: '🌴',
    city: '발리',
    cityEn: 'Bali',
    country: '인도네시아',
    gradient: 'from-green-900/25 to-[#1a1a1a]',
    tags: ['노마드 메카', '디지털 비자'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/bali-id.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Bali',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — bali-hotels-list-723 (2026-07-26 kr.trip.com 재실물검증: 제목 '발리 호텔 추천',
        // 안다즈 발리 사누르·파드마 리조트 우붓 등 인니 발리 확정. 2026-07-13 '카메룬 Bali' 판정은 현재와 불일치 — 뒤집힘)
        href: 'https://kr.trip.com/hotels/bali-hotels-list-723/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'portugal-lisbon',
    photo: '/media/verified/unsplash/1548707309-dcebeab9ea9b.webp',
    flag: '🌉',
    city: '리스본',
    cityEn: 'Lisbon',
    country: '포르투갈',
    gradient: 'from-blue-900/25 to-[#1a1a1a]',
    tags: ['D8 비자', '유럽 게이트웨이'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/lisbon-pt.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Lisbon',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/lisbon-hotels-list-1231/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'korea-jeju',
    photo: '/covers/dest-jeju-ai.jpeg',
    flag: '🍊',
    city: '제주',
    cityEn: 'Jeju',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['국내 워케이션 추천', '자연+카페'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/jeju-kr.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Jeju',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/jeju-hotels-list-737/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'korea-yangyang',
    photo: '/media/verified/unsplash/1502680390469-be75c86b636f.webp',
    flag: '🏄',
    city: '양양',
    cityEn: 'Yangyang',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['서퍼 성지', '동해 뷰'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/yangyang-kr.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Yangyang',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/yangyang-hotels-list-6430/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'korea-gangneung',
    photo: '/media/verified/unsplash/1473116763249-2faaef81ccda.webp',
    flag: '🌊',
    city: '강릉',
    cityEn: 'Gangneung',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['해변 뷰', '카페거리'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Gangneung',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — gangneung-si-hotels-list-61325 (2026-07-26 kr.trip.com 실물검증)
        // ⚠️ kr 로케일은 '-si' 접미 슬러그 필수 — gangneung-hotels-list-61325는 404 실측
        href: 'https://kr.trip.com/hotels/gangneung-si-hotels-list-61325/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-kyoto',
    photo: '/media/verified/unsplash/1545569341-9eb8b30979d9.webp',
    flag: '⛩',
    city: '교토',
    cityEn: 'Kyoto',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['전통+카페', '조용한 몰입'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/kyoto-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Kyoto',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/kyoto-hotels-list-734/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-okinawa',
    photo: '/media/verified/unsplash/1507525428034-b723cf961d3e.webp',
    flag: '🏖',
    city: '오키나와',
    cityEn: 'Okinawa',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['휴양+골프', '비치 워크'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/okinawa-main-island-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Okinawa',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — okinawa-hotels-list-207 (2026-07-13 WebFetch 실물검증)
        href: 'https://kr.trip.com/hotels/okinawa-hotels-list-207/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'thailand-chiangmai',
    photo: '/media/destinations/chiangmai-editorial-v1.webp',
    flag: '🛕',
    city: '치앙마이',
    cityEn: 'Chiang Mai',
    country: '태국',
    gradient: 'from-amber-900/25 to-[#1a1a1a]',
    tags: ['노마드 클래식', '카페 천국'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/chiang-mai-th.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Chiang+Mai',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/chiang-mai-hotels-list-623/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'thailand-bangkok',
    photo: '/media/verified/unsplash/1508009603885-50cf7c579365.webp',
    flag: '🏙',
    city: '방콕',
    cityEn: 'Bangkok',
    country: '태국',
    gradient: 'from-amber-900/25 to-[#1a1a1a]',
    tags: ['코워킹 허브', '미식 천국'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/bangkok-th.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Bangkok',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/bangkok-hotels-list-359/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'vietnam-nhatrang',
    photo: '/media/verified/unsplash/1617653202545-931490e8d7e7.webp',
    flag: '🌅',
    city: '나트랑',
    cityEn: 'Nha Trang',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    tags: ['해변 리조트', '가성비'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/nha-trang-vn.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Nha+Trang',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — nha-trang-hotels-list-1777 (2026-07-26 kr.trip.com 실물검증)
        // ⚠️ 슬러그는 하이픈 포함 'nha-trang' — 구 nhatrang-…-476은 404 확정(재시도 금지)
        href: 'https://kr.trip.com/hotels/nha-trang-hotels-list-1777/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'philippines-cebu',
    photo: '/media/destinations/cebu-editorial-v1.webp',
    flag: '🏝',
    city: '세부',
    cityEn: 'Cebu',
    country: '필리핀',
    gradient: 'from-cyan-900/25 to-[#1a1a1a]',
    tags: ['어학+워케이션', '다이빙'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/cebu-ph.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Cebu',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — cebu-hotels-list-1239 (2026-07-26 kr.trip.com 실물검증, 세부시티 434개)
        // 구 cebu-…-785는 404 확정(재시도 금지)
        href: 'https://kr.trip.com/hotels/cebu-hotels-list-1239/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'taiwan-taipei',
    photo: '/media/verified/unsplash/1470004914212-05527e49370b.webp',
    flag: '🧋',
    city: '타이베이',
    cityEn: 'Taipei',
    country: '대만',
    gradient: 'from-emerald-900/25 to-[#1a1a1a]',
    tags: ['야시장', '한국 근거리'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/taipei-tw.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Taipei',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/taipei-hotels-list-617/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'singapore-city',
    photo: '/media/verified/unsplash/1525625293386-3f8f99389edd.webp',
    flag: '🦁',
    city: '싱가포르',
    cityEn: 'Singapore',
    country: '싱가포르',
    gradient: 'from-indigo-900/25 to-[#1a1a1a]',
    tags: ['비즈니스 허브', '크루즈 출항'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/singapore-sg.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Singapore',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/singapore-hotels-list-73/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'korea-busan',
    photo: '/media/destinations/busan-editorial-v1.webp',
    flag: '🌉',
    city: '부산',
    cityEn: 'Busan',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['도심+바다', '해운대 코워킹'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/busan-kr.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Busan',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/busan-hotels-list-253/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-sapporo',
    photo: '/covers/dest-sapporo-ai.jpeg',
    flag: '❄️',
    city: '삿포로',
    cityEn: 'Sapporo',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['여름 시원한 워크', '수프카레'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/sapporo-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Sapporo',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — sapporo-hotels-list-641 (2026-07-13 WebFetch 실물검증)
        href: 'https://kr.trip.com/hotels/sapporo-hotels-list-641/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-kobe',
    photo: '/media/verified/unsplash/1756007847785-b3369b87173b.webp',
    flag: '⚓',
    city: '고베',
    cityEn: 'Kobe',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['항구 야경', '온천 근교'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/kobe-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Kobe',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — kobe-hotels-list-423 (2026-07-26 kr.trip.com 실물검증)
        href: 'https://kr.trip.com/hotels/kobe-hotels-list-423/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },

  // ── 일본 소도시 (2026-07-15 테마 신설) — Booking 검색 패턴만 사용(검증된 안전 패턴)
  // 사진: 가와구치코=검증 풀 후지산 / 가나자와=1493780474015 육안 검증(전통 찻집거리) /
  //       유후인=적합 사진 미확보 → gradient 폴백 (추측 배정 금지 원칙)
  {
    id: 'japan-kawaguchiko',
    photo: '/covers/dest-kawaguchiko-real.jpeg',
    flag: '🗻',
    city: '가와구치코',
    cityEn: 'Kawaguchiko',
    country: '일본',
    gradient: 'from-indigo-900/25 to-[#1a1a1a]',
    tags: ['후지산 뷰', '조용한 몰입'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Fujikawaguchiko',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — fujikawaguchiko-hotels-list-50160 (2026-07-26 kr.trip.com 실물검증)
        href: 'https://kr.trip.com/hotels/fujikawaguchiko-hotels-list-50160/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-kanazawa',
    photo: '/covers/dest-kanazawa-real.jpeg',
    flag: '🏮',
    city: '가나자와',
    cityEn: 'Kanazawa',
    country: '일본',
    gradient: 'from-amber-900/25 to-[#1a1a1a]',
    tags: ['전통 거리', '미식 도시'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/kanazawa-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Kanazawa',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — kanazawa-hotels-list-3663 (2026-07-26 kr.trip.com 실물검증)
        href: 'https://kr.trip.com/hotels/kanazawa-hotels-list-3663/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-yufuin',
    photo: '/covers/dest-yufuin-real.jpeg',
    flag: '♨️',
    city: '유후인',
    cityEn: 'Yufuin',
    country: '일본',
    gradient: 'from-emerald-900/25 to-[#1a1a1a]',
    tags: ['온천 마을', '조용한 몰입'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Yufuin',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — yufu-hotels-list-62275 (2026-07-26 kr.trip.com 실물검증)
        // ⚠️ Trip은 유후인을 상위 행정구 '유후(yufu)' 시티로 관리 — 슬러그 yufuin 아님
        href: 'https://kr.trip.com/hotels/yufu-hotels-list-62275/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'indonesia-ubud',
    photo: '/media/verified/unsplash/1544367567-0f2fcb009e0b.webp',
    flag: '🧘',
    city: '우붓',
    cityEn: 'Ubud',
    country: '인도네시아',
    gradient: 'from-green-900/25 to-[#1a1a1a]',
    tags: ['요가 리트릿', '정글 뷰'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Ubud',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 존 딥링크 — kr에서 우붓은 독립 시티 아님(ubud-…-36227 kr 404), 발리 723의 zone424
        // (2026-07-26 kr.trip.com 실물검증: '인기 발리 우붓 호텔', 브레드크럼 인니>발리>우붓)
        href: 'https://kr.trip.com/hotels/bali-hotels-list-723/zone424/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'indonesia-canggu',
    photo: '/covers/dest-canggu-ai.jpeg',
    flag: '🏄',
    city: '짱구',
    cityEn: 'Canggu',
    country: '인도네시아',
    gradient: 'from-green-900/25 to-[#1a1a1a]',
    tags: ['서핑+코워킹', '노마드 카페'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Canggu',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 존 딥링크 — kr에서 짱구는 독립 시티 없음, 발리 723의 zone954
        // (2026-07-26 kr.trip.com 실물검증: '인기 발리 창구 호텔', 브레드크럼 인니>발리>창구)
        href: 'https://kr.trip.com/hotels/bali-hotels-list-723/zone954/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'australia-sydney',
    photo: '/media/destinations/sydney-editorial-v1.webp',
    flag: '🎭',
    city: '시드니',
    cityEn: 'Sydney',
    country: '호주',
    gradient: 'from-sky-900/25 to-[#1a1a1a]',
    tags: ['하버 뷰', '프리미엄 인프라'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/sydney-au.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Sydney',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — sydney-hotels-list-501 (2026-07-26 kr.trip.com 재실물검증: 샹그릴라·포시즌스,
        // 오페라하우스 — 호주 시드니 확정. 2026-07 초 '오하이오 Sidney' 판정은 5경로 교차검증으로 뒤집힘)
        href: 'https://kr.trip.com/hotels/sydney-hotels-list-501/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'australia-melbourne',
    photo: '/media/verified/unsplash/1742643635715-00c577862b56.webp',
    flag: '☕',
    city: '멜버른',
    cityEn: 'Melbourne',
    country: '호주',
    gradient: 'from-sky-900/25 to-[#1a1a1a]',
    tags: ['커피 문화', '도심 코워킹'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/melbourne-au.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Melbourne',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — melbourne-hotels-list-358 (2026-07-26 kr.trip.com 실물검증, AUD 표기.
        // 미국 플로리다 멜버른은 별도 ID melbourne-1-…-4168이라 혼동 없음)
        href: 'https://kr.trip.com/hotels/melbourne-hotels-list-358/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'australia-goldcoast',
    photo: '/covers/dest-goldcoast-ai.jpeg',
    flag: '🌊',
    city: '골드코스트',
    cityEn: 'Gold Coast',
    country: '호주',
    gradient: 'from-sky-900/25 to-[#1a1a1a]',
    tags: ['서퍼 비치', '휴양 워크'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/gold-coast-au.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Gold+Coast',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — gold-coast-hotels-list-1210 (2026-07-26 kr.trip.com 실물검증, 서퍼스 파라다이스)
        href: 'https://kr.trip.com/hotels/gold-coast-hotels-list-1210/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'china-shanghai',
    photo: '/media/verified/unsplash/1584698048102-bbedb5811cba.webp',
    flag: '🏙',
    city: '상하이',
    cityEn: 'Shanghai',
    country: '중국',
    gradient: 'from-rose-900/25 to-[#1a1a1a]',
    tags: ['비즈니스 허브', '와이탄 야경'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/shanghai-cn.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Shanghai',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/shanghai-hotels-list-2/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'china-hongkong',
    photo: '/media/verified/unsplash/1518599807935-37015b9cefcb.webp',
    flag: '🌃',
    city: '홍콩',
    cityEn: 'Hong Kong',
    country: '홍콩',
    gradient: 'from-rose-900/25 to-[#1a1a1a]',
    tags: ['금융 허브', '미식 천국'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/hong-kong-hk.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Hong+Kong',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — hong-kong-hotels-list-58 (2026-07-13 WebFetch 실물검증)
        href: 'https://kr.trip.com/hotels/hong-kong-hotels-list-58/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'china-guangzhou',
    photo: '/covers/dest-guangzhou-ai.jpeg',
    flag: '🏮',
    city: '광저우',
    cityEn: 'Guangzhou',
    country: '중국',
    gradient: 'from-rose-900/25 to-[#1a1a1a]',
    tags: ['캔톤페어', '소싱 거점'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/guangzhou-cn.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Guangzhou',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — guangzhou-hotels-list-32 (2026-07-26 kr.trip.com 실물검증)
        href: 'https://kr.trip.com/hotels/guangzhou-hotels-list-32/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },

  // ── 2026-07-13 지역 그리드 갭 채움 — 새 도시 7종 ──
  // Booking ss= 딥링크(어떤 도시든 유효+aid 추적). 사진은 curl 200 + Read 육안 검증 완료.
  {
    id: 'korea-seoul',
    photo: '/media/destinations/seoul-editorial-v1.webp',
    flag: '🗼',
    city: '서울',
    cityEn: 'Seoul',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['도심 코워킹', '카페 문화'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/seoul-kr.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Seoul',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — seoul-hotels-list-274 (2026-07-13 WebFetch 실물검증)
        href: 'https://kr.trip.com/hotels/seoul-hotels-list-274/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'korea-sokcho',
    photo: '/media/verified/unsplash/1613516392416-1a621fb69004.webp',
    flag: '🌊',
    city: '속초',
    cityEn: 'Sokcho',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['동해 뷰', '온천 근교'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Sokcho',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — sokcho-si-hotels-list-35793 (2026-07-26 kr.trip.com 실물검증, -si 슬러그)
        href: 'https://kr.trip.com/hotels/sokcho-si-hotels-list-35793/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'korea-jeonju',
    // 라이선스 미디어 재사용 (CC BY 4.0, productEditorial.ts 매니페스트 등재)
    photo: '/media/product-editorial/program-jeonju-hanok-licensed-v1.webp',
    flag: '🏮',
    city: '전주',
    cityEn: 'Jeonju',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['한옥 스테이', '미식 도시'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Jeonju',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — jeonju-si-hotels-list-61380 (2026-08-03 kr.trip.com 실물검증: 라한호텔 전주·신라스테이 전주 한옥마을 확인, -si 슬러그)
        href: 'https://kr.trip.com/hotels/jeonju-si-hotels-list-61380/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'korea-yeosu',
    // 라이선스 미디어 재사용 (CC BY 2.0, productEditorial.ts 매니페스트 등재)
    photo: '/media/product-editorial/program-yeosu-harbor-licensed-v1.webp',
    flag: '🌉',
    city: '여수',
    cityEn: 'Yeosu',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['밤바다 야경', '해안 산책로'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Yeosu',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — yeosu-hotels-list-4016 (2026-08-03 kr.trip.com 실물검증: 소노캄 여수·신라스테이 여수 엑스포역 확인. ⚠️-si 접미는 404 — 무접미가 정답인 도시)
        href: 'https://kr.trip.com/hotels/yeosu-hotels-list-4016/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'thailand-phuket',
    photo: '/media/verified/unsplash/1601225612316-b4733315a717.webp',
    flag: '🏝',
    city: '푸켓',
    cityEn: 'Phuket',
    country: '태국',
    gradient: 'from-cyan-900/25 to-[#1a1a1a]',
    tags: ['해변 리조트', '휴양 워크'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/phuket-th.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Phuket',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        href: 'https://kr.trip.com/hotels/phuket-hotels-list-725/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-nagoya',
    photo: '/media/verified/unsplash/1747546314703-6c4fc20c5a37.webp',
    flag: '🏯',
    city: '나고야',
    cityEn: 'Nagoya',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['미식 도시', '교통 편리'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/nagoya-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Nagoya',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — nagoya-hotels-list-360 (2026-07-13 WebFetch 실물검증)
        href: 'https://kr.trip.com/hotels/nagoya-hotels-list-360/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'japan-hiroshima',
    photo: '/media/verified/unsplash/1504109586057-7a2ae83d1338.webp',
    flag: '⛩',
    city: '히로시마',
    cityEn: 'Hiroshima',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['전통 거리', '미식 도시'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/hiroshima-jp.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Hiroshima',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — hiroshima-hotels-list-262 (2026-07-26 kr.trip.com 실물검증)
        href: 'https://kr.trip.com/hotels/hiroshima-hotels-list-262/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'portugal-porto',
    photo: '/media/verified/unsplash/1591040973846-61888c2de010.webp',
    flag: '🍷',
    city: '포르투',
    cityEn: 'Porto',
    country: '포르투갈',
    gradient: 'from-blue-900/25 to-[#1a1a1a]',
    tags: ['유럽 게이트웨이', '커피 문화'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/porto-pt.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Porto',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 시티 딥링크 — porto-hotels-list-826 (2026-07-26 kr.trip.com 실물검증)
        href: 'https://kr.trip.com/hotels/porto-hotels-list-826/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'portugal-faro',
    photo: '/media/verified/unsplash/1712497867605-cd8d80574245.webp',
    flag: '⛵',
    city: '파루',
    cityEn: 'Faro',
    country: '포르투갈',
    gradient: 'from-blue-900/25 to-[#1a1a1a]',
    tags: ['해변 뷰', 'D8 비자'],
    compare: {
      provider: 'Agoda',
      status: 'active_affiliate',
      href: 'https://www.agoda.com/ko-kr/city/faro-pt.html?cid=1968994',
      label: '가격 비교',
      emoji: '🔎',
    },
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Faro',
        label: '숙소 예약',
        emoji: '🛎',
      },
      {
        provider: 'Trip.com',
        status: 'active_affiliate',
        // Trip 쿼리 딥링크 — ⚠️ kr의 faro-hotels-list-840 SEO 페이지는 부탄 파로를 렌더하는 함정(실측).
        // ID 840 자체는 포르투갈 파루가 맞아 list?city=840 형태 사용 (2026-07-26 kr.trip.com 실물검증:
        // Stay Hotel Faro Centro·파루 공항 FAO). searchWord 방식 아님 — city ID 쿼리라 soft-404 무관
        href: 'https://kr.trip.com/hotels/list?city=840&Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 액티비티 허브 — /select/activity
// ─────────────────────────────────────────────────────────────────────────────

export const ACTIVITY_DESTINATIONS: DestinationEntry[] = [
  {
    id: 'activity-japan',
    photo: '/media/verified/unsplash/1528360983277-13d401cdc186.webp',
    flag: '🎌',
    city: '일본 전체',
    cityEn: 'Japan',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['투어·체험·교통패스', '10,000+ 상품'],
    links: [
      {
        provider: 'KKday',
        status: 'active_affiliate',
        href: 'https://www.kkday.com/ko/destination/jp-japan?cid=25833',
        label: '일본 체험 보기',
        emoji: '🎌',
      },
    ],
  },
  {
    id: 'activity-japan-fukuoka',
    photo: '/media/verified/unsplash/1414235077428-338989a2e8c0.webp',
    flag: '🍜',
    city: '후쿠오카',
    cityEn: 'Fukuoka',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['포장마차 투어', '지역 체험'],
    links: [
      {
        provider: 'KKday',
        status: 'active_affiliate',
        href: 'https://www.kkday.com/ko/destination/jp-japan?cid=25833',
        label: '후쿠오카 체험',
        emoji: '🎌',
      },
    ],
  },
  {
    id: 'activity-vietnam',
    photo: '/media/verified/unsplash/1583417319070-4a69db38a482.webp',
    flag: '🌿',
    city: '베트남 전체',
    cityEn: 'Vietnam',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    tags: ['다낭·호치민·하노이', '3,000+ 상품'],
    links: [
      {
        provider: 'KKday',
        status: 'active_affiliate',
        href: 'https://www.kkday.com/ko/destination/vn-vietnam?cid=25833',
        label: '베트남 체험 보기',
        emoji: '🎌',
      },
    ],
  },
  {
    id: 'activity-bali',
    photo: '/media/verified/unsplash/1502680390469-be75c86b636f.webp',
    flag: '🌺',
    city: '발리',
    cityEn: 'Bali',
    country: '인도네시아',
    gradient: 'from-green-900/25 to-[#1a1a1a]',
    tags: ['요가·서핑·투어', '자연 체험'],
    links: [
      {
        provider: 'KKday',
        status: 'active_affiliate',
        href: 'https://www.kkday.com/ko/destination/id-indonesia?cid=25833',
        label: '발리 체험 보기',
        emoji: '🎌',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// eSIM 허브 — /select/esim
// ─────────────────────────────────────────────────────────────────────────────

export const ESIM_DESTINATIONS: DestinationEntry[] = [
  {
    id: 'esim-japan',
    photo: '/media/verified/unsplash/1540959733332-eab4deabeeaf.webp',
    flag: '🇯🇵',
    city: '일본',
    cityEn: 'Japan',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    // 가격 태그: airalo.com/japan-esim 무제한 3일 실측 (기준 2026-07-13, USD 표기로 환율 리스크 회피)
    tags: ['US$11.50~', '즉시 개통', 'Softbank·Docomo'],
    links: [
      {
        provider: 'Airalo',
        status: 'active_affiliate',
        // Impact 추적 딥링크 — ?u= 형식 리다이렉트 실물검증 (japan-esim 랜딩 + irclickid 확인, 2026-07-15)
        href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fjapan-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-vietnam',
    photo: '/media/verified/unsplash/1559592413-7cec4d0cae2b.webp',
    flag: '🇻🇳',
    city: '베트남',
    cityEn: 'Vietnam',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    // 가격 태그: airalo.com/vietnam-esim 무제한 3일 실측 (기준 2026-07-13)
    tags: ['US$11.50~', '데이터 무제한'],
    links: [
      {
        provider: 'Airalo',
        status: 'active_affiliate',
        href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fvietnam-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-indonesia',
    photo: '/media/verified/unsplash/1537996194471-e657df975ab4.webp',
    flag: '🇮🇩',
    city: '인도네시아·발리',
    cityEn: 'Indonesia',
    country: '인도네시아',
    gradient: 'from-green-900/25 to-[#1a1a1a]',
    // 가격 태그: airalo.com/indonesia-esim 무제한 3일 실측 (기준 2026-07-13)
    tags: ['US$11.00~', '발리 전용'],
    links: [
      {
        provider: 'Airalo',
        status: 'active_affiliate',
        href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Findonesia-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-portugal',
    photo: '/media/verified/unsplash/1548707309-dcebeab9ea9b.webp',
    flag: '🇵🇹',
    city: '포르투갈',
    cityEn: 'Portugal',
    country: '포르투갈',
    gradient: 'from-blue-900/25 to-[#1a1a1a]',
    // 가격 태그: airalo.com/portugal-esim 무제한 3일 실측 (기준 2026-07-13)
    tags: ['US$11.50~', '유럽 로밍'],
    links: [
      {
        provider: 'Airalo',
        status: 'active_affiliate',
        href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fportugal-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-korea',
    photo: '/media/verified/unsplash/1517154421773-0529f29ea451.webp',
    flag: '🇰🇷',
    city: '한국',
    cityEn: 'South Korea',
    country: '한국',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    // 가격 태그: airalo.com/south-korea-esim 무제한 3일 실측 (기준 2026-07-13)
    tags: ['US$12.00~', 'SKT·KT'],
    links: [
      {
        provider: 'Airalo',
        status: 'active_affiliate',
        href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fsouth-korea-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-global',
    photo: '/media/verified/unsplash/1488646953014-85cb44e25828.webp',
    flag: '🌍',
    city: '글로벌',
    cityEn: 'Global',
    country: '200개국',
    gradient: 'from-purple-900/25 to-[#1a1a1a]',
    tags: ['단일 eSIM으로 멀티국', '여러 국가 출장'],
    links: [
      {
        provider: 'Airalo',
        status: 'active_affiliate',
        href: 'https://airalo.pxf.io/c/7451946/1268485/15608',
        label: '전체 eSIM 보기',
        emoji: '📡',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 강의 허브 — /select/learn
// ─────────────────────────────────────────────────────────────────────────────

export const LEARN_CATEGORIES: LearnCategory[] = [
  {
    id: 'learn-ai',
    photo: '/media/verified/unsplash/1677442135703-1787eea5ce01.webp',
    emoji: '🤖',
    title: 'AI·업무 자동화',
    desc: 'ChatGPT, n8n, Make.com, Python 자동화. 워케이션 중 생산성을 높이는 AI 도구.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/ko/search?types=ONLINE&s=AI+자동화',
    tags: ['ChatGPT', 'n8n', 'Python', 'Make.com'],
  },
  {
    id: 'learn-marketing',
    photo: '/media/verified/unsplash/1552581234-26160f608093.webp',
    emoji: '📢',
    title: '창업·마케팅·브랜딩',
    desc: '퍼포먼스 마케팅, 브랜드 전략, SNS 운영. 이동 중에 사업을 키우는 실전 강의.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/ko/search?types=ONLINE&s=마케팅',
    tags: ['퍼포먼스 마케팅', 'SNS', '브랜딩', '광고'],
  },
  {
    id: 'learn-productivity',
    photo: '/media/verified/unsplash/1522199755839-a2bacb67c546.webp',
    emoji: '⚡',
    title: '생산성·노션·자동화',
    desc: '노션, Obsidian, 제텔카스텐. 워케이션 라이프스타일에 맞는 업무 시스템 구축.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/ko/search?types=ONLINE&s=노션',
    tags: ['노션', 'Obsidian', '업무 시스템', 'GTD'],
  },
  {
    id: 'learn-dev',
    photo: '/media/verified/unsplash/1497366216548-37526070297c.webp',
    emoji: '💻',
    title: '개발·프로그래밍',
    desc: '웹 개발, 앱 개발, 클라우드. 기술로 워케이션을 더 자유롭게.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/ko/courses?types=ONLINE&tag=개발',
    tags: ['웹 개발', '앱 개발', 'AWS', 'React'],
  },
  {
    id: 'learn-language',
    photo: '/media/verified/unsplash/1503676260728-1c00da094a0b.webp',
    emoji: '🗣',
    title: '언어·커뮤니케이션',
    desc: '영어, 일어, 베트남어. 워케이션 현지에서 바로 쓸 수 있는 언어 강의.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/ko/search?types=ONLINE&s=영어',
    tags: ['영어', '일본어', '베트남어', '비즈니스 영어'],
  },
  {
    id: 'learn-finance',
    photo: '/media/verified/unsplash/1560472354-b33ff0c44a43.webp',
    emoji: '💰',
    title: '재무·투자·세금',
    desc: '프리랜서·1인 기업 세금, 해외 소득 신고, 투자. 워케이션 비용을 영리하게.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/ko/search?types=ONLINE&s=세금',
    tags: ['세금', '프리랜서 재무', '투자', '회계'],
  },
]
