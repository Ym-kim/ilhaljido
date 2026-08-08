import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'

export const FinalScene = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        background: 'radial-gradient(circle at 50% 32%, #183a4a 0%, #0a1720 46%, #050b10 100%)',
        color: 'white',
        display: 'flex',
        fontFamily: 'Arial, Helvetica, sans-serif',
        justifyContent: 'center',
        opacity: interpolate(frame, [0, 0.5 * fps, 2.5 * fps, 3 * fps], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div style={{ textAlign: 'center', translate: interpolate(frame, [0, 1.2 * fps], ['0px 30px', '0px 0px'], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1),
      }) }}>
        <div style={{ fontSize: 116, fontWeight: 800, letterSpacing: -7 }}>Wakation</div>
        <div style={{ margin: '42px auto', height: 3, width: 82, backgroundColor: '#65c7d6' }} />
        <div style={{ fontSize: 31, fontWeight: 700, letterSpacing: 8, color: 'rgba(255,255,255,0.72)' }}>
          STAY · WORK · GROW
        </div>
      </div>
    </AbsoluteFill>
  )
}
