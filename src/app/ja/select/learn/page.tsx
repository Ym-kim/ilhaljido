import type { Metadata } from 'next'
import { LearnSelectView } from '@/components/select/LearnSelectView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/select/learn — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: '講座・学習 — Wakation Select',
  description:
    'AI自動化、マーケティング、生産性、開発、言語。ワーケーション中に成長するInflearnパートナー講座カテゴリー。',
  keywords: ['Inflearn', 'オンライン講座', 'AI 講座', 'マーケティング 講座', 'ワーケーション 勉強', '開発 講座'],
  alternates: {
    canonical: 'https://www.wakation.kr/ja/select/learn',
    languages: cityLanguageAlternates('/select/learn'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '講座・学習 | Wakation Select',
    description: 'ワーケーションの空き時間をInflearnのオンライン講座で — AI・マーケティング・生産性・開発・言語。',
    url: 'https://www.wakation.kr/ja/select/learn',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function LearnSelectPageJa() {
  return <LearnSelectView forceLang="JP" />
}
