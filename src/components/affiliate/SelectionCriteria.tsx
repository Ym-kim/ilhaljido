'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { VERIFICATION_LEVEL_COPY, type VerificationLevel } from '@/lib/verification'

// ─────────────────────────────────────────────────────────────────────────────
// "어떤 기준으로 선정하나요?" — 마이리얼트립 투명성 모듈 벤치 (2026-07-18)
// 우리 정직성 원칙(실존 검증·공식 출처·제휴 고지)을 UI 자산으로 가시화.
// 라이트 서피스용. 사용처: /destinations 허브 · /select · /collections
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>
const T: Record<string, L> = {
  q: { KO: '정보를 어떻게 확인하나요?', EN: 'How is this information checked?', JP: '情報はどのように確認していますか？' },
  note: {
    KO: '가격은 확인 가능한 경우에만 기준일과 함께 표시하며, 예약 조건은 제휴사에서 최종 확인합니다.',
    EN: 'Prices appear only with an as-of date when available; booking terms are confirmed with the partner.',
    JP: '価格は確認できる場合のみ基準日とともに表示し、予約条件は提携先で最終確認します。',
  },
}

const LEVELS: VerificationLevel[] = ['research', 'partner', 'field', 'editorial']

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
        <div className="mt-3 max-w-3xl rounded-2xl border border-[#dfe6e9] bg-white p-4 text-[0.75rem] leading-relaxed text-[#526370] shadow-[0_12px_35px_rgba(8,47,73,0.06)] sm:p-5">
          <ul className="grid gap-4 sm:grid-cols-2">
            {LEVELS.map((level, index) => (
              <li key={level} className="flex items-start gap-2.5">
                <span className="shrink-0 text-[0.58rem] font-black tracking-widest text-sky-700">0{index + 1}</span>
                <span>
                  <strong className="block text-[0.75rem] text-[#213b48]">{VERIFICATION_LEVEL_COPY[level].label[lang]}</strong>
                  <span className="mt-0.5 block">{VERIFICATION_LEVEL_COPY[level].description[lang]}</span>
                </span>
              </li>
            ))}
          </ul>
          <span className="mt-4 block border-t border-[#e8edef] pt-3 text-[0.68rem] text-[#73838c]">{T.note[lang]}</span>
        </div>
      )}
    </div>
  )
}
