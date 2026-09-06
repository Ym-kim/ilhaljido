'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  Map,
  Route,
  ShieldCheck,
} from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import type { DisplayLocale } from '@/lib/i18n/displayLocale'
import { localizeHref } from '@/lib/i18n/localePath'
import { CHINA_APPLICATION_URL, CHINA_CAMPAIGN_ID, CHINA_RESEARCH_VARIANTS } from '@/lib/campaigns/chinaMarketResearch'
import { trackEvent } from '@/lib/track'

const BASE_COPY = {
  back: { KO: '시장조사 프로그램', EN: 'Market research programs', JP: '市場調査プログラム' },
  eyebrow: { KO: 'OCTOBER · CHINA BUSINESS', EN: 'OCTOBER · CHINA BUSINESS', JP: 'OCTOBER · CHINA BUSINESS' },
  title: { KO: '중국 시장을 직접 보고,\n사업의 다음 기회를 찾다', EN: 'See the market first,\nthen find the next opportunity', JP: '中国市場を自分の目で見て、\n次のビジネス機会を探す' },
  intro: {
    KO: '이우 126차와 광저우 127차. 10월 두 시장조사단을 공개 일정과 조사 목적을 기준으로 비교했습니다.',
    EN: 'Compare October’s Yiwu Group 126 and Guangzhou Group 127 by published dates and research objective.',
    JP: '10月の義烏第126回と広州第127回を、公開日程と調査目的から比較します。',
  },
  navCompare: { KO: '두 도시 비교', EN: 'Compare', JP: '2都市を比較' },
  navFlow: { KO: '준비 흐름', EN: 'Planning flow', JP: '準備の流れ' },
  navTrust: { KO: '출처·확인', EN: 'Sources', JP: '出典・確認' },
  compareEyebrow: { KO: 'DISCOVERY → COMPARISON', EN: 'DISCOVERY → COMPARISON', JP: 'DISCOVERY → COMPARISON' },
  compareTitle: { KO: '내 목적에 맞는 현장은 다릅니다', EN: 'The right field depends on your objective', JP: '目的によって、見るべき現場は変わります' },
  fit: { KO: '이런 팀에 맞아요', EN: 'Good fit for', JP: 'こんなチームに' },
  facts: { KO: '공개 정보', EN: 'Published information', JP: '公開情報' },
  live: { KO: '외부 일정·신청 페이지 확인', EN: 'External schedule and application page checked', JP: '外部の日程・申込ページを確認' },
  archived: { KO: '공개 일정 종료', EN: 'Published dates ended', JP: '公開日程終了' },
  chooseYiwu: { KO: '이우 일정·신청 확인', EN: 'Check Yiwu dates and application', JP: '義烏の日程・申込を確認' },
  chooseGuangzhou: { KO: '광저우 일정·신청 확인', EN: 'Check Guangzhou dates and application', JP: '広州の日程・申込を確認' },
  reference: { KO: '공식 참고 정보', EN: 'Official reference', JP: '公式参考情報' },
  noCta: { KO: '확정된 신청 링크가 없어 버튼을 열지 않았습니다.', EN: 'No application button is shown until a matching program is confirmed.', JP: '該当する募集が確認できるまで申込ボタンは表示しません。' },
  flowEyebrow: { KO: 'WAKATION PLANNING NOTE', EN: 'WAKATION PLANNING NOTE', JP: 'WAKATION PLANNING NOTE' },
  flowTitle: { KO: '예약보다 먼저, 조사 질문을 정하세요', EN: 'Define the research question before booking', JP: '予約より先に、調査テーマを決める' },
  flow: {
    KO: ['비교할 상품군·산업을 1–3개로 좁히기', '시장형 또는 전시회형 동선을 고르기', '통역·결제·물류·샘플 반입 조건 확인하기', '항공·숙소는 최종 일정 확인 후 별도 준비하기'],
    EN: ['Narrow the products or sectors to one to three', 'Choose a market-led or fair-led route', 'Confirm interpreting, payment, logistics and sample rules', 'Arrange flights and stays after the final itinerary is confirmed'],
    JP: ['調べる商品・業種を1〜3個に絞る', '市場型か見本市型かを選ぶ', '通訳・決済・物流・サンプル持込条件を確認', '最終日程の確認後に航空券・宿を別途準備'],
  },
  dayTitle: { KO: '일과 함께 넣는다면', EN: 'If work continues during the trip', JP: '仕事を続けながらなら' },
  dayBody: { KO: '현장 방문일과 정리일을 분리하고, 저녁 60–90분을 사진·명함·견적 정리 시간으로 비워두는 구성이 현실적입니다.', EN: 'Separate field days from synthesis time, and reserve 60–90 minutes each evening to organize photos, contacts and quotations.', JP: '現場訪問日と整理時間を分け、毎晩60〜90分を写真・名刺・見積の整理に空ける構成が現実的です。' },
  trustTitle: { KO: '누가 무엇을 제공하는지 구분했습니다', EN: 'Provider roles are clearly separated', JP: '誰が何を提供するかを分けて表示' },
  trustWakation: { KO: 'Wakation은 공개 정보를 비교·편집해 소개합니다. 직접 운영하거나 예약·환불을 처리하지 않습니다.', EN: 'Wakation compares and edits published information. We do not operate the trip or handle booking and refunds.', JP: 'Wakationは公開情報を比較・編集して紹介します。旅行の運営、予約、返金は行いません。' },
  trustOperator: { KO: '일정·가격·포함사항·취소 조건은 외부 운영사 페이지에서 최종 확인합니다. 모집은 조기 종료되거나 변경될 수 있습니다.', EN: 'Confirm dates, pricing, inclusions and cancellation terms on the external operator page. Availability may change or close early.', JP: '日程・料金・含まれるもの・キャンセル条件は外部運営者ページで最終確認してください。募集は変更・早期終了する場合があります。' },
  sourcesTitle: { KO: '확인한 공개 출처', EN: 'Published sources checked', JP: '確認した公開情報' },
  sourceOperator: { KO: '10월 외부 운영·신청 페이지', EN: 'October operator and application page', JP: '10月 外部運営・申込ページ' },
  sourceYiwu: { KO: '이우시 공식 시장 안내', EN: 'Official Yiwu market directory', JP: '義烏市 公式市場案内' },
  sourceGuangzhou: { KO: '캔톤페어 공식 사이트', EN: 'Official Canton Fair website', JP: '広州交易会 公式サイト' },
  verified: { KO: '마지막 확인 2026. 9. 3', EN: 'Last checked Sep 3, 2026', JP: '最終確認 2026年9月3日' },
  backCta: { KO: '다른 프로그램 보기', EN: 'Explore other programs', JP: '他のプログラムを見る' },
} satisfies Record<string, Record<Lang, string> | Record<Lang, string[]>>

const ZH_COPY = {
  back: '返回旅行准备',
  eyebrow: 'OCTOBER · CHINA BUSINESS',
  title: '亲自走进中国市场，\n找到下一个商业机会',
  intro: '义乌第126期与广州第127期。按公开日期和调研目标，比较2026年10月的两条市场考察路线。',
  navCompare: '比较两地', navFlow: '准备流程', navTrust: '来源与核验',
  compareEyebrow: 'DISCOVERY → COMPARISON', compareTitle: '目标不同，适合的现场也不同',
  fit: '适合这样的团队', facts: '公开信息',
  live: '已核对外部日程与申请页', archived: '公开日程已结束',
  chooseYiwu: '查看义乌日程与申请', chooseGuangzhou: '查看广州日程与申请',
  reference: '查看官方参考信息', noCta: '尚未确认与该项目对应的申请链接，因此暂不显示申请按钮。',
  flowEyebrow: 'WAKATION PLANNING NOTE', flowTitle: '在预订之前，先定义你的调研问题',
  flow: ['将要比较的产品或行业缩小到1–3个', '选择市场型或展会型路线', '确认口译、支付、物流与样品携带规则', '确认最终行程后，再单独安排航班与住宿'],
  dayTitle: '如果旅途中还要工作', dayBody: '将现场走访日与整理日分开，每晚预留60–90分钟整理照片、联系人与报价，会更现实。',
  trustTitle: '清楚区分谁提供什么',
  trustWakation: 'Wakation 负责比较、整理并介绍公开信息，不直接运营行程，也不处理预订与退款。',
  trustOperator: '日程、价格、包含项目与取消条款请在外部运营方页面最终确认。招募可能变更或提前结束。',
  sourcesTitle: '已核验的公开来源', sourceOperator: '10月外部运营与申请页', sourceYiwu: '义乌市官方市场介绍', sourceGuangzhou: '广交会官方网站',
  verified: '最后核验：2026年9月3日', backCta: '查看住宿与旅行准备',
} satisfies Record<keyof typeof BASE_COPY, string | string[]>

const COPY = Object.fromEntries(
  Object.entries(BASE_COPY).map(([key, value]) => [key, { ...value, ZH: ZH_COPY[key as keyof typeof ZH_COPY] }]),
) as { [K in keyof typeof BASE_COPY]: typeof BASE_COPY[K] & { ZH: (typeof ZH_COPY)[K] } }

const localeCode = (lang: DisplayLocale) => lang === 'JP' ? 'ja' : lang === 'ZH' ? 'zh-cn' : lang.toLowerCase()

export function ChinaMarketResearchView({ forceLang, forceDisplayLocale, externalApplicationWindowOpen }: { forceLang?: Lang; forceDisplayLocale?: DisplayLocale; externalApplicationWindowOpen: boolean }) {
  const { lang: contextLang, setLang } = useLang()
  const lang = forceLang ?? contextLang
  const displayLocale = forceDisplayLocale ?? lang
  const [selected, setSelected] = useState<'yiwu' | 'guangzhou' | null>(null)
  const prefix = displayLocale === 'EN' ? '/en' : displayLocale === 'JP' ? '/ja' : displayLocale === 'ZH' ? '/zh' : ''
  const backHref = displayLocale === 'ZH' ? '/zh/select' : localizeHref('/programs/market', lang)

  useEffect(() => {
    if (forceLang && forceLang !== contextLang) setLang(forceLang)
  }, [contextLang, forceLang, setLang])

  useEffect(() => {
    trackEvent('campaign_view', {
      campaign_id: CHINA_CAMPAIGN_ID,
      variant: 'comparison',
      placement: 'campaign_landing',
      source_page: `${prefix}/programs/china-market-research`,
      locale: localeCode(displayLocale),
    })
  }, [displayLocale, prefix])

  const trackVariant = (variant: 'yiwu' | 'guangzhou', placement: string) => {
    setSelected(variant)
    trackEvent('program_variant_click', {
      campaign_id: CHINA_CAMPAIGN_ID,
      variant,
      placement,
      source_page: `${prefix}/programs/china-market-research`,
      locale: localeCode(displayLocale),
    })
  }

  return (
    <main className={`min-h-screen bg-[#f5f2ea] text-[#102a36] ${displayLocale === 'JP' ? '[word-break:normal]' : ''}`}>
      <section className="relative overflow-hidden bg-[#071e2a] px-5 pb-14 pt-16 text-white sm:px-6 sm:pb-20 sm:pt-20">
        <div className="absolute inset-0 opacity-70" aria-hidden="true">
          <div className="absolute -right-20 top-8 h-72 w-72 rounded-full border-[58px] border-[#b94032]/35" />
          <div className="absolute bottom-0 right-[28%] h-48 w-48 rounded-full border-[38px] border-[#d7aa50]/25" />
          <div className="absolute inset-y-0 left-[58%] w-px bg-white/10" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <Link href={backHref} className="inline-flex min-h-11 items-center gap-2 text-xs font-black text-white/65 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" /> {COPY.back[displayLocale] as string}
          </Link>
          <div className="mt-10 grid min-w-0 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="min-w-0">
              <p className="text-[0.68rem] font-black tracking-[0.18em] text-[#73d6f5]">{COPY.eyebrow[displayLocale] as string}</p>
              <h1 className="mt-5 whitespace-pre-line text-[clamp(2.7rem,7vw,5.7rem)] font-black leading-[0.98] tracking-[-0.055em]">{COPY.title[displayLocale] as string}</h1>
              <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-white/68 sm:text-lg">{COPY.intro[displayLocale] as string}</p>
            </div>
            <div className="grid min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-[1.75rem] border border-white/12 bg-white/7 p-4 backdrop-blur-sm sm:gap-3 sm:p-8">
              <button type="button" onClick={() => trackVariant('yiwu', 'hero_route')} className={`min-h-24 min-w-0 rounded-2xl p-2 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:p-4 ${selected === 'yiwu' ? 'bg-[#d7aa50] text-[#071e2a]' : 'bg-white/7 text-white'}`}>
                <span className="block text-[0.55rem] font-black tracking-[0.12em] opacity-65 sm:text-[0.62rem] sm:tracking-[0.16em]">126 · 10.08—12</span><strong className="mt-2 block text-xl font-black sm:text-2xl">YIWU</strong>
              </button>
              <Route className="h-6 w-6 text-white/45" aria-hidden="true" />
              <button type="button" onClick={() => trackVariant('guangzhou', 'hero_route')} className={`min-h-24 min-w-0 rounded-2xl p-2 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:p-4 ${selected === 'guangzhou' ? 'bg-[#b94032] text-white' : 'bg-white/7 text-white'}`}>
                <span className="block text-[0.55rem] font-black tracking-[0.1em] opacity-65 sm:text-[0.62rem] sm:tracking-[0.16em]">127 · 10.16—20</span><strong className="mt-2 block text-sm font-black tracking-[-0.03em] sm:text-2xl sm:tracking-normal">GUANGZHOU</strong>
              </button>
            </div>
          </div>
          <nav aria-label="On this page" className="mt-10 flex gap-2 overflow-x-auto pb-1">
            {[['#compare', COPY.navCompare[displayLocale]], ['#flow', COPY.navFlow[displayLocale]], ['#trust', COPY.navTrust[displayLocale]]].map(([href, label]) => (
              <a key={href as string} href={href as string} className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-white/15 bg-white/7 px-4 text-xs font-black text-white/78 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{label as string}</a>
            ))}
          </nav>
        </div>
      </section>

      <section id="compare" data-visual-module="china-route-comparison" className="scroll-mt-24 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.68rem] font-black tracking-[0.16em] text-[#a33b31]">{COPY.compareEyebrow[displayLocale] as string}</p>
          <h2 className="mt-3 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.045em]">{COPY.compareTitle[displayLocale] as string}</h2>
          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            {CHINA_RESEARCH_VARIANTS.map((variant, index) => {
              const isSelected = selected === variant.id
              const canApply = externalApplicationWindowOpen && variant.externalUrl
              return (
                <article key={variant.id} className={`overflow-hidden rounded-[2rem] border bg-white shadow-[0_18px_55px_rgba(16,42,54,0.08)] transition ${isSelected ? 'border-[#1b718b] ring-2 ring-[#1b718b]/10' : 'border-[#d9dfdc]'}`}>
                  <button type="button" onClick={() => trackVariant(variant.id, 'comparison_card')} className="w-full p-7 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#1b718b] sm:p-9">
                    <div className="flex items-start justify-between gap-5">
                      <div><span className="text-[0.64rem] font-black tracking-[0.16em] text-[#7a8b8f]">0{index + 1} · {variant.eyebrow[displayLocale]}</span><h3 className="mt-2 text-4xl font-black tracking-[-0.04em]">{variant.city[displayLocale]}</h3></div>
                      <span className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#edf7eb] px-3 text-[0.67rem] font-black text-[#357043]">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        {(externalApplicationWindowOpen ? COPY.live[displayLocale] : COPY.archived[displayLocale]) as string}
                      </span>
                    </div>
                    <h4 className="mt-7 text-xl font-black leading-snug sm:text-2xl">{variant.title[displayLocale]}</h4>
                    <p className="mt-3 text-sm leading-7 text-[#52666d]">{variant.summary[displayLocale]}</p>
                  </button>
                  <div className="border-t border-[#e4e8e6] px-7 py-6 sm:px-9">
                    <p className="text-xs font-black text-[#233d48]">{COPY.fit[displayLocale] as string}</p>
                    <p className="mt-2 text-sm leading-6 text-[#52666d]">{variant.objective[displayLocale]}</p>
                    <ul className="mt-5 space-y-3">
                      {variant.fit.map((item) => <li key={item[displayLocale]} className="flex gap-3 text-sm text-[#334d57]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1b718b]" aria-hidden="true" /> {item[displayLocale]}</li>)}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 border-t border-[#e4e8e6] bg-[#f8f8f5]">
                    {variant.facts.map((fact) => <div key={fact.label[displayLocale]} className="min-h-24 border-b border-r border-[#e4e8e6] p-5 last:border-b-0"><span className="block text-[0.65rem] font-bold text-[#7a8b8f]">{fact.label[displayLocale]}</span><strong className="mt-1 block text-sm leading-6 text-[#17323d]">{fact.value[displayLocale]}</strong></div>)}
                  </div>
                  <div className="p-7 sm:p-9">
                    {canApply ? (
                      <a href={variant.externalUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('external_application_click', { campaign_id: CHINA_CAMPAIGN_ID, variant: variant.id, placement: 'comparison_card', source_page: `${prefix}/programs/china-market-research`, locale: localeCode(displayLocale) })} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#173d4c] px-5 text-sm font-black text-white hover:bg-[#245b70] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173d4c]">
                        {(variant.id === 'yiwu' ? COPY.chooseYiwu[displayLocale] : COPY.chooseGuangzhou[displayLocale]) as string} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <p className="rounded-2xl bg-[#f0f1ee] p-4 text-xs font-bold leading-6 text-[#667378]">{COPY.noCta[displayLocale] as string}</p>
                    )}
                    <a href={variant.officialReferenceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-black text-[#587078] hover:text-[#173d4c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173d4c]">{COPY.reference[displayLocale] as string} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="flow" className="scroll-mt-24 bg-[#dfecef] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-[0.68rem] font-black tracking-[0.16em] text-[#1b718b]">{COPY.flowEyebrow[displayLocale] as string}</p>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.045em]">{COPY.flowTitle[displayLocale] as string}</h2>
            <div className="mt-7 rounded-[1.5rem] bg-[#173d4c] p-6 text-white"><CalendarDays className="h-6 w-6 text-[#74d5f3]" aria-hidden="true" /><h3 className="mt-4 text-lg font-black">{COPY.dayTitle[displayLocale] as string}</h3><p className="mt-2 text-sm leading-7 text-white/70">{COPY.dayBody[displayLocale] as string}</p></div>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {(COPY.flow[displayLocale] as string[]).map((item, index) => <li key={item} className="flex min-h-40 flex-col justify-between rounded-[1.5rem] border border-[#abc5ca] bg-white/70 p-6"><span className="text-sm font-black text-[#1b718b]">0{index + 1}</span><strong className="mt-8 text-lg leading-7">{item}</strong></li>)}
          </ol>
        </div>
      </section>

      <section id="trust" className="scroll-mt-24 bg-[#071e2a] px-5 py-14 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="min-w-0"><ShieldCheck className="h-8 w-8 text-[#74d5f3]" aria-hidden="true" /><h2 className="mt-5 max-w-lg break-words text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.045em]">{COPY.trustTitle[displayLocale] as string}</h2></div>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2">
              <article className="min-w-0 rounded-[1.5rem] border border-white/12 bg-white/7 p-6"><Map className="h-6 w-6 text-[#74d5f3]" aria-hidden="true" /><h3 className="mt-5 font-black">Wakation</h3><p className="mt-2 break-words text-sm leading-7 text-white/65">{COPY.trustWakation[displayLocale] as string}</p></article>
              <article className="min-w-0 rounded-[1.5rem] border border-white/12 bg-white/7 p-6"><Building2 className="h-6 w-6 text-[#d7aa50]" aria-hidden="true" /><h3 className="mt-5 font-black">{displayLocale === 'ZH' ? '外部运营方' : 'External operator'}</h3><p className="mt-2 break-words text-sm leading-7 text-white/65">{COPY.trustOperator[displayLocale] as string}</p></article>
            </div>
          </div>
          <div className="mt-12 border-t border-white/12 pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black tracking-[0.14em] text-white/45">SOURCES</p><h3 className="mt-2 text-xl font-black">{COPY.sourcesTitle[displayLocale] as string}</h3></div><span className="text-xs text-white/45">{COPY.verified[displayLocale] as string}</span></div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                [COPY.sourceOperator[displayLocale], CHINA_APPLICATION_URL],
                [COPY.sourceYiwu[displayLocale], 'https://www.yw.gov.cn/art/2008/12/29/art_1229142437_50763529.html'],
                [COPY.sourceGuangzhou[displayLocale], 'https://www.cantonfair.org.cn/en-US?m=0'],
              ].map(([label, href]) => <a key={href as string} href={href as string} target="_blank" rel="noopener noreferrer" className="flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-white/12 px-5 text-sm font-bold text-white/70 hover:bg-white/7 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{label as string}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a>)}
            </div>
          </div>
          <Link href={displayLocale === 'ZH' ? '/zh/select' : `${prefix}/programs`} className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-black hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{COPY.backCta[displayLocale] as string}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  )
}
