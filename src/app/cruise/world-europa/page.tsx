import type { Metadata } from 'next'
import Link from 'next/link'
import { Ship, Wifi, Sun, Leaf, Clock, AlertCircle, Plane } from 'lucide-react'
import { ShareButton } from '@/components/share/ShareButton'

// ─────────────────────────────────────────────────────────────────────────────
// /cruise/world-europa — MSC 월드 유로파 카리브 워케이션 에디토리얼 (2026-07-28)
// 팩트 검증: 215,863GT·전장 333.3m·데크 22·객실 2,626(발코니 65%)·최대 정원 6,762
// ·승무원 2,138 = MSC 공식 프레스룸(2023-04-12 보도자료) — CruiseMapper 데크20·객실
// 2,633 등 편차는 공식 수치 채택 / MSC 함대 최초 LNG 추진 + 150kW SOFC(고체산화물
// 연료전지) "현대 크루즈선 최초" = MSC 공식 프레스룸. CO2 감축률(20~30% 혼재)은 조건별
// 상이라 미인용 / ⚠️ "세계 최대" 표현 금지(Icon of the Seas 248,663GT가 더 큼) —
// 'MSC 함대 최대·첫 LNG'만 사용 / 2022-10-24 인도(Chantiers de l'Atlantique)·
// 2022-12-20 도하발 첫 상업 운항(그 전 2022 월드컵 숙박선) = Wikipedia /
// 스타링크: 2024-02-28 MSC 보도자료 = 당시 15/22척 완료, 월드 유로파는 "이번 달 추가
// 예정"·함대 전체 2024-05까지 완료 목표 → "전 함대 완료 발표"로 쓰면 오보. 본문은
// "2024년 초 설치(함대 전체는 2024년 5월까지)" / 패키지 Browse·Browse&Stream(무제한,
// 사전 구매 할인) = msccruisesusa.com(본 도메인 403 우회) / 와이파이 일별 요금은
// kr.trip.com 게재 참고가(카리브 2-13박 1기기 $8.44/일 등, "실제는 선내 공지 기준"
// 문구 병기 조건으로 인용) / World Promenade 약 104m 선미 개방형+LED 스카이 스크린·
// World Galleria 2,214㎡ LED 돔·다이닝 13(스페셜티 6)·바 20 = MSC 공식 프레스룸 /
// The Venom Drop @ The Spiral = 11데크 '드라이 슬라이드'(약 76m, 워터슬라이드 아님) /
// 운항: 2026 여름 서지중해 7일 순환(제노바·바르셀로나 등) = CruiseMapper. 2026-27 겨울
// 아라비아만 시즌 전면 취소→카리브 재배치(마르티니크 포르드프랑스·과들루프 모항,
// 7~14박) = Cruise Industry News 2026-03-30 — 구자료 "두바이 시즌" 인용 금지 /
// 가격: 카리브 8일 8개 일정(2026-12-19~2027-02-28발), 최저 ₩1,170,759(2027-02-27
// 포르드프랑스발)·12월 출발 ₩1,932,705~2,518,817 = kr.trip.com 실측 2026-07-28 /
// 1인용 내부 객실 10㎡·인사이드 15㎡ = kr.trip.com 객실 데이터 / 마르티니크·과들루프
// = 프랑스 해외 데파르트망(통화 EUR) — 일반 사실. 비자 조건은 미검증이라 미언급 /
// 시차: 카리브 UTC-4 ↔ KST UTC+9 = 13시간(KST 09시 = 현지 전일 20시) — 산술.
// 미검증 미표기: 수영장 7·자쿠지 13(CruiseMapper만)·스타링크 개별 설치 완료일·
// 선박별 와이파이 확정가.
// ─────────────────────────────────────────────────────────────────────────────

const TRIP_HREF = 'https://kr.trip.com/cruises/ship-msc-cruises-msc-world-europa-944?curr=KRW&Allianceid=9024807'

export const metadata: Metadata = {
  title: '한겨울의 카리브 워케이션 — MSC 월드 유로파 가이드',
  description:
    '한국의 겨울에 카리브해 8일. MSC 함대 최대·첫 LNG 플래그십, 스타링크 와이파이, 마르티니크 모항 — MSC 월드 유로파 크루즈 워케이션의 모든 것.',
  alternates: { canonical: 'https://www.wakation.kr/cruise/world-europa' },
  openGraph: {
    title: '한겨울의 카리브 워케이션 — MSC 월드 유로파 | Wakation',
    description: '21만 톤 LNG 플래그십에서 보내는 카리브 8일. 스타링크 와이파이·다이닝 13곳·겨울 시즌 카리브 모항.',
    url: 'https://www.wakation.kr/cruise/world-europa',
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

export default function WorldEuropaCruisePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-cyan-950 via-blue-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-cyan-300 text-xs font-black tracking-widest uppercase mb-4">
            Winter Caribbean · MSC World Europa
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            21만 톤,
            <br />
            겨울의 반대편
          </h1>
          <span className="block text-white/70 text-lg mt-5 max-w-xl mx-auto">
            한국이 가장 추운 12~2월, 카리브해는 건기의 한가운데입니다. MSC 함대 최대이자
            첫 LNG 플래그십이 그 계절에 마르티니크를 돕니다 — 스타링크 와이파이와 함께.
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
      <section className="bg-[#ecfeff] border-b border-[#a5f3fc] px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['215,863톤 · 데크 22', 'MSC 함대 최대 · 첫 LNG (2022 취항)'],
            ['스타링크 + 무제한 패키지', 'Browse & Stream — 스트리밍·영상통화'],
            ['겨울 시즌 카리브 모항', '마르티니크·과들루프 (2026.12~2027.2)'],
            ['카리브 8일 ₩1,170,759~', '2027-02-27발 · 7.28 실측'],
          ].map(([v, l]) => (
            <div key={v}>
              <span className="block font-black text-[#155e75]">{v}</span>
              <span className="block text-xs text-[#0e7490] mt-0.5">{l}</span>
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
              ['겨울을 피해 일하고 싶은 사람', '한국의 1~2월과 카리브의 건기를 맞바꾸는 역주행 워케이션. 매일 아침 다른 섬에 눈을 뜨면서도, 객실과 오피스는 그대로인 한 주입니다.'],
              ['화상회의를 끊을 수 없는 리모트 워커', '스타링크 기반 선내 와이파이에 스트리밍·영상통화용 무제한 패키지(Browse & Stream)가 공식 운영됩니다. 일별 요금이 공개돼 있어 예산 계산이 서는, 드문 크루즈입니다.'],
              ['유럽 여행에 한 주를 얹고 싶은 사람', '카리브 모항까지는 보통 파리 경유 — 어차피 유럽을 거친다면, 파리 일정 뒤에 카리브 8일을 이어 붙이는 설계가 이동을 아깝지 않게 만듭니다.'],
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
              <Ship className="w-5 h-5 text-brand-mid" />MSC 함대의 최대·최신 플래그십
            </h3>
            <p className="text-gray-600 leading-relaxed">
              215,863톤, 전장 333m, 22개 데크, 객실 2,626실(65%가 발코니). 선미에는 길이 약 104m의
              개방형 월드 프로메나드가 LED 스카이 스크린 아래 펼쳐지고, 실내 중심가 월드 갤러리아
              (2,214㎡)는 LED 돔 천장으로 덮여 있습니다. 다이닝 13곳(스페셜티 6), 바·라운지 20곳,
              그리고 11개 데크를 관통하는 드라이 슬라이드 &lsquo;베놈 드롭&rsquo;까지 — 2022년
              카타르 도하에서 데뷔한 배입니다(월드컵 기간엔 숙박선으로 쓰였습니다).
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Wifi className="w-5 h-5 text-brand-mid" />요금이 공개된 스타링크 오피스
            </h3>
            <p className="text-gray-600 leading-relaxed">
              MSC는 2024년 초 월드 유로파에 스타링크를 설치했고(함대 전체는 2024년 5월까지 완료),
              와이파이 패키지는 웹서핑용 Browse와 스트리밍·영상통화용 Browse &amp; Stream 두 종 —
              둘 다 무제한이며 출항 전 구매 시 할인됩니다. Trip.com에 게재된 참고 요금은 카리브
              항로 기기 1대 기준 하루 $8.44(2~13박), 항차가 길수록 단가가 내려갑니다(실제 가격은
              선내 공지 기준). 하루 커피 두 잔 값으로 바다 위 사무실 회선이 서는 셈입니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Sun className="w-5 h-5 text-brand-mid" />한국의 겨울이 곧 카리브의 시즌
            </h3>
            <p className="text-gray-600 leading-relaxed">
              2026-27 겨울, 월드 유로파는 마르티니크(포르드프랑스)·과들루프를 모항으로 카리브해를
              돕니다 — 원래 아라비아만 시즌이었다가 2026년 3월 카리브 재배치가 발표되며 열린
              일정입니다. 8일 일정이 매주 세인트루시아·앤티가·도미니카 등 섬 5곳을 순회하고,
              2026년 7월 28일 실측 기준 최저 ₩1,170,759(2027년 2월 27일 출발)부터입니다.
              12월 연말 출발은 ₩190만~250만원대로 성수기 프리미엄이 붙습니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Leaf className="w-5 h-5 text-brand-mid" />LNG와 연료전지 — 바다 위 친환경 실험실
            </h3>
            <p className="text-gray-600 leading-relaxed">
              월드 유로파는 MSC 함대 최초의 LNG(액화천연가스) 추진선이고, LNG 기반 150kW
              고체산화물 연료전지(SOFC) 데모 유닛을 실었습니다 — MSC는 이를 현대 크루즈선 최초라고
              발표했습니다. 일주일을 배에서 보내는 선택이 마음에 걸리는 워케이셔너에게, 업계에서
              가장 앞선 축의 친환경 사양이라는 사실은 작지 않은 차이입니다.
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
                <span className="block font-black text-gray-900">화상회의가 있다면 Browse &amp; Stream을 사전 구매</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  출항 전 온라인 구매가 공식 할인 경로입니다. 텍스트 소통 위주면 Browse로 충분하고,
                  영상통화·스트리밍이 필요하면 Browse &amp; Stream이 맞습니다. 위성 인터넷 특성상
                  지연이 있을 수 있으니, 실패하면 안 되는 발표는 기항일에 배치하세요.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <Clock className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">13시간 시차 — 저녁에 한국 미팅, 낮은 통째로</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  카리브(UTC-4)와 한국의 시차는 13시간. 한국의 오전 9~11시가 현지 저녁 8~10시라,
                  저녁에 한국 팀 미팅을 소화하면 현지의 낮 전체가 온전히 남습니다. 섬에 내리는 날과
                  딥 워크 데이를 항해 일정표에 맞춰 나누면 한 주가 깔끔하게 설계됩니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <Plane className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">항공은 유럽 경유 — 여정을 이어 붙이세요</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  한국에서 마르티니크·과들루프 직항은 없고 보통 파리를 경유합니다. 두 섬은 프랑스
                  해외 데파르트망이라 통화도 유로입니다. 파리·유럽 일정 뒤에 카리브 한 주를 얹는
                  구성이면 장거리 이동이 두 배로 일합니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <AlertCircle className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">12월과 2월, 요금이 두 배 가까이 다릅니다</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  같은 8일 일정이 12월 연말 출발은 190만원대부터, 1월 중순~2월 출발은 110만원대부터
                  — 2026년 7월 28일 실측 기준입니다. 연말 연휴가 필수가 아니라면 1~2월이 유리합니다.
                  혼자라면 1인용 내부 객실(10㎡)도 운영됩니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-blue-950 to-cyan-950 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            올겨울, 지구 반대편에서.
          </h2>
          <span className="block text-white/70 mt-4">
            한국의 한파와 카리브의 건기를 맞바꾸는 8일 —
            <br />
            21만 톤의 오피스가 겨울 시즌에만 그 바다에 있습니다.
          </span>
          <div className="mt-8">
            <BookingCtas />
          </div>
          <div className="mt-4 flex justify-center">
            <ShareButton title="한겨울의 카리브 워케이션 — MSC 월드 유로파" />
          </div>
          <span className="block text-white/40 text-xs mt-6 leading-relaxed">
            위 버튼은 제휴 링크이며, Wakation은 예약 주체가 아닙니다. 요금·운항 일정·환불 조건은 예약
            페이지에서 최종 확인됩니다. 팩트 기준: MSC 공식 프레스룸·보도자료, CruiseMapper·Wikipedia
            ·Cruise Industry News 교차, Trip.com 실측 (2026-07-28 확인).
          </span>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cruise/serena" className="text-cyan-300 text-sm font-bold hover:text-cyan-200">
              바다 위에서 한 달 살기, 코스타 세레나 →
            </Link>
            <Link href="/stories" className="text-cyan-300 text-sm font-bold hover:text-cyan-200">
              모든 스토리 보기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
