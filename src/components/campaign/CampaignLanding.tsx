'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import type { CampaignLandingConfig } from '@/data/campaign-landings'
import {
  campaignEventFields,
  rememberCampaignContext,
  sanitizeCampaignUtm,
  withCampaignUtm,
  type CampaignUtm,
} from '@/lib/campaignTracking'
import { trackEvent } from '@/lib/track'
import { ShareButton } from '@/components/share/ShareButton'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'

const ACCENT = {
  coral: {
    dot: 'bg-[#dc8a72]',
    wash: 'from-[#f5dfd5] via-[#fffaf3] to-[#f7f0e7]',
    ring: 'hover:border-[#d9a18f]',
  },
  ocean: {
    dot: 'bg-[#3f8ba8]',
    wash: 'from-[#dcecf0] via-[#f7fbfa] to-[#edf1ea]',
    ring: 'hover:border-[#7eb1c1]',
  },
} as const

const subscribeToLocation = () => () => {}

export function CampaignLanding({ config }: { config: CampaignLandingConfig }) {
  const { lang, setLang } = useLang()
  const viewed = useRef(false)
  const locationSearch = useSyncExternalStore(
    subscribeToLocation,
    () => window.location.search,
    () => '',
  )
  const utm = useMemo<CampaignUtm>(
    () => sanitizeCampaignUtm(new URLSearchParams(locationSearch)),
    [locationSearch],
  )

  useEffect(() => {
    if (lang !== config.lang) setLang(config.lang)
    // URL 고정 언어를 전역 내비게이션·푸터와 동기화한다.
  }, [config.lang, lang, setLang])

  useEffect(() => {
    if (!viewed.current) {
      viewed.current = true
      trackEvent('campaign_landing_view', {
        campaign: config.id,
        locale: config.locale,
        ...campaignEventFields(utm),
      })
    }
  }, [config.id, config.locale, utm])

  const choiceLinks = useMemo(
    () => Object.fromEntries(
      config.choices.map((choice) => [
        choice.slug,
        withCampaignUtm(`${config.locale === 'ja' ? '/ja' : ''}/collections/${choice.slug}`, utm),
      ]),
    ),
    [config.choices, config.locale, utm],
  )

  const handleChoice = (destination: string) => {
    const fields = {
      campaign: config.id,
      destination,
      locale: config.locale,
      ...campaignEventFields(utm),
    }
    rememberCampaignContext(fields)
    trackEvent('campaign_choice_click', fields)
    trackEvent('campaign_trip_set_open', fields)
  }

  return (
    <main className="overflow-hidden bg-[#fbf8f2] text-[#142431]">
      <section className="dark-surface relative min-h-[calc(100svh-4rem)] overflow-hidden bg-[#071824]">
        <Image
          src={config.heroImage}
          alt={config.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: config.heroPosition }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,31,.91)_0%,rgba(4,20,31,.68)_46%,rgba(4,20,31,.18)_100%)] md:bg-[linear-gradient(90deg,rgba(4,20,31,.90)_0%,rgba(4,20,31,.62)_48%,rgba(4,20,31,.08)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#071824] to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-end px-5 pb-8 pt-20 sm:px-8 md:justify-center md:pb-16 md:pt-24 lg:px-10">
          <div className="max-w-2xl">
            <span className="block text-[0.68rem] font-extrabold tracking-[0.22em] text-[#8fd3e9]">
              {config.eyebrow}
            </span>
            <h1 className="mt-4 max-w-xl text-[clamp(2.35rem,10vw,4.9rem)] font-black leading-[0.98] tracking-[-0.055em] text-white text-balance">
              {config.title}
            </h1>
            <span className="mt-5 block max-w-xl text-[0.94rem] font-medium leading-7 text-white/76 sm:text-base">
              {config.lead}
            </span>
          </div>

          <div className="mt-8 max-w-2xl border-t border-white/20 pt-5">
            <span className="block text-xs font-bold tracking-[0.08em] text-white/55">{config.choicePrompt}</span>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:max-w-xl sm:gap-3">
              {config.choices.map((choice) => (
                <Link
                  key={choice.slug}
                  href={choiceLinks[choice.slug]}
                  onClick={() => handleChoice(choice.slug)}
                  className="group min-w-0 rounded-2xl border border-white/18 bg-white/10 px-4 py-3.5 backdrop-blur-md transition hover:border-white/40 hover:bg-white/16 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  <span className="block truncate text-lg font-black text-white">{choice.name}</span>
                  <span className="mt-1 block truncate text-[0.68rem] font-semibold text-white/55">{choice.mood}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-5 md:mb-12">
          <div>
            <span className="text-[0.68rem] font-extrabold tracking-[0.19em] text-[#317b98]">TWO WAYS TO GO</span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#142431] sm:text-4xl">{config.choicePrompt}</h2>
          </div>
          <span className="hidden text-sm font-semibold text-[#73808a] md:block">{config.compareTitle}</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
          {config.choices.map((choice) => {
            const accent = ACCENT[choice.accent]
            return (
              <article
                key={choice.slug}
                className={`group overflow-hidden rounded-[1.7rem] border border-[#d8e1e2] bg-gradient-to-br ${accent.wash} shadow-[0_18px_55px_rgba(16,44,59,.08)] transition duration-300 ${accent.ring}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
                  <Image
                    src={choice.image}
                    alt={choice.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                    style={{ objectPosition: choice.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071824]/86 via-transparent to-black/8" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <span className="text-[0.62rem] font-extrabold tracking-[0.18em] text-white/68">{choice.eyebrow}</span>
                    <h3 className="mt-1 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{choice.name}</h3>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <span className="block min-h-12 text-base font-bold leading-6 text-[#243746]">{choice.summary}</span>
                  <dl className="mt-6 grid grid-cols-[6.25rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-y border-[#142431]/10 py-5 text-sm sm:grid-cols-[7.25rem_minmax(0,1fr)]">
                    {[choice.mood, choice.duration, choice.company, choice.work, choice.experience, choice.transport].map((value, index) => (
                      <div key={config.compareLabels[index]} className="contents">
                        <dt className="font-bold text-[#6b7880]">{config.compareLabels[index]}</dt>
                        <dd className="min-w-0 font-semibold text-[#142431]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={choiceLinks[choice.slug]}
                    onClick={() => handleChoice(choice.slug)}
                    className="mt-6 inline-flex w-full items-center justify-between rounded-full bg-[#0b4b69] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#083d56] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b4b69]"
                  >
                    {choice.cta}
                    <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-y border-[#d8e5e7] bg-[#edf5f4]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <div>
            <span className="text-[0.68rem] font-extrabold tracking-[0.19em] text-[#317b98]">{config.prepareEyebrow}</span>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">{config.prepareTitle}</h2>
            <p className="mt-4 max-w-lg text-sm font-medium leading-7 text-[#65747d]">{config.prepareLead}</p>
          </div>
          <div className="grid gap-3">
            {config.prepareLinks.map((item, index) => (
              <Link
                key={item.href}
                href={withCampaignUtm(item.href, utm)}
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-[#d5e0e1] bg-white px-5 py-4 shadow-[0_6px_18px_rgba(12,55,72,.04)] transition hover:-translate-y-0.5 hover:border-[#91b7c2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b4b69]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e5f1f4] text-xs font-black text-[#0b4b69]">0{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold text-[#142431]">{item.label}</span>
                  <span className="mt-0.5 block text-xs leading-5 text-[#72808a]">{item.detail}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#317b98] transition group-hover:translate-x-1" strokeWidth={ICON_STROKE} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071824] px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="dark-surface min-w-0">
            <span className="block text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">{config.shareTitle}</span>
            <span className="mt-3 block max-w-2xl text-sm font-medium leading-6 text-white/58">{config.shareLead}</span>
          </div>
          <ShareButton
            title={config.title}
            text={config.lead}
            contentType="page"
            slug={config.id}
            label={config.shareCta}
          />
        </div>
      </section>

      <section className="bg-[#fbf8f2] px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-[#ddd8cf] bg-white px-5 py-6 sm:px-7">
          <h2 className="text-sm font-black text-[#142431]">{config.disclosureTitle}</h2>
          <ul className="mt-4 grid gap-3 text-xs font-medium leading-5 text-[#68747b] md:grid-cols-3">
            {config.disclosure.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#317b98]" strokeWidth={ICON_STROKE} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-[#ebe7df] pt-5 sm:flex-row sm:items-center">
            <span className="text-xs font-semibold text-[#78838a]">{config.closeNote}</span>
            <Link href={config.closeHref} className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0b4b69] hover:underline">
              {config.closeCta}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
