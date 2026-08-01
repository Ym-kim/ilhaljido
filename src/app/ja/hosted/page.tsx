import type { Metadata } from 'next'
import { HostedLandingView } from '@/components/hosted/HostedLandingView'

const languages = {
  ko: 'https://www.wakation.kr/hosted',
  en: 'https://www.wakation.kr/en/hosted',
  ja: 'https://www.wakation.kr/ja/hosted',
  'x-default': 'https://www.wakation.kr/hosted',
}

export const metadata: Metadata = {
  title: 'Hostedプログラム オープン通知',
  description: 'Wakation直営の韓国ワーケーション、日本市場リサーチ、語学滞在、起業家キャンプ。日程と条件が確定したら先にお知らせします。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    title: '次のワーケーションを、募集前から見つける',
    description: '関心分野を選ぶと、実際の日程と条件が確定した後に先にお知らせします。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
    type: 'website',
    images: [{ url: '/media/brand-models/hosted-models-h-i-coastal-planning-v2.webp', width: 1440, height: 900, alt: '海辺の共同ワークスペースで滞在プランを一緒に確認する2人の旅人' }],
  },
  robots: { index: true, follow: true },
}

export default function HostedPageJa() {
  return <HostedLandingView forceLang="JP" />
}
