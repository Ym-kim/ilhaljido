'use client'



import { useState } from 'react'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'

import { IconTile } from '@/components/brand/IconTile'

import { useLang } from '@/context/LanguageContext'

import { getPartnerTypes, t } from '@/lib/i18n'

import { ICON_STROKE, PARTNER_ICONS } from '@/lib/icons'

import { ExperiencePartner } from '@/components/partnership/ExperiencePartner'

import { InquiryForm, type InquiryCategory } from '@/components/forms/InquiryForm'

import type { Lang } from '@/lib/i18n/types'

// 2026-08-07 구조 결정 ④ — mailto → 폼 전환. 문의는 /api/applications 에 저장되고
// /admin 에서 job_type='파트너십 문의' 로 필터된다(mailto는 폼 하단 폴백으로 유지).
const JOB_TYPE = '파트너십 문의'

const FORM_COPY: Record<string, Record<Lang, string>> = {
  eyebrow: { KO: 'CONTACT', EN: 'CONTACT', JP: 'CONTACT' },
  title: { KO: '파트너십 문의 남기기', EN: 'Send a partnership inquiry', JP: 'パートナーシップのお問い合わせ' },
  desc: {
    KO: '유형을 고르고 내용을 남겨주시면 확인 후 이메일로 회신드립니다.',
    EN: 'Choose a type and leave your message — we will reply by email.',
    JP: '種別を選んで内容をお送りください。確認のうえメールでご返信します。',
  },
}

export default function PartnershipPage() {

  const { tr, lang } = useLang()

  const partnerTypes = getPartnerTypes()

  // 문의 유형 라벨은 3언어 사전에서 직접 구성 — tr()은 현재 언어 문자열만 반환하므로
  // Record<Lang> 이 필요한 폼 카테고리에는 t[lang][key] 를 쓴다
  const categories: InquiryCategory[] = [
    ...partnerTypes.map((p) => ({
      id: p.id,
      label: { KO: t.KO[p.titleKey], EN: t.EN[p.titleKey], JP: t.JP[p.titleKey] },
    })),
    // 체험형 스폰서십은 partnerTypes에 없는 별도 유형 — ExperiencePartner 섹션 CTA가 이 값을 프리셋
    {
      id: 'experience',
      label: { KO: '체험형 스폰서십', EN: 'Experience sponsorship', JP: '体験型スポンサーシップ' },
    },
  ]

  const [categoryId, setCategoryId] = useState<string>(partnerTypes[0].id)



  return (

    <div className="min-h-screen bg-white">

      <section className="relative h-[55vh] flex items-end overflow-hidden dark-surface">

        <div className="absolute inset-0">

          <Image src="/media/verified/unsplash/1560472354-b33ff0c44a43.webp" alt="" fill priority sizes="100vw" className="object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

        </div>

        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">

          <SectionEyebrow onDark pill>

            {tr('partnership_hero_badge')}

          </SectionEyebrow>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">{tr('partnership_hero_title')}</h1>

        </div>

      </section>



      <section className="py-16 px-6 bg-[#FAFAF8]">

        <div className="max-w-3xl mx-auto text-center">

          <SectionEyebrow>{tr('partnership_why_eyebrow')}</SectionEyebrow>

          <SectionTitle className="mb-5 text-center">{tr('partnership_why_title')}</SectionTitle>

          <p className="text-lead max-w-2xl mx-auto">{tr('partnership_why_desc')}</p>

        </div>

      </section>



      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">

            <SectionEyebrow>{tr('partnership_types_eyebrow')}</SectionEyebrow>

            <SectionTitle className="text-center">{tr('partnership_types_title')}</SectionTitle>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {partnerTypes.map((p) => {

              const Icon = PARTNER_ICONS[p.id]

              return (

                <div key={p.id} className="card-light p-6 hover:shadow-md transition-shadow flex flex-col gap-4">

                  <IconTile icon={Icon} />

                  <div className="flex-1">

                    <h3 className="font-black text-gray-900 mb-2 text-[1.0625rem]">{tr(p.titleKey)}</h3>

                    <p className="text-caption leading-relaxed">{tr(p.descKey)}</p>

                  </div>

                  <a

                    href="#inquiry"

                    onClick={() => setCategoryId(p.id)}

                    className="inline-flex items-center gap-1.5 text-brand-mid text-[0.875rem] font-bold hover:gap-2.5 transition-all"

                  >

                    {tr('inquire')}

                    <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />

                  </a>

                </div>

              )

            })}

          </div>

        </div>

      </section>



      {/* 체험형 스폰서십 — Experience Partner */}
      <ExperiencePartner onInquire={() => setCategoryId('experience')} />

      <section className="dark-surface py-24 px-6 bg-gray-900">

        <div className="max-w-3xl mx-auto text-center">

          <SectionEyebrow onDark>{tr('partnership_cta_eyebrow')}</SectionEyebrow>

          <SectionTitle onDark className="mb-5 text-center">

            {tr('partnership_cta_title')}

          </SectionTitle>

          <p className="text-caption-on-dark mb-10 leading-relaxed max-w-lg mx-auto">{tr('partnership_cta_desc')}</p>

          <a href="#inquiry" className="btn-primary text-base">

            {tr('partnership_cta_btn')}

            <ArrowRight className="w-5 h-5" strokeWidth={ICON_STROKE} />

          </a>

        </div>

      </section>

      {/* ── 문의 폼 (2026-08-07 구조 결정 ④) — mailto 대신 DB 저장. /admin job_type='파트너십 문의' ── */}
      <section id="inquiry" className="scroll-mt-24 bg-[#FAFAF8] py-20 px-6">

        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-10">

            <SectionEyebrow>{FORM_COPY.eyebrow[lang]}</SectionEyebrow>

            <SectionTitle className="mb-3 text-center">{FORM_COPY.title[lang]}</SectionTitle>

            <p className="text-caption">{FORM_COPY.desc[lang]}</p>

          </div>

          <InquiryForm
            formId="partnership"
            jobType={JOB_TYPE}
            categories={categories}
            categoryId={categoryId}
            onCategoryChange={setCategoryId}
            mailSubject="Partnership"
          />

        </div>

      </section>

    </div>

  )

}


