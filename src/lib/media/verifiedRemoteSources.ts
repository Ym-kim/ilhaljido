import sources from '@/lib/media/verifiedRemoteSources.json'

export type VerifiedRemoteMediaSource = {
  key: string
  src: string
  sourceType: 'licensed'
  license: string
  sourcePage?: string
  photographer?: string
  location?: string
  verifiedAt: string
  visualStatus: 'verified'
  sourceUrls: string[]
  files: string[]
  usages: Array<'support' | 'destination' | 'product' | 'program'>
  contexts: Array<{ file: string; line: number; label: string }>
  width: number
  height: number
  bytes: number
  sha256: string
}

export const VERIFIED_REMOTE_MEDIA_SOURCES = sources as VerifiedRemoteMediaSource[]
