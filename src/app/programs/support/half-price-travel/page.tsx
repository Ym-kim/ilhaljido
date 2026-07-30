import type { Metadata } from 'next'
import { HalfPriceTravelGuideView } from '@/components/programs/HalfPriceTravelGuideView'

export const metadata: Metadata = {
  title: '반값여행 신청 전 확인할 조건과 환급 절차',
  description: '지역사랑 휴가지원과 반값여행의 사전신청, 대상 조건, 영수증 증빙, 지역화폐 환급 절차를 공식 안내 기준으로 정리했습니다.',
  alternates: { canonical: 'https://www.wakation.kr/programs/support/half-price-travel', languages: { ko: 'https://www.wakation.kr/programs/support/half-price-travel', en: 'https://www.wakation.kr/en/programs/support/half-price-travel', ja: 'https://www.wakation.kr/ja/programs/support/half-price-travel', 'x-default': 'https://www.wakation.kr/programs/support/half-price-travel' } },
}

export default function HalfPriceTravelPage() {
  return <HalfPriceTravelGuideView lang="KO" />
}

