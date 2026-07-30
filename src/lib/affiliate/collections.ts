import type { Lang } from '@/lib/i18n/types'
import { TRIP_SET_CAMPAIGNS } from '@/lib/tripSetCampaign'

// ─────────────────────────────────────────────────────────────────────────────
// 테마 기획전 (큐레이션 컬렉션) — 하나투어 '기획전' 벤치마크
//
// 검증된 기존 제휴 상품(숙소·체험·eSIM·항공·강의)을 목적지/여정 테마로 묶어
// 한 화면에서 준비를 끝내게 하는 교차판매 컬렉션. 허위 '특가/최저가' 표현 없음 —
// 실제 상품 묶음일 뿐, 요금은 각 제휴사에서 확인.
//
// itemIds는 FULL_CATALOG(catalog.ts)에 존재하는 id만. 새 컬렉션 추가 시 id 실존 확인.
// 사진은 검증 풀만 사용.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

// ── Trip Set 확장 (2026-07-28, feat/promotable-trip-sets-v1) ──
// 기존 Collection을 optional 필드로 점진 확장 — 기존 8개 컬렉션은 무변경·무영향.
// 확장 필드가 있는 컬렉션은 CollectionView가 '여행 랜딩페이지'형으로 렌더한다.
export type ComfortFact = {
  type:
    | 'airport_access'
    | 'station_access'
    | 'luggage_storage'
    | 'late_checkin'
    | 'laundry'
    | 'workspace'
    | 'wifi'
    | 'transit_pass'
    | 'esim'
  label: L
  value: L
  /** 출처 표기(선택) — 검증 못 한 항목은 아예 넣지 않는다 */
  source?: string
  verifiedAt?: string
}

export type Collection = {
  slug: string
  emoji: string
  photo: string
  photoAlt?: L
  photoPosition?: string
  illustrative?: boolean
  title: L
  tagline: L
  desc: L
  /** 진열 순서대로 — 보통 숙소 → 체험 → eSIM → 항공 순 */
  itemIds: string[]
  // ── 이하 Trip Set optional 확장 ──
  duration?: '2n3d' | '3n4d' | '1week' | '2weeks' | '1month'
  durationLabel?: L
  /** 동행·상황 한 줄 (예: 친구와 둘이서 / ひとりでも) */
  companions?: L
  /** '이런 사람에게 맞아요' — 최대 4개 */
  audience?: L[]
  /** 추천 흐름 — 예약 일정표가 아닌 여행 흐름 제안 (디스클레이머 필수 렌더) */
  dayFlow?: { day: number; title: L; items: L[] }[]
  /** 객관적 편의 정보 — 검증 가능한 것만, 최대 6개 */
  comfortFacts?: ComfortFact[]
  /** 관련 도시 가이드 slug (보조 CTA) */
  cityGuideSlug?: string
}

const P = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`

export const COLLECTIONS: Collection[] = [
  // 시즌 기획전 — 2026 추석 연휴(9/24 목~9/27 일, 대체공휴일 없음). 배열 선두 = 홈 상위3 노출.
  // ⚠️ 시즌 종료(9/27) 후 배열 뒤로 이동하거나 제거할 것
  {
    slug: 'chuseok-short-haul',
    emoji: '🌕',
    photo: '/covers/stay-fukuoka-city-real.jpeg', // 일본 골목 야경 (검증 2026-07-19, curl 200+육안)
    title: { KO: '추석 연휴 단거리 워케이션', EN: 'Chuseok long-weekend workation', JP: '秋夕連休 近場ワーケーション' },
    tagline: { KO: '나흘이면 충분한 일본 3거점', EN: 'Four days, three easy bases in Japan', JP: '4日で行ける日本の3拠点' },
    desc: {
      KO: '2026 추석 연휴(9/24 목~9/27 일)는 나흘 — 시차 0시간, 직항 1~2시간대 일본이 정답입니다. 가까운 순서로 후쿠오카·오사카·도쿄의 검증 숙소를 골라, eSIM과 항공까지 한 번에 준비하세요. 9월 하순은 세 도시 모두 베스트 시즌입니다.',
      EN: "Chuseok 2026 gives you four days (Sep 24–27) — zero jet lag and 1–2h flights make Japan the move. Pick a verified stay in Fukuoka, Osaka or Tokyo, then sort your eSIM and flights in one go. Late September is prime season in all three.",
      JP: '2026年の秋夕連休は4日間（9/24木〜9/27日）。時差ゼロ・直行1〜2時間の日本が正解です。福岡・大阪・東京の検証済みの宿を選び、eSIMと航空券まで一度に準備。9月下旬は3都市ともベストシーズン。',
    },
    itemIds: ['stay-webase-hakata', 'stay-lively-osaka', 'stay-millennials-shibuya', 'esim-klook-japan', 'feat-flight-tripcom'],
  },
  // ── Trip Sets (2026-07-28, feat/promotable-trip-sets-v1) ──
  // KO용 2(후쿠오카·오사카)+JP용 2(서울·부산). 전 아이템 FULL_CATALOG 실존·활성 확인.
  // 사진 전부 기존 검증 풀. dayFlow는 '흐름 제안'(디스클레이머 렌더) — 영업시간·예약 미보장.
  // comfortFacts는 검증 가능한 것만: 부산 거점센터·KTX-청룡(07-28 공식 검증), 주유패스(제휴 상품 실문구),
  // 공항 접근은 공식 교통 안내 수준의 보수 서술. 미확인 항목은 생략.
  {
    slug: 'fukuoka-3n4d',
    emoji: '☕',
    photo: TRIP_SET_CAMPAIGNS['fukuoka-3n4d'].image,
    photoAlt: TRIP_SET_CAMPAIGNS['fukuoka-3n4d'].alt,
    photoPosition: '48% 48%',
    illustrative: true,
    title: { KO: '후쿠오카 3박 4일', EN: 'Fukuoka, 3 nights 4 days', JP: '福岡 3泊4日' },
    tagline: {
      KO: '카페에서 일하고, 온천에서 하루를 마무리하는 짧은 일본 체류',
      EN: 'Work from cafés, end the day at an onsen — a short stay in Japan',
      JP: 'カフェで働いて、温泉で一日を締める。ちいさな日本滞在',
    },
    desc: {
      KO: '직항 1시간대, 공항에서 도심까지 지하철로 금방 — 후쿠오카는 짧은 일본 워케이션의 정답에 가깝습니다. 하카타의 코워킹 라운지 숙소에서 일하고, 근교 온천 마을로 하루를 비워보세요.',
      EN: 'A one-hour flight and a subway ride from airport to downtown — Fukuoka is about the easiest short workation in Japan. Work from a coworking-lounge stay in Hakata, and clear one day for a nearby onsen town.',
      JP: '直行1時間台、空港から都心まで地下鉄ですぐ。博多のコワーキングラウンジ付きの宿で働き、近郊の温泉町へ一日を空けて。',
    },
    itemIds: ['stay-webase-hakata', 'act-fukuoka-bustour', 'esim-klook-japan', 'feat-flight-tripcom'],
    duration: '3n4d',
    durationLabel: { KO: '3박 4일', EN: '3N4D', JP: '3泊4日' },
    companions: { KO: '혼자 · 일하며 여행', EN: 'Solo · work + travel', JP: 'ひとり · 働きながら' },
    audience: [
      { KO: '짧은 휴가로 일본을 다녀오고 싶은 사람', EN: 'Want Japan on a short break', JP: '短い休みで日本へ行きたい人' },
      { KO: '여행 중에도 하루 1~2시간 업무가 필요한 사람', EN: 'Need 1–2 work hours a day while away', JP: '旅の間も1〜2時間仕事が必要な人' },
      { KO: '카페·미식·온천을 한 여행에 담고 싶은 사람', EN: 'Cafés, food and onsen in one trip', JP: 'カフェ・グルメ・温泉を一度に楽しみたい人' },
    ],
    dayFlow: [
      { day: 1, title: { KO: '도착', EN: 'Arrive', JP: '到着' }, items: [
        { KO: '공항 → 도심 이동 · 체크인', EN: 'Airport to downtown · check in', JP: '空港→都心 · チェックイン' },
        { KO: '숙소 근처 산책과 가벼운 저녁', EN: 'A walk nearby and a light dinner', JP: '近所を散歩して軽めの夕食' },
      ]},
      { day: 2, title: { KO: '일과 카페', EN: 'Work & cafés', JP: '仕事とカフェ' }, items: [
        { KO: '오전 숙소 라운지 또는 카페 업무', EN: 'Morning work from the lounge or a café', JP: '午前はラウンジかカフェで仕事' },
        { KO: '오후 하카타·텐진 산책', EN: 'Afternoon around Hakata & Tenjin', JP: '午後は博多・天神を散策' },
        { KO: '저녁 로컬 미식', EN: 'Local food for dinner', JP: '夜はローカルグルメ' },
      ]},
      { day: 3, title: { KO: '온천 반나절', EN: 'Onsen half-day', JP: '温泉半日' }, items: [
        { KO: '근교 온천 마을 투어 또는 자유 일정', EN: 'Nearby onsen town tour, or free time', JP: '近郊の温泉町ツアーまたは自由時間' },
        { KO: '저녁 정리 업무 1시간', EN: 'An hour of wrap-up work', JP: '夜に1時間だけ仕事の整理' },
      ]},
      { day: 4, title: { KO: '체크아웃', EN: 'Check out', JP: 'チェックアウト' }, items: [
        { KO: '체크아웃 · 공항 이동', EN: 'Check out · to the airport', JP: 'チェックアウト · 空港へ' },
      ]},
    ],
    comfortFacts: [
      { type: 'airport_access', label: { KO: '공항 접근', EN: 'Airport access', JP: '空港アクセス' }, value: { KO: '후쿠오카공항—하카타역 지하철 공항선 직결', EN: 'Subway links the airport straight to Hakata Station', JP: '福岡空港—博多駅は地下鉄空港線で直結' } },
      { type: 'workspace', label: { KO: '업무 공간', EN: 'Workspace', JP: 'ワークスペース' }, value: { KO: '코워킹 라운지를 갖춘 숙소 선택 가능', EN: 'Stays with coworking lounges available', JP: 'コワーキングラウンジ付きの宿を選べる' } },
      { type: 'esim', label: { KO: 'eSIM', EN: 'eSIM', JP: 'eSIM' }, value: { KO: '출국 전 설치하면 도착 즉시 연결', EN: 'Install before departure, connect on arrival', JP: '出発前に設定すれば到着後すぐ接続' } },
      { type: 'station_access', label: { KO: '동선', EN: 'Getting around', JP: '移動' }, value: { KO: '하카타역 중심 도보권 — 숙소를 역 근처로', EN: 'Hakata Station is the hub — stay nearby', JP: '博多駅中心の徒歩圏 — 宿は駅近が便利' } },
    ],
    cityGuideSlug: 'fukuoka',
  },
  {
    slug: 'osaka-friends',
    emoji: '🎡',
    photo: TRIP_SET_CAMPAIGNS['osaka-friends'].image,
    photoAlt: TRIP_SET_CAMPAIGNS['osaka-friends'].alt,
    photoPosition: '58% 49%',
    illustrative: true,
    title: { KO: '오사카 친구 여행 3박 4일', EN: 'Osaka with friends, 3N4D', JP: '大阪 友達旅 3泊4日' },
    tagline: {
      KO: '맛있는 것과 새로운 장면을 함께 모으는 3박 4일',
      EN: 'Four days of collecting good food and new scenes together',
      JP: 'おいしいものと新しい景色を、いっしょに集める3泊4日',
    },
    desc: {
      KO: '유니버설 스튜디오, 구로몬 시장, 주유패스로 도는 40여 곳 — 친구와의 오사카는 계획이 절반입니다. 라운지 넓은 숙소를 베이스로, 낮과 밤을 균형 있게 나눠보세요.',
      EN: 'Universal Studios, Kuromon Market and 40+ spots on the Amazing Pass — half the fun of Osaka with friends is the plan. Base yourselves at a lounge-rich stay and split days and nights evenly.',
      JP: 'ユニバ、黒門市場、周遊パスで巡る40カ所以上。友達との大阪は計画も楽しみのうち。ラウンジの広い宿をベースに、昼と夜をバランスよく。',
    },
    itemIds: ['stay-lively-osaka', 'act-osaka-usj', 'act-klook-osaka-pass', 'theme-local-kuromon', 'esim-klook-japan', 'feat-flight-tripcom'],
    duration: '3n4d',
    durationLabel: { KO: '3박 4일', EN: '3N4D', JP: '3泊4日' },
    companions: { KO: '친구와 둘이서', EN: 'With a friend', JP: '友達とふたりで' },
    audience: [
      { KO: '친구와 숙소·맛집·체험을 균형 있게 즐기고 싶은 사람', EN: 'Want stays, food and fun in balance', JP: '宿・グルメ・体験をバランスよく楽しみたい人' },
      { KO: '테마파크 하루는 꼭 넣고 싶은 사람', EN: 'A theme-park day is non-negotiable', JP: 'テーマパークの日は外せない人' },
      { KO: '복잡한 계획보다 기본 구성을 먼저 보고 싶은 사람', EN: 'Prefer a ready starting plan over a spreadsheet', JP: '複雑な計画より基本の構成から見たい人' },
    ],
    dayFlow: [
      { day: 1, title: { KO: '도착', EN: 'Arrive', JP: '到着' }, items: [
        { KO: '공항 → 난바 이동 · 체크인', EN: 'Airport to Namba · check in', JP: '空港→難波 · チェックイン' },
        { KO: '도톤보리 저녁 산책', EN: 'Evening walk in Dotonbori', JP: '道頓堀を夜さんぽ' },
      ]},
      { day: 2, title: { KO: '테마파크 데이', EN: 'Theme-park day', JP: 'テーマパークの日' }, items: [
        { KO: '유니버설 스튜디오 하루', EN: 'A full day at Universal Studios', JP: 'ユニバで一日' },
      ]},
      { day: 3, title: { KO: '시장과 패스', EN: 'Market & pass', JP: '市場とパス' }, items: [
        { KO: '오전 구로몬 시장 먹거리', EN: 'Kuromon Market bites in the morning', JP: '午前は黒門市場で食べ歩き' },
        { KO: '오후 주유패스로 전망대·크루즈 등', EN: 'Afternoon on the Amazing Pass — decks, cruises and more', JP: '午後は周遊パスで展望台やクルーズへ' },
      ]},
      { day: 4, title: { KO: '체크아웃', EN: 'Check out', JP: 'チェックアウト' }, items: [
        { KO: '기념품 · 공항 이동', EN: 'Souvenirs · to the airport', JP: 'お土産 · 空港へ' },
      ]},
    ],
    comfortFacts: [
      { type: 'airport_access', label: { KO: '공항 접근', EN: 'Airport access', JP: '空港アクセス' }, value: { KO: '간사이공항—난바 난카이선 직결 노선 운행', EN: 'Nankai line runs direct from KIX to Namba', JP: '関西空港—難波は南海線で直結' } },
      { type: 'transit_pass', label: { KO: '교통 패스', EN: 'Transit pass', JP: '交通パス' }, value: { KO: '주유패스 하나로 교통+40여 시설 입장', EN: 'One Amazing Pass covers transit + 40+ spots', JP: '周遊パス1枚で交通＋40カ所以上' } },
      { type: 'workspace', label: { KO: '업무 공간', EN: 'Workspace', JP: 'ワークスペース' }, value: { KO: '라운지가 넓은 숙소 선택 가능', EN: 'Lounge-rich stays available', JP: 'ラウンジの広い宿を選べる' } },
      { type: 'esim', label: { KO: 'eSIM', EN: 'eSIM', JP: 'eSIM' }, value: { KO: '출국 전 설치하면 도착 즉시 연결', EN: 'Install before departure, connect on arrival', JP: '出発前に設定すれば到着後すぐ接続' } },
    ],
    cityGuideSlug: 'osaka',
  },
  {
    slug: 'seoul-3n4d',
    emoji: '🏙',
    photo: TRIP_SET_CAMPAIGNS['seoul-3n4d'].image,
    photoAlt: TRIP_SET_CAMPAIGNS['seoul-3n4d'].alt,
    photoPosition: '60% 52%',
    illustrative: true,
    title: { KO: '서울 3박 4일', EN: 'Seoul, 3 nights 4 days', JP: 'ソウル 3泊4日' },
    tagline: {
      KO: '카페와 거리를 걸으며 서울의 일상에 다가가는 여행',
      EN: 'Cafés and street walks — a trip that gets close to everyday Seoul',
      JP: 'カフェと街歩きを楽しみながら、ソウルの日常に少し近づく旅',
    },
    desc: {
      KO: '성수의 팝업과 연남의 카페, 저녁의 야구장까지 — 서울은 걷는 만큼 보이는 도시입니다. 주방이 있는 레지던스를 베이스로, 관광과 일상 사이의 3박 4일을 보내보세요.',
      EN: "Pop-ups in Seongsu, cafés in Yeonnam, a ballpark in the evening — Seoul reveals itself as you walk. Base yourself at a residence with a kitchen and spend four days between sightseeing and daily life.",
      JP: '聖水のポップアップ、延南洞のカフェ、夜は野球観戦まで。ソウルは歩くほど見えてくる街。キッチン付きレジデンスを拠点に、観光と日常のあいだの3泊4日を。',
    },
    itemIds: ['stay-fraser-seoul', 'theme-sports-seoul-baseball', 'esim-airalo', 'feat-transfer-klook'],
    duration: '3n4d',
    durationLabel: { KO: '3박 4일', EN: '3N4D', JP: '3泊4日' },
    companions: { KO: '혼자·친구 모두', EN: 'Solo or with a friend', JP: 'ひとりでも友達とでも' },
    audience: [
      { KO: '처음 또는 오랜만의 서울을 걷고 싶은 사람', EN: 'First time in Seoul, or back after a while', JP: '初めての、または久しぶりのソウルを歩きたい人' },
      { KO: '관광지보다 로컬 동네가 궁금한 사람', EN: 'More curious about local streets than sights', JP: '観光地よりローカルな街が気になる人' },
      { KO: '여행 중 짧은 업무 시간이 필요한 사람', EN: 'Need short work blocks while traveling', JP: '旅の合間に短い仕事時間が必要な人' },
    ],
    dayFlow: [
      { day: 1, title: { KO: '도착', EN: 'Arrive', JP: '到着' }, items: [
        { KO: '공항 → 도심 이동 · 체크인', EN: 'Airport to downtown · check in', JP: '空港→都心 · チェックイン' },
        { KO: '숙소 근처 저녁 산책', EN: 'An evening walk nearby', JP: '近所を夜さんぽ' },
      ]},
      { day: 2, title: { KO: '성수', EN: 'Seongsu', JP: '聖水' }, items: [
        { KO: '오전 카페 업무 또는 휴식', EN: 'Morning café work or rest', JP: '午前はカフェで仕事か休憩' },
        { KO: '오후 성수 팝업·쇼룸 산책', EN: 'Afternoon pop-ups and showrooms in Seongsu', JP: '午後は聖水のポップアップ巡り' },
      ]},
      { day: 3, title: { KO: '연남과 야구장', EN: 'Yeonnam & ballpark', JP: '延南と野球場' }, items: [
        { KO: '낮 연남·홍대 카페 골목', EN: 'Daytime in Yeonnam–Hongdae café alleys', JP: '昼は延南・弘大のカフェ路地' },
        { KO: '저녁 야구 직관 체험', EN: 'Evening at a baseball game', JP: '夜は野球観戦' },
      ]},
      { day: 4, title: { KO: '체크아웃', EN: 'Check out', JP: 'チェックアウト' }, items: [
        { KO: '체크아웃 · 공항 이동', EN: 'Check out · to the airport', JP: 'チェックアウト · 空港へ' },
      ]},
    ],
    comfortFacts: [
      { type: 'airport_access', label: { KO: '공항 접근', EN: 'Airport access', JP: '空港アクセス' }, value: { KO: '인천공항—서울역 공항철도(AREX) 운행', EN: 'AREX rail links Incheon Airport to Seoul Station', JP: '仁川空港—ソウル駅は空港鉄道A\'REXで' } },
      { type: 'workspace', label: { KO: '업무 공간', EN: 'Workspace', JP: 'ワークスペース' }, value: { KO: '성수·홍대에 카페·코워킹 밀집', EN: 'Cafés and coworking cluster in Seongsu & Hongdae', JP: '聖水・弘大にカフェとコワーキングが密集', }, source: '가이드 검증', verifiedAt: '2026-07-28' },
      { type: 'transit_pass', label: { KO: '교통', EN: 'Transit', JP: '交通' }, value: { KO: '티머니 교통카드 — 편의점에서 구매·충전', EN: 'T-money card — buy and top up at convenience stores', JP: 'T-moneyカード — コンビニで購入・チャージ' } },
      { type: 'esim', label: { KO: 'eSIM', EN: 'eSIM', JP: 'eSIM' }, value: { KO: '출국 전 설치하면 도착 즉시 연결', EN: 'Install before departure, connect on arrival', JP: '出発前に設定すれば到着後すぐ接続' } },
    ],
    cityGuideSlug: 'seoul',
  },
  {
    slug: 'busan-weekend',
    emoji: '🌊',
    photo: TRIP_SET_CAMPAIGNS['busan-weekend'].image,
    photoAlt: TRIP_SET_CAMPAIGNS['busan-weekend'].alt,
    photoPosition: '54% 54%',
    illustrative: true,
    title: { KO: '부산 주말 2박 3일', EN: 'Busan weekend, 2N3D', JP: '釜山 週末 2泊3日' },
    tagline: {
      KO: '바다를 보고, 먹고, 걷는 — 가볍게 즐기는 주말',
      EN: 'Sea views, good food, long walks — an easy weekend',
      JP: '海を眺めて、食べて、歩く。気軽に楽しむ韓国の週末',
    },
    desc: {
      KO: '해운대 오션뷰 레지던스에서 눈뜨는 주말. 전포 카페거리를 걷고, 필요하면 부산역 워케이션 거점센터에서 짧게 일하고 — 짧아서 더 좋은 2박 3일입니다.',
      EN: 'Wake up to Haeundae ocean views. Walk Jeonpo café street, and if needed, put in a short work block at the Busan Station workation center — a weekend that works because it’s short.',
      JP: '海雲台のオーシャンビューレジデンスで目覚める週末。田浦カフェ通りを歩いて、必要なら釜山駅のワーケーション拠点で少しだけ仕事。短いからこそいい2泊3日。',
    },
    itemIds: ['stay-uh-busan', 'cruise-panstar-miracle', 'esim-airalo', 'feat-transfer-klook'],
    duration: '2n3d',
    durationLabel: { KO: '2박 3일', EN: '2N3D', JP: '2泊3日' },
    companions: { KO: '혼자·친구 모두', EN: 'Solo or with a friend', JP: 'ひとりでも友達とでも' },
    audience: [
      { KO: '주말만으로 짧게 떠나고 싶은 사람', EN: 'Want a getaway that fits a weekend', JP: '週末だけで気軽に出かけたい人' },
      { KO: '바다 보이는 숙소가 여행의 절반인 사람', EN: 'An ocean-view stay is half the trip', JP: '海の見える宿が旅の半分な人' },
      { KO: '오사카에서 페리로 건너오는 색다른 루트가 궁금한 사람', EN: 'Curious about the overnight ferry route from Osaka', JP: '大阪からフェリーで渡る特別なルートが気になる人' },
    ],
    dayFlow: [
      { day: 1, title: { KO: '도착', EN: 'Arrive', JP: '到着' }, items: [
        { KO: '공항·역 → 해운대 이동 · 체크인', EN: 'Airport or station to Haeundae · check in', JP: '空港・駅→海雲台 · チェックイン' },
        { KO: '해변 산책과 저녁', EN: 'Beach walk and dinner', JP: 'ビーチ散歩と夕食' },
      ]},
      { day: 2, title: { KO: '바다와 카페', EN: 'Sea & cafés', JP: '海とカフェ' }, items: [
        { KO: '오전 오션뷰에서 휴식 또는 짧은 업무', EN: 'Morning rest or a short work block with the view', JP: '午前はオーシャンビューで休憩か軽く仕事' },
        { KO: '오후 전포 카페거리·서면', EN: 'Afternoon in Jeonpo café street & Seomyeon', JP: '午後は田浦カフェ通り・西面へ' },
        { KO: '저녁 로컬 미식', EN: 'Local food for dinner', JP: '夜はローカルグルメ' },
      ]},
      { day: 3, title: { KO: '체크아웃', EN: 'Check out', JP: 'チェックアウト' }, items: [
        { KO: '늦은 오전 해변 · 체크아웃 · 이동', EN: 'Late-morning beach · check out · head home', JP: '午前はビーチ · チェックアウト · 帰路へ' },
      ]},
    ],
    comfortFacts: [
      { type: 'station_access', label: { KO: '서울에서', EN: 'From Seoul', JP: 'ソウルから' }, value: { KO: 'KTX-청룡 서울—부산 2시간 17분', EN: 'KTX-Cheongryong Seoul–Busan in 2h 17m', JP: 'KTX青龍でソウル—釜山2時間17分' }, source: '공식 발표', verifiedAt: '2026-07-28' },
      { type: 'workspace', label: { KO: '업무 공간', EN: 'Workspace', JP: 'ワークスペース' }, value: { KO: '부산역 워케이션 거점센터 — 업무석 50석·폰부스 4실', EN: 'Busan Station workation center — 50 desks, 4 booths', JP: '釜山駅ワーケーション拠点 — 50席・ブース4室' }, source: '부산시 보도자료', verifiedAt: '2026-07-28' },
      { type: 'airport_access', label: { KO: '공항 접근', EN: 'Airport access', JP: '空港アクセス' }, value: { KO: '김해공항—시내 경전철·지하철 환승 이동', EN: 'Light rail + metro link Gimhae Airport to the city', JP: '金海空港—市内は軽電鉄と地下鉄で' } },
      { type: 'esim', label: { KO: 'eSIM', EN: 'eSIM', JP: 'eSIM' }, value: { KO: '출국 전 설치하면 도착 즉시 연결', EN: 'Install before departure, connect on arrival', JP: '出発前に設定すれば到着後すぐ接続' } },
    ],
    cityGuideSlug: 'busan',
  },
  {
    slug: 'tokyo-allinone',
    emoji: '🗼',
    photo: '/covers/stay-tokyo-city-real.jpeg', // 도쿄 (검증 2026-07-19, curl 200+육안)
    title: { KO: '도쿄 워케이션 올인원', EN: 'Tokyo workation, all in one', JP: '東京ワーケーション オールインワン' },
    tagline: { KO: '숙소부터 eSIM까지 한 번에', EN: 'Stay, experiences and eSIM in one go', JP: '宿からeSIMまで一度に' },
    desc: {
      KO: '시차 0시간 도쿄에서 일하는 워케이션. 코워킹 내장 숙소, 저녁을 채우는 팀랩, 도착 즉시 연결되는 eSIM, 그리고 항공까지 — 떠나기 전 필요한 걸 모았습니다.',
      EN: 'A zero-jetlag Tokyo workation. A coworking-equipped stay, teamLab for the evenings, an eSIM that connects on arrival, plus flights — everything you need before you go.',
      JP: '時差ゼロの東京ワーケーション。コワーキング付きの宿、夜を彩るチームラボ、到着後すぐ繋がるeSIM、そして航空券まで。',
    },
    itemIds: ['stay-millennials-shibuya', 'act-klook-teamlab-tokyo', 'esim-klook-japan', 'feat-flight-tripcom'],
  },
  {
    slug: 'bali-monthstay',
    emoji: '🌴',
    photo: '/covers/stay-bali-city-real.jpeg', // 발리 (검증 2026-07-19, curl 200+육안)
    title: { KO: '발리 한 달 살기 세트', EN: 'Bali month-stay set', JP: 'バリ1カ月滞在セット' },
    tagline: { KO: '노마드 성지에서 길게 머물기', EN: 'Settle in at the nomad capital', JP: 'ノマドの聖地で長く滞在' },
    desc: {
      KO: '코워킹 전용 설계 숙소에서 한 달. 누사페니다 섬 투어로 주말을 채우고, 아시아 멀티국 eSIM과 항공으로 이동을 준비하세요. 워케이션 중 성장할 강의까지.',
      EN: 'A month at a coworking-first stay. Fill weekends with a Nusa Penida island trip, and prep travel with a multi-country Asia eSIM and flights — plus a course to grow while you stay.',
      JP: 'コワーキング特化の宿で1カ月。ヌサペニダ島ツアーで週末を、アジアマルチ国eSIMと航空券で移動を準備。滞在中に学べる講座も。',
    },
    itemIds: ['stay-tribal-bali', 'act-klook-nusapenida-bali', 'esim-klook-asia', 'feat-flight-tripcom', 'course-gpts-automation'],
  },
  {
    slug: 'chiangmai-nomad',
    emoji: '🏯',
    photo: P('1512553353614-82a7370096dc'), // 치앙마이 (검증)
    title: { KO: '치앙마이 노마드 세트', EN: 'Chiang Mai nomad set', JP: 'チェンマイ ノマドセット' },
    tagline: { KO: '장기 체류의 교과서', EN: 'The textbook long stay', JP: '長期滞在の定番' },
    desc: {
      KO: '서비스드 아파트가 많은 노마드 수도 치앙마이. 코끼리 생추어리로 하루를 비우고, 아시아 eSIM과 항공으로 준비를 끝내세요. 11~2월 건기가 가장 좋습니다.',
      EN: 'Chiang Mai — the nomad capital full of serviced apartments. Take a day at the elephant sanctuary, and sort travel with an Asia eSIM and flights. Best in the Nov–Feb dry season.',
      JP: 'サービスアパートが揃うノマドの都チェンマイ。象のサンクチュアリで一日を空け、アジアeSIMと航空券で準備完了。11〜2月の乾季が◎。',
    },
    itemIds: ['stay-kantary-chiangmai', 'act-klook-elephant-chiangmai', 'esim-klook-asia', 'feat-flight-tripcom'],
  },
  {
    slug: 'japan-onsen-reset',
    emoji: '♨️',
    photo: P('1526481280693-3bfa7568e0f3'), // 후지산 (검증)
    title: { KO: '일본 소도시 온천 리셋', EN: 'Japan onsen-town reset', JP: '日本の温泉町リセット' },
    tagline: { KO: '일하고, 온천으로 하루를 닫다', EN: 'Work, then close the day at the onsen', JP: '働いて、温泉で一日を締める' },
    desc: {
      KO: '대도시의 소음 대신 규슈 하카타의 코워킹 숙소에서 일하고, 후쿠오카 근교 온천 마을을 당일로 다녀오세요. 일본 eSIM과 항공까지. 료칸·온천 소도시는 전용 페이지에서.',
      EN: 'Swap city noise for a coworking stay in Hakata, Kyushu, and day-trip to onsen towns near Fukuoka. Japan eSIM and flights included. See the ryokan & onsen towns on their own page.',
      JP: '大都市の喧騒の代わりに博多のコワーキング宿で働き、福岡近郊の温泉町へ日帰り。日本eSIMと航空券も。旅館・温泉の小都市は専用ページで。',
    },
    itemIds: ['stay-webase-hakata', 'act-fukuoka-bustour', 'esim-klook-japan', 'feat-flight-tripcom'],
  },
  {
    slug: 'osaka-foodie',
    emoji: '🍜',
    photo: P('1590559899731-a382839e5549'), // 오사카 (검증)
    title: { KO: '오사카 미식 워케이션', EN: 'Osaka foodie workation', JP: '大阪グルメワーケーション' },
    tagline: { KO: '먹고 일하고, 주말은 주유패스로', EN: 'Eat, work, and roam with the Amazing Pass', JP: '食べて働き、週末は周遊パスで' },
    desc: {
      KO: '시차 0·직항 1시간대의 오사카. 라운지가 넓은 숙소에서 일하고, 주유패스로 40여 곳을 도세요. 일본 eSIM과 항공까지 한 번에.',
      EN: 'Zero-jetlag Osaka, a short flight away. Work from a lounge-rich stay and roam 40+ spots with the Amazing Pass. Japan eSIM and flights included.',
      JP: '時差ゼロ·直行1時間台の大阪。ラウンジの広い宿で働き、周遊パスで40カ所以上へ。日本eSIMと航空券も。',
    },
    itemIds: ['stay-lively-osaka', 'act-klook-osaka-pass', 'esim-klook-japan', 'feat-flight-tripcom'],
  },
  {
    slug: 'singapore-business',
    emoji: '🌆',
    photo: P('1525625293386-3f8f99389edd'), // 싱가포르 (검증)
    title: { KO: '싱가포르 비즈니스 워케이션', EN: 'Singapore business workation', JP: 'シンガポール ビジネスワーケーション' },
    tagline: { KO: '코워킹 코리빙 + 도심 인프라', EN: 'Co-living meets a global business hub', JP: 'コリビング＋都市インフラ' },
    desc: {
      KO: '아시아 비즈니스 허브 싱가포르. 코워킹 라운지를 갖춘 코리빙에서 일하고, 주말엔 유니버설 스튜디오. 아시아 멀티국 eSIM과 항공으로 준비 끝.',
      EN: "Singapore, Asia's business hub. Work from a co-living with a coworking lounge, and hit Universal Studios on weekends. A multi-country Asia eSIM and flights round it out.",
      JP: 'アジアのビジネス拠点シンガポール。コワーキング付きコリビングで働き、週末はユニバーサル・スタジオ。アジアマルチ国eSIMと航空券で準備完了。',
    },
    itemIds: ['stay-lyf-funan-singapore', 'act-klook-uss-singapore', 'esim-klook-asia', 'feat-flight-tripcom'],
  },
  {
    slug: 'taipei-workation',
    emoji: '🏮',
    photo: P('1470004914212-05527e49370b'), // 타이베이 (검증)
    title: { KO: '타이베이 워케이션', EN: 'Taipei workation', JP: '台北ワーケーション' },
    tagline: { KO: '야시장과 코워킹 사이', EN: 'Between night markets and coworking', JP: '夜市とコワーキングの間で' },
    desc: {
      KO: '카페·야시장 밀도 높은 타이베이. 스마트 호텔에서 일하고, 예류·지우펀 일일투어로 근교를 도세요. 아시아 eSIM과 항공까지.',
      EN: 'Taipei, dense with cafés and night markets. Work from a smart hotel and day-trip to Yehliu and Jiufen. Asia eSIM and flights included.',
      JP: 'カフェ·夜市が密集する台北。スマートホテルで働き、野柳·九份の日帰りツアーへ。アジアeSIMと航空券も。',
    },
    itemIds: ['stay-citizenm-taipei', 'act-klook-taipei-tour', 'esim-klook-asia', 'feat-flight-tripcom'],
  },
]

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export const COLLECTIONS_UI: Record<string, L> = {
  eyebrow: { KO: 'WAKATION 기획전', EN: 'WAKATION COLLECTIONS', JP: 'WAKATION 特集' },
  home_title: { KO: '테마로 준비하는 워케이션 기획전', EN: 'Workation collections, curated by theme', JP: 'テーマで準備するワーケーション特集' },
  home_sub: {
    KO: '숙소·체험·eSIM·항공을 목적지별로 묶었습니다. 한 화면에서 준비를 끝내세요.',
    EN: 'Stays, experiences, eSIMs and flights bundled by destination — get ready on one screen.',
    JP: '宿・体験・eSIM・航空券を目的地別にまとめました。1画面で準備完了。',
  },
  see_all: { KO: '기획전 전체 보기', EN: 'See all collections', JP: '特集をすべて見る' },
  hub_title: { KO: '워케이션 기획전', EN: 'Workation collections', JP: 'ワーケーション特集' },
  hub_sub: {
    KO: '목적지·여정 테마로 묶은 큐레이션. 숙소부터 항공까지 한 번에 준비하세요.',
    EN: 'Curated by destination and trip type — prep everything from stay to flight in one place.',
    JP: '目的地・旅のテーマ別キュレーション。宿から航空券まで一度に。',
  },
  count_label: { KO: '개 상품 구성', EN: ' items', JP: '点で構成' },
  included: { KO: '이 기획전 구성', EN: "What's in this collection", JP: 'この特集の構成' },
  disclosure: {
    KO: '기획전은 검증된 제휴 상품의 큐레이션 묶음입니다. 요금·예약·환불 조건은 각 제휴사에서 최종 확인됩니다.',
    EN: 'Collections are curated bundles of verified partner products. Prices, booking and refunds are confirmed on each partner site.',
    JP: '特集は検証済み提携商品のキュレーションです。料金・予約・返金条件は各提携先で確認されます。',
  },
  back: { KO: '기획전 전체', EN: 'All collections', JP: '特集一覧' },
  // ── Trip Set 전용 UI (2026-07-28) ──
  ts_image_note: { KO: '연출 이미지', EN: 'Editorial image', JP: 'イメージ画像' },
  ts_nav_label: { KO: 'Trip Set 빠른 이동', EN: 'Trip Set sections', JP: 'Trip Set 内の移動' },
  ts_nav_fit: { KO: '나와 맞는지', EN: 'Is it for me?', JP: '自分に合う？' },
  ts_nav_flow: { KO: '여행 흐름', EN: 'Trip flow', JP: '旅の流れ' },
  ts_nav_comfort: { KO: '체류 정보', EN: 'Stay notes', JP: '滞在メモ' },
  ts_nav_prepare: { KO: '준비하기', EN: 'Get ready', JP: '旅の準備' },
  ts_intro_flow: { KO: '여행 흐름 먼저 보기', EN: 'See the trip flow', JP: '旅の流れを見る' },
  ts_intro_prepare: { KO: '필요한 것 준비하기', EN: 'Prepare what you need', JP: '必要なものを準備' },
  ts_audience: { KO: '이런 사람에게 맞아요', EN: 'This trip fits you if…', JP: 'こんな人に合う旅' },
  ts_flow: { KO: '추천 흐름', EN: 'Suggested flow', JP: 'おすすめの流れ' },
  ts_flow_note: {
    KO: '제안 일정은 여행 구성을 돕기 위한 예시입니다. 운영시간과 예약 조건은 각 장소와 제휴사에서 최종 확인해주세요.',
    EN: 'This flow is an example to help you plan. Opening hours and booking terms are confirmed at each venue and partner.',
    JP: 'この流れは旅の構成を助けるための一例です。営業時間や予約条件は各施設・提携先でご確認ください。',
  },
  ts_comfort: { KO: '알아두면 편한 것', EN: 'Good to know', JP: '知っておくと便利' },
  ts_prepare: { KO: '이 여행을 준비하는 선택', EN: 'Prepare this trip, piece by piece', JP: 'この旅の準備を始める' },
  ts_prepare_note: {
    KO: '각 상품은 제휴사에서 개별 예약·결제됩니다. 패키지 일괄 판매가 아닙니다.',
    EN: 'Each item is booked and paid separately at the partner. This is not a package sale.',
    JP: '各商品は提携先で個別に予約・決済されます。パッケージ販売ではありません。',
  },
  ts_disclosure_label: { KO: '예약 전에 확인하세요', EN: 'Before you book', JP: '予約前にご確認ください' },
  ts_guide_cta: { KO: '도시 가이드 보기', EN: 'Open the city guide', JP: '都市ガイドを見る' },
  ts_category_hotel: { KO: '숙소', EN: 'Stay', JP: '宿' },
  ts_category_activity: { KO: '체험', EN: 'Experience', JP: '体験' },
  ts_category_transport: { KO: '이동', EN: 'Transport', JP: '移動' },
  ts_category_esim: { KO: '연결', EN: 'Connectivity', JP: '通信' },
  ts_category_insurance: { KO: '보험', EN: 'Insurance', JP: '保険' },
  ts_category_education: { KO: '배움', EN: 'Learning', JP: '学び' },
  ts_category_visa: { KO: '비자', EN: 'Visa', JP: 'ビザ' },
  ts_day: { KO: 'Day', EN: 'Day', JP: 'Day' },
  ts_card_cta: { KO: '구성 보기', EN: 'See the set', JP: '構成を見る' },
}
