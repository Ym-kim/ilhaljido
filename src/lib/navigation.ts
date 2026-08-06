import { isRouteVisibleIn } from '@/lib/i18n/localePath'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

export type NavigationLink = {
  id: string
  label: L
  description?: L
  href: string | Partial<Record<Lang, string>>
}

export type NavigationGroup = {
  id: string
  label?: L
  links: NavigationLink[]
}

export type NavigationMenu = {
  id: 'find' | 'destinations' | 'plan' | 'programs' | 'more'
  label: L
  eyebrow: L
  title: L
  groups: NavigationGroup[] | ((lang: Lang) => NavigationGroup[])
  allLink?: NavigationLink
  campaign?: boolean
}

const TOP_LABELS = {
  find: { KO: '여행 찾기', EN: 'Find a Trip', JP: '旅を探す' },
  destinations: { KO: '여행지', EN: 'Destinations', JP: '行き先' },
  plan: { KO: '여행 준비', EN: 'Plan', JP: '旅の準備' },
  programs: { KO: '프로그램', EN: 'Programs', JP: 'プログラム' },
  saved: { KO: '저장', EN: 'Saved', JP: '保存' },
  more: { KO: '더보기', EN: 'More', JP: 'その他' },
} satisfies Record<string, L>

export const NAVIGATION_COPY = {
  labels: TOP_LABELS,
  tripMatch: { KO: '30초 여행 찾기', EN: 'Find my trip', JP: '30秒で旅を探す' },
  tripMatchShort: { KO: '3가지 질문으로 여행 찾기', EN: 'Three questions, one trip', JP: '3つの質問で旅を探す' },
  savedLabel: { KO: '저장한 여행', EN: 'Saved trips', JP: '保存した旅' },
  languageLabel: { KO: '언어 선택', EN: 'Choose language', JP: '言語を選択' },
  currentCampaign: { KO: '이번 주의 여행', EN: 'This week’s trip', JP: '今週の旅' },
  campaignTitle: {
    KO: '카페와 온천의 후쿠오카',
    EN: 'Fukuoka, between cafés and onsen',
    JP: '韓国で過ごす週末',
  },
  campaignDescription: {
    KO: '카페에서 일하고 온천에서 하루를 마무리하는 3박 4일',
    EN: 'A 3-night stay shaped around focused mornings and slower evenings',
    JP: 'ソウルの日常と釜山の海から選ぶ、身軽な韓国旅',
  },
  campaignCta: { KO: '여행 구성 보기', EN: 'View the trip set', JP: '旅のプランを見る' },
  closeMenu: { KO: '메뉴 닫기', EN: 'Close menu', JP: 'メニューを閉じる' },
  openMenu: { KO: '메뉴 열기', EN: 'Open menu', JP: 'メニューを開く' },
  account: { KO: '계정', EN: 'Account', JP: 'アカウント' },
  allDestinations: { KO: '모든 여행지', EN: 'All destinations', JP: '行き先をすべて見る' },
  allEssentials: { KO: '전체 여행 준비', EN: 'All trip essentials', JP: '旅の準備をすべて見る' },
  allPrograms: { KO: '전체 프로그램', EN: 'All programs', JP: 'プログラムをすべて見る' },
  contact: { KO: '문의', EN: 'Contact', JP: 'お問い合わせ' },
} satisfies Record<string, L | Record<string, L>>

const link = (
  id: string,
  label: L,
  href: NavigationLink['href'],
  description?: L,
): NavigationLink => ({ id, label, href, description })

const FIND_LINKS: NavigationGroup[] = [
  {
    id: 'find-main',
    links: [
      link(
        'trip-match',
        NAVIGATION_COPY.tripMatch,
        { KO: '/trip-match', EN: '/trip-match', JP: '/ja/trip-match' },
        NAVIGATION_COPY.tripMatchShort,
      ),
      link(
        'collections',
        { KO: '여행 기획전', EN: 'Trip collections', JP: '旅の特集' },
        { KO: '/collections', EN: '/en/collections', JP: '/ja/collections' },
        { KO: '기간과 장면으로 고른 여행 구성', EN: 'Curated by timing and mood', JP: '日程と気分から選ぶ旅のプラン' },
      ),
      link(
        'stories',
        { KO: '여행 이야기', EN: 'Travel stories', JP: '旅のストーリー' },
        '/stories',
        { KO: '일하며 머무는 사람들의 장면', EN: 'Stories of working while away', JP: '旅先で働き、暮らす人の物語' },
      ),
      link(
        'compare',
        { KO: '도시 비교', EN: 'Compare cities', JP: '都市を比べる' },
        { KO: '/destinations/compare', EN: '/en/destinations/compare', JP: '/ja/destinations/compare' },
        { KO: '비용·인터넷·계절을 한눈에', EN: 'Cost, connectivity and seasons', JP: '費用・通信環境・季節を比較' },
      ),
    ],
  },
]

function destinationGroups(lang: Lang): NavigationGroup[] {
  if (lang === 'JP') {
    return [
      {
        id: 'korea',
        label: { KO: '한국', EN: 'Korea', JP: '韓国' },
        links: [
          link('seoul', { KO: '서울', EN: 'Seoul', JP: 'ソウル' }, '/ja/guide/seoul'),
          link('busan', { KO: '부산', EN: 'Busan', JP: '釜山' }, '/ja/guide/busan'),
          link('jeju', { KO: '제주', EN: 'Jeju', JP: '済州' }, '/ja/guide/jeju'),
        ],
      },
      {
        id: 'nearby',
        label: { KO: '일본·장기체류', EN: 'Japan & long stays', JP: '日本・長期滞在' },
        links: [
          link('fukuoka', { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' }, '/ja/guide/fukuoka'),
          link('osaka', { KO: '오사카', EN: 'Osaka', JP: '大阪' }, '/ja/guide/osaka'),
          link('bali', { KO: '발리', EN: 'Bali', JP: 'バリ' }, '/ja/guide/bali'),
        ],
      },
    ]
  }

  if (lang === 'EN') {
    return [
      {
        id: 'nearby',
        label: { KO: '가까운 도시', EN: 'Japan & Korea', JP: '日本・韓国' },
        links: [
          link('fukuoka', { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' }, '/en/guide/fukuoka'),
          link('osaka', { KO: '오사카', EN: 'Osaka', JP: '大阪' }, '/en/guide/osaka'),
          link('seoul', { KO: '서울', EN: 'Seoul', JP: 'ソウル' }, '/en/guide/seoul'),
        ],
      },
      {
        id: 'long-stay',
        label: { KO: '장기체류 도시', EN: 'Long-stay cities', JP: '長期滞在都市' },
        links: [
          link('bali', { KO: '발리', EN: 'Bali', JP: 'バリ' }, '/en/guide/bali'),
          link('danang', { KO: '다낭', EN: 'Da Nang', JP: 'ダナン' }, '/en/guide/danang'),
          link('chiangmai', { KO: '치앙마이', EN: 'Chiang Mai', JP: 'チェンマイ' }, '/en/guide/chiangmai'),
        ],
      },
    ]
  }

  return [
    {
      id: 'japan',
      label: { KO: '일본', EN: 'Japan', JP: '日本' },
      links: [
        link('fukuoka', { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' }, '/guide/fukuoka'),
        link('osaka', { KO: '오사카', EN: 'Osaka', JP: '大阪' }, '/guide/osaka'),
        link('tokyo', { KO: '도쿄', EN: 'Tokyo', JP: '東京' }, '/guide/tokyo'),
      ],
    },
    {
      id: 'long-stay',
      label: { KO: '한국·장기체류', EN: 'Korea & long stays', JP: '韓国・長期滞在' },
      links: [
        link('jeju', { KO: '제주', EN: 'Jeju', JP: '済州' }, '/guide/jeju'),
        link('danang', { KO: '다낭', EN: 'Da Nang', JP: 'ダナン' }, '/guide/danang'),
        link('bali', { KO: '발리', EN: 'Bali', JP: 'バリ' }, '/guide/bali'),
      ],
    },
  ]
}

const PLAN_LINKS: NavigationGroup[] = [
  {
    id: 'plan-main',
    links: [
      link('hotel', { KO: '숙소 찾기', EN: 'Find stays', JP: '宿泊先を探す' }, { KO: '/select/hotel', EN: '/en/select/hotel', JP: '/ja/select/hotel' }),
      link('activity', { KO: '현지 체험', EN: 'Local experiences', JP: '現地体験' }, { KO: '/select/activity', EN: '/en/select/activity', JP: '/ja/select/activity' }),
      link('esim', { KO: 'eSIM', EN: 'eSIM', JP: 'eSIM' }, { KO: '/select/esim', EN: '/en/select/esim', JP: '/ja/select/esim' }),
      link('transport', { KO: '항공·교통', EN: 'Flights & transport', JP: '航空券・移動' }, { KO: '/select#transport', EN: '/en/select#transport', JP: '/ja/select#transport' }),
    ],
  },
]

const PROGRAM_LINKS: NavigationGroup[] = [
  {
    id: 'hosted',
    label: { KO: 'Wakation 운영', EN: 'Run by Wakation', JP: 'Wakation運営' },
    links: [
      link('domestic', { KO: '국내 워케이션', EN: 'Workations in Korea', JP: '韓国ワーケーション' }, { KO: '/programs/domestic', EN: '/en/programs/domestic', JP: '/ja/programs/domestic' }),
      link('global', { KO: '해외 워케이션·체류', EN: 'Overseas workations & stays', JP: '海外ワーケーション・滞在' }, { KO: '/programs/global', EN: '/en/programs/global', JP: '/ja/programs/global' }),
      link('market', { KO: '시장조사·박람회', EN: 'Market visits & trade shows', JP: '市場調査・展示会' }, { KO: '/programs/market', EN: '/en/programs/market', JP: '/ja/programs/market' }),
    ],
  },
  {
    id: 'participate',
    label: { KO: '참여·지원', EN: 'Join & support', JP: '参加・支援' },
    links: [
      link('support', { KO: '지역 지원 프로그램', EN: 'Local support programs', JP: '地域支援プログラム' }, { KO: '/programs/support', EN: '/en/programs/support', JP: '/ja/programs/support' }),
      link('support-calendar', { KO: '지원사업 일정', EN: 'Support calendar', JP: '支援カレンダー' }, { KO: '/programs/support/calendar', EN: '/en/programs/support/calendar', JP: '/ja/programs/support/calendar' }),
      link('half-price-travel', { KO: '반값여행 가이드', EN: 'Regional travel support guide', JP: '地域旅行支援ガイド' }, { KO: '/programs/support/half-price-travel', EN: '/en/programs/support/half-price-travel', JP: '/ja/programs/support/half-price-travel' }),
      link('business', { KO: '기업·팀 프로그램', EN: 'Company & team programs', JP: '企業・チーム向け' }, '/business'),
    ],
  },
]

const MORE_LINKS: NavigationGroup[] = [
  {
    id: 'more-main',
    links: [
      link('visa', { KO: '비자·체류 정보', EN: 'Visa & stay information', JP: 'ビザ・滞在情報' }, '/visa-ai'),
      link('learning', { KO: '성장·학습', EN: 'Growth & learning', JP: '成長・学び' }, '/learn'),
      link('diagnosis', { KO: '워케이션 진단', EN: 'Workation check', JP: 'ワーケーション診断' }, '/tools/diagnosis'),
      link('partnership', { KO: '파트너십', EN: 'Partnerships', JP: 'パートナーシップ' }, '/partnership'),
      link('about', { KO: 'Wakation 소개', EN: 'About Wakation', JP: 'Wakationについて' }, '/about'),
      link('contact', NAVIGATION_COPY.contact, '/contact'),
    ],
  },
]

export const NAVIGATION_MENUS: NavigationMenu[] = [
  {
    id: 'find',
    label: TOP_LABELS.find,
    eyebrow: { KO: '어디로 갈지 정하지 않았다면', EN: 'Start with how you want to feel', JP: '行き先がまだ決まっていないなら' },
    title: { KO: '지금의 나에게 맞는 여행부터', EN: 'Find the trip that fits now', JP: '今の自分に合う旅から' },
    groups: FIND_LINKS,
    campaign: true,
  },
  {
    id: 'destinations',
    label: TOP_LABELS.destinations,
    eyebrow: { KO: '도시에서 시작하기', EN: 'Start with a place', JP: '街から選ぶ' },
    title: { KO: '머물며 일하기 좋은 여행지', EN: 'Places made for longer stays', JP: '働きながら滞在しやすい街' },
    groups: destinationGroups,
    allLink: link('all-destinations', NAVIGATION_COPY.allDestinations, { KO: '/destinations', EN: '/en/destinations', JP: '/ja/destinations' }),
  },
  {
    id: 'plan',
    label: TOP_LABELS.plan,
    eyebrow: { KO: '필요한 것만 차근차근', EN: 'Practical trip essentials', JP: '必要なものを順番に' },
    title: { KO: '출발 전 준비를 한곳에서', EN: 'Prepare before you leave', JP: '出発前の準備をひとつに' },
    groups: PLAN_LINKS,
    allLink: link('all-plan', NAVIGATION_COPY.allEssentials, { KO: '/select', EN: '/en/select', JP: '/ja/select' }),
  },
  {
    id: 'programs',
    label: TOP_LABELS.programs,
    eyebrow: { KO: '함께 머물고 성장하는 시간', EN: 'Stay, work and grow together', JP: '滞在し、働き、共に成長する' },
    title: { KO: 'Wakation 참여 프로그램', EN: 'Programs you can join', JP: 'Wakationの参加プログラム' },
    groups: PROGRAM_LINKS,
    allLink: link('all-programs', NAVIGATION_COPY.allPrograms, { KO: '/programs', EN: '/en/programs', JP: '/ja/programs' }),
  },
  {
    id: 'more',
    label: TOP_LABELS.more,
    eyebrow: { KO: '더 깊이 알아보기', EN: 'Go further', JP: 'もっと詳しく' },
    title: { KO: '체류와 성장에 필요한 정보', EN: 'More for staying and growing', JP: '滞在と成長に役立つ情報' },
    groups: MORE_LINKS,
  },
]

export function getNavigationGroups(menu: NavigationMenu, lang: Lang) {
  const groups = typeof menu.groups === 'function' ? menu.groups(lang) : menu.groups
  // 2026-08-07 구조 결정 ③ — 해당 언어에 대응 화면이 없는 라우트는 내비에서 숨긴다
  // (EN의 /trip-match. 링크가 비게 된 그룹은 그룹째 제거)
  return groups
    .map((g) => ({ ...g, links: g.links.filter((item) => isRouteVisibleIn(getNavigationHref(item, lang), lang)) }))
    .filter((g) => g.links.length > 0)
}

export function getNavigationHref(item: NavigationLink, lang: Lang) {
  return typeof item.href === 'string' ? item.href : item.href[lang] ?? item.href.KO ?? '/'
}

export function getCampaignHref(lang: Lang) {
  if (lang === 'JP') return '/ja/collections/busan-weekend?src=navigation'
  if (lang === 'EN') return '/en/collections/fukuoka-3n4d?src=navigation'
  return '/collections/fukuoka-3n4d?src=navigation'
}

export function getCampaignImage(lang: Lang) {
  return lang === 'JP'
    ? '/campaign/trip-sets/busan-weekend-editorial-v1.webp'
    : '/campaign/trip-sets/fukuoka-3n4d-editorial-v1.webp'
}

export function getCampaignAlt(lang: Lang) {
  return lang === 'JP'
    ? '夕方の釜山の海辺を歩く二人の旅人'
    : lang === 'EN'
      ? 'A traveler taking a quiet coffee break in a sunlit Japanese café'
      : '아침 햇살이 드는 일본 카페에서 커피를 마시며 쉬는 여행자'
}
