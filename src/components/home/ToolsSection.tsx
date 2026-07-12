'use client'

import Link from 'next/link'
import { ArrowRight, ClipboardCheck, ListChecks, Map, FileBarChart, Sparkles } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { NotifySignup } from '@/components/home/NotifySignup'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// Wakation Tools — 참가자용 웹프로그램
// 첫 도구 '참가자 진단 & 실행 리포트' Beta 오픈 (/tools/diagnosis, 룰베이스)
// 나머지 도구는 'Beta 준비 중' 유지 + 알림 신청
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'WAKATION TOOLS', EN: 'WAKATION TOOLS', JP: 'WAKATION TOOLS' },
  badge: { KO: 'Beta 1차 오픈', EN: 'Beta now open', JP: 'Beta第1弾オープン' },
  title: { KO: '참가 기간 무료로 쓰는 Wakation Tools', EN: 'Wakation Tools — free while you participate', JP: '参加期間は無料で使えるWakation Tools' },
  sub: {
    KO: '참가자는 워케이션 기간 동안 진단·실행계획·결과 리포트 웹프로그램을 무료로 사용하고, 프로그램 이후에도 자신의 업무와 사업을 이어갈 수 있습니다.',
    EN: 'Participants use our diagnosis, action-plan and report tools free during the workation — and keep building on them afterwards.',
    JP: '参加者はワーケーション期間中、診断・実行計画・結果レポートのWebツールを無料で使い、プログラム後も仕事と事業を続けられます。',
  },
  live: { KO: 'Beta 오픈', EN: 'Beta open', JP: 'Betaオープン' },
  prep: { KO: '준비 중', EN: 'In prep', JP: '準備中' },
  cta: { KO: '참가자 진단 시작하기 — 무료', EN: 'Start the diagnosis — free', JP: '参加者診断を始める — 無料' },
  notify_label: { KO: '다음 도구가 열리면 가장 먼저 알려드릴게요', EN: 'Be the first to know when the next tool opens', JP: '次のツールのオープンを最初にお知らせします' },
  notify_cta: { KO: 'Tools 알림받기', EN: 'Get Tools updates', JP: 'Toolsの通知を受け取る' },
}

const FEATURES: { icon: typeof ClipboardCheck; name: L; desc: L; href?: string }[] = [
  {
    icon: ClipboardCheck,
    name: { KO: '참가자 진단', EN: 'Participant diagnosis', JP: '参加者診断' },
    desc: { KO: '참가 전 목표·업무 단계·해결 과제를 진단', EN: 'Assess goals, work stage and challenges before you go', JP: '参加前に目標・業務段階・課題を診断' },
    href: '/tools/diagnosis',
  },
  {
    icon: ListChecks,
    name: { KO: '실행계획', EN: 'Action plan', JP: '実行計画' },
    desc: { KO: '체류 기간에 맞춘 추천 일정과 실행 항목', EN: 'A recommended schedule and to-dos for your stay', JP: '滞在期間に合わせた推奨日程と実行項目' },
    href: '/tools/diagnosis',
  },
  {
    icon: Map,
    name: { KO: '현장 체크리스트', EN: 'On-site checklist', JP: '現場チェックリスト' },
    desc: { KO: '현장에서 실행 여부를 바로 체크', EN: 'Track what you actually get done on site', JP: '現場で実行状況をすぐチェック' },
    href: '/tools/diagnosis',
  },
  {
    icon: FileBarChart,
    name: { KO: '결과 리포트', EN: 'Result report', JP: '結果レポート' },
    desc: { KO: '종료 후 성과와 변화를 리포트로 정리', EN: 'A report of your outcomes after the program', JP: '終了後の成果と変化をレポート化' },
  },
  {
    icon: Sparkles,
    name: { KO: '다음 프로그램 추천', EN: 'Next program picks', JP: '次のプログラム推薦' },
    desc: { KO: '진단 결과 기반 다음 단계 추천', EN: 'Next-step recommendations from your results', JP: '診断結果に基づく次のステップ推薦' },
  },
]

export function ToolsSection() {
  const { lang } = useLang()

  return (
    <section id="wakation-tools" className="bg-[#f0f9ff] py-16 md:py-20 px-4 sm:px-6 border-y border-[#dbeafe] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase">{COPY.eyebrow[lang]}</p>
            <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-brand-mid/10 text-brand-mid border border-brand-mid/20">
              {COPY.badge[lang]}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-2">{COPY.title[lang]}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-2xl">{COPY.sub[lang]}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {FEATURES.map((f) => {
            const Icon = f.icon
            const inner = (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#f0f9ff] border border-[#dbeafe] flex items-center justify-center text-brand-mid">
                    <Icon className="w-4.5 h-4.5" strokeWidth={ICON_STROKE} />
                  </div>
                  <span
                    className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full border ${
                      f.href
                        ? 'bg-brand-mid/10 text-brand-mid border-brand-mid/20'
                        : 'bg-[#f8fafc] text-[#94a3b8] border-[#e2e8f0]'
                    }`}
                  >
                    {f.href ? COPY.live[lang] : COPY.prep[lang]}
                  </span>
                </div>
                <h3 className="text-[#111827] font-black text-sm mb-1">{f.name[lang]}</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">{f.desc[lang]}</p>
              </>
            )
            return f.href ? (
              <Link
                key={f.name.KO}
                href={f.href}
                className="bg-white border border-[#dbeafe] rounded-2xl p-5 hover:border-brand-mid hover:shadow-md transition-all duration-150"
              >
                {inner}
              </Link>
            ) : (
              <div key={f.name.KO} className="bg-white border border-[#dbeafe] rounded-2xl p-5 opacity-80">
                {inner}
              </div>
            )
          })}
        </div>

        {/* 첫 도구 CTA */}
        <div className="mb-10">
          <Link
            href="/tools/diagnosis"
            className="inline-flex items-center gap-2 bg-brand-mid text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-brand-light transition-all shadow-md"
          >
            {COPY.cta[lang]}
            <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>

        {/* 다음 도구 알림 */}
        <div className="max-w-xl">
          <p className="text-[#64748b] text-xs font-semibold mb-2.5">{COPY.notify_label[lang]}</p>
          <NotifySignup
            source="Tools 다음 도구 알림"
            event="tools_beta_clicked"
            tone="light"
            ctaLabel={{ KO: COPY.notify_cta.KO, EN: COPY.notify_cta.EN, JP: COPY.notify_cta.JP }}
          />
        </div>
      </div>
    </section>
  )
}
