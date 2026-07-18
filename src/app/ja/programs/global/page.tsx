import type { Metadata } from 'next'
import { GlobalProgramsView } from '@/components/programs/GlobalProgramsView'
import { cityLanguageAlternates } from '@/lib/cities'

// /ja/programs/global — 일본어 정적 로케일 라우트

export const metadata: Metadata = {
  title: 'グローバルワーケーション — 海外拠点でグローバルに成長',
  description:
    '海外滞在・リモートワーク・市場調査・展示会・語学留学をつなぐグローバルワーケーション。バリ・チェンマイ・東京・リスボンなど海外拠点で働き、成長しよう。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/global',
    languages: cityLanguageAlternates('/programs/global'),
  },
  openGraph: {
    title: 'グローバルワーケーション | Wakation',
    description: '海外滞在・リモートワーク・市場調査・展示会・語学留学をつなぐグローバルワーケーション。',
    url: 'https://www.wakation.kr/ja/programs/global',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function GlobalPageJa() {
  return <GlobalProgramsView forceLang="JP" />
}
