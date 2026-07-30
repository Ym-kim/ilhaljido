'use client'

import { Bookmark, CalendarPlus, Check } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'
import { useSavedSupportPrograms } from '@/hooks/useSavedSupportPrograms'
import { ShareButton } from '@/components/share/ShareButton'
import type { Lang } from '@/lib/i18n/types'

const COPY = {
  save: { KO: '저장하기', EN: 'Save', JP: '保存' },
  saved: { KO: '저장됨', EN: 'Saved', JP: '保存済み' },
  calendar: { KO: '마감일 캘린더에 추가', EN: 'Add deadline to calendar', JP: '締切をカレンダーに追加' },
  share: { KO: '공유하기', EN: 'Share', JP: '共有' },
  calendarDescription: {
    KO: '공식 공고에서 마감 시간과 신청 조건을 다시 확인하세요. Wakation은 신청을 대행하지 않습니다.',
    EN: 'Confirm the deadline time and eligibility in the official notice. Wakation does not submit applications on your behalf.',
    JP: '締切時刻と申請条件は公式案内で再確認してください。Wakationは申請を代行しません。',
  },
} satisfies Record<string, Record<Lang, string>>

function escapeIcs(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function nextDate(date: string) {
  const value = new Date(`${date}T12:00:00+09:00`)
  value.setDate(value.getDate() + 1)
  return value.toISOString().slice(0, 10).replaceAll('-', '')
}

export function SupportProgramActions({ id, title, region, status, lang, applicationEnd }: { id: string; title: string; region: string; status: string; lang: Lang; applicationEnd?: string }) {
  const { has, toggle } = useSavedSupportPrograms()
  const saved = has(id)

  function onSave() {
    const added = toggle(id)
    trackEvent('support_program_save', { locale: lang.toLowerCase(), program_slug: id, region, status, action: added ? 'save' : 'remove' })
  }

  function addCalendar() {
    if (!applicationEnd) return
    const start = applicationEnd.replaceAll('-', '')
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wakation//Support deadline//KO',
      'BEGIN:VEVENT',
      `UID:${id}-${applicationEnd}@wakation.kr`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${nextDate(applicationEnd)}`,
      `SUMMARY:${escapeIcs(title)}`,
      `DESCRIPTION:${escapeIcs(COPY.calendarDescription[lang])}`,
      `URL:https://www.wakation.kr/programs/support/${id}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `wakation-${id}-deadline.ics`
    link.click()
    URL.revokeObjectURL(url)
    trackEvent('support_alert_start', { locale: lang.toLowerCase(), program_slug: id, source: 'calendar' })
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      <button type="button" onClick={onSave} aria-pressed={saved} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98] ${saved ? 'border-[#317b98] bg-[#eaf3f5] text-[#145873]' : 'border-[#cddbdd] bg-white text-[#405a64] hover:border-[#8eafb9]'}`}>
        {saved ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <Bookmark className="h-4 w-4" strokeWidth={ICON_STROKE} />}
        {saved ? COPY.saved[lang] : COPY.save[lang]}
      </button>
      <ShareButton title={title} text={`${region} · ${title}`} tone="light" contentType="support" slug={id} label={COPY.share[lang]} onShared={(method) => trackEvent('support_program_share', { locale: lang.toLowerCase(), program_slug: id, region, status, method })} />
      {applicationEnd && (
        <button type="button" onClick={addCalendar} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#cddbdd] bg-white px-5 text-sm font-bold text-[#405a64] transition hover:border-[#8eafb9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
          <CalendarPlus className="h-4 w-4" strokeWidth={ICON_STROKE} /> {COPY.calendar[lang]}
        </button>
      )}
    </div>
  )
}
