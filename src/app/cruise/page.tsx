import { CruiseHubView } from '@/components/cruise/CruiseHubView'

// 허브 본문은 src/components/cruise/CruiseHubView.tsx (2026-08-13 i18n 라우트 신설로 추출)
// 메타데이터는 이 세그먼트의 layout.tsx에 있다 (구 page.tsx가 'use client'였던 구조 유지)
export default function CruisePage() {
  return <CruiseHubView />
}
