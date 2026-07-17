'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 위시리스트 토스트 — 하트 클릭 시 하단 확인 토스트 + /wishlist 링크 (Airbnb 벤치)
// useWishlist.toggle이 쏘는 'wakation-wishlist' CustomEvent(detail.added)를 구독.
// 루트 layout에 1회 마운트. localStorage 이벤트(다른 탭)는 detail이 없어 무시됨.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>
const T: Record<string, L> = {
  added: { KO: '찜 목록에 저장했어요', EN: 'Saved to your wishlist', JP: 'お気に入りに保存しました' },
  removed: { KO: '찜 목록에서 뺐어요', EN: 'Removed from wishlist', JP: 'お気に入りから外しました' },
  view: { KO: '보기', EN: 'View', JP: '見る' },
}

export function WishlistToast() {
  const { lang } = useLang()
  const [state, setState] = useState<{ added: boolean; key: number } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ id?: string; added?: boolean }>).detail
      if (!detail || typeof detail.added !== 'boolean') return
      setState({ added: detail.added, key: Date.now() })
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setState(null), 2600)
    }
    window.addEventListener('wakation-wishlist', onEvent)
    return () => {
      window.removeEventListener('wakation-wishlist', onEvent)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  if (!state) return null

  return (
    <div
      key={state.key}
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-rise"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 bg-[#111827] text-white rounded-full pl-4 pr-2 py-2 shadow-2xl border border-white/10">
        <Heart className={`w-4 h-4 shrink-0 ${state.added ? 'fill-rose-500 text-rose-500' : 'text-white/60'}`} />
        <span className="text-sm font-semibold whitespace-nowrap">
          {state.added ? T.added[lang] : T.removed[lang]}
        </span>
        {state.added && (
          <Link
            href="/wishlist"
            onClick={() => setState(null)}
            className="text-xs font-bold bg-white/15 hover:bg-white/25 rounded-full px-3 py-1.5 transition-colors whitespace-nowrap"
          >
            {T.view[lang]}
          </Link>
        )}
      </div>
    </div>
  )
}
