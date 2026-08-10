import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 목적지 가이드 — /guide/{slug} 에디터 콘텐츠 (SEO 유입 + 체류 + 제휴 동선)
//
// 원칙:
// - 사실 데이터만: 시차·직항 소요·통화·건기는 리서치 검증값
// - 동네 서술은 코드베이스에서 이미 검증된 카피 기반 + 일반 상식 수준만
// - 사진은 검증 풀 재사용 (와이드 크롭은 URL 파라미터만 변경)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

export type CityGuide = {
  slug: string
  /** /select/hotel#{anchor} */
  anchor: string
  heroPhoto: string
  name: L
  tagline: L
  intro: L
  lookbook?: {
    eyebrow: L
    title: L
    intro: L
    items: Array<{
      src: string
      eyebrow: L
      title: L
      description: L
    }>
  }
  facts: { label: L; value: L }[]
  areas: { name: L; desc: L }[]
  /** featured.ts 아이템 id */
  stayIds: string[]
  activityIds: string[]
  /** Trip.com 노선 페이지 (Allianceid 부착, 실물 검증 2026-07-09) */
  flightUrl?: string
  /** IANA 타임존 — 워크타임 오버랩 위젯용 */
  timeZone: string
  /** 빠른 비교 데이터 (GuideView 팩트 스트립용, 3언어) */
  internet?: 1 | 2 | 3 | 4 | 5
  costMonthly?: L   // { KO: '월 160만원대', … }
  visaFree?: L      // { KO: '무비자 90일', … }
  /** 지자체 지원사업 연계 콜아웃 — id는 SUPPORT_PROGRAMS 실존 id만 (/programs/support/[slug]) */
  supportProgram?: { id: string; name: L; desc: L }
}

const FLIGHT = (slug: string) =>
  `https://kr.trip.com/flights/${slug}/?Allianceid=9024807`

const F = {
  tz: { KO: '시차', EN: 'Time difference', JP: '時差' },
  flight: { KO: '직항 소요', EN: 'Direct flight', JP: '直行便' },
  currency: { KO: '통화', EN: 'Currency', JP: '通貨' },
  season: { KO: '추천 시즌', EN: 'Best season', JP: 'ベストシーズン' },
}

export const CITY_GUIDES: CityGuide[] = [
  {
    slug: 'tokyo',
    anchor: 'japan-tokyo',
    heroPhoto: '/media/destinations/tokyo-editorial-v1.webp',
    name: { KO: '도쿄', EN: 'Tokyo', JP: '東京' },
    tagline: {
      KO: '시차 0시간, 업무 리듬 그대로 즐기는 대도시 워케이션',
      EN: 'Zero jet lag — a megacity workation on your normal rhythm',
      JP: '時差ゼロ、いつものリズムで楽しむ大都市ワーケーション',
    },
    intro: {
      KO: '한국과 시차가 없어 회의·마감 일정을 그대로 유지할 수 있는 도시입니다. 호텔 안에 코워킹을 품은 숙소가 있고, 퇴근 후에는 세계 최대급 도시의 밤이 기다립니다. 주말을 붙인 3~4일 일정부터 2주 체류까지 무리 없이 소화됩니다.',
      EN: 'No time difference from Korea means your meetings and deadlines stay untouched. Some hotels have coworking floors built in, and after log-off one of the world’s great cities is waiting. Works for a long weekend or a two-week stay.',
      JP: '韓国と時差がなく、会議や締め切りのスケジュールをそのまま維持できます。コワーキングを備えたホテルもあり、仕事の後は世界有数の都市の夜が待っています。週末プラスの3〜4日から2週間滞在まで。',
    },
    facts: [
      { label: F.tz, value: { KO: '0시간', EN: '0 hours', JP: '0時間' } },
      { label: F.flight, value: { KO: '약 2시간 20분', EN: '~2h 20m', JP: '約2時間20分' } },
      { label: F.currency, value: { KO: '엔 (JPY)', EN: 'JPY', JP: '円 (JPY)' } },
      { label: F.season, value: { KO: '3~5월 · 10~11월', EN: 'Mar–May · Oct–Nov', JP: '3〜5月 · 10〜11月' } },
    ],
    areas: [
      {
        name: { KO: '시부야', EN: 'Shibuya', JP: '渋谷' },
        desc: {
          KO: '호텔 안에 코워킹 .andwork를 2개 층 품은 숙소가 있는 동네. 역 도보권에 카페와 심야 식당이 밀집해 일과 후 동선이 짧습니다.',
          EN: 'Home to a hotel with two floors of .andwork coworking inside. Cafés and late-night eateries cluster within walking distance of the station.',
          JP: 'ホテル内にコワーキング「.andwork」を2フロア備えた宿があるエリア。駅徒歩圏にカフェと深夜営業の飲食店が密集。',
        },
      },
      {
        name: { KO: '신주쿠 · 마루노우치', EN: 'Shinjuku · Marunouchi', JP: '新宿 · 丸の内' },
        desc: {
          KO: '비즈니스 인프라가 집약된 지역. 전원 콘센트를 갖춘 카페와 유료 코워킹 지점이 많아 외부 미팅이 있는 날의 거점으로 좋습니다.',
          EN: 'Dense business infrastructure — plenty of outlet-equipped cafés and coworking branches, handy on days with external meetings.',
          JP: 'ビジネスインフラが集約されたエリア。電源付きカフェやコワーキング拠点が多く、外部ミーティングの日に便利。',
        },
      },
    ],
    stayIds: ['stay-millennials-shibuya'],
    activityIds: ['act-tokyo-disney'],
    flightUrl: FLIGHT('seoul-to-tokyo/airfares-sel-tyo'),
    timeZone: 'Asia/Tokyo',
    internet: 5,
    costMonthly: { KO: '월 160만원대', EN: '~₩1.6M / month', JP: '月160万ウォン程度' },
    visaFree: { KO: '무비자 90일', EN: 'Visa-free 90 days', JP: 'ビザなし90日' },
  },
  {
    slug: 'fukuoka',
    anchor: 'japan-fukuoka',
    heroPhoto: '/media/destinations/fukuoka-editorial-v1.webp',
    name: { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' },
    tagline: {
      KO: '비행 1시간대 — 금요일 반차로 시작하는 가장 가까운 해외 워케이션',
      EN: 'The nearest overseas workation — start with a Friday half-day',
      JP: '飛行機1時間台 — 金曜半休で始める一番近い海外ワーケーション',
    },
    intro: {
      KO: '인천에서 약 1시간 20분, 시차도 없어 주말 워케이션에 가장 부담 없는 해외 도시입니다. 투숙객 무료 코워킹을 갖춘 숙소가 있고, 컴팩트한 도심 덕분에 이동 시간이 짧아 짧은 체류의 밀도가 높습니다.',
      EN: 'About 1h 20m from Incheon with zero time difference — the lowest-friction overseas weekend workation. Stays with free guest coworking exist, and the compact city keeps travel time minimal.',
      JP: '仁川から約1時間20分、時差もなく、週末ワーケーションに最も気軽な海外都市。宿泊者無料のコワーキング付きの宿もあり、コンパクトな街で移動時間も短い。',
    },
    lookbook: {
      eyebrow: { KO: 'A DAY IN FUKUOKA', EN: 'A DAY IN FUKUOKA', JP: 'A DAY IN FUKUOKA' },
      title: {
        KO: '낮의 집중과 저녁의 산책이 가까운 도시',
        EN: 'A city where focused mornings and evening walks stay close',
        JP: '昼の集中と夜の散歩が、すぐ近くにある街',
      },
      intro: {
        KO: '오전에는 카페에서 일정을 정리하고, 퇴근 뒤에는 강변과 골목을 걷습니다. 근교가 필요한 날은 반나절만 비워 이토시마로 이어갈 수 있어 짧은 체류도 단조롭지 않습니다.',
        EN: 'Use the morning to settle your plan at a café, then walk the riverside lanes after work. Leave half a day for Itoshima when the city needs a change of pace.',
        JP: '午前はカフェで予定を整え、仕事の後は川沿いと路地を歩く。街を離れたい日は半日だけ空けて糸島へつなげられます。',
      },
      items: [
        {
          src: '/media/brand-models/fukuoka-model-h-cafe-work-v1.webp',
          eyebrow: { KO: 'MORNING · WORK', EN: 'MORNING · WORK', JP: 'MORNING · WORK' },
          title: {
            KO: '카페에서 하루의 동선을 먼저 정리하기',
            EN: 'Map the day before leaving the café',
            JP: 'カフェで一日の動線を先に整える',
          },
          description: {
            KO: '컴팩트한 도심은 오전 업무와 오후 이동을 한 일정 안에 놓기 좋습니다. 노트북을 닫을 시간을 먼저 정해두면 짧은 체류도 여유가 생깁니다.',
            EN: 'The compact center makes it easier to place morning work and afternoon movement in one plan. Set a laptop-off time first to keep a short stay unhurried.',
            JP: 'コンパクトな中心部なら、午前の仕事と午後の移動を一つの予定にまとめやすい。先に仕事を終える時間を決めると、短い滞在にも余白が生まれます。',
          },
        },
        {
          src: '/media/destinations/fukuoka-after-work-riverside-v1.webp',
          eyebrow: { KO: 'BLUE HOUR · WALK', EN: 'BLUE HOUR · WALK', JP: 'BLUE HOUR · WALK' },
          title: {
            KO: '강변의 푸른 시간에서 저녁 골목으로',
            EN: 'From blue-hour riverside to evening lanes',
            JP: '川辺の青い時間から、夜の路地へ',
          },
          description: {
            KO: '퇴근 뒤에는 긴 이동보다 강변과 골목을 잇는 짧은 산책이 잘 맞습니다. 포장마차와 식당의 운영 여부는 당일 현지에서 확인하세요.',
            EN: 'After work, choose a short riverside-to-lane walk over another long transfer. Check each stall or restaurant’s opening status locally that day.',
            JP: '仕事の後は長い移動より、川沿いから路地へ続く短い散歩が似合います。屋台や飲食店の営業状況は当日に現地で確認してください。',
          },
        },
      ],
    },
    facts: [
      { label: F.tz, value: { KO: '0시간', EN: '0 hours', JP: '0時間' } },
      { label: F.flight, value: { KO: '약 1시간 20분', EN: '~1h 20m', JP: '約1時間20分' } },
      { label: F.currency, value: { KO: '엔 (JPY)', EN: 'JPY', JP: '円 (JPY)' } },
      { label: F.season, value: { KO: '봄 · 가을', EN: 'Spring · Autumn', JP: '春 · 秋' } },
    ],
    areas: [
      {
        name: { KO: '하카타', EN: 'Hakata', JP: '博多' },
        desc: {
          KO: '나카스카와바타역 도보권에 9층 전용 코워킹(투숙객 무료)과 테라스를 갖춘 숙소가 있는 중심가. 공항에서 지하철로 10분대라 도착 당일부터 업무가 가능합니다.',
          EN: 'The city core — a stay with a free 9th-floor coworking space sits near Nakasu-Kawabata station. The airport is ~10 minutes by subway, so you can work from day one.',
          JP: '中洲川端駅徒歩圏に9階の宿泊者無料コワーキング＋テラス付きの宿がある中心街。空港から地下鉄10分台で、到着日から仕事ができる。',
        },
      },
      {
        name: { KO: '텐진', EN: 'Tenjin', JP: '天神' },
        desc: {
          KO: '쇼핑·카페가 밀집한 번화가. 낮에는 카페 워크, 저녁에는 포장마차 야타이 거리로 이어지는 후쿠오카식 퇴근 루트를 만들 수 있습니다.',
          EN: 'The bustling shopping district — café work by day, then the yatai food-stall streets for a very Fukuoka way to end the workday.',
          JP: 'ショッピングとカフェが密集する繁華街。昼はカフェワーク、夜は屋台通りへ — 福岡らしい退勤ルート。',
        },
      },
    ],
    stayIds: ['stay-webase-hakata'],
    activityIds: ['act-fukuoka-bustour'],
    flightUrl: FLIGHT('seoul-to-fukuoka/airfares-sel-fuk'),
    timeZone: 'Asia/Tokyo',
    internet: 5,
    costMonthly: { KO: '월 120만원대', EN: '~₩1.2M / month', JP: '月120万ウォン程度' },
    visaFree: { KO: '무비자 90일', EN: 'Visa-free 90 days', JP: 'ビザなし90日' },
  },
  {
    slug: 'danang',
    anchor: 'vietnam-danang',
    heroPhoto: '/media/destinations/danang-editorial-v1.webp',
    name: { KO: '다낭', EN: 'Da Nang', JP: 'ダナン' },
    tagline: {
      KO: '오전은 느긋하게, 오후는 비치 앞 데스크 — 시차 2시간의 여유',
      EN: 'Slow mornings, a desk by the beach — two hours behind Korea',
      JP: '朝はゆっくり、午後はビーチ前のデスク — 時差2時間の余裕',
    },
    intro: {
      KO: '한국보다 2시간 느려 오전이 여유로운 도시입니다. 미케비치를 따라 카페형 라운지를 갖춘 숙소가 이어지고, 노마드가 모이는 안트엉 지구에는 노트북 작업하기 좋은 카페가 밀집해 있습니다. 1~2주 체류부터 한 달 살기까지 폭넓게 맞습니다.',
      EN: 'Two hours behind Korea, so mornings feel unhurried. Café-style lounges line My Khe beach, and the An Thuong nomad quarter is dense with laptop-friendly cafés. Fits anything from two weeks to a month.',
      JP: '韓国·日本より2時間遅く、朝に余裕が生まれる街。ミーケビーチ沿いにカフェ風ラウンジ付きの宿が並び、ノマドが集まるアントゥオン地区にはPC作業向きのカフェが密集。2週間〜1カ月滞在に。',
    },
    facts: [
      { label: F.tz, value: { KO: '-2시간', EN: '−2 hours', JP: '−2時間' } },
      { label: F.flight, value: { KO: '약 4시간 30분', EN: '~4h 30m', JP: '約4時間30分' } },
      { label: F.currency, value: { KO: '동 (VND)', EN: 'VND', JP: 'ドン (VND)' } },
      { label: F.season, value: { KO: '2~8월 (건기)', EN: 'Feb–Aug (dry)', JP: '2〜8月（乾季）' } },
    ],
    areas: [
      {
        name: { KO: '안트엉', EN: 'An Thuong', JP: 'アントゥオン' },
        desc: {
          KO: '노마드가 모이는 지구. 노트북 하기 좋은 카페가 밀집해 있고, 미케비치까지 도보 몇 분이라 업무와 바다 사이의 거리가 가장 짧습니다.',
          EN: 'The nomad quarter — packed with laptop-friendly cafés, minutes on foot from My Khe beach. The shortest distance between work and the sea.',
          JP: 'ノマドが集まる地区。PC作業向きのカフェが密集し、ミーケビーチまで徒歩数分。仕事と海の距離が最短。',
        },
      },
      {
        name: { KO: '미케비치', EN: 'My Khe Beach', JP: 'ミーケビーチ' },
        desc: {
          KO: '해변 도보 2분 거리에 카페형 라운지와 루프탑 풀을 갖춘 숙소가 있는 라인. 일과 후 선셋 산책이 일상이 됩니다.',
          EN: 'Stays with café lounges and rooftop pools sit two minutes from the sand. Post-work sunset walks become routine.',
          JP: 'ビーチ徒歩2分にカフェラウンジとルーフトッププール付きの宿。仕事後のサンセット散歩が日常に。',
        },
      },
    ],
    stayIds: ['stay-chicland-danang'],
    activityIds: ['act-danang-banahills'],
    flightUrl: FLIGHT('seoul-to-danang/airfares-sel-dad'),
    timeZone: 'Asia/Ho_Chi_Minh',
    internet: 4,
    costMonthly: { KO: '월 90만원대', EN: '~₩900K / month', JP: '月90万ウォン程度' },
    // 2026-08-04 한시조치 표기 (content.ts 검증 표현 동기 — visaExpiries.ts 감시 대상)
    visaFree: { KO: '무비자 45일 (2028.3까지 한시)', EN: 'Visa-free 45 days (until Mar 2028)', JP: 'ビザなし45日（2028.3まで）' },
  },
  {
    slug: 'bali',
    anchor: 'indonesia-bali',
    heroPhoto: '/media/destinations/bali-editorial-v1.webp',
    name: { KO: '발리', EN: 'Bali', JP: 'バリ' },
    tagline: {
      KO: '노마드 인프라의 교과서 — 한 달 살기의 세계적 기준점',
      EN: 'The textbook of nomad infrastructure — the global month-stay benchmark',
      JP: 'ノマドインフラの教科書 — 1カ月滞在の世界的定番',
    },
    intro: {
      KO: '시차 1시간으로 실시간 협업에 지장이 없으면서, 코워킹 전용 설계 숙소와 노마드 커뮤니티가 성숙한 섬입니다. 서핑과 카페의 짱구, 라이스테라스와 요가의 우붓 — 분위기가 다른 두 거점을 오가며 한 달을 계획해 보세요.',
      EN: 'Only one hour behind — real-time collaboration stays intact — with purpose-built coworking stays and a mature nomad community. Split a month between surfy Canggu and terraced, yoga-centric Ubud.',
      JP: '時差1時間でリアルタイム協業に支障なく、コワーキング特化型の宿とノマドコミュニティが成熟した島。サーフィンとカフェのチャングー、ライステラスとヨガのウブド — 雰囲気の違う2拠点で1カ月を。',
    },
    facts: [
      { label: F.tz, value: { KO: '-1시간', EN: '−1 hour', JP: '−1時間' } },
      { label: F.flight, value: { KO: '약 7시간', EN: '~7h', JP: '約7時間' } },
      { label: F.currency, value: { KO: '루피아 (IDR)', EN: 'IDR', JP: 'ルピア (IDR)' } },
      { label: F.season, value: { KO: '4~10월 (건기)', EN: 'Apr–Oct (dry)', JP: '4〜10月（乾季）' } },
    ],
    areas: [
      {
        name: { KO: '짱구', EN: 'Canggu', JP: 'チャングー' },
        desc: {
          KO: '발리 최초의 코워킹 전용 설계 숙소가 있는 노마드 성지. 풀사이드 워크스페이스에서 일하고, 서핑과 카페 호핑으로 하루를 닫습니다.',
          EN: 'The nomad mecca, home to Bali’s first purpose-built coworking stay. Work poolside, close the day with surf and café hopping.',
          JP: 'バリ初のコワーキング特化型ステイがあるノマドの聖地。プールサイドで働き、サーフィンとカフェ巡りで一日を締める。',
        },
      },
      {
        name: { KO: '우붓', EN: 'Ubud', JP: 'ウブド' },
        desc: {
          KO: '라이스테라스와 사원, 요가 스튜디오의 동네. 짱구보다 고요해서 집중 작업 주간을 보내기 좋습니다.',
          EN: 'Rice terraces, temples and yoga studios. Quieter than Canggu — right for a deep-focus week.',
          JP: 'ライステラスと寺院、ヨガスタジオの街。チャングーより静かで、集中作業の週に最適。',
        },
      },
    ],
    stayIds: ['stay-tribal-bali'],
    activityIds: ['act-bali-ubud'],
    flightUrl: FLIGHT('seoul-to-denpasar/airfares-sel-dps'),
    timeZone: 'Asia/Makassar',
    internet: 3,
    costMonthly: { KO: '월 100만원대', EN: '~₩1.0M / month', JP: '月100万ウォン程度' },
    visaFree: { KO: '무비자 30일 → E33G 60일 연장', EN: 'Visa-free 30 days → +60 via E33G', JP: 'ビザなし30日 → E33Gで60日延長' },
  },
  {
    slug: 'chiangmai',
    anchor: 'thailand-chiangmai',
    heroPhoto: '/media/destinations/chiangmai-editorial-v1.webp',
    name: { KO: '치앙마이', EN: 'Chiang Mai', JP: 'チェンマイ' },
    tagline: {
      KO: '장기 체류의 수도 — 키치넷 딸린 서비스드 아파트에서 한 달',
      EN: 'The capital of long stays — a month in a kitchenette apartment',
      JP: '長期滞在の都 — キッチン付きアパートで1カ月',
    },
    intro: {
      KO: '키치넷을 갖춘 서비스드 아파트가 흔해 한 달 살기의 생활비 부담이 낮은 도시입니다. 카페 밀도가 높은 님만해민을 거점으로 삼으면 도보권 안에서 일·식사·산책이 모두 해결됩니다. 11~2월 건기가 가장 쾌적합니다.',
      EN: 'Serviced apartments with kitchenettes are common, keeping month-stay living costs low. Base yourself in café-dense Nimman and work, meals and walks all happen on foot. Nov–Feb dry season is the sweet spot.',
      JP: 'キッチン付きサービスアパートが豊富で、1カ月滞在の生活コストを抑えられる街。カフェ密度の高いニマンヘミンを拠点にすれば、仕事も食事も散歩も徒歩圏内。11〜2月の乾季が最も快適。',
    },
    facts: [
      { label: F.tz, value: { KO: '-2시간', EN: '−2 hours', JP: '−2時間' } },
      { label: F.flight, value: { KO: '약 5시간 30분', EN: '~5h 30m', JP: '約5時間30分' } },
      { label: F.currency, value: { KO: '바트 (THB)', EN: 'THB', JP: 'バーツ (THB)' } },
      { label: F.season, value: { KO: '11~2월 (건기)', EN: 'Nov–Feb (dry)', JP: '11〜2月（乾季）' } },
    ],
    areas: [
      {
        name: { KO: '님만해민', EN: 'Nimmanhaemin', JP: 'ニマンヘミン' },
        desc: {
          KO: '마야몰·원님만 도보권의 카페 밀집 지구. 장기 체류 특화 서비스드 아파트가 있어 노마드의 기본 거점으로 통합니다.',
          EN: 'The café-dense quarter within walking distance of Maya Mall and One Nimman. Long-stay serviced apartments make it the default nomad base.',
          JP: 'マヤモール·ワンニマン徒歩圏のカフェ密集地区。長期滞在向けサービスアパートがあり、ノマドの定番拠点。',
        },
      },
      {
        name: { KO: '올드시티', EN: 'Old City', JP: '旧市街' },
        desc: {
          KO: '해자로 둘러싸인 구시가. 사원과 로컬 시장 사이를 걷는 저녁 산책이 장기 체류의 리듬을 만들어 줍니다.',
          EN: 'The moat-ringed old town — evening walks between temples and local markets set the rhythm of a long stay.',
          JP: '堀に囲まれた旧市街。寺院とローカル市場の間を歩く夕方の散歩が、長期滞在のリズムをつくる。',
        },
      },
    ],
    stayIds: ['stay-kantary-chiangmai'],
    activityIds: [],
    flightUrl: FLIGHT('seoul-to-chiangmai/airfares-sel-cnx'),
    timeZone: 'Asia/Bangkok',
    internet: 4,
    costMonthly: { KO: '월 110만원대', EN: '~₩1.1M / month', JP: '月110万ウォン程度' },
    visaFree: { KO: '무비자 60일', EN: 'Visa-free 60 days', JP: 'ビザなし60日' },
  },
  {
    slug: 'jeju',
    anchor: 'korea-jeju',
    heroPhoto: '/media/destinations/jeju-editorial-v1.webp',
    name: { KO: '제주', EN: 'Jeju', JP: '済州' },
    tagline: {
      KO: '여권 없이 만나는 바다 앞 데스크 — 가장 빠른 워케이션',
      EN: 'A desk by the sea, no passport needed — the fastest workation',
      JP: 'パスポートなしで海の前のデスクへ — 最速のワーケーション',
    },
    intro: {
      KO: '국내라서 환전도 로밍도 필요 없습니다. 비행 1시간이면 성산 일출봉 앞, 업무 데스크가 분리된 객실과 워케이션 전용 패키지를 운영하는 숙소가 기다립니다. 주말 짧은 리셋부터 2주 집중 체류까지 부담이 없습니다.',
      EN: 'Domestic — no currency exchange, no roaming. An hour’s flight puts you near Seongsan Ilchulbong, where stays run dedicated workation packages with separate work desks. Zero friction from a weekend reset to a two-week stint.',
      JP: '国内（韓国）なので両替もローミングも不要。飛行機1時間で城山日出峰の前へ。ワークデスク分離型客室とワーケーション専用パッケージのある宿が待っています。',
    },
    lookbook: {
      eyebrow: { KO: 'A DAY IN JEJU', EN: 'A DAY IN JEJU', JP: 'A DAY IN JEJU' },
      title: {
        KO: '비가 그치면, 일의 속도도 섬의 리듬으로',
        EN: 'After the rain, work settles into the island rhythm',
        JP: '雨上がり、仕事の速さも島のリズムへ',
      },
      intro: {
        KO: '오전에는 성산이나 애월의 업무 공간에서 집중하고, 한 차례 비가 지난 뒤에는 돌담길과 서쪽 바다로 나갑니다. 짧은 이동 안에서 업무와 산책, 제주의 선명한 해안을 한 날에 이어보세요.',
        EN: 'Focus at a Seongsan or Aewol workspace in the morning, then step into a basalt lane and the western coast after a passing shower. Work, a quiet walk and Jeju’s vivid shoreline fit into one unhurried day.',
        JP: '午前は城山や涯月のワークスペースで集中し、雨が通り過ぎたら石垣の道と西側の海へ。仕事と散歩、済州らしい鮮やかな海岸を、ゆったりした一日にまとめます。',
      },
      items: [
        {
          src: '/media/brand-models/jeju-model-g-after-rain-coast-v1.webp',
          eyebrow: { KO: 'AFTER RAIN · ISLAND LANE', EN: 'AFTER RAIN · ISLAND LANE', JP: 'AFTER RAIN · ISLAND LANE' },
          title: {
            KO: '노트북을 들고 비 갠 돌담길로',
            EN: 'Take the laptop sleeve into a rain-cleared lane',
            JP: 'ノートPCケースを手に、雨上がりの石垣道へ',
          },
          description: {
            KO: '제주의 날씨는 짧은 시간에도 바뀔 수 있습니다. 업무를 마친 뒤에는 가까운 산책 동선을 고르고, 강풍·호우·해안 통제 여부를 당일 공식 안내에서 확인하세요.',
            EN: 'Jeju weather can shift quickly. Choose a nearby walk after work and check same-day wind, rain and coastal access notices through official channels.',
            JP: '済州の天候は短時間でも変わります。仕事の後は近い散歩ルートを選び、強風・大雨・海岸の立入情報を当日の公式案内で確認してください。',
          },
        },
        {
          src: '/media/destinations/jeju-hyeopjae-volcanic-coast-licensed-v1.webp',
          eyebrow: { KO: 'WEST COAST · HYEOPJAE', EN: 'WEST COAST · HYEOPJAE', JP: 'WEST COAST · HYEOPJAE' },
          title: {
            KO: '검은 현무암 너머 비양도를 바라보기',
            EN: 'Look toward Biyangdo beyond the black volcanic shore',
            JP: '黒い火山岩の向こうに飛揚島を望む',
          },
          description: {
            KO: '협재 해변에서는 검은 현무암과 비양도, 밝은 바다색이 한 장면에 겹칩니다. 파도·바람·입수 가능 여부는 방문 당일 제주도와 현지 안전 안내를 확인하세요.',
            EN: 'At Hyeopjae, black volcanic rock, Biyangdo and bright water share the same frame. Check waves, wind and current swimming guidance with Jeju and local safety notices on the day.',
            JP: '挟才海水浴場では、黒い火山岩と飛揚島、明るい海の色が一つの景色に重なります。波・風・遊泳情報は当日、済州道と現地の安全案内で確認してください。',
          },
        },
      ],
    },
    facts: [
      { label: F.tz, value: { KO: '없음 (국내)', EN: 'None (domestic)', JP: 'なし（国内）' } },
      { label: F.flight, value: { KO: '약 1시간 10분', EN: '~1h 10m', JP: '約1時間10分' } },
      { label: F.currency, value: { KO: '원 (KRW)', EN: 'KRW', JP: 'ウォン (KRW)' } },
      { label: F.season, value: { KO: '사계절 (봄·가을 쾌적)', EN: 'Year-round (best in spring/autumn)', JP: '通年（春·秋が快適）' } },
    ],
    areas: [
      {
        name: { KO: '성산', EN: 'Seongsan', JP: '城山' },
        desc: {
          KO: '일출봉 인근, 침실과 업무 데스크를 분리한 객실과 워케이션 전용 패키지를 운영하는 숙소가 있는 동쪽 거점.',
          EN: 'The eastern base near Ilchulbong — stays here separate bedroom from work desk and run dedicated workation packages.',
          JP: '日出峰近くの東の拠点。寝室とワークデスクを分けた客室、ワーケーション専用パッケージのある宿も。',
        },
      },
      {
        name: { KO: '애월', EN: 'Aewol', JP: '涯月' },
        desc: {
          KO: '해안도로를 따라 오션뷰 카페가 이어지는 서쪽 라인. 오후 카페 워크와 노을 드라이브를 한 동선에 담을 수 있습니다.',
          EN: 'The western coastal stretch lined with ocean-view cafés — afternoon café work and a sunset drive in one loop.',
          JP: '海岸道路沿いにオーシャンビューカフェが続く西のライン。午後のカフェワークと夕日ドライブをひとつの動線で。',
        },
      },
    ],
    stayIds: ['stay-playce-jeju'],
    activityIds: [],
    flightUrl: FLIGHT('seoul-to-jeju/airfares-sel-cju'),
    timeZone: 'Asia/Seoul',
    internet: 4,
    costMonthly: { KO: '월 70만원대', EN: '~₩700K / month', JP: '月70万ウォン程度' },
    visaFree: { KO: '국내 (비자 불필요)', EN: 'Domestic (no visa)', JP: '国内（ビザ不要）' },
    supportProgram: {
      // SUPPORT_PROGRAMS 실존 등재 데이터 재사용 (jeju-voucher, 신규 주장 0)
      id: 'jeju-voucher',
      name: { KO: '제주 민간형 워케이션 바우처', EN: 'Jeju Workation Voucher', JP: '済州ワーケーションバウチャー' },
      desc: {
        KO: '숙박+오피스 1박 최대 5만원, 파트너 오피스 17곳 — 도외 재직자 대상, 조건은 공식 공고 기준으로 확인하세요.',
        EN: 'Stay+office voucher up to ₩50,000/night at 17 partner offices for non-Jeju workers — check conditions on the official notice.',
        JP: '宿泊＋オフィス1泊最大5万W・提携オフィス17カ所（道外の在職者対象） — 条件は公式公告でご確認ください。',
      },
    },
  },
  {
    slug: 'osaka',
    anchor: 'japan-osaka',
    heroPhoto: '/media/destinations/osaka-editorial-v1.webp',
    name: { KO: '오사카', EN: 'Osaka', JP: '大阪' },
    tagline: {
      KO: '시차 0 · 직항 1시간대 — 주말을 붙이기 가장 쉬운 워케이션',
      EN: 'Zero jet lag, a short flight — the easiest weekend-extension workation',
      JP: '時差ゼロ・短距離フライト — 週末を足しやすいワーケーション',
    },
    intro: {
      KO: '한국과 시차가 없고 직항 1시간대라 금요일 반차로도 시작할 수 있는 도시입니다. 혼마치 비즈니스 지구에는 작업 가능한 공용 라운지를 여러 곳 갖춘 숙소가 있고, 일과 후에는 도톤보리와 신세카이의 먹자골목이 기다립니다.',
      EN: 'No time difference and a roughly 1.5-hour flight — you can start with a Friday half-day. The Honmachi business district has stays with multiple work-friendly lounges, and Dotonbori and Shinsekai food streets wait after log-off.',
      JP: '時差がなく直行便も短時間、金曜半休からでも始められる街。本町ビジネス地区には作業できる共用ラウンジを備えた宿があり、仕事の後は道頓堀と新世界の食べ歩きが待っています。',
    },
    lookbook: {
      eyebrow: { KO: 'A DAY IN OSAKA', EN: 'A DAY IN OSAKA', JP: 'A DAY IN OSAKA' },
      title: {
        KO: '아침의 미식과 퇴근 뒤 전시를 한 동선에',
        EN: 'Morning flavors and after-work culture in one city rhythm',
        JP: '朝の味と、仕事帰りの展示を一つのリズムに',
      },
      intro: {
        KO: '시장 골목이 문을 여는 시간에 가볍게 하루를 시작하고, 낮에는 업무에 집중합니다. 저녁에는 멀리 이동하기보다 전시와 도시 산책을 이어 짧은 체류에도 서로 다른 장면을 담아보세요.',
        EN: 'Start lightly as the market lanes open, then settle into the workday. In the evening, connect an exhibition with a city walk instead of another long transfer.',
        JP: '市場の路地が開き始める時間に軽く一日を始め、昼は仕事に集中。夜は遠くへ移動せず、展示と街歩きをつないで短い滞在にも異なる表情を。',
      },
      items: [
        {
          src: '/media/destinations/osaka-morning-food-lane-v1.webp',
          eyebrow: { KO: 'MORNING · FOOD LANE', EN: 'MORNING · FOOD LANE', JP: 'MORNING · FOOD LANE' },
          title: {
            KO: '붐비기 전 골목에서 가볍게 시작하기',
            EN: 'Begin in the lanes before the rush',
            JP: '混み合う前の路地から軽やかに始める',
          },
          description: {
            KO: '오전 일정이 있는 날에는 오래 머무는 식사보다 짧은 동네 산책을 먼저 두는 편이 좋습니다. 영업시간과 휴무는 방문 당일 각 매장에서 확인하세요.',
            EN: 'On work mornings, choose a short neighborhood walk over a long meal. Confirm opening hours and closures with each shop on the day you visit.',
            JP: '午前に仕事がある日は、長い食事より短い街歩きを先に。営業時間と休業日は、訪問当日に各店舗でご確認ください。',
          },
        },
        {
          src: '/media/brand-models/osaka-model-j-after-work-gallery-v1.webp',
          eyebrow: { KO: 'BLUE HOUR · EXHIBITION', EN: 'BLUE HOUR · EXHIBITION', JP: 'BLUE HOUR · EXHIBITION' },
          title: {
            KO: '노트북을 닫고 도시의 저녁 장면으로',
            EN: 'Close the laptop and step into the evening city',
            JP: 'ノートパソコンを閉じて、夜の街へ',
          },
          description: {
            KO: '퇴근 뒤에는 전시 한 곳과 주변 산책만 묶어도 충분합니다. 프로그램과 입장 조건은 방문 전 공식 운영 채널에서 확인하세요.',
            EN: 'After work, one exhibition and a walk nearby can be enough. Check the current program and entry conditions with the venue’s official channel before visiting.',
            JP: '仕事の後は、展示を一つと周辺の散歩を組み合わせるだけでも十分。開催内容と入場条件は、訪問前に公式案内でご確認ください。',
          },
        },
      ],
    },
    facts: [
      { label: F.tz, value: { KO: '0시간', EN: '0 hours', JP: '0時間' } },
      { label: F.flight, value: { KO: '약 1시간 40분', EN: '~1h 40m', JP: '約1時間40分' } },
      { label: F.currency, value: { KO: '엔 (JPY)', EN: 'JPY', JP: '円 (JPY)' } },
      { label: F.season, value: { KO: '봄 · 가을', EN: 'Spring · Autumn', JP: '春 · 秋' } },
    ],
    areas: [
      {
        name: { KO: '혼마치', EN: 'Honmachi', JP: '本町' },
        desc: {
          KO: '오사카의 비즈니스 중심. 작업 가능한 공용 라운지를 7곳 갖춘 숙소가 있어 낮 업무 거점으로 삼기 좋습니다.',
          EN: 'Osaka’s business core — home to a stay with seven work-friendly lounges, a solid daytime base.',
          JP: '大阪のビジネス中心地。作業できる共用ラウンジを7カ所備えた宿があり、日中の拠点に最適。',
        },
      },
      {
        name: { KO: '난바 · 신세카이', EN: 'Namba · Shinsekai', JP: '難波 · 新世界' },
        desc: {
          KO: '마감 후의 보상 구역. 도톤보리 야경과 신세카이 쿠시카츠 골목까지 지하철 몇 정거장이면 닿습니다.',
          EN: 'The after-deadline reward zone — Dotonbori’s lights and Shinsekai’s kushikatsu alleys are a few subway stops away.',
          JP: '締め切り後のご褒美エリア。道頓堀の夜景と新世界の串カツ横丁まで地下鉄数駅。',
        },
      },
    ],
    stayIds: ['stay-lively-osaka'],
    activityIds: ['act-osaka-usj'],
    flightUrl: FLIGHT('seoul-to-osaka/airfares-sel-osa'),
    timeZone: 'Asia/Tokyo',
    internet: 5,
    costMonthly: { KO: '월 140만원대', EN: '~₩1.4M / month', JP: '月140万ウォン程度' },
    visaFree: { KO: '무비자 90일', EN: 'Visa-free 90 days', JP: 'ビザなし90日' },
  },
  {
    slug: 'cebu',
    anchor: 'philippines-cebu',
    heroPhoto: '/media/destinations/cebu-editorial-v1.webp',
    name: { KO: '세부', EN: 'Cebu', JP: 'セブ' },
    tagline: {
      KO: '시차 1시간 — 회의는 그대로, 주말엔 아일랜드 호핑',
      EN: 'One hour behind — meetings intact, island hopping on weekends',
      JP: '時差1時間 — 会議はそのまま、週末はアイランドホッピング',
    },
    intro: {
      KO: '한국보다 1시간 느려 실시간 협업에 지장이 거의 없는 열대 거점입니다. 세부 시티에는 핫데스크를 포함한 코워킹+코리빙이 있어 노마드의 기지로 쓰기 좋고, 주말엔 막탄에서 바로 바다로 나갈 수 있습니다. 12~5월 건기가 최적기입니다.',
      EN: 'Just one hour behind Korea, so real-time collaboration barely changes. Cebu City has co-living with hot desks included — a proper nomad base — and Mactan’s sea is right there for weekends. Dec–May dry season is prime.',
      JP: '韓国·日本より1時間遅いだけで、リアルタイム協業にほぼ支障なし。セブシティにはホットデスク込みのコワーキング＋コリビングがあり、週末はマクタンの海へ。12〜5月の乾季がベスト。',
    },
    facts: [
      { label: F.tz, value: { KO: '-1시간', EN: '−1 hour', JP: '−1時間' } },
      { label: F.flight, value: { KO: '약 4시간 30분', EN: '~4h 30m', JP: '約4時間30分' } },
      { label: F.currency, value: { KO: '페소 (PHP)', EN: 'PHP', JP: 'ペソ (PHP)' } },
      { label: F.season, value: { KO: '12~5월 (건기)', EN: 'Dec–May (dry)', JP: '12〜5月（乾季）' } },
    ],
    areas: [
      {
        name: { KO: '세부 시티', EN: 'Cebu City', JP: 'セブシティ' },
        desc: {
          KO: '핫데스크 포함 코워킹+코리빙이 있는 도심. IT 파크 주변으로 카페와 야간에도 여는 식당이 모여 있습니다.',
          EN: 'The urban core with co-living + coworking (hot desks included). Cafés and late-hours eateries cluster around IT Park.',
          JP: 'ホットデスク込みのコリビングがある都心。ITパーク周辺にカフェや深夜営業の飲食店が集中。',
        },
      },
      {
        name: { KO: '막탄', EN: 'Mactan', JP: 'マクタン' },
        desc: {
          KO: '공항이 있는 리조트 섬. 다이빙·아일랜드 호핑의 출발점이라 주말 리셋 동선이 짧습니다.',
          EN: 'The resort island with the airport — the launch point for diving and island hopping, keeping weekend resets short.',
          JP: '空港のあるリゾート島。ダイビングやアイランドホッピングの起点で、週末リセットの動線が短い。',
        },
      },
    ],
    stayIds: ['stay-nomadshub-cebu'],
    activityIds: [],
    flightUrl: FLIGHT('seoul-to-cebu/airfares-sel-ceb'),
    timeZone: 'Asia/Manila',
    internet: 3,
    costMonthly: { KO: '월 95만원대', EN: '~₩950K / month', JP: '月95万ウォン程度' },
    visaFree: { KO: '무비자 30일 → 최대 1년 연장', EN: 'Visa-free 30 days → up to 1 year', JP: 'ビザなし30日 → 最長1年' },
  },
  {
    slug: 'sydney',
    anchor: 'australia-sydney',
    heroPhoto: '/media/destinations/sydney-editorial-v1.webp',
    name: { KO: '시드니', EN: 'Sydney', JP: 'シドニー' },
    tagline: {
      KO: '시차 1~2시간 — 계절을 뒤집는 실시간 협업 워케이션',
      EN: 'Only 1–2 hours ahead — flip the seasons without breaking collaboration',
      JP: '時差1〜2時間 — 季節を反転させるリアルタイム協業ワーケーション',
    },
    intro: {
      KO: '한국과 시차가 1~2시간(서머타임 기준)뿐이라 팀 협업 리듬을 그대로 유지하면서 남반구의 반대 계절을 살 수 있습니다. CBD에는 풀키친 아파트호텔이 있어 장기 체류 생활이 편하고, 하버 뷰 카페들이 오후 업무 자리가 되어 줍니다.',
      EN: 'Just 1–2 hours ahead of Korea (with DST), so team rhythms stay intact while you live the opposite season. Full-kitchen aparthotels in the CBD make long stays easy, and harbour-view cafés become your afternoon desks.',
      JP: '韓国·日本との時差は1〜2時間（サマータイム基準）。チームのリズムを保ったまま南半球の逆の季節を暮らせます。CBDのフルキッチン付きアパートホテルで長期滞在も快適。',
    },
    facts: [
      { label: F.tz, value: { KO: '+1~2시간', EN: '+1–2 hours', JP: '+1〜2時間' } },
      { label: F.flight, value: { KO: '약 10시간 30분', EN: '~10h 30m', JP: '約10時間30分' } },
      { label: F.currency, value: { KO: '호주달러 (AUD)', EN: 'AUD', JP: '豪ドル (AUD)' } },
      { label: F.season, value: { KO: '9~11월 · 3~5월', EN: 'Sep–Nov · Mar–May', JP: '9〜11月 · 3〜5月' } },
    ],
    areas: [
      {
        name: { KO: 'CBD · 타운홀', EN: 'CBD · Town Hall', JP: 'CBD · タウンホール' },
        desc: {
          KO: '타운홀역 도보 2분에 풀키친 아파트호텔이 있는 도심. 교통·마트·카페가 모두 도보권이라 장기 체류의 기본기가 갖춰져 있습니다.',
          EN: 'The city core — a full-kitchen aparthotel sits two minutes from Town Hall station, with transit, groceries and cafés all on foot.',
          JP: 'タウンホール駅徒歩2分にフルキッチン付きアパートホテル。交通・スーパー・カフェが徒歩圏で長期滞在の基本が揃う。',
        },
      },
      {
        name: { KO: '서리힐스', EN: 'Surry Hills', JP: 'サリーヒルズ' },
        desc: {
          KO: '시드니 카페 문화의 중심. 브런치와 스페셜티 커피 사이에서 노트북을 여는 로컬들의 동네입니다.',
          EN: 'The heart of Sydney café culture — a neighborhood where locals open laptops between brunch and specialty coffee.',
          JP: 'シドニーのカフェ文化の中心。ブランチとスペシャルティコーヒーの間でPCを開くローカルの街。',
        },
      },
    ],
    stayIds: ['stay-adina-sydney'],
    activityIds: [],
    flightUrl: FLIGHT('seoul-to-sydney/airfares-sel-syd'),
    timeZone: 'Australia/Sydney',
    internet: 5,
    costMonthly: { KO: '월 330만원대', EN: '~₩3.3M / month', JP: '月330万ウォン程度' },
    visaFree: { KO: 'ETA / 워킹홀리데이 비자', EN: 'ETA / Working Holiday visa', JP: 'ETA / ワーホリビザ' },
  },
  // ── 2026-07-28 신설: 서울·부산 — JP 타깃 최대 공백 해소 (방한 일본인 365만·여성 65% 리서치 근거)
  //    팩트 전량 검증: 하네다-김포 약 2h25m·후쿠오카-부산 약 55분·KTX-청룡 2h17m(MBC·한경) /
  //    일본 국적 무비자 90일 + K-ETA 한시 면제 2026-12-31까지(외교부 공지 — 연말 갱신 트리거) /
  //    성수 팝업 성동구 상반기 468건·외국인 +110%(한국경제 2026-07) / 패스트파이브 홍대 1·2·3호점(공식) /
  //    부산 워케이션 거점센터 50석·폰부스 4실(부산시 보도자료)·2026 관광공사 우수모델 전국 대표(서울경제)·
  //    5박 이상 1박 5만원 바우처(workationbusan.co.kr) / 전포카페거리=NYT 2017 '가봐야 할 52곳' 부산 선정의
  //    대표 명소(부산일보) / 서울 단기체류 월 150만~200만(데일리팝·통용 시세) — 부산 시세는 근거 부족으로 미표기 /
  //    모바일 인터넷 세계 2위(Ookla·Statista) / ⚠️ 부산-후쿠오카 고속선(비틀)은 2026 운항 없음 — 표기 금지,
  //    해상은 뉴카멜리아 야간페리뿐 / 사진: 서울=검증 풀 1517154421773, 부산=1638591751482(해운대, 07-28 육안)
  {
    slug: 'seoul',
    anchor: 'korea-seoul',
    heroPhoto: '/media/destinations/seoul-editorial-v1.webp',
    name: { KO: '서울', EN: 'Seoul', JP: 'ソウル' },
    tagline: {
      KO: '성수의 팝업, 연남의 카페 — 도시 전체가 워크스페이스',
      EN: 'Pop-ups in Seongsu, cafés in Yeonnam — a whole city that works as an office',
      JP: '聖水のポップアップ、延南のカフェ — 街全体がワークスペース',
    },
    intro: {
      KO: '모바일 인터넷 세계 2위(Ookla 기준)의 도시에서는 어느 카페에 앉아도 오피스가 됩니다. 성수동은 올해 상반기에만 팝업 468건이 열린 트렌드의 진앙이고, 홍대·연남에는 대형 코워킹 지점과 심야 카페가 이어집니다. 지방 거주자의 도시 워케이션부터 해외 팀 동료의 첫 서울까지 — 짧게 머물러도 밀도가 다릅니다.',
      EN: 'In a city ranked #2 worldwide for mobile internet (Ookla), any café becomes your office. Seongsu hosted 468 pop-ups in the first half of this year alone; Hongdae–Yeonnam runs on coworking hubs and late-night cafés. Even a short stay is dense with things to see, taste and finish.',
      JP: 'モバイル通信世界2位（Ookla基準）の都市では、どのカフェもオフィスになります。聖水洞は今年上半期だけでポップアップ468件が開かれたトレンドの震源地。いつもの韓国旅に、はたらく1日をプラスするのにいちばん近い街です。羽田から約2時間25分。',
    },
    lookbook: {
      eyebrow: { KO: 'A DAY IN SEOUL', EN: 'A DAY IN SEOUL', JP: 'A DAY IN SEOUL' },
      title: {
        KO: '집중을 마치면 동네의 저녁이 시작되는 도시',
        EN: 'A city where neighborhood evenings begin after focused work',
        JP: '集中を終えると、街の夜が始まる都市',
      },
      intro: {
        KO: '낮에는 업무 동선을 짧게 잡고, 퇴근 뒤에는 디자인 골목과 낮은 동네의 카페 불빛을 천천히 잇습니다. 멀리 이동하지 않아도 서울의 하루는 서로 다른 두 장면으로 완성됩니다.',
        EN: 'Keep the daytime work route compact, then connect design lanes with the glow of low-rise neighborhoods after log-off. A Seoul day can shift scenes without another long transfer.',
        JP: '昼は仕事の動線を短く整え、仕事の後はデザイン街と低層の街並みに灯るカフェをゆっくりつなぐ。遠くへ移動しなくても、ソウルの一日は二つの表情を見せます。',
      },
      items: [
        {
          src: '/media/brand-models/seoul-model-i-after-work-design-lane-v2.webp',
          eyebrow: { KO: 'AFTER WORK · DESIGN LANE', EN: 'AFTER WORK · DESIGN LANE', JP: 'AFTER WORK · DESIGN LANE' },
          title: {
            KO: '노트북을 닫고 디자인 골목으로',
            EN: 'Close the laptop and step into the design lanes',
            JP: 'ノートパソコンを閉じて、デザイン街へ',
          },
          description: {
            KO: '작업 공간과 쇼룸이 가까운 동네에서는 퇴근 뒤 한두 블록만 걸어도 하루의 분위기가 달라집니다. 방문할 공간의 운영시간은 당일 공식 채널에서 확인하세요.',
            EN: 'In neighborhoods where workspaces and showrooms sit close together, a block or two is enough to change the pace after work. Confirm opening hours with each venue on the day.',
            JP: 'ワークスペースとショールームが近い街なら、仕事の後に一、二ブロック歩くだけで一日の空気が変わります。営業時間は当日、各施設の公式案内でご確認ください。',
          },
        },
        {
          src: '/media/destinations/seoul-evening-neighborhood-lane-v1.webp',
          eyebrow: { KO: 'BLUE HOUR · LOCAL LANE', EN: 'BLUE HOUR · LOCAL LANE', JP: 'BLUE HOUR · LOCAL LANE' },
          title: {
            KO: '비 온 뒤, 낮은 골목의 불빛을 따라',
            EN: 'Follow the low-rise lanes after the rain',
            JP: '雨上がり、低層の路地に灯る光をたどる',
          },
          description: {
            KO: '저녁에는 큰길보다 작은 카페와 식당이 이어지는 골목을 천천히 걷습니다. 한 곳을 길게 예약하기보다 그날의 컨디션에 맞춰 짧은 산책을 남겨두세요.',
            EN: 'In the evening, slow down in lanes lined with small cafés and restaurants rather than staying on the main road. Leave room for a short walk that matches the day’s energy.',
            JP: '夜は大通りを離れ、小さなカフェや食堂が続く路地をゆっくり歩く。予定を詰めすぎず、その日の調子に合う短い散歩の余白を残しておきましょう。',
          },
        },
      ],
    },
    facts: [
      { label: F.tz, value: { KO: 'KST (도쿄와 0시간)', EN: 'KST (UTC+9)', JP: '日本と時差なし' } },
      { label: F.flight, value: { KO: '하네다발 약 2시간 25분', EN: 'Haneda ~2h 25m', JP: '羽田から約2時間25分' } },
      { label: F.currency, value: { KO: '원 (KRW)', EN: 'KRW', JP: 'ウォン (KRW)' } },
      { label: F.season, value: { KO: '4~6월 · 9~11월', EN: 'Apr–Jun · Sep–Nov', JP: '4〜6月 · 9〜11月' } },
    ],
    areas: [
      {
        name: { KO: '성수', EN: 'Seongsu', JP: '聖水（ソンス）' },
        desc: {
          KO: '올해 상반기 팝업 468건, 외국인 방문 전년 대비 2배 — 공장을 개조한 카페와 쇼룸 사이에서 일하고, 퇴근처럼 팝업을 돕니다.',
          EN: '468 pop-ups in H1 this year and double the foreign visitors — work between converted-factory cafés, then make the pop-up rounds after log-off.',
          JP: '今年上半期のポップアップ468件、外国人来訪は前年比2倍。工場リノベのカフェで働いて、仕事終わりにポップアップ巡りを。',
        },
      },
      {
        name: { KO: '홍대 · 연남', EN: 'Hongdae · Yeonnam', JP: 'ホンデ · 延南洞' },
        desc: {
          KO: '홍대입구역 직결 지점을 포함해 대형 코워킹(패스트파이브 3개 지점·스파크플러스)이 밀집, 골목엔 늦게까지 여는 카페가 이어집니다.',
          EN: 'Dense with major coworking branches (three Fastfive locations, Sparkplus) including one connected to Hongik Univ. station, plus late-open cafés down every alley.',
          JP: '弘大入口駅直結を含む大型コワーキング（Fastfive3拠点・Sparkplus）が密集。路地には夜遅くまで開くカフェが続きます。',
        },
      },
    ],
    stayIds: ['stay-fraser-seoul'],
    activityIds: [],
    timeZone: 'Asia/Seoul',
    internet: 5,
    costMonthly: { KO: '단기체류 월 150만~200만원', EN: '~₩1.5–2M / month (short-stay)', JP: '月150万〜200万ウォン（短期）' },
    visaFree: { KO: '국내 (비자 불필요)', EN: 'Visa-free 90 days (many passports)', JP: 'ビザなし90日 · K-ETA免除は2026年末まで' },
  },
  {
    slug: 'busan',
    anchor: 'korea-busan',
    heroPhoto: '/media/destinations/busan-editorial-v1.webp',
    name: { KO: '부산', EN: 'Busan', JP: '釜山' },
    tagline: {
      KO: '바다 앞 거점센터가 있는 도시 — 전국 대표 워케이션',
      EN: "A seaside workation base — Korea's flagship workation city",
      JP: '福岡から約55分 — 海の前にワークベースがある街',
    },
    intro: {
      KO: '부산은 2026년 한국관광공사 워케이션 우수모델에 전국 대표로 선정된 도시입니다. 부산역 옆 거점센터(업무석 50석·폰부스 4실)는 무료로 열려 있고, 부산 외 재직자는 5박 이상 체류 시 1박당 5만원 숙박 바우처도 받습니다. KTX-청룡으로 서울에서 2시간 17분 — 해운대 오션뷰와 전포 카페거리가 퇴근 후를 채웁니다.',
      EN: "Korea's official flagship workation city for 2026 (Korea Tourism Organization). The free base center by Busan Station runs 50 desks and 4 phone booths, and non-Busan workers staying 5+ nights get a ₩50,000-per-night lodging voucher. Seoul is 2h 17m away by KTX; Haeundae's ocean views and Jeonpo's café streets fill the evenings.",
      JP: '釜山は2026年、韓国観光公社のワーケーション優秀モデルに全国代表として選ばれた街。釜山駅横の拠点センター（50席・ブース4室）は無料で、福岡から直行便で約55分です。海雲台のオーシャンビューと田浦カフェ通り（NYT「行くべき52カ所」で釜山を代表する名所）が仕事の後を満たします。',
    },
    lookbook: {
      eyebrow: { KO: 'A DAY IN BUSAN', EN: 'A DAY IN BUSAN', JP: 'A DAY IN BUSAN' },
      title: {
        KO: '집중을 마치면 바다가 저녁을 여는 도시',
        EN: 'A city where the sea opens the evening after work',
        JP: '集中を終えると、海が夜をひらく街',
      },
      intro: {
        KO: '낮에는 부산역 거점센터나 해운대·송정의 업무 공간에서 집중하고, 퇴근 뒤에는 해안 산책과 광안리 야경으로 이어갑니다. 업무와 바다 사이의 이동이 짧아 주말 체류도 두 장면으로 선명해집니다.',
        EN: 'Focus at the Busan Station base or a Haeundae–Songjeong workspace, then connect the coast with Gwangalli after dark. Short transfers make even a weekend stay feel like two distinct chapters.',
        JP: '昼は釜山駅の拠点センターや海雲台・松亭のワークスペースで集中し、仕事の後は海辺の散歩と広安里の夜景へ。仕事と海の移動が短く、週末滞在にも二つの表情が生まれます。',
      },
      items: [
        {
          src: '/media/brand-models/busan-model-e-after-work-coast-v1.webp',
          eyebrow: { KO: 'AFTER WORK · COAST', EN: 'AFTER WORK · COAST', JP: 'AFTER WORK · COAST' },
          title: {
            KO: '노트북을 닫고 해안 산책로로',
            EN: 'Close the laptop and take the coast',
            JP: 'ノートPCを閉じて、海辺の散歩へ',
          },
          description: {
            KO: '부산의 해안 업무 거점은 일을 마친 뒤 긴 환승 없이 바다 쪽으로 이동하기 좋습니다. 날씨와 현장 운영 정보는 방문 당일 공식 안내에서 확인하세요.',
            EN: 'Busan’s coastal work bases make it easy to reach the water without another long transfer. Check weather and current operating details through official channels on the day.',
            JP: '釜山の海辺のワーク拠点なら、仕事の後に長い乗り換えをせず海へ移動しやすい。天候と当日の運営情報は公式案内でご確認ください。',
          },
        },
        {
          src: '/media/destinations/busan-gwangalli-night-licensed-v1.webp',
          eyebrow: { KO: 'NIGHT · GWANGALLI', EN: 'NIGHT · GWANGALLI', JP: 'NIGHT · GWANGALLI' },
          title: {
            KO: '광안대교의 불빛으로 하루를 마무리하기',
            EN: 'Close the day with Gwangan Bridge lights',
            JP: '広安大橋の灯りで一日を締めくくる',
          },
          description: {
            KO: '광안리 해변은 야경과 수변 산책을 한 번에 묶기 좋은 퇴근 후 동선입니다. 조명·행사·해변 이용 안내는 방문 당일 부산시와 현지 시설 공지를 확인하세요.',
            EN: 'Gwangalli pairs a waterfront walk with the city lights in one after-work route. Check current lighting, events and beach guidance with Busan and local venues on the day.',
            JP: '広安里なら、夜景と海辺の散歩を一つの仕事後ルートにまとめられます。点灯・イベント・ビーチ利用情報は当日、釜山市と現地施設の案内をご確認ください。',
          },
        },
      ],
    },
    facts: [
      { label: F.tz, value: { KO: '없음 (국내)', EN: 'KST (UTC+9)', JP: '日本と時差なし' } },
      { label: F.flight, value: { KO: 'KTX-청룡 2시간 17분', EN: 'KTX 2h 17m · Fukuoka 55m', JP: '福岡から約55分（直行便）' } },
      { label: F.currency, value: { KO: '원 (KRW)', EN: 'KRW', JP: 'ウォン (KRW)' } },
      { label: F.season, value: { KO: '사계절 (여름 해변 · 가을 쾌적)', EN: 'Year-round (beach summers)', JP: '通年（夏はビーチ・秋が快適）' } },
    ],
    areas: [
      {
        name: { KO: '부산역 · 원도심', EN: 'Busan Station area', JP: '釜山駅 · 旧都心' },
        desc: {
          KO: '아스티호텔 24층의 워케이션 거점센터 — 업무석 50석, 화상·폰부스 4실, 부산항이 내려다보이는 무료 업무 공간입니다(부산 외 재직자 등록제).',
          EN: 'The workation base on the 24th floor of Asti Hotel — 50 desks, 4 call booths, harbor views, free for registered non-Busan workers.',
          JP: 'アスティホテル24階のワーケーション拠点センター。50席と通話ブース4室、釜山港を見下ろす無料ワークスペース（登録制）。',
        },
      },
      {
        name: { KO: '해운대 · 송정', EN: 'Haeundae · Songjeong', JP: '海雲台 · 松亭' },
        desc: {
          KO: '해변을 낀 위성 오피스(WAVE 송정·청사포)가 있는 라인 — 오전엔 바다 앞 데스크, 오후엔 전포 카페거리로 넘어가는 동선이 자연스럽습니다.',
          EN: 'The beach line with seaside satellite offices (WAVE Songjeong & Cheongsapo) — morning desk by the water, afternoon in Jeonpo café street.',
          JP: 'ビーチ沿いのサテライトオフィス（WAVE松亭・青沙浦）があるライン。午前は海の前のデスク、午後は田浦カフェ通りへ。',
        },
      },
    ],
    stayIds: ['stay-uh-busan'],
    activityIds: [],
    flightUrl: FLIGHT('seoul-to-busan/airfares-sel-pus'),
    timeZone: 'Asia/Seoul',
    internet: 5,
    visaFree: { KO: '국내 (비자 불필요)', EN: 'Visa-free 90 days (many passports)', JP: 'ビザなし90日 · K-ETA免除は2026年末まで' },
    supportProgram: {
      // SUPPORT_PROGRAMS 실존 등재 데이터 재사용 (busan-workation, 신규 주장 0)
      id: 'busan-workation',
      name: { KO: '부산형 워케이션', EN: 'Busan Workation', JP: '釜山型ワーケーション' },
      desc: {
        KO: '업무공간 무료 + 웰컴키트 + 관광 바우처 — 부산 외 재직자 대상, 조건은 공식 공고 기준으로 확인하세요.',
        EN: 'Free workspace, welcome kit and tour vouchers for non-Busan workers — check conditions on the official notice.',
        JP: 'ワークスペース無料＋ウェルカムキット＋観光バウチャー（釜山外の在職者対象） — 条件は公式公告でご確認ください。',
      },
    },
  },
  {
    // 팩트 검증 2026-08-03: 한옥마을 700여 채(visitkorea 공식 — 국내 최대 도심 한옥군)
    // 유네스코 음식창의도시 2012 지정(unesco.org/en/creative-cities/jeonju)
    // KTX 용산→전주 통상 1시간 37분~45분·일 27회+(최단 1시간 26분) → '약 1시간 40분' 표기
    // 인천공항 T1/T2→전주 직행 리무진 일 17~19회, 약 3시간 30분
    slug: 'jeonju',
    anchor: 'korea-jeonju',
    heroPhoto: '/media/product-editorial/program-jeonju-hanok-licensed-v1.webp',
    name: { KO: '전주', EN: 'Jeonju', JP: '全州' },
    tagline: {
      KO: '한옥 처마 아래서 일하는 슬로 워케이션 — 유네스코 미식 도시',
      EN: 'A slow workation under hanok eaves — a UNESCO city of gastronomy',
      JP: '韓屋の軒下ではたらくスローワーケーション — ユネスコ美食都市',
    },
    intro: {
      KO: '700여 채 한옥이 골목을 이루는 국내 최대 도심 한옥군에서, 오전엔 한옥 스테이나 카페 데스크에서 일하고 오후엔 골목을 걷는 리듬의 도시입니다. 2012년 유네스코 음식창의도시로 지정된 미식의 수도라 퇴근 후 한 끼가 하루의 보상이 됩니다. 용산에서 KTX 약 1시간 40분 — 주말을 붙인 2~4일 슬로 워케이션에 맞습니다.',
      EN: "Korea's largest urban cluster of some 700 hanok houses — mornings at a hanok-stay desk or café, afternoons wandering the lanes. Designated a UNESCO Creative City of Gastronomy in 2012, so dinner is the day's reward. About 1h 40m from Seoul (Yongsan) by KTX — built for a slow 2–4 day workation.",
      JP: '約700棟の韓屋が路地を成す韓国最大の都心韓屋群。午前は韓屋ステイやカフェのデスクで働き、午後は路地歩きへ。2012年ユネスコ食文化創造都市に指定された美食の都で、仕事終わりの一食が一日のご褒美になります。仁川空港から直行リムジンバスで約3時間半、ソウルからKTXで約1時間40分。',
    },
    facts: [
      { label: F.tz, value: { KO: '없음 (국내)', EN: 'KST (UTC+9)', JP: '日本と時差なし' } },
      { label: F.flight, value: { KO: 'KTX 약 1시간 40분 (용산발)', EN: 'KTX ~1h 40m from Seoul', JP: '仁川空港からバス約3時間半' } },
      { label: F.currency, value: { KO: '원 (KRW)', EN: 'KRW', JP: 'ウォン (KRW)' } },
      { label: F.season, value: { KO: '4~6월 · 9~11월', EN: 'Apr–Jun · Sep–Nov', JP: '4〜6月 · 9〜11月' } },
    ],
    areas: [
      {
        name: { KO: '한옥마을', EN: 'Hanok Village', JP: '韓屋村（ハノクマウル）' },
        desc: {
          KO: '700여 채 한옥 골목 사이에 경기전·향교 같은 문화유산과 카페가 섞여 있는 동네. 한옥 스테이 툇마루에 노트북을 펴면 그대로 오피스가 됩니다.',
          EN: 'Some 700 hanok lanes woven with heritage sites like Gyeonggijeon shrine and cafés in between. Open a laptop on a hanok-stay porch and it becomes your office.',
          JP: '約700棟の韓屋の路地に、慶基殿・郷校などの文化遺産とカフェが混ざるエリア。韓屋ステイの縁側でノートPCを開けば、そのままオフィスに。',
        },
      },
      {
        name: { KO: '객리단길', EN: 'Gaengnidan-gil', JP: '客里団通り（ケンニダンギル）' },
        desc: {
          KO: '구도심 골목이 카페·베이커리·바 거리로 바뀐 지역. 한옥마을보다 관광 밀도가 낮아 평일 낮 노트북 작업 자리를 찾기 수월합니다.',
          EN: 'Old-downtown alleys turned café, bakery and bar streets — less touristy than the Hanok Village, so weekday laptop seats are easier to find.',
          JP: '旧市街の路地がカフェ・ベーカリー・バーの通りに変わったエリア。韓屋村より観光密度が低く、平日昼のPC作業席を見つけやすい。',
        },
      },
    ],
    stayIds: [],
    activityIds: [],
    timeZone: 'Asia/Seoul',
    internet: 5,
    visaFree: { KO: '국내 (비자 불필요)', EN: 'Visa-free 90 days (many passports)', JP: 'ビザなし90日 · K-ETA免除は2026年末まで' },
    supportProgram: {
      // SUPPORT_PROGRAMS 실존 등재 데이터 재사용 (jeonbuk-worcation, 신규 주장 0 — 전주 포함 14개 시군)
      id: 'jeonbuk-worcation',
      name: { KO: '전북형 워케이션', EN: 'Jeonbuk Workation', JP: '全北ワーケーション' },
      desc: {
        KO: '전주 포함 14개 시군의 다양한 숙소+오피스, 연중 운영 — 조건은 공식 공고 기준으로 확인하세요.',
        EN: 'Stays and offices across 14 cities and counties including Jeonju, year-round — check conditions on the official notice.',
        JP: '全州を含む14市郡の宿＋オフィス、通年運営 — 条件は公式公告でご確認ください。',
      },
    },
  },
  {
    // 팩트 검증 2026-08-03: KTX 여수EXPO↔용산 통상 3시간 0~12분·일 25회(최단 2시간 50분) → '약 3시간'
    // 종포해양공원 1.5km 해안 산책로·낭만포차 거북선대교 하부(visitkorea) / 웅천친수공원
    // 인공해변·송림, 예울마루 인접(여수시·visitkorea) / 김포발 여수공항(RSU) 국내선 운항(편수 적음)
    slug: 'yeosu',
    anchor: 'korea-yeosu',
    heroPhoto: '/media/product-editorial/program-yeosu-harbor-licensed-v1.webp',
    name: { KO: '여수', EN: 'Yeosu', JP: '麗水' },
    tagline: {
      KO: '밤바다를 마주한 데스크 — 남해안 해양 도시 워케이션',
      EN: "A desk facing the night sea — workation on Korea's south coast",
      JP: '夜の海に向かうデスク — 南海岸の港町ワーケーション',
    },
    intro: {
      KO: '남해안을 마주한 해양 도시 여수는 용산에서 KTX 약 3시간이면 닿습니다. 낮에는 종포해양공원의 1.5km 해안 산책로와 웅천 카페거리 사이에서 일하고, 밤에는 거북선대교 아래 낭만포차 거리가 하루를 닫아줍니다. 전남블루 워케이션 지원사업 대상 지역이라 체류 비용을 줄일 길도 열려 있습니다.',
      EN: "Yeosu faces Korea's southern sea, about three hours from Seoul (Yongsan) by KTX. Work between the 1.5km waterfront promenade at Jongpo Marine Park and Ungcheon's café district, then let the pocha street under Geobukseon Bridge close out the day. The Jeonnam Blue workation support program covers the city, too.",
      JP: '南海岸に面した港町・麗水は、ソウル（龍山）からKTXで約3時間。昼は鍾浦海洋公園の1.5kmの海辺遊歩道やウンチョンのカフェ街で働き、夜は亀甲船大橋の下のポチャ（屋台）通りが一日を締めくくります。全南ブルーワーケーション支援の対象地域でもあります。',
    },
    facts: [
      { label: F.tz, value: { KO: '없음 (국내)', EN: 'KST (UTC+9)', JP: '日本と時差なし' } },
      { label: F.flight, value: { KO: 'KTX 약 3시간 (용산발)', EN: 'KTX ~3h from Seoul', JP: 'ソウルからKTX約3時間' } },
      { label: F.currency, value: { KO: '원 (KRW)', EN: 'KRW', JP: 'ウォン (KRW)' } },
      { label: F.season, value: { KO: '4~6월 · 9~11월', EN: 'Apr–Jun · Sep–Nov', JP: '4〜6月 · 9〜11月' } },
    ],
    areas: [
      {
        name: { KO: '종화동 · 해양공원', EN: 'Jongpo Marine Park area', JP: '鍾浦海洋公園エリア' },
        desc: {
          KO: '종포해양공원의 1.5km 해안 산책로를 낀 원도심 해안선. 밤이면 거북선대교 아래 낭만포차 거리가 열려 퇴근 후 동선이 자연스럽습니다.',
          EN: "The old-town waterfront along Jongpo Marine Park's 1.5km promenade. At night the pocha street under Geobukseon Bridge opens — a natural after-work route.",
          JP: '鍾浦海洋公園の1.5kmの海辺遊歩道が続く旧市街の海岸線。夜は亀甲船大橋の下にポチャ通りが開き、仕事終わりの動線が自然につながります。',
        },
      },
      {
        name: { KO: '웅천', EN: 'Ungcheon', JP: '熊川（ウンチョン）' },
        desc: {
          KO: '인공해변과 송림 산책로(웅천친수공원), 공연장 예울마루를 낀 신도심. 카페거리가 트렌드 지역으로 떠올라 낮 작업 자리를 찾기 좋습니다.',
          EN: "The new town around Ungcheon Waterfront Park — a man-made beach, pine promenade and the Yeulmaru arts center. Its café district is the city's trend spot, good for daytime laptop seats.",
          JP: '人工ビーチと松林の遊歩道（熊川親水公園）、アートセンター「イェウルマル」を擁する新都心。カフェ街がトレンドエリアとして注目され、日中の作業席を見つけやすい。',
        },
      },
    ],
    stayIds: [],
    activityIds: [],
    timeZone: 'Asia/Seoul',
    internet: 5,
    visaFree: { KO: '국내 (비자 불필요)', EN: 'Visa-free 90 days (many passports)', JP: 'ビザなし90日 · K-ETA免除は2026年末まで' },
    supportProgram: {
      // SUPPORT_PROGRAMS 실존 등재 데이터 재사용 (신규 주장 0)
      id: 'jeonnam-blue-worcation',
      name: { KO: '전남블루 워케이션', EN: 'Jeonnam Blue Workation', JP: '全南ブルーワーケーション' },
      desc: {
        KO: '여수·완도 등 전남 40+ 워케이션 프로그램 — 조건·혜택은 공식 공고 기준으로 확인하세요.',
        EN: '40+ workation programs across Jeonnam including Yeosu — check conditions on the official notice.',
        JP: '麗水・莞島など全南40+のワーケーションプログラム — 条件・特典は公式公告でご確認ください。',
      },
    },
  },
]

export function getGuide(slug: string): CityGuide | undefined {
  return CITY_GUIDES.find((g) => g.slug === slug)
}

// hreflang alternates — KO(기본)·EN·JA 로케일 URL 상호 연결 (path 예: '/guide/tokyo')
const BASE_URL = 'https://www.wakation.kr'
export function guideLanguageAlternates(path: string) {
  return {
    ko: `${BASE_URL}${path}`,
    en: `${BASE_URL}/en${path}`,
    ja: `${BASE_URL}/ja${path}`,
    'x-default': `${BASE_URL}${path}`,
  }
}

export const GUIDE_UI: Record<string, L> = {
  eyebrow: { KO: 'City Guide', EN: 'City Guide', JP: 'City Guide' },
  areasTitle: { KO: '일하기 좋은 동네', EN: 'Where to work', JP: '働きやすいエリア' },
  staysTitle: { KO: '에디터 추천 숙소', EN: 'Editor-picked stays', JP: 'エディター推薦の宿' },
  staysSub: {
    KO: '공개 정보로 실존과 업무 관련 조건을 확인한 숙소입니다',
    EN: 'Stays checked against public information for work-relevant conditions',
    JP: '公開情報で実在と仕事に関する条件を確認した宿です',
  },
  searchCta: { KO: '이 도시 전체 숙소 검색', EN: 'Search all stays in this city', JP: 'この街の宿をすべて検索' },
  flightCta: { KO: '항공권 요금 비교', EN: 'Compare flights', JP: '航空券を比較' },
  otherGuides: { KO: '다른 도시 가이드', EN: 'More city guides', JP: 'ほかの都市ガイド' },
  visaHint: {
    KO: '이 도시의 비자·체류 조건이 궁금하다면',
    EN: 'Wondering about visas for this city?',
    JP: 'この都市のビザ·滞在条件が気になったら',
  },
  visaCta: { KO: 'AI 비자 도우미에게 묻기', EN: 'Ask the AI visa assistant', JP: 'AIビザアシスタントに聞く' },
  backHome: { KO: '홈', EN: 'Home', JP: 'ホーム' },
}
