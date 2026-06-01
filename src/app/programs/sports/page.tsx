import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export default function SportsPage() {
  return (
    <ThemeProgramPage
      heroImage="https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1800&q=85"
      eyebrow="🏟️ 스포츠 관람"
      titleKey="sports_hero_title"
      descKey="sports_hero_desc"
      themeIds={['sports-busan']}
      emailSubject="스포츠 관람 워케이션 사전 신청"
    />
  )
}
