import type { TripSetSlug } from '@/lib/tripSetCampaign'

export type SocialLocale = 'ko' | 'ja'

export type CampaignPlatform =
  | 'instagram_feed'
  | 'instagram_story'
  | 'kakao'
  | 'line'
  | 'naver'
  | 'direct'

export type CampaignCaption = {
  slug: TripSetSlug
  locale: SocialLocale
  platform: CampaignPlatform
  headline: string
  body: string
  hashtags: string[]
  targetUrl: string
}

type CaptionBase = Omit<CampaignCaption, 'platform' | 'targetUrl'>

export const CAMPAIGN_PLATFORM_LABELS: Record<CampaignPlatform, string> = {
  instagram_feed: 'Instagram Feed',
  instagram_story: 'Instagram Story',
  kakao: 'Kakao',
  line: 'LINE',
  naver: 'Naver Blog',
  direct: 'Direct presentation',
}

export const CAMPAIGN_PLATFORM_UTM: Record<CampaignPlatform, { source: string; medium: string }> = {
  instagram_feed: { source: 'instagram', medium: 'social' },
  instagram_story: { source: 'instagram', medium: 'social' },
  kakao: { source: 'kakao', medium: 'social' },
  line: { source: 'line', medium: 'social' },
  naver: { source: 'naver', medium: 'blog' },
  direct: { source: 'direct', medium: 'presentation' },
}

const BASE_CAPTIONS: CaptionBase[] = [
  {
    slug: 'fukuoka-3n4d',
    locale: 'ko',
    headline: '일과 온천 사이, 후쿠오카 3박 4일',
    body: '비행은 짧게, 머무는 감각은 길게. 오전에는 카페에서 일을 정리하고 오후에는 하카타 골목과 온천으로 향하는 흐름을 담았습니다. 숙소·체험·eSIM은 필요한 것만 각각 확인해 보세요.',
    hashtags: ['후쿠오카여행', '워케이션', '3박4일'],
  },
  {
    slug: 'osaka-friends',
    locale: 'ko',
    headline: '친구와 모으는 오사카의 좋은 장면',
    body: '시장 산책, 테마파크, 늦은 저녁까지. 친구와 가는 오사카에서 놓치고 싶지 않은 장면을 3박 4일의 흐름으로 정리했습니다. 각 준비 항목은 제휴사에서 개별 확인·예약합니다.',
    hashtags: ['오사카여행', '친구여행', 'TripSet'],
  },
  {
    slug: 'seoul-3n4d',
    locale: 'ja',
    headline: '観光だけではない、ソウルの日常へ',
    body: '聖水のポップアップ、延南洞のカフェ、夜の街歩き。予定を詰めすぎず、仕事の時間も残した3泊4日のヒントをまとめました。宿・体験・eSIMは必要なものを個別に確認できます。',
    hashtags: ['ソウル旅行', '韓国週末旅', 'ワーケーション'],
  },
  {
    slug: 'busan-weekend',
    locale: 'ja',
    headline: '海のそばで過ごす、釜山の週末',
    body: '海を眺めて、ローカルフードを味わい、街を歩く2泊3日。短い休みでも気分を切り替えやすい釜山の過ごし方をまとめました。旅の準備は各サービスで個別に確認できます。',
    hashtags: ['釜山旅行', '韓国旅行', '週末旅'],
  },
  {
    slug: 'fukuoka-3n4d',
    locale: 'ja',
    headline: '福岡で、仕事と温泉をひとつの旅に',
    body: 'カフェで仕事を整えたら、街歩きと温泉へ。短い滞在でもリズムを崩しにくい福岡3泊4日のヒントです。',
    hashtags: ['福岡旅行', 'ワーケーション', '3泊4日'],
  },
  {
    slug: 'osaka-friends',
    locale: 'ja',
    headline: '友達と集める、大阪のいい時間',
    body: '市場、街歩き、テーマパーク。友達と過ごす大阪3泊4日の基本の流れを一枚にまとめました。',
    hashtags: ['大阪旅行', '友達旅', 'TripSet'],
  },
  {
    slug: 'seoul-3n4d',
    locale: 'ko',
    headline: '서울의 일상에 가까워지는 3박 4일',
    body: '성수와 연남의 골목을 걷고, 잠깐의 업무 시간도 남겨둔 서울 체류 흐름입니다.',
    hashtags: ['서울여행', '도시여행', '워케이션'],
  },
  {
    slug: 'busan-weekend',
    locale: 'ko',
    headline: '바다를 보고, 먹고, 걷는 부산 주말',
    body: '짧은 휴일에 가볍게 다녀오는 부산 2박 3일. 바다와 골목, 로컬 미식을 한 흐름으로 담았습니다.',
    hashtags: ['부산여행', '주말여행', 'TripSet'],
  },
]

export function getCampaignTargetUrl(slug: TripSetSlug, locale: SocialLocale) {
  if (locale === 'ko' && (slug === 'fukuoka-3n4d' || slug === 'osaka-friends')) {
    return '/campaign/japan-short-stay'
  }
  if (locale === 'ja' && (slug === 'seoul-3n4d' || slug === 'busan-weekend')) {
    return '/ja/campaign/korea-weekend'
  }
  return `${locale === 'ja' ? '/ja' : ''}/collections/${slug}`
}

export function getCampaignCaption(
  slug: TripSetSlug,
  locale: SocialLocale,
  platform: CampaignPlatform,
): CampaignCaption {
  const base = BASE_CAPTIONS.find((item) => item.slug === slug && item.locale === locale)
  if (!base) throw new Error(`Missing campaign caption: ${slug}/${locale}`)
  return { ...base, platform, targetUrl: getCampaignTargetUrl(slug, locale) }
}
