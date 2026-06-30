export type AffiliateCategory = 'hotel' | 'activity' | 'transport' | 'esim' | 'insurance' | 'education' | 'visa'

export interface AffiliateItem {
  id: string
  name: string
  category: AffiliateCategory
  emoji: string
  desc: string
  cta: string
  href: string
  badge?: string
}
