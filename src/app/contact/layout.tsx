import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '문의',
  description: 'Wakation 프로그램, 기업·파트너십, 공간 등록, 미디어, 외부 링크 오류 문의 채널을 안내합니다.',
  alternates: { canonical: 'https://www.wakation.kr/contact' },
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
