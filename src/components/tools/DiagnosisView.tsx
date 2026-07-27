'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics/react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCheck,
  RotateCcw,
  Sun,
} from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import {
  DIAGNOSIS_QUESTIONS,
  DIAGNOSIS_UI,
  PHASE_LABEL,
  diagnose,
  type ChecklistPhase,
  type DiagnosisAnswers,
} from '@/lib/diagnosis'

// ─────────────────────────────────────────────────────────────────────────────
// 참가자 진단 & 실행 리포트 — 룰베이스 위저드 (API 0원)
// 결과·체크 상태는 localStorage 저장 → 재방문 시 리포트 이어보기
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'wakation_diagnosis_v1'

type Stored = { answers: DiagnosisAnswers; checked: string[] }

function loadStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Stored
    // 문항 키가 전부 있어야 유효 (버전 변경 대비)
    if (DIAGNOSIS_QUESTIONS.every((q) => parsed.answers?.[q.key])) return parsed
    return null
  } catch {
    return null
  }
}

function saveStored(s: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // 저장 실패는 UX를 막지 않음 (시크릿 모드 등)
  }
}

const PHASES: ChecklistPhase[] = ['before', 'during', 'after']

export function DiagnosisView() {
  const { lang } = useLang()
  const [answers, setAnswers] = useState<Partial<DiagnosisAnswers>>({})
  const [done, setDone] = useState(false)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  // 저장된 결과 복원 (SSR 불일치 방지를 위해 mount 후)
  useEffect(() => {
    const stored = loadStored()
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 저장 결과 복원은 mount 후 1회(하이드레이션 가드) 의도 패턴
      setAnswers(stored.answers)
      setChecked(new Set(stored.checked))
      setDone(true)
    }
    setHydrated(true)
  }, [])

  const step = DIAGNOSIS_QUESTIONS.findIndex((q) => !(q.key in answers))
  const current = !done && step >= 0 ? DIAGNOSIS_QUESTIONS[step] : null

  const result = useMemo(
    () => (done ? diagnose(answers as DiagnosisAnswers) : null),
    [done, answers]
  )

  const pick = (key: keyof DiagnosisAnswers, value: string) => {
    const next = { ...answers, [key]: value } as Partial<DiagnosisAnswers>
    setAnswers(next)
    if (DIAGNOSIS_QUESTIONS.every((q) => q.key in next)) {
      const full = next as DiagnosisAnswers
      setDone(true)
      saveStored({ answers: full, checked: [] })
      try {
        track('tools_diagnosis_completed', { profile: diagnose(full).profile.id })
      } catch {
        // 계측 실패 무시
      }
    }
  }

  const goBack = () => {
    const answeredKeys = DIAGNOSIS_QUESTIONS.filter((q) => q.key in answers).map((q) => q.key)
    const last = answeredKeys[answeredKeys.length - 1]
    if (!last) return
    const next = { ...answers }
    delete next[last]
    setAnswers(next)
  }

  const reset = () => {
    setAnswers({})
    setChecked(new Set())
    setDone(false)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // 무시
    }
  }

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      saveStored({ answers: answers as DiagnosisAnswers, checked: [...next] })
      return next
    })
  }

  const progress =
    result && result.checklist.length > 0
      ? Math.round(([...checked].filter((id) => result.checklist.some((c) => c.id === id)).length / result.checklist.length) * 100)
      : 0

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <section className="bg-[#f0f9ff] border-b border-[#dbeafe] px-4 sm:px-6 pt-28 pb-12 md:pt-32 md:pb-14">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase">
              {DIAGNOSIS_UI.eyebrow[lang]}
            </p>
            <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-brand-mid/10 text-brand-mid border border-brand-mid/20">
              {DIAGNOSIS_UI.beta[lang]}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-3">
            {DIAGNOSIS_UI.title[lang]}
          </h1>
          <p className="text-[#64748b] text-sm md:text-[0.9375rem] leading-relaxed max-w-2xl">
            {DIAGNOSIS_UI.sub[lang]}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          {/* 위저드 */}
          {hydrated && current && (
            <div key={current.key} className="bg-white border border-[#dbeafe] rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                {DIAGNOSIS_QUESTIONS.map((q, i) => (
                  <span
                    key={q.key}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i < step ? 'w-8 bg-brand-mid' : i === step ? 'w-8 bg-brand-mid/70' : 'w-4 bg-[#dbeafe]'
                    }`}
                  />
                ))}
                <span className="ml-auto text-[#94a3b8] text-xs font-semibold">
                  {DIAGNOSIS_UI.step[lang]} {step + 1} / {DIAGNOSIS_QUESTIONS.length}
                </span>
              </div>

              <p className="text-[#111827] font-black text-lg md:text-xl mb-5">
                {current.label[lang]}
              </p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {current.options.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => pick(current.key, o.value)}
                    className="text-left px-5 py-3.5 rounded-2xl border border-[#e2e8f0] bg-white text-[#334155] text-sm font-semibold hover:border-brand-mid hover:bg-[#f0f9ff] hover:text-[#111827] transition-all duration-150"
                  >
                    {o.label[lang]}
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={goBack}
                  className="mt-5 inline-flex items-center gap-1.5 text-[#94a3b8] hover:text-[#475569] text-xs font-semibold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                  {DIAGNOSIS_UI.back[lang]}
                </button>
              )}
            </div>
          )}

          {/* 결과 리포트 */}
          {hydrated && result && (
            <div className="space-y-6">
              {/* 유형 카드 */}
              <div className="bg-gradient-to-br from-[#f0f9ff] to-white border border-[#bae6fd] rounded-3xl p-6 md:p-8">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <p className="text-brand-mid text-[0.6875rem] font-black tracking-widest uppercase">
                    {DIAGNOSIS_UI.resultEyebrow[lang]}
                  </p>
                  <button
                    onClick={reset}
                    className="shrink-0 inline-flex items-center gap-1.5 text-[#94a3b8] hover:text-[#475569] text-xs font-semibold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                    {DIAGNOSIS_UI.retry[lang]}
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl" aria-hidden>{result.profile.emoji}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-[#111827]">
                    {result.profile.name[lang]}
                  </h2>
                </div>
                <p className="text-brand-mid font-bold text-sm mb-3">{result.profile.tagline[lang]}</p>
                <p className="text-[#475569] text-sm leading-relaxed mb-5">{result.profile.desc[lang]}</p>

                <div className="bg-white/80 border border-[#dbeafe] rounded-2xl p-4 flex items-start gap-3">
                  <Sun className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" strokeWidth={ICON_STROKE} />
                  <div>
                    <p className="text-[#111827] text-xs font-black mb-1">{DIAGNOSIS_UI.rhythmTitle[lang]}</p>
                    <p className="text-[#475569] text-xs leading-relaxed">{result.profile.rhythm[lang]}</p>
                  </div>
                </div>
              </div>

              {/* 추천 프로그램 */}
              <div>
                <h3 className="text-[#111827] font-black text-base mb-3">{DIAGNOSIS_UI.recsTitle[lang]}</h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {result.profile.recs.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="group bg-white border border-[#e2e8f0] rounded-2xl p-4 hover:border-brand-mid hover:shadow-md transition-all duration-150"
                    >
                      <p className="text-[#111827] font-bold text-sm mb-1">{r.label[lang]}</p>
                      <p className="text-[#64748b] text-xs leading-relaxed mb-2">{r.why[lang]}</p>
                      <span className="inline-flex items-center text-brand-mid group-hover:translate-x-0.5 transition-transform">
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 실행 체크리스트 */}
              <div className="bg-white border border-[#dbeafe] rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-1.5">
                  <h3 className="text-[#111827] font-black text-base flex items-center gap-2">
                    <ClipboardCheck className="w-4.5 h-4.5 text-brand-mid" strokeWidth={ICON_STROKE} />
                    {DIAGNOSIS_UI.checklistTitle[lang]}
                  </h3>
                  <span className="text-xs font-bold text-[#64748b]">
                    {DIAGNOSIS_UI.progress[lang]} {progress}%
                  </span>
                </div>
                <p className="text-[#94a3b8] text-xs mb-5">{DIAGNOSIS_UI.checklistSub[lang]}</p>

                <div className="h-1.5 rounded-full bg-[#f1f5f9] mb-6 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-mid transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="space-y-6">
                  {PHASES.map((phase) => {
                    const phaseItems = result.checklist.filter((c) => c.phase === phase)
                    if (phaseItems.length === 0) return null
                    return (
                      <div key={phase}>
                        <p className="text-[#94a3b8] text-[0.6875rem] font-black tracking-widest uppercase mb-2.5">
                          {PHASE_LABEL[phase][lang]}
                        </p>
                        <ul className="space-y-2">
                          {phaseItems.map((item) => {
                            const isOn = checked.has(item.id)
                            return (
                              <li key={item.id}>
                                <div
                                  className={`flex items-start gap-3 rounded-2xl border px-4 py-3 transition-all duration-150 ${
                                    isOn ? 'border-brand-mid/30 bg-[#f0f9ff]' : 'border-[#e2e8f0] bg-white'
                                  }`}
                                >
                                  <button
                                    onClick={() => toggle(item.id)}
                                    aria-pressed={isOn}
                                    aria-label={item.text[lang]}
                                    className={`shrink-0 mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                      isOn
                                        ? 'bg-brand-mid border-brand-mid text-white'
                                        : 'border-[#cbd5e1] bg-white text-transparent hover:border-brand-mid'
                                    }`}
                                  >
                                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                  </button>
                                  <div className="min-w-0">
                                    <span
                                      className={`block text-sm leading-relaxed ${
                                        isOn ? 'text-[#94a3b8] line-through' : 'text-[#334155]'
                                      }`}
                                    >
                                      {item.text[lang]}
                                    </span>
                                    {item.href && item.hrefLabel && (
                                      <Link
                                        href={item.href}
                                        className="inline-flex items-center gap-1 text-brand-mid text-xs font-bold mt-1 hover:gap-1.5 transition-all"
                                      >
                                        {item.hrefLabel[lang]}
                                        <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 신청 CTA */}
              <div className="bg-[#0a1e33] rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-white font-bold text-sm md:text-base">
                  {DIAGNOSIS_UI.applyTitle[lang]}
                </span>
                <Link
                  href="/apply"
                  className="shrink-0 inline-flex items-center gap-2 bg-brand-mid text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-brand-light transition-all shadow-md"
                >
                  {DIAGNOSIS_UI.applyCta[lang]}
                  <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
                </Link>
              </div>

              <p className="text-[#94a3b8] text-xs leading-relaxed">{DIAGNOSIS_UI.disclaimer[lang]}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
