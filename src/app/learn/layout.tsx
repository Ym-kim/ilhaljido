import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '일과 성장을 위한 실무 강의',
  description: '워케이션 중 부담 없이 이어갈 업무 자동화, 콘텐츠, 1인 비즈니스 학습 흐름과 현재 확인 가능한 제휴 강의를 살펴보세요.',
  alternates: { canonical: 'https://www.wakation.kr/learn' },
}

export default function LearnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
