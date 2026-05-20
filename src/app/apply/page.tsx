'use client'

import { useState, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Phone, Sparkles, CreditCard, RefreshCw, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/context/LanguageContext'
import {
  getApplyProgramOptions,
  getJobTypeOptions,
  getInterestOptions,
  getRestOptions,
  getWorkStyleOptions,
  getDurationOptions,
  getBudgetOptions,
  getYangyangDateOptions,
  getCompanionOptions,
} from '@/lib/i18n'

function ApplyForm() {
  const { lang, tr } = useLang()
  const searchParams = useSearchParams()
  const programParam = searchParams.get('program') ?? ''
  const isYangyang = programParam.toLowerCase().includes('yangyang')

  const programOptions = useMemo(() => getApplyProgramOptions(lang), [lang])
  const jobOptions = useMemo(() => getJobTypeOptions(lang), [lang])
  const interestOptions = useMemo(() => getInterestOptions(lang), [lang])
  const restOptions = useMemo(() => getRestOptions(lang), [lang])
  const workStyles = useMemo(() => getWorkStyleOptions(lang), [lang])
  const durations = useMemo(() => getDurationOptions(lang), [lang])
  const budgets = useMemo(() => getBudgetOptions(lang), [lang])
  const yangyangDates = useMemo(() => getYangyangDateOptions(lang), [lang])
  const companionOptions = useMemo(() => getCompanionOptions(lang), [lang])
  const soloCompanionLabel = companionOptions[0] ?? ''

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    job_type: '',
    program_id: programParam,
    work_style: '',
    interests: [] as string[],
    rest_preferences: [] as string[],
    duration_preference: '',
    budget_range: '',
    date_preference: '',
    companion_count: '0',
    companion_names: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function toggleChip(field: 'interests' | 'rest_preferences', val: string) {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(val) ? f[field].filter((v) => v !== val) : [...f[field], val],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('error')
      setDone(true)
    } catch {
      setError(tr('apply_error'))
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-16 px-6">
        <CheckCircle2 size={64} className="text-brand mx-auto mb-5" strokeWidth={1.5} />
        <h2 className="text-2xl font-black text-dark mb-3">{tr('apply_done_title')}</h2>
        <p className="text-muted leading-relaxed mb-8 whitespace-pre-line">{tr('apply_done_desc')}</p>
        <Button asChild>
          <Link href="/programs">{tr('apply_other_programs')}</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-dark mb-1.5">
          {tr('apply_name')} <span className="text-red-500">*</span>
        </label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-dark mb-1.5">
            {tr('apply_phone')} <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-1.5">
            {tr('apply_email')} <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-dark mb-1.5">
          {tr('apply_job')} <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={form.job_type}
          onChange={(e) => setForm((f) => ({ ...f, job_type: e.target.value }))}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors bg-white"
        >
          <option value="">{tr('apply_select')}</option>
          {jobOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-dark mb-1.5">
          {tr('apply_program')} <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={form.program_id}
          onChange={(e) => setForm((f) => ({ ...f, program_id: e.target.value }))}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors bg-white"
        >
          {programOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-dark mb-2">{tr('apply_work_style')}</label>
        <div className="space-y-2">
          {workStyles.map(({ val, label }) => (
            <label key={val} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="work_style"
                value={val}
                checked={form.work_style === val}
                onChange={() => setForm((f) => ({ ...f, work_style: val }))}
                className="accent-brand w-4 h-4"
              />
              <span className="text-sm text-text">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-dark mb-2">{tr('apply_interests')}</label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleChip('interests', opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                form.interests.includes(opt)
                  ? 'bg-brand-pale border-brand text-brand'
                  : 'bg-white border-border text-muted hover:border-brand'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-dark mb-2">{tr('apply_rest')}</label>
        <div className="flex flex-wrap gap-2">
          {restOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleChip('rest_preferences', opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                form.rest_preferences.includes(opt)
                  ? 'bg-brand-pale border-brand text-brand'
                  : 'bg-white border-border text-muted hover:border-brand'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {isYangyang && (
        <div>
          <label className="block text-sm font-bold text-dark mb-2">
            {tr('apply_date_preference')} <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {yangyangDates.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2.5 cursor-pointer p-3 rounded-xl border border-border hover:border-brand-mid transition-colors"
              >
                <input
                  type="radio"
                  name="date_preference"
                  value={opt}
                  checked={form.date_preference === opt}
                  onChange={() => setForm((f) => ({ ...f, date_preference: opt }))}
                  className="accent-brand w-4 h-4 shrink-0"
                />
                <span className="text-sm text-text font-medium">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-dark mb-2">{tr('apply_companion')}</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {companionOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  companion_count: opt,
                  companion_names: opt === soloCompanionLabel ? '' : f.companion_names,
                }))
              }
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                form.companion_count === opt
                  ? 'bg-brand-pale border-brand text-brand'
                  : 'bg-white border-border text-muted hover:border-brand'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {form.companion_count !== soloCompanionLabel && form.companion_count !== '0' && (
          <input
            value={form.companion_names}
            onChange={(e) => setForm((f) => ({ ...f, companion_names: e.target.value }))}
            placeholder={tr('apply_companion_names_placeholder')}
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-dark mb-1.5">{tr('apply_duration')}</label>
          <select
            value={form.duration_preference}
            onChange={(e) => setForm((f) => ({ ...f, duration_preference: e.target.value }))}
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid bg-white"
          >
            <option value="">{tr('apply_select_short')}</option>
            {durations.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-1.5">{tr('apply_budget')}</label>
          <select
            value={form.budget_range}
            onChange={(e) => setForm((f) => ({ ...f, budget_range: e.target.value }))}
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid bg-white"
          >
            <option value="">{tr('apply_select_short')}</option>
            {budgets.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-dark mb-1.5">{tr('apply_message')}</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          rows={3}
          placeholder={tr('apply_message_placeholder')}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? tr('apply_submitting') : tr('apply_submit_btn')}
      </Button>
      <p className="text-xs text-muted text-center">{tr('apply_privacy')}</p>
    </form>
  )
}

const BENEFIT_KEYS = [
  { icon: Phone, t: 'apply_benefit_1_t', d: 'apply_benefit_1_d' },
  { icon: Sparkles, t: 'apply_benefit_2_t', d: 'apply_benefit_2_d' },
  { icon: CreditCard, t: 'apply_benefit_3_t', d: 'apply_benefit_3_d' },
  { icon: RefreshCw, t: 'apply_benefit_4_t', d: 'apply_benefit_4_d' },
] as const

export default function ApplyPage() {
  const { tr } = useLang()

  return (
    <main className="pt-20 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-[6%] py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-3">APPLY NOW</p>
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight mb-3">{tr('apply_title')}</h1>
            <p className="text-muted mb-8 leading-relaxed whitespace-pre-line">{tr('apply_intro')}</p>
            <div className="space-y-3">
              {BENEFIT_KEYS.map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex gap-3 items-start p-4 bg-white rounded-xl border border-border">
                  <span className="text-brand mt-0.5 flex-shrink-0">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-dark">{tr(t)}</p>
                    <p className="text-xs text-muted mt-0.5">{tr(d)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
            <h2 className="text-lg font-black text-dark mb-5 pb-4 border-b border-border">{tr('apply_subtitle')}</h2>
            <Suspense fallback={<div className="text-sm text-muted">{tr('apply_loading')}</div>}>
              <ApplyForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
