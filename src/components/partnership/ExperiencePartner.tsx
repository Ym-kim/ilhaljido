'use client'

import { ArrowRight, Gift, Package, QrCode, MonitorPlay, FileBarChart, CalendarCheck, HandHeart } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// Experience Partner — 체험형 스폰서십 파트너 유형 (파트너십 페이지 전용 섹션)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'WAKATION EXPERIENCE PARTNER', EN: 'WAKATION EXPERIENCE PARTNER', JP: 'WAKATION EXPERIENCE PARTNER' },
  title: { KO: '체험형 스폰서십 — 참가자의 하루에 브랜드를 담다', EN: 'Experience sponsorship — put your brand in a participant’s day', JP: '体験型スポンサーシップ — 参加者の一日にブランドを' },
  sub: {
    KO: '참가자가 프로그램 현장에서 제품·서비스를 실제로 체험하고, 브랜드는 현장 노출·콘텐츠·익명 피드백 리포트를 받습니다. 단순 배너 광고가 아닙니다.',
    EN: 'Participants try your product on site; your brand gets exposure, content and anonymous feedback reports. Not banner ads.',
    JP: '参加者が現場で製品・サービスを実際に体験し、ブランドは露出・コンテンツ・匿名フィードバックレポートを得ます。バナー広告ではありません。',
  },
  cats: {
    KO: '음료·커피·간식 / AI·업무도구 / eSIM·통신 / 노트북 액세서리 / 웰니스 / 보험·핀테크 / 짐 보관·이동',
    EN: 'Drinks · AI & work tools · eSIM · laptop accessories · wellness · insurance & fintech · luggage & mobility',
    JP: 'ドリンク / AI・業務ツール / eSIM / PCアクセサリー / ウェルネス / 保険・フィンテック / 荷物・移動',
  },
  cta: { KO: '스폰서십 문의하기', EN: 'Sponsorship inquiry', JP: 'スポンサーシップのお問い合わせ' },
}

const OFFERS: { icon: typeof Package; text: L }[] = [
  { icon: Package,      text: { KO: '제품 협찬 — 웰컴키트·현장 비치', EN: 'Product sponsorship — welcome kits & on-site placement', JP: '製品協賛 — ウェルカムキット・現場設置' } },
  { icon: HandHeart,    text: { KO: '참가자 현장 체험', EN: 'On-site participant trials', JP: '参加者の現場体験' } },
  { icon: QrCode,       text: { KO: 'QR 쿠폰 연계', EN: 'QR coupon integration', JP: 'QRクーポン連携' } },
  { icon: MonitorPlay,  text: { KO: '유튜브·콘텐츠 노출', EN: 'YouTube & content exposure', JP: 'YouTube・コンテンツ露出' } },
  { icon: FileBarChart, text: { KO: '참가자 익명 피드백 리포트', EN: 'Anonymous participant feedback report', JP: '参加者の匿名フィードバックレポート' } },
  { icon: CalendarCheck, text: { KO: '연간 파트너십', EN: 'Annual partnership', JP: '年間パートナーシップ' } },
]

// onInquire 를 주면 CTA가 같은 페이지의 문의 폼(#inquiry)으로 연결되고 해당 유형을 프리셋한다
// (2026-08-07 mailto → 폼 전환). 주지 않으면 기존 mailto 동작 유지.
export function ExperiencePartner({ onInquire }: { onInquire?: () => void } = {}) {
  const { lang } = useLang()

  return (
    <section id="experience-partner" className="py-20 px-6 bg-[#fffbeb] border-y border-amber-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="flex items-center justify-center gap-1.5 text-amber-600 text-xs font-black tracking-widest uppercase mb-4">
            <Gift className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            {COPY.eyebrow[lang]}
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-3">{COPY.title[lang]}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-2xl mx-auto">{COPY.sub[lang]}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {OFFERS.map((o) => {
            const Icon = o.icon
            return (
              <div key={o.text.KO} className="flex items-center gap-3.5 bg-white border border-amber-100 rounded-2xl p-5">
                <span className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={ICON_STROKE} />
                </span>
                <p className="text-[#334155] text-sm font-bold leading-snug">{o.text[lang]}</p>
              </div>
            )
          })}
        </div>

        <p className="text-center text-[#94a3b8] text-xs mb-8">{COPY.cats[lang]}</p>

        <div className="text-center">
          <a
            href={onInquire ? '#inquiry' : 'mailto:wakation.sf@gmail.com?subject=Wakation%20Experience%20Partner'}
            onClick={() => {
              try { track('sponsor_inquiry_clicked', { kind: 'partnership_page' }) } catch {}
              onInquire?.()
            }}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-black text-sm px-8 py-4 rounded-full transition-all"
          >
            {COPY.cta[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </a>
        </div>
      </div>
    </section>
  )
}
