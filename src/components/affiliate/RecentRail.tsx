'use client'

/* eslint-disable @next/next/no-img-element */

import { History, ArrowUpRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { useWishlist } from '@/hooks/useWishlist'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { trackAffiliateClick } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 최근 본 상품 — 상품 그리드와 확실히 구분되는 컴팩트 히스토리 밴드
// (풀사이즈 AffiliateCard 대신 썸네일+타이틀 미니 카드 가로 스크롤)
// ─────────────────────────────────────────────────────────────────────────────

const TITLE: Record<Lang, string> = {
  KO: '최근 본 상품',
  EN: 'Recently viewed',
  JP: '最近見たアイテム',
}

const SUB: Record<Lang, string> = {
  KO: '이 기기에서 본 상품이에요',
  EN: 'Items you viewed on this device',
  JP: 'この端末で見たアイテム',
}

export function RecentRail() {
  const { lang } = useLang()
  const { ids } = useRecentlyViewed()
  const { ids: wished } = useWishlist()
  const items = getCatalogItems(ids.filter((id) => !wished.includes(id)))
    .slice(0, 8)
    .map((i) => localizeAffiliateItem(i, lang))
  if (items.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
      <div className="rounded-2xl bg-[#f8fafc] border border-dashed border-[#cbd5e1] px-4 sm:px-5 py-4">
        <div className="flex items-baseline gap-2.5 mb-3">
          <h2 className="flex items-center gap-1.5 text-[#475569] font-bold text-sm">
            <History className="w-4 h-4 text-[#94a3b8]" />
            {TITLE[lang]}
          </h2>
          <p className="text-[#94a3b8] text-[0.6875rem]">{SUB[lang]}</p>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = item.status === 'active_affiliate' || item.status === 'api_ready'
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel={isActive ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
                onClick={() => trackAffiliateClick({
                  id: item.id,
                  itemName: item.productTitle ?? item.displayTitle ?? item.name,
                  provider: item.name,
                  status: item.status,
                  sourceSection: 'recently_viewed',
                  ctaLabel: item.cta,
                  ctaPosition: 'rail',
                  destination: item.destination,
                  category: item.category,
                  locale: lang,
                })}
                className="group shrink-0 flex items-center gap-2.5 bg-white border border-[#e2e8f0] rounded-xl pl-1.5 pr-3 py-1.5 hover:border-[#7dd3fc] hover:shadow-sm transition-all w-56"
              >
                {item.coverPhoto ? (
                  <img
                    src={item.coverPhoto.replace(/w=\d+/, 'w=120')}
                    alt=""
                    loading="lazy"
                    className="w-11 h-11 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <span className="w-11 h-11 rounded-lg bg-[#f0f9ff] flex items-center justify-center text-lg shrink-0">
                    {item.emoji}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[#111827] text-xs font-bold leading-snug truncate">
                    {item.productTitle ?? item.displayTitle ?? item.name}
                  </span>
                  <span className="block text-[#94a3b8] text-[0.65rem] truncate">
                    {item.destination ?? item.name}
                  </span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#cbd5e1] group-hover:text-brand-mid transition-colors shrink-0" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
