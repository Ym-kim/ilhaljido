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
import { Analytics as GtagConsent } from '@/components/analytics/Analytics'

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
    // 기본 공유 썸네일 (1200×630) — 카톡·페북·슬랙 링크 미리보기
    images: [
      {
        url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Wakation — 일하는 곳이 휴가지가 되는 순간',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wakation | 일하고 쉬고 성장하는 워케이션 플랫폼',
    description: '국내외 워케이션, 성장캠프, 시장조사단, 어학·유학, 비자·체류 정보까지 일하는 사람을 위한 새로운 체류 플랫폼.',
    creator: '@wakation_kr',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&h=630&q=80'],
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
    // 네이버 + 아고다 제휴 자동인증 메타태그 병합 (env 설정 시에만 렌더)
    // 아고다: 파트너센터 사이트 등록 시 표시되는 토큰을 NEXT_PUBLIC_AGODA_SITE_VERIFICATION에 넣으면
    //         <meta name="agd-partner-manual-verification" content="…"> 자동 렌더 → Verify 클릭 시 자동 인증
    other: {
      ...(process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
        ? { 'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_AGODA_SITE_VERIFICATION
        ? { 'agd-partner-manual-verification': process.env.NEXT_PUBLIC_AGODA_SITE_VERIFICATION }
        : {}),
    },
  },
}

// 회사 구조화데이터 — 서치콘솔·네이버 등록 시 신뢰 시그널 (사업자 정보는 legal.ts와 동일)
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Wakation',
  legalName: '주식회사 스테이포워드',
  alternateName: 'StayForward Co., Ltd.',
  url: 'https://www.wakation.kr',
  logo: 'https://www.wakation.kr/icon.svg',
  description: '일하는 사람을 위한 체류·업무·성장 플랫폼. 국내외 워케이션, 성장캠프, 시장조사단, 어학·유학, 비자·체류 정보를 하나의 플랫폼에서 제공합니다.',
  foundingDate: '2026-04-24',
  taxID: '812-86-04005',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '송도미래로 30, 디동 1311-디18호 (송도 BRC 스마트밸리 지식산업센터)',
    addressLocality: '연수구',
    addressRegion: '인천광역시',
    addressCountry: 'KR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'wakation.sf@gmail.com',
    contactType: 'customer support',
    availableLanguage: ['Korean', 'English', 'Japanese'],
  },
  // 공식 채널 — 커뮤니티·메신저 (검색엔진에 동일 주체 신호)
  sameAs: ['https://cafe.naver.com/shcafa32', 'https://pf.kakao.com/_xiPxbXG'],
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
              {/* GA4 + 쿠키 동의 (NEXT_PUBLIC_GA_ID 설정 시에만 작동) */}
              <GtagConsent />
            </AnnounceProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
