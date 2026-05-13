import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: '일할지도 — 일하고 배우고 여행까지',
  description: '1인 기업가·프리랜서를 위한 AI 워케이션 통합 플랫폼. 업무 공간 + 성장 프로그램 + 로컬 힐링을 하나의 경험으로.',
  keywords: ['워케이션', '일할지도', '1인 기업가', '프리랜서', '원격근무', '워크케이션'],
  openGraph: {
    title: '일할지도 — 일하고 배우고 여행까지',
    description: '1인 기업가·프리랜서를 위한 AI 워케이션 통합 플랫폼',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
