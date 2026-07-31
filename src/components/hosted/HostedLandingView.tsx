'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NotifySignup } from '@/components/home/NotifySignup'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'
import { trackEvent } from '@/lib/track'

type L = Record<Lang, string>
type HostedInterest = 'domestic' | 'market' | 'language' | 'networking'

const COPY = {
  badge: { KO: '직접 기획·운영', EN: 'PLANNED & RUN BY WAKATION', JP: 'WAKATION 直営' },
  title: {
    KO: '다음 워케이션,\n열리기 전에 만나보세요',
    EN: 'Meet your next workation\nbefore it opens',
    JP: '次のワーケーションを、\n募集前から見つける',
  },
  lead: {
    KO: '머물고, 일하고, 연결되는 시간을 Wakation이 직접 설계합니다. 지금은 관심 분야만 남겨주세요. 일정과 조건이 확정되면 먼저 안내합니다.',
    EN: 'Wakation designs the stay, work rhythm and connections end to end. Tell us what interests you now; we will share updates when dates and terms are confirmed.',
    JP: '滞在・仕事・つながりの時間をWakationが一貫して設計します。今は関心分野だけを登録。日程と条件が確定したら先にお知らせします。',
  },
  primary: { KO: '관심 분야 고르기', EN: 'Choose an interest', JP: '関心分野を選ぶ' },
  report: { KO: '양양 1기 운영 기록', EN: 'See the Yangyang pilot', JP: '襄陽1期の運営記録' },
  clarity1: { KO: 'Wakation 직접 운영', EN: 'Run by Wakation', JP: 'Wakation直営' },
  clarity2: { KO: '확정 일정만 안내', EN: 'Confirmed dates only', JP: '確定日程のみ案内' },
  clarity3: { KO: '관심 등록 단계 결제 없음', EN: 'No payment to register', JP: '関心登録時の決済なし' },
  interestEyebrow: { KO: 'CHOOSE YOUR NEXT STAY', EN: 'CHOOSE YOUR NEXT STAY', JP: 'CHOOSE YOUR NEXT STAY' },
  interestTitle: { KO: '어떤 시간을 기다리고 있나요?', EN: 'What kind of time are you waiting for?', JP: 'どんな時間を待っていますか？' },
  interestLead: {
    KO: '하나를 고르면 해당 유형의 오픈 알림으로 등록됩니다. 선택은 언제든 다시 바꿀 수 있어요.',
    EN: 'Choose one to register for that opening alert. You can change your selection before submitting.',
    JP: 'ひとつ選ぶと、そのタイプのオープン通知に登録されます。送信前ならいつでも変更できます。',
  },
  captureEyebrow: { KO: 'OPENING ALERT', EN: 'OPENING ALERT', JP: 'OPENING ALERT' },
  captureTitle: { KO: '일정이 확정되면 먼저 알려드릴게요', EN: 'We will tell you when it is confirmed', JP: '日程が確定したら先にお知らせします' },
  captureLead: {
    KO: '관심 등록은 모집 신청이나 예약이 아닙니다. 카카오톡 또는 이메일 중 편한 방법으로 소식을 받아보세요.',
    EN: 'This is not an application or booking. Choose KakaoTalk or a short email form for updates.',
    JP: '興味登録は応募や予約ではありません。カカオトークまたは簡単なメール登録でお知らせを受け取れます。',
  },
  proofEyebrow: { KO: 'OPERATED, THEN DOCUMENTED', EN: 'OPERATED, THEN DOCUMENTED', JP: 'OPERATED, THEN DOCUMENTED' },
  proofTitle: { KO: '말보다 운영 기록으로 보여드립니다', EN: 'Proof from a program we actually ran', JP: '言葉ではなく、実際の運営記録で' },
  proofLead: {
    KO: '2026년 6월 양양에서 첫 회차를 운영했고, 참가자 전원이 응답한 설문 결과를 공개했습니다.',
    EN: 'We ran our first Yangyang cohort in June 2026 and published the survey completed by every participant.',
    JP: '2026年6月に襄陽で初回を運営し、参加者全員が回答したアンケート結果を公開しました。',
  },
  proofNote: { KO: '양양 1기 참가자 전원 응답 설문 · 2026.6.17–19', EN: 'Yangyang cohort 1 · all-participant survey · Jun 17–19, 2026', JP: '襄陽1期・参加者全員回答・2026.6.17〜19' },
  proofCta: { KO: '운영 결과 전체 보기', EN: 'Read the full report', JP: '運営結果をすべて見る' },
  processEyebrow: { KO: 'HOW IT OPENS', EN: 'HOW IT OPENS', JP: 'HOW IT OPENS' },
  processTitle: { KO: '확정되지 않은 약속은 하지 않습니다', EN: 'No promises before the details are real', JP: '確定前の約束はしません' },
  programsCta: { KO: '현재 프로그램 둘러보기', EN: 'Browse current programs', JP: '現在のプログラムを見る' },
  faqEyebrow: { KO: 'BEFORE YOU REGISTER', EN: 'BEFORE YOU REGISTER', JP: 'BEFORE YOU REGISTER' },
  faqTitle: { KO: '관심 등록 전 확인해주세요', EN: 'Before you register interest', JP: '関心登録の前に' },
} satisfies Record<string, L>

const INTERESTS: { id: HostedInterest; label: L; caption: L; source: string }[] = [
  {
    id: 'domestic',
    label: { KO: '국내 바다·로컬 체류', EN: 'Korea coast & local stays', JP: '韓国の海・ローカル滞在' },
    caption: { KO: '일과 휴식을 나누는 2박 3일 또는 짧은 회차', EN: 'Short cohorts that balance focused work and rest', JP: '仕事と休息を分ける短期コホート' },
    source: 'Hosted 랜딩 · 국내 바다·로컬 체류',
  },
  {
    id: 'market',
    label: { KO: '일본 시장 리서치', EN: 'Japan market research', JP: '日本市場リサーチ' },
    caption: { KO: '현장을 걷고 관찰하며 사업 인사이트를 얻는 체류', EN: 'Field observation and market insight through a working stay', JP: '現地を歩き、観察し、事業のヒントを得る滞在' },
    source: 'Hosted 랜딩 · 일본 시장 리서치',
  },
  {
    id: 'language',
    label: { KO: '어학 + 장기 체류', EN: 'Language + long stay', JP: '語学＋長期滞在' },
    caption: { KO: '배움과 원격 업무를 한 생활 리듬 안에', EN: 'Language learning and remote work in one daily rhythm', JP: '学びとリモートワークをひとつの生活リズムに' },
    source: 'Hosted 랜딩 · 어학 + 장기 체류',
  },
  {
    id: 'networking',
    label: { KO: '창업가·리모트워커 캠프', EN: 'Founder & remote-worker camp', JP: '起業家・リモートワーカーキャンプ' },
    caption: { KO: '혼자 집중하고, 필요한 순간에 연결되는 소수 체류', EN: 'Small-group stays with room for focus and useful connection', JP: '集中する時間と必要なつながりを両立する少人数滞在' },
    source: 'Hosted 랜딩 · 창업가·리모트워커 캠프',
  },
]

const STATS: { value: string; label: L }[] = [
  { value: '4.7/5', label: { KO: '종합 만족도', EN: 'Overall satisfaction', JP: '総合満足度' } },
  { value: '9.1/10', label: { KO: '추천 의향', EN: 'Would recommend', JP: '推薦意向' } },
  { value: '100%', label: { KO: '재참여 의향', EN: 'Would join again', JP: '再参加意向' } },
]

const PROCESS: { title: L; desc: L }[] = [
  {
    title: { KO: '관심 분야 등록', EN: 'Register your interest', JP: '関心分野を登録' },
    desc: { KO: '원하는 체류 유형을 고르고 편한 안내 방법을 선택합니다.', EN: 'Choose a stay type and the update method that suits you.', JP: '希望する滞在タイプと受け取りやすい案内方法を選びます。' },
  },
  {
    title: { KO: '일정·조건 확정', EN: 'Dates and terms confirmed', JP: '日程・条件を確定' },
    desc: { KO: '장소, 일정, 포함사항과 비용이 실제로 정해진 뒤 안내합니다.', EN: 'We notify you after place, schedule, inclusions and price are set.', JP: '場所・日程・含まれる内容・費用が決まってから案内します。' },
  },
  {
    title: { KO: '상세 확인 후 선택', EN: 'Review, then decide', JP: '詳細を確認して選択' },
    desc: { KO: '안내를 받은 뒤 참가 여부를 천천히 결정합니다.', EN: 'Review the details and decide whether to join.', JP: '案内を確認した後、参加するかを決めます。' },
  },
]

const FAQ: { q: L; a: L }[] = [
  {
    q: { KO: 'Hosted와 Select는 무엇이 다른가요?', EN: 'How is Hosted different from Select?', JP: 'HostedとSelectの違いは？' },
    a: { KO: 'Hosted는 Wakation이 직접 기획하고 운영하는 프로그램입니다. Select는 외부 파트너의 숙소·체험·이동 상품을 큐레이션해 연결합니다.', EN: 'Hosted programs are planned and run directly by Wakation. Select curates and links to stays, experiences and transport sold by external partners.', JP: 'HostedはWakationが直接企画・運営します。Selectは外部パートナーの宿・体験・移動商品を選んでつなぐサービスです。' },
  },
  {
    q: { KO: '지금 확정된 일정이 있나요?', EN: 'Are dates confirmed now?', JP: '現在、確定した日程はありますか？' },
    a: { KO: '이 페이지는 다음 회차의 관심 수요를 확인하는 단계입니다. 확정되지 않은 일정이나 가격은 표시하지 않으며, 실제 조건이 정해진 뒤 선택한 채널로 안내합니다.', EN: 'This page gauges interest for future cohorts. We do not display unconfirmed dates or prices; updates follow after the real terms are set.', JP: 'このページは次回への関心を確認する段階です。未確定の日程や価格は表示せず、実際の条件が決まってから選んだ方法で案内します。' },
  },
  {
    q: { KO: '관심 등록하면 바로 신청되나요?', EN: 'Does registering interest apply me automatically?', JP: '関心登録すると自動で応募になりますか？' },
    a: { KO: '아닙니다. 관심 등록은 오픈 알림 신청이며 예약·참가 신청·결제가 아닙니다.', EN: 'No. It is an opening alert, not a booking, application or payment.', JP: 'いいえ。オープン通知の登録であり、予約・応募・決済ではありません。' },
  },
  {
    q: { KO: '이메일은 어디에 사용되나요?', EN: 'How will my email be used?', JP: 'メールは何に使われますか？' },
    a: { KO: '선택한 Hosted 프로그램의 오픈 안내에만 사용하며, 언제든 수신을 거부할 수 있습니다.', EN: 'Only for opening updates about your selected Hosted program. You can unsubscribe anytime.', JP: '選択したHostedプログラムのオープン案内にのみ使用し、いつでも配信停止できます。' },
  },
]

const HOSTED_HERO_ASSET = {
  id: 'home-workation-editorial-v1-legacy',
  src: '/campaign/home-workation-editorial-v1.webp',
  alt: {
    KO: '해안에서의 체류와 업무 전환을 표현한 Wakation 브랜드 편집 이미지',
    EN: 'Wakation brand editorial image about moving between coastal time and work',
    JP: '海辺での滞在と仕事の切り替えを表現したWakationのブランド編集画像',
  } satisfies L,
} as const

function localeCode(lang: Lang) {
  return lang === 'JP' ? 'ja' : lang === 'EN' ? 'en' : 'ko'
}

export function HostedLandingView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const [selected, setSelected] = useState<HostedInterest>('domestic')
  const viewed = useRef(false)
  const prefix = lang === 'JP' ? '/ja' : lang === 'EN' ? '/en' : ''
  const choice = INTERESTS.find((item) => item.id === selected) ?? INTERESTS[0]

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    if (!viewed.current) {
      viewed.current = true
      trackEvent('hosted_landing_view', { locale: localeCode(lang), assetId: HOSTED_HERO_ASSET.id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang, ctxLang])

  const selectInterest = (id: HostedInterest) => {
    setSelected(id)
    trackEvent('hosted_interest_select', { locale: localeCode(lang), interest: id })
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: item.a[lang] },
    })),
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#102532]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="dark-surface relative flex min-h-[88svh] items-end overflow-hidden px-5 pb-12 pt-28 sm:px-8 md:min-h-[760px] md:pb-20">
        <Image
          src={HOSTED_HERO_ASSET.src}
          alt={HOSTED_HERO_ASSET.alt[lang]}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[62%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-[#04121f]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04121f] via-[#04121f]/55 to-[#04121f]/10 md:bg-gradient-to-r md:from-[#04121f]/95 md:via-[#04121f]/58 md:to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl">
          <span className="inline-flex rounded-full border border-white/22 bg-black/20 px-4 py-2 text-[0.68rem] font-black tracking-[0.16em] text-sky-200 backdrop-blur-md">
            WAKATION HOSTED · {COPY.badge[lang]}
          </span>
          <h1 className="mt-6 max-w-3xl whitespace-pre-line text-4xl font-black leading-[1.05] tracking-[-0.055em] text-white sm:text-5xl md:text-7xl">
            {COPY.title[lang]}
          </h1>
          <span className="mt-6 block max-w-2xl text-sm font-semibold leading-7 text-white/76 sm:text-base md:leading-8">
            {COPY.lead[lang]}
          </span>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#interest" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#ffd1bf] px-7 text-sm font-black text-[#102532] transition hover:bg-[#ffbfa7]">
              {COPY.primary[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </a>
            <Link href="/report/yangyang" onClick={() => trackEvent('hosted_proof_open', { locale: localeCode(lang) })} className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/30 bg-black/15 px-7 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/10">
              {COPY.report[lang]}
            </Link>
          </div>
          <div className="mt-9 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-white/14 bg-white/14 sm:grid-cols-3">
            {[COPY.clarity1, COPY.clarity2, COPY.clarity3].map((item) => (
              <span key={item.KO} className="bg-[#071824]/72 px-5 py-4 text-xs font-bold text-white/70 backdrop-blur-md">{item[lang]}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="interest" className="scroll-mt-24 px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <span className="text-[0.68rem] font-black tracking-[0.2em] text-[#317b98]">{COPY.interestEyebrow[lang]}</span>
          <div className="mt-3 grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] md:items-end">
            <h2 className="min-w-0 break-words text-3xl font-black tracking-[-0.045em] sm:text-4xl md:text-5xl">{COPY.interestTitle[lang]}</h2>
            <p className="min-w-0 break-words text-sm font-medium leading-7 text-[#65757d]">{COPY.interestLead[lang]}</p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {INTERESTS.map((item, index) => {
              const active = selected === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectInterest(item.id)}
                  className={`group grid min-h-36 grid-cols-[2.6rem_minmax(0,1fr)] gap-3 rounded-[1.6rem] border p-5 text-left transition sm:p-6 ${active ? 'border-[#317b98] bg-[#e5f0f2] shadow-[0_12px_35px_rgba(49,123,152,0.13)]' : 'border-[#ddd8cf] bg-white/72 hover:border-[#9dbbc4]'}`}
                >
                  <span className={`text-xs font-black tracking-[0.14em] ${active ? 'text-[#17647f]' : 'text-[#9b958c]'}`}>0{index + 1}</span>
                  <span>
                    <span className="block text-lg font-black tracking-[-0.025em] text-[#102532]">{item.label[lang]}</span>
                    <span className="mt-2 block text-sm font-medium leading-6 text-[#65757d]">{item.caption[lang]}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section id="hosted-updates" className="dark-surface scroll-mt-20 bg-[#071824] px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid min-w-0 max-w-6xl gap-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(22rem,1fr)] lg:items-center">
          <div className="min-w-0">
            <span className="text-[0.68rem] font-black tracking-[0.2em] text-[#8fd3e9]">{COPY.captureEyebrow[lang]}</span>
            <span className="mt-3 block text-3xl font-black tracking-[-0.045em] text-white md:text-4xl">{COPY.captureTitle[lang]}</span>
            <span className="mt-4 block max-w-xl text-sm font-medium leading-7 text-white/62">{COPY.captureLead[lang]}</span>
            <span className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-black text-white/80">{choice.label[lang]}</span>
          </div>
          <div className="min-w-0 rounded-[1.6rem] border border-white/12 bg-white/[0.055] p-5 sm:p-7">
            <NotifySignup key={selected} source={choice.source} event="hosted_alert_submitted" tone="dark" lang={lang} ctaLabel={{ KO: '이 관심사로 알림 받기', EN: 'Notify me for this', JP: 'この内容で通知を受け取る' }} />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <span className="text-[0.68rem] font-black tracking-[0.2em] text-[#317b98]">{COPY.proofEyebrow[lang]}</span>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">{COPY.proofTitle[lang]}</h2>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-[#65757d]">{COPY.proofLead[lang]}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {STATS.map((stat) => (
                <div key={stat.value} className="rounded-[1.4rem] border border-[#ddd8cf] bg-white px-3 py-6 text-center sm:px-5">
                  <strong className="block text-2xl font-black tracking-[-0.04em] text-[#102532] sm:text-3xl">{stat.value}</strong>
                  <span className="mt-2 block text-[0.68rem] font-bold leading-5 text-[#7b7770] sm:text-xs">{stat.label[lang]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 flex flex-col justify-between gap-4 rounded-[1.4rem] bg-[#ebe7df] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
            <span className="text-xs font-bold leading-6 text-[#6f6a62]">{COPY.proofNote[lang]}</span>
            <Link href="/report/yangyang" onClick={() => trackEvent('hosted_proof_open', { locale: localeCode(lang), position: 'proof' })} className="inline-flex items-center gap-2 text-sm font-black text-[#17647f]">
              {COPY.proofCta[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#ddd8cf] bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <span className="text-[0.68rem] font-black tracking-[0.2em] text-[#317b98]">{COPY.processEyebrow[lang]}</span>
          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-3xl font-black tracking-[-0.045em] md:text-5xl">{COPY.processTitle[lang]}</h2>
            <Link href={`${prefix}/programs`} onClick={() => trackEvent('hosted_programs_open', { locale: localeCode(lang) })} className="inline-flex items-center gap-2 text-sm font-black text-[#17647f]">
              {COPY.programsCta[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.6rem] border border-[#ddd8cf] bg-[#ddd8cf] md:grid-cols-3">
            {PROCESS.map((item, index) => (
              <li key={item.title.KO} className="bg-[#f7f4ee] p-6 sm:p-8">
                <span className="text-xs font-black tracking-[0.18em] text-[#317b98]">STEP 0{index + 1}</span>
                <h3 className="mt-5 text-xl font-black tracking-[-0.025em]">{item.title[lang]}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-[#65757d]">{item.desc[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="text-[0.68rem] font-black tracking-[0.2em] text-[#317b98]">{COPY.faqEyebrow[lang]}</span>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">{COPY.faqTitle[lang]}</h2>
          <div className="mt-9 divide-y divide-[#ddd8cf] border-y border-[#ddd8cf]">
            {FAQ.map((item) => (
              <details key={item.q.KO} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-base font-black leading-7 marker:content-none">{item.q[lang]}</summary>
                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[#65757d]">{item.a[lang]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
