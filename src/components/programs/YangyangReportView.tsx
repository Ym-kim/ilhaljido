'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, MapPin, Quote, CalendarDays } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { NotifySignup } from '@/components/home/NotifySignup'
import { HostedBadge } from '@/components/programs/HostedLeadSection'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 양양 1기 워케이션 결과 리포트 — 실운영 신뢰 페이지
// 데이터: 1기 모집·설문 페이지(wakation-yangyang.vercel.app) 공개 실사값
//   만족도 4.7/5 · NPS 9.1/10 · 재참여 100% · 가성비 4.7/5 (2026-06-17~19 2박3일)
// 후기는 설문 응답 요약(원문 한국어 정확본 미보유 → 반응 요약으로 정직 표기)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: '양양 1기 · 결과 리포트', EN: 'YANGYANG BATCH 1 · REPORT', JP: '襄陽1期・結果レポート' },
  title: {
    KO: '바다 앞에서 일한 2박 3일,\n숫자와 후기로 남겼습니다',
    EN: 'Two nights working by the sea —\nrecorded in numbers and reviews',
    JP: '海の前で働いた2泊3日、\n数字とレビューで残しました',
  },
  sub: {
    KO: '2026년 6월 17–19일, 양양에서 첫 회차를 실제로 운영했습니다. 참가자 전원이 응답한 설문 결과를 그대로 공개합니다.',
    EN: 'We ran the first cohort in Yangyang on June 17–19, 2026. Here is the participant survey — all responded — published as-is.',
    JP: '2026年6月17〜19日、襄陽で初回を実際に運営。参加者全員が回答したアンケートをそのまま公開します。',
  },
  stats_note: { KO: '1기 참가자 설문 · 전원 응답', EN: 'Batch 1 survey · all participants responded', JP: '1期参加者アンケート・全員回答' },
  prog_label: { KO: '프로그램 개요', EN: 'Program overview', JP: 'プログラム概要' },
  sched_label: { KO: '2박 3일 일정', EN: '2N3D schedule', JP: '2泊3日の日程' },
  voices_label: { KO: '참가자 설문에서 나온 반응', EN: 'What participants said in the survey', JP: 'アンケートに寄せられた声' },
  voices_note: { KO: '설문 응답 요약 (원문 후기·사진은 1기 페이지에서)', EN: 'Summarized from survey responses (full reviews & photos on the batch-1 page)', JP: 'アンケート回答の要約（原文・写真は1期ページで）' },
  incl_label: { KO: '참가비에 포함', EN: "What's included", JP: '参加費に含まれるもの' },
  view_original: { KO: '1기 원본 페이지 — 후기·사진 전체 보기', EN: 'Batch-1 original page — full reviews & photos', JP: '1期の原本ページ — レビュー·写真をすべて見る' },
  notify_title: { KO: '다음 회차가 열리면 가장 먼저 알려드릴게요', EN: 'Be the first to know when the next cohort opens', JP: '次回開催を最初にお知らせします' },
  back_programs: { KO: '전체 프로그램 보기', EN: 'See all programs', JP: 'すべてのプログラムを見る' },
}

const STATS: { value: string; label: L }[] = [
  { value: '4.7/5', label: { KO: '종합 만족도', EN: 'Overall satisfaction', JP: '総合満足度' } },
  { value: '9.1/10', label: { KO: '추천 의향 (NPS)', EN: 'Would recommend (NPS)', JP: '推薦意向（NPS）' } },
  { value: '100%', label: { KO: '재참여 의향', EN: 'Would join again', JP: '再参加意向' } },
  { value: '4.7/5', label: { KO: '가성비 만족', EN: 'Value for money', JP: 'コスパ満足度' } },
]

const OVERVIEW: { k: L; v: L }[] = [
  { k: { KO: '일정', EN: 'Dates', JP: '日程' }, v: { KO: '2026.6.17(수) ~ 6.19(금) · 2박 3일', EN: 'Jun 17–19, 2026 · 2N3D', JP: '2026.6.17(水)〜6.19(金)・2泊3日' } },
  { k: { KO: '체크인/아웃', EN: 'Check-in/out', JP: 'チェックイン/アウト' }, v: { KO: '수요일 오후 입실 → 금요일 정오 퇴실', EN: 'Wed afternoon in → Fri noon out', JP: '水曜午後イン → 金曜正午アウト' } },
  { k: { KO: '워크스페이스', EN: 'Workspace', JP: 'ワークスペース' }, v: { KO: '웨이브웍스 양양 (코워킹)', EN: 'Waveworks Yangyang (coworking)', JP: 'ウェーブワークス襄陽（コワーキング）' } },
  { k: { KO: '운영 방식', EN: 'Format', JP: '運営方式' }, v: { KO: '소수 정예 · 더블 숙박', EN: 'Small group · double-occupancy stay', JP: '少人数・ダブル宿泊' } },
]

const SCHEDULE: { day: L; items: L }[] = [
  { day: { KO: 'DAY 1 · 수', EN: 'DAY 1 · Wed', JP: 'DAY 1 · 水' }, items: { KO: '도착 · 오리엔테이션 · 자기소개 → 자유 근무/휴식 → 저녁 네트워킹', EN: 'Arrival · orientation · intros → free work/rest → evening networking', JP: '到着·オリエン·自己紹介 → 自由な仕事/休息 → 夜のネットワーキング' } },
  { day: { KO: 'DAY 2 · 목', EN: 'DAY 2 · Thu', JP: 'DAY 2 · 木' }, items: { KO: '오전 집중 근무 → 점심/휴식 → 오후 근무·로컬 액티비티 → 바비큐 파티 · 네트워킹', EN: 'Morning focus work → lunch/break → afternoon work & local leisure → BBQ party · networking', JP: '午前集中ワーク → 昼食/休憩 → 午後ワーク·ローカル体験 → BBQ·ネットワーキング' } },
  { day: { KO: 'DAY 3 · 금', EN: 'DAY 3 · Fri', JP: 'DAY 3 · 金' }, items: { KO: '가벼운 근무/자유 시간 → 경험 공유 세션 → 체크아웃', EN: 'Light work/free time → experience-sharing session → checkout', JP: '軽めのワーク/自由時間 → 経験共有セッション → チェックアウト' } },
]

const VOICES: L[] = [
  { KO: '바다 뷰 앞에서 유연하게 일하고, 네트워킹 기회도 좋았어요.', EN: 'Flexible work with ocean views, and great networking too.', JP: '海の前で柔軟に働け、ネットワーキングも良かった。' },
  { KO: '탁 트인 뷰의 깔끔한 공간이 업무 집중을 크게 높였습니다.', EN: 'A clean, open-view space that noticeably boosted my focus.', JP: '開放的で清潔な空間で集中力が大きく上がった。' },
  { KO: '예상보다 몰입·집중이 잘 됐고, 네트워킹이 즐거웠어요.', EN: 'More focus and engagement than expected — networking was a joy.', JP: '予想以上に集中でき、ネットワーキングも楽しかった。' },
  { KO: '새로운 연결에서 자극과 인사이트를 얻었습니다.', EN: 'New connections brought real stimulation and insight.', JP: '新しい繋がりから刺激とインサイトを得た。' },
]

const PULL_QUOTE: L = {
  KO: '“직장인이라면 꼭 한 번 참여해봐야 할 프로그램이에요.”',
  EN: '“If you work a desk job, you have to try this program.”',
  JP: '「会社員なら一度は参加すべきプログラム。」',
}

const INCLUDES: L[] = [
  { KO: '2박 숙박 (더블)', EN: '2-night stay (double)', JP: '2泊宿泊（ダブル）' },
  { KO: '코워킹 스페이스 (웨이브웍스 양양)', EN: 'Coworking (Waveworks Yangyang)', JP: 'コワーキング（ウェーブワークス襄陽）' },
  { KO: '바비큐 디너', EN: 'BBQ dinner', JP: 'BBQディナー' },
  { KO: '네트워킹 프로그램', EN: 'Networking programs', JP: 'ネットワーキング' },
  { KO: '경험 공유 세션', EN: 'Experience-sharing session', JP: '経験共有セッション' },
]

export function YangyangReportView() {
  const { lang } = useLang()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero — 동해 해변 (검증 풀) */}
      <section className="relative h-[52vh] min-h-[380px] flex items-end overflow-hidden dark-surface">
        <Image
          src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/40 to-[#04121f]/10" />
        <div className="relative w-full max-w-5xl mx-auto px-6 pb-14">
          <span className="block text-sky-300 text-xs font-black tracking-widest uppercase mb-3">{COPY.eyebrow[lang]}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight whitespace-pre-line mb-4">
            {COPY.title[lang]}
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-2xl leading-relaxed">{COPY.sub[lang]}</p>
        </div>
      </section>

      {/* 설문 스탯 */}
      <section className="px-6 py-12 bg-[#0a1e33] dark-surface border-b border-white/8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label.KO} className="bg-white/[0.06] border border-sky-400/20 rounded-2xl px-4 py-6 text-center">
                <span className="block text-sky-300 font-black text-3xl leading-none mb-2 tabular-nums">{s.value}</span>
                <p className="text-white/55 text-xs font-semibold leading-tight">{s.label[lang]}</p>
              </div>
            ))}
          </div>
          <p className="text-white/35 text-xs mt-3.5 text-center">{COPY.stats_note[lang]}</p>
        </div>
      </section>

      {/* 개요 + 일정 */}
      <section className="px-6 py-14">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-[#111827] font-black text-lg mb-5 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-mid" strokeWidth={ICON_STROKE} />{COPY.prog_label[lang]}
            </h2>
            <dl className="space-y-3">
              {OVERVIEW.map((o) => (
                <div key={o.k.KO} className="flex gap-4 border-b border-[#eef2f6] pb-3">
                  <dt className="text-[#94a3b8] text-sm font-bold w-24 shrink-0">{o.k[lang]}</dt>
                  <dd className="text-[#334155] text-sm font-medium">{o.v[lang]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-[#111827] font-black text-lg mb-5 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-brand-mid" strokeWidth={ICON_STROKE} />{COPY.sched_label[lang]}
            </h2>
            <ol className="space-y-3">
              {SCHEDULE.map((s) => (
                <li key={s.day.KO} className="bg-[#f8fafc] border border-[#e7eef2] rounded-2xl px-4 py-3.5">
                  <p className="text-brand-mid text-xs font-black mb-1">{s.day[lang]}</p>
                  <p className="text-[#475569] text-sm leading-relaxed">{s.items[lang]}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 참가자 반응 */}
      <section className="px-6 py-14 bg-[#f0f9ff] border-y border-[#dbeafe]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[#111827] font-black text-lg mb-1.5">{COPY.voices_label[lang]}</h2>
          <p className="text-[#94a3b8] text-xs mb-6">{COPY.voices_note[lang]}</p>

          <blockquote className="bg-brand-mid/8 border border-brand-mid/20 rounded-2xl px-6 py-5 mb-6 flex gap-3">
            <Quote className="w-6 h-6 text-brand-mid shrink-0" strokeWidth={ICON_STROKE} />
            <p className="text-[#0f2233] font-black text-lg md:text-xl leading-snug">{PULL_QUOTE[lang]}</p>
          </blockquote>

          <div className="grid sm:grid-cols-2 gap-3">
            {VOICES.map((v) => (
              <div key={v.KO} className="bg-white border border-[#e2e8f0] rounded-2xl px-5 py-4">
                <p className="text-[#475569] text-sm leading-relaxed">{v[lang]}</p>
              </div>
            ))}
          </div>

          {/* 포함사항 */}
          <div className="mt-8">
            <h3 className="text-[#111827] font-black text-sm mb-3">{COPY.incl_label[lang]}</h3>
            <div className="flex flex-wrap gap-2">
              {INCLUDES.map((it) => (
                <span key={it.KO} className="inline-flex items-center gap-1.5 bg-white border border-[#dbeafe] text-[#334155] text-xs font-bold px-3.5 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-mid" strokeWidth={ICON_STROKE} />
                  {it[lang]}
                </span>
              ))}
            </div>
          </div>

          <a
            href="https://wakation-yangyang.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold mt-7 hover:gap-2.5 transition-all"
          >
            {COPY.view_original[lang]} <ArrowUpRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </a>
        </div>
      </section>

      {/* 다음 회차 알림 */}
      <section className="dark-surface bg-gradient-to-b from-[#04121f] to-[#0a1e33] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-3">
            <HostedBadge tone="dark" />
          </div>
          <p className="text-white/60 text-sm font-semibold mb-3">{COPY.notify_title[lang]}</p>
          <NotifySignup source="양양 다음 회차 알림 (리포트)" event="program_alert_submitted" />
          <Link href="/programs" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-bold mt-5 transition-colors">
            {COPY.back_programs[lang]} <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </section>
    </div>
  )
}
