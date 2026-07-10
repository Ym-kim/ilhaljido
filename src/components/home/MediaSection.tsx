'use client'

import Link from 'next/link'
import { MonitorPlay, ArrowUpRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { NotifySignup } from '@/components/home/NotifySignup'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// Wakation Media — 콘텐츠 축. 실콘텐츠 준비 전이므로 '준비 중' 표기.
// 도시 가이드만 실존(/guide) → 라이브 링크
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'WAKATION MEDIA', EN: 'WAKATION MEDIA', JP: 'WAKATION MEDIA' },
  title: { KO: '기록이 콘텐츠가 되는 Wakation Media', EN: 'Wakation Media — the field notes channel', JP: '記録がコンテンツになるWakation Media' },
  sub: {
    KO: '실제 워케이션 운영기, 도시 리서치, 일본 진출 준비, AI 업무 자동화, 참가자 성장 사례를 콘텐츠로 기록합니다.',
    EN: 'We document real workation operations, city research, Japan market prep, AI automation and participant growth stories.',
    JP: '実際のワーケーション運営記、都市リサーチ、日本進出準備、AI業務自動化、参加者の成長事例をコンテンツとして記録します。',
  },
  prep: { KO: '콘텐츠 준비 중', EN: 'In prep', JP: '準備中' },
  live: { KO: '보기', EN: 'View', JP: '見る' },
  youtube: { KO: '유튜브 준비 중', EN: 'YouTube in prep', JP: 'YouTube準備中' },
  notify_label: { KO: '첫 콘텐츠가 올라오면 알려드릴게요', EN: "We'll let you know when the first content drops", JP: '最初のコンテンツ公開時にお知らせします' },
  notify_cta: { KO: '콘텐츠 알림받기', EN: 'Get content updates', JP: 'コンテンツ通知を受け取る' },
}

const CONTENTS: { name: L; href?: string }[] = [
  { name: { KO: '양양 1기 운영기', EN: 'Yangyang batch 1 field notes', JP: '襄陽1期運営記' } },
  { name: { KO: '워케이션 도시 가이드', EN: 'Workation city guides', JP: 'ワーケーション都市ガイド' }, href: '/guide' },
  { name: { KO: '일본 진출 준비', EN: 'Japan market prep', JP: '日本進出準備' } },
  { name: { KO: 'AI 업무 자동화', EN: 'AI work automation', JP: 'AI業務自動化' } },
  { name: { KO: '참가자 후기', EN: 'Participant stories', JP: '参加者の声' } },
]

export function MediaSection() {
  const { lang } = useLang()

  return (
    <section id="wakation-media" className="dark-surface bg-[#0f0f0f] py-16 md:py-20 px-4 sm:px-6 border-t border-white/8 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-sky-400 text-xs font-black tracking-widest uppercase mb-3">{COPY.eyebrow[lang]}</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{COPY.title[lang]}</h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-2xl">{COPY.sub[lang]}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {CONTENTS.map((c) =>
            c.href ? (
              <Link
                key={c.name.KO}
                href={c.href}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-sky-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                    {COPY.live[lang]}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-sky-400 transition-colors" strokeWidth={ICON_STROKE} />
                </div>
                <p className="text-white font-bold text-sm leading-snug">{c.name[lang]}</p>
              </Link>
            ) : (
              <div key={c.name.KO} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                <span className="inline-block text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-white/8 text-white/45 border border-white/12 mb-2">
                  {COPY.prep[lang]}
                </span>
                <p className="text-white/60 font-bold text-sm leading-snug">{c.name[lang]}</p>
              </div>
            )
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-6">
          <span className="inline-flex items-center gap-2 self-start bg-white/5 border border-white/12 text-white/45 text-xs font-bold px-4 py-2.5 rounded-full">
            <MonitorPlay className="w-4 h-4" strokeWidth={ICON_STROKE} /> {COPY.youtube[lang]}
          </span>
          <div className="flex-1 max-w-xl">
            <p className="text-white/45 text-xs font-semibold mb-2.5">{COPY.notify_label[lang]}</p>
            <NotifySignup
              source="Media 콘텐츠 알림"
              event="media_alert_clicked"
              ctaLabel={{ KO: COPY.notify_cta.KO, EN: COPY.notify_cta.EN, JP: COPY.notify_cta.JP }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
