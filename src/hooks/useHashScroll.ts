'use client'

import { useEffect } from 'react'

/**
 * URL 해시(#id)로 진입 시 대상 요소로 스크롤.
 * Next 라우터의 전환 후 스크롤 리셋보다 늦게, 두 번 시도해 확실히 이동.
 * (layout의 data-scroll-behavior="smooth"와 함께 사용)
 */
export function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const scroll = () =>
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const t1 = setTimeout(scroll, 150)
    const t2 = setTimeout(scroll, 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
}
