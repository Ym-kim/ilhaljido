import type { Metadata } from 'next'
import { ProgramsHubView } from '@/components/programs/ProgramsHubView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/programs — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: 'プログラム — ワーケーション・海外滞在・市場調査',
  description:
    '韓国国内ワーケーション、グローバル滞在、市場調査団などWakationの多彩なプログラム。働く人のための新しい滞在型成長体験。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs',
    languages: cityLanguageAlternates('/programs'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'プログラム | Wakation',
    description: '国内ワーケーション、グローバル滞在、市場調査団など多彩な滞在型成長プログラム。',
    url: 'https://www.wakation.kr/ja/programs',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function ProgramsPageJa() {
  return <ProgramsHubView forceLang="JP" />
}
