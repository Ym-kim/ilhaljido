'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ExperienceEditorial } from '@/lib/experiences/editorials'
import type { Lang } from '@/lib/i18n/types'
import { getMediaAsset } from '@/lib/media/assets'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'

const COPY = {
  eyebrow: { KO: 'WAKATION EXPERIENCE', EN: 'WAKATION EXPERIENCE', JP: 'WAKATION EXPERIENCE' },
  cta: { KO: '체험 알아보기', EN: 'Explore the experience', JP: '体験を詳しく見る' },
} satisfies Record<string, Record<Lang, string>>

export function ExperienceEditorialCard({
  experience,
  lang,
  source,
}: {
  experience: ExperienceEditorial
  lang: Lang
  source: 'activity' | 'guide' | 'trip_set'
}) {
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  const media = getMediaAsset(experience.mediaAssetIds[0])
  if (!media) return null

  return (
    <Link
      data-ui-card="editorial"
      href={`${prefix}/experiences/${experience.slug}?src=${source}`}
      onClick={() => trackEvent('experience_editorial_click', {
        experience_slug: experience.slug,
        destination: experience.destinationSlug,
        locale: lang,
        source,
      })}
      className="group grid min-w-0 overflow-hidden rounded-[1.75rem] border border-[#dce5e5] bg-white shadow-[0_14px_40px_rgba(16,54,70,0.07)] transition hover:-translate-y-1 hover:border-[#9fc4cf] hover:shadow-[0_22px_54px_rgba(16,54,70,0.12)] md:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)]"
    >
      <div className="relative aspect-[16/10] min-h-56 overflow-hidden bg-[#dcebee] md:aspect-auto md:min-h-[22rem]">
        <Image
          src={media.src}
          alt={media.alt[lang]}
          fill
          priority={source === 'activity'}
          sizes="(max-width: 767px) 100vw, 58vw"
          className="object-cover transition duration-700 group-hover:scale-[1.025]"
          style={{ objectPosition: `${(media.focalPoint?.x ?? 0.5) * 100}% ${(media.focalPoint?.y ?? 0.5) * 100}%` }}
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center px-5 py-7 sm:px-7 md:px-8">
        <span className="mb-3 text-[0.68rem] font-black tracking-[0.15em] text-[#557e8c]">{COPY.eyebrow[lang]}</span>
        <h3 className="text-balance text-xl font-black leading-tight text-[#172a36] sm:text-2xl">
          {experience.title[lang]}
        </h3>
        <span className="mt-3 line-clamp-3 text-sm leading-6 text-[#65757d]">{experience.subtitle[lang]}</span>
        <div className="mt-5 flex flex-wrap gap-2">
          {experience.facts.slice(0, 3).map((fact) => (
            <span key={fact.label[lang]} className="rounded-full border border-[#dce6e7] bg-[#f5f9f8] px-3 py-1 text-[0.7rem] font-bold text-[#46616e]">
              {fact.value[lang]}
            </span>
          ))}
        </div>
        <span className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-sm font-black text-[#0b6d91]">
          {COPY.cta[lang]}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={ICON_STROKE} />
        </span>
      </div>
    </Link>
  )
}
