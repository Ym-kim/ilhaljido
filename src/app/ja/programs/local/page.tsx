import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

// /ja/programs/local — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: 'グルメ・ローカルワーケーション',
  description:
    '現地グルメとローカル文化を体験するワーケーション。全州・大阪などのフードツアー・ローカル体験と一緒に楽しむプログラムをご案内。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/local',
    languages: cityLanguageAlternates('/programs/local'),
  },
  openGraph: {
    title: 'グルメ・ローカルワーケーション | Wakation',
    description: '現地グルメとローカル文化を体験するワーケーション — フードツアー・ローカル体験。',
    url: 'https://www.wakation.kr/ja/programs/local',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function LocalPageJa() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.local} forceLang="JP" />
}
