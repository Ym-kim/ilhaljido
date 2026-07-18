import type { Metadata } from 'next'
import { JapanTownsView } from '@/components/programs/JapanTownsView'
import { cityLanguageAlternates } from '@/lib/cities'

// 료칸·온천 테마 전용 페이지 — 다른 테마(/programs/healing·golf·local·sports)와 동일한
// /programs/* 네임스페이스로 통일. 콘텐츠는 일본 소도시 료칸·온천 뷰(JapanTownsView).
// 구 URL /japan-towns 는 next.config redirect로 이 경로로 넘어온다.

export const metadata: Metadata = {
  title: '료칸·온천 워케이션 — 일본 소도시',
  description:
    '가와구치코·가나자와·유후인. 후지산 호숫가와 전통 거리에서 일하고 온천으로 하루를 마무리하는 료칸·온천 워케이션 — 숙소 예약과 프로그램 안내.',
  keywords: ['료칸 워케이션', '온천 워케이션', '일본 소도시 워케이션', '가와구치코', '가나자와', '유후인'],
  alternates: {
    canonical: 'https://www.wakation.kr/programs/onsen',
    languages: cityLanguageAlternates('/programs/onsen'),
  },
  robots: { index: true, follow: true },
}

export default function OnsenThemePage() {
  return <JapanTownsView />
}
