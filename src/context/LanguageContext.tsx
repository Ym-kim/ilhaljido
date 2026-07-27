'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, t } from '@/lib/i18n'

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; tr: (key: string) => string }

const LangContext = createContext<LangCtx>({ lang: 'KO', setLang: () => {}, tr: (k) => k })

// 국가코드 → 기본 언어 (KR=한국어, JP=일본어, 그 외=영어)
function countryToLang(country: string): Lang {
  const c = country.trim().toUpperCase()
  if (c === 'KR') return 'KO'
  if (c === 'JP') return 'JP'
  return 'EN'
}

function readCookie(name: string): string | null {
  const hit = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))
  return hit ? decodeURIComponent(hit.split('=')[1] ?? '') : null
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('KO')

  useEffect(() => {
    // 1) 사용자가 직접 고른 언어가 있으면 항상 우선
    const saved = localStorage.getItem('wakation_lang') as Lang
    if (saved && ['KO', 'EN', 'JP'].includes(saved)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- i18n 코어: 저장 언어 복원은 mount 1회(정적 렌더 유지 설계) — 리팩터 금지
      setLangState(saved)
      return
    }
    // 2) 국가 IP 기반 자동 기본값 (미들웨어가 심은 wakation_geo 쿠키) — 저장은 하지 않음(명시 선택만 기록)
    const geo = readCookie('wakation_geo')
    if (geo) {
      setLangState(countryToLang(geo))
      return
    }
    // 3) 폴백: 브라우저 언어 (지오 쿠키가 없는 로컬/비-Vercel 환경). 일본어만 전환, 그 외 KO 유지
    const nav = (navigator.language || '').toLowerCase()
    if (nav.startsWith('ja')) setLangState('JP')
  }, [])

  useEffect(() => {
    const htmlLang = lang === 'KO' ? 'ko' : lang === 'EN' ? 'en' : 'ja'
    document.documentElement.lang = htmlLang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('wakation_lang', l)
    document.cookie = `wakation_lang=${l};path=/;max-age=31536000;SameSite=Lax`
  }

  const tr = (key: string) => t[lang][key] ?? t['KO'][key] ?? key

  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
