'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'
import { localizeHref, isRouteVisibleIn } from '@/lib/i18n/localePath'
import { getDomesticDiscoveries, type DomesticDiscoveryEntry } from '@/lib/domesticDiscovery'

type L = Record<Lang, string>

const COPY = {
  eyebrow: { KO: 'START CLOSE TO HOME', EN: 'TRAVEL IN KOREA', JP: '韓国で過ごす旅' },
  title: { KO: '서울보다 먼저, 지금 떠나고 싶은 국내 8곳', EN: 'Eight ways to travel and work around Korea', JP: '韓国で旅とはたらく、8つの行き先' },
  lead: {
    KO: '바다·한옥·기차·도시의 리듬을 기준으로 골랐어요. 지역 정보부터 여행 구성, 날짜를 넣은 숙소 검색까지 한 번에 이어집니다.',
    EN: 'Choose by coast, city, hanok lanes or a slower train. Each route links practical city notes with a ready-to-search stay.',
    JP: '海、都市、韓屋の路地、ゆっくり走る列車。街の情報から日付を入れた宿探しまで、ひとつの流れで確認できます。',
  },
  primary: { KO: '국내 여행 살펴보기', EN: 'Explore travel in Korea', JP: '韓国の旅を見る' },
  secondary: { KO: '30초 여행 찾기', EN: 'Find my trip in 30 seconds', JP: '30秒で旅を探す' },
  open: { KO: '지역 정보 보기', EN: 'Explore this place', JP: '地域情報を見る' },
  quick: { KO: '빠르게 고르기', EN: 'Choose by pace', JP: '滞在スタイルで選ぶ' },
} satisfies Record<string, L>

export function DomesticOnboarding({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null)
  const entries = getDomesticDiscoveries(lang)
  const quickChoices = entries.slice(0, 4)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') return
    let sent = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || sent) return
      sent = true
      trackEvent('domestic_onboarding_view', { locale: lang, source: 'home', placement: 'after_trip_match' })
      observer.disconnect()
    }, { threshold: 0.2 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [lang])

  const trackDestination = (entry: DomesticDiscoveryEntry, placement: string) => {
    trackEvent('domestic_destination_click', {
      locale: lang,
      source: 'home',
      placement,
      destinationSlug: entry.id,
      assetId: entry.assetId,
    })
  }

  return (
    <section id="domestic-start" ref={sectionRef} className="scroll-mt-20 border-b border-[#dfe8e8] bg-[#f3f1eb] px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="wak-overline text-[#397083]">{COPY.eyebrow[lang]}</span>
            <h2 className="wak-section-title mt-3 max-w-3xl text-[#132d39] [word-break:keep-all]">{COPY.title[lang]}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5e7077] sm:text-base">{COPY.lead[lang]}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:flex md:shrink-0">
            <Link
              href={localizeHref('/programs/domestic', lang)}
              onClick={() => trackEvent('domestic_destination_click', { locale: lang, source: 'home', placement: 'section_cta', destinationSlug: 'all' })}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#123849] px-4 text-center text-xs font-black text-white transition hover:bg-[#0d536b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d536b] sm:px-5 sm:text-sm"
            >
              {COPY.primary[lang]} <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={ICON_STROKE} />
            </Link>
            {isRouteVisibleIn('/trip-match', lang) && (
              <Link
                href={localizeHref('/trip-match', lang)}
                onClick={() => trackEvent('domestic_destination_click', { locale: lang, source: 'home', placement: 'trip_match_cta', destinationSlug: 'trip-match' })}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#b9cdcf] bg-white/65 px-4 text-center text-xs font-black text-[#1d4d5e] transition hover:border-[#6f9da7] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d536b] sm:px-5 sm:text-sm"
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
              key={`quick-${entry.id}`}
              href={entry.href[lang]}
              onClick={() => trackDestination(entry, 'quick_choice')}
              className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-[#ccd9d8] bg-white/70 px-4 text-xs font-bold text-[#3c5a63] transition hover:border-[#78a2a8] hover:text-[#0d6077] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d536b]"
            >
              {entry.duration[lang]} · {entry.name[lang]}
            </Link>
          ))}
        </div>

        <div data-ui-grid="destination" className="grid gap-4 min-[520px]:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry) => (
            <Link
              id={`domestic-${entry.id}`}
              key={entry.id}
              href={entry.href[lang]}
              onClick={() => trackDestination(entry, 'destination_card')}
              data-ui-card="destination"
              className="wak-card-editorial group flex h-full min-w-0 scroll-mt-24 flex-col overflow-hidden border border-[#d5dfde] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#8eb3b7] hover:shadow-[0_18px_42px_rgba(27,67,77,0.12)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0d6c87]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#dfe8e7]">
                <Image
                  src={entry.image}
                  alt={entry.alt[lang]}
                  fill
                  loading="lazy"
                  sizes="(max-width: 519px) 100vw, (max-width: 1023px) 50vw, 288px"
                  quality={78}
                  unoptimized={entry.image.endsWith('.webp')}
                  style={{ objectPosition: entry.imagePosition ?? '50% 50%' }}
                  className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transition-none"
                />
                <span className="absolute left-3 top-3 rounded-full border border-white/35 bg-[#0a2938]/78 px-3 py-1 text-[0.65rem] font-black text-white backdrop-blur-sm">{entry.duration[lang]}</span>
              </div>
              <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <span className="wak-card-title text-[#142d38]">{entry.name[lang]}</span>
                <span className="mt-2 line-clamp-2 min-h-11 text-sm leading-[1.55] text-[#63747a]">{entry.description[lang]}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-black text-[#087294]">
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
