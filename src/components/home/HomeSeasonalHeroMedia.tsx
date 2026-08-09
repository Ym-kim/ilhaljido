'use client'

import { getImageProps } from 'next/image'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

const COPY: Record<'season' | 'play' | 'pause', L> = {
  season: {
    KO: '늦여름 · 초가을 에디트',
    EN: 'Late summer · early autumn',
    JP: '晩夏・初秋のエディット',
  },
  play: { KO: '배경 영상 재생', EN: 'Play background film', JP: '背景映像を再生' },
  pause: { KO: '배경 영상 일시정지', EN: 'Pause background film', JP: '背景映像を一時停止' },
}

const POSTER = {
  desktop: '/media/brand-models/home-hero-model-a-coastal-work-desktop-v2.webp',
  mobile: '/media/brand-models/home-hero-model-a-coastal-work-mobile-v2.webp',
} as const

export function HomeSeasonalHeroMedia({ alt, lang }: { alt: string; lang: Lang }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [canAnimate, setCanAnimate] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const common = { alt, sizes: '100vw', loading: 'eager' as const, fetchPriority: 'high' as const }
  const { props: { srcSet: desktopSrcSet } } = getImageProps({
    ...common,
    src: POSTER.desktop,
    width: 1536,
    height: 1024,
    quality: 78,
  })
  const { props: { srcSet: mobileSrcSet, ...mobileProps } } = getImageProps({
    ...common,
    src: POSTER.mobile,
    width: 960,
    height: 1280,
    quality: 78,
  })

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const sync = () => setCanAnimate(!motion.matches && !connection?.saveData)
    sync()
    motion.addEventListener('change', sync)
    return () => motion.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!canAnimate) {
      videoRef.current?.pause()
      return
    }
    const timer = window.setTimeout(() => setShouldLoadVideo(true), 700)
    return () => window.clearTimeout(timer)
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
    if (!video || !canAnimate) return
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
    <div className="absolute inset-0" data-home-seasonal-media="2026-08">
      <picture className="absolute inset-0 block">
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
        <img
          {...mobileProps}
          alt={alt}
          fetchPriority="high"
          loading="eager"
          className="home-editorial-hero absolute inset-0 h-full w-full object-cover object-[64%_34%] md:object-[70%_24%]"
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
          preload="metadata"
          poster={POSTER.desktop}
          className={`absolute inset-0 h-full w-full object-cover object-[58%_38%] transition-opacity duration-700 md:object-[68%_24%] ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          onCanPlay={() => {
            setVideoReady(true)
            if (!userPausedRef.current) videoRef.current?.play().catch(() => undefined)
          }}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        >
          <source media="(max-width: 767px)" src="/media/seasonal/home-seasonal-film-2026-08-mobile-v1.mp4" type="video/mp4" />
          <source src="/media/seasonal/home-seasonal-film-2026-08-desktop-v1.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute right-4 top-24 z-30 flex items-center gap-2 sm:right-6 sm:top-28">
        <span className="hidden rounded-full border border-white/18 bg-[#071722]/52 px-3 py-2 text-[0.65rem] font-bold tracking-[0.08em] text-white/88 backdrop-blur-md sm:inline-flex">
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
