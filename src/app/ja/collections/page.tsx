import type { Metadata } from 'next'
import { CollectionsHub } from '@/components/affiliate/CollectionsHub'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/collections — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN와 상호 연결)

export const metadata: Metadata = {
  title: 'ワーケーション特集 — テーマ別キュレーション',
  description:
    '東京・バリ・チェンマイ・日本の温泉町など。宿・体験・eSIM・航空券を目的地テーマでまとめたワーケーション特集。ひとつの画面で準備完了。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/collections',
    languages: cityLanguageAlternates('/collections'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'ワーケーション特集 | Wakation',
    description: '宿・体験・eSIM・航空券を目的地テーマでまとめて、ワーケーション準備をひとつの画面で。',
    url: 'https://www.wakation.kr/ja/collections',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function CollectionsPageJa() {
  return <CollectionsHub forceLang="JP" />
}
