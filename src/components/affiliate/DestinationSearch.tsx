'use client'

import { useState } from 'react'
import { Search, ArrowUpRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { trackAffiliateClick } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 목적지 검색창 — 입력한 도시로 파트너 사이트 검색결과에 직행 (어필리에이트 추적 유지)
//
// Booking.com: searchresults.html?aid=7854081&ss={도시} → 부킹 자체 검색결과 + aid 추적
//   → 어떤 도시명이든 유효한 검색 파라미터라 딥링크 안전 + 수수료 귀속 (2026-07-13 검증)
// Inflearn:    courses?s={주제} + 파트너스 UTM → 강의 검색 결과 (검색 도우미)
// ⚠️ Trip.com hotels/list?searchWord=는 빈 결과(soft-404) 확인됨 → 숙소는 Booking 단일 채널
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

type Mode = 'hotel' | 'learn'

const COPY: Record<string, L> = {
  hotel_ph: { KO: '도시·지역으로 숙소 검색 (예: 도쿄, 치앙마이)', EN: 'Search stays by city (e.g. Tokyo, Chiang Mai)', JP: '都市名で宿を検索（例：東京、チェンマイ）' },
  learn_ph: { KO: '배우고 싶은 주제 검색 (예: 파이썬, 마케팅)', EN: 'Search a topic (e.g. Python, marketing)', JP: '学びたいテーマを検索（例：Python、マーケ）' },
  search: { KO: 'Booking.com에서 검색', EN: 'Search on Booking.com', JP: 'Booking.comで検索' },
  inflearn: { KO: '인프런에서 강의 검색', EN: 'Search courses on Inflearn', JP: 'Inflearnで講座を検索' },
  note: {
    KO: '입력한 도시로 Booking.com 검색 페이지에 바로 연결됩니다. (제휴 추적 적용)',
    EN: 'Opens Booking.com search results for your city. (affiliate tracked)',
    JP: '入力した都市でBooking.comの検索ページにつながります。（提携追跡あり）',
  },
  note_learn: {
    KO: '입력한 주제로 인프런 검색 결과에 바로 연결됩니다.',
    EN: 'Opens Inflearn search results for your topic.',
    JP: '入力したテーマでInflearnの検索結果につながります。',
  },
}

function buildLink(mode: Mode, q: string): { provider: string; href: string } {
  const query = encodeURIComponent(q.trim())
  if (mode === 'learn') {
    return {
      provider: '인프런',
      // 인프런 검색 결과 + 파트너스 UTM (검색 도우미 — 커미션은 개별 강의 홍보링크에서 귀속)
      href: `https://www.inflearn.com/courses?s=${query}&utm_source=partners&utm_medium=referral&utm_campaign=1771445`,
    }
  }
  // hotel — Booking ss= 는 어떤 도시명이든 유효한 검색 파라미터 (aid 추적)
  return {
    provider: 'Booking.com',
    href: `https://www.booking.com/searchresults.html?aid=7854081&ss=${query}`,
  }
}

export function DestinationSearch({ mode = 'hotel' }: { mode?: Mode }) {
  const { lang } = useLang()
  const [q, setQ] = useState('')

  const canSearch = q.trim().length > 0
  const placeholder = mode === 'learn' ? COPY.learn_ph[lang] : COPY.hotel_ph[lang]

  const open = () => {
    if (!canSearch) return
    const { provider, href } = buildLink(mode, q)
    trackAffiliateClick({ provider, status: 'active_affiliate', id: `search-${mode}` })
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-white border border-[#dbeafe] rounded-2xl p-3 sm:p-4 shadow-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          open()
        }}
        className="flex flex-col sm:flex-row gap-2.5"
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 focus-within:border-[#7dd3fc] transition-colors">
          <Search className="w-4 h-4 text-[#94a3b8] shrink-0" strokeWidth={ICON_STROKE} />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="flex-1 min-w-0 bg-transparent py-3 text-sm text-[#111827] placeholder:text-[#94a3b8] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!canSearch}
          className="inline-flex items-center justify-center gap-1.5 bg-brand-mid text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-brand-light transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          {mode === 'learn' ? COPY.inflearn[lang] : COPY.search[lang]}
          <ArrowUpRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
        </button>
      </form>

      <p className="text-[#a0a0a0] text-[0.7rem] mt-2.5 leading-relaxed">
        {mode === 'learn' ? COPY.note_learn[lang] : COPY.note[lang]}
      </p>
    </div>
  )
}
