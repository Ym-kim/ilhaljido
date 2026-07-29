import type { Metadata } from 'next'
import Link from 'next/link'
import { Ship, Wifi, Luggage, Utensils, Clock, AlertCircle } from 'lucide-react'
import { ShareButton } from '@/components/share/ShareButton'

// ─────────────────────────────────────────────────────────────────────────────
// /cruise/miracle — 팬스타 미라클호 크루즈 워케이션 에디토리얼 (2026-07-18)
// 팩트 검증: 취항 2025-04-13·사우나·야외수영장·저궤도 위성 와이파이 = 팬스타 공식
// 보도자료 / 뷔페 2식(조·석식) 포함 = Klook·KKday·NOL 3사 상품 구성 일치 /
// 17시간 = 부산 오후 출항→익일 10시 오사카 도착. 가격은 실측 불가 → 미표기 정책.
// "삼겹살 무제한" 등 미검증 문구 사용 금지. KO 에디토리얼(/report/yangyang 전례).
// ─────────────────────────────────────────────────────────────────────────────

const KLOOK_HREF =
  'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F150798-busan-osaka-ferry-ticket%2F'
const KKDAY_HREF = 'https://www.kkday.com/ko/product/284256?cid=25833'

export const metadata: Metadata = {
  title: '바다 위 17시간 — 부산-오사카 크루즈 워케이션 가이드',
  description:
    '팬스타 미라클호로 떠나는 이동형 워케이션. 뷔페 2식 포함 승선권, 위성 와이파이, 수하물 제한 없는 하룻밤 — 부산에서 오사카까지 일하며 건너는 법.',
  alternates: { canonical: 'https://www.wakation.kr/cruise/miracle' },
  openGraph: {
    title: '바다 위 17시간 — 부산-오사카 크루즈 워케이션 | Wakation',
    description: '팬스타 미라클호 크루즈 워케이션 가이드. 뷔페 2식·위성 와이파이·수하물 걱정 제로.',
    url: 'https://www.wakation.kr/cruise/miracle',
    siteName: 'Wakation',
  },
}

const CTA_CLS =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all'

function BookingCtas({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${compact ? '' : 'justify-center'}`}>
      <a
        href={KLOOK_HREF}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={`${CTA_CLS} bg-brand-mid text-white hover:bg-brand-light shadow-md`}
      >
        <Ship className="w-4 h-4" />
        Klook에서 승선권 보기
      </a>
      <a
        href={KKDAY_HREF}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={`${CTA_CLS} border border-gray-300 text-gray-600 hover:border-brand-mid hover:text-brand-mid`}
      >
        KKday에서 비교하기
      </a>
    </div>
  )
}

export default function MiracleCruisePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-sky-950 via-blue-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-sky-300 text-xs font-black tracking-widest uppercase mb-4">
            Transit Workation · 부산 ↔ 오사카
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            바다 위 17시간,
            <br />
            인생에서 가장 깊은 몰입
          </h1>
          <span className="block text-white/70 text-lg mt-5 max-w-xl mx-auto">
            알림이 닿지 않는 바다 한가운데. 노트북 하나, 수평선 하나.
            숙박·식사·사우나·국경 이동까지 — 이동이 곧 리트릿이 되는 새로운 워케이션.
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
            ['약 17시간', '부산 오후 출항 → 익일 10시 도착'],
            ['뷔페 2식 포함', '조식·석식 (승선권 기본 구성)'],
            ['위성 와이파이', '저궤도 위성 기반 (공식)'],
            ['2025년 취항', '국내 첫 럭셔리 크루즈페리'],
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
              ['마감을 안고 떠나는 기획자', '기획안은 써야 하는데 사무실에선 도무지 안 써지는 분. 출항부터 다음 날 아침까지, 회의도 호출도 없는 강제 딥 워크 타임이 주어집니다.'],
              ['장비가 많은 장기 노마드', '모니터·키보드·삼각대까지 챙기면 항공 수하물 규정 앞에서 늘 작아지던 분. 배는 다릅니다. 짐의 무게가 아니라 일의 무게만 고민하세요.'],
              ['디지털 디톡스가 필요한 리모트 워커', '슬랙과 알림에 잠식된 일상에서 합법적으로 로그아웃하고 싶은 분. 바다 위에서는 오프라인이 변명이 아니라 환경입니다.'],
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
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">왜 배로 건너는가</h2>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Clock className="w-5 h-5 text-brand-mid" />17시간의 완벽한 딥 워크 &amp; 디톡스
            </h3>
            <p className="text-gray-600 leading-relaxed">
              부산에서 오후에 출항해 오사카에 다음 날 오전 10시 도착. 이 17시간은 비행기의 &lsquo;버리는 이동
              시간&rsquo;이 아니라 통째로 주어지는 몰입 블록입니다. 출항 직후 2~3시간은 밀린 문서를 정리하고,
              저녁 식사 후에는 갑판에서 생각을 비우고, 아침 수평선과 함께 기획을 여는 리듬 — 육지에서는 설계할
              수 없는 하루입니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Utensils className="w-5 h-5 text-brand-mid" />승선권 하나 = 숙박 + 뷔페 2식 + 국경 이동
            </h3>
            <p className="text-gray-600 leading-relaxed">
              따져보면 이 배는 &lsquo;움직이는 숙소&rsquo;입니다. 하룻밤 숙박, 조식·석식 뷔페 2회, 사우나와
              야외 수영장 같은 부대시설, 그리고 한국—일본 국가 간 이동까지 승선권 하나에 담겨 있습니다.
              오사카행 항공권에 첫날 숙박비와 두 끼 식사를 더해 보면 계산은 금방 끝납니다. 요금은 객실
              등급·시즌에 따라 달라지니 예약 페이지에서 확인하세요.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Luggage className="w-5 h-5 text-brand-mid" />수하물 스트레스 제로
            </h3>
            <p className="text-gray-600 leading-relaxed">
              장기 워케이션의 최대 난관은 일정이 아니라 짐입니다. 항공사의 무게 규정과 추가 요금 대신, 배는
              듀얼 모니터도 한 달 치 짐도 관대합니다. 오사카에서 한 달 살기를 계획 중이라면, 들어가는 길은
              배가 정답입니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Ship className="w-5 h-5 text-brand-mid" />5성급 무드의 선상 리트릿
            </h3>
            <p className="text-gray-600 leading-relaxed">
              2025년 4월 취항한 국내 첫 럭셔리 크루즈페리 — 사우나에서 하루의 피로를 풀고, 야외 수영장과
              조깅트랙, 갑판 산책으로 리커버리하세요. 일과 휴식의 전환이 계단 몇 개 차이입니다.
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
                <span className="block font-black text-gray-900">인터넷은 &lsquo;보조&rsquo;, 오프라인이 &lsquo;주력&rsquo;</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  미라클호는 저궤도 위성 기반 선내 와이파이를 갖추고 있어 가벼운 검색과 텍스트 소통은
                  가능합니다. 다만 해상 특성상 끊김이 있을 수 있으니, 출항 전 문서·자료를 로컬로 받아 두고
                  화상회의 대신 오프라인 초안 작업과 기획 구상을 배정하세요. 어쩌면 이 제약이 이 상품의 진짜
                  기능일지도 모릅니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <Clock className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">연계 교통은 최소 2시간 버퍼</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  하선과 입국 수속은 상황에 따라 지연될 수 있습니다. 도착 후 연계 열차를 예약한다면 도착 예정
                  시각 + 2시간 이후 편성으로. 그 사이 항구 근처에서 커피 한 잔이 훨씬 우아합니다.
                </span>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-gray-200 p-6">
              <AlertCircle className="shrink-0 w-6 h-6 text-brand-mid" />
              <div>
                <span className="block font-black text-gray-900">멀미가 걱정된다면</span>
                <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                  배는 미세하게 흔들립니다. 멀미약은 승선 30분~1시간 전 복용이 일반적이니 미리 준비해 두세요.
                  예민한 분은 선체 중앙부 객실을 선택하는 것도 방법입니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-blue-950 to-sky-950 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            다음 출항일 오후 5시, 부산항.
          </h2>
          <span className="block text-white/70 mt-4">
            노트북을 덮는 순간 숙소 체크인이 끝나 있고, 눈을 뜨면 오사카입니다.
            <br />
            좌석이 아니라 17시간의 몰입을 예약하세요.
          </span>
          <div className="mt-8">
            <BookingCtas />
          </div>
          <div className="mt-4 flex justify-center">
            <ShareButton title="바다 위 17시간, 부산—오사카 크루즈 워케이션" />
          </div>
          <span className="block text-white/40 text-xs mt-6 leading-relaxed">
            위 버튼은 제휴 링크이며, Wakation은 예약 주체가 아닙니다. 요금·운항 일정·환불 조건은 각 예약
            페이지에서 최종 확인됩니다. 팩트 기준: 팬스타 공식 보도자료·판매처 상품 구성 (2026-07-18 확인).
          </span>
          <div className="mt-8">
            <Link href="/cruise" className="text-sky-300 text-sm font-bold hover:text-sky-200">
              ← 크루즈 워케이션 전체 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
