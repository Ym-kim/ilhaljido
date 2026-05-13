import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice, formatDateRange, getRemainingSlots, CATEGORY_LABELS, STATUS_LABELS } from '@/lib/utils'
import type { Program } from '@/types/database'

interface ProgramCardProps {
  program: Program
}

export function ProgramCard({ program }: ProgramCardProps) {
  const remaining = getRemainingSlots(program.max_participants, program.current_participants)

  return (
    <Link href={`/programs/${program.id}`} className="no-underline">
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer">
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden bg-brand-pale">
        {program.image_url && (
          <Image
            src={program.image_url}
            alt={program.location}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 px-4 pb-3 flex items-end justify-between">
          <span className="flex items-center gap-1 text-white/90 text-xs font-semibold">
            <MapPin size={12} />
            {program.location}
          </span>
          <Badge variant={program.status as 'open' | 'soon' | 'full' | 'closed'}>
            {STATUS_LABELS[program.status]}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs font-bold text-brand-mid uppercase tracking-wide mb-1.5">
          {CATEGORY_LABELS[program.category]} · {program.duration_nights}박 {program.duration_nights + 1}일
        </p>
        <h3 className="text-base font-extrabold text-dark leading-snug mb-3">
          {program.title}
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
          <span className="flex items-center gap-1 text-xs text-muted">
            <Calendar size={12} />
            {formatDateRange(program.date_start, program.date_end)}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted">
            <Users size={12} />
            최대 {program.max_participants}명
          </span>
        </div>

        <p className="text-sm text-muted leading-relaxed flex-1 mb-4 line-clamp-3">
          {program.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {program.tags.slice(0, 4).map(tag => (
            <Badge key={tag} variant="category">{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-lg font-black text-dark">{formatPrice(program.price)}<span className="text-xs font-normal text-muted"> / 1인</span></p>
            {program.status !== 'full' && program.status !== 'closed' && (
              <p className="text-xs text-muted mt-0.5">
                {program.status === 'open'
                  ? <span>잔여석 <strong className="text-brand">{remaining}</strong>명</span>
                  : '사전예약 접수중'}
              </p>
            )}
          </div>
          <Button asChild size="sm">
            <Link href={`/apply?program=${program.id}`}>
              {program.status === 'open' ? '신청하기' : '사전예약'}
            </Link>
          </Button>
        </div>
      </div>
    </article>
    </Link>
  )
}
