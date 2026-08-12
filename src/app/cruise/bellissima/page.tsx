import type { Metadata } from 'next'
import { BellissimaArticle } from '@/components/cruise/BellissimaArticle'

// 카피·팩트 검증 기록은 src/components/cruise/BellissimaArticle.tsx (2026-08-13 i18n 추출)

const languages = {
  ko: 'https://www.wakation.kr/cruise/bellissima',
  en: 'https://www.wakation.kr/en/cruise/bellissima',
  ja: 'https://www.wakation.kr/ja/cruise/bellissima',
  'x-default': 'https://www.wakation.kr/cruise/bellissima',
}

export const metadata: Metadata = {
  title: '바다 위 스타링크 오피스 — MSC 벨리시마 크루즈 워케이션 가이드',
  description:
    '171,598톤 초대형선에서 일하는 법. 스타링크 와이파이, 다이닝 12곳, 2027년 6월부터 인천 연중 모항 — MSC 벨리시마 크루즈 워케이션의 모든 것.',
  alternates: { canonical: languages.ko, languages },
  openGraph: {
    title: '바다 위 스타링크 오피스 — MSC 벨리시마 크루즈 워케이션 | Wakation',
    description: '171,598톤 초대형선 워케이션 가이드. 스타링크 와이파이·다이닝 12곳·2027년 인천 모항.',
    url: languages.ko,
    siteName: 'Wakation',
  },
}

export default function BellissimaCruisePage() {
  return <BellissimaArticle lang="KO" />
}
