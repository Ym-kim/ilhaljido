'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/context/LanguageContext'
import { ProgramCard } from '@/components/programs/ProgramCard'
import { withEffectiveStatus, isExpired, HELD_PROGRAM_IDS } from '@/lib/programs'
import type { Program } from '@/types/database'

// ─────────────────────────────────────────────────────────────────────────────
// 모집 캘린더 — Supabase programs 테이블의 확정 일정 회차를 노출
// 지난 회차(date_end 경과)는 자동 제외. 데이터가 없으면 섹션 자체를 숨김.
// ─────────────────────────────────────────────────────────────────────────────

export function UpcomingCohorts() {
  const { tr } = useLang()
  const [programs, setPrograms] = useState<Program[] | null>(null)

  useEffect(() => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(supabase as any)
      .from('programs')
      .select('*')
      .in('status', ['open', 'soon', 'full'])
      .order('date_start', { ascending: true })
      .then(({ data }: { data: Program[] | null }) => {
        const upcoming = (data ?? [])
          .filter((p) => !isExpired(p) && !HELD_PROGRAM_IDS.has(p.id))
          .map(withEffectiveStatus)
          .slice(0, 6)
        setPrograms(upcoming)
      })
  }, [])

  if (!programs || programs.length === 0) return null

  return (
    <section className="py-16 px-6 bg-white border-b border-[#e0f2fe]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-3">
            {tr('prog_cohort_eyebrow')}
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-2">{tr('prog_cohort_title')}</h2>
          <p className="text-[#64748b] text-sm">{tr('prog_cohort_sub')}</p>
        </div>
        <div data-ui-grid="editorial" className="wak-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
