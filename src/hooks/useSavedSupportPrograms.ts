'use client'

import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'wakation.support.saved.v1'
const EVENT = 'wakation-support-saved'
const EMPTY: string[] = []

function parse(value: string | null) {
  if (!value) return EMPTY
  try {
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : EMPTY
  } catch {
    return EMPTY
  }
}

let cachedRaw: string | null = null
let cachedValue: string[] = EMPTY

function getSnapshot() {
  if (typeof window === 'undefined') return EMPTY
  const raw = window.localStorage.getItem(KEY)
  if (raw === cachedRaw) return cachedValue
  cachedRaw = raw
  cachedValue = parse(raw)
  return cachedValue
}

function subscribe(callback: () => void) {
  const onChange = () => callback()
  window.addEventListener(EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function useSavedSupportPrograms() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)

  const toggle = useCallback((id: string) => {
    const current = getSnapshot()
    const added = !current.includes(id)
    const next = added ? [...current, id] : current.filter((item) => item !== id)
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next))
      cachedRaw = null
    } catch {
      return false
    }
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { id, added } }))
    return added
  }, [])

  const has = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, has, toggle }
}

