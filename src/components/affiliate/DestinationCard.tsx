'use client'

import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { DestinationEntry, ServiceLink } from '@/lib/affiliate/destinations'
import { trackAffiliateClick } from '@/lib/track'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

const IMAGE_LABEL: Record<Lang, string> = {
  KO: '편집 이미지',
  EN: 'Editorial image',
  JP: 'イメージ画像',
}

// active_affiliate/api_ready → 브랜드 블루 filled CTA, 실제 수익 추적
// approved_needs_link/needs_referral_link/approved_needs_course_links → 회색 outline, 링크 대기
// placeholder/manual_link/pending_approval → 연회색 외부 링크

// 단일 CTA — 파트너별 버튼 분리 대신 대표 파트너 1개로 통일 (2026-07-15 운영자 지시)
// 우선순위: 활성 파트너 중 Trip.com(국내 MAU 1위) → 활성 아무거나 → 첫 링크
function PrimaryButton({ link }: { link: ServiceLink }) {
  const isActive = link.status === 'active_affiliate' || link.status === 'api_ready'
  const rel = isActive ? 'sponsored noopener noreferrer' : 'noopener noreferrer'

  return (
    <a
      href={link.href}
      target="_blank"
      rel={rel}
      onClick={() => trackAffiliateClick({ provider: link.provider, status: link.status })}
      className={`flex w-full items-center justify-center gap-1.5 text-[0.8125rem] font-bold px-4 py-2.5 rounded-xl transition-all duration-150 ${
        isActive
          ? 'bg-brand-mid text-white shadow-sm hover:bg-brand-light hover:shadow-md'
          : 'border border-[#e2e8f0] text-[#94a3b8] hover:border-[#cbd5e1] hover:text-[#64748b]'
      }`}
    >
      {link.label}
      <span className={`text-[0.6875rem] font-semibold ${isActive ? 'text-white/70' : 'text-[#cbd5e1]'}`}>
        · {link.provider}
      </span>
      {isActive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3 opacity-60" />}
    </a>
  )
}

function pickPrimaryLink(links: ServiceLink[]): ServiceLink | null {
  if (links.length === 0) return null
  const actives = links.filter((l) => l.status === 'active_affiliate' || l.status === 'api_ready')
  return actives.find((l) => l.provider === 'Trip.com') ?? actives[0] ?? links[0]
}

interface DestinationCardProps {
  entry: DestinationEntry
  className?: string
}

export function DestinationCard({ entry, className = '' }: DestinationCardProps) {
  const { lang } = useLang()
  const hasActive = entry.links.some(
    (l) => l.status === 'active_affiliate' || l.status === 'api_ready'
  )
  const primary = pickPrimaryLink(entry.links)

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
          <Image
            src={entry.photo}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#e0f2fe] to-[#f0f9ff] flex items-center justify-center">
            <span className="text-5xl opacity-40 select-none">{entry.flag}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

        {entry.photo && (
          <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/35 px-2 py-1 text-[0.55rem] font-semibold text-white/80 backdrop-blur-sm">
            {IMAGE_LABEL[lang]}
          </span>
        )}

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

      {/* 대표 파트너 단일 CTA */}
      <div className="p-4">
        {primary && <PrimaryButton link={primary} />}
      </div>
    </div>
  )
}
