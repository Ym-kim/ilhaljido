import type { Metadata } from 'next'
import Link from 'next/link'
import { Plane, Wifi, Coffee, CalendarDays, AlertCircle, MapPin, Moon } from 'lucide-react'
import { ShareButton } from '@/components/share/ShareButton'

// ─────────────────────────────────────────────────────────────────────────────
// /campaign/chuseok-4days — 2026 추석 나흘 워케이션 에디토리얼 (2026-08-03)
// 팩트 검증(전부 기존 검증값 재사용 — 신규 주장 0):
// · 2026 추석 연휴 = 9/24(목)~9/27(일) 나흘, 대체공휴일 없음 (collections.ts 추석 세트,
//   2026-07-19 검증) / 시차 0시간·직항 1~2시간대 일본 3거점 = 동일 출처
// · 도쿄 코워킹 2개층 내장 숙소(.andwork)·직항 약 2h20m = 도쿄 가이드 검증(07-28)
// · 후쿠오카공항—하카타 지하철 직결 = 후쿠오카 세트 검증 / KTX-청룡 2h17m·부산 거점센터
//   50석 = 부산 세트 검증(공식 출처, 07-28) / 김포—제주 약 1h10m = 제주 가이드 검증
// · eSIM 사전 설치·주유패스 교통+40곳 = 제휴 상품 실문구
// 미표기: 연휴 항공·숙소 가격(변동), "매진 임박" 류 긴급성 표현(정책 금지),
// 연휴 혼잡도 수치(미검증). CTA는 전부 실존 Trip Set — 패키지 판매 아님(개별 예약 고지).
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: '추석 나흘, 워케이션으로 보내는 법 — 2026 연휴 가이드',
  description:
    '2026 추석 연휴는 9/24(목)~9/27(일) 나흘. 시차 0시간의 일본 3거점부터 부산·제주까지 — 연차 없이 떠나는 나흘 워케이션 설계법.',
  alternates: { canonical: 'https://www.wakation.kr/campaign/chuseok-4days' },
  openGraph: {
    title: '추석 나흘, 워케이션으로 보내는 법 | Wakation',
    description: '9/24–9/27 나흘 연휴 — 일본 3거점과 부산·제주로 떠나는 워케이션 설계.',
    url: 'https://www.wakation.kr/campaign/chuseok-4days',
    siteName: 'Wakation',
  },
}

const CTA_CLS =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all'

function SetCtas({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${compact ? '' : 'justify-center'}`}>
      <Link
        href="/collections/chuseok-short-haul?src=article"
        className={`${CTA_CLS} bg-brand-mid text-white hover:bg-brand-light shadow-md`}
      >
        <Plane className="w-4 h-4" />
        추석 단거리 세트 보기
      </Link>
      <Link
        href="/collections"
        className={`${CTA_CLS} border border-gray-300 text-gray-600 hover:border-brand-mid hover:text-brand-mid`}
      >
        전체 Trip Set 보기
      </Link>
    </div>
  )
}

export default function ChuseokFourDaysPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-amber-300 text-xs font-black tracking-widest uppercase mb-4">
            Chuseok 2026 · 9/24 – 9/27
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            연차 없이 나흘,
            <br />
            연휴를 워케이션으로
          </h1>
          <span className="block text-white/70 text-lg mt-5 max-w-xl mx-auto">
            2026년 추석 연휴는 목요일부터 일요일까지 나흘. 시차 0시간의 일본 3거점부터
            부산·제주까지 — 밀린 일 조금과 온전한 휴식을 한 번에 담는 설계법입니다.
          </span>
          <div className="mt-8">
            <SetCtas />
          </div>
          <span className="block text-white/40 text-xs mt-4">
            세트 안 상품은 제휴사에서 개별 예약됩니다 · 요금·일정은 예약 페이지에서 최종 확인
          </span>
        </div>
      </section>

      {/* 팩트 스트립 */}
      <section className="bg-[#fffbeb] border-b border-[#fde68a] px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['9/24(목)–9/27(일)', '나흘 연휴 · 대체공휴일 없음'],
            ['시차 0시간', '일본 — 회의·마감 그대로'],
            ['직항 1~2시간대', '후쿠오카 · 오사카 · 도쿄'],
            ['국내 대안', '부산 2박 3일 · 제주 혼자 회복'],
          ].map(([v, l]) => (
            <div key={v}>
              <span className="block font-black text-[#78350f]">{v}</span>
              <span className="block text-xs text-[#a16207] mt-0.5">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 추천 타겟 */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">이런 분께 맞는 연휴입니다</h2>
          <div className="space-y-5">
            {[
              ['연차를 붙이기 어려운 직장인', '올해 추석은 대체공휴일 없이 딱 나흘 — 연차 결재 없이도 목요일 아침 출발, 일요일 저녁 복귀가 됩니다. 나흘이면 짧은 해외 워케이션의 최소 단위로 충분합니다.'],
              ['연휴에도 일이 조금 남은 사람', '명절 연휴라고 일이 완전히 꺼지지 않는 프리랜서·1인 사업자라면, 시차 0시간인 일본이 답입니다. 오전 한두 시간의 업무 블록을 그대로 유지하면서 나머지를 여행으로 채웁니다.'],
              ['멀리 가고 싶지 않은 사람', '공항 인파가 부담이면 방향을 바꾸세요. KTX-청룡으로 2시간 17분이면 부산, 비행 1시간 10분이면 제주 — 국내 세트 두 개도 같은 구조로 준비돼 있습니다.'],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-4 bg-gray-50 rounded-2xl p-6">
                <span className="shrink-0 w-8 h-8 rounded-full bg-brand-mid text-white font-black text-sm flex items-center justify-center">{i + 1}</span>
                <div>
                  <span className="block font-black text-gray-900">{t}</span>
                  <span className="block text-gray-500 text-sm mt-1">{d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 본문 — 거점별 */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">나흘을 어디서 보낼까</h2>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Coffee className="w-5 h-5 text-brand-mid" />후쿠오카 — 가장 가벼운 선택
            </h3>
            <p className="text-gray-600 leading-relaxed">
              직항 1시간대, 공항에서 하카타역까지 지하철 직결 — 이동에 쓰는 시간이 가장 짧은
              거점입니다. 하카타의 코워킹 라운지 숙소에서 오전을 보내고, 오후엔 카페와 골목,
              하루는 근교 온천 마을로. 나흘 중 사흘을 온전히 쓰고 싶다면 첫 번째 후보입니다.
              {' '}<Link href="/collections/fukuoka-3n4d?src=article" className="text-brand-mid font-bold hover:underline">후쿠오카 3박 4일 세트 →</Link>
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <MapPin className="w-5 h-5 text-brand-mid" />오사카 — 친구와 함께라면
            </h3>
            <p className="text-gray-600 leading-relaxed">
              유니버설 스튜디오 하루, 구로몬 시장의 아침, 주유패스로 도는 40여 곳 — 오사카는
              혼자보다 둘일 때 더 촘촘해지는 도시입니다. 연휴의 나흘을 친구와 나눠 쓰는 구성은
              세트에 정리돼 있습니다.
              {' '}<Link href="/collections/osaka-friends?src=article" className="text-brand-mid font-bold hover:underline">오사카 친구 여행 세트 →</Link>
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Moon className="w-5 h-5 text-brand-mid" />도쿄 — 일이 많이 남았다면
            </h3>
            <p className="text-gray-600 leading-relaxed">
              코워킹을 두 개 층으로 품은 숙소가 있는 도시 — 연휴 중에도 업무 비중이 큰
              사람에게는 도쿄가 안전합니다. 낮은 데스크에서, 저녁은 팀랩과 시부야의 골목에서.
              직항 약 2시간 20분, 시차는 물론 0시간입니다.
              {' '}<Link href="/collections/tokyo-allinone?src=article" className="text-brand-mid font-bold hover:underline">도쿄 3박 4일 세트 →</Link>
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <CalendarDays className="w-5 h-5 text-brand-mid" />부산·제주 — 공항 인파를 피하는 법
            </h3>
            <p className="text-gray-600 leading-relaxed">
              연휴의 국제선이 부담스러우면 국내 두 세트가 있습니다. 부산은 KTX-청룡 2시간
              17분에 바다 앞 레지던스와 부산역 워케이션 거점센터(업무석 50석)가 기다리고,
              제주는 비행 1시간 10분에 로밍도 환전도 없는 혼자만의 리셋입니다.
              {' '}<Link href="/collections/busan-weekend?src=article" className="text-brand-mid font-bold hover:underline">부산 주말 세트 →</Link>
              {' '}·{' '}
              <Link href="/collections/jeju-solo-reset?src=article" className="text-brand-mid font-bold hover:underline">제주 혼자 회복 세트 →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* 실전 꿀팁 */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">Wakation 실전 꿀팁</h2>
          <div className="space-y-5">
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <CalendarDays className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">나흘의 뼈대는 2-1-1</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  이동일(1일차·4일차)을 가볍게 잡고, 가운데 이틀 중 하루는 오전 업무+오후 탐색,
                  하루는 완전히 비우는 구성이 가장 무리가 없습니다. 세트의 추천 흐름이 이 구조로
                  짜여 있습니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <Plane className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">연휴 항공·숙소는 준비가 빠를수록 선택지가 넓습니다</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  요금과 좌석은 시점마다 달라지니 단정하지 않겠습니다 — 다만 명절 연휴 일정은
                  선택지가 점차 줄어드는 구조인 만큼, 목적지를 정했다면 예약 페이지에서 일정을
                  먼저 확인해 두는 편이 안전합니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <Wifi className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">eSIM은 출국 전날 설치</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  도착 즉시 연결돼야 연휴 중 급한 연락을 놓치지 않습니다. 국내(부산·제주)를
                  골랐다면 이 준비물은 통째로 생략 — 그것도 국내 세트의 장점입니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <AlertCircle className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">가족 일정과의 균형</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  추석 당일(9/25 금)을 가족과 보내야 한다면, 토~일 1박 2일 부산 축소판이나
                  연휴 직후 주말로 미루는 선택지도 있습니다. 세트는 날짜를 강제하지 않습니다 —
                  구성만 가져가서 내 일정에 맞추세요.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            9월 24일 목요일 아침,
            <br />
            어디에서 노트북을 열까요.
          </h2>
          <span className="block text-white/70 mt-4">
            다섯 개의 세트가 준비돼 있습니다 — 숙소부터 eSIM까지, 필요한 것부터 하나씩.
          </span>
          <div className="mt-8">
            <SetCtas />
          </div>
          <div className="mt-4 flex justify-center">
            <ShareButton title="추석 나흘, 워케이션으로 보내는 법 — 2026 연휴 가이드" contentType="story" slug="chuseok-4days" />
          </div>
          <span className="block text-white/40 text-xs mt-6 leading-relaxed">
            세트 안 일부 링크는 제휴 링크이며, 각 상품은 제휴사에서 개별 예약·결제됩니다.
            Wakation은 예약 주체가 아니며 패키지 일괄 판매가 아닙니다. 팩트 기준: 2026 공휴일
            일정·Trip Set 검증값 (2026-08-03 확인).
          </span>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/stories" className="text-amber-300 text-sm font-bold hover:text-amber-200">
              모든 스토리 보기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
