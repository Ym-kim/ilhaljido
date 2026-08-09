'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { trackEvent } from '@/lib/track'

// ─────────────────────────────────────────────────────────────────────────────
// 위시리스트 — localStorage 기반 (로그인·백엔드 불필요, 비용 0)
// 재방문 시 고전환 제휴 카드로의 재클릭 동선 확보
// useSyncExternalStore: 서버 [] → 하이드레이션 후 실값. 기존 계약 유지 —
// API(ids/has/toggle) 동일, CustomEvent 'wakation-wishlist' detail{id,added}는
// WishlistToast가 그대로 소비, storage 이벤트로 타 탭 동기화
// ─────────────────────────────────────────────────────────────────────────────

const KEY = 'wakation_wishlist'

const EMPTY: string[] = []
// getSnapshot 참조 안정성(무한 재렌더 방지) — raw 문자열 기준 캐시
let cacheRaw: string | null = null
let cache: string[] = EMPTY

function parse(raw: string): string[] {
  try {
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.filter((v) => typeof v === 'string') : []
  } catch {
    return []
  }
}

function getSnapshot(): string[] {
  const raw = localStorage.getItem(KEY) ?? '[]'
  if (raw !== cacheRaw) {
    cacheRaw = raw
    cache = parse(raw)
  }
  return cache
}

const getServerSnapshot = () => EMPTY

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener('wakation-wishlist', onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener('wakation-wishlist', onChange)
  }
}

export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback((id: string, tracking?: Record<string, string>) => {
    const cur = getSnapshot()
    const added = !cur.includes(id)
    const next = added ? [...cur, id] : cur.filter((v) => v !== id)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}
    trackEvent('save', {
      item_id: id,
      action: added ? 'save' : 'remove',
      source_section: 'wishlist',
      ...tracking,
    })
    // CustomEvent detail로 토스트(WishlistToast)가 추가/제거를 구분 — 기존 리스너와 호환
    window.dispatchEvent(new CustomEvent('wakation-wishlist', { detail: { id, added } }))
  }, [])

  const has = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, has, toggle }
}
