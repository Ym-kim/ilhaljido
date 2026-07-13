'use client'

import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// 접속 국가 코드 훅 — proxy.ts가 심은 wakation_geo 쿠키를 읽는다 (예: 'KR','JP','US')
// 국가별 콘텐츠 노출 게이팅(#국가 지정 게시)의 기반. 값이 없으면 '' 반환.
// ─────────────────────────────────────────────────────────────────────────────

function readGeo(): string {
  if (typeof document === 'undefined') return ''
  const hit = document.cookie.split('; ').find((c) => c.startsWith('wakation_geo='))
  return hit ? decodeURIComponent(hit.split('=')[1] ?? '').toUpperCase() : ''
}

export function useGeoCountry(): string {
  // SSR/최초 렌더는 '' → 클라이언트 마운트 후 실제 국가 (하이드레이션 불일치 방지)
  const [country, setCountry] = useState('')
  useEffect(() => {
    setCountry(readGeo())
  }, [])
  return country
}
