import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

// /ja/programs/golf — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: 'ゴルフネットワーキングワーケーション',
  description:
    '済州・沖縄のゴルフワーケーション。ラウンドとビジネスネットワーキングを組み合わせたプレミアムプログラムとティータイム予約をご案内。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/golf',
    languages: cityLanguageAlternates('/programs/golf'),
  },
  openGraph: {
    title: 'ゴルフネットワーキングワーケーション | Wakation',
    description: '済州・沖縄でラウンドとビジネスネットワーキングを組み合わせたプレミアムワーケーション。',
    url: 'https://www.wakation.kr/ja/programs/golf',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function GolfPageJa() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.golf} forceLang="JP" />
}
