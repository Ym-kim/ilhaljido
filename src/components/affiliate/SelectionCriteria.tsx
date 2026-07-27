'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// "어떤 기준으로 선정하나요?" — 마이리얼트립 투명성 모듈 벤치 (2026-07-18)
// 우리 정직성 원칙(실존 검증·공식 출처·제휴 고지)을 UI 자산으로 가시화.
// 라이트 서피스용. 사용처: /destinations 허브 · /select · /collections
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>
const T: Record<string, L> = {
  q: { KO: 'Wakation 검증 노트', EN: 'Wakation verification notes', JP: 'Wakationの検証ノート' },
  c1: {
    KO: '판매 중인 상품 링크인지 게재 전 직접 확인합니다.',
    EN: 'We check that every product link is live before publishing.',
    JP: '販売中の商品リンクかを掲載前に確認しています。',
  },
  c2: {
    KO: '지원사업·비자 정보는 정부와 운영사 공식 출처만 사용합니다.',
    EN: 'Subsidy and visa guidance uses official government and operator sources.',
    JP: '支援事業・ビザ情報は政府・運営会社の公式情報のみを使用します。',
  },
  c3: {
    KO: '가격은 확인 가능한 경우에만 기준일과 함께 보여드립니다.',
    EN: 'Prices appear only when they can be verified with an as-of date.',
    JP: '価格は確認できる場合のみ、基準日とともに表示します。',
  },
}

export function SelectionCriteria({ className = '' }: { className?: string }) {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 border-b border-[#cbd5e1] pb-0.5 text-xs font-bold text-[#64748b] transition-colors hover:border-sky-500 hover:text-sky-700"
      >
        {T.q[lang]}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2} />
      </button>
      {open && (
        <ul className="mt-3 grid max-w-2xl gap-3 rounded-2xl border border-[#dfe6e9] bg-white p-4 text-[0.75rem] leading-relaxed text-[#526370] shadow-[0_12px_35px_rgba(8,47,73,0.06)] sm:grid-cols-3 sm:p-5">
          {(['c1', 'c2', 'c3'] as const).map((k, index) => (
            <li key={k} className="flex items-start gap-2.5">
              <span className="shrink-0 text-[0.58rem] font-black tracking-widest text-sky-700">0{index + 1}</span>
              <span>{T[k][lang]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
