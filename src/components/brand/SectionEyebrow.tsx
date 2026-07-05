import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  onDark?: boolean
  pill?: boolean
  className?: string
}

export function SectionEyebrow({ children, onDark, pill, className }: Props) {
  if (pill) {
    return (
      <span
        className={cn(
          'inline-block text-eyebrow mb-4 px-3.5 py-1.5 rounded-full border',
          onDark
            ? 'text-eyebrow-on-dark border-sky-400/35 bg-sky-500/10'
            : 'text-eyebrow border-brand-mid/30 bg-brand-pale',
          className
        )}
      >
        {children}
      </span>
    )
  }

  return (
    <p className={cn(onDark ? 'text-eyebrow-on-dark mb-3' : 'text-eyebrow mb-3', className)}>
      {children}
    </p>
  )
}

export function SectionTitle({ children, onDark, className }: { children: React.ReactNode; onDark?: boolean; className?: string }) {
  return (
    <h2 className={cn('text-3xl md:text-4xl font-bold leading-tight', onDark ? 'text-white' : 'text-gray-900', className)}>
      {children}
    </h2>
  )
}
