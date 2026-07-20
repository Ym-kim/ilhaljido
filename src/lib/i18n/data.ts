import type { Lang } from './types'
import { loc, tloc, type Loc } from './locale'

type StayItem = {
  id: string
  bookingQuery: string  // Booking.com ss= 검색어
  img: string
  score: number
  price: string
  wifi: string
  name: Loc<string>
  country: Loc<string>
  region: Loc<string>
  tag: Loc<string>
}

type SimpleCard = {
  id: string
  img: string
  title: Loc<string>
  region: Loc<string>
  tag?: Loc<string>
}

type ActivityItem = { id: string; img: string; title: Loc<string>; region: Loc<string>; tag: Loc<string> }
type FeatureItem = { id: string; title: Loc<string>; desc: Loc<string> }
type LangProgram = {
  id: string
  stayQuery: string     // Booking.com ss= 검색어
  img: string
  price: string
  name: Loc<string>
  country: Loc<string>
  level: Loc<string>
  duration: Loc<string>
  tags: Loc<string[]>
}
type CruiseRoute = {
  id: string
  portQuery: string     // 출발 항구 도시 — Booking.com ss=
  img: string
  price: string
  name: Loc<string>
  ports: Loc<string>
  days: Loc<string>
}
type MarketUnit = { id: string; stayQuery: string; img: string; name: Loc<string>; region: Loc<string>; target: Loc<string> }
type GlobalDest = {
  id: string
  stayQuery?: string    // Booking.com ss= 검색어 (숙소 직결)
  img: string
  name: Loc<string>
  country: Loc<string>
  region: Loc<string>
  tag: Loc<string>
}
type DomesticCurrent = {
  id: string
  img: string
  href: string
  price: string
  originalPrice?: string
  recruitEnd: string    // YYYY-MM-DD, 이 날짜 이후에는 모집중 배너 숨김
  eventEnd: string      // YYYY-MM-DD, 행사 종료일
  date?: Loc<string>
  duration: Loc<string>
  name: Loc<string>
  region: Loc<string>
  desc: Loc<string>
  includes: Loc<string[]>
}

const STAY_ASIA: StayItem[] = [
  {
    id: 'jeju',
    bookingQuery: 'Jeju',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    score: 9.8,
    price: '148,000',
    wifi: '500Mbps',
    name: loc('제주 애월 오션 빌라', 'Jeju Aewol Ocean Villa', '済州アウル・オーシャンヴィラ'),
    country: loc('한국', 'South Korea', '韓国'),
    region: loc('제주', 'Jeju', '済州'),
    tag: loc('오션뷰', 'Ocean view', 'オーシャンビュー'),
  },
  {
    id: 'gangwon',
    bookingQuery: 'Sokcho',
    img: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    price: '98,000',
    wifi: '300Mbps',
    name: loc('강원 설악 포레스트', 'Gangwon Seorak Forest Stay', '江原・雪岳フォレスト'),
    country: loc('한국', 'South Korea', '韓国'),
    region: loc('강원', 'Gangwon', '江原'),
    tag: loc('산속', 'In the forest', '森の中'),
  },
  {
    id: 'yeosu',
    bookingQuery: 'Yeosu',
    img: 'https://images.unsplash.com/photo-1617653202545-931490e8d7e7?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    price: '128,000',
    wifi: '400Mbps',
    name: loc('여수 하버뷰 레지던스', 'Yeosu Harbor View Residence', '麗水ハーバービュー'),
    country: loc('한국', 'South Korea', '韓国'),
    region: loc('전남', 'South Jeolla', '全南'),
    tag: loc('항구뷰', 'Harbor view', '港ビュー'),
  },
  {
    id: 'bali',
    bookingQuery: 'Ubud',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    score: 9.7,
    price: '65,000',
    wifi: '200Mbps',
    name: loc('발리 우붓 코리빙', 'Bali Ubud Coliving', 'バリ・ウブド・コリビング'),
    country: loc('인도네시아', 'Indonesia', 'インドネシア'),
    region: loc('발리', 'Bali', 'バリ'),
    tag: loc('정글뷰', 'Jungle view', 'ジャングルビュー'),
  },
  {
    id: 'chiangmai',
    bookingQuery: 'Chiang Mai',
    img: 'https://images.unsplash.com/photo-1512553353614-82a7370096dc?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    price: '42,000',
    wifi: '500Mbps',
    name: loc('치앙마이 님만 코워킹', 'Chiang Mai Nimman Coworking Stay', 'チェンマイ・ニマン'),
    country: loc('태국', 'Thailand', 'タイ'),
    region: loc('치앙마이', 'Chiang Mai', 'チェンマイ'),
    tag: loc('도심', 'City center', '都心'),
  },
  {
    id: 'danang',
    bookingQuery: 'Da Nang',
    img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    score: 9.3,
    price: '58,000',
    wifi: '300Mbps',
    name: loc('다낭 오션 리조트', 'Da Nang Ocean Resort', 'ダナン・オーシャンリゾート'),
    country: loc('베트남', 'Vietnam', 'ベトナム'),
    region: loc('다낭', 'Da Nang', 'ダナン'),
    tag: loc('해변', 'Beach', 'ビーチ'),
  },
]

const STAY_OCEANIA: StayItem[] = [
  {
    id: 'sydney',
    bookingQuery: 'Sydney',
    img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    price: '185,000',
    wifi: '1Gbps',
    name: loc('시드니 서큘러키 오피스', 'Sydney Circular Quay Office Stay', 'シドニー・サーキュラーキー'),
    country: loc('호주', 'Australia', 'オーストラリア'),
    region: loc('시드니', 'Sydney', 'シドニー'),
    tag: loc('항구뷰', 'Harbor view', '港ビュー'),
  },
  {
    id: 'melbourne',
    bookingQuery: 'Melbourne',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    price: '162,000',
    wifi: '500Mbps',
    name: loc('멜버른 CBD 코워킹', 'Melbourne CBD Coworking', 'メルボルンCBD'),
    country: loc('호주', 'Australia', 'オーストラリア'),
    region: loc('멜버른', 'Melbourne', 'メルボルン'),
    tag: loc('도심', 'City center', '都心'),
  },
  {
    id: 'byron',
    bookingQuery: 'Byron Bay',
    img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    score: 9.7,
    price: '210,000',
    wifi: '300Mbps',
    name: loc('바이런베이 비치 빌라', 'Byron Bay Beach Villa', 'バイロンベイ・ビーチヴィラ'),
    country: loc('호주', 'Australia', 'オーストラリア'),
    region: loc('NSW', 'NSW', 'NSW'),
    tag: loc('오션뷰', 'Ocean view', 'オーシャンビュー'),
  },
  {
    id: 'auckland',
    bookingQuery: 'Auckland',
    img: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    price: '175,000',
    wifi: '500Mbps',
    name: loc('오클랜드 하버 레지던스', 'Auckland Harbor Residence', 'オークランド・ハーバー'),
    country: loc('뉴질랜드', 'New Zealand', 'ニュージーランド'),
    region: loc('오클랜드', 'Auckland', 'オークランド'),
    tag: loc('항구뷰', 'Harbor view', '港ビュー'),
  },
  {
    id: 'queenstown',
    bookingQuery: 'Queenstown',
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    score: 9.8,
    price: '195,000',
    wifi: '400Mbps',
    name: loc('퀸스타운 레이크 오피스', 'Queenstown Lake Office', 'クイーンズタウン・レイク'),
    country: loc('뉴질랜드', 'New Zealand', 'ニュージーランド'),
    region: loc('퀸스타운', 'Queenstown', 'クイーンズタウン'),
    tag: loc('호수뷰', 'Lake view', '湖ビュー'),
  },
  {
    id: 'fiji',
    bookingQuery: 'Fiji',
    img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    price: '145,000',
    wifi: '200Mbps',
    name: loc('피지 코랄코스트 리조트', 'Fiji Coral Coast Resort', 'フィジ・コーラルコースト'),
    country: loc('피지', 'Fiji', 'フィジ'),
    region: loc('비티레부', 'Viti Levu', 'ビチレブ'),
    tag: loc('산호초', 'Coral reef', 'サンゴ礁'),
  },
]

const ACTIVITIES: ActivityItem[] = [
  {
    id: 'trek',
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    title: loc('오름 선라이즈 트레킹', 'Sunrise crater trek', 'オルム日の出トレッキング'),
    region: loc('제주', 'Jeju', '済州'),
    tag: loc('자연', 'Nature', '自然'),
  },
  {
    id: 'cafe',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    title: loc('로컬 카페 크롤링', 'Local café crawl', 'ローカルカフェ巡り'),
    region: loc('전국', 'Nationwide', '全国'),
    tag: loc('힐링', 'Relax', 'ヒーリング'),
  },
  {
    id: 'meetup',
    img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    title: loc('네트워킹 밋업', 'Networking meetup', 'ネットワーキング'),
    region: loc('전국', 'Nationwide', '全国'),
    tag: loc('커뮤니티', 'Community', 'コミュニティ'),
  },
  {
    id: 'yoga',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    title: loc('요가 & 명상', 'Yoga & meditation', 'ヨガ＆瞑想'),
    region: loc('제주·강원', 'Jeju · Gangwon', '済州・江原'),
    tag: loc('웰니스', 'Wellness', 'ウェルネス'),
  },
  {
    id: 'surf',
    img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    title: loc('서핑 레슨', 'Surf lesson', 'サーフレッスン'),
    region: loc('부산·강원', 'Busan · Gangwon', '釜山・江原'),
    tag: loc('스포츠', 'Sports', 'スポーツ'),
  },
  {
    id: 'culture',
    img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
    title: loc('지역 문화 체험', 'Local culture experience', '地域文化体験'),
    region: loc('경주·전주', 'Gyeongju · Jeonju', '慶州・全州'),
    tag: loc('문화', 'Culture', '文化'),
  },
]

const WORKSPACE_FEATURES: FeatureItem[] = [
  { id: 'wifi', title: loc('기가 인터넷', 'Gigabit internet', 'ギガインターネット'), desc: loc('1Gbps 전용 회선 + 백업 LTE', '1Gbps dedicated line + LTE backup', '1Gbps専用回線＋LTEバックアップ') },
  { id: 'monitor', title: loc('고사양 모니터', '4K monitor', '4Kモニター'), desc: loc('27인치 4K 모니터 제공', '27" 4K monitor provided', '27インチ4Kモニター付き') },
  { id: 'booth', title: loc('독립 부스', 'Private booth', '個室ブース'), desc: loc('방음 처리된 집중 업무 공간', 'Sound-insulated focus booth', '防音ブース') },
  { id: '24h', title: loc('24시간 이용', '24/7 access', '24時間利用'), desc: loc('언제든 입장 가능', 'Enter anytime', 'いつでも入場可') },
  { id: 'meeting', title: loc('화상회의룸', 'Video meeting room', 'ビデオ会議室'), desc: loc('방음 처리된 전용 미팅룸', 'Dedicated soundproof meeting room', '防音ミーティングルーム') },
  { id: 'drinks', title: loc('음료 무제한', 'Unlimited drinks', '飲み放題'), desc: loc('커피·차·음료 무제한 제공', 'Unlimited coffee, tea & beverages', 'コーヒー・お茶・飲料飲み放題') },
]

const LANG_FEATURES: FeatureItem[] = [
  { id: 'work', title: loc('일하면서 배운다', 'Learn while you work', '働きながら学ぶ'), desc: loc('오전 수업 + 오후 원격업무. 언어 실력과 소득을 동시에', 'Morning classes + afternoon remote work', '午前授業＋午後リモートワーク') },
  { id: 'immersion', title: loc('현지 몰입 환경', 'Full immersion', '現地イマージョン'), desc: loc('교실 밖 실전 언어 환경에서 빠르게 실력 향상', 'Build skills in real local settings', '教室の外で実践的に上達') },
  { id: 'community', title: loc('한국인 커뮤니티', 'Korean community', '韓国人コミュニティ'), desc: loc('같은 목적의 한국 워케이셔너들과 함께 성장', 'Grow with like-minded Korean workationers', '同じ目的の韓国人と成長') },
]

const LANG_PROGRAMS: LangProgram[] = [
  {
    id: 'cebu',
    stayQuery: 'Cebu',
    img: 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=800&q=80',
    price: '2,800,000',
    name: loc('필리핀 세부 어학연수', 'Cebu language stay', 'セブ語学留学'),
    country: loc('필리핀', 'Philippines', 'フィリピン'),
    level: loc('초~중급', 'Beginner–intermediate', '初〜中級'),
    duration: loc('4주~', '4+ weeks', '4週間〜'),
    tags: loc(['1:1 수업', '워케이션 포함', '숙소 제공'], ['1:1 lessons', 'Workation included', 'Stay included'], ['マンツーマン', 'ワーケーション込', '宿泊付']),
  },
  {
    id: 'tokyo',
    stayQuery: 'Tokyo',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    price: '3,500,000',
    name: loc('일본 도쿄 비즈니스 일본어', 'Tokyo business Japanese', '東京ビジネス日本語'),
    country: loc('일본', 'Japan', '日本'),
    level: loc('초~고급', 'All levels', '全レベル'),
    duration: loc('2주~', '2+ weeks', '2週間〜'),
    tags: loc(['비즈니스 특화', '비즈니스 일본어', '도심 캠퍼스'], ['Business focus', 'Business Japanese', 'City campus'], ['ビジネス特化', 'ビジネス日本語', '都心キャンパス']),
  },
  {
    id: 'malta',
    stayQuery: 'Malta',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    price: '4,200,000',
    name: loc('몰타 영어 집중 과정', 'Malta intensive English', 'マルタ英語集中'),
    country: loc('몰타', 'Malta', 'マルタ'),
    level: loc('중~고급', 'Intermediate–advanced', '中〜上級'),
    duration: loc('2주~', '2+ weeks', '2週間〜'),
    tags: loc(['유럽 생활', '소수 정예', '비즈니스 영어'], ['Europe lifestyle', 'Small groups', 'Business English'], ['欧州生活', '少人数', 'ビジネス英語']),
  },
  {
    id: 'vancouver',
    stayQuery: 'Vancouver',
    img: 'https://images.unsplash.com/photo-1560814304-4f05b62af116?auto=format&fit=crop&w=800&q=80',
    price: '5,800,000',
    name: loc('캐나다 밴쿠버 영어 연수', 'Vancouver English stay', 'バンクーバー英語留学'),
    country: loc('캐나다', 'Canada', 'カナダ'),
    level: loc('전 레벨', 'All levels', '全レベル'),
    duration: loc('4주~', '4+ weeks', '4週間〜'),
    tags: loc(['북미 영어', '스피킹 집중', '액티비티 포함'], ['North American English', 'Speaking focus', 'Activities included'], ['北米英語', 'スピーキング集中', 'アクティビティ付']),
  },
]

const CRUISE_FEATURES: FeatureItem[] = [
  { id: 'wifi', title: loc('선상 WiFi 보장', 'Ship WiFi guaranteed', '船上WiFi保証'), desc: loc('크루즈 전용 위성 인터넷, 업무 가능한 속도 확인', 'Satellite internet verified for work', '業務可能な速度を確認') },
  { id: 'ports', title: loc('항구마다 새 영감', 'Fresh inspiration each port', '寄港地ごとにインスピレーション'), desc: loc('기항지에서 현지 문화 체험과 네트워킹', 'Local culture & networking at each port', '寄港地で文化体験とネットワーク') },
  { id: 'all', title: loc('올인클루시브', 'All-inclusive', 'オールインクルーシブ'), desc: loc('숙박·식사·액티비티 모두 포함', 'Stay, meals & activities included', '宿泊・食事・アクティビティ込') },
]

const CRUISE_ROUTES: CruiseRoute[] = [
  {
    id: 'east-asia',
    portQuery: 'Busan',
    img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80',
    price: '1,200,000',
    name: loc('동아시아 크루즈 워케이션', 'East Asia cruise workation', '東アジアクルーズ'),
    ports: loc('부산 → 후쿠오카 → 나가사키 → 상하이', 'Busan → Fukuoka → Nagasaki → Shanghai', '釜山→福岡→長崎→上海'),
    days: loc('7박 8일', '7 nights · 8 days', '7泊8日'),
  },
  {
    id: 'sea',
    portQuery: 'Singapore',
    img: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&w=800&q=80',
    price: '1,800,000',
    name: loc('동남아 크루즈 워케이션', 'Southeast Asia cruise', '東南アジアクルーズ'),
    ports: loc('싱가포르 → 페낭 → 랑카위 → 푸켓', 'Singapore → Penang → Langkawi → Phuket', 'シンガポール→ペナン→ランカウイ→プーケット'),
    days: loc('10박 11일', '10 nights · 11 days', '10泊11日'),
  },
  {
    id: 'med',
    portQuery: 'Barcelona',
    img: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=800&q=80',
    price: '3,500,000',
    name: loc('지중해 크루즈 워케이션', 'Mediterranean cruise', '地中海クルーズ'),
    ports: loc('바르셀로나 → 로마 → 아테네 → 두브로브니크', 'Barcelona → Rome → Athens → Dubrovnik', 'バルセロナ→ローマ→アテネ→ドブロブニク'),
    days: loc('14박 15일', '14 nights · 15 days', '14泊15日'),
  },
]

const MARKET_FEATURES: FeatureItem[] = [
  { id: 'field', title: loc('현장 시장조사', 'On-site market research', '現地市場調査'), desc: loc('현지 도매상·박람회·로컬 유통망을 직접 눈으로 확인', 'Visit wholesalers, fairs & local distribution', '卸・展示会・流通を直接確認') },
  { id: 'network', title: loc('현지 네트워킹', 'Local networking', '現地ネットワーク'), desc: loc('같은 목적의 사업자들과 함께 이동하며 정보와 인사이트 공유', 'Travel with peers and share market insights', '同業者と移動し情報共有') },
  { id: 'connect', title: loc('사업 연결', 'Business connection', 'ビジネス接続'), desc: loc('발굴한 상품·파트너·시장 정보를 실제 사업에 바로 연결', 'Connect findings directly to your business', '発見を事業に直結') },
  { id: 'fair', title: loc('박람회 연계', 'Trade fair support', '展示会連携'), desc: loc('현지 전시회·박람회 참관 및 바이어 미팅 지원', 'Fair visits and buyer meetings', '展示会・バイヤーミーティング支援') },
]

const MARKET_UNITS: MarketUnit[] = [
  {
    id: 'osaka',
    stayQuery: 'Osaka',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    name: loc('일본 오사카 시장조사단', 'Osaka market research unit', '大阪市場調査団'),
    region: loc('오사카·도쿄', 'Osaka · Tokyo', '大阪・東京'),
    target: loc('이커머스·온라인 셀러', 'E-commerce sellers', 'EC・オンラインセラー'),
  },
  {
    id: 'guangzhou',
    stayQuery: 'Guangzhou',
    img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    name: loc('중국 광저우 무역박람회', 'Guangzhou trade fair tour', '広州貿易博覧会'),
    region: loc('광저우·선전', 'Guangzhou · Shenzhen', '広州・深圳'),
    target: loc('소싱·수입 사업자', 'Sourcing & importers', 'ソーシング・輸入事業者'),
  },
  {
    id: 'bangkok',
    stayQuery: 'Bangkok',
    img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    name: loc('태국 방콕 시장조사단', 'Bangkok market research unit', 'バンコク市場調査団'),
    region: loc('방콕·치앙마이', 'Bangkok · Chiang Mai', 'バンコク・チェンマイ'),
    target: loc('동남아 시장 진출 사업자', 'SEA market entrants', '東南アジア進出事業者'),
  },
]

const GLOBAL_DESTINATIONS: GlobalDest[] = [
  { id: 'bali', stayQuery: 'Ubud', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', name: loc('발리 워케이션', 'Bali workation', 'バリ・ワーケーション'), country: loc('인도네시아', 'Indonesia', 'インドネシア'), region: loc('발리 우붓·짱구', 'Ubud · Seminyak', 'ウブド・スミニャック'), tag: loc('정글·바다', 'Jungle · sea', 'ジャングル・海') },
  { id: 'chiangmai', stayQuery: 'Chiang Mai', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80', name: loc('치앙마이 워케이션', 'Chiang Mai workation', 'チェンマイ'), country: loc('태국', 'Thailand', 'タイ'), region: loc('치앙마이 님만', 'Nimman, Chiang Mai', 'ニマン'), tag: loc('도심·자연', 'City · nature', '都市・自然') },
  { id: 'japan', stayQuery: 'Tokyo', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80', name: loc('오사카·도쿄 워케이션', 'Osaka · Tokyo workation', '大阪・東京'), country: loc('일본', 'Japan', '日本'), region: loc('오사카·도쿄', 'Osaka · Tokyo', '大阪・東京'), tag: loc('비즈니스', 'Business', 'ビジネス') },
  { id: 'japan-ryokan', stayQuery: 'Hakone', img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80', name: loc('일본 료칸 온천 워케이션', 'Japan Ryokan & Onsen Workation', '日本旅館・温泉ワーケーション'), country: loc('일본', 'Japan', '日本'), region: loc('하코네·아타미·닛코', 'Hakone · Atami · Nikko', '箱根・熱海・日光'), tag: loc('료칸·온천', 'Ryokan · Onsen', '旅館・温泉') },
  { id: 'danang', stayQuery: 'Da Nang', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80', name: loc('다낭 워케이션', 'Da Nang workation', 'ダナン'), country: loc('베트남', 'Vietnam', 'ベトナム'), region: loc('다낭·호이안', 'Da Nang · Hoi An', 'ダナン・ホイアン'), tag: loc('해변', 'Beach', 'ビーチ') },
  { id: 'cebu', stayQuery: 'Cebu', img: 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=800&q=80', name: loc('세부 워케이션', 'Cebu workation', 'セブ'), country: loc('필리핀', 'Philippines', 'フィリピン'), region: loc('세부', 'Cebu', 'セブ'), tag: loc('어학+워케이션', 'Language + workation', '語学＋ワーケーション') },
  { id: 'australia', stayQuery: 'Sydney', img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80', name: loc('시드니·멜버른', 'Sydney · Melbourne', 'シドニー・メルボルン'), country: loc('호주', 'Australia', 'オーストラリア'), region: loc('NSW·VIC', 'NSW · VIC', 'NSW・VIC'), tag: loc('선진국 인프라', 'Premium infrastructure', '先進インフラ') },
  { id: 'japan-golf', stayQuery: 'Okinawa', img: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80', name: loc('일본 골프 네트워킹 워케이션', 'Japan Golf Networking Workation', '日本ゴルフネットワークワーケーション'), country: loc('일본', 'Japan', '日本'), region: loc('오키나와·규슈·도쿄', 'Okinawa · Kyushu · Tokyo', '沖縄・九州・東京'), tag: loc('골프·네트워킹', 'Golf · Networking', 'ゴルフ・ネットワーク') },
]

export const DOMESTIC_CURRENT: DomesticCurrent[] = [
  {
    id: 'yangyang-1',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    href: '/programs/domestic',
    price: '290,000',
    originalPrice: '399,000',
    recruitEnd: '2026-06-16',
    eventEnd: '2026-06-19',
    date: loc('2026년 6월 17–19일 진행 완료', 'Completed Jun 17–19, 2026', '2026年6月17〜19日 終了'),
    duration: loc('2박 3일', '2 nights · 3 days', '2泊3日'),
    name: loc('양양 Wakation 파일럿 프로그램', 'Yangyang Wakation Pilot Program', '襄陽Wakationパイロットプログラム'),
    region: loc('강원도 양양', 'Yangyang, Gangwon', '江原道・襄陽'),
    desc: loc(
      '바다가 보이는 탁 트인 환경에서 일하고, 쉬고, 연결되는 2박 3일. 딱딱한 교육이 아닌 네트워킹형 워케이션입니다.',
      'Work, rest, and connect in an open ocean-view setting — a networking-first workation, not a seminar.',
      '海が見える開放的な環境で働き、休み、繋がる2泊3日。教育ではなくネットワーキング型ワーケーション。'
    ),
    includes: loc(
      ['2박 숙박 (2인 1실)', '바베큐 네트워킹 파티', '자유 업무 시간', '자연스러운 네트워킹'],
      ['2-night stay (shared room)', 'BBQ networking party', 'Free work time', 'Organic networking'],
      ['2泊宿泊（2人1室）', 'BBQネットワーキング', '自由業務時間', '自然なネットワーキング']
    ),
  },
]

const DOMESTIC_UPCOMING: SimpleCard[] = [
  { id: 'gangneung', img: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80', title: loc('강릉 워케이션', 'Gangneung workation', '江陵ワーケーション'), region: loc('강원도 강릉', 'Gangneung, Gangwon', '江原・江陵') },
  { id: 'jeju', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', title: loc('제주 워케이션', 'Jeju workation', '済州ワーケーション'), region: loc('제주도', 'Jeju Island', '済州島') },
  { id: 'jeonju', img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80', title: loc('전주 워케이션', 'Jeonju workation', '全州ワーケーション'), region: loc('전라북도 전주', 'Jeonju, Jeollabuk', '全北・全州') },
  { id: 'yeosu', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80', title: loc('여수 워케이션', 'Yeosu workation', '麗水ワーケーション'), region: loc('전라남도 여수', 'Yeosu, Jeollanam', '全南・麗水') },
]

type DomesticThemedProgram = {
  id: string
  img: string
  theme: Loc<string>
  name: Loc<string>
  region: Loc<string>
  date: Loc<string>
  isGlobal?: boolean
}

const DOMESTIC_THEMED_UPCOMING: DomesticThemedProgram[] = [
  {
    id: 'healing-taean',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    theme: loc('🧘 힐링·요가', '🧘 Healing · Yoga', '🧘 ヒーリング・ヨガ'),
    name: loc('번아웃 탈출 힐링 워케이션', 'Burnout Recovery Workation', 'バーンアウト回復ワーケーション'),
    region: loc('충남 태안', 'Taean, Chungnam', '忠南・泰安'),
    date: loc('2026년 하반기 예정', '2H 2026 (TBD)', '2026年下半期予定'),
  },
  {
    id: 'network-chuncheon',
    img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    theme: loc('🤝 1인기업 네트워킹', '🤝 Networking', '🤝 ネットワーキング'),
    name: loc('1인 기업가 네트워킹 캠프', 'Solopreneur Networking Camp', '一人起業家ネットワーキング'),
    region: loc('강원 춘천', 'Chuncheon, Gangwon', '江原・春川'),
    date: loc('2026년 하반기 예정', '2H 2026 (TBD)', '2026年下半期予定'),
  },
  {
    id: 'ai-sokcho',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
    theme: loc('🚀 AI 크리에이터', '🚀 AI Creator', '🚀 AIクリエイター'),
    name: loc('AI 활용 실무 집중 캠프', 'AI Skills Intensive Camp', 'AI実務集中キャンプ'),
    region: loc('강원 속초', 'Sokcho, Gangwon', '江原・束草'),
    date: loc('8월 예정', 'Aug (TBD)', '8月予定'),
  },
  {
    id: 'local-jeonju',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    theme: loc('🍜 미식·로컬', '🍜 Local Food', '🍜 ローカルグルメ'),
    name: loc('전주 한옥마을 미식 워케이션', 'Jeonju Hanok Village Food Workation', '全州ハノク村グルメ旅'),
    region: loc('전라북도 전주', 'Jeonju, Jeollabuk', '全北・全州'),
    date: loc('8월 예정', 'Aug (TBD)', '8月予定'),
  },
  {
    id: 'golf-jeju',
    img: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80',
    theme: loc('⛳ 골프 네트워킹', '⛳ Golf Networking', '⛳ ゴルフネットワーク'),
    name: loc('제주 골프 비즈니스 워케이션', 'Jeju Golf Business Workation', '済州ゴルフ・ビジネス'),
    region: loc('제주도', 'Jeju Island', '済州島'),
    date: loc('9월 예정', 'Sep (TBD)', '9月予定'),
  },
  {
    id: 'golf-okinawa',
    img: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80',
    theme: loc('⛳ 골프 네트워킹 · 해외', '⛳ Golf Networking · Overseas', '⛳ ゴルフネットワーク・海外'),
    name: loc('일본 오키나와 골프 워케이션', 'Okinawa Golf Workation', '沖縄ゴルフワーケーション'),
    region: loc('일본 오키나와', 'Okinawa, Japan', '日本・沖縄'),
    date: loc('9월 예정', 'Sep (TBD)', '9月予定'),
    isGlobal: true,
  },
  {
    id: 'sports-busan',
    img: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80',
    theme: loc('🏟️ 스포츠 관람', '🏟️ Sports Watching', '🏟️ スポーツ観戦'),
    name: loc('부산 야구·축구 스포츠 워케이션', 'Busan Sports Watching Workation', '釜山スポーツ観戦'),
    region: loc('부산광역시', 'Busan', '釜山'),
    date: loc('9월 예정', 'Sep (TBD)', '9月予定'),
  },
]

function mapStay(lang: Lang, items: StayItem[]) {
  return items.map((s) => ({
    id: s.id,
    bookingQuery: s.bookingQuery,
    img: s.img,
    score: s.score,
    price: s.price,
    wifi: s.wifi,
    name: tloc(lang, s.name),
    country: tloc(lang, s.country),
    region: tloc(lang, s.region),
    tag: tloc(lang, s.tag),
  }))
}

export function getStayAsia(lang: Lang) {
  return mapStay(lang, STAY_ASIA)
}
export function getStayOceania(lang: Lang) {
  return mapStay(lang, STAY_OCEANIA)
}

export function getActivities(lang: Lang) {
  return ACTIVITIES.map((a) => ({
    id: a.id,
    img: a.img,
    title: tloc(lang, a.title),
    region: tloc(lang, a.region),
    tag: tloc(lang, a.tag),
  }))
}

export function getWorkspaceFeatures(lang: Lang) {
  return WORKSPACE_FEATURES.map((f) => ({ id: f.id, title: tloc(lang, f.title), desc: tloc(lang, f.desc) }))
}

export function getLanguageFeatures(lang: Lang) {
  return LANG_FEATURES.map((f) => ({ id: f.id, title: tloc(lang, f.title), desc: tloc(lang, f.desc) }))
}

export function getLanguagePrograms(lang: Lang) {
  return LANG_PROGRAMS.map((p) => ({
    id: p.id,
    stayQuery: p.stayQuery,
    img: p.img,
    price: p.price,
    name: tloc(lang, p.name),
    country: tloc(lang, p.country),
    level: tloc(lang, p.level),
    duration: tloc(lang, p.duration),
    tags: tloc(lang, p.tags),
  }))
}

export function getCruiseFeatures(lang: Lang) {
  return CRUISE_FEATURES.map((f) => ({ id: f.id, title: tloc(lang, f.title), desc: tloc(lang, f.desc) }))
}

export function getCruiseRoutes(lang: Lang) {
  return CRUISE_ROUTES.map((r) => ({
    id: r.id,
    portQuery: r.portQuery,
    img: r.img,
    price: r.price,
    name: tloc(lang, r.name),
    ports: tloc(lang, r.ports),
    days: tloc(lang, r.days),
  }))
}

export function getMarketFeatures(lang: Lang) {
  return MARKET_FEATURES.map((f) => ({ id: f.id, title: tloc(lang, f.title), desc: tloc(lang, f.desc) }))
}

export function getMarketUnits(lang: Lang) {
  return MARKET_UNITS.map((u) => ({
    id: u.id,
    stayQuery: u.stayQuery,
    img: u.img,
    name: tloc(lang, u.name),
    region: tloc(lang, u.region),
    target: tloc(lang, u.target),
  }))
}

export function getGlobalDestinations(lang: Lang) {
  return GLOBAL_DESTINATIONS.map((d) => ({
    id: d.id,
    stayQuery: d.stayQuery,
    img: d.img,
    name: tloc(lang, d.name),
    country: tloc(lang, d.country),
    region: tloc(lang, d.region),
    tag: tloc(lang, d.tag),
  }))
}

export function getDomesticCurrent(lang: Lang) {
  const today = new Date().toISOString().slice(0, 10)
  return DOMESTIC_CURRENT
    .filter((p) => p.eventEnd >= today)
    .map((p) => ({
      id: p.id,
      img: p.img,
      href: p.href,
      price: p.price,
      originalPrice: p.originalPrice,
      date: p.date ? tloc(lang, p.date) : undefined,
      duration: tloc(lang, p.duration),
      name: tloc(lang, p.name),
      region: tloc(lang, p.region),
      desc: tloc(lang, p.desc),
      includes: tloc(lang, p.includes),
    }))
}

export function getDomesticCompleted(lang: Lang) {
  const today = new Date().toISOString().slice(0, 10)
  return DOMESTIC_CURRENT
    .filter((p) => p.eventEnd < today)
    .map((p) => ({
      id: p.id,
      img: p.img,
      date: p.date ? tloc(lang, p.date) : undefined,
      duration: tloc(lang, p.duration),
      name: tloc(lang, p.name),
      region: tloc(lang, p.region),
      desc: tloc(lang, p.desc),
    }))
}

export function getDomesticUpcoming(lang: Lang) {
  return DOMESTIC_UPCOMING.map((u) => ({
    id: u.id,
    img: u.img,
    title: tloc(lang, u.title),
    region: tloc(lang, u.region),
  }))
}

export function getDomesticThemedUpcoming(lang: Lang) {
  return DOMESTIC_THEMED_UPCOMING.map((p) => ({
    id: p.id,
    img: p.img,
    theme: tloc(lang, p.theme),
    name: tloc(lang, p.name),
    region: tloc(lang, p.region),
    date: tloc(lang, p.date),
    isGlobal: p.isGlobal ?? false,
  }))
}

export function getSampleSchedule(lang: Lang, _durationNights: number) {
  const days = [
    {
      day: loc('DAY 1 · 6월 17일(수)', 'DAY 1 · Jun 17 (Wed)', 'DAY 1 · 6月17日(水)'),
      title: loc('도착 · 체크인 · 첫 만남', 'Arrival · Check-in · First Meet', '到着・チェックイン・初対面'),
      items: loc(
        ['오후 양양 도착 및 숙소 체크인', '오리엔테이션 & 자기소개 (어떤 일을 하는지, 기대하는 점)', '자유 업무 및 휴식', '저녁 네트워킹 — 자신의 일·브랜드·프로젝트를 자연스럽게 소개'],
        ['Afternoon arrival & check-in', 'Orientation & intro (what you do, your goals)', 'Free work or rest', 'Evening networking — casual intro of your work & projects'],
        ['午後到着・チェックイン', 'オリエンテーション＆自己紹介', '自由業務・休憩', '夜ネットワーキング']
      ),
    },
    {
      day: loc('DAY 2 · 6월 18일(목)', 'DAY 2 · Jun 18 (Thu)', 'DAY 2 · 6月18日(木)'),
      title: loc('집중 업무 · 바다 · 바베큐 파티', 'Focus Work · Sea · BBQ Party', '集中ワーク・海・BBQパーティ'),
      items: loc(
        ['오전 집중 업무 시간 — 노트북 업무, 기획, 콘텐츠 제작 등 본인 업무에 집중', '점심 자유 식사 — 양양 로컬 공간 탐방', '오후 자유 업무 또는 해변 산책, 카페, 개인 휴식', '저녁 바베큐 네트워킹 파티 — 함께 식사하며 대화, 협력 가능성 탐색', '밤 자유 교류 시간 (희망자)'],
        ['Morning focus work — laptop, planning, content creation', 'Lunch free — explore Yangyang local spots', 'Afternoon free work or beach walk, cafe, rest', 'Evening BBQ networking — dinner, conversation, explore collaboration', 'Night free socializing (optional)'],
        ['午前集中ワーク', '昼食自由・ローカル探索', '午後自由業務or海散歩', '夜BBQネットワーキング', '夜の自由交流']
      ),
    },
    {
      day: loc('DAY 3 · 6월 19일(금)', 'DAY 3 · Jun 19 (Fri)', 'DAY 3 · 6月19日(金)'),
      title: loc('정리 · 경험 공유 · 해산', 'Wrap-up · Experience Share · Goodbye', 'まとめ・体験共有・解散'),
      items: loc(
        ['오전 자유 업무 또는 마지막 휴식', '워케이션 경험 공유 — 느낀 점, 새로운 연결, 가능성을 가볍게 나누기', '정오 전후 체크아웃 및 자유 해산', '이후 자율 일정 — 더 머물거나 각자 이동'],
        ['Morning free work or last rest', 'Share workation experience — reflections, connections, possibilities', 'Checkout around noon, free departure', 'Free individual plans after — extend your stay or head home'],
        ['午前自由業務・最後の休憩', 'ワーケーション体験共有', '正午前後チェックアウト', '自由解散']
      ),
    },
  ]
  return days.map((d) => ({
    day: tloc(lang, d.day),
    title: tloc(lang, d.title),
    items: tloc(lang, d.items),
  }))
}

export function getCategoryLabels(lang: Lang): Record<string, string> {
  return {
    growth: tloc(lang, loc('성장 캠프', 'Growth camp', '成長キャンプ')),
    healing: tloc(lang, loc('힐링·휴식', 'Healing & rest', 'ヒーリング')),
    network: tloc(lang, loc('네트워킹', 'Networking', 'ネットワーキング')),
    global: tloc(lang, loc('해외 연계', 'Global', '海外連携')),
  }
}

export function getStatusLabels(lang: Lang): Record<string, string> {
  return {
    open: tloc(lang, loc('모집중', 'Open', '募集中')),
    soon: tloc(lang, loc('사전예약', 'Pre-register', '事前予約')),
    full: tloc(lang, loc('마감', 'Full', '満席')),
    closed: tloc(lang, loc('종료', 'Closed', '終了')),
  }
}

export function getJobTypeOptions(lang: Lang) {
  const labels = loc(
    ['1인 기업가', '프리랜서', '온라인 셀러 (스마트스토어·쿠팡·아마존 등)', '마케터 / 크리에이터', '디자이너', '개발자', '직장인 (부업 병행)', '기타'],
    ['Solopreneur', 'Freelancer', 'Online seller (Smart Store, Coupang, Amazon, etc.)', 'Marketer / Creator', 'Designer', 'Developer', 'Employed (side project)', 'Other'],
    ['一人社長', 'フリーランス', 'オンラインセラー', 'マーケター/クリエイター', 'デザイナー', '開発者', '会社員（副業）', 'その他']
  )
  return tloc(lang, labels)
}

export function getInterestOptions(lang: Lang) {
  const labels = loc(
    ['AI 활용', '마케팅', '디자인', '어학', '글로벌 진출', '네트워킹', '브랜딩', '사업 전략'],
    ['AI skills', 'Marketing', 'Design', 'Language', 'Global expansion', 'Networking', 'Branding', 'Business strategy'],
    ['AI活用', 'マーケティング', 'デザイン', '語学', 'グローバル進出', 'ネットワーク', 'ブランディング', '事業戦略']
  )
  return tloc(lang, labels)
}

export function getRestOptions(lang: Lang) {
  const labels = loc(
    ['힐링·명상', '액티비티', '로컬 맛집·카페', '자연·산책', '문화 체험'],
    ['Healing · meditation', 'Activities', 'Local food & cafés', 'Nature walks', 'Cultural experiences'],
    ['ヒーリング・瞑想', 'アクティビティ', 'グルメ・カフェ', '自然散策', '文化体験']
  )
  return tloc(lang, labels)
}

export function getApplyProgramOptions(lang: Lang) {
  return [
    { value: '', label: tloc(lang, loc('선택해 주세요', 'Please select', '選択してください')) },
    { value: 'healing-taean', label: tloc(lang, loc('번아웃 탈출 힐링 워케이션 — 충남 태안 (하반기 예정)', 'Burnout healing workation — Taean (2H 2026, TBD)', 'ヒーリング — 泰安（下半期予定）')) },
    { value: 'network-chuncheon', label: tloc(lang, loc('1인 기업가 네트워킹 캠프 — 강원 춘천 (하반기 예정)', 'Solopreneur networking — Chuncheon (2H 2026, TBD)', 'ネットワーキング — 春川（下半期予定）')) },
    { value: 'japan-osaka', label: tloc(lang, loc('일본 시장조사 워케이션 (2026년 하반기 예정)', 'Japan market research (2H 2026, TBD)', '日本市場調査（2026年下半期予定）')) },
    { value: 'design-tongyeong', label: tloc(lang, loc('디자인 & 브랜딩 집중 캠프 — 경남 통영 (2026년 하반기 예정)', 'Design & branding camp — Tongyeong (2H 2026, TBD)', 'デザインキャンプ（2026年下半期予定）')) },
    { value: 'undecided', label: tloc(lang, loc('아직 정하지 않았어요 (추천받고 싶어요)', 'Not sure yet (want recommendations)', 'まだ決めていない（おすすめ希望）')) },
  ]
}

export function getCompanionOptions(lang: Lang) {
  return tloc(
    lang,
    loc(
      ['혼자 참가', '2명 (본인 포함)', '3명 (본인 포함)', '4명 이상'],
      ['Solo', '2 people (incl. me)', '3 people (incl. me)', '4+ people'],
      ['一人参加', '2名（本人含む）', '3名（本人含む）', '4名以上']
    )
  )
}

export function getWorkStyleOptions(lang: Lang) {
  return [
    { val: 'focus', label: tloc(lang, loc('집중 근무가 필요해요 (업무 처리 목적)', 'I need deep focus (work-first)', '集中して仕事したい')) },
    { val: 'relaxed', label: tloc(lang, loc('여유롭게 일해도 돼요 (힐링 우선)', 'Relaxed pace (rest-first)', 'ゆったり（休息優先）')) },
    { val: 'balanced', label: tloc(lang, loc('반반이에요 (균형을 원해요)', 'Balanced work and rest', '仕事と休息のバランス')) },
  ]
}

export function getDurationOptions(lang: Lang) {
  return tloc(lang, loc(
    ['2박 3일', '3박 4일', '4박 5일', '5박 6일 이상', '미정'],
    ['2 nights · 3 days', '3 nights · 4 days', '4 nights · 5 days', '5+ nights', 'Undecided'],
    ['2泊3日', '3泊4日', '4泊5日', '5泊6日以上', '未定']
  ))
}

export function getBudgetOptions(lang: Lang) {
  return tloc(lang, loc(
    ['50만원 이하', '50~100만원', '100~150만원', '150만원 이상', '미정'],
    ['Under ₩500k', '₩500k–1M', '₩1M–1.5M', '₩1.5M+', 'Undecided'],
    ['50万ウォン以下', '50〜100万', '100〜150万', '150万以上', '未定']
  ))
}

export function translatePriceInclude(lang: Lang, item: string): string {
  const map: Record<string, Loc<string>> = {
    '숙박비': loc('숙박비', 'Accommodation', '宿泊費'),
    '공유오피스 이용료': loc('공유오피스 이용료', 'Coworking fee', 'コワーキング利用料'),
    '프로그램 참가비': loc('프로그램 참가비', 'Program fee', 'プログラム参加費'),
    '조식': loc('조식', 'Breakfast', '朝食'),
    '석식': loc('석식', 'Dinner', '夕食'),
    '항공권': loc('항공권', 'Flights', '航空券'),
    '업무 공간': loc('업무 공간', 'Work space', 'ワークスペース'),
    '시장조사 투어': loc('시장조사 투어', 'Market research tour', '市場調査ツアー'),
    '요가 클래스': loc('요가 클래스', 'Yoga class', 'ヨガクラス'),
    '네트워킹 프로그램': loc('네트워킹 프로그램', 'Networking program', 'ネットワーキング'),
    '조식·석식': loc('조식·석식', 'Breakfast & dinner', '朝食・夕食'),
  }
  return map[item] ? tloc(lang, map[item]) : item
}

// ─────────────────────────────────────────────────────────────────────────────
// /programs — Wakation Select 파트너 카테고리 12종
// ─────────────────────────────────────────────────────────────────────────────

export type SelectCategoryStatus = 'recruiting' | 'reviewing' | 'preparing' | 'inquiry'

type SelectCategory = {
  id: string
  emoji: string
  status: SelectCategoryStatus
  ctaHref: string
  name: Loc<string>
  desc: Loc<string>
  cta: Loc<string>
}

const SELECT_CATEGORY_STATUS_LABEL: Record<SelectCategoryStatus, Loc<string>> = {
  recruiting: loc('파트너 모집중', 'Recruiting partners', 'パートナー募集中'),
  reviewing: loc('제휴 검토중', 'In discussion', '提携検討中'),
  preparing: loc('준비중', 'Coming soon', '準備中'),
  inquiry: loc('사전 문의 가능', 'Inquiries open', '事前問い合わせ可'),
}

const CTA_PROPOSE = loc('파트너 제안하기', 'Propose partnership', 'パートナー提案')
const CTA_INQUIRE = loc('제휴 문의', 'Partnership inquiry', '提携問い合わせ')
const CTA_NOTIFY = loc('알림 받기', 'Get notified', '通知を受け取る')
const CTA_PRE = loc('사전 문의', 'Early inquiry', '事前問い合わせ')

const SELECT_CATEGORIES_DATA: SelectCategory[] = [
  { id: 'stay', emoji: '🏨', status: 'recruiting', ctaHref: 'mailto:wakation.sf@gmail.com?subject=숙소·장기체류%20파트너%20제안', cta: CTA_PROPOSE,
    name: loc('숙소·장기체류', 'Stays · long-term', '宿泊・長期滞在'),
    desc: loc('워케이션·장기체류에 최적화된 숙소. 주간/월간 단위 체류 상품을 파트너사와 연결합니다.', 'Stays optimized for workations and long-term travel — weekly and monthly products with partners.', 'ワーケーション・長期滞在向けの宿。週・月単位の滞在商品をパートナーと接続。') },
  { id: 'cowork', emoji: '💻', status: 'reviewing', ctaHref: 'mailto:wakation.sf@gmail.com?subject=코워킹%20제휴%20문의', cta: CTA_INQUIRE,
    name: loc('공유오피스·코워킹', 'Coworking spaces', 'コワーキング'),
    desc: loc('국내외 코워킹 스페이스와 공유오피스. 일 잘 되는 환경에서 일하는 사람을 위한 공간 파트너십.', 'Coworking spaces at home and abroad — space partnerships for people who work well anywhere.', '国内外のコワーキング・シェアオフィス。働く人のための空間パートナーシップ。') },
  { id: 'activity', emoji: '🌿', status: 'preparing', ctaHref: 'mailto:wakation.sf@gmail.com?subject=현지%20체험%20알림%20신청', cta: CTA_NOTIFY,
    name: loc('현지 체험', 'Local experiences', '現地体験'),
    desc: loc('현지에서만 경험할 수 있는 투어·액티비티·문화 체험. 워케이션 참가자 대상 큐레이션 예정.', 'Tours, activities and culture you can only find on location — curation for workationers.', '現地でしかできないツアー・体験。ワーケーター向けキュレーション予定。') },
  { id: 'transport', emoji: '✈️', status: 'reviewing', ctaHref: 'mailto:wakation.sf@gmail.com?subject=교통·항공%20제휴%20문의', cta: CTA_INQUIRE,
    name: loc('교통·항공·이동', 'Flights & transport', '交通・航空・移動'),
    desc: loc('워케이션 동선에 맞춘 항공권·렌터카·현지 교통 연결. 파트너 API 연동 검토 중.', 'Flights, rentals and local transport matched to workation routes. Partner API under review.', 'ワーケーション動線に合わせた航空券・レンタカー・交通。API連携検討中。') },
  { id: 'language', emoji: '📚', status: 'inquiry', ctaHref: 'mailto:wakation.sf@gmail.com?subject=어학·유학%20사전%20문의', cta: CTA_PRE,
    name: loc('어학·유학', 'Language stays', '語学・留学'),
    desc: loc('일본·영어·기타 외국어 집중 연수와 워케이션을 결합한 패키지. Select 상품으로 연결 예정.', 'Intensive language programs combined with workations — coming as Select products.', '語学集中研修とワーケーションを組み合わせたパッケージ。Select商品として接続予定。') },
  { id: 'visa', emoji: '🛂', status: 'preparing', ctaHref: '/visa-ai', cta: CTA_NOTIFY,
    name: loc('비자·체류 정보', 'Visa & stay info', 'ビザ・滞在情報'),
    desc: loc('국가별 워케이션 비자, 디지털 노마드 비자, 장기체류 허가. AI 기반 정보 제공 준비 중.', 'Workation visas, digital-nomad visas and long-stay permits by country — AI-powered guidance in prep.', '国別のワーケーションビザ・ノマドビザ・長期滞在許可。AI情報提供を準備中。') },
  { id: 'market', emoji: '📊', status: 'recruiting', ctaHref: 'mailto:wakation.sf@gmail.com?subject=시장조사단%20파트너%20제안', cta: CTA_PROPOSE,
    name: loc('시장조사단·박람회', 'Market research trips', '市場調査団・展示会'),
    desc: loc('해외 박람회 동반 참가 및 현장 리서치 프로그램. Wakation Hosted + Select 파트너 모집 중.', 'Trade-fair visits and on-site research programs — Hosted + Select partners wanted.', '海外展示会同行・現地リサーチ。Hosted＋Selectパートナー募集中。') },
  { id: 'cruise', emoji: '🚢', status: 'recruiting', ctaHref: 'mailto:wakation.sf@gmail.com?subject=크루즈%20워케이션%20제안', cta: CTA_PROPOSE,
    name: loc('크루즈', 'Cruise', 'クルーズ'),
    desc: loc('이동하면서 일하는 새로운 형태의 크루즈 워케이션. 파트너 모집 및 수요 조사 중.', 'A new way to work while you sail. Recruiting partners and gauging demand.', '移動しながら働くクルーズワーケーション。パートナー募集・需要調査中。') },
  { id: 'golf', emoji: '⛳', status: 'reviewing', ctaHref: 'mailto:wakation.sf@gmail.com?subject=골프·스포츠%20제휴%20문의', cta: CTA_INQUIRE,
    name: loc('골프·스포츠', 'Golf & sports', 'ゴルフ・スポーツ'),
    desc: loc('골프 포함 스포츠 워케이션 패키지. 국내외 골프 리조트 파트너십 검토 중.', 'Sports workation packages including golf — resort partnerships under review.', 'ゴルフを含むスポーツワーケーション。リゾート提携検討中。') },
  { id: 'education', emoji: '🎓', status: 'recruiting', ctaHref: 'mailto:wakation.sf@gmail.com?subject=교육·VOD%20파트너%20제안', cta: CTA_PROPOSE,
    name: loc('교육·VOD·강의', 'Education & courses', '教育・VOD・講座'),
    desc: loc('워케이션 중 성장을 위한 온·오프라인 강의, VOD, 코칭 프로그램. 에듀테크 파트너 모집 중.', 'Courses, VOD and coaching for growth on a workation — edtech partners wanted.', '成長のための講座・VOD・コーチング。エドテックパートナー募集中。') },
  { id: 'wellness', emoji: '🧘', status: 'inquiry', ctaHref: 'mailto:wakation.sf@gmail.com?subject=요가·힐링%20워케이션%20사전%20문의', cta: CTA_PRE,
    name: loc('요가·힐링', 'Yoga & wellness', 'ヨガ・ヒーリング'),
    desc: loc('요가 리트릿, 명상, 힐링 워케이션. 웰니스와 업무의 균형을 찾는 사람들을 위한 프로그램.', 'Yoga retreats, meditation and healing workations — for balance seekers.', 'ヨガリトリート・瞑想・ヒーリング。バランスを求める人のためのプログラム。') },
  { id: 'ryokan', emoji: '♨️', status: 'reviewing', ctaHref: 'mailto:wakation.sf@gmail.com?subject=료칸·온천%20제휴%20문의', cta: CTA_INQUIRE,
    name: loc('료칸·온천', 'Ryokan & onsen', '旅館・温泉'),
    desc: loc('일본 전통 료칸에서 업무와 온천을 함께. 일본 파트너사와 연결하는 고품격 워케이션.', 'Work and onsen at traditional Japanese ryokan — premium workations with Japan partners.', '伝統旅館で仕事と温泉を。日本パートナーとつなぐ上質なワーケーション。') },
]

export function getSelectCategories(lang: Lang) {
  return SELECT_CATEGORIES_DATA.map((c) => ({
    id: c.id,
    emoji: c.emoji,
    status: c.status,
    statusLabel: tloc(lang, SELECT_CATEGORY_STATUS_LABEL[c.status]),
    ctaHref: c.ctaHref,
    name: tloc(lang, c.name),
    desc: tloc(lang, c.desc),
    cta: tloc(lang, c.cta),
  }))
}

// ─────────────────────────────────────────────────────────────────────────────
// 지역 지원 프로그램 — 지자체 한달살기/워케이션 지원사업 큐레이션
// (2026-07 웹 리서치 검증. 마감·조건은 변동 가능 — 분기별 갱신 권장)
// 벤치마킹: monthler.kr — 최대지원금 환산 배지 + 상태칩 + 조건 태그
// ─────────────────────────────────────────────────────────────────────────────

export type SupportStatus = 'open' | 'always' | 'upcoming' | 'check'

type SupportProgram = {
  id: string
  photo: string          // 지역 사진 (검증 풀)
  region: Loc<string>
  name: Loc<string>
  benefit: Loc<string>       // 지원 내용 요약
  maxBenefit?: Loc<string>   // "최대 ₩300,000" 환산 배지 (불명확하면 생략)
  status: SupportStatus
  deadline: Loc<string>      // 마감/모집 상태 설명
  conditions: Loc<string[]>  // 조건 태그 (최대 3)
  href: string               // 공식 공고/신청 링크
  // 워크스펙 — 공고에 명시된 업무공간 정보만(추측 금지). 장기: Mbps·좌석 등 표준 필드 확장
  workSpec?: Loc<string>
}

const SUPPORT_STATUS_LABEL: Record<SupportStatus, Loc<string>> = {
  open: loc('모집중', 'Open now', '募集中'),
  always: loc('상시 모집', 'Rolling', '随時募集'),
  upcoming: loc('모집 예정', 'Opening soon', '募集予定'),
  check: loc('공고 확인', 'Check notice', '公告確認'),
}

const SUPPORT_PROGRAMS: SupportProgram[] = [
  {
    id: 'jeju-voucher',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    region: loc('제주', 'Jeju', '済州'),
    name: loc('제주 민간형 워케이션 바우처', 'Jeju Workation Voucher', '済州ワーケーションバウチャー'),
    benefit: loc('숙박+오피스 1박 최대 5만원, 파트너 오피스 17곳', 'Stay+office voucher up to ₩50,000/night at 17 partner offices', '宿泊＋オフィス1泊最大5万W、提携オフィス17カ所'),
    maxBenefit: loc('최대 ₩300,000', 'Up to ₩300,000', '最大₩300,000'),
    status: 'always',
    deadline: loc('예산 소진 시까지', 'Until budget runs out', '予算消化まで'),
    conditions: loc(['도외 재직자·사업자', '3박 4일 이상'], ['Non-Jeju workers', '3+ nights'], ['道外の在職者', '3泊以上']),
    // 2026-07-18 재검증: 오피스 17곳 유효(공식 목록), 오피스별 좌석·운영시간은 상세 페이지에 명시
    workSpec: loc('오피스 17곳·24h 거점 포함', '17 offices, some 24h', 'オフィス17カ所·24h拠点あり'),
    href: 'https://www.jeju.go.kr/workation/Supportproject/list.htm',
  },
  {
    id: 'busan-workation',
    photo: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=700&q=80',
    region: loc('부산', 'Busan', '釜山'),
    name: loc('부산형 워케이션', 'Busan Workation', '釜山型ワーケーション'),
    benefit: loc('업무공간 무료 + 웰컴키트 + 관광 바우처·할인쿠폰', 'Free workspace + welcome kit + tour vouchers', 'ワークスペース無料＋観光バウチャー'),
    maxBenefit: loc('공간 무료', 'Free workspace', 'スペース無料'),
    status: 'always',
    deadline: loc('상시 (기업등록 후 신청)', 'Rolling (register first)', '随時（企業登録後）'),
    conditions: loc(['부산 외 재직자·대표', '재직증명 필요'], ['Non-Busan workers', 'Proof of work'], ['釜山外の在職者', '在職証明']),
    // 2026-07-18 정밀화: 부산역 거점센터 708.5㎡·50석·폰부스 4실·평일 08~20시 (부산시 공식 보도자료)
    workSpec: loc('거점 50석·폰부스 4실', '50 seats & 4 phone booths', '拠点50席·ブース4室'),
    href: 'https://www.busaness.com/',
  },
  {
    id: 'gangwon-workation',
    photo: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=700&q=80',
    region: loc('강원', 'Gangwon', '江原'),
    name: loc('강원 워케이션', 'Gangwon Workation', '江原ワーケーション'),
    benefit: loc('숙박 3박 + 공유오피스 + 지역체험 패키지', '3-night stay + coworking + local experiences', '宿泊3泊＋コワーキング＋体験'),
    maxBenefit: loc('3박 패키지', '3-night package', '3泊パッケージ'),
    status: 'check',
    deadline: loc('회차별 모집 — 공고 확인', 'Batch-based — check notice', '回次別募集'),
    conditions: loc(['재직자·프리랜서·특고', '4대보험 또는 증빙'], ['Workers & freelancers', 'Proof required'], ['在職者・フリーランス']),
    // 2026-07-18 정밀화: 얼라이언스 9개 운영사(데스커·MGRV·디어먼데이·웨이브웍스 등, 공식 사이트)
    workSpec: loc('공유오피스 9개 운영사', '9 coworking operators', 'コワーキング9運営社'),
    href: 'https://worcation.co.kr/gw/enroll',
  },
  {
    id: 'muan-jeonnam',
    photo: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=700&q=80',
    region: loc('전남 무안', 'Muan', '務安'),
    name: loc('전남에서 살아보기 (무안)', 'Live in Jeonnam (Muan)', '全南で暮らしてみる'),
    benefit: loc('휴양마을 최장 3개월 체류 + 숙박 제공', 'Up to 3-month village stay, lodging provided', '最長3カ月滞在＋宿泊提供'),
    maxBenefit: loc('3개월 숙박', '3-month stay', '3カ月宿泊'),
    status: 'upcoming',
    deadline: loc('8월 2차 모집 예정', '2nd batch in August', '8月2次募集予定'),
    conditions: loc(['타 시도 도시민', '귀농귀촌 관심자'], ['Non-Jeonnam urbanites', 'Rural-life interest'], ['他市道の都市民']),
    href: 'https://www.greendaero.go.kr/',
  },
  {
    id: 'rural-living',
    photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80',
    region: loc('전국', 'Nationwide', '全国'),
    name: loc('농촌에서 살아보기', 'Rural Living Program', '農村で暮らしてみる'),
    benefit: loc('숙소 무료 + 월 30만원 연수비 (인구감소지역 마을)', 'Free stay + ₩300,000/month stipend', '宿無料＋月30万W研修費'),
    maxBenefit: loc('월 ₩300,000+숙소', '₩300,000/mo + stay', '月₩300,000＋宿泊'),
    status: 'always',
    deadline: loc('마을별 상시/기수별 모집', 'Village-based rolling', '村別に随時'),
    conditions: loc(['만 19세 이상', '타 지역 거주', 'SNS 과제'], ['Age 19+', 'Non-local', 'SNS tasks'], ['満19歳以上', '他地域居住']),
    href: 'https://www.greendaero.go.kr/',
  },
  {
    id: 'chungnam-month',
    photo: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=700&q=80',
    region: loc('충남', 'Chungnam', '忠南'),
    name: loc('충남 한달살기', 'Chungnam Month-Stay', '忠南1カ月暮らし'),
    benefit: loc('6~29박 숙박비 + 식비·교통비 일부 + 체험활동비 + 여행자보험 (시군별 상이)', '6–29 nights lodging + meals/transport aid + activities + insurance', '6〜29泊宿泊費＋食費・交通一部＋体験費＋保険'),
    maxBenefit: loc('최대 29박 지원', 'Up to 29 nights', '最大29泊支援'),
    status: 'check',
    deadline: loc('시군별 순차 모집 — 공고 확인', 'By city/county — check notices', '市郡別に順次募集'),
    conditions: loc(['충남 외 거주 성인', '시군별 정원제'], ['Non-Chungnam adults', 'Quota per county'], ['忠南外居住の成人']),
    href: 'https://tour.chungnam.go.kr',
  },
  {
    id: 'ulsan-ucation',
    photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    region: loc('울산', 'Ulsan', '蔚山'),
    name: loc('유케이션 (울산 워케이션)', 'U-cation (Ulsan Workation)', 'ユケーション（蔚山）'),
    benefit: loc('숙박+체험 포함 참가비 2만원(1박)~18.5만원 — 대폭 보조 운영', 'Stay+activities from just ₩20,000/night — heavily subsidized', '宿泊＋体験込み参加費2万W〜（大幅補助）'),
    maxBenefit: loc('참가비 ₩20,000~', 'Fee from ₩20,000', '参加費₩20,000〜'),
    status: 'always',
    deadline: loc('2026.4~11 평일 상시 (예산 소진 시 종료)', 'Rolling Apr–Nov weekdays', '2026.4〜11 平日随時'),
    conditions: loc(['울산 외 근로자·사업자', '프리랜서·특고 가능'], ['Non-Ulsan workers', 'Freelancers OK'], ['蔚山外の勤労者']),
    href: 'https://uctf.or.kr/tour-mice/ucation/intro',
  },
  {
    id: 'incheon-workation',
    photo: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=700&q=80',
    region: loc('인천', 'Incheon', '仁川'),
    name: loc('인천 워케이션 (인천관광공사)', 'Incheon Workation (ITO)', '仁川ワーケーション（仁川観光公社）'),
    benefit: loc('개항장·영종도·송도 호텔 워케이션 상품 8종 — 오션뷰·미팅룸·체험 결합, 인천관광공사 운영', '8 hotel workation packages (Gaehangjang·Yeongjong·Songdo) — ocean view, meeting rooms, activities', '開港場・永宗島・松島のホテルワーケーション8種（仁川観光公社運営）'),
    maxBenefit: loc('호텔 패키지 8종', '8 hotel packages', 'ホテル8種'),
    status: 'always',
    deadline: loc('연중 상품 운영 (호텔별 예약)', 'Year-round (book per hotel)', '通年運営（ホテル別予約）'),
    conditions: loc(['개인 신청 가능', '평일 2박 이상'], ['Individuals OK', 'Weekday 2+ nights'], ['個人申請可', '平日2泊以上']),
    // 2026-07-18 정밀화: 워케이션 호텔 5곳(하버파크·오라카이 송도·오크우드·더위크앤·그랜드하얏트, ITO 보도자료)
    workSpec: loc('호텔 5곳·미팅룸 결합', '5 hotels w/ meeting rooms', 'ホテル5カ所·会議室付き'),
    href: 'https://www.ito.or.kr/main/',
  },
  {
    id: 'eochon-workation',
    photo: 'https://images.unsplash.com/photo-1617653202545-931490e8d7e7?auto=format&fit=crop&w=700&q=80',
    region: loc('전국 어촌', 'Fishing villages', '全国漁村'),
    name: loc('어촌마을 워케이션', 'Fishing Village Workation', '漁村ワーケーション'),
    benefit: loc('전국 13개 어촌휴양마을 — 공유오피스+숙박+조식+체험, 체류일수별 차등 지원', '13 seaside villages — coworking+stay+breakfast+activities, tiered support', '全国13漁村 — オフィス＋宿泊＋朝食＋体験'),
    maxBenefit: loc('숙박+오피스 지원', 'Stay + office support', '宿泊＋オフィス支援'),
    status: 'open',
    deadline: loc('연중 모집 (2026.4~)', 'Open year-round', '通年募集'),
    conditions: loc(['개인 신청 가능', '원격근무 가능자'], ['Individuals OK', 'Remote-workable'], ['個人申請可', 'リモート可']),
    // 2026-07-18 정밀화: 2026년 13개 마을 확정(공단 공지)
    workSpec: loc('13개 마을 공유오피스', 'Coworking in 13 villages', '13漁村コワーキング'),
    href: 'https://www.seantour.kr',
  },
  {
    id: 'jeonbuk-worcation',
    photo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=700&q=80',
    region: loc('전북', 'Jeonbuk', '全北'),
    name: loc('전북형 워케이션', 'Jeonbuk Workation', '全北ワーケーション'),
    benefit: loc('호텔·리조트·풀빌라·템플스테이·캠핑카 등 다양한 숙소+오피스, 무주·부안·전주 등 14개 시군', 'Hotels·resorts·pool villas·templestay + offices across 14 cities/counties (Muju, Buan, Jeonju…)', 'ホテル・リゾート・寺泊など多様な宿＋オフィス、14市郡'),
    maxBenefit: loc('14개 시군 운영', '14 cities & counties', '14市郡で運営'),
    status: 'always',
    deadline: loc('연중 운영 (최소 1주 전 대기예약)', 'Year-round (reserve 1+ week ahead)', '通年運営（1週間前まで予約）'),
    conditions: loc(['국민 누구나 (재직 증빙)', '2박 3일 단위'], ['Anyone w/ work proof', '2N3D units'], ['在職証明で誰でも', '2泊3日単位']),
    // 2026-07-18 정밀화: 워케이션 센터 4곳(부안·순창·남원·장수, 전북도 공식 보도자료)
    workSpec: loc('전용 센터 4곳+오피스', '4 centers + offices', '専用センター4カ所'),
    href: 'https://jb-worcation.com/',
  },
  {
    id: 'jeonnam-blue-worcation',
    photo: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=700&q=80',
    region: loc('전남', 'Jeonnam', '全南'),
    name: loc('전남 블루 워케이션', 'Jeonnam Blue Workation', '全南ブルーワーケーション'),
    benefit: loc('여수·완도·보성 등 오피스+스테이+체험 40여 프로그램. 완도형=1박 숙박비 10만원·해양치유 할인·쏘카·워케이션패스', '40+ programs (Yeosu·Wando·Boseong): office+stay+activities. Wando: ₩100,000/night lodging, marine-healing discount, car share', '麗水・莞島など40+プログラム。莞島型=1泊宿泊費10万W・海洋治癒割引'),
    maxBenefit: loc('완도 1박 ₩100,000', 'Wando ₩100,000/night', '莞島1泊₩100,000'),
    status: 'open',
    deadline: loc('2026 모집중 (시군별 순차)', 'Recruiting 2026 (by city/county)', '2026募集中（市郡別）'),
    conditions: loc(['전남 외 임직원·프리랜서·사업자', '재직·사업자 증빙'], ['Non-Jeonnam workers/freelancers', 'Proof required'], ['全南外の勤労者・個人事業主', '在職・事業証明']),
    // 2026-07-18 정밀화: 오피스 12곳·7개 시군(공식몰 목록)
    workSpec: loc('7개 시군 오피스 12곳', '12 offices in 7 districts', '7市郡·オフィス12カ所'),
    href: 'https://worcation.ijnto.or.kr/',
  },
  {
    id: 'gyeongbuk-worcation',
    photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=700&q=80',
    region: loc('경북', 'Gyeongbuk', '慶北'),
    name: loc('경북형 워케이션', 'Gyeongbuk Workation', '慶北ワーケーション'),
    // 2026-07-19 재검증: 공식몰(tour054) 상품 24개 정상 판매 중 확인 — '1차 소진' 표기 stale라 open 전환
    benefit: loc('안동·의성·봉화·울진 등 워케이션 상품 24종 판매 중 + 교통비 최대 3만원 환급 + 여행자보험 + 웰컴키트, 2박3일~', '24 packages on sale (Andong·Uiseong·Bonghwa·Uljin) + up to ₩30,000 transit refund + insurance + welcome kit', '安東・義城・奉化・蔚珍など24商品販売中＋交通費最大3万W還付＋保険'),
    maxBenefit: loc('교통비 최대 ₩30,000 환급', 'Up to ₩30,000 transit refund', '交通費最大₩30,000還付'),
    status: 'open',
    deadline: loc('공식몰 상품 판매 중 (2026-07 확인)', 'On sale now (checked Jul 2026)', '公式モールで販売中'),
    conditions: loc(['재직 증빙 가능자', '직장 소재 시군 예약 불가'], ['Work-provable', 'Not your home city/county'], ['在職証明可', '勤務地の市郡は不可']),
    href: 'https://www.tour054.co.kr/goods/goods_list.php?cateCd=023',
  },
  {
    // 2026-07-19 신규: 경기도·경기관광공사. 2026-06 전역 확대(언론 보도 2026-06-05·07-01) 확인 후 추가.
    // 기존 제외 사유(민간 더휴일 채널만)는 ggtour.or.kr 공식 사업 페이지 확보로 해소 — href는 공식만(소싱 룰),
    // 신청 실동선(공식 지정 운영사 더휴일)은 conditions에 명시
    id: 'gyeonggi-healing-worcation',
    photo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=700&q=80',
    region: loc('경기', 'Gyeonggi', '京畿'),
    name: loc('경기 힐링 워케이션 (경기관광공사)', 'Gyeonggi Healing Workation', '京畿ヒーリングワーケーション'),
    benefit: loc(
      '도내 거점 11곳(파주·포천·연천·가평·동두천 + 양평·이천·수원 등) — 2박 이상 시 1박당 3만원 숙박 지원 (최대 4박)',
      '11 venues across Gyeonggi — ₩30,000/night lodging support for 2+ night stays (up to 4 nights)',
      '道内拠点11カ所 — 2泊以上で1泊3万W宿泊支援（最大4泊）',
    ),
    maxBenefit: loc('1박 ₩30,000 × 최대 4박', '₩30,000/night × up to 4', '1泊₩30,000×最大4泊'),
    status: 'open',
    deadline: loc('2026 운영 중 (2026-06 전역 확대)', 'Running in 2026 (expanded Jun 2026)', '2026年運営中'),
    conditions: loc(
      ['재직·사업자 증빙 (프리랜서 명함 가능)', '주중 2박 이상', '공식 운영사(더휴일) 통해 예약'],
      ['Proof of work/business (freelancer card OK)', 'Weekday 2+ nights', 'Book via official operator'],
      ['在職・事業証明', '平日2泊以上', '公式運営社経由で予約'],
    ),
    workSpec: loc('거점 11곳 (워케이션센터·호텔)', '11 venues (centers & hotels)', '拠点11カ所'),
    href: 'https://www.ggtour.or.kr/information/tourism/workation',
  },
]

export function getSupportPrograms(lang: Lang) {
  return SUPPORT_PROGRAMS.map((p) => ({
    id: p.id,
    photo: p.photo,
    region: tloc(lang, p.region),
    name: tloc(lang, p.name),
    benefit: tloc(lang, p.benefit),
    maxBenefit: p.maxBenefit ? tloc(lang, p.maxBenefit) : undefined,
    status: p.status,
    statusLabel: tloc(lang, SUPPORT_STATUS_LABEL[p.status]),
    deadline: tloc(lang, p.deadline),
    conditions: tloc(lang, p.conditions),
    workSpec: p.workSpec ? tloc(lang, p.workSpec) : undefined,
    href: p.href,
  }))
}
