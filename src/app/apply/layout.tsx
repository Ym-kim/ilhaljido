import type { Metadata } from 'next'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const metadata: Metadata = {
  title: '프로그램 신청',
  description: 'Wakation 프로그램에 신청하세요. 국내외 워케이션, 성장캠프, 시장조사단 등 다양한 프로그램 참가 신청.',
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '프로그램 신청 | Wakation',
    description: 'Wakation 프로그램에 신청하세요.',
    url: 'https://www.wakation.kr/apply',
  },
  alternates: { canonical: 'https://www.wakation.kr/apply' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
