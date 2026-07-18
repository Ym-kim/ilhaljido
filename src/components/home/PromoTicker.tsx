'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

type TickerItem = {
  id: string
  photo?: string
  price?: string
  href: string
  external?: boolean
  sponsored?: boolean
  label: L
  tag: L
}

const INTRO: Record<Lang, { label: string; sub: string }> = {
  KO: { label: '이번 주 추천', sub: '머무는 여행을 위한 선택' },
  EN: { label: 'This week', sub: 'Picked for longer stays' },
  JP: { label: '今週のおすすめ', sub: '長く滞在する旅のために' },
}

const ITEMS: TickerItem[] = [
  {
    id: 'ticker-gov-support', href: '/programs/support',
    label: { KO: '정부 지원 워케이션 — 상시 모집 6곳', EN: 'Gov-supported workations — 6 rolling programs', JP: '政府支援ワーケーション — 随時募集6件' },
    tag: { KO: '지원사업', EN: 'Support', JP: '支援事業' },
  },
  {
    id: 'ticker-teamlab', price: '₩32,900~',
    href: 'https://www.klook.com/ko/activity/25300-teamlab-planets-toyosu-tokyo-ticket/?aid=126848', external: true, sponsored: true,
    label: { KO: '팀랩 플래닛 도쿄 티켓', EN: 'teamLab Planets TOKYO ticket', JP: 'チームラボプラネッツTOKYO' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-japan-esim', price: 'US$11.50~',
    href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim', external: true, sponsored: true,
    label: { KO: '일본 eSIM — 도착 전 5분 설치', EN: 'Japan eSIM — install before you land', JP: '日本eSIM — 到着前に5分で設置' },
    tag: { KO: 'Airalo', EN: 'Airalo', JP: 'Airalo' },
  },
  {
    id: 'ticker-bellissima', price: '₩365,766~',
    href: 'https://kr.trip.com/cruises/ship-msc-mscbellissima-496?curr=KRW&Allianceid=9024807', external: true, sponsored: true,
    label: { KO: 'MSC 벨리시마 — 인천 출발 크루즈', EN: 'MSC Bellissima — cruises from Incheon', JP: 'MSCベリッシマ — 仁川発クルーズ' },
    tag: { KO: 'Trip.com', EN: 'Trip.com', JP: 'Trip.com' },
  },
  {
    id: 'ticker-osaka-pass', price: '₩32,100~',
    href: 'https://www.klook.com/ko/activity/82312-amazing-pass-osaka/?aid=126848', external: true, sponsored: true,
    label: { KO: '오사카 주유패스 — 교통+40곳 입장', EN: 'Osaka Amazing Pass — transit + 40 spots', JP: '大阪周遊パス — 交通＋40カ所' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-lyf-bangkok',
    href: 'https://www.booking.com/hotel/th/lyf-sukhumvit-8-bangkok.html?aid=7854081', external: true, sponsored: true,
    label: { KO: '방콕 코리빙 lyf 수쿰빗 8', EN: 'lyf Sukhumvit 8 Bangkok co-living', JP: 'バンコク コリビング lyf' },
    tag: { KO: 'Booking', EN: 'Booking', JP: 'Booking' },
  },
  {
    id: 'ticker-flight',
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
    id: 'ticker-miracle', price: '₩120,000~',
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F150798-busan-osaka-ferry-ticket%2F',
    external: true, sponsored: true,
    label: { KO: '부산—오사카 미라클호 — 뷔페 2식 포함', EN: 'Busan–Osaka ferry — 2 buffet meals in', JP: '釜山—大阪ミラクル号 — ビュッフェ2食付き' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-chuseok', href: '/collections/chuseok-short-haul',
    label: { KO: '추석 연휴 단거리 워케이션 기획전', EN: 'Chuseok long-weekend collection', JP: '秋夕連休の近場特集' },
    tag: { KO: '시즌 기획', EN: 'Seasonal', JP: '季節特集' },
  },
  {
    id: 'ticker-eurail', price: '₩477,300~',
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F9868-eurail-global-rail-pass%2F',
    external: true, sponsored: true,
    label: { KO: '유레일 글로벌 패스 — 유럽 33개국', EN: 'Eurail Global Pass — 33 countries', JP: 'ユーレイル グローバルパス — 33カ国' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
]

function TickerCard({ item, lang }: { item: TickerItem; lang: Lang }) {
  const cls = 'group/item flex w-[262px] shrink-0 items-center gap-3 border-r border-[#d8e1e5] px-4 py-2.5 transition-colors hover:bg-white/75 sm:w-[294px]'
  const inner = (
    <>
      {item.photo ? (
        <Image
          src={item.photo}
          alt=""
          width={56}
          height={56}
          sizes="56px"
          className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-black/5"
        />
      ) : (
        <span className="h-9 w-px shrink-0 bg-gradient-to-b from-sky-400 to-sky-800" aria-hidden />
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.12em] text-sky-800/70">
            {item.tag[lang]}
          </span>
          {item.price && <span className="text-[0.68rem] font-extrabold text-[#9a6700]">{item.price}</span>}
        </span>
        <span className="mt-1 block truncate text-[0.78rem] font-bold text-[#152638]">{item.label[lang]}</span>
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#8ca0ae] transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5" />
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

  return (
    <section className="flex overflow-hidden border-y border-[#d8e1e5] bg-[#f2f6f5]">
      <div className="relative z-10 hidden w-[190px] shrink-0 flex-col justify-center border-r border-white/10 bg-[#082f49] px-6 text-white lg:flex">
        <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-sky-300">{INTRO[lang].label}</span>
        <span className="mt-1 text-[0.7rem] font-medium text-white/55">{INTRO[lang].sub}</span>
      </div>
      <div className="group/ticker min-w-0 flex-1 overflow-hidden">
        <div
          className="flex w-max animate-ticker motion-reduce:animate-none group-hover/ticker:[animation-play-state:paused]"
          style={{ animationDuration: '76s' }}
        >
          <div className="flex">
            {ITEMS.map((item) => <TickerCard key={item.id} item={item} lang={lang} />)}
          </div>
          <div className="flex" aria-hidden>
            {ITEMS.map((item) => <TickerCard key={`${item.id}-dup`} item={item} lang={lang} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
