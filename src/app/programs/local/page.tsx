import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export const metadata: Metadata = {
  title: '미식·로컬 워케이션',
  description: '현지 미식과 로컬 문화를 경험하는 워케이션. 전주·오사카 등 도시별 푸드투어·로컬 체험과 함께하는 프로그램을 안내합니다.',
  keywords: ['미식 워케이션', '로컬 여행', '푸드투어', '현지 체험'],
  robots: { index: true, follow: true },
}

export default function LocalPage() {
  return (
    <ThemeProgramPage
      heroImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85"
      eyebrow="🍜 미식·로컬"
      titleKey="local_hero_title"
      descKey="local_hero_desc"
      themeIds={['local-jeonju']}
      featuredExperienceIds={['theme-local-kuromon', 'theme-local-nishiki', 'theme-local-gion-food']}
      emailSubject="미식 로컬 워케이션 사전 신청"
    />
  )
}
