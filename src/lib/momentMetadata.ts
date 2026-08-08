import type { Metadata } from 'next'
import { getTravelerNote, TRAVELER_NOTES } from '@/lib/moments'
import type { Lang } from '@/lib/i18n/types'

const BASE = 'https://www.wakation.kr'

export function travelerNoteStaticParams() {
  return TRAVELER_NOTES.map((note) => ({ slug: note.slug }))
}

export function travelerNoteMetadata(slug: string, lang: Lang): Metadata {
  const note = getTravelerNote(slug)
  if (!note) return {}
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  const canonical = `${BASE}${prefix}/moments/${note.slug}`
  const languages = {
    ko: `${BASE}/moments/${note.slug}`,
    en: `${BASE}/en/moments/${note.slug}`,
    ja: `${BASE}/ja/moments/${note.slug}`,
    'x-default': `${BASE}/moments/${note.slug}`,
  }
  return {
    title: note.title[lang],
    description: note.summary[lang],
    alternates: { canonical, languages },
    openGraph: {
      title: note.title[lang],
      description: note.summary[lang],
      url: canonical,
      siteName: 'Wakation',
      type: 'article',
      publishedTime: `${note.publishedAt}T00:00:00+09:00`,
      images: [{ url: `${BASE}${note.photo}`, alt: note.photoAlt[lang] }],
    },
    robots: { index: true, follow: true },
  }
}
