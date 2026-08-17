'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getProgramsList, getSelectCategories, translate } from '@/lib/i18n'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { PROGRAMS_LEARN_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { UpcomingCohorts } from '@/components/programs/UpcomingCohorts'
import { ArtDirectedEditorialHero } from '@/components/media/ArtDirectedEditorialHero'
import { getMediaAsset } from '@/lib/media/assets'
import { trackEvent } from '@/lib/track'
import { localizeHref } from '@/lib/i18n/localePath'
import type { Lang } from '@/lib/i18n/types'

// 성장형 프로그램 방향성 — 로드맵 (Hosted + Learning + Tools 결합)
const DIRECTION_NOTE: Record<Lang, string> = {
  KO: '앞으로 Wakation 프로그램은 숙소·업무공간·네트워킹에 더해 VOD 사전학습, 현장 실습, 참가자용 웹프로그램을 결합한 성장형 프로그램으로 확장됩니다.',
  EN: 'Wakation programs are expanding into growth programs that combine stays, workspaces and networking with pre-trip VOD learning, on-site practice, and participant web tools.',
  JP: '今後のWakationプログラムは、宿泊・ワークスペース・ネットワーキングに加え、事前VOD学習・現地実習・参加者用Webツールを組み合わせた成長型プログラムへ拡張されます。',
}

// 2026-08-17 운영자 결정: 모델 B(계단 도착 컷)보다 이전 모델 K 스테이 플래닝이 낫다고 판단 — 8/8~8/10 사용분 복원.
// 향후 모델 생성은 기존 로스터(WAK-MODEL-*) 기준으로 잡고, 신규 모델·강조 인물은 운영자가 추가 지시.
const PROGRAMS_HERO_DESKTOP = getMediaAsset('programs-model-k-stay-planning-desktop-v1')
const PROGRAMS_HERO_MOBILE = getMediaAsset('programs-model-k-stay-planning-mobile-v1')

const STATUS_COLOR = {
  recruiting: 'bg-sky-50 text-sky-700 border-sky-200',
  reviewing: 'bg-blue-50 text-blue-700 border-blue-200',
  preparing: 'bg-gray-50 text-gray-500 border-gray-200',
  inquiry: 'bg-amber-50 text-amber-700 border-amber-200',
} as const

type ProgramStatus = keyof typeof STATUS_COLOR

const STATUS_ORDER: ProgramStatus[] = ['recruiting', 'reviewing', 'inquiry', 'preparing']

const STATUS_COPY: Record<ProgramStatus, Record<Lang, string>> = {
  recruiting: {
    KO: '함께 만들 파트너를 찾고 있어요',
    EN: 'Open for partners to build with us',
    JP: '一緒につくるパートナーを募集中',
  },
  reviewing: {
    KO: '연결 방식과 운영 조건을 검토 중이에요',
    EN: 'Partnership and operating terms are under review',
    JP: '連携方法と運営条件を検討中です',
  },
  inquiry: {
    KO: '관심을 남기면 준비 상황을 안내해요',
    EN: 'Leave an inquiry to follow the next update',
    JP: '関心をお寄せいただくと準備状況をご案内します',
  },
  preparing: {
    KO: '정보를 다듬는 단계로, 현재 신청은 받지 않아요',
    EN: 'Information is being prepared; applications are not open',
    JP: '情報準備中のため、現在は申込を受け付けていません',
  },
}

// 2026-08-04: 로컬 PREFIXABLE_PATHS(4경로 — 테마 7경로 누락)를 공용 매니페스트 헬퍼로 교체

export function ProgramsHubView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  useEffect(() => {
    trackEvent('visual_asset_view', {
      assetId: PROGRAMS_HERO_DESKTOP?.id ?? 'programs-model-b-coastal-arrival-desktop-v3',
      mobileAssetId: PROGRAMS_HERO_MOBILE?.id ?? 'programs-model-b-coastal-arrival-mobile-v2',
      modelId: 'WAK-MODEL-B',
      route: lang === 'JP' ? '/ja/programs' : lang === 'EN' ? '/en/programs' : '/programs',
      section: 'programs_hero',
      locale: lang,
      placement: 'hero',
    })
  }, [lang])

  const tr = (key: string) => translate(lang, key)
  const programs = getProgramsList()
  const selectCategories = getSelectCategories(lang)
  const [featuredProgram, ...otherPrograms] = programs

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="relative h-[50vh] flex items-end overflow-hidden dark-surface">
        <div className="absolute inset-0">
          {/* 크롭은 모델 K 시절 원본 그대로(md 상단 3% 앵커 — 머리 잘림 없음, 8/8~8/10 검증 프레이밍) */}
          {PROGRAMS_HERO_DESKTOP && PROGRAMS_HERO_MOBILE && (
            <ArtDirectedEditorialHero
              desktopSrc={PROGRAMS_HERO_DESKTOP.src}
              mobileSrc={PROGRAMS_HERO_MOBILE.src}
              alt={PROGRAMS_HERO_DESKTOP.alt[lang]}
              desktopWidth={1440}
              desktopHeight={900}
              mobileWidth={960}
              mobileHeight={1280}
              className="absolute inset-0 h-full w-full object-cover object-[62%_54%] md:object-[73%_3%]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
          <SectionEyebrow onDark pill>
            {tr('programs_hero_badge')}
          </SectionEyebrow>
          <h1 className="wak-page-title whitespace-pre-line text-white">
            {tr('programs_hero_title')}
          </h1>
        </div>
      </section>

      {/* 모집 캘린더 — 확정 일정 회차 (Supabase) */}
      <UpcomingCohorts />

      {/* Wakation Hosted — 공식 프로그램 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionEyebrow>{tr('programs_grid_eyebrow')}</SectionEyebrow>
            <SectionTitle className="text-center">{tr('programs_grid_title')}</SectionTitle>
          </div>
          <div data-visual-module="program-portfolio" data-ui-grid="editorial" data-motion="reveal" data-motion-speed="editorial" className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            {featuredProgram && (
              <Link
                href={localizeHref(featuredProgram.href, forceLang ?? 'KO')}
                data-ui-card="editorial"
                onClick={() => trackEvent('visual_module_interaction', { sectionId: 'program-portfolio', visualType: 'featured-editorial', contentId: featuredProgram.id, locale: lang })}
                className="wak-card-editorial group relative min-h-[25rem] overflow-hidden border border-black/5 bg-[#102532] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Image src={featuredProgram.img} alt={tr(featuredProgram.titleKey)} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071722]/95 via-[#071722]/35 to-transparent" />
                {featuredProgram.badgeKey && (
                  <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                    {tr(featuredProgram.badgeKey)}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="mb-2 text-[0.68rem] font-black tracking-[0.14em] text-sky-300">FEATURED PROGRAM</p>
                  <h3 className="wak-card-title mb-2 max-w-xl text-2xl text-white">{tr(featuredProgram.titleKey)}</h3>
                  <p className="max-w-xl text-sm leading-relaxed text-white/70">{tr(featuredProgram.descKey)}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-sky-300">
                    {tr('learn_more')} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {otherPrograms.map((p, index) => (
                <Link
                  key={p.id}
                  href={localizeHref(p.href, forceLang ?? 'KO')}
                  onClick={() => trackEvent('visual_module_interaction', { sectionId: 'program-portfolio', visualType: 'compact-route', contentId: p.id, locale: lang, position: String(index + 2) })}
                  className="group grid min-h-28 grid-cols-[7.5rem_1fr] overflow-hidden border border-[#dbe4e5] bg-white transition hover:border-[#8db8c5] hover:shadow-md"
                >
                  <div className="relative min-h-28 overflow-hidden">
                    <Image src={p.img} alt="" fill sizes="120px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center p-4">
                    <span className="mb-1 text-[0.62rem] font-black tracking-[0.12em] text-[#6f8790]">0{index + 2}</span>
                    <h3 className="line-clamp-2 text-sm font-black leading-snug text-[#17242b]">{tr(p.titleKey)}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand-mid">{tr('learn_more')} <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 테마·지원사업 진입 (2026-08-04 cross-link-mesh — 허브 본문에 테마 6종·support 진입로가 없던 갭 해소) */}
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {([
              { href: '/programs/golf', label: { KO: '골프', EN: 'Golf', JP: 'ゴルフ' } },
              { href: '/programs/healing', label: { KO: '힐링·요가', EN: 'Healing', JP: 'ヒーリング' } },
              { href: '/programs/local', label: { KO: '미식·로컬', EN: 'Local & food', JP: 'グルメ・ローカル' } },
              { href: '/programs/networking', label: { KO: '네트워킹', EN: 'Networking', JP: 'ネットワーキング' } },
              { href: '/programs/sports', label: { KO: '스포츠 관람', EN: 'Sports', JP: 'スポーツ観戦' } },
              { href: '/programs/onsen', label: { KO: '온천·료칸', EN: 'Onsen & ryokan', JP: '温泉・旅館' } },
              { href: '/programs/support', label: { KO: '지자체 지원사업', EN: 'Gov support', JP: '自治体支援' } },
            ] as const).map((c) => (
              <Link
                key={c.href}
                href={localizeHref(c.href, forceLang ?? 'KO')}
                className="inline-flex items-center gap-1 rounded-full border border-[#dbe4e5] bg-white px-4 py-2 text-xs font-bold text-[#475d66] transition-all hover:border-brand-mid hover:text-brand-mid"
              >
                {c.label[lang]}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>

          {/* 성장형 프로그램 방향성 */}
          <p className="mt-10 max-w-3xl mx-auto text-center text-[#64748b] text-sm leading-relaxed bg-[#f0f9ff] border border-[#dbeafe] rounded-2xl px-6 py-5">
            {DIRECTION_NOTE[lang]}
          </p>
        </div>
      </section>

      {/* Wakation Select — 12개 카테고리 수익화 기반 */}
      <section className="py-20 px-6 bg-[#f0f9ff] border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-4">WAKATION SELECT</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4 leading-tight">
              {tr('prog_sel_title_1')}<br className="hidden sm:block" /> {tr('prog_sel_title_2')}
            </h2>
            <p className="text-[#64748b] text-sm max-w-xl mx-auto leading-relaxed">
              {tr('prog_sel_desc')}
            </p>
          </div>
          <div data-visual-module="program-status-roadmap" data-motion="reveal" className="grid gap-px overflow-hidden border border-[#cfe1e8] bg-[#cfe1e8] lg:grid-cols-4">
            {STATUS_ORDER.map((status) => {
              const entries = selectCategories.filter((cat) => cat.status === status)
              if (entries.length === 0) return null
              return (
                <section key={status} aria-labelledby={`program-status-${status}`} className="bg-white p-5 sm:p-6">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[0.65rem] font-bold ${STATUS_COLOR[status]}`}>
                    {entries[0].statusLabel}
                  </span>
                  <h3 id={`program-status-${status}`} className="mt-4 min-h-10 text-sm font-black leading-snug text-[#17242b]">
                    {STATUS_COPY[status][lang]}
                  </h3>
                  <ul className="mt-5 divide-y divide-[#e8eef0] border-t border-[#e8eef0]">
                    {entries.map((cat) => {
                      const className = 'group flex min-h-14 items-center justify-between gap-3 py-3 text-sm font-bold text-[#42545c] hover:text-brand-mid'
                      const content = <>{cat.name}<ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" /></>
                      const onClick = () => trackEvent('visual_module_interaction', { sectionId: 'program-status-roadmap', visualType: 'status-roadmap', contentId: cat.id, locale: lang, status })
                      return (
                        <li key={cat.id}>
                          {cat.ctaHref.startsWith('mailto:') ? (
                            <a href={cat.ctaHref} onClick={onClick} className={className}>{content}</a>
                          ) : (
                            <Link href={cat.ctaHref} onClick={onClick} className={className}>{content}</Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <p className="text-[#94a3b8] text-xs mb-3">{tr('prog_sel_partner_line')}</p>
            <a
              href="mailto:wakation.sf@gmail.com?subject=Wakation%20파트너십%20제안"
              className="inline-flex items-center gap-2 bg-white text-[#475569] font-bold px-6 py-3 rounded-full border border-[#dbeafe] text-sm hover:border-[#7dd3fc] hover:text-[#111827] transition-all"
            >
              <Mail className="w-4 h-4" />
              wakation.sf@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* 워케이션 중 성장 */}
      <AffiliateSection
        tone="light"
        title={tr('prog_learn_title')}
        subtitle={tr('prog_learn_sub')}
        items={PROGRAMS_LEARN_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
        cols={2}
      />

      {/* CTA */}
      <section className="dark-surface py-20 px-6 bg-gradient-to-b from-[#04121f] to-[#0a1e33]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle onDark className="mb-4 text-center">
            {tr('programs_cta_title')}
          </SectionTitle>
          <p className="text-caption-on-dark mb-8">{tr('programs_cta_desc')}</p>
          <Link
            href="/visa-ai"
            className="inline-flex items-center gap-2 bg-brand-mid text-white font-bold px-8 py-4 rounded-full hover:bg-sky-500 transition-all"
          >
            {tr('home_ai_cta')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
