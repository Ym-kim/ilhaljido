import { LucideIcon } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { cn } from '@/lib/utils'

type Props = {
  icon: LucideIcon
  size?: 'md' | 'lg'
  onDark?: boolean
  className?: string
}

export function IconTile({ icon: Icon, size = 'md', onDark, className }: Props) {
  const dim = size === 'lg' ? 'w-5 h-5' : 'w-[1.35rem] h-[1.35rem]'

  return (
    <span className={cn('icon-tile', size === 'lg' && 'icon-tile-lg', onDark && 'icon-tile-on-dark', className)}>
      <Icon className={dim} strokeWidth={ICON_STROKE} aria-hidden />
    </span>
  )
}
