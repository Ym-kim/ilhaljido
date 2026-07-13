import type { Metadata } from 'next'
import { CollectionsHub } from '@/components/affiliate/CollectionsHub'

export const metadata: Metadata = {
  title: '워케이션 기획전 — 테마별 큐레이션',
  description:
    '도쿄·발리·치앙마이·일본 온천. 숙소·체험·eSIM·항공을 목적지 테마로 묶은 워케이션 기획전. 한 화면에서 준비를 끝내세요.',
  keywords: ['워케이션 기획전', '워케이션 패키지', '도쿄 워케이션', '발리 한 달 살기', '치앙마이 노마드'],
  robots: { index: true, follow: true },
}

export default function CollectionsPage() {
  return <CollectionsHub />
}
