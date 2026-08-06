import type { Metadata } from 'next'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

export const metadata: Metadata = {
  title: '글로벌 워케이션',
  description: '해외 체류, 리모트워크, 시장조사, 박람회, 어학·유학 프로그램을 연결하는 글로벌 워케이션. 일본·동남아·유럽 등 해외에서 일하고 성장하세요.',
  keywords: ['글로벌 워케이션', '해외 워케이션', '해외 체류', '리모트워크 해외', '디지털 노마드', '해외 어학연수', '해외 시장조사', '발리 워케이션', '일본 워케이션'],
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '글로벌 워케이션 | Wakation',
    description: '해외 체류, 리모트워크, 시장조사, 박람회, 어학·유학 프로그램을 연결하는 글로벌 워케이션.',
    url: 'https://www.wakation.kr/programs/global',
  },
  alternates: {
    canonical: 'https://www.wakation.kr/programs/global',
    languages: cityLanguageAlternates('/programs/global'),
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
