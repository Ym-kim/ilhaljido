'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export function SiteNavbar() {
  const pathname = usePathname()
  const transparent = pathname === '/' || pathname === '/en' || pathname === '/ja'

  return <Navbar transparent={transparent} />
}
