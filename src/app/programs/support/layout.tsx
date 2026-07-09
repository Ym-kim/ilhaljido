import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '지자체 워케이션 지원사업 | Wakation',
  description: '제주·부산·강원 등 지자체 워케이션 지원사업을 한눈에. 숙박비 지원·체험 프로그램 등 공식 공고를 정리했습니다.',
  keywords: ['워케이션 지원사업', '지자체 지원', '제주 워케이션 지원', '숙박비 지원'],
  robots: { index: true, follow: true },
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children
}
