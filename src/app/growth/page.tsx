'use client'

import { useLang } from '@/context/LanguageContext'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, GraduationCap, HeartHandshake, Compass } from 'lucide-react'

import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { NotifySignup } from '@/components/home/NotifySignup'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'

import { getGrowthCamps } from '@/lib/i18n'

// ── 여정 연결 (2026-08-02 발견성 개선) — 캠프 소개 후 다음 행동이 없던 막다른 페이지에
//    실존 경로 3개(강의·네트워킹·진단)와 오픈 알림 리드를 연결 ──
type L = Record<Lang, string>
const NEXT_STEPS: { icon: typeof GraduationCap; href: string; label: L; desc: L }[] = [
  {
    icon: GraduationCap, href: '/select/learn',
    label: { KO: '지금 시작하는 온라인 강의', EN: 'Start with an online course', JP: 'まずはオンライン講座から' },
    desc: { KO: '캠프 전에 미리 배우는 파트너 강의', EN: 'Partner courses to learn before camp', JP: 'キャンプ前に学べる提携講座' },
  },
  {
    icon: HeartHandshake, href: '/programs/networking',
    label: { KO: '창업가·1인 워커 네트워킹', EN: 'Founder & solo-worker networking', JP: '起業家・ソロワーカー交流' },
    desc: { KO: '같은 고민을 하는 사람들과 연결', EN: 'Meet people working on the same things', JP: '同じ課題を持つ人とつながる' },
  },
  {
    icon: Compass, href: '/tools/diagnosis',
    label: { KO: '나에게 맞는 워케이션 진단', EN: 'Workation self-check', JP: '自分に合う旅を診断' },
    // 2026-08-04 목적지 매핑 구현(diagnosis-destinations-v1)으로 카피 복원
    desc: { KO: '3분 진단으로 목적지·프로그램 찾기', EN: 'Find your destination in 3 minutes', JP: '3分診断で行き先とプログラム' },
  },
]
// 2026-08-04 정직성: 캠프 6종은 모집 전 커리큘럼 — 상태 배지 없이는 운영 중 상품처럼 읽힘 (/language '준비 중' 패턴 이식)
const CAMP_STATUS: L = { KO: '모집 준비 중', EN: 'In preparation', JP: '募集準備中' }

const NEXT_UI: Record<string, L> = {
  title: { KO: '캠프를 기다리는 동안', EN: 'While you wait for the next camp', JP: '次のキャンプを待つあいだに' },
  notify: {
    KO: '성장 캠프 회차가 열리면 가장 먼저 알려드릴게요',
    EN: "We'll tell you first when a growth camp opens",
    JP: '成長キャンプの募集開始をいち早くお知らせします',
  },
}



export default function GrowthPage() {

  const { tr, lang } = useLang()

  const camps = getGrowthCamps()



  return (

    <div className="min-h-screen bg-[#111]">

      <section className="relative h-[55vh] flex items-end overflow-hidden dark-surface">

        <Image src="/media/verified/unsplash/1522199755839-a2bacb67c546.webp" alt="" fill priority sizes="100vw" className="object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />

        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">

          <SectionEyebrow onDark>{tr('growth_badge')}</SectionEyebrow>

          <h1 className="text-5xl md:text-6xl font-black text-white">{tr('growth_title')}</h1>

          <p className="text-lead-on-dark mt-3 max-w-xl">{tr('growth_desc')}</p>

        </div>

      </section>

      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {camps.map((c) => (

            <div

              key={c.num}

              className="group bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-teal-500/40 transition-all"

            >

              <div className="flex items-center justify-between">
                <span className="text-teal-400/50 text-xs font-black tracking-widest">{c.num}</span>
                <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[0.6875rem] font-bold text-amber-300">
                  {CAMP_STATUS[lang]}
                </span>
              </div>

              <h3 className="text-white font-black text-lg mt-4 mb-3 group-hover:text-teal-400 transition-colors">

                {tr(c.titleKey)}

              </h3>

              <p className="text-white/55 text-sm leading-relaxed">{tr(c.descKey)}</p>

            </div>

          ))}

        </div>

      </section>

      {/* ── 다음 행동 — 실존 경로 연결 + 오픈 알림 리드 (2026-08-02) ── */}
      <section className="border-t border-white/8 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-black text-xl md:text-2xl mb-6">{NEXT_UI.title[lang]}</h2>
          <div className="grid gap-3 md:grid-cols-3 mb-10">
            {NEXT_STEPS.map((s) => {
              const Icon = s.icon
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-teal-500/40 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                >
                  <span className="shrink-0 inline-flex w-10 h-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                    <Icon className="w-5 h-5" strokeWidth={ICON_STROKE} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-white font-bold text-[0.9375rem] leading-snug">{s.label[lang]}</span>
                    <span className="block text-white/45 text-xs mt-0.5">{s.desc[lang]}</span>
                  </span>
                  <ArrowRight className="ml-auto w-4 h-4 text-white/25 group-hover:text-teal-400 shrink-0 transition-colors" strokeWidth={ICON_STROKE} />
                </Link>
              )
            })}
          </div>
          <div className="max-w-xl">
            <p className="text-white/60 text-sm font-semibold mb-3">{NEXT_UI.notify[lang]}</p>
            <NotifySignup source="성장 캠프 오픈 알림 (growth)" />
          </div>
        </div>
      </section>

    </div>

  )

}


