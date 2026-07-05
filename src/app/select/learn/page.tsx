'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { LEARN_CATEGORIES } from '@/lib/affiliate/destinations'

export default function LearnSelectPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-6 pt-8 pb-2">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/select"
            className="inline-flex items-center gap-1.5 text-[#94a3b8] text-xs font-medium hover:text-brand-mid transition-colors"
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={ICON_STROKE} />
            Wakation Select
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 pt-6 pb-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-600 text-[0.65rem] font-black tracking-[0.2em] uppercase mb-3">
            WAKATION SELECT · 강의·학습
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            🎓 워케이션 중 성장하는 강의
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-xl">
            이동 중, 카페에서, 숙소에서. 워케이션의 여유 시간을 인프런 온라인 강의로 채우세요.
          </p>
          <p className="text-amber-600/80 text-xs mt-3 font-medium">
            ※ 현재 파트너 강의 링크 준비 중. 카테고리 페이지로 이동 후 탐색 가능합니다.
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#94a3b8] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
            강의 카테고리
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARN_CATEGORIES.map((cat) => {
              const isPending = cat.status === 'approved_needs_course_links'
              return (
                <a
                  key={cat.id}
                  href={cat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col bg-white border border-[#e0f2fe] rounded-2xl p-5 hover:border-[#7dd3fc] transition-all duration-200 hover:-translate-y-0.5"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl leading-none">{cat.emoji}</span>
                    <div className="flex items-center gap-1.5">
                      {isPending && (
                        <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600/80 border border-amber-500/15">
                          <Clock className="w-2.5 h-2.5" />
                          링크 준비중
                        </span>
                      )}
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-[#cbd5e1] group-hover:text-[#64748b] transition-colors"
                        strokeWidth={ICON_STROKE}
                      />
                    </div>
                  </div>

                  <p className="text-[#111827] font-black text-base leading-snug mb-2">{cat.title}</p>
                  <p className="text-[#64748b] text-xs leading-relaxed mb-4 flex-1">{cat.desc}</p>

                  {/* Tag pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.6rem] font-medium px-2 py-0.5 rounded-full bg-[#f0f9ff] text-[#0369a1] border border-[#e0f2fe]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Inflearn intro */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="bg-white border border-[#e0f2fe] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📚</span>
              <div>
                <p className="text-[#111827] font-black mb-1">인프런이란?</p>
                <p className="text-[#64748b] text-sm leading-relaxed">
                  국내 최대 개발·IT·창업 온라인 강의 플랫폼. 40만 개 이상의 강의. 한국어 자막·커뮤니티 완비.
                  구독형 또는 단건 구매로 수강 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-8 space-y-1">
          <p className="text-[#a8a29e] text-[0.65rem] leading-relaxed max-w-2xl">
            * 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다.
            외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.
          </p>
          <p className="text-[#c0bcb6] text-[0.65rem] leading-relaxed max-w-2xl">
            Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.
          </p>
        </div>
      </section>
    </div>
  )
}
