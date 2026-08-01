'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, CalendarDays, Check, ChevronRight } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'
import { SUPPORT_LABELS, type SupportCatalogItem, type SupportDiscoveryStatus } from '@/lib/support/catalog'
import { useSavedSupportPrograms } from '@/hooks/useSavedSupportPrograms'
import type { Lang } from '@/lib/i18n/types'

const STATUS_STYLE: Record<SupportDiscoveryStatus, string> = {
  open: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  closing_soon: 'border-amber-300 bg-amber-50 text-amber-900',
  always_open: 'border-sky-200 bg-sky-50 text-sky-800',
  upcoming: 'border-violet-200 bg-violet-50 text-violet-800',
  closed: 'border-stone-200 bg-stone-100 text-stone-600',
  ended: 'border-stone-200 bg-stone-100 text-stone-500',
  needs_review: 'border-slate-200 bg-slate-50 text-slate-700',
}

const COPY = {
  save: { KO: '지원 프로그램 저장', EN: 'Save support program', JP: '支援プログラムを保存' },
  remove: { KO: '저장한 지원 프로그램에서 삭제', EN: 'Remove saved program', JP: '保存した支援プログラムから削除' },
  deadline: { KO: '접수 마감', EN: 'Application deadline', JP: '受付締切' },
  open: { KO: '조건 확인', EN: 'Check details', JP: '条件を確認' },
  source: { KO: '공식 공고 기준', EN: 'Based on official notice', JP: '公式公告を基準' },
  editorialImage: { KO: '지역 편집 이미지', EN: 'Regional editorial image', JP: '地域編集イメージ' },
} satisfies Record<string, Record<Lang, string>>

function localeCode(lang: Lang) {
  return lang === 'KO' ? 'ko-KR' : lang === 'JP' ? 'ja-JP' : 'en-US'
}

function localePrefix(lang: Lang) {
  return lang === 'JP' ? '/ja' : lang === 'EN' ? '/en' : ''
}

export function SupportProgramCard({ program, lang, imagePriority = false }: { program: SupportCatalogItem; lang: Lang; imagePriority?: boolean }) {
  const { has, toggle } = useSavedSupportPrograms()
  const saved = has(program.id)
  const href = `${localePrefix(lang)}/programs/support/${program.slug}`
  const deadline = program.applicationEnd
    ? new Intl.DateTimeFormat(localeCode(lang), { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(`${program.applicationEnd}T12:00:00+09:00`))
    : program.deadline

  function onSave() {
    const added = toggle(program.id)
    trackEvent('support_program_save', {
      locale: lang.toLowerCase(),
      program_slug: program.slug,
      region: program.regionGroup,
      status: program.status,
      action: added ? 'save' : 'remove',
    })
  }

  return (
    <article data-support-card className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-[#dce5e7] bg-white shadow-[0_10px_35px_rgba(18,62,78,.06)] transition hover:-translate-y-0.5 hover:border-[#9fc2ce] hover:shadow-[0_16px_42px_rgba(18,62,78,.11)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8eef0]">
        <Link href={href} onClick={() => trackEvent('support_program_open', { locale: lang.toLowerCase(), program_slug: program.slug, region: program.regionGroup, status: program.status })} className="relative block h-full focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#317b98]">
          <Image src={program.photo} alt={program.photoAlt ?? `${program.region} — ${program.name}`} fill loading={imagePriority ? 'eager' : 'lazy'} fetchPriority={imagePriority ? 'high' : 'auto'} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden />
          <span className="absolute bottom-3 left-4 text-sm font-bold text-white drop-shadow">{program.region}</span>
          {program.illustrative && <span className="absolute bottom-3 right-3 rounded-full border border-white/25 bg-black/45 px-2 py-1 text-[0.625rem] font-bold text-white/90 backdrop-blur-sm">{COPY.editorialImage[lang]}</span>}
        </Link>
        <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[0.6875rem] font-bold ${STATUS_STYLE[program.status]}`}>
          {SUPPORT_LABELS.status[program.status][lang]}
        </span>
        <button type="button" onClick={onSave} aria-label={saved ? COPY.remove[lang] : COPY.save[lang]} aria-pressed={saved} className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/55 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          {saved ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <Bookmark className="h-4 w-4" strokeWidth={ICON_STROKE} />}
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[#eef5f5] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#49636c]">{SUPPORT_LABELS.category[program.category][lang]}</span>
          {program.supportTypes.slice(0, 2).map((type) => (
            <span key={type} className="rounded-full bg-[#f7f1e8] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#735b3b]">{SUPPORT_LABELS.supportType[type][lang]}</span>
          ))}
        </div>

        <Link href={href} onClick={() => trackEvent('support_program_open', { locale: lang.toLowerCase(), program_slug: program.slug, region: program.regionGroup, status: program.status })} className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
          <h2 className="line-clamp-2 text-[1.05rem] font-bold leading-[1.45] text-[#14262f]">{program.name}</h2>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#61727a]">{program.benefit}</p>

        <div className="mt-5 grid gap-2 border-t border-[#edf1f2] pt-4 text-xs text-[#596b73]">
          <div className="flex min-w-0 items-start gap-2">
            <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#317b98]" strokeWidth={ICON_STROKE} />
            <span className="min-w-0 flex-1 leading-5"><strong className="font-semibold text-[#2d424c]">{program.applicationEnd ? `${COPY.deadline[lang]} · ` : ''}</strong>{deadline}</span>
            {program.applicationEnd && program.status === 'closing_soon' && program.daysUntil !== undefined && (
              <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-900">D-{program.daysUntil}</span>
            )}
          </div>
          {program.maxBenefit && <span className="text-sm font-bold text-[#17647f]">{program.maxBenefit}</span>}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-[0.6875rem] text-[#89969b]">{COPY.source[lang]} · {program.verifiedAt}</span>
          <Link href={href} onClick={() => trackEvent('support_program_open', { locale: lang.toLowerCase(), program_slug: program.slug, region: program.regionGroup, status: program.status })} className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full px-3 text-xs font-bold text-[#17647f] hover:bg-[#edf6f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
            {COPY.open[lang]} <ChevronRight className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </div>
    </article>
  )
}
