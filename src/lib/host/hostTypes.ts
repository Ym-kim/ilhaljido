import type { Lang } from '@/lib/i18n/types'

// 호스트 셀프서비스 P2 (2026-08-13) — supabase/20260813_host_self_service.sql 과 1:1

export type HostStatus = 'pending' | 'approved' | 'suspended'
export type ListingStatus = 'draft' | 'submitted' | 'approved' | 'rejected'

export type Host = {
  id: string
  user_id: string
  display_name: string
  contact_email: string
  contact_phone: string | null
  airbnb_profile_url: string | null
  status: HostStatus
  admin_memo: string | null
  created_at: string
  updated_at: string
}

export type HostListing = {
  id: string
  host_id: string
  slug: string | null
  city: string
  title: string
  summary: string | null
  description: string | null
  airbnb_url: string
  local_license: string | null
  wifi_mbps: number | null
  workspace_desc: string | null
  photos: string[]
  status: ListingStatus
  admin_memo: string | null
  created_at: string
  updated_at: string
}

/** 파일럿 도시 — 확장 시 여기에만 추가 */
export const LISTING_CITIES: { id: string; label: Record<Lang, string> }[] = [
  { id: 'bali', label: { KO: '발리', EN: 'Bali', JP: 'バリ' } },
  { id: 'osaka', label: { KO: '오사카', EN: 'Osaka', JP: '大阪' } },
  { id: 'other', label: { KO: '기타', EN: 'Other', JP: 'その他' } },
]

export function listingCityLabel(cityId: string, lang: Lang): string {
  return LISTING_CITIES.find((c) => c.id === cityId)?.label[lang] ?? cityId
}

/** storage 경로 → 공개 URL (host-listings 버킷은 public) */
export function listingPhotoUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  return `${base}/storage/v1/object/public/host-listings/${path}`
}
