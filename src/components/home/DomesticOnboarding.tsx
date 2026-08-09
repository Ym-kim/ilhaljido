'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/i18n/types'
import type { BrandModelId } from '@/lib/media/brandModels'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'
import { localizeHref, isRouteVisibleIn } from '@/lib/i18n/localePath'

type L = Record<Lang, string>

type Entry = {
  slug: string
  href: string
  assetId: string
  modelId?: BrandModelId
  image: string
  imagePosition?: string
  name: L
  description: L
  tag: L
  alt: L
}

const COPY = {
  eyebrow: { KO: 'START CLOSE TO HOME', EN: 'AN EASY FIRST STAY', JP: '韓国で始めるワーケーション' },
  title: { KO: '가볍게 시작하는 국내 워케이션', EN: 'Start with an easy Korea or Japan stay', JP: '気軽に始める韓国ワーケーション' },
  lead: {
    KO: '먼 여행이 부담스럽다면 주말 2박 3일부터 시작해 보세요. 일하기 좋은 공간과 쉬기 좋은 동네를 함께 골랐어요.',
    EN: 'Begin with a short stay that keeps travel and work in balance, then go farther when it feels right.',
    JP: 'まずは週末の韓国滞在から。街で過ごす時間と、仕事のリズムを無理なく組み合わせました。',
  },
  primary: { KO: '국내 워케이션 보기', EN: 'Explore Korea workations', JP: '韓国ワーケーションを見る' },
  secondary: { KO: '30초 여행 찾기', EN: 'Find my trip in 30 seconds', JP: '30秒で旅を探す' },
  open: { KO: '여행 구성 보기', EN: 'View the trip set', JP: '旅の構成を見る' },
  quick: { KO: '빠르게 고르기', EN: 'Choose by pace', JP: '過ごし方から選ぶ' },
} satisfies Record<string, L>

const ENTRIES: Entry[] = [
  {
    slug: 'seoul-3n4d',
    href: '/collections/seoul-3n4d',
    assetId: 'domestic-seoul-model-j-city-noir-v2',
    modelId: 'WAK-MODEL-J',
    image: '/media/brand-models/domestic-seoul-model-j-city-noir-v2.webp',
    imagePosition: '72% 48%',
    name: { KO: '서울', EN: 'Seoul', JP: 'ソウル' },
    description: {
      KO: '도시의 리듬 안에서 일과 저녁 문화를 함께 구성하는 3박 4일',
      EN: 'A 3-night city stay balancing work hours with Seoul evenings',
      JP: '仕事の時間とソウルの夜を組み合わせる3泊4日',
    },
    tag: { KO: '도시형 3박 4일', EN: '3-night city stay', JP: '都市で3泊4日' },
    alt: { KO: '서울을 연상시키는 저녁 전시 골목을 여행 가방과 함께 걷는 여행자', EN: 'A traveler walking through an evening gallery lane inspired by Seoul', JP: 'ソウルをイメージした夕方のギャラリー通りを旅行バッグと歩く旅人' },
  },
  {
    slug: 'busan-weekend',
    href: '/collections/busan-weekend',
    assetId: 'domestic-busan-model-h-haeundae-v3',
    modelId: 'WAK-MODEL-H',
    image: '/media/brand-models/domestic-busan-model-h-haeundae-v3.webp',
    imagePosition: '45% 48%',
    name: { KO: '부산', EN: 'Busan', JP: '釜山' },
    description: {
      KO: '바다와 도심을 오가며 쉬는 시간을 확보하는 주말 2박 3일',
      EN: 'A weekend between the coast and the city, with room to slow down',
      JP: '海と街を行き来しながら余白をつくる週末2泊3日',
    },
    tag: { KO: '주말 2박 3일', EN: 'Weekend · 2 nights', JP: '週末2泊3日' },
    alt: { KO: '해운대 해변과 마린시티를 배경으로 걷는 성인 여행자', EN: 'An adult traveler walking with Haeundae Beach and Marine City behind her', JP: '海雲台ビーチとマリンシティを背景に歩く大人の旅行者' },
  },
  {
    slug: 'jeju',
    href: '/guide/jeju',
    assetId: 'domestic-jeju-model-i-coastal-stay-v3',
    modelId: 'WAK-MODEL-I',
    image: '/media/brand-models/domestic-jeju-model-i-coastal-stay-v3.webp',
    imagePosition: '68% 48%',
    name: { KO: '제주', EN: 'Jeju', JP: '済州' },
    description: {
      KO: '3박 이상 머물며 일상의 속도를 바꾸는 섬 체류 가이드',
      EN: 'An island guide for stays of three nights or longer',
      JP: '3泊以上滞在し、日常のペースを整える島のガイド',
    },
    tag: { KO: '3박 이상', EN: '3+ nights', JP: '3泊以上' },
    alt: { KO: '산방산과 제주 바다가 보이는 길을 노트와 함께 걷는 성인 여행자', EN: 'An adult traveler walking with a notebook above the Jeju coast and Sanbangsan', JP: '山房山と済州の海を望む道をノートと歩く大人の旅行者' },
  },
  {
    slug: 'fukuoka-3n4d',
    href: '/collections/fukuoka-3n4d',
    assetId: 'fukuoka-3n4d-editorial-v1',
    image: '/campaign/trip-sets/fukuoka-3n4d-editorial-v1.webp',
    name: { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' },
    description: {
      KO: '카페와 온천을 한 일정에 담는 가까운 해외 3박 4일',
      EN: 'A compact 3-night Japan stay shaped around cafés and a slower evening',
      JP: 'カフェと穏やかな夜を組み合わせる3泊4日',
    },
    tag: { KO: '가까운 해외', EN: 'Short Japan stay', JP: '近場の3泊4日' },
    alt: { KO: '후쿠오카의 카페와 도시 분위기', EN: 'A city scene inspired by Fukuoka', JP: '福岡のカフェと街の雰囲気' },
  },
]

// 2026-08-04: 무조건 prefix 구현이 EN에서 /en/trip-match(미존재) 404를 만들던 것 →
// 라우트 실존 매니페스트 기반 공용 헬퍼로 교체
const withLocale = localizeHref

export function DomesticOnboarding({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null)
  const entries = lang === 'EN' ? ENTRIES : ENTRIES.slice(0, 3)
  const quickChoices = lang === 'EN'
    ? [entries[1], entries[0], entries[3]]
    : [entries[1], entries[0], entries[2]]

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') return
    let sent = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || sent) return
      sent = true
      trackEvent('domestic_onboarding_view', { locale: lang, source: 'home', placement: 'after_trip_match' })
      observer.disconnect()
    }, { threshold: 0.25 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [lang])

  const trackDestination = (entry: Entry, placement: string) => {
    trackEvent('domestic_destination_click', {
      locale: lang,
      source: 'home',
      placement,
      destinationSlug: entry.slug,
      assetId: entry.assetId,
      ...(entry.modelId ? { modelId: entry.modelId } : {}),
    })
  }

  return (
    <section id="domestic-start" ref={sectionRef} className="scroll-mt-20 border-b border-[#dfe8e8] bg-[#f3f1eb] px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="wak-overline text-[#397083]">{COPY.eyebrow[lang]}</span>
            <h2 className="wak-section-title mt-3 max-w-2xl text-[#132d39]">{COPY.title[lang]}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#5e7077] sm:text-base">{COPY.lead[lang]}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={withLocale('/programs/domestic', lang)}
              onClick={() => trackEvent('domestic_destination_click', { locale: lang, source: 'home', placement: 'section_cta', destinationSlug: 'all' })}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#123849] px-5 text-sm font-black text-white transition hover:bg-[#0d536b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d536b]"
            >
              {COPY.primary[lang]} <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
            {/* EN은 /trip-match 대응 화면이 없어 CTA 자체를 숨김 (2026-08-07 구조 결정 ③) */}
            {isRouteVisibleIn('/trip-match', lang) && (
              <Link
                href={withLocale('/trip-match', lang)}
                onClick={() => trackEvent('domestic_destination_click', { locale: lang, source: 'home', placement: 'trip_match_cta', destinationSlug: 'trip-match' })}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#b9cdcf] bg-white/65 px-5 text-sm font-black text-[#1d4d5e] transition hover:border-[#6f9da7] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d536b]"
              >
                {COPY.secondary[lang]}
              </Link>
            )}
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 text-[0.67rem] font-black uppercase tracking-[0.14em] text-[#7b8b8f]">{COPY.quick[lang]}</span>
          {quickChoices.map((entry) => (
            <Link
              key={`quick-${entry.slug}`}
              href={withLocale(entry.href, lang)}
              onClick={() => trackDestination(entry, 'quick_choice')}
              className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-[#ccd9d8] bg-white/70 px-4 text-xs font-bold text-[#3c5a63] transition hover:border-[#78a2a8] hover:text-[#0d6077] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d536b]"
            >
              {entry.tag[lang]} · {entry.name[lang]}
            </Link>
          ))}
        </div>

        <div data-ui-grid="editorial" className="grid gap-4 min-[520px]:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={withLocale(entry.href, lang)}
              onClick={() => trackDestination(entry, 'destination_card')}
              data-ui-card="editorial"
              className="wak-card-editorial group flex h-full min-w-0 flex-col overflow-hidden border border-[#d5dfde] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#8eb3b7] hover:shadow-[0_18px_42px_rgba(27,67,77,0.12)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0d6c87]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#dfe8e7]">
                <Image
                  src={entry.image}
                  alt={entry.alt[lang]}
                  fill
                  loading="lazy"
                  sizes="(max-width: 519px) 100vw, (max-width: 1023px) 50vw, 288px"
                  style={{ objectPosition: entry.imagePosition ?? '50% 50%' }}
                  className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transition-none"
                />
                <span className="absolute left-3 top-3 rounded-full border border-white/35 bg-[#0a2938]/78 px-3 py-1 text-[0.65rem] font-black text-white backdrop-blur-sm">{entry.tag[lang]}</span>
              </div>
              <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <span className="wak-card-title text-[#142d38]">{entry.name[lang]}</span>
                <span className="mt-2 line-clamp-2 min-h-11 text-sm leading-[1.55] text-[#63747a]">{entry.description[lang]}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-[#087294]">
                  {COPY.open[lang]} <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={ICON_STROKE} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
