'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, ChevronDown, Mail } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'
import { KAKAO_CHANNEL_URL } from '@/lib/publicConfig'
import { trackEvent } from '@/lib/track'
import { cn } from '@/lib/utils'

type L = Record<Lang, string>

const T: Record<string, L> = {
  kakao: { KO: '카카오톡으로 소식 받기', EN: 'Get updates on KakaoTalk', JP: 'カカオトークでお知らせを受け取る' },
  kakaoHint: { KO: '공식 채널 · 새 창에서 열림', EN: 'Official channel · opens in a new tab', JP: '公式チャンネル · 新しいタブで開きます' },
  interest: { KO: '30초 관심 등록', EN: 'Register interest in 30 seconds', JP: '30秒で興味を登録' },
  formHint: {
    KO: '카카오톡을 사용하지 않는다면 이메일 한 가지만 남겨주세요.',
    EN: 'Prefer email? Leave just one address.',
    JP: 'メールをご希望の場合は、アドレスだけを入力してください。',
  },
  placeholder: { KO: '이메일 주소', EN: 'Email address', JP: 'メールアドレス' },
  cta: { KO: '관심 등록하기', EN: 'Register interest', JP: '興味を登録する' },
  sending: { KO: '등록 중…', EN: 'Registering…', JP: '登録中…' },
  done: {
    KO: '관심 등록이 완료됐어요. 일정이 열리면 이메일로 알려드릴게요.',
    EN: "You're registered. We'll email you when dates open.",
    JP: '興味登録が完了しました。日程が決まり次第、メールでお知らせします。',
  },
  fail: {
    KO: '저장하지 못했어요. 입력값은 그대로 두었으니 잠시 후 다시 시도해주세요.',
    EN: "We couldn't save it. Your email is still here—please try again shortly.",
    JP: '保存できませんでした。入力内容は保持されています。しばらくしてから再度お試しください。',
  },
  consent: {
    KO: '모집 소식 안내를 위한 이메일 수집·이용에 동의합니다.',
    EN: 'I agree to the collection and use of my email for program updates.',
    JP: '募集案内のためのメールアドレスの収集・利用に同意します。',
  },
  consentRequired: {
    KO: '개인정보 수집·이용 동의가 필요합니다.',
    EN: 'Please agree to the collection and use of your email.',
    JP: 'メールアドレスの収集・利用への同意が必要です。',
  },
  privacy: {
    KO: '이메일은 선택한 모집 소식 안내에만 사용하며 언제든 수신을 거부할 수 있습니다.',
    EN: 'We use your email only for the selected program updates. Unsubscribe anytime.',
    JP: 'メールは選択した募集案内にのみ使用し、いつでも配信停止できます。',
  },
  policy: { KO: '개인정보처리방침', EN: 'Privacy Policy', JP: 'プライバシーポリシー' },
}

type NotifySignupProps = {
  source?: string
  event?: string
  tone?: 'dark' | 'light'
  ctaLabel?: Record<Lang, string>
  lang?: Lang
}

export function NotifySignup({
  source = '홈 라인업 관심 등록',
  event = 'program_alert_submitted',
  tone = 'dark',
  ctaLabel,
  lang: langProp,
}: NotifySignupProps = {}) {
  const { lang: ctxLang } = useLang()
  const lang = langProp ?? ctxLang
  const formId = useId()
  const errorId = `${formId}-error`
  const [formOpen, setFormOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [consented, setConsented] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error' | 'consent-error'>('idle')
  const light = tone === 'light'

  const analytics = {
    locale: lang,
    source,
    placement: 'hosted_interest',
    contact_method: 'email',
  }

  function toggleForm() {
    const next = !formOpen
    setFormOpen(next)
    if (next) trackEvent('interest_form_open', analytics)
  }

  async function submit(eventObject: React.FormEvent) {
    eventObject.preventDefault()
    if (state === 'sending') return
    if (!consented) {
      setState('consent-error')
      return
    }
    if (!email.trim()) return

    setState('sending')
    trackEvent('interest_form_submit', analytics)
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '관심 등록',
          phone: '-',
          email: email.trim(),
          job_type: '오픈 알림 신청',
          message: `[리드] ${source} (${lang})`,
        }),
      })
      if (!response.ok) throw new Error('failed')
      setState('done')
      trackEvent('interest_form_success', analytics)
      if (event !== 'interest_form_success') trackEvent(event, { locale: lang, source })
    } catch {
      setState('error')
      trackEvent('interest_form_error', analytics)
    }
  }

  return (
    <div className="min-w-0">
      <div className="grid min-w-0 gap-2.5 sm:grid-cols-2">
        <a
          href={KAKAO_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('kakao_channel_click', {
            locale: lang,
            source,
            placement: 'hosted_interest',
            contact_method: 'kakao',
          })}
          className="inline-flex min-h-12 min-w-0 items-center justify-between gap-3 rounded-2xl bg-[#fee500] px-5 py-3 text-sm font-black text-[#17130b] transition hover:bg-[#f4da00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fee500]"
        >
          <span className="min-w-0">
            <span className="block break-keep">{T.kakao[lang]}</span>
            <span className="mt-0.5 block text-[0.65rem] font-semibold text-[#554d1c]">{T.kakaoHint[lang]}</span>
          </span>
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={ICON_STROKE} />
        </a>

        <button
          type="button"
          aria-expanded={formOpen}
          aria-controls={formId}
          onClick={toggleForm}
          className={cn(
            'inline-flex min-h-12 min-w-0 items-center justify-between gap-3 rounded-2xl border px-5 py-3 text-left text-sm font-black transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
            light
              ? 'border-[#cbdde4] bg-white text-[#183747] hover:border-[#85b5c6]'
              : 'border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.1]',
          )}
        >
          <span>{T.interest[lang]}</span>
          <ChevronDown aria-hidden="true" className={cn('h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none', formOpen && 'rotate-180')} strokeWidth={ICON_STROKE} />
        </button>
      </div>

      <div
        id={formId}
        aria-hidden={!formOpen}
        inert={formOpen ? undefined : true}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none',
          formOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          {state === 'done' ? (
            <div className={cn('mt-3 flex items-start gap-2.5 rounded-2xl border px-5 py-4', light ? 'border-sky-200 bg-sky-50' : 'border-sky-400/25 bg-sky-400/10')}>
              <CheckCircle2 aria-hidden="true" className={cn('mt-0.5 h-5 w-5 shrink-0', light ? 'text-[#08719b]' : 'text-sky-300')} strokeWidth={ICON_STROKE} />
              <span className={cn('text-sm font-semibold leading-6', light ? 'text-[#036485]' : 'text-sky-100')}>{T.done[lang]}</span>
            </div>
          ) : (
            <form onSubmit={submit} className={cn('mt-3 rounded-2xl border p-4', light ? 'border-[#dce8ec] bg-[#f7fafb]' : 'border-white/12 bg-white/[0.035]')}>
              <span className={cn('mb-3 block text-xs leading-5', light ? 'text-[#617680]' : 'text-white/60')}>{T.formHint[lang]}</span>
              <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">{T.placeholder[lang]}</span>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
                    placeholder={T.placeholder[lang]}
                    aria-describedby={state === 'error' ? errorId : undefined}
                    className={cn(
                      'min-h-12 min-w-0 w-full rounded-xl border px-4 text-sm outline-none transition-colors',
                      light
                        ? 'border-[#cfdee3] bg-white text-[#14202b] placeholder:text-[#8b9aa1] focus:border-[#1685aa]'
                        : 'border-white/15 bg-white/[0.06] text-white placeholder:text-white/40 focus:border-sky-400/60',
                    )}
                  />
                </label>
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 text-sm font-black text-white transition hover:bg-sky-400 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={ICON_STROKE} />
                  {state === 'sending' ? T.sending[lang] : (ctaLabel?.[lang] ?? T.cta[lang])}
                </button>
              </div>

              <label className={cn('mt-3 flex cursor-pointer items-start gap-2.5 text-[0.72rem] leading-5', light ? 'text-[#526871]' : 'text-white/60')}>
                <input
                  type="checkbox"
                  checked={consented}
                  onChange={(e) => { setConsented(e.target.checked); if (e.target.checked && state === 'consent-error') setState('idle') }}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-sky-600"
                />
                <span>{T.consent[lang]}</span>
              </label>

              {(state === 'error' || state === 'consent-error') && (
                <span id={errorId} role="alert" className={cn('mt-2 block text-xs font-semibold', light ? 'text-rose-700' : 'text-rose-300')}>
                  {state === 'consent-error' ? T.consentRequired[lang] : T.fail[lang]}
                </span>
              )}

              <span className={cn('mt-3 block text-[0.68rem] leading-5', light ? 'text-[#7c8d94]' : 'text-white/40')}>
                {T.privacy[lang]}{' '}
                <Link href="/privacy" target="_blank" rel="noopener noreferrer" className={cn('underline underline-offset-2', light ? 'text-[#536b75] hover:text-[#14202b]' : 'text-white/60 hover:text-white/85')}>
                  {T.policy[lang]}
                </Link>
              </span>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
