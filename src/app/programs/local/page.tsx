import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

export const metadata: Metadata = {
  title: '미식·로컬 워케이션',
  description: '현지 미식과 로컬 문화를 경험하는 워케이션. 전주·오사카 등 도시별 푸드투어·로컬 체험과 함께하는 프로그램을 안내합니다.',
  keywords: ['미식 워케이션', '로컬 여행', '푸드투어', '현지 체험'],
  alternates: {
    canonical: 'https://www.wakation.kr/programs/local',
    languages: cityLanguageAlternates('/programs/local'),
  },
  robots: { index: true, follow: true },
}

export default function LocalPage() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.local} />
}
