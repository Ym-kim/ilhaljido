import {
  getSupportCatalog,
  getVerificationAgeDays,
  SUPPORT_VERIFICATION_STALE_DAYS,
  SUPPORT_VERIFICATION_WARN_DAYS,
  type SupportDiscoveryStatus,
} from '@/lib/support/catalog'
import type { Lang } from '@/lib/i18n/types'

export type SupportFreshnessState = 'fresh' | 'watch' | 'stale'

export type SupportFreshnessItem = {
  id: string
  slug: string
  name: string
  region: string
  status: SupportDiscoveryStatus
  verifiedAt: string
  ageDays: number
  freshness: SupportFreshnessState
  applicationEnd?: string
  travelEnd?: string
  officialSourceUrl: string
}

export function getSupportFreshnessState(ageDays: number): SupportFreshnessState {
  if (ageDays > SUPPORT_VERIFICATION_STALE_DAYS) return 'stale'
  if (ageDays > SUPPORT_VERIFICATION_WARN_DAYS) return 'watch'
  return 'fresh'
}

export function getSupportFreshnessReport(lang: Lang = 'KO', now = new Date()): SupportFreshnessItem[] {
  return getSupportCatalog(lang, now)
    .map((program) => {
      const ageDays = getVerificationAgeDays(program.verifiedAt, now)
      return {
        id: program.id,
        slug: program.slug,
        name: program.name,
        region: program.region,
        status: program.status,
        verifiedAt: program.verifiedAt,
        ageDays,
        freshness: getSupportFreshnessState(ageDays),
        applicationEnd: program.applicationEnd,
        travelEnd: program.travelEnd,
        officialSourceUrl: program.officialSourceUrl,
      }
    })
    .sort((a, b) => b.ageDays - a.ageDays || a.name.localeCompare(b.name))
}

export function getSupportFreshnessSummary(lang: Lang = 'KO', now = new Date()) {
  const items = getSupportFreshnessReport(lang, now)
  return {
    items,
    total: items.length,
    fresh: items.filter((item) => item.freshness === 'fresh').length,
    watch: items.filter((item) => item.freshness === 'watch').length,
    stale: items.filter((item) => item.freshness === 'stale').length,
    needsReview: items.filter((item) => item.status === 'needs_review').length,
  }
}
