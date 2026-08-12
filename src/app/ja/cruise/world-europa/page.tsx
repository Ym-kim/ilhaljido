import type { Metadata } from 'next'
import { WorldEuropaArticle } from '@/components/cruise/WorldEuropaArticle'

const languages = {
  ko: 'https://www.wakation.kr/cruise/world-europa',
  en: 'https://www.wakation.kr/en/cruise/world-europa',
  ja: 'https://www.wakation.kr/ja/cruise/world-europa',
  'x-default': 'https://www.wakation.kr/cruise/world-europa',
}

export const metadata: Metadata = {
  title: '真冬のカリブワーケーション — MSCワールド・エウローパ ガイド',
  description:
    '冬にカリブ海8日間。MSC船団最大・初のLNGフラッグシップ、スターリンクWi-Fi、マルティニーク母港 — MSCワールド・エウローパのクルーズワーケーション完全ガイド。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    title: '真冬のカリブワーケーション — MSCワールド・エウローパ | Wakation',
    description: '21万トンLNGフラッグシップで過ごすカリブ8日。スターリンクWi-Fi・ダイニング13カ所・冬季カリブ母港。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
}

export default function WorldEuropaCruisePageJa() {
  return <WorldEuropaArticle lang="JP" />
}
