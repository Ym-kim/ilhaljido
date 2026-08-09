import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TrainFront, Plug, Footprints, Bike, CalendarDays, MapPin, Battery, Waves } from 'lucide-react'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// /programs/domestic/jeongseon-train — 정선 아리랑열차(A-train) 워케이션 에디토리얼
// 팩트 검증(2026-07-18): 재개통 2026-05-22(2년 3개월 만, 2024-02 낙석 중단)·구간
// 제천~아우라지·운행 토일+정선5일장(2·7일)·제천발 09:02·운임 10,200원(2026-05
// 코레일 발표)·재개통 첫날 전석 매진 = 언론 보도 다수 / 레일바이크 구절리→아우라지
// 7.2km·15~20km/h·회차제 = 공식(railbike.co.kr) / 좌석 새마을 특실급·2좌석당
// 콘센트 1개 = 탑승기 기반 준검증. ❌미검증이라 미표기: 시속 50km·소요 2시간30분·
// 간이 테이블·파노라마 자유석·자전거 거치. 코레일·레일바이크는 제휴 없음(정보성)
// — 수익 동선은 Booking 숙소 딥링크 + /programs/support 강원 크로스링크.
// ─────────────────────────────────────────────────────────────────────────────

const BOOKING_JEONGSEON = 'https://www.booking.com/searchresults.html?aid=7854081&ss=Jeongseon'
const BOOKING_GANGNEUNG = 'https://www.booking.com/searchresults.html?aid=7854081&ss=Gangneung'
const JEONGSEON_HERO = '/media/destinations/jeongseon-atrain-licensed-v1.webp'

const HERO_COPY = {
  eyebrow: {
    KO: '정선 · SLOW-TRAIN WORKATION',
    EN: 'JEONGSEON · SLOW-TRAIN WORKATION',
    JP: '旌善 · スロートレイン・ワーケーション',
  },
  route: {
    KO: '정선 아리랑 열차 · 제천 → 아우라지',
    EN: 'Jeongseon Arirang Train · Jecheon → Auraji',
    JP: '旌善アリラン列車 · 堤川 → アウラジ',
  },
  title: {
    KO: '정선에서 느리게 달릴수록,\n일은 깊어진다',
    EN: 'The slower the train through Jeongseon,\nthe deeper the work',
    JP: '旌善をゆっくり走るほど、\n仕事は深まる',
  },
} satisfies Record<string, Record<Lang, string>>

export const metadata: Metadata = {
  title: '느리게 달릴수록, 일은 깊어진다 — 정선 아리랑 열차 워케이션',
  description:
    '2년 3개월 만에 돌아온 산악열차 A-train. 제천~아우라지, 토·일과 정선 5일장에만 달리는 오피스 — 아우라지 산책과 7.2km 레일바이크까지 국내 슬로우 워케이션 가이드.',
  alternates: { canonical: 'https://www.wakation.kr/programs/domestic/jeongseon-train' },
  openGraph: {
    images: [{ url: JEONGSEON_HERO, width: 1024, height: 613, alt: '정선역의 정선 아리랑 열차 A-train' }],
    title: '정선 아리랑 열차 워케이션 — 달리는 오피스',
    description: '2년 3개월 만에 재개통한 A-train으로 떠나는 슬로우 트레인 워케이션 가이드.',
    url: 'https://www.wakation.kr/programs/domestic/jeongseon-train',
    siteName: 'Wakation',
  },
}

export default function JeongseonTrainPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface relative isolate min-h-[34rem] overflow-hidden bg-[#032f2d] lg:min-h-[38rem]">
        <div className="absolute inset-y-0 right-0 w-full max-w-[1024px] lg:w-[58%]">
          <Image
            src={JEONGSEON_HERO}
            alt="정선역 승강장의 정선 아리랑 열차 A-train"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 1024px"
            quality={78}
            unoptimized
            className="object-cover object-[58%_center] lg:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,31,31,0.98)_0%,rgba(2,47,45,0.93)_34%,rgba(2,47,45,0.58)_62%,rgba(2,25,31,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(1,31,31,1)_0%,rgba(2,47,45,0.96)_33%,rgba(2,47,45,0.72)_50%,rgba(2,25,31,0.12)_82%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021b21]/75 via-transparent to-[#063b36]/15" />

        <div className="relative mx-auto flex min-h-[34rem] max-w-6xl items-end px-6 pb-14 pt-28 sm:items-center sm:pb-16 lg:min-h-[38rem]">
          <div className="max-w-2xl text-left">
            <span className="block text-xs font-black uppercase tracking-[0.16em] text-teal-200">
              {HERO_COPY.eyebrow.KO}
            </span>
            <span className="mt-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white/86 backdrop-blur-sm">
              {HERO_COPY.route.KO}
            </span>
            <h1 className="mt-5 whitespace-pre-line text-4xl font-black leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
              {HERO_COPY.title.KO}
            </h1>
            <span className="mt-6 block max-w-xl text-base leading-7 text-white/78 sm:text-lg">
              2년 3개월 만에 돌아온 산악열차, 정선 아리랑 열차(A-train). 창밖은 태백산맥의 절경,
              책상 위엔 노트북 — 오전을 통째로 몰입에 쓰는 &lsquo;달리는 오피스&rsquo;.
            </span>
            <span className="mt-6 block text-xs text-white/52">
              승차권은 코레일톡·레츠코레일에서 예매됩니다 (제휴 아님 · 정보성 안내)
            </span>
          </div>
        </div>
      </section>

      {/* 팩트 스트립 */}
      <section className="bg-[#f0fdf9] border-b border-teal-100 px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['주 2~3회', '토·일 + 정선 5일장(2·7일)'],
            ['제천발 09:02', '종점 아우라지'],
            ['₩10,200', '제천~아우라지 (2026-05 기준)'],
            ['2026.5.22 재개통', '첫날 전석 매진'],
          ].map(([v, l]) => (
            <div key={v}>
              <span className="block font-black text-teal-900">{v}</span>
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
              ['기획의 물꼬가 막힌 기획자', '모니터 앞에서 막힌 생각은 풍경 앞에서 풀립니다. 산과 강이 느리게 지나가는 창가 자리는, 화이트보드보다 좋은 발상 도구입니다.'],
              ['평일의 소음에 지친 리모트 워커', '이 열차는 토·일과 정선 5일장이 서는 날에만 달립니다. 주말 하루를 이동하며 정리하는 딥 워크 데이로 바꿔 보세요.'],
              ['리프레시가 필요한 팀', '종점에서 기다리는 7.2km 레일바이크는 페달을 나눠 밟는 팀 빌딩 코스. 오전엔 각자 몰입, 오후엔 함께 이완.'],
            ].map(([t, d], i) => (
              <div key={t} className="flex gap-4 bg-gray-50 rounded-2xl p-6">
                <span className="shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white font-black text-sm flex items-center justify-center">{i + 1}</span>
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
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">왜 느린 기차인가</h2>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <TrainFront className="w-5 h-5 text-teal-600" />이동 시간의 재발견 — 오전을 통째로 쓰는 슬로우 트레인
            </h3>
            <p className="text-gray-600 leading-relaxed">
              제천역에서 오전 9시 2분 출발, 종점 아우라지까지 태백산맥의 협곡과 강줄기를 따라 천천히
              달립니다. KTX의 속도가 &lsquo;시간을 아끼는 기술&rsquo;이라면, 이 열차의 느림은 &lsquo;시간을
              돌려주는 기술&rsquo;입니다. 빠른 도착이 아니라 긴 몰입 블록 그 자체가 이 여정의 본질 —
              창밖 풍경이 바뀔 때마다 문서의 단락도 하나씩 넘어갑니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Plug className="w-5 h-5 text-teal-600" />달리는 오피스의 인프라
            </h3>
            <p className="text-gray-600 leading-relaxed">
              전 좌석이 새마을호 특실급 시트로, 좌석 2개당 콘센트가 하나씩 있어 노트북 작업에 무리가
              없습니다. 화면에서 눈을 떼고 싶을 땐 넓은 차창 너머 풍경으로 &mdash; &lsquo;집중 → 조망 →
              다시 집중&rsquo;의 리듬을 만들기 좋은 열차입니다.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Footprints className="w-5 h-5 text-teal-600" />도착 후의 이완 — 아우라지 디지털 디톡스 산책
            </h3>
            <p className="text-gray-600 leading-relaxed">
              종점 아우라지역은 정선아리랑 첫 소절의 무대. 송천과 골지천이 어우러지는 강가를 따라
              출렁다리와 징검다리를 건너는 산책은, 오전의 몰입을 비워내는 가장 아날로그적인 방법입니다.
              노트북은 가방에, 시선은 물길에.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Bike className="w-5 h-5 text-teal-600" />구절리 레일바이크 — 몸으로 하는 리셋
            </h3>
            <p className="text-gray-600 leading-relaxed">
              아우라지 옆 구절리역에서는 폐선로를 달리는 7.2km 레일바이크가 기다립니다. 시속 15~20km로
              페달을 밟는 약 1시간 30분(복귀 풍경열차 포함) — 혼자면 명상이고, 팀이면 최고의
              아이스브레이킹입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 실전 꿀팁 */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">Wakation 실전 꿀팁</h2>
          <div className="space-y-5">
            {[
              [CalendarDays, '일주일에 단 2~3일만 달립니다', '토·일요일과 정선 5일장(끝자리 2·7일)에만 운행하는 희소 열차입니다. 떠나기 전 코레일톡에서 운행일과 시간표부터 확인하세요. 재개통 첫날 전석 매진된 열차입니다.'],
              [MapPin, '서울에서 간다면 제천 환승', '재개통 후 운행 구간은 제천~아우라지입니다. 서울에서는 청량리발 KTX-이음으로 제천까지 이동 후 환승하는 동선이 기본. 제천발이 오전 9시 2분이니 환승 여유를 넉넉히 두세요.'],
              [Battery, '콘센트는 2좌석당 1개', '좌석 예매 시 창가를 선점하고, 보조배터리를 챙기면 콘센트 셰어 눈치싸움에서 자유롭습니다.'],
              [Bike, '레일바이크는 회차제', '하절기 기준 08:40부터 16:40까지 5회차 운영. 열차 도착 시간과 맞는 회차를 미리 예약하고, 주말엔 조기 마감에 대비하세요.'],
              [Waves, '징검다리는 수량 체크', '비가 온 뒤에는 징검다리 통행이 제한될 수 있으니, 그런 날은 출렁다리 코스로.'],
            ].map(([Icon, t, d]) => {
              const IconC = Icon as React.ComponentType<{ className?: string }>
              return (
                <div key={t as string} className="flex gap-4 rounded-2xl border border-gray-200 p-6">
                  <IconC className="shrink-0 w-6 h-6 text-teal-600" />
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
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-teal-950 to-emerald-950 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            이번 주말, 오전 9시 2분 제천역.
          </h2>
          <span className="block text-white/70 mt-4">
            열차가 느려지는 만큼, 당신의 몰입은 깊어집니다.
            <br />
            좌석이 아니라 태백산맥을 통과하는 몰입의 시간을 예약하세요.
          </span>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_JEONGSEON}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-brand-mid text-white hover:bg-brand-light shadow-md transition-all"
            >
              정선 숙소 검색 · Booking.com
            </a>
            <a
              href={BOOKING_GANGNEUNG}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border border-white/30 text-white hover:border-white/60 transition-all"
            >
              강릉에서 이어가기 · 숙소 검색
            </a>
          </div>
          <div className="mt-4">
            <Link
              href="/programs/support"
              className="inline-flex items-center gap-1.5 text-teal-300 text-sm font-bold hover:text-teal-200"
            >
              강원 워케이션 지원사업 확인하기 — 공유오피스 9개 운영사 →
            </Link>
          </div>
          <span className="block text-white/40 text-xs mt-6 leading-relaxed">
            승차권은 코레일톡·레츠코레일에서 예매됩니다(운임 ₩10,200, 제천~아우라지, 2026-05 코레일 발표
            기준). 숙소 버튼은 제휴 링크이며 요금·조건은 제휴사 사이트에서 최종 확인됩니다. 운행일·시간표는
            변동될 수 있습니다.
          </span>
          <div className="mt-8">
            <Link href="/programs/domestic" className="text-teal-300 text-sm font-bold hover:text-teal-200">
              ← 국내 워케이션 전체 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
