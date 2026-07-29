import { ImageResponse } from 'next/og'
import { COLLECTIONS, getCollection } from '@/lib/affiliate/collections'

// ─────────────────────────────────────────────────────────────────────────────
// 컬렉션별 동적 OG 이미지 (2026-07-28 v2) — 가이드 OG와 동일 브랜드 시스템.
// 텍스트+그라디언트만 사용(외부 fetch 0), 전 컬렉션 자동 커버.
// ─────────────────────────────────────────────────────────────────────────────

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }))
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const col = getCollection(slug)
  const title = col?.title.KO ?? 'Wakation 기획전'
  const desc = col?.tagline.KO ?? '일도 여행도, 내 방식대로'

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
          background: 'linear-gradient(135deg, #0a1628 0%, #0f1f3d 55%, #0284c7 140%)',
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
        <div style={{ fontSize: 26, fontWeight: 800, color: '#7dd3fc', marginBottom: 18, letterSpacing: 2 }}>
          COLLECTION
        </div>
        <div style={{ fontSize: 84, fontWeight: 900, letterSpacing: -2, lineHeight: 1.08, maxWidth: 1050 }}>{title}</div>
        <div style={{ marginTop: 22, fontSize: 32, fontWeight: 500, color: 'rgba(255,255,255,0.8)', maxWidth: 1000 }}>
          {desc}
        </div>
        <div style={{ marginTop: 28, fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
          워케이션 기획전 · wakation.kr
        </div>
      </div>
    ),
    size
  )
}
