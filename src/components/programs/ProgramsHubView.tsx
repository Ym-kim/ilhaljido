'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail, BellRing, Handshake } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getProgramsList, getSelectCategories, translate } from '@/lib/i18n'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { PROGRAMS_LEARN_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { UpcomingCohorts } from '@/components/programs/UpcomingCohorts'
import type { Lang } from '@/lib/i18n/types'

// 성장형 프로그램 방향성 — 로드맵 (Hosted + Learning + Tools 결합)
const DIRECTION_NOTE: Record<Lang, string> = {
  KO: '앞으로 Wakation 프로그램은 숙소·업무공간·네트워킹에 더해 VOD 사전학습, 현장 실습, 참가자용 웹프로그램을 결합한 성장형 프로그램으로 확장됩니다.',
  EN: 'Wakation programs are expanding into growth programs that combine stays, workspaces and networking with pre-trip VOD learning, on-site practice, and participant web tools.',
  JP: '今後のWakationプログラムは、宿泊・ワークスペース・ネットワーキングに加え、事前VOD学習・現地実習・参加者用Webツールを組み合わせた成長型プログラムへ拡張されます。',
}

const STATUS_ICON = {
  recruiting: Handshake,
  reviewing: Mail,
  preparing: BellRing,
  inquiry: Mail,
} as const

const STATUS_COLOR = {
  recruiting: 'bg-sky-50 text-sky-700 border-sky-200',
  reviewing: 'bg-blue-50 text-blue-700 border-blue-200',
  preparing: 'bg-gray-50 text-gray-500 border-gray-200',
  inquiry: 'bg-amber-50 text-amber-700 border-amber-200',
} as const

// en/ja 라우트가 존재하는 경로만 로케일 접두 (그 외는 KO 단일 라우트)
const PREFIXABLE_PATHS = new Set(['/programs', '/programs/global', '/programs/domestic', '/programs/market'])

export function ProgramsHubView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''
  const tr = (key: string) => translate(lang, key)
  const programs = getProgramsList()
  const selectCategories = getSelectCategories(lang)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="relative h-[50vh] flex items-end overflow-hidden dark-surface">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1800&q=80" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
          <SectionEyebrow onDark pill>
            {tr('programs_hero_badge')}
          </SectionEyebrow>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight whitespace-pre-line">
            {tr('programs_hero_title')}
          </h1>
        </div>
      </section>

      {/* 모집 캘린더 — 확정 일정 회차 (Supabase) */}
      <UpcomingCohorts />

      {/* Wakation Hosted — 공식 프로그램 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionEyebrow>{tr('programs_grid_eyebrow')}</SectionEyebrow>
            <SectionTitle className="text-center">{tr('programs_grid_title')}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {programs.map((p) => (
              <Link
                key={p.id}
                href={PREFIXABLE_PATHS.has(p.href) ? `${prefix}${p.href}` : p.href}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image src={p.img} alt={tr(p.titleKey)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  {p.badgeKey && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {tr(p.badgeKey)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{tr(p.titleKey)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{tr(p.descKey)}</p>
                  <div className="flex items-center gap-1 text-brand-mid text-sm font-semibold mt-5 group-hover:gap-2 transition-all">
                    {tr('learn_more')} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 성장형 프로그램 방향성 */}
          <p className="mt-10 max-w-3xl mx-auto text-center text-[#64748b] text-sm leading-relaxed bg-[#f0f9ff] border border-[#dbeafe] rounded-2xl px-6 py-5">
            {DIRECTION_NOTE[lang]}
          </p>
        </div>
      </section>

      {/* Wakation Select — 12개 카테고리 수익화 기반 */}
      <section className="py-20 px-6 bg-[#f0f9ff] border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-4">WAKATION SELECT</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4 leading-tight">
              {tr('prog_sel_title_1')}<br className="hidden sm:block" /> {tr('prog_sel_title_2')}
            </h2>
            <p className="text-[#64748b] text-sm max-w-xl mx-auto leading-relaxed">
              {tr('prog_sel_desc')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectCategories.map((cat) => {
              const StatusIcon = STATUS_ICON[cat.status] ?? BellRing
              const isMailto = cat.ctaHref.startsWith('mailto:')
              return (
                <div
                  key={cat.id}
                  className="bg-white border border-[#dbeafe] rounded-2xl p-6 hover:border-[#7dd3fc] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${STATUS_COLOR[cat.status]}`}>
                      <StatusIcon className="w-3 h-3" strokeWidth={2} />
                      {cat.statusLabel}
                    </span>
                  </div>
                  <h3 className="text-[#111827] font-black mb-2">{cat.name}</h3>
                  <p className="text-[#64748b] text-xs leading-relaxed mb-5">{cat.desc}</p>
                  {isMailto ? (
                    <a
                      href={cat.ctaHref}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#f0f9ff] text-[#475569] font-bold py-2.5 rounded-xl border border-[#dbeafe] text-xs hover:bg-[#e0f2fe] hover:text-[#111827] transition-all"
                    >
                      {cat.cta} <ArrowRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={cat.ctaHref}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#f0f9ff] text-[#475569] font-bold py-2.5 rounded-xl border border-[#dbeafe] text-xs hover:bg-[#e0f2fe] hover:text-[#111827] transition-all"
                    >
                      {cat.cta} <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <p className="text-[#94a3b8] text-xs mb-3">{tr('prog_sel_partner_line')}</p>
            <a
              href="mailto:wakation.sf@gmail.com?subject=Wakation%20파트너십%20제안"
              className="inline-flex items-center gap-2 bg-white text-[#475569] font-bold px-6 py-3 rounded-full border border-[#dbeafe] text-sm hover:border-[#7dd3fc] hover:text-[#111827] transition-all"
            >
              <Mail className="w-4 h-4" />
              wakation.sf@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* 워케이션 중 성장 */}
      <AffiliateSection
        tone="light"
        title={tr('prog_learn_title')}
        subtitle={tr('prog_learn_sub')}
        items={PROGRAMS_LEARN_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
        cols={2}
      />

      {/* CTA */}
      <section className="dark-surface py-20 px-6 bg-gradient-to-b from-[#04121f] to-[#0a1e33]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle onDark className="mb-4 text-center">
            {tr('programs_cta_title')}
          </SectionTitle>
          <p className="text-caption-on-dark mb-8">{tr('programs_cta_desc')}</p>
          <Link
            href="/visa-ai"
            className="inline-flex items-center gap-2 bg-brand-mid text-white font-bold px-8 py-4 rounded-full hover:bg-sky-500 transition-all"
          >
            {tr('home_ai_cta')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
