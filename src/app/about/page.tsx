'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { MonthlyModelEditorial } from '@/components/media/MonthlyModelEditorial'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'ABOUT WAKATION', EN: 'ABOUT WAKATION', JP: 'ABOUT WAKATION' },
  title: { KO: '머무는 시간을,\n일과 성장의 다음 장면으로', EN: 'Turn time away\ninto work and growth', JP: '滞在する時間を、\n仕事と成長の次の場面へ' },
  intro: {
    KO: '와케이션(Wakation)은 여행을 발견하고, 필요한 것을 준비하고, 직접 운영 프로그램과 외부 제휴 상품을 구분해 살펴볼 수 있도록 돕는 편집형 체류 플랫폼입니다.',
    EN: 'Wakation is an editorial stay platform for discovering trips, preparing what you need, and clearly distinguishing our hosted programs from external partner products.',
    JP: 'Wakationは、旅を見つけ、必要な準備を整え、自社運営プログラムと外部提携商品を区別して選べる編集型の滞在プラットフォームです。',
  },
  flow_eyebrow: { KO: 'HOW IT WORKS', EN: 'HOW IT WORKS', JP: 'HOW IT WORKS' },
  flow_title: { KO: '조직도가 아니라, 여행자의 순서로 설계합니다', EN: 'Designed around the traveller’s next step', JP: '組織ではなく、旅する人の順番で設計します' },
  mode_eyebrow: { KO: 'CLEAR CHOICES', EN: 'CLEAR CHOICES', JP: 'CLEAR CHOICES' },
  mode_title: { KO: '직접 운영과 외부 상품을 섞지 않습니다', EN: 'Hosted programs and partner products stay distinct', JP: '自社運営と外部商品を混同させません' },
  hosted_title: { KO: 'Wakation Hosted', EN: 'Wakation Hosted', JP: 'Wakation Hosted' },
  hosted_desc: { KO: 'Wakation이 기획·운영하는 참여형 프로그램입니다. 모집 여부와 신청 조건은 각 상세에서 확인합니다.', EN: 'Programs planned and operated by Wakation. Recruitment status and eligibility are shown on each detail page.', JP: 'Wakationが企画・運営する参加型プログラムです。募集状況と条件は各詳細で確認できます。' },
  select_title: { KO: '여행 준비 상품', EN: 'Travel preparation', JP: '旅の準備' },
  select_desc: { KO: '숙소·체험·eSIM·교통 등 외부 제휴 상품을 편집해 연결합니다. 예약·결제·취소·환불은 제휴사 정책을 따릅니다.', EN: 'Curated links to external stays, activities, eSIMs and transport. Booking, payment, cancellation and refunds follow each partner’s terms.', JP: '宿泊・体験・eSIM・移動など外部提携商品を編集して紹介します。予約・決済・取消・返金は提携先の規定に従います。' },
  principle_title: { KO: '우리가 지키는 편집 원칙', EN: 'Our editorial principles', JP: '編集で守ること' },
  principle_desc: { KO: '실측하지 않은 인기 숫자를 만들지 않고, 변동 가능한 가격·일정·자격은 확인일과 공식 출처를 남기며, 생성 이미지를 실제 숙소나 참가자 사진처럼 사용하지 않습니다.', EN: 'We do not invent popularity signals. Variable prices, dates and eligibility are dated and sourced, and generated images are never presented as real stays or participants.', JP: '根拠のない人気指標を作らず、変動する料金・日程・資格には確認日と公式情報を示し、生成画像を実際の宿泊施設や参加者写真として扱いません。' },
  hosted_cta: { KO: '운영 프로그램 보기', EN: 'Explore hosted programs', JP: '運営プログラムを見る' },
  select_cta: { KO: '여행 준비 보기', EN: 'Explore travel preparation', JP: '旅の準備を見る' },
  report_cta: { KO: '운영 기록 살펴보기', EN: 'Read an operating report', JP: '運営レポートを見る' },
}

const FLOW: Array<{ n: string; title: L; desc: L }> = [
  { n: '01', title: { KO: '여행 찾기', EN: 'Find a trip', JP: '旅を探す' }, desc: { KO: 'Trip Match, 기획전과 여행 이야기로 지금의 기분과 기간에 맞는 장면을 찾습니다.', EN: 'Use Trip Match, campaigns and stories to find a trip for your mood and time.', JP: 'Trip Match、特集、ストーリーから、今の気分と日数に合う旅を探します。' } },
  { n: '02', title: { KO: '여행지 이해하기', EN: 'Understand the destination', JP: '行き先を知る' }, desc: { KO: '도시 가이드와 체류 정보를 통해 일하기와 쉬기의 균형을 확인합니다.', EN: 'City guides and stay notes help you judge the balance between work and rest.', JP: '都市ガイドと滞在情報で、仕事と休息のバランスを確かめます。' } },
  { n: '03', title: { KO: '필요한 것 준비하기', EN: 'Prepare what matters', JP: '必要なものを準備する' }, desc: { KO: '숙소·체험·연결 수단을 각각 비교하고 외부 제휴사에서 최종 조건을 확인합니다.', EN: 'Compare stays, activities and connectivity, then confirm final terms with each partner.', JP: '宿泊・体験・通信を比べ、最終条件は各提携先で確認します。' } },
  { n: '04', title: { KO: '저장하고 이어가기', EN: 'Save and continue', JP: '保存して続ける' }, desc: { KO: '관심 있는 여행 구성과 상품을 현재 브라우저에 저장해 다음 방문에서 이어봅니다.', EN: 'Save useful trip plans and products in this browser and continue on your next visit.', JP: '気になる旅の構成や商品をこのブラウザに保存し、次の訪問で続けられます。' } },
]

export default function AboutPage() {
  const { lang } = useLang()

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <section className="dark-surface relative flex min-h-[38rem] items-end overflow-hidden">
        <Image src="/campaign/programs-editorial-coastal-work-v1.webp" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
          <SectionEyebrow onDark>{COPY.eyebrow[lang]}</SectionEyebrow>
          <h1 className="max-w-3xl whitespace-pre-line text-4xl font-black leading-[1.08] text-white md:text-6xl">{COPY.title[lang]}</h1>
          <span className="mt-5 block max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">{COPY.intro[lang]}</span>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionEyebrow>{COPY.flow_eyebrow[lang]}</SectionEyebrow>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-[#171714] md:text-4xl">{COPY.flow_title[lang]}</h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2">
            {FLOW.map((item) => (
              <article key={item.n} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[#d9d5cd] pt-5">
                <span className="text-sm font-bold text-teal-700">{item.n}</span>
                <div>
                  <h3 className="text-xl font-bold text-[#171714]">{item.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#656159]">{item.desc[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MonthlyModelEditorial />

      <section className="bg-[#17282d] px-6 py-20 text-white dark-surface">
        <div className="mx-auto max-w-6xl">
          <span className="text-eyebrow-on-dark mb-3 block">{COPY.mode_eyebrow[lang]}</span>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{COPY.mode_title[lang]}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="border border-white/15 bg-white/6 p-7 md:p-9">
              <span className="text-xs font-bold text-sky-300">OPERATED BY WAKATION</span>
              <h3 className="mt-3 text-2xl font-bold">{COPY.hosted_title[lang]}</h3>
              <span className="mt-3 block text-sm leading-relaxed text-white/60">{COPY.hosted_desc[lang]}</span>
              <Link href="/hosted" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {COPY.hosted_cta[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
            <article className="border border-white/15 bg-white/6 p-7 md:p-9">
              <span className="text-xs font-bold text-sky-300">EXTERNAL PARTNERS</span>
              <h3 className="mt-3 text-2xl font-bold">{COPY.select_title[lang]}</h3>
              <span className="mt-3 block text-sm leading-relaxed text-white/60">{COPY.select_desc[lang]}</span>
              <Link href="/select" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {COPY.select_cta[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl border-y border-[#d9d5cd] py-10 text-center">
          <h2 className="text-2xl font-bold text-[#171714]">{COPY.principle_title[lang]}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#656159]">{COPY.principle_desc[lang]}</p>
          <Link href="/report/yangyang" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#17282d] px-6 py-3 text-sm font-bold text-white hover:bg-teal-900">
            {COPY.report_cta[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
