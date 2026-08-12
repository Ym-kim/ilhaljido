import type { Metadata } from 'next'
import { MiracleArticle } from '@/components/cruise/MiracleArticle'

const languages = {
  ko: 'https://www.wakation.kr/cruise/miracle',
  en: 'https://www.wakation.kr/en/cruise/miracle',
  ja: 'https://www.wakation.kr/ja/cruise/miracle',
  'x-default': 'https://www.wakation.kr/cruise/miracle',
}

export const metadata: Metadata = {
  title: '海の上の17時間 — 釜山-大阪クルーズワーケーションガイド',
  description:
    'パンスター・ミラクル号で行く移動型ワーケーション。ビュッフェ2食付き乗船券、衛星Wi-Fi、手荷物制限のないひと晩 — 釜山から大阪まで働きながら渡る方法。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    title: '海の上の17時間 — 釜山-大阪クルーズワーケーション | Wakation',
    description: 'パンスター・ミラクル号のワーケーションガイド。ビュッフェ2食・衛星Wi-Fi・手荷物ストレスゼロ。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
}

export default function MiracleCruisePageJa() {
  return <MiracleArticle lang="JP" />
}
