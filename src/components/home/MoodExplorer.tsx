'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { trackEvent } from '@/lib/track'
import { localizeHref } from '@/lib/i18n/localePath'

// ─────────────────────────────────────────────────────────────────────────────
// 무드 탐색 — "지금 어떤 여행이 필요한가요?" (2026-07-28 라이프스타일 홈 개편)
// 목적지가 아니라 감정·상황으로 먼저 탐색 (Dayoff·TABIPPO 벤치: 탐색 1축=무드).
// 전 항목이 실존 라우트로 연결 — 가짜 필터 금지 룰 준수.
// 기존 홈 THEME 섹션(healing·networking·onsen 등)을 이 섹션이 흡수.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const MOODS: { href: string; photo: string; label: L; desc: L }[] = [
  {
    href: '/programs/healing', photo: '/covers/dest-yufuin-real.jpeg',
    label: { KO: '혼자 조용히', EN: 'Solo & quiet', JP: 'ひとり静かに' },
    desc: { KO: '아무에게도 방해받지 않는 회복', EN: 'Recovery, uninterrupted', JP: '誰にも邪魔されない回復' },
  },
  {
    href: '/collections/osaka-friends?src=mood', photo: '/campaign/trip-sets/osaka-friends-editorial-v1.webp',
    label: { KO: '친구와 가볍게', EN: 'With a friend', JP: '友達と気軽に' },
    desc: { KO: '오사카 친구 여행 3박 4일', EN: 'Osaka with friends, 3N4D', JP: '大阪友達旅 3泊4日' },
  },
  {
    href: '/collections/bali-monthstay', photo: '/covers/stay-bali-city-real.jpeg',
    label: { KO: '일하면서 오래', EN: 'Work & stay long', JP: '働きながら長く' },
    desc: { KO: '발리 한 달 머물기 세트', EN: 'A month in Bali, prepared', JP: 'バリひと月セット' },
  },
  {
    href: '/programs/onsen', photo: '/covers/onsen-hero-real.jpeg',
    label: { KO: '온천에서 회복', EN: 'Onsen reset', JP: '温泉でリセット' },
    desc: { KO: '료칸과 노트북의 밸런스', EN: 'Ryokan-and-laptop balance', JP: '旅館とノートPCのバランス' },
  },
  {
    href: '/collections/fukuoka-3n4d?src=mood', photo: '/campaign/trip-sets/fukuoka-3n4d-editorial-model-g-v2.webp',
    label: { KO: '카페와 미식', EN: 'Cafés & food', JP: 'カフェとグルメ' },
    desc: { KO: '후쿠오카 3박 4일 — 카페와 온천', EN: 'Fukuoka 3N4D — cafés & onsen', JP: '福岡3泊4日 — カフェと温泉' },
  },
  {
    href: '/programs/networking', photo: '/covers/activity-curated-real-v2.jpeg',
    label: { KO: '새로운 사람과', EN: 'Meet new people', JP: '新しい出会いを' },
    desc: { KO: '창업가·1인 워커 네트워킹', EN: 'Founders & solo workers', JP: '起業家・ソロワーカー交流' },
  },
  {
    href: '/select/learn', photo: '/covers/course-notion-photo-v2.webp',
    label: { KO: '배우며 성장', EN: 'Learn & grow', JP: '学びながら成長' },
    desc: { KO: '여행에 얹는 온라인 강의', EN: 'Courses that travel with you', JP: '旅に載せるオンライン講座' },
  },
  {
    href: '/collections/busan-weekend?src=mood', photo: '/campaign/trip-sets/busan-weekend-editorial-v1.webp',
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

export function MoodExplorer({ forceLang }: { forceLang?: Lang } = {}) {
  const { lang: ctxLang } = useLang()
  const lang = forceLang ?? ctxLang
  return (
    <section className="bg-white border-b border-[#dbeafe] py-14 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-10">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-2.5">{UI.eyebrow[lang]}</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-snug tracking-tight mb-2">{UI.title[lang]}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-lg">{UI.sub[lang]}</p>
        </div>
        <div data-ui-grid="editorial" className="grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:grid-cols-4">
          {MOODS.map((m, index) => {
            return (
              <Link
                key={m.href + m.label.KO}
                href={localizeHref(m.href, lang)}
                onClick={() => trackEvent('travel_mood_select', { mood: m.label.KO })}
                data-ui-card="editorial"
                className={`wak-card-editorial group relative overflow-hidden border border-black/5 bg-[#0b1b25] shadow-[0_8px_24px_rgba(8,32,48,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(8,32,48,0.16)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${index === 0 ? 'col-span-2 row-span-2' : 'row-span-1'}`}
              >
                <Image
                  src={m.photo}
                  alt=""
                  fill
                  sizes={index === 0
                    ? '(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 50vw, 568px'
                    : '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px'}
                  quality={78}
                  unoptimized={m.photo.endsWith('.webp')}
                  className="object-cover saturate-[1.04] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.04] group-hover:saturate-[1.1]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#061722]/90 via-[#061722]/12 to-black/0" />
                <span className={`absolute inset-x-0 bottom-0 p-4 sm:p-5 ${index === 0 ? 'md:p-7' : ''}`}>
                  <span className={`wak-card-title block text-white ${index === 0 ? 'text-xl sm:text-2xl' : ''}`}>{m.label[lang]}</span>
                  <span className={`wak-caption mt-1 block text-white/82 ${index === 0 ? 'max-w-sm sm:text-sm' : ''}`}>{m.desc[lang]}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
