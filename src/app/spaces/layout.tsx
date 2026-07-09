import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '워케이션 공간 검색',
  description: '지역별 워케이션 공간을 검색하세요. AI 추천으로 나에게 맞는 코워킹·숙소·업무공간을 찾아드립니다.',
  keywords: ['워케이션 공간 검색', '코워킹 검색', '업무공간 추천'],
  robots: { index: true, follow: true },
}

export default function SpacesLayout({ children }: { children: React.ReactNode }) {
  return children
}
