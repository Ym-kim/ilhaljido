import type { Metadata } from 'next'
import { MarketProgramsView } from '@/components/programs/MarketProgramsView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /en/programs/market — 영어 정적 로케일 라우트

export const metadata: Metadata = {
  title: 'Market Research Trips — Trade Fairs & B2B Networking',
  description:
    'Field research and networking at overseas trade fairs and markets. Hands-on global programs for founders, marketers and trade professionals.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/market',
    languages: cityLanguageAlternates('/programs/market'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Market Research Trips | Wakation',
    description: 'Research and network first-hand at overseas trade fairs and markets.',
    url: 'https://www.wakation.kr/en/programs/market',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function MarketPageEn() {
  return <MarketProgramsView forceLang="EN" />
}
