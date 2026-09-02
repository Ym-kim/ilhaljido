'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { BedDouble, CalendarDays, Search, Users } from 'lucide-react'

import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import {
  getStayPilotDestination,
  type StayPilotEntrySource,
} from '@/lib/stays/pilotDestinations'

type ContextualStaySource = Exclude<StayPilotEntrySource, 'home_hero'>

const subscribeToLocalDate = () => () => undefined
const getServerDate = () => ''
const getClientDate = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

const COPY = {
  KO: {
    eyebrow: { guide: 'GUIDE · LIVE STAYS', trip_set: 'TRIP SET · LIVE STAYS' },
    title: (city: string) => `${city} 숙소, 날짜로 바로 확인`,
    body: '날짜와 인원을 넣으면 실제 제휴사 검색 결과로 이어집니다. 결과가 없거나 지연되면 기존 Booking.com 검색을 유지합니다.',
    checkin: '체크인', checkout: '체크아웃', adults: '성인', children: '아동',
    submit: '현재 숙소 확인', curated: '큐레이션 숙소도 보기',
    invalidDates: '오늘 이후의 체크인·체크아웃 날짜를 순서대로 선택해 주세요.',
    invalidGuests: '성인은 1~8명, 아동은 0~6명으로 입력해 주세요.',
  },
  EN: {
    eyebrow: { guide: 'GUIDE · LIVE STAYS', trip_set: 'TRIP SET · LIVE STAYS' },
    title: (city: string) => `Check current stays in ${city}`,
    body: 'Add dates and guests to continue to live partner results. If results are delayed or empty, the existing Booking.com search remains available.',
    checkin: 'Check-in', checkout: 'Check-out', adults: 'Adults', children: 'Children',
    submit: 'Check current stays', curated: 'Browse curated stays',
    invalidDates: 'Choose check-in and check-out dates in order, starting today or later.',
    invalidGuests: 'Enter 1–8 adults and 0–6 children.',
  },
  JP: {
    eyebrow: { guide: 'GUIDE · LIVE STAYS', trip_set: 'TRIP SET · LIVE STAYS' },
    title: (city: string) => `${city}の宿を日付から確認`,
    body: '日付と人数を入力すると、提携先の現在の検索結果へ進みます。結果が遅延・空の場合は、既存のBooking.com検索をご案内します。',
    checkin: 'チェックイン', checkout: 'チェックアウト', adults: '大人', children: '子ども',
    submit: '現在の宿を確認', curated: '厳選した宿も見る',
    invalidDates: '本日以降のチェックイン・チェックアウト日を順番に選択してください。',
    invalidGuests: '大人は1〜8名、子どもは0〜6名で入力してください。',
  },
} satisfies Record<Lang, {
  eyebrow: Record<ContextualStaySource, string>
  title: (city: string) => string
  body: string
  checkin: string
  checkout: string
  adults: string
  children: string
  submit: string
  curated: string
  invalidDates: string
  invalidGuests: string
}>

function addOneDay(value: string): string {
  const parsed = Date.parse(`${value}T00:00:00.000Z`)
  if (!Number.isFinite(parsed)) return ''
  return new Date(parsed + 86_400_000).toISOString().slice(0, 10)
}

export function ContextualStaySearch({
  destinationId,
  lang,
  source,
  secondaryHref,
}: {
  destinationId: string
  lang: Lang
  source: ContextualStaySource
  secondaryHref?: string
}) {
  const destination = getStayPilotDestination(destinationId)
  const copy = COPY[lang]
  const today = useSyncExternalStore(subscribeToLocalDate, getClientDate, getServerDate)
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [error, setError] = useState('')

  const minCheckout = useMemo(() => addOneDay(checkin), [checkin])

  if (!destination) return null

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.currentTarget)
    const submittedCheckin = String(form.get('checkin') ?? checkin)
    const submittedCheckout = String(form.get('checkout') ?? checkout)
    const submittedAdults = Number(form.get('adults') ?? adults)
    const submittedChildren = Number(form.get('children') ?? children)
    if (!submittedCheckin || !submittedCheckout || (today && submittedCheckin < today) || submittedCheckout <= submittedCheckin) {
      event.preventDefault()
      setError(copy.invalidGuests)
      return
    }
    if (!Number.isInteger(submittedAdults) || submittedAdults < 1 || submittedAdults > 8
      || !Number.isInteger(submittedChildren) || submittedChildren < 0 || submittedChildren > 6) {
      event.preventDefault()
      setError(copy.invalidDates)
      return
    }
    setError('')
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#cddfe2] bg-[linear-gradient(135deg,#f2fafb_0%,#ffffff_56%,#f7f2e8_100%)] shadow-[0_18px_55px_rgba(8,50,64,0.08)]">
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.35fr)] lg:items-end lg:p-8">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 text-[0.66rem] font-black tracking-[0.16em] text-[#1782a1]">
            <BedDouble className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
            {copy.eyebrow[source]}
          </span>
          <h2 className="mt-3 break-words text-2xl font-black leading-tight text-[#0b2f3e] sm:text-3xl">
            {copy.title(destination.label[lang])}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#5c7078]">{copy.body}</p>
          {secondaryHref ? (
            <Link href={secondaryHref} className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-[#187d9a] underline decoration-[#8bc8d8] underline-offset-4 hover:text-[#0b5269] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]">
              {copy.curated}
            </Link>
          ) : null}
        </div>

        <form action="/api/stays/entry" method="get" onSubmit={submit} className="min-w-0">
          <input type="hidden" name="destination" value={destinationId} readOnly />
          <input type="hidden" name="source" value={source} readOnly />
          <input type="hidden" name="locale" value={lang} readOnly />
          <div className="grid min-w-0 grid-cols-2 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_.62fr_.62fr_auto] xl:items-end">
            <label className="min-w-0">
              <span className="mb-1.5 flex items-center gap-1 text-[0.68rem] font-bold text-[#536a74]"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{copy.checkin}</span>
              <input
                type="date"
                name="checkin"
                required
                value={checkin}
                min={today || undefined}
                onChange={(event) => {
                  const next = event.target.value
                  setCheckin(next)
                  if (checkout && checkout <= next) setCheckout('')
                  setError('')
                }}
                className="min-h-12 w-full min-w-0 rounded-2xl border border-[#bfd0d4] bg-white px-3 text-sm text-[#183744] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]"
              />
            </label>
            <label className="min-w-0">
              <span className="mb-1.5 flex items-center gap-1 text-[0.68rem] font-bold text-[#536a74]"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{copy.checkout}</span>
              <input
                type="date"
                name="checkout"
                required
                value={checkout}
                min={minCheckout || today || undefined}
                onChange={(event) => { setCheckout(event.target.value); setError('') }}
                className="min-h-12 w-full min-w-0 rounded-2xl border border-[#bfd0d4] bg-white px-3 text-sm text-[#183744] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]"
              />
            </label>
            <label className="min-w-0">
              <span className="mb-1.5 flex items-center gap-1 text-[0.68rem] font-bold text-[#536a74]"><Users className="h-3.5 w-3.5" aria-hidden="true" />{copy.adults}</span>
              <input type="number" name="adults" required min={1} max={8} value={adults} onChange={(event) => setAdults(Number(event.target.value))} className="min-h-12 w-full min-w-0 rounded-2xl border border-[#bfd0d4] bg-white px-3 text-sm text-[#183744] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" />
            </label>
            <label className="min-w-0">
              <span className="mb-1.5 block text-[0.68rem] font-bold text-[#536a74]">{copy.children}</span>
              <input type="number" name="children" required min={0} max={6} value={children} onChange={(event) => setChildren(Number(event.target.value))} className="min-h-12 w-full min-w-0 rounded-2xl border border-[#bfd0d4] bg-white px-3 text-sm text-[#183744] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]" />
            </label>
            <button type="submit" className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#079ecb] px-5 text-sm font-black text-white shadow-[0_10px_28px_rgba(7,158,203,0.2)] transition hover:bg-[#087da2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#063b50] xl:col-span-1">
              <Search className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
              {copy.submit}
            </button>
          </div>
          {error ? <p role="alert" className="mt-3 text-xs font-bold text-[#a94a2f]">{error}</p> : null}
        </form>
      </div>
    </div>
  )
}
