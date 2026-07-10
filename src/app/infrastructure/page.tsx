'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Wifi, Monitor, VolumeX, MapPin, Home, Globe, Building2, Users, Airplay, Store } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'

const VERIFY_KEYS = [
  { icon: Wifi, labelKey: 'infra_verify_wifi_l', descKey: 'infra_verify_wifi_d' },
  { icon: Monitor, labelKey: 'infra_verify_desk_l', descKey: 'infra_verify_desk_d' },
  { icon: VolumeX, labelKey: 'infra_verify_noise_l', descKey: 'infra_verify_noise_d' },
  { icon: MapPin, labelKey: 'infra_verify_visit_l', descKey: 'infra_verify_visit_d' },
] as const

const SPACE_KEYS = [
  { icon: Home, titleKey: 'infra_domestic_t', descKey: 'infra_domestic_d' },
  { icon: Globe, titleKey: 'infra_global_t', descKey: 'infra_global_d' },
  { icon: Building2, titleKey: 'infra_cowork_t', descKey: 'infra_cowork_d' },
  { icon: Users, titleKey: 'infra_coliving_t', descKey: 'infra_coliving_d' },
  { icon: Airplay, titleKey: 'infra_airbnb_t', descKey: 'infra_airbnb_d' },
  { icon: Store, titleKey: 'infra_local_t', descKey: 'infra_local_d' },
] as const

export default function InfrastructurePage() {
  const { tr } = useLang()

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[55vh] flex items-end overflow-hidden dark-surface">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
          <SectionEyebrow onDark pill>
            {tr('infra_hero_badge')}
          </SectionEyebrow>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight whitespace-pre-line">
            {tr('infra_hero_title')}
          </h1>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SectionEyebrow>{tr('infra_verify_eyebrow')}</SectionEyebrow>
            <SectionTitle className="text-center">{tr('infra_verify_title')}</SectionTitle>
            <p className="text-gray-500 text-sm mt-3">{tr('infra_verify_desc')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {VERIFY_KEYS.map((c) => (
              <div key={c.labelKey} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-6 h-6 text-teal-600" />
                </div>
                <p className="font-black text-gray-900 text-sm mb-1">{tr(c.labelKey)}</p>
                <p className="text-gray-400 text-xs">{tr(c.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SectionEyebrow>{tr('infra_types_eyebrow')}</SectionEyebrow>
            <SectionTitle className="text-center">{tr('infra_types_title')}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPACE_KEYS.map((s) => (
              <div
                key={s.titleKey}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{tr(s.titleKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tr(s.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-surface py-20 px-6 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <SectionEyebrow onDark>{tr('infra_partner_eyebrow')}</SectionEyebrow>
          <SectionTitle onDark className="mb-5 text-center">
            {tr('infra_partner_title')}
          </SectionTitle>
          <p className="text-caption-on-dark leading-relaxed">{tr('infra_partner_desc')}</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle className="mb-4 text-center">{tr('infra_inquiry_title')}</SectionTitle>
          <p className="text-gray-500 text-sm mb-8">{tr('infra_inquiry_desc')}</p>
          <Link
            href="mailto:wakation.sf@gmail.com?subject=Space%20listing"
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-all"
          >
            {tr('infra_inquiry_btn')}
          </Link>
        </div>
      </section>
    </div>
  )
}
