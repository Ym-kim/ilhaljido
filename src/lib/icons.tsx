import {
  Home,
  Globe2,
  LineChart,
  Languages,
  Ship,
  GraduationCap,
  Landmark,
  Building2,
  BookOpen,
  MessageCircle,
  Plane,
  Briefcase,
  Building,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export const ICON_STROKE = 1.75

export type CategoryColor = 'teal' | 'blue' | 'orange' | 'rose' | 'cyan' | 'green'

export const CATEGORY_ICONS: Record<CategoryColor, LucideIcon> = {
  teal: Home,
  blue: Globe2,
  orange: LineChart,
  rose: Languages,
  cyan: Ship,
  green: GraduationCap,
}

export const CATEGORY_ACCENT: Record<CategoryColor, string> = {
  teal: 'text-emerald-400',
  blue: 'text-sky-400',
  orange: 'text-amber-400',
  rose: 'text-rose-400',
  cyan: 'text-cyan-400',
  green: 'text-green-400',
}

export const CATEGORY_GLOW: Record<CategoryColor, string> = {
  teal: 'hover:shadow-emerald-500/20',
  blue: 'hover:shadow-sky-500/20',
  orange: 'hover:shadow-amber-500/20',
  rose: 'hover:shadow-rose-500/20',
  cyan: 'hover:shadow-cyan-500/20',
  green: 'hover:shadow-green-500/20',
}

export type PartnerIconKey =
  | 'government'
  | 'space'
  | 'education'
  | 'language'
  | 'host'
  | 'corporate'
  | 'b2g'
  | 'global'

export const PARTNER_ICONS: Record<PartnerIconKey, LucideIcon> = {
  government: Landmark,
  space: Building2,
  education: BookOpen,
  language: MessageCircle,
  host: Plane,
  corporate: Briefcase,
  b2g: Building,
  global: Globe2,
}

/** @deprecated Use partner id from i18n content instead */
export function partnerKeyFromTitle(title: string): PartnerIconKey {
  if (/government|지자체|관광|local government/i.test(title)) return 'government'
  if (/space|숙소|공간|stay/i.test(title)) return 'space'
  if (/education|강의|교육|lecture/i.test(title)) return 'education'
  if (/language|어학|유학|language school/i.test(title)) return 'language'
  if (/host|에어비앤비|airbnb/i.test(title)) return 'host'
  if (/corporate|HR|기업|enterprise/i.test(title)) return 'corporate'
  if (/b2g|생활인구/i.test(title)) return 'b2g'
  return 'global'
}

export { Sparkles as AiIcon }
