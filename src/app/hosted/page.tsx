import type { Metadata } from 'next'
import { HostedLandingView } from '@/components/hosted/HostedLandingView'

const languages = {
  ko: 'https://www.wakation.kr/hosted',
  en: 'https://www.wakation.kr/en/hosted',
  ja: 'https://www.wakation.kr/ja/hosted',
  'x-default': 'https://www.wakation.kr/hosted',
}

export const metadata: Metadata = {
  title: '다음 워케이션 오픈 알림',
  description: 'Wakation이 직접 기획·운영하는 국내 워케이션, 일본 시장 리서치, 어학 체류와 창업가 캠프의 다음 일정을 먼저 받아보세요.',
  alternates: { canonical: languages.ko, languages },
  openGraph: {
    title: '다음 워케이션, 열리기 전에 만나보세요',
    description: '관심 분야를 고르면 일정과 조건이 확정된 뒤 먼저 알려드립니다.',
    url: languages.ko,
    siteName: 'Wakation',
    locale: 'ko_KR',
    alternateLocale: ['en_US', 'ja_JP'],
    type: 'website',
    images: [{ url: '/media/brand-models/hosted-models-h-i-coastal-planning-v2.webp', width: 1440, height: 900, alt: '해안 공동 작업 공간에서 함께 체류 일정을 살펴보는 두 여행자' }],
  },
  robots: { index: true, follow: true },
}

export default function HostedPage() {
  return <HostedLandingView forceLang="KO" />
}
