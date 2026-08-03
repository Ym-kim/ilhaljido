import type { Metadata } from 'next'
import { StoriesHubView } from '@/components/editorial/StoriesHubView'

const languages = {
  ko: 'https://www.wakation.kr/stories',
  en: 'https://www.wakation.kr/en/stories',
  ja: 'https://www.wakation.kr/ja/stories',
  'x-default': 'https://www.wakation.kr/stories',
}

export const metadata: Metadata = {
  title: '旅のストーリー — 検証済みの事実で書くエディトリアル',
  description:
    'クルーズワーケーション、ローカル列車、新しい滞在地 — 検証済みの事実だけで取材するWakationエディトリアル。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    title: '旅のストーリー | Wakation',
    description: '新しい滞在地と移動のかたち — 検証済みの事実で書くワーケーションエディトリアル。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function StoriesPageJa() {
  return <StoriesHubView forceLang="JP" />
}
