import type { Metadata } from 'next'
import { CompareView } from '@/components/destinations/CompareView'
import { cityLanguageAlternates } from '@/lib/cities'

// /destinations/compare — 워케이션 도시 비교 도구 (클라이언트 도구, KO 메타)

export const metadata: Metadata = {
  title: '워케이션 도시 비교 — 인터넷·생활비·비자·시차 나란히',
  description:
    '도쿄·오사카·후쿠오카·발리·치앙마이·다낭·세부·시드니 중 2~3개 도시를 나란히 비교. 인터넷 속도, 월 생활비, 비자, 시차, 베스트 시즌까지 한 화면에.',
  alternates: {
    canonical: 'https://www.wakation.kr/destinations/compare',
    languages: cityLanguageAlternates('/destinations/compare'),
  },
  openGraph: {
    title: '워케이션 도시 비교 | Wakation',
    description: '고민 중인 워케이션 도시 2~3곳을 나란히 놓고 인터넷·생활비·비자·시차를 한 번에 비교하세요.',
    url: 'https://www.wakation.kr/destinations/compare',
    siteName: 'Wakation',
  },
}

export default function ComparePage() {
  return <CompareView />
}
