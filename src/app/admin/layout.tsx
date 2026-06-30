import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '관리자',
  robots: { index: false, follow: false },
}

// Admin은 일반 Navbar/Footer 없이 독립 레이아웃
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
