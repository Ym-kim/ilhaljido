'use client'

import Link from 'next/link'
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { localizeHref } from '@/lib/i18n/localePath'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 양양 워케이션 운영 기록 — 설문 수치는 당시 운영 페이지(wakation-yangyang.vercel.app)
// 공개 데이터 실사값 (2026-07-15 확인: 만족도 4.7/5 · NPS 9.1/10 · 재참여 100%)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'YANGYANG FIELD NOTE', EN: 'YANGYANG FIELD NOTE', JP: 'YANGYANG FIELD NOTE' },
  title: { KO: '양양에서 보낸 2박 3일, 결과를 공개합니다', EN: 'What we learned from three days in Yangyang', JP: '襄陽で過ごした2泊3日の結果' },
  sub: {
    KO: '바다 앞에서 일하고 쉬는 2박 3일을 실제로 운영했습니다. 참가자 전원이 응답한 설문 결과를 그대로 공개합니다.',
    EN: 'We hosted two nights of working and resting by the sea, and publish the all-participant survey results as recorded.',
    JP: '海の前で働き、休む2泊3日を実際に運営しました。参加者全員のアンケート結果をそのまま公開します。',
  },
  stat_note: { KO: '양양 참가자 설문 · 전원 응답', EN: 'Yangyang participant survey · all responded', JP: '襄陽参加者アンケート・全員回答' },
  view_page: { KO: '양양 워케이션 결과 보기', EN: 'View the Yangyang workation report', JP: '襄陽ワーケーションの結果を見る' },
  notify_label: { KO: '다음 일정이 정해지면 가장 먼저 알려드릴게요', EN: 'Be the first to know when new dates are set', JP: '次の日程が決まり次第、いち早くお知らせします' },
  notify_cta: { KO: '다음 일정 알림 받기', EN: 'Get the next-date alert', JP: '次の日程の通知を受け取る' },
}

const STATS: { value: string; label: L }[] = [
  { value: '4.7/5', label: { KO: '종합 만족도', EN: 'Overall satisfaction', JP: '総合満足度' } },
  { value: '9.1/10', label: { KO: '추천 의향 (NPS)', EN: 'Would recommend (NPS)', JP: '推薦意向（NPS）' } },
  { value: '100%', label: { KO: '재참여 의향', EN: 'Would join again', JP: '再参加意向' } },
]

const FACTS: { done: boolean; text: L }[] = [
  { done: true,  text: { KO: '2박 3일 소수 정예 운영 완료', EN: '2N3D small-group cohort completed', JP: '2泊3日の少人数運営を完了' } },
  { done: true,  text: { KO: '참가자 설문 결과 공개', EN: 'Participant survey published', JP: '参加者アンケートを公開' } },
  { done: true,  text: { KO: '현장 사진·후기 공개', EN: 'Photos and reviews published', JP: '現場写真・レビューを公開' } },
  { done: false, text: { KO: '다음 일정 준비 중', EN: 'New dates in preparation', JP: '次の日程を準備中' } },
]

export function YangyangProof() {
  const { lang } = useLang()

  return (
    <section className="dark-surface bg-[#0a1e33] py-16 md:py-20 px-4 sm:px-6 border-t border-white/8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-sky-400 text-xs font-black tracking-widest uppercase mb-3">{COPY.eyebrow[lang]}</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{COPY.title[lang]}</h2>
          <p className="text-white/55 text-sm leading-relaxed mb-7">{COPY.sub[lang]}</p>

          {/* 실측 설문 스탯 — 당시 운영 페이지 공개 데이터 */}
          <div className="grid grid-cols-3 gap-3 mb-2">
            {STATS.map((s) => (
              <div key={s.value} className="bg-white/5 border border-sky-400/20 rounded-2xl px-3 py-4 text-center">
                <span className="block text-sky-300 font-black text-xl sm:text-2xl leading-none mb-1.5">{s.value}</span>
                <p className="text-white/50 text-[0.65rem] font-semibold leading-tight">{s.label[lang]}</p>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-[0.65rem] mb-6">{COPY.stat_note[lang]}</p>

          <ul className="space-y-2 mb-6">
            {FACTS.map((f) => (
              <li key={f.text.KO} className="flex items-center gap-2.5 text-sm">
                {f.done ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" strokeWidth={ICON_STROKE} />
                ) : (
                  <Clock className="w-4.5 h-4.5 text-amber-400 shrink-0" strokeWidth={ICON_STROKE} />
                )}
                <span className={f.done ? 'text-white/80 font-semibold' : 'text-white/50'}>{f.text[lang]}</span>
              </li>
            ))}
          </ul>

          {/* 온사이트 결과 리포트 — 설문·일정·후기 (외부 원본은 리포트 내에서 재링크) */}
          <Link
            href="/report/yangyang"
            className="inline-flex items-center gap-1.5 text-sky-300 text-sm font-bold hover:gap-2.5 transition-all"
          >
            {COPY.view_page[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-white/75 text-sm font-semibold leading-6">{COPY.notify_label[lang]}</p>
          <p className="mt-2 text-xs leading-5 text-white/45">
            {lang === 'KO' ? '알림 등록은 Hosted 페이지 한 곳에서 관리합니다.' : lang === 'JP' ? '通知登録はHostedページでまとめて管理します。' : 'Manage your alert in one place on the Hosted page.'}
          </p>
          <Link
            href={localizeHref('/hosted#hosted-updates', lang)}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-sky-500 px-5 text-sm font-black text-white transition-colors hover:bg-sky-400"
          >
            {COPY.notify_cta[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </div>
    </section>
  )
}
