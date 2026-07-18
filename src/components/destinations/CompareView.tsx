'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import {
  CITY_INSIGHTS,
  INTERNET_LABEL,
  COST_TIER_LABEL,
  COST_TIER_STYLE,
  type CityInsight,
} from '@/lib/cities'
import { trackAffiliateClick } from '@/lib/track'

// ─────────────────────────────────────────────────────────────────────────────
// /destinations/compare — 도시 나란히 비교 도구 (3언어, 라이트 톤)
// NomadList 비교 문법의 워케이션 번안. 데이터는 cities.ts 검증값 재포장만(신규 입력 0).
// 선택은 ?cities= 쿼리와 동기화(공유 가능). 2~3개 선택.
// ─────────────────────────────────────────────────────────────────────────────

const UI: Record<string, Record<Lang, string>> = {
  eyebrow: { KO: 'Compare', EN: 'Compare', JP: 'Compare' },
  title: { KO: '워케이션 도시 비교', EN: 'Compare Workation Cities', JP: 'ワーケーション都市を比較' },
  sub: {
    KO: '고민 중인 2~3개 도시를 나란히 놓고 인터넷·생활비·비자·시차를 한 번에 비교하세요.',
    EN: 'Put 2–3 cities side by side — internet, cost, visa and time zone at a glance.',
    JP: '迷っている2〜3都市を並べて、ネット・生活費・ビザ・時差を一度に比較。',
  },
  pickHint: { KO: '2~3개 도시를 선택하세요', EN: 'Pick 2–3 cities', JP: '2〜3都市を選択' },
  internet: { KO: '인터넷 속도', EN: 'Internet speed', JP: 'ネット速度' },
  cost: { KO: '월 생활비', EN: 'Monthly cost', JP: '月の生活費' },
  costBreakdown: { KO: '비용 구성', EN: 'Cost breakdown', JP: '費用の内訳' },
  timezone: { KO: '시간대', EN: 'Time zone', JP: 'タイムゾーン' },
  flight: { KO: '직항 소요', EN: 'Direct flight', JP: '直行便' },
  visa: { KO: '비자', EN: 'Visa', JP: 'ビザ' },
  season: { KO: '베스트 시즌', EN: 'Best season', JP: 'ベストシーズン' },
  plug: { KO: '콘센트·전압', EN: 'Plug & voltage', JP: 'コンセント・電圧' },
  payment: { KO: '결제 환경', EN: 'Payments', JP: '決済環境' },
  workEnv: { KO: '업무 환경', EN: 'Work setup', JP: '仕事環境' },
  prosTitle: { KO: '좋은 점', EN: 'The good', JP: '良い点' },
  consTitle: { KO: '아쉬운 점', EN: 'The trade-offs', JP: '惜しい点' },
  detail: { KO: '상세 가이드', EN: 'Full guide', JP: '詳細ガイド' },
  stay: { KO: '숙소 검색', EN: 'Find stays', JP: '宿を探す' },
  note: {
    KO: '에디터 관점의 정리입니다 — 단점도 솔직하게 적었습니다. 숙소 검색은 제휴 링크이며, 요금과 조건은 제휴사 사이트에서 최종 확인됩니다.',
    EN: "Editor's honest take — trade-offs included. Stay search links are affiliate links; final rates are confirmed on the partner site.",
    JP: 'エディターの率直なまとめ — 惜しい点も正直に。宿検索は提携リンクで、料金は提携先サイトでご確認ください。',
  },
}

const DEFAULT_IDS = ['tokyo', 'chiangmai']
const MAX = 3
const MIN = 2

function Stars({ score }: { score: number }) {
  return (
    <span className="flex gap-0.5 text-sm">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= score ? 'text-teal-500' : 'text-[#ddd]'}>★</span>
      ))}
    </span>
  )
}

/** 행 라벨 셀 — 모바일 가로 스크롤 시 왼쪽 고정 */
function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="row"
      className="sticky left-0 z-10 bg-[#fafaf8] text-left align-top px-3 py-3 text-xs font-bold text-[#888] w-28 min-w-28 border-t border-[#eee]"
    >
      {children}
    </th>
  )
}

export function CompareView() {
  const { lang } = useLang()
  const [ids, setIds] = useState<string[]>(DEFAULT_IDS)

  // 마운트 시 ?cities= 복원 (유효 id 2~3개일 때만)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('cities')
    if (!q) return
    const valid = q.split(',').filter((id) => CITY_INSIGHTS.some((c) => c.id === id))
    if (valid.length >= MIN && valid.length <= MAX) setIds(valid)
  }, [])

  // 선택 변경 → URL 동기화 + 계측
  useEffect(() => {
    const url = `${window.location.pathname}?cities=${ids.join(',')}`
    window.history.replaceState(null, '', url)
    try { track('city_compare', { cities: ids.join(',') }) } catch { /* noop */ }
  }, [ids])

  const toggle = (id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        return prev.length > MIN ? prev.filter((x) => x !== id) : prev
      }
      return prev.length < MAX ? [...prev, id] : prev
    })
  }

  const cities = ids
    .map((id) => CITY_INSIGHTS.find((c) => c.id === id))
    .filter((c): c is CityInsight => Boolean(c))

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <section className="bg-white border-b border-[#e8e4dc] px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black tracking-widest uppercase text-teal-600 mb-3">{UI.eyebrow[lang]}</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] leading-tight mb-4">{UI.title[lang]}</h1>
          <p className="text-[#666] text-lg max-w-xl">{UI.sub[lang]}</p>
        </div>
      </section>

      {/* City picker */}
      <section className="max-w-5xl mx-auto px-6 pt-8">
        <p className="text-xs font-bold text-[#888] mb-3">{UI.pickHint[lang]}</p>
        <div className="flex flex-wrap gap-2">
          {CITY_INSIGHTS.map((c) => {
            const on = ids.includes(c.id)
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggle(c.id)}
                aria-pressed={on}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold border transition-colors ${
                  on
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-[#555] border-[#e0dcd4] hover:border-teal-300'
                }`}
              >
                {on && <Check className="w-3.5 h-3.5" />}
                <span>{c.flag}</span>
                {c.name[lang]}
              </button>
            )
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="overflow-x-auto rounded-2xl border border-[#e8e4dc] bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-[#fafaf8] w-28 min-w-28" aria-hidden="true" />
                {cities.map((c) => (
                  <th key={c.id} scope="col" className="align-top px-3 pt-4 pb-3 min-w-52 text-left">
                    <Link href={`/destinations/${c.id}`} className="group block">
                      <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.photo}
                          alt={`${c.name[lang]} workation`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-2 left-3 text-white">
                          <span className="block text-lg leading-none mb-0.5">{c.flag}</span>
                          <span className="block font-black text-base leading-tight">{c.name[lang]}</span>
                        </div>
                      </div>
                      <span className="block text-xs text-[#888]">{c.country[lang]}</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <RowLabel>{UI.internet[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee]">
                    <Stars score={c.internet} />
                    <span className="block text-xs text-[#666] font-medium mt-1">{INTERNET_LABEL[c.internet][lang]}</span>
                    <span className="block text-[0.6875rem] text-[#999] mt-0.5">{c.internetNote[lang]}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.cost[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee]">
                    <span className="font-bold text-[#111] text-sm">{c.costMonthly[lang]}</span>
                    <span className={`ml-1.5 text-[0.625rem] font-bold px-1.5 py-0.5 rounded-full ${COST_TIER_STYLE[c.costTier]}`}>
                      {COST_TIER_LABEL[c.costTier][lang]}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.costBreakdown[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee] text-xs text-[#666]">
                    {c.costBreakdown[lang]}
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.timezone[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee] text-sm text-[#333]">
                    {c.timezone[lang]}
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.flight[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee] text-sm text-[#333]">
                    {c.flightTime[lang]}
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.visa[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee] text-sm text-[#333]">
                    {c.visaFree[lang]}
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.season[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee] text-sm text-[#333]">
                    {c.bestSeason[lang]}
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.plug[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee] text-xs text-[#666]">
                    {c.plug[lang]}
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.payment[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee] text-xs text-[#666]">
                    {c.payment[lang]}
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.workEnv[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee]">
                    {c.workTags ? (
                      <span className="flex flex-wrap gap-1">
                        {c.workTags[lang].map((t) => (
                          <span key={t} className="text-[0.6875rem] bg-[#f0f0eb] text-[#555] px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </span>
                    ) : (
                      <span className="text-xs text-[#bbb]">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.prosTitle[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee]">
                    <ul className="space-y-1">
                      {c.pros[lang].map((p) => (
                        <li key={p} className="text-xs text-[#333] flex gap-1.5">
                          <span className="text-teal-500 shrink-0">+</span>{p}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <RowLabel>{UI.consTitle[lang]}</RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-3 border-t border-[#eee]">
                    <ul className="space-y-1">
                      {c.cons[lang].map((p) => (
                        <li key={p} className="text-xs text-[#666] flex gap-1.5">
                          <span className="text-rose-400 shrink-0">−</span>{p}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              {/* CTA row */}
              <tr>
                <RowLabel><span className="sr-only">CTA</span></RowLabel>
                {cities.map((c) => (
                  <td key={c.id} className="align-top px-3 py-4 border-t border-[#eee]">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/destinations/${c.id}`}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full text-xs font-bold border border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors"
                      >
                        {UI.detail[lang]}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <a
                        href={c.hotelBookingHref}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        onClick={() =>
                          trackAffiliateClick({ id: `compare-hotel-${c.id}`, provider: 'booking', status: 'active_affiliate', page: '/destinations/compare' })
                        }
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                      >
                        {UI.stay[lang]}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[0.6875rem] text-[#999] mt-3 max-w-2xl">{UI.note[lang]}</p>
      </section>
    </div>
  )
}
