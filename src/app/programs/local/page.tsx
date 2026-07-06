import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export default function LocalPage() {
  return (
    <ThemeProgramPage
      heroImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85"
      eyebrow="🍜 미식·로컬"
      titleKey="local_hero_title"
      descKey="local_hero_desc"
      themeIds={['local-jeonju']}
      featuredExperienceIds={['theme-local-kuromon']}
      emailSubject="미식 로컬 워케이션 사전 신청"
    />
  )
}
