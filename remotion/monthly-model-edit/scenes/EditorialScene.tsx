import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

type EditorialSceneProps = {
  image: string
  overline: string
  title: string
  note: string
  accent: string
  objectPosition: string
  durationInFrames: number
}

export const EditorialScene = ({
  image,
  overline,
  title,
  note,
  accent,
  objectPosition,
  durationInFrames,
}: EditorialSceneProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: '#0b1720', overflow: 'hidden' }}>
      <Img
        src={staticFile(image)}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          objectPosition,
          opacity: interpolate(frame, [0, 0.35 * fps, durationInFrames - 0.45 * fps, durationInFrames], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, durationInFrames], [1.035, 1.11], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.33, 1, 0.68, 1),
          }),
          translate: interpolate(frame, [0, durationInFrames], ['0px 0px', '0px -22px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.33, 1, 0.68, 1),
          }),
        }}
      />
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(5,12,18,0.08) 26%, rgba(5,12,18,0.18) 52%, rgba(5,12,18,0.94) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 'auto 80px 132px',
          color: 'white',
          opacity: interpolate(frame, [0.35 * fps, 0.95 * fps, durationInFrames - 0.8 * fps, durationInFrames - 0.25 * fps], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0.35 * fps, 1.05 * fps], ['0px 42px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: accent, fontSize: 30, fontWeight: 700, letterSpacing: 7 }}>
          <span style={{ display: 'block', width: 58, height: 3, backgroundColor: accent }} />
          {overline}
        </div>
        <div style={{ marginTop: 28, whiteSpace: 'pre-line', fontSize: 98, fontWeight: 700, letterSpacing: -4.5, lineHeight: 0.98 }}>
          {title}
        </div>
        <div style={{ marginTop: 38, color: 'rgba(255,255,255,0.68)', fontSize: 25, fontWeight: 700, letterSpacing: 2.6 }}>
          {note}
        </div>
      </div>
    </AbsoluteFill>
  )
}
