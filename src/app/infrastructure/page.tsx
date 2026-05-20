'use client'

import Link from 'next/link'
import { Wifi, Monitor, VolumeX, MapPin, Home, Globe, Building2, Users, Airplay, Store } from 'lucide-react'

const SPACE_TYPES = [
  {
    icon: Home,
    title: '국내 숙소',
    desc: '양양·강릉·제주·전주 등 국내 거점. 직접 현장 방문 후 등록한 워케이션 전용 숙소.',
  },
  {
    icon: Globe,
    title: '해외 숙소',
    desc: '발리·치앙마이·오사카·포르투갈 등 글로벌 체류 검증 숙소. 현지 파트너와 협력.',
  },
  {
    icon: Building2,
    title: '공유오피스',
    desc: '실측 WiFi 100Mbps+, 전용 데스크, 집중 업무 환경이 보장된 코워킹 공간.',
  },
  {
    icon: Users,
    title: '코리빙',
    desc: '일하는 사람들이 함께 생활하는 공간. 커뮤니티와 업무를 동시에.',
  },
  {
    icon: Airplay,
    title: '에어비앤비 파트너',
    desc: '발리·오사카 등 해외 에어비앤비 호스트와 협력한 파트너 스테이 프로그램.',
  },
  {
    icon: Store,
    title: '로컬 파트너 공간',
    desc: '지역 관광재단·지자체와 협력한 로컬 특화 숙소 및 업무 공간.',
  },
]

const VERIFY_CRITERIA = [
  { icon: Wifi,    label: 'WiFi 실측 100Mbps+',    desc: '업무용 속도 보장' },
  { icon: Monitor, label: '전용 데스크',             desc: '개인 업무 공간 필수' },
  { icon: VolumeX, label: '소음 레벨 기준',          desc: '집중 환경 검증' },
  { icon: MapPin,  label: '현장 방문 검증',           desc: '직접 확인 후 등록' },
]

export default function InfrastructurePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
          <span className="inline-block text-teal-300 text-xs font-bold tracking-widest uppercase mb-3 border border-teal-300/40 px-3 py-1 rounded-full">
            공간 인프라
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight whitespace-pre-line">
            {'Wakation이 검증한\n스테이·워크스페이스'}
          </h1>
        </div>
      </section>

      {/* ── Verification standards ── */}
      <section className="py-20 px-6 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-3">Verification</p>
            <h2 className="text-3xl font-black text-gray-900">Wakation 검증 기준 4가지</h2>
            <p className="text-gray-500 text-sm mt-3">모든 공간은 다음 기준을 통과해야 등록됩니다.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {VERIFY_CRITERIA.map(c => (
              <div key={c.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-6 h-6 text-teal-600" />
                </div>
                <p className="font-black text-gray-900 text-sm mb-1">{c.label}</p>
                <p className="text-gray-400 text-xs">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Space types grid ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-3">Space Types</p>
            <h2 className="text-3xl font-black text-gray-900">6가지 공간 유형</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPACE_TYPES.map(s => (
              <div key={s.title} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Stay Program ── */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">Airbnb Partner</p>
              <h2 className="text-3xl font-black text-white mb-5">파트너 스테이 프로그램</h2>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                발리·오사카·치앙마이 등 해외 에어비앤비 호스트와 협력하여 워케이션 특화 체류 패키지를 제공합니다.
                Wakation 검증을 통과한 호스트에게는 워케이션 전문 호스트 배지와 안정적인 장기 예약 연결을 지원합니다.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                {[
                  '발리 우붓·스미냑 파트너 호스트',
                  '오사카·도쿄 파트너 스테이',
                  '치앙마이 장기 체류 패키지',
                  '포르투갈·리스본 디지털 노마드 특화',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-white font-black text-lg mb-4">호스트 파트너 혜택</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                {[
                  '워케이션 전문 호스트 공식 배지',
                  '장기 체류 예약 안정적 연결',
                  'Wakation 플랫폼 노출 및 마케팅',
                  '체류자 피드백·운영 가이드 제공',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-teal-400 font-black">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Space inquiry CTA ── */}
      <section className="py-20 px-6 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">공간·숙소 입점 문의</h2>
          <p className="text-gray-500 text-sm mb-8">
            Wakation 검증 기준을 충족하는 공간이라면 누구나 파트너 신청이 가능합니다.
            담당자가 1영업일 이내 연락드립니다.
          </p>
          <a
            href="mailto:hello@wakation.kr?subject=공간·숙소 입점 문의"
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-all">
            공간·숙소 입점 문의하기
          </a>
        </div>
      </section>
    </div>
  )
}
