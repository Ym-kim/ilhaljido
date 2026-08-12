import type { Metadata } from 'next'
import { WorldEuropaArticle } from '@/components/cruise/WorldEuropaArticle'

// 카피·팩트 검증 기록은 src/components/cruise/WorldEuropaArticle.tsx (2026-08-13 i18n 추출)

const languages = {
  ko: 'https://www.wakation.kr/cruise/world-europa',
  en: 'https://www.wakation.kr/en/cruise/world-europa',
  ja: 'https://www.wakation.kr/ja/cruise/world-europa',
  'x-default': 'https://www.wakation.kr/cruise/world-europa',
}

export const metadata: Metadata = {
  title: '한겨울의 카리브 워케이션 — MSC 월드 유로파 가이드',
  description:
    '한국의 겨울에 카리브해 8일. MSC 함대 최대·첫 LNG 플래그십, 스타링크 와이파이, 마르티니크 모항 — MSC 월드 유로파 크루즈 워케이션의 모든 것.',
  alternates: { canonical: languages.ko, languages },
  openGraph: {
    title: '한겨울의 카리브 워케이션 — MSC 월드 유로파 | Wakation',
    description: '21만 톤 LNG 플래그십에서 보내는 카리브 8일. 스타링크 와이파이·다이닝 13곳·겨울 시즌 카리브 모항.',
    url: languages.ko,
    siteName: 'Wakation',
  },
}

export default function WorldEuropaCruisePage() {
  return <WorldEuropaArticle lang="KO" />
}
