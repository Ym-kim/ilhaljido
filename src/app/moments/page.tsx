'use client'

import { MomentsView } from '@/components/moments/MomentsView'

// 메타데이터는 moments/layout.tsx에서 지정 (클라이언트 페이지)
// 뷰 구현은 components/moments/MomentsView.tsx로 추출 (2026-08-04 i18n-routes-v1 — /en·/ja 공유)

export default function MomentsPage() {
  return <MomentsView />
}
