'use client'

import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>
export type HomeHeroVariant = 'production' | 'control-static' | 'video-story'
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

const STORY_POSTER = {
  desktop: '/media/campaigns/home-hero-polish-poster-desktop-v3.webp',
  mobile: '/media/campaigns/home-hero-polish-poster-mobile-v3.webp',
} as const

const STORY_POSTER_AVIF = {
  desktop: '/media/campaigns/home-hero-polish-poster-desktop-v3.avif',
  mobile: '/media/campaigns/home-hero-polish-poster-mobile-v3.avif',
} as const

const STORY_FILMS = {
  clean: {
    webm: '/media/campaigns/home-hero-clean-v3.webm',
    mp4: '/media/campaigns/home-hero-clean-v3.mp4',
  },
  closeup: {
    webm: '/media/campaigns/home-hero-closeup-v3.webm',
    mp4: '/media/campaigns/home-hero-closeup-v3.mp4',
  },
} as const

function subscribeToPreviewLocation(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}

function getPreviewEdit(): keyof typeof STORY_FILMS {
  return new URLSearchParams(window.location.search).get('hero') === 'hero-closeup' ? 'closeup' : 'clean'
}

export function HomeSeasonalHeroMedia({ alt, lang, variant = 'production' }: { alt: string; lang: Lang; variant?: HomeHeroVariant }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [canAnimate, setCanAnimate] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  // The server and first paint share one poster. Only the deferred film differs.
  // Keep Preview selection local to media; routes and tracking remain unchanged.
  const storyEdit = useSyncExternalStore<keyof typeof STORY_FILMS>(subscribeToPreviewLocation, getPreviewEdit, () => 'clean')
  const isStory = variant === 'video-story'
  const film = STORY_FILMS[storyEdit]
  const poster = isStory ? STORY_POSTER : POSTER
  const posterAvif = isStory ? STORY_POSTER_AVIF : POSTER_AVIF

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
    <div className="absolute inset-0 bg-[#04121f]" data-home-seasonal-media={isStory ? 'story-prototype-2026-09' : '2026-08'} data-home-hero-variant={variant} data-home-hero-edit={isStory ? storyEdit : 'control'}>
      <picture className={`absolute inset-0 block ${isStory ? 'home-editorial-hero-story-frame md:left-auto md:right-0 md:w-[68%]' : ''}`}>
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
          className={`home-editorial-hero absolute inset-0 h-full w-full object-cover ${isStory ? 'home-editorial-hero-story-poster' : ''}`}
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
          className={`home-editorial-hero-film absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isStory ? 'home-editorial-hero-story-frame md:left-auto md:right-0 md:w-[68%]' : ''} ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          onCanPlay={() => {
            if (!userPausedRef.current) {
              videoRef.current?.play().catch(() => {
                setVideoReady(false)
                setShouldLoadVideo(false)
              })
            }
          }}
          onPlaying={() => setVideoReady(true)}
          onTimeUpdate={({ currentTarget: video }) => {
            // Readable QA evidence for decorative media, without timers,
            // analytics events or React renders on each playback tick.
            const surface = video.parentElement
            if (surface) {
              surface.dataset.homeFilmTime = video.currentTime.toFixed(2)
              surface.dataset.homeFilmDuration = video.duration.toFixed(2)
            }
          }}
          onError={() => {
            setVideoReady(false)
            setShouldLoadVideo(false)
          }}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        >
          {isStory ? (
            <>
              <source src={film.webm} type="video/webm" />
              <source src={film.mp4} type="video/mp4" />
            </>
          ) : (
            <source src="/media/seasonal/home-seasonal-film-2026-08-desktop-v1.mp4" type="video/mp4" />
          )}
        </video>
      )}

      {isStory && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[26%] right-[30%] hidden bg-gradient-to-r from-[#04121f] via-[#04121f]/72 to-transparent md:block"
        />
      )}

      <div className="absolute right-4 top-24 z-30 flex items-center gap-2 sm:right-6 sm:top-28">
        <span className="hidden rounded-full border border-white/18 bg-[#071722]/52 px-3 py-2 text-[0.65rem] font-bold tracking-[0.08em] text-white/88 backdrop-blur-md lg:inline-flex">
          {COPY.season[lang]}
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
