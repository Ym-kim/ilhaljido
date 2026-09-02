'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, BedDouble, Coffee, ExternalLink, MapPin, Search, ShieldCheck, Users, Wifi } from 'lucide-react'

import { useLang } from '@/context/LanguageContext'
import { trackStayEvent } from '@/lib/stays/analytics'
import type { StaySearchResult } from '@/lib/stays/domain'
import { STAY_PILOT_DESTINATIONS } from '@/lib/stays/pilotDestinations'
import { trackAffiliateClick } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'
import type { StayPilotSourceSection } from '@/lib/stays/pilotInitialState'
import { StayResultRefinementBar } from '@/components/stays/StayResultRefinementBar'
import {
  EMPTY_STAY_RESULT_FILTERS,
  getStayResultFilterAvailability,
  refineStayResults,
  type StayResultFilterKey,
  type StayResultSort,
} from '@/lib/stays/resultRefinement'

type SearchResponse =
  | {
      mode: 'results'
      provider: 'agoda'
      destinationId: string
      results: StaySearchResult[]
      meta: { latencyMs: number; resultCount: number }
    }
  | {
      mode: 'fallback'
      provider: 'booking'
      fallbackFrom: 'agoda'
      reason: string
      destinationId: string
      redirect: { href: string; rel: 'sponsored noopener noreferrer'; providerLabel: string }
      meta: { latencyMs: number; resultCount: number }
    }

const COPY = {
  KO: {
    eyebrow: 'WAKATION STAY',
    title: '일할 도시의 숙소를, 실제 날짜로 찾아보세요',
    intro: '후쿠오카·오사카·도쿄의 현재 숙소를 확인하고, 일과 체류에 맞는 조건을 차분하게 비교합니다.',
    back: '숙소 전체 보기', destination: '여행지', checkin: '체크인', checkout: '체크아웃',
    adults: '성인', children: '아동', search: '이 날짜로 숙소 보기', searching: '요금 확인 중', results: '머물 곳을 골라보세요',
    perNight: '1박 기준', review: '후기', propertyClass: '숙소 등급', wifi: '무료 Wi‑Fi', breakfast: '조식 포함',
    checkRate: 'Agoda에서 요금 확인', rooms: '객실 확인', fallbackTitle: '제휴사 검색으로 이어서 확인하세요',
    fallbackBody: 'Agoda 결과가 지연되거나 비어 있어 기존 Booking.com 검색으로 안전하게 연결합니다.',
    fallbackCta: 'Booking.com에서 숙소 확인', error: '검색 조건을 다시 확인해주세요.',
    disclosure: '외부 제휴 상품입니다. Wakation은 검색을 돕고, 예약·결제·취소·환불은 연결된 제휴사의 정책을 따릅니다. 요금과 조건은 제휴사 화면에서 최종 확인해주세요.',
    provider: 'Agoda 제공 결과', noEditorial: '제휴사가 실제 숙소 사진을 제공한 결과만 표시합니다.',
    intelligence: 'Wakation 조사 메모', workNote: '일하기', longStayNote: '머물기', accessNote: '이동', source: '근거 보기', verifiedAt: '확인일',
    cityStay: '숙소 찾기', finalPrice: '세금·수수료와 최종 조건은 제휴사에서 확인',
    emptyRefinedTitle: '선택한 조건에 맞는 결과가 없습니다', emptyRefinedBody: '조건을 하나씩 해제하거나 기본 순서로 돌아가 다시 확인해 보세요.', resetRefined: '필터 초기화',
  },
  EN: {
    eyebrow: 'WAKATION STAY',
    title: 'Find a stay for the city where you will work',
    intro: 'Check current stays in Fukuoka, Osaka and Tokyo, then compare the details that matter for work and a longer stay.',
    back: 'View all stays', destination: 'Destination', checkin: 'Check-in', checkout: 'Check-out',
    adults: 'Adults', children: 'Children', search: 'See stays for these dates', searching: 'Checking rates', results: 'Choose where to stay',
    perNight: 'per night', review: 'Review', propertyClass: 'Property class', wifi: 'Free Wi‑Fi', breakfast: 'Breakfast included',
    checkRate: 'Check rate on Agoda', rooms: 'Check rooms', fallbackTitle: 'Continue with partner search',
    fallbackBody: 'Agoda results were delayed or empty, so the existing Booking.com search remains available.',
    fallbackCta: 'Check stays on Booking.com', error: 'Please check your search details.',
    disclosure: 'This is an external affiliate product. Wakation helps with discovery; booking, payment, cancellation and refunds follow the partner’s terms. Confirm final rates and conditions on the partner site.',
    provider: 'Results provided by Agoda', noEditorial: 'Only stays with an actual property photo supplied by the partner are shown.',
    intelligence: 'Wakation research note', workNote: 'Work', longStayNote: 'Stay', accessNote: 'Access', source: 'View source', verifiedAt: 'Checked',
    cityStay: 'Stay search', finalPrice: 'Confirm taxes, fees and final conditions with the partner',
    emptyRefinedTitle: 'No results match these filters', emptyRefinedBody: 'Remove a filter or return to the partner order to see more stays.', resetRefined: 'Reset filters',
  },
  JP: {
    eyebrow: 'WAKATION STAY',
    title: '働く都市の宿を、実際の日付から探す',
    intro: '福岡・大阪・東京の現在の宿を確認し、仕事と滞在に必要な条件を落ち着いて比較できます。',
    back: '宿をすべて見る', destination: '行き先', checkin: 'チェックイン', checkout: 'チェックアウト',
    adults: '大人', children: '子ども', search: 'この日程で宿を見る', searching: '料金を確認中', results: '滞在先を選ぶ',
    perNight: '1泊あたり', review: '口コミ', propertyClass: '宿泊施設ランク', wifi: '無料Wi‑Fi', breakfast: '朝食付き',
    checkRate: 'Agodaで料金を確認', rooms: '客室を確認', fallbackTitle: '提携先検索で続けて確認',
    fallbackBody: 'Agodaの結果が遅延または空だったため、既存のBooking.com検索へ安全に案内します。',
    fallbackCta: 'Booking.comで宿を確認', error: '検索条件を確認してください。',
    disclosure: '外部のアフィリエイト商品です。Wakationは検索をサポートし、予約・決済・キャンセル・返金は提携先の規約に従います。最終料金と条件は提携先でご確認ください。',
    provider: 'Agoda提供の検索結果', noEditorial: '提携先から実際の宿泊施設写真が提供された結果のみ表示します。',
    intelligence: 'Wakation調査メモ', workNote: '仕事', longStayNote: '滞在', accessNote: 'アクセス', source: '根拠を見る', verifiedAt: '確認日',
    cityStay: '宿を探す', finalPrice: '税・手数料と最終条件は提携先で確認',
    emptyRefinedTitle: '選択した条件に一致する宿がありません', emptyRefinedBody: '条件を外すか、提携先の基本順に戻して再度ご確認ください。', resetRefined: '条件をリセット',
  },
} satisfies Record<Lang, Record<string, string>>

const DESTINATION_VISUALS: Record<string, string> = {
  'japan-fukuoka': '/media/destinations/fukuoka-editorial-v1.webp',
  'japan-osaka': '/media/destinations/osaka-editorial-v1.webp',
  'japan-tokyo': '/media/destinations/tokyo-editorial-v1.webp',
}

function localeCode(lang: Lang): string {
  return lang === 'KO' ? 'ko-KR' : lang === 'JP' ? 'ja-JP' : 'en-US'
}

function formatRate(value: number, currency: string, lang: Lang): string {
  try {
    return new Intl.NumberFormat(localeCode(lang), { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)
  } catch {
    return `${currency} ${value.toLocaleString(localeCode(lang))}`
  }
}

function formatPropertyClass(value: number, lang: Lang): string {
  const grade = Number.isInteger(value) ? String(value) : value.toFixed(1)
  return lang === 'KO' ? `${grade}성` : lang === 'JP' ? `${grade}つ星` : `${grade}-star`
}

function ResultCard({
  result,
  index,
  lang,
  destinationId,
  destinationLabel,
  sourceSection,
}: {
  result: StaySearchResult
  index: number
  lang: Lang
  destinationId: string
  destinationLabel: string
  sourceSection: string
}) {
  const c = COPY[lang]
  const positiveDiscount = typeof result.rate.discountPercentage === 'number' && result.rate.discountPercentage > 0
    ? result.rate.discountPercentage
    : null
  const meaningfulCrossedOutRate = typeof result.rate.crossedOutAmount === 'number'
    && result.rate.crossedOutAmount > result.rate.amount
    ? result.rate.crossedOutAmount
    : null
  const trackOutbound = () => {
    const common = {
      locale: lang,
      sourceSection,
      provider: result.provider,
      destinationId,
      hotelId: result.propertyId,
      position: index + 1,
      capability: 'live_search' as const,
      datesSupplied: true,
      outcome: 'redirect' as const,
    }
    trackStayEvent('stay_property_click', common)
    trackStayEvent('stay_booking_click', common)
    trackAffiliateClick({
      id: result.propertyId,
      itemName: result.name,
      provider: result.provider,
      destination: destinationId,
      sourceSection,
      ctaLabel: 'check_live_rate',
      ctaPosition: String(index + 1),
      category: 'hotel',
      locale: lang,
      status: 'active_affiliate',
    })
  }

  return (
    <article className="wak-card-product group flex h-full min-w-0 flex-col overflow-hidden border border-[#d9e2e3] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#9fc4cf] hover:shadow-[0_20px_48px_rgba(8,47,73,0.13)]">
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#dce8e9]">
        {result.imageUrl ? (
          // Provider CDNs vary; a native lazy image keeps this provider-neutral without widening Next remote hosts.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result.imageUrl}
            alt={result.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : null}
        <span className="absolute inset-0 bg-gradient-to-t from-[#061f2d]/72 via-transparent to-black/5" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className="rounded-full border border-white/35 bg-[#082b3a]/78 px-3 py-1.5 text-[0.66rem] font-black tracking-[0.08em] text-white backdrop-blur-md">{destinationLabel} · {c.cityStay}</span>
          {typeof result.reviewScore === 'number' ? <span className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#0a4054] shadow-lg">{c.review} {result.reviewScore.toFixed(1)}/10</span> : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-2 h-[3.25rem] overflow-hidden break-words text-[1.08rem] font-black leading-[1.45] text-[#172a36]">{result.name}</h2>
        <div className="mt-3 flex min-h-8 flex-wrap content-start gap-2 text-[0.7rem] font-bold text-[#31505e]">
          {typeof result.starRating === 'number' ? <span className="inline-flex items-center rounded-full bg-[#edf3f4] px-3 py-1.5">{c.propertyClass} {formatPropertyClass(result.starRating, lang)}</span> : null}
          {result.amenities?.freeWifi ? <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f6f7] px-3 py-1.5"><Wifi className="h-3.5 w-3.5" />{c.wifi}</span> : null}
          {result.amenities?.breakfastIncluded ? <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f6f7] px-3 py-1.5"><Coffee className="h-3.5 w-3.5" />{c.breakfast}</span> : null}
        </div>
        {result.intelligence ? (
          <aside className="mt-5 rounded-2xl border border-[#bfe3ea] bg-[#f0fbfd] p-4 text-sm text-[#173f4d]">
            <p className="flex items-center gap-2 font-black text-[#086f8f]"><ShieldCheck className="h-4 w-4" />{c.intelligence}</p>
            <dl className="mt-3 space-y-2 leading-6">
              <div><dt className="inline font-bold">{c.workNote} · </dt><dd className="inline">{result.intelligence.workNote}</dd></div>
              {result.intelligence.longStayNote ? <div><dt className="inline font-bold">{c.longStayNote} · </dt><dd className="inline">{result.intelligence.longStayNote}</dd></div> : null}
              {result.intelligence.access ? <div><dt className="inline font-bold">{c.accessNote} · </dt><dd className="inline">{result.intelligence.access}</dd></div> : null}
            </dl>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#59717a]">
              <span>{c.verifiedAt} {result.intelligence.verifiedAt}</span>
              <a href={result.intelligence.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#087fa2] underline decoration-[#7bc7d9] underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]">
                {c.source} · {result.intelligence.sourceLabel}
              </a>
            </p>
          </aside>
        ) : null}
        <div className="mt-auto pt-5">
          {meaningfulCrossedOutRate !== null ? (
            <p className="text-sm text-[#71838b] line-through">{formatRate(meaningfulCrossedOutRate, result.rate.currency, lang)}</p>
          ) : null}
          <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
            <p className="text-[1.65rem] font-black tracking-[-0.03em] text-[#0b3140]">{formatRate(result.rate.amount, result.rate.currency, lang)}</p>
            <span className="pb-1 text-xs text-[#637780]">{c.perNight}</span>
            {positiveDiscount !== null ? (
              <span className="mb-1 rounded-full bg-[#fff1eb] px-2 py-1 text-xs font-bold text-[#d95632]">-{Math.round(positiveDiscount)}%</span>
            ) : null}
          </div>
          <p className="mt-1 text-[0.66rem] leading-4 text-[#7a898f]">{c.finalPrice}</p>
          <a
            href={result.bookingHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={trackOutbound}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-between gap-2 rounded-full bg-[#0b4b69] px-5 text-sm font-black text-white transition hover:bg-[#073c55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06a4d5]"
          >
            {c.checkRate}<ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}

export function StaySearchPilotView({
  forceLang,
  initialCheckin,
  initialCheckout,
  initialToday,
  initialDestinationId,
  initialAdults,
  initialChildren,
  autoSearch,
  sourceSection,
}: {
  forceLang?: Lang
  initialCheckin: string
  initialCheckout: string
  initialToday: string
  initialDestinationId: string
  initialAdults: number
  initialChildren: number
  autoSearch: boolean
  sourceSection: StayPilotSourceSection
}) {
  const { lang: contextLang, setLang } = useLang()
  const lang = forceLang ?? contextLang
  const c = COPY[lang]
  const [destinationId, setDestinationId] = useState(initialDestinationId)
  const [checkin, setCheckin] = useState(initialCheckin)
  const [checkout, setCheckout] = useState(initialCheckout)
  const [adults, setAdults] = useState(initialAdults)
  const [children, setChildren] = useState(initialChildren)
  const [response, setResponse] = useState<SearchResponse | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resultSort, setResultSort] = useState<StayResultSort>('provider_order')
  const [resultFilters, setResultFilters] = useState({ ...EMPTY_STAY_RESULT_FILTERS })
  const autoSearchStarted = useRef(false)
  const activeDestination = STAY_PILOT_DESTINATIONS.find((destination) => destination.id === destinationId) ?? STAY_PILOT_DESTINATIONS[0]
  const activeDestinationLabel = activeDestination.label[lang]
  const activeDestinationImage = DESTINATION_VISUALS[activeDestination.id]
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  const resultSourceSection = sourceSection === 'home_hero_stay_search'
    ? 'home_hero_stay_results'
    : sourceSection === 'guide_stay_search'
      ? 'guide_stay_results'
      : sourceSection === 'trip_set_stay_search'
        ? 'trip_set_stay_results'
        : 'stay_search_pilot_results'
  const fallbackSourceSection = sourceSection === 'home_hero_stay_search'
    ? 'home_hero_stay_fallback'
    : sourceSection === 'guide_stay_search'
      ? 'guide_stay_fallback'
      : sourceSection === 'trip_set_stay_search'
        ? 'trip_set_stay_fallback'
        : 'stay_search_pilot_fallback'
  const resultItems = useMemo(
    () => response?.mode === 'results' ? response.results.filter((result) => Boolean(result.imageUrl)) : [],
    [response],
  )
  const filterAvailability = useMemo(() => getStayResultFilterAvailability(resultItems), [resultItems])
  const refinedResults = useMemo(
    () => refineStayResults(resultItems, resultSort, resultFilters),
    [resultFilters, resultItems, resultSort],
  )

  useEffect(() => {
    if (forceLang && forceLang !== contextLang) setLang(forceLang)
  }, [contextLang, forceLang, setLang])

  const minCheckout = useMemo(() => {
    if (!checkin) return initialCheckout
    const date = new Date(`${checkin}T00:00:00.000Z`)
    return new Date(date.getTime() + 86_400_000).toISOString().slice(0, 10)
  }, [checkin, initialCheckout])

  const runSearch = useCallback(async () => {
    setError('')
    setLoading(true)
    setResponse(null)
    setResultSort('provider_order')
    setResultFilters({ ...EMPTY_STAY_RESULT_FILTERS })
    trackStayEvent('stay_search', {
      locale: lang, sourceSection, provider: 'agoda', destinationId,
      capability: 'live_search', datesSupplied: Boolean(checkin && checkout), outcome: 'view',
    })

    try {
      const result = await fetch('/api/stays/search', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ destinationId, checkin, checkout, adults, children, locale: lang }),
      })
      if (!result.ok) throw new Error('invalid_search')
      const payload = await result.json() as SearchResponse
      setResponse(payload)
      if (payload.mode === 'results') {
        trackStayEvent('stay_result_view', {
          locale: lang, sourceSection: resultSourceSection, provider: payload.provider,
          destinationId, capability: 'live_search', datesSupplied: true,
          resultCount: payload.results.length, outcome: 'view',
        })
      } else {
        trackStayEvent('stay_result_view', {
          locale: lang, sourceSection: fallbackSourceSection, provider: payload.provider,
          destinationId, capability: 'search_redirect', datesSupplied: true, resultCount: 0, outcome: 'fallback',
        })
      }
    } catch {
      setError(c.error)
    } finally {
      setLoading(false)
    }
  }, [adults, c.error, checkin, checkout, children, destinationId, fallbackSourceSection, lang, resultSourceSection, sourceSection])

  useEffect(() => {
    if (!autoSearch || autoSearchStarted.current) return
    autoSearchStarted.current = true
    void runSearch()
  }, [autoSearch, runSearch])

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void runSearch()
  }

  const trackRefinement = (refinement: NonNullable<Parameters<typeof trackStayEvent>[1]['refinement']>) => {
    trackStayEvent('stay_result_refine', {
      locale: lang,
      sourceSection: resultSourceSection,
      provider: 'agoda',
      destinationId,
      capability: 'live_search',
      datesSupplied: true,
      resultCount: response?.mode === 'results' ? response.results.length : 0,
      refinement,
      outcome: 'view',
    })
  }

  const changeResultSort = (nextSort: StayResultSort) => {
    setResultSort(nextSort)
    trackRefinement(`sort_${nextSort}`)
  }

  const toggleResultFilter = (filter: StayResultFilterKey) => {
    setResultFilters((current) => ({ ...current, [filter]: !current[filter] }))
    const refinement = filter === 'freeWifi'
      ? 'filter_free_wifi'
      : filter === 'breakfastIncluded'
        ? 'filter_breakfast'
        : 'filter_review_8_plus'
    trackRefinement(refinement)
  }

  const resetResultRefinement = () => {
    setResultSort('provider_order')
    setResultFilters({ ...EMPTY_STAY_RESULT_FILTERS })
    trackRefinement('reset')
  }

  const fallbackClick = response?.mode === 'fallback' ? () => {
    trackStayEvent('stay_booking_click', {
      locale: lang, sourceSection: fallbackSourceSection, provider: 'booking', destinationId,
      capability: 'search_redirect', datesSupplied: true, outcome: 'fallback',
    })
    trackAffiliateClick({
      id: 'booking-stay-search', itemName: 'Booking.com stay search', provider: 'booking',
      destination: destinationId, sourceSection: fallbackSourceSection, ctaLabel: 'fallback_search',
      category: 'hotel', locale: lang, status: 'active_affiliate',
    })
  } : undefined

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#0b2b38]">
      <section className="relative min-h-[28rem] overflow-hidden bg-[#061f2d] px-5 pb-24 pt-12 text-white sm:px-8 lg:min-h-[34rem] lg:pb-32 lg:pt-16">
        <Image src={activeDestinationImage} alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover object-center opacity-65" />
        <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,24,35,.96)_0%,rgba(4,24,35,.9)_38%,rgba(4,24,35,.48)_68%,rgba(4,24,35,.22)_100%)]" />
        <span className="absolute inset-0 bg-gradient-to-t from-[#061f2d]/75 via-transparent to-black/10" />
        <div className="relative mx-auto max-w-7xl">
          <Link href={`${prefix}/select/hotel`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <ArrowLeft className="h-4 w-4" />{c.back}
          </Link>
          <p className="mt-12 text-[0.68rem] font-black tracking-[0.2em] text-sky-300">{c.eyebrow} · {activeDestinationLabel}</p>
          <h1 className="wak-page-title mt-4 max-w-3xl break-keep font-black leading-[1.08] tracking-[-0.035em] text-white">{c.title}</h1>
          <p className="wak-body-large mt-5 max-w-xl break-keep text-white/76">{c.intro}</p>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <form onSubmit={submit} className="relative -mt-14 rounded-[var(--wak-radius-editorial)] border border-[#d8e0df] bg-white p-5 shadow-[0_22px_64px_rgba(8,38,52,0.14)] sm:p-6 lg:-mt-16">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(12rem,1.2fr)_minmax(9.5rem,1fr)_minmax(9.5rem,1fr)_minmax(6.5rem,.55fr)_minmax(6.5rem,.55fr)_auto] lg:items-end">
              <label className="col-span-2 block lg:col-span-1">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.destination}</span>
                <span className="relative block"><MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c7f86]" /><select value={destinationId} onChange={(event) => setDestinationId(event.target.value)} className="min-h-12 w-full rounded-xl border border-[#c8d5d8] bg-white pl-10 pr-4 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]">
                  {STAY_PILOT_DESTINATIONS.map((destination) => <option key={destination.id} value={destination.id}>{destination.label[lang]}</option>)}
                </select></span>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.checkin}</span>
                <input type="date" required value={checkin} min={initialToday} onChange={(event) => setCheckin(event.target.value)} className="min-h-12 w-full rounded-xl border border-[#c8d5d8] px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.checkout}</span>
                <input type="date" required value={checkout} min={minCheckout} onChange={(event) => setCheckout(event.target.value)} className="min-h-12 w-full rounded-xl border border-[#c8d5d8] px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.adults}</span>
                <span className="relative block"><Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c7f86]" /><input type="number" required min={1} max={8} value={adults} onChange={(event) => setAdults(Number(event.target.value))} className="min-h-12 w-full rounded-xl border border-[#c8d5d8] pl-10 pr-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" /></span>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.children}</span>
                <input type="number" required min={0} max={6} value={children} onChange={(event) => setChildren(Number(event.target.value))} className="min-h-12 w-full rounded-xl border border-[#c8d5d8] px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" />
              </label>
              <button disabled={loading} className="col-span-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0b4b69] px-5 text-sm font-black text-white transition hover:bg-[#073c55] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073b4c] lg:col-span-1 lg:w-auto">
                <Search className="h-4 w-4" />{loading ? c.searching : c.search}
              </button>
            </div>
            <p role="alert" className="mt-3 text-sm font-semibold text-[#b43d2b]">{error}</p>
          </form>

          <div aria-live="polite" aria-atomic="true" className="mt-12 lg:mt-16">
            {loading ? <div className="rounded-[1.5rem] bg-white p-8 text-center text-sm font-semibold text-[#516b75]">{c.searching}…</div> : null}
            {response?.mode === 'results' ? (
              <>
                <div className="mb-6 grid gap-3 border-b border-[#d9dfdc] pb-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,.75fr)] md:items-end">
                  <div><p className="text-[0.68rem] font-black tracking-[0.16em] text-[#078db6]">WAKATION SEARCH RESULTS · {activeDestinationLabel}</p><h2 className="wak-section-title mt-2 break-keep font-black tracking-[-0.025em] text-[#172a36]">{c.results}</h2></div>
                  <p className="text-xs leading-5 text-[#647983] md:text-right">{c.noEditorial}</p>
                </div>
                <StayResultRefinementBar
                  lang={lang}
                  sort={resultSort}
                  filters={resultFilters}
                  availability={filterAvailability}
                  visibleCount={refinedResults.length}
                  totalCount={response.results.length}
                  onSortChange={changeResultSort}
                  onFilterToggle={toggleResultFilter}
                  onReset={resetResultRefinement}
                />
                {refinedResults.length > 0 ? (
                  <div className="wak-card-grid grid auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
                    {refinedResults.map((result, index) => <ResultCard key={`${result.provider}-${result.propertyId}`} result={result} index={index} lang={lang} destinationId={destinationId} destinationLabel={activeDestinationLabel} sourceSection={resultSourceSection} />)}
                  </div>
                ) : (
                  <div className="rounded-[1.75rem] border border-dashed border-[#b9cacc] bg-white px-6 py-12 text-center">
                    <h3 className="text-xl font-black text-[#0c2835]">{c.emptyRefinedTitle}</h3>
                    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#637780]">{c.emptyRefinedBody}</p>
                    <button type="button" onClick={resetResultRefinement} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[#078db6] px-5 text-sm font-bold text-[#067b9f] hover:bg-[#eef8fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]">{c.resetRefined}</button>
                  </div>
                )}
              </>
            ) : null}
            {response?.mode === 'fallback' ? (
              <div className="rounded-[2rem] border border-[#d5dfdf] bg-white p-7 sm:p-9">
                <BedDouble className="h-8 w-8 text-[#078db6]" />
                <h2 className="mt-4 text-2xl font-black">{c.fallbackTitle}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5b7079]">{c.fallbackBody}</p>
                <a href={response.redirect.href} target="_blank" rel={response.redirect.rel} onClick={fallbackClick} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#063b50] px-6 text-sm font-bold text-white hover:bg-[#07536e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06a4d5]">{c.fallbackCta}<ExternalLink className="h-4 w-4" /></a>
              </div>
            ) : null}
          </div>

          <aside className="mt-10 flex gap-3 rounded-[1.5rem] border border-[#d5dfdf] bg-[#eef7f7] p-5 text-sm leading-6 text-[#4d6670]">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#078db6]" />
            <p>{c.disclosure}</p>
          </aside>
        </div>
      </section>
    </main>
  )
}
