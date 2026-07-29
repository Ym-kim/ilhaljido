'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { ArrowRight, Bookmark, ChevronDown, LogOut, Menu, User, X } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { useAnnounce } from '@/context/AnnounceContext'
import { useAuth } from '@/context/AuthContext'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'
import {
  getCampaignAlt,
  getCampaignHref,
  getCampaignImage,
  getNavigationGroups,
  getNavigationHref,
  NAVIGATION_COPY,
  NAVIGATION_MENUS,
  type NavigationLink,
  type NavigationMenu,
} from '@/lib/navigation'
import { trackEvent } from '@/lib/track'
import { cn } from '@/lib/utils'

const DESKTOP_MENUS = [
  ...NAVIGATION_MENUS.filter((menu) => menu.id !== 'more'),
  NAVIGATION_MENUS.find((menu) => menu.id === 'more')!,
]

function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(en|ja)(?=\/|$)/, '')
  return stripped || '/'
}

function isPathActive(pathname: string, href: string) {
  const current = stripLocale(pathname)
  const target = stripLocale(href.split(/[?#]/)[0] || '/')
  if (target === '/') return current === '/'
  return current === target || current.startsWith(`${target}/`)
}

function menuIsActive(menu: NavigationMenu, pathname: string, lang: Lang) {
  if (menu.id === 'destinations' && stripLocale(pathname).startsWith('/guide/')) return true
  if (menu.id === 'programs' && stripLocale(pathname).startsWith('/hosted')) return true
  return getNavigationGroups(menu, lang).some((group) =>
    group.links.some((item) => isPathActive(pathname, getNavigationHref(item, lang))),
  ) || Boolean(menu.allLink && isPathActive(pathname, getNavigationHref(menu.allLink, lang)))
}

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname()
  const { lang, setLang, tr } = useLang()
  const { user, signOut } = useAuth()
  const { visible: annVisible, dismiss: annDismiss } = useAnnounce()
  const [scrolled, setScrolled] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const mobileDialogRef = useRef<HTMLDivElement>(null)
  const desktopButtonsRef = useRef<Record<string, HTMLButtonElement | null>>({})
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 48)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setDesktopOpen(null)
        setLanguageOpen(false)
        setAccountOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || mobileMenuOpen) return
      if (desktopOpen) {
        event.preventDefault()
        const activeMenu = desktopOpen
        setDesktopOpen(null)
        desktopButtonsRef.current[activeMenu]?.focus()
      }
      setLanguageOpen(false)
      setAccountOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [desktopOpen, mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => mobileDialogRef.current?.focus(), 0)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  const isTransparentNow = transparent && !scrolled && !desktopOpen && !mobileMenuOpen

  const trackNavigation = (
    event: 'navigation_open' | 'navigation_item_click' | 'navigation_campaign_click' | 'mobile_menu_open' | 'mobile_menu_close',
    menu: string,
    device: 'desktop' | 'mobile',
    item?: string,
    destinationUrl?: string,
  ) => {
    trackEvent(event, {
      locale: lang,
      menu,
      device,
      ...(item ? { item } : {}),
      ...(destinationUrl ? { destination_url: destinationUrl } : {}),
    })
  }

  const openDesktopMenu = (menuId: string) => {
    if (desktopOpen !== menuId) trackNavigation('navigation_open', menuId, 'desktop')
    setDesktopOpen(menuId)
    setLanguageOpen(false)
    setAccountOpen(false)
  }

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = null
  }

  const scheduleOpen = (menuId: string) => {
    clearHoverTimer()
    hoverTimerRef.current = setTimeout(() => openDesktopMenu(menuId), 90)
  }

  const scheduleClose = () => {
    clearHoverTimer()
    hoverTimerRef.current = setTimeout(() => setDesktopOpen(null), 170)
  }

  const closeDesktopMenu = (returnFocus = false) => {
    const activeMenu = desktopOpen
    setDesktopOpen(null)
    if (returnFocus && activeMenu) desktopButtonsRef.current[activeMenu]?.focus()
  }

  const openMobileMenu = (section?: string) => {
    setMobileMenuOpen(true)
    setMobileSection(section ?? null)
    trackNavigation('mobile_menu_open', section ?? 'global', 'mobile')
  }

  const closeMobileMenu = (menu = 'global') => {
    if (mobileMenuOpen) trackNavigation('mobile_menu_close', menu, 'mobile')
    setMobileMenuOpen(false)
    setMobileSection(null)
  }

  const onMobileDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeMobileMenu(mobileSection ?? 'global')
      return
    }
    if (event.key !== 'Tab') return
    const focusable = Array.from(
      mobileDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter((element) => !element.hasAttribute('hidden'))
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleMenuButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, menuId: string) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openDesktopMenu(menuId)
      window.setTimeout(() => {
        navRef.current?.querySelector<HTMLElement>(`#desktop-menu-${menuId} a[href]`)?.focus()
      }, 0)
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      closeDesktopMenu(true)
    }
  }

  const onNavigationClick = (
    menu: string,
    item: NavigationLink,
    device: 'desktop' | 'mobile',
  ) => {
    const href = getNavigationHref(item, lang)
    trackNavigation('navigation_item_click', menu, device, item.id, href)
    if (device === 'mobile') closeMobileMenu(menu)
    else closeDesktopMenu()
  }

  const onCampaignClick = (device: 'desktop' | 'mobile') => {
    const href = getCampaignHref(lang)
    trackNavigation('navigation_campaign_click', 'find', device, 'featured-campaign', href)
    if (device === 'mobile') closeMobileMenu('find')
    else closeDesktopMenu()
  }

  const renderCampaignCard = (device: 'desktop' | 'mobile') => (
    <Link
      href={getCampaignHref(lang)}
      prefetch={false}
      onClick={() => onCampaignClick(device)}
      className={cn(
        'group/campaign relative isolate overflow-hidden bg-[#0b2437] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500',
        device === 'desktop' ? 'min-h-[15.5rem] w-[18.5rem] rounded-[1.65rem]' : 'mt-3 min-h-[10.5rem] rounded-[1.35rem]',
      )}
    >
      <Image
        src={getCampaignImage(lang)}
        alt={getCampaignAlt(lang)}
        fill
        sizes={device === 'desktop' ? '296px' : '(max-width: 640px) 88vw, 420px'}
        className="object-cover transition duration-700 ease-out group-hover/campaign:scale-[1.025] motion-reduce:transition-none"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#071723] via-[#071723]/45 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex flex-col p-5">
        <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-sky-200">
          {NAVIGATION_COPY.currentCampaign[lang]}
        </span>
        <span className="mt-1.5 text-lg font-black tracking-[-0.03em]">
          {NAVIGATION_COPY.campaignTitle[lang]}
        </span>
        <span className="mt-1 line-clamp-2 text-xs font-medium leading-5 text-white/75">
          {NAVIGATION_COPY.campaignDescription[lang]}
        </span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-white">
          {NAVIGATION_COPY.campaignCta[lang]}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/campaign:translate-x-0.5" strokeWidth={ICON_STROKE} />
        </span>
      </span>
    </Link>
  )

  const renderDesktopMenu = (menu: NavigationMenu) => {
    const groups = getNavigationGroups(menu, lang)
    return (
      <div
        id={`desktop-menu-${menu.id}`}
        role="region"
        aria-label={menu.label[lang]}
        className="absolute left-1/2 top-[calc(100%+0.55rem)] z-50 w-[min(62rem,calc(100vw-3rem))] -translate-x-1/2"
      >
        <div className="grid overflow-hidden rounded-[1.75rem] border border-[#dfe6e8] bg-white shadow-[0_28px_80px_rgba(4,27,40,.18)] grid-cols-[14rem_1fr]">
          <div className="flex min-h-[17.5rem] flex-col bg-[#0d2638] p-6 text-white">
            <span className="text-[0.63rem] font-black uppercase tracking-[0.18em] text-sky-300">
              {menu.eyebrow[lang]}
            </span>
            <span className="mt-3 text-[1.35rem] font-black leading-tight tracking-[-0.04em]">
              {menu.title[lang]}
            </span>
            <span className="mt-auto text-[0.69rem] font-bold uppercase tracking-[0.18em] text-white/40">
              Stay · Work · Grow
            </span>
          </div>

          <div className={cn('grid min-w-0 gap-6 p-6', menu.campaign ? 'grid-cols-[1fr_auto]' : 'grid-cols-1')}>
            <div className={cn('grid min-w-0 gap-7', groups.length > 1 ? 'grid-cols-2' : 'grid-cols-1')}>
              {groups.map((group) => (
                <div key={group.id} className="min-w-0">
                  {group.label && (
                    <span className="mb-2 block text-[0.64rem] font-black uppercase tracking-[0.16em] text-[#78909c]">
                      {group.label[lang]}
                    </span>
                  )}
                  <div className="space-y-1">
                    {group.links.map((item) => {
                      const href = getNavigationHref(item, lang)
                      const active = isPathActive(pathname, href)
                      return (
                        <Link
                          key={item.id}
                          href={href}
                          aria-current={active ? 'page' : undefined}
                          onClick={() => onNavigationClick(menu.id, item, 'desktop')}
                          className={cn(
                            'group/link flex min-h-12 min-w-0 items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-500',
                            active ? 'bg-[#eaf6fb] text-[#08668b]' : 'text-[#203441] hover:bg-[#f2f6f6] hover:text-[#08668b]',
                          )}
                        >
                          <span className="min-w-0">
                            <span className="block text-sm font-extrabold tracking-[-0.015em]">{item.label[lang]}</span>
                            {item.description && (
                              <span className="mt-0.5 block truncate text-[0.69rem] font-medium text-[#7b8b92]">
                                {item.description[lang]}
                              </span>
                            )}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#9fb0b7] transition-transform group-hover/link:translate-x-0.5" strokeWidth={ICON_STROKE} />
                        </Link>
                      )
                    })}
                  </div>
                  {menu.allLink && group === groups[groups.length - 1] && (
                    <Link
                      href={getNavigationHref(menu.allLink, lang)}
                      onClick={() => onNavigationClick(menu.id, menu.allLink!, 'desktop')}
                      className="mt-3 inline-flex min-h-11 items-center gap-1.5 px-3 text-xs font-black text-[#08719b] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                    >
                      {menu.allLink.label[lang]} <ArrowRight className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            {menu.campaign && renderCampaignCard('desktop')}
          </div>
        </div>
      </div>
    )
  }

  const renderMobileSection = (menu: NavigationMenu) => {
    const open = mobileSection === menu.id
    const groups = getNavigationGroups(menu, lang)
    return (
      <div key={menu.id} className="border-b border-[#e5ebec]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`mobile-menu-${menu.id}`}
          onClick={() => {
            const next = open ? null : menu.id
            setMobileSection(next)
            if (next) trackNavigation('navigation_open', menu.id, 'mobile')
          }}
          className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-[1.02rem] font-black tracking-[-0.02em] text-[#142b39] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-500"
        >
          <span>{menu.label[lang]}</span>
          <ChevronDown className={cn('h-4 w-4 transition-transform motion-reduce:transition-none', open && 'rotate-180')} strokeWidth={ICON_STROKE} />
        </button>
        {open && (
          <div id={`mobile-menu-${menu.id}`} className="pb-4">
            <span className="mb-2 block text-[0.67rem] font-bold leading-5 text-[#71828a]">{menu.title[lang]}</span>
            <div className={cn('grid gap-1', groups.length > 1 && 'min-[390px]:grid-cols-2')}>
              {groups.flatMap((group) => group.links).slice(0, 6).map((item) => {
                const href = getNavigationHref(item, lang)
                const active = isPathActive(pathname, href)
                return (
                  <Link
                    key={item.id}
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => onNavigationClick(menu.id, item, 'mobile')}
                    className={cn(
                      'flex min-h-12 min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-500',
                      active ? 'bg-[#eaf6fb] text-[#08719b]' : 'text-[#425660] hover:bg-[#f2f6f6]',
                    )}
                  >
                    <span className="min-w-0 break-keep">{item.label[lang]}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#9aabb2]" strokeWidth={ICON_STROKE} />
                  </Link>
                )
              })}
            </div>
            {menu.allLink && (
              <Link
                href={getNavigationHref(menu.allLink, lang)}
                onClick={() => onNavigationClick(menu.id, menu.allLink!, 'mobile')}
                className="mt-2 inline-flex min-h-11 items-center gap-1.5 px-3 text-xs font-black text-[#08719b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                {menu.allLink.label[lang]} <ArrowRight className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
              </Link>
            )}
            {menu.campaign && renderCampaignCard('mobile')}
          </div>
        )}
      </div>
    )
  }

  const topLinkClass = (active: boolean) => cn(
    'relative flex min-h-11 items-center rounded-lg px-2.5 text-[0.88rem] font-bold tracking-[-0.02em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 xl:px-3',
    isTransparentNow ? 'text-white/90 hover:bg-white/10 hover:text-white' : 'text-[#344b58] hover:bg-[#eef5f6] hover:text-[#08719b]',
    active && (isTransparentNow ? 'bg-white/10 text-white' : 'bg-[#eaf6fb] text-[#075f81]'),
    'after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-sky-400 after:transition-transform',
    active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
  )

  return (
    <>
      {annVisible && (
        <div className="fixed inset-x-0 top-0 z-[52] flex h-9 items-center justify-center bg-[#08719b] px-10">
          <Link href="/programs/domestic" className="flex min-w-0 items-center gap-2 text-[0.78rem] font-semibold text-white hover:text-sky-100">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-200" />
            <span className="hidden truncate sm:inline">{tr('ann_bar_text')}</span>
            <span className="truncate sm:hidden">{tr('ann_bar_short')}</span>
            <span className="ml-1 shrink-0 font-black text-white/75">{tr('ann_bar_cta')}</span>
          </Link>
          <button type="button" onClick={annDismiss} className="absolute right-3 flex h-9 w-9 items-center justify-center text-white/70 hover:text-white" aria-label={tr('nav_close')}>
            <X className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
          </button>
        </div>
      )}

      <nav
        ref={navRef}
        aria-label="Primary navigation"
        className={cn(
          'fixed inset-x-0 z-[51] border-b transition-[background-color,border-color,box-shadow] duration-300',
          annVisible ? 'top-9' : 'top-0',
          isTransparentNow
            ? 'border-white/10 bg-[#071723]/58 backdrop-blur-xl'
            : 'border-[#e5eaeb] bg-white/96 shadow-[0_7px_30px_rgba(8,38,52,.07)] backdrop-blur-xl',
        )}
      >
        <div className="mx-auto flex h-16 max-w-[86rem] items-center justify-between gap-2 px-4 sm:px-6">
          <Logo variant={isTransparentNow ? 'light' : 'dark'} />

          <ul className="relative hidden h-full flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
            {DESKTOP_MENUS.slice(0, 4).map((menu) => {
              const active = menuIsActive(menu, pathname, lang)
              const open = desktopOpen === menu.id
              return (
                <li key={menu.id} className="static" onMouseEnter={() => scheduleOpen(menu.id)} onMouseLeave={scheduleClose}>
                  <button
                    ref={(element) => { desktopButtonsRef.current[menu.id] = element }}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`desktop-menu-${menu.id}`}
                    onClick={() => open ? closeDesktopMenu() : openDesktopMenu(menu.id)}
                    onKeyDown={(event) => handleMenuButtonKeyDown(event, menu.id)}
                    className={topLinkClass(active)}
                  >
                    {menu.label[lang]}
                    <ChevronDown className={cn('ml-1 h-3.5 w-3.5 opacity-55 transition-transform', open && 'rotate-180')} strokeWidth={ICON_STROKE} />
                  </button>
                  {open && renderDesktopMenu(menu)}
                </li>
              )
            })}

            <li>
              <Link
                href="/wishlist"
                aria-current={isPathActive(pathname, '/wishlist') ? 'page' : undefined}
                onClick={() => trackNavigation('navigation_item_click', 'saved', 'desktop', 'saved', '/wishlist')}
                className={topLinkClass(isPathActive(pathname, '/wishlist'))}
              >
                {NAVIGATION_COPY.labels.saved[lang]}
              </Link>
            </li>

            {DESKTOP_MENUS.slice(4).map((menu) => {
              const active = menuIsActive(menu, pathname, lang)
              const open = desktopOpen === menu.id
              return (
                <li key={menu.id} className="static" onMouseEnter={() => scheduleOpen(menu.id)} onMouseLeave={scheduleClose}>
                  <button
                    ref={(element) => { desktopButtonsRef.current[menu.id] = element }}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`desktop-menu-${menu.id}`}
                    onClick={() => open ? closeDesktopMenu() : openDesktopMenu(menu.id)}
                    onKeyDown={(event) => handleMenuButtonKeyDown(event, menu.id)}
                    className={topLinkClass(active)}
                  >
                    {menu.label[lang]}
                    <ChevronDown className={cn('ml-1 h-3.5 w-3.5 opacity-55 transition-transform', open && 'rotate-180')} strokeWidth={ICON_STROKE} />
                  </button>
                  {open && renderDesktopMenu(menu)}
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="relative">
              <button
                type="button"
                aria-expanded={languageOpen}
                aria-controls="desktop-language-menu"
                onClick={() => { setLanguageOpen((value) => !value); setDesktopOpen(null); setAccountOpen(false) }}
                className={cn(
                  'flex min-h-10 items-center gap-1 rounded-full border px-3 text-xs font-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
                  isTransparentNow ? 'border-white/25 text-white hover:bg-white/10' : 'border-[#dce4e6] text-[#51656f] hover:bg-[#f2f6f6]',
                )}
              >
                {lang}<ChevronDown className="h-3 w-3 opacity-60" strokeWidth={ICON_STROKE} />
              </button>
              {languageOpen && (
                <div id="desktop-language-menu" className="absolute right-0 top-[calc(100%+0.5rem)] w-24 rounded-xl border border-[#e2e8e9] bg-white p-1.5 shadow-xl">
                  {(['KO', 'EN', 'JP'] as Lang[]).map((locale) => (
                    <button key={locale} type="button" onClick={() => { setLang(locale); setLanguageOpen(false) }} className={cn('flex min-h-10 w-full items-center rounded-lg px-3 text-left text-xs font-black', lang === locale ? 'bg-[#eaf6fb] text-[#08719b]' : 'text-[#536770] hover:bg-[#f2f6f6]')}>
                      {locale}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="relative">
                <button type="button" aria-expanded={accountOpen} aria-controls="desktop-account-menu" onClick={() => { setAccountOpen((value) => !value); setLanguageOpen(false); setDesktopOpen(null) }} className={cn('flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400', isTransparentNow ? 'border-white/25 text-white hover:bg-white/10' : 'border-[#dce4e6] text-[#455a64] hover:bg-[#f2f6f6]')}>
                  <User className="h-4 w-4" strokeWidth={ICON_STROKE} />
                  <span className="max-w-20 truncate">{user.user_metadata?.name || user.email?.split('@')[0]}</span>
                </button>
                {accountOpen && (
                  <div id="desktop-account-menu" className="absolute right-0 top-[calc(100%+0.5rem)] w-44 rounded-xl border border-[#e2e8e9] bg-white p-1.5 shadow-xl">
                    <Link href="/mypage" onClick={() => setAccountOpen(false)} className="flex min-h-10 items-center rounded-lg px-3 text-xs font-bold text-[#455a64] hover:bg-[#f2f6f6]">{tr('my_mypage')}</Link>
                    <button type="button" onClick={() => { signOut(); setAccountOpen(false) }} className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 text-left text-xs font-bold text-rose-600 hover:bg-rose-50"><LogOut className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />{tr('my_logout')}</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={cn('flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400', isTransparentNow ? 'border-white/25 text-white hover:bg-white/10' : 'border-[#dce4e6] text-[#455a64] hover:bg-[#f2f6f6]')}>
                <User className="h-4 w-4" strokeWidth={ICON_STROKE} />{tr('nav_login')}
              </Link>
            )}

            <Link
              href={getNavigationHref(getNavigationGroups(NAVIGATION_MENUS[0], lang)[0].links[0], lang)}
              onClick={() => onNavigationClick('find', getNavigationGroups(NAVIGATION_MENUS[0], lang)[0].links[0], 'desktop')}
              className="inline-flex min-h-10 items-center rounded-full bg-[#0b8fc4] px-4 text-xs font-black text-white shadow-[0_8px_22px_rgba(11,143,196,.24)] transition hover:bg-[#087aa7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              {NAVIGATION_COPY.tripMatch[lang]}
            </Link>
          </div>

          <div className="flex items-center lg:hidden">
            <button type="button" onClick={() => openMobileMenu('language')} aria-label={NAVIGATION_COPY.languageLabel[lang]} className={cn('flex h-11 min-w-11 items-center justify-center rounded-full text-[0.7rem] font-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400', isTransparentNow ? 'text-white hover:bg-white/10' : 'text-[#425660] hover:bg-[#eef4f5]')}>{lang}</button>
            <Link href="/wishlist" aria-label={NAVIGATION_COPY.savedLabel[lang]} className={cn('flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400', isTransparentNow ? 'text-white hover:bg-white/10' : 'text-[#425660] hover:bg-[#eef4f5]')}>
              <Bookmark className="h-5 w-5" strokeWidth={ICON_STROKE} />
            </Link>
            <button type="button" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation-dialog" onClick={() => mobileMenuOpen ? closeMobileMenu(mobileSection ?? 'global') : openMobileMenu()} aria-label={mobileMenuOpen ? NAVIGATION_COPY.closeMenu[lang] : NAVIGATION_COPY.openMenu[lang]} className={cn('flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400', isTransparentNow ? 'text-white hover:bg-white/10' : 'text-[#253c49] hover:bg-[#eef4f5]')}>
              {mobileMenuOpen ? <X className="h-5.5 w-5.5" strokeWidth={ICON_STROKE} /> : <Menu className="h-5.5 w-5.5" strokeWidth={ICON_STROKE} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-navigation-dialog" ref={mobileDialogRef} role="dialog" aria-modal="true" aria-label={NAVIGATION_COPY.openMenu[lang]} tabIndex={-1} onKeyDown={onMobileDialogKeyDown} className={cn('absolute inset-x-0 top-full z-[60] overflow-y-auto bg-white outline-none lg:hidden', annVisible ? 'h-[calc(100dvh-6.25rem)]' : 'h-[calc(100dvh-4rem)]')}>
            <div className="mx-auto min-h-full max-w-xl px-5 pb-8 pt-5">
              <Link
                href={getNavigationHref(getNavigationGroups(NAVIGATION_MENUS[0], lang)[0].links[0], lang)}
                onClick={() => onNavigationClick('find', getNavigationGroups(NAVIGATION_MENUS[0], lang)[0].links[0], 'mobile')}
                className="group flex min-h-[4.5rem] items-center justify-between gap-4 rounded-2xl bg-[#0d2b3d] px-5 py-4 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <span>
                  <span className="block text-[0.62rem] font-black uppercase tracking-[0.16em] text-sky-300">A TRIP THAT FITS</span>
                  <span className="mt-1 block text-base font-black tracking-[-0.025em]">{NAVIGATION_COPY.tripMatch[lang]}</span>
                  <span className="mt-0.5 block text-[0.7rem] font-medium text-white/65">{NAVIGATION_COPY.tripMatchShort[lang]}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={ICON_STROKE} />
              </Link>

              <div className="mt-4 rounded-2xl border border-[#e2e8e9] px-4">
                {NAVIGATION_MENUS.filter((menu) => menu.id !== 'more').map(renderMobileSection)}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link href="/wishlist" onClick={() => { trackNavigation('navigation_item_click', 'saved', 'mobile', 'saved', '/wishlist'); closeMobileMenu('saved') }} className="flex min-h-12 items-center gap-2 rounded-xl border border-[#dfe7e9] px-4 text-sm font-black text-[#29414e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"><Bookmark className="h-4 w-4" strokeWidth={ICON_STROKE} />{NAVIGATION_COPY.labels.saved[lang]}</Link>
                <Link href={user ? '/mypage' : '/login'} onClick={() => closeMobileMenu('account')} className="flex min-h-12 items-center gap-2 rounded-xl border border-[#dfe7e9] px-4 text-sm font-black text-[#29414e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"><User className="h-4 w-4" strokeWidth={ICON_STROKE} />{user ? tr('my_mypage') : tr('nav_login')}</Link>
              </div>

              <div className="mt-2 rounded-2xl border border-[#e2e8e9] px-4">
                {renderMobileSection(NAVIGATION_MENUS.find((menu) => menu.id === 'more')!)}
              </div>

              <div className="mt-5">
                <span className="mb-2 block text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#819198]">{NAVIGATION_COPY.languageLabel[lang]}</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['KO', 'EN', 'JP'] as Lang[]).map((locale) => (
                    <button key={locale} type="button" onClick={() => setLang(locale)} className={cn('min-h-11 rounded-xl text-xs font-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500', lang === locale ? 'bg-[#e5f4fa] text-[#08719b]' : 'bg-[#f2f5f5] text-[#687b83]')}>{locale}</button>
                  ))}
                </div>
              </div>

              <Link href="/contact" onClick={() => closeMobileMenu('contact')} className="mt-5 flex min-h-11 items-center justify-center text-sm font-bold text-[#5a6d76] hover:text-[#08719b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">{NAVIGATION_COPY.contact[lang]}</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
