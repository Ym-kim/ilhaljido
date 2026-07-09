import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서비스 소개',
  description: '주식회사 스테이포워드가 운영하는 워케이션 플랫폼 Wakation. 국내외 워케이션 프로그램, 숙소·업무공간·비자까지 한 곳에서 준비하세요.',
  keywords: ['워케이션', 'Wakation', '워케이션 플랫폼', '스테이포워드'],
  robots: { index: true, follow: true },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
