import type { Lang } from './types'
import { loc, tloc, type Loc } from './locale'
import { MOCK_SPACES } from '@/lib/mock-data'
import type { Space } from '@/types'

type StayItem = {
  id: string
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
  img: string
  price: string
  name: Loc<string>
  ports: Loc<string>
  days: Loc<string>
}
type MarketUnit = { id: string; img: string; name: Loc<string>; region: Loc<string>; target: Loc<string> }
type GlobalDest = {
  id: string
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
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    price: '2,800,000',
    name: loc('필리핀 세부 어학연수', 'Cebu language stay', 'セブ語学留学'),
    country: loc('필리핀', 'Philippines', 'フィリピン'),
    level: loc('초~중급', 'Beginner–intermediate', '初〜中級'),
    duration: loc('4주~', '4+ weeks', '4週間〜'),
    tags: loc(['1:1 수업', '워케이션 포함', '숙소 제공'], ['1:1 lessons', 'Workation included', 'Stay included'], ['マンツーマン', 'ワーケーション込', '宿泊付']),
  },
  {
    id: 'tokyo',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    price: '3,500,000',
    name: loc('일본 도쿄 비즈니스 일본어', 'Tokyo business Japanese', '東京ビジネス日本語'),
    country: loc('일본', 'Japan', '日本'),
    level: loc('초~고급', 'All levels', '全レベル'),
    duration: loc('2주~', '2+ weeks', '2週間〜'),
    tags: loc(['비즈니스 특화', 'Qoo10 연계', '현지 기업 방문'], ['Business focus', 'Qoo10 Japan', 'Company visits'], ['ビジネス特化', 'Qoo10連携', '企業訪問']),
  },
  {
    id: 'malta',
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
    img: 'https://images.unsplash.com/photo-1560814304-4f05b62af116?auto=format&fit=crop&w=800&q=80',
    price: '5,800,000',
    name: loc('캐나다 밴쿠버 영어 연수', 'Vancouver English stay', 'バンクーバー英語留学'),
    country: loc('캐나다', 'Canada', 'カナダ'),
    level: loc('전 레벨', 'All levels', '全レベル'),
    duration: loc('4주~', '4+ weeks', '4週間〜'),
    tags: loc(['북미 영어', '취업 연계', '액티비티 포함'], ['North American English', 'Career support', 'Activities included'], ['北米英語', '就職連携', 'アクティビティ付']),
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
    img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80',
    price: '1,200,000',
    name: loc('동아시아 크루즈 워케이션', 'East Asia cruise workation', '東アジアクルーズ'),
    ports: loc('부산 → 후쿠오카 → 나가사키 → 상하이', 'Busan → Fukuoka → Nagasaki → Shanghai', '釜山→福岡→長崎→上海'),
    days: loc('7박 8일', '7 nights · 8 days', '7泊8日'),
  },
  {
    id: 'sea',
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=800&q=80',
    price: '1,800,000',
    name: loc('동남아 크루즈 워케이션', 'Southeast Asia cruise', '東南アジアクルーズ'),
    ports: loc('싱가포르 → 페낭 → 랑카위 → 푸켓', 'Singapore → Penang → Langkawi → Phuket', 'シンガポール→ペナン→ランカウイ→プーケット'),
    days: loc('10박 11일', '10 nights · 11 days', '10泊11日'),
  },
  {
    id: 'med',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
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
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    name: loc('일본 오사카 시장조사단', 'Osaka market research unit', '大阪市場調査団'),
    region: loc('오사카·도쿄', 'Osaka · Tokyo', '大阪・東京'),
    target: loc('이커머스·온라인 셀러', 'E-commerce sellers', 'EC・オンラインセラー'),
  },
  {
    id: 'guangzhou',
    img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    name: loc('중국 광저우 무역박람회', 'Guangzhou trade fair tour', '広州貿易博覧会'),
    region: loc('광저우·선전', 'Guangzhou · Shenzhen', '広州・深圳'),
    target: loc('소싱·수입 사업자', 'Sourcing & importers', 'ソーシング・輸入事業者'),
  },
  {
    id: 'bangkok',
    img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    name: loc('태국 방콕 시장조사단', 'Bangkok market research unit', 'バンコク市場調査団'),
    region: loc('방콕·치앙마이', 'Bangkok · Chiang Mai', 'バンコク・チェンマイ'),
    target: loc('동남아 시장 진출 사업자', 'SEA market entrants', '東南アジア進出事業者'),
  },
]

const GLOBAL_DESTINATIONS: GlobalDest[] = [
  { id: 'bali', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', name: loc('발리 워케이션', 'Bali workation', 'バリ・ワーケーション'), country: loc('인도네시아', 'Indonesia', 'インドネシア'), region: loc('발리 우붓·짱구', 'Ubud · Seminyak', 'ウブド・スミニャック'), tag: loc('정글·바다', 'Jungle · sea', 'ジャングル・海') },
  { id: 'chiangmai', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80', name: loc('치앙마이 워케이션', 'Chiang Mai workation', 'チェンマイ'), country: loc('태국', 'Thailand', 'タイ'), region: loc('치앙마이 님만', 'Nimman, Chiang Mai', 'ニマン'), tag: loc('도심·자연', 'City · nature', '都市・自然') },
  { id: 'japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80', name: loc('오사카·도쿄 워케이션', 'Osaka · Tokyo workation', '大阪・東京'), country: loc('일본', 'Japan', '日本'), region: loc('오사카·도쿄', 'Osaka · Tokyo', '大阪・東京'), tag: loc('비즈니스', 'Business', 'ビジネス') },
  { id: 'danang', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80', name: loc('다낭 워케이션', 'Da Nang workation', 'ダナン'), country: loc('베트남', 'Vietnam', 'ベトナム'), region: loc('다낭·호이안', 'Da Nang · Hoi An', 'ダナン・ホイアン'), tag: loc('해변', 'Beach', 'ビーチ') },
  { id: 'cebu', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', name: loc('세부 워케이션', 'Cebu workation', 'セブ'), country: loc('필리핀', 'Philippines', 'フィリピン'), region: loc('세부', 'Cebu', 'セブ'), tag: loc('어학+워케이션', 'Language + workation', '語学＋ワーケーション') },
  { id: 'australia', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80', name: loc('시드니·멜버른', 'Sydney · Melbourne', 'シドニー・メルボルン'), country: loc('호주', 'Australia', 'オーストラリア'), region: loc('NSW·VIC', 'NSW · VIC', 'NSW・VIC'), tag: loc('선진국 인프라', 'Premium infrastructure', '先進インフラ') },
]

const DOMESTIC_CURRENT: DomesticCurrent[] = [
  {
    id: 'yangyang-1',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    href: '/programs/yangyang-1',
    price: '299,000',
    originalPrice: '399,000',
    date: loc('6월 17일(수) – 19일(금)', 'Jun 17(Wed) – 19(Fri)', '6月17日(水)〜19日(金)'),
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
  { id: 'gangneung', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80', title: loc('강릉 워케이션', 'Gangneung workation', '江陵ワーケーション'), region: loc('강원도 강릉', 'Gangneung, Gangwon', '江原・江陵') },
  { id: 'jeju', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', title: loc('제주 워케이션', 'Jeju workation', '済州ワーケーション'), region: loc('제주도', 'Jeju Island', '済州島') },
  { id: 'jeonju', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80', title: loc('전주 워케이션', 'Jeonju workation', '全州ワーケーション'), region: loc('전라북도 전주', 'Jeonju, Jeollabuk', '全北・全州') },
  { id: 'yeosu', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80', title: loc('여수 워케이션', 'Yeosu workation', '麗水ワーケーション'), region: loc('전라남도 여수', 'Yeosu, Jeollanam', '全南・麗水') },
]

function mapStay(lang: Lang, items: StayItem[]) {
  return items.map((s) => ({
    id: s.id,
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
    img: u.img,
    name: tloc(lang, u.name),
    region: tloc(lang, u.region),
    target: tloc(lang, u.target),
  }))
}

export function getGlobalDestinations(lang: Lang) {
  return GLOBAL_DESTINATIONS.map((d) => ({
    id: d.id,
    img: d.img,
    name: tloc(lang, d.name),
    country: tloc(lang, d.country),
    region: tloc(lang, d.region),
    tag: tloc(lang, d.tag),
  }))
}

export function getDomesticCurrent(lang: Lang) {
  return DOMESTIC_CURRENT.map((p) => ({
    id: p.id,
    img: p.img,
    href: p.href,
    price: p.price,
    duration: tloc(lang, p.duration),
    name: tloc(lang, p.name),
    region: tloc(lang, p.region),
    desc: tloc(lang, p.desc),
    includes: tloc(lang, p.includes),
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
    { value: 'ai-sokcho', label: tloc(lang, loc('AI 활용 실무 집중 캠프 — 강원 속초 (6/12~15)', 'AI skills camp — Sokcho (Jun 12–15)', 'AI実務キャンプ — 束草')) },
    { value: 'marketing-gapyeong', label: tloc(lang, loc('온라인 마케팅 & 상세페이지 — 경기 가평 (6/26~29)', 'Online marketing camp — Gapyeong (Jun 26–29)', 'マーケティング — 加平')) },
    { value: 'healing-taean', label: tloc(lang, loc('번아웃 탈출 힐링 워케이션 — 충남 태안 (7/7~11)', 'Burnout healing workation — Taean (Jul 7–11)', 'ヒーリング — 泰安')) },
    { value: 'network-chuncheon', label: tloc(lang, loc('1인 기업가 네트워킹 캠프 — 강원 춘천 (7/23~26)', 'Solopreneur networking — Chuncheon (Jul 23–26)', 'ネットワーキング — 春川')) },
    { value: 'japan-osaka', label: tloc(lang, loc('일본 시장조사 워케이션 (8월 예정)', 'Japan market research (Aug, TBD)', '日本市場調査（8月予定）')) },
    { value: 'design-tongyeong', label: tloc(lang, loc('디자인 & 브랜딩 집중 캠프 — 경남 통영 (8월 예정)', 'Design & branding camp — Tongyeong (Aug, TBD)', 'デザインキャンプ（8月予定）')) },
    { value: 'yangyang-1', label: tloc(lang, loc('양양 Wakation 파일럿 — 6/17(수)~19(금)', 'Yangyang Wakation Pilot — Jun 17–19', '襄陽パイロット — 6/17〜19')) },
    { value: 'undecided', label: tloc(lang, loc('아직 정하지 않았어요 (추천받고 싶어요)', 'Not sure yet (want recommendations)', 'まだ決めていない（おすすめ希望）')) },
  ]
}

export function getYangyangDateOptions(lang: Lang) {
  return tloc(
    lang,
    loc(
      [
        '6월 17일(수) – 6월 19일(금) ← 확정 일정',
        '1인실 신청 (+30,000원/박)',
        '2인 1실 기본',
      ],
      [
        'Jun 17(Wed) – Jun 19(Fri) ← Confirmed',
        'Single room (+₩30,000/night)',
        'Shared room (default)',
      ],
      [
        '6月17日(水)〜19日(金) ← 確定日程',
        '1人室申請（+30,000ウォン/泊）',
        '2人1室（基本）',
      ]
    )
  )
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

export function getRegionLabel(lang: Lang, region: string): string {
  const map: Record<string, Loc<string>> = {
    jeju: loc('제주', 'Jeju', '済州'),
    gangwon: loc('강원', 'Gangwon', '江原'),
    jeonnam: loc('전남', 'South Jeolla', '全南'),
    busan: loc('부산', 'Busan', '釜山'),
  }
  return map[region] ? tloc(lang, map[region]) : region
}

export function getSpaceTypeLabel(lang: Lang, type: string): string {
  const map: Record<string, Loc<string>> = {
    coworking: loc('코워킹', 'Coworking', 'コワーキング'),
    cafe: loc('카페', 'Café', 'カフェ'),
    villa: loc('빌라', 'Villa', 'ヴィラ'),
    pension: loc('펜션', 'Pension', 'ペンション'),
  }
  return map[type] ? tloc(lang, map[type]) : type
}

export function getNoiseLevelLabel(lang: Lang, level: number): string {
  const map: Record<number, Loc<string>> = {
    1: loc('매우 조용', 'Very quiet', 'とても静か'),
    2: loc('조용', 'Quiet', '静か'),
    3: loc('보통', 'Moderate', '普通'),
    4: loc('약간 시끄러움', 'Slightly noisy', 'やや騒がしい'),
    5: loc('시끄러움', 'Noisy', '騒がしい'),
  }
  return map[level] ? tloc(lang, map[level]) : tloc(lang, loc('보통', 'Moderate', '普通'))
}

const SPACE_I18N: Record<
  string,
  { name: Loc<string>; description: Loc<string>; tags: Loc<string[]> }
> = {
  'space-001': {
    name: loc('애월 오션뷰 코워킹', 'Aewol ocean-view coworking', 'アウル・オーシャンビュー'),
    description: loc(
      '제주 애월 해안도로에 위치한 오션뷰 코워킹 공간. 넓은 창문으로 바다를 바라보며 집중할 수 있어요.',
      'Ocean-view coworking on Jeju’s Aewol coastal road — focus with wide windows facing the sea.',
      '済州アウル海岸沿い。海を見ながら集中できるコワーキング。'
    ),
    tags: loc(
      ['오션뷰', '조용함', '집중', '모니터 제공'],
      ['Ocean view', 'Quiet', 'Focus', 'Monitor'],
      ['オーシャンビュー', '静か', '集中', 'モニター']
    ),
  },
  'space-002': {
    name: loc('한림 감성 카페 스테이', 'Hallim café stay', 'ハンリム・カフェステイ'),
    description: loc(
      '제주 한림의 작은 감성 카페. 오전은 코워킹으로 오후는 카페로 운영돼 시간대별 분위기가 달라요.',
      'A cozy Hallim café — coworking in the morning, café vibe in the afternoon.',
      '済州ハンリムの小さなカフェ。午前はコワーキング、午後はカフェ。'
    ),
    tags: loc(['감성', '카페', '자연', '여유'], ['Cozy', 'Café', 'Nature', 'Relaxed'], ['雰囲気', 'カフェ', '自然', '余裕']),
  },
  'space-003': {
    name: loc('속초 산속 워케이션 빌라', 'Sokcho mountain villa', '束草・山のヴィラ'),
    description: loc(
      '설악산이 보이는 산속 빌라. 완전한 고독과 자연 속에서 깊은 집중을 원하는 분께 추천해요.',
      'Mountain villa with Seoraksan views — for deep focus in nature and solitude.',
      '雪岳山が見える山のヴィラ。自然の中で深く集中したい方に。'
    ),
    tags: loc(['산속', '고독', '집중', '자연', '프리미엄'], ['Mountain', 'Solitude', 'Focus', 'Nature', 'Premium'], ['山', '孤独', '集中', '自然', 'プレミアム']),
  },
  'space-004': {
    name: loc('강릉 바다 앞 코워킹', 'Gangneung beach coworking', '江陵・海辺コワーキング'),
    description: loc(
      '강릉 경포 해수욕장 앞에 위치한 코워킹 공간. 파도 소리를 들으며 작업할 수 있어요.',
      'Coworking in front of Gangneung’s Gyeongpo Beach — work with the sound of waves.',
      '江陵・경포海水浴場前。波の音を聞きながら仕事できる。'
    ),
    tags: loc(['바다뷰', '기가인터넷', '핫플', '코워킹'], ['Beach view', 'Gigabit', 'Trendy', 'Coworking'], ['海ビュー', 'ギガ回線', 'ホット', 'コワーキング']),
  },
  'space-005': {
    name: loc('여수 낭만항구 펜션 오피스', 'Yeosu harbor pension office', '麗水・ロマンチック港'),
    description: loc(
      '여수 돌산도의 낭만적인 항구 뷰 펜션. 별채 작업실이 있어 독립적인 업무 환경을 제공해요.',
      'Romantic harbor-view pension in Yeosu with a separate work annex.',
      '麗水・浪漫な港ビュー。別棟の作業室で独立した環境。'
    ),
    tags: loc(['낭만', '항구뷰', '독립작업실', '프라이빗'], ['Romantic', 'Harbor view', 'Private office', 'Private'], ['ロマン', '港', '独立作業室', 'プライベート']),
  },
  'space-006': {
    name: loc('부산 해운대 도심 코워킹', 'Busan Haeundae coworking', '釜山・海雲台'),
    description: loc(
      '해운대 번화가에 위치한 세련된 코워킹 공간. 네트워킹과 미팅에 최적화된 환경이에요.',
      'Stylish coworking in Haeundae — great for networking and meetings.',
      '海雲台の洗練されたコワーキング。ネットワーキングとミーティングに最適。'
    ),
    tags: loc(['도심', '네트워킹', '미팅룸', '세련됨'], ['Urban', 'Networking', 'Meeting room', 'Stylish'], ['都心', 'ネットワーク', '会議室', '洗練']),
  },
}

export function getLocalizedSpaces(lang: Lang): Space[] {
  return MOCK_SPACES.map((s) => {
    const i18n = SPACE_I18N[s.id]
    if (!i18n) return s
    return {
      ...s,
      name: tloc(lang, i18n.name),
      description: tloc(lang, i18n.description),
      tags: tloc(lang, i18n.tags),
    }
  })
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
