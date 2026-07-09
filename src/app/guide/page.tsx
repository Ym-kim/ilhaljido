import type { Metadata } from 'next'
import { GuideHubView } from '@/components/guide/GuideHubView'

export const metadata: Metadata = {
  title: '워케이션 도시 가이드 — 시차·비행·시즌 비교 | Wakation',
  description:
    '도쿄·후쿠오카·다낭·발리·치앙마이·제주 워케이션 가이드. 시차, 직항 시간, 추천 시즌, 일하기 좋은 동네를 비교하고 숙소·항공권까지 바로 연결하세요.',
  keywords: ['워케이션 도시 추천', '워케이션 가이드', '한달살기 도시', '디지털 노마드 도시'],
  alternates: { canonical: 'https://www.wakation.kr/guide' },
  robots: { index: true, follow: true },
}

export default function GuideHubPage() {
  return <GuideHubView />
}
