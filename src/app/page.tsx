'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Mountain, MapPin, Wifi, Sparkles, Building2, GraduationCap,
  Bot, Star, ArrowRight, CheckCircle2, Globe, Leaf,
  Target, TrendingUp, Award, ChevronDown, Menu, X,
  Compass, Users, Zap, BookOpen, Coffee
} from 'lucide-react'

/* ─── 네비 메뉴 ─── */
const NAV = [
  { label: '와케이션 소개', href: '#about' },
  { label: '워케이션 스테이', href: '#stay' },
  { label: '액티비티', href: '#activities' },
  { label: '워크 스페이스', href: '#workspace' },
  { label: '성장', href: '#growth' },
]

/* ─── 스테이 카드 ─── */
const STAYS = [
  {
    name: '애월 오션 빌라', region: '제주', score: 9.8, price: '148,000',
    tag: '오션뷰', wifi: '500Mbps',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '설악 포레스트 하우스', region: '강원', score: 9.6, price: '98,000',
    tag: '산속', wifi: '300Mbps',
    img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '여수 하버뷰 레지던스', region: '전남', score: 9.4, price: '128,000',
    tag: '항구뷰', wifi: '400Mbps',
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
  },
]

/* ─── 액티비티 ─── */
const ACTIVITIES = [
  { icon: <Compass className="w-5 h-5" />, title: '지역 탐방 투어', desc: '로컬 가이드와 함께하는 숨겨진 명소 발견', color: 'from-orange-400 to-rose-500' },
  { icon: <Coffee className="w-5 h-5" />, title: '로컬 카페 크롤링', desc: '업무하기 좋은 카페를 직접 검증하고 추천', color: 'from-amber-400 to-orange-500' },
  { icon: <Users className="w-5 h-5" />, title: '네트워킹 밋업', desc: '같은 지역의 워케이셔너들과 자연스러운 연결', color: 'from-blue-400 to-indigo-500' },
  { icon: <Leaf className="w-5 h-5" />, title: '웰니스 프로그램', desc: '요가, 명상, 자연 트레킹으로 재충전', color: 'from-green-400 to-teal-500' },
]

/* ─── 워크스페이스 ─── */
const WORKSPACES = [
  { label: '기가 인터넷', icon: <Wifi className="w-5 h-5" />, desc: '1Gbps 전용 회선' },
  { label: '독립 부스', icon: <Building2 className="w-5 h-5" />, desc: '집중 업무 전용 공간' },
  { label: 'AI 장비', icon: <Bot className="w-5 h-5" />, desc: '고사양 모니터·장비 제공' },
  { label: '24시간', icon: <Zap className="w-5 h-5" />, desc: '언제든 입장 가능' },
]

/* ─── 성장 캠프 ─── */
const CAMPS = [
  { num: '01', title: 'AI 활용 스킬업', desc: '업무 자동화, 콘텐츠 제작, 리서치, 문서화를 위한 Claude·GPT 실무 활용' },
  { num: '02', title: 'AI 디자인 스킬업', desc: '상세페이지, 카드뉴스, 배너, 브랜드 이미지 제작 실습' },
  { num: '03', title: 'AI 마케팅 자동화', desc: '광고문구, 블로그, 숏폼, 이메일, 고객응대 자동화 설계' },
  { num: '04', title: '영어 스킬업', desc: '해외 비즈니스, 고객응대, 소싱, 커뮤니케이션 실전 영어' },
  { num: '05', title: '일본어 스킬업', desc: 'Qoo10 Japan, 일본 시장조사, 현지 소통을 위한 실전 일본어' },
  { num: '06', title: '글로벌 셀링 실전', desc: '아마존, Qoo10, 쇼피, 일본·중국 시장조사 기반 판매전략' },
]

const STORIES = [
  { name: '김지수', role: '프리랜서 디자이너', text: '제주에서 한 달, AI 스킬업 캠프까지 참여하니 포트폴리오가 2배로 늘었어요.' },
  { name: '이준혁', role: '1인 개발자', text: '강원도 산속에서 코딩하며 AI 자동화 캠프 들었는데 진짜 신세계였어요.' },
  { name: '박소연', role: '온라인 셀러', text: '여수에서 글로벌 셀링 캠프 참여했어요. 거기서 만난 분이랑 파트너십까지 맺었어요.' },
]

/* ─── 메인 ─── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StaySection />
      <ActivitiesSection />
      <WorkspaceSection />
      <GrowthSection />
      <StoriesSection />
      <B2BSection />
      <CtaSection />
      <Footer />
    </div>
  )
}

/* ── Navbar ── */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<'KO'|'EN'|'JP'>('KO')

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      {/* 데스크탑 */}
      <div className="hidden md:flex items-center justify-between px-8 h-14 bg-white/10 backdrop-blur-xl border-b border-white/10">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <Mountain className="w-5 h-5" />
          <span className="font-black text-lg tracking-tight">Wakation</span>
        </Link>

        {/* 메뉴 */}
        <ul className="flex items-center gap-8">
          {NAV.map(n => (
            <li key={n.label}>
              <Link href={n.href} className="text-white/80 text-sm font-medium hover:text-white transition-colors">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 우측 */}
        <div className="flex items-center gap-4">
          {/* 언어 */}
          <div className="flex items-center gap-1">
            {(['KO','EN','JP'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`text-xs font-bold px-2 py-1 rounded transition-colors ${lang===l ? 'bg-white text-gray-900' : 'text-white/60 hover:text-white'}`}>
                {l}
              </button>
            ))}
          </div>
          <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">로그인</Link>
          <Link href="#about" className="bg-teal-500 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-teal-400 transition-colors">
            체험하기
          </Link>
        </div>
      </div>

      {/* 모바일 */}
      <div className="md:hidden flex items-center justify-between px-5 h-14 bg-black/30 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Mountain className="w-5 h-5" />
          <span className="font-black text-base">Wakation</span>
        </Link>
        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl px-5 py-6 space-y-4">
          {NAV.map(n => (
            <Link key={n.label} href={n.href} onClick={() => setOpen(false)}
              className="block text-white/80 text-base font-medium py-2 border-b border-white/10 hover:text-white">
              {n.label}
            </Link>
          ))}
          <Link href="#" className="block mt-4 bg-teal-500 text-white text-center font-bold py-3 rounded-full">
            체험하기
          </Link>
        </div>
      )}
    </nav>
  )
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85"
          alt="Wakation"
          className="w-full h-full object-cover object-center"
        />
        {/* 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative w-full max-w-6xl mx-auto px-6 pb-24 md:pb-32">
        <div className="fade-up max-w-2xl">
          <p className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Stay · Work · Grow
          </p>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-6 tracking-tight">
            Wakation
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-2 leading-relaxed">
            일, 쉼, 성장이 한 흐름으로 이어지는 워케이션
          </p>
          <p className="text-white/60 text-sm md:text-base mb-10 leading-relaxed">
            숙소·액티비티·공유오피스·러닝을 하나의 여정으로 설계했습니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#about"
              className="bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-all hover:-translate-y-0.5 shadow-lg shadow-teal-500/30">
              체험하기
            </Link>
            <Link href="#stay"
              className="bg-white/15 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border border-white/30 hover:bg-white/25 transition-all">
              숙소 둘러보기
            </Link>
          </div>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 fade-in d-500">
        <span className="text-xs tracking-widest">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}

/* ── About ── */
function AboutSection() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-5">와케이션 소개</p>
            <h2 className="text-5xl font-black text-gray-900 leading-tight mb-6">
              체류를<br />
              성장의 시간으로<br />
              <span className="text-teal-500">바꿉니다</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              기존 워케이션은 숙소만 예약하면 끝이었어요. Wakation은 달라요.
              일하는 공간, 배우는 프로그램, 연결되는 커뮤니티까지 하나의 여정으로 설계합니다.
            </p>
            <div className="space-y-4">
              {[
                { q: '숙소만 예약하면 끝', a: '숙소 + 오피스 + 프로그램 한 번에' },
                { q: '일만 하다 끝남', a: '일하면서 스킬업까지 동시에' },
                { q: '혼자라 외로움', a: '같은 목적의 사람들과 자연스럽게 연결' },
              ].map(item => (
                <div key={item.q} className="flex gap-4 items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xs mt-0.5 shrink-0">✗</div>
                  <div>
                    <p className="text-gray-400 text-sm line-through">{item.q}</p>
                    <p className="text-gray-800 text-sm font-medium flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80"
              alt="Wakation"
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
            />
            {/* 플로팅 카드 */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 w-44">
              <p className="text-3xl font-black text-teal-500 mb-1">9.4</p>
              <p className="text-xs text-gray-500">평균 만족도</p>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_,i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 w-44">
              <p className="text-3xl font-black text-gray-900 mb-1">2,700+</p>
              <p className="text-xs text-gray-500">검증된 공간</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Stay ── */
function StaySection() {
  return (
    <section id="stay" className="py-32 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">워케이션 스테이</p>
            <h2 className="text-5xl font-black text-white leading-tight">
              일하기 좋은 공간,<br />직접 검증했습니다
            </h2>
          </div>
          <Link href="/spaces" className="hidden md:flex items-center gap-2 text-teal-400 text-sm font-semibold hover:text-teal-300 transition-colors">
            전체 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STAYS.map(s => (
            <div key={s.name} className="group relative rounded-3xl overflow-hidden cursor-pointer">
              <img src={s.img} alt={s.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">{s.tag}</span>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/15 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-white text-xs font-bold">{s.score}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/60 text-xs mb-1">{s.region}</p>
                <h3 className="text-white font-bold text-lg mb-3">{s.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-white/60 text-xs">
                    <Wifi className="w-3.5 h-3.5" />{s.wifi}
                  </div>
                  <div>
                    <span className="text-white font-black">₩{s.price}</span>
                    <span className="text-white/60 text-xs">/박</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 검증 배지들 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { icon: <Wifi className="w-5 h-5" />, label: 'WiFi 실측 검증', sub: '100Mbps 이상 보장' },
            { icon: <Building2 className="w-5 h-5" />, label: '전용 데스크', sub: '독립 업무공간 확인' },
            { icon: <Zap className="w-5 h-5" />, label: '소음 레벨 측정', sub: '집중 환경 보장' },
            { icon: <CheckCircle2 className="w-5 h-5" />, label: '현장 실사', sub: '팀 직접 방문 확인' },
          ].map(b => (
            <div key={b.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-teal-400 mb-3">{b.icon}</div>
              <p className="text-white text-sm font-semibold">{b.label}</p>
              <p className="text-white/40 text-xs mt-1">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Activities ── */
function ActivitiesSection() {
  return (
    <section id="activities" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-4">액티비티</p>
          <h2 className="text-5xl font-black text-gray-900 mb-5">
            일 사이사이,<br />특별한 경험
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">지역의 매력을 가장 잘 아는 로컬과 함께 영감을 충전하세요.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* 메인 큰 카드 */}
          <div className="relative rounded-3xl overflow-hidden h-96 group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Activity"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">인기 1위</span>
              <h3 className="text-white text-2xl font-black mb-2">제주 오름 선라이즈 트레킹</h3>
              <p className="text-white/70 text-sm">일출을 보며 하루를 여는 특별한 경험</p>
            </div>
          </div>

          {/* 작은 카드 2개 */}
          <div className="grid gap-6">
            {ACTIVITIES.slice(0, 2).map(a => (
              <div key={a.title} className={`relative rounded-3xl overflow-hidden h-44 group cursor-pointer bg-gradient-to-br ${a.color}`}>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="bg-white/20 backdrop-blur-sm w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3">
                    {a.icon}
                  </div>
                  <h3 className="text-white font-black text-lg">{a.title}</h3>
                  <p className="text-white/75 text-sm">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 나머지 액티비티 */}
        <div className="grid md:grid-cols-2 gap-6">
          {ACTIVITIES.slice(2).map(a => (
            <div key={a.title} className={`rounded-3xl overflow-hidden h-44 group cursor-pointer bg-gradient-to-br ${a.color} relative`}>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="bg-white/20 backdrop-blur-sm w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3">
                  {a.icon}
                </div>
                <h3 className="text-white font-black text-lg">{a.title}</h3>
                <p className="text-white/75 text-sm">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Workspace ── */
function WorkspaceSection() {
  return (
    <section id="workspace" className="py-32 px-6 bg-[#F5F5F0]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* 이미지 */}
          <div className="relative order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
              alt="Workspace"
              className="w-full h-[520px] object-cover rounded-3xl shadow-2xl"
            />
            {/* 오버레이 카드 */}
            <div className="absolute inset-4 rounded-2xl bg-black/40 backdrop-blur-sm flex flex-col justify-end p-6">
              <div className="grid grid-cols-2 gap-3">
                {WORKSPACES.map(w => (
                  <div key={w.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-teal-400 mb-1">{w.icon}</div>
                    <p className="text-white text-xs font-bold">{w.label}</p>
                    <p className="text-white/50 text-xs">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 텍스트 */}
          <div className="order-1 md:order-2">
            <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-5">워크 스페이스</p>
            <h2 className="text-5xl font-black text-gray-900 leading-tight mb-6">
              서울 사무실보다<br />
              <span className="text-teal-500">더 좋은 환경</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-10">
              WiFi 속도부터 의자의 허리 지지력까지. 실제로 일해본 사람들이 직접 검증한 업무 환경만 제공합니다.
            </p>

            <div className="space-y-4">
              {[
                '기가 인터넷 전용 회선 + 백업 LTE',
                '에르고노믹 의자 & 고사양 모니터',
                '독립 부스로 완전한 집중 환경',
                '24시간 무제한 이용',
                '화상회의 전용 방음 룸',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <Link href="/spaces" className="inline-flex items-center gap-2 mt-10 bg-gray-900 text-white font-bold px-7 py-3.5 rounded-full hover:bg-gray-700 transition-colors">
              공간 검색하기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Growth ── */
function GrowthSection() {
  return (
    <section id="growth" className="py-32 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">성장</p>
          <h2 className="text-5xl font-black text-white mb-5">
            점프업 성장캠프
          </h2>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
            3박 4일 이상 머물며 일하고, 배우고, 네트워킹하며 성장하는 실무형 캠프.
            지속적으로 프로그램이 업데이트됩니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAMPS.map(c => (
            <div key={c.num} className="group bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/8 hover:border-teal-500/30 transition-all cursor-pointer">
              <span className="text-teal-400/60 text-xs font-black tracking-widest">{c.num}</span>
              <h3 className="text-white font-black text-lg mt-4 mb-3 group-hover:text-teal-400 transition-colors">{c.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/programs" className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-colors">
            <BookOpen className="w-5 h-5" /> 전체 프로그램 보기
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Stories ── */
function StoriesSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-4">리얼 스토리</p>
          <h2 className="text-5xl font-black text-gray-900">직접 경험한 사람들</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {STORIES.map((s, i) => (
            <div key={s.name} className="relative">
              <div className="text-8xl font-black text-gray-100 absolute -top-6 -left-2 select-none">"</div>
              <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_,j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 text-sm">{s.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm
                    ${i===0?'bg-teal-500':i===1?'bg-blue-500':'bg-purple-500'}`}>
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{s.name}</p>
                    <p className="text-gray-400 text-xs">{s.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── B2B ── */
function B2BSection() {
  return (
    <section className="py-32 px-6 bg-[#F5F5F0]">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-[#111111] rounded-[40px] overflow-hidden p-14 md:p-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 text-xs font-bold px-4 py-2 rounded-full mb-8">
                <Building2 className="w-3.5 h-3.5" /> 기업 & 기관 서비스
              </div>
              <h2 className="text-4xl font-black text-white mb-5 leading-tight">
                기업의 워케이션,<br />
                <span className="text-teal-400">제대로 설계합니다</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 text-sm">
                지자체, 기업, 교육기관과 협업해 지역에 생활인구를 유입하고 참여자들에게 실질적인 성장 기회를 제공합니다.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { icon: <Target className="w-4 h-4" />, text: '지자체 워케이션 유치 파트너십' },
                  { icon: <TrendingUp className="w-4 h-4" />, text: '기업 팀빌딩 & 직원 복지 프로그램' },
                  { icon: <Award className="w-4 h-4" />, text: '교육기관 연계 실무 스킬업 캠프' },
                  { icon: <Globe className="w-4 h-4" />, text: '국내 검증 후 해외 시장 단계적 확장' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="text-teal-400 shrink-0">{item.icon}</div>
                    {item.text}
                  </div>
                ))}
              </div>
              <Link href="#" className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-7 py-3.5 rounded-full hover:bg-teal-400 transition-colors">
                기업 상담 신청 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '120+', label: '파트너 기업·기관', sub: '지자체·기업·교육기관' },
                { value: '9.6', label: '평균 만족도', sub: '기업 고객 NPS 기준' },
                { value: '30%', label: '비용 절감', sub: '기존 워크숍 대비' },
                { value: '94%', label: '재계약율', sub: '6개월 이후 기준' },
              ].map(item => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-3xl font-black text-teal-400 mb-1">{item.value}</p>
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                  <p className="text-white/30 text-xs mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CtaSection() {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>
      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-6">지금 시작하기</p>
        <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
          일할지도,<br />
          <span className="text-teal-400">성장할지도</span>
        </h2>
        <p className="text-white/60 text-lg mb-12">AI 진단으로 나에게 맞는 워케이션을 찾아보세요.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#about"
            className="bg-teal-500 text-white font-black px-10 py-4 rounded-full hover:bg-teal-400 transition-all hover:-translate-y-0.5 shadow-lg shadow-teal-500/30 text-base">
            지금 체험하기
          </Link>
          <Link href="/spaces"
            className="bg-white/15 backdrop-blur-sm text-white font-bold px-10 py-4 rounded-full border border-white/30 hover:bg-white/25 transition-all text-base">
            공간 탐색하기
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white/40 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <Mountain className="w-5 h-5 text-teal-500" />
              <span className="font-black text-white text-xl">Wakation</span>
            </div>
            <p className="text-sm leading-loose text-white/30 max-w-xs">
              Stay. Work. Grow.<br />
              일, 쉼, 성장이 한 흐름으로 이어지는 워케이션 플랫폼.
            </p>
            <div className="flex gap-3 mt-6">
              {['KO','EN','JP'].map(l => (
                <button key={l} className="text-xs text-white/30 hover:text-white/70 transition-colors font-bold">{l}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-5">서비스</h4>
            <ul className="space-y-3 text-sm">
              {['워케이션 스테이', 'AI 매칭', '성장캠프', '워크 스페이스', '액티비티'].map(item => (
                <li key={item}><Link href="#" className="hover:text-white/80 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-5">문의</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-white/30">hello@wakation.kr</li>
              {['기업 서비스', '파트너 등록', 'FAQ', '공지사항'].map(item => (
                <li key={item}><Link href="#" className="hover:text-white/80 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs">
          <span>© 2026 Wakation by StayForward. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/60 transition-colors">개인정보처리방침</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
