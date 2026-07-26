'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BedDouble, Sparkles, Wifi, BookOpen, Ship, LayoutGrid, ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import {
  FEATURED_STAYS,
  FEATURED_STAYS_V2,
  FEATURED_STAYS_V3,
  FEATURED_ACTIVITIES,
  FEATURED_ESIM,
  FEATURED_CRUISES,
  FEATURED_COURSES,
  THEME_EXPERIENCES,
} from '@/lib/affiliate/featured'
import { COLLECTIONS } from '@/lib/affiliate/collections'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import type { AffiliateItem } from '@/lib/affiliate/types'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 카테고리 탭 상품 브라우저 — 하나투어형 탭 브라우징
// 숙소·체험·eSIM·강의·크루즈·기획전을 탭으로 전환하며 실상품을 인라인 탐색.
// 전부 검증된 제휴 상품(active만). 기획전 탭은 컬렉션 카드로 연결.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const onlyActive = (arr: AffiliateItem[]) => arr.filter((i) => i.status === 'active_affiliate')

const STAYS = onlyActive([...FEATURED_STAYS, ...FEATURED_STAYS_V2, ...FEATURED_STAYS_V3]).slice(0, 8)
const ACTIVITIES = onlyActive([...FEATURED_ACTIVITIES, ...THEME_EXPERIENCES]).slice(0, 8)
const ESIMS = onlyActive(FEATURED_ESIM)
const COURSES = onlyActive(FEATURED_COURSES).slice(0, 8)
const CRUISES = onlyActive(FEATURED_CRUISES)

type TabId = 'stay' | 'activity' | 'esim' | 'learn' | 'cruise' | 'collection'

const TABS: { id: TabId; icon: typeof BedDouble; label: L; count: number }[] = [
  { id: 'stay',       icon: BedDouble,  label: { KO: '숙소', EN: 'Stays', JP: '宿' }, count: STAYS.length },
  { id: 'activity',   icon: Sparkles,   label: { KO: '체험', EN: 'Experiences', JP: '体験' }, count: ACTIVITIES.length },
  { id: 'esim',       icon: Wifi,       label: { KO: 'eSIM', EN: 'eSIM', JP: 'eSIM' }, count: ESIMS.length },
  { id: 'learn',      icon: BookOpen,   label: { KO: '강의', EN: 'Courses', JP: '講座' }, count: COURSES.length },
  { id: 'cruise',     icon: Ship,       label: { KO: '크루즈', EN: 'Cruises', JP: 'クルーズ' }, count: CRUISES.length },
  { id: 'collection', icon: LayoutGrid, label: { KO: '기획전', EN: 'Collections', JP: '特集' }, count: COLLECTIONS.length },
]

const COPY: Record<string, L> = {
  eyebrow: { KO: '전체 둘러보기', EN: 'BROWSE ALL', JP: 'すべて見る' },
  title: { KO: '카테고리로 골라보세요', EN: 'Browse by category', JP: 'カテゴリーで選ぶ' },
  sub: {
    KO: '숙소부터 기획전까지 — 검증된 제휴 상품을 한 곳에서 둘러보세요.',
    EN: 'From stays to collections — browse verified partner products in one place.',
    JP: '宿から特集まで — 検証済み提携商品を一箇所で。',
  },
  view: { KO: '구성 보기', EN: 'View items', JP: '構成を見る' },
}

function ItemGrid({ items, lang }: { items: AffiliateItem[]; lang: Lang }) {
  return (
    <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
      ))}
    </div>
  )
}

export function ProductBrowser() {
  const { lang } = useLang()
  const [tab, setTab] = useState<TabId>('stay')

  return (
    <section className="px-6 py-14 border-b border-[#e5e1da] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <p className="text-brand-mid text-xs font-bold tracking-widest uppercase mb-2">{COPY.eyebrow[lang]}</p>
          <h2 className="text-[#141414] font-black text-xl md:text-2xl mb-1.5">{COPY.title[lang]}</h2>
          <p className="text-[#7a7a7a] text-sm">{COPY.sub[lang]}</p>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-7 [&::-webkit-scrollbar]:hidden">
          {TABS.map((t) => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={active}
                className={`shrink-0 inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-full border transition-all duration-150 ${
                  active
                    ? 'bg-brand-mid border-brand-mid text-white shadow-sm'
                    : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-brand-mid/50 hover:text-[#111827]'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={ICON_STROKE} />
                {t.label[lang]}
                <span className={`text-[0.7rem] font-black ${active ? 'text-white/75' : 'text-[#94a3b8]'}`}>{t.count}</span>
              </button>
            )
          })}
        </div>

        {/* 패널 */}
        {tab === 'stay' && <ItemGrid items={STAYS} lang={lang} />}
        {tab === 'activity' && <ItemGrid items={ACTIVITIES} lang={lang} />}
        {tab === 'esim' && <ItemGrid items={ESIMS} lang={lang} />}
        {tab === 'learn' && <ItemGrid items={COURSES} lang={lang} />}
        {tab === 'cruise' && <ItemGrid items={CRUISES} lang={lang} />}
        {tab === 'collection' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLLECTIONS.map((col) => {
              const count = getCatalogItems(col.itemIds).length
              return (
                <Link
                  key={col.slug}
                  href={`/collections/${col.slug}`}
                  className="group relative rounded-2xl overflow-hidden block h-52 border border-[#e2e8f0] hover:border-brand-mid transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Image src={col.photo} alt={col.title[lang]} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/30 to-transparent" />
                  <span className="absolute top-3 left-3 text-[0.65rem] font-black px-2 py-0.5 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                    {count}{lang === 'KO' ? '개' : lang === 'JP' ? '点' : ''}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-black text-base leading-snug mb-0.5">
                      {col.title[lang]}
                    </h3>
                    <p className="text-white/70 text-xs mb-2">{col.tagline[lang]}</p>
                    <span className="inline-flex items-center gap-1 text-sky-300 text-xs font-bold group-hover:gap-2 transition-all">
                      {COPY.view[lang]} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
