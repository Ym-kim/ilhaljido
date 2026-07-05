import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { AuthProvider } from '@/context/AuthContext'
import { AnnounceProvider } from '@/context/AnnounceContext'
import { SiteNavbar } from '@/components/layout/SiteNavbar'
import { MainContent } from '@/components/layout/MainContent'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wakation.kr'),
  title: {
    default: 'Wakation | 일하고 쉬고 성장하는 워케이션 플랫폼',
    template: '%s | Wakation',
  },
  description: '국내외 워케이션, 성장캠프, 시장조사단, 어학·유학, 비자·체류 정보까지 일하는 사람을 위한 새로운 체류 플랫폼.',
  keywords: ['워케이션', '국내 워케이션', '글로벌 워케이션', '디지털 노마드', '리모트워크', '프리랜서 워케이션', '시장조사단', '어학연수', '비자 정보', '장기체류', '코워킹', '성장캠프', '네트워킹'],
  authors: [{ name: 'Wakation', url: 'https://www.wakation.kr' }],
  creator: 'Wakation',
  publisher: 'Wakation',
  openGraph: {
    title: 'Wakation | 일하고 쉬고 성장하는 워케이션 플랫폼',
    description: '국내외 워케이션, 성장캠프, 시장조사단, 어학·유학, 비자·체류 정보까지 일하는 사람을 위한 새로운 체류 플랫폼.',
    url: 'https://www.wakation.kr',
    siteName: 'Wakation',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wakation | 일하고 쉬고 성장하는 워케이션 플랫폼',
    description: '국내외 워케이션, 성장캠프, 시장조사단, 어학·유학, 비자·체류 정보까지 일하는 사람을 위한 새로운 체류 플랫폼.',
    creator: '@wakation_kr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://www.wakation.kr',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
      ? { 'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION }
      : undefined,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Wakation',
  url: 'https://www.wakation.kr',
  logo: 'https://www.wakation.kr/icon.svg',
  description: '일하는 사람을 위한 체류·업무·성장 플랫폼. 국내외 워케이션, 성장캠프, 시장조사단, 어학·유학, 비자·체류 정보를 하나의 플랫폼에서 제공합니다.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'wakation.sf@gmail.com',
    contactType: 'customer support',
    availableLanguage: '한국어',
  },
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[#0f0f0f] text-[#141414] antialiased flex flex-col">
        <LanguageProvider>
          <AuthProvider>
            <AnnounceProvider>
              <SiteNavbar />
              <MainContent>{children}</MainContent>
              <Footer />
              <Analytics />
              <SpeedInsights />
            </AnnounceProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
