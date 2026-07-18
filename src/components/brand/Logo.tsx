import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  variant?: 'light' | 'dark'
}

export function Logo({ className, variant = 'dark' }: LogoProps) {
  const light = variant === 'light'

  return (
    <Link
      href="/"
      aria-label="Wakation home"
      className={cn(
        'group inline-flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400',
        className,
      )}
    >
      <svg
        viewBox="0 0 42 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-10 shrink-0 overflow-visible transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
        aria-hidden
      >
        <path
          d="M3.5 7.5C7.2 23.7 10.4 29 14.8 29c4.1 0 5.1-10.9 8.2-10.9S27 29 31.3 29c4.3 0 6.4-6.5 8.1-21.5"
          stroke={light ? '#ffffff' : '#082f49'}
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.2 26.2c8.2-3.4 20.2-3.4 29.4 0"
          stroke={light ? '#7dd3fc' : '#0ea5e9'}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <circle cx="35.2" cy="4.3" r="2.6" fill={light ? '#fef3c7' : '#fbbf24'} />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[1.22rem] font-extrabold tracking-[-0.055em]',
            light ? 'text-white' : 'text-[#071a2b]',
          )}
        >
          Wakation
        </span>
        <span
          className={cn(
            'mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.24em]',
            light ? 'text-sky-200/80' : 'text-sky-700/70',
          )}
        >
          Stay · Work · Grow
        </span>
      </span>
    </Link>
  )
}
