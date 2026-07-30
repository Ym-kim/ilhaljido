import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, ExternalLink, MapPin, ShieldCheck } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { SUPPORT_LABELS, type SupportCatalogItem } from '@/lib/support/catalog'
import { SupportProgramActions } from '@/components/programs/SupportProgramActions'
import type { Lang } from '@/lib/i18n/types'

const COPY = {
  back: { KO: '지원 프로그램', EN: 'Support programs', JP: '支援プログラム' },
  benefit: { KO: '지원 내용', EN: 'What is supported', JP: '支援内容' },
  eligibility: { KO: '신청 전 확인할 대상 조건', EN: 'Eligibility to check', JP: '申請前に確認する対象条件' },
  schedule: { KO: '기간', EN: 'Dates', JP: '期間' },
  apply: { KO: '접수 기간', EN: 'Application window', JP: '受付期間' },
  travel: { KO: '여행·활동 기간', EN: 'Travel or activity window', JP: '旅行・活動期間' },
  exactUnknown: { KO: '정확한 날짜는 공식 공고에서 확인', EN: 'Confirm exact dates in the official notice', JP: '正確な日程は公式公告で確認' },
  stay: { KO: '체류 기준', EN: 'Stay length', JP: '滞在日数' },
  people: { KO: '팀 구성', EN: 'Group size', JP: '参加人数' },
  nights: { KO: '박', EN: ' nights', JP: '泊' },
  peopleUnit: { KO: '명', EN: ' people', JP: '名' },
  workspace: { KO: '업무 환경', EN: 'Work setup', JP: '仕事環境' },
  foreignTitle: { KO: '해외·외국인 신청 자격', EN: 'Eligibility for foreign or overseas residents', JP: '外国籍・海外居住者の申請資格' },
  foreignUnknown: { KO: '현재 공식 자료만으로는 외국인 신청 가능 여부를 확인할 수 없습니다. 거주지·신분증·한국 휴대전화·지급 수단 조건을 공식 공고에서 확인하세요.', EN: 'Eligibility is not confirmed for foreign or overseas residents. Check residency, ID, Korean phone verification and payment-method requirements in the official notice.', JP: '外国籍・海外居住者の申請可否は確認できていません。居住地、本人確認書類、韓国の携帯電話認証、支給方法を公式公告で確認してください。' },
  process: { KO: '이렇게 확인하세요', EN: 'A safer way to proceed', JP: '確認の流れ' },
  processItems: {
    KO: ['공식 공고에서 대상·기간·예산 소진 여부 확인', '지정 숙소·영수증·SNS 등 필수 조건 확인', '신청 승인 또는 선정 여부를 확인한 뒤 여행 준비', '변경·정산·환급 문의는 해당 운영기관에 확인'],
    EN: ['Check eligibility, dates and budget status in the official notice', 'Confirm required stays, receipts and any content tasks', 'Prepare the trip only after confirming approval or selection', 'Ask the operating institution about changes and reimbursement'],
    JP: ['公式公告で対象・期間・予算状況を確認', '指定宿泊先・領収書・SNS投稿などの条件を確認', '承認・選考結果を確認してから旅行を準備', '変更・精算・還付は運営機関へ問い合わせ'],
  },
  sourceTitle: { KO: '공식 출처와 검증일', EN: 'Official source and verification', JP: '公式情報と確認日' },
  sourceCta: { KO: '공식 공고에서 최종 조건 확인', EN: 'Check the official notice', JP: '公式公告で最終条件を確認' },
  verified: { KO: 'Wakation 확인일', EN: 'Checked by Wakation', JP: 'Wakation確認日' },
  notice: { KO: 'Wakation은 이 프로그램의 운영·선정·지급 주체가 아닙니다. 일정, 혜택, 모집 상태는 예산과 운영기관 사정에 따라 바뀔 수 있으며 공식 공고가 우선합니다.', EN: 'Wakation does not operate, select participants for, or fund this program. Dates, benefits and status may change; the official notice always takes precedence.', JP: 'Wakationは本プログラムの運営・選考・支給主体ではありません。日程・支援内容・募集状況は変更される場合があり、公式公告が優先されます。' },
  related: { KO: '조건을 확인한 뒤 여행 준비', EN: 'Plan after confirming eligibility', JP: '条件確認後に旅を準備' },
  relatedDesc: { KO: '지원 대상 숙소나 비용 인정 범위와 별개인 일반 여행 준비 링크입니다. 공식 조건과 충돌하지 않는지 먼저 확인하세요.', EN: 'These are general planning links, not proof that a booking is eligible for support. Check the official conditions first.', JP: '以下は一般的な旅行準備リンクです。支援対象として認められることを保証するものではありません。' },
  stays: { KO: '숙소 찾기', EN: 'Find stays', JP: '宿泊先を探す' },
  transport: { KO: '항공·교통', EN: 'Flights & transport', JP: '航空券・移動' },
  trips: { KO: '여행 기획전', EN: 'Trip collections', JP: '旅の特集' },
  faq: { KO: '자주 묻는 질문', EN: 'FAQ', JP: 'よくある質問' },
  faqItems: {
    KO: [
      ['Wakation에서 신청하거나 지원금을 받나요?', '아닙니다. Wakation은 공고를 이해하기 쉽게 정리하며, 신청·선정·지급은 각 운영기관에서 처리합니다.'],
      ['표시된 혜택과 일정이 확정인가요?', '공식 공고가 최종 기준입니다. 예산 소진, 조기 마감, 운영 변경이 있을 수 있으므로 신청 직전에 다시 확인하세요.'],
      ['일반 숙소 예약도 지원 대상인가요?', '프로그램마다 지정 숙소와 인정 비용이 다릅니다. 공식 공고에 명시되지 않았다면 지원 대상이라고 가정하지 마세요.'],
    ],
    EN: [
      ['Do I apply or receive funds through Wakation?', 'No. Wakation summarizes the notice; the operating institution handles applications, selection and funding.'],
      ['Are the dates and benefits final?', 'The official notice is final. Budgets, early closure and operating details can change, so check again before applying.'],
      ['Will any hotel booking qualify?', 'Not necessarily. Each program has its own eligible stays and expenses. Do not assume eligibility unless the official notice says so.'],
    ],
    JP: [
      ['Wakationで申請・支給を受けられますか？', 'いいえ。Wakationは公告を整理する情報サービスで、申請・選考・支給は各運営機関が行います。'],
      ['日程・支援内容は確定ですか？', '公式公告が最終基準です。予算終了や早期締切、内容変更の可能性があるため、申請直前に再確認してください。'],
      ['一般の宿泊予約も支援対象ですか？', 'プログラムごとに指定宿泊先や対象経費が異なります。公式公告に記載がなければ対象と判断しないでください。'],
    ],
  },
} as const

function prefixFor(lang: Lang) {
  return lang === 'JP' ? '/ja' : lang === 'EN' ? '/en' : ''
}

function localeCode(lang: Lang) {
  return lang === 'KO' ? 'ko-KR' : lang === 'JP' ? 'ja-JP' : 'en-US'
}

function formatDate(value: string | undefined, lang: Lang) {
  if (!value) return null
  return new Intl.DateTimeFormat(localeCode(lang), { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(`${value}T12:00:00+09:00`))
}

function range(start: string | undefined, end: string | undefined, lang: Lang) {
  if (!start && !end) return COPY.exactUnknown[lang]
  if (start && end) return `${formatDate(start, lang)} – ${formatDate(end, lang)}`
  return formatDate(start ?? end, lang) ?? COPY.exactUnknown[lang]
}

function numberRange(min: number | undefined, max: number | undefined, unit: string) {
  if (min !== undefined && max !== undefined) return min === max ? `${min}${unit}` : `${min}–${max}${unit}`
  if (min !== undefined) return `${min}+${unit}`
  if (max !== undefined) return `≤ ${max}${unit}`
  return null
}

export function SupportProgramDetailView({ program, lang }: { program: SupportCatalogItem; lang: Lang }) {
  const prefix = prefixFor(lang)
  const stayRange = numberRange(program.stayNightsMin, program.stayNightsMax, COPY.nights[lang])
  const participantRange = numberRange(program.participantMin, program.participantMax, COPY.peopleUnit[lang])
  const sourceHost = new URL(program.officialSourceUrl).hostname.replace(/^www\./, '')

  return (
    <main className="min-h-screen bg-[#fafaf7]">
      <div className="px-5 pb-3 pt-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Link href={`${prefix}/programs/support`} className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#74858d] hover:text-[#17647f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]"><ArrowLeft className="h-3.5 w-3.5" />{COPY.back[lang]}</Link>
        </div>
      </div>

      <section className="px-5 pb-10 sm:px-6 md:pb-14">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[1.75rem] border border-[#dbe5e6] bg-white shadow-[0_18px_65px_rgba(13,48,63,.09)] lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[19rem] bg-[#e4ecee] sm:min-h-[28rem]">
            <Image src={program.photo} alt={`${program.region} — ${program.name}`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5" aria-hidden />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 text-sm font-bold text-white"><MapPin className="h-4 w-4" strokeWidth={ICON_STROKE} />{program.region}</span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#173e4e] px-3 py-1.5 text-xs font-bold text-white">{SUPPORT_LABELS.status[program.status][lang]}</span>
              <span className="rounded-full bg-[#eef4f4] px-3 py-1.5 text-xs font-semibold text-[#536970]">{SUPPORT_LABELS.category[program.category][lang]}</span>
            </div>
            <h1 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#142933] text-balance">{program.name}</h1>
            <p className="mt-5 text-base leading-7 text-[#60747c]">{program.benefit}</p>
            {program.maxBenefit && <p className="mt-5 text-xl font-bold text-[#17647f]">{program.maxBenefit}</p>}
            <div className="mt-7"><SupportProgramActions id={program.id} title={program.name} region={program.regionGroup} status={program.status} lang={lang} applicationEnd={program.applicationEnd} /></div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6 md:pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="space-y-6">
            <InfoSection title={COPY.benefit[lang]}>
              <div className="flex flex-wrap gap-2">
                {program.supportTypes.map((type) => <span key={type} className="rounded-full bg-[#f6efe5] px-3 py-2 text-xs font-bold text-[#70583a]">{SUPPORT_LABELS.supportType[type][lang]}</span>)}
              </div>
              <p className="mt-4 text-sm leading-7 text-[#52666e]">{program.benefit}</p>
            </InfoSection>

            <InfoSection title={COPY.eligibility[lang]}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {program.conditions.map((condition) => <li key={condition} className="flex items-start gap-2 rounded-xl bg-[#f5f8f8] p-4 text-sm leading-6 text-[#465d66]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#317b98]" strokeWidth={ICON_STROKE} />{condition}</li>)}
              </ul>
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="font-bold text-amber-950">{COPY.foreignTitle[lang]}</p>
                <p className="mt-1.5 text-sm leading-6 text-amber-900/80">{COPY.foreignUnknown[lang]}</p>
              </div>
            </InfoSection>

            <InfoSection title={COPY.schedule[lang]}>
              <dl className="grid gap-3 sm:grid-cols-2">
                <Fact label={COPY.apply[lang]} value={range(program.applicationStart, program.applicationEnd, lang)} />
                <Fact label={COPY.travel[lang]} value={range(program.travelStart, program.travelEnd, lang)} />
                {stayRange && <Fact label={COPY.stay[lang]} value={stayRange} />}
                {participantRange && <Fact label={COPY.people[lang]} value={participantRange} />}
              </dl>
              <p className="mt-4 text-sm leading-6 text-[#6a7c83]">{program.deadline}</p>
            </InfoSection>

            {program.workSpec && <InfoSection title={COPY.workspace[lang]}><p className="text-sm leading-7 text-[#52666e]">{program.workSpec}</p></InfoSection>}

            <InfoSection title={COPY.process[lang]}>
              <ol className="grid gap-3">
                {COPY.processItems[lang].map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] items-start gap-3 text-sm leading-6 text-[#52666e]"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf2f3] text-xs font-bold text-[#17647f]">{index + 1}</span><span className="pt-1">{item}</span></li>)}
              </ol>
            </InfoSection>

            <InfoSection title={COPY.faq[lang]}>
              <div className="divide-y divide-[#e6ecec]">
                {COPY.faqItems[lang].map(([question, answer]) => <details key={question} className="group py-4"><summary className="cursor-pointer list-none pr-6 text-sm font-bold leading-6 text-[#29444e] marker:content-none">{question}</summary><p className="mt-2 text-sm leading-7 text-[#63757d]">{answer}</p></details>)}
              </div>
            </InfoSection>
          </div>

          <aside className="self-start rounded-[1.35rem] border border-[#dbe5e6] bg-white p-5 lg:sticky lg:top-24">
            <ShieldCheck className="h-5 w-5 text-[#317b98]" strokeWidth={ICON_STROKE} />
            <h2 className="mt-3 font-bold text-[#243f49]">{COPY.sourceTitle[lang]}</h2>
            <p className="mt-2 text-sm leading-6 text-[#687a81]">{COPY.notice[lang]}</p>
            <dl className="mt-5 space-y-3 border-t border-[#e8eded] pt-4 text-xs">
              <div><dt className="text-[#88959a]">{COPY.verified[lang]}</dt><dd className="mt-1 font-semibold text-[#344d56]">{program.verifiedAt}</dd></div>
              <div><dt className="text-[#88959a]">Source</dt><dd className="mt-1 break-all font-semibold text-[#344d56]">{sourceHost}</dd></div>
            </dl>
            <a href={program.officialSourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#153a49] px-4 text-center text-sm font-bold text-white transition hover:bg-[#0e4d67] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">
              {COPY.sourceCta[lang]} <ExternalLink className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </a>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#e2e8e9] bg-white px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-[-0.025em] text-[#203943]">{COPY.related[lang]}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6a7c83]">{COPY.relatedDesc[lang]}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { href: `${prefix}/select/hotel`, label: COPY.stays[lang] },
              { href: `${prefix}/select#transport`, label: COPY.transport[lang] },
              { href: `${prefix}/collections`, label: COPY.trips[lang] },
            ].map((item) => <Link key={item.href} href={item.href} className="group flex min-h-20 items-center justify-between rounded-[1.1rem] border border-[#dce5e7] px-5 text-sm font-bold text-[#294650] transition hover:border-[#9fc2ce] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]">{item.label}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>)}
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-[1.35rem] border border-[#dfe7e8] bg-white p-5 sm:p-7"><h2 className="mb-5 text-xl font-bold tracking-[-0.02em] text-[#243f49]">{title}</h2>{children}</section>
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-[#f5f8f8] p-4"><dt className="flex items-center gap-1.5 text-xs font-semibold text-[#708188]"><CalendarDays className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />{label}</dt><dd className="mt-2 text-sm font-bold leading-6 text-[#29444e]">{value}</dd></div>
}
