'use client'

import { usePathname } from 'next/navigation'
import { useAnnounce } from '@/context/AnnounceContext'
import { cn } from '@/lib/utils'

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { visible } = useAnnounce()
  const isHome = pathname === '/'

  return (
    <div className={cn('flex-1', !isHome && (visible ? 'pt-[100px]' : 'pt-16'))}>
      {children}
    </div>
  )
}
