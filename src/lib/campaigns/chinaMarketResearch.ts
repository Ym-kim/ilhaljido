import type { DisplayLocale } from '@/lib/i18n/displayLocale'

export type LocalizedCampaignText = Record<DisplayLocale, string>
export type ChinaProgramStatus = 'external_application_page'

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
export const CHINA_APPLICATION_URL = 'https://www.jungdari.com/campaign/marketresearch'

// Home exposure is separate from external availability. The application page
// remains the source of truth and may close or change before this window ends.
export const CHINA_CAMPAIGN_CONFIG = {
  active: true,
  startAt: '2026-09-03T00:00:00+09:00',
  endAt: '2026-10-21T00:00:00+09:00',
} as const

export function isChinaHomeCampaignActive(at = new Date()) {
  const time = at.getTime()
  return CHINA_CAMPAIGN_CONFIG.active
    && time >= Date.parse(CHINA_CAMPAIGN_CONFIG.startAt)
    && time < Date.parse(CHINA_CAMPAIGN_CONFIG.endAt)
}

const koEnJaZh = (KO: string, EN: string, JP: string, ZH: string): LocalizedCampaignText => ({ KO, EN, JP, ZH })

export const CHINA_RESEARCH_VARIANTS: ChinaResearchVariant[] = [
  {
    id: 'yiwu',
    city: koEnJaZh('이우', 'Yiwu', '義烏', '义乌'),
    eyebrow: koEnJaZh('126차 이우 시장조사단', 'Yiwu market research · Group 126', '第126回 義烏市場調査団', '义乌市场考察 · 第126期'),
    title: koEnJaZh('카테고리를 넓게 보고, 소싱의 기준을 잡는 일정', 'Scan broad categories and define a sourcing brief', '幅広いカテゴリーを見て、仕入れ基準をつくる日程', '广泛考察品类，明确采购标准'),
    summary: koEnJaZh(
      '대형 도매시장을 동선별로 살피며 상품군, 거래 방식과 물류 준비를 함께 정리하는 쪽에 가깝습니다.',
      'A market-led route for scanning product categories, trade practices and logistics preparation.',
      '大規模な卸売市場を回り、商品カテゴリー・取引方法・物流準備を整理するルートです。',
      '按动线走访大型批发市场，集中了解商品品类、交易方式与物流准备。',
    ),
    objective: koEnJaZh('처음 중국 소싱을 검토하거나, 여러 상품군을 빠르게 비교하고 싶은 팀', 'Teams new to China sourcing or comparing several product categories', '中国仕入れを初めて検討する方、複数カテゴリーを比較したいチーム', '初次考察中国采购，或希望快速比较多个品类的团队'),
    fit: [
      koEnJaZh('도매시장 카테고리 탐색', 'Wholesale category discovery', '卸売市場のカテゴリー探索', '批发市场品类探索'),
      koEnJaZh('통역·물류·소싱 기초 확인', 'Interpreting, logistics and sourcing basics', '通訳・物流・仕入れの基礎確認', '口译、物流与采购基础确认'),
      koEnJaZh('짧은 기간의 집중 현장 조사', 'Focused field research in a short window', '短期間の集中現地調査', '短期集中的现场调研'),
    ],
    facts: [
      { label: koEnJaZh('공개 일정', 'Published dates', '公開日程', '公开日期'), value: koEnJaZh('2026. 10. 8(목)–10. 12(월)', 'Oct 8 (Thu)–12 (Mon), 2026', '2026年10月8日（木）〜12日（月）', '2026年10月8日–12日') },
      { label: koEnJaZh('기간', 'Duration', '期間', '行程'), value: koEnJaZh('4박 5일', '4 nights / 5 days', '4泊5日', '5天4晚') },
      { label: koEnJaZh('회차', 'Group', '回次', '期次'), value: koEnJaZh('126차', 'Group 126', '第126回', '第126期') },
      { label: koEnJaZh('확인일', 'Verified', '確認日', '核验日期'), value: koEnJaZh('2026. 9. 3', 'Sep 3, 2026', '2026年9月3日', '2026年9月3日') },
    ],
    status: 'external_application_page',
    externalUrl: CHINA_APPLICATION_URL,
    officialReferenceUrl: 'https://www.yw.gov.cn/art/2008/12/29/art_1229142437_50763529.html',
    operator: koEnJaZh('BigPie C&T', 'BigPie C&T', 'BigPie C&T', 'BigPie C&T'),
    verifiedAt: '2026-09-03',
  },
  {
    id: 'guangzhou',
    city: koEnJaZh('광저우', 'Guangzhou', '広州', '广州'),
    eyebrow: koEnJaZh('127차 광저우 시장조사단', 'Guangzhou market research · Group 127', '第127回 広州市場調査団', '广州市场考察 · 第127期'),
    title: koEnJaZh('산업별 전시 흐름을 보고, 파트너 후보를 좁히는 일정', 'Follow sector phases and narrow partner candidates', '業種別の展示構成から、取引候補を絞る日程', '跟进行业展会节奏，缩小合作伙伴范围'),
    summary: koEnJaZh(
      '전시회 흐름과 산업별 공급사 후보를 중심으로 조사 계획을 세우는 쪽에 가깝습니다.',
      'A fair-led route for researching sector trends and potential supplier partners.',
      '見本市の流れと業種別の仕入先候補を中心に、調査計画を立てるルートです。',
      '以展会节奏与行业供应商候选为核心，制定现场调研计划。',
    ),
    objective: koEnJaZh('산업군이 분명하고 전시회 중심으로 공급사·파트너를 만나려는 팀', 'Teams with a defined sector seeking suppliers or partners through a trade fair', '業種が明確で、見本市を通じて仕入先やパートナーを探したいチーム', '行业方向明确，希望通过展会寻找供应商或合作伙伴的团队'),
    fit: [
      koEnJaZh('산업별 전시회 사전 조사', 'Sector-specific fair preparation', '業種別見本市の事前調査', '按行业进行展会行前调研'),
      koEnJaZh('공급사·제조 파트너 후보 정리', 'Supplier and manufacturing partner shortlist', '仕入先・製造パートナー候補の整理', '整理供应商与生产合作伙伴候选'),
      koEnJaZh('공식 회차에 맞춘 일정 설계', 'Planning around official fair phases', '公式会期に合わせた日程設計', '围绕官方展期规划行程'),
    ],
    facts: [
      { label: koEnJaZh('공개 일정', 'Published dates', '公開日程', '公开日期'), value: koEnJaZh('2026. 10. 16(금)–10. 20(화)', 'Oct 16 (Fri)–20 (Tue), 2026', '2026年10月16日（金）〜20日（火）', '2026年10月16日–20日') },
      { label: koEnJaZh('기간', 'Duration', '期間', '行程'), value: koEnJaZh('4박 5일', '4 nights / 5 days', '4泊5日', '5天4晚') },
      { label: koEnJaZh('회차', 'Group', '回次', '期次'), value: koEnJaZh('127차', 'Group 127', '第127回', '第127期') },
      { label: koEnJaZh('확인일', 'Verified', '確認日', '核验日期'), value: koEnJaZh('2026. 9. 3', 'Sep 3, 2026', '2026年9月3日', '2026年9月3日') },
    ],
    status: 'external_application_page',
    externalUrl: CHINA_APPLICATION_URL,
    officialReferenceUrl: 'https://www.cantonfair.org.cn/en-US?m=0',
    operator: koEnJaZh('BigPie C&T', 'BigPie C&T', 'BigPie C&T', 'BigPie C&T'),
    verifiedAt: '2026-09-03',
  },
]
