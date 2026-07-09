import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '어학연수 워케이션',
  description: '세부·도쿄·몰타·밴쿠버에서 일하며 배우는 어학연수 워케이션. 목적지별 숙소·프로그램을 안내합니다.',
  keywords: ['어학연수 워케이션', '세부 어학연수', '워홀 어학', '해외 어학연수'],
  robots: { index: true, follow: true },
}

export default function LanguageLayout({ children }: { children: React.ReactNode }) {
  return children
}
