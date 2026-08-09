'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BedDouble, MapPin } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { DestinationSearch } from '@/components/affiliate/DestinationSearch'
import { HostedLeadSection } from '@/components/programs/HostedLeadSection'
import { DOMESTIC_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { buildBookingStaySearchHref } from '@/lib/affiliate/bookingSearch'
import { trackAffiliateClick, trackEvent } from '@/lib/track'
import { getDomesticDiscoveries } from '@/lib/domesticDiscovery'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

const COPY = {
  eyebrow: { KO: 'WORK & TRAVEL IN KOREA', EN: 'WORK & TRAVEL IN KOREA', JP: '韓国で旅とはたらく' },
  title: { KO: '이번 주말부터, 국내에서 일하고 쉬는 8가지 방법', EN: 'Eight ways to work and travel around Korea', JP: '韓国で旅とはたらく、8つの過ごし方' },
  lead: {
    KO: '서울 한 곳에 머물지 않고 바다·한옥·기차·항구를 기준으로 골랐습니다. 지역 가이드와 여행 구성, 날짜를 넣은 숙소 검색을 한 페이지에서 이어보세요.',
    EN: 'Go beyond a single city. Pick a coast, hanok town, harbor or slow train, then move from local context to a date-ready stay search.',
    JP: 'ソウルだけではなく、海、韓屋の街、港、ゆっくり走る列車から選べます。地域ガイドから日付を入れた宿探しまで、ひとつのページで確認できます。',
  },
  searchEyebrow: { KO: '날짜까지 바로 연결', EN: 'SEARCH WITH DATES', JP: '日付を入れて検索' },
  searchTitle: { KO: '도시를 넓게 입력하고, 실제 숙소 조건을 확인하세요', EN: 'Search a city and pass your dates straight through', JP: '都市名と日付を入力して、宿泊条件を確認' },
  searchLead: {
    KO: '도시 입력은 넓게, 날짜는 아래 한 줄로 정리했습니다. 검색 결과와 요금·객실 조건은 Booking.com에서 최종 확인합니다.',
    EN: 'The city field stays wide; dates sit below it. Final rates and room terms are confirmed on Booking.com.',
    JP: '都市入力欄を広く取り、日付はその下に整理しました。料金・客室条件はBooking.comで最終確認してください。',
  },
  exploreEyebrow: { KO: '8 DESTINATIONS', EN: '8 DESTINATIONS', JP: '8つの行き先' },
  exploreTitle: { KO: '무엇을 하고 싶은지로 고르는 국내 여행', EN: 'Choose Korea by the way you want to spend your time', JP: '過ごし方から選ぶ韓国の旅' },
  guide: { KO: '지역 정보', EN: 'Local guide', JP: '地域情報' },
  stay: { KO: '숙소 검색', EN: 'Search stays', JP: '宿を探す' },
  editEyebrow: { KO: 'TRIP EDITS', EN: 'TRIP EDITS', JP: '旅の組み立て' },
  editTitle: { KO: '막연할 때는 이 구성부터 참고하세요', EN: 'Start with one of these practical trip shapes', JP: '迷ったら、この旅の組み立てから' },
  editLead: {
    KO: '패키지 판매가 아니라 일정의 기준을 잡는 정보입니다. 실제 운영·교통·숙소 조건은 각 연결 페이지에서 확인하세요.',
    EN: 'These are planning references, not packaged tours. Check current transport, stay and program terms on each linked page.',
    JP: 'パッケージ販売ではなく、旅程を考えるための参考情報です。交通・宿・プログラムの条件は各リンク先でご確認ください。',
  },
  supportTitle: { KO: '지역 지원 프로그램도 함께 확인', EN: 'Check regional support programs', JP: '地域支援プログラムも確認' },
  supportLead: {
    KO: '숙박·업무공간·체험 지원은 지역과 모집 시기마다 다릅니다. 검증일과 공식 공고가 있는 프로그램만 모아 비교합니다.',
    EN: 'Stay, workspace and activity support varies by region and application window. Compare verified listings with official sources.',
    JP: '宿泊・ワークスペース・体験支援は地域と募集時期で異なります。確認日と公式情報があるものだけを比較できます。',
  },
  supportCta: { KO: '지원 프로그램 비교', EN: 'Compare support programs', JP: '支援プログラムを比較' },
  prepTitle: { KO: '국내 체류를 실제 예약으로 이어가기', EN: 'Turn the plan into a real Korea stay', JP: '韓国滞在の準備を進める' },
  prepLead: {
    KO: '숙소·체험·이동은 각각 제휴사에서 예약·결제합니다. 날짜와 조건은 이동한 사이트에서 최종 확인하세요.',
    EN: 'Stays, activities and transport are booked and paid for with each partner. Confirm dates and terms on the partner site.',
    JP: '宿・体験・移動は各提携先で予約・決済します。日付と条件は移動先のサイトで最終確認してください。',
  },
} satisfies Record<string, L>

const EDITS: Array<{ id: string; title: L; body: L }> = [
  {
    id: 'busan',
    title: { KO: '금요일 퇴근 후, 부산 2박 3일', EN: 'Busan after work on Friday', JP: '金曜の仕事後から釜山2泊3日' },
    body: { KO: '부산역 업무 거점과 해운대·송정의 바다를 나누어 쓰는 주말.', EN: 'Split a weekend between the Busan Station work hub and the coast.', JP: '釜山駅のワーク拠点と海雲台・松亭の海を分けて過ごす週末。' },
  },
  {
    id: 'jeju',
    title: { KO: '제주 3박 이상, 하루는 일상처럼', EN: 'Jeju for 3+ nights', JP: '済州に3泊以上、1日は日常のように' },
    body: { KO: '관광 일정을 채우기보다 오전 업무와 해안 산책을 반복하는 섬 체류.', EN: 'Repeat a simple rhythm of morning work and coastal walks.', JP: '予定を詰めず、午前の仕事と海岸散歩を繰り返す島滞在。' },
  },
  {
    id: 'jeonju',
    title: { KO: '전주에서 한옥과 미식 사이', EN: 'Jeonju between hanok and food', JP: '全州、韓屋と美食のあいだ' },
    body: { KO: '낮에는 한옥 스테이와 카페, 저녁에는 골목과 한 끼에 집중하는 2박.', EN: 'Use daytime for work, then give the evening to lanes and local food.', JP: '昼は韓屋ステイやカフェで働き、夜は路地と食事に集中する2泊。' },
  },
  {
    id: 'jeongseon',
    title: { KO: '정선, 느린 열차로 시작하기', EN: 'Begin Jeongseon on a slower train', JP: '旌善、ゆっくり走る列車から' },
    body: { KO: '아리랑열차와 산골 산책을 연결해 이동 자체를 여행으로 바꾸는 구성.', EN: 'Turn the transfer itself into the trip with the Arirang A-train.', JP: 'アリラン列車と山あいの散歩をつなぎ、移動そのものを旅に。' },
  },
]

export function DomesticProgramsView({ forceLang }: { forceLang?: Lang }) {
  const { lang: contextLang, setLang } = useLang()
  const lang = forceLang ?? contextLang
  const entries = getDomesticDiscoveries(lang)

  useEffect(() => {
    if (forceLang && forceLang !== contextLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const byId = new Map(entries.map((entry) => [entry.id, entry]))

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#142d38]">
      <section className="relative min-h-[68svh] overflow-hidden pt-24">
        <Image
          src="/media/destinations/gangneung-anmok-licensed-v1.webp"
          alt={entries.find((entry) => entry.id === 'gangneung')?.alt[lang] ?? ''}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_54%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051b27]/94 via-[#082534]/74 to-[#082534]/24" />
        <div className="relative mx-auto flex min-h-[calc(68svh-6rem)] max-w-6xl items-end px-5 pb-12 sm:px-6 md:items-center md:pb-16">
          <div className="max-w-3xl">
            <span className="wak-overline text-sky-300">{COPY.eyebrow[lang]}</span>
            <h1 className="wak-page-title mt-4 max-w-3xl text-white [word-break:keep-all]">{COPY.title[lang]}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">{COPY.lead[lang]}</p>
            <Link
              href="#destinations"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#0d3c4d] transition hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {COPY.exploreTitle[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9e3e1] bg-white px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <span className="wak-overline text-[#087294]">{COPY.searchEyebrow[lang]}</span>
            <h2 className="wak-section-title mt-3 text-[#142d38] [word-break:keep-all]">{COPY.searchTitle[lang]}</h2>
            <p className="mt-3 text-sm leading-6 text-[#64757b] sm:text-base">{COPY.searchLead[lang]}</p>
          </div>
          <DestinationSearch mode="hotel" forceLang={lang} />
        </div>
      </section>

      <section id="destinations" className="scroll-mt-20 px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <span className="wak-overline text-[#397083]">{COPY.exploreEyebrow[lang]}</span>
          <h2 className="wak-section-title mt-3 max-w-3xl text-[#142d38] [word-break:keep-all]">{COPY.exploreTitle[lang]}</h2>

          <div className="mt-8 grid gap-4 min-[520px]:grid-cols-2 lg:grid-cols-4" data-ui-grid="destination">
            {entries.map((entry) => (
              <article
                id={entry.id}
                key={entry.id}
                data-ui-card="destination"
                className="group flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-[1.4rem] border border-[#d2dedc] bg-white transition hover:-translate-y-1 hover:border-[#8cb2b5] hover:shadow-[0_18px_42px_rgba(27,67,77,0.11)]"
              >
                <Link
                  href={entry.href[lang]}
                  onClick={() => trackEvent('domestic_destination_click', { locale: lang, source: 'domestic_hub', placement: 'image', destinationSlug: entry.id, assetId: entry.assetId })}
                  className="relative block aspect-[4/3] overflow-hidden bg-[#dfe8e7] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0d6c87]"
                >
                  <Image src={entry.image} alt={entry.alt[lang]} fill loading="lazy" sizes="(max-width: 519px) 100vw, (max-width: 1023px) 50vw, 288px" style={{ objectPosition: entry.imagePosition }} className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transition-none" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/35 bg-[#0a2938]/80 px-3 py-1 text-[0.65rem] font-black text-white backdrop-blur-sm">{entry.duration[lang]}</span>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#688089]">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} aria-hidden="true" /> Korea
                  </div>
                  <h3 className="mt-2 text-xl font-black text-[#142d38]">{entry.name[lang]}</h3>
                  <p className="mt-2 line-clamp-2 min-h-11 text-sm leading-[1.55] text-[#64757b]">{entry.description[lang]}</p>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                    <Link
                      href={entry.href[lang]}
                      onClick={() => trackEvent('domestic_destination_click', { locale: lang, source: 'domestic_hub', placement: 'guide', destinationSlug: entry.id, assetId: entry.assetId })}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#c8d8d8] px-3 text-xs font-black text-[#285667] transition hover:border-[#719aa2] hover:bg-[#f3f8f8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d6c87]"
                    >
                      {COPY.guide[lang]}
                    </Link>
                    <a
                      href={buildBookingStaySearchHref({ destination: entry.bookingQuery })}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      onClick={() => trackAffiliateClick({ provider: 'Booking.com', status: 'active_affiliate', id: `domestic-${entry.id}` })}
                      className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#0c7897] px-3 text-xs font-black text-white transition hover:bg-[#075f79] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d6c87]"
                    >
                      <BedDouble className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} aria-hidden="true" /> {COPY.stay[lang]}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9e3e1] bg-white px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <span className="wak-overline text-[#087294]">{COPY.editEyebrow[lang]}</span>
          <h2 className="wak-section-title mt-3 text-[#142d38]">{COPY.editTitle[lang]}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64757b] sm:text-base">{COPY.editLead[lang]}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {EDITS.map((edit, index) => {
              const entry = byId.get(edit.id)
              if (!entry) return null
              return (
                <Link
                  key={edit.id}
                  href={entry.href[lang]}
                  onClick={() => trackEvent('domestic_destination_click', { locale: lang, source: 'domestic_hub', placement: 'trip_edit', destinationSlug: entry.id })}
                  className="group flex min-h-40 items-end overflow-hidden rounded-[1.35rem] border border-[#dce4e2] bg-[#f7f5ef] p-6 transition hover:border-[#8cb2b5] hover:shadow-[0_14px_34px_rgba(27,67,77,0.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d6c87]"
                >
                  <span>
                    <span className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#4f7a86]">0{index + 1} · {entry.name[lang]}</span>
                    <span className="mt-3 block text-xl font-black text-[#142d38]">{edit.title[lang]}</span>
                    <span className="mt-2 block text-sm leading-6 text-[#64757b]">{edit.body[lang]}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-[#087294]">{COPY.guide[lang]} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={ICON_STROKE} aria-hidden="true" /></span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[1.6rem] bg-[#123849] px-6 py-8 text-white md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-black">{COPY.supportTitle[lang]}</h2>
            <p className="mt-3 text-sm leading-6 text-white/72 sm:text-base">{COPY.supportLead[lang]}</p>
          </div>
          <Link href={lang === 'EN' ? '/en/programs/support' : lang === 'JP' ? '/ja/programs/support' : '/programs/support'} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#123849] transition hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {COPY.supportCta[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <AffiliateSection
        eyebrow="WAKATION SELECT"
        title={COPY.prepTitle[lang]}
        subtitle={COPY.prepLead[lang]}
        items={DOMESTIC_PREP_ITEMS.map((item) => localizeAffiliateItem(item, lang))}
        cols={3}
        tone="light"
      />

      <HostedLeadSection variant="domestic" tone="dark" lang={lang} />
    </div>
  )
}
