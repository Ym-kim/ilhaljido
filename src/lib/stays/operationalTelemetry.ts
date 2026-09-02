import 'server-only'

import type { Lang } from '@/lib/i18n/types'
import type { StaySearchExecution } from '@/lib/stays/liveSearch'

type StaySearchOperationalInput = {
  destinationId: string
  locale: Lang
  execution: StaySearchExecution
}

/**
 * A deliberately narrow server log for pilot reliability measurement.
 * It cannot accept dates, guest counts, property URLs, credentials or free-form destinations.
 */
export function logStaySearchExecution({ destinationId, locale, execution }: StaySearchOperationalInput): void {
  const resultCount = execution.mode === 'results' ? execution.results.length : 0
  const record = {
    event: 'stay_search_execution',
    pilot: 'agoda_stay_v1',
    destination_id: destinationId,
    locale: locale === 'JP' ? 'ja' : locale.toLowerCase(),
    mode: execution.mode,
    provider: execution.provider,
    fallback_from: execution.mode === 'fallback' ? execution.fallbackFrom : 'none',
    failure_reason: execution.mode === 'fallback' ? execution.reason : 'none',
    latency_ms: Math.max(0, Math.round(execution.latencyMs)),
    result_count: resultCount,
  }

  console.info(`[stay-pilot] ${JSON.stringify(record)}`)
}
