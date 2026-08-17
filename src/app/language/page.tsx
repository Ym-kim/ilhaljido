'use client'
import { useLang } from '@/context/LanguageContext'
import Image from 'next/image'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { HostedLeadSection } from '@/components/programs/HostedLeadSection'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { getLanguageFeatures, getLanguagePrograms } from '@/lib/i18n'
import { trackAffiliateClick } from '@/lib/track'
import { BookOpen, Globe, Users, Star, MessagesSquare, ArrowUpRight } from 'lucide-react'
import type { Lang } from '@/lib/i18n/types'

const FEAT_ICONS = { work: BookOpen, immersion: Globe, community: Users } as const

// 온라인 어학 파트너 — 숙박 딥링크만으로는 어학 니즈를 못 채움 (2026-07-15 운영자 피드백)
// AmazingTalker: 원어민 1:1 온라인 수업 플랫폼. 언어별 페이지는 검색 인덱스로 실존 확인
// (tutors/english·tutors/japanese·tutors). 공개 링크 — 제휴 프로그램 가입 검토 중
const TUTOR_COPY: Record<string, Record<Lang, string>> = {
  eyebrow: { KO: 'ONLINE 1:1 어학', EN: 'ONLINE 1:1 LANGUAGE', JP: 'オンライン1:1語学' },
  title: { KO: '떠나기 전부터, 현지에서도 — 원어민 1:1 수업', EN: 'Before you go and while you’re there — 1:1 native tutors', JP: '出発前も現地でも — ネイティブ1:1レッスン' },
  sub: {
    KO: '어학연수 전 온라인 1:1 수업으로 회화 기초를 먼저. 워케이션 중에도 시간대에 맞춰 이어갈 수 있습니다. AmazingTalker에서 언어를 골라 시작하세요.',
    EN: 'Build conversation basics online before an immersion trip — and keep lessons going on your workation. Pick a language on AmazingTalker.',
    JP: '語学研修の前にオンライン1:1で会話の基礎を。ワーケーション中も時差に合わせて継続。AmazingTalkerで言語を選んで開始。',
  },
  cta: { KO: '튜터 찾아보기', EN: 'Find a tutor', JP: '講師を探す' },
  // 2026-08-04 정정: aff 파라미터 부착·rel=sponsored 적용 상태와 고지문이 모순이었음("추적 미적용" 구문 제거)
  note: {
    KO: '제휴 링크이며, 예약 시 Wakation이 수수료를 받을 수 있습니다. 수강 조건·요금은 해당 사이트에서 최종 확인됩니다.',
    EN: 'Affiliate links — Wakation may earn a commission. Terms and pricing are confirmed on their site.',
    JP: '提携リンクです。予約時にWakationが手数料を受け取る場合があります。条件・料金は先方サイトでご確認ください。',
  },
  prog_prep: { KO: '프로그램 준비 중', EN: 'Program in prep', JP: 'プログラム準備中' },
  prog_prep_desc: {
    KO: '어학원·유학원 연계를 협의 중입니다. 확정되면 수업·숙소·현지 지원이 묶인 프로그램으로 공개됩니다.',
    EN: 'We are arranging language-school partnerships. Once confirmed, classes, stays and local support will launch as one program.',
    JP: '語学学校・留学エージェントとの連携を協議中。確定後、授業・宿・現地サポートを束ねたプログラムとして公開します。',
  },
  preregister: { KO: '사전 신청 문의', EN: 'Pre-register inquiry', JP: '事前申込のお問い合わせ' },
}

// 언어별 트랙 — 실존 확인된 경로만 (중국어·스페인어 등은 전체 페이지에서 선택)
// 어필리에이트 추적: 운영자 프로모션 링크 파라미터(aff_c/aff_p, 2026-07-16 수령·202 검증) 부착.
// ⚠️ 서브페이지 파라미터 집계 여부는 AT 파트너 대시보드 '프로모션' 통계에서 확인 권장
const AT_AFF = 'aff_c_code=aff_c-bXzneJ&aff_p_code=aff_p-bXRhXL'
const TUTOR_TRACKS: { id: string; emoji: string; href: string; name: Record<Lang, string>; desc: Record<Lang, string> }[] = [
  {
    id: 'at-english', emoji: '🇺🇸', href: `https://www.amazingtalker.co.kr/tutors/english?${AT_AFF}`,
    name: { KO: '영어 회화', EN: 'English', JP: '英会話' },
    desc: { KO: '비즈니스 회화·TESOL 자격 원어민 튜터', EN: 'Business conversation, TESOL-certified natives', JP: 'ビジネス会話・TESOL資格ネイティブ' },
  },
  {
    id: 'at-japanese', emoji: '🇯🇵', href: `https://www.amazingtalker.co.kr/tutors/japanese?${AT_AFF}`,
    name: { KO: '일본어', EN: 'Japanese', JP: '日本語' },
    desc: { KO: '일본 진출·워케이션 준비 회화, JLPT 대비', EN: 'Conversation for Japan trips, JLPT prep', JP: '日本滞在向け会話・JLPT対策' },
  },
  {
    id: 'at-all', emoji: '🌍', href: `https://www.amazingtalker.co.kr/tutors?${AT_AFF}`,
    name: { KO: '40+개 언어 전체', EN: 'All 40+ languages', JP: '40+言語すべて' },
    desc: { KO: '중국어·스페인어·베트남어 등 전체 튜터 탐색', EN: 'Chinese, Spanish, Vietnamese and more', JP: '中国語・スペイン語・ベトナム語ほか' },
  },
]

export default function LanguagePage() {
  const { lang, tr } = useLang()
  const features = getLanguageFeatures(lang)
  const programs = getLanguagePrograms(lang)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="relative h-[60vh] flex items-end overflow-hidden dark-surface">
        {/* 2026-08-17 자체 제작 에디토리얼로 교체 — 기존 사진이 하단 인프런 카드와 중복이었음 */}
        <Image src="/media/brand-models/language-study-lounge-editorial-v1.webp" alt="" fill priority sizes="100vw" className="object-cover" />
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
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-brand-mid mb-4">
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
          <h2 className="text-3xl font-black text-gray-900 mb-3">{tr('lang_programs_title')}</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-10">{TUTOR_COPY.prog_prep_desc[lang]}</p>
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
                      <span key={t} className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* 어학원·유학원 연계 전 — 숙소검색 대신 준비중 상태 + 사전신청 (2026-07-15 기획 수정) */}
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {TUTOR_COPY.prog_prep[lang]}
                    </span>
                    <a
                      href={`mailto:wakation.sf@gmail.com?subject=${encodeURIComponent(`어학연수 사전 신청 — ${p.name}`)}`}
                      className="shrink-0 inline-flex items-center gap-1.5 bg-brand-mid text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-sky-500 transition-all shadow-sm"
                    >
                      {TUTOR_COPY.preregister[lang]}
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
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-3">{TUTOR_COPY.eyebrow[lang]}</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{TUTOR_COPY.title[lang]}</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-8">{TUTOR_COPY.sub[lang]}</p>
          {/* 언어별 트랙 카드 — 실존 확인 경로만 */}
          <div className="grid sm:grid-cols-3 gap-4">
            {TUTOR_TRACKS.map((t) => (
              <a
                key={t.id}
                href={t.href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                onClick={() => trackAffiliateClick({
                  id: t.id,
                  itemName: t.name[lang],
                  provider: 'AmazingTalker',
                  status: 'active_affiliate',
                  sourceSection: 'language_tutor_card',
                  ctaLabel: TUTOR_COPY.cta[lang],
                  ctaPosition: 'card',
                  destination: 'online',
                  category: 'education',
                  locale: lang,
                })}
                className="group bg-sky-50/60 border border-sky-100 rounded-3xl p-6 hover:border-sky-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{t.emoji}</span>
                  <ArrowUpRight className="w-4 h-4 text-sky-300 group-hover:text-brand-mid transition-colors" />
                </div>
                <p className="text-gray-900 font-black mb-1">{t.name[lang]}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{t.desc[lang]}</p>
                <span className="inline-flex items-center gap-1.5 text-brand-mid text-xs font-bold">
                  <MessagesSquare className="w-3.5 h-3.5" strokeWidth={1.75} />
                  AmazingTalker · {TUTOR_COPY.cta[lang]}
                </span>
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-[0.6875rem] mt-3">{TUTOR_COPY.note[lang]}</p>
        </div>
      </section>

      {/* Hosted 리드 — 어학·유학 체류 수요 검증 (feat/hosted-lead-v1) */}
      <HostedLeadSection variant="language" tone="light" />

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
