import type { Metadata } from 'next'
import { HotelSelectView } from '@/components/select/HotelSelectView'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/select/hotel — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Stays — Wakation Select',
  description:
    'Tokyo, Osaka, Fukuoka, Da Nang, Bali, Lisbon and Jeju — search workation stays by destination on Booking.com and Trip.com.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/select/hotel',
    languages: cityLanguageAlternates('/select/hotel'),
  },
  openGraph: {
    title: 'Stays | Wakation Select',
    description: 'Workation stays curated by destination — search on Booking.com and Trip.com.',
    url: 'https://www.wakation.kr/en/select/hotel',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function HotelSelectPageEn() {
  return <HotelSelectView forceLang="EN" />
}
