import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '성장·학습 워케이션',
  description: '워케이션 중 성장하는 학습 프로그램. AI 자동화·마케팅·생산성 강의와 함께 일과 배움을 병행하세요.',
  keywords: ['학습 워케이션', '성장 프로그램', 'AI 강의', '온라인 강의'],
  robots: { index: true, follow: true },
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children
}
