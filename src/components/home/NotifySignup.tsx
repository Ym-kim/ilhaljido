'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, CheckCircle2 } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 오픈 알림 이메일 수집 — 재방문 자산 (미전환 트래픽 → 소유 오디언스)
// 저장: 기존 /api/applications 재활용 (job_type='오픈 알림 신청') — 신규 테이블 0
// admin 대시보드에서 job_type 필터로 리드 목록 확인 가능
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>
const T: Record<string, L> = {
  placeholder: { KO: '이메일 주소', EN: 'Email address', JP: 'メールアドレス' },
  cta: { KO: '오픈 알림 받기', EN: 'Notify me', JP: '通知を受け取る' },
  sending: { KO: '등록 중…', EN: 'Signing up…', JP: '登録中…' },
  done: {
    KO: '등록 완료! 다음 회차가 열리면 가장 먼저 알려드릴게요.',
    EN: "You're on the list! We'll email you the moment it opens.",
    JP: '登録完了！次回オープン時に最初にお知らせします。',
  },
  fail: { KO: '등록에 실패했어요. 잠시 후 다시 시도해주세요.', EN: 'Failed — please try again shortly.', JP: '登録に失敗しました。しばらくして再度お試しください。' },
  privacy: {
    KO: '이메일은 오픈 알림 목적으로만 사용되며, 언제든 수신 거부할 수 있습니다.',
    EN: 'Your email is used only for launch notifications. Unsubscribe anytime.',
    JP: 'メールはオープン通知のみに使用され、いつでも配信停止できます。',
  },
  policy: { KO: '개인정보처리방침', EN: 'Privacy Policy', JP: 'プライバシーポリシー' },
}

type NotifySignupProps = {
  /** 리드 출처 태그 — admin에서 message로 구분 (기본: 홈 라인업) */
  source?: string
  /** 제출 성공 시 Vercel Analytics 이벤트명 (기본: program_alert_submitted) */
  event?: string
  /** 밝은 배경 섹션용 스타일 */
  tone?: 'dark' | 'light'
  /** CTA 라벨 오버라이드 (3언어) */
  ctaLabel?: Record<Lang, string>
}

export function NotifySignup({ source = '홈 라인업 오픈 알림 신청', event = 'program_alert_submitted', tone = 'dark', ctaLabel }: NotifySignupProps = {}) {
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const light = tone === 'light'

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setState('sending')
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '오픈 알림',
          phone: '-',
          email: email.trim(),
          job_type: '오픈 알림 신청',
          message: `[리드] ${source} (${lang})`,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setState('done')
      try {
        track(event, { source })
      } catch {
        // 계측 실패 무시
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className={`flex items-center gap-2.5 rounded-2xl px-5 py-4 ${light ? 'bg-sky-50 border border-sky-200' : 'bg-sky-400/10 border border-sky-400/25'}`}>
        <CheckCircle2 className={`w-5 h-5 shrink-0 ${light ? 'text-brand-mid' : 'text-sky-300'}`} strokeWidth={ICON_STROKE} />
        <p className={`text-sm font-semibold ${light ? 'text-[#0369a1]' : 'text-sky-200'}`}>{T.done[lang]}</p>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={T.placeholder[lang]}
          className={`flex-1 rounded-2xl px-5 py-3.5 text-sm focus:outline-none transition-colors ${
            light
              ? 'bg-white border border-[#dbeafe] text-[#111827] placeholder-[#94a3b8] focus:border-brand-mid'
              : 'bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-sky-400/60'
          }`}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all"
        >
          <Bell className="w-4 h-4" strokeWidth={ICON_STROKE} />
          {state === 'sending' ? T.sending[lang] : (ctaLabel?.[lang] ?? T.cta[lang])}
        </button>
      </form>
      {state === 'error' && <p className="text-red-400 text-xs mt-2">{T.fail[lang]}</p>}
      <p className={`text-[0.6875rem] mt-2.5 ${light ? 'text-[#94a3b8]' : 'text-white/40'}`}>
        {T.privacy[lang]}{' '}
        <Link href="/privacy" target="_blank" className={`underline ${light ? 'text-[#64748b] hover:text-[#111827]' : 'text-white/55 hover:text-white/80'}`}>
          {T.policy[lang]}
        </Link>
      </p>
    </div>
  )
}
