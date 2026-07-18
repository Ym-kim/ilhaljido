'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, ArrowRight, Compass } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { useWishlist } from '@/hooks/useWishlist'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import type { Lang } from '@/lib/i18n/types'

// 찜한 상품 모아보기 — localStorage 기반(로그인 불필요). 개인 페이지라 noindex.
type L = Record<Lang, string>
const COPY: Record<string, L> = {
  eyebrow: { KO: 'MY WAKATION', EN: 'MY WAKATION', JP: 'MY WAKATION' },
  title: { KO: '찜한 상품', EN: 'Saved items', JP: '保存したアイテム' },
  sub: {
    KO: '하트를 누른 숙소·체험·강의를 한곳에 모았습니다. 이 브라우저에 저장돼요.',
    EN: 'Every stay, experience and course you hearted, in one place — saved in this browser.',
    JP: 'ハートを付けた宿·体験·講座を一箇所に。このブラウザに保存されます。',
  },
  empty_title: { KO: '아직 찜한 상품이 없어요', EN: 'No saved items yet', JP: 'まだ保存したアイテムがありません' },
  empty_sub: {
    KO: '상품 카드의 하트를 누르면 여기에 모입니다.',
    EN: 'Tap the heart on any product card to collect it here.',
    JP: '商品カードのハートを押すとここに集まります。',
  },
  browse: { KO: '상품 둘러보기', EN: 'Browse products', JP: '商品を見る' },
  count: { KO: '개', EN: '', JP: '点' },
}

export function WishlistView() {
  const { lang } = useLang()
  const { ids } = useWishlist()
  // 위시리스트는 mount 후에야 localStorage에서 채워짐 → 그 전엔 빈 상태 대신 대기
  // (복귀 사용자가 '없음' 화면을 깜빡 보는 문제 방지)
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const items = getCatalogItems(ids).map((i) => localizeAffiliateItem(i, lang))

  return (
    <div className="min-h-screen bg-white">
      <section className="px-6 pt-24 pb-8 bg-[#f0f9ff] border-b border-[#dbeafe]">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-3">{COPY.eyebrow[lang]}</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-3 flex items-center gap-2.5">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            {COPY.title[lang]}
            {items.length > 0 && <span className="text-[#94a3b8] text-xl font-bold">{items.length}{COPY.count[lang]}</span>}
          </h1>
          <p className="text-[#64748b] text-sm md:text-base max-w-2xl leading-relaxed">{COPY.sub[lang]}</p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {!hydrated ? (
            <div className="min-h-[30vh]" aria-hidden />
          ) : items.length === 0 ? (
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-3xl px-8 py-16 text-center max-w-xl mx-auto">
              <Compass className="w-10 h-10 text-[#cbd5e1] mx-auto mb-4" strokeWidth={ICON_STROKE} />
              <p className="text-[#111827] font-black text-lg mb-1.5">{COPY.empty_title[lang]}</p>
              <p className="text-[#64748b] text-sm mb-6">{COPY.empty_sub[lang]}</p>
              <Link
                href="/select"
                className="inline-flex items-center gap-2 bg-brand-mid text-white font-bold px-6 py-3 rounded-full hover:bg-brand-light transition-all text-sm"
              >
                {COPY.browse[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {items.map((item) => (
                <AffiliateCard key={item.id} item={item} visual />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
