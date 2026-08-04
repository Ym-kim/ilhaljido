import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '와케이션(Wakation) 소개 — 머무는 시간을 일과 성장으로',
  description: '여행 발견부터 준비, Wakation Hosted 프로그램과 외부 제휴 상품의 차이, Wakation의 편집 원칙을 소개합니다.',
  alternates: { canonical: 'https://www.wakation.kr/about' },
}

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
