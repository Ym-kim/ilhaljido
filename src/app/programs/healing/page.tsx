import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export default function HealingPage() {
  return (
    <ThemeProgramPage
      heroImage="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1800&q=85"
      eyebrow="🧘 힐링·요가"
      titleKey="healing_hero_title"
      descKey="healing_hero_desc"
      themeIds={['healing-taean']}
      emailSubject="힐링 워케이션 사전 신청"
    />
  )
}
