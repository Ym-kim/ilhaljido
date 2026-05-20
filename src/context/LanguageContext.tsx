'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, t } from '@/lib/i18n'

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; tr: (key: string) => string }

const LangContext = createContext<LangCtx>({ lang: 'KO', setLang: () => {}, tr: (k) => k })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('KO')

  useEffect(() => {
    const saved = localStorage.getItem('wakation_lang') as Lang
    if (saved && ['KO', 'EN', 'JP'].includes(saved)) setLangState(saved)
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
