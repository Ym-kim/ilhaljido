'use client'

import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// 최근 본 상품 — OTA 개인화 표준 (Booking·Trip 공통 패턴), localStorage 비용 0
// 카드 클릭 시 기록 → 재방문 시 이어보기 = 제휴 재클릭 동선
// ─────────────────────────────────────────────────────────────────────────────

const KEY = 'wakation_recent'
const MAX = 8

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(arr) ? arr.filter((v) => typeof v === 'string') : []
  } catch {
    return []
  }
}

/** 카드 클릭 시 호출 — 훅 밖에서도 사용 가능 */
export function recordRecentlyViewed(id: string) {
  try {
    const next = [id, ...read().filter((v) => v !== id)].slice(0, MAX)
    localStorage.setItem(KEY, JSON.stringify(next))
    window.dispatchEvent(new Event('wakation-recent'))
  } catch {}
}

export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>([])
  useEffect(() => {
    setIds(read())
    const onChange = () => setIds(read())
    window.addEventListener('storage', onChange)
    window.addEventListener('wakation-recent', onChange)
    return () => {
      window.removeEventListener('storage', onChange)
      window.removeEventListener('wakation-recent', onChange)
    }
  }, [])
  return { ids }
}
