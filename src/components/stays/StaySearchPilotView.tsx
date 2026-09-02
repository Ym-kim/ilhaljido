'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BedDouble, Coffee, ExternalLink, Search, ShieldCheck, Users, Wifi } from 'lucide-react'

import { useLang } from '@/context/LanguageContext'
import { getMediaAsset } from '@/lib/media/assets'
import { trackEditorialAssetView } from '@/lib/media/editorialTracking'
import { getEditorialModelPlacement } from '@/lib/media/modelRotation'
import { trackStayEvent } from '@/lib/stays/analytics'
import type { StaySearchResult } from '@/lib/stays/domain'
import { STAY_PILOT_DESTINATIONS } from '@/lib/stays/pilotDestinations'
import { trackAffiliateClick } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'

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
    eyebrow: 'STAY SEARCH PILOT',
    title: '도시와 날짜로, 지금 가능한 숙소를 찾으세요',
    intro: '후쿠오카·오사카·도쿄의 실제 제휴사 검색 결과를 Wakation의 흐름으로 비교합니다.',
    back: '숙소 전체 보기', destination: '여행지', checkin: '체크인', checkout: '체크아웃',
    adults: '성인', children: '아동', search: '숙소 검색', searching: '요금 확인 중', results: '검색 결과',
    perNight: '1박 기준', review: '후기 평점', wifi: '무료 Wi‑Fi', breakfast: '조식 포함',
    checkRate: '실시간 요금 확인', rooms: '객실 확인', fallbackTitle: '제휴사 검색으로 이어서 확인하세요',
    fallbackBody: 'Agoda 결과가 지연되거나 비어 있어 기존 Booking.com 검색으로 안전하게 연결합니다.',
    fallbackCta: 'Booking.com에서 숙소 확인', error: '검색 조건을 다시 확인해주세요.',
    disclosure: '외부 제휴 상품입니다. Wakation은 검색을 돕고, 예약·결제·취소·환불은 연결된 제휴사의 정책을 따릅니다. 요금과 조건은 제휴사 화면에서 최종 확인해주세요.',
    provider: 'Agoda 제공 결과', noEditorial: 'Wakation 자체 조사 메모가 없는 숙소에는 별도 점수나 추천 문구를 붙이지 않습니다.',
  },
  EN: {
    eyebrow: 'STAY SEARCH PILOT',
    title: 'Search current stays by city and dates',
    intro: 'Compare live partner results for Fukuoka, Osaka and Tokyo in Wakation’s travel flow.',
    back: 'View all stays', destination: 'Destination', checkin: 'Check-in', checkout: 'Check-out',
    adults: 'Adults', children: 'Children', search: 'Search stays', searching: 'Checking rates', results: 'Search results',
    perNight: 'per night', review: 'Review score', wifi: 'Free Wi‑Fi', breakfast: 'Breakfast included',
    checkRate: 'Check live rate', rooms: 'Check rooms', fallbackTitle: 'Continue with partner search',
    fallbackBody: 'Agoda results were delayed or empty, so the existing Booking.com search remains available.',
    fallbackCta: 'Check stays on Booking.com', error: 'Please check your search details.',
    disclosure: 'This is an external affiliate product. Wakation helps with discovery; booking, payment, cancellation and refunds follow the partner’s terms. Confirm final rates and conditions on the partner site.',
    provider: 'Results provided by Agoda', noEditorial: 'Wakation does not add scores or notes where it has no original research.',
  },
  JP: {
    eyebrow: 'STAY SEARCH PILOT',
    title: '都市と日付から、現在の宿を検索',
    intro: '福岡・大阪・東京の提携先検索結果を、Wakationの旅の流れで比較できます。',
    back: '宿をすべて見る', destination: '行き先', checkin: 'チェックイン', checkout: 'チェックアウト',
    adults: '大人', children: '子ども', search: '宿を検索', searching: '料金を確認中', results: '検索結果',
    perNight: '1泊あたり', review: '口コミ評価', wifi: '無料Wi‑Fi', breakfast: '朝食付き',
    checkRate: '現在の料金を確認', rooms: '客室を確認', fallbackTitle: '提携先検索で続けて確認',
    fallbackBody: 'Agodaの結果が遅延または空だったため、既存のBooking.com検索へ安全に案内します。',
    fallbackCta: 'Booking.comで宿を確認', error: '検索条件を確認してください。',
    disclosure: '外部のアフィリエイト商品です。Wakationは検索をサポートし、予約・決済・キャンセル・返金は提携先の規約に従います。最終料金と条件は提携先でご確認ください。',
    provider: 'Agoda提供の検索結果', noEditorial: 'Wakation独自調査がない宿には、独自スコアや評価文を追加しません。',
  },
} satisfies Record<Lang, Record<string, string>>

const STAY_PILOT_PLACEMENT = getEditorialModelPlacement('stay-pilot-hero')
const STAY_PILOT_DESKTOP = getMediaAsset('stay-pilot-custom-airport-model-desktop-v1')!
const STAY_PILOT_MOBILE = getMediaAsset('stay-pilot-custom-airport-model-mobile-v1')!

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

function ResultCard({
  result,
  index,
  lang,
  destinationId,
}: {
  result: StaySearchResult
  index: number
  lang: Lang
  destinationId: string
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
      sourceSection: 'stay_search_pilot_results',
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
      sourceSection: 'stay_search_pilot_results',
      ctaLabel: 'check_live_rate',
      ctaPosition: String(index + 1),
      category: 'hotel',
      locale: lang,
      status: 'active_affiliate',
    })
  }

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-[#dbe4e7] bg-white shadow-[0_18px_50px_rgba(8,43,56,0.08)]">
      {result.imageUrl ? (
        // Provider CDNs vary; a native lazy image keeps this provider-neutral without widening Next remote hosts.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={result.imageUrl}
          alt={result.name}
          className="aspect-[16/10] w-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : null}
      <div className="flex min-h-[17rem] flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#47606b]">
          <span className="rounded-full bg-[#e9f8fb] px-3 py-1 text-[#047ca3]">{c.provider}</span>
          {typeof result.starRating === 'number' ? <span>{result.starRating.toFixed(1)} ★</span> : null}
          {typeof result.reviewScore === 'number' ? <span>{c.review} {result.reviewScore.toFixed(1)}</span> : null}
        </div>
        <h2 className="text-xl font-bold leading-snug text-[#0c2835]">{result.name}</h2>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[#31505e]">
          {result.amenities?.freeWifi ? <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f6f7] px-3 py-1.5"><Wifi className="h-3.5 w-3.5" />{c.wifi}</span> : null}
          {result.amenities?.breakfastIncluded ? <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f6f7] px-3 py-1.5"><Coffee className="h-3.5 w-3.5" />{c.breakfast}</span> : null}
        </div>
        <div className="mt-auto pt-6">
          {meaningfulCrossedOutRate !== null ? (
            <p className="text-sm text-[#71838b] line-through">{formatRate(meaningfulCrossedOutRate, result.rate.currency, lang)}</p>
          ) : null}
          <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
            <p className="text-2xl font-black text-[#0b3140]">{formatRate(result.rate.amount, result.rate.currency, lang)}</p>
            <span className="pb-1 text-xs text-[#637780]">{c.perNight}</span>
            {positiveDiscount !== null ? (
              <span className="mb-1 rounded-full bg-[#fff1eb] px-2 py-1 text-xs font-bold text-[#d95632]">-{Math.round(positiveDiscount)}%</span>
            ) : null}
          </div>
          <a
            href={result.bookingHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={trackOutbound}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#063b50] px-5 text-sm font-bold text-white transition hover:bg-[#07536e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06a4d5]"
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
}: {
  forceLang?: Lang
  initialCheckin: string
  initialCheckout: string
  initialToday: string
}) {
  const { lang: contextLang, setLang } = useLang()
  const lang = forceLang ?? contextLang
  const c = COPY[lang]
  const [destinationId, setDestinationId] = useState('japan-fukuoka')
  const [checkin, setCheckin] = useState(initialCheckin)
  const [checkout, setCheckout] = useState(initialCheckout)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [response, setResponse] = useState<SearchResponse | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''

  useEffect(() => {
    if (forceLang && forceLang !== contextLang) setLang(forceLang)
  }, [contextLang, forceLang, setLang])

  useEffect(() => {
    trackEditorialAssetView({
      assetId: STAY_PILOT_DESKTOP.id,
      mobileAssetId: STAY_PILOT_MOBILE.id,
      modelIds: STAY_PILOT_PLACEMENT.modelIds,
      route: `${prefix}/select/hotel/pilot`,
      section: STAY_PILOT_PLACEMENT.section,
      locale: lang.toLowerCase(),
    })
  }, [lang, prefix])

  const minCheckout = useMemo(() => {
    if (!checkin) return initialCheckout
    const date = new Date(`${checkin}T00:00:00.000Z`)
    return new Date(date.getTime() + 86_400_000).toISOString().slice(0, 10)
  }, [checkin, initialCheckout])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    setResponse(null)
    trackStayEvent('stay_search', {
      locale: lang, sourceSection: 'stay_search_pilot_form', provider: 'agoda', destinationId,
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
          locale: lang, sourceSection: 'stay_search_pilot_results', provider: payload.provider,
          destinationId, capability: 'live_search', datesSupplied: true,
          resultCount: payload.results.length, outcome: 'view',
        })
      } else {
        trackStayEvent('stay_result_view', {
          locale: lang, sourceSection: 'stay_search_pilot_fallback', provider: payload.provider,
          destinationId, capability: 'search_redirect', datesSupplied: true, resultCount: 0, outcome: 'fallback',
        })
      }
    } catch {
      setError(c.error)
    } finally {
      setLoading(false)
    }
  }

  const fallbackClick = response?.mode === 'fallback' ? () => {
    trackStayEvent('stay_booking_click', {
      locale: lang, sourceSection: 'stay_search_pilot_fallback', provider: 'booking', destinationId,
      capability: 'search_redirect', datesSupplied: true, outcome: 'fallback',
    })
    trackAffiliateClick({
      id: 'booking-stay-search', itemName: 'Booking.com stay search', provider: 'booking',
      destination: destinationId, sourceSection: 'stay_search_pilot_fallback', ctaLabel: 'fallback_search',
      category: 'hotel', locale: lang, status: 'active_affiliate',
    })
  } : undefined

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#0b2b38]">
      <section className="relative isolate min-h-[34rem] overflow-hidden border-b border-[#d8e0df] bg-[#041924] text-white sm:min-h-[32rem]">
        <picture className="absolute inset-0 block md:left-auto md:w-[64%]">
          <source media="(min-width: 768px)" srcSet={STAY_PILOT_DESKTOP.src} />
          {/* Art-directed provider-neutral hero; picture loads only the crop needed by the viewport. */}
          <img
            src={STAY_PILOT_MOBILE.src}
            alt={STAY_PILOT_MOBILE.alt[lang]}
            width={STAY_PILOT_MOBILE.width}
            height={STAY_PILOT_MOBILE.height}
            fetchPriority="high"
            loading="eager"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,25,36,0.97)_0%,rgba(4,29,41,0.88)_35%,rgba(4,29,41,0.35)_64%,rgba(4,29,41,0.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(4,24,34,0.88)_0%,rgba(4,24,34,0.54)_48%,rgba(4,24,34,0.92)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-6xl flex-col justify-between px-5 py-9 sm:min-h-[32rem] sm:px-8 sm:py-12 lg:py-14">
          <Link href={`${prefix}/select/hotel`} className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/30 bg-[#061f2d]/25 px-4 text-sm font-semibold backdrop-blur-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <ArrowLeft className="h-4 w-4" />{c.back}
          </Link>
          <div className="max-w-[38rem] pb-2 md:pb-0">
            <p className="text-xs font-bold tracking-[0.18em] text-[#72d7ef]">{c.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-balance sm:text-5xl">{c.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{c.intro}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <form onSubmit={submit} className="rounded-[2rem] border border-[#d5dfdf] bg-white p-5 shadow-[0_20px_60px_rgba(11,43,56,0.09)] sm:p-7">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.15fr_1fr_1fr_.68fr_.68fr_auto] xl:items-end">
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.destination}</span>
                <select value={destinationId} onChange={(event) => setDestinationId(event.target.value)} className="min-h-12 w-full rounded-2xl border border-[#c8d5d8] bg-white px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]">
                  {STAY_PILOT_DESTINATIONS.map((destination) => <option key={destination.id} value={destination.id}>{destination.label[lang]}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.checkin}</span>
                <input type="date" required value={checkin} min={initialToday} onChange={(event) => setCheckin(event.target.value)} className="min-h-12 w-full rounded-2xl border border-[#c8d5d8] px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.checkout}</span>
                <input type="date" required value={checkout} min={minCheckout} onChange={(event) => setCheckout(event.target.value)} className="min-h-12 w-full rounded-2xl border border-[#c8d5d8] px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.adults}</span>
                <span className="relative block"><Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c7f86]" /><input type="number" required min={1} max={8} value={adults} onChange={(event) => setAdults(Number(event.target.value))} className="min-h-12 w-full rounded-2xl border border-[#c8d5d8] pl-10 pr-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" /></span>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#49616b]">{c.children}</span>
                <input type="number" required min={0} max={6} value={children} onChange={(event) => setChildren(Number(event.target.value))} className="min-h-12 w-full rounded-2xl border border-[#c8d5d8] px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" />
              </label>
              <button disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#079ecb] px-6 text-sm font-bold text-white transition hover:bg-[#057fa5] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073b4c] md:col-span-2 xl:col-span-1 xl:w-auto">
                <Search className="h-4 w-4" />{loading ? c.searching : c.search}
              </button>
            </div>
            <p role="alert" className="mt-3 text-sm font-semibold text-[#b43d2b]">{error}</p>
          </form>

          <div aria-live="polite" aria-atomic="true" className="mt-10">
            {loading ? <div className="rounded-[1.5rem] bg-white p-8 text-center text-sm font-semibold text-[#516b75]">{c.searching}…</div> : null}
            {response?.mode === 'results' ? (
              <>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div><p className="text-xs font-bold tracking-[0.14em] text-[#078db6]">WAKATION SEARCH RESULTS</p><h2 className="mt-1 text-2xl font-black">{c.results} · {response.results.length}</h2></div>
                  <p className="text-xs text-[#647983]">{c.noEditorial}</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {response.results.map((result, index) => <ResultCard key={`${result.provider}-${result.propertyId}`} result={result} index={index} lang={lang} destinationId={destinationId} />)}
                </div>
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
