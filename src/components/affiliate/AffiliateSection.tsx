'use client'

import { AffiliateCard } from './AffiliateCard'
import type { AffiliateItem } from '@/lib/affiliate/types'
import type { Lang } from '@/lib/i18n'
import { useLang } from '@/context/LanguageContext'

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

// ─── Disclosure 문구 (3개 언어) ──────────────────────────────────────────────
const DISCLOSURE: Record<Lang, { affiliate: string; line2: string; line3: string; external: string }> = {
  KO: {
    affiliate:
      '* 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다. ' +
      '외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.',
    line2: 'Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.',
    line3: '요금과 상품 조건은 제휴사 사이트에서 최종 확인됩니다.',
    external:
      '* 일부 링크는 일반 외부 링크이며, 제휴 추적이 아직 적용되지 않았을 수 있습니다. ' +
      '외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.',
  },
  EN: {
    affiliate:
      '* Some external links are affiliate links and may earn Wakation a commission. ' +
      'Bookings, payments, refunds and terms are governed by each external service.',
    line2: 'Wakation-hosted programs are separate from partner services.',
    line3: "Prices and product terms are confirmed on the partner's site.",
    external:
      '* Some links are plain external links where affiliate tracking may not yet apply. ' +
      'Bookings, payments, refunds and terms are governed by each external service.',
  },
  JP: {
    affiliate:
      '* 一部の外部リンクはアフィリエイトによりWakationに収益が発生する場合があります。' +
      '予約・決済・返金・利用条件は各サービスの規約に従います。',
    line2: 'Wakation直営プログラムと外部提携サービスは区別されます。',
    line3: '料金と商品条件は提携先サイトで最終確認されます。',
    external:
      '* 一部のリンクは一般的な外部リンクで、提携トラッキングが未適用の場合があります。' +
      '予約・決済・返金・利用条件は各サービスの規約に従います。',
  },
}

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
  const { lang } = useLang()
  const disc = DISCLOSURE[lang] ?? DISCLOSURE.KO
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
                <p className={`text-[0.65rem] leading-relaxed ${light ? 'text-[#a8a29e]' : 'text-white/20'}`}>{disc.affiliate}</p>
                <p className={`text-[0.65rem] leading-relaxed ${light ? 'text-[#c0bcb6]' : 'text-white/15'}`}>{disc.line2}</p>
                <p className={`text-[0.65rem] leading-relaxed ${light ? 'text-[#c0bcb6]' : 'text-white/15'}`}>{disc.line3}</p>
              </>
            ) : (
              <p className={`text-[0.65rem] leading-relaxed ${light ? 'text-[#a8a29e]' : 'text-white/20'}`}>{disc.external}</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
