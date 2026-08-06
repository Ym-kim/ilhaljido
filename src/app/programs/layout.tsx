import type { Metadata } from 'next'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const metadata: Metadata = {
  title: '프로그램',
  description: 'Wakation의 국내 워케이션, 글로벌 체류, 시장조사단 등 다양한 프로그램을 둘러보세요. 일하는 사람을 위한 새로운 체류·성장 경험.',
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '프로그램 | Wakation',
    description: '국내 워케이션, 글로벌 체류, 시장조사단 등 다양한 프로그램.',
    url: 'https://www.wakation.kr/programs',
  },
  alternates: {
    canonical: 'https://www.wakation.kr/programs',
    languages: cityLanguageAlternates('/programs'),
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
