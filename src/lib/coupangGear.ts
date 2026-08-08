import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 쿠팡 파트너스 여행용품 — 운영자(StayForward) 파트너스 추적링크(link.coupang.com/a/…, tag AF4488704)
// 2026-07-16 운영자 전달 7링크. 링크 순서 = 제안한 카테고리 순서(#3 어댑터 실물검증 일치).
// ⚠️ 쿠팡 파트너스 필수: 아래 COUPANG_DISCLOSURE 고지문구를 반드시 함께 노출할 것.
// 상품명이 실제와 다르면 name만 교체(링크는 그대로).
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

export type GearItem = { id: string; name: L; href: string }

export const COUPANG_GEAR: GearItem[] = [
  { id: 'carry-cabin', name: { KO: '기내용 캐리어', EN: 'Cabin luggage', JP: '機内キャリー' }, href: 'https://link.coupang.com/a/fqKeXt9wsK' },
  { id: 'carry-large', name: { KO: '수하물 캐리어', EN: 'Checked luggage', JP: '預け入れキャリー' }, href: 'https://link.coupang.com/a/fqKtQvOpno' },
  { id: 'adapter', name: { KO: '여행용 멀티어댑터', EN: 'Travel adapter', JP: '変換アダプター' }, href: 'https://link.coupang.com/a/fqKCgViWQK' },
  { id: 'neckpillow', name: { KO: '목베개', EN: 'Neck pillow', JP: 'ネックピロー' }, href: 'https://link.coupang.com/a/fqKEUIv95g' },
  { id: 'powerbank', name: { KO: '보조배터리', EN: 'Power bank', JP: 'モバイルバッテリー' }, href: 'https://link.coupang.com/a/fqK7CKb3g4' },
  { id: 'pouch', name: { KO: '여행 정리 파우치', EN: 'Packing pouch', JP: '圧縮ポーチ' }, href: 'https://link.coupang.com/a/fqLdRYueRM' },
  { id: 'backpack', name: { KO: '기내용 백팩', EN: 'Cabin backpack', JP: '機内バックパック' }, href: 'https://link.coupang.com/a/fqLmHwGzhR' },
]

// 쿠팡 파트너스 의무 고지문구 (반드시 노출)
export const COUPANG_DISCLOSURE: L = {
  KO: '이 섹션은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.',
  EN: 'This section contains Coupang Partners links, from which we may earn a commission.',
  JP: '本セクションはクーパンパートナーズ活動の一環として、一定額の手数料を受け取ります。',
}

export const COUPANG_UI: Record<string, L> = {
  eyebrow: { KO: '여행 준비물', EN: 'Travel gear', JP: '旅の準備品' },
  title: { KO: '떠나기 전, 챙길 것들', EN: 'Pack before you go', JP: '出発前に揃えるもの' },
  sub: {
    KO: '캐리어·어댑터·보조배터리까지 워케이션 필수템을 쿠팡에서 바로.',
    EN: 'Luggage, adapters, power banks — workation essentials, straight from Coupang.',
    JP: 'キャリー・アダプター・バッテリーまで、ワーケーション必須品をクーパンで。',
  },
  cta: { KO: '쿠팡에서 보기', EN: 'View on Coupang', JP: 'クーパンで見る' },
}
