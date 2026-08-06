// 공유 미리보기 기본 이미지 (2026-08-07)
//
// Next는 하위 페이지가 metadata.openGraph를 정의하면 **부모의 openGraph를 통째로
// 대체**한다. images를 생략한 페이지에서는 루트 layout이 지정한 og:image가 사라져
// 카톡·LINE·페북 공유에 이미지가 뜨지 않는다(실측 64개 라우트).
//
// 그래서 openGraph를 새로 정의하는 페이지는 이 상수를 함께 넣는다.
// 세그먼트별 전용 카드가 필요하면 그 세그먼트에 opengraph-image.tsx를 두면 되고,
// 그 경우 파일 컨벤션이 이 값보다 우선한다(루트 실험으로 확인).
export const OG_DEFAULT_IMAGES = [
  {
    url: 'https://www.wakation.kr/og-wakation-ai.jpeg',
    width: 1200,
    height: 630,
    alt: 'Wakation — 일도 여행도, 내 방식대로',
  },
]
