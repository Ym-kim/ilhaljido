'use client'

import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { trackEditorialAssetView } from '@/lib/media/editorialTracking'

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: 'MONTHLY VISUAL EDIT', EN: 'MONTHLY VISUAL EDIT', JP: 'MONTHLY VISUAL EDIT' },
  title: {
    KO: '도착하고, 집중하고,\n다시 걷는 시간',
    EN: 'Arrive, focus,\nthen move again',
    JP: '着いて、集中して、\nまた歩き出す時間',
  },
  description: {
    KO: '도시의 첫 장면부터 해안의 리셋, 북카페와 퇴근 뒤 산책까지. 이번 달 Wakation이 고른 일과 여행 사이의 네 장면입니다.',
    EN: 'From a first city arrival to a coastal reset, a book café and an evening walk: four scenes selected for life between work and travel.',
    JP: '街に着く瞬間、海辺でのリセット、ブックカフェ、仕事終わりの散歩。仕事と旅の間にある今月の4つのシーンです。',
  },
  disclosure: {
    KO: 'Wakation이 제작한 이미지와 무음 영상입니다. 실제 고객, 참가자, 장소 또는 프로그램 현장을 나타내지 않습니다.',
    EN: 'Images and a silent film created by Wakation. They do not depict real customers, participants, venues or program scenes.',
    JP: 'Wakationが制作した画像と無音映像です。実在の顧客、参加者、施設、プログラム会場を示すものではありません。',
  },
  videoLabel: {
    KO: '2026년 8월 월간 브랜드 필름, 15초 무음 영상',
    EN: 'August 2026 monthly brand film, 15-second silent video',
    JP: '2026年8月のマンスリーブランドフィルム、15秒の無音映像',
  },
  play: { KO: '영상 재생', EN: 'Play film', JP: '映像を再生' },
  pause: { KO: '영상 일시정지', EN: 'Pause film', JP: '映像を一時停止' },
  reduced: {
    KO: '모션 감소 설정에 따라 정지 이미지로 표시됩니다.',
    EN: 'A still image is shown because reduced motion is enabled.',
    JP: 'モーション低減設定に合わせて静止画を表示しています。',
  },
}

const PHOTOS: Array<{
  id: string
  src: string
  alt: L
  caption: L
}> = [
  {
    id: 'monthly-2026-08-model-e-city-arrival-v2',
    src: '/media/brand-models/monthly-2026-08-model-e-city-arrival-v2.webp',
    alt: {
      KO: '이름 없는 해안 도시 터미널에서 여행 동선을 살펴보는 성인 여행자',
      EN: 'An adult traveller reviewing her route at an unnamed coastal-city terminal',
      JP: '場所を特定しない海辺の街のターミナルで旅の動線を確認する成人旅行者',
    },
    caption: { KO: '도시 도착', EN: 'City arrival', JP: '街に着く' },
  },
  {
    id: 'monthly-2026-08-model-h-coastal-reset-v1',
    src: '/media/brand-models/monthly-2026-08-model-h-coastal-reset-v1.webp',
    alt: {
      KO: '이름 없는 해안 카페에서 노트북과 노트를 정리하는 성인 여행자',
      EN: 'An adult traveller packing her notebook at an unnamed coastal café',
      JP: '場所を特定しない海辺のカフェでノートを片づける成人旅行者',
    },
    caption: { KO: '해안의 리셋', EN: 'Coastal reset', JP: '海辺でリセット' },
  },
  {
    id: 'monthly-2026-08-model-g-coastal-book-cafe-v1',
    src: '/media/brand-models/monthly-2026-08-model-g-coastal-book-cafe-v1.webp',
    alt: {
      KO: '이름 없는 해안 북카페를 나서며 노트를 든 성인 여행자',
      EN: 'An adult traveller leaving an unnamed coastal book café with a notebook',
      JP: '場所を特定しない海辺のブックカフェをノートを手に出る成人旅行者',
    },
    caption: { KO: '북카페를 나서며', EN: 'Leaving the book café', JP: 'ブックカフェを出て' },
  },
  {
    id: 'monthly-2026-08-model-j-blue-hour-v2',
    src: '/media/brand-models/monthly-2026-08-model-j-blue-hour-v2.webp',
    alt: {
      KO: '이름 없는 도시의 강변에서 업무 후 시간을 확인하는 성인 여행자',
      EN: 'An adult traveller checking the time beside an unnamed city river',
      JP: '場所を特定しない街の川辺で仕事後の時間を確認する成人旅行者',
    },
    caption: { KO: '블루아워의 이동', EN: 'Blue-hour move', JP: 'ブルーアワーの移動' },
  },
]

export function MonthlyModelEditorial() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inViewRef = useRef(false)
  const userPausedRef = useRef(false)
  const trackedRef = useRef(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting
      if (entry.isIntersecting) {
        if (!trackedRef.current) {
          trackedRef.current = true
          trackEditorialAssetView({
            assetId: 'monthly-model-edit-2026-08-v2',
            modelIds: ['WAK-MODEL-E', 'WAK-MODEL-G', 'WAK-MODEL-H', 'WAK-MODEL-J'],
            route: '/about',
            section: 'monthly-model-editorial-2026-08',
            locale: lang,
          })
        }
        if (!reducedMotion && !userPausedRef.current) {
          setShouldLoadVideo(true)
          videoRef.current?.play().catch(() => undefined)
        }
      } else {
        videoRef.current?.pause()
      }
    }, { rootMargin: '180px 0px', threshold: 0.2 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [lang, reducedMotion])

  useEffect(() => {
    if (reducedMotion) {
      videoRef.current?.pause()
    }
  }, [reducedMotion])

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video || reducedMotion) return
    if (video.paused) {
      userPausedRef.current = false
      setShouldLoadVideo(true)
      await video.play().catch(() => undefined)
    } else {
      userPausedRef.current = true
      video.pause()
    }
  }

  return (
    <section ref={sectionRef} className="dark-surface bg-[#091820] px-4 py-20 text-white sm:px-6 md:py-28" data-monthly-model-edit="2026-08">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(17rem,23rem)_1fr] lg:items-start lg:gap-16">
          <div className="relative mx-auto w-full max-w-[23rem] overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#102630] shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
            <video
              ref={videoRef}
              aria-label={COPY.videoLabel[lang]}
              aria-describedby="monthly-model-disclosure"
              className="aspect-[9/16] w-full object-cover"
              autoPlay={!reducedMotion}
              loop
              muted
              playsInline
              poster="/media/brand-models/monthly-2026-08-model-e-city-arrival-v2.webp"
              preload="none"
              src={shouldLoadVideo && !reducedMotion ? '/media/brand-models/monthly-model-edit-2026-08-v2.mp4' : undefined}
              onCanPlay={() => {
                if (inViewRef.current && !userPausedRef.current && !reducedMotion) {
                  videoRef.current?.play().catch(() => undefined)
                }
              }}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
            />
            {!reducedMotion && (
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={isPlaying ? COPY.pause[lang] : COPY.play[lang]}
                className="absolute bottom-4 right-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              </button>
            )}
          </div>

          <div className="min-w-0">
            <span className="text-eyebrow-on-dark block">{COPY.eyebrow[lang]}</span>
            <h2 className="mt-4 max-w-2xl whitespace-pre-line text-3xl font-black leading-[1.08] md:text-5xl">{COPY.title[lang]}</h2>
            <span className="mt-5 block max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">{COPY.description[lang]}</span>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {PHOTOS.map((photo) => (
                <figure key={photo.id} className="min-w-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/6 sm:rounded-2xl">
                    <Image src={photo.src} alt={photo.alt[lang]} fill sizes="(max-width: 1024px) 30vw, 220px" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-[0.68rem] font-bold leading-snug text-white/66 sm:text-xs">{photo.caption[lang]}</figcaption>
                </figure>
              ))}
            </div>

            <span id="monthly-model-disclosure" className="mt-8 block max-w-2xl border-t border-white/12 pt-5 text-xs leading-relaxed text-white/52">
              {COPY.disclosure[lang]}
            </span>
            {reducedMotion && <span className="mt-2 block text-xs text-sky-200/75">{COPY.reduced[lang]}</span>}
          </div>
        </div>
      </div>
    </section>
  )
}
