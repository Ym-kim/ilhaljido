import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export const metadata: Metadata = {
  title: '스포츠 관람 워케이션',
  description: '해외 스포츠 경기 관람과 함께하는 워케이션. 부산·도쿄돔 등 직관 일정에 맞춘 여행과 업무를 안내합니다.',
  keywords: ['스포츠 워케이션', '해외 직관', '야구 관람 여행', '스포츠 투어'],
  robots: { index: true, follow: true },
}

export default function SportsPage() {
  return (
    <ThemeProgramPage
      heroImage="https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1800&q=85"
      eyebrow="🏟️ 스포츠 관람"
      titleKey="sports_hero_title"
      descKey="sports_hero_desc"
      themeIds={['sports-busan']}
      featuredExperienceIds={['theme-sports-tokyodome']}
      emailSubject="스포츠 관람 워케이션 사전 신청"
    />
  )
}
