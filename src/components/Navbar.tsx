'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Mountain, Menu, X } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n'

const NAV_LINKS = [
  { key: 'nav_about',      href: '/about' },
  { key: 'nav_stay',       href: '/stay' },
  { key: 'nav_activities', href: '/activities' },
  { key: 'nav_workspace',  href: '/workspace' },
  { key: 'nav_growth',     href: '/growth' },
  { key: 'nav_cruise',     href: '/cruise' },
  { key: 'nav_language',   href: '/language' },
]

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { lang, setLang, tr } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isDark = transparent && !scrolled
  const bg = isDark ? 'bg-transparent' : 'bg-white shadow-sm'
  const textColor = isDark ? 'text-white' : 'text-gray-800'
  const menuColor = isDark ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-teal-600'

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* 로고 */}
        <Link href="/" className={`flex items-center gap-2 ${textColor} font-black text-base`}>
          <Mountain className="w-5 h-5 text-teal-500" />
          Wakation
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(n => (
            <li key={n.key}>
              <Link href={n.href} className={`text-xs font-semibold transition-colors ${menuColor}`}>
                {tr(n.key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* 우측 */}
        <div className="hidden lg:flex items-center gap-3">
          {/* 언어 전환 — 실제 작동 */}
          <div className={`flex items-center gap-1 text-xs font-bold rounded-full border ${isDark ? 'border-white/20' : 'border-gray-200'} p-0.5`}>
            {(['KO','EN','JP'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === l
                    ? 'bg-teal-500 text-white shadow-sm'
                    : isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <Link href="#" className={`text-xs font-medium ${menuColor}`}>{tr('nav_login')}</Link>

          <Link href="/about"
            className="bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-teal-400 transition-colors">
            {tr('nav_cta')}
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button onClick={() => setOpen(!open)} className={`lg:hidden ${textColor}`}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-3">
          {NAV_LINKS.map(n => (
            <Link key={n.key} href={n.href} onClick={() => setOpen(false)}
              className="block text-gray-700 text-sm font-medium py-2 border-b border-gray-50">
              {tr(n.key)}
            </Link>
          ))}
          <div className="flex gap-2 pt-3">
            {(['KO','EN','JP'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                  lang === l ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                {l}
              </button>
            ))}
          </div>
          <Link href="/about" className="block mt-2 bg-teal-500 text-white text-center font-bold py-3 rounded-full text-sm">
            {tr('nav_cta')}
          </Link>
        </div>
      )}
    </nav>
  )
}
