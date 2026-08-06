import type { Metadata } from 'next'
import { ActivitySelectView } from '@/components/select/ActivitySelectView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/select/activity — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: '現地体験・ツアー — Wakation Select',
  description:
    '日本・ベトナム・バリの現地ツアー、交通パス、入場券。KKdayパートナー商品でワーケーション体験を豊かに。',
  keywords: ['ワーケーション 体験', 'KKday', '日本 ツアー', 'ベトナム アクティビティ', 'バリ 体験', '交通パス'],
  alternates: {
    canonical: 'https://www.wakation.kr/ja/select/activity',
    languages: cityLanguageAlternates('/select/activity'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '現地体験・ツアー | Wakation Select',
    description: '現地ツアー・交通パス・入場券。KKday・Klookパートナーで目的地別の体験商品を。',
    url: 'https://www.wakation.kr/ja/select/activity',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function ActivitySelectPageJa() {
  return <ActivitySelectView forceLang="JP" />
}
