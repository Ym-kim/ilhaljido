import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 와케이션 모먼트 — 세로형 에디터 큐레이션 카드 (홈 레일)
//
// 원칙:
// - 사진은 코드베이스 내 검증 풀만 재사용 (세로 크롭은 URL w/h 파라미터로)
// - 가짜 후기·유저명 금지 → '에디터 픽' 큐레이션으로 명시
// - 각 모먼트는 /select/hotel#{anchor} 목적지 카드로 직결 (체류 → 예약 동선)
// ─────────────────────────────────────────────────────────────────────────────

export type Moment = {
  id: string
  /** 세로 크롭 사진 (검증 풀 재사용, w=500&h=800) */
  photo: string
  /** /select/hotel#{anchor} — destinations.ts id */
  anchor: string
  dest: Record<Lang, string>
  title: Record<Lang, string>
  tip: Record<Lang, string>
}

const P = (id: string) =>
  `/media/verified/unsplash/${id}.webp`

export const MOMENTS: Moment[] = [
  {
    id: 'moment-danang-sunset',
    photo: P('1559592413-7cec4d0cae2b'),
    anchor: 'vietnam-danang',
    dest: { KO: '다낭', EN: 'Da Nang', JP: 'ダナン' },
    title: {
      KO: '주말엔 바나힐,\n평일엔 비치 오피스',
      EN: 'Ba Na Hills weekend,\nbeach office weekdays',
      JP: '週末はバナヒルズ、\n平日はビーチオフィス',
    },
    tip: {
      KO: '안트엉 지구엔 노트북 하기 좋은 카페가 밀집해 있어요',
      EN: 'The An Thuong area is packed with laptop-friendly cafés',
      JP: 'アントゥオン地区はPC作業できるカフェが密集',
    },
  },
  {
    id: 'moment-chiangmai-cafe',
    photo: P('1512553353614-82a7370096dc'),
    anchor: 'thailand-chiangmai',
    dest: { KO: '치앙마이', EN: 'Chiang Mai', JP: 'チェンマイ' },
    title: {
      KO: '업무 마감 후,\n산 위 사원의 노을',
      EN: 'Work done — sunset\nat a hilltop temple',
      JP: '仕事を終えて、\n山上寺院の夕暮れ',
    },
    tip: {
      KO: '11~2월 건기가 워케이션 최적 시즌이에요',
      EN: 'Nov–Feb dry season is peak workation weather',
      JP: '11〜2月の乾季がベストシーズン',
    },
  },
  {
    id: 'moment-bali-jungle',
    photo: P('1537996194471-e657df975ab4'),
    anchor: 'indonesia-bali',
    dest: { KO: '발리', EN: 'Bali', JP: 'バリ' },
    title: {
      KO: '오후 반차 내고\n호수 사원 산책',
      EN: 'Half-day off:\na lakeside temple walk',
      JP: '午後半休で\n湖上寺院さんぽ',
    },
    tip: {
      KO: '짱구·우붓엔 코워킹 딸린 숙소가 많아요',
      EN: 'Canggu and Ubud have plenty of stays with coworking',
      JP: 'チャングーとウブドはコワーキング付き宿が豊富',
    },
  },
  {
    id: 'moment-jeju-lunch',
    photo: P('1507525428034-b723cf961d3e'),
    anchor: 'korea-jeju',
    dest: { KO: '제주', EN: 'Jeju', JP: '済州' },
    title: {
      KO: '오늘 마감의 보상,\n노을 지는 바다',
      EN: 'Deadline reward:\na sunset sea',
      JP: '締め切りのご褒美、\n夕暮れの海',
    },
    tip: {
      KO: '성산 쪽엔 업무 데스크 분리형 객실이 있어요',
      EN: 'Seongsan has rooms with separate work desks',
      JP: '城山にはワークデスク分離型の客室も',
    },
  },
  {
    id: 'moment-osaka-run',
    photo: P('1590559899731-a382839e5549'),
    anchor: 'japan-osaka',
    dest: { KO: '오사카', EN: 'Osaka', JP: '大阪' },
    title: {
      KO: '마감 끝,\n신세카이 골목 야식',
      EN: 'Deadline shipped —\nstreet food in Shinsekai',
      JP: '仕事を締めて\n新世界で食べ歩き',
    },
    tip: {
      KO: '혼마치 비즈니스 지구엔 라운지형 숙소가 있어요',
      EN: 'Honmachi has lounge-style stays built for work',
      JP: '本町にはラウンジ型の宿があります',
    },
  },
  {
    id: 'moment-fuji-friday',
    photo: P('1526481280693-3bfa7568e0f3'),
    anchor: 'japan-tokyo',
    dest: { KO: '도쿄', EN: 'Tokyo', JP: '東京' },
    title: {
      KO: '금요일 오후,\n노트북 덮고 후지산으로',
      EN: 'Friday afternoon:\nlaptop shut, Fuji-bound',
      JP: '金曜午後、\nPCを閉じて富士山へ',
    },
    tip: {
      KO: '시부야엔 코워킹을 품은 호텔이 있어요',
      EN: 'Shibuya has hotels with coworking floors inside',
      JP: '渋谷にはコワーキング内蔵ホテルも',
    },
  },
  {
    id: 'moment-cebu-hopping',
    photo: P('1573790387438-4da905039392'),
    anchor: 'philippines-cebu',
    dest: { KO: '세부', EN: 'Cebu', JP: 'セブ' },
    title: {
      KO: '주말엔 아일랜드 호핑,\n월요일엔 줌 미팅',
      EN: 'Island hopping Saturday,\nZoom call Monday',
      JP: '週末はアイランドホッピング、\n月曜はZoom',
    },
    tip: {
      KO: '세부 시티엔 핫데스크 포함 코리빙이 있어요',
      EN: 'Cebu City has co-living with hot desks included',
      JP: 'セブシティにはホットデスク込みのコリビングも',
    },
  },
  {
    id: 'moment-sydney-harbour',
    photo: P('1506973035872-a4ec16b8e8d9'),
    anchor: 'australia-sydney',
    dest: { KO: '시드니', EN: 'Sydney', JP: 'シドニー' },
    title: {
      KO: '시차 1시간,\n하버 뷰가 있는 오피스',
      EN: 'One-hour time gap,\nharbour-view office',
      JP: '時差1時間、\nハーバービューのオフィス',
    },
    tip: {
      KO: '한국과 시차 1시간 — 실시간 협업이 가능해요',
      EN: 'Just 1–2 hours off KST — real-time collab works',
      JP: '韓国·日本と時差1〜2時間、リアルタイム協業OK',
    },
  },
]
