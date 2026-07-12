'use client'

import { CheckCircle2, Clock, ArrowUpRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { NotifySignup } from '@/components/home/NotifySignup'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 양양 1기 완료 증거 — 설문 수치는 1기 모집 페이지(wakation-yangyang.vercel.app)
// 공개 데이터 실사값 (2026-07-15 확인: 만족도 4.7/5 · NPS 9.1/10 · 재참여 100%)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'PILOT COMPLETED', EN: 'PILOT COMPLETED', JP: 'PILOT COMPLETED' },
  title: { KO: '양양 1기, 숫자로 증명했습니다', EN: 'Yangyang batch 1 — proven in numbers', JP: '襄陽1期、数字で証明しました' },
  sub: {
    KO: '바다 앞에서 일하고 쉬는 2박 3일. 첫 회차를 실제로 운영했고, 참가자 설문 결과를 그대로 공개합니다.',
    EN: 'Two nights of working and resting by the sea. We ran the first cohort — and published the participant survey as-is.',
    JP: '海の前で働き休む2泊3日。初回を実際に運営し、参加者アンケートをそのまま公開しています。',
  },
  stat_note: { KO: '1기 참가자 설문 · 전원 응답', EN: 'Batch 1 participant survey · all responded', JP: '1期参加者アンケート・全員回答' },
  view_page: { KO: '설문 결과·후기·사진 전체 보기', EN: 'See the full survey, reviews & photos', JP: 'アンケート・レビュー・写真をすべて見る' },
  notify_label: { KO: '다음 회차가 열리면 가장 먼저 알려드릴게요', EN: "Be the first to know when the next cohort opens", JP: '次回開催を最初にお知らせします' },
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
  { done: false, text: { KO: '다음 회차 준비 중', EN: 'Next cohort in preparation', JP: '次回開催を準備中' } },
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

          {/* 실측 설문 스탯 — 1기 페이지 공개 데이터 */}
          <div className="grid grid-cols-3 gap-3 mb-2">
            {STATS.map((s) => (
              <div key={s.value} className="bg-white/5 border border-sky-400/20 rounded-2xl px-3 py-4 text-center">
                <p className="text-sky-300 font-black text-xl sm:text-2xl leading-none mb-1.5">{s.value}</p>
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

          {/* 1기 실제 모집 페이지 — 설문·후기·사진 원본 */}
          <a
            href="https://wakation-yangyang.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sky-300 text-sm font-bold hover:gap-2.5 transition-all"
          >
            {COPY.view_page[lang]} <ArrowUpRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </a>
        </div>
        <div>
          <p className="text-white/45 text-xs font-semibold mb-2.5">{COPY.notify_label[lang]}</p>
          <NotifySignup source="양양 다음 회차·후기 알림" event="program_alert_submitted" />
        </div>
      </div>
    </section>
  )
}
