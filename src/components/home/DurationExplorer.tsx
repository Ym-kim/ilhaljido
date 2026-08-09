'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { trackEvent } from '@/lib/track'
import { localizeHref } from '@/lib/i18n/localePath'

// ─────────────────────────────────────────────────────────────────────────────
// 기간 탐색 — "쓸 수 있는 날짜"로 여행을 고른다 (2026-07-28 라이프스타일 홈 개편)
// 고객은 상품 유형이 아니라 확보 가능한 휴가 길이로 생각한다는 가설(디렉티브 §8-3).
// 각 기간의 목적지 칩은 전부 실존 페이지(가이드·기획전·지원사업·아티클) — 가짜 필터 금지.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

type DurationRow = {
  key: string
  label: L
  hint: L
  photo: string
  chips: { href: string; label: L }[]
}

const ROWS: DurationRow[] = [
  {
    key: '2n3d',
    photo: '/campaign/trip-sets/busan-weekend-editorial-v1.webp',
    label: { KO: '2박 3일', EN: '2–3 days', JP: '2泊3日' },
    hint: { KO: '주말만으로 충분한', EN: 'A weekend is enough', JP: '週末だけで十分' },
    chips: [
      { href: '/collections/busan-weekend?src=duration', label: { KO: '부산 주말 세트', EN: 'Busan weekend set', JP: '釜山週末セット' } },
      { href: '/guide/jeju', label: { KO: '제주', EN: 'Jeju', JP: '済州' } },
      { href: '/programs/domestic', label: { KO: '국내 워케이션', EN: 'Korea programs', JP: '韓国国内' } },
    ],
  },
  {
    key: '3n4d',
    photo: '/campaign/trip-sets/fukuoka-3n4d-editorial-v1.webp',
    label: { KO: '3박 4일', EN: '3–4 days', JP: '3泊4日' },
    hint: { KO: '연차 하루면 되는', EN: 'One day off is all it takes', JP: '有休1日あれば' },
    chips: [
      { href: '/collections/fukuoka-3n4d?src=duration', label: { KO: '후쿠오카 세트', EN: 'Fukuoka set', JP: '福岡セット' } },
      { href: '/collections/osaka-friends?src=duration', label: { KO: '오사카 친구 세트', EN: 'Osaka friends set', JP: '大阪友達セット' } },
      { href: '/collections/seoul-3n4d?src=duration', label: { KO: '서울 세트', EN: 'Seoul set', JP: 'ソウルセット' } },
      { href: '/collections/tokyo-allinone?src=duration', label: { KO: '도쿄 세트', EN: 'Tokyo set', JP: '東京セット' } },
    ],
  },
  {
    key: '1w',
    photo: '/media/destinations/danang-editorial-v1.webp',
    label: { KO: '일주일', EN: 'One week', JP: '1週間' },
    hint: { KO: '일과 여행이 섞이기 시작하는', EN: 'Where work starts blending in', JP: '仕事と旅が混ざり始める' },
    chips: [
      { href: '/guide/danang', label: { KO: '다낭', EN: 'Da Nang', JP: 'ダナン' } },
      { href: '/guide/cebu', label: { KO: '세부', EN: 'Cebu', JP: 'セブ' } },
      { href: '/collections/taipei-workation', label: { KO: '타이베이', EN: 'Taipei', JP: '台北' } },
    ],
  },
  {
    key: '2w',
    photo: '/media/destinations/chiangmai-editorial-v1.webp',
    label: { KO: '2주', EN: 'Two weeks', JP: '2週間' },
    hint: { KO: '현지 리듬이 생기는', EN: 'Long enough to find a rhythm', JP: '現地のリズムが生まれる' },
    chips: [
      { href: '/collections/chiangmai-nomad?src=duration', label: { KO: '치앙마이 2주 세트', EN: 'Chiang Mai 2-week set', JP: 'チェンマイ2週間セット' } },
      { href: '/guide/bali', label: { KO: '발리', EN: 'Bali', JP: 'バリ' } },
    ],
  },
  {
    key: '1m',
    photo: '/media/destinations/bali-editorial-v1.webp',
    label: { KO: '한 달', EN: 'A month', JP: 'ひと月' },
    hint: { KO: '살아보기가 되는', EN: 'When a trip becomes living', JP: '暮らすような旅になる' },
    chips: [
      { href: '/programs/support', label: { KO: '지자체 한달 지원 20곳', EN: '20 gov-support programs', JP: '自治体1カ月支援20件' } },
      { href: '/collections/bali-monthstay', label: { KO: '발리 한 달', EN: 'A month in Bali', JP: 'バリでひと月' } },
      { href: '/cruise/serena', label: { KO: '바다 위 한 달', EN: 'A month at sea', JP: '海の上でひと月' } },
    ],
  },
]

const UI: Record<string, L> = {
  eyebrow: { KO: 'By duration', EN: 'By duration', JP: 'By duration' },
  title: { KO: '며칠 낼 수 있으세요?', EN: 'How many days can you take?', JP: '何日つくれますか？' },
  sub: {
    KO: '가진 날짜에서 시작하는 가장 현실적인 계획 — 기간별로 검증된 목적지를 이어드립니다.',
    EN: 'The most realistic way to plan — verified destinations matched to the days you have.',
    JP: '使える日数から始めるいちばん現実的な計画。期間ごとに検証済みの行き先へ。',
  },
}

export function DurationExplorer({ forceLang }: { forceLang?: Lang } = {}) {
  const { lang: ctxLang } = useLang()
  const lang = forceLang ?? ctxLang
  return (
    <section className="bg-[#f4efe7] border-b border-[#e7ded0] py-14 md:py-20 px-4 sm:px-6" data-seasonal-surface="late-summer-2026">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-10">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-2.5">{UI.eyebrow[lang]}</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-snug tracking-tight mb-2">{UI.title[lang]}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-lg">{UI.sub[lang]}</p>
        </div>
        <div className="space-y-3">
          {ROWS.map((row) => (
            <div
              key={row.key}
              className="group flex gap-4 overflow-hidden rounded-[1.35rem] border border-[#e1d8ca] bg-[#fffdf9] p-3 shadow-[0_5px_18px_rgba(64,45,27,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(64,45,27,0.10)] sm:items-center sm:gap-6 sm:p-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-36">
                <Image
                  src={row.photo}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 96px, 144px"
                  unoptimized={row.photo.endsWith('.webp')}
                  className="object-cover saturate-[1.04] contrast-[1.04] transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-6">
                <div className="mb-3 shrink-0 sm:mb-0 sm:w-40">
                <span className="block font-black text-[#111827] text-lg leading-none">{row.label[lang]}</span>
                  <span className="block text-[#7c8d94] text-xs mt-1 leading-relaxed">{row.hint[lang]}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {row.chips.map((c) => (
                  <Link
                    key={c.href}
                    href={localizeHref(c.href, lang)}
                    onClick={() => trackEvent('duration_select', { duration: row.key, dest: c.label.KO })}
                    className="inline-flex items-center rounded-full border border-[#d6e2e3] bg-[#f9fbfb] px-3 py-1.5 text-xs font-semibold text-[#475d66] transition-colors hover:border-brand-mid hover:bg-white hover:text-brand-mid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {c.label[lang]}
                  </Link>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
