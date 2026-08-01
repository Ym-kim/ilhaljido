'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'
import { trackEvent } from '@/lib/track'
import {
  getSupportCatalog,
  SUPPORT_LABELS,
  SUPPORT_STATUS_ORDER,
  type SupportCatalogItem,
  type SupportDiscoveryStatus,
  type SupportDuration,
  type SupportRegion,
  type SupportType,
} from '@/lib/support/catalog'
import { SupportProgramCard } from '@/components/programs/SupportProgramCard'
import type { Lang } from '@/lib/i18n/types'

const COPY = {
  eyebrow: { KO: 'LOCAL STAY EDIT', EN: 'LOCAL STAY EDIT', JP: 'LOCAL STAY EDIT' },
  title: { KO: '지원받고, 더 가볍게 머무는 여행', EN: 'Stay longer with the right local support', JP: '地域の支援で、もっと身軽に滞在する' },
  desc: { KO: '기간·지역·혜택을 먼저 비교하고, 공식 공고에서 최종 조건을 확인하세요. Wakation은 신청이나 지급을 대행하지 않습니다.', EN: 'Compare duration, region and benefits first, then confirm every condition in the official notice. Wakation does not accept applications or issue benefits.', JP: '期間・地域・支援内容を比較し、最終条件は必ず公式公告で確認してください。Wakationは申請受付や支給を行いません。' },
  search: { KO: '지역이나 프로그램 이름으로 검색', EN: 'Search a region or program', JP: '地域・プログラム名で検索' },
  searchCta: { KO: '검색', EN: 'Search', JP: '検索' },
  filters: { KO: '필터', EN: 'Filters', JP: '絞り込み' },
  reset: { KO: '전체 초기화', EN: 'Reset all', JP: 'すべて解除' },
  close: { KO: '필터 닫기', EN: 'Close filters', JP: '絞り込みを閉じる' },
  show: { KO: '결과 보기', EN: 'Show results', JP: '結果を見る' },
  status: { KO: '모집 상태', EN: 'Status', JP: '募集状況' },
  region: { KO: '지역', EN: 'Region', JP: '地域' },
  duration: { KO: '체류 기간', EN: 'Stay length', JP: '滞在期間' },
  support: { KO: '지원 형태', EN: 'Support type', JP: '支援内容' },
  all: { KO: '전체', EN: 'All', JP: 'すべて' },
  result: { KO: '개 프로그램', EN: 'programs', JP: '件のプログラム' },
  sort: { KO: '정렬', EN: 'Sort', JP: '並び替え' },
  sortStatus: { KO: '모집 상태순', EN: 'Status', JP: '募集状況順' },
  sortDeadline: { KO: '마감 가까운순', EN: 'Deadline', JP: '締切が近い順' },
  sortRecent: { KO: '최근 확인순', EN: 'Recently checked', JP: '確認日が新しい順' },
  emptyTitle: { KO: '조건에 맞는 프로그램이 없어요', EN: 'No programs match', JP: '条件に合うプログラムがありません' },
  emptyDesc: { KO: '필터를 줄이거나 다른 지역을 검색해 보세요.', EN: 'Try fewer filters or another region.', JP: '条件を減らすか、別の地域を検索してください。' },
  halfTitle: { KO: '반값여행, 무엇을 먼저 확인해야 할까요?', EN: 'How regional half-price travel works', JP: '地域の旅行費支援、申請前に確認すること' },
  halfDesc: { KO: '사전신청부터 영수증 증빙, 지역화폐 환급까지 제도의 흐름을 한 번에 정리했습니다.', EN: 'A clear guide to advance applications, receipts and local-currency reimbursement.', JP: '事前申請、領収書の証明、地域通貨での還付までを整理しました。' },
  halfCta: { KO: '반값여행 가이드', EN: 'Read the guide', JP: 'ガイドを見る' },
  calendarCta: { KO: '모집 일정 캘린더', EN: 'View the calendar', JP: '募集カレンダー' },
  reportTitle: { KO: '새로운 지역 프로그램을 알고 계신가요?', EN: 'Know a local program we should review?', JP: '新しい地域プログラムをご存じですか？' },
  reportDesc: { KO: '공식 공고 URL을 보내주시면 운영자 확인 후 반영합니다. 제출 즉시 공개되지 않습니다.', EN: 'Send the official notice URL. We review it before anything is published.', JP: '公式公告のURLをお送りください。運営者の確認後に掲載します。' },
  reportCta: { KO: '프로그램 제보', EN: 'Suggest a program', JP: 'プログラムを提案' },
} satisfies Record<string, Record<Lang, string>>

type FilterKey = 'status' | 'region' | 'duration' | 'support' | 'sort'
type FilterOptionKey = Exclude<FilterKey, 'sort'>
type CurrentFilters = {
  q: string
  status: string
  region: string
  duration: string
  support: string
  sort: string
}

function prefixFor(lang: Lang) {
  return lang === 'JP' ? '/ja' : lang === 'EN' ? '/en' : ''
}

function matchesQuery(program: SupportCatalogItem, query: string) {
  if (!query) return true
  const haystack = [program.name, program.region, program.benefit, program.deadline, ...program.conditions].join(' ').toLocaleLowerCase()
  return haystack.includes(query.toLocaleLowerCase())
}

function FilterControls({
  lang,
  current,
  statuses,
  regions,
  durations,
  supportTypes,
  mobile = false,
  onChange,
}: {
  lang: Lang
  current: CurrentFilters
  statuses: SupportDiscoveryStatus[]
  regions: SupportRegion[]
  durations: SupportDuration[]
  supportTypes: SupportType[]
  mobile?: boolean
  onChange: (key: FilterOptionKey, value: string) => void
}) {
  return (
    <div className={mobile ? 'space-y-7' : 'space-y-6'}>
      <FilterGroup title={COPY.status[lang]}>
        <FilterChoice active={current.status === 'all'} onClick={() => onChange('status', 'all')}>{COPY.all[lang]}</FilterChoice>
        {statuses.map((status) => <FilterChoice key={status} active={current.status === status} onClick={() => onChange('status', status)}>{SUPPORT_LABELS.status[status][lang]}</FilterChoice>)}
      </FilterGroup>
      <FilterGroup title={COPY.region[lang]}>
        <FilterChoice active={current.region === 'all'} onClick={() => onChange('region', 'all')}>{COPY.all[lang]}</FilterChoice>
        {regions.map((region) => <FilterChoice key={region} active={current.region === region} onClick={() => onChange('region', region)}>{SUPPORT_LABELS.region[region][lang]}</FilterChoice>)}
      </FilterGroup>
      <FilterGroup title={COPY.duration[lang]}>
        <FilterChoice active={current.duration === 'all'} onClick={() => onChange('duration', 'all')}>{COPY.all[lang]}</FilterChoice>
        {durations.map((duration) => <FilterChoice key={duration} active={current.duration === duration} onClick={() => onChange('duration', duration)}>{SUPPORT_LABELS.duration[duration][lang]}</FilterChoice>)}
      </FilterGroup>
      <FilterGroup title={COPY.support[lang]}>
        <FilterChoice active={current.support === 'all'} onClick={() => onChange('support', 'all')}>{COPY.all[lang]}</FilterChoice>
        {supportTypes.map((type) => <FilterChoice key={type} active={current.support === type} onClick={() => onChange('support', type)}>{SUPPORT_LABELS.supportType[type][lang]}</FilterChoice>)}
      </FilterGroup>
    </div>
  )
}

export function SupportProgramsView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [queryDraft, setQueryDraft] = useState(searchParams.get('q') ?? '')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const prefix = prefixFor(lang)
  const programs = useMemo(() => getSupportCatalog(lang), [lang])

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  useEffect(() => {
    if (!drawerOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen])

  const current: CurrentFilters = {
    q: searchParams.get('q') ?? '',
    status: searchParams.get('status') ?? 'all',
    region: searchParams.get('region') ?? 'all',
    duration: searchParams.get('duration') ?? 'all',
    support: searchParams.get('support') ?? 'all',
    sort: searchParams.get('sort') ?? 'status',
  }

  const availableStatuses = useMemo(() => [...new Set(programs.map((program) => program.status))], [programs])
  const availableRegions = useMemo(() => [...new Set(programs.map((program) => program.regionGroup))], [programs])
  const availableDurations = useMemo(() => [...new Set(programs.map((program) => program.duration))], [programs])
  const availableSupportTypes = useMemo(() => [...new Set(programs.flatMap((program) => program.supportTypes))], [programs])

  const filtered = useMemo(() => {
    const result = programs.filter((program) =>
      matchesQuery(program, current.q)
      && (current.status === 'all' || program.status === current.status)
      && (current.region === 'all' || program.regionGroup === current.region)
      && (current.duration === 'all' || program.duration === current.duration)
      && (current.support === 'all' || program.supportTypes.includes(current.support as SupportType)),
    )
    return [...result].sort((a, b) => {
      if (current.sort === 'deadline') {
        if (!a.applicationEnd && !b.applicationEnd) return SUPPORT_STATUS_ORDER[a.status] - SUPPORT_STATUS_ORDER[b.status]
        if (!a.applicationEnd) return 1
        if (!b.applicationEnd) return -1
        return a.applicationEnd.localeCompare(b.applicationEnd)
      }
      if (current.sort === 'recent') return b.verifiedAt.localeCompare(a.verifiedAt)
      return SUPPORT_STATUS_ORDER[a.status] - SUPPORT_STATUS_ORDER[b.status]
    })
  }, [programs, current.q, current.status, current.region, current.duration, current.support, current.sort])

  const activeCount = ['status', 'region', 'duration', 'support'].filter((key) => current[key as keyof typeof current] !== 'all').length

  function updateParam(key: FilterKey | 'q', value: string) {
    const next = new URLSearchParams(searchParams.toString())
    if (!value || value === 'all' || (key === 'sort' && value === 'status')) next.delete(key)
    else next.set(key, value)
    router.replace(`${pathname}${next.size ? `?${next.toString()}` : ''}`, { scroll: false })
    if (key !== 'sort' && key !== 'q') {
      trackEvent('support_filter_apply', { locale: lang.toLowerCase(), filter: key, value })
    }
  }

  function clearFilters() {
    setQueryDraft('')
    router.replace(pathname, { scroll: false })
  }

  function submitSearch(event: React.FormEvent) {
    event.preventDefault()
    const query = queryDraft.trim()
    updateParam('q', query)
    trackEvent('support_search', { locale: lang.toLowerCase(), query_length: String(query.length) })
  }

  return (
    <main className={`min-h-screen bg-[#fafaf7] ${lang === 'JP' ? '[word-break:normal]' : ''}`}>
      <div className="px-5 pb-2 pt-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Link href={`${prefix}/programs`} className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#74858d] hover:text-[#17647f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
            {{ KO: '프로그램', EN: 'Programs', JP: 'プログラム' }[lang]}
          </Link>
        </div>
      </div>

      <section className="px-5 pb-9 pt-7 sm:px-6 md:pb-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[0.6875rem] font-semibold tracking-[0.13em] text-[#317b98]">{COPY.eyebrow[lang]}</p>
          <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h1 className="max-w-3xl text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#132832] text-balance">{COPY.title[lang]}</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#63757d] sm:text-base">{COPY.desc[lang]}</p>
            </div>
            <Link href={`${prefix}/programs/support/calendar`} onClick={() => trackEvent('support_calendar_open', { locale: lang.toLowerCase(), source: 'support_hero' })} className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#cbdadd] bg-white px-5 text-sm font-bold text-[#17647f] transition hover:border-[#78a8b8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
              {COPY.calendarCta[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>

          <form onSubmit={submitSearch} className="mt-9 flex min-w-0 gap-2 rounded-[1.15rem] border border-[#d6e1e3] bg-white p-2 shadow-[0_12px_40px_rgba(20,58,72,.07)]">
            <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 shrink-0 text-[#63818c]" strokeWidth={ICON_STROKE} />
              <span className="sr-only">{COPY.search[lang]}</span>
              <input value={queryDraft} onChange={(event) => setQueryDraft(event.target.value)} placeholder={COPY.search[lang]} className="min-w-0 flex-1 bg-transparent py-3 text-base text-[#162b35] outline-none placeholder:text-[#92a0a5]" />
            </label>
            <button type="submit" className="min-h-11 shrink-0 rounded-xl bg-[#153a49] px-5 text-sm font-bold text-white transition hover:bg-[#0c4d68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">{COPY.searchCta[lang]}</button>
          </form>
        </div>
      </section>

      <section className="border-y border-[#e3e9e9] bg-white px-5 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => setDrawerOpen(true)} aria-expanded={drawerOpen} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#cbdadd] px-4 text-sm font-bold text-[#294650] lg:hidden">
              <SlidersHorizontal className="h-4 w-4" strokeWidth={ICON_STROKE} /> {COPY.filters[lang]}{activeCount > 0 ? ` ${activeCount}` : ''}
            </button>
            <span aria-live="polite" className="truncate text-sm font-semibold text-[#334b55]">{filtered.length}{COPY.result[lang]}</span>
          </div>
          <label className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#60747c]">
            <span className="hidden sm:inline">{COPY.sort[lang]}</span>
            <select value={current.sort} onChange={(event) => updateParam('sort', event.target.value)} className="min-h-11 rounded-full border border-[#d5e0e2] bg-white px-3 text-sm text-[#263f49] outline-none focus:border-[#317b98]">
              <option value="status">{COPY.sortStatus[lang]}</option>
              <option value="deadline">{COPY.sortDeadline[lang]}</option>
              <option value="recent">{COPY.sortRecent[lang]}</option>
            </select>
          </label>
        </div>
      </section>

      <section className="px-5 py-9 sm:px-6 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="hidden self-start rounded-[1.25rem] border border-[#dde6e7] bg-white p-5 lg:block">
            <div className="mb-6 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#253f49]"><Filter className="h-4 w-4" strokeWidth={ICON_STROKE} />{COPY.filters[lang]}</span>
              {activeCount > 0 || current.q ? <button type="button" onClick={clearFilters} className="text-xs font-semibold text-[#317b98] hover:underline">{COPY.reset[lang]}</button> : null}
            </div>
            <FilterControls
              lang={lang}
              current={current}
              statuses={availableStatuses}
              regions={availableRegions}
              durations={availableDurations}
              supportTypes={availableSupportTypes}
              onChange={updateParam}
            />
          </aside>

          <div className="min-w-0">
            {filtered.length ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((program, index) => <SupportProgramCard key={program.id} program={program} lang={lang} imagePriority={index === 0} />)}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-[#cbdadd] bg-white px-6 py-16 text-center">
                <p className="text-lg font-bold text-[#243f49]">{COPY.emptyTitle[lang]}</p>
                <p className="mt-2 text-sm text-[#718187]">{COPY.emptyDesc[lang]}</p>
                <button type="button" onClick={clearFilters} className="mt-6 min-h-11 rounded-full bg-[#153a49] px-5 text-sm font-bold text-white">{COPY.reset[lang]}</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6 md:pb-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <Link href={`${prefix}/programs/support/half-price-travel`} onClick={() => trackEvent('half_price_guide_open', { locale: lang.toLowerCase(), source: 'support_footer' })} className="group min-w-0 rounded-[1.35rem] bg-[#163a49] p-6 text-white transition hover:bg-[#0e4d67] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
            <p className="text-lg font-bold">{COPY.halfTitle[lang]}</p>
            <p className="mt-2 text-sm leading-6 text-white/70">{COPY.halfDesc[lang]}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#bde7f4]">{COPY.halfCta[lang]} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
          </Link>
          <Link href={lang === 'KO' ? '/programs/support/register' : '/contact'} className="group min-w-0 rounded-[1.35rem] border border-[#dce5e7] bg-white p-6 transition hover:border-[#9fc2ce] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
            <p className="text-lg font-bold text-[#243f49]">{COPY.reportTitle[lang]}</p>
            <p className="mt-2 text-sm leading-6 text-[#6b7d84]">{COPY.reportDesc[lang]}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#17647f]">{COPY.reportCta[lang]} <ArrowUpRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </section>

      {drawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label={COPY.filters[lang]}>
          <button type="button" aria-label={COPY.close[lang]} onClick={() => setDrawerOpen(false)} className="absolute inset-0 bg-[#07151d]/55" />
          <div className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-[1.75rem] bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl">
            <div className="sticky top-0 z-10 mb-6 flex items-center justify-between bg-white pb-3">
              <p className="text-lg font-bold text-[#243f49]">{COPY.filters[lang]}</p>
              <button ref={closeRef} type="button" onClick={() => setDrawerOpen(false)} aria-label={COPY.close[lang]} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#eef3f4] text-[#294650] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]"><X className="h-5 w-5" /></button>
            </div>
            <FilterControls
              lang={lang}
              current={current}
              statuses={availableStatuses}
              regions={availableRegions}
              durations={availableDurations}
              supportTypes={availableSupportTypes}
              onChange={updateParam}
              mobile
            />
            <div className="sticky bottom-0 mt-8 grid grid-cols-[auto_1fr] gap-2 bg-white pt-4">
              <button type="button" onClick={clearFilters} className="min-h-12 rounded-full border border-[#cbdadd] px-5 text-sm font-bold text-[#415a64]">{COPY.reset[lang]}</button>
              <button type="button" onClick={() => setDrawerOpen(false)} className="min-h-12 rounded-full bg-[#153a49] px-5 text-sm font-bold text-white">{filtered.length}{COPY.result[lang]} · {COPY.show[lang]}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-xs font-bold text-[#536970]">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  )
}

function FilterChoice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`min-h-11 rounded-full border px-3.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98] ${active ? 'border-[#153a49] bg-[#153a49] text-white' : 'border-[#d9e2e4] bg-white text-[#536970] hover:border-[#94b4bf]'}`}>
      {children}
    </button>
  )
}
