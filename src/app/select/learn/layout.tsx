import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '강의·학습 | Wakation Select',
  description:
    'AI 자동화, 마케팅, 생산성, 개발, 언어. 워케이션 중 성장하는 인프런 파트너 강의 카테고리.',
  keywords: ['인프런', '온라인 강의', 'AI 강의', '마케팅 강의', '워케이션 중 공부', '개발 강의'],
  robots: { index: true, follow: true },
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children
}
