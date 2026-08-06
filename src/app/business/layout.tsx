import type { Metadata } from 'next'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const metadata: Metadata = {
  title: '기업·팀 워케이션',
  description:
    '팀 몰입과 리프레시를 동시에 — 기업·팀 단위 워케이션 기획 문의. 지자체 지원사업 연계 정보와 검증된 숙소·프로그램으로 도입을 돕습니다.',
  keywords: ['기업 워케이션', '팀 워케이션', '워케이션 도입', '워케이션 지원사업', '팀빌딩'],
  alternates: { canonical: 'https://www.wakation.kr/business' },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '기업·팀 워케이션 | Wakation',
    description: '팀 단위 워케이션 기획 문의 — 지자체 지원사업 연계 정보 제공.',
    url: 'https://www.wakation.kr/business',
    siteName: 'Wakation',
  },
  robots: { index: true, follow: true },
}

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children
}
