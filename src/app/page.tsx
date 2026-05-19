import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { ProgramCard } from '@/components/programs/ProgramCard'
import { ArrowRight, Search, Wifi, Star, Users, Building2, MapPin, CheckCircle, Zap, Globe, ChevronRight } from 'lucide-react'
import type { Program } from '@/types/database'

export default async function HomePage() {
  let allPrograms: Program[] | null = null
  try {
    const supabase = await createClient()
    const sb = supabase as any // eslint-disable-line
    const { data } = await sb.from('programs').select('*').in('status', ['open', 'soon']).order('date_start', { ascending: true }).limit(3)
    allPrograms = data
  } catch { /* Supabase not configured */ }

  return (
    <main className="overflow-hidden">

      {/* ─── ① HERO ─── */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#0A0F0D]">
        {/* BG */}
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=85" alt="" fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0D]/60 via-transparent to-[#0A0F0D]" />
        </div>

        <div className="relative z-10 px-6 lg:px-16 pt-28 pb-20">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-brand-mid/15 border border-brand-mid/30 text-brand-mid text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mid animate-pulse" />
            국내 1위 워케이션 플랫폼
          </div>

          <h1 className="text-[clamp(2.8rem,7vw,6.5rem)] font-black text-white leading-[1.02] tracking-[-0.04em] mb-6">
            일할지도,<br /><span className="text-brand-mid">떠날지도.</span>
          </h1>
          <p className="text-[17px] text-white/55 max-w-lg mb-10 leading-relaxed">
            AI가 나의 업무 스타일에 맞는 공간과 프로그램을 설계합니다.<br />
            전국 2,700+ 검증 공간, 지금 바로 찾아보세요.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl mb-14">
            <Link href="/programs" className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-xl hover:shadow-2xl transition-shadow">
              <Search size={18} className="text-muted flex-shrink-0" />
              <span className="flex-1 text-[14px] text-muted/60">지역, 공간 유형, 프로그램 검색…</span>
            </Link>
            <Link href="/programs"
              className="flex items-center justify-center gap-2 bg-brand-mid text-white font-bold text-[14px] px-6 py-4 rounded-2xl hover:bg-brand transition-colors whitespace-nowrap">
              AI 검색 <Zap size={14} />
            </Link>
          </div>

          {/* Floating region cards */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: '제주', img: 'https://picsum.photos/seed/jeju-ocean/80/80', cnt: '420+' },
              { label: '강원', img: 'https://picsum.photos/seed/gangwon-mtn/80/80', cnt: '380+' },
              { label: '여수', img: 'https://picsum.photos/seed/yeosu-sea/80/80', cnt: '210+' },
              { label: '부산', img: 'https://picsum.photos/seed/busan-city/80/80', cnt: '340+' },
            ].map(r => (
              <Link href="/programs" key={r.label}
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/18 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2.5 transition-all group">
                <div className="w-8 h-8 rounded-xl overflow-hidden relative flex-shrink-0">
                  <Image src={r.img} alt={r.label} fill className="object-cover" sizes="32px" />
                </div>
                <div>
                  <div className="text-white text-[13px] font-bold leading-tight">{r.label}</div>
                  <div className="text-white/45 text-[11px]">공간 {r.cnt}</div>
                </div>
                <ChevronRight size={13} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ② STATS BAR ─── */}
      <section className="bg-white border-b border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#E5E1DA]">
            {[
              { num: '2,700+', label: '검증된 워케이션 공간' },
              { num: '360만', label: '국내 프리랜서·1인 사업자' },
              { num: '4.8', label: '평균 만족도 (5점 만점)' },
              { num: '98%', label: '재방문 의향률' },
            ].map(s => (
              <div key={s.label} className="text-center px-6 py-2">
                <div className="text-[26px] font-black text-dark tracking-tight">{s.num}</div>
                <div className="text-[12px] text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ③ 추천 지역 ─── */}
      <section className="py-24 px-6 lg:px-16 bg-[#F9F7F3]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-3">DESTINATIONS</p>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] font-black text-dark tracking-tight">지금 뜨는 워케이션 지역</h2>
            <Link href="/programs" className="hidden sm:flex items-center gap-1.5 text-[13px] font-bold text-brand hover:text-brand-dark transition-colors">
              전체 보기 <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: '제주', sub: '바다 + 감성 카페', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', from: 'from-teal-900', to: 'to-teal-500', cnt: '420+' },
              { name: '강원', sub: '청정 자연 + 집중', img: 'https://picsum.photos/seed/gangwon-forest/600/750', from: 'from-emerald-900', to: 'to-emerald-500', cnt: '380+' },
              { name: '여수', sub: '야경 + 힐링', img: 'https://picsum.photos/seed/yeosu-harbor/600/750', from: 'from-violet-900', to: 'to-violet-500', cnt: '210+' },
              { name: '부산', sub: '도심 + 해변', img: 'https://picsum.photos/seed/busan-beach/600/750', from: 'from-orange-900', to: 'to-amber-500', cnt: '340+' },
            ].map(r => (
              <Link href="/programs" key={r.name}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer">
                <Image src={r.img} alt={r.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="25vw" />
                <div className={`absolute inset-0 bg-gradient-to-t ${r.from} via-transparent ${r.to} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white font-black text-[20px] tracking-tight">{r.name}</div>
                  <div className="text-white/65 text-[12px] mt-0.5">{r.sub}</div>
                  <div className="mt-3 inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-white text-[11px] font-bold">
                    <MapPin size={10} /> 공간 {r.cnt}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ④ FEATURES ─── */}
      <section className="py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-3">WHY ILHALJIDO</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] font-black text-dark tracking-tight mb-14">다른 플랫폼과 다른 이유</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Wifi size={22} strokeWidth={1.5} />,
                title: '업무 환경 직접 검증',
                desc: '인터넷 속도, 콘센트 수, 소음 레벨, 화상회의 환경까지. 실제 사용자 데이터로 검증된 공간만 등록됩니다.',
                tag: '검증 완료',
              },
              {
                icon: <Zap size={22} strokeWidth={1.5} />,
                title: 'AI 맞춤 추천',
                desc: '업무 스타일, 관심 분야, 예산, 일정을 입력하면 Claude AI가 나에게 딱 맞는 공간과 프로그램을 설계합니다.',
                tag: 'AI 기반',
              },
              {
                icon: <Users size={22} strokeWidth={1.5} />,
                title: '성장하는 커뮤니티',
                desc: '전국 1인 기업가·프리랜서 네트워크. 같은 공간에서 일하며 자연스럽게 만들어지는 콜라보와 커넥션.',
                tag: '2,700명+',
              },
            ].map(f => (
              <div key={f.title} className="bg-[#F9F7F3] rounded-3xl p-8 border border-[#E5E1DA] hover:border-brand/30 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-brand-pale text-brand flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <div className="inline-block text-[11px] font-bold text-brand-mid bg-brand-pale px-2.5 py-0.5 rounded-full mb-3">{f.tag}</div>
                <h3 className="text-[17px] font-black text-dark mb-3 tracking-tight">{f.title}</h3>
                <p className="text-[13px] text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ⑤ 검증 배너 ─── */}
      <section className="py-20 px-6 lg:px-16 bg-brand-pale border-y border-brand/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-lg">
              <p className="text-[11px] font-bold tracking-[0.2em] text-brand uppercase mb-3">VERIFICATION</p>
              <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-black text-dark tracking-tight mb-5">
                모든 공간은 7가지 기준으로<br />직접 검증됩니다
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {['인터넷 100Mbps+', '전용 업무 데스크', '화상회의 가능', '조용한 환경', '24시간 접근 가능', '커피·음료 제공', 'AI 업무 도구 연동'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-[13px] text-dark font-medium">
                    <CheckCircle size={14} className="text-brand-mid flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['공유오피스', '독채 스테이', '카페·코워킹', '리조트', '한옥·게스트하우스', '호텔', '농촌 체험관'].map(tag => (
                <span key={tag} className="bg-white border border-brand/20 text-brand font-bold text-[12px] px-3.5 py-2 rounded-full shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ⑥ 프로그램 ─── */}
      {allPrograms && allPrograms.length > 0 && (
        <section className="py-24 px-6 lg:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-3">PROGRAMS</p>
                <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] font-black text-dark tracking-tight">지금 신청 가능한 프로그램</h2>
              </div>
              <Link href="/programs" className="hidden sm:flex items-center gap-1.5 text-[13px] font-bold text-brand hover:text-brand-dark transition-colors">
                전체 보기 <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allPrograms.map(p => <ProgramCard key={p.id} program={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ─── ⑥ 기업 섹션 (다크) ─── */}
      <section className="py-24 px-6 lg:px-16 bg-[#0A0F0D]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            <div className="flex-1">
              <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-4">FOR BUSINESS</p>
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black text-white tracking-tight mb-5 leading-tight">
                팀 워케이션으로<br />생산성과 결속을<br /><span className="text-brand-mid">동시에.</span>
              </h2>
              <p className="text-white/50 text-[15px] leading-relaxed mb-8 max-w-md">
                기업 맞춤 팀 워케이션 프로그램. 일정·장소·콘텐츠를 모두 커스텀하고, 참가자 만족도 리포트를 자동으로 받아보세요.
              </p>
              <Link href="/apply"
                className="inline-flex items-center gap-2 bg-white text-dark font-bold text-[14px] px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors">
                기업 도입 문의 <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[
                { num: '87%', label: '업무 생산성 향상', sub: '참가 기업 평균' },
                { num: '3.2배', label: '팀 결속력 증가', sub: '워케이션 전후 비교' },
                { num: '92%', label: '재신청 의향', sub: '기업 담당자 응답' },
                { num: '48h', label: '평균 프로그램 기간', sub: '2박 3일 ~ 4박 5일' },
              ].map(s => (
                <div key={s.label} className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.08] transition-colors">
                  <div className="text-[28px] font-black text-white tracking-tight">{s.num}</div>
                  <div className="text-[13px] font-bold text-white/80 mt-1">{s.label}</div>
                  <div className="text-[11px] text-white/35 mt-1">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ⑦ 후기 ─── */}
      <section className="py-24 px-6 lg:px-16 bg-[#F9F7F3]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-mid uppercase mb-3">REVIEWS</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] font-black text-dark tracking-tight mb-12">실제 참가자 이야기</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: '김○○ 님',
                job: '온라인 셀러 · 속초 캠프',
                quote: '이렇게 집중해서 일한 게 몇 달 만인지. 오전에 일하고 오후에 AI 마케팅 배우고 저녁에 바다 보면서 맥주 한 잔. 이게 진짜 워케이션이더라고요.',
                stars: 5,
              },
              {
                name: '박○○ 님',
                job: '프리랜서 디자이너 · 제주 캠프',
                quote: '혼자 일하면서 번아웃이 왔었는데, 같은 처지의 프리랜서들이랑 3박 4일 보내고 오니까 에너지가 완전히 충전됐어요. 다음 달 또 신청했습니다.',
                stars: 5,
              },
              {
                name: '이○○ 님',
                job: '1인 기업가 · 강원 캠프',
                quote: 'AI 활용 캠프에서 업무 자동화 배운 거 하나로 월 20시간을 줄였어요. 프로그램 수준이 생각보다 훨씬 실무적입니다.',
                stars: 5,
              },
            ].map(r => (
              <div key={r.name} className="bg-white rounded-3xl p-7 border border-[#E5E1DA] hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-5">
                  {Array(r.stars).fill(0).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[14px] text-dark leading-relaxed mb-6 font-medium">
                  "{r.quote}"
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#E5E1DA]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-mid to-brand flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-[13px] font-black text-dark">{r.name}</div>
                    <div className="text-[11px] text-muted">{r.job}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ⑧ CTA ─── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-brand/85" />
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black text-white tracking-[-0.04em] leading-[1.05] mb-6">
            일할지도,<br />떠날지도.
          </h2>
          <p className="text-white/65 text-[16px] mb-10 leading-relaxed">
            AI가 나만의 워케이션을 설계합니다.<br />신청 후 3일 내 담당자가 직접 연락드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-dark font-black text-[15px] px-8 py-4 rounded-full hover:bg-white/90 transition-all shadow-xl hover:-translate-y-0.5">
              지금 신청하기 <ArrowRight size={16} />
            </Link>
            <Link href="/programs"
              className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-bold text-[15px] px-8 py-4 rounded-full hover:bg-white/20 transition-all">
              프로그램 보기
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ⑨ FOOTER PRE-LINKS ─── */}
      <section className="py-16 px-6 lg:px-16 bg-white border-t border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-mid to-brand flex items-center justify-center text-white text-xs font-black">일</span>
            <span className="font-black text-dark text-[16px] tracking-tight">일할지도</span>
          </div>
          <div className="flex flex-wrap gap-6 text-[13px] text-muted">
            <Link href="/programs" className="hover:text-dark transition-colors">프로그램</Link>
            <Link href="/apply" className="hover:text-dark transition-colors">신청하기</Link>
            <Link href="/admin" className="hover:text-dark transition-colors">관리자</Link>
            <a href="mailto:wakation@email.com" className="hover:text-dark transition-colors">wakation@email.com</a>
          </div>
          <p className="text-[12px] text-muted">© 2026 일할지도</p>
        </div>
      </section>

    </main>
  )
}
