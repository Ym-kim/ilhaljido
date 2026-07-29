'use client'
import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'

// ─────────────────────────────────────────────────────────────────────────────
// 공유 버튼 — Web Share API(모바일 네이티브 시트: 카톡·LINE 포함) + 클립보드 폴백
// (2026-07-28 라이프스타일 개편 Phase B 최소분. 카카오 SDK 등 외부 스크립트 없이
// OS 공유 시트를 쓰는 저비용 구조 — 공유 이벤트는 share_click으로 계측)
// 서버 페이지(아티클)에도 삽입 가능한 독립 클라이언트 컴포넌트.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const UI: Record<string, L> = {
  share: { KO: '공유하기', EN: 'Share', JP: 'シェアする' },
  copied: { KO: '링크 복사됨', EN: 'Link copied', JP: 'リンクをコピー済み' },
}

export function ShareButton({
  title,
  text,
  /** 지정 없으면 현재 페이지 URL */
  url,
  tone = 'dark',
}: {
  title: string
  text?: string
  url?: string
  tone?: 'dark' | 'light'
}) {
  const { lang } = useLang()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')
    trackEvent('share_click', { title })
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title, text: text ?? title, url: shareUrl })
        return
      }
    } catch {
      // 사용자가 공유 시트를 닫은 경우 등 — 폴백으로 진행하지 않고 종료
      return
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 권한 거부 — 조용히 무시 (버튼은 계속 동작 가능)
    }
  }

  const cls =
    tone === 'dark'
      ? 'border-white/25 text-white/85 hover:border-white/50 hover:text-white'
      : 'border-gray-300 text-gray-600 hover:border-brand-mid hover:text-brand-mid'

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${cls}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" strokeWidth={ICON_STROKE} />
          {UI.copied[lang]}
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" strokeWidth={ICON_STROKE} />
          {UI.share[lang]}
        </>
      )}
    </button>
  )
}
