'use client'

import { useState } from 'react'
import { ChevronDown, ShieldCheck } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// "어떤 기준으로 선정하나요?" — 마이리얼트립 투명성 모듈 벤치 (2026-07-18)
// 우리 정직성 원칙(실존 검증·공식 출처·제휴 고지)을 UI 자산으로 가시화.
// 라이트 서피스용. 사용처: /destinations 허브 · /select · /collections
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>
const T: Record<string, L> = {
  q: { KO: '어떤 기준으로 선정하나요?', EN: 'How do we pick these?', JP: 'どんな基準で選んでいますか？' },
  c1: {
    KO: '모든 상품·링크는 게재 전 실제 존재와 URL을 직접 확인합니다.',
    EN: 'Every product and link is verified to exist before it goes live.',
    JP: 'すべての商品・リンクは掲載前に実在とURLを直接確認しています。',
  },
  c2: {
    KO: '지원사업·비자 등 정보는 공식 출처(정부·공공기관·운영사)만 사용합니다.',
    EN: 'Subsidy and visa info comes only from official sources.',
    JP: '支援事業・ビザ情報は公式ソースのみを使用します。',
  },
  c3: {
    KO: '가격은 검증 가능한 경우에만, 기준일과 함께 표기합니다.',
    EN: 'Prices are shown only when verifiable, with the as-of date.',
    JP: '価格は検証できる場合のみ、基準日とともに表記します。',
  },
  c4: {
    KO: '일부 링크는 제휴 링크이며, 예약 시 Wakation이 수수료를 받을 수 있습니다. 이용 요금에는 영향이 없습니다.',
    EN: 'Some links are affiliate links — Wakation may earn a commission at no extra cost to you.',
    JP: '一部は提携リンクで、予約時にWakationが手数料を受け取る場合があります。料金への影響はありません。',
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
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#94a3b8] hover:text-teal-600 transition-colors"
      >
        <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
        {T.q[lang]}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2} />
      </button>
      {open && (
        <ul className="mt-2.5 space-y-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 text-[0.75rem] text-[#64748b] leading-relaxed">
          {(['c1', 'c2', 'c3', 'c4'] as const).map((k) => (
            <li key={k} className="flex items-start gap-2">
              <span className="text-teal-500 font-bold shrink-0">·</span>
              {T[k][lang]}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
