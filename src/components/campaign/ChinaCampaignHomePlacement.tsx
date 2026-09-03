'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Compass, Route } from 'lucide-react'
import type { Lang } from '@/lib/i18n/types'
import { localizeHref } from '@/lib/i18n/localePath'
import { CHINA_CAMPAIGN_ID, CHINA_CAMPAIGN_ROUTE } from '@/lib/campaigns/chinaMarketResearch'
import { trackEvent } from '@/lib/track'

const COPY = {
  eyebrow: { KO: 'SEPTEMBER FIELD NOTE', EN: 'SEPTEMBER FIELD NOTE', JP: 'SEPTEMBER FIELD NOTE' },
  status: { KO: '이우 공개 신청 페이지 확인', EN: 'Yiwu application page verified', JP: '義烏の申込ページを確認済み' },
  title: { KO: '중국 시장조사,\n이우와 광저우 중 어디부터 볼까요?', EN: 'China market research:\nYiwu or Guangzhou first?', JP: '中国市場調査、\n義烏と広州のどちらから？' },
  body: { KO: '소상품 도매시장과 산업별 전시회는 준비 방식이 다릅니다. 일정·목적·현재 모집 상태를 한 화면에서 비교해 보세요.', EN: 'Wholesale markets and sector trade fairs require different preparation. Compare timing, purpose and current availability.', JP: '小商品卸売市場と業種別見本市では準備が異なります。日程・目的・現在の募集状況を比較できます。' },
  cta: { KO: '두 도시 비교하기', EN: 'Compare both routes', JP: '2都市を比較する' },
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
        <div className="relative min-h-72 overflow-hidden bg-[#d7a94e] p-6 sm:p-8 lg:min-h-full">
          <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border-[40px] border-[#f4dcc0]/55" aria-hidden="true" />
          <div className="relative flex h-full min-w-0 flex-col justify-between rounded-[1.5rem] border border-[#092432]/15 bg-[#f6f0df] p-4 text-[#092432] sm:p-6">
            <Route className="h-8 w-8" strokeWidth={1.7} aria-hidden="true" />
            <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="min-w-0"><span className="block text-[0.62rem] font-black tracking-[0.16em] text-[#917126]">01</span><strong className="mt-1 block text-xl font-black sm:text-2xl">YIWU</strong><span className="mt-1 block text-[0.66rem] text-[#42545b] sm:text-xs">WHOLESALE</span></div>
              <span className="h-px w-8 bg-[#092432]/30" aria-hidden="true" />
              <div className="min-w-0 text-right"><span className="block text-[0.62rem] font-black tracking-[0.16em] text-[#917126]">02</span><strong className="mt-1 block text-base font-black sm:text-2xl">GUANGZHOU</strong><span className="mt-1 block text-[0.66rem] text-[#42545b] sm:text-xs">TRADE FAIR</span></div>
            </div>
            <div className="flex items-center gap-2 border-t border-[#092432]/15 pt-4 text-xs font-bold"><Compass className="h-4 w-4" aria-hidden="true" /> DISCOVER · COMPARE · CHOOSE</div>
          </div>
        </div>
      </Link>
    </section>
  )
}
