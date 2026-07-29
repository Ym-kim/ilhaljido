'use client'

import { useCallback, useSyncExternalStore } from 'react'
import type { Lang } from '@/lib/i18n/types'
import type { TripMatchAnswer, TripMatchCampaign, TripMatchSlug } from '@/lib/tripMatch'

const KEY = 'wakation.saved.v1'
const EVENT = 'wakation-saved'

export type SavedTripMatch = {
  kind: 'trip_match'
  id: string
  answer: TripMatchAnswer
  resultSlug: TripMatchSlug
  alternativeSlug: TripMatchSlug
  locale: Lang
  campaign?: TripMatchCampaign
  savedAt: string
}

const EMPTY: SavedTripMatch[] = []
let cacheRaw: string | null = null
let cache: SavedTripMatch[] = EMPTY

function isSavedTripMatch(value: unknown): value is SavedTripMatch {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<SavedTripMatch>
  return item.kind === 'trip_match'
    && typeof item.id === 'string'
    && typeof item.resultSlug === 'string'
    && typeof item.alternativeSlug === 'string'
    && (item.locale === 'KO' || item.locale === 'EN' || item.locale === 'JP')
    && typeof item.savedAt === 'string'
    && (item.campaign === undefined || item.campaign === 'japan-short-stay' || item.campaign === 'korea-weekend')
    && !!item.answer
    && typeof item.answer === 'object'
}

function parse(raw: string): SavedTripMatch[] {
  try {
    const value: unknown = JSON.parse(raw)
    return Array.isArray(value) ? value.filter(isSavedTripMatch).slice(0, 20) : []
  } catch {
    return []
  }
}

function getSnapshot() {
  const raw = localStorage.getItem(KEY) ?? '[]'
  if (raw !== cacheRaw) {
    cacheRaw = raw
    cache = parse(raw)
  }
  return cache
}

const getServerSnapshot = () => EMPTY

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener(EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(EVENT, onChange)
  }
}

export function useSavedTripMatches() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const save = useCallback((item: SavedTripMatch) => {
    const current = getSnapshot().filter((saved) => saved.id !== item.id)
    const next = [item, ...current].slice(0, 20)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { id: item.id, added: true } }))
  }, [])

  const remove = useCallback((id: string) => {
    const next = getSnapshot().filter((saved) => saved.id !== id)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { id, added: false } }))
  }, [])

  const toggle = useCallback((item: SavedTripMatch) => {
    const exists = getSnapshot().some((saved) => saved.id === item.id)
    if (exists) remove(item.id)
    else save(item)
    return !exists
  }, [remove, save])

  const has = useCallback((id: string) => items.some((item) => item.id === id), [items])

  return { items, has, save, remove, toggle }
}
