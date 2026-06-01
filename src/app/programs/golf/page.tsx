import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export default function GolfPage() {
  return (
    <ThemeProgramPage
      heroImage="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1800&q=85"
      eyebrow="⛳ 골프 네트워킹"
      titleKey="golf_hero_title"
      descKey="golf_hero_desc"
      themeIds={['golf-jeju']}
      emailSubject="골프 네트워킹 워케이션 사전 신청"
    />
  )
}
