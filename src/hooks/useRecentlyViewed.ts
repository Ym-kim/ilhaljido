'use client'

import { useSyncExternalStore } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// 최근 본 상품 — OTA 개인화 표준 (Booking·Trip 공통 패턴), localStorage 비용 0
// 카드 클릭 시 기록 → 재방문 시 이어보기 = 제휴 재클릭 동선
// useSyncExternalStore: 서버 [] → 하이드레이션 후 실값. storage(타 탭)+커스텀
// 이벤트(같은 탭) 구독 — 기존 이벤트 계약(wakation-recent) 유지
// ─────────────────────────────────────────────────────────────────────────────

const KEY = 'wakation_recent'
const MAX = 8

const EMPTY: string[] = []
// getSnapshot은 참조 안정성이 필수(무한 재렌더 방지) — raw 문자열 기준 캐시
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
  window.addEventListener('wakation-recent', onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener('wakation-recent', onChange)
  }
}

/** 카드 클릭 시 호출 — 훅 밖에서도 사용 가능 */
export function recordRecentlyViewed(id: string) {
  try {
    const cur = parse(localStorage.getItem(KEY) ?? '[]')
    const next = [id, ...cur.filter((v) => v !== id)].slice(0, MAX)
    localStorage.setItem(KEY, JSON.stringify(next))
    window.dispatchEvent(new Event('wakation-recent'))
  } catch {}
}

export function useRecentlyViewed() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return { ids }
}
