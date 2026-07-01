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

// disclosure는 active_affiliate 또는 api_ready 항목이 하나라도 있을 때만 표시
const ACTIVE_STATUSES = new Set(['active_affiliate', 'api_ready'])

const DISCLOSURE_DEFAULT =
  '* 일부 외부 링크는 제휴 마케팅 프로그램을 통해 수익이 발생할 수 있습니다. ' +
  'Wakation이 해당 서비스의 품질을 보증하지 않으며, 이용 전 각 서비스 약관을 확인하세요.'

export function AffiliateSection({
  eyebrow,
  title,
  subtitle,
  items,
  disclosure,
  cols = 3,
}: AffiliateSectionProps) {
  // coming_soon 자동 제외
  const visibleItems = items.filter((i) => i.status !== 'coming_soon')
  if (visibleItems.length === 0) return null

  const hasActiveAffiliate = visibleItems.some((i) => ACTIVE_STATUSES.has(i.status))

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
          {visibleItems.map((item) => (
            <AffiliateCard key={item.id} item={item} />
          ))}
        </div>
        {/* disclosure: active_affiliate 항목이 있을 때만 표시 */}
        {hasActiveAffiliate && (
          <p className="mt-8 text-white/25 text-[0.65rem] leading-relaxed max-w-2xl">
            {disclosure ?? DISCLOSURE_DEFAULT}
          </p>
        )}
      </div>
    </section>
  )
}
