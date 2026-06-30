import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '시장조사단',
  description: '해외 박람회·시장 현장에서 직접 조사하고 네트워킹하는 시장조사단 프로그램. 창업자·마케터·무역 종사자를 위한 실전형 해외 탐방.',
  keywords: ['시장조사단', '해외 박람회', '해외 시장조사', '창업자 해외탐방', '무역 박람회', '글로벌 네트워킹'],
  openGraph: {
    title: '시장조사단 | Wakation',
    description: '해외 박람회·시장 현장에서 직접 조사하고 네트워킹하는 시장조사단 프로그램.',
    url: 'https://www.wakation.kr/programs/market',
  },
  alternates: { canonical: 'https://www.wakation.kr/programs/market' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
