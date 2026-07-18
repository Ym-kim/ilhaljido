import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

export const metadata: Metadata = {
  title: '스포츠 관람 워케이션',
  description: '해외 스포츠 경기 관람과 함께하는 워케이션. 부산·도쿄돔 등 직관 일정에 맞춘 여행과 업무를 안내합니다.',
  keywords: ['스포츠 워케이션', '해외 직관', '야구 관람 여행', '스포츠 투어'],
  alternates: {
    canonical: 'https://www.wakation.kr/programs/sports',
    languages: cityLanguageAlternates('/programs/sports'),
  },
  robots: { index: true, follow: true },
}

export default function SportsPage() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.sports} />
}
