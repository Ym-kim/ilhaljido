'use client'

import { useLang } from '@/context/LanguageContext'
import { getSupportCatalog } from '@/lib/support/catalog'
import { useSavedSupportPrograms } from '@/hooks/useSavedSupportPrograms'
import { SupportProgramCard } from '@/components/programs/SupportProgramCard'
import type { Lang } from '@/lib/i18n/types'

const COPY = {
  title: { KO: '지원 프로그램', EN: 'Support programs', JP: '支援プログラム' },
  desc: { KO: '이 브라우저에 저장한 지역 체류·워케이션 공고', EN: 'Local stay and workation notices saved in this browser', JP: 'このブラウザに保存した地域滞在・ワーケーション公告' },
} satisfies Record<string, Record<Lang, string>>

export function SavedSupportProgramsSection() {
  const { lang } = useLang()
  const { ids } = useSavedSupportPrograms()
  const programs = getSupportCatalog(lang).filter((program) => ids.includes(program.id))
  if (!programs.length) return null

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-[#1d3640]">{COPY.title[lang]}</h2>
      <p className="mt-1 text-sm text-[#718187]">{COPY.desc[lang]}</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => <SupportProgramCard key={program.id} program={program} lang={lang} />)}
      </div>
    </section>
  )
}

