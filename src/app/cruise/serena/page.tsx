import type { Metadata } from 'next'
import { SerenaArticle } from '@/components/cruise/SerenaArticle'

// 카피·팩트 검증 기록은 src/components/cruise/SerenaArticle.tsx (2026-08-13 i18n 추출)

const languages = {
  ko: 'https://www.wakation.kr/cruise/serena',
  en: 'https://www.wakation.kr/en/cruise/serena',
  ja: 'https://www.wakation.kr/ja/cruise/serena',
  'x-default': 'https://www.wakation.kr/cruise/serena',
}

export const metadata: Metadata = {
  title: '바다 위에서 한 달 살기 — 코스타 세레나 그랜드 보야지 워케이션 가이드',
  description:
    '남미에서 유럽까지 19~23일 대서양 횡단. 숙박·식사 포함 하루 8만원대, 스타링크 함대 — 리포지셔닝 크루즈로 하는 바다 위 한 달 살기.',
  alternates: { canonical: languages.ko, languages },
  openGraph: {
    title: '바다 위에서 한 달 살기 — 코스타 세레나 그랜드 보야지 | Wakation',
    description: '19~23일 대서양 횡단 리포지셔닝 크루즈 워케이션 가이드. 숙박·식사 포함 하루 8만원대.',
    url: languages.ko,
    siteName: 'Wakation',
  },
}

export default function SerenaCruisePage() {
  return <SerenaArticle lang="KO" />
}
