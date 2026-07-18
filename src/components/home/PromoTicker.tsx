'use client'

import Link from 'next/link'
import Image from 'next/image'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 프로모 티커 v2 — 히어로 직하단 어필리에이트 상품 롤링 배너 (CSS marquee, JS 0)
// 2026-07-13 운영자 지시 "사이즈 키우고(트립닷컴 참고)" → 썸네일+가격 카드형으로 확대
// 활성 제휴 상품·지원사업만 큐레이션. 항목 교체는 ITEMS만 수정
// 사진은 검증 풀·AI 커버만 / 가격은 실측 검증값만 (해당 상품 카드와 동일 출처)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

type TickerItem = {
  id: string
  emoji: string
  /** 검증 풀 사진 또는 AI 커버 — 없으면 이모지 블록 폴백 */
  photo?: string
  /** 실측 검증가만 (언어 중립 표기) */
  price?: string
  href: string
  external?: boolean
  sponsored?: boolean
  label: L
  tag: L
}

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=70`

const ITEMS: TickerItem[] = [
  {
    id: 'ticker-gov-support', emoji: '🏛', href: '/programs/support',
    label: { KO: '정부 지원 워케이션 — 상시 모집 6곳', EN: 'Gov-supported workations — 6 rolling programs', JP: '政府支援ワーケーション — 随時募集6件' },
    tag: { KO: '지원사업', EN: 'Support', JP: '支援事業' },
  },
  {
    id: 'ticker-teamlab', emoji: '🪐', photo: U('1540959733332-eab4deabeeaf'), price: '₩32,900~', /* Klook 리스팅 실측 2026-07-19 */
    href: 'https://www.klook.com/ko/activity/25300-teamlab-planets-toyosu-tokyo-ticket/?aid=126848', external: true, sponsored: true,
    label: { KO: '팀랩 플래닛 도쿄 티켓', EN: 'teamLab Planets TOKYO ticket', JP: 'チームラボプラネッツTOKYO' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-japan-esim', emoji: '📡', photo: '/covers/esim-japan-ai.jpeg', price: 'US$11.50~',
    href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim', external: true, sponsored: true,
    label: { KO: '일본 eSIM — 도착 전 5분 설치', EN: 'Japan eSIM — install before you land', JP: '日本eSIM — 到着前に5分で設置' },
    tag: { KO: 'Airalo', EN: 'Airalo', JP: 'Airalo' },
  },
  {
    id: 'ticker-bellissima', emoji: '🛳', photo: U('1599640842225-85d111c60e6b'), price: '₩365,766~',
    href: 'https://kr.trip.com/cruises/ship-msc-mscbellissima-496?curr=KRW&Allianceid=9024807', external: true, sponsored: true,
    label: { KO: 'MSC 벨리시마 — 인천 출발 크루즈', EN: 'MSC Bellissima — cruises from Incheon', JP: 'MSCベリッシマ — 仁川発クルーズ' },
    tag: { KO: 'Trip.com', EN: 'Trip.com', JP: 'Trip.com' },
  },
  {
    id: 'ticker-osaka-pass', emoji: '🎫', photo: U('1590559899731-a382839e5549'), price: '₩32,100~', /* Klook 리스팅 실측 2026-07-19 */
    href: 'https://www.klook.com/ko/activity/82312-amazing-pass-osaka/?aid=126848', external: true, sponsored: true,
    label: { KO: '오사카 주유패스 — 교통+40곳 입장', EN: 'Osaka Amazing Pass — transit + 40 spots', JP: '大阪周遊パス — 交通＋40カ所' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-lyf-bangkok', emoji: '🛋', photo: U('1508009603885-50cf7c579365'),
    href: 'https://www.booking.com/hotel/th/lyf-sukhumvit-8-bangkok.html?aid=7854081', external: true, sponsored: true,
    label: { KO: '방콕 코리빙 lyf 수쿰빗 8', EN: 'lyf Sukhumvit 8 Bangkok co-living', JP: 'バンコク コリビング lyf' },
    tag: { KO: 'Booking', EN: 'Booking', JP: 'Booking' },
  },
  {
    id: 'ticker-flight', emoji: '✈️',
    href: 'https://kr.trip.com/flights/?Allianceid=9024807', external: true, sponsored: true,
    label: { KO: '항공권 요금 비교 — 전 노선', EN: 'Compare flight fares — all routes', JP: '航空券の料金比較 — 全路線' },
    tag: { KO: 'Trip.com', EN: 'Trip.com', JP: 'Trip.com' },
  },
  {
    id: 'ticker-japan-towns', emoji: '🗻', photo: U('1526481280693-3bfa7568e0f3'),
    href: '/programs/onsen',
    label: { KO: '일본 소도시 — 료칸·온천 워케이션', EN: 'Japan small towns — ryokan & onsen', JP: '日本の小都市 — 旅館・温泉' },
    tag: { KO: 'NEW', EN: 'NEW', JP: 'NEW' },
  },
  // ── 2026-07-19 추가분: 신규 수익 채널·시즌 (가격은 실측 없어 미표기 — 규칙 준수) ──
  {
    id: 'ticker-miracle', emoji: '⛴', price: '₩120,000~', /* KKday 리스팅 실브라우저 실측 2026-07-19 */
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F150798-busan-osaka-ferry-ticket%2F',
    external: true, sponsored: true,
    label: { KO: '부산—오사카 미라클호 — 뷔페 2식 포함', EN: 'Busan–Osaka ferry — 2 buffet meals in', JP: '釜山—大阪ミラクル号 — ビュッフェ2食付き' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
  {
    id: 'ticker-chuseok', emoji: '🌕',
    href: '/collections/chuseok-short-haul',
    label: { KO: '추석 연휴 단거리 워케이션 기획전', EN: 'Chuseok long-weekend collection', JP: '秋夕連休の近場特集' },
    tag: { KO: '추석', EN: 'Chuseok', JP: '秋夕' },
  },
  {
    id: 'ticker-eurail', emoji: '🚆', price: '₩477,300~', /* Klook 검색 리스팅 실브라우저 실측 2026-07-19 */
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F9868-eurail-global-rail-pass%2F',
    external: true, sponsored: true,
    label: { KO: '유레일 글로벌 패스 — 유럽 33개국', EN: 'Eurail Global Pass — 33 countries', JP: 'ユーレイル グローバルパス — 33カ国' },
    tag: { KO: 'Klook', EN: 'Klook', JP: 'Klook' },
  },
]

function TickerCard({ item, lang }: { item: TickerItem; lang: Lang }) {
  // 2026-07-19: 카드 폭 고정(모바일 272px·데스크톱 304px) — 텍스트 길이에 따라 제각각이던 사이즈 일괄 통일
  const cls =
    'shrink-0 flex items-center gap-3 w-[272px] md:w-[304px] bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 hover:border-white/25 rounded-2xl p-2.5 pr-4 transition-colors'
  const inner = (
    <>
      {item.photo ? (
        <Image
          src={item.photo}
          alt=""
          width={64}
          height={64}
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shrink-0"
        />
      ) : (
        <span className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-2xl shrink-0">
          {item.emoji}
        </span>
      )}
      <span className="flex flex-col gap-1 min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-[0.6rem] font-black px-1.5 py-0.5 rounded-full bg-sky-400/20 text-sky-300 uppercase tracking-wide">
            {item.tag[lang]}
          </span>
          {item.price && (
            <span className="text-amber-300 text-xs font-black whitespace-nowrap">{item.price}</span>
          )}
        </span>
        <span className="text-white/90 text-[0.8125rem] font-bold truncate">{item.label[lang]}</span>
      </span>
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
  // 카드형으로 콘텐츠 폭이 커져 duration 상향 (36s → 55s, 체감 속도 유지)
  return (
    <div className="bg-[#04121f] border-b border-white/8 overflow-hidden py-3 group/ticker">
      {/* duration은 inline으로 — globals.css .animate-ticker(뒤에 로드)가 Tailwind 유틸을 덮는 함정 회피 */}
      <div
        className="flex w-max gap-3 animate-ticker group-hover/ticker:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: '70s' }} /* 11개 항목 기준 체감 속도 유지 (8개·55s 대비) */
      >
        <div className="flex gap-3 pr-3">
          {ITEMS.map((i) => <TickerCard key={i.id} item={i} lang={lang} />)}
        </div>
        <div className="flex gap-3 pr-3" aria-hidden>
          {ITEMS.map((i) => <TickerCard key={`${i.id}-dup`} item={i} lang={lang} />)}
        </div>
      </div>
    </div>
  )
}
