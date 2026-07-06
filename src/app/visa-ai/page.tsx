'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw, Sparkles, LogIn } from 'lucide-react'
import { SectionTitle } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import {
  VISA_COUNTRIES,
  VISA_PURPOSES,
  VISA_DURATIONS,
  getVisaMockResult,
} from '@/lib/i18n'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { VISA_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'

type Step = 1 | 2 | 3 | 4

interface Selections {
  country: string
  purpose: string
  duration: string
}

export default function VisaAiPage() {
  const { lang, tr } = useLang()
  const { user } = useAuth()
  const [step, setStep] = useState<Step>(1)
  const [selections, setSelections] = useState<Selections>({ country: '', purpose: '', duration: '' })
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [aiResult, setAiResult] = useState<string | null>(null)
  const [aiFailed, setAiFailed] = useState(false)

  const stepLabelKeys = ['visa_step_country', 'visa_step_purpose', 'visa_step_duration', 'visa_step_result'] as const

  function labelForCountry(value: string) {
    return VISA_COUNTRIES.find((c) => c.value === value)?.label[lang] ?? value
  }

  function selectCountry(c: string) {
    setSelections((p) => ({ ...p, country: c }))
    setStep(2)
  }

  function selectPurpose(p: string) {
    setSelections((prev) => ({ ...prev, purpose: p }))
    setStep(3)
  }

  function selectDuration(d: string) {
    const sel = { ...selections, duration: d }
    setSelections(sel)
    setLoading(true)
    setStep(4)

    // 로그인 사용자: 실시간 AI 분석 (베타 무료) / 비로그인: 기본 가이드(mock)
    if (user) {
      fetch('/api/visa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: VISA_COUNTRIES.find((c) => c.value === sel.country)?.label.KO ?? sel.country,
          purpose: VISA_PURPOSES.find((p) => p.value === sel.purpose)?.label.KO ?? sel.purpose,
          duration: VISA_DURATIONS.find((x) => x.value === sel.duration)?.label.KO ?? sel.duration,
          lang,
        }),
      })
        .then(async (r) => {
          const data = await r.json()
          if (r.ok && data.analysis) {
            setAiResult(data.analysis)
          } else {
            setAiFailed(true)
          }
        })
        .catch(() => setAiFailed(true))
        .finally(() => {
          setLoading(false)
          setShowResult(true)
        })
    } else {
      setTimeout(() => {
        setLoading(false)
        setShowResult(true)
      }, 1800)
    }
  }

  function reset() {
    setStep(1)
    setSelections({ country: '', purpose: '', duration: '' })
    setLoading(false)
    setShowResult(false)
    setAiResult(null)
    setAiFailed(false)
  }

  const result =
    showResult && selections.country
      ? getVisaMockResult(lang, selections.country, selections.purpose, selections.duration)
      : null

  const selectionSummary = [
    selections.country ? labelForCountry(selections.country) : '',
    selections.purpose ? VISA_PURPOSES.find((p) => p.value === selections.purpose)?.label[lang] : '',
    selections.duration ? VISA_DURATIONS.find((d) => d.value === selections.duration)?.label[lang] : '',
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="min-h-screen bg-[#0f0f0f] dark-surface">
      <section className="pt-28 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold px-4 py-2 rounded-full mb-6">
          {tr('visa_badge')}
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-5">{tr('visa_title')}</h1>
        <p className="text-lead-on-dark text-lg md:text-xl mb-3">{tr('visa_sub')}</p>
        <p className="text-caption-on-dark text-sm max-w-xl mx-auto leading-relaxed">{tr('visa_intro')}</p>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-10">
            {stepLabelKeys.map((key, i) => {
              const s = (i + 1) as Step
              const isActive = step === s
              const isDone = step > s
              return (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      isDone ? 'bg-teal-500 text-white' : isActive ? 'bg-white text-gray-900' : 'bg-white/10 text-gray-500'
                    }`}
                  >
                    {isDone ? '✓' : s}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-white' : 'text-white/45'}`}>
                    {tr(key)}
                  </span>
                  {i < stepLabelKeys.length - 1 && <div className="w-6 h-px bg-white/20" />}
                </div>
              )
            })}
          </div>

          {step === 1 && (
            <div>
              <SectionTitle onDark className="mb-6 text-center text-2xl md:text-3xl">
                {tr('visa_pick_country')}
              </SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {VISA_COUNTRIES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => selectCountry(c.value)}
                    className="bg-white/10 border border-white/20 text-white font-bold py-4 rounded-2xl hover:bg-teal-500/20 hover:border-teal-500/50 transition-all hover:-translate-y-0.5"
                  >
                    {c.label[lang]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-teal-400 text-sm text-center mb-2">{selectionSummary}</p>
              <SectionTitle onDark className="mb-6 text-center text-2xl md:text-3xl">
                {tr('visa_pick_purpose')}
              </SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {VISA_PURPOSES.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => selectPurpose(p.value)}
                    className="bg-white/10 border border-white/20 text-white font-bold py-4 rounded-2xl hover:bg-teal-500/20 hover:border-teal-500/50 transition-all hover:-translate-y-0.5"
                  >
                    {p.label[lang]}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="block mx-auto mt-6 text-white/45 text-sm hover:text-white transition-colors"
              >
                {tr('visa_back')}
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-teal-400 text-sm text-center mb-2">{selectionSummary}</p>
              <SectionTitle onDark className="mb-6 text-center text-2xl md:text-3xl">
                {tr('visa_pick_duration')}
              </SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                {VISA_DURATIONS.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => selectDuration(d.value)}
                    className="bg-white/10 border border-white/20 text-white font-bold py-6 rounded-2xl hover:bg-teal-500/20 hover:border-teal-500/50 transition-all hover:-translate-y-0.5 text-lg"
                  >
                    {d.label[lang]}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="block mx-auto mt-6 text-white/45 text-sm hover:text-white transition-colors"
              >
                {tr('visa_back')}
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              {loading && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                  <p className="text-white font-bold text-lg">{tr('visa_analyzing')}</p>
                  <p className="text-caption-on-dark text-sm mt-2">{selectionSummary}</p>
                </div>
              )}

              {showResult && result && (
                <div>
                  <div className="text-center mb-8">
                    <p className="text-teal-400 text-sm mb-2">{selectionSummary}</p>
                    <SectionTitle onDark className="text-center text-2xl">
                      {tr('visa_result_for')}
                    </SectionTitle>
                  </div>

                  {/* 비로그인 — 실시간 AI 유도 배너 */}
                  {!user && (
                    <div className="mb-5 bg-gradient-to-r from-teal-500/12 to-sky-500/8 border border-teal-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-teal-300 font-bold text-sm mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" /> {tr('visa_login_banner_t')}
                        </p>
                        <p className="text-white/55 text-xs leading-relaxed">{tr('visa_login_banner_d')}</p>
                      </div>
                      <Link
                        href="/login"
                        className="shrink-0 inline-flex items-center gap-1.5 bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-full hover:bg-teal-400 transition-all"
                      >
                        <LogIn className="w-3.5 h-3.5" /> {tr('visa_login_btn')}
                      </Link>
                    </div>
                  )}

                  {/* AI 실패 안내 */}
                  {user && aiFailed && (
                    <div className="mb-5 bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4">
                      <p className="text-amber-300/90 text-xs">{tr('visa_ai_fail')}</p>
                    </div>
                  )}

                  {/* 실시간 AI 분석 결과 (로그인 · 베타) */}
                  {aiResult && (
                    <div className="mb-5 bg-[#0d1f1c] border border-teal-500/35 rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
                      <p className="text-teal-300 text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> {tr('visa_live_badge')}
                      </p>
                      <div className="text-white/85 text-sm leading-relaxed whitespace-pre-wrap">{aiResult}</div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {!aiResult && (
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                      <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">{tr('visa_label_type')}</p>
                      <p className="text-white font-bold">{result.visaType}</p>
                    </div>
                    )}
                    {!aiResult && (
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                      <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">{tr('visa_label_req')}</p>
                      <p className="text-white/75 text-sm leading-relaxed">{result.requirement}</p>
                    </div>
                    )}
                    <div className="bg-[#1a1a1a] border border-teal-500/30 rounded-2xl p-6">
                      <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">{tr('visa_label_prog')}</p>
                      <p className="text-white font-bold mb-3">{result.program}</p>
                      <Link
                        href="/programs"
                        className="inline-flex items-center gap-1 text-teal-400 text-sm font-semibold hover:gap-2 transition-all"
                      >
                        {tr('nav_cta')} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
                      <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">{tr('visa_label_official')}</p>
                      <p className="text-white/55 text-xs">{result.official}</p>
                    </div>

                    {/* 요금제 고지 — 베타 무료 → 연간 멤버십 */}
                    <p className="text-white/30 text-[0.7rem] text-center pt-2">{tr('visa_beta_notice')}</p>
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    className="flex items-center gap-2 mx-auto mt-8 text-white/45 text-sm hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> {tr('visa_retry')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 비자 이후 체류 준비 서비스 */}
      <AffiliateSection
        title={tr('vsel_prep_t')}
        subtitle={tr('vsel_prep_d')}
        items={VISA_PREP_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
        cols={3}
      />

      <section className="border-t border-white/10 py-10 px-6 bg-[#111]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-caption-on-dark text-xs leading-relaxed">{tr('visa_disclaimer')}</p>
          <p className="text-white/35 text-xs mt-4">{tr('visa_disclaimer2')}</p>
        </div>
      </section>
    </div>
  )
}
