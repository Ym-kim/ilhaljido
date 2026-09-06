import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BedDouble, BriefcaseBusiness, CalendarDays, MapPin, Search, Users } from 'lucide-react'

import { HomeSeasonalHeroMedia, type HomeHeroVariant } from '@/components/home/HomeSeasonalHeroMedia'
import { getStayPilotDateDefaults } from '@/lib/stays/pilotFlag'

const DESTINATIONS = [
  ['japan-fukuoka', '福冈'], ['japan-osaka', '大阪'], ['japan-tokyo', '东京'],
  ['korea-seoul', '首尔'], ['korea-busan', '釜山'], ['korea-jeju', '济州'],
] as const

export function ChineseHomePage({ heroVariant, chinaCampaignActive }: { heroVariant: HomeHeroVariant; chinaCampaignActive: boolean }) {
  const dates = getStayPilotDateDefaults()

  return (
    <main className="home-performance-surface bg-[#f7f4ee] text-[#102a36]">
      <section className="relative min-h-[50rem] overflow-hidden bg-[#04121f] text-white md:min-h-[46rem] lg:min-h-[52rem]">
        <HomeSeasonalHeroMedia alt="Wakation 的工作与旅行场景" lang="ZH" variant={heroVariant} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,18,31,.98)_0%,rgba(4,18,31,.93)_35%,rgba(4,18,31,.64)_54%,rgba(4,18,31,.16)_100%)] md:bg-[linear-gradient(90deg,rgba(4,18,31,.98)_0%,rgba(4,18,31,.94)_36%,rgba(4,18,31,.35)_64%,rgba(4,18,31,.08)_100%)]" />
        <div className="relative mx-auto flex min-h-[50rem] max-w-[86rem] items-center px-5 pb-16 pt-28 sm:px-8 md:min-h-[46rem] lg:min-h-[52rem]">
          <div className="w-full max-w-[41rem]">
            <p className="text-[0.68rem] font-black tracking-[0.2em] text-sky-300">STAY · WORK · TRAVEL</p>
            <h1 className="mt-5 max-w-2xl text-[clamp(2.65rem,6.3vw,5.4rem)] font-black leading-[1.02] tracking-[-0.055em]">工作与旅行，<br /><span className="text-sky-300">都按你的方式</span></h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white/76 sm:text-lg">从周末短住到一段更长的远程生活，用真实日期查住宿，再按城市与旅行目的继续规划。</p>

            <form action="/zh/select/hotel/pilot" method="get" className="mt-8 rounded-[1.5rem] border border-white/16 bg-[#061d2b]/86 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
              <input type="hidden" name="auto" value="1" />
              <input type="hidden" name="source" value="home_hero" />
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold text-white/68">目的地</span><span className="relative block"><MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300" /><select name="destination" defaultValue="japan-fukuoka" className="min-h-12 w-full rounded-xl border border-white/18 bg-white/10 pl-10 pr-4 text-sm font-bold text-white outline-none focus:border-sky-300">{DESTINATIONS.map(([id, label]) => <option key={id} value={id} className="text-[#102a36]">{label}</option>)}</select></span></label>
                <label><span className="mb-2 block text-xs font-bold text-white/68">入住日期</span><input type="date" name="checkin" required min={dates.today} defaultValue={dates.checkin} className="min-h-12 w-full rounded-xl border border-white/18 bg-white/10 px-3 text-sm font-semibold text-white [color-scheme:dark] focus:border-sky-300 focus:outline-none" /></label>
                <label><span className="mb-2 block text-xs font-bold text-white/68">退房日期</span><input type="date" name="checkout" required min={dates.checkin} defaultValue={dates.checkout} className="min-h-12 w-full rounded-xl border border-white/18 bg-white/10 px-3 text-sm font-semibold text-white [color-scheme:dark] focus:border-sky-300 focus:outline-none" /></label>
                <label><span className="mb-2 block text-xs font-bold text-white/68">成人</span><span className="relative block"><Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300" /><input type="number" name="adults" min="1" max="8" defaultValue="2" className="min-h-12 w-full rounded-xl border border-white/18 bg-white/10 pl-10 pr-3 text-sm font-semibold text-white focus:border-sky-300 focus:outline-none" /></span></label>
                <label><span className="mb-2 block text-xs font-bold text-white/68">儿童</span><input type="number" name="children" min="0" max="6" defaultValue="0" className="min-h-12 w-full rounded-xl border border-white/18 bg-white/10 px-3 text-sm font-semibold text-white focus:border-sky-300 focus:outline-none" /></label>
              </div>
              <button className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 text-sm font-black text-white transition hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"><Search className="h-4 w-4" />查找住宿</button>
              <p className="mt-3 text-[0.68rem] leading-5 text-white/48">住宿结果由合作伙伴提供。价格与条件请在预订页面最终确认。</p>
            </form>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.68rem] font-black tracking-[0.18em] text-[#087fa2]">START WITH WHAT YOU NEED</p>
          <h2 className="mt-3 max-w-3xl text-[clamp(2rem,5vw,3.7rem)] font-black leading-[1.08] tracking-[-0.045em]">旅行准备，从一个清晰的入口开始</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <Link href="/zh/select/hotel/pilot" className="group rounded-[1.75rem] bg-[#0a3548] p-7 text-white shadow-[0_18px_45px_rgba(7,43,58,.16)]"><BedDouble className="h-7 w-7 text-sky-300" /><h3 className="mt-8 text-2xl font-black">实时住宿搜索</h3><p className="mt-3 text-sm leading-7 text-white/65">输入日期与人数，比较当前可查的住宿。</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-sky-300">开始搜索 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>
            <Link href="/zh/select" className="group rounded-[1.75rem] border border-[#d9dfdc] bg-white p-7 shadow-[0_14px_40px_rgba(16,42,54,.07)]"><CalendarDays className="h-7 w-7 text-[#087fa2]" /><h3 className="mt-8 text-2xl font-black">整理旅行准备</h3><p className="mt-3 text-sm leading-7 text-[#5b7079]">把住宿、出行与当地体验放进同一份清单。</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#087fa2]">查看准备入口 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>
            <Link href="/zh/programs/china-market-research" className="group rounded-[1.75rem] border border-[#d9dfdc] bg-[#efe7d8] p-7 shadow-[0_14px_40px_rgba(16,42,54,.07)]"><BriefcaseBusiness className="h-7 w-7 text-[#a33b31]" /><p className="mt-8 text-[0.65rem] font-black tracking-[0.15em] text-[#a33b31]">OCTOBER · CHINA BUSINESS</p><h3 className="mt-2 text-2xl font-black">10月中国市场考察</h3><p className="mt-3 text-sm leading-7 text-[#5b6667]">比较义乌与广州的公开日程与调研目标。</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#8f342c]">{chinaCampaignActive ? '比较两条路线' : '查看已发布的信息'} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#e5eef0] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div><p className="text-[0.68rem] font-black tracking-[0.18em] text-[#087fa2]">WAKATION EDITORIAL</p><h2 className="mt-3 text-[clamp(2rem,5vw,3.6rem)] font-black leading-[1.08] tracking-[-0.045em]">不只给出链接，<br />也说清信息来源</h2><p className="mt-5 max-w-xl text-base leading-8 text-[#566b73]">Wakation 会区分合作伙伴提供的实时信息与自主整理的调研备注，不会补写未返回的房价、评分或服务。</p></div>
          <div className="relative min-h-72 overflow-hidden rounded-[2rem] bg-[#0a3548]"><Image src="/media/destinations/fukuoka-editorial-v1.webp" alt="福冈城市与停留场景" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /><span className="absolute inset-0 bg-gradient-to-t from-[#061f2d]/72 via-transparent to-transparent" /></div>
        </div>
      </section>
    </main>
  )
}
