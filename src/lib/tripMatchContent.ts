import type { AffiliateItem } from '@/lib/affiliate/types'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { getCollection } from '@/lib/affiliate/collections'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import type { Lang } from '@/lib/i18n/types'
import { TRIP_MATCH_SLUGS, type TripMatchSlug } from '@/lib/tripMatch'

export type TripMatchPracticalNote = {
  type: string
  label: string
  value: string
  source?: string
  verifiedAt?: string
}

export type TripMatchTripContent = {
  slug: TripMatchSlug
  title: string
  tagline: string
  duration: string
  companion: string
  image: string
  imageAlt: string
  imagePosition?: string
  items: AffiliateItem[]
  practicalNotes: TripMatchPracticalNote[]
}

const ACTIVE_STATUSES = new Set(['active_affiliate', 'api_ready'])
const PRODUCT_ORDER = ['stay', 'esim', 'activity', 'transport'] as const

function selectPreparationItems(items: AffiliateItem[]) {
  const active = items.filter((item) => ACTIVE_STATUSES.has(item.status))
  const selected: AffiliateItem[] = []

  for (const productType of PRODUCT_ORDER) {
    const item = active.find((candidate) => candidate.productType === productType && !selected.includes(candidate))
    if (item) selected.push(item)
    if (selected.length === 3) break
  }

  for (const item of active) {
    if (!selected.includes(item)) selected.push(item)
    if (selected.length === 3) break
  }

  return selected
}

export function getTripMatchTripContent(lang: Lang): TripMatchTripContent[] {
  return TRIP_MATCH_SLUGS.map((slug) => {
    const collection = getCollection(slug)
    if (!collection?.durationLabel || !collection.companions) {
      throw new Error(`Trip Match collection is incomplete: ${slug}`)
    }

    const items = getCatalogItems(collection.itemIds).map((item) => localizeAffiliateItem(item, lang))

    return {
      slug,
      title: collection.title[lang],
      tagline: collection.tagline[lang],
      duration: collection.durationLabel[lang],
      companion: collection.companions[lang],
      image: collection.photo,
      imageAlt: collection.photoAlt?.[lang] ?? collection.title[lang],
      imagePosition: collection.photoPosition,
      items: selectPreparationItems(items),
      practicalNotes: (collection.comfortFacts ?? []).slice(0, 4).map((note) => ({
        type: note.type,
        label: note.label[lang],
        value: note.value[lang],
        ...(note.source ? { source: note.source } : {}),
        ...(note.verifiedAt ? { verifiedAt: note.verifiedAt } : {}),
      })),
    }
  })
}
