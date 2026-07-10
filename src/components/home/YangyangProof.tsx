'use client'

import { CheckCircle2, Clock } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { NotifySignup } from '@/components/home/NotifySignup'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 양양 1기 완료 증거 — 실제 완료 사실만 기재 (설문·후기·리포트는 '정리/준비 중')
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'PILOT COMPLETED', EN: 'PILOT COMPLETED', JP: 'PILOT COMPLETED' },
  title: { KO: '양양 1기 파일럿을 마쳤습니다', EN: 'Yangyang batch 1 pilot — completed', JP: '襄陽1期パイロットを完了しました' },
  sub: {
    KO: '바다 앞에서 일하고 쉬는 2박 3일. 첫 회차를 실제로 운영하며 검증한 것들 위에 다음 회차를 준비하고 있습니다.',
    EN: 'Two nights of working and resting by the sea. We ran the first cohort for real — and the next one is being built on what we learned.',
    JP: '海の前で働き休む2泊3日。実際に初回を運営し、その検証をもとに次回を準備しています。',
  },
  notify_label: { KO: '다음 회차·후기 업데이트를 알려드릴게요', EN: "Get updates on the next cohort and the recap", JP: '次回・レポート更新をお知らせします' },
}

const FACTS: { done: boolean; text: L }[] = [
  { done: true,  text: { KO: '2박 3일 소수 정예 운영 완료', EN: '2N3D small-group cohort completed', JP: '2泊3日の少人数運営を完了' } },
  { done: true,  text: { KO: '숙소·업무공간·네트워킹 구성 검증', EN: 'Stay, workspace and networking format validated', JP: '宿泊・ワークスペース・交流構成を検証' } },
  { done: false, text: { KO: '참가자 설문 결과 정리 중', EN: 'Participant survey results being compiled', JP: '参加者アンケート結果を整理中' } },
  { done: false, text: { KO: '사진·후기 콘텐츠 준비 중', EN: 'Photos and recap content in prep', JP: '写真・レポートコンテンツ準備中' } },
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
          <ul className="space-y-2.5">
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
        </div>
        <div>
          <p className="text-white/45 text-xs font-semibold mb-2.5">{COPY.notify_label[lang]}</p>
          <NotifySignup source="양양 다음 회차·후기 알림" event="program_alert_submitted" />
        </div>
      </div>
    </section>
  )
}
