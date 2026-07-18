import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

export const metadata: Metadata = {
  title: '힐링·요가 워케이션',
  description: '발리·태안 힐링 워케이션. 요가·명상·스파와 함께 일하고 회복하는 웰니스 워케이션 프로그램을 안내합니다.',
  keywords: ['힐링 워케이션', '요가 워케이션', '발리 요가', '웰니스 여행'],
  alternates: {
    canonical: 'https://www.wakation.kr/programs/healing',
    languages: cityLanguageAlternates('/programs/healing'),
  },
  robots: { index: true, follow: true },
}

export default function HealingPage() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.healing} />
}
