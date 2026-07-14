// ─────────────────────────────────────────────────────────────────────────────
// 도시 인사이트 데이터 — /destinations/[city] 페이지용
// 2026-07 리서치 기준 (한국 여권, 단기 워케이션 가정)
// ─────────────────────────────────────────────────────────────────────────────

export interface CityInsight {
  id: string          // URL slug (tokyo, bali …)
  city: string        // 한국어 도시명
  cityEn: string
  country: string     // 한국어 국가명
  countryEn: string
  flag: string
  photo: string       // 커버 이미지
  internet: 1 | 2 | 3 | 4 | 5   // ★ rating
  internetNote: string            // '카페·코워킹 100Mbps+'
  costMonthly: string             // '월 130만원대'
  costBreakdown: string           // '숙소 70+식비 30+교통 15+기타'
  bestSeason: string              // '10~3월 (건기)'
  visaFree: string                // '무비자 90일'
  visaCountryKey: string          // content.ts VISA_COUNTRIES value
  timezone: string                // 'UTC+9'
  tags: string[]
  // 수익화 링크
  hotelBookingHref: string        // Booking.com search/hotel URL (aid=7854081)
  hotelTripHref?: string          // Trip.com URL (Allianceid=9024807)
  esimHref: string                // Airalo country page
  activityHref?: string           // KKday destination page
  // 대표 추천 숙소 id (featured.ts FEATURED_STAYS id)
  featuredStayId?: string
  // SEO
  metaDesc: string
}

export const CITY_INSIGHTS: CityInsight[] = [
  {
    id: 'tokyo',
    city: '도쿄',
    cityEn: 'Tokyo',
    country: '일본',
    countryEn: 'Japan',
    flag: '🗼',
    photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    internet: 5,
    internetNote: '카페·코워킹 100Mbps+ 보편화, 포켓와이파이 불필요',
    costMonthly: '월 160만원대',
    costBreakdown: '숙소 90 + 식비 40 + 교통 20 + 기타 10',
    bestSeason: '3~5월, 9~11월',
    visaFree: '무비자 90일',
    visaCountryKey: 'japan',
    timezone: 'UTC+9 (한국과 동일)',
    tags: ['코워킹 밀집', '장기체류 특화', '비자 간편'],
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Tokyo',
    hotelTripHref: 'https://kr.trip.com/hotels/tokyo-hotels-list-180/?Allianceid=9024807',
    esimHref: 'https://www.airalo.com/japan',
    activityHref: 'https://www.kkday.com/ko/destination/jp-japan',
    featuredStayId: 'stay-millennials-shibuya',
    metaDesc: '도쿄 워케이션 완벽 가이드. 무비자 90일, 인터넷 ★★★★★, 월 생활비 160만원대. 코워킹 내장 숙소·체험·eSIM 한눈에.',
  },
  {
    id: 'osaka',
    city: '오사카',
    cityEn: 'Osaka',
    country: '일본',
    countryEn: 'Japan',
    flag: '🏯',
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    internet: 5,
    internetNote: '혼마치·나바에 카페·코워킹 밀집, 광랜 보편화',
    costMonthly: '월 140만원대',
    costBreakdown: '숙소 70 + 식비 35 + 교통 20 + 기타 15',
    bestSeason: '3~5월, 9~11월',
    visaFree: '무비자 90일',
    visaCountryKey: 'japan',
    timezone: 'UTC+9 (한국과 동일)',
    tags: ['도쿄보다 저렴', '음식 천국', '오사카 성'],
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Osaka',
    hotelTripHref: 'https://kr.trip.com/hotels/osaka-hotels-list-219/?Allianceid=9024807',
    esimHref: 'https://www.airalo.com/japan',
    activityHref: 'https://www.kkday.com/ko/destination/jp-japan',
    featuredStayId: 'stay-lively-osaka',
    metaDesc: '오사카 워케이션 완벽 가이드. 도쿄보다 저렴한 월 140만원대, 무비자 90일. 혼마치 코워킹·숙소·eSIM 한눈에.',
  },
  {
    id: 'fukuoka',
    city: '후쿠오카',
    cityEn: 'Fukuoka',
    country: '일본',
    countryEn: 'Japan',
    flag: '⛩',
    photo: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    internet: 5,
    internetNote: '하카타·텐진 스타트업 허브, 코워킹 성장 중',
    costMonthly: '월 120만원대',
    costBreakdown: '숙소 60 + 식비 30 + 교통 15 + 기타 15',
    bestSeason: '3~6월, 9~11월',
    visaFree: '무비자 90일',
    visaCountryKey: 'japan',
    timezone: 'UTC+9 (한국과 동일)',
    tags: ['일본 최저비용', '서울 직항 1h', '소도시 감성'],
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Fukuoka',
    esimHref: 'https://www.airalo.com/japan',
    activityHref: 'https://www.kkday.com/ko/destination/jp-japan',
    featuredStayId: 'stay-webase-hakata',
    metaDesc: '후쿠오카 워케이션 완벽 가이드. 월 120만원대, 서울 직항 1시간, 무비자 90일. 하카타 코워킹 숙소·체험·eSIM.',
  },
  {
    id: 'bali',
    city: '발리',
    cityEn: 'Bali',
    country: '인도네시아',
    countryEn: 'Indonesia',
    flag: '🌴',
    photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    internet: 3,
    internetNote: '짱구·우붓 코워킹 30~50Mbps, 카페 편차 큼',
    costMonthly: '월 100만원대',
    costBreakdown: '숙소 50 + 식비 20 + 교통 15 + 기타 15',
    bestSeason: '4~10월 (건기)',
    visaFree: '무비자 30일 → E33G 비자 60일 연장 가능',
    visaCountryKey: 'indonesia',
    timezone: 'UTC+8 (한국 -1시간)',
    tags: ['노마드 성지', '코워킹 허브', '자연+작업'],
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Bali',
    esimHref: 'https://www.airalo.com/indonesia',
    activityHref: 'https://www.kkday.com/ko/destination/id-bali',
    featuredStayId: 'stay-tribal-bali',
    metaDesc: '발리 워케이션 완벽 가이드. 월 100만원대, 노마드 성지 짱구·우붓. 코워킹 숙소·체험·eSIM 한눈에.',
  },
  {
    id: 'danang',
    city: '다낭',
    cityEn: 'Da Nang',
    country: '베트남',
    countryEn: 'Vietnam',
    flag: '🏖',
    photo: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    internet: 4,
    internetNote: '안트엉 카페 거리 50~80Mbps, 안정적',
    costMonthly: '월 90만원대',
    costBreakdown: '숙소 40 + 식비 20 + 교통 10 + 기타 20',
    bestSeason: '2~8월',
    visaFree: '무비자 45일 (전자입국신고 K-ETA 불필요)',
    visaCountryKey: 'vietnam',
    timezone: 'UTC+7 (한국 -2시간)',
    tags: ['해변 뷰', '동남아 최저비용', '한인 커뮤니티'],
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Da+Nang',
    esimHref: 'https://www.airalo.com/vietnam',
    activityHref: 'https://www.kkday.com/ko/destination/vn-vietnam',
    featuredStayId: 'stay-chicland-danang',
    metaDesc: '다낭 워케이션 완벽 가이드. 월 90만원대, 무비자 45일, 미케 비치 앞 카페 작업. 숙소·체험·eSIM 한눈에.',
  },
  {
    id: 'chiangmai',
    city: '치앙마이',
    cityEn: 'Chiang Mai',
    country: '태국',
    countryEn: 'Thailand',
    flag: '🐘',
    photo: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
    internet: 4,
    internetNote: '님만해민 카페·코워킹 50~100Mbps',
    costMonthly: '월 110만원대',
    costBreakdown: '숙소 50 + 식비 25 + 교통 15 + 기타 20',
    bestSeason: '11~2월 (건기·쾌적)',
    visaFree: '무비자 60일 (태국 DTV 180일 비자 별도)',
    visaCountryKey: 'thailand',
    timezone: 'UTC+7 (한국 -2시간)',
    tags: ['님만 핫플', '저비용 고품질', '디지털 노마드 1번지'],
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Chiang+Mai',
    esimHref: 'https://www.airalo.com/thailand',
    activityHref: 'https://www.kkday.com/ko/destination/th-thailand',
    featuredStayId: 'stay-kantary-chiangmai',
    metaDesc: '치앙마이 워케이션 완벽 가이드. 월 110만원대, 님만해민 코워킹 밀집, 무비자 60일. 숙소·체험·eSIM 한눈에.',
  },
  {
    id: 'cebu',
    city: '세부',
    cityEn: 'Cebu',
    country: '필리핀',
    countryEn: 'Philippines',
    flag: '🏝',
    photo: 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=1200&q=80',
    internet: 3,
    internetNote: '코워킹·코리빙 30~60Mbps, 전용회선 추천',
    costMonthly: '월 95만원대',
    costBreakdown: '숙소 45 + 식비 20 + 교통 10 + 기타 20',
    bestSeason: '12~5월 (건기)',
    visaFree: '무비자 30일 → 비자 연장 최대 1년',
    visaCountryKey: 'philippines',
    timezone: 'UTC+8 (한국 -1시간)',
    tags: ['어학+워케이션', '코리빙 특화', '다이빙 성지'],
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Cebu',
    esimHref: 'https://www.airalo.com/philippines',
    activityHref: 'https://www.kkday.com/ko/destination/ph-philippines',
    featuredStayId: 'stay-nomadshub-cebu',
    metaDesc: '세부 워케이션 완벽 가이드. 월 95만원대, 어학+워케이션 최적. 코리빙·체험·eSIM 한눈에.',
  },
  {
    id: 'sydney',
    city: '시드니',
    cityEn: 'Sydney',
    country: '호주',
    countryEn: 'Australia',
    flag: '🦘',
    photo: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    internet: 5,
    internetNote: 'CBD 코워킹·카페 100Mbps+ 보편화',
    costMonthly: '월 330만원대',
    costBreakdown: '숙소 180 + 식비 70 + 교통 30 + 기타 50',
    bestSeason: '9~11월, 3~5월 (한국의 봄·가을)',
    visaFree: '워킹홀리데이 or ETA 비자 (무비자 아님)',
    visaCountryKey: 'australia',
    timezone: 'UTC+10 (한국 +1시간)',
    tags: ['선진국 인프라', '영어 환경', '글로벌 네트워킹'],
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Sydney',
    esimHref: 'https://www.airalo.com/australia',
    activityHref: 'https://www.kkday.com/ko/destination/au-australia',
    featuredStayId: 'stay-adina-sydney',
    metaDesc: '시드니 워케이션 완벽 가이드. 선진국 인프라, 영어 환경, 인터넷 ★★★★★. 숙소·체험·eSIM 한눈에.',
  },
]

export function getCityById(id: string): CityInsight | undefined {
  return CITY_INSIGHTS.find((c) => c.id === id)
}

export function getCityByName(name: string): CityInsight | undefined {
  return CITY_INSIGHTS.find((c) => c.city === name || c.cityEn.toLowerCase() === name.toLowerCase())
}
