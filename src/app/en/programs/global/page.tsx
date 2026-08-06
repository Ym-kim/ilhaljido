import type { Metadata } from 'next'
import { GlobalProgramsView } from '@/components/programs/GlobalProgramsView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /en/programs/global — 영어 정적 로케일 라우트

export const metadata: Metadata = {
  title: 'Global Workation — Grow Globally from Abroad Hubs',
  description:
    'Global workation connecting overseas stays, remote work, market research, trade fairs and language programs. Work and grow from Japan, Southeast Asia, Europe and beyond.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/global',
    languages: cityLanguageAlternates('/programs/global'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Global Workation | Wakation',
    description: 'Overseas stays, remote work, market research, trade fairs and language programs — all connected.',
    url: 'https://www.wakation.kr/en/programs/global',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function GlobalPageEn() {
  return <GlobalProgramsView forceLang="EN" />
}
