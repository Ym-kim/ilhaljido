import type { Metadata } from 'next'
import manifest from '@/../public/social/trip-sets/manifest.json'
import { SocialKit, type SocialKitAsset } from '@/components/campaign/SocialKit'

export const metadata: Metadata = {
  title: 'Social Campaign Kit',
  description: 'Wakation 공개 소셜 캠페인 자산과 운영 캡션 도구.',
  alternates: { canonical: 'https://www.wakation.kr/brand/social-kit' },
  robots: { index: false, follow: false, nocache: true },
}

const assets = manifest.assets.map((asset) => ({
  slug: asset.slug,
  locale: asset.locale,
  format: asset.format,
  path: `/social/trip-sets/${asset.path}`,
  width: asset.width,
  height: asset.height,
  bytes: asset.bytes,
  generatedAt: manifest.generatedAt,
})) as SocialKitAsset[]

export default function SocialKitPage() {
  return <SocialKit assets={assets} />
}
