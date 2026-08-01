import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '비자·체류 가이드',
  description: '국가, 체류 목적, 기간을 선택해 확인할 사항을 정리하고 이민국·외무부 공식 출처를 함께 확인하세요.',
  alternates: { canonical: 'https://www.wakation.kr/visa-ai' },
}

export default function VisaGuideLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
