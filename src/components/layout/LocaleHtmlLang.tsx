'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/context/LanguageContext'

export function LocaleHtmlLang() {
  const pathname = usePathname()
  const { lang } = useLang()

  useLayoutEffect(() => {
    const htmlLang = pathname === '/ja' || pathname.startsWith('/ja/')
      ? 'ja'
      : pathname === '/en' || pathname.startsWith('/en/')
        ? 'en'
        : lang === 'JP'
          ? 'ja'
          : lang === 'EN'
            ? 'en'
            : 'ko'
    document.documentElement.lang = htmlLang
  }, [lang, pathname])

  return null
}
