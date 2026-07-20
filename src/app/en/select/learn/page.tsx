import type { Metadata } from 'next'
import { LearnSelectView } from '@/components/select/LearnSelectView'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/select/learn — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Courses & Learning — Wakation Select',
  description:
    'AI automation, marketing, productivity, development and languages. Inflearn partner course categories to grow during your workation.',
  keywords: ['Inflearn', 'online courses', 'AI courses', 'marketing courses', 'learning on workation', 'development courses'],
  alternates: {
    canonical: 'https://www.wakation.kr/en/select/learn',
    languages: cityLanguageAlternates('/select/learn'),
  },
  openGraph: {
    title: 'Courses & Learning | Wakation Select',
    description: 'Fill workation downtime with Inflearn online courses — AI, marketing, productivity, development and languages.',
    url: 'https://www.wakation.kr/en/select/learn',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function LearnSelectPageEn() {
  return <LearnSelectView forceLang="EN" />
}
