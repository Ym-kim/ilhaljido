'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Mountain, Menu, X, ChevronDown } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n'

const PROGRAMS_CHILDREN = [
  { href: '/programs/domestic', label: '국내 워케이션' },
  { href: '/programs/global',   label: '글로벌 워케이션' },
  { href: '/programs/market',   label: '시장조사단·박람회' },
  { href: '/language',          label: '어학·유학' },
  { href: '/cruise',            label: '크루즈 워케이션' },
]

const SIMPLE_LINKS: { key: string; href: string }[] = [
  { key: 'nav_about',          href: '/about' },
  { key: 'nav_growth',         href: '/growth' },
  { key: 'nav_infrastructure', href: '/infrastructure' },
  { key: 'nav_visa',           href: '/visa-ai' },
  { key: 'nav_partnership',    href: '/partnership' },
  { key: 'nav_contact',        href: '/contact' },
]

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { lang, setLang, tr } = useLang()
  const [scrolled, setScrolled]             = useState(false)
  const [open, setOpen]                     = useState(false)
  const [mobilePrograms, setMobilePrograms] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    fn()
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isTransparentNow = transparent && !scrolled

  const linkCls = `text-xs font-semibold transition-colors hover:text-teal-500 ${
    isTransparentNow ? 'text-white/90' : 'text-gray-700'
  }`

  const dropdownPanel = `absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50
    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150`

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isTransparentNow ? 'bg-black/40 backdrop-blur-sm' : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className={`flex items-center gap-2 font-black text-base transition-colors shrink-0 ${
          isTransparentNow ? 'text-white' : 'text-gray-900'
        }`}>
          <Mountain className="w-5 h-5 text-teal-500" />
          Wakation
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden lg:flex items-center gap-5">
          {/* 소개 */}
          <li>
            <Link href="/about" className={linkCls}>{tr('nav_about')}</Link>
          </li>

          {/* 프로그램 드롭다운 */}
          <li className="group relative">
            <button className={`flex items-center gap-0.5 ${linkCls}`}>
              {tr('nav_programs')} <ChevronDown className="w-3 h-3" />
            </button>
            <div className={dropdownPanel}>
              {PROGRAMS_CHILDREN.map(c => (
                <Link key={c.href} href={c.href}
                  className="block px-4 py-2 text-xs font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors">
                  {c.label}
                </Link>
              ))}
            </div>
          </li>

          {/* 나머지 심플 링크 */}
          {SIMPLE_LINKS.filter(n => n.key !== 'nav_about').map(n => (
            <li key={n.key}>
              <Link href={n.href} className={linkCls}>{tr(n.key)}</Link>
            </li>
          ))}
        </ul>

        {/* 우측: 언어 + CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className={`flex items-center gap-0.5 text-xs font-bold rounded-full border p-0.5 ${
            isTransparentNow ? 'border-white/30' : 'border-gray-200'
          }`}>
            {(['KO', 'EN', 'JP'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === l
                    ? 'bg-teal-500 text-white shadow-sm'
                    : isTransparentNow
                      ? 'text-white/70 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                }`}>
                {l}
              </button>
            ))}
          </div>
          <Link href="/programs"
            className="bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-teal-400 transition-colors">
            {tr('nav_cta')}
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button onClick={() => setOpen(!open)}
          className={`lg:hidden ${isTransparentNow ? 'text-white' : 'text-gray-800'}`}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-1">
          <Link href="/about" onClick={() => setOpen(false)}
            className="block text-gray-700 text-sm font-medium py-2.5 border-b border-gray-50 hover:text-teal-600 transition-colors">
            {tr('nav_about')}
          </Link>

          {/* 프로그램 아코디언 */}
          <div>
            <button onClick={() => setMobilePrograms(!mobilePrograms)}
              className="w-full flex justify-between items-center text-gray-700 text-sm font-medium py-2.5 border-b border-gray-50">
              {tr('nav_programs')}
              <ChevronDown className={`w-4 h-4 transition-transform ${mobilePrograms ? 'rotate-180' : ''}`} />
            </button>
            {mobilePrograms && (
              <div className="pl-4 pb-2 space-y-1">
                {PROGRAMS_CHILDREN.map(c => (
                  <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                    className="block text-gray-500 text-sm py-1.5 hover:text-teal-600 transition-colors">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {SIMPLE_LINKS.filter(n => n.key !== 'nav_about').map(n => (
            <Link key={n.key} href={n.href} onClick={() => setOpen(false)}
              className="block text-gray-700 text-sm font-medium py-2.5 border-b border-gray-50 hover:text-teal-600 transition-colors">
              {tr(n.key)}
            </Link>
          ))}

          <div className="flex gap-2 pt-4">
            {(['KO', 'EN', 'JP'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  lang === l ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {l}
              </button>
            ))}
          </div>
          <Link href="/programs" onClick={() => setOpen(false)}
            className="block mt-3 bg-teal-500 text-white text-center font-bold py-3 rounded-full text-sm hover:bg-teal-400 transition-colors">
            {tr('nav_cta')}
          </Link>
        </div>
      )}
    </nav>
  )
}
