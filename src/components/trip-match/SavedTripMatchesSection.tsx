'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trash2 } from 'lucide-react'
import { useSavedTripMatches } from '@/hooks/useSavedTripMatches'
import { getCollection } from '@/lib/affiliate/collections'
import { serializeTripMatchAnswer } from '@/lib/tripMatch'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'SAVED TRIP MATCH', EN: 'SAVED TRIP MATCH', JP: 'SAVED TRIP MATCH' },
  title: { KO: '저장한 여행 추천', EN: 'Saved trip matches', JP: '保存した旅の提案' },
  lead: {
    KO: '로그인 없이 이 브라우저에만 저장됩니다.',
    EN: 'Saved only in this browser, with no sign-in.',
    JP: 'ログインなしで、このブラウザだけに保存されます。',
  },
  open: { KO: '결과 다시 보기', EN: 'Open result', JP: '結果をもう一度見る' },
  remove: { KO: '저장 삭제', EN: 'Remove saved result', JP: '保存を削除' },
}

export function SavedTripMatchesSection() {
  const { lang } = useLang()
  const { items, remove } = useSavedTripMatches()

  if (items.length === 0) return null

  return (
    <section className="mb-12 border-b border-[#e1e7e8] pb-12">
      <span className="text-[0.68rem] font-extrabold tracking-[0.18em] text-[#317b98]">{COPY.eyebrow[lang]}</span>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#142431] sm:text-3xl">{COPY.title[lang]}</h2>
      <p className="mt-2 text-sm font-medium text-[#718087]">{COPY.lead[lang]}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((saved) => {
          const collection = getCollection(saved.resultSlug)
          if (!collection) return null
          const query = new URLSearchParams(serializeTripMatchAnswer(saved.answer))
          if (saved.campaign) query.set('campaign', saved.campaign)
          const prefix = saved.locale === 'JP' ? '/ja' : ''
          const href = `${prefix}/trip-match/result?${query.toString()}`

          return (
            <article key={saved.id} className="grid min-w-0 grid-cols-[7.5rem_1fr] overflow-hidden rounded-[1.35rem] border border-[#dae2e3] bg-white shadow-[0_8px_28px_rgba(12,55,72,.05)] sm:grid-cols-[10rem_1fr]">
              <div className="relative min-h-40 overflow-hidden bg-[#e8efef]">
                <Image src={collection.photo} alt={collection.photoAlt?.[lang] ?? collection.title[lang]} fill sizes="160px" className="object-cover" style={{ objectPosition: collection.photoPosition }} />
              </div>
              <div className="flex min-w-0 flex-col p-4 sm:p-5">
                <span className="text-[0.65rem] font-black tracking-[0.1em] text-[#317b98]">{collection.durationLabel?.[lang]}</span>
                <h3 className="mt-1 line-clamp-2 text-lg font-black leading-snug text-[#142431]">{collection.title[lang]}</h3>
                <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-[#718087]">{collection.tagline[lang]}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                  <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 text-xs font-black text-[#0b4b69] hover:underline">
                    {COPY.open[lang]} <ArrowRight className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
                  </Link>
                  <button type="button" onClick={() => remove(saved.id)} aria-label={COPY.remove[lang]} className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full text-[#93a0a5] transition hover:bg-[#f1f4f3] hover:text-[#52636c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
                    <Trash2 className="h-4 w-4" strokeWidth={ICON_STROKE} />
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
