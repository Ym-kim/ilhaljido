import type { Metadata } from 'next'
import { cityLanguageAlternates } from '@/lib/cities'

export const metadata: Metadata = {
  title: '숙소 예약 | Wakation Select',
  description:
    '도쿄·오사카·후쿠오카·다낭·발리·리스본·제주. 워케이션 목적지별 숙소를 Booking.com과 Trip.com으로 바로 검색하세요.',
  keywords: ['워케이션 숙소', '해외 장기체류', 'Booking.com', '도쿄 숙소', '발리 숙소', '다낭 숙소'],
  alternates: {
    canonical: 'https://www.wakation.kr/select/hotel',
    languages: cityLanguageAlternates('/select/hotel'),
  },
  robots: { index: true, follow: true },
}

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return children
}
