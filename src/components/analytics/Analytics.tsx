'use client'

import Script from 'next/script'
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

type L = Record<Lang, string>
const COPY: Record<string, L> = {
  msg: {
    KO: '서비스 개선을 위해 방문 통계(Google Analytics) 쿠키를 사용합니다. 동의하시겠어요?',
    EN: 'We use analytics cookies (Google Analytics) to improve the service. Is that okay?',
    JP: 'サービス改善のため訪問統計（Google Analytics）Cookieを使用します。よろしいですか？',
  },
  accept: { KO: '동의', EN: 'Accept', JP: '同意する' },
  decline: { KO: '거부', EN: 'Decline', JP: '拒否' },
  privacy: { KO: '개인정보처리방침', EN: 'Privacy Policy', JP: 'プライバシーポリシー' },
}

export function Analytics() {
  const { lang } = useLang()
  const [consent, setConsent] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
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
        <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 pointer-events-none">
          <div className="max-w-3xl mx-auto pointer-events-auto bg-[#0f2231] text-white border border-white/12 rounded-2xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm text-white/85 flex-1 leading-relaxed">
              {COPY.msg[lang]}{' '}
              <a href="/privacy" className="underline text-sky-300 hover:text-sky-200 whitespace-nowrap">
                {COPY.privacy[lang]}
              </a>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => decide('denied')}
                className="text-xs font-bold px-4 py-2 rounded-full border border-white/20 text-white/80 hover:bg-white/8 transition-colors"
              >
                {COPY.decline[lang]}
              </button>
              <button
                onClick={() => decide('granted')}
                className="text-xs font-bold px-5 py-2 rounded-full bg-brand-mid text-white hover:bg-brand-light transition-colors"
              >
                {COPY.accept[lang]}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
