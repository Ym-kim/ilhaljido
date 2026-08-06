import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/programs/networking — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: '一人起業家ネットワーキングワーケーション',
  description:
    'フリーランス・一人起業家・創業者のためのネットワーキングワーケーション。同じ悩みを持つ仲間とつながるプログラムをご案内。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/networking',
    languages: cityLanguageAlternates('/programs/networking'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '一人起業家ネットワーキングワーケーション | Wakation',
    description: 'フリーランス・一人起業家・創業者のためのネットワーキングワーケーション。',
    url: 'https://www.wakation.kr/ja/programs/networking',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function NetworkingPageJa() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.networking} forceLang="JP" />
}
