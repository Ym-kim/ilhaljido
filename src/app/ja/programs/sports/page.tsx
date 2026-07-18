import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

// /ja/programs/sports — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: 'スポーツ観戦ワーケーション',
  description:
    'スポーツ観戦と組み合わせたワーケーション。釜山・東京ドームなど観戦日程に合わせた滞在とリモートワークをご案内。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/sports',
    languages: cityLanguageAlternates('/programs/sports'),
  },
  openGraph: {
    title: 'スポーツ観戦ワーケーション | Wakation',
    description: 'スポーツ観戦と組み合わせたワーケーション — 釜山・東京ドームなど観戦日程に合わせた滞在。',
    url: 'https://www.wakation.kr/ja/programs/sports',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function SportsPageJa() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.sports} forceLang="JP" />
}
