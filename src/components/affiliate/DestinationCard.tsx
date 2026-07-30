'use client'

import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { DestinationEntry, ServiceLink } from '@/lib/affiliate/destinations'
import { trackAffiliateClick } from '@/lib/track'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

const IMAGE_LABEL: Record<Lang, string> = {
  KO: '지역 무드',
  EN: 'Destination mood',
  JP: '旅先のイメージ',
}

const ALT_SUFFIX: Record<Lang, string> = {
  KO: '워케이션',
  EN: 'workation',
  JP: 'ワーケーション',
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
      className={`flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-[0.8125rem] font-bold transition-all duration-200 ${
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
      data-ui-card="destination"
      className={`wak-card-destination group relative flex h-full scroll-mt-28 flex-col overflow-hidden border bg-white shadow-[0_10px_35px_rgba(8,47,73,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(8,47,73,0.12)] ${
        hasActive ? 'border-[#bae6fd] hover:border-[#7dd3fc]' : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
      } ${className}`}
    >
      {/* 목적지 사진 헤더 */}
      <div className="relative aspect-[3/2] overflow-hidden bg-[#e9f0f2]">
        {entry.photo ? (
          <Image
            src={entry.photo}
            alt={`${entry.city} ${ALT_SUFFIX[lang]}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className={`relative flex h-full w-full items-end bg-gradient-to-br ${entry.gradient} p-4`}>
            <div className="absolute inset-x-4 top-4 h-px bg-white/25" />
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/65">Wakation city guide</span>
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
            <p className="wak-card-title text-xl text-white drop-shadow-lg">
              {entry.city}
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
      <div className="mt-auto p-4">
        {primary && <PrimaryButton link={primary} />}
      </div>
    </div>
  )
}
