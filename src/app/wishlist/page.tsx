import type { Metadata } from 'next'
import { WishlistView } from '@/components/affiliate/WishlistView'

// 개인 저장 페이지(localStorage) — SEO 대상 아님
export const metadata: Metadata = {
  title: '찜한 상품',
  robots: { index: false, follow: false },
}

export default function WishlistPage() {
  return <WishlistView />
}
