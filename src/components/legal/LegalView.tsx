'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { LegalSection } from '@/lib/legal'
import type { Lang } from '@/lib/i18n/types'

// 개인정보처리방침·이용약관 공용 렌더러 (라이트 톤, 3언어)
export function LegalView({
  doc,
}: {
  doc: { title: Record<Lang, string>; intro: Record<Lang, string>; updated: Record<Lang, string>; sections: LegalSection[] }
}) {
  const { lang } = useLang()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#94a3b8] text-xs font-medium hover:text-brand-mid transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          {lang === 'KO' ? '홈' : lang === 'JP' ? 'ホーム' : 'Home'}
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight mb-2">
          {doc.title[lang]}
        </h1>
        <p className="text-[#94a3b8] text-xs mb-6">{doc.updated[lang]}</p>
        <p className="text-[#475569] text-sm leading-relaxed mb-10">{doc.intro[lang]}</p>

        <div className="space-y-8">
          {doc.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-[#111827] font-bold text-base mb-2.5">{s.heading[lang]}</h2>
              <p className="text-[#475569] text-sm leading-relaxed whitespace-pre-line">{s.body[lang]}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
