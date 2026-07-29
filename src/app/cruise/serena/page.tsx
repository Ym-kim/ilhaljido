import type { Metadata } from 'next'
import Link from 'next/link'
import { Ship, Wifi, Utensils, Anchor, Clock, AlertCircle, Compass, Globe } from 'lucide-react'
import { ShareButton } from '@/components/share/ShareButton'

// ─────────────────────────────────────────────────────────────────────────────
// /cruise/serena — 코스타 세레나 그랜드 보야지 워케이션 에디토리얼 (2026-07-28)
// 팩트 검증: 114,261GT(VesselFinder 등록부 — 출처별 114,147~114,500 편차라 본문은
// '약 11만 4천 톤' 표기)·2007 취항(Fincantieri)·전장 289.59m·객실 1,507(내측 13㎡는
// kr.trip.com 객실 데이터) = VesselFinder+CruiseMapper+Wikipedia 교차 /
// 스타링크: Carnival Corp 2024-05-14 공식 보도자료 "전 세계 함대 100% 설치 완료"에
// Costa 명시 포함(PR Newswire). Serena 개별 지명 문서 없음 → '함대 완료 발표에 포함'
// 형태로만 서술 / 와이파이 패키지 3종(메신저·SNS·무제한)은 2차 출처(Cruise Critic) —
// 공식 가격 미검증·항로별 상이라 수치 미표기, 실탑승 후기 속도·가격 불만(Trip 리뷰
// 2026-02) 본문에 정직 명시 / 2025-11 드라이독 리핏(미쉐린 스타 셰프 3인 협업
// Archipelago·Pizzeria Pummid'Oro·Sushino@Costa 신설, 풀덱·메인 레스토랑 리노베이션)
// = Cruise Industry News 2025-11-15 / 2026 아시아 상주(일본·대만·한국 14일 2종 교차)
// ·2026-10-18 도쿄발 66일 월드크루즈(→12-22 부에노스아이레스, 세그먼트 분할 판매)
// ·2026-11~2027-04 남미 시즌 후 유럽 복귀 = Cruise Industry News 교차 / 2023년 한국
// 아웃바운드 크루즈 재개 최초 국제 선사(부산·속초·포항 출발) = Carnival Corp 프레스룸 /
// 가격: 부에노스아이레스 4/5발 22일 ₩1,765,663·23일 ₩1,787,642, 리우 4/8발 19일
// ₩1,553,197·20일 ₩1,619,135 (전부 2027-04 출항) = kr.trip.com 실측 2026-07-28.
// 일당 계산: 1,553,197÷19≈81,747원 → '하루 약 8만원대'(최저가 기준 산술).
// 미검증 미표기: 와이파이 공식 가격·실측 속도·수영장/자쿠지 수(공식 1차 출처 부재)
// ·'럭셔리' 표현(컨템포러리 선사 — 마케팅 문구 인용 금지).
// ─────────────────────────────────────────────────────────────────────────────

const TRIP_HREF = 'https://kr.trip.com/cruises/ship-costa-costaserena-35?curr=KRW&Allianceid=9024807'

export const metadata: Metadata = {
  title: '바다 위에서 한 달 살기 — 코스타 세레나 그랜드 보야지 워케이션 가이드',
  description:
    '남미에서 유럽까지 19~23일 대서양 횡단. 숙박·식사 포함 하루 8만원대, 스타링크 함대 — 리포지셔닝 크루즈로 하는 바다 위 한 달 살기.',
  alternates: { canonical: 'https://www.wakation.kr/cruise/serena' },
  openGraph: {
    title: '바다 위에서 한 달 살기 — 코스타 세레나 그랜드 보야지 | Wakation',
    description: '19~23일 대서양 횡단 리포지셔닝 크루즈 워케이션 가이드. 숙박·식사 포함 하루 8만원대.',
    url: 'https://www.wakation.kr/cruise/serena',
    siteName: 'Wakation',
  },
}

const CTA_CLS =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all'

function BookingCtas({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${compact ? '' : 'justify-center'}`}>
      <a
        href={TRIP_HREF}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={`${CTA_CLS} bg-brand-mid text-white hover:bg-brand-light shadow-md`}
      >
        <Ship className="w-4 h-4" />
        Trip.com에서 일정·요금 보기
      </a>
      <Link
        href="/cruise"
        className={`${CTA_CLS} border border-gray-300 text-gray-600 hover:border-brand-mid hover:text-brand-mid`}
      >
        크루즈 워케이션 전체 보기
      </Link>
    </div>
  )
}

export default function SerenaCruisePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-amber-950 via-orange-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-amber-300 text-xs font-black tracking-widest uppercase mb-4">
            Grand Voyage · Costa Serena
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            한 달 살기,
            <br />
            이번엔 바다 위
          </h1>
          <span className="block text-white/70 text-lg mt-5 max-w-xl mx-auto">
            남미에서 유럽까지, 19~23일의 대서양 횡단. 숙박과 식사가 요금 하나에 묶인
            리포지셔닝 크루즈 — 배가 이사하는 3주에 올라타는 가장 긴 워케이션입니다.
          </span>
          <div className="mt-8">
            <BookingCtas />
          </div>
          <span className="block text-white/40 text-xs mt-4">
            제휴 링크입니다 · 요금과 운항 일정은 예약 페이지에서 최종 확인됩니다
          </span>
        </div>
      </section>

      {/* 팩트 스트립 */}
      <section className="bg-[#fffbeb] border-b border-[#fde68a] px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['약 11만 4천 톤 · 객실 1,507', '2007 취항 · 전장 289.6m'],
            ['스타링크 함대', 'Carnival 2024년 5월 완료 발표'],
            ['2025년 11월 리핏', '레스토랑 3곳 신설 · 풀덱 리노베이션'],
            ['19~23일 ₩1,553,197~', '하루 약 8만원대 (7.28 실측)'],
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
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">이런 분께 추천합니다</h2>
          <div className="space-y-5">
            {[
              ['안식월을 계획 중인 사람', '퇴사와 이직 사이, 긴 프로젝트가 끝난 뒤의 공백. 비행기표 여러 장과 숙소 예약 대신, 체크인 한 번으로 3주가 통째로 설계됩니다. 숙박·식사·이동이 요금 하나에 묶여 있으니까요.'],
              ['비동기로 일하는 리모트 워커', '문서와 코드로 일하고 회의가 적다면, 대양 항해는 그 자체로 딥 워크 리트리트입니다. 다만 대양 한가운데의 위성 연결은 편차가 있습니다 — 실시간 화상회의보다 비동기 업무에 어울리는 배입니다.'],
              ['한 달 살기의 다음 편을 찾는 사람', '치앙마이도 발리도 다녀왔다면, 다음 목적지는 도시가 아니라 항로일 수 있습니다. 매일 아침 위도가 바뀌는 한 달 — 항해가 끝나면 당신은 반대편 대륙에 있습니다.'],
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

      {/* 핵심 매력 */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">왜 이 항해인가</h2>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Anchor className="w-5 h-5 text-brand-mid" />배가 이사하는 날, 요금 구조가 달라진다
            </h3>
            <p className="text-gray-600 leading-relaxed">
              크루즈선은 시즌이 끝나면 다음 시즌의 바다로 편도 이동합니다 — 이것이 리포지셔닝(재배치)
              항해입니다. 코스타 세레나는 2026년 11월부터 남미 시즌을 보낸 뒤, 2027년 4월 유럽으로
              돌아갑니다. 부에노스아이레스·리우데자네이루에서 출발해 브라질 해안을 오르고, 대서양을
              건너 스페인·포르투갈을 거쳐 마르세유·사보나에 닿는 19~23일 — 4개 일정이 열려 있고,
              2026년 7월 28일 실측 기준 ₩1,553,197부터입니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Utensils className="w-5 h-5 text-brand-mid" />하루 8만원대에 숙박·식사·대륙 이동까지
            </h3>
            <p className="text-gray-600 leading-relaxed">
              최저가 19일 일정 기준으로 나누면 하루 약 8만 2천원. 여기에 객실 숙박, 메인 다이닝·뷔페
              식사, 그리고 남미에서 유럽까지의 이동이 모두 포함됩니다(스페셜티 레스토랑·음료
              패키지는 별도). 2025년 11월 드라이독 리핏에서는 미쉐린 스타 셰프 3인이 협업한
              스페셜티 레스토랑 아키펠라고와 피자리아, 스시 바가 새로 들어왔고 풀덱과 메인
              레스토랑이 리노베이션됐습니다 — 3주 항해의 저녁이 단조롭지 않도록.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Wifi className="w-5 h-5 text-brand-mid" />스타링크 함대가 된 코스타 — 단, 정직하게
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Carnival 그룹은 2024년 5월 전 세계 함대 100%에 스타링크 설치를 완료했다고 발표했고,
              이 명단에 Costa가 명시돼 있습니다. 와이파이 패키지는 메신저·SNS·무제한 3단계로
              나뉘며 가격은 항로마다 다릅니다(예약 후 공식 채널에서 확인 권장). 다만 실탑승 후기에는
              속도·가격 불만도 있습니다 — 화상회의가 업무의 중심이라면 이 배는 답이 아닙니다.
              문서·코드 중심의 비동기 업무를 전제로 설계하고, 실시간이 필요한 일정은 기항일에
              배치하는 편이 안전합니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Globe className="w-5 h-5 text-brand-mid" />아시아에 상주해온, 한국과 인연이 깊은 배
            </h3>
            <p className="text-gray-600 leading-relaxed">
              코스타 세레나는 2015년부터 아시아에 상주해 왔고, 2023년엔 팬데믹 이후 한국 아웃바운드
              크루즈(부산·속초·포항 출발)를 가장 먼저 재개한 국제 선사가 됐습니다. 2026년에도
              일본·대만·한국을 도는 아시아 일정을 운항 중이며, 10월 18일 도쿄에서 66일 월드크루즈로
              출항해 12월 22일 부에노스아이레스에 닿습니다. 그리고 이듬해 4월, 이 그랜드 보야지로
              유럽에 돌아갑니다 — 지금 판매 중인 4개 일정이 바로 그 마지막 구간입니다.
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
              <Wifi className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">와이파이는 전 일정 패키지, 업무는 비동기 설계</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  장기 항해는 일 단위 구매보다 전 일정 패키지가 정석입니다. 공식 가격은 항로별로
                  달라 예약 후 코스타 공식 채널에서 확인하세요. 마감·발표처럼 실패하면 안 되는
                  일정은 위성 연결에 걸지 말고, 기항일의 육지 네트워크에 배치하는 게 안전합니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <Clock className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">시차 적응이 공짜다 — 하루하루 조금씩</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  비행기로 대륙을 건너면 시차병이 따라오지만, 배는 시간대를 며칠에 한 시간씩
                  통과합니다. 남미 출발 시점엔 한국과 밤낮이 거의 반대지만, 유럽에 가까워질수록
                  한국의 오후와 겹치는 저녁 협업 시간이 생깁니다. 한국 팀과 일한다면 실시간 미팅은
                  항해 후반부에 몰아두세요.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <AlertCircle className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">3주 항해의 현실 체크</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  내측 객실은 13㎡ — 사흘은 아늑해도 3주는 다릅니다. 장기 항해일수록 창문과 발코니의
                  가치가 커지고, 저가 객실은 먼저 소진됩니다. 그리고 편도 항해라는 점도 기억하세요:
                  남미로 가는 항공편과 유럽에서 돌아오는 항공편, 두 장이 총예산에 들어갑니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <Compass className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">19일이냐 23일이냐 — 출발 도시로 고르기</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  리우데자네이루 출발(4/8)이 19~20일로 더 짧고 저렴하고, 부에노스아이레스 출발(4/5)은
                  22~23일로 깁니다. 도착지도 마르세유(프랑스)와 사보나(이탈리아)로 나뉘니, 항해 뒤
                  유럽 일정에 맞춰 고르세요. 네 일정 모두 2027년 4월 출항 — 준비 시간은 충분합니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-orange-950 to-amber-950 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            2027년 4월, 남미에서 유럽으로.
          </h2>
          <span className="block text-white/70 mt-4">
            배가 이사하는 3주에 올라타는 것 —
            <br />
            바다 위 한 달 살기는 그렇게 시작됩니다.
          </span>
          <div className="mt-8">
            <BookingCtas />
          </div>
          <div className="mt-4 flex justify-center">
            <ShareButton title="바다 위에서 한 달 살기 — 코스타 세레나 그랜드 보야지" />
          </div>
          <span className="block text-white/40 text-xs mt-6 leading-relaxed">
            위 버튼은 제휴 링크이며, Wakation은 예약 주체가 아닙니다. 요금·운항 일정·환불 조건은 예약
            페이지에서 최종 확인됩니다. 팩트 기준: Carnival Corp·Costa 공식 보도자료, VesselFinder
            ·CruiseMapper·Cruise Industry News 교차, Trip.com 실측 (2026-07-28 확인).
          </span>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cruise/bellissima" className="text-amber-300 text-sm font-bold hover:text-amber-200">
              17만 톤의 스타링크 오피스, MSC 벨리시마 →
            </Link>
            <Link href="/stories" className="text-amber-300 text-sm font-bold hover:text-amber-200">
              모든 스토리 보기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
