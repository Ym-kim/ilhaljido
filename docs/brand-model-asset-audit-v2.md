# Wakation Brand Model Asset Audit v2

기준일: 2026-08-01

## 감사 범위

- v2.2 ZIP: 콘택트시트 1, identity anchor 10, source reference 10, 문서 3, manifest 1.
- 저장소: `public/media/brand-models`, Home, 국내 입문, Trip Match, Hosted, Collections, Guide, Select, OG·SNS 경로.
- anchor/source/contact sheet는 모두 생성 참조 전용이며 공개 자산 검토 대상에서 제외한다.

## 분류

| 대상 | 판정 | 이유 | 조치 |
| --- | --- | --- | --- |
| v2.2 identity anchor A–J | `IDENTITY_ANCHOR` | 얼굴·헤어 정체성 기준 | 생성 입력에만 사용 |
| v2.2 source reference A–J | `REFERENCE_ONLY` | 장면·의상·배경 직접 게시 부적합 | 공개 경로 반입 금지 |
| v2.2 contact sheet | `ABSOLUTE_NO_USE` | 레이블·합성 시트가 포함된 내부 QA 자료 | UI·OG·SNS 금지 |
| 폐기된 이전 H/I/J | `REMOVE_FROM_UI` | v2.2가 명시적으로 대체 | 경로·ID·프롬프트 참조 차단 |
| v1 Home Hero A | `GENERATE_VARIATION` | 브랜드 방향은 적합하나 v2 다양화 필요 | v2 desktop/mobile 재생성 |
| v1 서울 D | `REMOVE_FROM_UI` | D가 Trip Match와 반복 | 새 J 장면으로 교체 |
| v1 부산 C | `REMOVE_FROM_UI` | 로스터 다양화와 행동 구분이 약함 | 새 E 장면으로 교체 |
| v1 제주 A | `REMOVE_FROM_UI` | Home과 같은 A가 인접 구간에 반복 | 새 G 장면으로 교체 |
| v1 Trip Match D | `GENERATE_VARIATION` | 모델 역할은 맞으나 장면 완성도 개선 필요 | 일정 선택 행동으로 재생성 |
| Hosted legacy hero | `REMOVE_FROM_UI` | 출처 프롬프트가 남지 않은 단독 인물 이미지 | H+I 협업 장면으로 교체 |
| Collections·Guide 목적지 이미지 | `KEEP_DIRECT` | 장소 정보가 모델보다 중요 | 현행 장소 중심 유지, crop만 QA |
| Select 실제 상품 카드 이미지 | `KEEP_DIRECT` | 실상품 정확성이 우선 | 생성 모델로 대체 금지 |
| Select 상단 텍스트 Hero | `GENERATE_VARIATION` | 준비의 감정·장면이 부족 | I 편집 배너를 보조 레이어로 추가 |
| 후기·성과·실제 프로그램 증빙 | `REAL_PHOTO_REQUIRED` | 생성 인물은 증거가 될 수 없음 | 실제 촬영 전까지 텍스트·장소 사진 유지 |

## v1 문제 진단

- 등록 4명 중 실제 UI에는 A·C·D 3명만 사용됐다.
- A가 Home과 제주, D가 서울과 Trip Match에 반복되어 다른 얼굴처럼 느끼기 어려웠다.
- Hosted의 레거시 Hero는 모델 ID·생성 프롬프트 추적성이 부족했다.
- 국내 입문 카드 3개가 같은 구도·행동 밀도로 보여 도시별 감정 차이가 약했다.
- 모델 자산 감사가 A–D와 6개 파일에 하드코딩되어 v2.2 명단·교체 상태·노출 비율을 검증하지 못했다.

## 자동 QA 요구사항

- A–J 10명 등록, 새 H/I/J descriptor와 replacement 기록 확인.
- 모든 공개 모델 자산의 파일·크기·해시·규격·WebP·manifest 등록 확인.
- KO·EN·JA alt, `illustrative`, model ID, route/section, focal point, 생성일, restriction 확인.
- anchor, source reference, contact sheet, `reference-only` 파일이 `public/` 또는 UI에 노출되지 않는지 확인.
- 모델 이미지가 후기·실적·숙소·실제 체험·신청 증빙 영역에 쓰이지 않는지 확인.
- 공개 배치에서 최소 5명 사용, 한 모델 25% 이하, 인접 주요 카드 동일 모델 금지.
- Collections·Guide·상품 중심 자산을 합산해 비모델 이미지 비중 50% 이상 유지.

## 구현 후 결과

- 공식 roster: A–J 10명, version `2.2`.
- UI 노출 정체성: A·D·E·G·H·I·J 7명.
- 정체성 노출 8회 중 I 2회(25%), 나머지 각 1회(12.5%). desktop/mobile 파생본은 같은 배치로 계산했다.
- 국내 입문 카드: J → E → G로 인접 모델 중복 없음.
- v2 공개 자산: 9개, 총 785,206 bytes, 개별 최대 142,892 bytes.
- 장소·공간·상품 중심 주요 화면: 8/15, 53.3%.
- `reference`, `anchor`, `contact sheet`, `source sheet` 파일의 `public/` 노출 없음.
- 후기·실적·실상품·실제 프로그램 증빙 영역의 생성 모델 이미지 사용 없음.
- 360×800, 390×844, 430×932, 768×1024, 1024×768, 1440×900에서 Home·Hosted·Trip Match·Select 이미지 로딩과 가로 overflow 없음.
- KO·EN·JA alt와 Hosted KO·EN·JA OG 이미지가 v2 자산으로 동기화됨.
