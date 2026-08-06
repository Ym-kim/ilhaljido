import type { Metadata } from 'next'
import { MomentsView } from '@/components/moments/MomentsView'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

const languages = {
  ko: 'https://www.wakation.kr/moments',
  en: 'https://www.wakation.kr/en/moments',
  ja: 'https://www.wakation.kr/ja/moments',
  'x-default': 'https://www.wakation.kr/moments',
}

export const metadata: Metadata = {
  title: 'ワーケーションモーメント — エディターが選んだ瞬間',
  description:
    '東京・バリ・ダナン・チェンマイ・済州 — ワーケーションの決定的瞬間を縦型ショートで。エディター厳選のモーメント。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'ワーケーションモーメント | Wakation',
    description: 'ワーケーションの決定的瞬間 — エディター厳選の行き先インスピレーション。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function MomentsPageJa() {
  return <MomentsView forceLang="JP" />
}
