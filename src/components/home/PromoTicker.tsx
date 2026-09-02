'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { localizeHref } from '@/lib/i18n/localePath'
import type { Lang } from '@/lib/i18n/types'
import { trackAffiliateClick, trackEvent } from '@/lib/track'

type L = Record<Lang, string>

type TickerItem = {
  id: string
  photo?: string
  price?: string
  href: string
  external?: boolean
  sponsored?: boolean
  category?: 'activity' | 'esim' | 'transport' | 'hotel'
  destination?: string
  label: L
  tag: L
}

const INTRO: Record<Lang, { label: string; sub: string }> = {
  KO: { label: '이번 주 추천', sub: '머무는 여행을 위한 선택' },
  EN: { label: 'This week', sub: 'Picked for longer stays' },
  JP: { label: '今週のおすすめ', sub: '長く滞在する旅のために' },
}

const MOTION_COPY: Record<Lang, { pause: string; play: string }> = {
  KO: { pause: '추천 흐름 멈추기', play: '추천 흐름 재생하기' },
  EN: { pause: 'Pause recommendations', play: 'Play recommendations' },
  JP: { pause: 'おすすめの流れを停止', play: 'おすすめの流れを再生' },
}

const ITEMS: TickerItem[] = [
  {
    id: 'ticker-gov-support', href: '/programs/support',
    // 2026-08-04 동기: data.ts SUPPORT_PROGRAMS status:'always' 실카운트 7건 (드리프트 정정)
    label: { KO: '정부 지원 워케이션 — 상시 모집 7곳', EN: 'Gov-supported workations — 7 rolling programs', JP: '政府支援ワーケーション — 随時募集7件' },
    tag: { KO: '지원사업', EN: 'Support', JP: '支援事業' },
  },
  {
    id: 'ticker-teamlab', price: 'JPY 3,600~', category: 'activity', destination: 'tokyo',
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F25300-teamlab-planets-toyosu-tokyo-ticket%2F', external: true, sponsored: true,
    label: { KO: '팀랩 플래닛 도쿄 티켓', EN: 'teamLab Planets TOKYO ticket', JP: 'チームラボプラネッツTOKYO' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-japan-esim', price: 'US$11.50~', category: 'esim', destination: 'japan',
    href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim', external: true, sponsored: true,
    label: { KO: '일본 eSIM — 도착 전 5분 설치', EN: 'Japan eSIM — install before you land', JP: '日本eSIM — 到着前に5分で設置' },
    tag: { KO: 'Airalo', EN: 'Airalo', JP: 'Airalo' },
  },
  {
    id: 'ticker-bellissima', price: '₩341,523~', category: 'transport', destination: 'korea',
    href: 'https://kr.trip.com/cruises/ship-msc-mscbellissima-496?curr=KRW&Allianceid=9024807', external: true, sponsored: true,
    label: { KO: 'MSC 벨리시마 — 한국 출발 크루즈', EN: 'MSC Bellissima — cruises from Korea', JP: 'MSCベリッシマ — 韓国発クルーズ' },
    tag: { KO: 'Trip.com', EN: 'Trip.com', JP: 'Trip.com' },
  },
  {
    id: 'ticker-osaka-pass', price: '₩32,100~', category: 'transport', destination: 'osaka',
    href: 'https://www.klook.com/ko/activity/82312-amazing-pass-osaka/?aid=126848', external: true, sponsored: true,
    label: { KO: '오사카 주유패스 — 교통+40곳 입장', EN: 'Osaka Amazing Pass — transit + 40 spots', JP: '大阪周遊パス — 交通＋40カ所' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-lyf-bangkok', category: 'hotel', destination: 'bangkok',
    href: 'https://www.booking.com/hotel/th/lyf-sukhumvit-8-bangkok.html?aid=7854081', external: true, sponsored: true,
    label: { KO: '방콕 코리빙 lyf 수쿰빗 8', EN: 'lyf Sukhumvit 8 Bangkok co-living', JP: 'バンコク コリビング lyf' },
    tag: { KO: 'Booking', EN: 'Booking', JP: 'Booking' },
  },
  {
    id: 'ticker-flight', category: 'transport', destination: 'global',
    href: 'https://kr.trip.com/flights/?Allianceid=9024807', external: true, sponsored: true,
    label: { KO: '항공권 요금 비교 — 전 노선', EN: 'Compare flight fares — all routes', JP: '航空券の料金比較 — 全路線' },
    tag: { KO: 'Trip.com', EN: 'Trip.com', JP: 'Trip.com' },
  },
  {
    id: 'ticker-japan-towns', photo: '/covers/onsen-hero-real.jpeg',
    href: '/programs/onsen',
    label: { KO: '일본 소도시 — 료칸·온천 워케이션', EN: 'Japan small towns — ryokan & onsen', JP: '日本の小都市 — 旅館・温泉' },
    tag: { KO: '새 기획', EN: 'New edit', JP: '新着' },
  },
  {
    id: 'ticker-miracle', price: '₩120,000~', category: 'transport', destination: 'busan-osaka',
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F150798-busan-osaka-ferry-ticket%2F',
    external: true, sponsored: true,
    label: { KO: '부산—오사카 미라클호 — 뷔페 2식 포함', EN: 'Busan–Osaka ferry — 2 buffet meals in', JP: '釜山—大阪ミラクル号 — ビュッフェ2食付き' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    // 2026-08-04: 홈에서 도달 불가하던 추석 에디토리얼로 배선 (아티클이 세트 5개를 내부 연결 — 상위 퍼널)
    id: 'ticker-chuseok', href: '/campaign/chuseok-4days',
    label: { KO: '연차 없이 나흘 — 추석 워케이션 가이드', EN: 'Chuseok 4-day workation guide', JP: '有休なしで4日 — 秋夕ガイド' },
    tag: { KO: '시즌 기획', EN: 'Seasonal', JP: '季節特集' },
  },
  {
    id: 'ticker-eurail', price: '₩477,300~', category: 'transport', destination: 'europe',
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F9868-eurail-global-rail-pass%2F',
    external: true, sponsored: true,
    label: { KO: '유레일 글로벌 패스 — 유럽 33개국', EN: 'Eurail Global Pass — 33 countries', JP: 'ユーレイル グローバルパス — 33カ国' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
]

function TickerCard({ item, lang, position, duplicate = false }: { item: TickerItem; lang: Lang; position: number; duplicate?: boolean }) {
  const cls = 'group/item flex min-h-[74px] w-[272px] shrink-0 items-center gap-3 rounded-2xl border border-white/80 bg-white/82 px-4 py-3 shadow-[0_5px_18px_rgba(12,45,58,0.07)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-[0_10px_26px_rgba(12,45,58,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:w-[302px]'
  const inner = (
    <>
      {item.photo ? (
        <Image
          src={item.photo}
          alt=""
          width={56}
          height={56}
          sizes="56px"
          quality={78}
          unoptimized={item.photo.endsWith('.webp')}
          className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-black/5"
        />
      ) : (
        <span className="h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-sky-300 via-sky-500 to-[#075985]" aria-hidden />
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-[0.6rem] font-black uppercase tracking-[0.13em] text-[#167394]">
            {item.tag[lang]}
          </span>
          {item.price && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[0.65rem] font-black text-[#946100]">{item.price}</span>}
        </span>
        <span className="mt-1.5 block truncate text-[0.82rem] font-extrabold leading-5 text-[#132d39]">{item.label[lang]}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#91a6ae] transition-all group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-[#087294]" />
    </>
  )
  const onClick = () => {
    trackEvent('promo_ticker_clicked', { id: item.id, locale: lang, position: String(position) })
    if (item.external && item.sponsored) {
      trackAffiliateClick({
        id: item.id,
        itemName: item.label[lang],
        provider: item.tag.EN,
        status: 'active_affiliate',
        sourceSection: 'promo_ticker',
        ctaLabel: item.label[lang],
        ctaPosition: String(position),
        destination: item.destination,
        category: item.category,
        locale: lang,
      })
    }
  }

  return item.external ? (
    <a href={item.href} target="_blank" rel={item.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} onClick={onClick} className={cls} tabIndex={duplicate ? -1 : undefined}>
      {inner}
    </a>
  ) : (
    <Link href={localizeHref(item.href, lang)} onClick={onClick} className={cls} tabIndex={duplicate ? -1 : undefined}>
      {inner}
    </Link>
  )
}

export function PromoTicker() {
  const { lang } = useLang()
  const [paused, setPaused] = useState(false)

  const toggleMotion = () => {
    const next = !paused
    setPaused(next)
    trackEvent('promo_ticker_motion_toggled', { state: next ? 'paused' : 'playing', locale: lang })
  }

  return (
    <section
      className="overflow-hidden border-y border-[#d3e2e3] bg-[linear-gradient(105deg,#e6f1f0_0%,#edf5f4_45%,#e8f1f3_100%)] py-2 sm:py-3"
      data-home-monetization-after-intent="true"
    >
      <div className="mx-auto flex max-w-[1920px] items-stretch gap-2 overflow-hidden px-2 sm:gap-3 sm:px-3">
        <div className="relative z-10 hidden w-[218px] shrink-0 items-center justify-between rounded-[1.15rem] bg-[linear-gradient(135deg,#092f42,#0b4b5e)] px-5 text-white shadow-[0_10px_28px_rgba(8,47,73,0.16)] lg:flex">
          <span className="min-w-0">
            <span className="block text-[0.62rem] font-black uppercase tracking-[0.18em] text-sky-300">{INTRO[lang].label}</span>
            <span className="mt-1 block truncate text-[0.7rem] font-semibold text-white/65">{INTRO[lang].sub}</span>
          </span>
          <button
            type="button"
            onClick={toggleMotion}
            className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={paused ? MOTION_COPY[lang].play : MOTION_COPY[lang].pause}
            title={paused ? MOTION_COPY[lang].play : MOTION_COPY[lang].pause}
          >
            {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
          </button>
        </div>
        <button
          type="button"
          onClick={toggleMotion}
          className="flex min-h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0b3b4d] text-white shadow-sm transition-colors hover:bg-[#07506a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 lg:hidden"
          aria-label={paused ? MOTION_COPY[lang].play : MOTION_COPY[lang].pause}
          title={paused ? MOTION_COPY[lang].play : MOTION_COPY[lang].pause}
        >
          {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
        </button>
        <div className="group/ticker min-w-0 flex-1 overflow-hidden rounded-[1.15rem] [mask-image:linear-gradient(to_right,transparent_0%,black_3%,black_97%,transparent_100%)]">
          <div
            className="flex w-max animate-ticker motion-reduce:animate-none group-hover/ticker:[animation-play-state:paused] group-focus-within/ticker:[animation-play-state:paused]"
            style={{ animationDuration: '94s', animationPlayState: paused ? 'paused' : undefined }}
          >
            <div className="flex gap-2 pr-2 sm:gap-3 sm:pr-3">
              {ITEMS.map((item, index) => <TickerCard key={item.id} item={item} lang={lang} position={index + 1} />)}
            </div>
            <div className="flex gap-2 pr-2 sm:gap-3 sm:pr-3" aria-hidden>
              {ITEMS.map((item, index) => <TickerCard key={`${item.id}-dup`} item={item} lang={lang} position={index + 1} duplicate />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
