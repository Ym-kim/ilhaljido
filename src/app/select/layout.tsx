import type { Metadata } from 'next'
import { cityLanguageAlternates } from '@/lib/cities'

export const metadata: Metadata = {
  title: 'Wakation Select — 워케이션 준비 상품',
  description:
    '숙소 예약, 현지 체험, eSIM, 강의까지. 워케이션 출발 전 필요한 것들을 Wakation이 큐레이션합니다.',
  keywords: ['워케이션 준비', '해외 숙소', 'eSIM', '현지 체험', '온라인 강의', 'Wakation Select'],
  alternates: {
    canonical: 'https://www.wakation.kr/select',
    languages: cityLanguageAlternates('/select'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Wakation Select | 워케이션 준비 상품',
    description: '숙소·체험·eSIM·강의 — 워케이션 준비를 한곳에서.',
    url: 'https://www.wakation.kr/select',
  },
}

export default function SelectLayout({ children }: { children: React.ReactNode }) {
  return children
}
