'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { ProductBrowser } from '@/components/affiliate/ProductBrowser'
import { CoupangGear } from '@/components/affiliate/CoupangGear'
import { SelectionCriteria } from '@/components/affiliate/SelectionCriteria'
import { HOME_FEATURED_ITEMS } from '@/lib/affiliate/links'
import { ALL_AFFILIATE_ITEMS } from '@/lib/affiliate/items'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { trackEvent } from '@/lib/track'

// ─────────────────────────────────────────────────────────────────────────────
// Wakation Select 허브 — 2026-07-13 i18n 적용 (KO 하드코딩 잔존 해소, 인라인 3언어)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  title1: { KO: '워케이션 준비,', EN: 'Your workation prep,', JP: 'ワーケーションの準備、' },
  title2a: { KO: '한 곳에서', EN: 'all in one place', JP: 'ここひとつで' },
  title2b: { KO: ' 끝내세요', EN: '', JP: '完結' },
  sub: {
    KO: '숙소부터 현지 체험, eSIM, 항공·교통까지. 워케이션에 필요한 외부 제휴 서비스를 여행지별로 큐레이션합니다.',
    EN: 'Stays, local experiences, eSIMs and online courses — partner services curated by destination for your workation.',
    JP: '宿の予約から現地体験、eSIM、オンライン講座まで。ワーケーションに合う提携サービスを目的地別にキュレーション。',
  },
  note: {
    KO: '목적지와 체류 방식에 맞춰 비교하기 좋은 상품만 모았습니다.',
    EN: 'A focused edit of products worth comparing for each destination and stay style.',
    JP: '目的地と滞在スタイルに合わせて、比較しやすい商品を厳選しました。',
  },
  cat_label: { KO: '카테고리', EN: 'CATEGORIES', JP: 'カテゴリー' },
  browse: { KO: '둘러보기', EN: 'Browse', JP: '見てみる' },
  stays_eyebrow: { KO: '추천 숙소', EN: 'FEATURED STAYS', JP: 'おすすめの宿' },
  stays_title: { KO: 'Wakation 큐레이션 숙소', EN: 'Wakation curated stays', JP: 'Wakation厳選の宿' },
  see_all: { KO: '전체 보기', EN: 'See all', JP: 'すべて見る' },
  f_all: { KO: '전체', EN: 'All', JP: 'すべて' },
  f_japan: { KO: '일본', EN: 'Japan', JP: '日本' },
  f_bali: { KO: '발리', EN: 'Bali', JP: 'バリ' },
  etc_eyebrow: { KO: '이동 · 체험 · eSIM', EN: 'TRANSPORT · EXPERIENCES · eSIM', JP: '移動 · 体験 · eSIM' },
  etc_title: { KO: '도착하기 전 미리 준비하세요', EN: 'Get ready before you land', JP: '到着前に準備しておこう' },
  etc_sub: {
    KO: '항공·렌터카·공항픽업 등 이동부터, 현지 투어와 공항 도착 즉시 연결되는 eSIM까지',
    EN: 'From flights, car rental and airport pickup to local tours and an eSIM that connects on arrival',
    JP: '航空券·レンタカー·空港送迎などの移動から、現地ツアーと到着後すぐ繋がるeSIMまで',
  },
  all_activity: { KO: '현지 체험 전체 보기', EN: 'See all experiences', JP: '現地体験をすべて見る' },
  all_esim: { KO: 'eSIM 전체 보기', EN: 'See all eSIMs', JP: 'eSIMをすべて見る' },
  learn_eyebrow: { KO: '강의 · 학습', EN: 'COURSES · LEARNING', JP: '講座 · 学習' },
  learn_title: { KO: '워케이션 중 성장하는 강의', EN: 'Courses that grow with your workation', JP: 'ワーケーション中に成長する講座' },
  learn_desc: {
    KO: 'AI 자동화, 마케팅, 생산성. 인프런 파트너 강의 큐레이션.',
    EN: 'AI automation, marketing and productivity — curated Inflearn partner courses.',
    JP: 'AI自動化·マーケティング·生産性。インフラン提携講座のキュレーション。',
  },
  disc1: {
    KO: '* 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다. 외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.',
    EN: '* Some external links may earn Wakation a commission through affiliate programs. Booking, payment and refund terms follow each service’s own policies.',
    JP: '* 一部の外部リンクは提携プログラムを通じてWakationに収益が発生する場合があります。予約·決済·返金条件は各サービスの規約に従います。',
  },
  disc2: {
    KO: 'Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.',
    EN: 'Programs run by Wakation are distinct from external partner services.',
    JP: 'Wakation直営プログラムと外部提携サービスは区別されます。',
  },
  disc3: {
    KO: '요금과 상품 조건은 제휴사 사이트에서 최종 확인됩니다.',
    EN: 'Final prices and product terms are confirmed on partner sites.',
    JP: '料金·商品条件は提携先サイトで最終確認されます。',
  },
  booking_note: { KO: '예약 전 확인', EN: 'Before booking', JP: '予約前の確認' },
}

// 목적지 필터 (에어비앤비 스타일)
const DEST_FILTERS = [
  { id: 'all', labelKey: 'f_all' },
  { id: 'japan', labelKey: 'f_japan' },
  { id: 'bali', labelKey: 'f_bali' },
] as const
type DestFilter = typeof DEST_FILTERS[number]['id']

const SELECT_HERO_ASSET = {
  id: 'select-model-c-packing-flatlay-v4',
  modelId: 'WAK-MODEL-C',
  src: '/media/brand-models/select-model-c-packing-flatlay-v4.webp',
  alt: {
    KO: '열린 여행가방 옆에 앉아 워케이션 준비물을 정리하는 여행자',
    EN: 'A traveler organizing workation essentials beside an open suitcase',
    JP: '開いたスーツケースの旁でワーケーションの持ち物を整える旅人',
  } satisfies L,
} as const

const CATEGORIES: {
  id: string
  href: string
  label: L
  title: L
  badge: L
  badgeClass: string
  cardClass: string
  cta: string
}[] = [
  {
    id: 'hotel',
    href: '/select/hotel',
    label: { KO: '숙소 찾기', EN: 'Find stays', JP: '宿泊先を探す' },
    title: {
      KO: '목적지별 숙소 큐레이션',
      EN: 'Stays curated by destination',
      JP: '目的地別の宿キュレーション',
    },
    badge: { KO: '제휴', EN: 'Partner', JP: '提携' },
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cardClass: 'border-emerald-100 hover:border-emerald-200 hover:shadow-md',
    cta: 'text-emerald-600',
  },
  {
    id: 'activity',
    href: '/select/activity',
    label: { KO: '현지 체험', EN: 'Experiences', JP: '現地体験' },
    title: {
      KO: '목적지별 투어·액티비티',
      EN: 'Tours and activities by destination',
      JP: '目的地別ツアー·アクティビティ',
    },
    badge: { KO: '제휴', EN: 'Partner', JP: '提携' },
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cardClass: 'border-emerald-100 hover:border-emerald-200 hover:shadow-md',
    cta: 'text-emerald-600',
  },
  {
    id: 'esim',
    href: '/select/esim',
    label: { KO: 'eSIM', EN: 'eSIM', JP: 'eSIM' },
    title: {
      KO: '목적지별 eSIM 즉시 구매',
      EN: 'Instant eSIMs by destination',
      JP: '目的地別eSIMを即購入',
    },
    badge: { KO: '큐레이션', EN: 'Curated', JP: '厳選' },
    badgeClass: 'bg-[#f1f5f9] text-[#64748b] border-[#e2e8f0]',
    cardClass: 'border-[#e5e1da] hover:border-[#d0ccc4] hover:shadow-sm',
    cta: 'text-[#9a9a9a]',
  },
  {
    id: 'learn',
    href: '/select/learn',
    label: { KO: '강의·학습', EN: 'Courses', JP: '講座·学習' },
    title: {
      KO: '워케이션 중 성장하는 강의',
      EN: 'Courses to grow during your stay',
      JP: '滞在中に成長する講座',
    },
    badge: { KO: '큐레이션', EN: 'Curated', JP: '厳選' },
    badgeClass: 'bg-[#f1f5f9] text-[#64748b] border-[#e2e8f0]',
    cardClass: 'border-[#e5e1da] hover:border-[#d0ccc4] hover:shadow-sm',
    cta: 'text-[#9a9a9a]',
  },
]

const PREP_TIMING: Record<string, L> = {
  hotel: { KO: '여행 2~4주 전', EN: '2–4 weeks before', JP: '出発2〜4週間前' },
  activity: { KO: '여행 1주 전', EN: 'About a week before', JP: '出発1週間前' },
  esim: { KO: '출발 1~3일 전', EN: '1–3 days before', JP: '出発1〜3日前' },
  learn: { KO: '여행 전후', EN: 'Before and after', JP: '旅の前後' },
}

export function SelectHubView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  useEffect(() => {
    trackEvent('visual_asset_view', {
      assetId: SELECT_HERO_ASSET.id,
      modelId: SELECT_HERO_ASSET.modelId,
      route: lang === 'JP' ? '/ja/select' : lang === 'EN' ? '/en/select' : '/select',
      section: 'select_hero_editorial',
      locale: lang,
      placement: 'editorial_banner',
    })
  }, [lang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''

  const [activeFilter, setActiveFilter] = useState<DestFilter>('all')

  const allHotelItems = HOME_FEATURED_ITEMS.filter((i) =>
    ['feat-tokyo-hotel', 'feat-osaka-hotel', 'feat-fukuoka-hotel', 'feat-bali-hotel'].includes(i.id)
  )
  // ⚠️ 소스는 전체 카탈로그로 — HOME_FEATURED_ITEMS는 showOn 'home' 아이템만 담아
  //    홈 미노출 아이템(taxi 등)이 걸러지는 함정이 있음 (2026-07-16 실배포에서 발견)
  const etcItems = ALL_AFFILIATE_ITEMS.filter((i) =>
    // 여정 준비 활성 파트너: 항공·렌터카·공항픽업·택시·라운지(이동) + 체험 + eSIM
    [
      'feat-flight-tripcom', 'feat-carhire-tripcom', 'feat-transfer-klook', 'feat-taxi-booking',
      'feat-lounge-klook', 'feat-eurail-klook', 'feat-japan-activity', 'feat-bali-activity', 'feat-japan-esim',
    ].includes(i.id)
  )

  const hotelItems = activeFilter === 'all'
    ? allHotelItems
    : activeFilter === 'japan'
    ? allHotelItems.filter((i) => i.country === '일본')
    : allHotelItems.filter((i) => i.country === '인도네시아')

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="border-b border-[#ded8cf] bg-[#f4efe7] px-5 pb-14 pt-24 sm:px-6 md:pb-20 md:pt-28">
        <div className="mx-auto grid max-w-6xl items-center gap-9 lg:grid-cols-[minmax(0,0.88fr)_minmax(30rem,1.12fr)] lg:gap-12">
          <div className="min-w-0">
            <span className="wak-overline text-[#397083]">WAKATION SELECT</span>
            <h1 className="wak-page-title mt-4 max-w-xl text-[#17242b]">
              {COPY.title1[lang]}<br />
              <span className="text-brand-mid">{COPY.title2a[lang]}</span>{COPY.title2b[lang]}
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-[#485a62] sm:text-lg sm:leading-8">
              {COPY.sub[lang]}
            </p>
            <p className="mt-3 text-xs font-medium leading-5 text-[#747d80]">{COPY.note[lang]}</p>
            <SelectionCriteria className="mt-5" />
          </div>
          <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-[1.5rem] border border-white/70 bg-[#d9e1df] shadow-[0_22px_60px_rgba(36,54,60,0.16)] lg:aspect-[16/11]">
            <Image
              src={SELECT_HERO_ASSET.src}
              alt={SELECT_HERO_ASSET.alt[lang]}
              fill
              preload
              sizes="(max-width: 1023px) 100vw, 52vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#102532]/20 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/35 bg-[#102532]/78 px-3 py-1.5 text-[0.65rem] font-black text-white backdrop-blur-sm">
              {lang === 'KO' ? '여행 준비의 시작' : lang === 'JP' ? '旅の準備を始める' : 'Start with the essentials'}
            </span>
          </div>
        </div>
      </section>

      {/* 여행 준비 시점 — 카테고리 나열 대신 언제 준비할지 보여주는 여정 */}
      <section className="px-6 py-10 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#64748b] text-[0.7rem] font-bold tracking-[0.18em] uppercase mb-4">
            {COPY.cat_label[lang]}
          </p>
          <ol data-visual-module="preparation-timeline" data-motion="reveal" data-motion-speed="editorial" aria-label={COPY.cat_label[lang]} className="grid overflow-hidden border border-[#d9e1df] bg-[#d9e1df] lg:grid-cols-4">
            {CATEGORIES.map((cat, index) => (
              <li key={cat.id} className="relative bg-white">
                <Link
                  href={`${prefix}${cat.href}`}
                  onClick={() => trackEvent('preparation_step_click', { route: '/select', locale: lang, sectionId: 'preparation-timeline', visualType: 'timeline-rail', contentId: cat.id, position: String(index + 1), targetRoute: `${prefix}${cat.href}` })}
                  className="group flex min-h-40 gap-4 p-5 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sky-500 lg:min-h-52 lg:flex-col lg:p-6"
                >
                  <div className="flex shrink-0 flex-col items-center lg:flex-row lg:items-center lg:gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#153846] text-xs font-black text-white">{index + 1}</span>
                    <span aria-hidden="true" className="mt-2 h-full w-px bg-[#bfd0d4] lg:mt-0 lg:h-px lg:w-10" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.66rem] font-black tracking-[0.12em] text-[#568091]">{PREP_TIMING[cat.id][lang]}</p>
                    <h2 className="mt-2 text-base font-black text-[#17242b]">{cat.label[lang]}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#617077]">{cat.title[lang]}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-mid">
                      {COPY.browse[lang]} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={ICON_STROKE} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 추천 숙소 상품 */}
      <section className="pb-14 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto px-6 pt-12">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-brand-mid text-xs font-bold tracking-widest uppercase mb-2">
                {COPY.stays_eyebrow[lang]}
              </p>
              <h2 className="text-[#141414] font-black text-xl md:text-2xl">
                {COPY.stays_title[lang]}
              </h2>
            </div>
            <Link
              href={`${prefix}/select/hotel`}
              className="text-brand-mid text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all shrink-0"
            >
              {COPY.see_all[lang]} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            </Link>
          </div>

          {/* 목적지 필터 pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden mb-5">
            {DEST_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-150 ${
                  activeFilter === f.id
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-white border-[#e5e1da] text-[#7a7a7a] hover:border-[#c8c4be] hover:text-[#4a4a4a]'
                }`}
              >
                {COPY[f.labelKey][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* 모바일: 2열 그리드 / lg+: 4열 */}
        <div className="grid grid-cols-1 gap-3 px-4 min-[520px]:grid-cols-2 sm:gap-4 sm:px-6 lg:grid-cols-4 max-w-6xl sm:mx-auto">
          {hotelItems.map((item) => (
            <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
          ))}
        </div>
      </section>

      {/* 카테고리 탭 상품 브라우저 — 숙소·체험·eSIM·강의·크루즈·기획전 인라인 탐색 */}
      <ProductBrowser />

      {/* 체험·eSIM */}
      <section id="transport" className="scroll-mt-24 px-6 py-14 border-b border-[#e5e1da] bg-[#f9f7f3]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-[#a0a0a0] text-xs font-bold tracking-widest uppercase mb-2">
              {COPY.etc_eyebrow[lang]}
            </p>
            <h2 className="text-[#141414] font-black text-xl md:text-2xl">
              {COPY.etc_title[lang]}
            </h2>
            <p className="text-[#475569] text-sm mt-1.5">{COPY.etc_sub[lang]}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {etcItems.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href={`${prefix}/select/activity`}
              className="group flex items-center justify-between bg-white border border-[#e5e1da] hover:border-[#c8c4be] rounded-xl p-4 transition-all hover:shadow-sm"
            >
              <span className="text-[#5c5c5c] text-sm font-bold">{COPY.all_activity[lang]}</span>
              <ArrowRight className="w-4 h-4 text-[#c0bdb8] group-hover:text-brand-mid transition-colors" strokeWidth={ICON_STROKE} />
            </Link>
            <Link
              href={`${prefix}/select/esim`}
              className="group flex items-center justify-between bg-white border border-[#e5e1da] hover:border-[#c8c4be] rounded-xl p-4 transition-all hover:shadow-sm"
            >
              <span className="text-[#5c5c5c] text-sm font-bold">{COPY.all_esim[lang]}</span>
              <ArrowRight className="w-4 h-4 text-[#c0bdb8] group-hover:text-brand-mid transition-colors" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </section>

      {/* 여행 준비물 — 쿠팡 파트너스 */}
      <CoupangGear />

      {/* 강의 배너 */}
      <section className="px-6 py-12 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`${prefix}/select/learn`}
            className="group flex items-center justify-between bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 hover:border-indigo-200 rounded-2xl p-5 sm:p-6 transition-all hover:shadow-md"
          >
            <div className="min-w-0">
              <p className="text-indigo-500 text-xs font-bold tracking-widest uppercase mb-2">
                {COPY.learn_eyebrow[lang]}
              </p>
              <p className="text-[#141414] font-black text-lg mb-1">{COPY.learn_title[lang]}</p>
              <p className="text-[#6b6b6b] text-sm">{COPY.learn_desc[lang]}</p>
            </div>
            <ArrowRight
              className="w-5 h-5 text-[#c0bdb8] group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-3 sm:ml-6"
              strokeWidth={ICON_STROKE}
            />
          </Link>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 pt-8">
        <details className="group mx-auto max-w-6xl border-t border-[#e8e4dd] pt-4">
          <summary className="w-fit cursor-pointer list-none text-[0.7rem] font-bold text-[#77716a] underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
            {COPY.booking_note[lang]}
            <span aria-hidden="true" className="ml-1 inline-block transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-3 max-w-2xl space-y-1 text-[0.65rem] leading-relaxed text-[#918b83]">
            <span className="block">{COPY.disc1[lang]}</span>
            <span className="block">{COPY.disc2[lang]}</span>
            <span className="block">{COPY.disc3[lang]}</span>
          </div>
        </details>
      </section>
    </div>
  )
}
