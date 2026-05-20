'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Mountain, Menu, X, ChevronDown } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n'

const GLOBAL_CHILDREN = [
  { href: '/cruise',   label: '크루즈 워케이션' },
  { href: '/language', label: '어학연수 워케이션' },
]

const CONTACT_CHILDREN = [
  { href: 'mailto:hello@wakation.kr', label: '제휴 문의' },
  { href: 'mailto:hello@wakation.kr', label: '단체 문의' },
  { href: 'mailto:hello@wakation.kr', label: '파트너십 문의' },
]

const SIMPLE_LINKS = [
  { key: 'nav_about',      href: '/about' },
  { key: 'nav_stay',       href: '/stay' },
  { key: 'nav_workspace',  href: '/workspace' },
  { key: 'nav_activities', href: '/activities' },
  { key: 'nav_growth',     href: '/growth' },
]

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { lang, setLang, tr } = useLang()
  const [scrolled, setScrolled]           = useState(false)
  const [open, setOpen]                   = useState(false)
  const [mobileGlobal, setMobileGlobal]   = useState(false)
  const [mobileContact, setMobileContact] = useState(false)

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
  const dropdownPanel = `absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50
    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150`

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isTransparentNow ? 'bg-black/40 backdrop-blur-sm' : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link href="/" className={`flex items-center gap-2 font-black text-base transition-colors shrink-0 ${
          isTransparentNow ? 'text-white' : 'text-gray-900'
        }`}>
          <Mountain className="w-5 h-5 text-teal-500" />
          Wakation
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden lg:flex items-center gap-5">
          {SIMPLE_LINKS.map(n => (
            <li key={n.key}>
              <Link href={n.href} className={linkCls}>{tr(n.key)}</Link>
            </li>
          ))}

          {/* 글로벌 드롭다운 */}
          <li className="group relative">
            <button className={`flex items-center gap-0.5 ${linkCls}`}>
              {tr('nav_global')} <ChevronDown className="w-3 h-3" />
            </button>
            <div className={dropdownPanel}>
              {GLOBAL_CHILDREN.map(c => (
                <Link key={c.href} href={c.href}
                  className="block px-4 py-2 text-xs font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors">
                  {c.label}
                </Link>
              ))}
            </div>
          </li>

          {/* 문의 드롭다운 */}
          <li className="group relative">
            <button className={`flex items-center gap-0.5 ${linkCls}`}>
              {tr('nav_contact')} <ChevronDown className="w-3 h-3" />
            </button>
            <div className={dropdownPanel}>
              {CONTACT_CHILDREN.map(c => (
                <a key={c.label} href={c.href}
                  className="block px-4 py-2 text-xs font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors">
                  {c.label}
                </a>
              ))}
            </div>
          </li>
        </ul>

        {/* 우측 */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className={`flex items-center gap-0.5 text-xs font-bold rounded-full border p-0.5 ${
            isTransparentNow ? 'border-white/30' : 'border-gray-200'
          }`}>
            {(['KO','EN','JP'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === l ? 'bg-teal-500 text-white shadow-sm'
                    : isTransparentNow ? 'text-white/70 hover:text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}>
                {l}
              </button>
            ))}
          </div>
          <Link href="/about"
            className="bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-teal-400 transition-colors">
            {tr('nav_cta')}
          </Link>
        </div>

        <button onClick={() => setOpen(!open)}
          className={`lg:hidden ${isTransparentNow ? 'text-white' : 'text-gray-800'}`}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-1">
          {SIMPLE_LINKS.map(n => (
            <Link key={n.key} href={n.href} onClick={() => setOpen(false)}
              className="block text-gray-700 text-sm font-medium py-2.5 border-b border-gray-50 hover:text-teal-600 transition-colors">
              {tr(n.key)}
            </Link>
          ))}

          <div>
            <button onClick={() => setMobileGlobal(!mobileGlobal)}
              className="w-full flex justify-between items-center text-gray-700 text-sm font-medium py-2.5 border-b border-gray-50">
              {tr('nav_global')} <ChevronDown className={`w-4 h-4 transition-transform ${mobileGlobal ? 'rotate-180' : ''}`} />
            </button>
            {mobileGlobal && (
              <div className="pl-4 pb-2 space-y-1">
                {GLOBAL_CHILDREN.map(c => (
                  <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                    className="block text-gray-500 text-sm py-1.5 hover:text-teal-600 transition-colors">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <button onClick={() => setMobileContact(!mobileContact)}
              className="w-full flex justify-between items-center text-gray-700 text-sm font-medium py-2.5 border-b border-gray-50">
              {tr('nav_contact')} <ChevronDown className={`w-4 h-4 transition-transform ${mobileContact ? 'rotate-180' : ''}`} />
            </button>
            {mobileContact && (
              <div className="pl-4 pb-2 space-y-1">
                {CONTACT_CHILDREN.map(c => (
                  <a key={c.label} href={c.href} onClick={() => setOpen(false)}
                    className="block text-gray-500 text-sm py-1.5 hover:text-teal-600 transition-colors">
                    {c.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            {(['KO','EN','JP'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  lang === l ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {l}
              </button>
            ))}
          </div>
          <Link href="/about" onClick={() => setOpen(false)}
            className="block mt-3 bg-teal-500 text-white text-center font-bold py-3 rounded-full text-sm hover:bg-teal-400 transition-colors">
            {tr('nav_cta')}
          </Link>
        </div>
      )}
    </nav>
  )
}
