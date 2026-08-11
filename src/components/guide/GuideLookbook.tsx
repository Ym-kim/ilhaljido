import Image from 'next/image'
import type { CityGuide } from '@/lib/guides'
import type { Lang } from '@/lib/i18n/types'
import { getMediaAssetBySrc } from '@/lib/media/assets'

type GuideLookbookData = NonNullable<CityGuide['lookbook']>

export function GuideLookbook({
  lookbook,
  lang,
}: {
  lookbook: GuideLookbookData
  lang: Lang
}) {
  const isSingleFeature = lookbook.items.length === 1

  return (
    <section
      className="border-y border-[#dce7e8] bg-[#f4f1e9] px-5 py-12 sm:px-6 sm:py-16"
      data-visual-module="guide-lookbook"
    >
      <div className="mx-auto max-w-5xl">
        <span className="text-[0.68rem] font-black tracking-[0.15em] text-[#5d8290]">
          {lookbook.eyebrow[lang]}
        </span>
        <div className="mt-2 grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-end md:gap-8">
          <h2 className="text-2xl font-black leading-tight text-[#172a36] sm:text-3xl">
            {lookbook.title[lang]}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[#556b73] sm:text-[0.95rem]">
            {lookbook.intro[lang]}
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 md:gap-5">
          {lookbook.items.map((item) => {
            const asset = getMediaAssetBySrc(item.src)
            const focalPoint = asset?.focalPoints?.desktop ?? asset?.focalPoint

            return (
              <figure
                key={item.src}
                className={`group overflow-hidden rounded-[1.75rem] border border-[#d2dcdb] bg-white shadow-[0_16px_42px_rgba(26,50,59,0.08)] ${
                  isSingleFeature
                    ? 'md:col-span-2 md:grid md:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)]'
                    : ''
                }`}
              >
                <div className={`relative aspect-[3/2] overflow-hidden bg-[#dce6e5] ${
                  isSingleFeature ? 'md:aspect-auto md:min-h-[26rem]' : ''
                }`}>
                  <Image
                    src={item.src}
                    alt={asset?.alt[lang] ?? item.title[lang]}
                    fill
                    unoptimized
                    sizes="(max-width: 767px) calc(100vw - 40px), 480px"
                    className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none md:group-hover:scale-[1.015]"
                    style={focalPoint ? {
                      objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
                    } : undefined}
                  />
                </div>
                <figcaption className={`min-h-40 px-5 py-5 sm:px-6 sm:py-6 ${
                  isSingleFeature ? 'md:flex md:min-h-full md:flex-col md:justify-center md:px-8' : ''
                }`}>
                  <span className="text-[0.64rem] font-black tracking-[0.14em] text-[#6f8b93]">
                    {item.eyebrow[lang]}
                  </span>
                  <h3 className="mt-2 text-lg font-black text-[#172a36] sm:text-xl">
                    {item.title[lang]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#556b73]">
                    {item.description[lang]}
                  </p>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
