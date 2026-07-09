'use client'

import { useCallback, useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// 위시리스트 — localStorage 기반 (로그인·백엔드 불필요, 비용 0)
// 재방문 시 고전환 제휴 카드로의 재클릭 동선 확보
// ─────────────────────────────────────────────────────────────────────────────

const KEY = 'wakation_wishlist'

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr.filter((v) => typeof v === 'string') : []
  } catch {
    return []
  }
}

export function useWishlist() {
  // SSR/hydration 불일치 방지 — 마운트 후 로드
  const [ids, setIds] = useState<string[]>([])
  useEffect(() => {
    setIds(read())
    // 다른 탭/컴포넌트와 동기화
    const onChange = () => setIds(read())
    window.addEventListener('storage', onChange)
    window.addEventListener('wakation-wishlist', onChange)
    return () => {
      window.removeEventListener('storage', onChange)
      window.removeEventListener('wakation-wishlist', onChange)
    }
  }, [])

  const toggle = useCallback((id: string) => {
    const cur = read()
    const next = cur.includes(id) ? cur.filter((v) => v !== id) : [...cur, id]
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}
    window.dispatchEvent(new Event('wakation-wishlist'))
  }, [])

  const has = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, has, toggle }
}
