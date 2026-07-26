import type { Metadata } from 'next'
import Link from 'next/link'
import { Ship, Wifi, Utensils, Anchor, Clock, AlertCircle, Users } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// /cruise/bellissima — MSC 벨리시마 크루즈 워케이션 에디토리얼 (2026-07-26)
// 팩트 검증: 171,598GT·2019 취항·길이 약 315m·데크 19·객실 2,244 = MSC 공식 프레스룸
// +CruiseMapper+언론 교차 / 스타링크 설치·와이파이 패키지 2종(Browse·Browse&Stream,
// 무제한·사전구매 할인) = MSC 공식 보도자료 2024-02-28 / 다이닝 12·바 20·96m 프로메나드
// +80m LED 돔·런던 시어터 985석·스파 1,100㎡·레고 키즈클럽 = MSC 공식 프레스룸 /
// 2027-06-14 인천 첫 출항(인천→기륭→사세보 6박7일)·인천 연중 모항·롯데관광개발 3년
// 전세선·2028년 2호선·2029년 3호선 계획 = CruiseMapper 뉴스+노컷뉴스("2029년 최대
// 3척")+한국경제 교차 / 애리조나 아쿠아파크(슬라이드 4개) = MSC 공식 프레스룸 /
// 가격 ₩341,523~(인천 3박4일)·₩786,671~(부산 5일)·일부 일정 내측 객실 매진 관측
// = kr.trip.com 실측 2026-07-26.
// ⚠️ "2026년 인천 출항"은 오보 — 2026년은 부산 승선 상품만, 인천 모항은 2027.6부터.
// 미검증 미표기: "아시아 최고 크루즈" 수상 주장·코워킹 시설·음료 정책 단정·요일 패턴.
// ─────────────────────────────────────────────────────────────────────────────

const TRIP_HREF = 'https://kr.trip.com/cruises/ship-msc-mscbellissima-496?curr=KRW&Allianceid=9024807'

export const metadata: Metadata = {
  title: '바다 위 스타링크 오피스 — MSC 벨리시마 크루즈 워케이션 가이드',
  description:
    '171,598톤 초대형선에서 일하는 법. 스타링크 와이파이, 다이닝 12곳, 2027년 6월부터 인천 연중 모항 — MSC 벨리시마 크루즈 워케이션의 모든 것.',
  alternates: { canonical: 'https://www.wakation.kr/cruise/bellissima' },
  openGraph: {
    title: '바다 위 스타링크 오피스 — MSC 벨리시마 크루즈 워케이션 | Wakation',
    description: '171,598톤 초대형선 워케이션 가이드. 스타링크 와이파이·다이닝 12곳·2027년 인천 모항.',
    url: 'https://www.wakation.kr/cruise/bellissima',
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

export default function BellissimaCruisePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-sky-300 text-xs font-black tracking-widest uppercase mb-4">
            Office at Sea · MSC Bellissima
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            17만 톤의
            <br />
            스타링크 오피스
          </h1>
          <span className="block text-white/70 text-lg mt-5 max-w-xl mx-auto">
            바다 한가운데서도 끊기지 않는 와이파이, 다이닝 12곳, 96m 프로메나드.
            2027년 6월부터는 인천이 이 배의 집이 됩니다 — 크루즈 워케이션의 다음 챕터.
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
      <section className="bg-[#f0f9ff] border-b border-[#e0f2fe] px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['171,598톤 · 19데크', '길이 약 315m · 객실 2,244실'],
            ['스타링크 와이파이', '2024년 설치 완료 (MSC 공식)'],
            ['다이닝 12 · 바 20', '96m 프로메나드 + LED 돔'],
            ['2027.6 인천 모항', '2026년은 부산 승선 판매 중'],
          ].map(([v, l]) => (
            <div key={v}>
              <span className="block font-black text-[#0c4a6e]">{v}</span>
              <span className="block text-xs text-[#64748b] mt-0.5">{l}</span>
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
              ['화상회의를 끊을 수 없는 리모트 워커', '오프라인 몰입형 크루즈가 부담스러웠다면 이 배는 반대편 답입니다. 스타링크 기반 선내 와이파이와 스트리밍급 패키지로, 바다 위에서도 팀과 연결된 채 일할 수 있습니다.'],
              ['아이와 함께 떠나는 워케이셔너', '레고 키즈클럽과 아쿠아파크가 공식 시설로 갖춰져 있습니다. 아이가 노는 시간이 곧 나의 집중 시간 — 가족 워케이션의 현실적인 답안지입니다.'],
              ['크루즈가 처음인 워케이셔너', '3박 4일 인천 출발 일정이 30만원대부터 열려 있습니다(2026-07 기준 실측). 일주일씩 비울 수 없어도, 짧게 바다 위 오피스를 시험해 볼 수 있습니다.'],
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
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">왜 이 배인가</h2>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Wifi className="w-5 h-5 text-brand-mid" />바다 위에서 끊기지 않는 오피스
            </h3>
            <p className="text-gray-600 leading-relaxed">
              MSC는 2024년 전 함대에 스타링크 위성 인터넷 설치를 완료했다고 공식 발표했습니다. 벨리시마의
              와이파이 패키지는 두 종 — 웹서핑·메신저 중심의 Browse, 스트리밍까지 커버하는 Browse &amp;
              Stream. 둘 다 무제한 데이터에 24시간 사용이며, 출항 전 미리 구매하면 할인됩니다. &lsquo;바다
              위 = 오프라인&rsquo;이라는 크루즈 워케이션의 오래된 전제가 이 배에서는 옵션이 됩니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Ship className="w-5 h-5 text-brand-mid" />출퇴근이 산책이 되는 움직이는 도시
            </h3>
            <p className="text-gray-600 leading-relaxed">
              171,598톤, 약 315m, 19개 데크, 객실 2,244실. 배 안에는 다이닝 12곳과 바 20곳, 985석
              런던 시어터, 1,100㎡ 스파가 들어 있습니다. 중심가는 길이 96m의 갤러리아 프로메나드 —
              머리 위로 80m LED 돔 천장이 펼쳐지는 실내 거리입니다. 오전 업무를 마치고 프로메나드를
              걸어 점심을 먹으러 가는 동선은, 사무실 복도가 아니라 도시의 산책로에 가깝습니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Anchor className="w-5 h-5 text-brand-mid" />2027년, 인천이 모항이 된다
            </h3>
            <p className="text-gray-600 leading-relaxed">
              롯데관광개발이 MSC와 국내 첫 전세선 3년 파트너십을 맺으면서, 벨리시마는 2027년 6월 14일
              인천에서 첫 출항합니다(인천→대만 기륭→일본 사세보, 6박 7일). 이후 인천 연중 모항으로
              운항하며, 2028년 2호선·2029년 3호선 투입 계획도 발표돼 있습니다. 비행기 없이 집 앞에서
              초대형 크루즈를 타는 시대 — 2026년 현재는 부산 승선 일정(상하이·서귀포 기항 5일 등)과
              2027년 인천 출발 일정이 함께 판매되고 있습니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Utensils className="w-5 h-5 text-brand-mid" />요금 하나에 숙박·다이닝·이동
            </h3>
            <p className="text-gray-600 leading-relaxed">
              크루즈 요금에는 숙박과 메인 다이닝·뷔페 식사가 기본 포함됩니다(스페셜티 레스토랑은 별도).
              인천 출발 3박 4일 일정이 ₩341,523부터, 부산 출발 5일 일정이 ₩786,671부터 —
              2026년 7월 26일 Trip.com 실측 기준이며, 객실 등급과 시즌에 따라 달라지니 예약 페이지에서
              최종 확인하세요.
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
                <span className="block font-black text-gray-900">와이파이 패키지는 출항 전에 사세요</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  사전 구매 할인이 공식 정책입니다. 화상회의·스트리밍이 필요하면 Browse &amp; Stream,
                  텍스트 소통 위주면 Browse로 충분합니다. 다만 위성 인터넷 특성상 지연이 있을 수 있으니,
                  중요한 발표는 기항일에 배정하는 편이 안전합니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <Clock className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">기항지 시간 = 업무 스프린트 or 완전 오프</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  일본 기항은 한국 여권 소지자 기준 단기 관광 무비자입니다(여권은 필수). 기항지에 내리는
                  날은 완전히 비우고, 항해일을 딥 워크 데이로 설계하면 일과 여행이 겹치지 않습니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <AlertCircle className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">저가 객실은 먼저 사라집니다</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  실측 시점에도 일부 일정의 내측 객실은 이미 매진이었습니다. 일정이 확정됐다면 등급 선택은
                  빠를수록 유리합니다. 멀미가 예민하다면 선체 중앙부·낮은 데크 객실이 정석입니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <Users className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">가족 워케이션이라면 키즈클럽 시간표부터</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  승선 첫날 키즈클럽 운영 시간을 확인하고 내 업무 블록을 그 위에 얹으세요. 아이의 일정이
                  곧 나의 집중 시간표가 됩니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-950 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            2027년 6월 14일, 인천항.
          </h2>
          <span className="block text-white/70 mt-4">
            그 전에 부산에서 먼저 타볼 수도 있습니다.
            <br />
            바다 위 17만 톤의 오피스 — 일정이 열려 있을 때 자리를 잡으세요.
          </span>
          <div className="mt-8">
            <BookingCtas />
          </div>
          <span className="block text-white/40 text-xs mt-6 leading-relaxed">
            위 버튼은 제휴 링크이며, Wakation은 예약 주체가 아닙니다. 요금·운항 일정·환불 조건은 예약
            페이지에서 최종 확인됩니다. 팩트 기준: MSC 공식 프레스룸·보도자료, CruiseMapper·국내 언론
            교차, Trip.com 실측 (2026-07-26 확인).
          </span>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cruise/miracle" className="text-sky-300 text-sm font-bold hover:text-sky-200">
              부산—오사카 미라클호 이야기 →
            </Link>
            <Link href="/stories" className="text-sky-300 text-sm font-bold hover:text-sky-200">
              모든 스토리 보기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
