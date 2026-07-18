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
  tone?: 'dark' | 'light'
}

const ACTIVE_STATUSES = new Set(['active_affiliate', 'api_ready'])
const PUBLIC_EXTERNAL_STATUSES = new Set([
  'public_external_link',
  'manual_link',
  'placeholder',
])

const DISCLOSURE: Record<Lang, { summary: string; affiliate: string; line2: string; line3: string; external: string }> = {
  KO: {
    summary: '예약 전 확인',
    affiliate: '* 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다. 예약·결제·환불·이용 조건은 각 서비스의 정책을 따릅니다.',
    line2: 'Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.',
    line3: '요금과 상품 조건은 제휴사 사이트에서 최종 확인합니다.',
    external: '* 일부 링크는 일반 외부 링크이며, 제휴 추적이 아직 적용되지 않을 수 있습니다. 예약·결제·환불·이용 조건은 각 서비스의 정책을 따릅니다.',
  },
  EN: {
    summary: 'Before booking',
    affiliate: '* Some external links are affiliate links and may earn Wakation a commission. Bookings, payments, refunds and terms are governed by each external service.',
    line2: 'Wakation-hosted programs are separate from partner services.',
    line3: "Prices and product terms are confirmed on the partner's site.",
    external: '* Some links are plain external links where affiliate tracking may not yet apply. Bookings, payments, refunds and terms are governed by each external service.',
  },
  JP: {
    summary: '予約前の確認',
    affiliate: '* 一部の外部リンクはアフィリエイトリンクであり、Wakationに収益が発生する場合があります。予約・決済・返金・利用条件は各サービスの規定に従います。',
    line2: 'Wakationが直接運営するプログラムと外部提携サービスは区別されます。',
    line3: '料金と商品条件は提携先サイトで最終確認してください。',
    external: '* 一部は通常の外部リンクで、アフィリエイト計測が適用されていない場合があります。予約・決済・返金・利用条件は各サービスの規定に従います。',
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
  const visibleItems = items.filter((i) => i.status !== 'coming_soon')
  if (visibleItems.length === 0) return null

  const hasActiveAffiliate = visibleItems.some((i) => ACTIVE_STATUSES.has(i.status))
  const hasPublicExternal = visibleItems.some((i) => PUBLIC_EXTERNAL_STATUSES.has(i.status))
  const showDisclosure = hasActiveAffiliate || hasPublicExternal
  const gridCols = cols === 2
    ? 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className={light ? 'border-t border-[#e0f2fe] bg-white px-6 py-16' : 'border-t border-white/8 bg-[#111] px-6 py-16'}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <span className={`mb-3 block text-[0.65rem] font-black uppercase tracking-[0.2em] ${light ? 'text-brand-mid' : 'text-sky-500/70'}`}>
            {eyebrow}
          </span>
          <h2 className={`mb-2 text-2xl font-black ${light ? 'text-[#111827]' : 'text-white'}`}>{title}</h2>
          {subtitle && (
            <span className={`block max-w-2xl text-sm leading-relaxed ${light ? 'text-[#64748b]' : 'text-white/40'}`}>{subtitle}</span>
          )}
        </div>
        <div className={`grid ${gridCols} gap-4`}>
          {visibleItems.map((item) => (
            <AffiliateCard key={item.id} item={item} visual={light} />
          ))}
        </div>
        {showDisclosure && (
          <details className={`group mt-8 max-w-2xl border-t pt-4 ${light ? 'border-[#e8e4dd]' : 'border-white/10'}`}>
            <summary className={`w-fit cursor-pointer list-none text-[0.7rem] font-bold underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden ${light ? 'text-[#77716a]' : 'text-white/45'}`}>
              {disc.summary}
              <span aria-hidden="true" className="ml-1 inline-block transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className={`mt-3 space-y-1 text-[0.65rem] leading-relaxed ${light ? 'text-[#918b83]' : 'text-white/30'}`}>
              {disclosure ? (
                <span className="block">{disclosure}</span>
              ) : hasActiveAffiliate ? (
                <>
                  <span className="block">{disc.affiliate}</span>
                  <span className="block">{disc.line2}</span>
                  <span className="block">{disc.line3}</span>
                </>
              ) : (
                <span className="block">{disc.external}</span>
              )}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}
