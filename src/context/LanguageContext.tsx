'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Lang, t } from '@/lib/i18n'

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; tr: (key: string) => string }

const LangContext = createContext<LangCtx>({ lang: 'KO', setLang: () => {}, tr: (k) => k })

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

export function LanguageProvider({ children, forceLang }: { children: ReactNode; forceLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(forceLang ?? 'KO')

  useEffect(() => {
    if (forceLang) return

    // 정적 로케일 URL은 저장된 사용자 선호보다 우선한다.
    if (window.location.pathname === '/ja' || window.location.pathname.startsWith('/ja/')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- URL 로케일을 mount 시 한 번 복원한다.
      setLangState('JP')
      return
    }
    if (window.location.pathname === '/en' || window.location.pathname.startsWith('/en/')) {
      setLangState('EN')
      return
    }

    // 사용자가 직접 선택한 언어가 있으면 항상 우선한다.
    const saved = localStorage.getItem('wakation_lang') as Lang
    if (saved && ['KO', 'EN', 'JP'].includes(saved)) {
      setLangState(saved)
      return
    }

    // 명시 선택이 없을 때만 국가 쿠키와 브라우저 언어를 참고한다.
    const geo = readCookie('wakation_geo')
    if (geo) {
      setLangState(countryToLang(geo))
      return
    }
    const nav = (navigator.language || '').toLowerCase()
    if (nav.startsWith('ja')) setLangState('JP')
  }, [forceLang])

  useEffect(() => {
    const htmlLang = lang === 'KO' ? 'ko' : lang === 'EN' ? 'en' : 'ja'
    document.documentElement.lang = htmlLang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('wakation_lang', l)
    document.cookie = `wakation_lang=${l};path=/;max-age=31536000;SameSite=Lax`
  }

  const tr = (key: string) => t[lang][key] ?? t.KO[key] ?? key

  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
