import { ExternalLink } from 'lucide-react'
import type { ResearchSource } from '@/lib/content/research'
import type { Lang } from '@/lib/i18n/types'

const COPY: Record<Lang, { title: string; checked: string }> = {
  KO: { title: '공식 출처', checked: '확인' },
  EN: { title: 'Official sources', checked: 'Checked' },
  JP: { title: '公式情報', checked: '確認' },
}

export function OfficialSourceList({ lang, sources }: { lang: Lang; sources: ResearchSource[] }) {
  if (sources.length === 0) return null
  const copy = COPY[lang]

  return (
    <section aria-labelledby="official-sources-title" className="rounded-2xl border border-sky-500/30 bg-sky-500/8 p-5">
      <h3 id="official-sources-title" className="text-sm font-bold text-sky-300">{copy.title}</h3>
      <div className="mt-3 space-y-3">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-11 items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-sky-400/40"
          >
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-white">{source.title[lang]}</span>
              <span className="mt-1 block text-xs leading-relaxed text-white/55">
                {source.sourceName} · {copy.checked} {source.verifiedAt}
              </span>
              {source.note && <span className="mt-1 block text-xs leading-relaxed text-white/45">{source.note[lang]}</span>}
            </span>
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  )
}
