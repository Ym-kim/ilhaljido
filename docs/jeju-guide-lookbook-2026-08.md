# Jeju guide lookbook — 2026-08

## 목적

제주 가이드의 정보 카드 사이에 업무 후 섬 산책과 실제 협재 해안을 분리해 보여주는 2장 룩북을 추가한다. 생성 이미지는 실제 참가자·숙소·프로그램의 증거로 사용하지 않으며, 실제 장소 장면은 라이선스가 확인된 사진만 사용한다.

## 생성 자산

### `jeju-model-g-after-rain-coast-v1`

- 도구: OpenAI built-in ImageGen
- 참조: `domestic-jeju-model-g-slow-stay-v2`, `monthly-2026-08-model-g-coastal-book-cafe-v2`
- 모델: WAK-MODEL-G
- 장면: 늦여름 소나기 뒤, 장소를 특정하지 않는 제주풍 현무암 돌담 해안길
- 복장: 아이보리 민소매 리넨 블라우스, 세이지 와이드 리넨 팬츠, 플랫 샌들
- 안전 구도: 머리·얼굴·손·가방·노트북 슬리브·양발 보존, 머리 위 여백 12%
- 금지: 실제 제주 고객·참가자·숙소·프로그램·특정 장소 사진으로 표시

## 실제 장소 자산

### `jeju-hyeopjae-volcanic-coast-licensed-v1`

- 장소: 제주 협재 해변에서 바라본 화산 해안과 비양도
- 원본: <https://commons.wikimedia.org/wiki/File:Volcanic_Coastline.jpg>
- 저작자: Lcarrion88
- 라이선스: CC BY-SA 4.0
- 처리: 3:2 크롭, 미세 노출·채도 조정, WebP·AVIF 최적화
- 표시 원칙: 저작자와 라이선스를 미디어 출처에서 유지하고, Wakation 후원으로 오인시키지 않음

## 적용 경로

- `/guide/jeju`
- `/en/guide/jeju`
- `/ja/guide/jeju`

## 검수 기준

- 데스크톱과 390px 모바일에서 모델의 머리와 발이 카드 크롭 안에 남을 것
- KO/EN/JA 제목과 설명에 가로 오버플로가 없을 것
- 실제 장소 사진과 생성 모델 이미지를 매니페스트에서 구분할 것
- 모델 노출 비중은 50% 상한 이하일 것
