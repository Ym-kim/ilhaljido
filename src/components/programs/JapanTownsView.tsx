'use client'

import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { DestinationCard } from '@/components/affiliate/DestinationCard'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { NotifySignup } from '@/components/home/NotifySignup'
import { HOTEL_DESTINATIONS } from '@/lib/affiliate/destinations'
import { FEATURED_ESIM } from '@/lib/affiliate/featured'
import { ALL_AFFILIATE_ITEMS } from '@/lib/affiliate/items'
import { localizeDestination } from '@/lib/affiliate/localizeDest'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 일본 소도시 — 료칸·온천 테마 전용 페이지
// 홈 테마 카드 '일본 소도시'의 실체: 소도시 숙소 + 이동 준비 + 프로그램 알림
// ─────────────────────────────────────────────────────────────────────────────

const TOWN_IDS = ['japan-kawaguchiko', 'japan-kanazawa', 'japan-yufuin']

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: '료칸 · 온천 · 소도시', EN: 'RYOKAN · ONSEN · SMALL TOWNS', JP: '旅館・温泉・小都市' },
  title: { KO: '일본 소도시에서 일하고,\n온천으로 하루를 닫다', EN: 'Work from a small Japanese town,\nend the day in an onsen', JP: '日本の小都市で働き、\n温泉で一日を締める' },
  desc: {
    KO: '도쿄·오사카의 소음 대신, 후지산 호숫가와 전통 찻집 거리에서 일하는 워케이션. 숙소는 지금 바로 예약할 수 있고, Wakation 소도시 프로그램은 준비 중입니다.',
    EN: 'Trade big-city noise for lakeside Fuji views and historic teahouse streets. Stays are bookable now; the Wakation small-town program is in preparation.',
    JP: '大都市の喧騒の代わりに、富士山の湖畔や伝統の茶屋街で働くワーケーション。宿は今すぐ予約でき、Wakationの小都市プログラムは準備中です。',
  },
  stays_label: { KO: '소도시 숙소 바로 예약', EN: 'Book small-town stays now', JP: '小都市の宿を今すぐ予約' },
  stays_sub: { KO: '가와구치코 · 가나자와 · 유후인 — 검증된 파트너에서 숙소를 검색하세요.', EN: 'Kawaguchiko, Kanazawa and Yufuin — search stays via verified partners.', JP: '河口湖・金沢・湯布院 — 検証済みパートナーで宿を検索。' },
  prep_title: { KO: '소도시 가는 길, 미리 준비', EN: 'Getting there, sorted in advance', JP: '小都市への道のり、事前に準備' },
  prep_sub: { KO: '항공권과 일본 eSIM — 도착 전에 끝내두면 소도시에선 쉬기만 하면 됩니다.', EN: 'Flights and a Japan eSIM — sort them before you land, then just settle in.', JP: '航空券と日本eSIM — 到着前に済ませて、小都市ではゆっくり。' },
  notify_label: { KO: '료칸·온천 소도시 프로그램이 열리면 알려드릴게요', EN: "We'll tell you when the ryokan & onsen program opens", JP: '旅館・温泉の小都市プログラム開始時にお知らせ' },
  program_badge: { KO: '프로그램 준비 중', EN: 'Program in prep', JP: 'プログラム準備中' },
  preregister: { KO: '사전 신청 문의', EN: 'Pre-register inquiry', JP: '事前申込のお問い合わせ' },
}

export function JapanTownsView() {
  const { lang } = useLang()
  const towns = HOTEL_DESTINATIONS.filter((d) => TOWN_IDS.includes(d.id))
  const flight = ALL_AFFILIATE_ITEMS.find((i) => i.id === 'feat-flight-tripcom')
  const esimJapan = FEATURED_ESIM.find((i) => i.id === 'esim-klook-japan')
  const prepItems = [flight, esimJapan].filter((i): i is NonNullable<typeof i> => Boolean(i))

  return (
    <div className="min-h-screen bg-white">
      {/* Hero — 후지산 (검증 풀) */}
      <section className="relative h-[55vh] flex items-end overflow-hidden dark-surface">
        <Image
          src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1800&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
          <p className="text-sky-300 text-xs font-black tracking-widest uppercase mb-3">{COPY.eyebrow[lang]}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-pre-line mb-4">
            {COPY.title[lang]}
          </h1>
          <p className="text-white/75 text-base max-w-xl leading-relaxed">{COPY.desc[lang]}</p>
        </div>
      </section>

      {/* 소도시 숙소 */}
      <section className="px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#111827] font-black text-xl mb-1.5 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-mid" strokeWidth={ICON_STROKE} />
            {COPY.stays_label[lang]}
          </h2>
          <p className="text-[#64748b] text-sm mb-7">{COPY.stays_sub[lang]}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {towns.map((entry) => (
              <DestinationCard key={entry.id} entry={localizeDestination(entry, lang)} />
            ))}
          </div>
        </div>
      </section>

      {/* 이동 준비 — 항공 + 일본 eSIM */}
      <AffiliateSection
        tone="light"
        title={COPY.prep_title[lang]}
        subtitle={COPY.prep_sub[lang]}
        items={prepItems.map((i) => localizeAffiliateItem(i, lang))}
        cols={2}
      />

      {/* 프로그램 알림 + 사전신청 */}
      <section className="dark-surface bg-gradient-to-b from-[#04121f] to-[#0a1e33] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-4">
            {COPY.program_badge[lang]}
          </span>
          <p className="text-white/60 text-sm font-semibold mb-3">{COPY.notify_label[lang]}</p>
          <NotifySignup source="일본 소도시(료칸·온천) 프로그램 알림" event="program_alert_submitted" />
          <a
            href="mailto:wakation.sf@gmail.com?subject=Japan%20small-town%20workation%20pre-register"
            className="mt-5 inline-flex items-center gap-2 text-sky-300 text-sm font-bold hover:gap-3 transition-all"
          >
            {COPY.preregister[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </a>
        </div>
      </section>
    </div>
  )
}
