'use client'

import { useSyncExternalStore } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// 접속 국가 코드 훅 — proxy.ts가 심은 wakation_geo 쿠키를 읽는다 (예: 'KR','JP','US')
// 국가별 콘텐츠 노출 게이팅(#국가 지정 게시)의 기반. 값이 없으면 '' 반환.
// useSyncExternalStore: 서버 스냅샷 '' → 하이드레이션 후 실제 국가 (불일치 안전)
// ─────────────────────────────────────────────────────────────────────────────

function readGeo(): string {
  if (typeof document === 'undefined') return ''
  const hit = document.cookie.split('; ').find((c) => c.startsWith('wakation_geo='))
  return hit ? decodeURIComponent(hit.split('=')[1] ?? '').toUpperCase() : ''
}

// 쿠키는 proxy가 요청 시 설정 — 세션 내 변경 이벤트가 없어 구독은 no-op
const subscribe = () => () => {}
const getServerSnapshot = () => ''

export function useGeoCountry(): string {
  return useSyncExternalStore(subscribe, readGeo, getServerSnapshot)
}
