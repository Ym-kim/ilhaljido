import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 테마 기획전 (큐레이션 컬렉션) — 하나투어 '기획전' 벤치마크
//
// 검증된 기존 제휴 상품(숙소·체험·eSIM·항공·강의)을 목적지/여정 테마로 묶어
// 한 화면에서 준비를 끝내게 하는 교차판매 컬렉션. 허위 '특가/최저가' 표현 없음 —
// 실제 상품 묶음일 뿐, 요금은 각 제휴사에서 확인.
//
// itemIds는 FULL_CATALOG(catalog.ts)에 존재하는 id만. 새 컬렉션 추가 시 id 실존 확인.
// 사진은 검증 풀만 사용.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

export type Collection = {
  slug: string
  emoji: string
  photo: string
  title: L
  tagline: L
  desc: L
  /** 진열 순서대로 — 보통 숙소 → 체험 → eSIM → 항공 순 */
  itemIds: string[]
}

const P = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`

export const COLLECTIONS: Collection[] = [
  // 시즌 기획전 — 2026 추석 연휴(9/24 목~9/27 일, 대체공휴일 없음). 배열 선두 = 홈 상위3 노출.
  // ⚠️ 시즌 종료(9/27) 후 배열 뒤로 이동하거나 제거할 것
  {
    slug: 'chuseok-short-haul',
    emoji: '🌕',
    photo: P('1533050487297-09b450131914'), // 일본 골목 야경 (검증 2026-07-18, curl 200+육안)
    title: { KO: '추석 연휴 단거리 워케이션', EN: 'Chuseok long-weekend workation', JP: '秋夕連休 近場ワーケーション' },
    tagline: { KO: '나흘이면 충분한 일본 3거점', EN: 'Four days, three easy bases in Japan', JP: '4日で行ける日本の3拠点' },
    desc: {
      KO: '2026 추석 연휴(9/24 목~9/27 일)는 나흘 — 시차 0시간, 직항 1~2시간대 일본이 정답입니다. 가까운 순서로 후쿠오카·오사카·도쿄의 검증 숙소를 골라, eSIM과 항공까지 한 번에 준비하세요. 9월 하순은 세 도시 모두 베스트 시즌입니다.',
      EN: "Chuseok 2026 gives you four days (Sep 24–27) — zero jet lag and 1–2h flights make Japan the move. Pick a verified stay in Fukuoka, Osaka or Tokyo, then sort your eSIM and flights in one go. Late September is prime season in all three.",
      JP: '2026年の秋夕連休は4日間（9/24木〜9/27日）。時差ゼロ・直行1〜2時間の日本が正解です。福岡・大阪・東京の検証済みの宿を選び、eSIMと航空券まで一度に準備。9月下旬は3都市ともベストシーズン。',
    },
    itemIds: ['stay-webase-hakata', 'stay-lively-osaka', 'stay-millennials-shibuya', 'esim-klook-japan', 'feat-flight-tripcom'],
  },
  {
    slug: 'tokyo-allinone',
    emoji: '🗼',
    photo: P('1540959733332-eab4deabeeaf'), // 도쿄 (검증)
    title: { KO: '도쿄 워케이션 올인원', EN: 'Tokyo workation, all in one', JP: '東京ワーケーション オールインワン' },
    tagline: { KO: '숙소부터 eSIM까지 한 번에', EN: 'Stay, experiences and eSIM in one go', JP: '宿からeSIMまで一度に' },
    desc: {
      KO: '시차 0시간 도쿄에서 일하는 워케이션. 코워킹 내장 숙소, 저녁을 채우는 팀랩, 도착 즉시 연결되는 eSIM, 그리고 항공까지 — 떠나기 전 필요한 걸 모았습니다.',
      EN: 'A zero-jetlag Tokyo workation. A coworking-equipped stay, teamLab for the evenings, an eSIM that connects on arrival, plus flights — everything you need before you go.',
      JP: '時差ゼロの東京ワーケーション。コワーキング付きの宿、夜を彩るチームラボ、到着後すぐ繋がるeSIM、そして航空券まで。',
    },
    itemIds: ['stay-millennials-shibuya', 'act-klook-teamlab-tokyo', 'esim-klook-japan', 'feat-flight-tripcom'],
  },
  {
    slug: 'bali-monthstay',
    emoji: '🌴',
    photo: P('1537996194471-e657df975ab4'), // 발리 (검증)
    title: { KO: '발리 한 달 살기 세트', EN: 'Bali month-stay set', JP: 'バリ1カ月滞在セット' },
    tagline: { KO: '노마드 성지에서 길게 머물기', EN: 'Settle in at the nomad capital', JP: 'ノマドの聖地で長く滞在' },
    desc: {
      KO: '코워킹 전용 설계 숙소에서 한 달. 누사페니다 섬 투어로 주말을 채우고, 아시아 멀티국 eSIM과 항공으로 이동을 준비하세요. 워케이션 중 성장할 강의까지.',
      EN: 'A month at a coworking-first stay. Fill weekends with a Nusa Penida island trip, and prep travel with a multi-country Asia eSIM and flights — plus a course to grow while you stay.',
      JP: 'コワーキング特化の宿で1カ月。ヌサペニダ島ツアーで週末を、アジアマルチ国eSIMと航空券で移動を準備。滞在中に学べる講座も。',
    },
    itemIds: ['stay-tribal-bali', 'act-klook-nusapenida-bali', 'esim-klook-asia', 'feat-flight-tripcom', 'course-gpts-automation'],
  },
  {
    slug: 'chiangmai-nomad',
    emoji: '🏯',
    photo: P('1512553353614-82a7370096dc'), // 치앙마이 (검증)
    title: { KO: '치앙마이 노마드 세트', EN: 'Chiang Mai nomad set', JP: 'チェンマイ ノマドセット' },
    tagline: { KO: '장기 체류의 교과서', EN: 'The textbook long stay', JP: '長期滞在の定番' },
    desc: {
      KO: '서비스드 아파트가 많은 노마드 수도 치앙마이. 코끼리 생추어리로 하루를 비우고, 아시아 eSIM과 항공으로 준비를 끝내세요. 11~2월 건기가 가장 좋습니다.',
      EN: 'Chiang Mai — the nomad capital full of serviced apartments. Take a day at the elephant sanctuary, and sort travel with an Asia eSIM and flights. Best in the Nov–Feb dry season.',
      JP: 'サービスアパートが揃うノマドの都チェンマイ。象のサンクチュアリで一日を空け、アジアeSIMと航空券で準備完了。11〜2月の乾季が◎。',
    },
    itemIds: ['stay-kantary-chiangmai', 'act-klook-elephant-chiangmai', 'esim-klook-asia', 'feat-flight-tripcom'],
  },
  {
    slug: 'japan-onsen-reset',
    emoji: '♨️',
    photo: P('1526481280693-3bfa7568e0f3'), // 후지산 (검증)
    title: { KO: '일본 소도시 온천 리셋', EN: 'Japan onsen-town reset', JP: '日本の温泉町リセット' },
    tagline: { KO: '일하고, 온천으로 하루를 닫다', EN: 'Work, then close the day at the onsen', JP: '働いて、温泉で一日を締める' },
    desc: {
      KO: '대도시의 소음 대신 규슈 하카타의 코워킹 숙소에서 일하고, 후쿠오카 근교 온천 마을을 당일로 다녀오세요. 일본 eSIM과 항공까지. 료칸·온천 소도시는 전용 페이지에서.',
      EN: 'Swap city noise for a coworking stay in Hakata, Kyushu, and day-trip to onsen towns near Fukuoka. Japan eSIM and flights included. See the ryokan & onsen towns on their own page.',
      JP: '大都市の喧騒の代わりに博多のコワーキング宿で働き、福岡近郊の温泉町へ日帰り。日本eSIMと航空券も。旅館・温泉の小都市は専用ページで。',
    },
    itemIds: ['stay-webase-hakata', 'act-fukuoka-bustour', 'esim-klook-japan', 'feat-flight-tripcom'],
  },
  {
    slug: 'osaka-foodie',
    emoji: '🍜',
    photo: P('1590559899731-a382839e5549'), // 오사카 (검증)
    title: { KO: '오사카 미식 워케이션', EN: 'Osaka foodie workation', JP: '大阪グルメワーケーション' },
    tagline: { KO: '먹고 일하고, 주말은 주유패스로', EN: 'Eat, work, and roam with the Amazing Pass', JP: '食べて働き、週末は周遊パスで' },
    desc: {
      KO: '시차 0·직항 1시간대의 오사카. 라운지가 넓은 숙소에서 일하고, 주유패스로 40여 곳을 도세요. 일본 eSIM과 항공까지 한 번에.',
      EN: 'Zero-jetlag Osaka, a short flight away. Work from a lounge-rich stay and roam 40+ spots with the Amazing Pass. Japan eSIM and flights included.',
      JP: '時差ゼロ·直行1時間台の大阪。ラウンジの広い宿で働き、周遊パスで40カ所以上へ。日本eSIMと航空券も。',
    },
    itemIds: ['stay-lively-osaka', 'act-klook-osaka-pass', 'esim-klook-japan', 'feat-flight-tripcom'],
  },
  {
    slug: 'singapore-business',
    emoji: '🌆',
    photo: P('1525625293386-3f8f99389edd'), // 싱가포르 (검증)
    title: { KO: '싱가포르 비즈니스 워케이션', EN: 'Singapore business workation', JP: 'シンガポール ビジネスワーケーション' },
    tagline: { KO: '코워킹 코리빙 + 도심 인프라', EN: 'Co-living meets a global business hub', JP: 'コリビング＋都市インフラ' },
    desc: {
      KO: '아시아 비즈니스 허브 싱가포르. 코워킹 라운지를 갖춘 코리빙에서 일하고, 주말엔 유니버설 스튜디오. 아시아 멀티국 eSIM과 항공으로 준비 끝.',
      EN: "Singapore, Asia's business hub. Work from a co-living with a coworking lounge, and hit Universal Studios on weekends. A multi-country Asia eSIM and flights round it out.",
      JP: 'アジアのビジネス拠点シンガポール。コワーキング付きコリビングで働き、週末はユニバーサル・スタジオ。アジアマルチ国eSIMと航空券で準備完了。',
    },
    itemIds: ['stay-lyf-funan-singapore', 'act-klook-uss-singapore', 'esim-klook-asia', 'feat-flight-tripcom'],
  },
  {
    slug: 'taipei-workation',
    emoji: '🏮',
    photo: P('1470004914212-05527e49370b'), // 타이베이 (검증)
    title: { KO: '타이베이 워케이션', EN: 'Taipei workation', JP: '台北ワーケーション' },
    tagline: { KO: '야시장과 코워킹 사이', EN: 'Between night markets and coworking', JP: '夜市とコワーキングの間で' },
    desc: {
      KO: '카페·야시장 밀도 높은 타이베이. 스마트 호텔에서 일하고, 예류·지우펀 일일투어로 근교를 도세요. 아시아 eSIM과 항공까지.',
      EN: 'Taipei, dense with cafés and night markets. Work from a smart hotel and day-trip to Yehliu and Jiufen. Asia eSIM and flights included.',
      JP: 'カフェ·夜市が密集する台北。スマートホテルで働き、野柳·九份の日帰りツアーへ。アジアeSIMと航空券も。',
    },
    itemIds: ['stay-citizenm-taipei', 'act-klook-taipei-tour', 'esim-klook-asia', 'feat-flight-tripcom'],
  },
]

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export const COLLECTIONS_UI: Record<string, L> = {
  eyebrow: { KO: 'WAKATION 기획전', EN: 'WAKATION COLLECTIONS', JP: 'WAKATION 特集' },
  home_title: { KO: '테마로 준비하는 워케이션 기획전', EN: 'Workation collections, curated by theme', JP: 'テーマで準備するワーケーション特集' },
  home_sub: {
    KO: '숙소·체험·eSIM·항공을 목적지별로 묶었습니다. 한 화면에서 준비를 끝내세요.',
    EN: 'Stays, experiences, eSIMs and flights bundled by destination — get ready on one screen.',
    JP: '宿·体験·eSIM·航空券を目的地別にまとめました。1画面で準備完了。',
  },
  see_all: { KO: '기획전 전체 보기', EN: 'See all collections', JP: '特集をすべて見る' },
  hub_title: { KO: '워케이션 기획전', EN: 'Workation collections', JP: 'ワーケーション特集' },
  hub_sub: {
    KO: '목적지·여정 테마로 묶은 큐레이션. 숙소부터 항공까지 한 번에 준비하세요.',
    EN: 'Curated by destination and trip type — prep everything from stay to flight in one place.',
    JP: '目的地·旅のテーマ別キュレーション。宿から航空券まで一度に。',
  },
  count_label: { KO: '개 상품 구성', EN: ' items', JP: '点で構成' },
  included: { KO: '이 기획전 구성', EN: "What's in this collection", JP: 'この特集の構成' },
  disclosure: {
    KO: '기획전은 검증된 제휴 상품의 큐레이션 묶음입니다. 요금·예약·환불 조건은 각 제휴사에서 최종 확인됩니다.',
    EN: 'Collections are curated bundles of verified partner products. Prices, booking and refunds are confirmed on each partner site.',
    JP: '特集は検証済み提携商品のキュレーションです。料金·予約·返金条件は各提携先で確認されます。',
  },
  back: { KO: '기획전 전체', EN: 'All collections', JP: '特集一覧' },
}
