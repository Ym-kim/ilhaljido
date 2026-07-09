'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Send } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'
import { ConsentCheckbox } from '@/components/legal/ConsentCheckbox'

// monthler 벤치마킹 — 지자체·공간·업체 셀프서브 등록 (공급 콘텐츠 확보 채널)
// 저장: 기존 /api/applications 재활용 (job_type='프로그램 등록 제안', message에 구조화)

type FormState = {
  org: string
  contact: string
  email: string
  phone: string
  pname: string
  region: string
  ptype: string
  benefit: string
  period: string
  link: string
  message: string
}

const EMPTY: FormState = {
  org: '', contact: '', email: '', phone: '', pname: '', region: '',
  ptype: 'gov', benefit: '', period: '', link: '', message: '',
}

export default function ProgramRegisterPage() {
  const { tr } = useLang()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [consent, setConsent] = useState(false)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSending(true)
    // 구조화 직렬화 — admin 대시보드(message 필드)에서 그대로 읽힘. 1000자 제한 준수
    const structured = [
      `[프로그램 등록 제안]`,
      `기관: ${form.org}`,
      `프로그램: ${form.pname}`,
      `지역: ${form.region}`,
      `유형: ${form.ptype}`,
      `내용: ${form.benefit}`,
      `기간: ${form.period}`,
      form.link ? `링크: ${form.link}` : '',
      form.message ? `설명: ${form.message}` : '',
    ].filter(Boolean).join('\n').slice(0, 1000)

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.contact,
          phone: form.phone,
          email: form.email,
          job_type: '프로그램 등록 제안',
          message: structured,
        }),
      })
      if (!res.ok) throw new Error('submit failed')
      setDone(true)
    } catch {
      setError(tr('preg_fail'))
    } finally {
      setSending(false)
    }
  }

  const inputCls =
    'w-full bg-white border border-[#dbeafe] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#94a3b8] focus:outline-none focus:border-[#7dd3fc] focus:ring-2 focus:ring-sky-100 transition-all'
  const labelCls = 'block text-[#475569] text-xs font-bold mb-1.5'

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 pt-8 pb-2">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/programs/support"
            className="inline-flex items-center gap-1.5 text-[#94a3b8] text-xs font-medium hover:text-brand-mid transition-colors"
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={ICON_STROKE} />
            {tr('support_eyebrow')}
          </Link>
        </div>
      </div>

      <section className="px-6 pt-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3 tracking-tight">
            {tr('preg_title')}
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed mb-10">{tr('preg_desc')}</p>

          {done ? (
            <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-brand-mid mx-auto mb-4" strokeWidth={ICON_STROKE} />
              <p className="text-[#111827] font-black text-lg mb-2">{tr('preg_done_t')}</p>
              <p className="text-[#64748b] text-sm">{tr('preg_done_d')}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{tr('preg_org')} *</label>
                  <input required value={form.org} onChange={set('org')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{tr('preg_contact')} *</label>
                  <input required autoComplete="name" value={form.contact} onChange={set('contact')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{tr('preg_email')} *</label>
                  <input required type="email" inputMode="email" autoComplete="email" value={form.email} onChange={set('email')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{tr('preg_phone')} *</label>
                  <input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={inputCls} />
                </div>
              </div>

              <div className="h-px bg-[#e0f2fe]" />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{tr('preg_pname')} *</label>
                  <input required value={form.pname} onChange={set('pname')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{tr('preg_region')} *</label>
                  <input required value={form.region} onChange={set('region')} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>{tr('preg_type')} *</label>
                <select value={form.ptype} onChange={set('ptype')} className={inputCls}>
                  <option value="gov">{tr('preg_type_gov')}</option>
                  <option value="private">{tr('preg_type_private')}</option>
                  <option value="space">{tr('preg_type_space')}</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>{tr('preg_benefit')} *</label>
                <input required value={form.benefit} onChange={set('benefit')} className={inputCls} placeholder="예: 숙박 1박 5만원 지원, 총 30만원" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{tr('preg_period')} *</label>
                  <input required value={form.period} onChange={set('period')} className={inputCls} placeholder="예: 상시 / 2026.8.1~8.31" />
                </div>
                <div>
                  <label className={labelCls}>{tr('preg_link')}</label>
                  <input value={form.link} onChange={set('link')} className={inputCls} placeholder="https://" />
                </div>
              </div>
              <div>
                <label className={labelCls}>{tr('preg_message')}</label>
                <textarea value={form.message} onChange={set('message')} rows={4} className={inputCls} />
              </div>

              <ConsentCheckbox checked={consent} onChange={setConsent} />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={sending || !consent}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-mid hover:bg-brand-light disabled:opacity-60 text-white font-bold text-[0.9375rem] px-6 py-4 rounded-2xl transition-all shadow-[0_6px_24px_rgba(2,132,199,0.35)]"
              >
                <Send className="w-4 h-4" strokeWidth={ICON_STROKE} />
                {sending ? tr('preg_sending') : tr('preg_submit')}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
