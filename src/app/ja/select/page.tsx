import type { Metadata } from 'next'
import { SelectHubView } from '@/components/select/SelectHubView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/select — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: 'Wakation Select — ワーケーションの準備をここひとつで',
  description:
    '宿の予約から現地体験、eSIM、オンライン講座まで。ワーケーションに合う提携サービスを目的地別にキュレーション。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/select',
    languages: cityLanguageAlternates('/select'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Wakation Select | ワーケーション準備',
    description: '宿·体験·eSIM·講座 — ワーケーションの準備をひとつの場所で。',
    url: 'https://www.wakation.kr/ja/select',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function SelectPageJa() {
  return <SelectHubView forceLang="JP" />
}
