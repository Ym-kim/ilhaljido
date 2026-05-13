'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/#how', label: '이용방법' },
  { href: '/programs', label: '프로그램' },
  { href: '/apply', label: '신청하기' },
  { href: '/#faq', label: 'FAQ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navBg = isHome
    ? scrolled
      ? 'bg-white/97 border-border shadow-sm'
      : 'bg-dark/75 border-white/10 backdrop-blur-lg'
    : 'bg-white border-border shadow-sm'

  const textColor = (isHome && !scrolled) ? 'text-white/80' : 'text-muted'
  const logoColor = (isHome && !scrolled) ? 'text-white' : 'text-brand'

  return (
    <>
      <nav className={cn('fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-[6%] h-16 border-b transition-all duration-300', navBg)}>
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-brand-mid to-brand flex items-center justify-center text-white text-sm font-black">일</span>
          <span className={cn('text-lg font-black tracking-tight transition-colors', logoColor)}>일할지도</span>
        </Link>

        <ul className="hidden md:flex items-center gap-7 list-none">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn('text-sm font-medium no-underline hover:text-brand transition-colors', textColor)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/apply">프로그램 신청</Link>
          </Button>
          <button
            className={cn('md:hidden p-1', textColor)}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-dark/95 pt-16 flex flex-col px-6 gap-6 md:hidden">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xl font-bold text-white no-underline hover:text-brand-mid"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="lg" className="mt-4">
            <Link href="/apply" onClick={() => setMobileOpen(false)}>프로그램 신청</Link>
          </Button>
        </div>
      )}
    </>
  )
}
