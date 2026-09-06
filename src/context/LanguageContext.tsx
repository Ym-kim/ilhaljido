'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Lang, t } from '@/lib/i18n'

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; tr: (key: string) => string }

const LangContext = createContext<LangCtx>({ lang: 'KO', setLang: () => {}, tr: (k) => k })

// ─────────────────────────────────────────────────────────────────────────────
// URL 로케일을 렌더 시점에 판정한다 (2026-08-07)
//
// 문제였던 것: 초기값이 무조건 'KO'라서, /en·/ja의 **SSG 첫 HTML에서 루트 셸
// (Navbar·Footer)이 한국어로 렌더**됐다. 이 둘은 루트 layout에 있어 /en·/ja 페이지가
// 감싸는 중첩 LanguageProvider(forceLang) 바깥이기 때문. 하이드레이션 후에야 교정돼
// ①첫 페인트에 한국어가 보이고 ②JS 이전 크롤러·미리보기에는 한국어 셸이 노출됐다.
//
// 해결: 같은 루트 layout의 LocaleDocument가 이미 쓰는 방식(usePathname)을 그대로 적용.
// usePathname은 SSG 프리렌더에서 각 라우트의 경로를 반환하므로 정적 렌더가 유지되고,
// 서버·클라이언트가 같은 값을 계산하니 하이드레이션 불일치도 없다.
// ⚠️ headers() 기반 판정은 루트 layout을 dynamic으로 만들어 전 라우트 SSG를 깨므로 금지.
// ─────────────────────────────────────────────────────────────────────────────
function urlLang(pathname: string): Lang | null {
  if (pathname === '/ja' || pathname.startsWith('/ja/')) return 'JP'
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'EN'
  return null
}

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
  const pathname = usePathname()
  const routeLang = urlLang(pathname)
  const routeIsChinese = pathname === '/zh' || pathname.startsWith('/zh/')
  // 정적 로케일 URL(/en·/ja)은 저장된 사용자 선호보다 우선하고, **서버 렌더에서도 적용**된다
  const [lang, setLangState] = useState<Lang>(forceLang ?? routeLang ?? 'KO')

  useEffect(() => {
    if (forceLang) return

    // 로케일 URL은 서버·클라이언트가 같은 값을 계산하므로 초기값과 동일 —
    // 클라이언트 내비게이션으로 /en↔/ 을 오갈 때 동기화하는 역할만 한다.
    if (routeLang) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 라우트 전환 시 URL 로케일 동기화(의도 패턴)
      setLangState(routeLang)
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
  }, [forceLang, routeLang])

  useEffect(() => {
    // 로케일 URL이 항상 이긴다 — 부모 provider가 중첩 라우트의 문서 언어를 덮지 않도록.
    // (KO 라우트에서 언어 스위처를 쓴 경우는 pathname이 그대로라 lang이 반영된다)
    const htmlLang = routeIsChinese
      ? 'zh-CN'
      : routeLang === 'JP'
      ? 'ja'
      : routeLang === 'EN'
        ? 'en'
        : lang === 'KO'
          ? 'ko'
          : lang === 'EN'
            ? 'en'
            : 'ja'
    document.documentElement.lang = htmlLang
  }, [lang, routeIsChinese, routeLang])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('wakation_lang', l)
    document.cookie = `wakation_lang=${l};path=/;max-age=31536000;SameSite=Lax`
  }

  const tr = (key: string) => t[lang][key] ?? t.KO[key] ?? key

  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
