'use client'

import { useEffect, useState } from 'react'

// /api/prices(1일 1회 갱신 캐시)에서 최신 검증가를 받아 정적 priceFrom을 덮어쓴다.
// 실패·미포함 항목은 정적값 그대로 → 화면이 비는 일 없음.
export function usePriceWatch(): Record<string, string> {
  const [prices, setPrices] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false
    fetch('/api/prices')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.prices) setPrices(data.prices)
      })
      .catch(() => {
        // 네트워크 실패 무시 — 정적 가격 폴백
      })
    return () => {
      cancelled = true
    }
  }, [])

  return prices
}
