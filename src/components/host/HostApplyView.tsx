'use client'

import { useEffect, useState } from 'react'
import { Home, Link2, Search, Globe2, ShieldCheck, MessageCircle } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { InquiryForm, type InquiryCategory } from '@/components/forms/InquiryForm'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 호스트 온보딩 P0 (2026-08-13) — 모집 랜딩 + 등록 폼
//
// 설계 원칙:
// - 판매자 입장에서 쉽게: 핵심 입력은 "에어비앤비 리스팅 URL 붙여넣기" 하나.
//   상세 정보는 리스팅에서 우리가 확인한다(호스트에게 다시 묻지 않는 것이 자동화의 시작).
// - 법적 가드레일: 예약·결제는 호스트의 기존 채널(에어비앤비 등)에서 그대로 —
//   Wakation은 계약의 대리·매개·취차를 하지 않는다(일본 주택숙박중개업 등록 대상 행위 제외,
//   한국 전자상거래법 통신판매중개 비해당 유지. 근거: mlit.go.jp 民泊制度ポータル·law.go.kr,
//   2026-08-13 원문 확인).
// - 정직성: 트래픽·수익 보장, 비용 조건 등 미확정 사항은 카피에 넣지 않는다.
// - 저장: /api/applications job_type='호스트 등록' → /admin '호스트 등록' 필터에서 구분 확인.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const JOB_TYPE = '호스트 등록'

const C: Record<string, L> = {
  eyebrow: { KO: 'BECOME A HOST', EN: 'BECOME A HOST', JP: 'BECOME A HOST' },
  heroTitle1: { KO: '당신의 숙소를,', EN: 'Put your stay in front of', JP: 'あなたの宿を、' },
  heroTitle2: { KO: '일하는 여행자에게', EN: 'working travelers', JP: '働く旅行者へ' },
  heroLead: {
    KO: '에어비앤비에서 활동 중인 호스트님, 리스팅 링크 하나만 남겨주세요. 검토 후 Wakation에 워케이션 관점의 개별 소개 페이지를 만들어 드립니다. 예약은 지금 쓰시는 채널 그대로입니다.',
    EN: 'Already hosting on Airbnb? Just paste your listing link. After review, we build a dedicated workation-angle page for your stay on Wakation — bookings stay on the channel you already use.',
    JP: 'エアビーアンドビーで活動中のホストの方へ。リスティングのリンクをひとつ残してください。審査後、Wakationにワーケーション視点の個別紹介ページを作成します。予約は今お使いのチャネルのままです。',
  },
  pilotNote: {
    KO: '현재 발리·오사카 숙소를 우선 모집하고 있습니다 — 다른 도시도 접수는 받습니다.',
    EN: 'We are prioritizing stays in Bali and Osaka right now — other cities are welcome to apply too.',
    JP: '現在はバリ・大阪の宿を優先募集しています — 他の都市の受付も可能です。',
  },
  whyTitle: { KO: '왜 Wakation인가', EN: 'Why Wakation', JP: 'なぜWakationか' },
  why1T: { KO: '일하는 여행자에게 정확히 도달', EN: 'Reach exactly the right guests', JP: '働く旅行者に正確に届く' },
  why1D: {
    KO: 'Wakation의 방문자는 업무 공간·와이파이·장기 체류를 기준으로 숙소를 고르는 사람들입니다. 숙소의 워케이션 강점이 일반 여행 플랫폼보다 제대로 보입니다.',
    EN: "Wakation's visitors choose stays by workspace, Wi-Fi and longer-stay fit. Your stay's workation strengths show up here better than on general travel platforms.",
    JP: 'Wakationの訪問者は、ワークスペース・Wi-Fi・長期滞在を基準に宿を選ぶ人たちです。宿のワーケーション面での強みが、一般的な旅行プラットフォームよりも正しく伝わります。',
  },
  why2T: { KO: '개별 소개 페이지 + 3개 언어', EN: 'A dedicated page, in three languages', JP: '個別紹介ページ＋3言語' },
  why2D: {
    KO: '숙소마다 한국어·영어·일본어 개별 페이지를 만들어 검색엔진에 노출합니다. 페이지의 예약 버튼은 호스트님의 기존 리스팅으로 연결됩니다.',
    EN: 'Each stay gets its own page in Korean, English and Japanese, indexed by search engines. The booking button links straight to your existing listing.',
    JP: '宿ごとに韓国語・英語・日本語の個別ページを作成し、検索エンジンに露出します。ページの予約ボタンはホストの既存リスティングにつながります。',
  },
  why3T: { KO: '예약·정산 방식은 그대로', EN: 'Your booking flow stays the same', JP: '予約・精算方式はそのまま' },
  why3D: {
    KO: 'Wakation은 예약 주체가 아닙니다. 예약·결제·환불은 지금 쓰시는 에어비앤비 등 채널에서 그대로 진행되고, 저희는 소개와 연결만 합니다.',
    EN: 'Wakation is not the booking party. Reservations, payments and refunds continue on your current channel (Airbnb, etc.) — we introduce and connect, nothing more.',
    JP: 'Wakationは予約主体ではありません。予約・決済・返金は今お使いのエアビーアンドビーなどのチャネルでそのまま行われ、私たちは紹介と連結のみを行います。',
  },
  stepsTitle: { KO: '등록은 3단계로 끝납니다', EN: 'Three steps, and you are done', JP: '登録は3ステップで完了' },
  step1T: { KO: '리스팅 링크 제출', EN: 'Submit your listing link', JP: 'リスティングのリンクを提出' },
  step1D: {
    KO: '아래 폼에 에어비앤비 리스팅 URL과 연락처만 남기면 끝 — 긴 설명은 쓰지 않으셔도 됩니다. 상세 정보는 리스팅에서 저희가 확인합니다.',
    EN: "Paste your Airbnb listing URL and a way to reach you — no long write-up needed. We'll pull the details from the listing itself.",
    JP: '下のフォームにエアビーアンドビーのリスティングURLと連絡先を残すだけ — 長い説明は不要です。詳細はリスティングから私たちが確認します。',
  },
  step2T: { KO: 'Wakation이 검토·연락', EN: 'We review and reach out', JP: 'Wakationが審査・連絡' },
  step2D: {
    KO: '워케이션 적합성(업무 공간·와이파이·체류 편의)을 검토하고, 필요한 사진·정보를 이메일로 요청드립니다.',
    EN: 'We review the workation fit (workspace, Wi-Fi, stay comfort) and email you for any photos or details we need.',
    JP: 'ワーケーション適合性（ワークスペース・Wi-Fi・滞在の快適さ）を審査し、必要な写真・情報をメールでお願いします。',
  },
  step3T: { KO: '개별 페이지 공개', EN: 'Your page goes live', JP: '個別ページを公開' },
  step3D: {
    KO: '검증된 정보만으로 소개 페이지를 만들어 공개합니다. 게재 전 호스트님이 내용을 최종 확인합니다.',
    EN: 'We build the page from verified information only and publish it — you approve the content before it goes live.',
    JP: '検証済みの情報だけで紹介ページを作成し公開します。掲載前にホストが内容を最終確認します。',
  },
  trustTitle: { KO: '함께 지키는 기준', EN: 'Standards we keep together', JP: '一緒に守る基準' },
  trust1: {
    KO: '숙소는 현지 법령에 따른 등록·신고를 마친 상태여야 합니다(예: 일본 민박 신고번호). 확인이 어려우면 검토 단계에서 함께 확인해 드립니다.',
    EN: 'Stays must hold the registrations local law requires (e.g., a minpaku notification number in Japan). Unsure? We will check together during review.',
    JP: '宿は現地法令に基づく登録・届出を済ませている必要があります（例：日本の民泊届出番号）。不明な場合は審査段階で一緒に確認します。',
  },
  trust2: {
    KO: 'Wakation의 소개 페이지는 검증된 사실만 씁니다 — 과장 문구·가짜 후기 없이, 있는 그대로의 강점으로 소개합니다.',
    EN: 'Wakation pages state verified facts only — no inflated claims, no fake reviews. We present your stay as it really is.',
    JP: 'Wakationの紹介ページは検証済みの事実のみを書きます — 誇張表現や偽レビューなしで、ありのままの強みで紹介します。',
  },
  formEyebrow: { KO: 'APPLY', EN: 'APPLY', JP: 'APPLY' },
  formTitle: { KO: '호스트 등록 신청', EN: 'Apply to become a host', JP: 'ホスト登録の申請' },
  formDesc: {
    KO: '아래 정보만 남겨주시면 검토 후 이메일로 연락드립니다.',
    EN: 'Leave the details below and we will get back to you by email after review.',
    JP: '以下の情報を残していただければ、審査後にメールでご連絡します。',
  },
  urlLabel: { KO: '에어비앤비 리스팅 URL', EN: 'Airbnb listing URL', JP: 'エアビーアンドビー リスティングURL' },
  msgLabel: { KO: '숙소·호스트 한 줄 소개 (간단히)', EN: 'One line about you and your stay', JP: '宿・ホストの一言紹介（簡単に）' },
  msgPh: {
    KO: '예: 우붓 라이스필드 뷰 빌라, 전용 업무 데스크 있음. 슈퍼호스트 3년차.',
    EN: 'e.g., Rice-field view villa in Ubud with a dedicated work desk. Superhost for 3 years.',
    JP: '例：ウブドのライスフィールドビューのヴィラ、専用ワークデスクあり。スーパーホスト3年目。',
  },
  doneDesc: {
    KO: '접수됐습니다! 검토 후 입력하신 이메일로 다음 단계를 안내드립니다. 빠른 소통을 원하시면 카카오톡 채널(pf.kakao.com/_xiPxbXG)로 "호스트 등록"이라고 남겨주세요.',
    EN: 'Received! We will review your listing and email you the next steps. For faster contact, message “Host application” to our KakaoTalk channel (pf.kakao.com/_xiPxbXG).',
    JP: '受付完了！リスティングを審査のうえ、ご記入のメールへ次のステップをご案内します。お急ぎの場合はカカオトークチャンネル（pf.kakao.com/_xiPxbXG)へ「ホスト登録」とお送りください。',
  },
  cityBali: { KO: '발리 (우선 모집)', EN: 'Bali (priority)', JP: 'バリ（優先募集）' },
  cityOsaka: { KO: '오사카 (우선 모집)', EN: 'Osaka (priority)', JP: '大阪（優先募集）' },
  cityOther: { KO: '기타 도시', EN: 'Other city', JP: 'その他の都市' },
}

export function HostApplyView({ forceLang }: { forceLang?: Lang } = {}) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount 1회 로케일 동기화 (StoriesHubView와 동일 패턴)
  }, [forceLang])

  const categories: InquiryCategory[] = [
    { id: 'bali', label: C.cityBali },
    { id: 'osaka', label: C.cityOsaka },
    { id: 'other', label: C.cityOther },
  ]
  const [categoryId, setCategoryId] = useState('bali')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-emerald-300 text-xs font-black tracking-widest uppercase mb-4">
            {C.eyebrow[lang]}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {C.heroTitle1[lang]}
            <br />
            {C.heroTitle2[lang]}
          </h1>
          <span className="block text-white/70 text-lg mt-5 max-w-xl mx-auto">{C.heroLead[lang]}</span>
          <div className="mt-8">
            <a
              href="#host-apply"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all bg-brand-mid text-white hover:bg-brand-light shadow-md"
            >
              <Link2 className="w-4 h-4" strokeWidth={ICON_STROKE} />
              {C.formTitle[lang]}
            </a>
          </div>
          <span className="block text-white/50 text-xs mt-4">{C.pilotNote[lang]}</span>
        </div>
      </section>

      {/* 왜 Wakation */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">{C.whyTitle[lang]}</h2>
          <div className="space-y-5">
            {[
              [Search, C.why1T, C.why1D],
              [Globe2, C.why2T, C.why2D],
              [Home, C.why3T, C.why3D],
            ].map(([Icon, title, desc]) => {
              const IconCmp = Icon as typeof Home
              const t = title as L
              const d = desc as L
              return (
                <div key={t.KO} className="flex gap-4 bg-gray-50 rounded-2xl p-6">
                  <IconCmp className="shrink-0 w-6 h-6 text-brand-mid" strokeWidth={ICON_STROKE} />
                  <div>
                    <span className="block font-black text-gray-900">{t[lang]}</span>
                    <span className="block text-gray-500 text-sm mt-1 leading-relaxed">{d[lang]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3단계 */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">{C.stepsTitle[lang]}</h2>
          <div className="space-y-5">
            {[
              [C.step1T, C.step1D],
              [C.step2T, C.step2D],
              [C.step3T, C.step3D],
            ].map(([title, desc], i) => {
              const t = title as L
              const d = desc as L
              return (
                <div key={t.KO} className="flex gap-4 bg-white rounded-2xl p-6 border border-gray-100">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-brand-mid text-white font-black text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <span className="block font-black text-gray-900">{t[lang]}</span>
                    <span className="block text-gray-500 text-sm mt-1 leading-relaxed">{d[lang]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 기준 */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">{C.trustTitle[lang]}</h2>
          <div className="space-y-5">
            {[
              [ShieldCheck, C.trust1],
              [MessageCircle, C.trust2],
            ].map(([Icon, body]) => {
              const IconCmp = Icon as typeof ShieldCheck
              const b = body as L
              return (
                <div key={b.KO} className="flex gap-4 rounded-2xl border border-gray-200 p-6">
                  <IconCmp className="shrink-0 w-6 h-6 text-brand-mid" strokeWidth={ICON_STROKE} />
                  <span className="block text-gray-600 text-sm leading-relaxed">{b[lang]}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 등록 폼 */}
      <section id="host-apply" className="scroll-mt-24 px-6 py-16 bg-[#f0f9ff] border-t border-[#e0f2fe]">
        <div className="max-w-xl mx-auto">
          <span className="block text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-1.5">
            {C.formEyebrow[lang]}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{C.formTitle[lang]}</h2>
          <p className="text-[#64748b] text-sm mb-8">{C.formDesc[lang]}</p>
          <InquiryForm
            formId="host-apply"
            jobType={JOB_TYPE}
            categories={categories}
            categoryId={categoryId}
            onCategoryChange={setCategoryId}
            mailSubject="[Wakation] 호스트 등록 신청"
            urlField={{ label: C.urlLabel, placeholder: 'https://www.airbnb.com/rooms/…' }}
            messageLabel={C.msgLabel}
            messagePlaceholder={C.msgPh}
            doneDesc={C.doneDesc}
          />
        </div>
      </section>
    </div>
  )
}
