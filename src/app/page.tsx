'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { IconTile } from '@/components/brand/IconTile'
import { useLang } from '@/context/LanguageContext'
import {
  AiIcon,
  CATEGORY_ACCENT,
  CATEGORY_GLOW,
  CATEGORY_ICONS,
  ICON_STROKE,
  partnerKeyFromTitle,
  PARTNER_ICONS,
  type CategoryColor,
} from '@/lib/icons'

const CATEGORIES: {
  id: CategoryColor
  label: string
  href: string
  desc: string
}[] = [
  { id: 'teal', label: '국내 워케이션', href: '/programs/domestic', desc: '양양·강릉·제주 등 국내 거점' },
  { id: 'blue', label: '글로벌 워케이션', href: '/programs/global', desc: '발리·치앙마이·도쿄 등 해외 거점' },
  { id: 'orange', label: '시장조사단·박람회', href: '/programs/market', desc: '글로벌 시장을 직접 보고 사업에 연결' },
  { id: 'rose', label: '어학·유학', href: '/language', desc: '일하면서 언어를 배우는 체류 프로그램' },
  { id: 'cyan', label: '크루즈 워케이션', href: '/cruise', desc: '바다 위에서 일하며 이동하는 워케이션' },
  { id: 'green', label: '성장캠프', href: '/growth', desc: '실무형 성장 캠프 3박 4일 이상' },
]

const SPACE_TYPES = [
  {
    title: '국내 숙소',
    desc: '양양·강릉·제주·전주 등 국내 거점의 워케이션 검증 숙소',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '해외 숙소',
    desc: '발리·치앙마이·오사카·포르투갈 등 글로벌 체류 검증 공간',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '공유오피스',
    desc: '실측 100Mbps+ 와이파이, 전용 데스크, 집중 환경 검증',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
]

const PARTNER_TILES = ['지자체·관광재단', '공간 파트너', '교육 파트너', '기업 HR']

export default function HomePage() {
  const { tr } = useLang()

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-24 md:pb-28">
          <SectionEyebrow onDark pill>
            {tr('hero_badge')}
          </SectionEyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-6 whitespace-pre-line tracking-tight">
            {tr('hero_sub')}
          </h1>
          <p className="text-lead-on-dark max-w-2xl mb-10">{tr('hero_desc')}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/programs" className="btn-primary">
              {tr('hero_cta1')}
            </Link>
            <Link href="/visa-ai" className="btn-secondary">
              {tr('hero_cta2')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#111] border-y border-white/8 py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['6개', '카테고리'],
            ['360만', '프리랜서'],
            ['20+', '글로벌 도시'],
            ['AI', '비자 안내'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="text-3xl md:text-4xl font-black text-white mb-2">{v}</p>
              <p className="text-stat-label">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-16">
            <SectionEyebrow onDark>Platform</SectionEyebrow>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">6가지 체류형 성장 카테고리</h2>
            <p className="text-caption-on-dark">하나의 플랫폼에서 워케이션의 모든 것을</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id]
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`card-dark group p-7 flex flex-col gap-5 hover:border-white/15 hover:shadow-2xl ${CATEGORY_GLOW[cat.id]} transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <IconTile icon={Icon} size="lg" onDark />
                  <div>
                    <h3 className={`text-xl font-black mb-2 ${CATEGORY_ACCENT[cat.id]}`}>{cat.label}</h3>
                    <p className="text-caption-on-dark leading-relaxed">{cat.desc}</p>
                  </div>
                  <span className="text-[0.875rem] font-semibold text-white/45 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5 mt-auto">
                    자세히 보기
                    <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0f0f0f] border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <SectionEyebrow onDark>AI Concierge</SectionEyebrow>
          <div className="flex justify-center mb-6">
            <span className="icon-tile icon-tile-lg icon-tile-on-dark">
              <AiIcon className="w-6 h-6" strokeWidth={ICON_STROKE} />
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5">비자·체류 AI</h2>
          <p className="text-lead-on-dark mb-4">국가·목적·기간을 선택하면 AI가 맞춤 체류 정보를 안내합니다.</p>
          <p className="text-caption-on-dark mb-10 max-w-xl mx-auto">
            일본·태국·인도네시아·베트남·호주·포르투갈 등 20개국 이상. 비자 종류 추천부터 체류 요건 요약까지.
          </p>
          <Link href="/visa-ai" className="btn-primary">
            비자·체류 AI 시작하기
            <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <SectionEyebrow onDark>Infrastructure</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Wakation이 검증한
                <br />
                스테이·워크스페이스
              </h2>
            </div>
            <Link
              href="/infrastructure"
              className="text-emerald-400 text-[0.9375rem] font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all shrink-0"
            >
              전체 보기
              <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SPACE_TYPES.map((s) => (
              <Link
                key={s.title}
                href="/infrastructure"
                className="group rounded-2xl overflow-hidden relative block h-72 border border-white/8"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-white font-black text-lg mb-2">{s.title}</h3>
                  <p className="text-caption-on-dark">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 md:gap-16 items-center">
            <div>
              <SectionEyebrow onDark>Partnership</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">함께 만드는 Wakation</h2>
              <p className="text-caption-on-dark leading-relaxed mb-8">
                지자체·숙소·강사·어학원·에어비앤비 호스트·기업 HR까지. Wakation은 다양한 파트너와 함께 체류형 성장
                생태계를 만들어갑니다.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  '지자체·관광재단 — 생활인구 프로그램',
                  '숙소·공유오피스·코리빙 — 공간 파트너',
                  '강의 플랫폼·강사 — 교육 콘텐츠',
                  '에어비앤비 호스트 — 파트너 스테이',
                  '기업 HR·리트릿 — 기업 워케이션',
                ].map((item) => (
                  <li key={item} className="text-[0.9375rem] text-white/65 flex items-start gap-3 font-medium">
                    <Check className="w-4 h-4 text-brand-mid shrink-0 mt-0.5" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/partnership" className="btn-ghost-light">
                파트너십 알아보기
                <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PARTNER_TILES.map((p) => {
                const Icon = PARTNER_ICONS[partnerKeyFromTitle(p)]
                return (
                  <div key={p} className="card-dark p-5 flex flex-col gap-3">
                    <IconTile icon={Icon} onDark />
                    <p className="text-white font-bold text-[0.9375rem] leading-snug">{p}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
