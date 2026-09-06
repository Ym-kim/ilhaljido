import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BedDouble, BriefcaseBusiness, CalendarCheck2, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: '旅行准备',
  description: '把住宿搜索、出行准备与中国市场考察信息放进一个清晰的 Wakation 入口。',
  alternates: { canonical: 'https://www.wakation.kr/zh/select', languages: { ko: 'https://www.wakation.kr/select', en: 'https://www.wakation.kr/en/select', ja: 'https://www.wakation.kr/ja/select', 'zh-CN': 'https://www.wakation.kr/zh/select', 'x-default': 'https://www.wakation.kr/select' } },
  robots: { index: true, follow: true },
}

const CARDS = [
  { href: '/zh/select/hotel', icon: BedDouble, eyebrow: 'STAY', title: '按城市查看住宿', body: '先了解六个城市的停留方向，再用真实日期查询当前房价。', tone: 'bg-[#0a3548] text-white' },
  { href: '/zh/select/hotel/pilot', icon: CalendarCheck2, eyebrow: 'LIVE SEARCH', title: '直接查询实时房价', body: '选择目的地、入住日期和人数，查看合作伙伴返回的真实结果。', tone: 'border border-[#d7dfde] bg-white text-[#102a36]' },
  { href: '/zh/programs/china-market-research', icon: BriefcaseBusiness, eyebrow: 'CHINA BUSINESS', title: '比较10月义乌与广州', body: '根据公开日期、调研目标与外部申请信息，判断哪条路线更适合。', tone: 'border border-[#d8ccb9] bg-[#efe7d8] text-[#102a36]' },
] as const

export default function ChineseSelectPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#102a36]">
      <section className="bg-[#071e2a] px-5 py-16 text-white sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl"><p className="text-[0.68rem] font-black tracking-[0.18em] text-sky-300">WAKATION SELECT</p><h1 className="mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] font-black leading-[1.04] tracking-[-0.05em]">把住宿、出行与当地体验，<br />放进同一份旅行准备清单</h1><p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">从最需要的一件事开始。我们会区分编辑信息与外部合作伙伴提供的实时结果。</p></div></section>
      <section className="px-5 py-14 sm:px-8 sm:py-20"><div className="mx-auto max-w-6xl"><div className="grid gap-5 lg:grid-cols-3">{CARDS.map(({ href, icon: Icon, eyebrow, title, body, tone }) => <Link key={href} href={href} className={`group flex min-h-[22rem] flex-col rounded-[2rem] p-7 shadow-[0_16px_45px_rgba(16,42,54,.08)] sm:p-9 ${tone}`}><Icon className="h-8 w-8 text-sky-400" /><p className="mt-10 text-[0.65rem] font-black tracking-[0.16em] opacity-65">{eyebrow}</p><h2 className="mt-3 text-2xl font-black leading-snug">{title}</h2><p className="mt-4 text-sm leading-7 opacity-70">{body}</p><span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black">查看详情 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div><aside className="mt-8 flex gap-3 rounded-[1.5rem] border border-[#c9dadd] bg-[#eaf4f5] p-5 text-sm leading-7 text-[#4d6670]"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#087fa2]" /><p>通过 Wakation 前往外部合作伙伴时，预订、付款、取消与退款以该合作伙伴的最终页面和条款为准。</p></aside></div></section>
    </main>
  )
}
