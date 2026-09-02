'use client'

import { RotateCcw, SlidersHorizontal } from 'lucide-react'

import type { Lang } from '@/lib/i18n/types'
import type {
  StayResultFilterAvailability,
  StayResultFilterKey,
  StayResultFilters,
  StayResultSort,
} from '@/lib/stays/resultRefinement'

const COPY = {
  KO: {
    sort: '정렬', providerOrder: '제휴사 기본 순서', rateAsc: '1박 요금 낮은 순', reviewDesc: '후기 평점 높은 순',
    filter: '조건', freeWifi: '무료 Wi‑Fi', breakfastIncluded: '조식 포함', reviewEightPlus: '후기 8점 이상',
    visible: (visible: number, total: number) => `${total}개 중 ${visible}개 표시`, reset: '초기화',
  },
  EN: {
    sort: 'Sort', providerOrder: 'Partner order', rateAsc: 'Lowest nightly rate', reviewDesc: 'Highest review score',
    filter: 'Filters', freeWifi: 'Free Wi‑Fi', breakfastIncluded: 'Breakfast included', reviewEightPlus: 'Review score 8+',
    visible: (visible: number, total: number) => `${visible} of ${total} shown`, reset: 'Reset',
  },
  JP: {
    sort: '並び順', providerOrder: '提携先の基本順', rateAsc: '1泊料金が低い順', reviewDesc: '口コミ評価が高い順',
    filter: '条件', freeWifi: '無料Wi‑Fi', breakfastIncluded: '朝食付き', reviewEightPlus: '口コミ8点以上',
    visible: (visible: number, total: number) => `${total}件中${visible}件を表示`, reset: 'リセット',
  },
} satisfies Record<Lang, {
  sort: string
  providerOrder: string
  rateAsc: string
  reviewDesc: string
  filter: string
  freeWifi: string
  breakfastIncluded: string
  reviewEightPlus: string
  visible: (visible: number, total: number) => string
  reset: string
}>

export function StayResultRefinementBar({
  lang,
  sort,
  filters,
  availability,
  visibleCount,
  totalCount,
  onSortChange,
  onFilterToggle,
  onReset,
}: {
  lang: Lang
  sort: StayResultSort
  filters: StayResultFilters
  availability: StayResultFilterAvailability
  visibleCount: number
  totalCount: number
  onSortChange: (sort: StayResultSort) => void
  onFilterToggle: (filter: StayResultFilterKey) => void
  onReset: () => void
}) {
  const copy = COPY[lang]
  const hasRefinement = sort !== 'provider_order' || Object.values(filters).some(Boolean)
  const filterOptions: Array<{ key: StayResultFilterKey; label: string }> = [
    { key: 'freeWifi', label: copy.freeWifi },
    { key: 'breakfastIncluded', label: copy.breakfastIncluded },
    { key: 'reviewEightPlus', label: copy.reviewEightPlus },
  ]

  return (
    <div className="mb-7 border-y border-[#d9dfdc] py-4 sm:py-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,17rem)] lg:items-end">
        <div className="min-w-0 flex-1">
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#49616b]">
            <SlidersHorizontal className="h-4 w-4 text-[#078db6]" aria-hidden="true" />
            {copy.filter}
            </p>
            <p className="text-xs font-semibold text-[#647983]" aria-live="polite">{copy.visible(visibleCount, totalCount)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.filter(({ key }) => availability[key]).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                aria-pressed={filters[key]}
                onClick={() => onFilterToggle(key)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb] ${filters[key] ? 'border-[#078db6] bg-[#e6f8fc] text-[#056f91]' : 'border-[#cdd9dc] bg-white text-[#465e68] hover:border-[#8fb7c2]'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="block min-w-0">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#49616b]">{copy.sort}</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as StayResultSort)}
            className="min-h-11 w-full rounded-xl border border-[#cdd9dc] bg-white px-4 text-sm font-bold text-[#183744] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]"
          >
            <option value="provider_order">{copy.providerOrder}</option>
            <option value="rate_asc">{copy.rateAsc}</option>
            <option value="review_desc">{copy.reviewDesc}</option>
          </select>
        </label>
      </div>

      {hasRefinement ? (
        <button type="button" onClick={onReset} className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs font-bold text-[#087c9e] hover:bg-[#eef8fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#079ecb]">
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />{copy.reset}
        </button>
      ) : null}
    </div>
  )
}
