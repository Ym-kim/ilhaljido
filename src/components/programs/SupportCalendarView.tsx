import Link from 'next/link'
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react'
import {
  getSupportCalendarEvents,
  getSupportCatalog,
  SUPPORT_LABELS,
  type SupportCalendarEventKind,
} from '@/lib/support/catalog'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'

const COPY = {
  back: { KO: '지원 프로그램', EN: 'Support programs', JP: '支援プログラム' },
  eyebrow: { KO: 'VERIFIED DATE CALENDAR', EN: 'VERIFIED DATE CALENDAR', JP: 'VERIFIED DATE CALENDAR' },
  title: { KO: '확인된 날짜만 모은 지원사업 캘린더', EN: 'A calendar built only from verified dates', JP: '確認できた日付だけの支援カレンダー' },
  desc: {
    KO: '정확한 날짜가 공식 자료에 있는 접수 시작·마감과 여행 기간만 표시합니다. 달력에 없다고 모집이 없는 것은 아니며, 최종 일정은 반드시 공식 공고가 우선합니다.',
    EN: 'Only application and travel dates stated in official material appear here. Absence from the calendar does not mean a program is unavailable; always confirm the official notice.',
    JP: '公式資料で確認できた受付日と旅行・運営期間だけを掲載します。カレンダーにないことは募集がないという意味ではありません。最終日程は必ず公式公告で確認してください。',
  },
  previous: { KO: '이전 달', EN: 'Previous month', JP: '前の月' },
  next: { KO: '다음 달', EN: 'Next month', JP: '次の月' },
  verifiedMonths: { KO: '확인된 일정이 있는 달', EN: 'Months with verified dates', JP: '確認済み日程がある月' },
  schedule: { KO: '이달의 확인된 일정', EN: 'Verified dates this month', JP: '今月の確認済み日程' },
  empty: { KO: '이 달에는 정확한 날짜로 확인된 일정이 없습니다.', EN: 'No exact dates have been verified for this month.', JP: 'この月に正確な日付を確認できた予定はありません。' },
  checked: { KO: 'Wakation 확인일', EN: 'Checked by Wakation', JP: 'Wakation確認日' },
  detail: { KO: '조건 보기', EN: 'View conditions', JP: '条件を見る' },
  official: { KO: '공식 공고', EN: 'Official notice', JP: '公式公告' },
  rollingTitle: { KO: '날짜 대신 공식 공고를 확인할 프로그램', EN: 'Programs that require a notice check', JP: '日付ではなく公式公告を確認するプログラム' },
  rollingDesc: {
    KO: '상시 모집·회차별 모집·예산 소진형은 임의 날짜를 만들지 않았습니다. 최근 확인일과 공식 출처를 기준으로 조건을 확인하세요.',
    EN: 'Rolling, batch-based and budget-limited programs are not assigned invented dates. Use the verification date and official source instead.',
    JP: '随時募集・回次別募集・予算消化型には推測の日付を付けていません。確認日と公式情報を基準にしてください。',
  },
  allPrograms: { KO: '모든 지원 프로그램', EN: 'All support programs', JP: 'すべての支援プログラム' },
  trustTitle: { KO: '달력 사용 전 확인', EN: 'Before using this calendar', JP: 'カレンダー利用前の確認' },
  trustDesc: {
    KO: '조기 마감·예산 소진·일정 변경이 있을 수 있습니다. Wakation은 신청·선정·지원금 지급을 처리하지 않습니다.',
    EN: 'Dates may change or close early when budgets run out. Wakation does not process applications, selection or funding.',
    JP: '早期締切、予算終了、日程変更の場合があります。Wakationは申請・選考・支給を行いません。',
  },
} satisfies Record<string, Record<Lang, string>>

const WEEKDAYS: Record<Lang, string[]> = {
  KO: ['일', '월', '화', '수', '목', '금', '토'],
  EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  JP: ['日', '月', '火', '水', '木', '金', '土'],
}

const EVENT_STYLE: Record<SupportCalendarEventKind, string> = {
  application_open: 'bg-sky-500',
  application_close: 'bg-amber-500',
  stay_start: 'bg-emerald-500',
  stay_end: 'bg-slate-500',
}

function prefixFor(lang: Lang) {
  return lang === 'JP' ? '/ja' : lang === 'EN' ? '/en' : ''
}

function localeFor(lang: Lang) {
  return lang === 'JP' ? 'ja-JP' : lang === 'EN' ? 'en-US' : 'ko-KR'
}

function isMonth(value?: string) {
  return Boolean(value && /^\d{4}-(0[1-9]|1[0-2])$/.test(value))
}

function shiftMonth(month: string, offset: number) {
  const [year, value] = month.split('-').map(Number)
  const date = new Date(Date.UTC(year, value - 1 + offset, 1))
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
}

function formatMonth(month: string, lang: Lang) {
  const [year, value] = month.split('-').map(Number)
  return new Intl.DateTimeFormat(localeFor(lang), { year: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(year, value - 1, 1)))
}

function formatDate(date: string, lang: Lang) {
  return new Intl.DateTimeFormat(localeFor(lang), { month: 'short', day: 'numeric', weekday: 'short', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}

function dateInKorea(now: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${value.year}-${value.month}-${value.day}`
}

function defaultMonth(eventDates: string[]) {
  const today = dateInKorea(new Date())
  return eventDates.find((date) => date >= today)?.slice(0, 7) ?? eventDates.at(-1)?.slice(0, 7) ?? today.slice(0, 7)
}

export function SupportCalendarView({ lang, requestedMonth }: { lang: Lang; requestedMonth?: string }) {
  const prefix = prefixFor(lang)
  const events = getSupportCalendarEvents(lang)
  const month = requestedMonth && isMonth(requestedMonth) ? requestedMonth : defaultMonth(events.map((event) => event.date))
  const [year, monthNumber] = month.split('-').map(Number)
  const firstWeekday = new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay()
  const daysInMonth = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate()
  const monthEvents = events.filter((event) => event.date.startsWith(month))
  const eventsByDay = new Map<number, typeof monthEvents>()
  for (const event of monthEvents) {
    const day = Number(event.date.slice(-2))
    eventsByDay.set(day, [...(eventsByDay.get(day) ?? []), event])
  }
  const cells: Array<number | null> = [...Array.from({ length: firstWeekday }, () => null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)]
  while (cells.length % 7) cells.push(null)

  const availableMonths = [...new Set(events.map((event) => event.date.slice(0, 7)))]
  const rolling = getSupportCatalog(lang)
    .filter((program) => !program.applicationStart && !program.applicationEnd && !program.travelStart && !program.travelEnd)
    .filter((program) => ['open', 'always_open', 'upcoming', 'needs_review'].includes(program.status))
    .slice(0, 4)

  return (
    <main className={`min-h-screen bg-[#fafaf7] ${lang === 'JP' ? '[word-break:normal]' : ''}`}>
      <section className="px-5 pb-10 pt-8 sm:px-6 md:pb-14">
        <div className="mx-auto max-w-6xl">
          <Link href={`${prefix}/programs/support`} className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#6f8188] hover:text-[#17647f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} /> {COPY.back[lang]}
          </Link>
          <div className="mt-8 grid items-end gap-7 md:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <p className="text-[0.6875rem] font-semibold tracking-[0.13em] text-[#317b98]">{COPY.eyebrow[lang]}</p>
              <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#17313b] text-balance">{COPY.title[lang]}</h1>
              <p className="mt-6 max-w-3xl text-sm leading-7 text-[#61747b] sm:text-base">{COPY.desc[lang]}</p>
            </div>
            <div className="rounded-[1.25rem] border border-[#dbe4e4] bg-white p-4 text-sm text-[#51666e] shadow-[0_12px_35px_rgba(18,62,78,.06)]">
              <span className="flex items-center gap-2 font-bold text-[#24434f]"><ShieldCheck className="h-4 w-4 text-[#317b98]" strokeWidth={ICON_STROKE} />{COPY.trustTitle[lang]}</span>
              <p className="mt-2 max-w-sm text-xs leading-6">{COPY.trustDesc[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e1e8e8] bg-white px-3 py-8 sm:px-6 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-3 px-2 sm:px-0">
            <Link aria-label={COPY.previous[lang]} href={`${prefix}/programs/support/calendar?month=${shiftMonth(month, -1)}`} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d4e0e2] text-[#31515d] hover:border-[#8fb2be] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]"><ChevronLeft className="h-5 w-5" /></Link>
            <h2 className="text-center text-xl font-bold tracking-[-0.025em] text-[#203943] sm:text-2xl">{formatMonth(month, lang)}</h2>
            <Link aria-label={COPY.next[lang]} href={`${prefix}/programs/support/calendar?month=${shiftMonth(month, 1)}`} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d4e0e2] text-[#31515d] hover:border-[#8fb2be] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]"><ChevronRight className="h-5 w-5" /></Link>
          </div>

          <div className="mt-7 overflow-hidden rounded-[1.15rem] border border-[#dfe7e7] bg-[#dfe7e7]">
            <div className="grid grid-cols-7 gap-px bg-[#dfe7e7]">
              {WEEKDAYS[lang].map((day, index) => <div key={day} className={`bg-[#f2f6f5] py-2.5 text-center text-[0.6875rem] font-bold ${index === 0 ? 'text-[#b55b4b]' : 'text-[#667980]'}`}>{day}</div>)}
              {cells.map((day, index) => {
                const dayEvents = day ? eventsByDay.get(day) ?? [] : []
                return (
                  <div key={`${index}-${day ?? 'empty'}`} className={`min-h-[4.75rem] min-w-0 bg-white p-1.5 sm:min-h-28 sm:p-2.5 ${day ? '' : 'bg-[#f7f8f6]'}`}>
                    {day && <>
                      <span className="text-xs font-semibold text-[#50656d]">{day}</span>
                      <div className="mt-2 flex flex-wrap gap-1 sm:grid">
                        {dayEvents.map((event) => (
                          <div key={event.id} title={`${event.label} · ${event.programName}`} className="min-w-0 sm:flex sm:items-center sm:gap-1.5 sm:rounded-md sm:bg-[#f3f7f6] sm:px-1.5 sm:py-1">
                            <span className={`block h-2 w-2 shrink-0 rounded-full ${EVENT_STYLE[event.kind]}`} />
                            <span className="hidden min-w-0 truncate text-[0.625rem] font-semibold text-[#3d5963] sm:block">{event.programName}</span>
                          </div>
                        ))}
                      </div>
                    </>}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold text-[#687b82]">{COPY.verifiedMonths[lang]}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {availableMonths.map((value) => <Link key={value} aria-current={value === month ? 'page' : undefined} href={`${prefix}/programs/support/calendar?month=${value}`} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-xs font-bold ${value === month ? 'border-[#153a49] bg-[#153a49] text-white' : 'border-[#d5e0e2] bg-white text-[#4e6670] hover:border-[#91b3be]'}`}>{formatMonth(value, lang)}</Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-11 sm:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-[#317b98]" strokeWidth={ICON_STROKE} /><h2 className="text-xl font-bold text-[#203943] sm:text-2xl">{COPY.schedule[lang]}</h2></div>
          {monthEvents.length ? (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {monthEvents.map((event) => (
                <article key={event.id} className="flex min-w-0 flex-col rounded-[1.15rem] border border-[#dce5e6] bg-white p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`h-2.5 w-2.5 rounded-full ${EVENT_STYLE[event.kind]}`} />
                    <span className="font-bold text-[#31515d]">{event.label}</span>
                    <span className="text-[#879499]">{formatDate(event.date, lang)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-7 text-[#18313b]">{event.programName}</h3>
                  <p className="mt-1 text-sm text-[#6b7d84]">{event.region} · {COPY.checked[lang]} {event.verifiedAt}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                    <Link href={`${prefix}/programs/support/${event.programSlug}`} className="inline-flex min-h-11 items-center gap-1 rounded-full bg-[#153a49] px-4 text-xs font-bold text-white">{COPY.detail[lang]} <ArrowRight className="h-3.5 w-3.5" /></Link>
                    <a href={event.officialSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 rounded-full border border-[#d5e0e2] px-4 text-xs font-bold text-[#31515d]">{COPY.official[lang]} <ExternalLink className="h-3.5 w-3.5" /></a>
                  </div>
                </article>
              ))}
            </div>
          ) : <p className="mt-6 rounded-[1.15rem] border border-dashed border-[#cbdadd] bg-white px-5 py-10 text-sm text-[#6a7d84]">{COPY.empty[lang]}</p>}
        </div>
      </section>

      <section className="border-t border-[#e1e8e8] bg-[#f2f5f2] px-5 py-11 sm:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-[#203943] sm:text-2xl">{COPY.rollingTitle[lang]}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#63757d]">{COPY.rollingDesc[lang]}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {rolling.map((program) => (
              <Link key={program.id} href={`${prefix}/programs/support/${program.slug}`} className="group min-w-0 rounded-[1rem] border border-[#dce5e6] bg-white p-4 hover:border-[#94b6c1]">
                <span className="text-[0.6875rem] font-bold text-[#317b98]">{SUPPORT_LABELS.status[program.status][lang]}</span>
                <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-[#233e48]">{program.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#17647f]">{COPY.detail[lang]} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
          <Link href={`${prefix}/programs/support`} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#cbdadd] bg-white px-5 text-sm font-bold text-[#17647f]">{COPY.allPrograms[lang]} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  )
}
