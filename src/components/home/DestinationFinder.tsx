'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, RotateCcw, Sparkles, MapPin } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import {
  FINDER_QUESTIONS,
  FINDER_UI,
  matchCities,
  type FinderAnswers,
  type FinderCity,
} from '@/lib/finder'

// ─────────────────────────────────────────────────────────────────────────────
// 목적지 추천 위저드 — 룰베이스 인터랙티브 (API 0원)
// 3문항 → 상위 3개 도시 → /select/hotel#{도시} 직결 + 비자AI 크로스링크
// ─────────────────────────────────────────────────────────────────────────────

export function DestinationFinder() {
  const { lang } = useLang()
  const [answers, setAnswers] = useState<Partial<FinderAnswers>>({})
  const [results, setResults] = useState<FinderCity[] | null>(null)

  const step = FINDER_QUESTIONS.findIndex((q) => !(q.key in answers))
  const current = step >= 0 ? FINDER_QUESTIONS[step] : null

  const pick = (key: keyof FinderAnswers, value: string) => {
    const next = { ...answers, [key]: value } as Partial<FinderAnswers>
    setAnswers(next)
    if (FINDER_QUESTIONS.every((q) => q.key in next)) {
      setResults(matchCities(next as FinderAnswers))
    }
  }

  const reset = () => {
    setAnswers({})
    setResults(null)
  }

  return (
    <section className="dark-surface py-16 md:py-24 px-6 bg-gradient-to-b from-[#0a1e33] to-[#0a1628] border-b border-white/5">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-9">
          <p className="text-sky-400 text-[0.6875rem] font-bold tracking-[0.08em] uppercase mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            {FINDER_UI.eyebrow[lang]}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug tracking-tight mb-3">
            {FINDER_UI.title[lang]}
          </h2>
          <p className="text-caption-on-dark">{FINDER_UI.sub[lang]}</p>
        </div>

        {/* 위저드 카드 */}
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          {results === null && current ? (
            <div key={current.key}>
              {/* 진행 표시 */}
              <div className="flex items-center gap-2 mb-5">
                {FINDER_QUESTIONS.map((q, i) => (
                  <span
                    key={q.key}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i < step ? 'w-8 bg-sky-400' : i === step ? 'w-8 bg-sky-400/80' : 'w-4 bg-white/15'
                    }`}
                  />
                ))}
                <span className="ml-auto text-white/40 text-xs font-semibold">
                  {FINDER_UI.step[lang]} {step + 1} / {FINDER_QUESTIONS.length}
                </span>
              </div>

              <p className="text-white font-bold text-lg md:text-xl mb-5">
                {current.label[lang]}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {current.options.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => pick(current.key, o.value)}
                    className="px-5 py-3 rounded-2xl border border-white/15 bg-white/[0.03] text-white/85 text-sm font-semibold hover:border-sky-400/60 hover:bg-sky-400/10 hover:text-white transition-all duration-150"
                  >
                    {o.label[lang]}
                  </button>
                ))}
              </div>
            </div>
          ) : results !== null ? (
            <div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-white font-bold text-lg md:text-xl">
                  {FINDER_UI.resultTitle[lang]}
                </p>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                  {FINDER_UI.retry[lang]}
                </button>
              </div>

              {/* 결과 카드 */}
              <div className="grid gap-3">
                {results.map((c, i) => (
                  <Link
                    key={c.id}
                    href={`/select/hotel#${c.anchor}`}
                    className={`group flex items-center gap-4 rounded-2xl overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 ${
                      i === 0
                        ? 'border-sky-400/40 bg-sky-400/[0.07]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                    }`}
                  >
                    <Image
                      src={c.photo}
                      alt={c.name[lang]}
                      width={112}
                      height={112}
                      className="w-24 h-24 md:w-28 md:h-28 object-cover shrink-0"
                    />
                    <div className="flex-1 py-3 pr-3 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-bold text-base">{c.name[lang]}</p>
                        {i === 0 && (
                          <span className="text-sky-300 text-[0.6rem] font-bold tracking-wide uppercase bg-sky-400/15 px-2 py-0.5 rounded-full">
                            {FINDER_UI.best[lang]}
                          </span>
                        )}
                      </div>
                      <p className="text-white/55 text-xs leading-relaxed mb-1.5">{c.reason[lang]}</p>
                      <span className="inline-flex items-center gap-1 text-sky-300 text-xs font-bold group-hover:gap-2 transition-all">
                        <MapPin className="w-3 h-3" strokeWidth={ICON_STROKE} />
                        {FINDER_UI.seeStays[lang]}
                        <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 비자AI 크로스링크 */}
              <div className="mt-5 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-white/45 text-xs">{FINDER_UI.visaHint[lang]}</p>
                <Link
                  href="/visa-ai"
                  className="shrink-0 inline-flex items-center gap-1.5 text-sky-300 text-xs font-bold hover:gap-2.5 transition-all"
                >
                  {FINDER_UI.visaCta[lang]}
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
