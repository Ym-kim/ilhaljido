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

export function partnerKeyFromTitle(title: string): PartnerIconKey {
  if (title.includes('지자체') || title.includes('관광')) return 'government'
  if (title.includes('숙소') || title.includes('공간')) return 'space'
  if (title.includes('강의') || title.includes('교육')) return 'education'
  if (title.includes('어학') || title.includes('유학')) return 'language'
  if (title.includes('에어비앤비') || title.includes('호스트')) return 'host'
  if (title.includes('HR') || title.includes('기업')) return 'corporate'
  if (title.includes('B2G') || title.includes('생활인구')) return 'b2g'
  return 'global'
}

export { Sparkles as AiIcon }
