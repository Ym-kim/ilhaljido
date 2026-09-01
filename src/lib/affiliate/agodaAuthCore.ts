export type AgodaAuthorizationResult =
  | { ok: true; authorization: string }
  | {
      ok: false
      reason: 'missing_site_id' | 'missing_key' | 'configuration_error'
    }

/**
 * Normalise the credential format Agoda supplies without ever logging it.
 *
 * Agoda may store the API credential either as a raw key or as the complete
 * `siteId:key` Authorization value. A colon belonging to another prefix is
 * treated as a configuration error so no request is sent with guessed auth.
 */
export function buildAgodaAuthorization(
  siteIdInput: string | undefined,
  storedKeyInput: string | undefined,
): AgodaAuthorizationResult {
  const siteId = siteIdInput?.trim()
  const storedKey = storedKeyInput?.trim()

  if (!siteId) return { ok: false, reason: 'missing_site_id' }
  if (!storedKey) return { ok: false, reason: 'missing_key' }

  const expectedPrefix = `${siteId}:`
  if (storedKey.startsWith(expectedPrefix)) {
    return { ok: true, authorization: storedKey }
  }

  if (storedKey.includes(':')) {
    return { ok: false, reason: 'configuration_error' }
  }

  return { ok: true, authorization: `${expectedPrefix}${storedKey}` }
}
