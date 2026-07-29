'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'A TRIP THAT FITS', EN: 'A TRIP THAT FITS', JP: 'A TRIP THAT FITS' },
  title: { KO: '어디로 갈지 고민된다면', EN: 'Not sure where to go?', JP: '行き先に迷ったら' },
  lead: {
    KO: '기간·분위기·동행만 고르면 지금 잘 맞는 Trip Set을 찾아드려요.',
    EN: 'Choose your time, mood and company to find a fitting Trip Set.',
    JP: '日数・気分・同行者を選ぶだけで、今の自分に合うTrip Setが見つかります。',
  },
  cta: { KO: '30초 여행 찾기', EN: 'Find my trip', JP: '30秒で旅を見つける' },
}

export function TripMatchHomeCta({ forceLang }: { forceLang?: Lang }) {
  const { lang: contextLang } = useLang()
  const lang = forceLang ?? contextLang
  const href = lang === 'JP' ? '/ja/trip-match' : '/trip-match'

  return (
    <section className="border-b border-[#dbe4e3] bg-[#edf5f4] px-5 py-7 sm:px-8 md:py-9">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 rounded-[1.6rem] border border-[#cddcdb] bg-white px-5 py-6 shadow-[0_12px_36px_rgba(24,67,78,.06)] sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="min-w-0">
          <span className="block text-[0.65rem] font-extrabold tracking-[0.18em] text-[#317b98]">{COPY.eyebrow[lang]}</span>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#142431]">{COPY.title[lang]}</h2>
          <p className="mt-1.5 max-w-2xl text-sm font-medium leading-6 text-[#65747d]">{COPY.lead[lang]}</p>
        </div>
        <Link
          href={href}
          onClick={() => trackEvent('trip_match_home_cta_click', { locale: lang === 'JP' ? 'ja' : lang === 'EN' ? 'en' : 'ko' })}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#0b4b69] px-6 text-sm font-black text-white transition hover:bg-[#083d56] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]"
        >
          {COPY.cta[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
        </Link>
      </div>
    </section>
  )
}
