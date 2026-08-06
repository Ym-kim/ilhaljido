import type { Metadata } from 'next'
import { DomesticProgramsView } from '@/components/programs/DomesticProgramsView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /en/programs/domestic — 영어 정적 로케일 라우트

export const metadata: Metadata = {
  title: 'Korea Workation — Work & Grow in Local Hubs',
  description:
    'Starting with the Yangyang pilot, stay-based workation programs across Korea connecting work, rest, networking and growth — for freelancers, founders and remote workers.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/domestic',
    languages: cityLanguageAlternates('/programs/domestic'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Korea Workation | Wakation',
    description: 'Stay-based workation programs across Korea — work, rest, networking and growth in one.',
    url: 'https://www.wakation.kr/en/programs/domestic',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function DomesticPageEn() {
  return <DomesticProgramsView forceLang="EN" />
}
