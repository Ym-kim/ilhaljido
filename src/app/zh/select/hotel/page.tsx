import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'

import { getStayPilotDateDefaults } from '@/lib/stays/pilotFlag'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '按城市查看住宿',
  description: '从福冈、大阪、东京、首尔、釜山与济州开始，用真实日期查询当前住宿。',
  alternates: { canonical: 'https://www.wakation.kr/zh/select/hotel', languages: { ko: 'https://www.wakation.kr/select/hotel', en: 'https://www.wakation.kr/en/select/hotel', ja: 'https://www.wakation.kr/ja/select/hotel', 'zh-CN': 'https://www.wakation.kr/zh/select/hotel', 'x-default': 'https://www.wakation.kr/select/hotel' } },
  robots: { index: true, follow: true },
}

const CITIES = [
  { id: 'japan-fukuoka', city: '福冈', note: '从紧凑的城市动线与短住开始', image: '/media/destinations/fukuoka-editorial-v1.webp' },
  { id: 'japan-osaka', city: '大阪', note: '在交通便利的街区平衡工作与夜晚', image: '/media/destinations/osaka-editorial-v1.webp' },
  { id: 'japan-tokyo', city: '东京', note: '按通勤路线与街区节奏选择住处', image: '/media/destinations/tokyo-editorial-v1.webp' },
  { id: 'korea-busan', city: '釜山', note: '把海边时间与城市便利放在同一段停留里', image: '/media/destinations/busan-editorial-v1.webp' },
  { id: 'korea-jeju', city: '济州', note: '在自然、移动与独处工作之间找到节奏', image: '/media/destinations/jeju-editorial-v1.webp' },
  { id: 'korea-seoul', city: '首尔', note: '从高密度城市的工作、文化与夜生活出发', image: '/media/destinations/seoul-editorial-v1.webp' },
] as const

export default function ChineseHotelPage() {
  const dates = getStayPilotDateDefaults()
  const href = (destination: string) => `/zh/select/hotel/pilot?${new URLSearchParams({ destination, checkin: dates.checkin, checkout: dates.checkout, adults: '2', children: '0', auto: '1' }).toString()}`
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#102a36]">
      <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl"><p className="text-[0.68rem] font-black tracking-[0.18em] text-[#087fa2]">WAKATION STAY</p><h1 className="mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] font-black leading-[1.04] tracking-[-0.05em]">按城市查看住宿，<br />再用真实日期确认房价</h1><p className="mt-6 max-w-2xl text-base leading-8 text-[#5b7079] sm:text-lg">不先承诺某个价格。选择城市后，Wakation 会查询合作伙伴当前返回的住宿，并保留 Booking.com 作为后备搜索。</p></div></section>
      <section className="px-5 pb-16 sm:px-8 sm:pb-24"><div className="mx-auto max-w-6xl"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{CITIES.map((city) => <Link key={city.id} href={href(city.id)} className="group overflow-hidden rounded-[1.75rem] border border-[#d8e0df] bg-white shadow-[0_14px_38px_rgba(16,42,54,.07)]"><div className="relative aspect-[4/3] overflow-hidden bg-[#dce8e9]"><Image src={city.image} alt={`${city.city}城市与停留场景`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" /></div><div className="p-6"><h2 className="text-2xl font-black">{city.city}</h2><p className="mt-3 min-h-14 text-sm leading-7 text-[#5a6f77]">{city.note}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#087fa2]">查看当前住宿 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div></Link>)}</div><aside className="mt-8 flex gap-3 rounded-[1.5rem] border border-[#c9dadd] bg-[#eaf4f5] p-5 text-sm leading-7 text-[#4d6670]"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#087fa2]" /><p>Agoda 提供的住宿等级与住客评分会分开标示。税费、取消条款与最终价格请在预订页面确认。</p></aside></div></section>
    </main>
  )
}
