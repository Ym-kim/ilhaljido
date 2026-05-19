import Link from 'next/link'
import {
  MapPin, Wifi, Sparkles, Users, Building2, GraduationCap,
  Bot, BarChart3, Star, ChevronRight, ArrowRight,
  CheckCircle2, Globe, Leaf, Coffee, Waves, Shield, Zap,
  Target, TrendingUp, Award
} from 'lucide-react'

/* ─── 데이터 ─── */

const SERVICES = [
  { icon: <Building2 className="w-6 h-6" />, title: '워케이션 숙소', desc: '업무와 휴식이 균형 잡힌 스테이 큐레이션', href: '/spaces', color: 'bg-teal-50 text-teal-600' },
  { icon: <Leaf className="w-6 h-6" />, title: '액티비티 & 체험', desc: '지역 특색을 살린 영감형 경험', href: '/activities', color: 'bg-green-50 text-green-600' },
  { icon: <Coffee className="w-6 h-6" />, title: '공유오피스', desc: '집중과 협업이 가능한 업무 허브', href: '/office', color: 'bg-amber-50 text-amber-600' },
  { icon: <GraduationCap className="w-6 h-6" />, title: '자기계발', desc: '학습과 멘토링 기반의 성장 지원', href: '/learn', color: 'bg-purple-50 text-purple-600' },
  { icon: <Bot className="w-6 h-6" />, title: 'AI 큐레이션', desc: '목적형 진단 기반 맞춤 워케이션 추천', href: '/ai-match', color: 'bg-blue-50 text-blue-600' },
  { icon: <BarChart3 className="w-6 h-6" />, title: 'Work Fit Index', desc: '업무환경 적합도 지수로 체류 품질 검증', href: '/work-fit', color: 'bg-rose-50 text-rose-600' },
]

const DESTINATIONS = [
  { id: 'jeju', name: '제주', region: 'Jeju Island', score: 9.8, wifi: '500Mbps', price: '45,000', tag: '🏝 자연', gradient: 'from-teal-400 to-cyan-600', desc: '에메랄드 바다와 오름이 만나는 곳' },
  { id: 'gangwon', name: '강원', region: 'Gangwon-do', score: 9.6, wifi: '300Mbps', price: '38,000', tag: '🏔 산속', gradient: 'from-green-400 to-emerald-600', desc: '설악산 품에서 깊은 집중' },
  { id: 'yeosu', name: '여수', region: 'Jeonnam', score: 9.4, wifi: '400Mbps', price: '42,000', tag: '🌊 해안', gradient: 'from-blue-400 to-indigo-600', desc: '낭만 항구 뷰에서 일하는 특별함' },
  { id: 'busan', name: '부산', region: 'Busan City', score: 9.2, wifi: '1Gbps', price: '40,000', tag: '🌆 도시', gradient: 'from-orange-400 to-rose-500', desc: '도시 에너지와 바다가 공존하는 곳' },
]

const GROWTH_CAMPS = [
  { title: 'AI 활용 스킬업', desc: '업무 자동화, 콘텐츠 제작, 리서치, 문서화를 위한 AI 실무 활용' },
  { title: 'AI 디자인 스킬업', desc: '상세페이지, 카드뉴스, 배너, 브랜드 이미지 제작 실습' },
  { title: 'AI 마케팅 자동화', desc: '광고문구, 블로그, 숏폼, 이메일, 고객응대 자동화 설계' },
  { title: '영어 스킬업', desc: '해외 비즈니스, 고객응대, 소싱, 커뮤니케이션 실전 영어' },
  { title: '일본어 스킬업', desc: 'Qoo10 Japan, 일본 시장조사, 현지 소통을 위한 실전 일본어' },
  { title: '글로벌 셀링 실전', desc: '아마존, Qoo10, 쇼피, 일본·중국 시장조사 기반 판매전략' },
]

const WHY_NOT = [
  '숙소만 예약하면 끝 — 업무 환경은 알아서',
  '일만 하다 끝남 — 성장도 휴식도 없음',
  '혼자라 네트워킹 기회가 없음',
  '지역 정보 없어 시간 낭비',
]

const WHY_YES = [
  '숙소 + 공유오피스 + 프로그램 한 번에',
  '일하면서 스킬업까지 동시에',
  '같은 목적의 사람들과 자연스럽게 연결',
  'AI가 목적에 맞는 최적 동선 설계',
]

const STATS = [
  { value: '2,700+', label: '검증된 워케이션 공간' },
  { value: '360만', label: '국내 프리랜서·1인사업자' },
  { value: '9.4', label: '평균 만족도' },
  { value: '6개', label: '전국 커버리지 지역' },
]

const STORIES = [
  { name: '김지수', role: '프리랜서 디자이너', text: '제주에서 한 달 동안 있었는데, AI 스킬업 캠프까지 참여하니 포트폴리오가 2배로 늘었어요. 와케이션 없이는 이제 못 살겠어요.' },
  { name: '이준혁', role: '1인 개발자', text: '강원도 산속에서 코딩하며 AI 자동화 캠프 들었는데 진짜 신세계였어요. 생산성이 서울보다 3배 높았습니다.' },
  { name: '박소연', role: '온라인 셀러', text: '여수에서 글로벌 셀링 스킬업 캠프 참여했어요. 거기서 만난 분이랑 지금 파트너십까지 맺었어요.' },
]

/* ─── 메인 ─── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <DestinationsSection />
      <WhySection />
      <GrowthCampSection />
      <AICurationSection />
      <B2BSection />
      <StoriesSection />
      <CtaSection />
      <Footer />
    </div>
  )
}

/* ── Navbar ── */
function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-lg tracking-tight text-gray-900">와케이션</span>
          <span className="hidden md:block text-xs text-gray-400 font-medium ml-1">Stay. Work. Grow.</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          <Link href="/spaces" className="hover:text-teal-600 transition-colors">숙소</Link>
          <Link href="#growth-camp" className="hover:text-teal-600 transition-colors">성장캠프</Link>
          <Link href="/ai-match" className="hover:text-teal-600 transition-colors">AI 매칭</Link>
          <Link href="#b2b" className="hover:text-teal-600 transition-colors">기업서비스</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="#" className="hidden md:block text-sm font-medium text-gray-500 hover:text-gray-900">로그인</Link>
          <Link href="/ai-match" className="bg-teal-500 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-teal-600 transition-colors shadow-sm">
            시작하기
          </Link>
        </div>
      </div>
    </nav>
  )
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-cyan-50" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI 기반 목적형 워케이션 플랫폼
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4">
            일, 쉼, 성장이<br />
            <span className="text-teal-500">한 흐름으로</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-3">
            단순한 숙박을 넘어 업무·휴식·성장이 조화롭게 이어지는 라이프스타일.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            디지털 노마드형 1인 기업가·프리랜서·온라인 마케터를 위한 플랫폼
          </p>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex flex-col sm:flex-row gap-2 max-w-lg mb-4">
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <input type="text" placeholder="어디서, 무엇을 하고 싶어요?" className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none py-2" />
            </div>
            <Link href="/ai-match" className="bg-teal-500 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-teal-600 transition-colors text-center whitespace-nowrap">
              AI 추천받기
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {['3박 4일 성장캠프', '제주 AI 스킬업', '강원 집중 코딩', '여수 네트워킹'].map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full cursor-pointer hover:bg-teal-50 hover:text-teal-700 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {DESTINATIONS.map(d => (
            <div key={d.id} className="rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 transition-transform cursor-pointer">
              <div className={`h-28 bg-gradient-to-br ${d.gradient} relative flex items-end p-3`}>
                <span className="bg-white/90 text-xs font-bold text-gray-800 px-2 py-1 rounded-full">{d.tag}</span>
                <span className="absolute top-3 right-3 bg-white/90 text-xs font-black text-teal-600 px-2 py-1 rounded-full">★ {d.score}</span>
              </div>
              <div className="bg-white p-3">
                <p className="font-bold text-gray-900 text-sm">{d.name}</p>
                <p className="text-xs text-gray-400">{d.region}</p>
                <p className="text-xs text-teal-600 font-semibold mt-1">₩{d.price}/일~</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Stats ── */
function StatsBar() {
  return (
    <section className="bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-black text-white mb-1">{s.value}</p>
            <p className="text-sm text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Services ── */
function ServicesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-teal-500 font-semibold text-sm mb-2">6가지 통합 서비스</p>
          <h2 className="text-4xl font-black text-gray-900 mb-3">Wakation의 특별한 서비스</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">단순한 숙박을 넘어 업무, 휴식, 성장이 조화롭게 이어지는 라이프스타일을 제안합니다.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {SERVICES.map(s => (
            <Link key={s.title} href={s.href} className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
              <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}>{s.icon}</div>
              <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-teal-600 transition-colors">{s.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Destinations ── */
function DestinationsSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-teal-500 font-semibold text-sm mb-2">인기 워케이션 지역</p>
            <h2 className="text-4xl font-black text-gray-900">추천 여행지</h2>
          </div>
          <Link href="/spaces" className="hidden md:flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700">
            전체 보기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map(d => (
            <div key={d.id} className="group rounded-3xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className={`h-44 bg-gradient-to-br ${d.gradient} relative flex flex-col justify-between p-5`}>
                <div className="flex justify-between">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">{d.tag}</span>
                  <span className="bg-white text-teal-600 text-xs font-black px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-teal-500 text-teal-500" /> {d.score}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-black text-2xl">{d.name}</h3>
                  <p className="text-white/80 text-xs">{d.region}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-3">{d.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Wifi className="w-3.5 h-3.5 text-teal-400" />{d.wifi}
                  </div>
                  <div>
                    <span className="text-lg font-black text-gray-900">₩{d.price}</span>
                    <span className="text-xs text-gray-400">/일</span>
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

/* ── Why ── */
function WhySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-teal-500 font-semibold text-sm mb-2">왜 와케이션인가요?</p>
          <h2 className="text-4xl font-black text-gray-900 mb-3">기존 워케이션은 부족합니다</h2>
          <p className="text-gray-500 text-sm">Wakation은 체류를 성장의 시간으로 바꿉니다</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 rounded-3xl p-8 border border-red-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold text-sm">✗</div>
              <h3 className="font-bold text-gray-900">기존 워케이션의 문제</h3>
            </div>
            <div className="space-y-3">
              {WHY_NOT.map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xs mt-0.5 shrink-0">✗</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-500 font-bold text-sm">✓</div>
              <h3 className="font-bold text-gray-900">와케이션의 해답</h3>
            </div>
            <div className="space-y-3">
              {WHY_YES.map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Growth Camp ── */
function GrowthCampSection() {
  return (
    <section id="growth-camp" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-teal-500 font-semibold text-sm mb-2">핵심 프로그램</p>
          <h2 className="text-4xl font-black text-gray-900 mb-3">점프업 성장캠프</h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            디지털 노마드형 1인 기업가·프리랜서·온라인 마케터가 국내외 지역에 머물며 일하고 배우고 네트워킹하며 성장할 수 있도록 3박 4일 이상 최적 기간의 실무형 성장 캠프를 설계합니다.
          </p>
          <p className="text-xs text-gray-400 mt-2">(지속적으로 프로그램은 업데이트 됩니다)</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {GROWTH_CAMPS.map((camp, i) => (
            <div key={camp.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-black text-sm mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{camp.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{camp.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/programs" className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-600 transition-colors">
            전체 프로그램 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── AI Curation ── */
function AICurationSection() {
  return (
    <section id="ai-match" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-teal-500 font-semibold text-sm mb-2">AI 맞춤 추천</p>
          <h2 className="text-4xl font-black text-gray-900 mb-3">AI가 목적에 맞는 Wakation을 추천합니다</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            진단폼 기반 맞춤 큐레이션. 향후 데이터 기반 추천 엔진으로 고도화됩니다.
          </p>
        </div>
        <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8">
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {[
              { label: '사용자 유형', options: ['온라인 셀러', '프리랜서', '1인 창업가', '원격근무자', '초기 스타트업 팀', '크리에이터'] },
              { label: '이번 목적', options: ['AI 활용 스킬업', 'AI 디자인 스킬업', '영어 스킬업', '일본어 스킬업', '집중 업무', '네트워킹'] },
              { label: '선호 체류 형태', options: ['도심형', '자연형', '해변형', '코워킹 결합형', '코리빙 결합형'] },
              { label: '체류 기간', options: ['3박 4일', '2박 3일', '5박 6일', '1주일', '2주 이상'] },
              { label: '예산', options: ['50만원 이하', '50~100만원', '100~200만원', '200만원 이상'] },
              { label: '업무환경 선호', options: ['조용한 독립형', '네트워킹 중심형', '촬영 가능한 스튜디오형', '회의실 중심형'] },
              { label: '국내/해외 선호', options: ['국내 우선', '해외 우선', '둘 다 가능'] },
              { label: '가족/반려동물 동반', options: ['해당 없음', '가족 동반', '반려동물 동반', '가족+반려동물'] },
            ].map(field => (
              <div key={field.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:border-teal-400">
                  <option value="">선택</option>
                  {field.options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            ))}
          </div>
          <Link
            href="/ai-match"
            className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white font-bold py-4 rounded-xl hover:bg-teal-600 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            AI 추천 결과 보기
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── B2B ── */
function B2BSection() {
  return (
    <section id="b2b" className="py-24 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Building2 className="w-3.5 h-3.5" />
              기업 & 기관 서비스
            </div>
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">
              기업과 기관을 위한<br />
              <span className="text-teal-400">Wakation</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              지자체, 기업, 교육기관과 협업해 지역에 생활인구를 유입하고 참여자들에게 실질적인 성장 기회를 제공합니다.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { icon: <Target className="w-4 h-4" />, text: '지자체 워케이션 유치 파트너십' },
                { icon: <TrendingUp className="w-4 h-4" />, text: '기업 직원 복지 & 팀빌딩 프로그램' },
                { icon: <Award className="w-4 h-4" />, text: '교육기관 연계 실무 스킬업 캠프' },
                { icon: <Globe className="w-4 h-4" />, text: '국내 검증 후 해외 시장 단계적 확장' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="text-teal-400">{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </div>
            <Link href="#" className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-colors">
              기업 상담 신청 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '파트너 기업·기관', value: '120+', sub: '지자체·기업·교육기관 포함' },
              { label: '평균 만족도', value: '9.6', sub: '기업 고객 NPS 기준' },
              { label: '평균 비용 절감', value: '30%', sub: '기존 팀 워크숍 대비' },
              { label: '재계약율', value: '94%', sub: '6개월 이후 기준' },
            ].map(item => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-2xl font-black text-teal-400 mb-1">{item.value}</p>
                <p className="text-white text-sm font-semibold mb-1">{item.label}</p>
                <p className="text-gray-500 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Stories ── */
function StoriesSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-teal-500 font-semibold text-sm mb-2">실제 이용 후기</p>
          <h2 className="text-4xl font-black text-gray-900">Wakation 스토리</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {STORIES.map(s => (
            <div key={s.name} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&quot;{s.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                  {s.name[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{s.name}</p>
                  <p className="text-gray-400 text-xs">{s.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CtaSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
          일할지도,<br />
          <span className="text-teal-500">성장할지도</span>
        </h2>
        <p className="text-gray-500 text-lg mb-10">지금 AI 진단을 시작해서 나에게 맞는 워케이션을 찾아보세요.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/ai-match" className="bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 shadow-md">
            <Sparkles className="w-5 h-5" /> AI 매칭 시작하기
          </Link>
          <Link href="/spaces" className="border-2 border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-full hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" /> 공간 탐색하기
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white text-lg">와케이션</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              일하며 성장하며 여행하는 새로운 방식.<br />
              Stay. Work. Grow.
            </p>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              {['워케이션 숙소', 'AI 매칭', '성장캠프', '공유오피스', '액티비티'].map(item => (
                <li key={item}><Link href="#" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">문의</h4>
            <ul className="space-y-2 text-sm">
              <li>hello@wakation.kr</li>
              {['기업 서비스', '파트너 등록', 'FAQ'].map(item => (
                <li key={item}><Link href="#" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs">
          <span>© 2026 와케이션 (Wakation) by StayForward. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
            <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
