'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { useLang } from '@/context/LanguageContext'

const CATEGORIES = [
  { emoji: '🏡', label: '국내 워케이션', href: '/programs/domestic', color: 'teal',   desc: '양양·강릉·제주 등 국내 거점' },
  { emoji: '🌏', label: '글로벌 워케이션', href: '/programs/global',   color: 'blue',   desc: '발리·치앙마이·도쿄 등 해외 거점' },
  { emoji: '📊', label: '시장조사단·박람회', href: '/programs/market', color: 'orange', desc: '글로벌 시장을 직접 보고 사업에 연결' },
  { emoji: '📚', label: '어학·유학',        href: '/language',         color: 'rose',   desc: '일하면서 언어를 배우는 체류 프로그램' },
  { emoji: '🚢', label: '크루즈 워케이션',  href: '/cruise',           color: 'cyan',   desc: '바다 위에서 일하며 이동하는 워케이션' },
  { emoji: '🎓', label: '성장캠프',         href: '/growth',           color: 'green',  desc: '실무형 성장 캠프 3박 4일 이상' },
]

const GLOW: Record<string, string> = {
  teal:   'hover:shadow-teal-500/30',
  blue:   'hover:shadow-blue-500/30',
  orange: 'hover:shadow-orange-500/30',
  rose:   'hover:shadow-rose-500/30',
  cyan:   'hover:shadow-cyan-500/30',
  green:  'hover:shadow-green-500/30',
}

const ACCENT: Record<string, string> = {
  teal:   'text-teal-400',
  blue:   'text-blue-400',
  orange: 'text-orange-400',
  rose:   'text-rose-400',
  cyan:   'text-cyan-400',
  green:  'text-green-400',
}

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

export default function HomePage() {
  const { tr } = useLang()

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar transparent />

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-28">
          <span className="inline-block text-teal-400 text-xs font-bold tracking-widest uppercase mb-4 border border-teal-400/40 px-3 py-1 rounded-full">
            {tr('hero_badge')}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-5 whitespace-pre-line">
            {tr('hero_sub')}
          </h1>
          <p className="text-white/60 text-base md:text-lg mb-10">{tr('hero_desc')}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/programs"
              className="bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-all hover:-translate-y-0.5 shadow-lg shadow-teal-500/30">
              {tr('hero_cta1')}
            </Link>
            <Link
              href="/visa-ai"
              className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border border-white/30 hover:bg-white/20 transition-all">
              {tr('hero_cta2')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-[#111] border-y border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['6개', '카테고리'],
            ['360만', '프리랜서'],
            ['20+', '글로벌 도시'],
            ['AI', '비자 안내'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="text-3xl font-black text-white mb-1">{v}</p>
              <p className="text-sm text-gray-400">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Platform categories ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">Platform</p>
            <h2 className="text-4xl font-black text-white mb-3">6가지 체류형 성장 카테고리</h2>
            <p className="text-gray-400 text-sm">하나의 플랫폼에서 워케이션의 모든 것을</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group relative bg-[#1a1a1a] border border-white/10 rounded-3xl p-7 flex flex-col gap-4
                  hover:border-white/20 hover:shadow-2xl ${GLOW[cat.color]} transition-all duration-300 hover:-translate-y-1`}>
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <h3 className={`text-lg font-black mb-1 ${ACCENT[cat.color]}`}>{cat.label}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{cat.desc}</p>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-teal-400 transition-colors flex items-center gap-1 mt-auto">
                  자세히 보기 <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visa AI teaser ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0f0f0f]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">AI Concierge</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">🤖 비자·체류 AI</h2>
          <p className="text-gray-300 text-lg mb-4 leading-relaxed">
            국가·목적·기간을 선택하면 AI가 맞춤 체류 정보를 안내합니다.
          </p>
          <p className="text-gray-500 text-sm mb-10">
            일본·태국·인도네시아·베트남·호주·포르투갈 등 20개국 이상 커버.
            비자 종류 추천부터 체류 요건 요약까지.
          </p>
          <Link
            href="/visa-ai"
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-all hover:-translate-y-0.5 shadow-lg shadow-teal-500/30">
            비자·체류 AI 시작하기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Stay & Workspace teaser ── */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">Infrastructure</p>
              <h2 className="text-4xl font-black text-white">Wakation이 검증한<br />스테이·워크스페이스</h2>
            </div>
            <Link href="/infrastructure" className="text-teal-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all shrink-0">
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SPACE_TYPES.map(s => (
              <Link
                key={s.title}
                href="/infrastructure"
                className="group rounded-3xl overflow-hidden relative block h-72">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-white font-black text-lg mb-1">{s.title}</h3>
                  <p className="text-white/60 text-xs">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership teaser ── */}
      <section className="py-24 px-6 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">Partnership</p>
              <h2 className="text-4xl font-black text-white mb-5">함께 만드는 Wakation</h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                지자체·숙소·강사·어학원·에어비앤비 호스트·기업 HR까지.
                Wakation은 다양한 파트너와 함께 체류형 성장 생태계를 만들어갑니다.
              </p>
              <ul className="space-y-2 mb-10">
                {[
                  '지자체·관광재단 — 생활인구 프로그램',
                  '숙소·공유오피스·코리빙 — 공간 파트너',
                  '강의 플랫폼·강사 — 교육 콘텐츠',
                  '에어비앤비 호스트 — 파트너 스테이',
                  '기업 HR·리트릿 — 기업 워케이션',
                ].map(item => (
                  <li key={item} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/partnership"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-7 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                파트너십 알아보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['지자체·관광재단', '공간 파트너', '교육 파트너', '기업 HR'].map(p => (
                <div key={p} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
                  <span className="text-2xl">{
                    p === '지자체·관광재단' ? '🏛️' :
                    p === '공간 파트너' ? '🏠' :
                    p === '교육 파트너' ? '📖' : '🏢'
                  }</span>
                  <p className="text-white font-bold text-sm">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
