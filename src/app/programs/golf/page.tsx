import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

export const metadata: Metadata = {
  title: '골프 네트워킹 워케이션',
  description: '제주·오키나와 골프 워케이션. 라운딩과 네트워킹을 함께하는 프리미엄 워케이션 프로그램과 티타임 예약을 안내합니다.',
  keywords: ['골프 워케이션', '제주 골프', '오키나와 골프', '골프 네트워킹'],
  alternates: {
    canonical: 'https://www.wakation.kr/programs/golf',
    languages: cityLanguageAlternates('/programs/golf'),
  },
  robots: { index: true, follow: true },
}

export default function GolfPage() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.golf} />
}
