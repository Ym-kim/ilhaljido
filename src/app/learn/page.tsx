'use client'

import Link from 'next/link'
import { BookOpen, Mic, Users, TrendingUp, ArrowRight, Mail } from 'lucide-react'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { PROGRAMS_LEARN_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { ICON_STROKE } from '@/lib/icons'

const PROGRAMS = [
  {
    icon: TrendingUp,
    ko: { title: '프리랜서 수익화 워크숍', desc: '1인 비즈니스를 지속 가능하게 만드는 수익 구조 설계. 실제 사례 기반의 집중 워크숍.', tag: '4시간', date: '준비중' },
    en: { title: 'Freelancer Monetization', desc: 'Revenue structure design for sustainable solo businesses. Intensive workshop based on real cases.', tag: '4 hrs', date: 'Coming Soon' },
    jp: { title: 'フリーランス収益化ワークショップ', desc: '個人ビジネスを持続可能にする収益構造の設計。実例ベースの集中ワークショップ。', tag: '4時間', date: '準備中' },
  },
  {
    icon: Mic,
    ko: { title: '브랜딩 & 퍼스널 마케팅', desc: '디지털 환경에서 나를 알리는 법. SNS·포트폴리오·콘텐츠 전략을 실전으로 배웁니다.', tag: '반일', date: '준비중' },
    en: { title: 'Branding & Personal Marketing', desc: 'How to build your presence online. Social media, portfolio, and content strategy in practice.', tag: 'Half-day', date: 'Coming Soon' },
    jp: { title: 'ブランディング＆パーソナルマーケ', desc: 'デジタル環境で自分を知らせる方法。SNS・ポートフォリオ・コンテンツ戦略を実践で学ぶ。', tag: '半日', date: '準備中' },
  },
  {
    icon: Users,
    ko: { title: '네트워킹 마스터클래스', desc: '의미 있는 인맥을 만들고 유지하는 방법. 워케이션 현장에서 활용 가능한 실전 스킬.', tag: '3시간', date: '준비중' },
    en: { title: 'Networking Masterclass', desc: 'Building and maintaining meaningful connections. Practical skills you can use at workation venues.', tag: '3 hrs', date: 'Coming Soon' },
    jp: { title: 'ネットワーキングマスタークラス', desc: '意味のある人脈を作り維持する方法。ワーケーション現場で使える実践スキル。', tag: '3時間', date: '準備中' },
  },
  {
    icon: BookOpen,
    ko: { title: '글로벌 진출 세미나', desc: '동남아·일본·미국 시장 진출 전략. 비자·세금·법인 설립까지 한 번에 정리합니다.', tag: '2시간', date: '준비중' },
    en: { title: 'Global Expansion Seminar', desc: 'Strategy for entering SE Asia, Japan, and US markets. Visa, tax, and company setup all in one.', tag: '2 hrs', date: 'Coming Soon' },
    jp: { title: 'グローバル進出セミナー', desc: '東南アジア・日本・米国への進出戦略。ビザ・税務・法人設立まで一気に整理。', tag: '2時間', date: '準備中' },
  },
]

export default function LearnPage() {
  const { lang, tr } = useLang()

  const pick = (item: typeof PROGRAMS[0]) =>
    lang === 'KO' ? item.ko : lang === 'EN' ? item.en : item.jp

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 inline" strokeWidth={ICON_STROKE} />
            {lang === 'KO' ? '강의 · 세미나' : lang === 'EN' ? 'Workshops & Seminars' : '講義・セミナー'}
          </SectionEyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            {lang === 'KO' ? '일하면서\n배우고 성장하다' : lang === 'EN' ? 'Learn While\nYou Work' : '働きながら\n学び、成長する'}
          </h1>
          <p className="text-lead-on-dark mt-4 max-w-xl">
            {lang === 'KO'
              ? '워케이션에 녹아든 강의와 세미나. 이동 중, 쉬는 틈, 네트워킹 자리에서 자연스럽게 배웁니다.'
              : lang === 'EN'
              ? 'Workshops embedded in your workation. Learn naturally during transitions, breaks, and networking moments.'
              : 'ワーケーションに溶け込んだ講義とセミナー。移動中、休憩中、ネットワーキングの場で自然に学びます。'}
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-3">
            {lang === 'KO' ? '예정 프로그램' : lang === 'EN' ? 'Upcoming Programs' : '予定プログラム'}
          </p>
          <h2 className="text-2xl font-black text-white mb-10">
            {lang === 'KO' ? '자기개발·성장 워크숍' : lang === 'EN' ? 'Growth Workshops' : '自己成長ワークショップ'}
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {PROGRAMS.map((p, i) => {
              const d = pick(p)
              const Icon = p.icon
              return (
                <div key={i} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-7 hover:border-teal-500/30 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-teal-400" strokeWidth={ICON_STROKE} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-teal-400/70 text-xs font-bold">{d.tag}</span>
                        <span className="text-white/30 text-xs">·</span>
                        <span className="text-white/30 text-xs">{d.date}</span>
                      </div>
                      <h3 className="text-white font-black text-lg leading-tight">{d.title}</h3>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{d.desc}</p>
                  <div className="mt-5">
                    <a
                      href="mailto:wakation.sf@gmail.com"
                      className="inline-flex items-center gap-1.5 text-teal-400 text-xs font-bold hover:text-teal-300 transition-colors"
                    >
                      {lang === 'KO' ? '사전 알림 신청' : lang === 'EN' ? 'Pre-register' : '事前登録'} <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-4">
            {lang === 'KO' ? '강사 / 파트너 모집' : lang === 'EN' ? 'Speaker & Partner Inquiry' : '講師・パートナー募集'}
          </p>
          <h2 className="text-2xl font-black text-white mb-4">
            {lang === 'KO' ? '함께 만들어 가요' : lang === 'EN' ? "Let's Build Together" : '一緒に作っていきましょう'}
          </h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            {lang === 'KO'
              ? '강의·워크숍 진행에 관심 있는 전문가나 팀을 찾습니다. 워케이션 참가자를 대상으로 함께 프로그램을 만들어봐요.'
              : lang === 'EN'
              ? 'Looking for experts and teams to run workshops. Let\'s co-create programs for workation participants.'
              : '講義・ワークショップ進行に関心のある専門家やチームを探しています。'}
          </p>
          <a
            href="mailto:wakation.sf@gmail.com?subject=강의·세미나 문의"
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-black px-8 py-4 rounded-full hover:bg-teal-400 transition-all"
          >
            <Mail className="w-4 h-4" strokeWidth={ICON_STROKE} />
            {lang === 'KO' ? '문의하기' : lang === 'EN' ? 'Get in Touch' : 'お問い合わせ'}
          </a>
        </div>
      </section>

      {/* 여행 준비 크로스셀 — Wakation Select */}
      <AffiliateSection
        eyebrow="Wakation Select"
        title={tr('prep_title')}
        subtitle={tr('prep_sub')}
        items={PROGRAMS_LEARN_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
      />
    </div>
  )
}
