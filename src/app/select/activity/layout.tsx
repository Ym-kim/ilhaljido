import type { Metadata } from 'next'
import { cityLanguageAlternates } from '@/lib/cities'

export const metadata: Metadata = {
  title: '현지 체험·투어 | Wakation Select',
  description:
    '일본·베트남·발리 현지 투어, 교통패스, 입장권. KKday 파트너 상품으로 워케이션 체험을 풍부하게.',
  keywords: ['워케이션 체험', 'KKday', '일본 투어', '베트남 액티비티', '발리 체험', '교통패스'],
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.wakation.kr/select/activity',
    languages: cityLanguageAlternates('/select/activity'),
  },
}

export default function ActivityLayout({ children }: { children: React.ReactNode }) {
  return children
}
