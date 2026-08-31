import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 참가자 실후기 레지스트리 (2026-08-31 신설, 더휴일 벤치마크)
//
// ⚠️ 정직성 절대 원칙: 이 배열에는 **실제 참가자가 남긴 후기만** 들어간다.
//   지어낸 후기·문체만 다듬은 창작·타사이트 후기 이식 금지.
// 등재 절차: ①/reviews/submit 폼 또는 운영자 수집(양양 원문 등)으로 접수
//   ②운영자가 실참가 여부 확인 ③게재 동의 확인 ④여기 추가(consent: true만)
// 표기: author는 참가자가 동의한 형태(실명 또는 '김OO'·이니셜). quote는 원문
//   그대로가 원칙(맞춤법 정리만 허용, 내용 각색 금지). EN/JP 번역은 원문 병기 전제.
// 0건이면 홈 ReviewRail 섹션 자체가 렌더되지 않는다 — 빈 상태로 배포해도 안전.
// ─────────────────────────────────────────────────────────────────────────────

export type ParticipantReview = {
  id: string
  /** 동의받은 표기명 (예: '김OO', '이지은') */
  author: string
  /** 참여 프로그램 표기 (예: '양양 워케이션 1기') */
  program: Record<Lang, string>
  /** 참여 시점 (YYYY-MM) */
  stayedAt: string
  /** 후기 원문 — KO는 원문 그대로, EN/JP는 번역 */
  quote: Record<Lang, string>
  /** 게재 동의 확인 여부 — true만 등재 가능 */
  consent: true
  /** 운영자 검증일 */
  verifiedAt: string
}

export const PARTICIPANT_REVIEWS: ParticipantReview[] = [
  // 양양 1기 원문 도착 시 여기에 등재 (검증·동의 절차 후)
]

// ─────────────────────────────────────────────────────────────────────────────
// 에디터 노트 (2026-08-31, 운영자 지시 "후기 전 소개형 콘텐츠로 알차게") —
// 참가자 후기가 아니라 **저자를 명시한 소개 콘텐츠**다. 참가자 사칭 금지·
// 실측/검증 사실 기반·'후기' 라벨 미사용이 허용 조건(원칙 유연화의 경계).
// 레일에서 '에디터 노트' 칩으로 참가자 후기와 명확히 구분 렌더된다.
// ─────────────────────────────────────────────────────────────────────────────

export type EditorNote = {
  id: string
  /** 저자 표기 — 'Wakation 운영팀' | 'Wakation 에디터' 등 실제 주체 */
  author: Record<Lang, string>
  /** 무엇에 대한 노트인지 */
  source: Record<Lang, string>
  quote: Record<Lang, string>
}

export const EDITOR_NOTES: EditorNote[] = [
  {
    id: 'note-yangyang-ops',
    author: { KO: 'Wakation 운영팀', EN: 'Wakation ops team', JP: 'Wakation運営チーム' },
    source: { KO: '양양 워케이션 1기 운영 노트', EN: 'Yangyang workation, cohort 1', JP: '襄陽ワーケーション第1期' },
    quote: {
      KO: '1기를 직접 운영하며 실측한 숫자는 종합 만족도 4.7/5, 재참여 의향 100%. 숫자보다 기억에 남는 건 마지막 날 가장 많이 들은 말이 "생각보다 일이 잘 되더라"였다는 겁니다.',
      EN: 'Running cohort 1 ourselves, we measured 4.7/5 satisfaction and 100% would-join-again. What stuck with us more: the most common last-day comment was "I got more done than I expected."',
      JP: '第1期を直接運営して実測した数字は総合満足度4.7/5、再参加意向100%。数字より印象的だったのは、最終日に一番多く聞いた言葉が「思ったより仕事がはかどった」だったことです。',
    },
  },
  {
    id: 'note-fukuoka-first',
    author: { KO: 'Wakation 에디터', EN: 'Wakation editor', JP: 'Wakationエディター' },
    source: { KO: '후쿠오카 가이드', EN: 'Fukuoka guide', JP: '福岡ガイド' },
    quote: {
      KO: '첫 해외 워케이션 도시를 물으면 후쿠오카를 자주 권합니다. 공항에서 지하철로 10분대에 도심 — 도착 당일부터 일이 되는 도시는 생각보다 드물거든요.',
      EN: 'Asked about a first overseas workation city, we often say Fukuoka. Downtown is about ten minutes from the airport by subway — cities where you can work on arrival day are rarer than you think.',
      JP: '初めての海外ワーケーション先を聞かれたら、よく福岡を勧めます。空港から地下鉄で10分台で都心へ — 到着当日から仕事になる街は意外と少ないんです。',
    },
  },
  {
    id: 'note-cruise-wifi',
    author: { KO: 'Wakation 에디터', EN: 'Wakation editor', JP: 'Wakationエディター' },
    source: { KO: '크루즈 워케이션 아티클', EN: 'Cruise workation stories', JP: 'クルーズ特集' },
    quote: {
      KO: '"배 위에서 일이 되나요?"라는 질문에 답하려고 선사 공식 자료로 위성 와이파이부터 확인하고 아티클 4편을 썼습니다. 화상회의 중심이면 비추천이라는 말까지 정직하게 적었고요.',
      EN: 'To answer "can you actually work on a ship?", we verified satellite Wi-Fi from official line sources first, then wrote four stories — including an honest "not for video-call-heavy work".',
      JP: '「船の上で仕事になる？」に答えるため、船会社の公式資料で衛星Wi-Fiから確認して特集を4本書きました。ビデオ会議中心なら非推奨、というところまで正直に。',
    },
  },
  {
    id: 'note-support-catalog',
    author: { KO: 'Wakation 에디터', EN: 'Wakation editor', JP: 'Wakationエディター' },
    source: { KO: '지자체 지원사업 카탈로그', EN: 'Local subsidy catalog', JP: '自治体支援カタログ' },
    quote: {
      KO: '전국 지자체 워케이션 지원사업을 공식 출처만 골라 20곳, 확인일과 함께 정리해 둡니다. 마감·조건이 수시로 바뀌는 동네라, 신청 전 마지막 확인은 언제나 공식 공고에서 하시게끔요.',
      EN: 'We keep 20 local workation subsidy programs, sourced only from official notices, each with its verification date — and always point you back to the official notice before you apply.',
      JP: '全国の自治体ワーケーション支援を公式出典のみで20件、確認日付きで整理しています。締切・条件が変わりやすい分野なので、申請前の最終確認は必ず公式公告で。',
    },
  },
]
