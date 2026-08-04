'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { localizeHref } from '@/lib/i18n/localePath'

// ─────────────────────────────────────────────────────────────────────────────
// 더 알아보기 — 홈 다이어트 v2 (2026-07-28)
// 이전 홈의 무거운 7개 섹션(GrowthEngines·Learning·Tools·DestinationFinder·비자AI·
// Sponsor·인프라)을 한 줄 링크 카드 그리드 하나로 압축. 기능·URL·페이지는 전부 유지 —
// 홈 노출만 축소(디렉티브 P1 원칙: 삭제 금지·전용 페이지로 연결).
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const LINKS: { href: string; label: L; desc: L }[] = [
  {
    href: '/tools/diagnosis',
    label: { KO: '나에게 맞는 워케이션 진단', EN: 'Workation self-check', JP: '自分に合う旅を診断' },
    // 2026-08-04 목적지 매핑 구현(diagnosis-destinations-v1)으로 카피 복원 — 이제 실기능
    desc: { KO: '3분 진단으로 목적지·프로그램 추천', EN: '3-minute destination & program match', JP: '3分で行き先とプログラム' },
  },
  {
    href: '/visa-ai',
    label: { KO: '비자·체류 AI', EN: 'Visa & stay AI', JP: 'ビザ・滞在AI' },
    desc: { KO: '국가별 비자·체류 조건 안내', EN: 'Visa rules by country', JP: '国別のビザ・滞在条件' },
  },
  {
    href: '/growth',
    label: { KO: '성장 캠프 · Learning', EN: 'Growth camp & learning', JP: '成長キャンプ · 学習' },
    desc: { KO: 'VOD·현장 실습·네트워킹', EN: 'VOD, workshops, networking', JP: 'VOD・実習・交流' },
  },
  {
    href: '/programs/support',
    label: { KO: '지자체 지원사업 20곳', EN: '20 gov-support programs', JP: '自治体支援20件' },
    desc: { KO: '숙박비 지원 한달살기까지', EN: 'Subsidized month-stays', JP: '宿泊費支援の1カ月暮らしも' },
  },
  {
    href: '/infrastructure',
    label: { KO: '공간 인프라', EN: 'Spaces & infrastructure', JP: '空間インフラ' },
    desc: { KO: '국내외 거점·코워킹 공간', EN: 'Bases and coworking spaces', JP: '国内外の拠点・コワーキング' },
  },
  {
    href: '/partnership',
    label: { KO: '파트너십 · 스폰서', EN: 'Partnership & sponsors', JP: 'パートナー · スポンサー' },
    desc: { KO: '지자체·공간·기업 제휴', EN: 'Gov, space & corporate ties', JP: '自治体・空間・企業提携' },
  },
  {
    href: '/business',
    label: { KO: '기업 워케이션 (B2B)', EN: 'Corporate workation (B2B)', JP: '企業ワーケーション' },
    desc: { KO: '팀 단위 프로그램 문의', EN: 'Team program inquiries', JP: 'チーム向けプログラム' },
  },
]

const UI: Record<string, L> = {
  eyebrow: { KO: 'More from Wakation', EN: 'More from Wakation', JP: 'More from Wakation' },
  title: { KO: '더 깊이 준비하고 싶다면', EN: 'Want to go deeper?', JP: 'もっと深く準備するなら' },
}

export function MoreExplore() {
  const { lang } = useLang()
  return (
    <section className="bg-[#f0f9ff] border-y border-[#dbeafe] py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-2">{UI.eyebrow[lang]}</p>
        <h2 className="text-xl md:text-2xl font-bold text-[#111827] leading-snug tracking-tight mb-6">{UI.title[lang]}</h2>
        <div data-ui-grid="compact" className="wak-card-grid grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-4">
          {LINKS.map((l) => {
            return (
              <Link
                key={l.href}
                href={localizeHref(l.href, lang)}
                data-ui-card="compact"
                className="wak-card-compact group flex min-h-20 items-center gap-3 border border-[#dbeafe] bg-white px-4 py-4 transition-all hover:border-[#93c5fd] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <span className="min-w-0">
                  <span className="wak-card-title block truncate text-[#111827]">{l.label[lang]}</span>
                  <span className="wak-caption mt-0.5 block truncate text-[#71818d]">{l.desc[lang]}</span>
                </span>
                <ArrowRight className="ml-auto w-3.5 h-3.5 text-[#cbd5e1] group-hover:text-brand-mid shrink-0 transition-colors" strokeWidth={ICON_STROKE} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
