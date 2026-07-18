import type { Metadata } from 'next'
import { cityLanguageAlternates } from '@/lib/cities'

export const metadata: Metadata = {
  title: 'eSIM | Wakation Select',
  description:
    '일본·베트남·발리·포르투갈 eSIM. 도착 전 설치하고 공항에서 바로 연결. Airalo 파트너 상품.',
  keywords: ['eSIM', 'Airalo', '일본 eSIM', '베트남 eSIM', '발리 eSIM', '포르투갈 eSIM', '해외 인터넷'],
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.wakation.kr/select/esim',
    languages: cityLanguageAlternates('/select/esim'),
  },
}

export default function EsimLayout({ children }: { children: React.ReactNode }) {
  return children
}
