import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

// /ja/programs/healing — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: 'ヒーリング・ヨガワーケーション',
  description:
    'バリ・泰安のヒーリングワーケーション。ヨガ・瞑想・スパとともに働きながら回復するウェルネスプログラムをご案内。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/healing',
    languages: cityLanguageAlternates('/programs/healing'),
  },
  openGraph: {
    title: 'ヒーリング・ヨガワーケーション | Wakation',
    description: 'ヨガ・瞑想・スパとともに働きながら回復するウェルネスワーケーション。',
    url: 'https://www.wakation.kr/ja/programs/healing',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function HealingPageJa() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.healing} forceLang="JP" />
}
