'use client'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { trackEvent } from '@/lib/track'

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
  chips: { href: string; label: L }[]
}

const ROWS: DurationRow[] = [
  {
    key: '2n3d',
    label: { KO: '2박 3일', EN: '2–3 days', JP: '2泊3日' },
    hint: { KO: '주말만으로 충분한', EN: 'A weekend is enough', JP: '週末だけで十分' },
    chips: [
      { href: '/guide/jeju', label: { KO: '제주', EN: 'Jeju', JP: '済州' } },
      { href: '/guide/busan', label: { KO: '부산', EN: 'Busan', JP: '釜山' } },
      { href: '/guide/fukuoka', label: { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' } },
      { href: '/programs/domestic', label: { KO: '국내 워케이션', EN: 'Korea programs', JP: '韓国国内' } },
    ],
  },
  {
    key: '3n4d',
    label: { KO: '3박 4일', EN: '3–4 days', JP: '3泊4日' },
    hint: { KO: '연차 하루면 되는', EN: 'One day off is all it takes', JP: '有休1日あれば' },
    chips: [
      { href: '/guide/tokyo', label: { KO: '도쿄', EN: 'Tokyo', JP: '東京' } },
      { href: '/guide/osaka', label: { KO: '오사카', EN: 'Osaka', JP: '大阪' } },
      { href: '/collections/japan-onsen-reset', label: { KO: '온천 리셋', EN: 'Onsen reset', JP: '温泉リセット' } },
    ],
  },
  {
    key: '1w',
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
    label: { KO: '2주', EN: 'Two weeks', JP: '2週間' },
    hint: { KO: '현지 리듬이 생기는', EN: 'Long enough to find a rhythm', JP: '現地のリズムが生まれる' },
    chips: [
      { href: '/guide/bali', label: { KO: '발리', EN: 'Bali', JP: 'バリ' } },
      { href: '/guide/chiangmai', label: { KO: '치앙마이', EN: 'Chiang Mai', JP: 'チェンマイ' } },
    ],
  },
  {
    key: '1m',
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

export function DurationExplorer() {
  const { lang } = useLang()
  return (
    <section className="bg-[#f0f9ff] border-b border-[#dbeafe] py-14 md:py-20 px-4 sm:px-6">
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
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rounded-2xl bg-white border border-[#dbeafe] px-5 py-4"
            >
              <div className="sm:w-44 shrink-0">
                <span className="block font-black text-[#111827] text-lg leading-none">{row.label[lang]}</span>
                <span className="block text-[#94a3b8] text-xs mt-1">{row.hint[lang]}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {row.chips.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => trackEvent('duration_select', { duration: row.key, dest: c.label.KO })}
                    className="inline-flex items-center text-sm font-semibold px-4 py-2 rounded-full border border-[#dbeafe] bg-white text-[#475569] hover:border-brand-mid hover:text-brand-mid transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    {c.label[lang]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
