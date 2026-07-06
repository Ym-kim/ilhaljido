'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { useLang } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { useAnnounce } from '@/context/AnnounceContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type DropItem = { labelKey: string; href: string; isHighlight?: boolean; hasDivider?: boolean }
type NavItem = { key: string; href?: string; items?: DropItem[] }

const NAV_ITEMS: NavItem[] = [
  { key: 'nav_about', href: '/about' },
  {
    key: 'nav_programs',
    items: [
      { labelKey: 'nav_prog_domestic', href: '/programs/domestic' },
      { labelKey: 'nav_prog_support', href: '/programs/support' },
      { labelKey: 'nav_prog_global', href: '/programs/global' },
      { labelKey: 'nav_prog_all', href: '/programs', hasDivider: true },
    ],
  },
  {
    key: 'nav_theme',
    items: [
      { labelKey: 'mega_theme_ryokan', href: '/programs/global' },
      { labelKey: 'mega_theme_yoga', href: '/programs/healing' },
      { labelKey: 'home_theme_golf_l', href: '/programs/golf' },
      { labelKey: 'mega_theme_local', href: '/programs/local' },
      { labelKey: 'home_theme_sports_l', href: '/programs/sports' },
      { labelKey: 'mega_stay_cruise', href: '/cruise' },
    ],
  },
  {
    key: 'home_cat_learn_l',
    items: [
      { labelKey: 'nav_growth', href: '/growth' },
      { labelKey: 'nav_learn', href: '/learn' },
      { labelKey: 'mega_learn_ai', href: '/growth' },
      { labelKey: 'nav_founder_net', href: '/programs/networking' },
      { labelKey: 'nav_select_learn', href: '/select/learn', hasDivider: true },
    ],
  },
  {
    key: 'nav_global_nav',
    items: [
      { labelKey: 'nav_global_market', href: '/programs/market' },
      { labelKey: 'nav_prog_language', href: '/language' },
      { labelKey: 'nav_prog_globalstay', href: '/programs/global' },
      { labelKey: 'nav_visa', href: '/visa-ai' },
      { labelKey: 'nav_select_hotel', href: '/select/hotel', hasDivider: true },
      { labelKey: 'nav_select_esim', href: '/select/esim' },
    ],
  },
  {
    key: 'nav_select',
    items: [
      { labelKey: 'nav_select_hotel', href: '/select/hotel' },
      { labelKey: 'nav_select_activity', href: '/select/activity' },
      { labelKey: 'nav_select_esim', href: '/select/esim' },
      { labelKey: 'nav_select_learn', href: '/select/learn' },
      { labelKey: 'nav_select_all', href: '/select', hasDivider: true },
    ],
  },
  { key: 'nav_visa', href: '/visa-ai' },
  { key: 'nav_partnership', href: '/partnership' },
]

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { lang, setLang, tr } = useLang()
  const { user, signOut } = useAuth()
  const { visible: annVisible, dismiss: annDismiss } = useAnnounce()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    fn()
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isTransparentNow = transparent && !scrolled

  const toggleMobile = (key: string) => {
    setMobileOpen((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const linkCls = cn(
    'text-[0.9375rem] font-semibold transition-colors',
    isTransparentNow ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-brand-mid'
  )

  return (
    <>
      {/* Announcement bar */}
      {annVisible && (
        <div className="fixed top-0 inset-x-0 z-[51] h-9 bg-brand-mid flex items-center justify-center px-10">
          <Link
            href="/programs/domestic"
            className="flex items-center gap-2 text-white text-[0.8125rem] font-semibold hover:opacity-90 transition-opacity min-w-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
            <span className="hidden sm:inline truncate">{tr('ann_bar_text')}</span>
            <span className="sm:hidden truncate">{tr('ann_bar_short')}</span>
            <span className="shrink-0 text-white/75 font-bold ml-1">{tr('ann_bar_cta')}</span>
          </Link>
          <button
            type="button"
            onClick={annDismiss}
            className="absolute right-3 text-white/70 hover:text-white transition-colors p-1"
            aria-label="닫기"
          >
            <X className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          </button>
        </div>
      )}

      {/* Main nav */}
      <nav
        className={cn(
          'fixed inset-x-0 z-50 transition-all duration-300',
          annVisible ? 'top-9' : 'top-0',
          isTransparentNow
            ? 'bg-black/50 backdrop-blur-md border-b border-white/5'
            : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6 justify-between">
          <Logo variant={isTransparentNow ? 'light' : 'dark'} />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={cn(linkCls, 'block px-3 py-2 rounded-lg hover:bg-black/5')}
                  >
                    {tr(item.key)}
                  </Link>
                </li>
              ) : (
                <li key={item.key} className="group relative">
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-0.5 px-3 py-2 rounded-lg hover:bg-black/5',
                      linkCls
                    )}
                  >
                    {tr(item.key)}
                    <ChevronDown
                      className="w-3.5 h-3.5 opacity-50 mt-px shrink-0"
                      strokeWidth={ICON_STROKE}
                    />
                  </button>

                  {/* Dropdown panel */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[13rem] overflow-hidden">
                      {item.items!.map((d) => (
                        <div key={d.labelKey}>
                          {d.hasDivider && <div className="my-1.5 mx-3 border-t border-gray-100" />}
                          <Link
                            href={d.href}
                            className={cn(
                              'flex items-center gap-2 mx-1 px-3 py-2 text-[0.875rem] rounded-xl transition-colors',
                              d.isHighlight
                                ? 'font-bold text-brand-mid hover:bg-brand-pale'
                                : 'font-medium text-gray-700 hover:text-brand-mid hover:bg-brand-pale'
                            )}
                          >
                            {tr(d.labelKey)}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              )
            )}
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

            {/* 로그인 버튼 — 비로그인 시 */}
            {!user && (
              <Link
                href="/login"
                className={cn(
                  'flex items-center gap-1.5 text-[0.8125rem] font-bold px-3.5 py-1.5 rounded-full border transition-colors',
                  isTransparentNow
                    ? 'border-white/25 text-white hover:bg-white/10'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                )}
              >
                <User className="w-4 h-4" strokeWidth={ICON_STROKE} />
                {tr('nav_login')}
              </Link>
            )}

            {/* User menu — logged-in only */}
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
            {open ? (
              <X className="w-6 h-6" strokeWidth={ICON_STROKE} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={ICON_STROKE} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-5 py-4 max-h-[82vh] overflow-y-auto">
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-gray-800 text-[0.9375rem] font-semibold py-3 border-b border-gray-50"
                >
                  {tr(item.key)}
                </Link>
              ) : (
                <div key={item.key} className="border-b border-gray-50">
                  <button
                    type="button"
                    onClick={() => toggleMobile(item.key)}
                    className="w-full flex justify-between items-center text-gray-800 text-[0.9375rem] font-semibold py-3"
                  >
                    {tr(item.key)}
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform',
                        mobileOpen.has(item.key) && 'rotate-180'
                      )}
                      strokeWidth={ICON_STROKE}
                    />
                  </button>
                  {mobileOpen.has(item.key) && (
                    <div className="pb-3 space-y-0.5">
                      {item.items!.map((d) => (
                        <div key={d.labelKey}>
                          {d.hasDivider && <div className="my-1.5 border-t border-gray-100" />}
                          <Link
                            href={d.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              'flex items-center gap-2 px-3 py-2 text-[0.875rem] rounded-xl transition-colors',
                              d.isHighlight
                                ? 'font-bold text-brand-mid bg-brand-pale'
                                : 'font-medium text-gray-600 hover:text-brand-mid hover:bg-brand-pale'
                            )}
                          >
                            {tr(d.labelKey)}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}

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

            <Link
              href="/programs"
              onClick={() => setOpen(false)}
              className="btn-primary w-full mt-3 !py-3.5"
            >
              {tr('nav_cta')}
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
