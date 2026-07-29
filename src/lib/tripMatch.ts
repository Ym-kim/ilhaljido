import type { Lang } from '@/lib/i18n/types'

export const TRIP_MATCH_DURATIONS = ['weekend', '3n4d', '1week', 'long'] as const
export const TRIP_MATCH_MOODS = [
  'cafe_food',
  'ocean_walk',
  'city_energy',
  'onsen_recovery',
  'culture',
  'workation',
] as const
export const TRIP_MATCH_COMPANIONS = ['solo', 'friends', 'couple', 'workation', 'undecided'] as const
export const TRIP_MATCH_SLUGS = ['fukuoka-3n4d', 'osaka-friends', 'seoul-3n4d', 'busan-weekend'] as const
export const TRIP_MATCH_CAMPAIGNS = ['japan-short-stay', 'korea-weekend'] as const

export type TripMatchDuration = (typeof TRIP_MATCH_DURATIONS)[number]
export type TripMatchMood = (typeof TRIP_MATCH_MOODS)[number]
export type TripMatchCompanion = (typeof TRIP_MATCH_COMPANIONS)[number]
export type TripMatchSlug = (typeof TRIP_MATCH_SLUGS)[number]
export type TripMatchCampaign = (typeof TRIP_MATCH_CAMPAIGNS)[number]

export type TripMatchAnswer = {
  duration: TripMatchDuration
  moods: TripMatchMood[]
  companion: TripMatchCompanion
}

type TripMatchRule = {
  tripSetSlug: TripMatchSlug
  duration: Record<TripMatchDuration, number>
  mood: Record<TripMatchMood, number>
  companion: Record<TripMatchCompanion, number>
}

type LocalizedText = Record<Lang, string>

const RULES: TripMatchRule[] = [
  {
    tripSetSlug: 'fukuoka-3n4d',
    duration: { weekend: 2, '3n4d': 6, '1week': 2, long: 1 },
    mood: { cafe_food: 5, ocean_walk: 1, city_energy: 2, onsen_recovery: 5, culture: 3, workation: 4 },
    companion: { solo: 5, friends: 2, couple: 4, workation: 5, undecided: 3 },
  },
  {
    tripSetSlug: 'osaka-friends',
    duration: { weekend: 2, '3n4d': 6, '1week': 3, long: 1 },
    mood: { cafe_food: 4, ocean_walk: 1, city_energy: 6, onsen_recovery: 1, culture: 4, workation: 2 },
    companion: { solo: 1, friends: 6, couple: 4, workation: 2, undecided: 3 },
  },
  {
    tripSetSlug: 'seoul-3n4d',
    duration: { weekend: 3, '3n4d': 6, '1week': 3, long: 2 },
    mood: { cafe_food: 5, ocean_walk: 1, city_energy: 6, onsen_recovery: 1, culture: 5, workation: 4 },
    companion: { solo: 4, friends: 5, couple: 4, workation: 4, undecided: 3 },
  },
  {
    tripSetSlug: 'busan-weekend',
    duration: { weekend: 6, '3n4d': 4, '1week': 2, long: 1 },
    mood: { cafe_food: 3, ocean_walk: 6, city_energy: 2, onsen_recovery: 3, culture: 3, workation: 2 },
    companion: { solo: 3, friends: 5, couple: 5, workation: 2, undecided: 3 },
  },
]

const MARKET_ORDER: Record<Lang, TripMatchSlug[]> = {
  KO: ['fukuoka-3n4d', 'osaka-friends', 'busan-weekend', 'seoul-3n4d'],
  JP: ['seoul-3n4d', 'busan-weekend', 'fukuoka-3n4d', 'osaka-friends'],
  EN: ['fukuoka-3n4d', 'seoul-3n4d', 'busan-weekend', 'osaka-friends'],
}

const MARKET_BOOST: Record<Lang, Partial<Record<TripMatchSlug, number>>> = {
  KO: { 'fukuoka-3n4d': 8, 'osaka-friends': 8, 'busan-weekend': 2, 'seoul-3n4d': 1 },
  JP: { 'seoul-3n4d': 10, 'busan-weekend': 10 },
  EN: { 'fukuoka-3n4d': 4, 'seoul-3n4d': 4, 'busan-weekend': 3, 'osaka-friends': 3 },
}

const CAMPAIGN_BOOST: Record<TripMatchCampaign, Partial<Record<TripMatchSlug, number>>> = {
  'japan-short-stay': { 'fukuoka-3n4d': 3, 'osaka-friends': 3 },
  'korea-weekend': { 'seoul-3n4d': 3, 'busan-weekend': 3 },
}

export const TRIP_MATCH_LABELS = {
  duration: {
    weekend: { KO: '주말 2박 3일', EN: 'A 2-night weekend', JP: '週末の2泊3日' },
    '3n4d': { KO: '3박 4일', EN: '3 nights, 4 days', JP: '3泊4日' },
    '1week': { KO: '일주일', EN: 'One week', JP: '1週間' },
    long: { KO: '2주 이상', EN: 'Two weeks or more', JP: '2週間以上' },
  } satisfies Record<TripMatchDuration, LocalizedText>,
  mood: {
    cafe_food: { KO: '카페와 미식', EN: 'Cafes and food', JP: 'カフェとグルメ' },
    ocean_walk: { KO: '바다와 산책', EN: 'Sea and walks', JP: '海と散歩' },
    city_energy: { KO: '활기찬 도시', EN: 'City energy', JP: '活気ある街' },
    onsen_recovery: { KO: '온천과 회복', EN: 'Onsen and recovery', JP: '温泉とリカバリー' },
    culture: { KO: '새로운 문화', EN: 'New culture', JP: '新しい文化' },
    workation: { KO: '일하면서 머물기', EN: 'Work while staying', JP: '働きながら滞在' },
  } satisfies Record<TripMatchMood, LocalizedText>,
  companion: {
    solo: { KO: '혼자', EN: 'Solo', JP: 'ひとりで' },
    friends: { KO: '친구와', EN: 'With friends', JP: '友達と' },
    couple: { KO: '연인과', EN: 'As a couple', JP: 'パートナーと' },
    workation: { KO: '업무를 병행', EN: 'With work time', JP: '仕事もする' },
    undecided: { KO: '아직 정하지 않음', EN: 'Not decided yet', JP: 'まだ決めていない' },
  } satisfies Record<TripMatchCompanion, LocalizedText>,
} as const

function includesValue<T extends string>(values: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && values.includes(value as T)
}

function firstString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export function parseTripMatchAnswer(input: Record<string, string | string[] | undefined>): TripMatchAnswer {
  const durationInput = firstString(input.duration)
  const companionInput = firstString(input.companion)
  const moodInput = firstString(input.mood) ?? firstString(input.moods) ?? ''
  const moods = moodInput
    .split(',')
    .filter((value): value is TripMatchMood => includesValue(TRIP_MATCH_MOODS, value))
    .slice(0, 2)

  return {
    duration: includesValue(TRIP_MATCH_DURATIONS, durationInput) ? durationInput : '3n4d',
    moods: moods.length > 0 ? moods : ['cafe_food'],
    companion: includesValue(TRIP_MATCH_COMPANIONS, companionInput) ? companionInput : 'undecided',
  }
}

export function parseTripMatchCampaign(value: string | string[] | undefined): TripMatchCampaign | undefined {
  const candidate = firstString(value)
  return includesValue(TRIP_MATCH_CAMPAIGNS, candidate) ? candidate : undefined
}

export function serializeTripMatchAnswer(answer: TripMatchAnswer) {
  const query = new URLSearchParams({
    duration: answer.duration,
    mood: [...answer.moods].sort().join(','),
    companion: answer.companion,
  })
  return query.toString()
}

export function buildTripMatchId(answer: TripMatchAnswer, lang: Lang, campaign?: TripMatchCampaign) {
  return `${lang.toLowerCase()}-${answer.duration}-${[...answer.moods].sort().join('.')}-${answer.companion}-${campaign ?? 'direct'}`
}

export function matchTripSets(answer: TripMatchAnswer, lang: Lang, campaign?: TripMatchCampaign) {
  const order = MARKET_ORDER[lang]
  const ranked = RULES.map((rule) => {
    const durationScore = rule.duration[answer.duration]
    const moodScore = answer.moods.reduce((sum, mood) => sum + rule.mood[mood], 0)
    const companionScore = rule.companion[answer.companion]
    const marketScore = MARKET_BOOST[lang][rule.tripSetSlug] ?? 0
    const campaignScore = campaign ? (CAMPAIGN_BOOST[campaign][rule.tripSetSlug] ?? 0) : 0
    return {
      slug: rule.tripSetSlug,
      score: durationScore + moodScore + companionScore + marketScore + campaignScore,
      durationScore,
      moodScore,
      campaignScore,
      marketRank: order.indexOf(rule.tripSetSlug),
    }
  }).sort((a, b) =>
    b.score - a.score
    || b.campaignScore - a.campaignScore
    || b.durationScore - a.durationScore
    || b.moodScore - a.moodScore
    || a.marketRank - b.marketRank,
  )

  return { primary: ranked[0].slug, alternative: ranked[1].slug }
}

export function getTripMatchReasons(answer: TripMatchAnswer, lang: Lang): string[] {
  const durationReason: Record<TripMatchDuration, LocalizedText> = {
    weekend: { KO: '주말 일정에 맞는 짧은 흐름', EN: 'Fits a short weekend', JP: '週末に収まる短い旅程' },
    '3n4d': { KO: '3박 4일에 맞춘 구성', EN: 'Built for a 3-night stay', JP: '3泊4日に合う構成' },
    '1week': { KO: '일주일 체류의 시작점으로 활용 가능', EN: 'A practical base for a week', JP: '1週間滞在のベースにしやすい' },
    long: { KO: '장기 체류 전 취향을 확인하기 좋은 구성', EN: 'A useful taste before a longer stay', JP: '長期滞在前の下見にも使いやすい' },
  }
  const moodReason: Record<TripMatchMood, LocalizedText> = {
    cafe_food: { KO: '카페와 미식을 중심으로 탐색', EN: 'Centered on cafes and food', JP: 'カフェとグルメを中心に楽しめる' },
    ocean_walk: { KO: '바다와 산책에 시간을 쓰는 여행', EN: 'Makes room for sea views and walks', JP: '海と散歩に時間を使える' },
    city_energy: { KO: '도시의 거리와 새로운 장면 중심', EN: 'Built around energetic city scenes', JP: '街の刺激と新しい景色が中心' },
    onsen_recovery: { KO: '쉬는 시간을 일정의 중심에 배치', EN: 'Puts recovery time at the center', JP: '休む時間を旅の中心に置ける' },
    culture: { KO: '동네와 문화를 가까이에서 경험', EN: 'Gets closer to local culture', JP: '街と文化を身近に感じられる' },
    workation: { KO: '짧은 업무 시간을 함께 고려', EN: 'Leaves room for focused work', JP: '短い仕事時間も組み込みやすい' },
  }
  const companionReason: Record<TripMatchCompanion, LocalizedText> = {
    solo: { KO: '혼자서도 동선을 정리하기 쉬움', EN: 'Easy to navigate solo', JP: 'ひとりでも動線を組みやすい' },
    friends: { KO: '친구와 장면을 나누기 좋은 구성', EN: 'Easy to share with friends', JP: '友達と楽しみを分け合いやすい' },
    couple: { KO: '둘이 속도를 맞추기 좋은 흐름', EN: 'A comfortable pace for two', JP: 'ふたりでペースを合わせやすい' },
    workation: { KO: '이동과 업무 시간을 함께 고려', EN: 'Balances travel and work time', JP: '移動と仕事時間を両立しやすい' },
    undecided: { KO: '동행이 바뀌어도 조정하기 쉬움', EN: 'Flexible if plans change', JP: '同行者が変わっても調整しやすい' },
  }

  return [
    durationReason[answer.duration][lang],
    ...answer.moods.slice(0, 1).map((mood) => moodReason[mood][lang]),
    companionReason[answer.companion][lang],
  ].slice(0, 3)
}
