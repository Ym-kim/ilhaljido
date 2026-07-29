'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Check, Copy, Download, ExternalLink } from 'lucide-react'
import {
  CAMPAIGN_PLATFORM_LABELS,
  getCampaignCaption,
  type CampaignPlatform,
  type SocialLocale,
} from '@/data/social-campaigns'
import { buildSocialUtm, withCampaignUtm } from '@/lib/campaignTracking'
import type { SocialFormat, TripSetSlug } from '@/lib/tripSetCampaign'
import type { Lang } from '@/lib/i18n/types'
import { trackEvent } from '@/lib/track'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'

export type SocialKitAsset = {
  slug: TripSetSlug
  locale: SocialLocale
  format: SocialFormat
  path: string
  width: number
  height: number
  bytes: number
  generatedAt: string
}

const CAMPAIGNS: { slug: TripSetSlug; name: Record<SocialLocale, string>; campaign: string }[] = [
  { slug: 'fukuoka-3n4d', name: { ko: '후쿠오카', ja: '福岡' }, campaign: 'tripset_fukuoka_2026' },
  { slug: 'osaka-friends', name: { ko: '오사카', ja: '大阪' }, campaign: 'tripset_osaka_2026' },
  { slug: 'seoul-3n4d', name: { ko: '서울', ja: 'ソウル' }, campaign: 'tripset_seoul_2026' },
  { slug: 'busan-weekend', name: { ko: '부산', ja: '釜山' }, campaign: 'tripset_busan_2026' },
]

const FORMATS: { id: SocialFormat; label: string }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'story', label: 'Story' },
  { id: 'square', label: 'Square' },
  { id: 'og', label: 'OG' },
]

const PLATFORMS = Object.keys(CAMPAIGN_PLATFORM_LABELS) as CampaignPlatform[]

const UI: Record<Lang, Record<string, string>> = {
  KO: {
    eyebrow: 'WAKATION BRAND DESK', title: 'Social Campaign Kit', lead: '32개 캠페인 이미지와 캡션, 추적 링크를 한 화면에서 준비합니다.',
    campaign: '캠페인', format: '형식', language: '언어', channel: '배포 채널', preview: '이미지 미리보기',
    open: '원본 열기', download: '이미지 다운로드', caption: '추천 캡션', copyCaption: '캡션 복사',
    link: '공유 링크', copyLink: '링크 복사', utm: 'UTM 링크', copyUtm: 'UTM 복사',
    generated: '마지막 생성', copiedCaption: '캡션을 복사했습니다.', copiedLink: '공유 링크를 복사했습니다.',
    copiedUtm: 'UTM 링크를 복사했습니다.', copyFailed: '클립보드 권한을 확인해 주세요.', publicOnly: '공개 가능한 브랜드 자산만 포함됩니다.',
  },
  EN: {},
  JP: {
    eyebrow: 'WAKATION BRAND DESK', title: 'Social Campaign Kit', lead: '32点のキャンペーン画像・投稿文・計測リンクを一画面で準備できます。',
    campaign: 'キャンペーン', format: '形式', language: '言語', channel: '配信チャネル', preview: '画像プレビュー',
    open: '原寸を開く', download: '画像をダウンロード', caption: 'おすすめ投稿文', copyCaption: '投稿文をコピー',
    link: '共有リンク', copyLink: 'リンクをコピー', utm: 'UTMリンク', copyUtm: 'UTMをコピー',
    generated: '最終生成', copiedCaption: '投稿文をコピーしました。', copiedLink: '共有リンクをコピーしました。',
    copiedUtm: 'UTMリンクをコピーしました。', copyFailed: 'クリップボードの権限をご確認ください。', publicOnly: '公開可能なブランド素材のみを掲載しています。',
  },
}

function formatBytes(bytes: number) {
  return `${Math.round(bytes / 1024)} KB`
}

export function SocialKit({ assets }: { assets: SocialKitAsset[] }) {
  const { lang: contextLang, setLang } = useLang()
  const [slug, setSlug] = useState<TripSetSlug>('fukuoka-3n4d')
  const [locale, setLocale] = useState<SocialLocale>('ko')
  const [format, setFormat] = useState<SocialFormat>('feed')
  const [platform, setPlatform] = useState<CampaignPlatform>('instagram_feed')
  const [message, setMessage] = useState('')

  const lang: Lang = locale === 'ja' ? 'JP' : 'KO'
  const ui = UI[lang]
  const campaign = CAMPAIGNS.find((item) => item.slug === slug) ?? CAMPAIGNS[0]
  const asset = assets.find((item) => item.slug === slug && item.locale === locale && item.format === format)
  const caption = getCampaignCaption(slug, locale, platform)
  const content = `${format}_${locale}`
  const baseUrl = `https://www.wakation.kr${caption.targetUrl}`
  const utmUrl = `https://www.wakation.kr${withCampaignUtm(caption.targetUrl, buildSocialUtm(platform, campaign.campaign, content))}`
  const captionText = `${caption.headline}\n\n${caption.body}\n\n${caption.hashtags.map((tag) => `#${tag}`).join(' ')}`

  const imageAlt = `${campaign.name[locale]} ${format} ${locale.toUpperCase()} social campaign asset`

  useEffect(() => {
    const nextLang: Lang = locale === 'ja' ? 'JP' : 'KO'
    if (contextLang !== nextLang) setLang(nextLang)
    // Locale selector controls the kit and global chrome together.
  }, [contextLang, locale, setLang])

  const copy = async (value: string, kind: 'caption' | 'link' | 'utm') => {
    try {
      await navigator.clipboard.writeText(value)
      const nextMessage = kind === 'caption' ? ui.copiedCaption : kind === 'utm' ? ui.copiedUtm : ui.copiedLink
      setMessage(nextMessage)
      window.setTimeout(() => setMessage(''), 2400)
      trackEvent(kind === 'caption' ? 'campaign_caption_copy' : 'campaign_link_copy', {
        campaign: campaign.campaign,
        destination: slug,
        locale,
        source: platform,
        content,
      })
    } catch {
      setMessage(ui.copyFailed)
    }
  }

  if (!asset) return null

  return (
    <main className="min-h-screen bg-[#f5f2eb] px-4 py-10 text-[#142431] sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-5 border-b border-[#d8d3c9] pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="text-[0.66rem] font-extrabold tracking-[0.2em] text-[#317b98]">{ui.eyebrow}</span>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">{ui.title}</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[#68747d]">{ui.lead}</p>
          </div>
          <span className="text-xs font-bold text-[#839098]">{ui.publicOnly}</span>
        </header>

        <section className="mt-8 grid gap-5 rounded-[1.5rem] border border-[#d8d3c9] bg-white p-4 shadow-[0_12px_40px_rgba(29,44,52,.06)] sm:p-6 lg:grid-cols-4">
          <fieldset className="min-w-0">
            <legend className="mb-2 text-xs font-extrabold text-[#68747d]">{ui.campaign}</legend>
            <div className="grid grid-cols-2 gap-2">
              {CAMPAIGNS.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSlug(item.slug)}
                  aria-pressed={slug === item.slug}
                  className={`min-w-0 rounded-xl border px-3 py-2 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b4b69] ${slug === item.slug ? 'border-[#0b4b69] bg-[#e7f1f3] text-[#0b4b69]' : 'border-[#e0e3e2] text-[#5f6d75] hover:border-[#a7bcc3]'}`}
                >
                  {item.name[locale]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="mb-2 text-xs font-extrabold text-[#68747d]">{ui.format}</legend>
            <div className="grid grid-cols-2 gap-2">
              {FORMATS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormat(item.id)}
                  aria-pressed={format === item.id}
                  className={`rounded-xl border px-3 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b4b69] ${format === item.id ? 'border-[#0b4b69] bg-[#e7f1f3] text-[#0b4b69]' : 'border-[#e0e3e2] text-[#5f6d75] hover:border-[#a7bcc3]'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="mb-2 text-xs font-extrabold text-[#68747d]">{ui.language}</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['ko', 'ja'] as SocialLocale[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLocale(item)}
                  aria-pressed={locale === item}
                  className={`rounded-xl border px-3 py-2 text-sm font-extrabold uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b4b69] ${locale === item ? 'border-[#0b4b69] bg-[#e7f1f3] text-[#0b4b69]' : 'border-[#e0e3e2] text-[#5f6d75] hover:border-[#a7bcc3]'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="min-w-0 text-xs font-extrabold text-[#68747d]">
            {ui.channel}
            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value as CampaignPlatform)}
              className="mt-2 w-full min-w-0 rounded-xl border border-[#d9dfdf] bg-white px-3 py-2.5 text-sm font-bold text-[#253b49] outline-none focus:border-[#0b4b69] focus:ring-2 focus:ring-[#0b4b69]/15"
            >
              {PLATFORMS.map((item) => <option key={item} value={item}>{CAMPAIGN_PLATFORM_LABELS[item]}</option>)}
            </select>
          </label>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)]">
          <section className="min-w-0 rounded-[1.6rem] border border-[#d8d3c9] bg-[#091b27] p-4 shadow-[0_18px_55px_rgba(15,35,47,.12)] sm:p-6">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div className="dark-surface">
                <span className="block text-[0.66rem] font-extrabold tracking-[0.18em] text-[#82c8df]">{ui.preview}</span>
                <span className="mt-1 block text-lg font-black text-white">{campaign.name[locale]} · {format.toUpperCase()}</span>
              </div>
              <span className="text-xs font-bold text-white/48">{asset.width}×{asset.height} · {formatBytes(asset.bytes)}</span>
            </div>
            <div className="relative mx-auto max-h-[68vh] min-h-80 w-full overflow-hidden rounded-2xl bg-black/20" style={{ aspectRatio: `${asset.width}/${asset.height}` }}>
              <Image src={asset.path} alt={imageAlt} fill sizes="(max-width: 1279px) 100vw, 46vw" className="object-contain" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={asset.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/18 px-4 py-2 text-xs font-extrabold text-white/82 transition hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} /> {ui.open}
              </a>
              <a
                href={asset.path}
                download
                onClick={() => trackEvent('social_asset_download', { campaign: campaign.campaign, destination: slug, locale, source: platform, content })}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#0b4b69] transition hover:bg-[#eaf5f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} /> {ui.download}
              </a>
            </div>
            <span className="mt-4 block text-[0.68rem] font-semibold text-white/38">{ui.generated} · {asset.generatedAt}</span>
          </section>

          <section className="grid min-w-0 gap-4">
            <KitPanel title={ui.caption} action={ui.copyCaption} onCopy={() => copy(captionText, 'caption')}>
              <pre className="whitespace-pre-wrap break-words font-sans text-sm font-medium leading-6 text-[#43545e]">{captionText}</pre>
            </KitPanel>
            <KitPanel title={ui.link} action={ui.copyLink} onCopy={() => copy(baseUrl, 'link')}>
              <code className="block break-all text-xs font-semibold leading-5 text-[#43545e]">{baseUrl}</code>
            </KitPanel>
            <KitPanel title={ui.utm} action={ui.copyUtm} onCopy={() => copy(utmUrl, 'utm')}>
              <code className="block break-all text-xs font-semibold leading-5 text-[#43545e]">{utmUrl}</code>
            </KitPanel>
            <div aria-live="polite" className="min-h-6 px-2 text-xs font-extrabold text-[#0b6b57]">
              {message && <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />{message}</span>}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function KitPanel({ title, action, onCopy, children }: { title: string; action: string; onCopy: () => void; children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-[1.4rem] border border-[#d8d3c9] bg-white p-5 shadow-[0_10px_30px_rgba(29,44,52,.05)] sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-black text-[#142431]">{title}</h2>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#cfd9da] px-3 py-1.5 text-xs font-extrabold text-[#0b4b69] transition hover:border-[#0b4b69] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b4b69]"
        >
          <Copy className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} /> {action}
        </button>
      </div>
      <div className="min-w-0 rounded-xl bg-[#f5f7f5] p-4">{children}</div>
    </div>
  )
}
