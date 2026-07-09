'use client'

import { useEffect } from 'react'

// 루트 레이아웃까지 실패했을 때의 최후 폴백 — 프로바이더 밖이라 자체 완결(html/body 포함, 인라인 스타일)
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="ko">
      <body style={{ margin: 0, background: '#0f0f0f', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '420px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>문제가 발생했어요 / Something went wrong</h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', marginBottom: '28px' }}>
              일시적인 오류일 수 있습니다. 다시 시도해 주세요.
            </p>
            <button
              onClick={reset}
              style={{ background: '#0284c7', color: '#fff', border: 0, borderRadius: '999px', padding: '12px 28px', fontWeight: 700, cursor: 'pointer' }}
            >
              다시 시도 / Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
