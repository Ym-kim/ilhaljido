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
  facts: { label: L; value: L }[]
  areas: { name: L; desc: L }[]
  /** featured.ts 아이템 id */
  stayIds: string[]
  activityIds: string[]
}

const HERO = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&h=700&q=80`

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
    heroPhoto: HERO('1526481280693-3bfa7568e0f3'),
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
  },
  {
    slug: 'fukuoka',
    anchor: 'japan-fukuoka',
    heroPhoto: HERO('1533050487297-09b450131914'),
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
  },
  {
    slug: 'danang',
    anchor: 'vietnam-danang',
    heroPhoto: HERO('1559592413-7cec4d0cae2b'),
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
  },
  {
    slug: 'bali',
    anchor: 'indonesia-bali',
    heroPhoto: HERO('1537996194471-e657df975ab4'),
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
  },
  {
    slug: 'chiangmai',
    anchor: 'thailand-chiangmai',
    heroPhoto: HERO('1512553353614-82a7370096dc'),
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
  },
  {
    slug: 'jeju',
    anchor: 'korea-jeju',
    heroPhoto: HERO('1507525428034-b723cf961d3e'),
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
  },
]

export function getGuide(slug: string): CityGuide | undefined {
  return CITY_GUIDES.find((g) => g.slug === slug)
}

export const GUIDE_UI: Record<string, L> = {
  eyebrow: { KO: 'City Guide', EN: 'City Guide', JP: 'City Guide' },
  areasTitle: { KO: '일하기 좋은 동네', EN: 'Where to work', JP: '働きやすいエリア' },
  staysTitle: { KO: '에디터 추천 숙소', EN: 'Editor-picked stays', JP: 'エディター推薦の宿' },
  staysSub: {
    KO: '리서치로 실존을 검증한 워케이션 특화 숙소입니다',
    EN: 'Workation-ready stays, verified by our research',
    JP: 'リサーチで実在を検証したワーケーション向きの宿',
  },
  searchCta: { KO: '이 도시 전체 숙소 검색', EN: 'Search all stays in this city', JP: 'この街の宿をすべて検索' },
  otherGuides: { KO: '다른 도시 가이드', EN: 'More city guides', JP: 'ほかの都市ガイド' },
  visaHint: {
    KO: '이 도시의 비자·체류 조건이 궁금하다면',
    EN: 'Wondering about visas for this city?',
    JP: 'この都市のビザ·滞在条件が気になったら',
  },
  visaCta: { KO: 'AI 비자 도우미에게 묻기', EN: 'Ask the AI visa assistant', JP: 'AIビザアシスタントに聞く' },
  backHome: { KO: '홈', EN: 'Home', JP: 'ホーム' },
}
