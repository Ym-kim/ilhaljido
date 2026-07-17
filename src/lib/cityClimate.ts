import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 도시별 월간 기후 스트립 — /destinations/[city] "언제 갈까" 답변용 (NomadList Weather 벤치)
// 데이터: 각 도시 기후 평년값(climate normals) 기반 근사치. 허위 정밀도 회피를 위해
//   기온=월평균 근사(°C 정수), 강수=3단계 버킷(0 적음/1 보통/2 많음)만 표기.
// best 플래그는 cities.ts bestSeason(기검증)과 일치시킴. 시드니는 남반구 역계절.
// ─────────────────────────────────────────────────────────────────────────────

export type MonthClimate = {
  t: number          // 월평균 기온 근사 (°C)
  rain: 0 | 1 | 2    // 강수 버킷: 0 적음 / 1 보통 / 2 많음
  best?: boolean     // 추천 시즌 (cities.ts bestSeason과 일치)
}

// index 0 = 1월 … 11 = 12월
export const CITY_CLIMATE: Record<string, MonthClimate[]> = {
  tokyo: [
    { t: 5, rain: 0 }, { t: 6, rain: 0 }, { t: 9, rain: 1, best: true },
    { t: 14, rain: 1, best: true }, { t: 19, rain: 1, best: true }, { t: 22, rain: 2 },
    { t: 26, rain: 2 }, { t: 27, rain: 1 }, { t: 24, rain: 2, best: true },
    { t: 18, rain: 2, best: true }, { t: 13, rain: 1, best: true }, { t: 8, rain: 0 },
  ],
  osaka: [
    { t: 6, rain: 0 }, { t: 6, rain: 0 }, { t: 10, rain: 1, best: true },
    { t: 15, rain: 1, best: true }, { t: 20, rain: 1, best: true }, { t: 24, rain: 2 },
    { t: 28, rain: 2 }, { t: 29, rain: 1 }, { t: 25, rain: 2, best: true },
    { t: 19, rain: 1, best: true }, { t: 13, rain: 1, best: true }, { t: 8, rain: 0 },
  ],
  fukuoka: [
    { t: 6, rain: 1 }, { t: 7, rain: 1 }, { t: 10, rain: 1, best: true },
    { t: 15, rain: 1, best: true }, { t: 19, rain: 1, best: true }, { t: 23, rain: 2, best: true },
    { t: 27, rain: 2 }, { t: 28, rain: 2 }, { t: 24, rain: 2, best: true },
    { t: 19, rain: 1, best: true }, { t: 13, rain: 1, best: true }, { t: 8, rain: 0 },
  ],
  bali: [
    { t: 27, rain: 2 }, { t: 27, rain: 2 }, { t: 27, rain: 2 },
    { t: 27, rain: 1, best: true }, { t: 27, rain: 0, best: true }, { t: 26, rain: 0, best: true },
    { t: 26, rain: 0, best: true }, { t: 26, rain: 0, best: true }, { t: 26, rain: 0, best: true },
    { t: 27, rain: 1, best: true }, { t: 27, rain: 2 }, { t: 27, rain: 2 },
  ],
  danang: [
    { t: 21, rain: 1 }, { t: 22, rain: 0, best: true }, { t: 24, rain: 0, best: true },
    { t: 26, rain: 0, best: true }, { t: 28, rain: 0, best: true }, { t: 29, rain: 0, best: true },
    { t: 29, rain: 0, best: true }, { t: 29, rain: 1, best: true }, { t: 27, rain: 2 },
    { t: 26, rain: 2 }, { t: 24, rain: 2 }, { t: 22, rain: 2 },
  ],
  chiangmai: [
    { t: 21, rain: 0, best: true }, { t: 23, rain: 0, best: true }, { t: 26, rain: 0 },
    { t: 29, rain: 1 }, { t: 29, rain: 2 }, { t: 27, rain: 2 },
    { t: 27, rain: 2 }, { t: 26, rain: 2 }, { t: 26, rain: 2 },
    { t: 25, rain: 1 }, { t: 23, rain: 0, best: true }, { t: 21, rain: 0, best: true },
  ],
  cebu: [
    { t: 27, rain: 1, best: true }, { t: 27, rain: 0, best: true }, { t: 28, rain: 0, best: true },
    { t: 29, rain: 0, best: true }, { t: 29, rain: 1, best: true }, { t: 29, rain: 2 },
    { t: 28, rain: 2 }, { t: 28, rain: 1 }, { t: 28, rain: 2 },
    { t: 28, rain: 2 }, { t: 28, rain: 2 }, { t: 27, rain: 1, best: true },
  ],
  sydney: [
    { t: 23, rain: 1 }, { t: 23, rain: 1 }, { t: 21, rain: 1, best: true },
    { t: 18, rain: 1, best: true }, { t: 15, rain: 1, best: true }, { t: 13, rain: 2 },
    { t: 12, rain: 1 }, { t: 13, rain: 1 }, { t: 16, rain: 1, best: true },
    { t: 18, rain: 1, best: true }, { t: 20, rain: 1, best: true }, { t: 22, rain: 1 },
  ],
}

type L = Record<Lang, string>

export const CLIMATE_UI: Record<string, L> = {
  title: { KO: '언제 가면 좋을까', EN: 'When to go', JP: 'いつ行くのがいい？' },
  bestLegend: { KO: '추천 시즌', EN: 'Best season', JP: 'おすすめシーズン' },
  rainLegend: { KO: '강수 많음', EN: 'Rainy', JP: '雨が多い' },
  note: {
    KO: '월평균 기온·강수 경향의 근사치입니다. 여행 전 최신 예보를 확인하세요.',
    EN: 'Approximate monthly averages — check the latest forecast before you travel.',
    JP: '月平均の目安です。渡航前に最新の予報をご確認ください。',
  },
}

export const MONTH_LABELS: Record<Lang, string[]> = {
  KO: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  EN: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  JP: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
}
