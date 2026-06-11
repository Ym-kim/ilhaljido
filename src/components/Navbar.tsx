'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { useLang } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const CONTACT_LINKS = [
  { key: 'nav_contact_inquire', href: '/contact' },
  { key: 'nav_partnership', href: '/partnership' },
]

type MegaItem = { labelKey: string; href: string }
type MegaGroup = { titleKey: string; items: MegaItem[] }

const MEGA_COLUMNS: MegaGroup[][] = [
  [
    {
      titleKey: 'home_cat_workation_l',
      items: [
        { labelKey: 'nav_prog_domestic', href: '/programs/domestic' },
        { labelKey: 'nav_prog_global', href: '/programs/global' },
      ],
    },
    {
      titleKey: 'nav_prog_theme_wak',
      items: [
        { labelKey: 'mega_theme_ryokan', href: '/programs/global' },
        { labelKey: 'mega_theme_yoga', href: '/programs/healing' },
        { labelKey: 'mega_theme_golf', href: '/programs/golf' },
        { labelKey: 'home_theme_sports_l', href: '/programs/sports' },
        { labelKey: 'mega_theme_local', href: '/programs/local' },
        { labelKey: 'home_theme_network_l', href: '/programs/networking' },
      ],
    },
  ],
  [
    {
      titleKey: 'home_cat_learn_l',
      items: [
        { labelKey: 'nav_growth', href: '/growth' },
        { labelKey: 'nav_learn', href: '/learn' },
        { labelKey: 'mega_learn_ai', href: '/learn' },
      ],
    },
    {
      titleKey: 'home_cat_bizglobal_l',
      items: [
        { labelKey: 'mega_biz_market', href: '/programs/market' },
        { labelKey: 'mega_biz_expo', href: '/programs/market' },
        { labelKey: 'mega_biz_sourcing', href: '/programs/market' },
      ],
    },
  ],
  [
    {
      titleKey: 'home_cat_globalstay_l',
      items: [
        { labelKey: 'nav_prog_language', href: '/language' },
        { labelKey: 'mega_stay_longterm', href: '/programs/global' },
        { labelKey: 'mega_stay_cruise', href: '/cruise' },
        { labelKey: 'mega_stay_visa', href: '/visa-ai' },
      ],
    },
  ],
]

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { lang, setLang, tr } = useLang()
  const { user, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mobilePrograms, setMobilePrograms] = useState(false)
  const [mobileContact, setMobileContact] = useState(false)
  const [mobileOpenGroups, setMobileOpenGroups] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    fn()
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isTransparentNow = transparent && !scrolled

  const linkCls = cn(
    'text-[0.9375rem] font-semibold transition-colors',
    isTransparentNow ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-brand-mid'
  )

  const toggleMobileGroup = (key: string) => {
    setMobileOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isTransparentNow
          ? 'bg-black/50 backdrop-blur-md border-b border-white/5'
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo variant={isTransparentNow ? 'light' : 'dark'} />

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-4">
          <li>
            <Link href="/about" className={linkCls}>
              {tr('nav_about')}
            </Link>
          </li>

          {/* Programs — mega dropdown */}
          <li className="group relative">
            <button type="button" className={cn('flex items-center gap-1', linkCls)}>
              {tr('nav_programs')}
              <ChevronDown className="w-4 h-4 opacity-60" strokeWidth={ICON_STROKE} />
            </button>

            <div className="absolute top-full left-0 pt-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-[600px]">
                {/* 지금 모집중 banner */}
                <Link
                  href="/programs/domestic"
                  className="group/rec flex items-center justify-between px-5 py-3 bg-brand-pale border-b border-gray-100 hover:brightness-95 transition-all"
                >
                  <span className="flex items-center gap-2 text-[0.875rem] font-bold text-brand-mid">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-mid animate-pulse" />
                    {tr('nav_prog_recruiting')}
                  </span>
                  <span className="text-[0.75rem] font-semibold text-brand-mid opacity-60 group-hover/rec:opacity-100 transition-opacity">
                    양양 파일럿 →
                  </span>
                </Link>

                {/* 3-column grid */}
                <div className="grid grid-cols-3 p-4">
                  {MEGA_COLUMNS.map((col, ci) => (
                    <div
                      key={ci}
                      className={cn('space-y-4', ci > 0 && 'border-l border-gray-100 pl-4')}
                    >
                      {col.map((group) => (
                        <div key={group.titleKey}>
                          <div className="text-[0.6875rem] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-1.5">
                            {tr(group.titleKey)}
                          </div>
                          {group.items.map((item) => (
                            <Link
                              key={item.labelKey}
                              href={item.href}
                              className="block px-1.5 py-1 text-[0.875rem] font-medium text-gray-700 hover:text-brand-mid hover:bg-brand-pale rounded-lg transition-colors"
                            >
                              {tr(item.labelKey)}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>

          <li>
            <Link href="/visa-ai" className={linkCls}>
              {tr('nav_visa')}
            </Link>
          </li>

          {/* 문의·협력 dropdown */}
          <li className="group relative">
            <button type="button" className={cn('flex items-center gap-1', linkCls)}>
              {tr('nav_contact')}
              <ChevronDown className="w-4 h-4 opacity-60" strokeWidth={ICON_STROKE} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 overflow-hidden">
                {CONTACT_LINKS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block px-4 py-2 text-[0.875rem] font-medium text-gray-700 hover:text-brand-mid hover:bg-brand-pale transition-colors"
                  >
                    {tr(c.key)}
                  </Link>
                ))}
              </div>
            </div>
          </li>
        </ul>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Language dropdown */}
          <div className="group relative">
            <button
              type="button"
              className={cn(
                'flex items-center gap-1 text-[0.8125rem] font-bold px-3 py-1.5 rounded-full border transition-colors',
                isTransparentNow
                  ? 'border-white/25 text-white/90 hover:bg-white/10'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              )}
            >
              {lang}
              <ChevronDown className="w-3 h-3 opacity-60" strokeWidth={ICON_STROKE} />
            </button>
            <div className="absolute top-full right-0 mt-1.5 w-20 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
              {(['KO', 'EN', 'JP'] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    'w-full px-4 py-2 text-left text-[0.8125rem] font-bold transition-colors',
                    lang === l
                      ? 'text-brand-mid bg-brand-pale'
                      : 'text-gray-600 hover:text-brand-mid hover:bg-brand-pale'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* User menu (logged-in only; login link hidden for guests) */}
          {user && (
            <div className="group relative">
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1.5 text-[0.8125rem] font-bold px-3 py-1.5 rounded-full border transition-colors',
                  isTransparentNow
                    ? 'border-white/25 text-white hover:bg-white/10'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                )}
              >
                <User className="w-4 h-4" strokeWidth={ICON_STROKE} />
                <span className="max-w-[80px] truncate">
                  {user.user_metadata?.name || user.email?.split('@')[0]}
                </span>
                <ChevronDown className="w-3 h-3" strokeWidth={ICON_STROKE} />
              </button>
              <div className="absolute top-full right-0 mt-1 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <Link
                  href="/mypage"
                  className="block px-4 py-2 text-xs font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                >
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
          )}

          <Link href="/programs" className="btn-primary !px-5 !py-2 !text-[0.875rem] !shadow-md">
            {tr('nav_cta')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn('lg:hidden p-1', isTransparentNow ? 'text-white' : 'text-gray-800')}
          aria-label="메뉴"
        >
          {open ? <X className="w-6 h-6" strokeWidth={ICON_STROKE} /> : <Menu className="w-6 h-6" strokeWidth={ICON_STROKE} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-5 py-4 max-h-[82vh] overflow-y-auto">
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="block text-gray-800 text-[0.9375rem] font-semibold py-3 border-b border-gray-50"
          >
            {tr('nav_about')}
          </Link>

          {/* Programs accordion */}
          <div className="border-b border-gray-50">
            <button
              type="button"
              onClick={() => setMobilePrograms(!mobilePrograms)}
              className="w-full flex justify-between items-center text-gray-800 text-[0.9375rem] font-semibold py-3"
            >
              {tr('nav_programs')}
              <ChevronDown
                className={cn('w-4 h-4 transition-transform', mobilePrograms && 'rotate-180')}
                strokeWidth={ICON_STROKE}
              />
            </button>

            {mobilePrograms && (
              <div className="pb-3 space-y-1">
                {/* 지금 모집중 */}
                <Link
                  href="/programs/domestic"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 mb-2 rounded-xl bg-brand-pale text-brand-mid font-bold text-[0.875rem]"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-mid animate-pulse shrink-0" />
                  {tr('nav_prog_recruiting')}
                </Link>

                {/* Sub-group accordions */}
                {MEGA_COLUMNS.map((col) =>
                  col.map((group) => (
                    <div key={group.titleKey}>
                      <button
                        type="button"
                        onClick={() => toggleMobileGroup(group.titleKey)}
                        className="w-full flex justify-between items-center px-3 py-2 text-[0.875rem] font-semibold text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {tr(group.titleKey)}
                        <ChevronDown
                          className={cn(
                            'w-3.5 h-3.5 transition-transform shrink-0',
                            mobileOpenGroups.has(group.titleKey) && 'rotate-180'
                          )}
                          strokeWidth={ICON_STROKE}
                        />
                      </button>
                      {mobileOpenGroups.has(group.titleKey) && (
                        <div className="pl-5 pb-1.5 space-y-0.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.labelKey}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="block text-[0.875rem] py-1.5 px-2 text-gray-600 hover:text-brand-mid hover:bg-brand-pale rounded-lg transition-colors"
                            >
                              {tr(item.labelKey)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <Link
            href="/visa-ai"
            onClick={() => setOpen(false)}
            className="block text-gray-800 text-[0.9375rem] font-semibold py-3 border-b border-gray-50"
          >
            {tr('nav_visa')}
          </Link>

          {/* 문의·협력 accordion */}
          <div className="border-b border-gray-50">
            <button
              type="button"
              onClick={() => setMobileContact(!mobileContact)}
              className="w-full flex justify-between items-center text-gray-800 text-[0.9375rem] font-semibold py-3"
            >
              {tr('nav_contact')}
              <ChevronDown
                className={cn('w-4 h-4 transition-transform', mobileContact && 'rotate-180')}
                strokeWidth={ICON_STROKE}
              />
            </button>
            {mobileContact && (
              <div className="pl-3 pb-3 space-y-1">
                {CONTACT_LINKS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="block text-gray-600 text-[0.9375rem] py-2 px-2 hover:text-brand-mid hover:bg-brand-pale rounded-lg transition-colors"
                  >
                    {tr(c.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Language selector */}
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
              <Link
                href="/mypage"
                onClick={() => setOpen(false)}
                className="block mt-4 text-center text-[0.9375rem] font-bold py-3 rounded-full border border-gray-200 text-gray-700"
              >
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
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block mt-4 text-center text-[0.875rem] text-gray-400 hover:text-gray-600 py-2"
            >
              로그인
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
