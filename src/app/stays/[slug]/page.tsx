import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink, Laptop, MapPin, ShieldCheck, Wifi } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { listingCityLabel, listingPhotoUrl, type HostListing } from '@/lib/host/hostTypes'
import { ICON_STROKE } from '@/lib/icons'

// ─────────────────────────────────────────────────────────────────────────────
// 호스트 숙소 공개 페이지 (P2, 2026-08-13)
// - RLS(listings_select_public)가 approved 행만 반환 → 미승인은 자동 404
// - 예약·결제는 호스트의 에어비앤비 리스팅에서 — Wakation은 계약의 대리·매개·취차를
//   하지 않는다(법적 가드레일, /host 랜딩과 동일). CTA는 외부 링크 단일.
// - 본문은 호스트 작성 원문(운영자 검수 통과분) — UI 라벨만 KO (파일럿 단계,
//   3언어 라우트 확장은 리스팅 축적 후)
// ─────────────────────────────────────────────────────────────────────────────

type Params = Promise<{ slug: string }>

async function getListing(slug: string): Promise<HostListing | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('host_listings')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'approved')
    .maybeSingle()
  return (data as HostListing | null) ?? null
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) return { title: '숙소를 찾을 수 없습니다' }
  const url = `https://www.wakation.kr/stays/${listing.slug}`
  return {
    title: `${listing.title} — 호스트 숙소`,
    description: listing.summary ?? `${listingCityLabel(listing.city, 'KO')}의 워케이션 숙소 ${listing.title}`,
    alternates: { canonical: url },
    openGraph: {
      title: `${listing.title} | Wakation`,
      description: listing.summary ?? undefined,
      url,
      siteName: 'Wakation',
      ...(listing.photos?.length ? { images: [listingPhotoUrl(listing.photos[0])] } : {}),
    },
  }
}

export default async function StayPage({ params }: { params: Params }) {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) notFound()

  const photos = listing.photos ?? []

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <section className="px-6 pt-14 pb-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-brand-mid text-xs font-black tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            {listingCityLabel(listing.city, 'KO')} · 호스트 숙소
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-black text-gray-900 leading-tight">{listing.title}</h1>
          {listing.summary && <p className="mt-3 text-gray-500 text-lg">{listing.summary}</p>}
        </div>
      </section>

      {/* 사진 */}
      {photos.length > 0 && (
        <section className="px-6 py-8">
          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((p, i) => (
              <div key={p} className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 md:col-span-2 row-span-2 h-64 md:h-80' : 'h-32 md:h-[9.75rem]'}`}>
                <Image
                  src={listingPhotoUrl(p)}
                  alt={`${listing.title} 사진 ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 본문 */}
      <section className="px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {listing.description && (
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{listing.description}</p>
          )}

          {(listing.workspace_desc || listing.wifi_mbps) && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-gray-900">업무 환경</h2>
              {listing.workspace_desc && (
                <div className="flex gap-3 bg-gray-50 rounded-2xl p-5">
                  <Laptop className="shrink-0 w-5 h-5 text-brand-mid" strokeWidth={ICON_STROKE} />
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{listing.workspace_desc}</p>
                </div>
              )}
              {listing.wifi_mbps && (
                <div className="flex gap-3 bg-gray-50 rounded-2xl p-5">
                  <Wifi className="shrink-0 w-5 h-5 text-brand-mid" strokeWidth={ICON_STROKE} />
                  <p className="text-gray-600 text-sm">
                    와이파이 약 {listing.wifi_mbps}Mbps <span className="text-gray-400">— 호스트 자가 실측값 기준</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {listing.local_license && (
            <p className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4" strokeWidth={ICON_STROKE} />
              현지 등록·신고번호: {listing.local_license}
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 bg-[#f0f9ff] border-t border-[#e0f2fe]">
        <div className="max-w-3xl mx-auto text-center">
          <a
            href={listing.airbnb_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[0.9375rem] bg-brand-mid text-white hover:bg-brand-light shadow-md transition-all"
          >
            에어비앤비에서 예약하기
            <ExternalLink className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </a>
          <p className="mt-4 text-xs text-[#64748b] leading-relaxed max-w-lg mx-auto">
            이 페이지는 호스트가 등록하고 Wakation이 검수한 소개 페이지입니다. 예약·결제·환불은
            호스트의 예약 채널(에어비앤비)에서 진행되며, Wakation은 예약 주체가 아닙니다.
          </p>
          <div className="mt-6">
            <Link href="/host" className="text-brand-mid text-sm font-bold hover:underline">
              내 숙소도 소개하고 싶다면 — 호스트 등록 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
