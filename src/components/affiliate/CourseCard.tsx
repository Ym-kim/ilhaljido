'use client'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { AffiliateItem } from '@/lib/affiliate/types'
import { trackAffiliateClick } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 강의 전용 카드 (2026-08-18, 운영자 지시 — 클래스101풍 정돈)
// 커버(4:3) → 카테고리 아이브로 → 제목 2줄 → 가격/제공자 한 줄. desc 미표기.
// ⚠️ 다크 섹션에서도 쓰이므로 흰 카드 내부 텍스트는 전부 span (.dark-surface p 함정)
// ─────────────────────────────────────────────────────────────────────────────

export function CourseCard({ item, lang }: { item: AffiliateItem; lang: Lang }) {
  const sponsored = item.status === 'active_affiliate'
  return (
    <a
      href={item.href}
      target="_blank"
      rel={sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
      onClick={() =>
        trackAffiliateClick({
          id: item.id,
          itemName: item.productTitle ?? item.name,
          provider: item.name,
          status: item.status,
          sourceSection: 'course_card',
          ctaLabel: item.cta ?? 'view',
          ctaPosition: 'card',
          destination: item.destination ?? 'online',
          category: item.category,
          locale: lang,
        })
      }
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93c5fd] hover:shadow-lg"
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-[#f1f5f9]">
        {item.coverPhoto && (
          <Image
            src={item.coverPhoto}
            alt={item.productTitle ?? item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
        {item.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.65rem] font-bold text-white backdrop-blur">
            {item.badge}
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col p-4">
        {item.destination && (
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#64748b]">{item.destination}</span>
        )}
        <span className="mt-1.5 line-clamp-2 text-[0.9375rem] font-bold leading-snug text-[#111827]">
          {item.productTitle ?? item.name}
        </span>
        <span className="mt-auto flex items-end justify-between pt-4">
          <span className="text-base font-black text-[#0f172a]">{item.priceFrom}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#64748b] transition-colors group-hover:text-brand-mid">
            {item.name}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </span>
        </span>
      </span>
    </a>
  )
}
