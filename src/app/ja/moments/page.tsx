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
  title: 'トラベラーノート — 行き先紹介と会員レビュー',
  description:
    'Wakation編集部による行き先紹介と、会員が実際の滞在をもとに書いたレビューを一つの場所で読めます。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'トラベラーノート — 行き先紹介と会員レビュー',
    description: '編集部の紹介から始まり、会員の率直な滞在レビューが積み重なるトラベラーノート。',
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
