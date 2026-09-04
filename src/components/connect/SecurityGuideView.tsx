'use client'

import { useEffect, useRef } from 'react'
import type { Lang } from '@/lib/i18n/types'
import { trackConnectSecurity } from '@/lib/connect/securityTracking'

export function SecurityGuideView({ lang }: { lang: Lang }) {
  const seen = useRef('')
  useEffect(() => {
    if (seen.current === lang) return
    seen.current = lang
    trackConnectSecurity('connect_security_view', { placement: 'security_guide',
      locale: lang === 'JP' ? 'ja' : lang === 'EN' ? 'en' : 'ko', audience_type: 'individual' })
  }, [lang])
  return null
}
