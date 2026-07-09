'use client'

import { Heart } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { useWishlist } from '@/hooks/useWishlist'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { AffiliateCard } from './AffiliateCard'
import type { Lang } from '@/lib/i18n/types'

// 찜한 상품 레일 — 위시리스트가 있을 때만 렌더 (재방문 재클릭 동선)
const TITLE: Record<Lang, string> = {
  KO: '찜한 상품',
  EN: 'Saved items',
  JP: '保存したアイテム',
}

export function WishlistRail() {
  const { lang } = useLang()
  const { ids } = useWishlist()
  const items = getCatalogItems(ids)
  if (items.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
      <h2 className="flex items-center gap-2 text-[#111827] font-bold text-lg mb-4">
        <Heart className="w-4.5 h-4.5 text-rose-500 fill-rose-500" />
        {TITLE[lang]}
        <span className="text-[#94a3b8] text-sm font-semibold">({items.length})</span>
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
        ))}
      </div>
    </section>
  )
}
