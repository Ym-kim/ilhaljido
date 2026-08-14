import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 외부 파트너 링크 로케일 매칭 (2026-08-14, 운영자 지시)
// 사이트 언어(EN/JP)로 보는 사용자가 파트너 사이트도 같은 언어로 열리게 한다.
//
// ⚠️ 화이트리스트 원칙: **실측 검증된 패턴만** 변환한다. 제휴 파라미터(aid·cid·
// Allianceid·utm)는 절대 건드리지 않는다 — 호스트/경로 프리픽스만 바꾼다.
//
// 검증 기록 (2026-08-14 curl 실측):
// - inflearn.com: /ko|/en|/ja 경로가 저장된 언어 설정을 이기고 서버 강제
//   (<html lang> 3종 확인). /course 상세는 /ko 미지원(307로 프리픽스 탈락) → 미변환
// - trip.com: kr./www./jp. 서브도메인 = 로케일. 도쿄 228·강릉 -si·여수 무접미·
//   나트랑 딥링크 + 크루즈 ship URL + cruises 루트가 www/jp 전부 200,
//   쿼리 파라미터(Allianceid 포함) 보존 확인
//
// 2차 검증 추가 (2026-08-14):
// - klook.com: /ko/ ↔ /en-US/ ↔ /ja/ — 운영자 검증 선례(teamlab deepLinks 3로케일,
//   featured.ts operatorAction 2026-08-10) + affiliate.klook.com/redirect가 en-US
//   k_site를 302로 통과시키며 aid=126848 자동 부착하는 것 curl 실측
// - airalo.com(pxf.io u= 내부): /ko|/ja 프리픽스, 무프리픽스=영어 —
//   8개 랜딩 전부 × ko/ja 200 + <html lang> 실측. 소스 KO 링크에 /ko 명시 완료
//
// 미검증 → 변환 제외(원본 KO 링크 유지): KKday·Booking·inf.run
// (봇월로 실측 불가 — 검증 후 여기에 규칙만 추가하면 전 카드 반영)
// ─────────────────────────────────────────────────────────────────────────────

export function localizeOutboundHref(href: string, lang: Lang): string {
  if (lang === 'KO') return href
  try {
    const u = new URL(href)

    // Klook 직링크 — /ko/ 프리픽스 로케일 스왑 (activity·insurance 등 전 경로)
    if (u.hostname === 'www.klook.com') {
      const target = lang === 'EN' ? '/en-US' : '/ja'
      if (u.pathname === '/ko') u.pathname = target
      else if (u.pathname.startsWith('/ko/')) u.pathname = target + u.pathname.slice(3)
      else return href
      return u.toString()
    }

    // Klook 공식 리다이렉트 — k_site 내부 URL에 직링크 규칙 재귀 적용 (aid 등 무변경)
    if (u.hostname === 'affiliate.klook.com' && u.pathname === '/redirect') {
      const inner = u.searchParams.get('k_site')
      if (inner) {
        const swapped = localizeOutboundHref(inner, lang)
        if (swapped !== inner) {
          u.searchParams.set('k_site', swapped)
          return u.toString()
        }
      }
      return href
    }

    // Airalo(Impact 추적) — u= 내부 랜딩의 /ko 프리픽스를 언어에 맞게 (EN=무프리픽스)
    if (u.hostname === 'airalo.pxf.io') {
      const inner = u.searchParams.get('u')
      if (inner) {
        try {
          const iu = new URL(inner)
          if (iu.hostname === 'www.airalo.com' && (iu.pathname === '/ko' || iu.pathname.startsWith('/ko/'))) {
            const rest = iu.pathname === '/ko' ? '' : iu.pathname.slice(3)
            iu.pathname = lang === 'EN' ? (rest || '/') : `/ja${rest}`
            u.searchParams.set('u', iu.toString())
            return u.toString()
          }
        } catch { /* 내부 URL 이상 시 원본 유지 */ }
      }
      return href
    }

    // 인프런 — /ko 프리픽스가 명시된 경로만 언어 스왑
    if (u.hostname === 'www.inflearn.com') {
      const target = lang === 'EN' ? '/en' : '/ja'
      if (u.pathname === '/ko') u.pathname = target
      else if (u.pathname.startsWith('/ko/')) u.pathname = target + u.pathname.slice(3)
      else return href
      return u.toString()
    }

    // Trip.com — 서브도메인 = 로케일 (경로·쿼리 무변경 → 제휴 파라미터 보존)
    if (u.hostname === 'kr.trip.com') {
      u.hostname = lang === 'EN' ? 'www.trip.com' : 'jp.trip.com'
      return u.toString()
    }
  } catch {
    // 잘못된 URL은 원본 유지
  }
  return href
}
