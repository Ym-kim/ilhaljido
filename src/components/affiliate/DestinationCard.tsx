'use client'

import { ArrowUpRight, Clock } from 'lucide-react'
import type { DestinationEntry, ServiceLink } from '@/lib/affiliate/destinations'
import { trackAffiliateClick } from '@/lib/track'

// active_affiliate/api_ready → 브랜드 블루 filled CTA, 실제 수익 추적
// approved_needs_link/needs_referral_link/approved_needs_course_links → 회색 outline, 링크 대기
// placeholder/manual_link/pending_approval → 연회색 외부 링크

function ServiceButton({ link }: { link: ServiceLink }) {
  const isActive = link.status === 'active_affiliate' || link.status === 'api_ready'
  const isPending = [
    'approved_needs_link',
    'approved_needs_course_links',
    'needs_referral_link',
  ].includes(link.status)

  const rel = isActive
    ? 'sponsored noopener noreferrer'
    : 'noopener noreferrer'

  return (
    <a
      href={link.href}
      target="_blank"
      rel={rel}
      onClick={() => trackAffiliateClick({ provider: link.provider, status: link.status })}
      className={`inline-flex items-center gap-1.5 text-[0.75rem] font-bold px-3.5 py-2 rounded-full transition-all duration-150 ${
        isActive
          ? 'bg-brand-mid text-white shadow-sm hover:bg-brand-light hover:shadow-md'
          : isPending
          ? 'border border-[#e2e8f0] text-[#94a3b8] hover:border-[#cbd5e1] hover:text-[#64748b]'
          : 'border border-[#e2e8f0] text-[#94a3b8] hover:border-[#cbd5e1] hover:text-[#64748b]'
      }`}
    >
      {link.provider}
      {isPending && <Clock className="w-2.5 h-2.5 opacity-60" />}
      {isActive && <ArrowUpRight className="w-3 h-3" />}
    </a>
  )
}

interface DestinationCardProps {
  entry: DestinationEntry
  className?: string
}

export function DestinationCard({ entry, className = '' }: DestinationCardProps) {
  const hasActive = entry.links.some(
    (l) => l.status === 'active_affiliate' || l.status === 'api_ready'
  )

  return (
    <div
      id={entry.id}
      className={`group relative flex flex-col bg-white border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg scroll-mt-28 ${
        hasActive ? 'border-[#bae6fd] hover:border-[#7dd3fc]' : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
      } ${className}`}
    >
      {/* 목적지 사진 헤더 */}
      <div className="relative h-36 overflow-hidden bg-[#eff6ff]">
        {entry.photo ? (
          <img
            src={entry.photo}
            alt={entry.city}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#e0f2fe] to-[#f0f9ff] flex items-center justify-center">
            <span className="text-5xl opacity-40 select-none">{entry.flag}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

        {/* 도시명 — 사진 위 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-white/75 text-[0.7rem] font-medium drop-shadow">{entry.country}</p>
            <p className="text-white font-black text-xl leading-tight drop-shadow-lg">
              {entry.flag} {entry.city}
            </p>
          </div>
        </div>

        {/* 태그 — 우상단 */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[70%]">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#0369a1] shadow-sm backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Service links */}
      <div className="flex flex-wrap gap-1.5 p-4">
        {entry.links.map((link) => (
          <ServiceButton key={`${entry.id}-${link.provider}`} link={link} />
        ))}
      </div>
    </div>
  )
}
