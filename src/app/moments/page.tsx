'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Camera } from 'lucide-react'
import { MOMENTS } from '@/lib/moments'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'

// Metadata export works in client components only as a workaround via a wrapper,
// but for client pages we skip it here and rely on layout.tsx title template.

function MomentCard({ moment }: { moment: (typeof MOMENTS)[number] }) {
  const { lang } = useLang()
  return (
    <Link
      href={`/select/hotel#${moment.anchor}`}
      className="group relative block rounded-3xl overflow-hidden aspect-[9/16] bg-[#1a1a1a]"
    >
      <img
        src={moment.photo}
        alt={moment.title[lang]}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white/60 text-[0.6875rem] font-bold uppercase tracking-wider mb-1">
          {moment.dest[lang]}
        </p>
        <h3 className="text-white font-black text-base leading-snug whitespace-pre-line mb-2">
          {moment.title[lang]}
        </h3>
        <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{moment.tip[lang]}</p>
        <div className="mt-3 flex items-center gap-1 text-teal-300 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          숙소 보기 <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
        </div>
      </div>
    </Link>
  )
}

export default function MomentsPage() {
  const { lang } = useLang()

  const ui = {
    eyebrow: { KO: 'Moments', EN: 'Moments', JP: 'Moments' },
    title: {
      KO: '워케이션,\n이런 순간들',
      EN: 'This is\nworkation',
      JP: 'ワーケーション、\nこんな瞬間',
    },
    desc: {
      KO: '에디터가 직접 고른 워케이션 하이라이트. 다음 여정의 힌트를 찾아보세요.',
      EN: 'Editor-curated workation highlights. Find the hint for your next trip.',
      JP: 'エディターが選んだワーケーションのハイライト。次の旅のヒントを。',
    },
    submitCta: {
      KO: '나의 순간 공유하기',
      EN: 'Share your moment',
      JP: '私の瞬間をシェア',
    },
    submitSub: {
      KO: '워케이션 중 인상 깊었던 순간을 알려주세요.',
      EN: 'Tell us about a memorable moment from your workation.',
      JP: 'ワーケーション中の印象的な瞬間を教えてください。',
    },
  } as const

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-3">
          {ui.eyebrow[lang]}
        </p>
        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight whitespace-pre-line mb-4">
          {ui.title[lang]}
        </h1>
        <p className="text-white/50 text-base max-w-xl">{ui.desc[lang]}</p>
      </section>

      {/* Moments grid — masonry-like via columns */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {MOMENTS.map((m) => (
            <div key={m.id} className="break-inside-avoid">
              <MomentCard moment={m} />
            </div>
          ))}
        </div>
      </section>

      {/* Submit CTA */}
      <section className="border-t border-white/10 py-14">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Camera className="w-6 h-6 text-white/70" strokeWidth={ICON_STROKE} />
            </div>
            <div>
              <h2 className="text-white font-black text-lg mb-1">{ui.submitCta[lang]}</h2>
              <p className="text-white/50 text-sm">{ui.submitSub[lang]}</p>
            </div>
          </div>
          <Link
            href="/moments/submit"
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-teal-400 transition-colors whitespace-nowrap shrink-0"
          >
            {ui.submitCta[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </section>
    </div>
  )
}
