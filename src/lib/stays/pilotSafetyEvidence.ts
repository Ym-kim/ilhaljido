export type StayPilotSafetyEvidence = {
  affiliateSafetyFailures: number
  brokenImages: number
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function nonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
}

export function isSafeAgodaAffiliateUrl(value: string, expectedCid: string): boolean {
  try {
    const url = new URL(value)
    const agodaHost = url.hostname === 'agoda.com' || url.hostname.endsWith('.agoda.com')
    return url.protocol === 'https:' && agodaHost && url.searchParams.get('cid') === expectedCid
  } catch {
    return false
  }
}

export function isHealthyProviderImageResponse(status: number, contentType: string | null): boolean {
  return (status === 200 || status === 206) && Boolean(contentType?.toLowerCase().startsWith('image/'))
}

/** Accept only complete, aggregate evidence. Partial or malformed checks remain missing evidence. */
export function parseStayPilotSafetyEvidence(value: unknown): StayPilotSafetyEvidence | null {
  if (!isObject(value) || value.complete !== true) return null
  if (!nonNegativeInteger(value.affiliateSafetyFailures) || !nonNegativeInteger(value.brokenImages)) return null
  return {
    affiliateSafetyFailures: value.affiliateSafetyFailures,
    brokenImages: value.brokenImages,
  }
}
