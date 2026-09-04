'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { EditorialBanner } from '@/components/editorial/EditorialBanner'
import type { Lang } from '@/lib/i18n/types'
import { localizeHref } from '@/lib/i18n/localePath'
import { SECURITY_GUIDE_COPY, SECURITY_GUIDE_PATH } from '@/lib/connect/securityGuide'
import type { SecurityPlacement } from '@/lib/connect/securityPartners'
import { trackConnectSecurity } from '@/lib/connect/securityTracking'

export function ConnectSecurityCard({ lang, placement }: { lang: Lang; placement: Exclude<SecurityPlacement, 'security_guide'> }) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useRef('')
  const business = placement === 'business_readiness'
  const copy = SECURITY_GUIDE_COPY[lang]
  const context = { placement, locale: lang === 'JP' ? 'ja' as const : lang === 'EN' ? 'en' as const : 'ko' as const,
    audience_type: business ? 'business' as const : 'individual' as const }
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const key = `${placement}:${lang}`
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && seen.current !== key) {
        seen.current = key
        trackConnectSecurity('connect_security_view', { placement,
          locale: lang === 'JP' ? 'ja' : lang === 'EN' ? 'en' : 'ko',
          audience_type: placement === 'business_readiness' ? 'business' : 'individual' })
        observer.disconnect()
      }
    }, { threshold: 0.25 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [placement, lang])

  return (
    <div ref={ref} data-connect-security={placement} className="mt-6"
      onClickCapture={(event) => {
        if ((event.target as HTMLElement).closest('a')) trackConnectSecurity('connect_security_guide_click', context)
      }}>
      {business ? (
        <aside className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-wider text-brand-mid">REMOTE WORK READINESS</p>
          <h3 className="mt-2 text-lg font-bold text-[#111827]">{copy.businessTitle}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748b]">{copy.businessBody}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {copy.businessItems.map(item => <li key={item} className="flex items-start gap-2 text-sm text-[#475569]">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-mid" />{item}
            </li>)}
          </ul>
          <Link href={localizeHref(SECURITY_GUIDE_PATH, lang)} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-mid">
            {copy.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>
          <p className="mt-2 max-w-3xl text-xs leading-5 text-[#64748b]">{copy.disclaimer}</p>
        </aside>
      ) : (
        <EditorialBanner href={localizeHref(SECURITY_GUIDE_PATH, lang)} eyebrow={copy.category}
          title={copy.cardTitle} sub={copy.cardSub} cta={copy.cta} />
      )}
    </div>
  )
}
