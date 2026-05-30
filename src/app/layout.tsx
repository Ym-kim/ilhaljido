import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { AuthProvider } from '@/context/AuthContext'
import { SiteNavbar } from '@/components/layout/SiteNavbar'
import { MainContent } from '@/components/layout/MainContent'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Wakation — Stay. Work. Grow.',
  description: '일하는 사람을 위한 글로벌 체류형 성장 플랫폼. 국내외 워케이션·성장캠프·비자 AI를 하나의 플랫폼에서.',
  keywords: '워케이션, 워크케이션, 프리랜서, 1인기업가, 제주, 강원, 성장캠프',
  openGraph: {
    title: 'Wakation — Stay. Work. Grow.',
    description: '일하는 사람을 위한 글로벌 체류형 성장 플랫폼',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-full bg-[#0f0f0f] text-[#141414] antialiased flex flex-col">
        <LanguageProvider>
          <AuthProvider>
            <SiteNavbar />
            <MainContent>{children}</MainContent>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
