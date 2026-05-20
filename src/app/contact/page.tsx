'use client'

import { ArrowRight } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'

const CONTACT_KEYS = [
  { titleKey: 'contact_prog_t', descKey: 'contact_prog_d', subject: 'Program' },
  { titleKey: 'contact_partner_t', descKey: 'contact_partner_d', subject: 'Partnership' },
  { titleKey: 'contact_corp_t', descKey: 'contact_corp_d', subject: 'Corporate' },
  { titleKey: 'contact_space_t', descKey: 'contact_space_d', subject: 'Space listing' },
  { titleKey: 'contact_media_t', descKey: 'contact_media_d', subject: 'Press' },
] as const

export default function ContactPage() {
  const { tr } = useLang()

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="pt-28 pb-12 px-6 text-center">
        <SectionEyebrow>{tr('contact_eyebrow')}</SectionEyebrow>
        <SectionTitle className="mb-4 text-center">{tr('contact_title')}</SectionTitle>
        <p className="text-gray-500 text-sm">{tr('contact_subtitle')}</p>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CONTACT_KEYS.map((c) => (
              <a
                key={c.titleKey}
                href={`mailto:hello@wakation.kr?subject=${encodeURIComponent(c.subject)}`}
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{tr(c.titleKey)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tr(c.descKey)}</p>
                </div>
                <div className="flex items-center gap-1 text-teal-600 text-sm font-bold group-hover:gap-2 transition-all mt-2">
                  {tr('inquire')} <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-black text-gray-900 mb-2">{tr('contact_kakao_t')}</h3>
            <p className="text-gray-500 text-sm mb-5">{tr('contact_kakao_d')}</p>
            <button
              type="button"
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-full hover:bg-yellow-300 transition-colors"
              onClick={() => alert(tr('contact_kakao_alert'))}
            >
              {tr('contact_kakao_btn')}
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-400 text-xs">{tr('contact_note')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
