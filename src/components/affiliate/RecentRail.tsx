'use client'

import { History } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { useWishlist } from '@/hooks/useWishlist'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { AffiliateCard } from './AffiliateCard'
import type { Lang } from '@/lib/i18n/types'

// 최근 본 상품 레일 — 찜과 중복되지 않는 것만, 기록 있을 때만 렌더
const TITLE: Record<Lang, string> = {
  KO: '최근 본 상품',
  EN: 'Recently viewed',
  JP: '最近見たアイテム',
}

export function RecentRail() {
  const { lang } = useLang()
  const { ids } = useRecentlyViewed()
  const { ids: wished } = useWishlist()
  const items = getCatalogItems(ids.filter((id) => !wished.includes(id))).slice(0, 4)
  if (items.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
      <h2 className="flex items-center gap-2 text-[#111827] font-bold text-lg mb-4">
        <History className="w-[18px] h-[18px] text-brand-mid" />
        {TITLE[lang]}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
        ))}
      </div>
    </section>
  )
}
