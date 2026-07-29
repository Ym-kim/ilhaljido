'use client'
import Link from 'next/link'
import { Feather, Users, Laptop, Flame, Coffee, HeartHandshake, GraduationCap, CalendarDays } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'

// ─────────────────────────────────────────────────────────────────────────────
// 무드 탐색 — "지금 어떤 여행이 필요한가요?" (2026-07-28 라이프스타일 홈 개편)
// 목적지가 아니라 감정·상황으로 먼저 탐색 (Dayoff·TABIPPO 벤치: 탐색 1축=무드).
// 전 항목이 실존 라우트로 연결 — 가짜 필터 금지 룰 준수.
// 기존 홈 THEME 섹션(healing·networking·onsen 등)을 이 섹션이 흡수.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const MOODS: { icon: typeof Feather; href: string; label: L; desc: L }[] = [
  {
    icon: Feather, href: '/programs/healing',
    label: { KO: '혼자 조용히', EN: 'Solo & quiet', JP: 'ひとり静かに' },
    desc: { KO: '아무에게도 방해받지 않는 회복', EN: 'Recovery, uninterrupted', JP: '誰にも邪魔されない回復' },
  },
  {
    icon: Users, href: '/collections/osaka-friends?src=mood',
    label: { KO: '친구와 가볍게', EN: 'With a friend', JP: '友達と気軽に' },
    desc: { KO: '오사카 친구 여행 3박 4일', EN: 'Osaka with friends, 3N4D', JP: '大阪友達旅 3泊4日' },
  },
  {
    icon: Laptop, href: '/collections/bali-monthstay',
    label: { KO: '일하면서 오래', EN: 'Work & stay long', JP: '働きながら長く' },
    desc: { KO: '발리 한 달 머물기 세트', EN: 'A month in Bali, prepared', JP: 'バリひと月セット' },
  },
  {
    icon: Flame, href: '/programs/onsen',
    label: { KO: '온천에서 회복', EN: 'Onsen reset', JP: '温泉でリセット' },
    desc: { KO: '료칸과 노트북의 밸런스', EN: 'Ryokan-and-laptop balance', JP: '旅館とノートPCのバランス' },
  },
  {
    icon: Coffee, href: '/collections/fukuoka-3n4d?src=mood',
    label: { KO: '카페와 미식', EN: 'Cafés & food', JP: 'カフェとグルメ' },
    desc: { KO: '후쿠오카 3박 4일 — 카페와 온천', EN: 'Fukuoka 3N4D — cafés & onsen', JP: '福岡3泊4日 — カフェと温泉' },
  },
  {
    icon: HeartHandshake, href: '/programs/networking',
    label: { KO: '새로운 사람과', EN: 'Meet new people', JP: '新しい出会いを' },
    desc: { KO: '창업가·1인 워커 네트워킹', EN: 'Founders & solo workers', JP: '起業家・ソロワーカー交流' },
  },
  {
    icon: GraduationCap, href: '/select/learn',
    label: { KO: '배우며 성장', EN: 'Learn & grow', JP: '学びながら成長' },
    desc: { KO: '여행에 얹는 온라인 강의', EN: 'Courses that travel with you', JP: '旅に載せるオンライン講座' },
  },
  {
    icon: CalendarDays, href: '/collections/busan-weekend?src=mood',
    label: { KO: '주말에 짧게', EN: 'Just a weekend', JP: '週末にさくっと' },
    desc: { KO: '부산 주말 2박 3일', EN: 'Busan weekend, 2N3D', JP: '釜山週末 2泊3日' },
  },
]

const UI: Record<string, L> = {
  eyebrow: { KO: 'Find your trip', EN: 'Find your trip', JP: 'Find your trip' },
  title: { KO: '지금, 어떤 여행이 필요한가요?', EN: 'What kind of trip do you need right now?', JP: 'いま、どんな旅が必要ですか？' },
  sub: {
    KO: '목적지보다 먼저, 지금의 나에게서 시작하세요. 전부 실제 프로그램과 기획전으로 이어집니다.',
    EN: 'Start from where you are, not where to go — every card leads to a real program or collection.',
    JP: '行き先より先に、いまの自分から。すべて実際のプログラム・特集につながります。',
  },
}

export function MoodExplorer() {
  const { lang } = useLang()
  return (
    <section className="bg-white border-b border-[#dbeafe] py-14 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-10">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-2.5">{UI.eyebrow[lang]}</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-snug tracking-tight mb-2">{UI.title[lang]}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-lg">{UI.sub[lang]}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {MOODS.map((m) => {
            const Icon = m.icon
            return (
              <Link
                key={m.href + m.label.KO}
                href={m.href}
                onClick={() => trackEvent('travel_mood_select', { mood: m.label.KO })}
                className="group rounded-2xl border border-[#dbeafe] bg-white p-4 sm:p-5 hover:border-[#93c5fd] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-[#f0f9ff] text-brand-mid mb-3 group-hover:bg-brand-mid group-hover:text-white transition-colors">
                  <Icon className="w-4.5 h-4.5" strokeWidth={ICON_STROKE} />
                </span>
                <span className="block font-black text-[#111827] text-[0.9375rem] leading-snug">{m.label[lang]}</span>
                <span className="block text-[#64748b] text-xs mt-1 leading-relaxed">{m.desc[lang]}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
