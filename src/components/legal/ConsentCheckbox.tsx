'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import { CONSENT } from '@/lib/legal'

// 개인정보 수집·이용 동의 체크박스 — 폼 공용 (개인정보보호법 §15 고지+동의)
export function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  const { lang } = useLang()
  const policyLabel = lang === 'KO' ? '개인정보처리방침' : lang === 'JP' ? 'プライバシーポリシー' : 'Privacy Policy'

  return (
    <div className="rounded-xl border border-[#e0f2fe] bg-[#f8fbff] p-4">
      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 shrink-0 accent-brand-mid cursor-pointer"
        />
        <span className="text-[#334155] text-[0.8125rem] font-semibold leading-snug">
          {CONSENT.label[lang]}
        </span>
      </label>
      <p className="text-[#64748b] text-[0.6875rem] leading-relaxed mt-2 pl-[26px]">
        {CONSENT.detail[lang]}{' '}
        <Link href="/privacy" target="_blank" className="text-brand-mid font-semibold underline">
          {policyLabel}
        </Link>
      </p>
    </div>
  )
}
