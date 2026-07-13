'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { GeoGate } from '@/components/GeoGate'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { track } from '@vercel/analytics/react'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 일본(JP) 접속자 전용 컨텍스트 배너 — #국가 지정 게시 의 첫 적용(가장 필요한 국가=일본)
// 실제 일본 워케이션 콘텐츠(소도시·온천·eSIM)로 연결. JP 지오에서만 노출(GeoGate).
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  tag: { KO: '일본에서 접속', EN: 'Visiting from Japan', JP: '日本からのアクセス' },
  title: {
    KO: '일본 소도시 워케이션 — 료칸·온천에서 일하기',
    EN: 'Japan small-town workation — work from ryokan & onsen towns',
    JP: '日本の小都市ワーケーション — 旅館・温泉で働く',
  },
  cta: { KO: '일본 워케이션 보기', EN: 'See Japan workation', JP: '日本のワーケーションを見る' },
}

export function GeoJapanBanner() {
  const { lang } = useLang()
  return (
    <GeoGate only={['JP']}>
      <div className="bg-[#0a1e33] border-b border-white/8 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4">
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-black tracking-wide uppercase text-rose-300 bg-rose-400/12 px-2.5 py-1 rounded-full shrink-0 self-start">
            <MapPin className="w-3 h-3" strokeWidth={ICON_STROKE} />
            {COPY.tag[lang]}
          </span>
          <p className="text-white/90 text-sm font-bold flex-1">{COPY.title[lang]}</p>
          <Link
            href="/programs/onsen"
            onClick={() => { try { track('geo_japan_banner_clicked') } catch {} }}
            className="shrink-0 inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/16 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
          >
            {COPY.cta[lang]}
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </div>
    </GeoGate>
  )
}
