'use client'

import { Sparkles } from 'lucide-react'
import { NotifySignup } from '@/components/home/NotifySignup'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// Hosted 관심 등록 공통 섹션 (feat/hosted-lead-v1)
// - Wakation Hosted(직접 운영) 리드 수집 — 2026-09 직접 상품 본격화 전 수요 검증
// - NotifySignup 재활용(applications 테이블, job_type='오픈 알림 신청', source가 message에 기록)
// - 정직성: 확정 일정·긴급성 표기 금지 — 전 variant "일정 확정 시 알림" 프레임
// - HostedBadge 내장: Select(제휴)와 시각 구분 (disclosure line2와 일관)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

export type HostedLeadVariant = 'market' | 'networking' | 'language' | 'domestic'

const BADGE: L = { KO: '직접 운영 프로그램', EN: 'Run by Wakation', JP: '直営プログラム' }
const CTA: L = { KO: '관심 등록하기', EN: 'Register interest', JP: '関心を登録' }

const COPY: Record<HostedLeadVariant, { source: string; title: L; sub: L }> = {
  market: {
    source: '일본 시장조사단 관심 등록',
    title: {
      KO: '일본 시장조사단, 다음 모집 알림 받기',
      EN: 'Japan market research trip — get the next opening',
      JP: '日本市場調査団 — 次回募集の通知を受け取る',
    },
    sub: {
      KO: '현장 시장조사 프로그램의 다음 모집 소식을 카카오톡 또는 간단한 관심 등록으로 받아보세요.',
      EN: 'Get the next research cohort update on KakaoTalk or with a short interest form.',
      JP: '次回の募集情報を、カカオトークまたは簡単な興味登録で受け取れます。',
    },
  },
  networking: {
    source: '창업가 캠프 관심 등록',
    title: {
      KO: '창업가 네트워킹 캠프 관심 등록',
      EN: 'Founder networking camp — register interest',
      JP: '起業家ネットワーキングキャンプ — 関心登録',
    },
    sub: {
      KO: '1인 기업·창업가를 위한 네트워킹 캠프 — 다음 회차 일정이 확정되면 알려드립니다.',
      EN: "A camp for founders and solopreneurs — we'll notify you when the next cohort is confirmed.",
      JP: '起業家・ひとり社長のためのキャンプ — 次回日程が確定次第お知らせします。',
    },
  },
  language: {
    source: '어학·유학 체류 관심 등록',
    title: {
      KO: '어학 + 워케이션 체류, 오픈 알림 받기',
      EN: 'Language study + workation stays — get notified',
      JP: '語学＋ワーケーション滞在 — オープン通知',
    },
    sub: {
      KO: '어학 수업과 체류를 결합한 프로그램을 준비하고 있습니다 — 오픈하면 알려드립니다.',
      EN: "We're preparing programs that combine classes and long stays — choose how you want to hear when they open.",
      JP: '語学レッスンと滞在を組み合わせたプログラムを準備中 — オープン時にお知らせします。',
    },
  },
  domestic: {
    source: '국내 프로그램 오픈 알림',
    title: {
      KO: '국내 프로그램 오픈 알림 받기',
      EN: 'Korea programs — get opening alerts',
      JP: '国内プログラム — オープン通知',
    },
    sub: {
      KO: '양양 1기처럼 국내 거점에서 열리는 다음 회차 소식을 부담 없이 받아보세요.',
      EN: "Be first to hear when the next Korea cohort opens — like our Yangyang pilot.",
      JP: '襄陽1期のような国内回次のオープンをいち早くお知らせします。',
    },
  },
}

export function HostedBadge({ tone = 'light', lang: langProp }: { tone?: 'dark' | 'light'; lang?: Lang }) {
  const { lang: ctxLang } = useLang()
  // SSG-KO 함정 회피: forceLang 라우트에선 부모가 해석된 lang을 내려준다
  const lang = langProp ?? ctxLang
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.08em] ${
        tone === 'light'
          ? 'bg-sky-50 text-[#0369a1] border border-sky-200'
          : 'bg-sky-400/10 text-sky-300 border border-sky-400/25'
      }`}
    >
      <Sparkles className="h-3 w-3" strokeWidth={ICON_STROKE} />
      Wakation Hosted · {BADGE[lang]}
    </span>
  )
}

export function HostedLeadSection({
  variant,
  tone = 'light',
  lang: langProp,
}: {
  variant: HostedLeadVariant
  tone?: 'dark' | 'light'
  /** forceLang 라우트용 해석된 lang — 미지정 시 컨텍스트 (SSG-KO 함정 회피) */
  lang?: Lang
}) {
  const { lang: ctxLang } = useLang()
  const lang = langProp ?? ctxLang
  const c = COPY[variant]
  const light = tone === 'light'

  return (
    <section id="hosted-interest" className={light ? 'scroll-mt-24 border-t border-[#e0f2fe] bg-[#f0f9ff]/60 px-6 py-14' : 'scroll-mt-24 border-t border-white/8 bg-[#0a1e33] dark-surface px-6 py-14'}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-3">
          <HostedBadge tone={tone} lang={lang} />
        </div>
        <h2 className={`mb-1.5 text-xl font-black md:text-2xl ${light ? 'text-[#111827]' : 'text-white'}`}>
          {c.title[lang]}
        </h2>
        <span className={`mb-6 block text-sm leading-relaxed ${light ? 'text-[#64748b]' : 'text-white/60'}`}>
          {c.sub[lang]}
        </span>
        <NotifySignup source={c.source} tone={tone} ctaLabel={CTA} lang={lang} />
      </div>
    </section>
  )
}
