'use client'

import Link from 'next/link'
import { ArrowRight, PlayCircle, MapPin, RefreshCw, Mail } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { NotifySignup } from '@/components/home/NotifySignup'
import { FEATURED_COURSES } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { trackAffiliateClick } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// Wakation Learning — VOD 사전학습 → 현장 실습 → 사후 학습 구조
// 파트너 확정 전이므로 '파트너 준비 중' 상태로 표기 (허위 연동 표현 금지)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'WAKATION LEARNING', EN: 'WAKATION LEARNING', JP: 'WAKATION LEARNING' },
  title: { KO: '워케이션 중 배우고, 현장에서 바로 적용하세요', EN: 'Learn during your workation, apply it on the spot', JP: 'ワーケーション中に学び、現場ですぐ活かす' },
  sub: {
    KO: 'Wakation은 VOD 교육 파트너와 연계해 떠나기 전 배우고, 현장에서 실습하고, 프로그램 이후에도 이어서 학습하는 구조를 만듭니다.',
    EN: 'With VOD education partners, you learn before you go, practice on site, and keep learning after the program ends.',
    JP: 'VOD教育パートナーと連携し、出発前に学び、現地で実習し、プログラム後も学び続ける構造をつくります。',
  },
  step1t: { KO: '사전 VOD 학습', EN: 'Pre-trip VOD', JP: '事前VOD学習' },
  step1d: { KO: '떠나기 전 온라인으로 기초를 다집니다', EN: 'Build the basics online before departure', JP: '出発前にオンラインで基礎を固める' },
  step2t: { KO: '현장 실습', EN: 'On-site practice', JP: '現地実習' },
  step2d: { KO: '워케이션 현장에서 배운 것을 바로 실행합니다', EN: 'Put it into practice during the workation', JP: 'ワーケーション現場ですぐ実行' },
  step3t: { KO: '사후 학습', EN: 'Post-trip learning', JP: '事後学習' },
  step3d: { KO: '프로그램이 끝나도 이어서 성장합니다', EN: 'Keep growing after the program ends', JP: 'プログラム後も継続して成長' },
  partner_badge: { KO: '교육 파트너 준비 중', EN: 'Education partners in prep', JP: '教育パートナー準備中' },
  cta_browse: { KO: '강의·학습 보기', EN: 'Browse courses', JP: '講座・学習を見る' },
  cta_partner: { KO: '교육 파트너 문의', EN: 'Education partner inquiry', JP: '教育パートナーのお問い合わせ' },
  notify_label: { KO: '다음 성장캠프가 열리면 알려드릴게요', EN: "We'll let you know when the next growth camp opens", JP: '次の成長キャンプ開催時にお知らせします' },
  courses_label: { KO: '지금 바로 들을 수 있는 강의', EN: 'Courses you can start right now', JP: '今すぐ受けられる講座' },
  courses_more: { KO: '전체 강의 보기', EN: 'See all courses', JP: 'すべての講座を見る' },
}

// 홈에 노출할 실강의 3선 (인프런 파트너스 실상품 — 가격 검증됨)
const HOME_COURSES = FEATURED_COURSES.filter((c) => c.status === 'active_affiliate').slice(0, 3)

const TOPICS: L[] = [
  { KO: 'AI 업무 자동화', EN: 'AI work automation', JP: 'AI業務自動化' },
  { KO: '마케팅·브랜딩', EN: 'Marketing & branding', JP: 'マーケティング・ブランディング' },
  { KO: '일본 진출', EN: 'Japan market entry', JP: '日本進出' },
  { KO: '글로벌 셀링', EN: 'Global selling', JP: 'グローバルセリング' },
  { KO: '시장조사', EN: 'Market research', JP: '市場調査' },
  { KO: '프리랜서 성장', EN: 'Freelancer growth', JP: 'フリーランス成長' },
]

const STEP_ICONS = [PlayCircle, MapPin, RefreshCw]

export function LearningSection() {
  const { lang } = useLang()

  return (
    <section id="wakation-learning" className="dark-surface bg-gradient-to-b from-[#04121f] to-[#0a1e33] py-16 md:py-20 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-sky-400 text-xs font-black tracking-widest uppercase mb-3">{COPY.eyebrow[lang]}</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{COPY.title[lang]}</h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-2xl">{COPY.sub[lang]}</p>
        </div>

        {/* 3단계 구조 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { t: COPY.step1t, d: COPY.step1d },
            { t: COPY.step2t, d: COPY.step2d },
            { t: COPY.step3t, d: COPY.step3d },
          ].map((s, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon className="w-5 h-5 text-sky-400" strokeWidth={ICON_STROKE} />
                  <span className="text-white/35 text-xs font-black">STEP {i + 1}</span>
                </div>
                <h3 className="text-white font-black text-sm mb-1">{s.t[lang]}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{s.d[lang]}</p>
              </div>
            )
          })}
        </div>

        {/* 학습 트랙 칩 */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {TOPICS.map((t) => (
            <span key={t.KO} className="bg-white/8 border border-white/15 text-white/75 text-xs font-bold px-3.5 py-1.5 rounded-full">
              {t[lang]}
            </span>
          ))}
          <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full">
            {COPY.partner_badge[lang]}
          </span>
        </div>

        {/* 지금 들을 수 있는 실강의 3선 — 세미나/강의 플랫폼처럼 실콘텐츠 노출 */}
        <div className="mb-10">
          <p className="text-white/70 text-[0.8125rem] font-bold mb-3.5">{COPY.courses_label[lang]}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {HOME_COURSES.map((raw) => {
              const c = localizeAffiliateItem(raw, lang)
              return (
                <a
                  key={c.id}
                  href={c.href}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  onClick={() => { try { trackAffiliateClick({ id: c.id, provider: '인프런', status: c.status, page: '/' }) } catch {} }}
                  className="group flex flex-col bg-white/[0.06] hover:bg-white/[0.1] border border-white/12 hover:border-sky-400/40 rounded-2xl p-4 transition-all duration-150"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg leading-none">{c.emoji}</span>
                    <span className="text-[0.6rem] font-black uppercase tracking-wide text-sky-300 bg-sky-400/15 px-2 py-0.5 rounded-full">{c.destination}</span>
                  </div>
                  <p className="text-white font-bold text-sm leading-snug mb-2 flex-1">{c.productTitle}</p>
                  <div className="flex items-center justify-between">
                    {c.priceFrom && <span className="text-amber-300 font-black text-sm">{c.priceFrom}</span>}
                    <span className="inline-flex items-center gap-1 text-sky-300 text-xs font-bold group-hover:gap-1.5 transition-all ml-auto">
                      {c.cta} <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
          <Link href="/select/learn" className="inline-flex items-center gap-1.5 text-white/55 hover:text-white text-xs font-bold mt-3.5 transition-colors">
            {COPY.courses_more[lang]} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link
            href="/select/learn"
            onClick={() => { try { track('learning_cta_clicked', { kind: 'browse' }) } catch {} }}
            className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all"
          >
            {COPY.cta_browse[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
          <a
            href="mailto:wakation.sf@gmail.com?subject=Wakation%20Learning%20Partner"
            onClick={() => { try { track('learning_cta_clicked', { kind: 'partner' }) } catch {} }}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-2xl border border-white/20 transition-all"
          >
            <Mail className="w-4 h-4" strokeWidth={ICON_STROKE} /> {COPY.cta_partner[lang]}
          </a>
        </div>

        {/* 다음 성장캠프 알림 */}
        <div className="max-w-xl">
          <p className="text-white/45 text-xs font-semibold mb-2.5">{COPY.notify_label[lang]}</p>
          <NotifySignup source="Learning 다음 성장캠프 알림" event="learning_cta_clicked" />
        </div>
      </div>
    </section>
  )
}
