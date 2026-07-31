const VERIFIED_KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_xiPxbXG'

function normalizePublicUrl(value: string | undefined, fallback: string) {
  const candidate = value?.trim()
  if (!candidate) return fallback

  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' ? url.toString() : fallback
  } catch {
    return fallback
  }
}

/**
 * Public contact channel only. The repository fallback is the verified Wakation
 * Kakao Channel URL already used in the footer; deployments can override it.
 */
export const KAKAO_CHANNEL_URL = normalizePublicUrl(
  process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL,
  VERIFIED_KAKAO_CHANNEL_URL,
)
