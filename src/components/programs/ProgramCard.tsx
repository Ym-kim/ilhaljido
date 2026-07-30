'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Users, ArrowUpRight } from 'lucide-react'
import { formatPrice, formatDateRange, getRemainingSlots } from '@/lib/utils'
import { useLang } from '@/context/LanguageContext'
import { getCategoryLabels, getStatusLabels } from '@/lib/i18n'
import { programPhoto, daysUntilStart } from '@/lib/programs'
import type { Program } from '@/types/database'

const STATUS_STYLES: Record<Program['status'], string> = {
  open:   'bg-emerald-500 text-white',
  soon:   'bg-amber-500 text-white',
  full:   'bg-neutral-400 text-white',
  closed: 'bg-neutral-200 text-neutral-500',
}

const CATEGORY_ACCENT: Record<Program['category'], string> = {
  growth:  'from-emerald-900 to-emerald-600',
  healing: 'from-amber-900 to-amber-600',
  network: 'from-violet-900 to-violet-600',
  global:  'from-sky-900 to-sky-600',
}

interface ProgramCardProps { program: Program }

export function ProgramCard({ program }: ProgramCardProps) {
  const { lang, tr } = useLang()
  const categoryLabels = getCategoryLabels(lang)
  const statusLabels = getStatusLabels(lang)
  const remaining = getRemainingSlots(program.max_participants, program.current_participants)
  const photo = programPhoto(program)
  const dday = program.status === 'closed' ? null : daysUntilStart(program)
  const durationText = tr('prog_nights_days')
    .replace('{n}', String(program.duration_nights))
    .replace('{d}', String(program.duration_nights + 1))

  return (
    <Link href={`/programs/${program.id}`} className="group block">
      <article data-ui-card="editorial" className="wak-card-editorial relative flex h-full flex-col overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          {photo ? (
            <Image
              src={photo} alt={program.title}
              fill className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_ACCENT[program.category] ?? 'from-sky-900 to-sky-600'}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-white/85 bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {categoryLabels[program.category] ?? program.category}
            </span>
            <span className="flex items-center gap-1.5">
              {dday !== null && dday <= 30 && (
                <span className="badge-hot text-[11px] font-black px-2.5 py-1 rounded-full">D-{dday}</span>
              )}
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[program.status]}`}>
                {statusLabels[program.status] ?? program.status}
              </span>
            </span>
          </div>

          {/* Bottom location */}
          <div className="absolute bottom-3 left-3.5 flex items-center gap-1 text-white/90 text-xs font-medium">
            <MapPin size={11} />
            {program.location}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <div className="text-[11px] font-bold text-brand-mid tracking-wider uppercase mb-2">
            {durationText}
          </div>

          <h3 className="wak-card-title mb-3 min-h-[2.85rem] line-clamp-2 text-[#111827]">
            {program.title}
          </h3>

          <div className="flex flex-col gap-1.5 mb-4">
            <span className="flex items-center gap-1.5 text-[12px] text-[#64748b]">
              <Calendar size={11} className="text-brand-mid flex-shrink-0" />
              {formatDateRange(program.date_start, program.date_end)}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-[#64748b]">
              <Users size={11} className="text-brand-mid flex-shrink-0" />
              {tr('prog_card_max').replace('{n}', String(program.max_participants))}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-auto">
            {program.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[11px] font-semibold text-[#0369a1] bg-[#f0f9ff] border border-[#e0f2fe] px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
            <div>
              <div className="text-[18px] font-black text-[#111827] tracking-tight">
                {formatPrice(program.price)}
              </div>
              <div className="wak-caption mt-0.5 text-[#71818d]">
                {program.status === 'open'
                  ? tr('prog_card_left').replace('{n}', String(remaining))
                  : program.status === 'soon' ? tr('prog_card_preorder')
                  : program.status === 'closed' ? tr('prog_card_closed') : ''}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
              group-hover:scale-110 group-hover:bg-brand-mid group-hover:text-white
              bg-[#f0f9ff] text-[#0369a1]">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
