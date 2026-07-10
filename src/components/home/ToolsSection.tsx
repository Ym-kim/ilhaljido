'use client'

import { ClipboardCheck, ListChecks, Map, FileBarChart, Sparkles } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { NotifySignup } from '@/components/home/NotifySignup'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// Wakation Tools — 참가자용 웹프로그램 (개발 전 → 'Beta 준비 중' 고정 표기)
// 첫 도구: 참가자 진단 & 실행 리포트
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'WAKATION TOOLS', EN: 'WAKATION TOOLS', JP: 'WAKATION TOOLS' },
  badge: { KO: 'Beta 준비 중', EN: 'Beta in prep', JP: 'Beta準備中' },
  title: { KO: '참가 기간 무료로 쓰는 Wakation Tools', EN: 'Wakation Tools — free while you participate', JP: '参加期間は無料で使えるWakation Tools' },
  sub: {
    KO: '참가자는 워케이션 기간 동안 진단·실행계획·결과 리포트 웹프로그램을 무료로 사용하고, 프로그램 이후에도 자신의 업무와 사업을 이어갈 수 있습니다.',
    EN: 'Participants use our diagnosis, action-plan and report tools free during the workation — and keep building on them afterwards.',
    JP: '参加者はワーケーション期間中、診断・実行計画・結果レポートのWebツールを無料で使い、プログラム後も仕事と事業を続けられます。',
  },
  notify_label: { KO: '참가자 진단 Beta가 열리면 가장 먼저 알려드릴게요', EN: "Be the first to know when the diagnosis Beta opens", JP: '参加者診断Betaのオープンを最初にお知らせします' },
  notify_cta: { KO: 'Tools 알림받기', EN: 'Get Tools updates', JP: 'Toolsの通知を受け取る' },
}

const FEATURES: { icon: typeof ClipboardCheck; name: L; desc: L }[] = [
  {
    icon: ClipboardCheck,
    name: { KO: '참가자 진단', EN: 'Participant diagnosis', JP: '参加者診断' },
    desc: { KO: '참가 전 목표·업무 단계·해결 과제를 진단', EN: 'Assess goals, work stage and challenges before you go', JP: '参加前に目標・業務段階・課題を診断' },
  },
  {
    icon: ListChecks,
    name: { KO: '실행계획', EN: 'Action plan', JP: '実行計画' },
    desc: { KO: '체류 기간에 맞춘 추천 일정과 실행 항목', EN: 'A recommended schedule and to-dos for your stay', JP: '滞在期間に合わせた推奨日程と実行項目' },
  },
  {
    icon: Map,
    name: { KO: '현장 체크리스트', EN: 'On-site checklist', JP: '現場チェックリスト' },
    desc: { KO: '현장에서 실행 여부를 바로 체크', EN: 'Track what you actually get done on site', JP: '現場で実行状況をすぐチェック' },
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
            <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {COPY.badge[lang]}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-2">{COPY.title[lang]}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-2xl">{COPY.sub[lang]}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.name.KO} className="bg-white border border-[#dbeafe] rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-[#f0f9ff] border border-[#dbeafe] flex items-center justify-center text-brand-mid mb-3">
                  <Icon className="w-4.5 h-4.5" strokeWidth={ICON_STROKE} />
                </div>
                <h3 className="text-[#111827] font-black text-sm mb-1">{f.name[lang]}</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">{f.desc[lang]}</p>
              </div>
            )
          })}
        </div>

        {/* Beta 알림 */}
        <div className="max-w-xl">
          <p className="text-[#64748b] text-xs font-semibold mb-2.5">{COPY.notify_label[lang]}</p>
          <NotifySignup
            source="Tools 참가자 진단 Beta 알림"
            event="tools_beta_clicked"
            tone="light"
            ctaLabel={{ KO: COPY.notify_cta.KO, EN: COPY.notify_cta.EN, JP: COPY.notify_cta.JP }}
          />
        </div>
      </div>
    </section>
  )
}
