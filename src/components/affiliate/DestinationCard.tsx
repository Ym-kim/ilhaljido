'use client'

import { ArrowUpRight, Clock } from 'lucide-react'
import type { DestinationEntry, ServiceLink } from '@/lib/affiliate/destinations'

// active_affiliate/api_ready → teal, 실제 수익 추적
// approved_needs_link/needs_referral_link/approved_needs_course_links → amber, 링크 대기
// placeholder/manual_link/pending_approval → gray, 일반 외부 링크

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
      className={`inline-flex items-center gap-1.5 text-[0.7rem] font-bold px-3 py-1.5 rounded-full border transition-all duration-150 ${
        isActive
          ? 'border-teal-500/35 text-teal-300/90 hover:border-teal-500/60 hover:text-teal-200 hover:bg-teal-500/8'
          : isPending
          ? 'border-amber-500/20 text-amber-400/55 hover:border-amber-500/35 hover:text-amber-400/80'
          : 'border-white/10 text-white/35 hover:border-white/20 hover:text-white/55'
      }`}
    >
      <span>{link.emoji}</span>
      {link.provider}
      {isPending && <Clock className="w-2.5 h-2.5 opacity-60" />}
      {isActive && <ArrowUpRight className="w-2.5 h-2.5" />}
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

  // 첫 번째 링크를 주 CTA로
  const primaryLink = entry.links[0]

  return (
    <div
      className={`relative flex flex-col bg-gradient-to-b ${entry.gradient} border border-white/8 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {hasActive && (
        <div className="absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl leading-none">{entry.flag}</span>
        <div className="flex flex-wrap gap-1 justify-end">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/6 text-white/40 border border-white/8"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Destination name */}
      <p className="text-[0.7rem] text-white/40 font-medium mb-0.5">{entry.country}</p>
      <p className="text-white font-black text-lg mb-4 leading-tight">{entry.city}</p>

      {/* Service links */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {entry.links.map((link) => (
          <ServiceButton key={`${entry.id}-${link.provider}`} link={link} />
        ))}
      </div>
    </div>
  )
}
