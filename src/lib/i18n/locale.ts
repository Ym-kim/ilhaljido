import type { Lang } from './types'

export type Loc<T> = Record<Lang, T>

export function loc<T>(ko: T, en: T, jp: T): Loc<T> {
  return { KO: ko, EN: en, JP: jp }
}

export function tloc<T>(lang: Lang, value: Loc<T>): T {
  return value[lang] ?? value.KO
}
