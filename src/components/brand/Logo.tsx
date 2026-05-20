import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  variant?: 'light' | 'dark'
}

export function Logo({ className, variant = 'dark' }: LogoProps) {
  const text = variant === 'light' ? 'text-white' : 'text-gray-900'

  return (
    <Link href="/" className={cn('flex items-center gap-2.5 shrink-0 group', className)}>
      <span
        className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-mid to-brand flex items-center justify-center text-white text-sm font-black tracking-tighter shadow-sm"
        aria-hidden
      >
        W
      </span>
      <span className={cn('font-black text-lg tracking-tight', text)}>
        Wakation
      </span>
    </Link>
  )
}
