import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '워케이션 공간 인프라',
  description: '국내외 워케이션 공간과 코워킹·코리빙 인프라 안내. 일하기 좋은 업무공간을 목적지별로 소개합니다.',
  keywords: ['워케이션 공간', '코워킹', '코리빙', '업무공간'],
  // alternates 미정의 시 루트 canonical(홈) 상속 — 자기 자신을 홈의 중복으로 선언하게 됨
  alternates: { canonical: 'https://www.wakation.kr/infrastructure' },
  robots: { index: true, follow: true },
}

export default function InfrastructureLayout({ children }: { children: React.ReactNode }) {
  return children
}
