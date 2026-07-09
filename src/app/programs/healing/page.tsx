import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export const metadata: Metadata = {
  title: '힐링·요가 워케이션',
  description: '발리·태안 힐링 워케이션. 요가·명상·스파와 함께 일하고 회복하는 웰니스 워케이션 프로그램을 안내합니다.',
  keywords: ['힐링 워케이션', '요가 워케이션', '발리 요가', '웰니스 여행'],
  robots: { index: true, follow: true },
}

export default function HealingPage() {
  return (
    <ThemeProgramPage
      heroImage="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1800&q=85"
      eyebrow="🧘 힐링·요가"
      titleKey="healing_hero_title"
      descKey="healing_hero_desc"
      themeIds={['healing-taean']}
      featuredExperienceIds={['theme-heal-spa-ubud','theme-heal-yoga-bali']}
      emailSubject="힐링 워케이션 사전 신청"
    />
  )
}
