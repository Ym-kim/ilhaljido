import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 목적지 추천 위저드 — 룰베이스 (API 호출 0, 서버 비용 0)
//
// 3문항(기간·협업 방식·분위기) 점수 매칭 → 상위 3개 도시 추천
// 사진은 코드베이스 검증 풀만 재사용. 시차·비행시간은 사실 데이터만 표기.
// ─────────────────────────────────────────────────────────────────────────────

export type Duration = 'weekend' | 'week2' | 'month'
export type Sync = 'need' | 'flex'
export type Vibe = 'beach' | 'city' | 'nature'
export type FinderAnswers = { duration: Duration; sync: Sync; vibe: Vibe }

type L = Record<Lang, string>

export type FinderCity = {
  id: string
  /** /select/hotel#{anchor} */
  anchor: string
  photo: string
  name: L
  /** 사실 기반 한 줄 근거 (시차·이동·시즌) */
  reason: L
  /** 매칭 속성 */
  tzOffset: number // 한국 기준 시차 (절대값)
  durations: Duration[]
  vibes: Vibe[]
}

const P = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`

export const FINDER_CITIES: FinderCity[] = [
  {
    id: 'tokyo',
    anchor: 'japan-tokyo',
    photo: P('1526481280693-3bfa7568e0f3'),
    name: { KO: '도쿄', EN: 'Tokyo', JP: '東京' },
    reason: {
      KO: '시차 0시간 — 협업 그대로, 퇴근 후는 완전히 다른 도시',
      EN: 'Zero time difference from Korea — same workday, different city',
      JP: '韓国と時差なし — 仕事はそのまま、街だけ変わる',
    },
    tzOffset: 0,
    durations: ['weekend', 'week2'],
    vibes: ['city'],
  },
  {
    id: 'osaka',
    anchor: 'japan-osaka',
    photo: P('1590559899731-a382839e5549'),
    name: { KO: '오사카', EN: 'Osaka', JP: '大阪' },
    reason: {
      KO: '시차 0 · 직항 1시간대, 주말을 붙이기 가장 쉬운 도시',
      EN: 'No jet lag and a short flight — easiest weekend add-on',
      JP: '時差ゼロ・短距離フライト、週末を足しやすい街',
    },
    tzOffset: 0,
    durations: ['weekend', 'week2'],
    vibes: ['city'],
  },
  {
    id: 'fukuoka',
    anchor: 'japan-fukuoka',
    photo: P('1533050487297-09b450131914'),
    name: { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' },
    reason: {
      KO: '비행 1시간 · 시차 0 — 금요일 반차로 시작하는 워케이션',
      EN: 'One-hour flight, zero time gap — start with a Friday half-day',
      JP: '飛行機1時間・時差なし — 金曜半休で始められる',
    },
    tzOffset: 0,
    durations: ['weekend'],
    vibes: ['city'],
  },
  {
    id: 'jeju',
    anchor: 'korea-jeju',
    photo: P('1507525428034-b723cf961d3e'),
    name: { KO: '제주', EN: 'Jeju', JP: '済州' },
    reason: {
      KO: '국내라 준비 부담 0 — 바다 앞 데스크를 가장 빨리 만나는 법',
      EN: 'Domestic — the fastest route to a desk by the sea',
      JP: '国内だから準備いらず — 海の前のデスクへ最短で',
    },
    tzOffset: 0,
    durations: ['weekend', 'week2'],
    vibes: ['beach', 'nature'],
  },
  {
    id: 'busan',
    anchor: 'korea-busan',
    photo: P('1517154421773-0529f29ea451'),
    name: { KO: '부산', EN: 'Busan', JP: '釜山' },
    reason: {
      KO: 'KTX로 닿는 바다 도시 — 당일 결정도 가능한 워케이션',
      EN: 'A sea city on the KTX line — decide today, work there tomorrow',
      JP: 'KTXで行ける海の街 — 思い立ったら即ワーケーション',
    },
    tzOffset: 0,
    durations: ['weekend'],
    vibes: ['beach', 'city'],
  },
  {
    id: 'danang',
    anchor: 'vietnam-danang',
    photo: P('1559592413-7cec4d0cae2b'),
    name: { KO: '다낭', EN: 'Da Nang', JP: 'ダナン' },
    reason: {
      KO: '시차 2시간 — 오전은 느긋하게, 비치와 카페가 도보권',
      EN: 'Two hours behind — slow mornings, beach and cafés on foot',
      JP: '時差2時間 — 朝はゆっくり、ビーチもカフェも徒歩圏',
    },
    tzOffset: 2,
    durations: ['week2', 'month'],
    vibes: ['beach'],
  },
  {
    id: 'cebu',
    anchor: 'philippines-cebu',
    photo: P('1573790387438-4da905039392'),
    name: { KO: '세부', EN: 'Cebu', JP: 'セブ' },
    reason: {
      KO: '시차 1시간 — 협업 지장 없이 열대 바다를 곁에 두는 선택',
      EN: 'Just one hour behind — tropical sea without breaking your meetings',
      JP: '時差1時間 — 会議に支障なく南国の海を隣に',
    },
    tzOffset: 1,
    durations: ['week2'],
    vibes: ['beach'],
  },
  {
    id: 'bali',
    anchor: 'indonesia-bali',
    photo: P('1537996194471-e657df975ab4'),
    name: { KO: '발리', EN: 'Bali', JP: 'バリ' },
    reason: {
      KO: '시차 1시간 · 노마드 인프라 성숙 — 한 달 살기의 교과서',
      EN: 'One-hour gap and mature nomad infra — the textbook month-stay',
      JP: '時差1時間・ノマドインフラ充実 — 1カ月滞在の定番',
    },
    tzOffset: 1,
    durations: ['week2', 'month'],
    vibes: ['beach', 'nature'],
  },
  {
    id: 'chiangmai',
    anchor: 'thailand-chiangmai',
    photo: P('1512553353614-82a7370096dc'),
    name: { KO: '치앙마이', EN: 'Chiang Mai', JP: 'チェンマイ' },
    reason: {
      KO: '장기 체류형 서비스드 아파트가 많은 노마드 수도 — 11~2월 건기 추천',
      EN: 'The nomad capital of long stays — best in the Nov–Feb dry season',
      JP: '長期滞在向けアパートが揃うノマドの都 — 11〜2月の乾季が◎',
    },
    tzOffset: 2,
    durations: ['month'],
    vibes: ['nature', 'city'],
  },
  {
    id: 'bangkok',
    anchor: 'thailand-bangkok',
    photo: P('1508009603885-50cf7c579365'),
    name: { KO: '방콕', EN: 'Bangkok', JP: 'バンコク' },
    reason: {
      KO: '카페·코워킹 밀도 최상급의 대도시 — 도시형 한 달 살기',
      EN: 'A megacity dense with cafés and coworking — the urban month-stay',
      JP: 'カフェ·コワーキング密度最強の大都市 — 都市型1カ月滞在',
    },
    tzOffset: 2,
    durations: ['week2', 'month'],
    vibes: ['city'],
  },
  {
    id: 'sydney',
    anchor: 'australia-sydney',
    photo: P('1506973035872-a4ec16b8e8d9'),
    name: { KO: '시드니', EN: 'Sydney', JP: 'シドニー' },
    reason: {
      KO: '시차 1~2시간 — 남반구 계절을 사는 실시간 협업 워케이션',
      EN: 'Only 1–2 hours ahead — opposite seasons, real-time collab intact',
      JP: '時差1〜2時間 — 逆の季節をリアルタイム協業のまま',
    },
    tzOffset: 1,
    durations: ['week2'],
    vibes: ['city', 'beach'],
  },
]

// 문항·선택지 (인라인 3언어)
export const FINDER_QUESTIONS: {
  key: keyof FinderAnswers
  label: L
  options: { value: string; label: L }[]
}[] = [
  {
    key: 'duration',
    label: { KO: '얼마나 머무르시나요?', EN: 'How long will you stay?', JP: 'どのくらい滞在しますか？' },
    options: [
      { value: 'weekend', label: { KO: '주말 · 3~4일', EN: 'A weekend · 3–4 days', JP: '週末 · 3〜4日' } },
      { value: 'week2', label: { KO: '1~2주', EN: '1–2 weeks', JP: '1〜2週間' } },
      { value: 'month', label: { KO: '한 달 이상', EN: 'A month or more', JP: '1カ月以上' } },
    ],
  },
  {
    key: 'sync',
    label: { KO: '팀과의 협업 방식은요?', EN: 'How do you work with your team?', JP: 'チームとの働き方は？' },
    options: [
      { value: 'need', label: { KO: '한국 시간대 실시간 협업', EN: 'Real-time on Korea hours', JP: '韓国時間でリアルタイム' } },
      { value: 'flex', label: { KO: '시간이 자유로운 편', EN: 'Flexible hours', JP: '時間は柔軟' } },
    ],
  },
  {
    key: 'vibe',
    label: { KO: '어떤 풍경에서 일하고 싶나요?', EN: 'What scenery do you want to work in?', JP: 'どんな景色で働きたいですか？' },
    options: [
      { value: 'beach', label: { KO: '바다', EN: 'Beach', JP: '海' } },
      { value: 'city', label: { KO: '도시', EN: 'City', JP: '都市' } },
      { value: 'nature', label: { KO: '자연 · 산', EN: 'Nature · Mountains', JP: '自然 · 山' } },
    ],
  },
]

export const FINDER_UI: Record<string, L> = {
  eyebrow: { KO: 'Destination Finder', EN: 'Destination Finder', JP: 'Destination Finder' },
  title: {
    KO: '30초 만에 찾는 나의 워케이션 도시',
    EN: 'Find your workation city in 30 seconds',
    JP: '30秒で見つかる、私のワーケーション都市',
  },
  sub: {
    KO: '세 가지만 답하면 지금 스타일에 맞는 도시를 골라드려요',
    EN: 'Answer three questions and we match cities to your style',
    JP: '3つ答えるだけで、今のスタイルに合う都市をご提案',
  },
  step: { KO: '질문', EN: 'Question', JP: '質問' },
  resultTitle: { KO: '이 도시들이 잘 맞아요', EN: 'These cities fit you', JP: 'この都市が合いそうです' },
  best: { KO: 'BEST 매치', EN: 'Best match', JP: 'ベストマッチ' },
  seeStays: { KO: '이 도시 숙소 보기', EN: 'See stays here', JP: 'この街の宿を見る' },
  retry: { KO: '다시 찾기', EN: 'Start over', JP: 'もう一度' },
  visaHint: {
    KO: '비자·체류 조건이 궁금하다면 AI 비자 도우미에게 물어보세요',
    EN: 'Wondering about visas? Ask the AI visa assistant',
    JP: 'ビザ·滞在条件はAIビザアシスタントへ',
  },
  visaCta: { KO: 'AI 비자 도우미', EN: 'AI Visa Assistant', JP: 'AIビザアシスタント' },
}

/** 룰베이스 매칭 — 상위 3개 반환 */
export function matchCities(a: FinderAnswers): FinderCity[] {
  return FINDER_CITIES
    .map((c) => {
      let score = 0
      if (c.durations.includes(a.duration)) score += 2
      if (a.sync === 'need') score += c.tzOffset <= 1 ? 2 : 0
      else score += 1
      if (c.vibes.includes(a.vibe)) score += 2
      // 분위기 미스는 사실상 탈락에 가깝게
      if (!c.vibes.includes(a.vibe)) score -= 2
      return { c, score }
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map((x) => x.c)
}
