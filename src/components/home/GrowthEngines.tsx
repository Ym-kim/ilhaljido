'use client'

import Link from 'next/link'
import { Compass, ShoppingBag, GraduationCap, Wrench, Clapperboard, Handshake, ArrowUpRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 6대 성장 엔진 — Hosted·Select·Learning·Tools·Media·Sponsor 사업축 오버뷰
// 카피는 이 파일에 인라인 (moments.ts 패턴) — 로드맵 변경 시 여기만 수정
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'WAKATION PLATFORM', EN: 'WAKATION PLATFORM', JP: 'WAKATION PLATFORM' },
  title: { KO: 'Wakation이 만드는 6가지 성장 엔진', EN: 'Six growth engines behind Wakation', JP: 'Wakationがつくる6つの成長エンジン' },
  sub: {
    KO: '단순한 워케이션 모집이 아니라, 일하는 사람의 체류·업무·성장·연결을 하나의 플랫폼으로 만듭니다.',
    EN: 'Not just workation sign-ups — one platform for how working people stay, work, learn and connect.',
    JP: '単なるワーケーション募集ではなく、働く人の滞在・仕事・成長・つながりをひとつのプラットフォームに。',
  },
}

const ENGINES: { id: string; icon: typeof Compass; href: string; name: L; desc: L; status?: L }[] = [
  {
    id: 'hosted', icon: Compass, href: '/programs',
    name: { KO: 'Wakation Hosted', EN: 'Wakation Hosted', JP: 'Wakation Hosted' },
    desc: { KO: '직접 기획·운영하는 공식 워케이션 — 국내·글로벌·성장캠프·시장조사단', EN: 'Official programs we plan and run — Korea, global, growth camps, market research', JP: '直接企画・運営する公式ワーケーション — 国内・グローバル・成長キャンプ' },
  },
  {
    id: 'select', icon: ShoppingBag, href: '/select',
    name: { KO: 'Wakation Select', EN: 'Wakation Select', JP: 'Wakation Select' },
    desc: { KO: '숙소·체험·항공·eSIM·비자 제휴 큐레이션 — 수요가 검증되면 직접 계약 상품으로 전환', EN: 'Curated partner stays, activities, flights, eSIM and visa help — proven categories graduate to direct deals', JP: '宿・体験・航空券・eSIM・ビザの提携キュレーション — 検証後は直接契約商品へ' },
  },
  {
    id: 'learning', icon: GraduationCap, href: '#wakation-learning',
    name: { KO: 'Wakation Learning', EN: 'Wakation Learning', JP: 'Wakation Learning' },
    desc: { KO: 'VOD 사전학습 + 현장 실습 + 사후 학습 — 프로그램에 결합된 학습 모듈', EN: 'Pre-trip VOD, on-site practice, post-trip follow-up — learning built into every program', JP: '事前VOD＋現地実習＋事後学習 — プログラムに組み込まれた学習モジュール' },
  },
  {
    id: 'tools', icon: Wrench, href: '#wakation-tools',
    name: { KO: 'Wakation Tools', EN: 'Wakation Tools', JP: 'Wakation Tools' },
    desc: { KO: '참가자 진단·실행계획·결과 리포트 웹프로그램 — 참가 기간 무료 Pro', EN: 'Diagnosis, action-plan and report tools for participants — free Pro during your program', JP: '参加者診断・実行計画・結果レポートのWebツール — 参加期間は無料Pro' },
    status: { KO: 'Beta 준비 중', EN: 'Beta in prep', JP: 'Beta準備中' },
  },
  {
    id: 'media', icon: Clapperboard, href: '#wakation-media',
    name: { KO: 'Wakation Media', EN: 'Wakation Media', JP: 'Wakation Media' },
    desc: { KO: '운영기·도시 가이드·참가자 성장 사례를 기록하는 콘텐츠 채널', EN: 'Field notes, city guides and participant stories as content', JP: '運営記・都市ガイド・参加者の成長事例を記録するコンテンツ' },
    status: { KO: '콘텐츠 준비 중', EN: 'Content in prep', JP: 'コンテンツ準備中' },
  },
  {
    id: 'sponsor', icon: Handshake, href: '/partnership#experience-partner',
    name: { KO: 'Wakation Sponsor', EN: 'Wakation Sponsor', JP: 'Wakation Sponsor' },
    desc: { KO: '참가자 체험 + 콘텐츠 + 피드백 리포트로 이어지는 체험형 파트너십', EN: 'Experience-based partnerships — product trials, content and feedback reports', JP: '参加者体験＋コンテンツ＋フィードバックレポートの体験型パートナーシップ' },
  },
]

export function GrowthEngines() {
  const { lang } = useLang()

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 border-b border-[#e0f2fe]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-3">{COPY.eyebrow[lang]}</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-2">{COPY.title[lang]}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-2xl">{COPY.sub[lang]}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ENGINES.map((e) => {
            const Icon = e.icon
            return (
              <Link
                key={e.id}
                href={e.href}
                className="group bg-white border border-[#dbeafe] rounded-2xl p-6 hover:border-[#7dd3fc] hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f9ff] border border-[#dbeafe] flex items-center justify-center text-brand-mid">
                    <Icon className="w-5 h-5" strokeWidth={ICON_STROKE} />
                  </div>
                  {e.status ? (
                    <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {e.status[lang]}
                    </span>
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-[#cbd5e1] group-hover:text-brand-mid transition-colors" strokeWidth={ICON_STROKE} />
                  )}
                </div>
                <h3 className="text-[#111827] font-black mb-1.5">{e.name[lang]}</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">{e.desc[lang]}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
