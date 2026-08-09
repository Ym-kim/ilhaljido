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
import { WishlistToast } from '@/components/affiliate/WishlistToast'
import { LocaleDocument } from '@/components/layout/LocaleDocument'
import { MotionRuntime } from '@/components/motion/MotionRuntime'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wakation.kr'),
  title: {
    // 한글 브랜드 표기 '와케이션' 병기 — 네이버 브랜드 검색 매칭용 (2026-08-05, 미병기 시 '와케이션' 쿼리에 매칭 텍스트가 없어 미노출)
    default: '와케이션 Wakation | 일하고 쉬고 성장하는 워케이션 플랫폼',
    template: '%s | Wakation',
  },
  // 2026-07-28 라이프스타일 개편: 사업 나열형 → 브랜드 카피 정렬 (공유 미리보기가 첫인상)
  description: '와케이션(Wakation) — 일도 여행도, 내 방식대로. 공개 정보와 실제 운영 기록을 구분해 일하는 사람의 여행을 큐레이션합니다.',
  keywords: ['와케이션', 'Wakation', '워케이션', '국내 워케이션', '글로벌 워케이션', '디지털 노마드', '리모트워크', '프리랜서 워케이션', '한달살기', '어학연수', '비자 정보', '장기체류', '코워킹', '성장캠프', '네트워킹'],
  authors: [{ name: 'Wakation', url: 'https://www.wakation.kr' }],
  creator: 'Wakation',
  publisher: 'Wakation',
  openGraph: {
    title: 'Wakation | 일도 여행도, 내 방식대로',
    description: '이번 주말의 제주부터 한 달의 치앙마이까지 — 공개 정보와 실제 운영 기록을 구분해 여행을 큐레이션합니다.',
    url: 'https://www.wakation.kr',
    siteName: 'Wakation',
    locale: 'ko_KR',
    type: 'website',
    // 기본 공유 썸네일 (1200×630) — 카톡·라인·페북·슬랙 링크 미리보기
    images: [
      {
        url: 'https://www.wakation.kr/og-wakation-ai.jpeg',
        width: 1200,
        height: 630,
        alt: 'Wakation — 일도 여행도, 내 방식대로',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wakation | 일도 여행도, 내 방식대로',
    description: '이번 주말의 제주부터 한 달의 치앙마이까지 — 공개 정보와 실제 운영 기록을 구분해 여행을 큐레이션합니다.',
    creator: '@wakation_kr',
    images: ['https://www.wakation.kr/og-wakation-ai.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://www.wakation.kr',
    // 홈 hreflang 상호 선언 — EN·JA 홈은 자체 선언 중인데 KO 홈만 미참여였음(클러스터 불완전, 일본 구글 노출 준비)
    // 자체 alternates 정의 페이지는 이 값을 통째로 override하므로 영향 없음 (라이브 canonical 4곳 실측 확인)
    languages: {
      ko: 'https://www.wakation.kr',
      en: 'https://www.wakation.kr/en',
      ja: 'https://www.wakation.kr/ja',
      'x-default': 'https://www.wakation.kr',
    },
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
  alternateName: ['와케이션', 'StayForward Co., Ltd.'],
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

// 사이트 구조화데이터 — 브랜드명 '와케이션'(한글 표기) 검색 매칭 시그널 (2026-08-05)
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Wakation',
  alternateName: '와케이션',
  url: 'https://www.wakation.kr',
  inLanguage: ['ko', 'en', 'ja'],
  publisher: { '@type': 'Organization', name: 'Wakation', legalName: '주식회사 스테이포워드' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleDocument organizationJsonLd={JSON.stringify([organizationJsonLd, websiteJsonLd])}>
      <MotionRuntime />
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
            {/* 위시리스트 하트 토스트 (Airbnb 벤치) */}
            <WishlistToast />
          </AnnounceProvider>
        </AuthProvider>
      </LanguageProvider>
    </LocaleDocument>
  )
}
