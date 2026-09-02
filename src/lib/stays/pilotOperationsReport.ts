import {
  evaluateStayPilotRollout,
  type StayPilotRolloutDecision,
} from './rolloutDecision.ts'

const PILOT_DESTINATION_COHORTS = {
  'japan-fukuoka': 'japan',
  'japan-osaka': 'japan',
  'japan-tokyo': 'japan',
  'korea-busan': 'korea',
  'korea-jeju': 'korea',
  'korea-seoul': 'korea',
} as const

const PILOT_LOCALES = ['ko', 'en', 'ja'] as const
const PILOT_FAILURE_REASONS = [
  'none',
  'configuration_error',
  'timeout',
  'network',
  'http_error',
  'bad_payload',
  'empty_result',
  'adapter_unavailable',
] as const

export type StayPilotCohort = 'japan' | 'korea'
export type StayPilotLocale = (typeof PILOT_LOCALES)[number]
export type StayPilotOperationalMode = 'results' | 'fallback'
export type StayPilotOperationalFailureReason = (typeof PILOT_FAILURE_REASONS)[number]

export type StayPilotOperationalRecord = {
  id: string
  timestamp: number
  destinationId: keyof typeof PILOT_DESTINATION_COHORTS
  cohort: StayPilotCohort
  locale: StayPilotLocale
  mode: StayPilotOperationalMode
  provider: 'agoda' | 'booking'
  failureReason: StayPilotOperationalFailureReason
  latencyMs: number
  resultCount: number
}

export type StayPilotCohortMetrics = {
  searches: number
  successfulResultViews: number
  fallbackViews: number
  successfulResultRate: number
  fallbackRate: number
  bookingClicks: number | null
  searchToBookingRate: number | null
  totalResults: number
  medianResultCount: number
  medianLatencyMs: number
  p75LatencyMs: number
  destinations: Record<string, number>
  locales: Record<StayPilotLocale, number>
  failureReasons: Partial<Record<StayPilotOperationalFailureReason, number>>
}

export type StayPilotReportEvidence = {
  observationDays: number
  bookingClicks?: Partial<Record<StayPilotCohort, number>>
  affiliateSafetyFailures?: number
  brokenImages?: number
}

export type StayPilotOperationalReport = {
  generatedAt: string
  sample: {
    firstTimestamp?: string
    lastTimestamp?: string
    records: number
    observationDays: number
  }
  cohorts: Record<StayPilotCohort, StayPilotCohortMetrics>
  overall: StayPilotCohortMetrics
  rollout: {
    status: StayPilotRolloutDecision['status']
    blockers: StayPilotRolloutDecision['blockers']
    missingEvidence: Array<'booking_clicks' | 'affiliate_link_safety' | 'broken_images'>
    metrics: StayPilotRolloutDecision['metrics']
  }
}

type VercelLogEnvelope = {
  id?: unknown
  timestamp?: unknown
  environment?: unknown
  message?: unknown
}

type StayPilotLogPayload = {
  event?: unknown
  pilot?: unknown
  destination_id?: unknown
  locale?: unknown
  mode?: unknown
  provider?: unknown
  failure_reason?: unknown
  latency_ms?: unknown
  result_count?: unknown
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function boundedInteger(value: unknown, maximum: number): number | null {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 && value <= maximum
    ? value
    : null
}

function safeRate(numerator: number, denominator: number): number {
  return denominator > 0 ? Math.min(1, numerator / denominator) : 0
}

function percentile(values: number[], percentileValue: number): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const index = Math.max(0, Math.ceil(sorted.length * percentileValue) - 1)
  return sorted[index]
}

function countBy<T extends string>(values: T[]): Record<string, number> {
  return values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1
    return counts
  }, {})
}

function aggregate(records: StayPilotOperationalRecord[], bookingClicks?: number): StayPilotCohortMetrics {
  const successfulResultViews = records.filter((record) => record.mode === 'results').length
  const fallbackViews = records.filter((record) => record.mode === 'fallback').length
  const latencies = records.map((record) => record.latencyMs)
  const resultCounts = records.map((record) => record.resultCount)
  const localeCounts = countBy(records.map((record) => record.locale))
  const failureCounts = countBy(
    records
      .filter((record) => record.failureReason !== 'none')
      .map((record) => record.failureReason),
  )

  return {
    searches: records.length,
    successfulResultViews,
    fallbackViews,
    successfulResultRate: safeRate(successfulResultViews, records.length),
    fallbackRate: safeRate(fallbackViews, records.length),
    bookingClicks: bookingClicks ?? null,
    searchToBookingRate: bookingClicks === undefined ? null : safeRate(bookingClicks, records.length),
    totalResults: resultCounts.reduce((sum, value) => sum + value, 0),
    medianResultCount: percentile(resultCounts, 0.5),
    medianLatencyMs: percentile(latencies, 0.5),
    p75LatencyMs: percentile(latencies, 0.75),
    destinations: countBy(records.map((record) => record.destinationId)),
    locales: {
      ko: localeCounts.ko ?? 0,
      en: localeCounts.en ?? 0,
      ja: localeCounts.ja ?? 0,
    },
    failureReasons: failureCounts,
  }
}

/**
 * Parses only the allowlisted operational fields from one Vercel JSONL line.
 * Free-form URLs, dates, guest counts, property names and credentials are discarded.
 */
export function parseStayPilotOperationalLine(line: string): StayPilotOperationalRecord | null {
  let envelope: VercelLogEnvelope
  try {
    const parsed: unknown = JSON.parse(line)
    if (!isObject(parsed)) return null
    envelope = parsed
  } catch {
    return null
  }

  if (envelope.environment !== 'production' || typeof envelope.message !== 'string') return null
  const marker = '[stay-pilot] '
  if (!envelope.message.startsWith(marker)) return null

  let payload: StayPilotLogPayload
  try {
    const parsed: unknown = JSON.parse(envelope.message.slice(marker.length))
    if (!isObject(parsed)) return null
    payload = parsed
  } catch {
    return null
  }

  if (payload.event !== 'stay_search_execution' || payload.pilot !== 'agoda_stay_v1') return null
  if (typeof payload.destination_id !== 'string' || !(payload.destination_id in PILOT_DESTINATION_COHORTS)) return null
  if (typeof payload.locale !== 'string' || !PILOT_LOCALES.includes(payload.locale as StayPilotLocale)) return null
  if (payload.mode !== 'results' && payload.mode !== 'fallback') return null
  if (payload.provider !== 'agoda' && payload.provider !== 'booking') return null
  if (typeof payload.failure_reason !== 'string' || !PILOT_FAILURE_REASONS.includes(payload.failure_reason as StayPilotOperationalFailureReason)) return null

  const timestamp = boundedInteger(envelope.timestamp, Number.MAX_SAFE_INTEGER)
  const latencyMs = boundedInteger(payload.latency_ms, 120_000)
  const resultCount = boundedInteger(payload.result_count, 100)
  if (timestamp === null || latencyMs === null || resultCount === null) return null
  if (payload.mode === 'results' && payload.provider !== 'agoda') return null
  if (payload.mode === 'fallback' && payload.provider !== 'booking') return null
  if (payload.mode === 'results' && payload.failure_reason !== 'none') return null
  if (payload.mode === 'fallback' && payload.failure_reason === 'none') return null

  const destinationId = payload.destination_id as keyof typeof PILOT_DESTINATION_COHORTS
  return {
    id: typeof envelope.id === 'string' && /^[a-z0-9-]{1,128}$/i.test(envelope.id)
      ? envelope.id
      : `${timestamp}-${destinationId}-${payload.mode}-${latencyMs}-${resultCount}`,
    timestamp,
    destinationId,
    cohort: PILOT_DESTINATION_COHORTS[destinationId],
    locale: payload.locale as StayPilotLocale,
    mode: payload.mode,
    provider: payload.provider,
    failureReason: payload.failure_reason as StayPilotOperationalFailureReason,
    latencyMs,
    resultCount,
  }
}

export function parseStayPilotOperationalJsonLines(jsonLines: string): StayPilotOperationalRecord[] {
  const byId = new Map<string, StayPilotOperationalRecord>()
  for (const line of jsonLines.split(/\r?\n/)) {
    const record = parseStayPilotOperationalLine(line.trim())
    if (record) byId.set(record.id, record)
  }
  return [...byId.values()].sort((a, b) => a.timestamp - b.timestamp)
}

export function buildStayPilotOperationalReport(
  records: StayPilotOperationalRecord[],
  evidence: StayPilotReportEvidence,
): StayPilotOperationalReport {
  const safeObservationDays = Number.isFinite(evidence.observationDays)
    ? Math.max(0, Math.floor(evidence.observationDays))
    : 0
  const uniqueRecords = [...new Map(records.map((record) => [record.id, record])).values()]
    .sort((a, b) => a.timestamp - b.timestamp)
  const japanBookingClicks = boundedInteger(evidence.bookingClicks?.japan, Number.MAX_SAFE_INTEGER)
  const koreaBookingClicks = boundedInteger(evidence.bookingClicks?.korea, Number.MAX_SAFE_INTEGER)
  const bookingClicks = japanBookingClicks !== null && koreaBookingClicks !== null
    ? japanBookingClicks + koreaBookingClicks
    : null
  const japan = aggregate(uniqueRecords.filter((record) => record.cohort === 'japan'), japanBookingClicks ?? undefined)
  const korea = aggregate(uniqueRecords.filter((record) => record.cohort === 'korea'), koreaBookingClicks ?? undefined)
  const overall = aggregate(uniqueRecords, bookingClicks ?? undefined)
  const affiliateSafetyFailures = boundedInteger(evidence.affiliateSafetyFailures, Number.MAX_SAFE_INTEGER)
  const brokenImages = boundedInteger(evidence.brokenImages, Number.MAX_SAFE_INTEGER)
  const missingEvidence: StayPilotOperationalReport['rollout']['missingEvidence'] = []
  if (bookingClicks === null) missingEvidence.push('booking_clicks')
  if (affiliateSafetyFailures === null) missingEvidence.push('affiliate_link_safety')
  if (brokenImages === null) missingEvidence.push('broken_images')

  const decision = evaluateStayPilotRollout({
    observationDays: safeObservationDays,
    searches: overall.searches,
    successfulResultViews: overall.successfulResultViews,
    fallbackViews: overall.fallbackViews,
    unavailableViews: 0,
    bookingClicks: bookingClicks ?? 0,
    p75LatencyMs: overall.p75LatencyMs,
    affiliateSafetyFailures: affiliateSafetyFailures ?? 0,
    brokenImages: brokenImages ?? 0,
  })
  const status = missingEvidence.length > 0 && decision.status === 'eligible_for_operator_review'
    ? 'collecting'
    : decision.status

  return {
    generatedAt: new Date().toISOString(),
    sample: {
      firstTimestamp: uniqueRecords[0] ? new Date(uniqueRecords[0].timestamp).toISOString() : undefined,
      lastTimestamp: uniqueRecords.at(-1) ? new Date(uniqueRecords.at(-1)!.timestamp).toISOString() : undefined,
      records: uniqueRecords.length,
      observationDays: safeObservationDays,
    },
    cohorts: { japan, korea },
    overall,
    rollout: {
      status,
      blockers: decision.blockers,
      missingEvidence,
      metrics: decision.metrics,
    },
  }
}
