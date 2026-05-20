'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const PROGRAMS_CHILDREN = [
  { href: '/programs/domestic', label: '국내 워케이션' },
  { href: '/programs/global', label: '글로벌 워케이션' },
  { href: '/programs/market', label: '시장조사단·박람회' },
  { href: '/language', label: '어학·유학' },
  { href: '/cruise', label: '크루즈 워케이션' },
]

const SIMPLE_LINKS: { key: string; href: string }[] = [
  { key: 'nav_about', href: '/about' },
  { key: 'nav_growth', href: '/growth' },
  { key: 'nav_infrastructure', href: '/infrastructure' },
  { key: 'nav_visa', href: '/visa-ai' },
  { key: 'nav_partnership', href: '/partnership' },
  { key: 'nav_contact', href: '/contact' },
]

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { lang, setLang, tr } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mobilePrograms, setMobilePrograms] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    fn()
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isTransparentNow = transparent && !scrolled

  const linkCls = cn(
    'text-[0.9375rem] font-semibold transition-colors',
    isTransparentNow ? 'text-white/92 hover:text-white' : 'text-gray-700 hover:text-brand-mid'
  )

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isTransparentNow ? 'bg-black/50 backdrop-blur-md border-b border-white/5' : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo variant={isTransparentNow ? 'light' : 'dark'} />

        <ul className="hidden lg:flex items-center gap-6">
          <li>
            <Link href="/about" className={linkCls}>
              {tr('nav_about')}
            </Link>
          </li>

          <li className="group relative">
            <button type="button" className={cn('flex items-center gap-1', linkCls)}>
              {tr('nav_programs')}
              <ChevronDown className="w-4 h-4 opacity-70" strokeWidth={ICON_STROKE} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                {PROGRAMS_CHILDREN.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block px-4 py-2.5 text-[0.9375rem] font-medium text-gray-700 hover:text-brand-mid hover:bg-brand-pale transition-colors"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {SIMPLE_LINKS.filter((n) => n.key !== 'nav_about').map((n) => (
            <li key={n.key}>
              <Link href={n.href} className={linkCls}>
                {tr(n.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div
            className={cn(
              'flex items-center gap-0.5 text-[0.8125rem] font-bold rounded-full border p-0.5',
              isTransparentNow ? 'border-white/25' : 'border-gray-200'
            )}
          >
            {(['KO', 'EN', 'JP'] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  'px-3 py-1.5 rounded-full transition-all',
                  lang === l
                    ? 'bg-brand-mid text-white shadow-sm'
                    : isTransparentNow
                      ? 'text-white/75 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <Link href="/programs" className="btn-primary !px-5 !py-2.5 !text-[0.9375rem] !shadow-md">
            {tr('nav_cta')}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn('lg:hidden p-1', isTransparentNow ? 'text-white' : 'text-gray-800')}
          aria-label="메뉴"
        >
          {open ? <X className="w-6 h-6" strokeWidth={ICON_STROKE} /> : <Menu className="w-6 h-6" strokeWidth={ICON_STROKE} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-5 max-h-[80vh] overflow-y-auto">
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="block text-gray-800 text-[0.9375rem] font-semibold py-3 border-b border-gray-50"
          >
            {tr('nav_about')}
          </Link>

          <div className="border-b border-gray-50">
            <button
              type="button"
              onClick={() => setMobilePrograms(!mobilePrograms)}
              className="w-full flex justify-between items-center text-gray-800 text-[0.9375rem] font-semibold py-3"
            >
              {tr('nav_programs')}
              <ChevronDown className={cn('w-4 h-4 transition-transform', mobilePrograms && 'rotate-180')} strokeWidth={ICON_STROKE} />
            </button>
            {mobilePrograms && (
              <div className="pl-3 pb-3 space-y-1">
                {PROGRAMS_CHILDREN.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="block text-gray-600 text-[0.9375rem] py-2 hover:text-brand-mid"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {SIMPLE_LINKS.filter((n) => n.key !== 'nav_about').map((n) => (
            <Link
              key={n.key}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block text-gray-800 text-[0.9375rem] font-semibold py-3 border-b border-gray-50"
            >
              {tr(n.key)}
            </Link>
          ))}

          <div className="flex gap-2 pt-4">
            {(['KO', 'EN', 'JP'] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  'flex-1 py-2.5 rounded-xl text-[0.875rem] font-bold transition-colors',
                  lang === l ? 'bg-brand-mid text-white' : 'bg-gray-100 text-gray-600'
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <Link href="/programs" onClick={() => setOpen(false)} className="btn-primary w-full mt-4 !py-3.5">
            {tr('nav_cta')}
          </Link>
        </div>
      )}
    </nav>
  )
}
