'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { getSupportCatalog, SUPPORT_STATUS_ORDER } from '@/lib/support/catalog'
import { SupportProgramCard } from '@/components/programs/SupportProgramCard'
import type { Lang } from '@/lib/i18n/types'

const COPY = {
  eyebrow: { KO: 'LOCAL STAY SUPPORT', EN: 'LOCAL STAY SUPPORT', JP: 'LOCAL STAY SUPPORT' },
  title: { KO: '지원받고 떠나는 여행', EN: 'Travel further with local support', JP: '地域の支援で、もう少し長く滞在' },
  desc: { KO: '최근 확인한 체류·워케이션 프로그램입니다. 조건을 비교한 뒤 공식 공고에서 최종 모집 상태를 확인하세요.', EN: 'Recently checked stay and workation programs. Compare the basics, then confirm the final status in the official notice.', JP: '最近確認した滞在・ワーケーションプログラムです。条件を比較し、最終状況は公式公告で確認してください。' },
  all: { KO: '모든 지원 프로그램', EN: 'All support programs', JP: '支援プログラムをすべて見る' },
  guide: { KO: '반값여행 알아보기', EN: 'Regional travel support guide', JP: '地域旅行支援ガイド' },
} satisfies Record<string, Record<Lang, string>>

function prefixFor(lang: Lang) {
  return lang === 'JP' ? '/ja' : lang === 'EN' ? '/en' : ''
}

export function SupportPromoBanner() {
  const { lang } = useLang()
  const prefix = prefixFor(lang)
  const programs = getSupportCatalog(lang)
    .filter((program) => !['closed', 'ended', 'needs_review'].includes(program.status))
    .sort((a, b) => SUPPORT_STATUS_ORDER[a.status] - SUPPORT_STATUS_ORDER[b.status] || b.verifiedAt.localeCompare(a.verifiedAt))
    .slice(0, 3)

  return (
    <section className="bg-[#f5f3ed] px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-5 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-[0.13em] text-[#317b98]">{COPY.eyebrow[lang]}</p>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#18313b]">{COPY.title[lang]}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#62757d]">{COPY.desc[lang]}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`${prefix}/programs/support/half-price-travel`} className="inline-flex min-h-11 items-center rounded-full border border-[#b8c9cd] bg-white px-4 text-xs font-bold text-[#31515d] hover:border-[#789faa]">{COPY.guide[lang]}</Link>
            <Link href={`${prefix}/programs/support`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#153a49] px-5 text-xs font-bold text-white hover:bg-[#0e4d67]">{COPY.all[lang]} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => <SupportProgramCard key={program.id} program={program} lang={lang} />)}
        </div>
      </div>
    </section>
  )
}
