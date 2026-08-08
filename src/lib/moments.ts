import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

export type TravelerNote = {
  id: string
  slug: string
  sourceType: 'editorial' | 'member'
  format: 'introduction' | 'review'
  publishedAt: string
  photo: string
  photoAlt: L
  destinationSlug: string
  anchor: string
  dest: L
  country: L
  title: L
  summary: L
  /** Home rail compatibility while the old Moments label is retired. */
  tip: L
  author: L
  authorLabel: L
  stayStyle: L
  season: L
  tags: L[]
  body: L[]
  workNotes: L[]
  checkBefore: L[]
  disclosure: L
}

const editor = { KO: 'Wakation 편집팀', EN: 'Wakation Editorial', JP: 'Wakation編集部' } as const
const editorLabel = { KO: '에디터 소개', EN: 'Editor introduction', JP: '編集部の紹介' } as const
const editorialDisclosure = {
  KO: '회원 후기가 아닌 Wakation 에디터 소개입니다. 공개된 목적지 정보와 Wakation 가이드를 바탕으로 구성했으며, 영업시간과 현지 상황은 출발 전에 다시 확인해주세요.',
  EN: 'This is a Wakation editor introduction, not a member review. It is based on public destination information and Wakation guides; recheck opening hours and local conditions before departure.',
  JP: '会員の口コミではなく、Wakation編集部による紹介です。公開情報とWakationガイドをもとに構成しています。営業時間や現地状況は出発前に再確認してください。',
} as const

export const TRAVELER_NOTES: TravelerNote[] = [
  {
    id: 'note-fukuoka-ohori-rhythm',
    slug: 'fukuoka-ohori-after-work',
    sourceType: 'editorial',
    format: 'introduction',
    publishedAt: '2026-08-08',
    photo: '/media/destinations/fukuoka-editorial-v1.webp',
    photoAlt: { KO: '호수와 도심이 이어지는 후쿠오카의 한낮 풍경', EN: 'A lakeside view framed by Fukuoka city', JP: '湖と街が穏やかにつながる福岡の風景' },
    destinationSlug: 'fukuoka',
    anchor: 'japan-fukuoka',
    dest: { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' },
    country: { KO: '일본', EN: 'Japan', JP: '日本' },
    title: { KO: '오전 회의가 끝나면, 오호리공원 한 바퀴', EN: 'After the morning calls, one quiet lap of Ohori Park', JP: '午前の会議を終えたら、大濠公園を一周' },
    summary: { KO: '짧은 일정에도 업무와 산책을 나누기 쉬운 도시. 하카타를 거점으로 잡으면 공항부터 저녁 식사까지 동선이 단순해집니다.', EN: 'A city where even a short stay can hold both focused work and an unhurried walk. Base yourself near Hakata to keep the airport-to-dinner route simple.', JP: '短い滞在でも仕事と散歩を分けやすい街。博多を拠点にすると、空港から夕食までの動線がシンプルです。' },
    tip: { KO: '하카타 거점은 공항·도심 이동이 짧아 3박 4일에 잘 맞아요.', EN: 'Hakata keeps airport and city transfers short for a 3-night stay.', JP: '博多拠点なら空港と市内の移動が短く、3泊4日に向いています。' },
    author: editor,
    authorLabel: editorLabel,
    stayStyle: { KO: '3박 4일 · 혼자 또는 친구', EN: '3 nights · solo or with a friend', JP: '3泊4日 · ひとり／友人と' },
    season: { KO: '봄·가을 추천', EN: 'Best in spring and autumn', JP: '春・秋におすすめ' },
    tags: [
      { KO: '카페', EN: 'Cafés', JP: 'カフェ' },
      { KO: '도시 산책', EN: 'City walks', JP: '街歩き' },
      { KO: '짧은 체류', EN: 'Short stay', JP: '短期滞在' },
    ],
    body: [
      { KO: '후쿠오카는 긴 준비 없이도 생활 리듬을 만들기 쉬운 도시입니다. 공항에서 도심까지 이동이 짧아 도착한 날의 피로가 적고, 하카타와 텐진 사이에서 업무·식사·산책을 나눌 수 있습니다.', EN: 'Fukuoka makes it easy to build a daily rhythm without a complicated plan. The short airport transfer leaves more energy on arrival, while Hakata and Tenjin cover work, meals and walks.', JP: '福岡は複雑な準備をしなくても生活のリズムを作りやすい街です。空港から市内が近く、博多と天神の間で仕事・食事・散歩を組み立てられます。' },
      { KO: '오전에는 숙소나 카페에서 집중하고, 오후 늦게 오호리공원이나 강변으로 이동하는 구성이 부담이 적습니다. 관광지를 많이 넣기보다 하루에 한 장면만 정하면 짧은 일정도 여유롭게 느껴집니다.', EN: 'Work from your stay or a café in the morning, then move toward Ohori Park or the riverside later in the day. Choosing one scene per day keeps a short itinerary from feeling rushed.', JP: '午前は宿やカフェで集中し、午後遅くに大濠公園や川沿いへ。観光地を詰め込まず、一日一つの場面を決めると短い旅にも余白が生まれます。' },
    ],
    workNotes: [
      { KO: '화상회의가 있다면 카페보다 숙소의 데스크·방음 여부를 먼저 확인하세요.', EN: 'For video calls, confirm the desk and sound insulation at your stay before relying on cafés.', JP: 'オンライン会議がある日は、カフェより先に宿のデスクと防音を確認しましょう。' },
      { KO: '공항 이동일에는 하카타역 보관함 운영 여부와 짐 크기를 확인하세요.', EN: 'On transfer days, check Hakata Station locker availability and luggage dimensions.', JP: '移動日は博多駅のロッカー利用時間と荷物サイズを確認してください。' },
    ],
    checkBefore: [
      { KO: '공원·시설 운영시간과 행사 일정', EN: 'Park and venue hours, plus event schedules', JP: '公園・施設の営業時間とイベント日程' },
      { KO: '숙소의 실제 업무 공간과 와이파이 조건', EN: 'The stay’s actual workspace and Wi-Fi conditions', JP: '宿の実際の作業環境とWi-Fi条件' },
    ],
    disclosure: editorialDisclosure,
  },
  {
    id: 'note-jeju-deadline-sea',
    slug: 'jeju-sea-after-deadline',
    sourceType: 'editorial',
    format: 'introduction',
    publishedAt: '2026-08-08',
    photo: '/media/destinations/jeju-editorial-v1.webp',
    photoAlt: { KO: '제주 바다 건너 산방산과 한라산이 이어지는 풍경', EN: 'Jeju coast with Sanbangsan and Hallasan beyond the sea', JP: '海の向こうに山房山と漢拏山を望む済州の風景' },
    destinationSlug: 'jeju',
    anchor: 'korea-jeju',
    dest: { KO: '제주', EN: 'Jeju', JP: '済州' },
    country: { KO: '한국', EN: 'Korea', JP: '韓国' },
    title: { KO: '마감을 끝낸 오후, 바다까지 걷는 거리', EN: 'A walk to the sea after the deadline is sent', JP: '締切を終えた午後、海まで歩ける距離' },
    summary: { KO: '숙소의 책상과 저녁 산책 동선을 함께 고르면, 제주는 휴가보다 생활에 가까운 체류가 됩니다.', EN: 'Choose the desk and the evening walking route together, and Jeju starts to feel more like daily life than a vacation.', JP: '宿のデスクと夕方の散歩道を一緒に選ぶと、済州は休暇より暮らしに近い滞在になります。' },
    tip: { KO: '렌터카보다 먼저 장보기·카페·바다를 잇는 생활 반경을 정해보세요.', EN: 'Map a daily radius linking groceries, cafés and the coast before deciding on a car.', JP: 'レンタカーより先に、買い物・カフェ・海を結ぶ生活圏を決めてみましょう。' },
    author: editor,
    authorLabel: editorLabel,
    stayStyle: { KO: '4박 이상 · 느린 체류', EN: '4+ nights · slower stay', JP: '4泊以上 · ゆっくり滞在' },
    season: { KO: '사계절 · 바람 확인', EN: 'Year-round · check wind', JP: '通年 · 風を確認' },
    tags: [{ KO: '바다', EN: 'Coast', JP: '海' }, { KO: '집중 업무', EN: 'Deep work', JP: '集中作業' }, { KO: '장보기', EN: 'Daily living', JP: '日常生活' }],
    body: [
      { KO: '제주 워케이션은 관광지 수보다 생활 반경이 만족도를 좌우합니다. 업무가 있는 날에는 매번 차로 이동하기보다 숙소에서 걸어서 갈 수 있는 식당·카페·해안길을 먼저 확인하는 편이 좋습니다.', EN: 'For a Jeju workation, the everyday radius matters more than the number of sights. On workdays, prioritize food, cafés and a coastal path you can reach on foot.', JP: '済州ワーケーションでは観光地の数より生活圏が満足度を左右します。仕事の日は、徒歩で行ける食事・カフェ・海岸道を先に確認すると快適です。' },
      { KO: '업무 시간을 오전에 모으고 오후 늦게 바다로 나가는 단순한 리듬이 잘 맞습니다. 다만 지역에 따라 바람과 이동 시간이 크게 달라지므로 지도상의 거리만으로 판단하지 않는 것이 중요합니다.', EN: 'A simple rhythm—focused mornings and the coast later in the day—works well. Wind and real travel time vary widely, so do not rely on map distance alone.', JP: '午前に仕事をまとめ、午後遅くに海へ出るシンプルなリズムが合います。地域ごとに風と移動時間が大きく違うため、地図上の距離だけで判断しないことが大切です。' },
    ],
    workNotes: [{ KO: '장기 화상회의가 있다면 모바일 테더링을 백업으로 준비하세요.', EN: 'Keep mobile tethering as a backup for long video meetings.', JP: '長時間のオンライン会議にはテザリングを予備として用意しましょう。' }, { KO: '업무일과 완전 휴식일을 나누면 이동 피로가 줄어듭니다.', EN: 'Separate full workdays from full rest days to reduce transfer fatigue.', JP: '仕事日と完全な休養日を分けると移動疲れを減らせます。' }],
    checkBefore: [{ KO: '숙소 와이파이 실측 또는 최근 후기', EN: 'Measured Wi-Fi or recent connectivity reviews', JP: '宿のWi-Fi実測値または最近の口コミ' }, { KO: '강풍·우천 시 대체 동선', EN: 'A backup plan for strong wind or rain', JP: '強風・雨天時の代替動線' }],
    disclosure: editorialDisclosure,
  },
  {
    id: 'note-tokyo-no-time-gap',
    slug: 'tokyo-workday-neighborhood',
    sourceType: 'editorial',
    format: 'introduction',
    publishedAt: '2026-08-08',
    photo: '/media/destinations/tokyo-editorial-v1.webp',
    photoAlt: { KO: '비 내린 도쿄 도심의 네온 거리', EN: 'A neon-lit Tokyo street after rain', JP: '雨上がりの東京、ネオンが映る街並み' },
    destinationSlug: 'tokyo',
    anchor: 'japan-tokyo',
    dest: { KO: '도쿄', EN: 'Tokyo', JP: '東京' },
    country: { KO: '일본', EN: 'Japan', JP: '日本' },
    title: { KO: '시차 없이 일하고, 저녁에는 한 동네만 깊게', EN: 'Work without a time gap, then spend the evening in one neighborhood', JP: '時差なく働き、夜は一つの街を深く歩く' },
    summary: { KO: '도쿄를 넓게 소비하기보다 업무일마다 한 동네를 정하면 이동에 쓰는 체력을 아낄 수 있습니다.', EN: 'Choose one neighborhood per workday instead of trying to consume all of Tokyo, and save your energy for the city itself.', JP: '東京全体を回ろうとせず、仕事日ごとに一つの街を決めると移動の体力を節約できます。' },
    tip: { KO: '숙소와 저녁 목적지를 같은 노선에 두면 퇴근 후 시간이 길어져요.', EN: 'Keep your stay and evening destination on one train line to make after-work hours feel longer.', JP: '宿と夜の目的地を同じ路線にすると、仕事後の時間を長く使えます。' },
    author: editor,
    authorLabel: editorLabel,
    stayStyle: { KO: '3~5박 · 도시 집중형', EN: '3–5 nights · city-focused', JP: '3〜5泊 · 都市集中型' },
    season: { KO: '봄·가을 추천', EN: 'Best in spring and autumn', JP: '春・秋におすすめ' },
    tags: [{ KO: '도시', EN: 'City', JP: '都市' }, { KO: '전시', EN: 'Culture', JP: 'カルチャー' }, { KO: '시차 없음', EN: 'No time gap', JP: '時差なし' }],
    body: [{ KO: '도쿄는 선택지가 많아 오히려 일하는 여행자에게 피로할 수 있습니다. 업무일에는 숙소와 같은 노선의 동네 하나만 정하고, 나머지는 과감히 다음 여행으로 남겨두는 편이 좋습니다.', EN: 'Tokyo’s abundance can be tiring for a working traveler. On workdays, choose one neighborhood on the same line as your stay and leave the rest for another trip.', JP: '選択肢が多い東京は、働く旅人にはかえって疲れることがあります。仕事日は宿と同じ路線の街を一つ選び、残りは次の旅に取っておくのがおすすめです。' }, { KO: '오전과 오후의 업무 블록을 명확히 나누고, 저녁 약속은 이동 환승이 적은 곳에 잡으면 도쿄의 밀도를 즐기면서도 루틴을 지킬 수 있습니다.', EN: 'Define morning and afternoon work blocks, then choose an evening plan with minimal transfers. You can enjoy Tokyo’s density without losing your routine.', JP: '午前と午後の仕事時間を明確に分け、夜は乗り換えの少ない場所を選ぶと、東京の密度を楽しみながらルーティンを守れます。' }],
    workNotes: [{ KO: '통화가 필요하면 카페 좌석보다 숙소 또는 예약형 부스를 우선하세요.', EN: 'For calls, prioritize your stay or a bookable booth rather than café seating.', JP: '通話が必要なら、カフェ席より宿や予約制ブースを優先しましょう。' }, { KO: '출퇴근 혼잡 시간은 장거리 이동을 피하세요.', EN: 'Avoid long cross-city transfers during commuter peaks.', JP: '通勤ラッシュ時の長距離移動は避けましょう。' }],
    checkBefore: [{ KO: '숙소 주변의 야간 귀가 동선', EN: 'The evening route back to your stay', JP: '宿までの夜間帰宅ルート' }, { KO: '전시·시설의 휴관일과 사전 예약', EN: 'Museum closures and advance booking', JP: '施設の休館日と事前予約' }],
    disclosure: editorialDisclosure,
  },
  {
    id: 'note-danang-morning-work',
    slug: 'danang-morning-work-afternoon-sea',
    sourceType: 'editorial',
    format: 'introduction',
    publishedAt: '2026-08-08',
    photo: '/media/destinations/danang-editorial-v1.webp',
    photoAlt: { KO: '산 위를 가로지르는 다낭 골든브리지', EN: 'The Golden Bridge crossing the mountains near Da Nang', JP: 'ダナン近郊の山上に架かるゴールデンブリッジ' },
    destinationSlug: 'danang',
    anchor: 'vietnam-danang',
    dest: { KO: '다낭', EN: 'Da Nang', JP: 'ダナン' },
    country: { KO: '베트남', EN: 'Vietnam', JP: 'ベトナム' },
    title: { KO: '오전은 깊게 일하고, 오후는 바다 쪽으로', EN: 'Deep work in the morning, then move toward the sea', JP: '午前は深く働き、午後は海の方へ' },
    summary: { KO: '한 시간의 시차를 활용해 업무를 조금 일찍 시작하면 해가 남아 있을 때 산책과 식사를 즐길 수 있습니다.', EN: 'Use the one-hour time difference to start slightly earlier and keep daylight for a walk and dinner.', JP: '1時間の時差を使って少し早く仕事を始めると、日があるうちに散歩と食事を楽しめます。' },
    tip: { KO: '해변과 도심 중 어디에 머물지보다, 실제 업무 장소부터 정해보세요.', EN: 'Choose the actual place you will work before deciding between beach and city.', JP: 'ビーチか市内かを決める前に、実際に働く場所を選びましょう。' },
    author: editor,
    authorLabel: editorLabel,
    stayStyle: { KO: '5박 이상 · 일과 휴식', EN: '5+ nights · work and rest', JP: '5泊以上 · 仕事と休息' },
    season: { KO: '건기 중심 · 우기 확인', EN: 'Favor dry season · check rain', JP: '乾季中心 · 雨季を確認' },
    tags: [{ KO: '해변', EN: 'Beach', JP: 'ビーチ' }, { KO: '한 시간 시차', EN: 'One-hour gap', JP: '時差1時間' }, { KO: '장기체류', EN: 'Long stay', JP: '長期滞在' }],
    body: [{ KO: '다낭은 해변의 이미지가 강하지만, 일하는 날의 만족도는 숙소 책상과 주변 생활 편의가 결정합니다. 미케비치 인근과 도심은 분위기와 이동 방식이 달라 업무 장소를 먼저 정하는 편이 안전합니다.', EN: 'Da Nang is known for its beach, but on workdays the desk and everyday amenities matter most. The beach area and city center have different rhythms, so decide where you will actually work first.', JP: 'ダナンはビーチの印象が強いですが、仕事日の満足度は宿のデスクと生活利便性で決まります。海側と市内ではリズムが違うため、作業場所を先に決めるのが安心です。' }, { KO: '한국보다 한 시간 늦은 시차를 활용하면 오전 업무를 일찍 마무리하고 오후 일정을 만들 수 있습니다. 다만 우기에는 야외 일정이 쉽게 바뀔 수 있어 실내 대안을 함께 두는 것이 좋습니다.', EN: 'The one-hour lag from Korea can leave more of the afternoon free after an early work block. In rainy season, keep an indoor alternative ready.', JP: '韓国より1時間遅い時差を使えば、午前の仕事を早めに終えて午後の時間を作れます。雨季は屋外予定が変わりやすいので、屋内の代案も用意しましょう。' }],
    workNotes: [{ KO: '숙소 예약 전 책상 사진과 객실별 와이파이 조건을 확인하세요.', EN: 'Check desk photos and room-specific Wi-Fi before booking.', JP: '予約前にデスク写真と客室ごとのWi-Fi条件を確認してください。' }, { KO: '회의 시간은 한국 시간과 현지 시간을 함께 캘린더에 표시하세요.', EN: 'Show both Korean and local time in your calendar.', JP: 'カレンダーには韓国時間と現地時間を併記しましょう。' }],
    checkBefore: [{ KO: '우기·태풍 시기와 야외 일정 대안', EN: 'Rainy/typhoon season and indoor alternatives', JP: '雨季・台風時期と屋内の代案' }, { KO: '입국·비자 조건과 체류 목적', EN: 'Entry and visa conditions for your purpose', JP: '渡航目的に合う入国・ビザ条件' }],
    disclosure: editorialDisclosure,
  },
  {
    id: 'note-bali-slow-routine',
    slug: 'bali-build-a-slow-routine',
    sourceType: 'editorial',
    format: 'introduction',
    publishedAt: '2026-08-08',
    photo: '/media/destinations/bali-editorial-v1.webp',
    photoAlt: { KO: '물가에 자리한 발리의 전통 사원', EN: 'A traditional Balinese temple beside the water', JP: '水辺にたたずむバリの伝統寺院' },
    destinationSlug: 'bali',
    anchor: 'indonesia-bali',
    dest: { KO: '발리', EN: 'Bali', JP: 'バリ' },
    country: { KO: '인도네시아', EN: 'Indonesia', JP: 'インドネシア' },
    title: { KO: '긴 체류는 관광보다 루틴부터', EN: 'For a longer stay, build the routine before the itinerary', JP: '長期滞在は観光より、まずルーティンから' },
    summary: { KO: '업무 공간·식사·운동을 한 생활권 안에 두면, 발리의 긴 이동 시간을 줄이고 체류의 밀도를 높일 수 있습니다.', EN: 'Keep work, meals and movement inside one daily radius to reduce Bali’s long transfers and make the stay feel fuller.', JP: '仕事・食事・運動を一つの生活圏にまとめると、長い移動を減らして滞在の密度を高められます。' },
    tip: { KO: '짱구와 우붓을 매일 오가기보다 체류 목적에 맞는 한 지역을 먼저 고르세요.', EN: 'Choose one base that matches your goal instead of moving between Canggu and Ubud every day.', JP: 'チャングーとウブドを毎日往復せず、目的に合う一つの拠点を選びましょう。' },
    author: editor,
    authorLabel: editorLabel,
    stayStyle: { KO: '2주 이상 · 루틴형 체류', EN: '2+ weeks · routine-led stay', JP: '2週間以上 · 生活型滞在' },
    season: { KO: '건기 추천 · 우기 대비', EN: 'Dry season preferred', JP: '乾季がおすすめ' },
    tags: [{ KO: '장기체류', EN: 'Long stay', JP: '長期滞在' }, { KO: '웰니스', EN: 'Wellness', JP: 'ウェルネス' }, { KO: '코워킹', EN: 'Coworking', JP: 'コワーキング' }],
    body: [{ KO: '발리는 지역마다 생활 방식이 크게 다릅니다. 유명 장소를 기준으로 숙소를 고르기보다, 실제로 일할 공간과 자주 이용할 식당·운동 장소를 연결해 한 주의 생활 반경을 먼저 그려보는 것이 좋습니다.', EN: 'Daily life varies widely across Bali. Instead of choosing a stay around famous sights, map a weekly radius around the place you will work, eat and move.', JP: 'バリは地域ごとに暮らし方が大きく違います。有名スポットではなく、働く場所・食事・運動を結んだ一週間の生活圏から宿を選ぶのがおすすめです。' }, { KO: '업무일과 이동일을 분리하면 교통 체증으로 루틴이 무너지는 일을 줄일 수 있습니다. 긴 체류일수록 특별한 하루보다 반복 가능한 평일이 중요합니다.', EN: 'Separate workdays from transfer days so traffic does not break your routine. On a long stay, repeatable weekdays matter more than one spectacular day.', JP: '仕事日と移動日を分けると、渋滞でルーティンが崩れるのを減らせます。長期滞在では特別な一日より、繰り返せる平日が大切です。' }],
    workNotes: [{ KO: '코워킹 이용권과 숙소의 실제 이동 시간을 지도 앱으로 확인하세요.', EN: 'Check the real travel time between your stay and coworking space.', JP: '宿とコワーキングの実移動時間を地図で確認しましょう。' }, { KO: '정전·통신 장애를 대비해 두 번째 업무 장소를 정해두세요.', EN: 'Keep a second workspace in mind for outages or connection issues.', JP: '停電・通信障害に備えて第二の作業場所を決めておきましょう。' }],
    checkBefore: [{ KO: '체류 기간에 맞는 비자와 원격 업무 가능 범위', EN: 'Visa and remote-work conditions for your stay length', JP: '滞在期間に合うビザとリモートワーク条件' }, { KO: '우기 침수·교통과 여행자 보험', EN: 'Rainy-season transport and travel insurance', JP: '雨季の交通事情と旅行保険' }],
    disclosure: editorialDisclosure,
  },
  {
    id: 'note-osaka-friday-night',
    slug: 'osaka-friday-after-work',
    sourceType: 'editorial',
    format: 'introduction',
    publishedAt: '2026-08-08',
    photo: '/media/destinations/osaka-editorial-v1.webp',
    photoAlt: { KO: '쓰텐카쿠가 보이는 오사카 신세카이 거리', EN: 'Shinsekai street in Osaka with Tsutenkaku tower', JP: '通天閣を望む大阪・新世界の街並み' },
    destinationSlug: 'osaka',
    anchor: 'japan-osaka',
    dest: { KO: '오사카', EN: 'Osaka', JP: '大阪' },
    country: { KO: '일본', EN: 'Japan', JP: '日本' },
    title: { KO: '금요일 마감 뒤, 골목에서 시작하는 주말', EN: 'After Friday’s deadline, let the weekend start in the side streets', JP: '金曜の締切後、路地から始まる週末' },
    summary: { KO: '업무일에는 우메다·혼마치처럼 이동이 편한 곳에 머물고, 저녁에 한 동네씩 깊게 걷는 구성이 실용적입니다.', EN: 'Stay somewhere practical for work, such as Umeda or Hommachi, then explore one neighborhood at a time after hours.', JP: '仕事日は梅田・本町など移動しやすい場所に滞在し、夜は一つの街を深く歩く構成が実用的です。' },
    tip: { KO: '금요일 밤과 주말 낮의 혼잡도가 달라 식사 시간에 여유를 두세요.', EN: 'Friday night and weekend daytime crowds differ, so leave room around meal times.', JP: '金曜夜と週末昼では混雑が違うため、食事時間に余裕を持ちましょう。' },
    author: editor,
    authorLabel: editorLabel,
    stayStyle: { KO: '2~4박 · 친구와 짧게', EN: '2–4 nights · short trip with friends', JP: '2〜4泊 · 友人との短い旅' },
    season: { KO: '봄·가을 추천 · 여름 더위', EN: 'Spring/autumn · hot summers', JP: '春・秋がおすすめ · 夏は暑い' },
    tags: [{ KO: '미식', EN: 'Food', JP: 'グルメ' }, { KO: '친구 여행', EN: 'Friends', JP: '友人旅' }, { KO: '주말', EN: 'Weekend', JP: '週末' }],
    body: [{ KO: '오사카는 짧은 여행에서도 선택지가 많지만, 일과 함께라면 이동 축을 줄이는 것이 중요합니다. 숙소를 우메다·혼마치 등 주요 노선 가까이에 두면 업무 뒤 저녁 시간을 확보하기 쉽습니다.', EN: 'Osaka offers plenty even on a short trip, but working travelers benefit from a smaller transport radius. A stay near major lines around Umeda or Hommachi preserves more of the evening.', JP: '大阪は短い旅でも選択肢が多い街ですが、仕事を伴うなら移動軸を絞ることが大切です。梅田・本町など主要路線の近くに泊まると、仕事後の時間を確保しやすくなります。' }, { KO: '금요일에는 일을 끝낸 뒤 한 동네에서 식사와 산책을 이어가고, 주말에만 멀리 이동하는 구성이 좋습니다. 인기 식당보다 대기 시간과 귀가 동선을 함께 보는 편이 실제 만족도를 높입니다.', EN: 'On Friday, keep dinner and a walk in one neighborhood, saving longer transfers for the weekend. Wait times and the route home often matter more than a famous restaurant name.', JP: '金曜は仕事後に一つの街で食事と散歩を続け、遠出は週末に。人気店の名前より待ち時間と帰宅動線を一緒に見る方が満足度につながります。' }],
    workNotes: [{ KO: '숙소 체크인 전 업무가 있다면 라운지 이용 조건을 확인하세요.', EN: 'If you need to work before check-in, confirm lounge access.', JP: 'チェックイン前に仕事がある場合はラウンジ利用条件を確認してください。' }, { KO: '짐이 많다면 환승 수보다 역 출구의 엘리베이터 동선을 먼저 보세요.', EN: 'With luggage, check elevator routes at exits—not just transfer counts.', JP: '荷物が多い場合は、乗換回数より駅出口のエレベーター動線を確認しましょう。' }],
    checkBefore: [{ KO: '식당 예약·대기와 마지막 열차 시간', EN: 'Restaurant queues/reservations and last train times', JP: '飲食店の予約・待ち時間と終電' }, { KO: '숙소의 책상·라운지 이용 가능 시간', EN: 'Desk and lounge availability at the stay', JP: '宿のデスク・ラウンジ利用時間' }],
    disclosure: editorialDisclosure,
  },
]

/** Backward-compatible export for the home rail while its UI migrates to Traveler Notes. */
export const MOMENTS = TRAVELER_NOTES

export function getTravelerNote(slug: string) {
  return TRAVELER_NOTES.find((note) => note.slug === slug)
}
