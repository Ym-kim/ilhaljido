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
  provider: 'Booking.com' | 'Trip.com' | 'KKday' | 'Klook' | 'Airalo' | '인프런'
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
  gradient: string   // Tailwind gradient for card bg
  tags: string[]     // 최대 2개
  links: ServiceLink[]
}

// ─────────────────────────────────────────────────────────────────────────────
// 강의 카테고리 타입 (/select/learn)
// ─────────────────────────────────────────────────────────────────────────────

export interface LearnCategory {
  id: string
  emoji: string
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
    flag: '🗼',
    city: '도쿄',
    cityEn: 'Tokyo',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['장기체류 특화', 'Wi-Fi 완비'],
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
    flag: '🏯',
    city: '오사카',
    cityEn: 'Osaka',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['미식 도시', '교통 편리'],
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
    flag: '🍜',
    city: '후쿠오카',
    cityEn: 'Fukuoka',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['한국 근거리', '라멘·포장마차'],
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
    flag: '🌊',
    city: '다낭',
    cityEn: 'Da Nang',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    tags: ['해변 코워킹', '무비자 45일'],
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
    flag: '🛵',
    city: '호치민',
    cityEn: 'Ho Chi Minh City',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    tags: ['스타트업 허브', '카페 문화'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Ho+Chi+Minh+City',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'indonesia-bali',
    flag: '🌴',
    city: '발리',
    cityEn: 'Bali',
    country: '인도네시아',
    gradient: 'from-green-900/25 to-[#1a1a1a]',
    tags: ['노마드 메카', '디지털 비자'],
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
        href: 'https://kr.trip.com/hotels/bali-hotels-list-723/?Allianceid=9024807',
        label: '호텔 보기',
        emoji: '🏨',
      },
    ],
  },
  {
    id: 'portugal-lisbon',
    flag: '🌉',
    city: '리스본',
    cityEn: 'Lisbon',
    country: '포르투갈',
    gradient: 'from-blue-900/25 to-[#1a1a1a]',
    tags: ['D8 비자', '유럽 게이트웨이'],
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
    flag: '🍊',
    city: '제주',
    cityEn: 'Jeju',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['국내 1위 워케이션', '자연+카페'],
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
    flag: '🏄',
    city: '양양',
    cityEn: 'Yangyang',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['서퍼 성지', '동해 뷰'],
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
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 액티비티 허브 — /select/activity
// ─────────────────────────────────────────────────────────────────────────────

export const ACTIVITY_DESTINATIONS: DestinationEntry[] = [
  {
    id: 'activity-japan',
    flag: '🎌',
    city: '일본 전체',
    cityEn: 'Japan',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['투어·체험·교통패스', '10,000+ 상품'],
    links: [
      {
        provider: 'KKday',
        status: 'approved_needs_link',
        href: 'https://www.kkday.com/ko/destination/jp-japan',
        label: '일본 체험 보기',
        emoji: '🎌',
      },
    ],
  },
  {
    id: 'activity-japan-fukuoka',
    flag: '🍜',
    city: '후쿠오카',
    cityEn: 'Fukuoka',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['포장마차 투어', '지역 체험'],
    links: [
      {
        provider: 'KKday',
        status: 'approved_needs_link',
        href: 'https://www.kkday.com/ko/destination/jp-japan',
        label: '후쿠오카 체험',
        emoji: '🎌',
      },
    ],
  },
  {
    id: 'activity-vietnam',
    flag: '🌿',
    city: '베트남 전체',
    cityEn: 'Vietnam',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    tags: ['다낭·호치민·하노이', '3,000+ 상품'],
    links: [
      {
        provider: 'KKday',
        status: 'approved_needs_link',
        href: 'https://www.kkday.com/ko/destination/vn-vietnam',
        label: '베트남 체험 보기',
        emoji: '🎌',
      },
    ],
  },
  {
    id: 'activity-bali',
    flag: '🌺',
    city: '발리',
    cityEn: 'Bali',
    country: '인도네시아',
    gradient: 'from-green-900/25 to-[#1a1a1a]',
    tags: ['요가·서핑·투어', '자연 체험'],
    links: [
      {
        provider: 'KKday',
        status: 'approved_needs_link',
        href: 'https://www.kkday.com/ko/destination/id-indonesia',
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
    flag: '🇯🇵',
    city: '일본',
    cityEn: 'Japan',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['$11.50부터', 'Softbank·Docomo'],
    links: [
      {
        provider: 'Airalo',
        status: 'needs_referral_link',
        href: 'https://www.airalo.com/japan-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-vietnam',
    flag: '🇻🇳',
    city: '베트남',
    cityEn: 'Vietnam',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    tags: ['7일·15일·30일', '데이터 무제한'],
    links: [
      {
        provider: 'Airalo',
        status: 'needs_referral_link',
        href: 'https://www.airalo.com/vietnam-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-indonesia',
    flag: '🇮🇩',
    city: '인도네시아·발리',
    cityEn: 'Indonesia',
    country: '인도네시아',
    gradient: 'from-green-900/25 to-[#1a1a1a]',
    tags: ['발리 전용', '즉시 개통'],
    links: [
      {
        provider: 'Airalo',
        status: 'needs_referral_link',
        href: 'https://www.airalo.com/indonesia-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-portugal',
    flag: '🇵🇹',
    city: '포르투갈',
    cityEn: 'Portugal',
    country: '포르투갈',
    gradient: 'from-blue-900/25 to-[#1a1a1a]',
    tags: ['유럽 로밍', '30일+'],
    links: [
      {
        provider: 'Airalo',
        status: 'needs_referral_link',
        href: 'https://www.airalo.com/portugal-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-korea',
    flag: '🇰🇷',
    city: '한국',
    cityEn: 'South Korea',
    country: '한국',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['귀국 후 단기', 'SKT·KT'],
    links: [
      {
        provider: 'Airalo',
        status: 'needs_referral_link',
        href: 'https://www.airalo.com/south-korea-esim',
        label: 'eSIM 구매',
        emoji: '📡',
      },
    ],
  },
  {
    id: 'esim-global',
    flag: '🌍',
    city: '글로벌',
    cityEn: 'Global',
    country: '200개국',
    gradient: 'from-purple-900/25 to-[#1a1a1a]',
    tags: ['단일 eSIM으로 멀티국', '여러 국가 출장'],
    links: [
      {
        provider: 'Airalo',
        status: 'needs_referral_link',
        href: 'https://www.airalo.com',
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
    emoji: '🤖',
    title: 'AI·업무 자동화',
    desc: 'ChatGPT, n8n, Make.com, Python 자동화. 워케이션 중 생산성을 높이는 AI 도구.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=AI+자동화',
    tags: ['ChatGPT', 'n8n', 'Python', 'Make.com'],
  },
  {
    id: 'learn-marketing',
    emoji: '📢',
    title: '창업·마케팅·브랜딩',
    desc: '퍼포먼스 마케팅, 브랜드 전략, SNS 운영. 이동 중에 사업을 키우는 실전 강의.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=마케팅',
    tags: ['퍼포먼스 마케팅', 'SNS', '브랜딩', '광고'],
  },
  {
    id: 'learn-productivity',
    emoji: '⚡',
    title: '생산성·노션·자동화',
    desc: '노션, Obsidian, 제텔카스텐. 워케이션 라이프스타일에 맞는 업무 시스템 구축.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=노션',
    tags: ['노션', 'Obsidian', '업무 시스템', 'GTD'],
  },
  {
    id: 'learn-dev',
    emoji: '💻',
    title: '개발·프로그래밍',
    desc: '웹 개발, 앱 개발, 클라우드. 기술로 워케이션을 더 자유롭게.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&tag=개발',
    tags: ['웹 개발', '앱 개발', 'AWS', 'React'],
  },
  {
    id: 'learn-language',
    emoji: '🗣',
    title: '언어·커뮤니케이션',
    desc: '영어, 일어, 베트남어. 워케이션 현지에서 바로 쓸 수 있는 언어 강의.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=영어',
    tags: ['영어', '일본어', '베트남어', '비즈니스 영어'],
  },
  {
    id: 'learn-finance',
    emoji: '💰',
    title: '재무·투자·세금',
    desc: '프리랜서·1인 기업 세금, 해외 소득 신고, 투자. 워케이션 비용을 영리하게.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=세금',
    tags: ['세금', '프리랜서 재무', '투자', '회계'],
  },
]
