import type { Metadata } from 'next'
import { HalfPriceTravelGuideView } from '@/components/programs/HalfPriceTravelGuideView'

export const metadata: Metadata = {
  title: 'Korea regional half-price travel: eligibility and reimbursement',
  description: 'Understand advance applications, eligibility, receipts and local-currency reimbursement before using a Korean regional travel-support program.',
  alternates: { canonical: 'https://www.wakation.kr/en/programs/support/half-price-travel', languages: { ko: 'https://www.wakation.kr/programs/support/half-price-travel', en: 'https://www.wakation.kr/en/programs/support/half-price-travel', ja: 'https://www.wakation.kr/ja/programs/support/half-price-travel', 'x-default': 'https://www.wakation.kr/programs/support/half-price-travel' } },
}

export default function HalfPriceTravelPageEn() {
  return <HalfPriceTravelGuideView lang="EN" />
}

