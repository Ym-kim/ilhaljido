'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { AffiliateCategory } from '@/lib/affiliate/types'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'

type ReadyCategory = {
  category: AffiliateCategory
  label: string
  count: number
  targetId: string
}

const COPY = {
  eyebrow: { KO: 'WAKATION READY', EN: 'WAKATION READY', JP: 'WAKATION READY' },
  title: {
    KO: '필요한 준비를 하나씩 확인하세요',
    EN: 'Get this trip ready, one step at a time',
    JP: '必要な準備を一つずつ確認しましょう',
  },
  description: {
    KO: '숙소부터 이동·연결 수단까지, 이 일정에 맞는 항목만 모았습니다.',
    EN: 'Only the stays, transport and connections that fit this itinerary.',
    JP: '宿泊から移動・通信まで、この旅程に合う項目だけをまとめました。',
  },
  progress: { KO: '살펴본 준비', EN: 'Categories explored', JP: '確認した準備' },
  checked: { KO: '제휴사로 이동함', EN: 'Partner opened', JP: '提携先を確認済み' },
  pending: { KO: '확인하기', EN: 'Explore', JP: '確認する' },
  count: { KO: '개 선택지', EN: ' options', JP: '件の選択肢' },
  note: {
    KO: '제휴사 조건을 살펴본 기록이며 예약 완료를 의미하지 않습니다.',
    EN: 'This records partner visits, not completed bookings.',
    JP: '提携先を確認した記録であり、予約完了を意味するものではありません。',
  },
  all: { KO: '전체 여행 준비 보기', EN: 'See all travel essentials', JP: '旅の準備をすべて見る' },
} satisfies Record<string, Record<Lang, string>>

export function WakationReadyPanel({
  categories,
  completedCategories,
  lang,
  tripSetSlug,
  destinationSlug,
  allPreparationHref,
}: {
  categories: ReadyCategory[]
  completedCategories: AffiliateCategory[]
  lang: Lang
  tripSetSlug: string
  destinationSlug: string
  allPreparationHref: string
}) {
  const completed = categories.filter(({ category }) => completedCategories.includes(category)).length
  const percentage = categories.length > 0 ? Math.round((completed / categories.length) * 100) : 0

  return (
    <aside
      data-wakation-ready
      className="mb-8 mt-6 overflow-hidden rounded-[1.4rem] border border-[#cddfe2] bg-[#f5faf9] shadow-[0_14px_34px_rgba(8,47,73,0.07)]"
      aria-labelledby="wakation-ready-title"
    >
      <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="min-w-0">
          <span className="text-[0.65rem] font-black tracking-[0.16em] text-[#147393]">{COPY.eyebrow[lang]}</span>
          <h3 id="wakation-ready-title" className="mt-2 text-xl font-black leading-tight text-[#142b36] sm:text-2xl">
            {COPY.title[lang]}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c7078]">{COPY.description[lang]}</p>
        </div>

        <div className="min-w-[10rem]" aria-live="polite">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs font-bold text-[#5c7078]">{COPY.progress[lang]}</span>
            <span className="text-sm font-black text-[#0b6686]">{completed}/{categories.length}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#d9e7e7]">
            <span
              className="block h-full rounded-full bg-[#16a3cf] transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 border-t border-[#dce8e8] min-[430px]:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ category, label, count, targetId }, index) => {
          const isCompleted = completedCategories.includes(category)
          return (
            <a
              key={category}
              data-ready-focus={category}
              href={`#${targetId}`}
              onClick={() => trackEvent('ready_category_focus', {
                trip_set: tripSetSlug,
                destination: destinationSlug,
                locale: lang,
                category,
                cta_position: String(index + 1),
              })}
              className="group flex min-h-[5.5rem] items-center justify-between gap-3 border-b border-[#dce8e8] px-5 py-4 text-left transition hover:bg-white focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-600 min-[430px]:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-black text-[#183542]">{label}</span>
                <span className={`mt-1 block text-[0.68rem] font-bold ${isCompleted ? 'text-[#188264]' : 'text-[#71838a]'}`}>
                  {isCompleted
                    ? COPY.checked[lang]
                    : `${COPY.pending[lang]} · ${count}${COPY.count[lang]}`}
                </span>
              </span>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                isCompleted
                  ? 'border-[#9ed1bf] bg-white text-[#188264]'
                  : 'border-[#c8dade] bg-white text-[#147393] group-hover:border-[#77b8c8]'
              }`}>
                {isCompleted
                  ? <Check aria-hidden="true" className="h-4 w-4" strokeWidth={ICON_STROKE} />
                  : <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={ICON_STROKE} />}
              </span>
            </a>
          )
        })}
      </div>

      <div className="flex flex-col gap-3 border-t border-[#dce8e8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="text-[0.7rem] leading-relaxed text-[#73838a]">{COPY.note[lang]}</p>
        <Link
          href={allPreparationHref}
          onClick={() => trackEvent('ready_all_preparation_click', {
            trip_set: tripSetSlug,
            destination: destinationSlug,
            locale: lang,
          })}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start text-xs font-black text-[#086f94] transition hover:text-[#034f70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 sm:self-auto"
        >
          {COPY.all[lang]}
          <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={ICON_STROKE} />
        </Link>
      </div>
    </aside>
  )
}
