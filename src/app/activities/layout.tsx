import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '현지 체험·액티비티',
  description: '일본·베트남·발리 등 워케이션 목적지의 투어·액티비티·입장권을 큐레이션. 일과 후를 특별하게 채우세요.',
  keywords: ['현지 체험', '액티비티', '투어', '입장권'],
  robots: { index: true, follow: true },
}

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
