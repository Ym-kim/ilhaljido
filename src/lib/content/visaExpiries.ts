// ─────────────────────────────────────────────────────────────────────────────
// 한시성 비자 제도 레지스트리 (2026-08-04 visa-freshness-guard-v1)
//
// 배경: K-ETA 일본 한시 면제(2026-12-31 만료)가 코드 주석과 JP 문자열에만 있어
// 만료를 알려줄 장치가 없었음. 날짜 있는 한시 제도를 여기 등록하면
// `npm run audit:visa-freshness`가 만료 90일 전 경고·만료 후 실패로 알려준다.
//
// 등록 기준: 공식 출처로 확인된 "만료일이 있는" 제도만. 날짜 없는 관찰 대상
// (태국 30일 축소 등)은 분기 점검 룰로 관리 — 여기 넣지 않는다.
// ─────────────────────────────────────────────────────────────────────────────

export type VisaExpiry = {
  id: string
  /** 공식 만료일 (YYYY-MM-DD) — 이 날짜가 지나면 감사 실패 */
  expires: string
  summary: string
  /** 만료 시 수정해야 할 위치·작업 */
  action: string
  /** 표기가 실존해야 하는 파일 → 마커 문자열 (감사가 존재를 교차 검증) */
  markers: { file: string; contains: string }[]
  officialSource: string
}

export const VISA_EXPIRIES: VisaExpiry[] = [
  {
    id: 'keta-japan-exemption',
    expires: '2026-12-31',
    summary: 'K-ETA 일본 등 22개국 한시 면제 (외교부)',
    action: '서울·부산·전주·여수 가이드 visaFree JP 문구(K-ETA免除は2026年末まで) 갱신 — 연장 시 날짜 수정, 종료 시 문구 제거',
    markers: [{ file: 'src/lib/guides.ts', contains: 'K-ETA免除は2026年末まで' }],
    officialSource: '외교부 공지 (guides.ts:485 검증 주석)',
  },
  {
    id: 'vietnam-45d-exemption',
    expires: '2028-03-31',
    summary: '베트남 무비자 45일 한시 조치 (2028.3까지 — 재결정 예정)',
    action:
      'content.ts visaByCountry 베트남 3언어 + cities.ts 다낭 visaFree·pros + guides.ts danang visaFree + destinations.ts 다낭 태그·localizeDest 사전(무비자 45일) 전량 갱신',
    markers: [
      { file: 'src/lib/i18n/content.ts', contains: '45일 면제는 2028.3까지 한시 조치' },
      { file: 'src/lib/cities.ts', contains: '무비자 45일 (2028.3까지 한시)' },
      { file: 'src/lib/guides.ts', contains: '무비자 45일 (2028.3까지 한시)' },
    ],
    officialSource: '2026-07 비자 리서치 (content.ts:181·290 검증 표현)',
  },
]
