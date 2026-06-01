import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  variant?: 'light' | 'dark'
}

export function Logo({ className, variant = 'dark' }: LogoProps) {
  const wordmark = variant === 'light' ? 'text-white' : 'text-[#0d0d0d]'
  const tagline = variant === 'light' ? 'text-teal-300/90' : 'text-teal-600/80'

  return (
    <Link href="/" className={cn('flex items-center gap-3 shrink-0 group', className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 group-hover:scale-105 transition-transform duration-200"
        aria-hidden
      >
        <rect width="36" height="36" rx="11" fill="url(#logo-grad)" />
        <path
          d="M9.5 12L13.5 23L18 16.5L22.5 23L26.5 12"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" />
            <stop offset="0.5" stopColor="#14b8a6" />
            <stop offset="1" stopColor="#0891b2" />
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
