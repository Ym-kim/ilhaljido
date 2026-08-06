'use client'

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'
import { ConsentCheckbox } from '@/components/legal/ConsentCheckbox'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 문의 폼 공용 컴포넌트 (2026-08-07 구조 결정 ④ — mailto → 폼 전환)
//
// 배경: /partnership·/contact는 mailto 링크뿐이었다. mailto는 ①모바일에 메일 앱이
// 없거나 웹메일만 쓰는 사용자에게서 그냥 끊기고 ②유입·전환 계측이 불가능하며
// ③문의 내역이 DB에 남지 않아 /admin에서 관리할 수 없다.
//
// 저장: 기존 /api/applications 재활용 (job_type으로 구분, message에 구조화 직렬화).
// 이미 검증된 경로 — 레이트리밋·이메일 검증·RLS 우회 insert가 서버에 구현돼 있다.
// 관리: /admin 신청 목록에서 job_type으로 필터.
//
// 메일 선호 사용자를 위해 mailto는 폼 하단 폴백 링크로 남긴다(제거하지 않음).
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

export type InquiryCategory = { id: string; label: L }

const T: Record<string, L> = {
  name: { KO: '이름 / 담당자', EN: 'Name / contact person', JP: 'お名前 / ご担当者' },
  org: { KO: '소속 (선택)', EN: 'Organization (optional)', JP: '所属（任意）' },
  email: { KO: '이메일', EN: 'Email', JP: 'メールアドレス' },
  phone: { KO: '연락처', EN: 'Phone', JP: '電話番号' },
  category: { KO: '문의 유형', EN: 'Inquiry type', JP: 'お問い合わせ種別' },
  message: { KO: '문의 내용', EN: 'Your message', JP: 'お問い合わせ内容' },
  messagePh: {
    KO: '제안·문의 내용을 자유롭게 적어주세요.',
    EN: 'Tell us about your proposal or question.',
    JP: 'ご提案・ご質問の内容をご記入ください。',
  },
  submit: { KO: '문의 보내기', EN: 'Send inquiry', JP: 'お問い合わせを送る' },
  sending: { KO: '보내는 중…', EN: 'Sending…', JP: '送信中…' },
  doneT: { KO: '접수 완료!', EN: 'Received!', JP: '受付完了！' },
  doneD: {
    KO: '내용을 확인한 뒤 입력해주신 이메일로 회신드리겠습니다.',
    EN: 'We will review it and reply to the email you provided.',
    JP: '内容を確認のうえ、ご記入のメールアドレスへご返信します。',
  },
  fail: {
    KO: '전송에 실패했어요. 잠시 후 다시 시도하거나 아래 메일로 보내주세요.',
    EN: 'Failed to send. Please try again shortly, or email us below.',
    JP: '送信に失敗しました。しばらくして再度お試しいただくか、下記メールへお送りください。',
  },
  mailFallback: {
    KO: '메일로 보내는 것이 편하다면',
    EN: 'Prefer email?',
    JP: 'メールの方が良い場合は',
  },
}

type Props = {
  /** input id·htmlFor 접두사 (ASCII) — jobType은 한글이라 id로 쓰지 않는다 */
  formId: string
  /** applications.job_type 에 저장될 값 — /admin 필터 기준 */
  jobType: string
  categories: InquiryCategory[]
  /** 선택된 문의 유형 id (부모가 소유 — 카드 클릭으로 프리셋 가능) */
  categoryId: string
  onCategoryChange: (id: string) => void
  /** 폴백 mailto 의 subject */
  mailSubject: string
}

export function InquiryForm({ formId, jobType, categories, categoryId, onCategoryChange, mailSubject }: Props) {
  const { lang } = useLang()
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const selected = categories.find((c) => c.id === categoryId) ?? categories[0]

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSending(true)

    // 구조화 직렬화 — /admin 상세(message 필드)에서 그대로 읽힘. 서버 1000자 제한 준수
    const structured = [
      `[${jobType}]`,
      // 유형 라벨은 KO 고정 — 운영자가 읽는 관리 화면 값이라 언어 혼재를 막는다
      `유형: ${selected.label.KO}`,
      org ? `소속: ${org}` : '',
      `내용: ${message}`,
    ]
      .filter(Boolean)
      .join('\n')
      .slice(0, 1000)

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, job_type: jobType, message: structured }),
      })
      if (!res.ok) throw new Error('submit failed')
      setDone(true)
    } catch {
      setError(T.fail[lang])
    } finally {
      setSending(false)
    }
  }

  const inputCls =
    'w-full min-w-0 bg-white border border-[#dbeafe] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#94a3b8] focus:outline-none focus:border-[#7dd3fc] focus:ring-2 focus:ring-sky-100 transition-all'
  const labelCls = 'block text-[#475569] text-xs font-bold mb-1.5'
  const idFor = (f: string) => `${formId}-${f}`

  if (done) {
    return (
      <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-brand-mid mx-auto mb-4" strokeWidth={ICON_STROKE} />
        <p className="text-[#111827] font-black text-lg mb-2">{T.doneT[lang]}</p>
        <p className="text-[#64748b] text-sm">{T.doneD[lang]}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor={idFor('category')} className={labelCls}>
          {T.category[lang]} *
        </label>
        <select
          id={idFor('category')}
          required
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={inputCls}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label[lang]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={idFor('name')} className={labelCls}>
            {T.name[lang]} *
          </label>
          <input id={idFor('name')} required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor={idFor('org')} className={labelCls}>
            {T.org[lang]}
          </label>
          <input id={idFor('org')} autoComplete="organization" value={org} onChange={(e) => setOrg(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor={idFor('email')} className={labelCls}>
            {T.email[lang]} *
          </label>
          <input id={idFor('email')} required type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor={idFor('phone')} className={labelCls}>
            {T.phone[lang]} *
          </label>
          <input id={idFor('phone')} required type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor={idFor('message')} className={labelCls}>
          {T.message[lang]} *
        </label>
        <textarea
          id={idFor('message')}
          required
          rows={5}
          maxLength={800}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={T.messagePh[lang]}
          className={inputCls}
        />
      </div>

      <ConsentCheckbox checked={consent} onChange={setConsent} />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={sending || !consent}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand-mid hover:bg-brand-light disabled:opacity-60 text-white font-bold text-[0.9375rem] px-6 py-4 rounded-2xl transition-all shadow-[0_6px_24px_rgba(2,132,199,0.35)]"
      >
        <Send className="w-4 h-4" strokeWidth={ICON_STROKE} />
        {sending ? T.sending[lang] : T.submit[lang]}
      </button>

      <p className="text-center text-[#94a3b8] text-xs">
        {T.mailFallback[lang]}{' '}
        <a
          href={`mailto:wakation.sf@gmail.com?subject=${encodeURIComponent(mailSubject)}`}
          className="font-semibold text-brand-mid underline"
        >
          wakation.sf@gmail.com
        </a>
      </p>
    </form>
  )
}
