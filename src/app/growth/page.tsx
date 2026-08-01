'use client'

import { useLang } from '@/context/LanguageContext'
import Image from 'next/image'

import { SectionEyebrow } from '@/components/brand/SectionEyebrow'

import { getGrowthCamps } from '@/lib/i18n'



export default function GrowthPage() {

  const { tr } = useLang()

  const camps = getGrowthCamps()



  return (

    <div className="min-h-screen bg-[#111]">

      <section className="relative h-[55vh] flex items-end overflow-hidden dark-surface">

        <Image src="/media/verified/unsplash/1522199755839-a2bacb67c546.webp" alt="" fill priority sizes="100vw" className="object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />

        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">

          <SectionEyebrow onDark>{tr('growth_badge')}</SectionEyebrow>

          <h1 className="text-5xl md:text-6xl font-black text-white">{tr('growth_title')}</h1>

          <p className="text-lead-on-dark mt-3 max-w-xl">{tr('growth_desc')}</p>

        </div>

      </section>

      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {camps.map((c) => (

            <div

              key={c.num}

              className="group bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-teal-500/40 transition-all"

            >

              <span className="text-teal-400/50 text-xs font-black tracking-widest">{c.num}</span>

              <h3 className="text-white font-black text-lg mt-4 mb-3 group-hover:text-teal-400 transition-colors">

                {tr(c.titleKey)}

              </h3>

              <p className="text-white/55 text-sm leading-relaxed">{tr(c.descKey)}</p>

            </div>

          ))}

        </div>

      </section>

    </div>

  )

}


