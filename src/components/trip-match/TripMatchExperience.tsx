'use client'

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Bookmark, Check, RotateCcw } from 'lucide-react'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { ShareButton } from '@/components/share/ShareButton'
import { useLang } from '@/context/LanguageContext'
import { useSavedTripMatches } from '@/hooks/useSavedTripMatches'
import {
  TRIP_MATCH_COMPANIONS,
  TRIP_MATCH_DURATIONS,
  TRIP_MATCH_LABELS,
  TRIP_MATCH_MOODS,
  buildTripMatchId,
  getTripMatchReasons,
  matchTripSets,
  serializeTripMatchAnswer,
  type TripMatchAnswer,
  type TripMatchCampaign,
  type TripMatchCompanion,
  type TripMatchDuration,
  type TripMatchMood,
} from '@/lib/tripMatch'
import type { TripMatchTripContent } from '@/lib/tripMatchContent'
import type { Lang } from '@/lib/i18n/types'
import { campaignEventFields, rememberCampaignContext, sanitizeCampaignUtm, withCampaignUtm } from '@/lib/campaignTracking'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: '30-SECOND TRIP MATCH', EN: '30-SECOND TRIP MATCH', JP: '30-SECOND TRIP MATCH' },
  title: { KO: '지금 나에게 맞는 여행은?', EN: 'Which trip fits me now?', JP: '今の私に合う旅は？' },
  lead: {
    KO: '세 가지만 고르면 바로 추천해드려요. 로그인도 개인정보 입력도 필요 없습니다.',
    EN: 'Choose three things and get a practical trip suggestion. No sign-in or personal details.',
    JP: '3つ選ぶだけで、今の気分に合う旅を提案します。ログインも個人情報も必要ありません。',
  },
  start: { KO: '30초 만에 추천받기', EN: 'Find my trip', JP: '旅を見つける' },
  durationQuestion: { KO: '얼마나 시간을 낼 수 있나요?', EN: 'How much time do you have?', JP: 'どのくらい時間を取れますか？' },
  durationHint: { KO: '실제 휴가 길이에 가장 가까운 하나를 골라주세요.', EN: 'Choose the closest fit.', JP: '実際の休みに一番近いものを選んでください。' },
  moodQuestion: { KO: '지금 어떤 시간을 원하나요?', EN: 'What kind of time do you want?', JP: '今、どんな時間がほしいですか？' },
  moodHint: { KO: '최대 두 개까지 고를 수 있어요.', EN: 'Choose up to two.', JP: '2つまで選べます。' },
  companionQuestion: { KO: '누구와, 어떻게 떠나나요?', EN: 'Who are you traveling with?', JP: '誰と、どんな旅をしますか？' },
  companionHint: { KO: '계획이 아직 없어도 괜찮아요.', EN: 'It is fine if plans are still open.', JP: 'まだ決まっていなくても大丈夫です。' },
  back: { KO: '이전', EN: 'Back', JP: '戻る' },
  next: { KO: '다음', EN: 'Next', JP: '次へ' },
  result: { KO: '추천 결과 보기', EN: 'See my match', JP: '結果を見る' },
  progress: { KO: '여행 매칭 진행률', EN: 'Trip Match progress', JP: '旅マッチの進捗' },
  resultEyebrow: { KO: 'YOUR TRIP MATCH', EN: 'YOUR TRIP MATCH', JP: 'YOUR TRIP MATCH' },
  resultTitle: { KO: '지금 가장 잘 맞는 여행', EN: 'Your best match right now', JP: '今、いちばん合う旅' },
  reasonsTitle: { KO: '당신에게 맞는 이유', EN: 'Why it fits', JP: 'あなたに合う理由' },
  primaryCta: { KO: '추천 여행 구성 보기', EN: 'Open this Trip Set', JP: 'この旅を見る' },
  alternativeEyebrow: { KO: 'ANOTHER WAY', EN: 'ANOTHER WAY', JP: 'ANOTHER WAY' },
  alternativeTitle: { KO: '두 번째로 잘 맞는 선택', EN: 'Another good fit', JP: 'もうひとつの候補' },
  alternativeCta: { KO: '대안 Trip Set 보기', EN: 'View the alternative', JP: 'もうひとつの旅を見る' },
  save: { KO: '여행 저장', EN: 'Save trip', JP: '旅を保存' },
  saved: { KO: '저장됨', EN: 'Saved', JP: '保存しました' },
  openSaved: { KO: '저장 목록 열기', EN: 'Open saved', JP: '保存リストを見る' },
  share: { KO: '결과 공유하기', EN: 'Share result', JP: '結果をシェア' },
  restart: { KO: '다시 선택하기', EN: 'Choose again', JP: '選び直す' },
  together: { KO: '친구와 두 도시 비교하기', EN: 'Compare two cities together', JP: '友達と2都市を比べる' },
  practicalEyebrow: { KO: 'BEFORE YOU GO', EN: 'BEFORE YOU GO', JP: 'BEFORE YOU GO' },
  practicalTitle: { KO: '도착 전에 알아둘 것', EN: 'Useful before arrival', JP: '到着前に知っておきたいこと' },
  prepareEyebrow: { KO: 'PREP, ONLY WHAT YOU NEED', EN: 'PREP, ONLY WHAT YOU NEED', JP: 'PREP, ONLY WHAT YOU NEED' },
  prepareTitle: { KO: '필요한 준비만 이어서', EN: 'Prepare only what you need', JP: '必要な準備だけ、続けて' },
  prepareLead: {
    KO: '숙소·eSIM·체험 또는 교통을 각각 확인합니다. 하나의 패키지 상품이 아닙니다.',
    EN: 'Check stays, eSIM, experiences or transport separately. This is not a package.',
    JP: '宿・eSIM・体験・交通はそれぞれ個別に確認します。パッケージ商品ではありません。',
  },
  hostedEyebrow: { KO: 'WAKATION HOSTED', EN: 'WAKATION HOSTED', JP: 'WAKATION HOSTED' },
  hostedTitle: { KO: '더 오래 머무는 다음 프로그램', EN: 'A future program for a longer stay', JP: 'もう少し長く滞在する次のプログラム' },
  hostedLead: {
    KO: '장기 체류나 업무 병행 프로그램이 열리면 확인할 수 있도록 Hosted 소식으로 연결합니다.',
    EN: 'Follow Hosted updates for future long-stay and workation programs.',
    JP: '長期滞在や仕事を組み合わせたHostedプログラムの情報につながります。',
  },
  hostedCta: { KO: '다음 프로그램 알림 확인', EN: 'View program updates', JP: '次のプログラム情報を見る' },
  disclosure: {
    KO: '일부 외부 링크를 통해 Wakation에 수익이 발생할 수 있습니다. 상품은 각 제휴사에서 개별 확인·예약하며 이용 조건은 각 제휴사 약관을 따릅니다.',
    EN: 'Wakation may earn from some partner links. Check and book each item with the provider under its own terms.',
    JP: '一部の外部リンクを通じてWakationに収益が発生する場合があります。商品は各提携先で個別に確認・予約し、利用条件は各社の規約に従います。',
  },
  shareTitle: { KO: '내 30초 여행 추천', EN: 'My 30-second trip match', JP: '私の30秒旅マッチ' },
  shareText: { KO: '내게 맞는 여행이 나왔어요. 같이 볼래요?', EN: 'I found a trip that fits. Take a look?', JP: '今の私に合う旅が見つかりました。一緒に見てみる？' },
}

const TRIP_MATCH_INTRO_ASSET = {
  id: 'trip-match-model-d-itinerary-choice-v3',
  modelId: 'WAK-MODEL-D',
  src: '/media/brand-models/trip-match-model-d-itinerary-choice-v3.webp',
  alt: {
    KO: '출발 라운지에서 두 여행 일정과 노트북을 정리하는 여행자',
    EN: 'A traveler choosing between two itineraries in an unnamed departure lounge',
    JP: '出発ラウンジで2つの旅程とノートパソコンを整理する旅人',
  } satisfies L,
} as const

const subscribeToLocation = () => () => {}

function getQuestionValue(step: number, answer: TripMatchAnswer) {
  if (step === 0) return answer.duration
  if (step === 1) return [...answer.moods].sort().join('.')
  return answer.companion
}

export function TripMatchExperience({
  forceLang,
  trips,
  initialAnswer,
  initialCampaign,
  resultMode = false,
}: {
  forceLang: Lang
  trips: TripMatchTripContent[]
  initialAnswer: TripMatchAnswer
  initialCampaign?: TripMatchCampaign
  resultMode?: boolean
}) {
  const router = useRouter()
  const { lang: contextLang, setLang } = useLang()
  const lang = forceLang
  const locale = lang === 'JP' ? 'ja' : lang === 'EN' ? 'en' : 'ko'
  const prefix = lang === 'JP' ? '/ja' : lang === 'EN' ? '/en' : ''
  const [step, setStep] = useState(resultMode ? 3 : -1)
  const [answer, setAnswer] = useState<TripMatchAnswer>(initialAnswer)
  const opened = useRef(false)
  const answeredEvents = useRef(new Set<string>())
  const completing = useRef(false)
  const locationSearch = useSyncExternalStore(subscribeToLocation, () => window.location.search, () => '')
  const utm = useMemo(() => sanitizeCampaignUtm(new URLSearchParams(locationSearch)), [locationSearch])
  const campaign = initialCampaign
  const match = useMemo(() => matchTripSets(answer, lang, campaign), [answer, campaign, lang])
  const primary = trips.find((trip) => trip.slug === match.primary) ?? trips[0]
  const alternative = trips.find((trip) => trip.slug === match.alternative) ?? trips[1]
  const reasons = getTripMatchReasons(answer, lang)
  const savedId = buildTripMatchId(answer, lang, campaign)
  const { has, toggle } = useSavedTripMatches()
  const saved = has(savedId)
  const moodValue = [...answer.moods].sort().join('.')
  const commonFields = {
    locale,
    duration: answer.duration,
    mood: moodValue,
    companion: answer.companion,
    result_slug: primary.slug,
    ...(campaign ? { campaign } : utm.utm_campaign ? { campaign: utm.utm_campaign } : {}),
    ...campaignEventFields(utm),
  }

  useEffect(() => {
    if (contextLang !== lang) setLang(lang)
  }, [contextLang, lang, setLang])

  useEffect(() => {
    if (!resultMode || opened.current) return
    opened.current = true
    rememberCampaignContext({
      campaign: campaign ?? utm.utm_campaign ?? 'trip-match',
      destination: primary.slug,
      locale,
      ...campaignEventFields(utm),
    })
    trackEvent('trip_match_result_open', commonFields)
    // Result opening is intentionally emitted once for this mounted result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultMode])

  const recordAnswer = (questionStep: number) => {
    const question = questionStep === 0 ? 'duration' : questionStep === 1 ? 'mood' : 'companion'
    const value = getQuestionValue(questionStep, answer)
    const eventKey = `${question}:${value}`
    if (answeredEvents.current.has(eventKey)) return
    answeredEvents.current.add(eventKey)
    trackEvent('trip_match_answer', {
      locale,
      question,
      answer: value,
      ...(campaign ? { campaign } : {}),
      ...campaignEventFields(utm),
    })
  }

  const start = () => {
    trackEvent('trip_match_start', {
      locale,
      assetId: TRIP_MATCH_INTRO_ASSET.id,
      modelId: TRIP_MATCH_INTRO_ASSET.modelId,
      ...(campaign ? { campaign } : {}),
      ...campaignEventFields(utm),
    })
    setStep(0)
  }

  const next = () => {
    if (step === 2 && completing.current) return
    recordAnswer(step)
    if (step < 2) {
      setStep(step + 1)
      return
    }

    const result = matchTripSets(answer, lang, campaign)
    completing.current = true
    const query = new URLSearchParams(serializeTripMatchAnswer(answer))
    if (campaign) query.set('campaign', campaign)
    const href = withCampaignUtm(`${prefix}/trip-match/result?${query.toString()}`, utm)
    rememberCampaignContext({
      campaign: campaign ?? utm.utm_campaign ?? 'trip-match',
      destination: result.primary,
      locale,
      ...campaignEventFields(utm),
    })
    trackEvent('trip_match_complete', { ...commonFields, result_slug: result.primary })
    router.push(href)
  }

  const previous = () => setStep((current) => Math.max(-1, current - 1))

  const toggleMood = (mood: TripMatchMood) => {
    setAnswer((current) => {
      const exists = current.moods.includes(mood)
      if (exists) return { ...current, moods: current.moods.filter((value) => value !== mood) }
      if (current.moods.length >= 2) return current
      return { ...current, moods: [...current.moods, mood] }
    })
  }

  const resultHref = (slug: string) => withCampaignUtm(
    `${prefix}/collections/${slug}?src=trip_match&match_result=${primary.slug}`,
    utm,
  )
  const restartHref = withCampaignUtm(`${prefix}/trip-match${campaign ? `?campaign=${campaign}` : ''}`, utm)
  const comparisonHref = withCampaignUtm(
    lang === 'JP'
      ? '/ja/campaign/korea-weekend'
      : lang === 'EN'
        ? '/en/destinations/compare'
        : '/campaign/japan-short-stay',
    utm,
  )
  const shouldShowHosted = answer.duration === 'long'
    || answer.moods.includes('workation')
    || answer.companion === 'workation'

  const handleTripSetClick = (slug: string, position: 'primary' | 'alternative') => {
    rememberCampaignContext({
      campaign: campaign ?? utm.utm_campaign ?? 'trip-match',
      destination: slug,
      locale,
      ...campaignEventFields(utm),
    })
    trackEvent('trip_match_trip_set_click', { ...commonFields, destination: slug, position })
  }

  const handleSave = () => {
    const added = toggle({
      kind: 'trip_match',
      id: savedId,
      answer,
      resultSlug: primary.slug,
      alternativeSlug: alternative.slug,
      locale: lang,
      ...(campaign ? { campaign } : {}),
      savedAt: new Date().toISOString(),
    })
    trackEvent('trip_match_save', { ...commonFields, action: added ? 'save' : 'remove' })
  }

  if (step === -1) {
    return (
      <main className={`min-h-screen bg-[#071824] ${lang === 'JP' ? 'font-jp' : ''}`}>
        <section className="dark-surface relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden">
          <Image
            src={TRIP_MATCH_INTRO_ASSET.src}
            alt={TRIP_MATCH_INTRO_ASSET.alt[lang]}
            fill
            preload
            sizes="100vw"
            className="object-cover object-[72%_48%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,18,29,.94)_0%,rgba(3,18,29,.73)_55%,rgba(3,18,29,.25)_100%)]" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 pt-24 sm:px-8 md:pb-20">
            <div data-motion="reveal" data-motion-speed="editorial" className="max-w-2xl">
              <span className="block text-[0.68rem] font-extrabold tracking-[0.22em] text-[#8fd3e9]">{COPY.eyebrow[lang]}</span>
              <h1 className="mt-4 text-[clamp(2.7rem,11vw,5.2rem)] font-black leading-[0.98] tracking-[-0.055em] text-white text-balance">{COPY.title[lang]}</h1>
              <span className="mt-6 block max-w-xl text-base font-medium leading-7 text-white/72">{COPY.lead[lang]}</span>
              <button
                type="button"
                onClick={start}
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f3c9b8] px-7 text-sm font-black text-[#142431] shadow-[0_12px_40px_rgba(0,0,0,.24)] transition hover:bg-[#f7d8ca] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fd3e9]"
              >
                {COPY.start[lang]}
                <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
              </button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (step < 3) {
    const question = step === 0 ? COPY.durationQuestion[lang] : step === 1 ? COPY.moodQuestion[lang] : COPY.companionQuestion[lang]
    const hint = step === 0 ? COPY.durationHint[lang] : step === 1 ? COPY.moodHint[lang] : COPY.companionHint[lang]
    const canContinue = step !== 1 || answer.moods.length > 0

    return (
      <main className={`min-h-[calc(100svh-4rem)] bg-[#f8f4ec] px-4 py-8 text-[#142431] sm:px-6 md:py-14 ${lang === 'JP' ? 'font-jp' : ''}`}>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={previous}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold text-[#53636c] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={ICON_STROKE} />
              {COPY.back[lang]}
            </button>
            <span className="text-xs font-black tracking-[0.12em] text-[#317b98]">{step + 1} / 3</span>
          </div>
          <div
            role="progressbar"
            aria-label={COPY.progress[lang]}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={step + 1}
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#dfe6e4]"
          >
            <span className="block h-full rounded-full bg-[#317b98] transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((step + 1) / 3) * 100}%` }} />
          </div>

          <section key={step} data-motion="reveal" className="mt-8 rounded-[2rem] border border-[#dedbd3] bg-white px-5 py-7 shadow-[0_22px_70px_rgba(31,51,58,.08)] sm:px-9 sm:py-10">
            <span className="text-[0.66rem] font-extrabold tracking-[0.2em] text-[#3f8ba8]">TRIP MATCH · 0{step + 1}</span>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">{question}</h1>
            <p className="mt-3 text-sm font-medium leading-6 text-[#72808a]">{hint}</p>

            {step === 0 && (
              <fieldset className="mt-7 grid gap-3 sm:grid-cols-2">
                <legend className="sr-only">{question}</legend>
                {TRIP_MATCH_DURATIONS.map((duration) => {
                  const selected = answer.duration === duration
                  return (
                    <label key={duration} className={`flex min-h-14 cursor-pointer items-center justify-between rounded-2xl border px-5 py-4 text-sm font-extrabold transition ${selected ? 'border-[#317b98] bg-[#e8f2f4] text-[#0b4b69] shadow-[inset_0_0_0_1px_#317b98]' : 'border-[#dfe5e5] bg-[#fbfcfb] text-[#42545f] hover:border-[#9dbbc4]'}`}>
                      <input
                        type="radio"
                        name="duration"
                        value={duration}
                        checked={selected}
                        onChange={() => setAnswer((current) => ({ ...current, duration: duration as TripMatchDuration }))}
                        className="sr-only"
                      />
                      {TRIP_MATCH_LABELS.duration[duration][lang]}
                      {selected && <Check className="h-4 w-4" strokeWidth={2.4} />}
                    </label>
                  )
                })}
              </fieldset>
            )}

            {step === 1 && (
              <fieldset className="mt-7 grid gap-3 sm:grid-cols-2">
                <legend className="sr-only">{question}</legend>
                {TRIP_MATCH_MOODS.map((mood) => {
                  const selected = answer.moods.includes(mood)
                  const disabled = !selected && answer.moods.length >= 2
                  return (
                    <label key={mood} className={`flex min-h-14 items-center justify-between rounded-2xl border px-5 py-4 text-sm font-extrabold transition ${disabled ? 'cursor-not-allowed border-[#e8eceb] bg-[#f5f6f4] text-[#a3adaf]' : 'cursor-pointer'} ${selected ? 'border-[#317b98] bg-[#e8f2f4] text-[#0b4b69] shadow-[inset_0_0_0_1px_#317b98]' : !disabled ? 'border-[#dfe5e5] bg-[#fbfcfb] text-[#42545f] hover:border-[#9dbbc4]' : ''}`}>
                      <input
                        type="checkbox"
                        name="mood"
                        value={mood}
                        checked={selected}
                        disabled={disabled}
                        onChange={() => toggleMood(mood)}
                        className="sr-only"
                      />
                      {TRIP_MATCH_LABELS.mood[mood][lang]}
                      {selected && <Check className="h-4 w-4" strokeWidth={2.4} />}
                    </label>
                  )
                })}
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="mt-7 grid gap-3 sm:grid-cols-2">
                <legend className="sr-only">{question}</legend>
                {TRIP_MATCH_COMPANIONS.map((companion) => {
                  const selected = answer.companion === companion
                  return (
                    <label key={companion} className={`flex min-h-14 cursor-pointer items-center justify-between rounded-2xl border px-5 py-4 text-sm font-extrabold transition ${selected ? 'border-[#317b98] bg-[#e8f2f4] text-[#0b4b69] shadow-[inset_0_0_0_1px_#317b98]' : 'border-[#dfe5e5] bg-[#fbfcfb] text-[#42545f] hover:border-[#9dbbc4]'}`}>
                      <input
                        type="radio"
                        name="companion"
                        value={companion}
                        checked={selected}
                        onChange={() => setAnswer((current) => ({ ...current, companion: companion as TripMatchCompanion }))}
                        className="sr-only"
                      />
                      {TRIP_MATCH_LABELS.companion[companion][lang]}
                      {selected && <Check className="h-4 w-4" strokeWidth={2.4} />}
                    </label>
                  )
                })}
              </fieldset>
            )}

            <button
              type="button"
              disabled={!canContinue}
              onClick={next}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0b4b69] px-6 text-sm font-black text-white transition hover:bg-[#083d56] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98]"
            >
              {step === 2 ? COPY.result[lang] : COPY.next[lang]}
              <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </button>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className={`overflow-hidden bg-[#fbf8f2] text-[#142431] ${lang === 'JP' ? 'font-jp' : ''}`}>
      <section className="dark-surface relative min-h-[78svh] overflow-hidden bg-[#071824]">
        <Image src={primary.image} alt={primary.imageAlt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: primary.imagePosition }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,18,29,.95)_0%,rgba(3,18,29,.73)_52%,rgba(3,18,29,.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#071824] to-transparent" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-end px-5 pb-10 pt-24 sm:px-8 md:items-center md:pb-16 lg:px-10">
          <div data-motion="reveal" data-motion-speed="editorial" className="max-w-2xl" aria-live="polite">
            <span className="block text-[0.68rem] font-extrabold tracking-[0.22em] text-[#8fd3e9]">{COPY.resultEyebrow[lang]}</span>
            <span className="mt-3 block text-sm font-bold text-white/58">{COPY.resultTitle[lang]}</span>
            <h1 className="mt-2 text-[clamp(3rem,12vw,5.8rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">{primary.title}</h1>
            <span className="mt-4 block text-sm font-bold text-[#f3c9b8]">{primary.duration} · {primary.companion}</span>
            <span className="mt-4 block max-w-xl text-base font-medium leading-7 text-white/74">{primary.tagline}</span>
            <div className="mt-7 border-t border-white/20 pt-5">
              <span className="block text-xs font-black tracking-[0.08em] text-white/55">{COPY.reasonsTitle[lang]}</span>
              <ul className="mt-3 grid gap-2 text-sm font-bold text-white/88 sm:grid-cols-3">
                {reasons.map((reason) => <li key={reason} className="rounded-xl border border-white/12 bg-white/8 px-3.5 py-3 backdrop-blur-sm">{reason}</li>)}
              </ul>
            </div>
            <Link
              href={resultHref(primary.slug)}
              onClick={() => handleTripSetClick(primary.slug, 'primary')}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f3c9b8] px-6 text-sm font-black text-[#142431] transition hover:bg-[#f7d8ca] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fd3e9] sm:w-auto"
            >
              {COPY.primaryCta[lang]}
              <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e0ddd5] bg-white px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleSave}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 text-sm font-black transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#317b98] ${saved ? 'border-[#317b98] bg-[#e8f2f4] text-[#0b4b69]' : 'border-[#cfd9dc] text-[#52636c] hover:border-[#7eaaba]'}`}
          >
            {saved ? <Check className="h-4 w-4" strokeWidth={2.4} /> : <Bookmark className="h-4 w-4" strokeWidth={ICON_STROKE} />}
            {saved ? COPY.saved[lang] : COPY.save[lang]}
          </button>
          <ShareButton
            title={`${COPY.shareTitle[lang]} · ${primary.title}`}
            text={COPY.shareText[lang]}
            tone="light"
            contentType="result"
            slug={primary.slug}
            label={COPY.share[lang]}
            onShared={(method) => trackEvent('trip_match_share', { ...commonFields, method })}
          />
          {saved && <Link href="/wishlist" className="inline-flex min-h-11 items-center justify-center px-4 text-sm font-black text-[#317b98] hover:underline">{COPY.openSaved[lang]}</Link>}
          <Link href={restartHref} className="inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm font-bold text-[#718087] hover:text-[#142431]">
            <RotateCcw className="h-4 w-4" strokeWidth={ICON_STROKE} />
            {COPY.restart[lang]}
          </Link>
        </div>
      </section>

      <section data-motion="reveal" className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1.08fr_.92fr] md:py-20 lg:px-10">
        <div>
          <span className="text-[0.68rem] font-extrabold tracking-[0.2em] text-[#317b98]">{COPY.alternativeEyebrow[lang]}</span>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">{COPY.alternativeTitle[lang]}</h2>
          <article className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#d9e0df] bg-[#edf5f4]">
            <div className="relative h-56 overflow-hidden sm:h-72">
              <Image src={alternative.image} alt={alternative.imageAlt} fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" style={{ objectPosition: alternative.imagePosition }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071824]/88 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <span className="block text-xs font-bold text-white/65">{alternative.duration}</span>
                <h3 className="mt-1 text-3xl font-black text-white">{alternative.title}</h3>
              </div>
            </div>
            <div className="p-5 sm:p-7">
              <p className="text-sm font-medium leading-7 text-[#60717a]">{alternative.tagline}</p>
              <Link href={resultHref(alternative.slug)} onClick={() => handleTripSetClick(alternative.slug, 'alternative')} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-[#0b4b69] hover:underline">
                {COPY.alternativeCta[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
          </article>
        </div>

        <div className="rounded-[1.75rem] border border-[#dedbd3] bg-white p-6 sm:p-8">
          <span className="text-[0.68rem] font-extrabold tracking-[0.2em] text-[#317b98]">{COPY.practicalEyebrow[lang]}</span>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.035em]">{COPY.practicalTitle[lang]}</h2>
          <dl className="mt-6 divide-y divide-[#e7e8e4]">
            {primary.practicalNotes.map((note) => (
              <div key={`${note.type}-${note.label}`} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="text-xs font-black text-[#317b98]">{note.label}</dt>
                <dd className="text-sm font-semibold leading-6 text-[#53646d]">
                  {note.value}
                  {/* 2026-08-04: 매핑만 되고 렌더가 없어 검증일 표기가 소실되던 것 복구 (CollectionView와 동일 표기) */}
                  {note.verifiedAt && (
                    <span className="block text-[0.65rem] font-medium text-[#a3b0b6] mt-0.5">
                      {note.source ? `${note.source} · ` : ''}{note.verifiedAt}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <Link href={comparisonHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-black text-[#0b4b69] hover:underline">
              {COPY.together[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
            {/* 2026-08-04: 비교 도구와 단절돼 있던 동선 연결 (기존 캠페인 링크는 유지) */}
            <Link href={`${prefix}/destinations/compare`} className="inline-flex min-h-11 items-center gap-2 text-sm font-black text-[#0b4b69] hover:underline">
              {{ KO: '도시 데이터 비교 도구', EN: 'City comparison tool', JP: '都市データ比較ツール' }[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </section>

      <section data-motion="reveal" className="border-y border-[#d8e5e7] bg-[#edf5f4] px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <span className="text-[0.68rem] font-extrabold tracking-[0.2em] text-[#317b98]">{COPY.prepareEyebrow[lang]}</span>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">{COPY.prepareTitle[lang]}</h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[#65747d]">{COPY.prepareLead[lang]}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {primary.items.map((item) => <AffiliateCard key={item.id} item={item} visual />)}
          </div>
          <p className="mt-6 rounded-2xl border border-[#d8dfdd] bg-white/70 px-5 py-4 text-xs font-semibold leading-6 text-[#6a777d]">{COPY.disclosure[lang]}</p>
        </div>
      </section>

      {shouldShowHosted && (
        <section data-motion="reveal" className="bg-[#071824] px-5 py-14 sm:px-8 md:py-20">
          <div className="dark-surface mx-auto max-w-5xl rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-6 sm:p-9">
            <span className="block text-[0.68rem] font-extrabold tracking-[0.2em] text-[#8fd3e9]">{COPY.hostedEyebrow[lang]}</span>
            <span className="mt-3 block text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">{COPY.hostedTitle[lang]}</span>
            <span className="mt-3 block max-w-2xl text-sm font-medium leading-7 text-white/62">{COPY.hostedLead[lang]}</span>
            <Link
              href={`${prefix}/hosted`}
              onClick={() => trackEvent('trip_match_hosted_click', commonFields)}
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/24 px-6 text-sm font-black text-white transition hover:border-white/50 hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fd3e9]"
            >
              {COPY.hostedCta[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}
