# Wakation Brand Model Asset Production List v2

기준일: 2026-08-10

## 판정 체계

`KEEP`, `RECROP`, `RESTYLE`, `REGENERATE_REALISM`, `REPLACE_MODEL`, `REPLACE_WITH_PLACE`, `REPLACE_WITH_DIAGRAM`, `REMOVE`, `REAL_PHOTO_REQUIRED`를 사용한다.

## P0

| Surface | Model | 판정 | 상태 | 비고 |
| --- | --- | --- | --- | --- |
| Home desktop | A | REGENERATE_REALISM → KEEP | 완료 | v3 WebP/AVIF, 늦여름 출발 행동 |
| Home mobile | A | REGENERATE_REALISM → KEEP | 완료 | 별도 세로 art direction |
| Home Seoul | B/J/I 후보 | REPLACE_WITH_PLACE | 완료 | 실제 도시 맥락이 우선이라 장소 이미지 유지 |
| Home Busan | E | REPLACE_WITH_PLACE | 완료 | 위치 신뢰를 위해 장소 이미지 유지 |
| Home Jeju | G | REPLACE_WITH_PLACE | 완료 | 장소 이미지 유지, K 모델 카드 비활성 |
| Home Gangneung | H 후보 | KEEP | 완료 | 라이선스 확인 장소 이미지 유지 |
| Trip Match urban | D | KEEP | 완료 | 손·기기·카피 여백 통과 |
| Trip Match coastal | C | REPLACE_WITH_PLACE | 보류 | 결과 맥락 데이터가 확정될 때 제작 |
| Hosted | H + I | KEEP | 완료 | 협업 행동과 계절감 통과 |
| Select hotel/editorial | I | KEEP | 완료 | 외부 호텔 실사로 오인되지 않는 이동 장면 |
| Learn | K → B | REPLACE_MODEL | 완료 | 공식 B 학습 장면 사용 |
| Programs | K → H + I | REPLACE_MODEL | 완료 | 공식 Hosted planning 장면 사용 |
| Business | C + H + K → C | REPLACE_MODEL | 완료 | 공식 C 장면으로 회귀 |
| Home seasonal film | A + F + K | REMOVE | 완료 | v2.2 영상 제작 전까지 재생 비활성 |

## P1

| 대상 | 권장 모델/이미지 | 상태 | 제작 원칙 |
| --- | --- | --- | --- |
| Seoul guide lookbook | I + 장소 이미지 | 완료 | 시원한 늦여름 복장의 퇴근 후 디자인 골목과 비 온 뒤 저녁 동네를 모델·장소 장면으로 분리 |
| Busan guide lookbook | E + 실제 광안리 사진 | 완료 | 모델 E 늦여름 전신 해안 장면 + CC BY-SA 2.0 광안리 야경 |
| Jeju guide lookbook | G / A / H | backlog | 실제 숙소·참가자처럼 보이는 생성 금지 |
| Fukuoka lookbook | H + 장소 이미지 | 완료 | 카페 업무·저녁 골목·근교 체험을 서로 다른 장면과 섹션으로 분리 |
| Osaka lookbook | J + 장소 이미지 | 완료 | 아침 시장 골목과 퇴근 후 전시·도시 이동을 서로 다른 장면으로 분리 |
| Business team | C + H + I | backlog | 실제 팀 증거가 아닌 편집 장면, desktop/mobile 별도 |

## P2

| 대상 | 상태 | 원칙 |
| --- | --- | --- |
| Social 4:5 | backlog | route와 같은 모델을 무조건 반복하지 않음 |
| Story/Reels 9:16 | backlog | 3–5초 행동 단위, 텍스트는 영상 위 UI에서 처리 |
| OG 1.91:1 | backlog | 얼굴 close-up 대신 장소와 카피 안전영역 우선 |
| Campaign variants | backlog | 실제 할인·마감·참가자 증거처럼 표현 금지 |

## 아카이브

K 모델 관련 WebP와 K가 포함된 영상/팀 이미지는 생성 이력 검증을 위해 파일과 manifest에 남기되 active component와 `modelRotation.ts`에서 제외한다. 새 제작에는 공식 v2.2 A–J만 사용한다.
