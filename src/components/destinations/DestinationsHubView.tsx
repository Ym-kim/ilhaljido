'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { CITY_INSIGHTS, INTERNET_LABEL, COST_TIER_LABEL, COST_TIER_STYLE } from '@/lib/cities'
import { SelectionCriteria } from '@/components/affiliate/SelectionCriteria'

// ─────────────────────────────────────────────────────────────────────────────
// /destinations 허브 — 워케이션 도시 인사이트 그리드 (3언어, 라이트 톤)
// ─────────────────────────────────────────────────────────────────────────────

const UI: Record<string, Record<Lang, string>> = {
  eyebrow: { KO: 'Destinations', EN: 'Destinations', JP: 'Destinations' },
  title: { KO: '워케이션 도시 가이드', EN: 'Workation City Guides', JP: 'ワーケーション都市ガイド' },
  sub: {
    KO: '인터넷·생활비·비자·시즌까지 핵심만 정리. 다음 워케이션 목적지를 정해보세요.',
    EN: 'Internet, cost of living, visa and seasons — the essentials. Pick your next workation base.',
    JP: 'ネット・生活費・ビザ・シーズンの要点だけ整理。次のワーケーション先を選ぼう。',
  },
  internet: { KO: '인터넷', EN: 'Internet', JP: 'ネット' },
  cost: { KO: '생활비', EN: 'Cost', JP: '生活費' },
  visa: { KO: '비자', EN: 'Visa', JP: 'ビザ' },
  more: { KO: '자세히 보기', EN: 'View details', JP: '詳しく見る' },
}

function InternetStars({ score }: { score: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= score ? 'text-teal-500' : 'text-[#ddd]'}>★</span>
      ))}
    </span>
  )
}

export function DestinationsHubView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <section className="bg-white border-b border-[#e8e4dc] px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black tracking-widest uppercase text-teal-600 mb-3">{UI.eyebrow[lang]}</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] leading-tight mb-4">
            {UI.title[lang]}
          </h1>
          <p className="text-[#666] text-lg max-w-xl">{UI.sub[lang]}</p>
          <SelectionCriteria className="mt-4" />
        </div>
      </section>

      {/* City grid */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITY_INSIGHTS.map((city) => (
            <Link
              key={city.id}
              href={`${prefix}/destinations/${city.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#e8e4dc] hover:border-teal-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Cover photo */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={city.photo}
                  alt={`${city.name[lang]} workation`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="text-2xl mb-0.5">{city.flag}</div>
                  <div className="font-black text-lg leading-tight">{city.name[lang]}</div>
                  <div className="text-white/70 text-xs">{city.country[lang]}</div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {city.tags[lang].slice(0, 2).map((t) => (
                    <span key={t} className="text-xs bg-[#f0f0eb] text-[#555] px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Stats — 숫자+정성 라벨 병기 (NomadList 벤치) */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#888] shrink-0">{UI.internet[lang]}</span>
                    <span className="flex items-center gap-1.5 min-w-0">
                      <InternetStars score={city.internet} />
                      <span className="text-[0.6875rem] text-[#666] font-medium truncate">{INTERNET_LABEL[city.internet][lang]}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#888] shrink-0">{UI.cost[lang]}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="font-bold text-[#111]">{city.costMonthly[lang]}</span>
                      <span className={`text-[0.625rem] font-bold px-1.5 py-0.5 rounded-full ${COST_TIER_STYLE[city.costTier]}`}>
                        {COST_TIER_LABEL[city.costTier][lang]}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#888] shrink-0">{UI.visa[lang]}</span>
                    <span className="text-[#444] text-xs text-right line-clamp-1">{city.visaFree[lang]}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#f0f0eb] flex items-center justify-between">
                  <span className="text-teal-600 text-xs font-bold">{UI.more[lang]}</span>
                  <ArrowRight className="w-4 h-4 text-teal-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
