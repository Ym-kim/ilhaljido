import type { Lang } from '@/lib/i18n/types'
import type { StayIntelligence, StayProviderId } from '@/lib/stays/domain'

type LocalizedText = Record<Lang, string>

export type VerifiedStayIntelligenceRecord = {
  provider: StayProviderId
  propertyId: string
  destinationId: string
  sourceItemId: string
  sourceLabel: LocalizedText
  sourceUrl: string
  verifiedAt: string
  workNote: LocalizedText
  longStayNote?: LocalizedText
  access?: LocalizedText
}

/**
 * Explicit property mappings only. Agoda/Booking names must never be used for
 * fuzzy matching because similarly named properties can be different listings.
 */
export const VERIFIED_STAY_INTELLIGENCE: readonly VerifiedStayIntelligenceRecord[] = [
  {
    provider: 'agoda',
    propertyId: '2429693',
    destinationId: 'japan-fukuoka',
    sourceItemId: 'stay-webase-hakata',
    sourceLabel: { KO: 'WeBase Hakata 공식 라운지 안내', EN: 'Official WeBase Hakata lounge guide', JP: 'WeBase博多 公式ラウンジ案内' },
    sourceUrl: 'https://we-base.jp/hakata/lounge/',
    verifiedAt: '2026-09-02',
    workNote: {
      KO: '9층 Books & Lounge에 책상과 Wi-Fi가 있으며, 공식 안내 기준 하향 최대 150Mbps·상향 최대 250Mbps입니다.',
      EN: 'The 9F Books & Lounge has desks and Wi-Fi officially listed at up to 150Mbps down and 250Mbps up.',
      JP: '9階Books & LoungeにはデスクとWi-Fiがあり、公式案内では下り最大150Mbps・上り最大250Mbpsです。',
    },
    longStayNote: {
      KO: '공용 키친과 1,500권 이상의 도서를 갖춘 라운지를 이용할 수 있습니다.',
      EN: 'The shared lounge includes a communal kitchen and more than 1,500 books.',
      JP: '共用キッチンと1,500冊以上の本を備えたラウンジを利用できます。',
    },
  },
  {
    provider: 'agoda',
    propertyId: '13350280',
    destinationId: 'japan-osaka',
    sourceItemId: 'stay-lively-osaka',
    sourceLabel: { KO: 'THE LIVELY OSAKA 공식 워크스페이스 안내', EN: 'Official THE LIVELY OSAKA workspace guide', JP: 'THE LIVELY OSAKA 公式ワークスペース案内' },
    sourceUrl: 'https://www.livelyhotels.com/en/thelivelyosaka/workspace/',
    verifiedAt: '2026-09-02',
    workNote: {
      KO: '투숙객은 THE LIVERALLY 코워킹 공간을 무료로 이용할 수 있으며, 공식 안내에 고속 Wi-Fi와 전원 좌석이 명시돼 있습니다.',
      EN: 'Guests can use THE LIVERALLY coworking space free of charge, with high-speed Wi-Fi and powered seating listed by the hotel.',
      JP: '宿泊者はTHE LIVERALLYのコワーキングを無料で利用でき、公式案内に高速Wi-Fiと電源席が明記されています。',
    },
    access: {
      KO: '사카이스지혼마치역에서 도보 1분으로 안내됩니다.',
      EN: 'Official access information lists a one-minute walk from Sakaisuji-Honmachi Station.',
      JP: '堺筋本町駅から徒歩1分と案内されています。',
    },
  },
  {
    provider: 'agoda',
    propertyId: '4128776',
    destinationId: 'japan-tokyo',
    sourceItemId: 'stay-millennials-shibuya',
    sourceLabel: { KO: '.andwork Shibuya 공식 안내', EN: 'Official .andwork Shibuya guide', JP: '.andwork渋谷 公式案内' },
    sourceUrl: 'https://www.xandwork.com/blog_en/202510_shibuyacoworking_campaign_en/',
    verifiedAt: '2026-09-02',
    workNote: {
      KO: '호텔 내 .andwork는 공식 안내 기준 상·하향 100Mbps 초과 Wi-Fi와 폰부스를 제공합니다.',
      EN: 'The in-hotel .andwork space officially lists 100Mbps+ up/down Wi-Fi and phone booths.',
      JP: '館内の.andworkは、公式案内で上下100Mbps超のWi-Fiとフォンブースを備えています。',
    },
    longStayNote: {
      KO: '무료 음료와 저녁 맥주 시간을 포함한 공용 워크 라운지를 이용할 수 있습니다.',
      EN: 'The shared work lounge includes complimentary drinks and an evening beer hour.',
      JP: '共用ワークラウンジでは無料ドリンクと夕方のビールタイムを利用できます。',
    },
  },
] as const

export function getVerifiedStayIntelligence({
  provider,
  propertyId,
  destinationId,
  locale,
}: {
  provider: StayProviderId
  propertyId: string
  destinationId: string
  locale: Lang
}): StayIntelligence | undefined {
  const record = VERIFIED_STAY_INTELLIGENCE.find((item) => (
    item.provider === provider
    && item.propertyId === propertyId
    && item.destinationId === destinationId
  ))
  if (!record) return undefined

  return {
    workNote: record.workNote[locale],
    longStayNote: record.longStayNote?.[locale],
    access: record.access?.[locale],
    sourceLabel: record.sourceLabel[locale],
    sourceUrl: record.sourceUrl,
    sourceItemId: record.sourceItemId,
    verifiedAt: record.verifiedAt,
  }
}
