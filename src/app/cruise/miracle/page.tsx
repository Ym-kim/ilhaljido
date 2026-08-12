import type { Metadata } from 'next'
import { MiracleArticle } from '@/components/cruise/MiracleArticle'

// 카피·팩트 검증 기록은 src/components/cruise/MiracleArticle.tsx (2026-08-13 i18n 추출)

const languages = {
  ko: 'https://www.wakation.kr/cruise/miracle',
  en: 'https://www.wakation.kr/en/cruise/miracle',
  ja: 'https://www.wakation.kr/ja/cruise/miracle',
  'x-default': 'https://www.wakation.kr/cruise/miracle',
}

export const metadata: Metadata = {
  title: '바다 위 17시간 — 부산-오사카 크루즈 워케이션 가이드',
  description:
    '팬스타 미라클호로 떠나는 이동형 워케이션. 뷔페 2식 포함 승선권, 위성 와이파이, 수하물 제한 없는 하룻밤 — 부산에서 오사카까지 일하며 건너는 법.',
  alternates: { canonical: languages.ko, languages },
  openGraph: {
    title: '바다 위 17시간 — 부산-오사카 크루즈 워케이션 | Wakation',
    description: '팬스타 미라클호 크루즈 워케이션 가이드. 뷔페 2식·위성 와이파이·수하물 걱정 제로.',
    url: languages.ko,
    siteName: 'Wakation',
  },
}

export default function MiracleCruisePage() {
  return <MiracleArticle lang="KO" />
}
