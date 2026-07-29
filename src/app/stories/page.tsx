import type { Metadata } from 'next'
import { StoriesHubView } from '@/components/editorial/StoriesHubView'

// /stories — 에디토리얼 허브 (아티클 집결지, KO 메타)

export const metadata: Metadata = {
  title: '여행 이야기 — 검증된 사실로 쓰는 에디토리얼',
  description:
    '미라클호 크루즈, 정선 아리랑 열차, 마나도 — 새로운 체류지와 이동 방식의 가능성을 검증된 사실만으로 취재하는 Wakation 에디토리얼.',
  alternates: { canonical: 'https://www.wakation.kr/stories' },
  openGraph: {
    title: '여행 이야기',
    description: '새로운 체류지와 이동 방식의 가능성 — 검증된 사실로 쓰는 워케이션 에디토리얼.',
    url: 'https://www.wakation.kr/stories',
    siteName: 'Wakation',
  },
}

export default function StoriesPage() {
  return <StoriesHubView />
}
