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
        {/* 태양 — 휴가의 따뜻함 */}
        <circle cx="27.2" cy="9.8" r="2.6" fill="#fcd34d" />
        {/* 물결 W — 일과 바다가 만나는 곳 */}
        <path
          d="M7 13 Q9.8 24.2 12.7 23.7 Q15.3 23.2 18 17.2 Q20.7 23.2 23.3 23.7 Q26.2 24.2 29 13"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="logo-grad" x1="4" y1="2" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.55" stopColor="#0284c7" />
            <stop offset="1" stopColor="#075985" />
          </linearGradient>
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
