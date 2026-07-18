import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 하우스 배너 캠페인 — 랜덤 광고(AdSense 등) 대신 '자사 제휴·기획전을 미는' 자체 통제 배너.
// 리서치 결론(2026-07-15): 한국 트래픽·프리미엄 톤·제휴 중심에선 랜덤 디스플레이가 순손실 →
// 배너 슬롯은 두되 우리 상품/기획전으로 채운다(제휴 퍼널 증폭).
//
// 운영 방법: 시즌·프로모마다 active 토글 또는 순서만 바꾸면 홈 배너가 즉시 교체됨.
// 정직성 원칙: 허위 할인율·"선착순 N명"·긴급성 조작 문구 금지. 실제 있는 것만.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

export type HouseCampaign = {
  id: string
  active: boolean
  eyebrow: L
  title: L
  sub: L
  cta: L
  href: string
  gradient: string // tailwind gradient (from-… via-… to-…)
  image?: string   // 배경 이미지. 카피는 HTML로 유지해 3언어·접근성 보장
  event: string    // Vercel Analytics 이벤트명
}

export const HOUSE_CAMPAIGNS: HouseCampaign[] = [
  {
    id: 'trip-prep-allinone',
    active: true,
    eyebrow: { KO: '여정 준비 올인원', EN: 'Trip prep, all in one', JP: '旅の準備をまとめて' },
    title: {
      KO: '숙소부터 항공·eSIM·렌터카·공항픽업까지 한 곳에',
      EN: 'Stays, flights, eSIM, car rental & airport pickup — in one place',
      JP: '宿泊から航空券・eSIM・レンタカー・空港送迎まで一括で',
    },
    sub: {
      KO: '검증된 파트너로 워케이션 준비를 한 번에 끝내세요.',
      EN: 'Prep your whole workation through vetted partners.',
      JP: '信頼できるパートナーでワーケーション準備を一度に。',
    },
    cta: { KO: '예약 허브 보기', EN: 'Open the booking hub', JP: '予約ハブを見る' },
    href: '/select',
    gradient: 'from-[#0284c7] via-[#0369a1] to-[#075985]',
    image: '/covers/trip-prep-allinone-ai.jpeg',
    event: 'house_banner_clicked',
  },
  {
    id: 'collections-spotlight',
    active: true,
    eyebrow: { KO: '테마 기획전', EN: 'Themed collections', JP: 'テーマ特集' },
    title: {
      KO: '도쿄 올인원·발리 한달·치앙마이 노마드 — 목적지별 묶음',
      EN: 'Tokyo all-in-one · a month in Bali · Chiang Mai nomad',
      JP: '東京オールインワン・バリ1ヶ月・チェンマイノマド',
    },
    sub: {
      KO: '실상품을 목적지 테마로 묶어 한눈에.',
      EN: 'Real products bundled by destination theme.',
      JP: '実商品を目的地テーマでまとめて。',
    },
    cta: { KO: '기획전 보기', EN: 'Browse collections', JP: '特集を見る' },
    href: '/collections',
    gradient: 'from-[#0f766e] via-[#115e59] to-[#134e4a]',
    event: 'house_banner_clicked',
  },
]

export function getActiveCampaigns(): HouseCampaign[] {
  return HOUSE_CAMPAIGNS.filter((c) => c.active)
}
