'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, BadgeCheck, MapPin } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'
import { getSupportPrograms } from '@/lib/i18n'
import type { SupportStatus } from '@/lib/i18n/data'

// 상태칩 컬러 — monthler 벤치마킹 (모집중/상시=액션, 예정=대기, 확인=중립)
const STATUS_STYLE: Record<SupportStatus, string> = {
  open: 'bg-teal-500 text-white',
  always: 'bg-brand-mid text-white',
  upcoming: 'bg-amber-100 text-amber-700 border border-amber-200',
  check: 'bg-gray-100 text-gray-500 border border-gray-200',
}

export default function SupportProgramsPage() {
  const { lang, tr } = useLang()
  const programs = getSupportPrograms(lang)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-6 pt-8 pb-2">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-[#94a3b8] text-xs font-medium hover:text-brand-mid transition-colors"
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={ICON_STROKE} />
            {tr('nav_programs')}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 pt-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-3 flex items-center gap-2">
            <BadgeCheck className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            {tr('support_eyebrow')}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3 tracking-tight">
            {tr('support_title_pre')}<span className="text-brand-mid">{tr('support_title_accent')}</span>
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-xl">{tr('support_desc')}</p>
        </div>
      </section>

      {/* Program cards */}
      <section className="px-6 pb-12 border-t border-[#e0f2fe] bg-[#f0f9ff]/50">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white border border-[#dbeafe] rounded-2xl overflow-hidden hover:border-[#7dd3fc] hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* 지역 사진 헤더 — 상태칩·지역 오버레이 */}
                <div className="relative h-36 overflow-hidden bg-[#eff6ff]">
                  <Image src={p.photo} alt={p.region} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                  <span className={`absolute top-3 right-3 text-[0.65rem] font-bold px-2.5 py-1 rounded-full shadow-sm ${STATUS_STYLE[p.status]}`}>
                    {p.statusLabel}
                  </span>
                  <span className="absolute bottom-3 left-4 inline-flex items-center gap-1 text-white font-black text-base drop-shadow-lg">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                    {p.region}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                {/* 사업명 */}
                <p className="text-[#111827] font-black text-[0.9375rem] leading-snug mb-1.5">{p.name}</p>
                <p className="text-[#64748b] text-xs leading-relaxed mb-3 flex-1">{p.benefit}</p>

                {/* 최대지원 환산 배지 — monthler 핵심 패턴 */}
                {p.maxBenefit && (
                  <p className="text-brand-mid font-black text-lg mb-3">{p.maxBenefit}</p>
                )}

                {/* 조건 태그 */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.conditions.map((c) => (
                    <span key={c} className="text-[0.6rem] font-medium px-2 py-0.5 rounded-full bg-[#f0f9ff] text-[#0369a1] border border-[#e0f2fe]">
                      {c}
                    </span>
                  ))}
                </div>

                {/* 마감 + 링크 */}
                <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
                  <span className="text-[#94a3b8] text-[0.7rem]">{p.deadline}</span>
                  <span className="inline-flex items-center gap-1 text-brand-mid text-xs font-bold group-hover:gap-1.5 transition-all">
                    {tr('support_apply')} <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                </div>
              </a>
            ))}
          </div>

          {/* 프로그램 무료 등록 배너 — monthler 셀프서브 벤치마킹 */}
          <Link
            href="/programs/support/register"
            className="group mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0a1e33] to-[#0c4a6e] rounded-2xl p-6 hover:shadow-lg transition-all"
          >
            <div>
              <p className="text-white font-black text-base mb-1">{tr('preg_banner_t')}</p>
              <p className="text-white/60 text-sm">{tr('preg_banner_d')}</p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1.5 bg-white text-[#0a1e33] font-bold text-sm px-5 py-2.5 rounded-full group-hover:bg-sky-50 transition-colors">
              {tr('preg_banner_cta')}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* 정보 갱신 고지 */}
          <p className="text-[#a8a29e] text-[0.65rem] leading-relaxed max-w-2xl mt-6">
            {tr('support_notice')}
          </p>
        </div>
      </section>
    </div>
  )
}
