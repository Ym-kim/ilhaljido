import type { Metadata } from 'next'
import { WishlistView } from '@/components/affiliate/WishlistView'

// 개인 저장 페이지(localStorage) — SEO 대상 아님
export const metadata: Metadata = {
  title: '저장한 여행',
  // noindex라 영향은 작지만, 미정의 시 루트 canonical(홈)을 상속하므로 자기 경로로 고정
  alternates: { canonical: 'https://www.wakation.kr/wishlist' },
  robots: { index: false, follow: false },
}

export default function WishlistPage() {
  return <WishlistView />
}
