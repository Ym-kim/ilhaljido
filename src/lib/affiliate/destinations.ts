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
  gradient: string   // Tailwind gradient for card bg (photo 없을 때 fallback)
  photo?: string     // 목적지 실사진 URL (카드 헤더)
  tags: string[]     // 최대 2개
  links: ServiceLink[]
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
    photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    flag: '🍊',
    city: '제주',
    cityEn: 'Jeju',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['국내 워케이션 추천', '자연+카페'],
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
    photo: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=700&q=80',
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
  {
    id: 'japan-kyoto',
    photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=700&q=80',
    flag: '⛩',
    city: '교토',
    cityEn: 'Kyoto',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['전통+카페', '조용한 몰입'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Kyoto',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'japan-okinawa',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    flag: '🏖',
    city: '오키나와',
    cityEn: 'Okinawa',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['휴양+골프', '비치 워크'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Okinawa',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'thailand-chiangmai',
    photo: 'https://images.unsplash.com/photo-1512553353614-82a7370096dc?auto=format&fit=crop&w=700&q=80',
    flag: '🛕',
    city: '치앙마이',
    cityEn: 'Chiang Mai',
    country: '태국',
    gradient: 'from-amber-900/25 to-[#1a1a1a]',
    tags: ['노마드 클래식', '카페 천국'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Chiang+Mai',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'thailand-bangkok',
    photo: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=700&q=80',
    flag: '🏙',
    city: '방콕',
    cityEn: 'Bangkok',
    country: '태국',
    gradient: 'from-amber-900/25 to-[#1a1a1a]',
    tags: ['코워킹 허브', '미식 천국'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Bangkok',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'vietnam-nhatrang',
    photo: 'https://images.unsplash.com/photo-1617653202545-931490e8d7e7?auto=format&fit=crop&w=700&q=80',
    flag: '🌅',
    city: '나트랑',
    cityEn: 'Nha Trang',
    country: '베트남',
    gradient: 'from-yellow-900/25 to-[#1a1a1a]',
    tags: ['해변 리조트', '가성비'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Nha+Trang',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'philippines-cebu',
    photo: 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=700&q=80',
    flag: '🏝',
    city: '세부',
    cityEn: 'Cebu',
    country: '필리핀',
    gradient: 'from-cyan-900/25 to-[#1a1a1a]',
    tags: ['어학+워케이션', '다이빙'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Cebu',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'taiwan-taipei',
    photo: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=700&q=80',
    flag: '🧋',
    city: '타이베이',
    cityEn: 'Taipei',
    country: '대만',
    gradient: 'from-emerald-900/25 to-[#1a1a1a]',
    tags: ['야시장', '한국 근거리'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Taipei',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'singapore-city',
    photo: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=80',
    flag: '🦁',
    city: '싱가포르',
    cityEn: 'Singapore',
    country: '싱가포르',
    gradient: 'from-indigo-900/25 to-[#1a1a1a]',
    tags: ['비즈니스 허브', '크루즈 출항'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Singapore',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'korea-busan',
    photo: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=700&q=80',
    flag: '🌉',
    city: '부산',
    cityEn: 'Busan',
    country: '국내',
    gradient: 'from-teal-900/25 to-[#1a1a1a]',
    tags: ['도심+바다', '해운대 코워킹'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Busan',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'japan-sapporo',
    photo: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=700&q=80',
    flag: '❄️',
    city: '삿포로',
    cityEn: 'Sapporo',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['여름 시원한 워크', '수프카레'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Sapporo',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'japan-kobe',
    photo: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=700&q=80',
    flag: '⚓',
    city: '고베',
    cityEn: 'Kobe',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['항구 야경', '온천 근교'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Kobe',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'indonesia-ubud',
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80',
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
    ],
  },
  {
    id: 'indonesia-canggu',
    photo: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=700&q=80',
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
    ],
  },
  {
    id: 'australia-sydney',
    photo: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=700&q=80',
    flag: '🎭',
    city: '시드니',
    cityEn: 'Sydney',
    country: '호주',
    gradient: 'from-sky-900/25 to-[#1a1a1a]',
    tags: ['하버 뷰', '프리미엄 인프라'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Sydney',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'australia-melbourne',
    photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80',
    flag: '☕',
    city: '멜버른',
    cityEn: 'Melbourne',
    country: '호주',
    gradient: 'from-sky-900/25 to-[#1a1a1a]',
    tags: ['커피 문화', '도심 코워킹'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Melbourne',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'australia-goldcoast',
    photo: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=700&q=80',
    flag: '🌊',
    city: '골드코스트',
    cityEn: 'Gold Coast',
    country: '호주',
    gradient: 'from-sky-900/25 to-[#1a1a1a]',
    tags: ['서퍼 비치', '휴양 워크'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Gold+Coast',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'china-shanghai',
    photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    flag: '🏙',
    city: '상하이',
    cityEn: 'Shanghai',
    country: '중국',
    gradient: 'from-rose-900/25 to-[#1a1a1a]',
    tags: ['비즈니스 허브', '와이탄 야경'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Shanghai',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'china-hongkong',
    photo: 'https://images.unsplash.com/photo-1518599807935-37015b9cefcb?auto=format&fit=crop&w=700&q=80',
    flag: '🌃',
    city: '홍콩',
    cityEn: 'Hong Kong',
    country: '홍콩',
    gradient: 'from-rose-900/25 to-[#1a1a1a]',
    tags: ['금융 허브', '미식 천국'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Hong+Kong',
        label: '숙소 예약',
        emoji: '🛎',
      },
    ],
  },
  {
    id: 'china-guangzhou',
    photo: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=700&q=80',
    flag: '🏮',
    city: '광저우',
    cityEn: 'Guangzhou',
    country: '중국',
    gradient: 'from-rose-900/25 to-[#1a1a1a]',
    tags: ['캔톤페어', '소싱 거점'],
    links: [
      {
        provider: 'Booking.com',
        status: 'active_affiliate',
        href: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Guangzhou',
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
    photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80',
    flag: '🇯🇵',
    city: '일본',
    cityEn: 'Japan',
    country: '일본',
    gradient: 'from-red-900/25 to-[#1a1a1a]',
    tags: ['즉시 개통', 'Softbank·Docomo'],
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
    photo: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=700&q=80',
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
    photo: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=700&q=80',
    emoji: '🤖',
    title: 'AI·업무 자동화',
    desc: 'ChatGPT, n8n, Make.com, Python 자동화. 워케이션 중 생산성을 높이는 AI 도구.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=AI+자동화',
    tags: ['ChatGPT', 'n8n', 'Python', 'Make.com'],
  },
  {
    id: 'learn-marketing',
    photo: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=700&q=80',
    emoji: '📢',
    title: '창업·마케팅·브랜딩',
    desc: '퍼포먼스 마케팅, 브랜드 전략, SNS 운영. 이동 중에 사업을 키우는 실전 강의.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=마케팅',
    tags: ['퍼포먼스 마케팅', 'SNS', '브랜딩', '광고'],
  },
  {
    id: 'learn-productivity',
    photo: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=700&q=80',
    emoji: '⚡',
    title: '생산성·노션·자동화',
    desc: '노션, Obsidian, 제텔카스텐. 워케이션 라이프스타일에 맞는 업무 시스템 구축.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=노션',
    tags: ['노션', 'Obsidian', '업무 시스템', 'GTD'],
  },
  {
    id: 'learn-dev',
    photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80',
    emoji: '💻',
    title: '개발·프로그래밍',
    desc: '웹 개발, 앱 개발, 클라우드. 기술로 워케이션을 더 자유롭게.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&tag=개발',
    tags: ['웹 개발', '앱 개발', 'AWS', 'React'],
  },
  {
    id: 'learn-language',
    photo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80',
    emoji: '🗣',
    title: '언어·커뮤니케이션',
    desc: '영어, 일어, 베트남어. 워케이션 현지에서 바로 쓸 수 있는 언어 강의.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=영어',
    tags: ['영어', '일본어', '베트남어', '비즈니스 영어'],
  },
  {
    id: 'learn-finance',
    photo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=700&q=80',
    emoji: '💰',
    title: '재무·투자·세금',
    desc: '프리랜서·1인 기업 세금, 해외 소득 신고, 투자. 워케이션 비용을 영리하게.',
    status: 'approved_needs_course_links',
    href: 'https://www.inflearn.com/courses?types=ONLINE&s=세금',
    tags: ['세금', '프리랜서 재무', '투자', '회계'],
  },
]
