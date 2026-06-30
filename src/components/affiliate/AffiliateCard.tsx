'use client'

import { ArrowUpRight } from 'lucide-react'
import type { AffiliateItem } from '@/lib/affiliate/types'

interface AffiliateCardProps {
  item: AffiliateItem
  className?: string
}

export function AffiliateCard({ item, className = '' }: AffiliateCardProps) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={`group block bg-[#1a1a1a] border border-white/8 rounded-2xl p-5 hover:border-white/20 transition-all ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{item.emoji}</span>
        <div className="flex items-center gap-1.5">
          {item.badge && (
            <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/8 text-white/45 border border-white/10">
              {item.badge}
            </span>
          )}
          <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/8">
            외부 서비스
          </span>
        </div>
      </div>
      <p className="text-white font-bold text-sm mb-1">{item.name}</p>
      <p className="text-white/40 text-xs leading-relaxed mb-4">{item.desc}</p>
      <div className="flex items-center gap-1 text-white/45 text-xs font-bold group-hover:text-white/70 transition-colors">
        {item.cta} <ArrowUpRight className="w-3 h-3" />
      </div>
    </a>
  )
}
