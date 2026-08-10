# Wakation model styling, seasonality and realism rules

기준일: 2026-08-10

## 1. 문제 진단

기존 생성 자산은 안전성과 구도는 안정적이었지만 다음 패턴이 반복됐다.

- 노트북 앞에 앉거나 정면으로 서 있는 정적 자세
- 단색 블라우스와 와이드 팬츠 중심의 단정한 오피스룩
- 긴 생머리와 차분한 무표정의 반복
- 계절이 여름인데도 라운지·오피스 조명과 회사원 스타일이 우세한 장면
- 피부·머리카락·옷이 지나치게 매끈해 보이는 생성 이미지 유형

이번 패스의 우선 교체 대상은 새 Tokyo immersive-art 자산이었다. v1은 실사 품질과 카피 안전 영역은 좋았지만, 짧은 블라우스·차콜 팬츠·정적인 전시 관람 자세가 Trip Match 모델 D와 유사했다.

## 2. 기본 시각 방향

- 목표는 `high_photoreal_editorial`: 실제 카메라로 촬영한 동아시아 여행 라이프스타일 화보에 가까운 결과다.
- 모델은 실제 참가자·후기·상품 이용자·호텔 투숙객의 증빙으로 사용하지 않는다.
- 장소·공간·음식·교통·상품 중심 이미지를 전체 주요 이미지의 50% 이상 유지한다.
- 모든 모델을 화려하게 만들지 않는다. 도시형, 코스탈형, 로컬형, 프리미엄형, 소셜형, 패션 에디토리얼형을 route와 모델별로 분담한다.

## 3. 패션·헤어·활동 규칙

### 패션

- 여름에는 린넨, 가벼운 코튼, 얇은 니트, 셔츠 원피스, 스커트, 산뜻한 셋업, 데님과 여성스러운 상의를 우선한다.
- 인접 자산에서 블라우스+와이드 팬츠가 반복되면 다음 자산은 원피스, 스커트, 쇼츠 또는 리조트 셋업으로 바꾼다.
- 샌들·로퍼·스니커즈는 장소와 이동량에 맞춘다. 수영복과 과도한 노출, 몸매 중심 포즈는 사용하지 않는다.

### 헤어

- 동일 모델도 loose straight, soft wave, C-curl, low ponytail, low bun, half-up 중 장면에 맞는 형태를 바꾼다.
- 해안은 바람의 움직임, 이동은 묶은 머리, 프리미엄 라운지는 정돈형, 도시 카페는 웨이브·스트레이트를 우선한다.

### 활동

- 걷기, 친구와 대화하기, 커피를 들고 이동하기, 지도 확인하기, 노트북을 닫고 떠나기, 바다나 작품을 바라보기를 우선한다.
- 카메라 정면 응시, 매번 앉은 노트북 장면, 정지된 전신 화보 포즈를 기본값으로 사용하지 않는다.

## 4. 계절 시스템

신규 generated model asset은 다음 metadata를 기본으로 기록한다.

```text
seasonalUsage
climateMood
wardrobeTags
activityTags
travelContext
styleDirection
seasonalFit
activityMood
realismTarget
realismMethod
photorealReferenceUsed
```

8월 기본값:

- 밝은 팔레트와 통기성 소재
- 걷기·이동·대화처럼 동작이 보이는 장면
- 열린 공간과 자연광, 또는 실제성이 있는 실내광
- 아이스 음료, 선글라스, 가벼운 토트, 작은 여행 가방 같은 제한적인 계절 소품
- 두꺼운 재킷·코트·겨울 니트·답답한 오피스 정장은 제외

9월 중순 이후에는 가벼운 긴소매와 억새·낮은 골든아워를 늘리고, 11월 이후에는 겨울 자산으로 명시적으로 교체한다.

## 5. Section별 기본 방향

| Section | 스타일 방향 | 기본 활동 | 모델 사용 주의 |
| --- | --- | --- | --- |
| Home Hero | 밝은 해안 여름과 출발 직전의 움직임 | 노트북 닫기, 가방 챙기기 | 모델 영상·이미지를 첫 화면 전체의 유일한 정보로 만들지 않음 |
| Domestic | 지역별 실제 풍경 우선, 친근한 여름 여행복 | 걷기, 대화, 기록 | 카드 인접 모델 중복 금지 |
| Trip Match | 도시적 선택과 출발 | 일정 비교, 이동 준비 | 라운지 오피스룩 반복 금지 |
| Hosted | 소셜·협업·함께 머무름 | 지도와 일정 대화 | 실제 참가자처럼 표현 금지 |
| Collection / Trip Set | 여행 감정과 Day 흐름 | 이동, 산책, 체험 전환 | 실제 상품 사진이 필요한 곳은 생성 모델로 대체 금지 |
| Guide | 실제 도시·장소 이미지 우선 | 보조 editorial에만 모델 | 도시 대표 이미지를 모델만으로 구성하지 않음 |
| Social / Campaign / OG | 한 장면 한 메시지 | 걷기, 대화, 출발 | 텍스트 안전 영역과 mobile crop 필수 |

## 6. 모델별 스타일 역할

코드의 `BRAND_MODEL_STYLING_RULES`가 단일 진실 공급원이다. A–K 모두 `styleDirection`, `summerWardrobe`, `seasonalFit`, `activityMood`, `hairVariation`, `realismLevel`, `photorealReferenceUsed`를 가진다.

- A/G: 코스탈·슬로 스테이와 바람의 움직임
- B/H: 밝은 도시·로컬·소셜 장면
- C/I: 프리미엄·비즈니스지만 가벼운 계절 소재
- D/J: 전시·도시 야간과 더 선명한 패션 감도
- E/F: 주말 이동·시장·카페의 활동성
- K: 학습·체류 설계를 실용적이고 창의적으로 표현

## 7. 실사감 규칙과 negative prompt

필수 표현:

```text
high-end lifestyle photography, travel editorial photography,
realistic skin texture, natural lighting, believable anatomy,
authentic fabric texture, subtle imperfections, restrained color grade
```

반드시 피할 것:

```text
plastic skin, glossy AI beauty filter, synthetic hair clumps,
perfectly symmetrical face, distorted fingers, duplicate limbs,
warped architecture, beauty-ad close-up, static front-facing pose,
heavy off-season wardrobe, readable logos or signage
```

## 8. 모델·장소·도식 선택

- 감정, 행동, 사람의 전환이 핵심이면 모델을 사용한다.
- 도시, 숙소, 교통, 음식, 실제 체험 조건이 핵심이면 검증된 장소·상품 이미지를 사용한다.
- 비교, 절차, 데이터가 핵심이면 텍스트·표·도식을 사용한다.
- 생성 모델은 실제 후기, 실제 참가자, 실제 숙소 객실, 실제 상품 대표 사진으로 사용하지 않는다.

## 9. Photoreal fallback

1. built-in ImageGen에 identity-preserve + 강화된 realism prompt를 우선한다.
2. 동일 파이프라인에서 실제 reference, 자연광, 패브릭·피부·손 negative prompt를 강화한다.
3. 현재 연결된 더 높은 포토리얼 도구가 있고 기존 구조를 깨지 않을 때만 검토한다.
4. 외부 API 신규 의존성이나 secret 추가가 필요한 경우 Sprint를 지연시키지 않고 별도 승인 과제로 둔다.

이번 패스에서는 built-in ImageGen으로 충분한 실사감과 구도 품질을 확보했으므로 새 MCP/API 의존성을 추가하지 않았다.

## 10. 승인 체크리스트

- 실제 사람과 실제 촬영처럼 보이는 피부·광원·패브릭인가
- 손·팔·다리·치아·귀·헤어·반사·배경 원근이 자연스러운가
- 계절과 장소에 맞는 복장인가
- 인접 자산과 패션·헤어·자세가 겹치지 않는가
- 여행·업무·휴식 중 최소 한 가지 행동이 분명한가
- 선정적 노출이나 패션몰식 몸매 강조가 없는가
- 생성 모델이 실제 상품 이용자나 후기 인물로 오인되지 않는가
- desktop/mobile crop에서 얼굴·손·소품·동작이 보이는가
- 모델 Hero는 머리 위 여백을 최소 4% 확보하고, 어떤 데스크톱 비율에서도 정수리·얼굴이 잘리지 않는가
- 전신 또는 핵심 소품이 메시지인 Hero는 초광폭 화면에서 `cover`를 강제하지 않고 `full-subject-desktop` 프레이밍을 사용했는가
- 머리·얼굴·손과 장면의 핵심 소품(가방·노트북·서류 등)은 crop 보존 목록에 기록했는가
- 카피·CTA 안전 영역이 유지되는가
- KO·EN·JA alt와 source/restriction metadata가 있는가

위 항목 중 하나라도 실패하면 regenerate 또는 reject한다. 특히 플라스틱 피부, 정면 화보 포즈, 계절 불일치, 동일 복장 반복, 합성 같은 배경은 즉시 reject 대상이다.

## 11. 이번 적용

- 교체: `experience-tokyo-model-d-immersive-gallery-v1` → `experience-tokyo-model-d-immersive-gallery-v2`
- 유지: 기존 late-summer wardrobe audit를 통과한 26개 active production image. 이미 적절한 자산은 재생성하지 않았다.
- v2 변화: 긴 생머리·블라우스·팬츠·정지 자세를 low ponytail, sleeveless fine-knit, cobalt pleated midi skirt, travel sandals, 자연스러운 walking gesture로 변경했다.
- 오인 방지: 실제 teamLab 작품·전시장·관람객 또는 Klook 상품 사진이 아님을 manifest에 유지한다.
