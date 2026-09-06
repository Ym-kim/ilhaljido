'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu } from 'lucide-react'

import { Logo } from '@/components/brand/Logo'

const CORE_LINKS = [
  { href: '/zh/select', label: '旅行准备' },
  { href: '/zh/select/hotel', label: '住宿' },
  { href: '/zh/select/hotel/pilot', label: '实时房价' },
  { href: '/zh/programs/china-market-research', label: '中国市场考察' },
] as const

const LOCALIZED_PATHS = new Set([
  '/',
  '/select',
  '/select/hotel',
  '/select/hotel/pilot',
  '/programs/china-market-research',
])

function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(?:zh|en|ja)(?=\/|$)/, '')
  return stripped || '/'
}

function languageHref(pathname: string, locale: 'KO' | 'EN' | 'JP' | 'ZH'): string {
  const base = stripLocale(pathname)
  const safeBase = LOCALIZED_PATHS.has(base) ? base : '/'
  if (locale === 'KO') return safeBase
  const prefix = locale === 'ZH' ? '/zh' : locale === 'JP' ? '/ja' : '/en'
  return safeBase === '/' ? prefix : `${prefix}${safeBase}`
}

export function ChineseNavbar({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname()
  const shell = transparent
    ? 'border-white/10 bg-[#071723]/68 text-white backdrop-blur-xl'
    : 'border-[#e5eaeb] bg-white/96 text-[#17313e] shadow-[0_7px_30px_rgba(8,38,52,.07)] backdrop-blur-xl'

  return (
    <nav aria-label="主导航" className={`fixed inset-x-0 top-0 z-[70] border-b ${shell}`}>
      <div className="mx-auto flex h-16 max-w-[86rem] items-center justify-between gap-4 px-4 sm:px-6">
        <Logo homeHref="/zh" variant={transparent ? 'light' : 'dark'} />

        <div className="hidden items-center gap-1 lg:flex">
          {CORE_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-bold transition hover:bg-sky-500/10 hover:text-sky-500">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <details className="group relative">
            <summary className={`flex min-h-10 cursor-pointer list-none items-center gap-1 rounded-full border px-3 text-xs font-black [&::-webkit-details-marker]:hidden ${transparent ? 'border-white/25' : 'border-[#dce4e6]'}`}>
              简中 <ChevronDown className="h-3 w-3 transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.5rem)] grid w-28 gap-1 rounded-xl border border-[#e2e8e9] bg-white p-1.5 text-[#536770] shadow-xl">
              {([
                ['KO', '한국어'],
                ['EN', 'English'],
                ['JP', '日本語'],
                ['ZH', '简体中文'],
              ] as const).map(([locale, label]) => (
                <Link key={locale} href={languageHref(pathname, locale)} className={`flex min-h-10 items-center rounded-lg px-3 text-xs font-black hover:bg-[#f2f6f6] ${locale === 'ZH' ? 'bg-[#eaf6fb] text-[#08719b]' : ''}`}>
                  {label}
                </Link>
              ))}
            </div>
          </details>

          <details className="group relative lg:hidden">
            <summary aria-label="打开菜单" className={`flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full [&::-webkit-details-marker]:hidden ${transparent ? 'hover:bg-white/10' : 'hover:bg-[#eef4f5]'}`}>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.5rem)] grid w-[min(19rem,calc(100vw-2rem))] gap-1 rounded-2xl border border-[#e2e8e9] bg-white p-3 text-[#233d48] shadow-2xl">
              {CORE_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="flex min-h-12 items-center rounded-xl px-4 text-sm font-black hover:bg-[#eef7f9] hover:text-[#08719b]">
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </nav>
  )
}

export function ChineseFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#08131a] px-6 py-14 text-white/65">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo homeHref="/zh" variant="light" />
          <p className="mt-5 max-w-md text-sm font-medium leading-7">为工作中的人整理住宿、出行与在地体验。公开信息与实际运营记录会明确区分。</p>
        </div>
        <div>
          <h2 className="text-xs font-black tracking-[0.14em] text-white">开始规划</h2>
          <div className="mt-4 grid gap-3 text-sm font-semibold">
            {CORE_LINKS.slice(0, 3).map((item) => <Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-black tracking-[0.14em] text-white">信息与联系</h2>
          <div className="mt-4 grid gap-3 text-sm font-semibold">
            <Link href="/zh/programs/china-market-research" className="hover:text-white">中国市场考察</Link>
            <Link href="/privacy" className="hover:text-white">隐私政策（韩文）</Link>
            <Link href="/terms" className="hover:text-white">使用条款（韩文）</Link>
            <span className="break-all">wakation.sf@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs leading-6 text-white/42">
        <p>Wakation 仅提供旅行信息整理与搜索辅助。预订、付款、取消及退款均以合作伙伴页面的最终条款为准。</p>
        <p className="mt-2">© 2026 STAYFORWARD Co., Ltd. · Wakation</p>
      </div>
    </footer>
  )
}
