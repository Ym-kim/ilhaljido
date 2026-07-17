import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  variant?: 'light' | 'dark'
}

export function Logo({ className, variant = 'dark' }: LogoProps) {
  const wordmark = variant === 'light' ? 'text-white' : 'text-[#0d0d0d]'
  const tagline = variant === 'light' ? 'text-sky-300/90' : 'text-sky-600/80'

  return (
    <Link href="/" className={cn('flex items-center gap-3 shrink-0 group', className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 group-hover:scale-105 group-hover:rotate-[-3deg] transition-transform duration-300"
        aria-hidden
      >
        <rect width="36" height="36" rx="11" fill="url(#logo-grad)" />
        {/* 좌상단 하이라이트 — 유리 질감 깊이 */}
        <rect width="36" height="36" rx="11" fill="url(#logo-hl)" />
        <rect x="0.5" y="0.5" width="35" height="35" rx="10.5" fill="none" stroke="#ffffff" strokeOpacity="0.14" />
        {/* 태양 — 휴가의 따뜻함 (글로우 + 라디얼) */}
        <circle cx="27.2" cy="9.8" r="4.4" fill="#fcd34d" opacity="0.22" />
        <circle cx="27.2" cy="9.8" r="2.7" fill="url(#logo-sun)" />
        {/* 물결 W — 일과 바다가 만나는 곳 (에코 웨이브로 깊이) */}
        <path
          d="M7.4 15.5 Q10 25.4 12.9 24.9 Q15.4 24.4 18 18.9 Q20.6 24.4 23.1 24.9 Q26 25.4 28.6 15.5"
          stroke="#0c4a6e"
          strokeOpacity="0.35"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0 1.6)"
        />
        <path
          d="M7 13 Q9.8 24.2 12.7 23.7 Q15.3 23.2 18 17.2 Q20.7 23.2 23.3 23.7 Q26.2 24.2 29 13"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="logo-grad" x1="4" y1="2" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7dd3fc" />
            <stop offset="0.35" stopColor="#0ea5e9" />
            <stop offset="0.72" stopColor="#0369a1" />
            <stop offset="1" stopColor="#0c4a6e" />
          </linearGradient>
          <radialGradient id="logo-hl" cx="0.28" cy="0.14" r="0.9">
            <stop stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="logo-sun" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#fde68a" />
            <stop offset="0.6" stopColor="#fcd34d" />
            <stop offset="1" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
      </svg>
      <div className="flex flex-col leading-none gap-0.5">
        <span className={cn('font-black text-[1.1rem] tracking-[-0.04em]', wordmark)}>
          Wakation
        </span>
        <span className={cn('text-[0.6rem] font-bold tracking-[0.12em] uppercase', tagline)}>
          Stay · Work · Grow
        </span>
      </div>
    </Link>
  )
}
