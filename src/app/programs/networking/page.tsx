import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export default function NetworkingPage() {
  return (
    <ThemeProgramPage
      heroImage="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1800&q=85"
      eyebrow="🤝 1인기업 네트워킹"
      titleKey="networking_hero_title"
      descKey="networking_hero_desc"
      themeIds={['network-chuncheon']}
      emailSubject="네트워킹 캠프 사전 신청"
    />
  )
}
