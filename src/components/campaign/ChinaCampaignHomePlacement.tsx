'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Compass, Route } from 'lucide-react'
import type { Lang } from '@/lib/i18n/types'
import { localizeHref } from '@/lib/i18n/localePath'
import { CHINA_CAMPAIGN_ID, CHINA_CAMPAIGN_ROUTE } from '@/lib/campaigns/chinaMarketResearch'
import { trackEvent } from '@/lib/track'

const COPY = {
  eyebrow: { KO: 'OCTOBER · CHINA BUSINESS', EN: 'OCTOBER · CHINA BUSINESS', JP: 'OCTOBER · CHINA BUSINESS' },
  status: { KO: '이우 10.08–10.12 · 광저우 10.16–10.20', EN: 'Yiwu Oct 8–12 · Guangzhou Oct 16–20', JP: '義烏 10.08–10.12 · 広州 10.16–10.20' },
  title: { KO: '중국 시장을 직접 보고,\n사업의 다음 기회를 찾다', EN: 'See the market first,\nthen find the next opportunity', JP: '中国市場を自分の目で見て、\n次のビジネス機会を探す' },
  body: { KO: '소상품 도매시장형 이우와 전시회형 광저우. 10월 두 시장조사단의 목적과 공개 일정을 한 화면에서 비교해 보세요.', EN: 'Compare the objectives and published October dates for Yiwu’s wholesale route and Guangzhou’s trade-fair route.', JP: '卸売市場型の義烏と見本市型の広州。10月の2つの市場調査団を目的と公開日程から比較できます。' },
  cta: { KO: '두 프로그램 비교하기', EN: 'Compare both programs', JP: '2つのプログラムを比較' },
} satisfies Record<string, Record<Lang, string>>

export function ChinaCampaignHomePlacement({ lang }: { lang: Lang }) {
  const href = localizeHref(CHINA_CAMPAIGN_ROUTE, lang)

  useEffect(() => {
    trackEvent('campaign_view', {
      campaign_id: CHINA_CAMPAIGN_ID,
      variant: 'comparison',
      placement: 'home_editorial',
      source_page: lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : '/',
      locale: lang === 'JP' ? 'ja' : lang.toLowerCase(),
    })
  }, [lang])

  return (
    <section className="border-b border-[#d9e3e5] bg-[#f0eee8] px-5 py-12 sm:px-6 sm:py-16" data-campaign-id={CHINA_CAMPAIGN_ID} data-visual-module="china-market-research-placement">
      <Link
        href={href}
        onClick={() => trackEvent('campaign_click', {
          campaign_id: CHINA_CAMPAIGN_ID,
          variant: 'comparison',
          placement: 'home_editorial',
          source_page: lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : '/',
          locale: lang === 'JP' ? 'ja' : lang.toLowerCase(),
        })}
        className="group mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-[#092432] text-white shadow-[0_24px_70px_rgba(7,25,34,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="flex min-w-0 flex-col justify-center p-7 sm:p-10 lg:p-12">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="text-[0.66rem] font-black tracking-[0.16em] text-[#75d7f6]">{COPY.eyebrow[lang]}</span>
            <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[0.68rem] font-bold text-white/75">{COPY.status[lang]}</span>
          </div>
          <h2 className="whitespace-pre-line text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.08] tracking-[-0.035em]">{COPY.title[lang]}</h2>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/70 sm:text-base">{COPY.body[lang]}</p>
          <span className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-sm font-black text-[#75d7f6]">
            {COPY.cta[lang]} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
        <div className="relative min-h-80 overflow-hidden bg-[#1d3139] lg:min-h-full">
          <Image src="/media/campaigns/china-market-research-urban-editorial-v1.webp" alt={lang === 'KO' ? '도심 카페 앞에서 휴대폰으로 일정을 확인하는 여행자' : lang === 'JP' ? '都市のカフェ前でスマートフォンの日程を確認する旅行者' : 'A traveler checking an itinerary on a phone outside an urban cafe'} fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071e2a]/92 via-[#071e2a]/35 to-[#071e2a]/5" aria-hidden="true" />
          <div className="relative flex h-full min-h-80 min-w-0 flex-col justify-between p-6 text-white sm:p-8">
            <Route className="h-8 w-8" strokeWidth={1.7} aria-hidden="true" />
            <div className="my-7 grid grid-cols-2 gap-3">
              <div className="min-w-0 rounded-2xl border border-white/18 bg-[#071e2a]/68 p-4 backdrop-blur-md"><span className="block text-[0.62rem] font-black tracking-[0.16em] text-[#f1c76f]">126 · WHOLESALE</span><strong className="mt-1 block text-xl font-black sm:text-2xl">YIWU</strong><span className="mt-2 block text-[0.7rem] text-white/78 sm:text-xs">10.08 THU — 10.12 MON</span></div>
              <div className="min-w-0 rounded-2xl border border-white/18 bg-[#071e2a]/68 p-4 text-right backdrop-blur-md"><span className="block text-[0.62rem] font-black tracking-[0.16em] text-[#f1c76f]">127 · TRADE FAIR</span><strong className="mt-1 block text-base font-black sm:text-2xl">GUANGZHOU</strong><span className="mt-2 block text-[0.7rem] text-white/78 sm:text-xs">10.16 FRI — 10.20 TUE</span></div>
            </div>
            <div className="flex items-center gap-2 border-t border-white/20 pt-4 text-xs font-bold"><Compass className="h-4 w-4" aria-hidden="true" /> DISCOVER · COMPARE · CHOOSE</div>
          </div>
        </div>
      </Link>
    </section>
  )
}
