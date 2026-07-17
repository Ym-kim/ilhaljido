import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 1주 워케이션 플랜 — 트리플 '일정→커머스' 벤치의 에디토리얼 번안 (2026-07-18)
// 파일럿 4도시(도쿄·발리·치앙마이·다낭). 카피는 guides.ts 검증 동네(시부야·짱구·
// 님만해민·안트엉)·cities.ts 검증 데이터 기반 + 일반 상식 수준만.
// 각 날의 링크는 기존 제휴 필드(cities.ts esim/transfer/activity/railPass)를 참조 —
// linkKey로 연결해 신규 URL 0. 조작 소셜프루프(담은 수 등) 없음.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

export type PlanDay = {
  day: L                 // 요일 라벨
  title: L
  desc: L
  /** cities.ts 링크 필드 참조 (실제 href는 렌더 시 도시 데이터에서) */
  linkKey?: 'esimHref' | 'transferHref' | 'activityHref' | 'railPassHref' | 'hotelBookingHref'
  linkLabel?: L
}

const DAYS: L[] = [
  { KO: '월', EN: 'Mon', JP: '月' },
  { KO: '화', EN: 'Tue', JP: '火' },
  { KO: '수', EN: 'Wed', JP: '水' },
  { KO: '목', EN: 'Thu', JP: '木' },
  { KO: '금', EN: 'Fri', JP: '金' },
]

const d = (i: number, title: L, desc: L, linkKey?: PlanDay['linkKey'], linkLabel?: L): PlanDay => ({
  day: DAYS[i], title, desc, linkKey, linkLabel,
})

export const WEEKLY_PLANS: Record<string, PlanDay[]> = {
  tokyo: [
    d(0,
      { KO: '도착 & 셋업', EN: 'Arrive & set up', JP: '到着＆セットアップ' },
      { KO: '공항에서 숙소로 이동하고 eSIM 연결. 저녁엔 숙소 주변 편의점·동네 파악으로 가볍게.', EN: 'Transfer to your stay, connect your eSIM, and scout the neighborhood.', JP: '宿へ移動しeSIMを接続。夜は周辺を軽く散策。' },
      'transferHref', { KO: '공항 픽업 예약', EN: 'Book pickup', JP: '送迎を予約' },
    ),
    d(1,
      { KO: '시부야 몰입 워크', EN: 'Deep work in Shibuya', JP: '渋谷で集中ワーク' },
      { KO: '시차 0시간의 장점을 살려 평소 리듬 그대로. 코워킹 내장 숙소나 카페에서 집중 블록.', EN: 'Zero jet lag — keep your normal rhythm with focus blocks at a coworking floor or café.', JP: '時差ゼロの利点でいつものリズムのまま集中。' },
      'hotelBookingHref', { KO: '코워킹 숙소 보기', EN: 'See work-ready stays', JP: '宿を見る' },
    ),
    d(2,
      { KO: '오전 업무 + 오후 시내 탐험', EN: 'Work AM, explore PM', JP: '午前は仕事、午後は街歩き' },
      { KO: '오전 집중 후 오후엔 지하철 패스로 가볍게 시내 한 바퀴. 저녁 약속도 부담 없이.', EN: 'After a focused morning, hop around town on a subway pass.', JP: '午前集中後、地下鉄パスで街をひと回り。' },
      'railPassHref', { KO: '지하철 패스 보기', EN: 'See subway pass', JP: '地下鉄パスを見る' },
    ),
    d(3,
      { KO: '딥워크 데이', EN: 'Deep work day', JP: 'ディープワークの日' },
      { KO: '주 후반 스퍼트. 화상회의도 무리 없는 인터넷 환경에서 밀린 업무를 정리.', EN: 'Late-week sprint on internet solid enough for every call.', JP: '週後半のスパート。ネット環境は会議も余裕。' },
    ),
    d(4,
      { KO: '마무리 + 주말 채비', EN: 'Wrap up & weekend prep', JP: '締め＆週末準備' },
      { KO: '업무를 일찍 마감하고 주말 근교 계획. 체험·투어를 미리 담아두면 아침이 편합니다.', EN: 'Close early and line up weekend activities in advance.', JP: '早めに切り上げ、週末の体験を予約。' },
      'activityHref', { KO: '주말 체험 담기', EN: 'Pick weekend activities', JP: '週末の体験を選ぶ' },
    ),
  ],
  bali: [
    d(0,
      { KO: '도착 & 셋업', EN: 'Arrive & set up', JP: '到着＆セットアップ' },
      { KO: '응우라라이 공항에서 픽업으로 숙소 직행, eSIM 연결. 첫날은 시차·이동 피로 회복이 우선.', EN: 'Private pickup from the airport, eSIM on, and rest — recovery first.', JP: '空港送迎で宿へ直行、eSIM接続。初日は回復優先。' },
      'transferHref', { KO: '공항 픽업 예약', EN: 'Book pickup', JP: '送迎を予約' },
    ),
    d(1,
      { KO: '짱구 코워킹 리듬', EN: 'Canggu coworking rhythm', JP: 'チャングーでコワーキング' },
      { KO: '노마드 성지 짱구에서 오전 집중. 카페별 인터넷 편차가 있으니 코워킹 위주가 안전합니다.', EN: 'Morning focus in Canggu — coworking beats cafés for reliable internet.', JP: 'チャングーで午前集中。ネットはコワーキングが安心。' },
      'hotelBookingHref', { KO: '코워킹 숙소 보기', EN: 'See work-ready stays', JP: '宿を見る' },
    ),
    d(2,
      { KO: '오전 업무 + 선셋 리셋', EN: 'Work AM, sunset reset', JP: '午前仕事、夕方リセット' },
      { KO: '한국과 1시간 차라 오전 미팅도 무리 없음. 업무 후 해변 선셋으로 리셋.', EN: 'Only 1h behind Korea — meetings fit fine. Reset at the beach after work.', JP: '韓国と1時間差で会議も問題なし。夕方はビーチへ。' },
    ),
    d(3,
      { KO: '딥워크 + 우붓 무드', EN: 'Deep work + Ubud mood', JP: 'ディープワーク＋ウブド' },
      { KO: '집중 블록 후 저녁은 로컬 와룽에서. 주말 우붓行을 계획해 두면 좋습니다.', EN: 'Focus blocks, then a local warung dinner. Plan a weekend Ubud trip.', JP: '集中後はローカル食堂へ。週末はウブドへ計画を。' },
    ),
    d(4,
      { KO: '마무리 + 주말 체험 예약', EN: 'Wrap up & book the weekend', JP: '締め＆週末予約' },
      { KO: '금요일 일찍 마감하고 주말 투어·액티비티 확정. 건기(4~10월)엔 야외 일정이 최고입니다.', EN: 'Close early Friday and lock in weekend tours — dry season is for the outdoors.', JP: '金曜は早めに終え、週末ツアーを確定。' },
      'activityHref', { KO: '주말 체험 담기', EN: 'Pick weekend activities', JP: '週末の体験を選ぶ' },
    ),
  ],
  chiangmai: [
    d(0,
      { KO: '도착 & 셋업', EN: 'Arrive & set up', JP: '到着＆セットアップ' },
      { KO: '치앙마이 공항은 시내와 가까워 이동이 짧습니다. eSIM 연결하고 님만 주변 파악.', EN: 'A short hop from airport to town — connect eSIM and scout Nimman.', JP: '空港から市内はすぐ。eSIMを接続しニマンを散策。' },
      'transferHref', { KO: '공항 픽업 예약', EN: 'Book pickup', JP: '送迎を予約' },
    ),
    d(1,
      { KO: '님만해민 카페 워크', EN: 'Nimman café work', JP: 'ニマンでカフェワーク' },
      { KO: '노마드 1번지 님만해민의 카페·코워킹(50~100Mbps)에서 오전 집중 블록.', EN: 'Morning focus at Nimman cafés and coworking (50–100Mbps).', JP: 'ニマンのカフェ・コワーキングで午前集中。' },
      'hotelBookingHref', { KO: '님만 근처 숙소', EN: 'Stays near Nimman', JP: 'ニマン周辺の宿' },
    ),
    d(2,
      { KO: '오전 업무 + 올드타운 산책', EN: 'Work AM, Old Town PM', JP: '午前仕事、旧市街歩き' },
      { KO: '한국과 2시간 차 — 오후 이른 마감 후 올드타운 사원 산책과 로컬 카페.', EN: 'Two hours behind Korea — finish early and wander Old Town temples.', JP: '韓国と2時間差。早めに終えて旧市街へ。' },
    ),
    d(3,
      { KO: '딥워크 데이', EN: 'Deep work day', JP: 'ディープワークの日' },
      { KO: '저비용·고품질 환경의 진가는 평일 집중에서. 저녁은 나이트 바자에서 현금 준비.', EN: "Where Chiang Mai shines: focused weekdays. Night bazaar after — bring cash.", JP: '平日集中にこそ真価。夜はナイトバザールへ（現金を）。' },
    ),
    d(4,
      { KO: '마무리 + 주말 근교', EN: 'Wrap up & weekend trips', JP: '締め＆週末の郊外' },
      { KO: '금요일 마감 후 주말 코끼리 보호구역·도이수텝 등 근교 체험을 예약해 두세요.', EN: 'Book weekend trips — sanctuaries, Doi Suthep and more.', JP: '週末の郊外体験（象保護区など）を予約。' },
      'activityHref', { KO: '주말 체험 담기', EN: 'Pick weekend activities', JP: '週末の体験を選ぶ' },
    ),
  ],
  danang: [
    d(0,
      { KO: '도착 & 셋업', EN: 'Arrive & set up', JP: '到着＆セットアップ' },
      { KO: '다낭 공항은 시내까지 10분대. 픽업으로 숙소 직행 후 eSIM 연결, 미케비치 산책.', EN: 'Airport to town in ~10 minutes. Pickup, eSIM, then a My Khe stroll.', JP: '空港から市内は10分台。送迎→eSIM→ミーケー散歩。' },
      'transferHref', { KO: '공항 픽업 예약', EN: 'Book pickup', JP: '送迎を予約' },
    ),
    d(1,
      { KO: '안트엉 카페 워크', EN: 'An Thuong café work', JP: 'アントゥオンでカフェワーク' },
      { KO: '안트엉 카페 거리(50~80Mbps)에서 오전 집중. 해변 도보 생활권이라 리듬 만들기 쉽습니다.', EN: 'Morning focus on the An Thuong café strip (50–80Mbps), beach at your doorstep.', JP: 'アントゥオンのカフェ通りで午前集中。' },
      'hotelBookingHref', { KO: '비치 근처 숙소', EN: 'Stays near the beach', JP: 'ビーチ近くの宿' },
    ),
    d(2,
      { KO: '오전 업무 + 해변 리셋', EN: 'Work AM, beach reset', JP: '午前仕事、ビーチでリセット' },
      { KO: '한국과 2시간 차로 오전 협업 무리 없음. 퇴근 후 미케비치 선셋.', EN: 'Two hours behind Korea — collaboration fits. Sunset at My Khe after work.', JP: '韓国と2時間差で協業も問題なし。夕方はミーケーへ。' },
    ),
    d(3,
      { KO: '딥워크 데이', EN: 'Deep work day', JP: 'ディープワークの日' },
      { KO: '최저 생활비 도시에서 집중 스퍼트. 저녁은 로컬 식당 — 현금을 준비하세요.', EN: 'Sprint in the cheapest city on our list. Cash for local dinners.', JP: '最安都市で集中スパート。夜は現金でローカル飯。' },
    ),
    d(4,
      { KO: '마무리 + 주말 계획', EN: 'Wrap up & plan the weekend', JP: '締め＆週末計画' },
      { KO: '금요일 일찍 마감하고 바나힐·호이안 등 주말 체험을 예약해 두세요.', EN: 'Close early and book Ba Na Hills or Hoi An for the weekend.', JP: 'バーナーヒルズやホイアンを予約。' },
      'activityHref', { KO: '주말 체험 담기', EN: 'Pick weekend activities', JP: '週末の体験を選ぶ' },
    ),
  ],
}

export const PLAN_UI: Record<string, L> = {
  title: { KO: '1주 워케이션 플랜', EN: 'One-week workation plan', JP: '1週間ワーケーションプラン' },
  sub: {
    KO: '월~금 에디터 추천 리듬 — 그대로 따라도, 골라 써도 좋습니다.',
    EN: 'An editor-suggested Mon–Fri rhythm — follow it or cherry-pick.',
    JP: '月〜金のおすすめリズム — そのままでも、部分採用でも。',
  },
}
