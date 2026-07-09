import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export const metadata: Metadata = {
  title: '골프 네트워킹 워케이션',
  description: '제주·오키나와 골프 워케이션. 라운딩과 네트워킹을 함께하는 프리미엄 워케이션 프로그램과 티타임 예약을 안내합니다.',
  keywords: ['골프 워케이션', '제주 골프', '오키나와 골프', '골프 네트워킹'],
  robots: { index: true, follow: true },
}

export default function GolfPage() {
  return (
    <ThemeProgramPage
      heroImage="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1800&q=85"
      eyebrow="⛳ 골프 네트워킹"
      titleKey="golf_hero_title"
      descKey="golf_hero_desc"
      themeIds={['golf-jeju', 'golf-okinawa']}
      featuredExperienceIds={['theme-golf-montgomerie','theme-golf-hoiana']}
      emailSubject="골프 네트워킹 워케이션 사전 신청"
    />
  )
}
