import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '코워킹·업무공간',
  description: '워케이션에 최적화된 코워킹·업무공간 안내. 안정적인 Wi-Fi와 집중 환경을 갖춘 공간을 목적지별로 소개합니다.',
  keywords: ['코워킹', '업무공간', '워케이션 오피스', '디지털 노마드 공간'],
  robots: { index: true, follow: true },
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return children
}
