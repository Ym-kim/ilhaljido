import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '워케이션 숙소 예약',
  description: '도쿄·오사카·다낭·발리·치앙마이 등 워케이션 목적지별 숙소를 Booking.com으로 바로 검색·예약하세요. 코워킹 내장·장기체류 특화 숙소 큐레이션.',
  keywords: ['워케이션 숙소', '장기체류 호텔', '코워킹 숙소', '해외 한달살기 숙소'],
  robots: { index: true, follow: true },
}

export default function StayLayout({ children }: { children: React.ReactNode }) {
  return children
}
