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
    // 추석 시즌 배너 (2026-08-04 사전 등록, active:false) — 8월 말 운영자 승인 시 active:true 토글 1줄로 전환.
    // ⚠️ 9/27 종료 시 active:false 복귀 (전체 롤백 절차: docs/SEASONAL_ROLLBACK_CHUSEOK_2026.md)
    id: 'chuseok-4days-2026',
    active: false,
    eyebrow: { KO: '2026 추석 연휴 · 9/24–9/27', EN: 'Chuseok holidays · Sep 24–27', JP: '秋夕連休 · 9/24–9/27' },
    title: {
      KO: '연차 없이 나흘 — 추석 워케이션 설계 가이드',
      EN: 'Four days, no leave needed — the Chuseok workation guide',
      JP: '有休なしで4日間 — 秋夕ワーケーション設計ガイド',
    },
    sub: {
      KO: '후쿠오카·오사카·도쿄·국내 — 실존 세트 5개로 잇는 연휴 설계 에디토리얼.',
      EN: 'Fukuoka, Osaka, Tokyo and Korea — an editorial linking five real trip sets.',
      JP: '福岡・大阪・東京・国内 — 実在セット5つでつなぐ連休設計エディトリアル。',
    },
    cta: { KO: '에디토리얼 읽기', EN: 'Read the editorial', JP: 'エディトリアルを読む' },
    href: '/campaign/chuseok-4days',
    gradient: 'from-[#7c2d12] via-[#9a3412] to-[#b45309]',
    image: '/covers/stay-fukuoka-city-real.jpeg',
    event: 'house_banner_clicked',
  },
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
    cta: { KO: '여행 준비 보기', EN: 'View trip essentials', JP: '旅の準備を見る' },
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
