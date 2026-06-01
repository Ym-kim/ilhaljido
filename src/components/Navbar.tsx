'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { useLang } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n'
import { getNavPrograms } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const SIMPLE_LINKS: { key: string; href: string }[] = [
  { key: 'nav_about', href: '/about' },
  { key: 'nav_infrastructure', href: '/infrastructure' },
  { key: 'nav_visa', href: '/visa-ai' },
  { key: 'nav_learn', href: '/learn' },
]

const CONTACT_LINKS = [
  { key: 'nav_contact_inquire', href: '/contact' },
  { key: 'nav_partnership', href: '/partnership' },
]

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { lang, setLang, tr } = useLang()
  const { user, signOut } = useAuth()
  const programsChildren = getNavPrograms(lang)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mobilePrograms, setMobilePrograms] = useState(false)
  const [mobileContact, setMobileContact] = useState(false)

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
                {programsChildren.map((c) => (
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

          <li className="group relative">
            <button type="button" className={cn('flex items-center gap-1', linkCls)}>
              {tr('nav_contact')}
              <ChevronDown className="w-4 h-4 opacity-70" strokeWidth={ICON_STROKE} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                {CONTACT_LINKS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block px-4 py-2.5 text-[0.9375rem] font-medium text-gray-700 hover:text-brand-mid hover:bg-brand-pale transition-colors"
                  >
                    {tr(c.key)}
                  </Link>
                ))}
              </div>
            </div>
          </li>
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
          {user ? (
            <div className="group relative">
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1.5 text-[0.8125rem] font-bold px-3 py-2 rounded-full border transition-colors',
                  isTransparentNow
                    ? 'border-white/25 text-white hover:bg-white/10'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                )}
              >
                <User className="w-4 h-4" strokeWidth={ICON_STROKE} />
                <span className="max-w-[100px] truncate">{user.user_metadata?.name || user.email?.split('@')[0]}</span>
                <ChevronDown className="w-3 h-3" strokeWidth={ICON_STROKE} />
              </button>
              <div className="absolute top-full right-0 mt-1 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <Link href="/mypage" className="block px-4 py-2 text-xs font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors">
                  마이페이지
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="w-full text-left flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} /> 로그아웃
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className={cn(
                'text-[0.8125rem] font-bold px-3 py-2 rounded-full border transition-colors',
                isTransparentNow
                  ? 'border-white/25 text-white hover:bg-white/10'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              )}
            >
              로그인
            </Link>
          )}
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
                {programsChildren.map((c) => (
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

          <div className="border-b border-gray-50">
            <button
              type="button"
              onClick={() => setMobileContact(!mobileContact)}
              className="w-full flex justify-between items-center text-gray-800 text-[0.9375rem] font-semibold py-3"
            >
              {tr('nav_contact')}
              <ChevronDown className={cn('w-4 h-4 transition-transform', mobileContact && 'rotate-180')} strokeWidth={ICON_STROKE} />
            </button>
            {mobileContact && (
              <div className="pl-3 pb-3 space-y-1">
                {CONTACT_LINKS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="block text-gray-600 text-[0.9375rem] py-2 hover:text-brand-mid"
                  >
                    {tr(c.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
          {user ? (
            <>
              <Link href="/mypage" onClick={() => setOpen(false)} className="block mt-4 text-center text-[0.9375rem] font-bold py-3 rounded-full border border-gray-200 text-gray-700">
                마이페이지 ({user.user_metadata?.name || user.email?.split('@')[0]})
              </Link>
              <button
                type="button"
                onClick={() => { signOut(); setOpen(false) }}
                className="block w-full mt-2 text-center text-[0.875rem] font-bold py-2.5 text-red-500"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="block mt-4 text-center text-[0.9375rem] font-bold py-3 rounded-full border border-gray-200 text-gray-700">
              로그인 / 회원가입
            </Link>
          )}
          <Link href="/programs" onClick={() => setOpen(false)} className="btn-primary w-full mt-3 !py-3.5">
            {tr('nav_cta')}
          </Link>
        </div>
      )}
    </nav>
  )
}
