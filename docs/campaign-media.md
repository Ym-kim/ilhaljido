# Wakation campaign media

Trip Set 캠페인 이미지는 특정 숙소·관광지·행사 또는 실제 참가자를 기록한 사진이 아니다. 도시의 체류 분위기와 일·여행의 균형을 표현하기 위해 제작한 편집용 이미지다.

## 관리 원칙

- `sourceType: generated`: 프로젝트가 생성한 합성·AI 편집 이미지
- `usage: editorial`: 목적지의 분위기를 설명하는 편집 용도
- `illustrative: true`: 실제 현장·숙소·참가자 증거로 사용하지 않음
- 실제 숙소 상품 카드에는 제휴사가 제공하거나 사용권이 확인된 해당 숙소 이미지만 사용
- 실제 후기·참가자·파트너·행사 이미지로 오인시키는 문구와 함께 사용하지 않음
- alt에는 특정하지 않은 실제 장소나 건물명을 단정하지 않음

정확한 자산별 출처·라이선스·생성일·다국어 alt·focal point는 `src/data/trip-set-campaigns.json`에서 관리한다. SNS 파생 자산의 규격·파일 hash·텍스트 안전영역은 `public/social/trip-sets/manifest.json`에 기록된다.

재생성 및 검증:

```bash
npm run social:trip-sets
npm run social:trip-sets:validate
```

공식 공개 문의 이메일은 `wakation.sf@gmail.com`이다.
