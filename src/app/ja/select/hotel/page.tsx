import type { Metadata } from 'next'
import { HotelSelectView } from '@/components/select/HotelSelectView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/select/hotel — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: '宿の予約 — Wakation Select',
  description:
    '東京·大阪·福岡·ダナン·バリ·リスボン·済州。ワーケーション目的地別の宿をBooking.comとTrip.comですぐ検索。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/select/hotel',
    languages: cityLanguageAlternates('/select/hotel'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '宿の予約 | Wakation Select',
    description: 'ワーケーション目的地別の宿キュレーション — Booking.com·Trip.comで検索。',
    url: 'https://www.wakation.kr/ja/select/hotel',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function HotelSelectPageJa() {
  return <HotelSelectView forceLang="JP" />
}
