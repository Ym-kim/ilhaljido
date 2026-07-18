import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
// 에디토리얼 아티클 배너 — 단일 공용 스타일 (2026-07-19 디자인 정리)
// 이전: cruise/domestic/global 3곳이 각기 다른 그라디언트(스카이/에메랄드/시안)
// → 네이비+스카이 액센트 1종으로 통일. 새 아티클 배너는 반드시 이 컴포넌트 사용.
// 서버·클라이언트 양쪽에서 사용 가능(프레젠테이션 전용).
// ─────────────────────────────────────────────────────────────────────────────

export function EditorialBanner({
  href,
  eyebrow,
  title,
  sub,
  cta,
}: {
  href: string
  eyebrow: string
  title: string
  sub: string
  cta: string
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rounded-3xl bg-gradient-to-r from-[#0a1628] via-[#0f1f3d] to-[#0a1628] border border-sky-500/20 px-7 py-6 hover:border-sky-400/40 hover:shadow-xl transition-all"
    >
      <div className="flex-1 min-w-0">
        <span className="block text-sky-300 text-[0.6875rem] font-bold tracking-widest uppercase mb-1">
          {eyebrow}
        </span>
        <span className="block text-white font-black text-lg leading-tight">{title}</span>
        <span className="block text-white/55 text-sm mt-1">{sub}</span>
      </div>
      <span className="inline-flex items-center gap-1.5 shrink-0 text-sm font-bold text-sky-300 group-hover:text-sky-200">
        {cta}
      </span>
    </Link>
  )
}
