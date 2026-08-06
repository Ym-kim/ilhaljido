import type { Metadata } from 'next'
import { ProgramsHubView } from '@/components/programs/ProgramsHubView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /en/programs — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Programs — Workation, Global Stays & Market Research',
  description:
    'Explore Wakation programs: domestic workations in Korea, global stays, and market research trips. Stay-based growth experiences for people who work.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs',
    languages: cityLanguageAlternates('/programs'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Programs | Wakation',
    description: 'Domestic workations, global stays and market research trips — stay-based growth programs.',
    url: 'https://www.wakation.kr/en/programs',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function ProgramsPageEn() {
  return <ProgramsHubView forceLang="EN" />
}
