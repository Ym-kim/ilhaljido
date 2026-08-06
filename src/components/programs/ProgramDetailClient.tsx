'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  ArrowLeft,
  Clock,
  Wifi,
  Coffee,
  Home,
  BookOpen,
} from 'lucide-react'
import { formatPrice, formatDateRange, getRemainingSlots } from '@/lib/utils'
import { useLang } from '@/context/LanguageContext'
import {
  getCategoryLabels,
  getStatusLabels,
  getSampleSchedule,
  translatePriceInclude,
} from '@/lib/i18n'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { PROGRAMS_LEARN_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import type { Program } from '@/types/database'

const INCLUDES_ICONS: Record<string, React.ReactNode> = {
  '숙박비': <Home size={14} />,
  '공유오피스 이용료': <Wifi size={14} />,
  '프로그램 참가비': <BookOpen size={14} />,
  '조식': <Coffee size={14} />,
  '석식': <Coffee size={14} />,
  '항공권': <Calendar size={14} />,
  '업무 공간': <Wifi size={14} />,
  '시장조사 투어': <MapPin size={14} />,
  '요가 클래스': <CheckCircle2 size={14} />,
  '네트워킹 프로그램': <Users size={14} />,
  '조식·석식': <Coffee size={14} />,
}

export function ProgramDetailClient({ program }: { program: Program }) {
  const { lang, tr } = useLang()
  const categoryLabels = getCategoryLabels(lang)
  const statusLabels = getStatusLabels(lang)
  const schedule = getSampleSchedule(lang)
  const remaining = getRemainingSlots(program.max_participants, program.current_participants)
  const durationText = tr('prog_nights_days')
    .replace('{n}', String(program.duration_nights))
    .replace('{d}', String(program.duration_nights + 1))

  return (
    <main className="pt-16 min-h-screen bg-white">
      <div className="relative h-72 md:h-96">
        {program.image_url && (
          <Image src={program.image_url} alt={program.title} fill className="object-cover" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 px-6 lg:px-[6%] pb-7">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-white/70 text-xs font-medium mb-3 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} /> {tr('prog_back')}
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="category" className="bg-white/20 text-white border-0">
              {categoryLabels[program.category] ?? program.category}
            </Badge>
            <Badge variant={program.status as 'open' | 'soon' | 'full'}>
              {statusLabels[program.status] ?? program.status}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">{program.title}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-[6%] py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: <MapPin size={16} />, label: tr('prog_location'), val: program.location },
                { icon: <Calendar size={16} />, label: tr('prog_dates'), val: formatDateRange(program.date_start, program.date_end) },
                { icon: <Clock size={16} />, label: tr('prog_duration'), val: durationText },
                {
                  icon: <Users size={16} />,
                  label: tr('prog_capacity'),
                  val: `${tr('prog_max')} ${program.max_participants}`,
                },
              ].map(({ icon, label, val }) => (
                <div key={label} className="bg-cream rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-1.5 text-brand mb-1">
                    {icon}
                    <span className="text-xs font-bold text-muted">{label}</span>
                  </div>
                  <div className="text-sm font-bold text-dark">{val}</div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-lg font-black text-dark mb-3">{tr('prog_intro')}</h2>
              <p className="text-muted leading-relaxed">{program.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-black text-dark mb-3">{tr('prog_features')}</h2>
              <div className="flex flex-wrap gap-2">
                {program.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 bg-brand-pale border border-brand/20 text-brand text-sm font-medium px-3 py-2 rounded-xl"
                  >
                    <CheckCircle2 size={14} /> {tag}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-black text-dark mb-4">{tr('prog_schedule')}</h2>
              <div className="space-y-3">
                {schedule.map((day) => (
                  <div key={day.day} className="border border-border rounded-xl overflow-hidden">
                    <div className="bg-brand px-4 py-2.5 flex items-center gap-3">
                      <span className="text-xs font-black text-emerald-300 tracking-widest">{day.day}</span>
                      <span className="text-sm font-bold text-white">{day.title}</span>
                    </div>
                    <div className="px-4 py-3 space-y-1.5">
                      {day.items.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-mid mt-1.5 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-3">{tr('prog_schedule_note')}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-border rounded-2xl p-6 sticky top-24 shadow-sm">
              <div className="text-2xl font-black text-dark mb-1">
                {formatPrice(program.price)}
                <span className="text-sm font-normal text-muted">{tr('prog_price_per')}</span>
              </div>
              {program.status === 'open' && (
                <div className="text-sm text-muted mb-4">
                  {tr('prog_seats')}{' '}
                  <span className="text-brand font-bold">{remaining}</span>
                  {tr('prog_seats_of')} {program.max_participants}
                  <div className="mt-1.5 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-mid rounded-full transition-all"
                      style={{ width: `${(program.current_participants / program.max_participants) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mb-5">
                <div className="text-xs font-bold text-dark mb-2">{tr('prog_includes')}</div>
                <div className="space-y-1.5">
                  {program.price_includes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted">
                      <span className="text-brand">{INCLUDES_ICONS[item] ?? <CheckCircle2 size={14} />}</span>
                      {translatePriceInclude(lang, item)}
                    </div>
                  ))}
                </div>
              </div>

              {/* 종료(취소·만료) 회차는 신청·사전예약 CTA를 렌더하지 않는다 —
                  기존 구조는 status와 무관하게 버튼이 나가서, 진행하지 않을 회차에도
                  '사전예약하기'가 노출됐다 (2026-08-06 운영자 취소 지시 처리 중 적발) */}
              {program.status === 'closed' ? (
                <div className="rounded-xl bg-gray-100 px-4 py-3 text-center text-sm font-bold text-gray-600">
                  {tr('prog_closed_note')}
                </div>
              ) : (
                <>
                  <Button asChild size="lg" className="w-full mb-3">
                    <Link href={`/apply?program=${program.id}`}>
                      {program.status === 'open' ? tr('prog_apply_now') : tr('prog_preorder')}
                    </Link>
                  </Button>

                  <div className="text-xs text-muted text-center leading-relaxed whitespace-pre-line">
                    {tr('prog_apply_note')}
                  </div>
                </>
              )}

              <div className="mt-5 pt-4 border-t border-border">
                <div className="text-xs font-bold text-dark mb-2">{tr('prog_contact')}</div>
                <a href="mailto:wakation.sf@gmail.com" className="text-sm text-brand hover:underline">
                  wakation.sf@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 떠나기 전, 준비하기 — 크로스셀 */}
      <AffiliateSection
        tone="light"
        title={tr('prep_title')}
        subtitle={tr('prep_sub')}
        items={PROGRAMS_LEARN_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
        cols={2}
      />
    </main>
  )
}
