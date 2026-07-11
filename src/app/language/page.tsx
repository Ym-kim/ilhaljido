'use client'
import { useLang } from '@/context/LanguageContext'
import Image from 'next/image'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { getLanguageFeatures, getLanguagePrograms } from '@/lib/i18n'
import { trackAffiliateClick } from '@/lib/track'
import { BookOpen, Globe, Users, Star, MessagesSquare, ArrowUpRight } from 'lucide-react'
import type { Lang } from '@/lib/i18n/types'

const FEAT_ICONS = { work: BookOpen, immersion: Globe, community: Users } as const

// 온라인 어학 파트너 — 숙박 딥링크만으로는 어학 니즈를 못 채움 (2026-07-15 운영자 피드백)
// AmazingTalker: 원어민 1:1 온라인 수업 플랫폼. 현재 공개 링크 — 제휴 프로그램 가입 검토 중
const TUTOR_COPY: Record<string, Record<Lang, string>> = {
  eyebrow: { KO: 'ONLINE 1:1 어학', EN: 'ONLINE 1:1 LANGUAGE', JP: 'オンライン1:1語学' },
  title: { KO: '떠나기 전부터, 현지에서도 — 원어민 1:1 수업', EN: 'Before you go and while you’re there — 1:1 native tutors', JP: '出発前も現地でも — ネイティブ1:1レッスン' },
  sub: {
    KO: '어학연수를 준비 중이라면 온라인 1:1 수업으로 회화 기초를 먼저. 워케이션 중에도 시간대에 맞춰 이어갈 수 있습니다.',
    EN: 'Build conversation basics online before an immersion trip — and keep lessons going on your workation, in your time zone.',
    JP: '語学研修の前にオンライン1:1で会話の基礎を。ワーケーション中も時差に合わせて継続できます。',
  },
  card_desc: {
    KO: '영어·일본어 등 100+개 언어 원어민 튜터를 시간당 예약. 수업 시간과 튜터를 직접 고르는 방식이라 워케이션 일정과 병행하기 좋습니다.',
    EN: 'Book native tutors by the hour in 100+ languages. You pick the tutor and the time — easy to fit around a workation.',
    JP: '英語・日本語など100+言語のネイティブ講師を時間単位で予約。講師と時間を自分で選べます。',
  },
  cta: { KO: '튜터 찾아보기', EN: 'Find a tutor', JP: '講師を探す' },
  note: {
    KO: '외부 서비스이며 제휴 추적은 아직 적용 전입니다. 수강 조건은 해당 사이트에서 최종 확인됩니다.',
    EN: 'External service; affiliate tracking not yet applied. Terms are confirmed on their site.',
    JP: '外部サービスで、提携トラッキングは未適用です。条件は先方サイトでご確認ください。',
  },
}

export default function LanguagePage() {
  const { lang, tr } = useLang()
  const features = getLanguageFeatures(lang)
  const programs = getLanguagePrograms(lang)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="relative h-[60vh] flex items-end overflow-hidden dark-surface">
        <Image src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{tr('lang_badge')}</SectionEyebrow>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('lang_title')}</h1>
          <p className="text-lead-on-dark mt-3 max-w-xl">{tr('lang_desc')}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = FEAT_ICONS[f.id as keyof typeof FEAT_ICONS] ?? BookOpen
            return (
              <div key={f.id} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10">{tr('lang_programs_title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
                <div className="relative md:w-44 h-48 md:h-auto shrink-0 overflow-hidden">
                  <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-400">{p.country}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-lg mb-2">{p.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{p.duration}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* 고정가 노출 제거 — 가격표현 금지 방침 (요금은 파트너사에서 확인) */}
                  <div className="mt-auto flex items-center justify-end gap-3">
                    <a
                      href={`https://www.booking.com/searchresults.html?aid=7854081&ss=${encodeURIComponent(p.stayQuery)}`}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 bg-brand-mid text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-brand-light transition-all shadow-sm"
                    >
                      {tr('h3_bar_stay')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 온라인 1:1 어학 파트너 — AmazingTalker */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-rose-500 text-xs font-black tracking-widest uppercase mb-3">{TUTOR_COPY.eyebrow[lang]}</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{TUTOR_COPY.title[lang]}</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-8">{TUTOR_COPY.sub[lang]}</p>
          <div className="bg-rose-50/60 border border-rose-100 rounded-3xl p-7 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
              <MessagesSquare className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-black mb-1">AmazingTalker</p>
              <p className="text-gray-500 text-sm leading-relaxed">{TUTOR_COPY.card_desc[lang]}</p>
            </div>
            <a
              href="https://www.amazingtalker.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAffiliateClick({ id: 'lang-amazingtalker', provider: 'AmazingTalker', status: 'public_external_link' })}
              className="shrink-0 inline-flex items-center gap-1.5 bg-rose-500 text-white font-bold px-6 py-3 rounded-full hover:bg-rose-400 transition-all text-sm"
            >
              {TUTOR_COPY.cta[lang]} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-gray-400 text-[0.6875rem] mt-3">{TUTOR_COPY.note[lang]}</p>
        </div>
      </section>

      {/* 여행 준비 크로스셀 — Wakation Select */}
      <AffiliateSection
        eyebrow="Wakation Select"
        title={tr('prep_title')}
        subtitle={tr('prep_sub')}
        items={GLOBAL_PREP_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
      />
    </div>
  )
}
