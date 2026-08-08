import type { Lang } from '@/lib/i18n/types'

const LABEL: Record<Lang, string> = {
  KO: '편집 이미지',
  EN: 'Editorial image',
  JP: '編集イメージ',
}

export function EditorialImageBadge({ lang, className = '' }: { lang: Lang; className?: string }) {
  return (
    <span
      className={`rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[0.65rem] font-bold text-white/90 backdrop-blur-sm ${className}`}
    >
      {LABEL[lang]}
    </span>
  )
}
