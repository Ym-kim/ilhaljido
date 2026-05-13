import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { ProgramCard } from '@/components/programs/ProgramCard'
import type { Program } from '@/types/database'
import { Button } from '@/components/ui/button'
import {
  ClipboardList, Sparkles, Phone, Compass,
  Monitor, TrendingUp, Leaf, Users, ChevronDown,
} from 'lucide-react'

export default async function HomePage() {
  let featuredPrograms: Program[] | null = null
  let allPrograms: Program[] | null = null

  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any
    const [fp, ap] = await Promise.all([
      sb.from('programs').select('*').eq('is_featured', true).in('status', ['open', 'soon']).limit(3),
      sb.from('programs').select('*').in('status', ['open', 'soon']).order('date_start', { ascending: true }).limit(6),
    ])
    featuredPrograms = fp.data
    allPrograms = ap.data
  } catch {
    // Supabase 미설정 시 빈 상태로 렌더링
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=85')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/88 via-brand/60 to-dark/55" />

        <div className="relative z-10 px-6 lg:px-[6%] pt-20 pb-14 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            지금 신청 가능한 프로그램 6개
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tighter mb-5">
            일하고, 배우고,<br />
            <span className="text-emerald-300">여행까지 — 한 번에.</span>
          </h1>

          <p className="text-white/78 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
            1인 기업가·프리랜서를 위한 AI 워케이션 플랫폼.<br />
            업무 공간 + 성장 프로그램 + 로컬 힐링을<br />
            내 스타일에 맞게 조합하세요.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button asChild size="lg" className="bg-brand-mid hover:bg-brand shadow-[0_6px_24px_rgba(34,160,90,0.45)]">
              <Link href="/programs">프로그램 둘러보기</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white/60">
              <Link href="/apply">신청 접수하기</Link>
            </Button>
          </div>

          <div className="inline-flex divide-x divide-white/15 border border-white/15 rounded-2xl overflow-hidden bg-black/25 backdrop-blur-sm">
            {[
              { num: '6', label: '운영 프로그램' },
              { num: '3~5박', label: '체류 일정' },
              { num: '10~15인', label: '소규모 운영' },
              { num: 'AI', label: '맞춤 플랜' },
            ].map(({ num, label }) => (
              <div key={label} className="px-5 py-3 text-center">
                <div className="text-xl font-black text-white">{num}</div>
                <div className="text-xs text-white/50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-[10px] tracking-widest">
          <span>SCROLL</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="bg-cream py-24 px-6 lg:px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-2">HOW IT WORKS</p>
            <h2 className="text-3xl lg:text-4xl font-black text-dark tracking-tight">AI가 나만의 워케이션을 설계합니다</h2>
            <p className="text-muted mt-3">원하는 프로그램을 고르거나, 사전 진단을 받으면 최적 일정을 추천해 드립니다.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-2xl overflow-hidden shadow-sm">
            {[
              { step: '01', icon: <ClipboardList size={26} strokeWidth={1.5} />, title: '사전 진단 & 신청', desc: '업무 스타일, 관심 분야, 휴식 취향, 예산을 입력합니다. 5분이면 충분해요.' },
              { step: '02', icon: <Sparkles size={26} strokeWidth={1.5} />, title: 'AI 맞춤 플랜 수령', desc: 'AI가 최적 지역·업무 공간·프로그램을 분석해 개인 맞춤 제안서를 보내드립니다.' },
              { step: '03', icon: <Phone size={26} strokeWidth={1.5} />, title: '담당자 상담 & 확정', desc: '3일 내 담당자가 직접 연락하여 세부 일정과 준비사항을 안내합니다.' },
              { step: '04', icon: <Compass size={26} strokeWidth={1.5} />, title: '워케이션 출발!', desc: '일하고, 배우고, 쉬는 균형 잡힌 워케이션이 시작됩니다.' },
            ].map(({ step, icon, title, desc }, i) => (
              <div key={step} className={`bg-white p-7 ${i < 3 ? 'border-b lg:border-b-0 lg:border-r border-border' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-brand-pale text-brand flex items-center justify-center text-xs font-black mb-4">{step}</div>
                <div className="text-brand mb-3">{icon}</div>
                <h3 className="font-extrabold text-dark mb-2 text-sm">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROGRAMS ── */}
      {featuredPrograms && featuredPrograms.length > 0 && (
        <section className="bg-white py-24 px-6 lg:px-[6%]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-2">FEATURED</p>
                <h2 className="text-3xl font-black text-dark tracking-tight">추천 프로그램</h2>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link href="/programs">전체 보기 →</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPrograms.map(p => <ProgramCard key={p.id} program={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── EXPERIENCE STRIP ── */}
      <section className="relative h-[440px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85')" }}
        />
        <div className="absolute inset-0 bg-dark/70" />
        <div className="relative z-10 h-full flex items-center px-6 lg:px-[6%]">
          <div className="max-w-xl">
            <p className="text-emerald-400 text-xs font-black tracking-widest uppercase mb-4">WORKATION EXPERIENCE</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-4">
              단순 여행도 출장도 아닌,<br />균형 잡힌 새로운 방식
            </h2>
            <p className="text-white/75 leading-relaxed mb-7">
              일과 성장, 그리고 진짜 쉼을 하나의 경험으로.<br />
              돌아왔을 때 에너지와 성과를 동시에 얻습니다.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Monitor size={13} />, label: '업무 집중 공간' },
                { icon: <TrendingUp size={13} />, label: '점프업 성장캠프' },
                { icon: <Leaf size={13} />, label: '로컬 힐링' },
                { icon: <Users size={13} />, label: '소규모 네트워킹' },
              ].map(({ icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">
                  {icon} {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL PROGRAMS ── */}
      <section id="programs" className="bg-cream py-24 px-6 lg:px-[6%]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-2">PROGRAMS</p>
            <h2 className="text-3xl font-black text-dark tracking-tight">지금 신청 가능한 프로그램</h2>
            <p className="text-muted mt-2">1인 기업가·프리랜서의 성장과 힐링을 위해 설계된 워케이션 프로그램입니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {allPrograms?.map(p => <ProgramCard key={p.id} program={p} />)}
          </div>
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/programs">전체 프로그램 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── PHOTO MOSAIC ── */}
      <section className="bg-white py-24 px-6 lg:px-[6%]">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-2">DESTINATIONS</p>
          <h2 className="text-3xl font-black text-dark tracking-tight mb-2">워케이션은 어디서나 가능합니다</h2>
          <p className="text-muted mb-8">경기·강원·충청·경남부터 일본·동남아까지, 일할지도가 함께합니다.</p>

          <div className="grid grid-cols-3 grid-rows-2 gap-3 rounded-2xl overflow-hidden h-[520px]">
            <div className="row-span-2 relative overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/seed/gangwon-mtn/800/1040" alt="강원도" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white text-sm font-bold">강원 · 속초·춘천</span>
            </div>
            <div className="relative overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/seed/taean-shoreline/600/400" alt="충남 태안" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-bold">충남 · 태안</span>
            </div>
            <div className="relative overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/seed/gapyeong-lake/600/400" alt="경기 가평" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-bold">경기 · 가평</span>
            </div>
            <div className="relative overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/seed/japan-kyoto/600/400" alt="일본 오사카·교토" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-bold">일본 · 오사카·교토</span>
            </div>
            <div className="relative overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/seed/tongyeong-harbor/600/400" alt="경남 통영" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-bold">경남 · 통영</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-cream py-24 px-6 lg:px-[6%]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-2">FAQ</p>
            <h2 className="text-3xl font-black text-dark tracking-tight">자주 묻는 질문</h2>
          </div>
          <FaqList />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand py-20 px-6 text-center">
        <p className="text-emerald-300 text-xs font-black tracking-widest uppercase mb-3">GET STARTED</p>
        <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
          지금 바로 나만의<br />워케이션을 시작하세요
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          신청하시면 AI 맞춤 플랜과 함께<br />담당자가 3일 내 직접 연락드립니다.
        </p>
        <Button asChild size="xl" className="bg-white text-brand hover:bg-white/90 shadow-xl">
          <Link href="/apply">신청 접수하기 →</Link>
        </Button>
      </section>
    </main>
  )
}

function FaqList() {
  const faqs = [
    { q: '가격에 어떤 것들이 포함되나요?', a: '숙박비, 공유오피스/업무 공간 이용료, 프로그램 참가비, 일부 식사가 포함됩니다. 항공·교통비는 별도이며 상세 포함 내역은 담당자 안내 시 알려드립니다.' },
    { q: '혼자 참가해도 괜찮나요?', a: '네, 참가자 대부분이 혼자 오시는 1인 기업가·프리랜서분들입니다. 소규모(10~15명)로 운영되어 자연스럽게 친해지실 수 있습니다.' },
    { q: '워케이션 기간 중 업무는 어느 정도 해야 하나요?', a: '강제 업무 시간은 없습니다. 오전에 개인 업무 집중 시간이 제공되고, 오후부터는 프로그램과 자유 시간으로 구성됩니다.' },
    { q: '취소 또는 일정 변경이 가능한가요?', a: '출발 7일 전 취소 시 전액 환불됩니다. 7일 이내는 50% 환불이며, 다음 회차로 변경도 가능합니다.' },
    { q: '신청 후 결제는 언제 하나요?', a: '신청서 제출 → 담당자 상담 → 최종 확정 후 결제가 진행됩니다. 신청만으로 비용이 발생하지 않습니다.' },
    { q: '기업 단체 신청도 가능한가요?', a: '가능합니다. B2B 팀 워케이션은 일정·장소·프로그램을 맞춤 구성해 드립니다. 문의사항에 단체 신청 내용을 적어주세요.' },
  ]

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-white">
      {faqs.map((faq, i) => (
        <details key={i} className={`group ${i < faqs.length - 1 ? 'border-b border-border' : ''}`}>
          <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-cream font-bold text-dark text-sm transition-colors">
            {faq.q}
            <ChevronDown size={15} className="text-muted flex-shrink-0 ml-4 transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.a}</div>
        </details>
      ))}
    </div>
  )
}
