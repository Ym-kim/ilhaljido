import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '문의',
  description: 'Wakation에 문의하세요. 프로그램 참가, 제휴, 공간 제공 등 다양한 문의를 환영합니다. 이메일: wakation.sf@gmail.com',
  openGraph: {
    title: '문의 | Wakation',
    description: 'Wakation에 문의하세요.',
    url: 'https://www.wakation.kr/contact',
  },
  alternates: { canonical: 'https://www.wakation.kr/contact' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
