import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

export const metadata: Metadata = {
  title: '1인기업 네트워킹 워케이션',
  description: '프리랜서·1인기업·창업가를 위한 네트워킹 워케이션. 같은 고민을 가진 동료와 연결되는 프로그램을 안내합니다.',
  keywords: ['네트워킹 워케이션', '1인기업', '프리랜서 모임', '창업가 네트워킹'],
  alternates: {
    canonical: 'https://www.wakation.kr/programs/networking',
    languages: cityLanguageAlternates('/programs/networking'),
  },
  robots: { index: true, follow: true },
}

export default function NetworkingPage() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.networking} />
}
