import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

type SeasonalScene = {
  desktop: string
  mobile: string
  desktopPosition: string
  mobilePosition: string
  desktopScale: [number, number]
  mobileScale: [number, number]
  warmth: string
}

const SCENES: SeasonalScene[] = [
  {
    desktop: 'media/brand-models/home-hero-model-a-coastal-work-desktop-v2.webp',
    mobile: 'media/brand-models/home-hero-model-a-coastal-work-mobile-v2.webp',
    desktopPosition: '70% 48%',
    mobilePosition: '69% 45%',
    desktopScale: [1, 1.025],
    mobileScale: [1, 1.02],
    warmth: 'rgba(238, 198, 137, 0.08)',
  },
  {
    desktop: 'media/seasonal/late-summer-model-f-market-v1.webp',
    mobile: 'media/seasonal/late-summer-model-f-market-v1.webp',
    desktopPosition: '64% 50%',
    mobilePosition: '68% 50%',
    desktopScale: [1, 1.025],
    mobileScale: [1, 1.02],
    warmth: 'rgba(241, 177, 91, 0.11)',
  },
  {
    desktop: 'media/brand-models/programs-model-k-stay-planning-desktop-v1.webp',
    mobile: 'media/brand-models/programs-model-k-stay-planning-mobile-v1.webp',
    desktopPosition: '68% 43%',
    mobilePosition: '58% 40%',
    desktopScale: [1, 1.02],
    mobileScale: [1, 1.015],
    warmth: 'rgba(54, 119, 179, 0.09)',
  },
]

const SEGMENT_FRAMES = 56
const CROSSFADE_FRAMES = 16

function FilmFrame({ scene, progress, opacity, portrait }: {
  scene: SeasonalScene
  progress: number
  opacity: number
  portrait: boolean
}) {
  const image = portrait ? scene.mobile : scene.desktop
  const objectPosition = portrait ? scene.mobilePosition : scene.desktopPosition
  const driftX = interpolate(progress, [0, 1], portrait ? [-3, 3] : [-7, 7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  })
  const driftY = interpolate(progress, [0, 1], [3, -3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  })
  const scale = interpolate(progress, [0, 1], portrait ? scene.mobileScale : scene.desktopScale, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  })

  return (
    <AbsoluteFill style={{ opacity, overflow: 'hidden' }}>
      <Img
        src={staticFile(image)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          translate: `${driftX}px ${driftY}px`,
          scale,
          filter: 'saturate(1.04) contrast(1.035)',
        }}
      />
      <AbsoluteFill style={{ backgroundColor: scene.warmth, mixBlendMode: 'soft-light' }} />
    </AbsoluteFill>
  )
}

export const HomeSeasonalFilm = () => {
  const frame = useCurrentFrame()
  const { width } = useVideoConfig()
  const portrait = width < 1000
  const sceneIndex = Math.floor(frame / SEGMENT_FRAMES) % SCENES.length
  const nextIndex = (sceneIndex + 1) % SCENES.length
  const localFrame = frame % SEGMENT_FRAMES
  const progress = localFrame / (SEGMENT_FRAMES - 1)
  const crossfade = interpolate(
    localFrame,
    [SEGMENT_FRAMES - CROSSFADE_FRAMES, SEGMENT_FRAMES - 1],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    },
  )

  return (
    <AbsoluteFill style={{ backgroundColor: '#071722', overflow: 'hidden' }}>
      <FilmFrame scene={SCENES[sceneIndex]} progress={progress} opacity={1} portrait={portrait} />
      <FilmFrame scene={SCENES[nextIndex]} progress={crossfade * 0.18} opacity={crossfade} portrait={portrait} />
      <AbsoluteFill style={{
        background: portrait
          ? 'linear-gradient(180deg, rgba(4,18,30,0.08) 0%, rgba(4,18,30,0.05) 54%, rgba(4,18,30,0.36) 100%)'
          : 'linear-gradient(90deg, rgba(4,18,30,0.30) 0%, rgba(4,18,30,0.06) 56%, rgba(4,18,30,0.14) 100%)',
      }} />
    </AbsoluteFill>
  )
}
