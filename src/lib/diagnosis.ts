import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// Wakation Tools · 참가자 진단 & 실행 리포트 — 룰베이스 (API 호출 0, 서버 비용 0)
//
// 5문항 → 참가자 유형 4종 매칭 + 답변 조합별 실행 체크리스트 생성.
// 추천 링크는 전부 실존 페이지만. 체크 상태는 클라이언트 localStorage에 저장.
// ─────────────────────────────────────────────────────────────────────────────

export type Goal = 'focus' | 'explore' | 'recharge' | 'connect'
export type WorkStyle = 'sync' | 'deep' | 'field'
export type StayLength = 'short' | 'mid' | 'long'
export type Party = 'solo' | 'team'
export type Concern = 'env' | 'balance' | 'cost' | 'adapt'

export type DiagnosisAnswers = {
  goal: Goal
  workStyle: WorkStyle
  stayLength: StayLength
  party: Party
  concern: Concern
}

type L = Record<Lang, string>

export const DIAGNOSIS_QUESTIONS: {
  key: keyof DiagnosisAnswers
  label: L
  options: { value: string; label: L }[]
}[] = [
  {
    key: 'goal',
    label: {
      KO: '이번 워케이션에서 가장 얻고 싶은 것은?',
      EN: 'What do you most want from this workation?',
      JP: '今回のワーケーションで一番得たいものは？',
    },
    options: [
      { value: 'focus', label: { KO: '밀린 프로젝트에 집중 몰입', EN: 'Deep focus on a big project', JP: '溜まったプロジェクトに集中' } },
      { value: 'explore', label: { KO: '새 시장·아이템 리서치', EN: 'Research a new market or idea', JP: '新しい市場·アイテムのリサーチ' } },
      { value: 'recharge', label: { KO: '번아웃 회복과 재충전', EN: 'Recover from burnout and recharge', JP: '燃え尽きからの回復と充電' } },
      { value: 'connect', label: { KO: '사람과 네트워킹', EN: 'People and networking', JP: '人とのネットワーキング' } },
    ],
  },
  {
    key: 'workStyle',
    label: {
      KO: '평소 일하는 방식에 가까운 것은?',
      EN: 'Which is closest to how you usually work?',
      JP: '普段の働き方に近いのは？',
    },
    options: [
      { value: 'sync', label: { KO: '회의·실시간 협업이 많다', EN: 'Lots of meetings and real-time collab', JP: '会議·リアルタイム協業が多い' } },
      { value: 'deep', label: { KO: '혼자 집중하는 작업이 많다', EN: 'Mostly solo focused work', JP: '一人で集中する作業が多い' } },
      { value: 'field', label: { KO: '미팅·현장 이동이 많다', EN: 'Frequent meetings and site visits', JP: 'ミーティング·現場移動が多い' } },
    ],
  },
  {
    key: 'stayLength',
    label: {
      KO: '계획 중인 기간은?',
      EN: 'How long are you planning to stay?',
      JP: '計画中の期間は？',
    },
    options: [
      { value: 'short', label: { KO: '3~4일', EN: '3–4 days', JP: '3〜4日' } },
      { value: 'mid', label: { KO: '1~2주', EN: '1–2 weeks', JP: '1〜2週間' } },
      { value: 'long', label: { KO: '한 달 이상', EN: 'A month or more', JP: '1カ月以上' } },
    ],
  },
  {
    key: 'party',
    label: {
      KO: '누구와 떠나시나요?',
      EN: 'Who are you going with?',
      JP: '誰と行きますか？',
    },
    options: [
      { value: 'solo', label: { KO: '혼자', EN: 'Solo', JP: '一人で' } },
      { value: 'team', label: { KO: '팀·동료와 함께', EN: 'With my team or colleagues', JP: 'チーム·同僚と一緒に' } },
    ],
  },
  {
    key: 'concern',
    label: {
      KO: '가장 걱정되는 부분은?',
      EN: 'What worries you the most?',
      JP: '一番心配なことは？',
    },
    options: [
      { value: 'env', label: { KO: '업무 환경 (와이파이·좌석)', EN: 'Work setup (Wi-Fi, desk)', JP: '仕事環境（Wi-Fi·席）' } },
      { value: 'balance', label: { KO: '일과 휴식의 균형', EN: 'Work–rest balance', JP: '仕事と休みのバランス' } },
      { value: 'cost', label: { KO: '비용', EN: 'Cost', JP: '費用' } },
      { value: 'adapt', label: { KO: '언어·현지 적응', EN: 'Language and settling in', JP: '言語·現地への適応' } },
    ],
  },
]

// ── 참가자 유형 ───────────────────────────────────────────────────────────────

export type ProfileId = 'deepwork' | 'explorer' | 'recovery' | 'connector'

export type RecLink = { href: string; label: L; why: L }

export type DiagnosisProfile = {
  id: ProfileId
  emoji: string
  name: L
  tagline: L
  desc: L
  /** 유형별 하루 리듬 제안 (사실 보증이 필요 없는 실행 팁만) */
  rhythm: L
  recs: RecLink[]
}

export const PROFILES: Record<ProfileId, DiagnosisProfile> = {
  deepwork: {
    id: 'deepwork',
    emoji: '🎯',
    name: { KO: '딥워크 몰입형', EN: 'Deep-work type', JP: 'ディープワーク型' },
    tagline: {
      KO: '방해 없는 오전, 성과로 끝나는 오후',
      EN: 'Uninterrupted mornings, afternoons that end in results',
      JP: '邪魔のない午前、成果で終わる午後',
    },
    desc: {
      KO: '환경을 바꿔 집중의 밀도를 끌어올리는 유형이에요. 조용한 소도시나 작업 환경이 검증된 숙소에서 가장 큰 효과를 봅니다.',
      EN: 'You raise your focus by changing your environment. Quiet towns and stays with a proven work setup suit you best.',
      JP: '環境を変えて集中の密度を上げるタイプ。静かな小都市や作業環境が確かな宿で最も効果を発揮します。',
    },
    rhythm: {
      KO: '오전 3시간 딥워크 블록 고정 → 점심 산책 → 오후 회의·가벼운 업무 → 저녁은 완전히 오프',
      EN: 'Lock a 3-hour morning deep-work block → walk at lunch → lighter work after → fully off in the evening',
      JP: '午前3時間の集中ブロック固定 → 昼の散歩 → 午後は軽い業務 → 夜は完全オフ',
    },
    recs: [
      {
        href: '/programs/onsen',
        label: { KO: '일본 소도시 워케이션', EN: 'Japan small-town workation', JP: '日本の小都市ワーケーション' },
        why: { KO: '온천 소도시의 조용한 몰입 환경', EN: 'Quiet immersion in onsen towns', JP: '温泉街の静かな没入環境' },
      },
      {
        href: '/select/hotel',
        label: { KO: '작업하기 좋은 숙소 찾기', EN: 'Find work-friendly stays', JP: '仕事しやすい宿を探す' },
        why: { KO: '코리빙·장기 체류형 숙소 큐레이션', EN: 'Curated co-living and long-stay options', JP: 'コリビング·長期滞在型の宿を厳選' },
      },
      {
        href: '/programs/healing',
        label: { KO: '힐링 프로그램', EN: 'Healing programs', JP: 'ヒーリングプログラム' },
        why: { KO: '몰입 뒤의 회복 루틴까지 설계', EN: 'Recovery routines after deep focus', JP: '没入後の回復ルーティンまで設計' },
      },
    ],
  },
  explorer: {
    id: 'explorer',
    emoji: '🧭',
    name: { KO: '현장 탐색형', EN: 'Field-explorer type', JP: '現場探索型' },
    tagline: {
      KO: '책상 밖에서 답을 찾는 사람',
      EN: 'You find answers outside the desk',
      JP: 'デスクの外で答えを見つける人',
    },
    desc: {
      KO: '현지 시장과 사람을 직접 보며 기회를 검증하는 유형이에요. 이동과 미팅이 잦아, 일정과 기록 관리가 성패를 가릅니다.',
      EN: 'You validate opportunities by seeing markets and people first-hand. With frequent moves and meetings, schedule and note discipline decide the outcome.',
      JP: '現地の市場と人を直接見て機会を検証するタイプ。移動とミーティングが多く、日程と記録の管理が成否を分けます。',
    },
    rhythm: {
      KO: '오전 리서치·미팅 준비 → 낮 현장 방문 → 저녁 그날의 발견을 노트 1페이지로 정리',
      EN: 'Prep and research in the morning → field visits by day → one page of findings every evening',
      JP: '午前は準備·リサーチ → 日中は現場訪問 → 夜はその日の発見を1ページに整理',
    },
    recs: [
      {
        href: '/programs/market',
        label: { KO: '해외 시장조사 프로그램', EN: 'Market-research programs', JP: '海外市場調査プログラム' },
        why: { KO: '리서치 동선이 설계된 현장 프로그램', EN: 'Field programs with a designed research route', JP: 'リサーチ動線が設計された現地プログラム' },
      },
      {
        href: '/programs/global',
        label: { KO: '글로벌 워케이션', EN: 'Global workation', JP: 'グローバルワーケーション' },
        why: { KO: '도시별 특성과 숙소를 한 번에 비교', EN: 'Compare cities and stays at a glance', JP: '都市の特性と宿を一度に比較' },
      },
      {
        href: '/visa-ai',
        label: { KO: 'AI 비자 도우미', EN: 'AI visa assistant', JP: 'AIビザアシスタント' },
        why: { KO: '체류·비자 조건을 미리 점검', EN: 'Check stay and visa conditions in advance', JP: '滞在·ビザ条件を事前チェック' },
      },
    ],
  },
  recovery: {
    id: 'recovery',
    emoji: '🌿',
    name: { KO: '리커버리 밸런스형', EN: 'Recovery-balance type', JP: 'リカバリーバランス型' },
    tagline: {
      KO: '일을 지키면서 나를 회복하는 시간',
      EN: 'Keep the work, recover yourself',
      JP: '仕事を守りながら自分を回復する時間',
    },
    desc: {
      KO: '성과보다 지속가능한 리듬이 필요한 시기예요. 업무량을 평소의 70%로 잡고, 회복 루틴을 일정에 먼저 배치하는 것이 핵심입니다.',
      EN: 'Right now a sustainable rhythm matters more than output. Plan for ~70% of your usual workload and put recovery routines on the calendar first.',
      JP: '成果より持続可能なリズムが必要な時期。仕事量を普段の70%にし、回復ルーティンを先に予定へ入れるのが鍵です。',
    },
    rhythm: {
      KO: '늦은 오전 시작 → 핵심 업무만 처리 → 오후는 자연·온천·산책 → 저녁 일찍 마무리',
      EN: 'Start late morning → essentials only → nature, onsen or walks in the afternoon → wrap up early',
      JP: '遅めの午前スタート → コア業務のみ → 午後は自然·温泉·散歩 → 夜は早めに終了',
    },
    recs: [
      {
        href: '/programs/healing',
        label: { KO: '힐링 워케이션', EN: 'Healing workation', JP: 'ヒーリングワーケーション' },
        why: { KO: '회복 중심으로 설계된 프로그램', EN: 'Programs designed around recovery', JP: '回復を中心に設計されたプログラム' },
      },
      {
        href: '/programs/onsen',
        label: { KO: '료칸·온천 소도시', EN: 'Ryokan and onsen towns', JP: '旅館·温泉の小都市' },
        why: { KO: '하루를 온천으로 마무리하는 체류', EN: 'End each day at the onsen', JP: '一日を温泉で締めくくる滞在' },
      },
      {
        href: '/programs/domestic',
        label: { KO: '국내 워케이션', EN: 'Domestic workation', JP: '国内ワーケーション' },
        why: { KO: '이동 부담 없이 바로 시작하는 회복', EN: 'Recovery that starts without travel stress', JP: '移動の負担なくすぐ始める回復' },
      },
    ],
  },
  connector: {
    id: 'connector',
    emoji: '🤝',
    name: { KO: '커넥트 성장형', EN: 'Connector type', JP: 'コネクト成長型' },
    tagline: {
      KO: '함께 일할 때 더 멀리 가는 사람',
      EN: 'You go further when you go together',
      JP: '共に働くことでより遠くへ行く人',
    },
    desc: {
      KO: '사람과의 연결에서 에너지와 기회를 얻는 유형이에요. 팀 워크숍이나 네트워킹형 프로그램에서 체류 가치가 가장 커집니다.',
      EN: 'You draw energy and opportunity from connection. Team offsites and networking programs give you the most value per stay.',
      JP: '人との繋がりからエネルギーと機会を得るタイプ。チームワークショップやネットワーキング型プログラムで滞在価値が最大化します。',
    },
    rhythm: {
      KO: '오전 개인 업무 → 오후 세션·협업 → 저녁 밋업이나 팀 대화로 하루의 발견 공유',
      EN: 'Solo work in the morning → sessions and collab after → share the day’s finds over an evening meetup',
      JP: '午前は個人業務 → 午後はセッション·協業 → 夜はミートアップやチームの対話で共有',
    },
    recs: [
      {
        href: '/programs/networking',
        label: { KO: '네트워킹 워케이션', EN: 'Networking workation', JP: 'ネットワーキングワーケーション' },
        why: { KO: '연결이 목적인 사람들과 한 공간에', EN: 'One space with people here to connect', JP: '繋がりが目的の人々と同じ空間に' },
      },
      {
        href: '/programs/local',
        label: { KO: '로컬 커뮤니티 프로그램', EN: 'Local community programs', JP: 'ローカルコミュニティプログラム' },
        why: { KO: '지역과 함께 일하는 체류', EN: 'Stays that work with the local community', JP: '地域と共に働く滞在' },
      },
      {
        href: '/programs',
        label: { KO: '모집 중인 프로그램 보기', EN: 'See open programs', JP: '募集中のプログラムを見る' },
        why: { KO: '지금 신청 가능한 회차 확인', EN: 'Check cohorts open right now', JP: '今申し込める回を確認' },
      },
    ],
  },
}

// ── 실행 체크리스트 ───────────────────────────────────────────────────────────

export type ChecklistPhase = 'before' | 'during' | 'after'

export type ChecklistItem = {
  id: string
  phase: ChecklistPhase
  text: L
  href?: string
  hrefLabel?: L
}

export const PHASE_LABEL: Record<ChecklistPhase, L> = {
  before: { KO: '떠나기 전', EN: 'Before you go', JP: '出発前' },
  during: { KO: '체류 중', EN: 'During the stay', JP: '滞在中' },
  after: { KO: '돌아온 후', EN: 'After you return', JP: '帰国後' },
}

/** 답변 조합으로 맞춤 체크리스트 생성 — 항목별 노출 조건은 코드가 문서 */
export function buildChecklist(a: DiagnosisAnswers): ChecklistItem[] {
  const items: ChecklistItem[] = []
  const add = (item: ChecklistItem) => items.push(item)

  // 떠나기 전
  add({
    id: 'b-goal',
    phase: 'before',
    text: {
      KO: '이번 체류의 목표를 한 줄로 정의하기 (예: "신규 기능 기획서 완성")',
      EN: 'Define this stay’s goal in one line (e.g. “finish the feature spec”)',
      JP: '今回の滞在目標を一行で定義（例：「新機能の企画書を完成」）',
    },
  })
  add({
    id: 'b-wifi',
    phase: 'before',
    text: {
      KO: a.concern === 'env'
        ? '숙소 와이파이·작업 좌석을 최근 후기로 반드시 확인 (가장 큰 걱정이라면 예약 전 필수)'
        : '숙소 와이파이·작업 좌석을 최근 후기로 확인',
      EN: a.concern === 'env'
        ? 'Verify Wi-Fi and desk setup from recent reviews — essential before booking'
        : 'Check Wi-Fi and desk setup in recent reviews',
      JP: a.concern === 'env'
        ? '宿のWi-Fi·作業席を最新レビューで必ず確認（予約前必須）'
        : '宿のWi-Fi·作業席を最新レビューで確認',
    },
    href: '/select/hotel',
    hrefLabel: { KO: '숙소 보기', EN: 'See stays', JP: '宿を見る' },
  })
  if (a.workStyle === 'sync') {
    add({
      id: 'b-coretime',
      phase: 'before',
      text: {
        KO: '팀에 코어타임(실시간 응답 시간대)을 미리 공지하기',
        EN: 'Announce your core hours (real-time response window) to the team',
        JP: 'コアタイム（リアルタイム対応の時間帯）をチームに事前共有',
      },
    })
  }
  add({
    id: 'b-esim',
    phase: 'before',
    text: {
      KO: '데이터 eSIM 준비 — 도착 직후부터 끊김 없이',
      EN: 'Get a data eSIM — connected from the moment you land',
      JP: 'データeSIMを準備 — 到着直後から途切れなく',
    },
    href: '/select/esim',
    hrefLabel: { KO: 'eSIM 보기', EN: 'See eSIMs', JP: 'eSIMを見る' },
  })
  if (a.concern === 'cost') {
    add({
      id: 'b-support',
      phase: 'before',
      text: {
        KO: '지자체 워케이션 지원사업 확인 — 숙박·체험비를 지원받을 수 있어요',
        EN: 'Check local-government workation support programs for stay subsidies',
        JP: '自治体のワーケーション支援事業を確認 — 宿泊·体験費の支援も',
      },
      href: '/programs/support',
      hrefLabel: { KO: '지원사업 보기', EN: 'See programs', JP: '支援事業を見る' },
    })
  }
  if (a.stayLength === 'long' || a.concern === 'adapt') {
    add({
      id: 'b-visa',
      phase: 'before',
      text: {
        KO: '비자·체류 조건 확인 — 국가별 무비자 기간과 규정이 달라요',
        EN: 'Check visa and stay rules — visa-free windows differ by country',
        JP: 'ビザ·滞在条件を確認 — 国ごとに規定が異なります',
      },
      href: '/visa-ai',
      hrefLabel: { KO: 'AI 비자 도우미', EN: 'AI visa assistant', JP: 'AIビザアシスタント' },
    })
  }

  // 체류 중
  if (a.goal === 'focus' || a.workStyle === 'deep') {
    add({
      id: 'd-deepblock',
      phase: 'during',
      text: {
        KO: '오전 3시간 집중 블록을 캘린더에 고정하고 알림 끄기',
        EN: 'Lock a 3-hour morning focus block and silence notifications',
        JP: '午前3時間の集中ブロックを固定し、通知オフ',
      },
    })
  }
  if (a.workStyle === 'sync') {
    add({
      id: 'd-sync',
      phase: 'during',
      text: {
        KO: '회의는 코어타임에 몰아서 잡고, 전후 시간은 이동·휴식으로',
        EN: 'Batch meetings into core hours; keep the edges for moving and resting',
        JP: '会議はコアタイムにまとめ、前後は移動·休憩に',
      },
    })
  }
  if (a.goal === 'explore' || a.workStyle === 'field') {
    add({
      id: 'd-field',
      phase: 'during',
      text: {
        KO: '현장 방문·인터뷰 기록은 그날 저녁에 바로 정리하기',
        EN: 'Write up field visits and interviews the same evening',
        JP: '現場訪問·インタビューの記録はその日の夜に整理',
      },
    })
  }
  if (a.goal === 'connect' || a.party === 'team') {
    add({
      id: 'd-meet',
      phase: 'during',
      text: {
        KO: a.party === 'team'
          ? '주 1회 팀 회고 시간 잡기 — 발견과 막힌 것 공유'
          : '현지 밋업·커뮤니티 행사 1회 이상 참여해 보기',
        EN: a.party === 'team'
          ? 'Hold a weekly team retro — share finds and blockers'
          : 'Join at least one local meetup or community event',
        JP: a.party === 'team'
          ? '週1回チームの振り返り — 発見と課題を共有'
          : '現地ミートアップ·コミュニティに1回以上参加',
      },
    })
  }
  if (a.goal === 'recharge' || a.concern === 'balance') {
    add({
      id: 'd-rest',
      phase: 'during',
      text: {
        KO: '업무 종료 시간을 정하고, 끝나면 노트북 닫는 리추얼 지키기',
        EN: 'Set a hard stop time and keep a laptop-closing ritual',
        JP: '業務終了時間を決め、終わったらPCを閉じる儀式を守る',
      },
    })
  }
  add({
    id: 'd-log',
    phase: 'during',
    text: {
      KO: '매일 성과·배운 것을 3줄로 기록하기 (리포트의 재료)',
      EN: 'Log outcomes and learnings in 3 lines a day (fuel for your report)',
      JP: '毎日成果·学びを3行で記録（レポートの材料に）',
    },
  })

  // 돌아온 후
  add({
    id: 'a-report',
    phase: 'after',
    text: {
      KO: '목표 대비 결과를 정리한 리포트 작성 — 매일 기록한 3줄을 모으면 끝',
      EN: 'Write a results-vs-goal report — your daily 3-liners are the draft',
      JP: '目標に対する結果レポートを作成 — 毎日の3行を集めるだけ',
    },
  })
  if (a.party === 'team') {
    add({
      id: 'a-share',
      phase: 'after',
      text: {
        KO: '팀에 결과 공유하고, 계속 적용할 것 1가지 정하기',
        EN: 'Share results with the team and pick one practice to keep',
        JP: 'チームに結果を共有し、続けることを1つ決める',
      },
    })
  }
  add({
    id: 'a-next',
    phase: 'after',
    text: {
      KO: '다음 워케이션 계획 세우기 — 모집 중인 프로그램 확인',
      EN: 'Plan the next one — check programs open now',
      JP: '次のワーケーションを計画 — 募集中のプログラムを確認',
    },
    href: '/programs',
    hrefLabel: { KO: '프로그램 보기', EN: 'See programs', JP: 'プログラムを見る' },
  })

  return items
}

// ── 진단 실행 ────────────────────────────────────────────────────────────────

export type DiagnosisResult = {
  profile: DiagnosisProfile
  checklist: ChecklistItem[]
}

/** 룰베이스 유형 매칭 — 답변별 가중치 합산, 최고점 유형 반환 */
export function diagnose(a: DiagnosisAnswers): DiagnosisResult {
  const score: Record<ProfileId, number> = { deepwork: 0, explorer: 0, recovery: 0, connector: 0 }

  // 목표가 가장 강한 신호
  if (a.goal === 'focus') score.deepwork += 3
  if (a.goal === 'explore') score.explorer += 3
  if (a.goal === 'recharge') score.recovery += 3
  if (a.goal === 'connect') score.connector += 3

  // 업무 방식
  if (a.workStyle === 'deep') score.deepwork += 2
  if (a.workStyle === 'field') score.explorer += 2
  if (a.workStyle === 'sync') score.connector += 1

  // 동행
  if (a.party === 'team') score.connector += 2
  if (a.party === 'solo') score.deepwork += 1

  // 기간·걱정은 보조 신호
  if (a.stayLength === 'long') score.explorer += 1
  if (a.concern === 'balance') score.recovery += 1

  const top = (Object.keys(score) as ProfileId[]).reduce((best, id) =>
    score[id] > score[best] ? id : best
  )

  return { profile: PROFILES[top], checklist: buildChecklist(a) }
}

// ── UI 카피 ──────────────────────────────────────────────────────────────────

export const DIAGNOSIS_UI: Record<string, L> = {
  eyebrow: { KO: 'WAKATION TOOLS', EN: 'WAKATION TOOLS', JP: 'WAKATION TOOLS' },
  beta: { KO: 'Beta', EN: 'Beta', JP: 'Beta' },
  title: { KO: '참가자 진단 & 실행 리포트', EN: 'Participant diagnosis & action report', JP: '参加者診断＆実行レポート' },
  sub: {
    KO: '다섯 가지만 답하면 나의 워케이션 유형과 맞춤 실행 체크리스트를 만들어 드려요. 회원가입 없이 바로, 결과는 이 브라우저에 저장됩니다.',
    EN: 'Answer five questions to get your workation type and a tailored action checklist. No sign-up — results are saved in this browser.',
    JP: '5つ答えるだけで、あなたのワーケーションタイプと実行チェックリストを作成。登録不要、結果はこのブラウザに保存されます。',
  },
  step: { KO: '질문', EN: 'Question', JP: '質問' },
  back: { KO: '이전', EN: 'Back', JP: '戻る' },
  resultEyebrow: { KO: '나의 워케이션 유형', EN: 'Your workation type', JP: 'あなたのワーケーションタイプ' },
  rhythmTitle: { KO: '추천 하루 리듬', EN: 'Suggested daily rhythm', JP: 'おすすめの1日リズム' },
  recsTitle: { KO: '이 유형에게 맞는 프로그램', EN: 'Programs that fit this type', JP: 'このタイプに合うプログラム' },
  checklistTitle: { KO: '실행 체크리스트', EN: 'Action checklist', JP: '実行チェックリスト' },
  checklistSub: {
    KO: '체크 상태는 이 브라우저에 저장돼요 — 체류 중에도 열어서 하나씩 지워 나가세요',
    EN: 'Progress is saved in this browser — keep ticking items off during your stay',
    JP: 'チェック状態はこのブラウザに保存 — 滞在中も開いて消していきましょう',
  },
  progress: { KO: '진행률', EN: 'Progress', JP: '進捗' },
  retry: { KO: '다시 진단하기', EN: 'Retake', JP: 'もう一度診断' },
  applyTitle: {
    KO: '진단 결과에 맞는 프로그램이 열리면 함께 떠나요',
    EN: 'When a matching program opens, come with us',
    JP: '診断に合うプログラムが開いたら一緒に',
  },
  applyCta: { KO: '프로그램 신청하기', EN: 'Apply for a program', JP: 'プログラムに申し込む' },
  disclaimer: {
    KO: '이 진단은 답변 기반의 참고용 가이드예요. 프로그램·숙소 조건은 각 페이지에서 최종 확인해 주세요.',
    EN: 'This diagnosis is a guide based on your answers. Confirm program and stay details on each page.',
    JP: 'この診断は回答に基づく参考ガイドです。プログラム·宿の条件は各ページでご確認ください。',
  },
}
