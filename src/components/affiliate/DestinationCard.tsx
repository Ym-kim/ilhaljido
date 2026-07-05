'use client'

import { ArrowUpRight, Clock } from 'lucide-react'
import type { DestinationEntry, ServiceLink } from '@/lib/affiliate/destinations'

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
      className={`relative flex flex-col bg-white border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg scroll-mt-28 ${
        hasActive ? 'border-[#bae6fd] hover:border-[#7dd3fc]' : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
      } ${className}`}
    >
      {hasActive && (
        <div className="absolute top-0 inset-x-6 h-[2px] rounded-b bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl leading-none">{entry.flag}</span>
        <div className="flex flex-wrap gap-1 justify-end">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-[#f0f9ff] text-[#0369a1] border border-[#e0f2fe]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Destination name */}
      <p className="text-[0.7rem] text-[#94a3b8] font-medium mb-0.5">{entry.country}</p>
      <p className="text-[#111827] font-black text-lg mb-4 leading-tight">{entry.city}</p>

      {/* Service links */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {entry.links.map((link) => (
          <ServiceButton key={`${entry.id}-${link.provider}`} link={link} />
        ))}
      </div>
    </div>
  )
}
