'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 프로모 티커 — 히어로 직하단 어필리에이트 상품 롤링 배너 (CSS marquee, JS 0)
// 활성 제휴 상품·지원사업만 큐레이션. 항목 교체는 ITEMS만 수정
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

type TickerItem = {
  id: string
  emoji: string
  href: string
  external?: boolean
  sponsored?: boolean
  label: L
  tag: L
}

const ITEMS: TickerItem[] = [
  {
    id: 'ticker-gov-support', emoji: '🏛', href: '/programs/support',
    label: { KO: '정부 지원 워케이션 — 상시 모집 6곳', EN: 'Gov-supported workations — 6 rolling programs', JP: '政府支援ワーケーション — 随時募集6件' },
    tag: { KO: '지원사업', EN: 'Support', JP: '支援事業' },
  },
  {
    id: 'ticker-teamlab', emoji: '🪐', href: 'https://www.klook.com/ko/activity/25300-teamlab-planets-toyosu-tokyo-ticket/?aid=126848', external: true, sponsored: true,
    label: { KO: '팀랩 플래닛 도쿄 티켓', EN: 'teamLab Planets TOKYO ticket', JP: 'チームラボプラネッツTOKYO' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-japan-esim', emoji: '📡', href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim', external: true, sponsored: true,
    label: { KO: '일본 eSIM — 도착 전 5분 설치', EN: 'Japan eSIM — install before you land', JP: '日本eSIM — 到着前に5分で設置' },
    tag: { KO: 'Airalo', EN: 'Airalo', JP: 'Airalo' },
  },
  {
    id: 'ticker-osaka-pass', emoji: '🎫', href: 'https://www.klook.com/ko/activity/82312-amazing-pass-osaka/?aid=126848', external: true, sponsored: true,
    label: { KO: '오사카 주유패스 — 교통+40곳 입장', EN: 'Osaka Amazing Pass — transit + 40 spots', JP: '大阪周遊パス — 交通＋40カ所' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-lyf-bangkok', emoji: '🛋', href: 'https://www.booking.com/hotel/th/lyf-sukhumvit-8-bangkok.html?aid=7854081', external: true, sponsored: true,
    label: { KO: '방콕 코리빙 lyf 수쿰빗 8', EN: 'lyf Sukhumvit 8 Bangkok co-living', JP: 'バンコク コリビング lyf' },
    tag: { KO: 'Booking', EN: 'Booking', JP: 'Booking' },
  },
  {
    id: 'ticker-flight', emoji: '✈️', href: 'https://kr.trip.com/flights/?Allianceid=9024807', external: true, sponsored: true,
    label: { KO: '항공권 요금 비교 — 전 노선', EN: 'Compare flight fares — all routes', JP: '航空券の料金比較 — 全路線' },
    tag: { KO: 'Trip.com', EN: 'Trip.com', JP: 'Trip.com' },
  },
  {
    id: 'ticker-japan-towns', emoji: '🗻', href: '/japan-towns',
    label: { KO: '일본 소도시 — 료칸·온천 워케이션', EN: 'Japan small towns — ryokan & onsen', JP: '日本の小都市 — 旅館・温泉' },
    tag: { KO: 'NEW', EN: 'NEW', JP: 'NEW' },
  },
]

function TickerChip({ item, lang }: { item: TickerItem; lang: Lang }) {
  const cls =
    'shrink-0 inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.14] border border-white/12 rounded-full pl-3 pr-4 py-2 transition-colors'
  const inner = (
    <>
      <span className="text-base leading-none">{item.emoji}</span>
      <span className="text-[0.6rem] font-black px-1.5 py-0.5 rounded-full bg-sky-400/20 text-sky-300 uppercase tracking-wide">
        {item.tag[lang]}
      </span>
      <span className="text-white/85 text-xs font-bold whitespace-nowrap">{item.label[lang]}</span>
    </>
  )
  const onClick = () => {
    try { track('promo_ticker_clicked', { id: item.id }) } catch {}
  }
  return item.external ? (
    <a href={item.href} target="_blank" rel={item.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} onClick={onClick} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={item.href} onClick={onClick} className={cls}>
      {inner}
    </Link>
  )
}

export function PromoTicker() {
  const { lang } = useLang()
  // 이음새 없는 무한 루프 — 동일 목록 2회 렌더 (두 번째는 스크린리더 제외)
  return (
    <div className="bg-[#04121f] border-b border-white/8 overflow-hidden py-2.5 group/ticker">
      <div className="flex w-max gap-2.5 animate-ticker group-hover/ticker:[animation-play-state:paused] motion-reduce:animate-none">
        <div className="flex gap-2.5 pr-2.5">
          {ITEMS.map((i) => <TickerChip key={i.id} item={i} lang={lang} />)}
        </div>
        <div className="flex gap-2.5 pr-2.5" aria-hidden>
          {ITEMS.map((i) => <TickerChip key={`${i.id}-dup`} item={i} lang={lang} />)}
        </div>
      </div>
    </div>
  )
}
