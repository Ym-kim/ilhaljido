'use client'

import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>
export type HomeHeroVariant = 'production' | 'control-static' | 'video-a' | 'video-b'
type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
  cancelIdleCallback?: (handle: number) => void
}

const COPY: Record<'season' | 'play' | 'pause', L> = {
  season: {
    KO: '늦여름 · 초가을 에디트',
    EN: 'Late summer · early autumn',
    JP: '晩夏・初秋のエディット',
  },
  play: { KO: '배경 영상 재생', EN: 'Play background film', JP: '背景映像を再生' },
  pause: { KO: '배경 영상 일시정지', EN: 'Pause background film', JP: '背景映像を一時停止' },
}

// The poster remains the LCP surface. The optional motion layer only loads
// after the first paint and uses the approved v2.2 A-J roster.
const SEASONAL_FILM_ENABLED = true

const POSTER = {
  desktop: '/media/brand-models/home-hero-model-a-coastal-departure-desktop-v3.webp',
  mobile: '/media/brand-models/home-hero-model-a-coastal-departure-mobile-v3.webp',
} as const

const POSTER_AVIF = {
  desktop: '/media/brand-models/home-hero-model-a-coastal-departure-desktop-v3.avif',
  mobile: '/media/brand-models/home-hero-model-a-coastal-departure-mobile-v3.avif',
} as const

const PROTOTYPE_A_POSTER = {
  desktop: '/media/campaigns/home-hero-prototype-a-poster-desktop-v1.webp',
  mobile: '/media/campaigns/home-hero-prototype-a-poster-mobile-v1.webp',
} as const

const PROTOTYPE_A_POSTER_AVIF = {
  desktop: '/media/campaigns/home-hero-prototype-a-poster-desktop-v1.avif',
  mobile: '/media/campaigns/home-hero-prototype-a-poster-mobile-v1.avif',
} as const

const PROTOTYPE_B_POSTER = {
  desktop: '/media/brand-models/home-hero-model-a-coastal-work-desktop-v2.webp',
  mobile: '/media/brand-models/home-hero-model-a-coastal-work-mobile-v2.webp',
} as const

const PROTOTYPE_B_POSTER_AVIF = {
  desktop: '/media/brand-models/home-hero-model-a-coastal-work-desktop-v2.avif',
  mobile: '/media/brand-models/home-hero-model-a-coastal-work-mobile-v2.avif',
} as const

export function HomeSeasonalHeroMedia({ alt, lang, variant = 'production' }: { alt: string; lang: Lang; variant?: HomeHeroVariant }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [canAnimate, setCanAnimate] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const isPrototypeA = variant === 'video-a'
  const isPrototypeB = variant === 'video-b'
  const isPrototype = isPrototypeA || isPrototypeB
  const poster = isPrototypeA ? PROTOTYPE_A_POSTER : isPrototypeB ? PROTOTYPE_B_POSTER : POSTER
  const posterAvif = isPrototypeA ? PROTOTYPE_A_POSTER_AVIF : isPrototypeB ? PROTOTYPE_B_POSTER_AVIF : POSTER_AVIF

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 768px)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const sync = () => {
      const constrainedNetwork = connection?.effectiveType === 'slow-2g'
        || connection?.effectiveType === '2g'
        || connection?.effectiveType === '3g'
      setCanAnimate(SEASONAL_FILM_ENABLED && variant !== 'control-static' && desktop.matches && !motion.matches && !connection?.saveData && !constrainedNetwork)
    }
    sync()
    motion.addEventListener('change', sync)
    desktop.addEventListener('change', sync)
    return () => {
      motion.removeEventListener('change', sync)
      desktop.removeEventListener('change', sync)
    }
  }, [variant])

  useEffect(() => {
    if (!canAnimate) {
      videoRef.current?.pause()
      return
    }
    const idleWindow = window as IdleWindow
    let idleHandle: number | undefined
    let delayHandle: number | undefined

    const loadVideoAfterPaint = () => {
      // Keep the first interaction window free from the optional film request.
      delayHandle = window.setTimeout(() => setShouldLoadVideo(true), 2200)
    }
    const scheduleVideo = () => {
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(loadVideoAfterPaint, { timeout: 5000 })
      } else {
        delayHandle = window.setTimeout(() => setShouldLoadVideo(true), 4500)
      }
    }

    if (document.readyState === 'complete') scheduleVideo()
    else window.addEventListener('load', scheduleVideo, { once: true })

    return () => {
      window.removeEventListener('load', scheduleVideo)
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle)
      if (delayHandle !== undefined) window.clearTimeout(delayHandle)
    }
  }, [canAnimate])

  useEffect(() => {
    const onVisibilityChange = () => {
      const video = videoRef.current
      if (!video) return
      if (document.hidden) video.pause()
      else if (canAnimate && !userPausedRef.current) video.play().catch(() => undefined)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [canAnimate])

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!canAnimate) return
    if (!video) {
      userPausedRef.current = false
      setShouldLoadVideo(true)
      return
    }
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
    <div className="absolute inset-0" data-home-seasonal-media={isPrototypeA ? 'prototype-a-2026-09' : isPrototypeB ? 'prototype-b-2026-09' : '2026-08'} data-home-hero-variant={variant}>
      <picture className="absolute inset-0 block">
        <source media="(min-width: 768px)" srcSet={posterAvif.desktop} type="image/avif" />
        <source media="(max-width: 767px)" srcSet={posterAvif.mobile} type="image/avif" />
        <source media="(min-width: 768px)" srcSet={poster.desktop} />
        <img
          src={poster.mobile}
          alt={alt}
          width={1080}
          height={1440}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="home-editorial-hero absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {shouldLoadVideo && canAnimate && (
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={poster.desktop}
          className={`home-editorial-hero-film absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          onCanPlay={() => {
            if (!userPausedRef.current) {
              videoRef.current?.play().catch(() => {
                setVideoReady(false)
                setShouldLoadVideo(false)
              })
            }
          }}
          onPlaying={() => setVideoReady(true)}
          onError={() => {
            setVideoReady(false)
            setShouldLoadVideo(false)
          }}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        >
          {isPrototype ? (
            <>
              <source src={`/media/campaigns/home-hero-prototype-${isPrototypeB ? 'b' : 'a'}-desktop-v1.webm`} type="video/webm" />
              <source src={`/media/campaigns/home-hero-prototype-${isPrototypeB ? 'b' : 'a'}-desktop-v1.mp4`} type="video/mp4" />
            </>
          ) : (
            <source src="/media/seasonal/home-seasonal-film-2026-08-desktop-v1.mp4" type="video/mp4" />
          )}
        </video>
      )}

      <div className="absolute right-4 top-24 z-30 flex items-center gap-2 sm:right-6 sm:top-28">
        <span className="hidden rounded-full border border-white/18 bg-[#071722]/52 px-3 py-2 text-[0.65rem] font-bold tracking-[0.08em] text-white/88 backdrop-blur-md sm:inline-flex">
          {isPrototypeA ? 'VIDEO PROTOTYPE A' : isPrototypeB ? 'VIDEO PROTOTYPE B · WORK FIRST' : COPY.season[lang]}
        </span>
        {canAnimate && (
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? COPY.pause[lang] : COPY.play[lang]}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/18 bg-[#071722]/62 text-white backdrop-blur-md transition hover:bg-[#071722]/82 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  )
}
