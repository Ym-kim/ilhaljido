import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI·성장 콘텐츠',
  description: '워케이션과 함께하는 AI·성장 콘텐츠. 실무 자동화, 생산성, 마케팅까지 이동 중에도 성장하는 학습 큐레이션.',
  keywords: ['AI 콘텐츠', '성장 학습', '업무 자동화', '생산성'],
  robots: { index: true, follow: true },
}

export default function GrowthLayout({ children }: { children: React.ReactNode }) {
  return children
}
