'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Heart } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ShareButton } from '@/components/share/ShareButton'
import { useWishlist } from '@/hooks/useWishlist'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import type { ExperienceEditorial } from '@/lib/experiences/editorials'
import type { Lang } from '@/lib/i18n/types'
import { getMediaAsset } from '@/lib/media/assets'
import { ICON_STROKE } from '@/lib/icons'
import { trackAffiliateClick, trackEvent } from '@/lib/track'
import { ExperiencePreparationCard } from '@/components/experiences/ExperiencePreparationCard'

const COPY = {
  back: { KO: '현지 체험', EN: 'Local experiences', JP: '現地体験' },
  save: { KO: '저장', EN: 'Save', JP: '保存' },
  saved: { KO: '저장됨', EN: 'Saved', JP: '保存済み' },
  editor: { KO: 'Wakation 에디터 노트', EN: "Wakation editor's note", JP: 'Wakation エディターノート' },
  bestFor: { KO: '이런 일정에 잘 맞아요', EN: 'A good fit when', JP: 'こんな旅に合います' },
  facts: { KO: '한눈에 보기', EN: 'At a glance', JP: 'ひと目でわかること' },
  reasons: { KO: '이 일정에 넣기 좋은 이유', EN: 'Why it fits the itinerary', JP: '旅程に入れやすい理由' },
  flow: { KO: '추천 하루 흐름', EN: 'Suggested day flow', JP: 'おすすめの一日の流れ' },
  course: { KO: '코스와 시간', EN: 'Route and timing', JP: 'コースと時間' },
  morning: { KO: '오전 출발', EN: 'Morning departure', JP: '午前出発' },
  afternoon: { KO: '오후 출발', EN: 'Afternoon departure', JP: '午後出発' },
  courseNote: { KO: '시간과 방문 순서는 교통·날씨·현장 상황에 따라 달라질 수 있습니다.', EN: 'Times and stop order may change with traffic, weather and local conditions.', JP: '時間・訪問順は交通、天候、現地状況により変更される場合があります。' },
  included: { KO: '확인된 포함사항', EN: 'Listed as included', JP: '含まれると確認できたもの' },
  prepare: { KO: '별도 준비·확인', EN: 'Prepare or confirm separately', JP: '別途準備・確認すること' },
  reviews: { KO: '후기를 볼 때 확인할 점', EN: 'What to check in reviews', JP: '口コミで確認したいこと' },
  providerMetrics: { KO: '제휴사 후기 지표', EN: 'Provider review metrics', JP: '提携先の口コミ指標' },
  metricsNote: { KO: 'Wakation 직접 후기가 아닙니다. 후기 원문과 사진은 제휴사에서 확인하세요.', EN: 'These are not Wakation reviews. Read the full reviews and see photos on the provider site.', JP: 'Wakationの口コミではありません。全文と写真は提携先で確認してください。' },
  reviewSource: { KO: '제휴사에서 후기 전체 확인', EN: 'Read all reviews with the provider', JP: '提携先で口コミ全文を確認' },
  operator: { KO: '판매·운영 주체', EN: 'Operator and seller', JP: '運営・販売主体' },
  operatorLabel: { KO: '상품 운영사', EN: 'Experience operator', JP: '商品運営会社' },
  sellerLabel: { KO: '예약·결제 제휴사', EN: 'Booking and payment', JP: '予約・決済の提携先' },
  roleLabel: { KO: 'Wakation의 역할', EN: "Wakation's role", JP: 'Wakationの役割' },
  role: { KO: '여행 구성을 돕고 외부 상품을 편집·소개합니다.', EN: 'We help shape the trip and editorially introduce an external product.', JP: '旅の組み立てを助け、外部商品を編集・紹介します。' },
  checks: { KO: '예약 전 확인', EN: 'Check before booking', JP: '予約前の確認' },
  faq: { KO: '자주 묻는 질문', EN: 'Frequently asked questions', JP: 'よくある質問' },
  preparationEyebrow: { KO: 'NEXT FOR THIS TRIP', EN: 'NEXT FOR THIS TRIP', JP: 'NEXT FOR THIS TRIP' },
  preparation: { KO: '체험을 골랐다면, 여행 준비까지 한 번에', EN: 'Once the experience fits, prepare the rest of the trip', JP: '体験を決めたら、旅の準備もまとめて' },
  preparationDesc: { KO: '하카타 숙소와 이동, 현지 연결 수단을 따로 헤매지 않도록 이 일정에 필요한 순서로 모았습니다.', EN: 'A short, itinerary-led list for the stay, journey and connectivity around this experience.', JP: '博多の宿、移動、現地での通信を、この体験に合わせた順番でまとめました。' },
  preparationDisclosure: { KO: '각 항목은 별도 제휴사 상품입니다. Wakation은 예약·결제·변경·취소·환불을 처리하지 않으며, 최종 조건은 연결된 제휴사에서 확인합니다.', EN: 'Each item is offered by an external affiliate partner. Wakation does not process bookings, payments, changes, cancellations or refunds; confirm final terms with each provider.', JP: '各項目は外部提携先の商品です。Wakationでは予約・決済・変更・キャンセル・返金を扱いません。最終条件は各提携先でご確認ください。' },
  related: { KO: '여행 구성 더 보기', EN: 'Continue planning the itinerary', JP: '旅の組み立てを続ける' },
  tripSet: { KO: '후쿠오카 3박 4일 구성', EN: 'Fukuoka 3N4D Trip Set', JP: '福岡3泊4日 Trip Set' },
  guide: { KO: '후쿠오카 여행지 가이드', EN: 'Fukuoka destination guide', JP: '福岡の旅行先ガイド' },
  affiliate: { KO: '제휴사 상품', EN: 'Affiliate product', JP: '提携先商品' },
  cta: { KO: 'Klook에서 현재 조건 확인', EN: 'Check current details on Klook', JP: 'Klookで最新条件を確認' },
  disclosure: { KO: '일부 외부 링크를 통해 Wakation이 수수료를 받을 수 있습니다. 이용 요금에는 영향이 없습니다. 실제 일정·가격·언어·포함사항은 변경될 수 있으며 예약·결제·변경·취소·환불은 연결된 제휴사의 약관과 정책을 따릅니다.', EN: 'Wakation may earn a commission from some external links at no added cost to you. Schedules, prices, languages and inclusions may change; booking, payment, changes, cancellations and refunds follow the connected provider’s policies.', JP: '一部の外部リンク経由でWakationが手数料を受け取る場合がありますが、利用料金には影響しません。日程・価格・言語・含まれる内容は変更されることがあり、予約・決済・変更・キャンセル・返金は接続先の提携会社の規約に従います。' },
  verified: { KO: '정보 확인', EN: 'Verified', JP: '情報確認' },
  nav: {
    KO: '페이지 섹션', EN: 'Page sections', JP: 'ページ内メニュー',
  },
} satisfies Record<string, Record<Lang, string>>

const ANCHORS = [
  ['overview', { KO: '소개', EN: 'Overview', JP: '紹介' }],
  ['facts', { KO: '핵심 정보', EN: 'Facts', JP: '基本情報' }],
  ['course', { KO: '일정', EN: 'Route', JP: '日程' }],
  ['reviews', { KO: '후기', EN: 'Reviews', JP: '口コミ' }],
  ['checks', { KO: '확인사항', EN: 'Checks', JP: '確認事項' }],
  ['faq', { KO: 'FAQ', EN: 'FAQ', JP: 'FAQ' }],
  ['prepare', { KO: '여행 준비', EN: 'Plan', JP: '旅の準備' }],
] as const

export function ExperienceEditorialView({ experience, forceLang }: { experience: ExperienceEditorial; forceLang?: Lang }) {
  const { lang: contextLang, setLang } = useLang()
  const lang = forceLang ?? contextLang
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  const media = getMediaAsset(experience.mediaAssetIds[0])
  const itemBase = getCatalogItems([experience.affiliateItemId])[0]
  const item = itemBase ? localizeAffiliateItem(itemBase, lang) : undefined
  const preparationItems = experience.preparationItems
    .map((entry) => {
      const catalogItem = getCatalogItems([entry.itemId])[0]
      return catalogItem ? { ...entry, item: localizeAffiliateItem(catalogItem, lang) } : undefined
    })
    .filter((entry): entry is NonNullable<typeof entry> => !!entry)
  const { has, toggle } = useWishlist()
  const saved = has(experience.affiliateItemId)
  const activeProvider = experience.providers.find((provider) => provider.status === 'active_affiliate')
  const providerKey = activeProvider?.provider ?? experience.reviewSnapshot.provider.toLowerCase()
  const providerName = experience.reviewSnapshot.provider
  const reviewSourceUrl = experience.reviewSnapshot.localizedSourceUrls?.[lang] ?? experience.reviewSnapshot.sourceUrl
  const reviewCount = experience.reviewSnapshot.reviewCount === undefined
    ? undefined
    : new Intl.NumberFormat(lang === 'JP' ? 'ja-JP' : lang === 'EN' ? 'en-US' : 'ko-KR').format(experience.reviewSnapshot.reviewCount)
  const affiliateHref = item?.deepLinks?.[lang] ?? item?.href

  useEffect(() => {
    if (forceLang && forceLang !== contextLang) setLang(forceLang)
  }, [contextLang, forceLang, setLang])

  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get('src') ?? 'direct'
    trackEvent('experience_editorial_open', {
      locale: lang,
      experience_slug: experience.slug,
      destination: experience.destinationSlug,
      source,
    })
  }, [experience.destinationSlug, experience.slug, lang])

  if (!media || !item) return null

  const handleSave = () => {
    toggle(experience.affiliateItemId, {
      content_type: 'experience',
      content_slug: experience.slug,
      locale: lang,
      destination: experience.destinationSlug,
      source_section: 'experience_editorial',
    })
  }

  const handleAffiliate = () => {
    trackEvent('experience_provider_click', {
      locale: lang,
      experience_slug: experience.slug,
      destination: experience.destinationSlug,
      provider: providerKey,
    })
    trackAffiliateClick({
      id: item.id,
      itemName: item.productTitle ?? item.displayTitle ?? item.name,
      provider: item.name,
      status: item.status,
      sourceSection: 'experience_editorial_provider',
      ctaLabel: item.cta,
      ctaPosition: 'provider_cta',
      destination: experience.destinationSlug,
      category: item.category,
      locale: lang,
    })
  }

  return (
    <div className={`min-h-screen overflow-x-clip bg-[#fbfaf7] ${lang === 'JP' ? 'font-jp [word-break:normal]' : ''}`}>
      <section className="dark-surface relative flex min-h-[580px] items-end overflow-hidden sm:min-h-[650px] lg:min-h-[720px]">
        <Image
          src={media.src}
          alt={media.alt[lang]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: `${(media.focalPoint?.x ?? 0.5) * 100}% ${(media.focalPoint?.y ?? 0.5) * 100}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071b27]/95 via-[#071b27]/38 to-black/10" />
        <div className={`absolute inset-0 hidden lg:block ${experience.heroContentSide === 'right' ? 'bg-gradient-to-l from-[#071b27]/72 via-[#071b27]/18 to-transparent' : 'bg-gradient-to-r from-[#071b27]/64 via-[#071b27]/12 to-transparent'}`} />
        <Link href={`${prefix}/select/activity`} className="absolute left-5 top-5 z-20 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 text-xs font-bold text-white/90 backdrop-blur-sm hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:hidden">
          <ArrowLeft className="h-4 w-4" strokeWidth={ICON_STROKE} /> {COPY.back[lang]}
        </Link>
        <div className={`relative mx-auto w-full max-w-6xl px-5 pb-8 pt-28 sm:px-6 sm:pb-12 lg:pb-16 ${experience.heroContentSide === 'right' ? 'lg:flex lg:flex-col lg:items-end lg:text-right' : ''}`}>
          <Link href={`${prefix}/select/activity`} className="mb-5 hidden min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 text-xs font-bold text-white/85 backdrop-blur-sm hover:bg-black/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:inline-flex">
            <ArrowLeft className="h-4 w-4" strokeWidth={ICON_STROKE} /> {COPY.back[lang]}
          </Link>
          <span className="mb-3 block text-[0.7rem] font-black tracking-[0.17em] text-sky-200">{experience.heroEyebrow[lang]}</span>
          <h1 className="max-w-4xl text-balance text-[2.25rem] font-black leading-[1.06] text-white sm:text-5xl lg:text-6xl">{experience.title[lang]}</h1>
          <span className="mt-4 block max-w-2xl text-sm font-semibold leading-6 text-white/85 sm:text-base sm:leading-7">{experience.subtitle[lang]}</span>
          <div className={`mt-6 flex flex-wrap items-center gap-2.5 ${experience.heroContentSide === 'right' ? 'lg:justify-end' : ''}`}>
            <button type="button" onClick={handleSave} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-black/25 px-5 text-sm font-bold text-white backdrop-blur-sm hover:bg-black/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <Heart className={`h-4 w-4 ${saved ? 'fill-rose-400 text-rose-400' : ''}`} strokeWidth={ICON_STROKE} />
              {saved ? COPY.saved[lang] : COPY.save[lang]}
            </button>
            <ShareButton title={`${experience.title[lang]} — Wakation`} text={experience.subtitle[lang]} url={`https://www.wakation.kr${prefix}/experiences/${experience.slug}`} contentType="experience" slug={experience.slug} />
          </div>
        </div>
      </section>

      <nav aria-label={COPY.nav[lang]} className="sticky top-16 z-30 border-b border-[#dae4e4] bg-white/95 px-4 py-2.5 shadow-[0_8px_22px_rgba(15,50,65,0.05)] backdrop-blur-lg sm:px-6">
        <div className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ANCHORS.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => trackEvent('experience_anchor_click', { locale: lang, experience_slug: experience.slug, destination: experience.destinationSlug, source: id })} className="inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-xs font-black text-[#526670] hover:bg-[#edf4f5] hover:text-[#163e51] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
              {label[lang]}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <section id="overview" data-motion="reveal" className="scroll-mt-32 border-b border-[#e9e5dc] bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(17rem,0.75fr)]">
            <div>
              <span className="text-[0.7rem] font-black tracking-[0.15em] text-[#5e8491]">{COPY.editor[lang]}</span>
              <p className="mt-3 max-w-3xl text-[1.03rem] leading-8 text-[#344a56]">{experience.editorNote[lang]}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#dfe7e5] bg-[#f4f8f6] p-5 sm:p-6">
              <h2 className="text-base font-black text-[#173440]">{COPY.bestFor[lang]}</h2>
              <ul className="mt-4 space-y-3">
                {experience.bestFor.map((entry) => <li key={entry[lang]} className="flex gap-3 text-sm leading-6 text-[#53656d]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#3a8297]" strokeWidth={ICON_STROKE} />{entry[lang]}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="facts" data-motion="reveal" className="scroll-mt-32 border-b border-[#e8e1d7] bg-[#f4f0e8] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-black text-[#172a36] sm:text-3xl">{COPY.facts[lang]}</h2>
            <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-[#ddd6ca] bg-[#ddd6ca] sm:grid-cols-3">
              {experience.facts.map((fact) => <div key={fact.label[lang]} className="min-w-0 bg-white px-4 py-5 sm:px-5"><span className="block text-[0.68rem] font-black tracking-[0.1em] text-[#8a969a]">{fact.label[lang]}</span><span className="mt-1.5 block break-words text-sm font-black text-[#203944] sm:text-base">{fact.value[lang]}</span></div>)}
            </div>
            <h2 className="mt-12 text-2xl font-black text-[#172a36] sm:text-3xl">{COPY.reasons[lang]}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {experience.reasons.map((reason, index) => <div key={reason[lang]} className="border-l-2 border-[#6ba2af] py-1 pl-4"><span className="block text-[0.68rem] font-black text-[#8a9ca2]">0{index + 1}</span><span className="mt-2 block text-sm font-semibold leading-6 text-[#425862]">{reason[lang]}</span></div>)}
            </div>
          </div>
        </section>

        <section className="border-b border-[#e1e8e7] bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-black text-[#172a36] sm:text-3xl">{COPY.flow[lang]}</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {experience.suggestedFlows.map((flow) => <div key={flow.label[lang]} className="rounded-[1.5rem] border border-[#dfe7e7] bg-[#f7faf9] p-5 sm:p-6"><span className="text-[0.68rem] font-black tracking-[0.13em] text-[#4c8494]">{flow.label[lang]}</span><h3 className="mt-2 text-lg font-black text-[#1d3540]">{flow.title[lang]}</h3><ul className="mt-4 space-y-2.5">{flow.items.map((entry) => <li key={entry[lang]} className="text-sm leading-6 text-[#5c6d74]">{entry[lang]}</li>)}</ul></div>)}
            </div>
          </div>
        </section>

        <section id="course" data-motion="reveal" data-motion-variant="fade" className="scroll-mt-32 border-b border-[#e8e1d7] bg-[#0b2938] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-black text-white sm:text-3xl">{COPY.course[lang]}</h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {([['morning', experience.courseLabels.morning[lang]], ['afternoon', experience.courseLabels.afternoon[lang]]] as const).map(([period, title]) => <div key={period} className="rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-5 sm:p-6"><h3 className="text-lg font-black text-white">{title}</h3><ol className="mt-5 space-y-0">{experience.course[period].map((stop, index) => <li key={`${stop.time}-${stop.title[lang]}`} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3"><span className="pt-0.5 text-xs font-black text-sky-300">{stop.time}</span><div className={`relative pb-5 pl-4 ${index < experience.course[period].length - 1 ? 'border-l border-white/18' : ''}`}><span className="absolute -left-1.5 top-0 h-3 w-3 rounded-full border-2 border-[#0b2938] bg-sky-300" /><span className="block text-sm font-bold text-white/92">{stop.title[lang]}</span>{stop.note && <span className="mt-1 block text-xs leading-5 text-white/58">{stop.note[lang]}</span>}</div></li>)}</ol></div>)}
            </div>
            <p className="mt-5 text-xs leading-6 text-white/58">{COPY.courseNote[lang]}</p>
          </div>
        </section>

        <section className="border-b border-[#e1e8e7] bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {([[COPY.included[lang], experience.included], [COPY.prepare[lang], experience.prepareSeparately]] as const).map(([title, entries]) => <div key={title} className="rounded-[1.5rem] border border-[#dfe7e7] p-5 sm:p-6"><h2 className="text-lg font-black text-[#1c3540]">{title}</h2><ul className="mt-4 space-y-3">{entries.map((entry) => <li key={entry[lang]} className="flex gap-3 text-sm leading-6 text-[#5d6d74]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4c8a99]" strokeWidth={ICON_STROKE} />{entry[lang]}</li>)}</ul></div>)}
          </div>
        </section>

        <section id="reviews" data-motion="reveal" className="scroll-mt-32 border-b border-[#e8e1d7] bg-[#f4f0e8] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,1.25fr)]">
            <div className="rounded-[1.5rem] bg-[#143848] p-6 text-white">
              <span className="text-[0.68rem] font-black tracking-[0.13em] text-sky-200">{COPY.providerMetrics[lang]}</span>
              <div className="mt-3 flex items-end gap-3"><span className="text-4xl font-black">{experience.reviewSnapshot.rating}</span><span className="pb-1 text-sm font-bold text-white/70">/ 5{reviewCount ? ` · ${reviewCount}` : ''}</span></div>
              <span className="mt-2 block text-xs text-white/55">{providerName} · {COPY.verified[lang]} {experience.reviewSnapshot.verifiedAt}</span>
              <p className="mt-5 text-xs leading-6 text-white/65">{COPY.metricsNote[lang]}</p>
              <a href={reviewSourceUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('experience_review_source_open', { locale: lang, experience_slug: experience.slug, destination: experience.destinationSlug, source: providerKey })} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-sky-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{COPY.reviewSource[lang]} <ArrowUpRight className="h-4 w-4" strokeWidth={ICON_STROKE} /></a>
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#172a36] sm:text-3xl">{COPY.reviews[lang]}</h2>
              <div className="mt-6 flex flex-wrap gap-2.5">{experience.reviewTopics.map((topic) => <span key={topic[lang]} className="rounded-full border border-[#d4ddd9] bg-white px-3.5 py-2 text-xs font-bold text-[#4f626a]">{topic[lang]}</span>)}</div>
            </div>
          </div>
        </section>

        <section id="checks" data-motion="reveal" className="scroll-mt-32 border-b border-[#e1e8e7] bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <div><h2 className="text-2xl font-black text-[#172a36] sm:text-3xl">{COPY.operator[lang]}</h2><dl className="mt-6 divide-y divide-[#e7eceb] border-y border-[#e7eceb]">{[[COPY.operatorLabel[lang], experience.operator[lang]], [COPY.sellerLabel[lang], providerName], [COPY.roleLabel[lang], COPY.role[lang]]].map(([term, description]) => <div key={term} className="grid grid-cols-[8rem_minmax(0,1fr)] gap-3 py-4"><dt className="text-xs font-black text-[#7b8a90]">{term}</dt><dd className="text-sm font-semibold leading-6 text-[#334c57]">{description}</dd></div>)}</dl></div>
            <div><h2 className="text-2xl font-black text-[#172a36] sm:text-3xl">{COPY.checks[lang]}</h2><ul className="mt-6 space-y-3">{experience.checks.map((entry) => <li key={entry[lang]} className="flex gap-3 rounded-2xl bg-[#f4f8f7] px-4 py-3.5 text-sm leading-6 text-[#53666d]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4c8a99]" strokeWidth={ICON_STROKE} />{entry[lang]}</li>)}</ul></div>
          </div>
        </section>

        <section id="faq" data-motion="reveal" data-motion-variant="fade" className="scroll-mt-32 border-b border-[#e8e1d7] bg-[#fbfaf7] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl"><h2 className="text-2xl font-black text-[#172a36] sm:text-3xl">{COPY.faq[lang]}</h2><div className="mt-7 divide-y divide-[#dfe5e3] border-y border-[#dfe5e3]">{experience.faq.map((entry) => <details key={entry.question[lang]} className="group"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-sm font-black text-[#233f4a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 [&::-webkit-details-marker]:hidden"><span>{entry.question[lang]}</span><span className="text-xl font-light text-[#6b8791] transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-5 pr-8 text-sm leading-7 text-[#607078]">{entry.answer[lang]}</p></details>)}</div></div>
        </section>

        <section id="prepare" data-motion="reveal" className="scroll-mt-32 border-b border-[#dfe6e5] bg-[#f1eee7] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <span className="text-[0.68rem] font-black tracking-[0.15em] text-[#3d8298]">{COPY.preparationEyebrow[lang]}</span>
            <div className="mt-2 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.55fr)] lg:items-end">
              <h2 className="max-w-3xl text-2xl font-black text-[#172a36] sm:text-3xl">{COPY.preparation[lang]}</h2>
              <span className="text-sm leading-6 text-[#5d7077] lg:text-right">{experience.preparationDescription[lang]}</span>
            </div>
            <div className="mt-7 grid auto-rows-fr gap-4 md:grid-cols-3">
              {preparationItems.map((entry, index) => (
                <ExperiencePreparationCard
                  key={entry.itemId}
                  item={entry.item}
                  reason={entry.reason[lang]}
                  lang={lang}
                  experienceSlug={experience.slug}
                  destinationSlug={experience.destinationSlug}
                  position={index + 1}
                  displayTitle={entry.title?.[lang]}
                  displayDestination={entry.destinationLabel?.[lang]}
                />
              ))}
            </div>
            <span className="mt-5 block max-w-4xl text-xs leading-6 text-[#718087]">{COPY.preparationDisclosure[lang]}</span>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-6 sm:py-16"><div className="mx-auto max-w-5xl"><h2 className="text-2xl font-black text-[#172a36] sm:text-3xl">{COPY.related[lang]}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{experience.relatedTripSetSlugs.map((slug) => <Link key={slug} href={`${prefix}/collections/${slug}`} onClick={() => trackEvent('experience_related_trip_click', { locale: lang, experience_slug: experience.slug, destination: experience.destinationSlug, trip_set: slug })} className="group flex min-h-24 items-center justify-between rounded-[1.35rem] border border-[#dce5e5] bg-[#f7faf9] px-5 py-4 text-sm font-black text-[#244755] hover:border-[#95bbc6]">{experience.relatedLabels.tripSet[lang]}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={ICON_STROKE} /></Link>)}{experience.relatedGuideSlugs.map((slug) => <Link key={slug} href={`${prefix}/guide/${slug}`} onClick={() => trackEvent('experience_related_guide_click', { locale: lang, experience_slug: experience.slug, destination: slug })} className="group flex min-h-24 items-center justify-between rounded-[1.35rem] border border-[#dce5e5] bg-[#f7faf9] px-5 py-4 text-sm font-black text-[#244755] hover:border-[#95bbc6]">{experience.relatedLabels.guide[lang]}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={ICON_STROKE} /></Link>)}</div></div></section>

        <section className="dark-surface bg-[#071c29] px-5 py-12 sm:px-6 sm:py-16"><div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"><div><span className="text-[0.68rem] font-black tracking-[0.15em] text-sky-300">{COPY.affiliate[lang]}</span><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{experience.title[lang]}</h2><span className="mt-3 block max-w-2xl text-sm leading-6 text-white/65">{COPY.disclosure[lang]}</span><span className="mt-3 block text-xs font-bold text-white/45">{COPY.verified[lang]} {experience.verifiedAt}</span></div><a href={affiliateHref} target="_blank" rel="sponsored noopener noreferrer" onClick={handleAffiliate} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#083b52] transition hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{item.cta}<ArrowUpRight className="h-4 w-4" strokeWidth={ICON_STROKE} /></a></div></section>
      </main>
    </div>
  )
}
