'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// GA4 + 쿠키 동의 배너 (#GA / IGAworks)
//
// NEXT_PUBLIC_GA_ID(예: G-XXXXXXX)가 설정된 경우에만 작동한다.
//  - 미설정: 아무것도 렌더 안 함 → 현재 무쿠키 정책 유지(배너·GA 없음)
//  - 설정 + 동의 전: 하단 동의 배너 노출 (GA 로드 안 함)
//  - 동의(허용): GA4 스크립트 로드. 거부: 로드 안 함(선택 저장)
//
// IGAworks(adbrix)는 모바일 앱 어트리뷰션이라 앱(웹뷰) 출시 단계에서 추가.
// ─────────────────────────────────────────────────────────────────────────────

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const CONSENT_KEY = 'wakation_consent' // 'granted' | 'denied'

type AnalyticsLocale = Lang | 'ZH'
type L = Record<AnalyticsLocale, string>
const COPY: Record<string, L> = {
  msg: {
    KO: '서비스 개선을 위해 분석 쿠키를 사용합니다.',
    EN: 'We use analytics cookies to improve Wakation.',
    JP: 'サービス改善のため分析Cookieを使用します。',
    ZH: '我们使用分析 Cookie 来改进 Wakation。',
  },
  accept: { KO: '동의', EN: 'Accept', JP: '同意する', ZH: '同意' },
  decline: { KO: '거부', EN: 'Decline', JP: '拒否', ZH: '拒绝' },
  privacy: { KO: '개인정보처리방침', EN: 'Privacy Policy', JP: 'プライバシーポリシー', ZH: '隐私政策' },
}

export function Analytics() {
  const { lang } = useLang()
  const pathname = usePathname()
  const displayLang: AnalyticsLocale = pathname === '/zh' || pathname.startsWith('/zh/') ? 'ZH' : lang
  const [consent, setConsent] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 동의 상태는 localStorage에서 mount 후 1회 복원(SSR 불일치 방지)
    setConsent(localStorage.getItem(CONSENT_KEY))
    setReady(true)
  }, [])

  // 측정 ID 없으면 완전 비활성 (배너·GA 없음)
  if (!GA_ID) return null

  const decide = (value: 'granted' | 'denied') => {
    localStorage.setItem(CONSENT_KEY, value)
    setConsent(value)
  }

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-4 sm:pb-4 pointer-events-none">
          <div
            role="region"
            aria-label={COPY.msg[displayLang]}
            className="max-w-2xl mx-auto pointer-events-auto bg-[#0b1d2b]/95 text-white border border-white/12 rounded-2xl shadow-[0_18px_60px_rgba(2,12,22,0.45)] px-4 py-3 flex min-w-0 flex-col items-stretch gap-3 backdrop-blur-xl sm:flex-row sm:items-center"
          >
            <p className="min-w-0 text-[0.75rem] sm:text-sm text-white/82 flex-1 leading-relaxed">
              {COPY.msg[displayLang]}{' '}
              <a href="/privacy" className="underline underline-offset-2 text-sky-300 hover:text-sky-200 whitespace-nowrap">
                {COPY.privacy[displayLang]}
              </a>
            </p>
            <div className="flex shrink-0 justify-end gap-1.5">
              <button
                onClick={() => decide('denied')}
                className="min-h-10 text-xs font-bold px-3 rounded-full border border-white/20 text-white/80 hover:bg-white/8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                {COPY.decline[displayLang]}
              </button>
              <button
                onClick={() => decide('granted')}
                className="min-h-10 text-xs font-bold px-3.5 sm:px-4 rounded-full bg-brand-mid text-white hover:bg-brand-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                {COPY.accept[displayLang]}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
