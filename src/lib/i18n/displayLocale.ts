import type { Lang } from './types'

export type DisplayLocale = Lang | 'ZH'

export function displayLocaleTag(locale: DisplayLocale): string {
  if (locale === 'KO') return 'ko-KR'
  if (locale === 'JP') return 'ja-JP'
  if (locale === 'ZH') return 'zh-CN'
  return 'en-US'
}

export function displayLocalePath(locale: DisplayLocale): string {
  if (locale === 'EN') return '/en'
  if (locale === 'JP') return '/ja'
  if (locale === 'ZH') return '/zh'
  return ''
}
