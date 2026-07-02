'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { SectionTitle } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import {
  VISA_COUNTRIES,
  VISA_PURPOSES,
  VISA_DURATIONS,
  getVisaMockResult,
} from '@/lib/i18n'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { VISA_PREP_ITEMS } from '@/lib/affiliate/links'

type Step = 1 | 2 | 3 | 4

interface Selections {
  country: string
  purpose: string
  duration: string
}

export default function VisaAiPage() {
  const { lang, tr } = useLang()
  const [step, setStep] = useState<Step>(1)
  const [selections, setSelections] = useState<Selections>({ country: '', purpose: '', duration: '' })
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

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
    setSelections((prev) => ({ ...prev, duration: d }))
    setLoading(true)
    setStep(4)
    setTimeout(() => {
      setLoading(false)
      setShowResult(true)
    }, 1800)
  }

  function reset() {
    setStep(1)
    setSelections({ country: '', purpose: '', duration: '' })
    setLoading(false)
    setShowResult(false)
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

                  <div className="space-y-4">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                      <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">{tr('visa_label_type')}</p>
                      <p className="text-white font-bold">{result.visaType}</p>
                    </div>
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                      <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">{tr('visa_label_req')}</p>
                      <p className="text-white/75 text-sm leading-relaxed">{result.requirement}</p>
                    </div>
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
        title="비자 받았다면, 이것도 미리 준비하세요"
        subtitle="항공권 예약 확인서, eSIM 개통까지. 출국 전 빠뜨리기 쉬운 것들입니다."
        items={VISA_PREP_ITEMS}
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
