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
  /** light: 밝은 커머스 페이지용 (visual 카드) */
  tone?: 'dark' | 'light'
}

// ─── 수익 추적 활성 statuses ─────────────────────────────────────────────────
const ACTIVE_STATUSES = new Set(['active_affiliate', 'api_ready'])

// ─── 외부 링크 (클릭 가능, 수익 추적 없음) ───────────────────────────────────
const PUBLIC_EXTERNAL_STATUSES = new Set([
  'public_external_link',
  'manual_link',
  'placeholder',
])

// ─── Disclosure 문구 ─────────────────────────────────────────────────────────
const DISCLOSURE_AFFILIATE =
  '* 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다. ' +
  '외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.'

const DISCLOSURE_AFFILIATE_LINE2 =
  'Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.'

const DISCLOSURE_PUBLIC_EXTERNAL =
  '* 일부 링크는 일반 외부 링크이며, 제휴 추적이 아직 적용되지 않았을 수 있습니다. ' +
  '외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.'

export function AffiliateSection({
  eyebrow = 'WAKATION SELECT',
  title,
  subtitle,
  items,
  disclosure,
  cols = 3,
  tone = 'dark',
}: AffiliateSectionProps) {
  const light = tone === 'light'
  // coming_soon 자동 제외
  const visibleItems = items.filter((i) => i.status !== 'coming_soon')
  if (visibleItems.length === 0) return null

  const hasActiveAffiliate = visibleItems.some((i) => ACTIVE_STATUSES.has(i.status))
  const hasPublicExternal = visibleItems.some((i) => PUBLIC_EXTERNAL_STATUSES.has(i.status))
  const showDisclosure = hasActiveAffiliate || hasPublicExternal

  const gridCols =
    cols === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className={light ? 'py-16 px-6 bg-white border-t border-[#e0f2fe]' : 'py-16 px-6 bg-[#111] border-t border-white/8'}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className={`text-[0.65rem] font-black tracking-[0.2em] uppercase mb-3 ${light ? 'text-brand-mid' : 'text-teal-500/60'}`}>
            {eyebrow}
          </p>
          <h2 className={`text-2xl font-black mb-2 ${light ? 'text-[#111827]' : 'text-white'}`}>{title}</h2>
          {subtitle && (
            <p className={`text-sm leading-relaxed max-w-2xl ${light ? 'text-[#64748b]' : 'text-white/40'}`}>{subtitle}</p>
          )}
        </div>
        <div className={`grid ${gridCols} gap-4`}>
          {visibleItems.map((item) => (
            <AffiliateCard key={item.id} item={item} visual={light} />
          ))}
        </div>
        {/* Disclosure — active_affiliate: 제휴 문구, public_external만 있을 때: 일반 외부 링크 문구 */}
        {showDisclosure && (
          <div className="mt-8 space-y-1 max-w-2xl">
            {disclosure ? (
              <p className={`text-[0.65rem] leading-relaxed ${light ? 'text-[#a8a29e]' : 'text-white/20'}`}>{disclosure}</p>
            ) : hasActiveAffiliate ? (
              <>
                <p className={`text-[0.65rem] leading-relaxed ${light ? 'text-[#a8a29e]' : 'text-white/20'}`}>{DISCLOSURE_AFFILIATE}</p>
                <p className={`text-[0.65rem] leading-relaxed ${light ? 'text-[#c0bcb6]' : 'text-white/15'}`}>{DISCLOSURE_AFFILIATE_LINE2}</p>
              </>
            ) : (
              <p className={`text-[0.65rem] leading-relaxed ${light ? 'text-[#a8a29e]' : 'text-white/20'}`}>{DISCLOSURE_PUBLIC_EXTERNAL}</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
