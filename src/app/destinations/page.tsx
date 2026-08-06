import type { Metadata } from 'next'
import { DestinationsHubView } from '@/components/destinations/DestinationsHubView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /destinations — 워케이션 도시 가이드 허브 (KO 기준 메타, 뷰는 방문자 언어 반응)

export const metadata: Metadata = {
  title: '워케이션 도시 가이드 — 도쿄·발리·치앙마이·다낭·세부·시드니',
  description: '워케이션 인기 8개 도시의 인터넷 속도·생활비·비자·베스트 시즌 완전 비교. 도쿄 무비자 90일, 발리 월 100만원대, 치앙마이 노마드 1번지.',
  alternates: {
    canonical: 'https://www.wakation.kr/destinations',
    languages: cityLanguageAlternates('/destinations'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '워케이션 도시 가이드 | Wakation',
    description: '도쿄·발리·치앙마이·다낭·세부·시드니 워케이션 완벽 가이드. 비자·생활비·인터넷 한눈에.',
    url: 'https://www.wakation.kr/destinations',
    siteName: 'Wakation',
  },
}

export default function DestinationsPage() {
  return <DestinationsHubView />
}
