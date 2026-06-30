'use client'

import { AffiliateCard } from './AffiliateCard'
import type { AffiliateItem } from '@/lib/affiliate/types'

interface AffiliateSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: AffiliateItem[]
  disclosure?: string
  cols?: 2 | 3
}

const DISCLOSURE_DEFAULT =
  '* 아래 링크는 제휴 마케팅 프로그램을 통해 수익이 발생할 수 있는 외부 서비스 링크입니다. ' +
  'Wakation이 해당 서비스의 품질을 보증하지 않으며, 이용 전 각 서비스의 약관을 확인하세요.'

export function AffiliateSection({
  eyebrow,
  title,
  subtitle,
  items,
  disclosure,
  cols = 3,
}: AffiliateSectionProps) {
  const gridCols =
    cols === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="py-16 px-6 bg-[#111] border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          {eyebrow && (
            <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-black text-white mb-2">{title}</h2>
          {subtitle && (
            <p className="text-white/40 text-sm leading-relaxed max-w-2xl">{subtitle}</p>
          )}
        </div>
        <div className={`grid ${gridCols} gap-4`}>
          {items.map((item) => (
            <AffiliateCard key={item.id} item={item} />
          ))}
        </div>
        <p className="mt-8 text-white/25 text-[0.65rem] leading-relaxed max-w-2xl">
          {disclosure ?? DISCLOSURE_DEFAULT}
        </p>
      </div>
    </section>
  )
}
