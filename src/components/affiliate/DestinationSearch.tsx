'use client'

import { useState } from 'react'
import { Search, ArrowUpRight, CalendarDays } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { trackAffiliateClick } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'
import { buildBookingStaySearchHref, getStayDateRangeError } from '@/lib/affiliate/bookingSearch'

type L = Record<Lang, string>
type Mode = 'hotel' | 'learn'

const COPY: Record<string, L> = {
  hotel_ph: { KO: '도시·지역으로 숙소 검색 (예: 도쿄, 치앙마이)', EN: 'Search stays by city (e.g. Tokyo, Chiang Mai)', JP: '都市・エリアから宿を検索（例：東京、チェンマイ）' },
  learn_ph: { KO: '배우고 싶은 주제 검색 (예: 파이썬, 마케팅)', EN: 'Search a topic (e.g. Python, marketing)', JP: '学びたいテーマを検索（例：Python、マーケティング）' },
  search: { KO: 'Booking.com에서 검색', EN: 'Search on Booking.com', JP: 'Booking.comで検索' },
  inflearn: { KO: '인프런에서 강의 검색', EN: 'Search courses on Inflearn', JP: 'Inflearnで講座を検索' },
  checkin: { KO: '체크인', EN: 'Check-in', JP: 'チェックイン' },
  checkout: { KO: '체크아웃', EN: 'Check-out', JP: 'チェックアウト' },
  date_incomplete: { KO: '체크인과 체크아웃 날짜를 모두 선택해 주세요.', EN: 'Select both check-in and check-out dates.', JP: 'チェックイン日とチェックアウト日を両方選択してください。' },
  date_invalid: { KO: '체크아웃은 체크인 다음 날 이후로 선택해 주세요.', EN: 'Check-out must be after check-in.', JP: 'チェックアウト日はチェックイン日の翌日以降を選択してください。' },
  note: {
    KO: '선택한 도시와 날짜를 Booking.com 검색 결과에 그대로 연결합니다. 실제 요금과 객실 조건은 제휴사에서 확인하세요.',
    EN: 'Your city and dates are passed directly to Booking.com. Check live rates and room conditions with the partner.',
    JP: '選択した都市と日付をBooking.comの検索結果に引き継ぎます。料金と客室条件は提携先でご確認ください。',
  },
  note_learn: {
    KO: '입력한 주제로 인프런 검색 결과에 바로 연결됩니다.',
    EN: 'Opens Inflearn search results for your topic.',
    JP: '入力したテーマでInflearnの検索結果を開きます。',
  },
}

function buildLink(mode: Mode, q: string, checkin: string, checkout: string): { provider: string; href: string } {
  if (mode === 'learn') {
    return {
      provider: '인프런',
      href: `https://www.inflearn.com/courses?s=${encodeURIComponent(q.trim())}&utm_source=partners&utm_medium=referral&utm_campaign=1771445`,
    }
  }

  return {
    provider: 'Booking.com',
    href: buildBookingStaySearchHref({ destination: q, checkin, checkout }),
  }
}

export function DestinationSearch({ mode = 'hotel', forceLang }: { mode?: Mode; forceLang?: Lang }) {
  const { lang: contextLang } = useLang()
  const lang = forceLang ?? contextLang
  const [q, setQ] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [error, setError] = useState<string | null>(null)
  const isHotel = mode === 'hotel'
  const canSearch = q.trim().length > 0
  const placeholder = mode === 'learn' ? COPY.learn_ph[lang] : COPY.hotel_ph[lang]

  const open = ({ destination, arrival, departure }: { destination: string; arrival: string; departure: string }) => {
    if (!destination.trim()) return
    if (isHotel) {
      const dateError = getStayDateRangeError(arrival, departure)
      if (dateError) {
        setError(COPY[dateError === 'incomplete' ? 'date_incomplete' : 'date_invalid'][lang])
        return
      }
    }
    setError(null)
    const { provider, href } = buildLink(mode, destination, arrival, departure)
    trackAffiliateClick({ provider, status: 'active_affiliate', id: `search-${mode}` })
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="rounded-2xl border border-[#dbeafe] bg-white p-3 shadow-sm sm:p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const form = new FormData(e.currentTarget)
          open({
            destination: String(form.get('destination') ?? q),
            arrival: String(form.get('checkin') ?? checkin),
            departure: String(form.get('checkout') ?? checkout),
          })
        }}
        className={isHotel
          ? 'grid grid-cols-2 gap-2.5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]'
          : 'flex flex-col gap-2.5 sm:flex-row'}
      >
        <div className={`${isHotel ? 'col-span-2 md:col-span-3' : 'flex-1'} flex min-w-0 items-center gap-2.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 transition-colors focus-within:border-[#7dd3fc]`}>
          <Search className="h-4 w-4 shrink-0 text-[#94a3b8]" strokeWidth={ICON_STROKE} />
          <input
            type="text"
            name="destination"
            value={q}
            onChange={(e) => { setQ(e.target.value); setError(null) }}
            placeholder={placeholder}
            aria-label={placeholder}
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#111827] placeholder:text-[#94a3b8] focus:outline-none"
          />
        </div>

        {isHotel && (
          <>
            <label className="min-w-0 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 transition-colors focus-within:border-[#7dd3fc]">
              <span className="flex items-center gap-1 text-[0.65rem] font-bold text-[#64748b]"><CalendarDays className="h-3 w-3" aria-hidden="true" />{COPY.checkin[lang]}</span>
              <input type="date" name="checkin" value={checkin} onChange={(e) => { setCheckin(e.target.value); setError(null) }} aria-label={COPY.checkin[lang]} className="mt-0.5 w-full min-w-0 bg-transparent text-xs font-semibold text-[#1e293b] focus:outline-none" />
            </label>
            <label className="min-w-0 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 transition-colors focus-within:border-[#7dd3fc]">
              <span className="flex items-center gap-1 text-[0.65rem] font-bold text-[#64748b]"><CalendarDays className="h-3 w-3" aria-hidden="true" />{COPY.checkout[lang]}</span>
              <input type="date" name="checkout" value={checkout} min={checkin || undefined} onChange={(e) => { setCheckout(e.target.value); setError(null) }} aria-label={COPY.checkout[lang]} className="mt-0.5 w-full min-w-0 bg-transparent text-xs font-semibold text-[#1e293b] focus:outline-none" />
            </label>
          </>
        )}

        <button
          type="submit"
          disabled={!canSearch}
          className={`${isHotel ? 'col-span-2 md:col-span-1' : ''} inline-flex min-h-12 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-brand-mid px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {mode === 'learn' ? COPY.inflearn[lang] : COPY.search[lang]}
          <ArrowUpRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
        </button>
      </form>

      {error && <p role="alert" className="mt-2.5 text-xs font-semibold text-amber-700">{error}</p>}
      <p className="mt-2.5 text-[0.7rem] leading-relaxed text-[#7c8795]">
        {mode === 'learn' ? COPY.note_learn[lang] : COPY.note[lang]}
      </p>
    </div>
  )
}
