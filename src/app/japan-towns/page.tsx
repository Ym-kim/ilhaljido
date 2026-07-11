import type { Metadata } from 'next'
import { JapanTownsView } from '@/components/programs/JapanTownsView'

export const metadata: Metadata = {
  title: '일본 소도시 워케이션 — 료칸·온천',
  description:
    '가와구치코·가나자와·유후인. 후지산 호숫가와 전통 거리에서 일하고 온천으로 하루를 마무리하는 일본 소도시 워케이션 — 숙소 예약과 프로그램 안내.',
  keywords: ['일본 소도시 워케이션', '료칸 워케이션', '온천 워케이션', '가와구치코', '가나자와', '유후인'],
  robots: { index: true, follow: true },
}

export default function JapanTownsPage() {
  return <JapanTownsView />
}
