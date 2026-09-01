'use client'

import { useEffect } from 'react'

/**
 * URL 해시(#id)로 진입 시 대상 요소로 이동.
 * Next 라우터의 전환 후 스크롤 리셋보다 늦게, 두 번 시도해 확실히 이동.
 *
 * 2026-09-01: behavior를 'smooth' → 'auto'로 바꿨다.
 * 운영자 보고("화면이 아래부터 위로 흘러간다")에 따라 전역 smooth 스크롤을 걷어냈고,
 * 해시 진입도 같은 기준으로 **순간이동**시킨다. 화면이 흐르는 연출을 남기지 않는다.
 */
export function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const scroll = () =>
      document.getElementById(hash)?.scrollIntoView({ behavior: 'auto', block: 'center' })
    const t1 = setTimeout(scroll, 150)
    const t2 = setTimeout(scroll, 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
}
