'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { ChineseNavbar } from '@/components/zh/ChineseSiteChrome'

export function SiteNavbar() {
  const pathname = usePathname()
  if (pathname === '/zh' || pathname.startsWith('/zh/')) {
    return <ChineseNavbar transparent={pathname === '/zh'} />
  }
  const transparent = pathname === '/' || pathname === '/en' || pathname === '/ja'

  return <Navbar transparent={transparent} />
}
