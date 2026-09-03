import type { Lang } from '@/lib/i18n/types'

export type LocalizedCampaignText = Record<Lang, string>
export type ChinaProgramStatus = 'application_page_live' | 'monitoring'

export type ChinaResearchVariant = {
  id: 'yiwu' | 'guangzhou'
  city: LocalizedCampaignText
  eyebrow: LocalizedCampaignText
  title: LocalizedCampaignText
  summary: LocalizedCampaignText
  objective: LocalizedCampaignText
  fit: LocalizedCampaignText[]
  facts: Array<{ label: LocalizedCampaignText; value: LocalizedCampaignText }>
  status: ChinaProgramStatus
  externalUrl?: string
  officialReferenceUrl: string
  operator?: LocalizedCampaignText
  verifiedAt: string
}

export const CHINA_CAMPAIGN_ID = 'china-market-research-2026-autumn'
export const CHINA_CAMPAIGN_ROUTE = '/programs/china-market-research'

// Wakation Home placement window. This is a display control, not a claim that
// applications are guaranteed until the final second. The external operator
// page remains the source of truth for availability and final conditions.
export const CHINA_HOME_CAMPAIGN_WINDOW = {
  startAt: '2026-09-03T00:00:00+09:00',
  endAt: '2026-09-09T00:00:00+09:00',
} as const

export function isChinaHomeCampaignActive(at = new Date()) {
  const time = at.getTime()
  return time >= Date.parse(CHINA_HOME_CAMPAIGN_WINDOW.startAt)
    && time < Date.parse(CHINA_HOME_CAMPAIGN_WINDOW.endAt)
}

const koEnJa = (KO: string, EN: string, JP: string): LocalizedCampaignText => ({ KO, EN, JP })

export const CHINA_RESEARCH_VARIANTS: ChinaResearchVariant[] = [
  {
    id: 'yiwu',
    city: koEnJa('이우', 'Yiwu', '義烏'),
    eyebrow: koEnJa('소상품·도매시장 리서치', 'Small-goods wholesale research', '小商品・卸売市場リサーチ'),
    title: koEnJa('카테고리를 넓게 보고, 소싱의 기준을 잡는 일정', 'Scan broad categories and define a sourcing brief', '幅広いカテゴリーを見て、仕入れ基準をつくる日程'),
    summary: koEnJa(
      '대형 도매시장을 동선별로 살피며 상품군, 거래 방식과 물류 준비를 함께 정리하는 쪽에 가깝습니다.',
      'A market-led route for scanning product categories, trade practices and logistics preparation.',
      '大規模な卸売市場を回り、商品カテゴリー・取引方法・物流準備を整理するルートです。',
    ),
    objective: koEnJa('처음 중국 소싱을 검토하거나, 여러 상품군을 빠르게 비교하고 싶은 팀', 'Teams new to China sourcing or comparing several product categories', '中国仕入れを初めて検討する方、複数カテゴリーを比較したいチーム'),
    fit: [
      koEnJa('도매시장 카테고리 탐색', 'Wholesale category discovery', '卸売市場のカテゴリー探索'),
      koEnJa('통역·물류·소싱 기초 확인', 'Interpreting, logistics and sourcing basics', '通訳・物流・仕入れの基礎確認'),
      koEnJa('짧은 기간의 집중 현장 조사', 'Focused field research in a short window', '短期間の集中現地調査'),
    ],
    facts: [
      { label: koEnJa('공개 일정', 'Published dates', '公開日程'), value: koEnJa('2026. 9. 9–13', 'Sep 9–13, 2026', '2026年9月9日〜13日') },
      { label: koEnJa('기간', 'Duration', '期間'), value: koEnJa('4박 5일', '4 nights / 5 days', '4泊5日') },
      { label: koEnJa('운영', 'Operator', '運営'), value: koEnJa('BigPie C&T (외부)', 'BigPie C&T (external)', 'BigPie C&T（外部）') },
      { label: koEnJa('확인일', 'Verified', '確認日'), value: koEnJa('2026. 9. 3', 'Sep 3, 2026', '2026年9月3日') },
    ],
    status: 'application_page_live',
    externalUrl: 'https://www.jungdari.com/campaign/marketresearch',
    officialReferenceUrl: 'https://www.yw.gov.cn/art/2008/12/29/art_1229142437_50763529.html',
    operator: koEnJa('BigPie C&T', 'BigPie C&T', 'BigPie C&T'),
    verifiedAt: '2026-09-03',
  },
  {
    id: 'guangzhou',
    city: koEnJa('광저우', 'Guangzhou', '広州'),
    eyebrow: koEnJa('전시회·제조 파트너 리서치', 'Trade fair and manufacturing research', '展示会・製造パートナー調査'),
    title: koEnJa('산업별 전시 흐름을 보고, 파트너 후보를 좁히는 일정', 'Follow sector phases and narrow partner candidates', '業種別の展示構成から、取引候補を絞る日程'),
    summary: koEnJa(
      '공식 박람회 회차와 산업 구성을 기준으로 사전 조사하기 좋은 도시입니다. 현재 Wakation이 확인한 외부 모집 회차는 없습니다.',
      'Useful for planning around official fair phases and sector groupings. Wakation has not confirmed an external group departure yet.',
      '公式見本市の会期と業種構成を軸に準備しやすい都市です。現在、Wakationが確認した外部募集回はありません。',
    ),
    objective: koEnJa('산업군이 분명하고 전시회 중심으로 공급사·파트너를 만나려는 팀', 'Teams with a defined sector seeking suppliers or partners through a trade fair', '業種が明確で、見本市を通じて仕入先やパートナーを探したいチーム'),
    fit: [
      koEnJa('산업별 전시회 사전 조사', 'Sector-specific fair preparation', '業種別見本市の事前調査'),
      koEnJa('공급사·제조 파트너 후보 정리', 'Supplier and manufacturing partner shortlist', '仕入先・製造パートナー候補の整理'),
      koEnJa('공식 회차에 맞춘 일정 설계', 'Planning around official fair phases', '公式会期に合わせた日程設計'),
    ],
    facts: [
      { label: koEnJa('공식 참고', 'Official reference', '公式参考'), value: koEnJa('제140회 캔톤페어', '140th Canton Fair', '第140回広州交易会') },
      { label: koEnJa('회차', 'Phases', '会期'), value: koEnJa('2026. 10. 15–11. 4, 3개 회차', 'Oct 15–Nov 4, 2026 · 3 phases', '2026年10月15日〜11月4日・3期') },
      { label: koEnJa('외부 모집', 'Group departure', '外部募集'), value: koEnJa('확인 중', 'Not yet confirmed', '確認中') },
      { label: koEnJa('확인일', 'Verified', '確認日'), value: koEnJa('2026. 9. 3', 'Sep 3, 2026', '2026年9月3日') },
    ],
    status: 'monitoring',
    officialReferenceUrl: 'https://www.cantonfair.org.cn/en-US?m=0',
    verifiedAt: '2026-09-03',
  },
]
