import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'

export const metadata: Metadata = {
  title: '1인기업 네트워킹 워케이션',
  description: '프리랜서·1인기업·창업가를 위한 네트워킹 워케이션. 같은 고민을 가진 동료와 연결되는 프로그램을 안내합니다.',
  keywords: ['네트워킹 워케이션', '1인기업', '프리랜서 모임', '창업가 네트워킹'],
  robots: { index: true, follow: true },
}

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
