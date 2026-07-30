import type { Metadata } from 'next'
import { HalfPriceTravelGuideView } from '@/components/programs/HalfPriceTravelGuideView'

export const metadata: Metadata = {
  title: '韓国の地域旅行費支援｜申請条件と還付の流れ',
  description: '韓国の地域旅行支援を利用する前に、事前申請、対象条件、領収書、地域通貨での還付方法を確認できます。',
  alternates: { canonical: 'https://www.wakation.kr/ja/programs/support/half-price-travel', languages: { ko: 'https://www.wakation.kr/programs/support/half-price-travel', en: 'https://www.wakation.kr/en/programs/support/half-price-travel', ja: 'https://www.wakation.kr/ja/programs/support/half-price-travel', 'x-default': 'https://www.wakation.kr/programs/support/half-price-travel' } },
}

export default function HalfPriceTravelPageJa() {
  return <HalfPriceTravelGuideView lang="JP" />
}

