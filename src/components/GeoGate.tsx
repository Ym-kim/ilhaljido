'use client'

import { useGeoCountry } from '@/hooks/useGeoCountry'

// ─────────────────────────────────────────────────────────────────────────────
// 국가 지정 노출 게이트 — 특정 국가에서 접속한 방문자에게만 children을 보여준다.
//
//   <GeoGate only={['JP']}>...일본 방문자 전용 콘텐츠...</GeoGate>
//   <GeoGate except={['KR']}>...국내 제외 노출...</GeoGate>
//
// 콘텐츠(프로그램·배너·공지)에 "게시 국가 지정" 을 붙이는 재사용 컴포넌트.
// 국가 미확정('') 시엔 기본 숨김(only 지정 시) — 과노출 방지.
// ─────────────────────────────────────────────────────────────────────────────

export function GeoGate({
  only,
  except,
  children,
}: {
  only?: string[]
  except?: string[]
  children: React.ReactNode
}) {
  const country = useGeoCountry()

  if (only && only.length > 0) {
    if (!country || !only.map((c) => c.toUpperCase()).includes(country)) return null
  }
  if (except && except.length > 0) {
    if (country && except.map((c) => c.toUpperCase()).includes(country)) return null
  }
  return <>{children}</>
}
