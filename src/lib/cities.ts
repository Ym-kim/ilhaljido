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
  costTier: 'low' | 'mid' | 'high'  // 생활비 정성 등급 (월 환산 기준)
  costBreakdown: L           // '숙소 70+식비 30+교통 15+기타 (만원)'
  bestSeason: L              // '10~3월 (건기)'
  visaFree: L                // '무비자 90일'
  visaCountryKey: string     // visa-ai 쿼리 키
  timezone: L                // 'UTC+9 (한국과 동일)'
  // 기초 정보 (트리플 벤치) — flightTime은 guides.ts 검증값 재사용, plug/payment는 표준 사실
  flightTime: L              // '약 2시간 20분 (인천 직항)'
  plug: L                    // '100V · A형 (어댑터 필요)'
  payment: L                 // '카드 확산 중, 현금 병행'
  tags: LArr
  // 수익화 링크
  hotelBookingHref: string        // Booking.com search/hotel URL (aid=7854081)
  hotelTripHref?: string          // Trip.com URL (Allianceid=9024807)
  esimHref: string                // Airalo 추적 링크 (airalo.pxf.io)
  activityHref?: string           // KKday destination page (cid=25833)
  transferHref?: string           // Klook 도시별 공항픽업 — 공식 리다이렉트(aid=126848&k_site=) 형식
  railPassHref?: string           // 도시 연관 철도패스 (Klook 공식 리다이렉트)
  railPassName?: L                // 패스 이름 (예: 'JR 큐슈 패스')
  // 대표 추천 숙소 id (featured.ts FEATURED_STAYS id)
  featuredStayId?: string
  // 업무 환경 스펙 칩 — 반드시 featured.ts 해당 숙소 desc의 검증된 내용에서만 도출 (추측 금지)
  workTags?: LArr
  // 장단점 — 에디터 작성(기존 검증 데이터 기반). 정직성: 단점도 솔직하게 (NomadList 벤치)
  pros: LArr
  cons: LArr
  // SEO
  metaDesc: L
}

// 인터넷 점수(1~5) → 정성 라벨 (NomadList '숫자+정성' 문법). 데이터 재포장, 신규 입력 0
export const INTERNET_LABEL: Record<1 | 2 | 3 | 4 | 5, L> = {
  5: { KO: '화상회의 쾌적', EN: 'Great for video calls', JP: 'ビデオ会議も快適' },
  4: { KO: '업무에 충분', EN: 'Solid for work', JP: '仕事に十分' },
  3: { KO: '카페 편차 있음', EN: 'Varies by café', JP: 'カフェで差あり' },
  2: { KO: '전용회선 권장', EN: 'Dedicated line advised', JP: '専用回線推奨' },
  1: { KO: '불안정', EN: 'Unreliable', JP: '不安定' },
}

// 생활비 등급 → 라벨
export const COST_TIER_LABEL: Record<'low' | 'mid' | 'high', L> = {
  low: { KO: '저렴', EN: 'Affordable', JP: 'リーズナブル' },
  mid: { KO: '보통', EN: 'Moderate', JP: '標準' },
  high: { KO: '높음', EN: 'Pricey', JP: '高め' },
}
export const COST_TIER_STYLE: Record<'low' | 'mid' | 'high', string> = {
  low: 'bg-emerald-50 text-emerald-700',
  mid: 'bg-amber-50 text-amber-700',
  high: 'bg-rose-50 text-rose-700',
}

export const CITY_INSIGHTS: CityInsight[] = [
  {
    id: 'tokyo',
    name: { KO: '도쿄', EN: 'Tokyo', JP: '東京' },
    country: { KO: '일본', EN: 'Japan', JP: '日本' },
    flag: '🗼',
    photo: '/media/destinations/tokyo-editorial-v1.webp',
    internet: 5,
    internetNote: {
      KO: '카페·코워킹 100Mbps+ 보편화, 포켓와이파이 불필요',
      EN: 'Cafés & coworking at 100Mbps+ everywhere; no pocket Wi-Fi needed',
      JP: 'カフェ・コワーキングが100Mbps+、ポケットWi-Fi不要',
    },
    costMonthly: { KO: '월 160만원대', EN: '~₩1.6M / month', JP: '月160万ウォン程度' },
    costTier: 'mid',
    costBreakdown: {
      KO: '숙소 90 + 식비 40 + 교통 20 + 기타 10 (만원)',
      EN: 'Stay 90 + Food 40 + Transit 20 + Other 10 (₩10K units)',
      JP: '宿90＋食40＋交通20＋その他10（万ウォン）',
    },
    pros: {
      KO: ['시차 0시간 — 업무 리듬 그대로', '인터넷·카페 인프라 최상급', '무비자 90일로 장기 체류 여유', '코워킹 내장 숙소 선택지 풍부'],
      EN: ['Zero jet lag from Korea', 'Top-tier internet & café infra', '90 visa-free days', 'Plenty of coworking-equipped stays'],
      JP: ['韓国と時差ゼロ', 'ネット・カフェ環境が最上級', 'ビザなし90日', 'コワーキング付き宿が豊富'],
    },
    cons: {
      KO: ['생활비가 아시아 상위권(월 160만원대)', '벚꽃·연말 성수기 숙소비 급등', '출퇴근 시간대 지하철 혼잡'],
      EN: ['Living cost on the high side for Asia', 'Hotel spikes in sakura & year-end peaks', 'Rush-hour subway crowds'],
      JP: ['生活費はアジア上位（月160万W台）', '桜・年末は宿泊費が高騰', '通勤時間帯の地下鉄混雑'],
    },
    bestSeason: { KO: '3~5월, 9~11월', EN: 'Mar–May, Sep–Nov', JP: '3〜5月・9〜11月' },
    visaFree: { KO: '무비자 90일', EN: 'Visa-free 90 days', JP: 'ビザなし90日' },
    visaCountryKey: 'japan',
    timezone: { KO: 'UTC+9 (한국과 동일)', EN: 'UTC+9 (same as Korea)', JP: 'UTC+9（韓国と同じ）' },
    flightTime: { KO: '약 2시간 20분 (인천 직항)', EN: '~2h 20m direct from Seoul', JP: '仁川から直行 約2時間20分' },
    plug: { KO: '100V · A형 — 어댑터 필요', EN: '100V · Type A — adapter needed', JP: '100V・Aタイプ' },
    payment: { KO: '카드 보급 확대 중, 소규모 식당은 현금 병행', EN: 'Cards widely spreading; carry cash for small eateries', JP: 'カード普及中、小さな店は現金も' },
    tags: {
      KO: ['코워킹 밀집', '장기체류 특화', '비자 간편'],
      EN: ['Coworking hub', 'Long-stay ready', 'Easy visa'],
      JP: ['コワーキング密集', '長期滞在向き', 'ビザ簡単'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Tokyo',
    hotelTripHref: 'https://kr.trip.com/hotels/tokyo-hotels-list-228/?Allianceid=9024807',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fjapan-esim',
    activityHref: 'https://www.kkday.com/ko/destination/jp-japan?cid=25833',
    transferHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F2892-narita-airport-tokyo-transfer%2F',
    railPassHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F1552-subway-ticket-tokyo%2F',
    railPassName: { KO: '도쿄 지하철 티켓 24~72h', EN: 'Tokyo Subway Ticket 24–72h', JP: '東京メトロパス24〜72h' },
    featuredStayId: 'stay-millennials-shibuya',
    workTags: {
      // 2026-07-18 리서치: .andwork 공식 100Mbps+(상·하향)·무료 폰부스 — xandwork.com/livelyhotels.com
      KO: ['코워킹 100Mbps+', '무료 폰부스', '시부야역 6분'],
      EN: ['Coworking at 100Mbps+', 'Free phone booths', '6 min to Shibuya'],
      JP: ['コワーキング100Mbps+', '無料フォンブース', '渋谷駅6分'],
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
    photo: '/media/destinations/osaka-editorial-v1.webp',
    internet: 5,
    internetNote: {
      KO: '혼마치·난바에 카페·코워킹 밀집, 광랜 보편화',
      EN: 'Dense cafés & coworking in Honmachi/Namba; fiber everywhere',
      JP: '本町・難波にカフェ・コワーキング密集、光回線普及',
    },
    costMonthly: { KO: '월 140만원대', EN: '~₩1.4M / month', JP: '月140万ウォン程度' },
    costTier: 'mid',
    costBreakdown: {
      KO: '숙소 70 + 식비 35 + 교통 20 + 기타 15 (만원)',
      EN: 'Stay 70 + Food 35 + Transit 20 + Other 15 (₩10K units)',
      JP: '宿70＋食35＋交通20＋その他15（万ウォン）',
    },
    pros: {
      KO: ['도쿄 대비 낮은 생활비(월 140만원대)', '음식 물가·만족도 체감 우수', '혼마치 비즈니스 지구 코워킹 밀집', '무비자 90일'],
      EN: ['Cheaper than Tokyo (~₩1.4M/mo)', 'Great food at fair prices', 'Coworking dense in Honmachi', '90 visa-free days'],
      JP: ['東京より安い（月140万W台）', '食のコスパが高い', '本町にコワーキング密集', 'ビザなし90日'],
    },
    cons: {
      KO: ['여름철 무덥고 습함', '관광 성수기 도심 혼잡', '영어 소통은 도쿄보다 제한적'],
      EN: ['Hot, humid summers', 'Tourist-season crowds downtown', 'Less English than Tokyo'],
      JP: ['夏は蒸し暑い', '観光シーズンは都心が混雑', '英語対応は東京より限定的'],
    },
    bestSeason: { KO: '3~5월, 9~11월', EN: 'Mar–May, Sep–Nov', JP: '3〜5月・9〜11月' },
    visaFree: { KO: '무비자 90일', EN: 'Visa-free 90 days', JP: 'ビザなし90日' },
    visaCountryKey: 'japan',
    timezone: { KO: 'UTC+9 (한국과 동일)', EN: 'UTC+9 (same as Korea)', JP: 'UTC+9（韓国と同じ）' },
    flightTime: { KO: '약 1시간 40분 (인천 직항)', EN: '~1h 40m direct from Seoul', JP: '仁川から直行 約1時間40分' },
    plug: { KO: '100V · A형 — 어댑터 필요', EN: '100V · Type A — adapter needed', JP: '100V・Aタイプ' },
    payment: { KO: '카드 보급 확대 중, 소규모 식당은 현금 병행', EN: 'Cards widely spreading; carry cash for small eateries', JP: 'カード普及中、小さな店は現金も' },
    tags: {
      KO: ['도쿄보다 저렴', '음식 천국', '오사카 성'],
      EN: ['Cheaper than Tokyo', 'Food paradise', 'Osaka Castle'],
      JP: ['東京より安い', '食の天国', '大阪城'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Osaka',
    hotelTripHref: 'https://kr.trip.com/hotels/osaka-hotels-list-219/?Allianceid=9024807',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fjapan-esim',
    activityHref: 'https://www.kkday.com/ko/destination/jp-japan?cid=25833',
    transferHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F2797-kansai-airport-transfers-osaka%2F',
    railPassHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F3276-4-day-jr-west-kansai-rail-pass-jr-pass%2F',
    railPassName: { KO: 'JR 간사이 패스', EN: 'JR Kansai Pass', JP: 'JR関西パス' },
    featuredStayId: 'stay-lively-osaka',
    workTags: {
      // 2026-07-18 리서치: 공용 7곳·코워킹 THE LIVERALLY 투숙객 무료·사카이스지혼마치역 1분 — livelyhotels.com
      KO: ['공용 라운지 7곳', '코워킹 투숙객 무료', '사카이스지혼마치역 1분'],
      EN: ['7 work lounges', 'Free guest coworking', '1 min to Sakaisuji-Honmachi'],
      JP: ['共用ラウンジ7カ所', 'コワーキング無料', '堺筋本町駅1分'],
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
    photo: '/media/destinations/fukuoka-editorial-v1.webp',
    internet: 5,
    internetNote: {
      KO: '하카타·텐진 스타트업 허브, 코워킹 성장 중',
      EN: 'Hakata/Tenjin startup hub; coworking scene growing',
      JP: '博多・天神のスタートアップ拠点、コワーキング拡大中',
    },
    costMonthly: { KO: '월 120만원대', EN: '~₩1.2M / month', JP: '月120万ウォン程度' },
    costTier: 'mid',
    costBreakdown: {
      KO: '숙소 60 + 식비 30 + 교통 15 + 기타 15 (만원)',
      EN: 'Stay 60 + Food 30 + Transit 15 + Other 15 (₩10K units)',
      JP: '宿60＋食30＋交通15＋その他15（万ウォン）',
    },
    pros: {
      KO: ['서울 직항 1시간 — 주말 왕복도 가능', '일본 대도시 중 최저 수준 생활비', '하카타·텐진 스타트업 허브', '무비자 90일'],
      EN: ['1h direct from Seoul', 'Lowest cost among big Japanese cities', 'Hakata/Tenjin startup hub', '90 visa-free days'],
      JP: ['ソウルから直行1時間', '日本の大都市で最安クラス', '博多・天神のスタートアップ拠点', 'ビザなし90日'],
    },
    cons: {
      KO: ['코워킹 선택지가 도쿄·오사카보다 적음', '장마·태풍 영향권', '대도시 대비 볼거리는 제한적'],
      EN: ['Fewer coworking options than Tokyo/Osaka', 'Rainy season & typhoons', 'Fewer attractions than megacities'],
      JP: ['コワーキングは東京・大阪より少なめ', '梅雨・台風の影響圏', '大都市ほどの見どころはない'],
    },
    bestSeason: { KO: '3~6월, 9~11월', EN: 'Mar–Jun, Sep–Nov', JP: '3〜6月・9〜11月' },
    visaFree: { KO: '무비자 90일', EN: 'Visa-free 90 days', JP: 'ビザなし90日' },
    visaCountryKey: 'japan',
    timezone: { KO: 'UTC+9 (한국과 동일)', EN: 'UTC+9 (same as Korea)', JP: 'UTC+9（韓国と同じ）' },
    flightTime: { KO: '약 1시간 20분 (인천 직항)', EN: '~1h 20m direct from Seoul', JP: '仁川から直行 約1時間20分' },
    plug: { KO: '100V · A형 — 어댑터 필요', EN: '100V · Type A — adapter needed', JP: '100V・Aタイプ' },
    payment: { KO: '카드 보급 확대 중, 소규모 식당은 현금 병행', EN: 'Cards widely spreading; carry cash for small eateries', JP: 'カード普及中、小さな店は現金も' },
    tags: {
      KO: ['일본 최저비용', '서울 직항 1h', '소도시 감성'],
      EN: ['Cheapest in Japan', '1h from Seoul', 'Small-city charm'],
      JP: ['日本で最安クラス', 'ソウルから1h', '小都市の魅力'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Fukuoka',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fjapan-esim',
    activityHref: 'https://www.kkday.com/ko/destination/jp-japan?cid=25833',
    transferHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F11232-airport-transfer-fukuoka%2F',
    railPassHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F2371-jr-kyushu-jr-pass%2F',
    railPassName: { KO: 'JR 큐슈 레일 패스', EN: 'JR Kyushu Rail Pass', JP: 'JR九州レールパス' },
    featuredStayId: 'stay-webase-hakata',
    workTags: {
      // 2026-07-18 리서치: Wi-Fi 하향 최대 150Mbps(공식 FAQ)·9층 라운지 투숙객 무료(비투숙 유료 개방형) — we-base.jp
      KO: ['Wi-Fi 최대 150Mbps', '9층 라운지 무료', '역 도보 3분'],
      EN: ['Wi-Fi up to 150Mbps', 'Free 9F lounge', '3 min to station'],
      JP: ['Wi-Fi最大150Mbps', '9階ラウンジ無料', '駅徒歩3分'],
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
    photo: '/media/destinations/bali-editorial-v1.webp',
    internet: 3,
    internetNote: {
      KO: '짱구·우붓 코워킹 30~50Mbps, 카페 편차 큼',
      EN: 'Canggu/Ubud coworking 30–50Mbps; café speeds vary',
      JP: 'チャング・ウブドのコワーキング30〜50Mbps、カフェは差が大きい',
    },
    costMonthly: { KO: '월 100만원대', EN: '~₩1.0M / month', JP: '月100万ウォン程度' },
    costTier: 'low',
    costBreakdown: {
      KO: '숙소 50 + 식비 20 + 교통 15 + 기타 15 (만원)',
      EN: 'Stay 50 + Food 20 + Transit 15 + Other 15 (₩10K units)',
      JP: '宿50＋食20＋交通15＋その他15（万ウォン）',
    },
    pros: {
      KO: ['월 100만원대 저비용 장기 체류', '노마드 커뮤니티 세계 최대급', '코워킹 전용 설계 숙소 존재', '자연 속 리프레시 환경'],
      EN: ['Long stays at ~₩1.0M/mo', 'One of the biggest nomad scenes', 'Stays built for coworking', 'Nature all around'],
      JP: ['月100万W台で長期滞在', '世界最大級のノマドコミュニティ', 'コワーキング特化の宿あり', '自然の中でリフレッシュ'],
    },
    cons: {
      KO: ['인터넷이 카페별 편차 큼(★3)', '우기(11~3월) 습하고 비 잦음', '교통 체증·이동은 오토바이 의존'],
      EN: ['Internet varies a lot by café', 'Wet season Nov–Mar', 'Traffic jams; scooter-dependent'],
      JP: ['ネットはカフェで差が大きい', '雨季（11〜3月）は雨が多い', '渋滞が多くバイク移動が前提'],
    },
    bestSeason: { KO: '4~10월 (건기)', EN: 'Apr–Oct (dry season)', JP: '4〜10月（乾季）' },
    visaFree: {
      KO: '무비자 30일 → E33G 비자 60일 연장 가능',
      EN: 'Visa-free 30 days → extend 60 days via E33G',
      JP: 'ビザなし30日 → E33Gビザで60日延長可',
    },
    visaCountryKey: 'indonesia',
    timezone: { KO: 'UTC+8 (한국 -1시간)', EN: 'UTC+8 (Korea −1h)', JP: 'UTC+8（韓国−1時間）' },
    flightTime: { KO: '약 7시간 (인천 직항)', EN: '~7h direct from Seoul', JP: '仁川から直行 約7時間' },
    plug: { KO: '230V · C/F형 — 한국 플러그 대부분 사용 가능', EN: '230V · Type C/F — Korean plugs mostly fit', JP: '230V・C/Fタイプ' },
    payment: { KO: '카드·현금 병행, 소액 결제는 현금 준비', EN: 'Cards + cash; keep cash for small payments', JP: 'カードと現金併用、少額は現金' },
    tags: {
      KO: ['노마드 성지', '코워킹 허브', '자연+작업'],
      EN: ['Nomad mecca', 'Coworking hub', 'Nature + work'],
      JP: ['ノマドの聖地', 'コワーキング拠点', '自然＋仕事'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Bali',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Findonesia-esim',
    activityHref: 'https://www.kkday.com/ko/destination/id-bali?cid=25833',
    transferHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F30245-premium-private-ngurah-rai-airport-transfers-bali%2F',
    featuredStayId: 'stay-tribal-bali',
    workTags: {
      // 2026-07-18 리서치: '풀사이드 워크스페이스' 공식 근거 없음→제거. 부스·스탠딩 데스크·투숙객 무료 — tribalbali.com/bali.com
      KO: ['코워킹 전용 설계', '스탠딩 데스크·부스', '투숙객 무료'],
      EN: ['Built for coworking', 'Standing desks & booths', 'Free for guests'],
      JP: ['コワーキング特化設計', 'スタンディングデスク·ブース', '宿泊者無料'],
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
    photo: '/media/destinations/danang-editorial-v1.webp',
    internet: 4,
    internetNote: {
      KO: '안트엉 카페 거리 50~80Mbps, 안정적',
      EN: 'An Thuong café strip 50–80Mbps; stable',
      JP: 'アントゥン・カフェ通り50〜80Mbps、安定',
    },
    costMonthly: { KO: '월 90만원대', EN: '~₩900K / month', JP: '月90万ウォン程度' },
    costTier: 'low',
    costBreakdown: {
      KO: '숙소 40 + 식비 20 + 교통 10 + 기타 20 (만원)',
      EN: 'Stay 40 + Food 20 + Transit 10 + Other 20 (₩10K units)',
      JP: '宿40＋食20＋交通10＋その他20（万ウォン）',
    },
    pros: {
      KO: ['8개 도시 중 최저 생활비(월 90만원대)', '무비자 45일', '미케비치 도보 생활권 + 카페 작업', '한인 커뮤니티·식당 인프라'],
      EN: ['Cheapest of our 8 cities (~₩900K/mo)', '45 visa-free days', 'Walkable beach life + café work', 'Korean community & food'],
      JP: ['8都市で最安（月90万W台）', 'ビザなし45日', 'ビーチ徒歩圏＋カフェ作業', '韓国人コミュニティが充実'],
    },
    cons: {
      KO: ['우기(9~12월) 폭우·태풍 영향', '관광지구 심야 소음', '영어 소통 제한적'],
      EN: ['Heavy rain & typhoons Sep–Dec', 'Night noise in tourist zones', 'Limited English'],
      JP: ['雨季（9〜12月）は豪雨・台風', '観光地区は夜間の騒音', '英語はあまり通じない'],
    },
    bestSeason: { KO: '2~8월', EN: 'Feb–Aug', JP: '2〜8月' },
    visaFree: {
      // 2026-08-04 오기 정정: K-ETA는 대한민국 입국 제도라 베트남 입국과 무관 (구 문구 "전자입국신고 K-ETA 불필요" 제거)
      // + 한시조치 표기 보강 (content.ts:181·290 검증 표현과 동기 — visaExpiries.ts 감시 대상)
      KO: '무비자 45일 (2028.3까지 한시)',
      EN: 'Visa-free 45 days (until Mar 2028)',
      JP: 'ビザなし45日（2028.3まで）',
    },
    visaCountryKey: 'vietnam',
    timezone: { KO: 'UTC+7 (한국 -2시간)', EN: 'UTC+7 (Korea −2h)', JP: 'UTC+7（韓国−2時間）' },
    flightTime: { KO: '약 4시간 30분 (인천 직항)', EN: '~4h 30m direct from Seoul', JP: '仁川から直行 約4時間30分' },
    plug: { KO: '220V · A/C형 겸용 — 한국 플러그 대부분 사용 가능', EN: '220V · Type A/C — Korean plugs mostly fit', JP: '220V・A/Cタイプ' },
    payment: { KO: '현금 위주 + 카드 확산 중', EN: 'Cash-first; cards spreading', JP: '現金中心、カードは拡大中' },
    tags: {
      KO: ['해변 뷰', '동남아 최저비용', '한인 커뮤니티'],
      EN: ['Beach views', 'Lowest cost in SE Asia', 'Korean community'],
      JP: ['ビーチビュー', '東南アジア最安', '韓国人コミュニティ'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Da+Nang',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fvietnam-esim',
    activityHref: 'https://www.kkday.com/ko/destination/vn-vietnam?cid=25833',
    transferHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F17015-dad-private-airport-transfers-da-nang%2F',
    featuredStayId: 'stay-chicland-danang',
    workTags: {
      // 2026-07-18 리서치: 전 객실 워크데스크(공식 rooms 페이지)·풀은 고층(루프탑은 라운지) — chiclandhotel.com
      KO: ['전 객실 워크데스크', '카페형 라운지', '미케비치 앞'],
      EN: ['Work desk in every room', 'Café-style lounge', 'Right by My Khe'],
      JP: ['全室ワークデスク', 'カフェ風ラウンジ', 'ミーケー目の前'],
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
    photo: '/media/destinations/chiangmai-editorial-v1.webp',
    internet: 4,
    internetNote: {
      KO: '님만해민 카페·코워킹 50~100Mbps',
      EN: 'Nimman cafés & coworking 50–100Mbps',
      JP: 'ニマンヘミンのカフェ・コワーキング50〜100Mbps',
    },
    costMonthly: { KO: '월 110만원대', EN: '~₩1.1M / month', JP: '月110万ウォン程度' },
    costTier: 'low',
    costBreakdown: {
      KO: '숙소 50 + 식비 25 + 교통 15 + 기타 20 (만원)',
      EN: 'Stay 50 + Food 25 + Transit 15 + Other 20 (₩10K units)',
      JP: '宿50＋食25＋交通15＋その他20（万ウォン）',
    },
    pros: {
      KO: ['디지털 노마드 1번지 커뮤니티', '카페·코워킹 품질 대비 저비용', '무비자 60일', '건기(11~2월) 쾌적한 날씨'],
      EN: ['The original nomad hub community', 'Great cafés & coworking for the price', '60 visa-free days', 'Pleasant dry season Nov–Feb'],
      JP: ['ノマドの聖地コミュニティ', '低コストで質の高いカフェ・コワーキング', 'ビザなし60日', '乾季（11〜2月）は快適'],
    },
    cons: {
      KO: ['2~4월 미세먼지(버닝 시즌) 심각', '바다가 없는 내륙 도시', '우기(5~10월) 습함'],
      EN: ['Serious smog in burning season Feb–Apr', 'Inland — no beach', 'Humid wet season May–Oct'],
      JP: ['2〜4月は野焼きで大気汚染が深刻', '内陸都市で海がない', '雨季（5〜10月）は蒸す'],
    },
    bestSeason: { KO: '11~2월 (건기·쾌적)', EN: 'Nov–Feb (dry & mild)', JP: '11〜2月（乾季・快適）' },
    visaFree: {
      KO: '무비자 60일 (태국 DTV 180일 비자 별도)',
      EN: 'Visa-free 60 days (separate DTV 180-day visa)',
      JP: 'ビザなし60日（DTV180日ビザは別途）',
    },
    visaCountryKey: 'thailand',
    timezone: { KO: 'UTC+7 (한국 -2시간)', EN: 'UTC+7 (Korea −2h)', JP: 'UTC+7（韓国−2時間）' },
    flightTime: { KO: '약 5시간 30분 (인천 직항)', EN: '~5h 30m direct from Seoul', JP: '仁川から直行 約5時間30分' },
    plug: { KO: '220V · A/C 겸용 콘센트 많음 — 한국 플러그 대체로 사용 가능', EN: '220V · A/C combo sockets common — Korean plugs mostly fit', JP: '220V・A/C兼用が多い' },
    payment: { KO: '카드 확산, 야시장·로컬 상점은 현금', EN: 'Cards spreading; cash for night markets & local shops', JP: 'カード拡大中、ナイトマーケットは現金' },
    tags: {
      KO: ['님만 핫플', '저비용 고품질', '디지털 노마드 1번지'],
      EN: ['Nimman hotspot', 'Low cost, high quality', 'Nomad capital'],
      JP: ['ニマンの人気エリア', '低コスト高品質', 'ノマドの聖地'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Chiang+Mai',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fthailand-esim',
    activityHref: 'https://www.kkday.com/ko/destination/th-thailand?cid=25833',
    transferHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F15841-airport-transfers-chiang-mai%2F',
    featuredStayId: 'stay-kantary-chiangmai',
    workTags: {
      // 2026-07-18 리서치: 전 유닛 키치넷 스위트 46㎡+·님만해민 소이12 소재 — Cape&Kantary 공식 팩트시트
      KO: ['키치넷 스위트 46㎡+', '장기체류 특화', '님만 소이12'],
      EN: ['Kitchenette suites 46㎡+', 'Long-stay ready', 'On Nimman Soi 12'],
      JP: ['キッチン付き46㎡+', '長期滞在特化', 'ニマン·ソイ12'],
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
    photo: '/media/destinations/cebu-editorial-v1.webp',
    internet: 3,
    internetNote: {
      KO: '코워킹·코리빙 30~60Mbps, 전용회선 추천',
      EN: 'Coworking/coliving 30–60Mbps; dedicated line recommended',
      JP: 'コワーキング・コリビング30〜60Mbps、専用回線推奨',
    },
    costMonthly: { KO: '월 95만원대', EN: '~₩950K / month', JP: '月95万ウォン程度' },
    costTier: 'low',
    costBreakdown: {
      KO: '숙소 45 + 식비 20 + 교통 10 + 기타 20 (만원)',
      EN: 'Stay 45 + Food 20 + Transit 10 + Other 20 (₩10K units)',
      JP: '宿45＋食20＋交通10＋その他20（万ウォン）',
    },
    pros: {
      KO: ['어학연수+워케이션 병행 최적', '코워킹+코리빙 결합 숙소', '다이빙·아일랜드호핑 성지', '월 95만원대 저비용'],
      EN: ['Best for study + workation combos', 'Coworking + coliving stays', 'Diving & island-hopping mecca', 'Low cost ~₩950K/mo'],
      JP: ['語学＋ワーケーション両立に最適', 'コワーキング＋コリビングの宿', 'ダイビングの聖地', '月95万W台の低コスト'],
    },
    cons: {
      KO: ['시내 교통 체증 심함', '인터넷 편차 커 전용회선 권장(★3)', '우기 태풍 영향권'],
      EN: ['Heavy city traffic', 'Internet varies — dedicated line advised', 'Typhoon-prone wet season'],
      JP: ['市内の渋滞がひどい', 'ネットは差が大きく専用回線推奨', '雨季は台風の影響圏'],
    },
    bestSeason: { KO: '12~5월 (건기)', EN: 'Dec–May (dry season)', JP: '12〜5月（乾季）' },
    visaFree: {
      KO: '무비자 30일 → 비자 연장 최대 1년',
      EN: 'Visa-free 30 days → extendable up to 1 year',
      JP: 'ビザなし30日 → 最長1年まで延長可',
    },
    visaCountryKey: 'philippines',
    timezone: { KO: 'UTC+8 (한국 -1시간)', EN: 'UTC+8 (Korea −1h)', JP: 'UTC+8（韓国−1時間）' },
    flightTime: { KO: '약 4시간 30분 (인천 직항)', EN: '~4h 30m direct from Seoul', JP: '仁川から直行 約4時間30分' },
    plug: { KO: '220V · A형 위주 — 어댑터 필요', EN: '220V · mostly Type A — adapter needed', JP: '220V・Aタイプ中心' },
    payment: { KO: '카드 가능 상점 많음, 현금 병행 권장', EN: 'Cards accepted widely; carry some cash', JP: 'カード可の店が多いが現金も' },
    tags: {
      KO: ['어학+워케이션', '코리빙 특화', '다이빙 성지'],
      EN: ['Study + workation', 'Coliving-friendly', 'Diving mecca'],
      JP: ['語学＋ワーケーション', 'コリビング向き', 'ダイビングの聖地'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Cebu',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Fphilippines-esim',
    activityHref: 'https://www.kkday.com/ko/destination/ph-philippines?cid=25833',
    transferHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F111444-private-airport-transfer-to-cebu-city-mandaue-city-mactan%2F',
    featuredStayId: 'stay-nomadshub-cebu',
    workTags: {
      // 2026-07-18 리서치: '핫데스크 포함' 원문 미확인→교체. 폰부스·컨퍼런스룸(운영사 설명) — hostelworld/coworker 리스팅
      KO: ['코워킹+코리빙', '폰부스·컨퍼런스룸', '노마드 커뮤니티'],
      EN: ['Coworking + coliving', 'Phone booth & meeting room', 'Nomad community'],
      JP: ['コワーキング＋コリビング', 'フォンブース·会議室', 'ノマドコミュニティ'],
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
    photo: '/media/destinations/sydney-editorial-v1.webp',
    internet: 5,
    internetNote: {
      KO: 'CBD 코워킹·카페 100Mbps+ 보편화',
      EN: 'CBD coworking & cafés at 100Mbps+ everywhere',
      JP: 'CBDのコワーキング・カフェが100Mbps+普及',
    },
    costMonthly: { KO: '월 330만원대', EN: '~₩3.3M / month', JP: '月330万ウォン程度' },
    costTier: 'high',
    costBreakdown: {
      KO: '숙소 180 + 식비 70 + 교통 30 + 기타 50 (만원)',
      EN: 'Stay 180 + Food 70 + Transit 30 + Other 50 (₩10K units)',
      JP: '宿180＋食70＋交通30＋その他50（万ウォン）',
    },
    pros: {
      KO: ['선진국 수준 인프라·치안', '완전한 영어 환경', '글로벌 기업·네트워킹 기회', '인터넷·코워킹 최상급'],
      EN: ['First-world infrastructure & safety', 'Full English environment', 'Global networking opportunities', 'Top-tier internet & coworking'],
      JP: ['先進国レベルのインフラ・治安', '完全な英語環境', 'グローバルな人脈機会', 'ネット・コワーキング最上級'],
    },
    cons: {
      KO: ['생활비 월 330만원대 — 8개 도시 중 최고', '무비자 불가(ETA·워킹홀리데이 필요)', '직항 10시간+ 물리적 거리'],
      EN: ['Highest cost of our 8 cities (~₩3.3M/mo)', 'No visa-free entry (ETA/WHV needed)', '10h+ direct flight from Korea'],
      JP: ['生活費は8都市で最高（月330万W台）', 'ビザなし入国不可（ETA・ワーホリ）', '直行10時間超の距離'],
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
    flightTime: { KO: '약 10시간 30분 (인천 직항)', EN: '~10h 30m direct from Seoul', JP: '仁川から直行 約10時間30分' },
    plug: { KO: '230V · I형 — 어댑터 필요', EN: '230V · Type I — adapter needed', JP: '230V・Iタイプ' },
    payment: { KO: '컨택리스 카드 보편 — 현금 거의 불필요', EN: 'Contactless everywhere — cash rarely needed', JP: 'タッチ決済が標準、現金ほぼ不要' },
    tags: {
      KO: ['선진국 인프라', '영어 환경', '글로벌 네트워킹'],
      EN: ['First-world infra', 'English-speaking', 'Global networking'],
      JP: ['先進国インフラ', '英語環境', 'グローバル人脈'],
    },
    hotelBookingHref: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Sydney',
    esimHref: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fko%2Faustralia-esim',
    activityHref: 'https://www.kkday.com/ko/destination/au-australia?cid=25833',
    transferHref: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F1865-airport-transfers-australia-sydney%2F',
    featuredStayId: 'stay-adina-sydney',
    workTags: {
      // 2026-07-18 리서치: '실내 수영장' 오류(공식=heated semi-outdoor)→회의실 5개(최대 100명, 공식)로 교체 — adinahotels.com
      KO: ['풀키친 아파트', '회의실 5개', 'Town Hall역 2분'],
      EN: ['Full-kitchen apartment', '5 meeting rooms', '2 min to Town Hall'],
      JP: ['フルキッチン', '会議室5室', 'タウンホール駅2分'],
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

// ─────────────────────────────────────────────────────────────────────────────
// 도시 FAQ — 트리플 벤치. 질문은 템플릿 4종, 답변은 기존 검증 필드에서 자동 조립
// (신규 추정치 0 — visaFree·costMonthly·internetNote·bestSeason 재사용).
// 화면(FAQ 섹션)과 FAQPage JSON-LD 리치결과가 같은 소스를 공유.
// ─────────────────────────────────────────────────────────────────────────────

const FAQ_Q: Record<'visa' | 'cost' | 'internet' | 'season', L> = {
  visa: {
    KO: '한국 여권으로 {city} 무비자 체류가 가능한가요?',
    EN: 'Can Koreans stay in {city} visa-free?',
    JP: '韓国のパスポートで{city}にビザなし滞在できますか？',
  },
  cost: {
    KO: '{city} 워케이션 한 달 예산은 얼마나 잡아야 하나요?',
    EN: 'What monthly budget should I plan for a {city} workation?',
    JP: '{city}ワーケーションの1ヶ月予算はどのくらいですか？',
  },
  internet: {
    KO: '{city}의 인터넷은 원격 근무에 충분한가요?',
    EN: 'Is the internet in {city} good enough for remote work?',
    JP: '{city}のネット環境はリモートワークに十分ですか？',
  },
  season: {
    KO: '{city} 워케이션은 언제 가는 게 좋나요?',
    EN: 'When is the best time for a {city} workation?',
    JP: '{city}ワーケーションのベストシーズンはいつですか？',
  },
}

export function buildCityFaq(city: CityInsight, lang: Lang): { q: string; a: string }[] {
  const name = city.name[lang]
  const fill = (t: string) => t.replace('{city}', name)
  const suffix = {
    visa: {
      KO: ' 최신 조건은 출발 전 공식 공지에서 확인하세요.',
      EN: ' Always check the latest official notice before departure.',
      JP: ' 最新条件は出発前に公式情報でご確認ください。',
    },
    cost: {
      KO: ' 체류 스타일에 따라 달라질 수 있습니다.',
      EN: ' Actual costs vary by lifestyle.',
      JP: ' 滞在スタイルにより変動します。',
    },
  }
  return [
    { q: fill(FAQ_Q.visa[lang]), a: `${city.visaFree[lang]}.${suffix.visa[lang]}` },
    { q: fill(FAQ_Q.cost[lang]), a: `${city.costMonthly[lang]} — ${city.costBreakdown[lang]}.${suffix.cost[lang]}` },
    { q: fill(FAQ_Q.internet[lang]), a: `${INTERNET_LABEL[city.internet][lang]} (★${city.internet}/5). ${city.internetNote[lang]}.` },
    { q: fill(FAQ_Q.season[lang]), a: `${city.bestSeason[lang]}.` },
  ]
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
