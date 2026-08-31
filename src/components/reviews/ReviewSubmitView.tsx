'use client'
import { useState } from 'react'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { InquiryForm, type InquiryCategory } from '@/components/forms/InquiryForm'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 참가 후기 제출 폼 (2026-08-31) — /api/applications job_type='참가 후기' 로 저장,
// /admin 에서 동일 job_type 필터로 검수. 검수·동의 확인 후 lib/reviews.ts 에 등재.
// ─────────────────────────────────────────────────────────────────────────────

const JOB_TYPE = '참가 후기'

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'REAL VOICES', EN: 'REAL VOICES', JP: 'REAL VOICES' },
  title: { KO: '참가 후기를 남겨주세요', EN: 'Share your experience', JP: '参加レビューを残す' },
  desc: {
    KO: '남겨주신 후기는 운영자가 확인한 뒤, 게재 동의를 여쭙고 나서야 사이트에 소개됩니다. 원문 그대로 싣는 것이 원칙이에요.',
    EN: 'We review every submission and ask for your consent before publishing — always verbatim.',
    JP: 'いただいたレビューは運営が確認し、掲載同意を確認した上で原文のまま紹介します。',
  },
  formTitle: { KO: '후기 작성', EN: 'Write a review', JP: 'レビューを書く' },
}

const CATEGORIES: InquiryCategory[] = [
  { id: 'yangyang', label: { KO: '양양 워케이션', EN: 'Yangyang workation', JP: '襄陽ワーケーション' } },
  { id: 'hosted', label: { KO: 'Wakation 프로그램', EN: 'Wakation program', JP: 'Wakationプログラム' } },
  { id: 'stay', label: { KO: '호스트 스테이', EN: 'Host stay', JP: 'ホストステイ' } },
  { id: 'other', label: { KO: '기타', EN: 'Other', JP: 'その他' } },
]

export function ReviewSubmitView() {
  const { lang } = useLang()
  const [categoryId, setCategoryId] = useState('yangyang')
  return (
    <div className="min-h-screen bg-[#FAFAF8] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <SectionEyebrow>{COPY.eyebrow[lang]}</SectionEyebrow>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-900">{COPY.title[lang]}</h1>
        <p className="mt-3 text-sm leading-7 text-gray-500">{COPY.desc[lang]}</p>
        <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">{COPY.formTitle[lang]}</h2>
          <InquiryForm
            formId="review"
            jobType={JOB_TYPE}
            categories={CATEGORIES}
            categoryId={categoryId}
            onCategoryChange={setCategoryId}
            mailSubject="Wakation review"
            messageLabel={{ KO: '후기 내용', EN: 'Your review', JP: 'レビュー内容' }}
            messagePlaceholder={{
              KO: '어떠셨나요? 업무 환경, 좋았던 순간, 다음 참가자를 위한 팁 등을 자유롭게 남겨주세요.',
              EN: 'How was your stay? Work environment, favorite moments, tips for others…',
              JP: '滞在はいかがでしたか？仕事環境・良かった瞬間・次の参加者へのコツなど',
            }}
            doneDesc={{
              KO: '소중한 후기 감사합니다! 확인 후 게재 동의를 여쭙는 연락을 드릴게요.',
              EN: 'Thank you! We will reach out to confirm before publishing.',
              JP: 'ありがとうございます！掲載前に同意確認のご連絡をいたします。',
            }}
          />
        </div>
      </div>
    </div>
  )
}
