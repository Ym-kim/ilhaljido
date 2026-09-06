'use client'

import { usePathname } from 'next/navigation'
import { useAnnounce } from '@/context/AnnounceContext'
import { cn } from '@/lib/utils'

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { visible } = useAnnounce()
  const isHome = pathname === '/' || pathname === '/en' || pathname === '/ja' || pathname === '/zh'
  const isChinese = pathname === '/zh' || pathname.startsWith('/zh/')

  return (
    <div className={cn('flex-1', !isHome && (isChinese ? 'pt-16' : visible ? 'pt-[100px]' : 'pt-16'))}>
      {children}
    </div>
  )
}
