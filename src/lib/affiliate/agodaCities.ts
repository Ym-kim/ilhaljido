// ─────────────────────────────────────────────────────────────────────────────
// 아고다 도시 ID 대장 (2026-09-01 실측)
//
// 아고다 Affiliate Lite API의 City Search는 URL 슬러그가 아니라 **숫자 cityId**를
// 요구한다(공식 문서 예시: "cityId": 9395). 우리가 링크용으로 검증해 둔 33개
// 슬러그로는 API를 호출할 수 없어, 각 도시 페이지 HTML에서 `city=<숫자>`를
// 추출해 대장을 만들었다.
//
// ✅ 검증: 방콕에서 추출한 9395가 **공식 문서의 City Search 예제 cityId와 정확히 일치**했다.
//    → `city=` 파라미터가 API의 cityId와 같은 값임을 확인.
//
// 재수집 방법(슬러그가 바뀌거나 도시를 추가할 때):
//   curl -sL -A "<브라우저 UA>" "https://www.agoda.com/ko-kr/city/<슬러그>.html?cid=1968994" \
//     | grep -oE 'city=[0-9]+' | sort -u
//
// ⚠️ 이 값들은 아고다가 공식 제공한 매핑 파일이 아니라 **우리가 페이지에서 추출한 값**이다.
//    담당자에게 공식 city list를 받으면 대조 후 이 파일을 교체할 것.
// ─────────────────────────────────────────────────────────────────────────────

/** destinations.ts의 DestinationEntry.id → 아고다 cityId */
export const AGODA_CITY_IDS: Record<string, number> = {
  // 일본
  'japan-tokyo': 5085,
  'japan-osaka': 9590,
  'japan-fukuoka': 16527,
  'japan-kyoto': 1784,
  'japan-kobe': 5235,
  'japan-hiroshima': 10554,
  'japan-kanazawa': 18826,
  'japan-nagoya': 13740,
  'japan-sapporo': 3435,
  'japan-okinawa': 717899,
  // 한국
  'korea-seoul': 14690,
  'korea-busan': 17172,
  'korea-jeju': 16901,
  'korea-yangyang': 281124,
  // 중화권
  'taiwan-taipei': 4951,
  'china-hongkong': 16808,
  'china-shanghai': 3987,
  'china-guangzhou': 10112,
  // 동남아
  'thailand-bangkok': 9395,
  'thailand-chiangmai': 7401,
  'thailand-phuket': 16056,
  'vietnam-danang': 16440,
  'vietnam-hcmc': 13170,
  'vietnam-nhatrang': 2679,
  'philippines-cebu': 4001,
  'singapore-city': 4064,
  'indonesia-bali': 17193,
  // 호주
  'australia-sydney': 14370,
  'australia-melbourne': 10372,
  'australia-goldcoast': 16611,
  // 포르투갈
  'portugal-lisbon': 16364,
  'portugal-porto': 8738,
  'portugal-faro': 13711,
}

/**
 * 미보유 도시(아고다 도시 슬러그 자체가 미검증):
 * 강릉·속초·전주·여수·가와구치코·유후인 — 링크 단계에서도 제외돼 있다.
 * 우붓·짱구는 발리(17193) 하위 존이라 별도 cityId를 쓰지 않는다.
 */
export const AGODA_CITY_ID_COUNT = Object.keys(AGODA_CITY_IDS).length
