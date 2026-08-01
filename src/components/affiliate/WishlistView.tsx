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
import { SavedTripMatchesSection } from '@/components/trip-match/SavedTripMatchesSection'
import { SavedSupportProgramsSection } from '@/components/programs/SavedSupportProgramsSection'
import { useSavedSupportPrograms } from '@/hooks/useSavedSupportPrograms'
import { useSavedTripMatches } from '@/hooks/useSavedTripMatches'

// 찜한 상품 모아보기 — localStorage 기반(로그인 불필요). 개인 페이지라 noindex.
type L = Record<Lang, string>
const COPY: Record<string, L> = {
  eyebrow: { KO: 'MY WAKATION', EN: 'MY WAKATION', JP: 'MY WAKATION' },
  title: { KO: '저장한 여행', EN: 'Saved trips', JP: '保存した旅' },
  sub: {
    KO: '여행 찾기 결과와 하트를 누른 상품을 한곳에 모았습니다. 이 브라우저에 저장돼요.',
    EN: 'Your trip matches and hearted items, together in one place — saved in this browser.',
    JP: '旅探しの結果とハートを付けた商品をひとつに。このブラウザに保存されます。',
  },
  empty_title: { KO: '아직 찜한 상품이 없어요', EN: 'No saved items yet', JP: 'まだ保存したアイテムがありません' },
  empty_sub: {
    KO: '상품 카드의 하트를 누르면 여기에 모입니다.',
    EN: 'Tap the heart on any product card to collect it here.',
    JP: '商品カードのハートを押すとここに集まります。',
  },
  browse: { KO: '상품 둘러보기', EN: 'Browse products', JP: '商品を見る' },
  next_title: { KO: '무엇을 저장할지부터 찾아보세요', EN: 'Find something worth saving', JP: '保存したい旅を見つける' },
  trip_match_t: { KO: '30초 여행 찾기', EN: 'Find my trip', JP: '30秒で旅を探す' },
  trip_match_d: { KO: '기간과 기분에 맞는 여행 구성을 저장합니다.', EN: 'Save a trip set matched to your time and mood.', JP: '日数と気分に合う旅の構成を保存します。' },
  destinations_t: { KO: '여행지 살펴보기', EN: 'Explore destinations', JP: '行き先を見る' },
  destinations_d: { KO: '도시의 비용·인터넷·계절을 비교합니다.', EN: 'Compare city costs, connectivity and seasons.', JP: '都市の費用・通信環境・季節を比べます。' },
  support_t: { KO: '지원 프로그램 찾기', EN: 'Find support programs', JP: '地域支援プログラムを見る' },
  support_d: { KO: '모집 조건과 공식 공고를 확인하고 저장합니다.', EN: 'Check eligibility and official notices, then save.', JP: '募集条件と公式情報を確認して保存します。' },
  count: { KO: '개', EN: '', JP: '点' },
}

export function WishlistView() {
  const { lang } = useLang()
  const { ids } = useWishlist()
  const { ids: supportIds } = useSavedSupportPrograms()
  const { items: savedTripMatches } = useSavedTripMatches()
  // 위시리스트는 mount 후에야 localStorage에서 채워짐 → 그 전엔 빈 상태 대신 대기
  // (복귀 사용자가 '없음' 화면을 깜빡 보는 문제 방지)
  const [hydrated, setHydrated] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect -- 하이드레이션 가드(복귀 사용자 '없음' 깜빡 방지) 의도 패턴
  useEffect(() => setHydrated(true), [])
  const items = getCatalogItems(ids).map((i) => localizeAffiliateItem(i, lang))
  const prefix = lang === 'JP' ? '/ja' : lang === 'EN' ? '/en' : ''
  const discoveryLinks = [
    { href: lang === 'JP' ? '/ja/trip-match' : '/trip-match', title: COPY.trip_match_t[lang], desc: COPY.trip_match_d[lang] },
    { href: `${prefix}/destinations`, title: COPY.destinations_t[lang], desc: COPY.destinations_d[lang] },
    { href: '/programs/support', title: COPY.support_t[lang], desc: COPY.support_d[lang] },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="px-6 pt-24 pb-8 bg-[#f0f9ff] border-b border-[#dbeafe]">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-3">{COPY.eyebrow[lang]}</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-3 flex items-center gap-2.5">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            {COPY.title[lang]}
          </h1>
          <p className="text-[#64748b] text-sm md:text-base max-w-2xl leading-relaxed">{COPY.sub[lang]}</p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <SavedTripMatchesSection />
          <SavedSupportProgramsSection />
          {!hydrated ? (
            <div className="min-h-[30vh]" aria-hidden />
          ) : items.length === 0 && supportIds.length === 0 && savedTripMatches.length === 0 ? (
            <div className="mx-auto max-w-4xl">
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-3xl px-8 py-12 text-center max-w-xl mx-auto">
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
            <h2 className="mt-12 text-center text-2xl font-black text-[#111827]">{COPY.next_title[lang]}</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {discoveryLinks.map((item) => (
                <Link key={item.href} href={item.href} className="group flex min-h-40 flex-col border-t border-[#cbd5e1] px-1 py-5 text-left hover:border-brand-mid">
                  <h3 className="text-lg font-black text-[#111827]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{item.desc}</p>
                  <ArrowRight className="mt-auto h-4 w-4 text-brand-mid transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {items.map((item) => (
                <AffiliateCard key={item.id} item={item} visual />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
