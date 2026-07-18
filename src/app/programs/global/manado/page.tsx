import type { Metadata } from 'next'
import Link from 'next/link'
import { Waves, Utensils, Mountain, Plane, Users, Wifi, CalendarDays } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// /programs/global/manado — 마나도 워케이션 에디토리얼 (2026-07-18)
// 팩트 검증: 이스타항공 국내 최초 인천-마나도 취항(국토부 에어포탈 공식) — 단
// 기획 전세기 형태(일반 검색 미노출·일정 확인 필수), 소요 약 5시간 50분 /
// 부나켄 국립해양공원 산호 390여 종(언론 현지취재) / 토모혼 리노 호수 색 변화·
// 활화산 로콘 / 북술라웨시=기독교 다수 지역(돼지고기·주류 자유의 근거).
// ❌미검증 미표기: 1박 7만원대·8천원대 생참치(숫자)·패러글라이딩·특정 투어사
// 실명. "5시간 20분"→약 5시간 50분 정정, "리노 호수 트래킹"→호반 조망 완화.
// 제휴: Booking ss=Manado + Airalo 인도네시아(발리와 동일 링크) + KKday 인니.
// ─────────────────────────────────────────────────────────────────────────────

const BOOKING_MANADO = 'https://www.booking.com/searchresults.html?aid=7854081&ss=Manado'
const AIRALO_INDONESIA =
  'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Findonesia-esim'
const KKDAY_INDONESIA = 'https://www.kkday.com/ko/destination/id-indonesia?cid=25833'

export const metadata: Metadata = {
  title: '발리 다음은, 아무도 모르는 이 바다 — 마나도 워케이션',
  description:
    '다이버들의 성지 마나도(Manado) 워케이션 가이드. 부나켄 해양공원 산호 390여 종, 돼지고기·주류가 자유로운 북술라웨시, 인천 직항 전세기 — 아직 붐비지 않는 장기 체류 베이스.',
  alternates: { canonical: 'https://www.wakation.kr/programs/global/manado' },
  openGraph: {
    title: '마나도 워케이션 — 비밀의 체류지 | Wakation',
    description: '다이버 성지 부나켄과 화산 호수 토모혼 사이, 일하기 좋은 한 달. 마나도 워케이션 가이드.',
    url: 'https://www.wakation.kr/programs/global/manado',
    siteName: 'Wakation',
  },
}

export default function ManadoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-cyan-950 via-sky-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-sky-300 text-xs font-black tracking-widest uppercase mb-4">
            Hidden Base · 인도네시아 북술라웨시
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            발리 다음은,
            <br />
            아무도 모르는 이 바다
          </h1>
          <span className="block text-white/70 text-lg mt-5 max-w-xl mx-auto">
            세계의 다이버들이 버킷리스트에 적어두고, 한국인은 아직 잘 모르는 곳.
            북술라웨시의 바다와 화산 사이, 일하기 좋은 한 달이 숨어 있습니다.
          </span>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_MANADO}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-brand-mid text-white hover:bg-brand-light shadow-md transition-all"
            >
              마나도 숙소 검색 · Booking.com
            </a>
            <a
              href={AIRALO_INDONESIA}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border border-white/30 text-white hover:border-white/60 transition-all"
            >
              <Wifi className="w-4 h-4" />
              인도네시아 eSIM · Airalo
            </a>
          </div>
          <span className="block text-white/40 text-xs mt-4">
            제휴 링크입니다 · 요금과 조건은 제휴사 사이트에서 최종 확인됩니다
          </span>
        </div>
      </section>

      {/* 팩트 스트립 */}
      <section className="bg-[#f0f9ff] border-b border-sky-100 px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['약 5시간 50분', '인천 직항 (기획 전세기)'],
            ['산호 390여 종', '부나켄 국립해양공원'],
            ['돼지고기·주류 OK', '기독교 다수 북술라웨시'],
            ['UTC+8', '한국과 1시간 차'],
          ].map(([v, l]) => (
            <div key={v}>
              <span className="block font-black text-sky-900">{v}</span>
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
              ['퇴근 후 바다로 뛰어들고 싶은 해양 스포츠 마니아', '세계적 다이빙 성지 부나켄이 시내에서 배로 닿는 거리. 주말 다이빙 트립이 아니라, 다이빙이 일상인 체류가 됩니다.'],
              ['발리·치앙마이가 식상해진 가성비 장기 체류 프리랜서', '노마드 성지들의 물가가 오르는 동안, 마나도는 아직 소셜미디어의 물결이 닿지 않았습니다. 붐비지 않는 곳에서 조용히 오래 머물고 싶은 분.'],
              ['식단 스트레스 없는 동남아를 찾는 분', '인도네시아에서 드물게 돼지고기와 주류를 자유롭게 즐길 수 있는 지역. 장기 체류의 숨은 복병인 먹는 문제가, 여기선 문제가 아닙니다.'],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-4 bg-gray-50 rounded-2xl p-6">
                <span className="shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white font-black text-sm flex items-center justify-center">{i + 1}</span>
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
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">리모트 워커의 마나도, 세 가지 이유</h2>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Utensils className="w-5 h-5 text-sky-600" />아직 오르지 않은 물가, 참치 산지의 미식
            </h3>
            <p className="text-gray-600 leading-relaxed">
              마나도는 생참치의 산지입니다. 시장과 로컬 식당에서 갓 잡은 참치 요리를 부담 없는 가격에
              즐길 수 있고, 숙박비도 유명 노마드 도시 대비 합리적인 수준. &lsquo;가성비&rsquo;가 마케팅
              문구가 아니라 체감 물가인 도시입니다. 요금은 시즌·등급에 따라 다르니 예약 페이지에서 직접
              비교해 보세요.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Users className="w-5 h-5 text-sky-600" />제약 없는 식문화 — 인도네시아의 예외 지대
            </h3>
            <p className="text-gray-600 leading-relaxed">
              북술라웨시는 인도네시아에서 드물게 기독교 인구가 다수인 지역입니다. 그래서 무슬림 문화권에서
              구하기 어려운 돼지고기 요리와 주류를 동네 식당에서 자연스럽게 만납니다. 삼겹살이 그리워지는
              장기 체류자에게 이 차이는 생각보다 큽니다. 금요일 저녁, 로컬 BBQ와 시원한 맥주로 한 주를
              닫으세요.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Waves className="w-5 h-5 text-sky-600" />압도적 대자연 — 부나켄과 토모혼
            </h3>
            <p className="text-gray-600 leading-relaxed">
              부나켄 국립해양공원엔 390여 종의 산호와 열대어가 삽니다. 스노클링만으로도 수족관 같은 수중
              세계가 열리고, 운이 좋으면 바다거북과 눈이 마주칩니다. 육지 쪽엔 &lsquo;꽃의 도시&rsquo;
              토모혼 — 활화산 로콘 자락에서 하루에도 몇 번씩 색이 바뀌는 화산 호수 &lsquo;리노
              호수&rsquo;를 호반 카페에서 바라보는 오후가 기다립니다. 오전엔 노트북, 오후엔 국립공원. 이
              낙차가 마나도 워케이션의 정체성입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 실전 꿀팁 */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">Wakation 실전 체류 꿀팁</h2>
          <div className="space-y-5">
            {[
              [Plane, '직항은 전세기 — 일정 확인이 먼저', '이스타항공이 국내 최초로 취항한 인천—마나도 직항(약 5시간 50분)은 기획 전세기 형태라 일반 항공권 검색에 잘 잡히지 않습니다. 운항 일정을 먼저 확인하고, 안 맞으면 자카르타·발리 경유편이 플랜 B입니다.'],
              [Users, '한국어 가능 로컬 투어사를 적극 활용', '아직 여행 인프라가 표준화되지 않은 지역이라, 공항 픽업·투어 예약·레이트 체크아웃 협상은 현지 사정에 밝은 로컬 전문 투어사를 통하는 편이 효율적입니다. 부나켄 보트 투어도 현지 예약이 기본입니다.'],
              [Wifi, 'eSIM은 출국 전에', '도착 즉시 연결되도록 인도네시아 eSIM을 미리 설치해 두세요. 발리와 같은 국가라 동일한 인도네시아 eSIM이 그대로 통합니다.'],
              [CalendarDays, '우기·건기 체크', '적도 바로 아래 열대 기후로, 다이빙 시정은 시즌에 따라 다릅니다. 투어사와 상담해 체류 시기를 잡으세요.'],
            ].map(([Icon, t, d]) => {
              const IconC = Icon as React.ComponentType<{ className?: string }>
              return (
                <div key={t as string} className="flex gap-4 rounded-2xl border border-gray-200 p-6">
                  <IconC className="shrink-0 w-6 h-6 text-sky-600" />
                  <div>
                    <span className="block font-black text-gray-900">{t as string}</span>
                    <span className="block text-gray-500 text-sm mt-1 leading-relaxed">{d as string}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-sky-950 to-cyan-950 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            남들이 발리 카페 자리를 두고 경쟁할 때,
          </h2>
          <span className="block text-white/70 mt-4">
            당신은 부나켄의 바다거북과 출근길 인사를 나눕니다.
            <br />
            지도에 없던 워케이션 — 마나도에서 시작하세요.
          </span>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_MANADO}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-brand-mid text-white hover:bg-brand-light shadow-md transition-all"
            >
              마나도 숙소 검색 · Booking.com
            </a>
            <a
              href={KKDAY_INDONESIA}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border border-white/30 text-white hover:border-white/60 transition-all"
            >
              <Mountain className="w-4 h-4" />
              인도네시아 투어 · KKday
            </a>
          </div>
          <div className="mt-4">
            <a
              href={AIRALO_INDONESIA}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-300 text-sm font-bold hover:text-sky-200"
            >
              <Wifi className="w-4 h-4" />
              인도네시아 eSIM 미리 준비하기 · Airalo →
            </a>
          </div>
          <span className="block text-white/40 text-xs mt-6 leading-relaxed">
            위 버튼은 제휴 링크이며, Wakation은 예약 주체가 아닙니다. 요금·조건은 각 제휴사 사이트에서
            최종 확인됩니다. 직항 운항 일정은 전세기 특성상 변동될 수 있습니다. 팩트 기준: 국토부
            에어포탈·언론 현지취재 (2026-07-18 확인).
          </span>
          <div className="mt-8">
            <Link href="/programs/global" className="text-sky-300 text-sm font-bold hover:text-sky-200">
              ← 글로벌 워케이션 전체 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
