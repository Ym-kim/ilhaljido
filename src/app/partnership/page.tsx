'use client'



import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'

import { IconTile } from '@/components/brand/IconTile'

import { useLang } from '@/context/LanguageContext'

import { getPartnerTypes } from '@/lib/i18n'

import { ICON_STROKE, PARTNER_ICONS } from '@/lib/icons'

import { ExperiencePartner } from '@/components/partnership/ExperiencePartner'



export default function PartnershipPage() {

  const { tr } = useLang()

  const partnerTypes = getPartnerTypes()



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

                    href="mailto:wakation.sf@gmail.com?subject=Partnership"

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
      <ExperiencePartner />

      <section className="dark-surface py-24 px-6 bg-gray-900">

        <div className="max-w-3xl mx-auto text-center">

          <SectionEyebrow onDark>{tr('partnership_cta_eyebrow')}</SectionEyebrow>

          <SectionTitle onDark className="mb-5 text-center">

            {tr('partnership_cta_title')}

          </SectionTitle>

          <p className="text-caption-on-dark mb-10 leading-relaxed max-w-lg mx-auto">{tr('partnership_cta_desc')}</p>

          <a href="mailto:wakation.sf@gmail.com?subject=Partnership" className="btn-primary text-base">

            {tr('partnership_cta_btn')}

            <ArrowRight className="w-5 h-5" strokeWidth={ICON_STROKE} />

          </a>

          <p className="text-white/45 text-[0.875rem] mt-6 font-medium">wakation.sf@gmail.com</p>

        </div>

      </section>

    </div>

  )

}


