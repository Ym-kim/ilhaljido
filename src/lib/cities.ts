import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 도시 인사이트 데이터 — /destinations/[city] 페이지용 (KO/EN/JP)
// 2026-07 리서치 기준 (한국 여권, 단기 워케이션 가정)
//
// 표기 원칙: 생활비·시즌은 추정 범위 값(가격 보증 아님). 통화는 ₩(원) 유지.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>
type LArr = Record<Lang, string[]>

export interface CityInsight {
  id: string          // URL slug (tokyo, bali …)
  name: L             // 도시명
  country: L          // 국가명
  flag: string
  photo: string       // 커버 이미지
  internet: 1 | 2 | 3 | 4 | 5   // ★ rating
  internetNote: L            // '카페·코워킹 100Mbps+'
  costMonthly: L             // '월 130만원대'
  costBreakdown: L           // '숙소 70+식비 30+교통 15+기타 (만원)'
  bestSeason: L              // '10~3월 (건기)'
  visaFree: L                // '무비자 90일'
  visaCountryKey: string     // visa-ai 쿼리 키
  timezone: L                // 'UTC+9 (한국과 동일)'
  tags: LArr
  // 수익화 링크
  hotelBookingHref: string        // Booking.com search/hotel URL (aid=7854081)
  hotelTripHref?: string          // Trip.com URL (Allianceid=9024807)
  esimHref: string                // Airalo 추적 링크 (airalo.pxf.io)
  activityHref?: string           // KKday destination page (cid=25833)
  // 대표 추천 숙소 id (featured.ts FEATURED_STAYS id)
  featuredStayId?: string
  // 업무 환경 스펙 칩 — 반드시 featured.ts 해당 숙소 desc의 검증된 내용에서만 도출 (추측 금지)
  workTags?: LArr
  // SEO
  metaDesc: L
}

export const CITY_INSIGHTS: CityInsight[] = [
  {
    id: 'tokyo',
    name: { KO: '도쿄', EN: 'Tokyo', JP: '東京' },
    country: { KO: '일본', EN: 'Japan', JP: '日本' },
    flag: '🗼',
    photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    internet: 5,
    internetNote: {
      KO: '카페·코워킹 100Mbps+ 보편화, 포켓와이파이 불필요',
      EN: 'Cafés & coworking at 100Mbps+ everywhere; no pocket Wi-Fi needed',
      JP: 'カフェ・コワーキングが100Mbps+、ポケットWi-Fi不要',
    },
    costMonthly: { KO: '월 160만원대', EN: '~₩1.6M / month', JP: '月160万ウォン程度' },
    costBreakdown: {
      KO: '숙소 90 + 식비 40 + 교통 20 + 기타 10 (만원)',
      EN: 'Stay 90 + Food 40 + Transit 20 + Other 10 (₩10K units)',
      JP: '宿90＋食40＋交通20＋その他10（万ウォン）',
    },
    bestSeason: { KO: '3~5월, 9~11월', EN: 'Mar–May, Sep–Nov', JP: '3〜5月・9〜11月' },
    visaFree: { KO: '무비자 90일', EN: 'Visa-free 90 days', JP: 'ビザなし90日' },
    visaCountryKey: 'japan',
    timezone: { KO: 'UTC+9 (한국과 동일)', EN: 'UTC+9 (same as Korea)', JP: 'UTC+9（韓国と同じ）' },
    tags: {
      KO: ['코워킹 밀집', '장기체류 특화', '비자 간편'],
      EN: ['Coworking hub', 'Long-stay ready', 'Easy visa'],
      JP: ['コワーキング密集', '長期滞在向き', 'ビザ簡単'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Tokyo',
    hotelTripHref: 'https://kr.trip.com/hotels/tokyo-hotels-list-228/?Allianceid=9024807',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim',
    activityHref: 'https://www.kkday.com/ko/destination/jp-japan?cid=25833',
    featuredStayId: 'stay-millennials-shibuya',
    workTags: {
      KO: ['코워킹 2개 층', '시부야역 6분', '무료 커피'],
      EN: ['2 coworking floors', '6 min to Shibuya', 'Free coffee'],
      JP: ['コワーキング2フロア', '渋谷駅6分', '無料コーヒー'],
    },
    metaDesc: {
      KO: '도쿄 워케이션 완벽 가이드. 무비자 90일, 인터넷 ★★★★★, 월 생활비 160만원대. 코워킹 내장 숙소·체험·eSIM 한눈에.',
      EN: 'Complete Tokyo workation guide. Visa-free 90 days, internet ★★★★★, ~₩1.6M/month. Coworking-equipped stays, activities & eSIM at a glance.',
      JP: '東京ワーケーション完全ガイド。ビザなし90日、ネット★★★★★、月160万ウォン程度。コワーキング内蔵の宿・体験・eSIMを一目で。',
    },
  },
  {
    id: 'osaka',
    name: { KO: '오사카', EN: 'Osaka', JP: '大阪' },
    country: { KO: '일본', EN: 'Japan', JP: '日本' },
    flag: '🏯',
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    internet: 5,
    internetNote: {
      KO: '혼마치·난바에 카페·코워킹 밀집, 광랜 보편화',
      EN: 'Dense cafés & coworking in Honmachi/Namba; fiber everywhere',
      JP: '本町・難波にカフェ・コワーキング密集、光回線普及',
    },
    costMonthly: { KO: '월 140만원대', EN: '~₩1.4M / month', JP: '月140万ウォン程度' },
    costBreakdown: {
      KO: '숙소 70 + 식비 35 + 교통 20 + 기타 15 (만원)',
      EN: 'Stay 70 + Food 35 + Transit 20 + Other 15 (₩10K units)',
      JP: '宿70＋食35＋交通20＋その他15（万ウォン）',
    },
    bestSeason: { KO: '3~5월, 9~11월', EN: 'Mar–May, Sep–Nov', JP: '3〜5月・9〜11月' },
    visaFree: { KO: '무비자 90일', EN: 'Visa-free 90 days', JP: 'ビザなし90日' },
    visaCountryKey: 'japan',
    timezone: { KO: 'UTC+9 (한국과 동일)', EN: 'UTC+9 (same as Korea)', JP: 'UTC+9（韓国と同じ）' },
    tags: {
      KO: ['도쿄보다 저렴', '음식 천국', '오사카 성'],
      EN: ['Cheaper than Tokyo', 'Food paradise', 'Osaka Castle'],
      JP: ['東京より安い', '食の天国', '大阪城'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Osaka',
    hotelTripHref: 'https://kr.trip.com/hotels/osaka-hotels-list-219/?Allianceid=9024807',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim',
    activityHref: 'https://www.kkday.com/ko/destination/jp-japan?cid=25833',
    featuredStayId: 'stay-lively-osaka',
    workTags: {
      KO: ['공용 라운지 7곳', '혼마치 비즈니스가'],
      EN: ['7 work lounges', 'Honmachi business district'],
      JP: ['共用ラウンジ7カ所', '本町ビジネス街'],
    },
    metaDesc: {
      KO: '오사카 워케이션 완벽 가이드. 도쿄보다 저렴한 월 140만원대, 무비자 90일. 혼마치 코워킹·숙소·eSIM 한눈에.',
      EN: 'Complete Osaka workation guide. ~₩1.4M/month (cheaper than Tokyo), visa-free 90 days. Honmachi coworking, stays & eSIM at a glance.',
      JP: '大阪ワーケーション完全ガイド。東京より安い月140万ウォン程度、ビザなし90日。本町のコワーキング・宿・eSIMを一目で。',
    },
  },
  {
    id: 'fukuoka',
    name: { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' },
    country: { KO: '일본', EN: 'Japan', JP: '日本' },
    flag: '⛩',
    photo: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    internet: 5,
    internetNote: {
      KO: '하카타·텐진 스타트업 허브, 코워킹 성장 중',
      EN: 'Hakata/Tenjin startup hub; coworking scene growing',
      JP: '博多・天神のスタートアップ拠点、コワーキング拡大中',
    },
    costMonthly: { KO: '월 120만원대', EN: '~₩1.2M / month', JP: '月120万ウォン程度' },
    costBreakdown: {
      KO: '숙소 60 + 식비 30 + 교통 15 + 기타 15 (만원)',
      EN: 'Stay 60 + Food 30 + Transit 15 + Other 15 (₩10K units)',
      JP: '宿60＋食30＋交通15＋その他15（万ウォン）',
    },
    bestSeason: { KO: '3~6월, 9~11월', EN: 'Mar–Jun, Sep–Nov', JP: '3〜6月・9〜11月' },
    visaFree: { KO: '무비자 90일', EN: 'Visa-free 90 days', JP: 'ビザなし90日' },
    visaCountryKey: 'japan',
    timezone: { KO: 'UTC+9 (한국과 동일)', EN: 'UTC+9 (same as Korea)', JP: 'UTC+9（韓国と同じ）' },
    tags: {
      KO: ['일본 최저비용', '서울 직항 1h', '소도시 감성'],
      EN: ['Cheapest in Japan', '1h from Seoul', 'Small-city charm'],
      JP: ['日本で最安クラス', 'ソウルから1h', '小都市の魅力'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Fukuoka',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim',
    activityHref: 'https://www.kkday.com/ko/destination/jp-japan?cid=25833',
    featuredStayId: 'stay-webase-hakata',
    workTags: {
      KO: ['전용 코워킹(무료)', '테라스', '역 도보 3분'],
      EN: ['Free coworking floor', 'Terrace', '3 min to station'],
      JP: ['専用コワーキング（無料）', 'テラス', '駅徒歩3分'],
    },
    metaDesc: {
      KO: '후쿠오카 워케이션 완벽 가이드. 월 120만원대, 서울 직항 1시간, 무비자 90일. 하카타 코워킹 숙소·체험·eSIM.',
      EN: 'Complete Fukuoka workation guide. ~₩1.2M/month, 1h direct from Seoul, visa-free 90 days. Hakata coworking stays, activities & eSIM.',
      JP: '福岡ワーケーション完全ガイド。月120万ウォン程度、ソウルから直行1時間、ビザなし90日。博多のコワーキング宿・体験・eSIM。',
    },
  },
  {
    id: 'bali',
    name: { KO: '발리', EN: 'Bali', JP: 'バリ' },
    country: { KO: '인도네시아', EN: 'Indonesia', JP: 'インドネシア' },
    flag: '🌴',
    photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    internet: 3,
    internetNote: {
      KO: '짱구·우붓 코워킹 30~50Mbps, 카페 편차 큼',
      EN: 'Canggu/Ubud coworking 30–50Mbps; café speeds vary',
      JP: 'チャング・ウブドのコワーキング30〜50Mbps、カフェは差が大きい',
    },
    costMonthly: { KO: '월 100만원대', EN: '~₩1.0M / month', JP: '月100万ウォン程度' },
    costBreakdown: {
      KO: '숙소 50 + 식비 20 + 교통 15 + 기타 15 (만원)',
      EN: 'Stay 50 + Food 20 + Transit 15 + Other 15 (₩10K units)',
      JP: '宿50＋食20＋交通15＋その他15（万ウォン）',
    },
    bestSeason: { KO: '4~10월 (건기)', EN: 'Apr–Oct (dry season)', JP: '4〜10月（乾季）' },
    visaFree: {
      KO: '무비자 30일 → E33G 비자 60일 연장 가능',
      EN: 'Visa-free 30 days → extend 60 days via E33G',
      JP: 'ビザなし30日 → E33Gビザで60日延長可',
    },
    visaCountryKey: 'indonesia',
    timezone: { KO: 'UTC+8 (한국 -1시간)', EN: 'UTC+8 (Korea −1h)', JP: 'UTC+8（韓国−1時間）' },
    tags: {
      KO: ['노마드 성지', '코워킹 허브', '자연+작업'],
      EN: ['Nomad mecca', 'Coworking hub', 'Nature + work'],
      JP: ['ノマドの聖地', 'コワーキング拠点', '自然＋仕事'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Bali',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Findonesia-esim',
    activityHref: 'https://www.kkday.com/ko/destination/id-bali?cid=25833',
    featuredStayId: 'stay-tribal-bali',
    workTags: {
      KO: ['코워킹 전용 설계', '풀사이드 워크스페이스', '노마드 커뮤니티'],
      EN: ['Built for coworking', 'Poolside workspace', 'Nomad community'],
      JP: ['コワーキング特化設計', 'プールサイド作業空間', 'ノマドコミュニティ'],
    },
    metaDesc: {
      KO: '발리 워케이션 완벽 가이드. 월 100만원대, 노마드 성지 짱구·우붓. 코워킹 숙소·체험·eSIM 한눈에.',
      EN: 'Complete Bali workation guide. ~₩1.0M/month, nomad meccas Canggu & Ubud. Coworking stays, activities & eSIM at a glance.',
      JP: 'バリ・ワーケーション完全ガイド。月100万ウォン程度、ノマドの聖地チャング・ウブド。コワーキング宿・体験・eSIMを一目で。',
    },
  },
  {
    id: 'danang',
    name: { KO: '다낭', EN: 'Da Nang', JP: 'ダナン' },
    country: { KO: '베트남', EN: 'Vietnam', JP: 'ベトナム' },
    flag: '🏖',
    photo: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    internet: 4,
    internetNote: {
      KO: '안트엉 카페 거리 50~80Mbps, 안정적',
      EN: 'An Thuong café strip 50–80Mbps; stable',
      JP: 'アントゥン・カフェ通り50〜80Mbps、安定',
    },
    costMonthly: { KO: '월 90만원대', EN: '~₩900K / month', JP: '月90万ウォン程度' },
    costBreakdown: {
      KO: '숙소 40 + 식비 20 + 교통 10 + 기타 20 (만원)',
      EN: 'Stay 40 + Food 20 + Transit 10 + Other 20 (₩10K units)',
      JP: '宿40＋食20＋交通10＋その他20（万ウォン）',
    },
    bestSeason: { KO: '2~8월', EN: 'Feb–Aug', JP: '2〜8月' },
    visaFree: {
      KO: '무비자 45일 (전자입국신고 K-ETA 불필요)',
      EN: 'Visa-free 45 days',
      JP: 'ビザなし45日',
    },
    visaCountryKey: 'vietnam',
    timezone: { KO: 'UTC+7 (한국 -2시간)', EN: 'UTC+7 (Korea −2h)', JP: 'UTC+7（韓国−2時間）' },
    tags: {
      KO: ['해변 뷰', '동남아 최저비용', '한인 커뮤니티'],
      EN: ['Beach views', 'Lowest cost in SE Asia', 'Korean community'],
      JP: ['ビーチビュー', '東南アジア最安', '韓国人コミュニティ'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Da+Nang',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fvietnam-esim',
    activityHref: 'https://www.kkday.com/ko/destination/vn-vietnam?cid=25833',
    featuredStayId: 'stay-chicland-danang',
    workTags: {
      KO: ['카페형 라운지', '루프탑 풀', '미케비치 2분'],
      EN: ['Café-style lounge', 'Rooftop pool', '2 min to My Khe'],
      JP: ['カフェ風ラウンジ', 'ルーフトッププール', 'ミーケー2分'],
    },
    metaDesc: {
      KO: '다낭 워케이션 완벽 가이드. 월 90만원대, 무비자 45일, 미케 비치 앞 카페 작업. 숙소·체험·eSIM 한눈에.',
      EN: 'Complete Da Nang workation guide. ~₩900K/month, visa-free 45 days, work from cafés by My Khe Beach. Stays, activities & eSIM at a glance.',
      JP: 'ダナン・ワーケーション完全ガイド。月90万ウォン程度、ビザなし45日、ミーケービーチ前のカフェで作業。宿・体験・eSIMを一目で。',
    },
  },
  {
    id: 'chiangmai',
    name: { KO: '치앙마이', EN: 'Chiang Mai', JP: 'チェンマイ' },
    country: { KO: '태국', EN: 'Thailand', JP: 'タイ' },
    flag: '🐘',
    photo: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
    internet: 4,
    internetNote: {
      KO: '님만해민 카페·코워킹 50~100Mbps',
      EN: 'Nimman cafés & coworking 50–100Mbps',
      JP: 'ニマンヘミンのカフェ・コワーキング50〜100Mbps',
    },
    costMonthly: { KO: '월 110만원대', EN: '~₩1.1M / month', JP: '月110万ウォン程度' },
    costBreakdown: {
      KO: '숙소 50 + 식비 25 + 교통 15 + 기타 20 (만원)',
      EN: 'Stay 50 + Food 25 + Transit 15 + Other 20 (₩10K units)',
      JP: '宿50＋食25＋交通15＋その他20（万ウォン）',
    },
    bestSeason: { KO: '11~2월 (건기·쾌적)', EN: 'Nov–Feb (dry & mild)', JP: '11〜2月（乾季・快適）' },
    visaFree: {
      KO: '무비자 60일 (태국 DTV 180일 비자 별도)',
      EN: 'Visa-free 60 days (separate DTV 180-day visa)',
      JP: 'ビザなし60日（DTV180日ビザは別途）',
    },
    visaCountryKey: 'thailand',
    timezone: { KO: 'UTC+7 (한국 -2시간)', EN: 'UTC+7 (Korea −2h)', JP: 'UTC+7（韓国−2時間）' },
    tags: {
      KO: ['님만 핫플', '저비용 고품질', '디지털 노마드 1번지'],
      EN: ['Nimman hotspot', 'Low cost, high quality', 'Nomad capital'],
      JP: ['ニマンの人気エリア', '低コスト高品質', 'ノマドの聖地'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Chiang+Mai',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fthailand-esim',
    activityHref: 'https://www.kkday.com/ko/destination/th-thailand?cid=25833',
    featuredStayId: 'stay-kantary-chiangmai',
    workTags: {
      KO: ['키치넷 객실', '장기체류 특화', '원님만 도보권'],
      EN: ['Kitchenette rooms', 'Long-stay ready', 'Walk to One Nimman'],
      JP: ['キチネット付き客室', '長期滞在特化', 'ワンニマン徒歩圏'],
    },
    metaDesc: {
      KO: '치앙마이 워케이션 완벽 가이드. 월 110만원대, 님만해민 코워킹 밀집, 무비자 60일. 숙소·체험·eSIM 한눈에.',
      EN: 'Complete Chiang Mai workation guide. ~₩1.1M/month, dense Nimman coworking, visa-free 60 days. Stays, activities & eSIM at a glance.',
      JP: 'チェンマイ・ワーケーション完全ガイド。月110万ウォン程度、ニマンヘミンのコワーキング密集、ビザなし60日。宿・体験・eSIMを一目で。',
    },
  },
  {
    id: 'cebu',
    name: { KO: '세부', EN: 'Cebu', JP: 'セブ' },
    country: { KO: '필리핀', EN: 'Philippines', JP: 'フィリピン' },
    flag: '🏝',
    photo: 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=1200&q=80',
    internet: 3,
    internetNote: {
      KO: '코워킹·코리빙 30~60Mbps, 전용회선 추천',
      EN: 'Coworking/coliving 30–60Mbps; dedicated line recommended',
      JP: 'コワーキング・コリビング30〜60Mbps、専用回線推奨',
    },
    costMonthly: { KO: '월 95만원대', EN: '~₩950K / month', JP: '月95万ウォン程度' },
    costBreakdown: {
      KO: '숙소 45 + 식비 20 + 교통 10 + 기타 20 (만원)',
      EN: 'Stay 45 + Food 20 + Transit 10 + Other 20 (₩10K units)',
      JP: '宿45＋食20＋交通10＋その他20（万ウォン）',
    },
    bestSeason: { KO: '12~5월 (건기)', EN: 'Dec–May (dry season)', JP: '12〜5月（乾季）' },
    visaFree: {
      KO: '무비자 30일 → 비자 연장 최대 1년',
      EN: 'Visa-free 30 days → extendable up to 1 year',
      JP: 'ビザなし30日 → 最長1年まで延長可',
    },
    visaCountryKey: 'philippines',
    timezone: { KO: 'UTC+8 (한국 -1시간)', EN: 'UTC+8 (Korea −1h)', JP: 'UTC+8（韓国−1時間）' },
    tags: {
      KO: ['어학+워케이션', '코리빙 특화', '다이빙 성지'],
      EN: ['Study + workation', 'Coliving-friendly', 'Diving mecca'],
      JP: ['語学＋ワーケーション', 'コリビング向き', 'ダイビングの聖地'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Cebu',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fphilippines-esim',
    activityHref: 'https://www.kkday.com/ko/destination/ph-philippines?cid=25833',
    featuredStayId: 'stay-nomadshub-cebu',
    workTags: {
      KO: ['코워킹+코리빙', '핫데스크 포함', '노마드 커뮤니티'],
      EN: ['Coworking + coliving', 'Hot desk included', 'Nomad community'],
      JP: ['コワーキング＋コリビング', 'ホットデスク込み', 'ノマドコミュニティ'],
    },
    metaDesc: {
      KO: '세부 워케이션 완벽 가이드. 월 95만원대, 어학+워케이션 최적. 코리빙·체험·eSIM 한눈에.',
      EN: 'Complete Cebu workation guide. ~₩950K/month, ideal for study + workation. Coliving, activities & eSIM at a glance.',
      JP: 'セブ・ワーケーション完全ガイド。月95万ウォン程度、語学＋ワーケーションに最適。コリビング・体験・eSIMを一目で。',
    },
  },
  {
    id: 'sydney',
    name: { KO: '시드니', EN: 'Sydney', JP: 'シドニー' },
    country: { KO: '호주', EN: 'Australia', JP: 'オーストラリア' },
    flag: '🦘',
    photo: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    internet: 5,
    internetNote: {
      KO: 'CBD 코워킹·카페 100Mbps+ 보편화',
      EN: 'CBD coworking & cafés at 100Mbps+ everywhere',
      JP: 'CBDのコワーキング・カフェが100Mbps+普及',
    },
    costMonthly: { KO: '월 330만원대', EN: '~₩3.3M / month', JP: '月330万ウォン程度' },
    costBreakdown: {
      KO: '숙소 180 + 식비 70 + 교통 30 + 기타 50 (만원)',
      EN: 'Stay 180 + Food 70 + Transit 30 + Other 50 (₩10K units)',
      JP: '宿180＋食70＋交通30＋その他50（万ウォン）',
    },
    bestSeason: {
      KO: '9~11월, 3~5월 (한국의 봄·가을)',
      EN: 'Sep–Nov, Mar–May (Korea’s spring/autumn)',
      JP: '9〜11月・3〜5月（韓国の春・秋）',
    },
    visaFree: {
      KO: '워킹홀리데이 or ETA 비자 (무비자 아님)',
      EN: 'Working Holiday or ETA visa (not visa-free)',
      JP: 'ワーホリまたはETAビザ（ビザなし不可）',
    },
    visaCountryKey: 'australia',
    timezone: { KO: 'UTC+10 (한국 +1시간)', EN: 'UTC+10 (Korea +1h)', JP: 'UTC+10（韓国+1時間）' },
    tags: {
      KO: ['선진국 인프라', '영어 환경', '글로벌 네트워킹'],
      EN: ['First-world infra', 'English-speaking', 'Global networking'],
      JP: ['先進国インフラ', '英語環境', 'グローバル人脈'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Sydney',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Faustralia-esim',
    activityHref: 'https://www.kkday.com/ko/destination/au-australia?cid=25833',
    featuredStayId: 'stay-adina-sydney',
    workTags: {
      KO: ['풀키친 아파트', 'CBD·Town Hall 2분', '실내 수영장'],
      EN: ['Full-kitchen apartment', 'CBD · 2 min to Town Hall', 'Indoor pool'],
      JP: ['フルキッチン', 'CBD・2分', '屋内プール'],
    },
    metaDesc: {
      KO: '시드니 워케이션 완벽 가이드. 선진국 인프라, 영어 환경, 인터넷 ★★★★★. 숙소·체험·eSIM 한눈에.',
      EN: 'Complete Sydney workation guide. First-world infrastructure, English environment, internet ★★★★★. Stays, activities & eSIM at a glance.',
      JP: 'シドニー・ワーケーション完全ガイド。先進国インフラ、英語環境、ネット★★★★★。宿・体験・eSIMを一目で。',
    },
  },
]

export function getCityById(id: string): CityInsight | undefined {
  return CITY_INSIGHTS.find((c) => c.id === id)
}

// hreflang alternates — KO(기본)·EN·JA 로케일 URL 상호 연결 (path 예: '/destinations/tokyo')
const BASE_URL = 'https://www.wakation.kr'
export function cityLanguageAlternates(path: string) {
  return {
    ko: `${BASE_URL}${path}`,
    en: `${BASE_URL}/en${path}`,
    ja: `${BASE_URL}/ja${path}`,
    'x-default': `${BASE_URL}${path}`,
  }
}
