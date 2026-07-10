'use client'

import { ArrowRight, Gift } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// Wakation Experience Partner — 체험형 협찬·스폰서십 (배너 광고 아님)
// 구조: 참가자 체험 → 콘텐츠·현장 노출 → 익명 피드백 리포트
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'WAKATION EXPERIENCE PARTNER', EN: 'WAKATION EXPERIENCE PARTNER', JP: 'WAKATION EXPERIENCE PARTNER' },
  title: { KO: '브랜드가 참가자의 하루에 들어옵니다', EN: 'Your brand, inside a participant’s day', JP: 'ブランドが参加者の一日に入り込む' },
  sub: {
    KO: '참가자가 실제로 제품과 서비스를 체험하고, 브랜드는 현장 노출·콘텐츠·익명 피드백 리포트를 받을 수 있습니다. 단순 배너 광고가 아닌 체험형 파트너십입니다.',
    EN: 'Participants actually try your product; your brand gets on-site exposure, content and anonymous feedback reports. Not banner ads — experience partnerships.',
    JP: '参加者が実際に製品・サービスを体験し、ブランドは現場露出・コンテンツ・匿名フィードバックレポートを得られます。バナー広告ではなく体験型パートナーシップです。',
  },
  cta_sponsor: { KO: '협찬·스폰서십 문의', EN: 'Sponsorship inquiry', JP: '協賛・スポンサーのお問い合わせ' },
  cta_propose: { KO: '제품 체험 제안하기', EN: 'Propose a product trial', JP: '製品体験を提案する' },
}

const CATEGORIES: L[] = [
  { KO: '음료·커피·간식', EN: 'Drinks · coffee · snacks', JP: 'ドリンク・コーヒー・スナック' },
  { KO: 'AI·업무도구', EN: 'AI & work tools', JP: 'AI・業務ツール' },
  { KO: 'eSIM·통신', EN: 'eSIM & telecom', JP: 'eSIM・通信' },
  { KO: '노트북 액세서리', EN: 'Laptop accessories', JP: 'ノートPCアクセサリー' },
  { KO: '웰니스', EN: 'Wellness', JP: 'ウェルネス' },
  { KO: '보험·핀테크', EN: 'Insurance & fintech', JP: '保険・フィンテック' },
  { KO: '짐 보관·이동', EN: 'Luggage & mobility', JP: '荷物保管・移動' },
]

export function SponsorSection() {
  const { lang } = useLang()

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 border-t border-[#e0f2fe]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="flex items-center gap-1.5 text-amber-600 text-xs font-black tracking-widest uppercase mb-3">
            <Gift className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            {COPY.eyebrow[lang]}
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-2">{COPY.title[lang]}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-2xl">{COPY.sub[lang]}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <span key={c.KO} className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3.5 py-1.5 rounded-full">
              {c[lang]}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:wakation.sf@gmail.com?subject=Wakation%20Experience%20Partner"
            onClick={() => { try { track('sponsor_inquiry_clicked', { kind: 'sponsorship' }) } catch {} }}
            className="inline-flex items-center justify-center gap-2 bg-brand-mid hover:bg-sky-500 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all"
          >
            {COPY.cta_sponsor[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </a>
          <a
            href="mailto:wakation.sf@gmail.com?subject=Wakation%20Product%20Trial%20Proposal"
            onClick={() => { try { track('sponsor_inquiry_clicked', { kind: 'trial' }) } catch {} }}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f0f9ff] text-[#334155] font-bold text-sm px-6 py-3.5 rounded-2xl border border-[#dbeafe] transition-all"
          >
            {COPY.cta_propose[lang]}
          </a>
        </div>
      </div>
    </section>
  )
}
