'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { InquiryForm, type InquiryCategory } from '@/components/forms/InquiryForm'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n/types'

// 카카오톡 채널 (실제 운영 채널)
const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_xiPxbXG'

// 2026-08-07 구조 결정 ④ — mailto → 폼 전환. 문의는 /api/applications 에 저장되고
// /admin 에서 job_type='일반 문의' 로 필터된다(mailto는 폼 하단 폴백으로 유지).
const JOB_TYPE = '일반 문의'

const CONTACT_KEYS = [
  { id: 'program', titleKey: 'contact_prog_t', descKey: 'contact_prog_d' },
  { id: 'partnership', titleKey: 'contact_partner_t', descKey: 'contact_partner_d' },
  { id: 'corporate', titleKey: 'contact_corp_t', descKey: 'contact_corp_d' },
  { id: 'space', titleKey: 'contact_space_t', descKey: 'contact_space_d' },
  { id: 'press', titleKey: 'contact_media_t', descKey: 'contact_media_d' },
  { id: 'affiliate', titleKey: 'contact_affiliate_t', descKey: 'contact_affiliate_d' },
] as const

const FORM_COPY: Record<string, Record<Lang, string>> = {
  eyebrow: { KO: 'CONTACT FORM', EN: 'CONTACT FORM', JP: 'CONTACT FORM' },
  title: { KO: '문의 남기기', EN: 'Send us a message', JP: 'お問い合わせ' },
  desc: {
    KO: '유형을 고르고 내용을 남겨주시면 확인 후 이메일로 회신드립니다.',
    EN: 'Choose a type and leave your message — we will reply by email.',
    JP: '種別を選んで内容をお送りください。確認のうえメールでご返信します。',
  },
}

export default function ContactPage() {
  const { tr, lang } = useLang()
  const [categoryId, setCategoryId] = useState<string>(CONTACT_KEYS[0].id)

  // 문의 유형 라벨은 3언어 사전에서 직접 구성 — tr()은 현재 언어 문자열만 반환하므로
  // Record<Lang> 이 필요한 폼 카테고리에는 t[lang][key] 를 쓴다
  const categories: InquiryCategory[] = CONTACT_KEYS.map((c) => ({
    id: c.id,
    label: { KO: t.KO[c.titleKey], EN: t.EN[c.titleKey], JP: t.JP[c.titleKey] },
  }))

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="pt-28 pb-12 px-6 text-center">
        <SectionEyebrow>{tr('contact_eyebrow')}</SectionEyebrow>
        <h1 className="mb-4 text-center text-4xl font-black leading-tight text-gray-900 md:text-5xl">{tr('contact_title')}</h1>
        <p className="text-gray-500 text-sm">{tr('contact_subtitle')}</p>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* 유형 카드 — 클릭 시 아래 폼으로 이동하며 해당 유형을 프리셋 (2026-08-07 mailto → 폼) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CONTACT_KEYS.map((c) => (
              <a
                key={c.id}
                href="#inquiry"
                onClick={() => setCategoryId(c.id)}
                className={`group bg-white rounded-3xl border shadow-sm p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-4 ${
                  categoryId === c.id ? 'border-teal-500' : 'border-gray-100'
                }`}
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

          {/* ── 문의 폼 — DB 저장. /admin job_type='일반 문의' ── */}
          <div id="inquiry" className="scroll-mt-24 mt-10 bg-white border border-gray-100 rounded-3xl shadow-sm p-8 md:p-10">
            <div className="text-center mb-8">
              <SectionEyebrow>{FORM_COPY.eyebrow[lang]}</SectionEyebrow>
              <h2 className="text-2xl font-black text-gray-900 mb-2">{FORM_COPY.title[lang]}</h2>
              <p className="text-gray-500 text-sm">{FORM_COPY.desc[lang]}</p>
            </div>
            <InquiryForm
              formId="contact"
              jobType={JOB_TYPE}
              categories={categories}
              categoryId={categoryId}
              onCategoryChange={setCategoryId}
              mailSubject="Wakation inquiry"
            />
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-black text-gray-900 mb-2">{tr('contact_kakao_t')}</h3>
            <p className="text-gray-500 text-sm mb-5">{tr('contact_kakao_d')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={KAKAO_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-full hover:bg-yellow-300 transition-colors"
              >
                {tr('contact_kakao_btn')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://cafe.naver.com/shcafa32"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#03c75a] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#02b350] transition-colors"
              >
                {tr('footer_cafe')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-400 text-xs">{tr('contact_note')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
