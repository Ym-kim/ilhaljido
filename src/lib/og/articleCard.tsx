import { ImageResponse } from 'next/og'

// ─────────────────────────────────────────────────────────────────────────────
// 아티클 공용 OG 카드 (2026-08-07)
//
// 배경: 아티클 페이지들이 metadata.openGraph를 정의하면서 images를 빠뜨려
// **루트 layout의 og:image를 덮어쓰고 있었다** → og:image가 아예 없어
// 카톡·LINE·페북 공유 시 이미지가 뜨지 않았음(twitter:image만 루트값으로 남음).
//
// 가이드·컬렉션과 동일한 파일 컨벤션(opengraph-image.tsx)으로 해결한다.
// 외부 이미지 fetch 없이 텍스트+브랜드 그라디언트만 사용 —
// CSP·핫링크·라이선스 리스크 0, 빌드 타임 정적 생성.
//
// ⚠️ 이 카드를 쓰는 라우트의 metadata.openGraph에 images를 명시하면 파일 컨벤션이
//    덮어써진다(가이드 OG에서 확인된 함정). images는 넣지 말 것.
// ─────────────────────────────────────────────────────────────────────────────

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

type ArticleOgProps = {
  /** 카드 큰 제목 — 아티클 주제(예: '부산–오사카 크루즈') */
  title: string
  /** 제목 아래 한 줄 설명 */
  subtitle: string
  /** 좌상단 브랜드 옆 카테고리 라벨(예: '크루즈 워케이션') */
  eyebrow: string
}

export function renderArticleOg({ title, subtitle, eyebrow }: ArticleOgProps) {
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

        <div style={{ fontSize: 24, fontWeight: 700, color: '#7dd3fc', marginBottom: 18 }}>{eyebrow}</div>
        <div style={{ fontSize: 78, fontWeight: 900, letterSpacing: -2.5, lineHeight: 1.12, maxWidth: 1010 }}>
          {title}
        </div>
        <div style={{ marginTop: 24, fontSize: 32, fontWeight: 500, color: 'rgba(255,255,255,0.85)', maxWidth: 1000 }}>
          {subtitle}
        </div>
        <div style={{ marginTop: 30, fontSize: 22, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
          wakation.kr
        </div>
      </div>
    ),
    OG_SIZE,
  )
}
