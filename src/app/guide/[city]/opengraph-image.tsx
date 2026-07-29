import { ImageResponse } from 'next/og'
import { getGuide, CITY_GUIDES } from '@/lib/guides'

// ─────────────────────────────────────────────────────────────────────────────
// 도시별 동적 OG 이미지 (2026-07-28 v2) — 카톡·LINE 공유 시 도시명이 즉시 구분되는
// 1200×630 브랜드 카드. 외부 이미지 fetch 없이 텍스트+브랜드 그라디언트만 사용
// (CSP·핫링크·라이선스 리스크 0, 빌드 타임 정적 생성). 전 가이드 도시 자동 커버.
// ─────────────────────────────────────────────────────────────────────────────

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return CITY_GUIDES.map((g) => ({ city: g.slug }))
}

export default async function OgImage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  const guide = getGuide(city)
  const name = guide?.name.KO ?? 'Wakation'
  const nameEn = guide?.name.EN ?? ''
  const tagline = guide?.tagline.KO ?? '일도 여행도, 내 방식대로'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 72,
          background: 'linear-gradient(135deg, #04121f 0%, #0a3552 55%, #0284c7 130%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'absolute', top: 56, left: 72 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(160deg, #7dd3fc, #0369a1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 26,
              fontWeight: 900,
            }}
          >
            W
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>Wakation</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: -3, lineHeight: 1 }}>{name}</div>
          <div style={{ fontSize: 40, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>{nameEn}</div>
        </div>
        <div style={{ marginTop: 22, fontSize: 34, fontWeight: 500, color: 'rgba(255,255,255,0.85)', maxWidth: 1000 }}>
          {tagline}
        </div>
        <div style={{ marginTop: 30, fontSize: 24, fontWeight: 700, color: '#7dd3fc' }}>
          워케이션 가이드 · wakation.kr
        </div>
      </div>
    ),
    size
  )
}
