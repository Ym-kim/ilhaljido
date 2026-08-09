import type { Lang } from '@/lib/i18n/types'

export type LocalizedText = Record<Lang, string>

export type ExperienceFact = {
  label: LocalizedText
  value: LocalizedText
}

export type SuggestedFlow = {
  label: LocalizedText
  title: LocalizedText
  items: LocalizedText[]
}

export type CourseStop = {
  time: string
  title: LocalizedText
  note?: LocalizedText
}

export type ReviewSnapshot = {
  provider: 'Klook'
  rating: number
  reviewCount: number
  verifiedAt: string
  sourceUrl: string
  summaryType: 'metrics_only'
}

export type ExperienceProvider = {
  provider: 'klook' | 'kkday' | 'trip' | 'myrealtrip'
  status: 'active_affiliate' | 'approved_needs_deeplink' | 'application_required' | 'external_reference'
  affiliateItemId?: string
  externalUrl?: string
  verifiedAt?: string
}

export type ExperienceSource = {
  name: string
  url: string
  verifiedAt: string
  customerVisible: boolean
}

export type ExperiencePreparationItem = {
  itemId: string
  reason: LocalizedText
  title?: LocalizedText
  destinationLabel?: LocalizedText
}

export type ExperienceEditorial = {
  slug: string
  affiliateItemId: string
  destinationSlug: string
  title: LocalizedText
  subtitle: LocalizedText
  metaDescription: LocalizedText
  editorNote: LocalizedText
  bestFor: LocalizedText[]
  facts: ExperienceFact[]
  reasons: LocalizedText[]
  suggestedFlows: SuggestedFlow[]
  course: { morning: CourseStop[]; afternoon: CourseStop[] }
  included: LocalizedText[]
  prepareSeparately: LocalizedText[]
  reviewSnapshot: ReviewSnapshot
  reviewTopics: LocalizedText[]
  operator: LocalizedText
  providers: ExperienceProvider[]
  checks: LocalizedText[]
  faq: { question: LocalizedText; answer: LocalizedText }[]
  relatedTripSetSlugs: string[]
  relatedGuideSlugs: string[]
  preparationItems: ExperiencePreparationItem[]
  mediaAssetIds: string[]
  verifiedAt: string
  sources: ExperienceSource[]
}

const L = (KO: string, EN: string, JP: string): LocalizedText => ({ KO, EN, JP })

export const EXPERIENCE_EDITORIALS: ExperienceEditorial[] = [
  {
    slug: 'itoshima-photo-bus-tour',
    affiliateItemId: 'act-klook-itoshima-photo-bus',
    destinationSlug: 'fukuoka',
    title: L(
      '후쿠오카에서 반나절, 바다와 사진을 남기는 이토시마',
      'A half-day from Fukuoka for Itoshima coast and photographs',
      '福岡から半日、糸島の海と写真を残す旅',
    ),
    subtitle: L(
      '오전 또는 오후 5시간. 렌터카 없이 해안 명소를 묶어 보고, 여행 전후의 업무 시간도 남기는 일정입니다.',
      'A five-hour morning or afternoon route that links coastal stops without a rental car and leaves room to work around it.',
      '午前または午後の約5時間。レンタカーなしで海辺を巡り、体験の前後に仕事時間も残せるプランです。',
    ),
    metaDescription: L(
      '후쿠오카 이토시마 반나절 사진 버스투어의 일정, 코스, 포함사항, 후기 확인 포인트와 여행 전후 업무 동선을 Wakation 관점으로 정리했습니다.',
      'A Wakation guide to the Itoshima half-day photo bus experience: schedule, route, inclusions, review checks and work-friendly timing.',
      '糸島半日フォトバス体験の時間、コース、含まれる内容、口コミの確認点、仕事と組み合わせる流れをまとめました。',
    ),
    editorNote: L(
      '후쿠오카 3박 4일 중 하루를 통째로 비우기 어렵다면 잘 맞는 구성입니다. 공개된 Klook 상품 정보와 제휴사 후기 지표를 바탕으로 정리했으며, Wakation이 직접 이용한 후기는 아닙니다.',
      'This works well when a three- or four-night Fukuoka stay cannot spare a full day. It is based on public Klook product details and provider review metrics, not a first-hand Wakation review.',
      '福岡3泊4日で丸一日を空けにくいときに組み込みやすい内容です。公開されているKlookの商品情報と提携先の口コミ指標をもとに編集しており、Wakationの実体験レビューではありません。',
    ),
    bestFor: [
      L('후쿠오카 일정에 반나절만 근교를 넣고 싶은 사람', 'Travelers who only have half a day for the coast', '福岡旅に半日だけ郊外を入れたい人'),
      L('렌터카 없이 이토시마 해안을 보고 싶은 사람', 'Travelers who want Itoshima without renting a car', 'レンタカーなしで糸島の海辺を巡りたい人'),
      L('혼자 또는 친구와 사진을 남기고 싶은 사람', 'Solo travelers or friends who want photographs together', 'ひとり旅や友人との写真を残したい人'),
    ],
    facts: [
      { label: L('소요 시간', 'Duration', '所要時間'), value: L('약 5시간', 'About 5 hours', '約5時間') },
      { label: L('출발 지역', 'Departure', '出発地'), value: L('하카타역 인근', 'Near Hakata Station', '博多駅周辺') },
      { label: L('이동 방식', 'Transport', '移動'), value: L('조인 버스', 'Shared bus', '混乗バス') },
      { label: L('운영 언어', 'Language', '対応言語'), value: L('한국어', 'Korean', '韓国語') },
      { label: L('참여', 'Group', '参加'), value: L('1인부터 신청 가능', 'Bookable for one', '1名から申込可') },
      { label: L('시간 선택', 'Schedule', '時間帯'), value: L('오전 또는 오후', 'Morning or afternoon', '午前または午後') },
    ],
    reasons: [
      L('하루 전체를 쓰지 않고 이토시마 해안의 주요 지점을 묶어 볼 수 있습니다.', 'It covers key coastal stops without taking a full day.', '一日を使わずに、糸島の海辺の主要スポットをまとめて巡れます。'),
      L('하카타 출발·복귀라 숙소 라운지나 카페 업무와 이어 붙이기 쉽습니다.', 'Hakata departure and return make it easier to pair with work at a lounge or café.', '博多発着なので、宿のラウンジやカフェでの仕事と組み合わせやすいです。'),
      L('한국어 안내와 사진 촬영 서비스가 함께 표기된 상품입니다.', 'The listing states Korean guidance and an accompanying photo service.', '韓国語案内と写真撮影サービスが記載された商品です。'),
    ],
    suggestedFlows: [
      {
        label: L('오후 출발', 'Afternoon option', '午後出発'),
        title: L('오전 업무 후 바다로', 'Work first, coast after lunch', '午前は仕事、午後は海へ'),
        items: [
          L('08:30–12:00 숙소 라운지 또는 카페 업무', '08:30–12:00 Work from your stay or a café', '08:30–12:00 宿のラウンジまたはカフェで仕事'),
          L('13:40 하카타 인근 미팅', '13:40 Meet near Hakata', '13:40 博多周辺で集合'),
          L('18:30 전후 하카타 복귀 후 저녁', 'Around 18:30 Return to Hakata for dinner', '18:30頃 博多へ戻り夕食'),
        ],
      },
      {
        label: L('오전 출발', 'Morning option', '午前出発'),
        title: L('오전에 체험하고 오후는 내 시간', 'Coast in the morning, your afternoon free', '午前は体験、午後は自分の時間'),
        items: [
          L('08:10 하카타 인근 미팅', '08:10 Meet near Hakata', '08:10 博多周辺で集合'),
          L('13:05 전후 하카타 복귀', 'Around 13:05 Return to Hakata', '13:05頃 博多へ帰着'),
          L('14:30 이후 체크인·카페 업무 또는 시내 산책', 'After 14:30 Check in, work from a café, or explore downtown', '14:30以降 チェックイン、カフェワーク、街歩き'),
        ],
      },
    ],
    course: {
      morning: [
        { time: '08:10', title: L('하카타역 인근 미팅', 'Meet near Hakata Station', '博多駅周辺で集合') },
        { time: '09:00', title: L('야자수 그네', 'Palm-tree swing area', 'ヤシの木ブランコ'), note: L('약 30분 자유시간', 'About 30 minutes free time', '自由時間 約30分') },
        { time: '09:45', title: L('사쿠라이 후타미가우라·팜비치', 'Sakurai Futamigaura and Palm Beach', '桜井二見ヶ浦・パームビーチ'), note: L('약 50분 자유시간', 'About 50 minutes free time', '自由時間 約50分') },
        { time: '11:10', title: L('소금공방', 'Salt workshop stop', '塩工房'), note: L('혼잡 시 대체 방문지로 변경 가능', 'May be replaced when crowded', '混雑時は代替スポットへ変更の場合あり') },
        { time: '13:05', title: L('하카타역 최종 하차', 'Final drop-off at Hakata Station', '博多駅で最終降車') },
      ],
      afternoon: [
        { time: '13:40', title: L('하카타역 인근 미팅', 'Meet near Hakata Station', '博多駅周辺で集合') },
        { time: '15:00', title: L('야자수 그네', 'Palm-tree swing area', 'ヤシの木ブランコ'), note: L('약 30분 자유시간', 'About 30 minutes free time', '自由時間 約30分') },
        { time: '16:10', title: L('사쿠라이 후타미가우라·팜비치', 'Sakurai Futamigaura and Palm Beach', '桜井二見ヶ浦・パームビーチ'), note: L('약 50분 자유시간', 'About 50 minutes free time', '自由時間 約50分') },
        { time: '17:10', title: L('소금공방', 'Salt workshop stop', '塩工房'), note: L('혼잡 시 대체 방문지로 변경 가능', 'May be replaced when crowded', '混雑時は代替スポットへ変更の場合あり') },
        { time: '18:30', title: L('하카타역 최종 하차', 'Final drop-off at Hakata Station', '博多駅で最終降車') },
      ],
    },
    included: [
      L('왕복 버스 이동', 'Round-trip bus transport', '往復バス移動'),
      L('한국어 안내', 'Korean-language guidance', '韓国語案内'),
      L('전문 사진작가 촬영 서비스와 다운로드 쿠폰(매수·제공 방식은 제휴사 확인)', 'Photo service and download coupon; check the provider for quantity and delivery', 'プロカメラマンの撮影サービスとダウンロードクーポン（枚数・受取方法は提携先で確認）'),
    ],
    prepareSeparately: [
      L('개인 식음료와 쇼핑 비용', 'Personal food, drinks and shopping', '個人の飲食・買い物代'),
      L('여행자 보험', 'Travel insurance', '旅行保険'),
      L('미팅 장소와 출발 시각 재확인', 'Reconfirm the meeting point and departure time', '集合場所と出発時刻の再確認'),
    ],
    reviewSnapshot: {
      provider: 'Klook',
      rating: 4.9,
      reviewCount: 17,
      verifiedAt: '2026-07-30',
      sourceUrl: 'https://www.klook.com/ko/activity/115689-fukuoka-itoshima-half-day-bus-tour/',
      summaryType: 'metrics_only',
    },
    reviewTopics: [
      L('가이드 설명', 'Guide commentary', 'ガイドの案内'),
      L('사진 수령 방식', 'Photo delivery', '写真の受取方法'),
      L('미팅 장소', 'Meeting point', '集合場所'),
      L('자유시간과 진행 속도', 'Free time and pace', '自由時間と進行ペース'),
      L('날씨와 방문지 변경', 'Weather and route changes', '天候と訪問先の変更'),
    ],
    operator: L('유투어버스', 'U Tour Bus', 'ユーツアーバス'),
    providers: [
      { provider: 'klook', status: 'active_affiliate', affiliateItemId: 'act-klook-itoshima-photo-bus', verifiedAt: '2026-07-30' },
      { provider: 'myrealtrip', status: 'application_required', externalUrl: 'https://experiences.myrealtrip.com/products/3196704', verifiedAt: '2026-07-30' },
    ],
    checks: [
      L('당일 정확한 미팅 장소와 출발 시각', 'Exact meeting point and departure time', '当日の集合場所と出発時刻'),
      L('사진 제공 매수·파일 전달 방식', 'Number of photos and delivery method', '写真の枚数とデータ受取方法'),
      L('아동·유아 탑승 조건', 'Child and infant rules', '子ども・幼児の参加条件'),
      L('취소·변경 기한과 수수료', 'Cancellation and change deadlines', 'キャンセル・変更期限と手数料'),
      L('날씨·교통에 따른 코스 변경 가능성', 'Possible route changes due to weather or traffic', '天候・交通によるコース変更の可能性'),
    ],
    faq: [
      { question: L('혼자 참여할 수 있나요?', 'Can I join alone?', 'ひとりでも参加できますか？'), answer: L('Klook 상품에는 1인부터 신청 가능한 것으로 표시됩니다. 실제 출발·확정 조건은 선택 날짜의 옵션에서 다시 확인하세요.', 'Klook lists the activity as bookable for one. Recheck departure and confirmation conditions for your selected date.', 'Klookでは1名から申込可能と表示されています。選択日の催行・確定条件を再確認してください。') },
      { question: L('오전과 오후 중 무엇이 좋나요?', 'Morning or afternoon?', '午前と午後、どちらがよいですか？'), answer: L('오후 업무가 필요하면 오전, 오전에 집중해서 일하고 싶다면 오후 출발이 자연스럽습니다. 항공 도착·출국 당일은 지연 위험을 고려하세요.', 'Choose morning if you need to work later, or afternoon if you want a focused work morning. Avoid tight connections on flight days.', '午後に仕事が必要なら午前、午前に集中して働きたいなら午後出発が自然です。フライト当日は遅延リスクに注意してください。') },
      { question: L('투어 전후에 일할 시간이 있나요?', 'Can I work before or after?', '体験の前後に仕事時間を取れますか？'), answer: L('약 5시간 구성이라 오전 또는 오후 한 블록을 업무에 남길 수 있습니다. 복귀 시각은 교통 상황에 따라 달라질 수 있어 화상회의 직전 일정은 피하세요.', 'The roughly five-hour format leaves either morning or afternoon open, but return times can shift with traffic. Avoid scheduling a call immediately after.', '約5時間なので午前か午後を仕事に充てられますが、交通事情で帰着が遅れる場合があります。直後のオンライン会議は避けましょう。') },
      { question: L('짐을 가지고 참여할 수 있나요?', 'Can I bring luggage?', '荷物を持って参加できますか？'), answer: L('수하물 보관 가능 여부와 크기 제한은 날짜·차량에 따라 달라질 수 있으므로 제휴사 상품 페이지에서 확인하세요.', 'Luggage capacity and size limits can vary by vehicle and date; confirm on the provider page.', '荷物の積載可否とサイズ制限は車両・日程により異なるため、提携先の商品ページで確認してください。') },
      { question: L('비가 와도 진행되나요?', 'Does it operate in rain?', '雨でも催行されますか？'), answer: L('날씨·도로 상황에 따라 일정이 변경되거나 일부 방문지가 대체될 수 있습니다. 취소 여부와 환불 조건은 제휴사 공지를 따릅니다.', 'Weather and road conditions may alter the route or replace stops. Cancellation and refund terms follow the provider notice.', '天候・道路状況によりコース変更や訪問先の代替があります。中止・返金条件は提携先の案内に従います。') },
      { question: L('사진은 어떻게 받나요?', 'How are the photos delivered?', '写真はどのように受け取りますか？'), answer: L('상품에는 촬영 서비스와 다운로드 쿠폰이 표기돼 있습니다. 정확한 매수·선택·전달 시점은 예약 전 제휴사에서 확인하세요.', 'The listing mentions a photo service and download coupon. Confirm the exact quantity, selection and delivery timing before booking.', '撮影サービスとダウンロードクーポンが記載されています。枚数・選択方法・受取時期は予約前に提携先で確認してください。') },
      { question: L('취소는 어디에서 처리하나요?', 'Where do I cancel?', 'キャンセルはどこで行いますか？'), answer: L('예약·결제한 제휴사에서 처리합니다. Wakation은 예약·변경·취소·환불을 처리하지 않습니다.', 'Use the provider where you booked and paid. Wakation does not process bookings, changes, cancellations or refunds.', '予約・決済した提携先で手続きします。Wakationでは予約・変更・キャンセル・返金を扱いません。') },
      { question: L('Wakation에서 직접 예약하나요?', 'Do I book with Wakation?', 'Wakationで直接予約しますか？'), answer: L('아니요. Wakation은 여행 구성을 돕고 외부 상품을 소개합니다. 최종 조건 확인과 예약·결제는 Klook에서 진행합니다.', 'No. Wakation helps plan the trip and introduces an external product. Final checks, booking and payment happen on Klook.', 'いいえ。Wakationは旅の組み立てを助け、外部商品を紹介します。最終確認・予約・決済はKlookで行います。') },
    ],
    relatedTripSetSlugs: ['fukuoka-3n4d'],
    relatedGuideSlugs: ['fukuoka'],
    preparationItems: [
      {
        itemId: 'feat-fukuoka-hotel',
        reason: L(
          '하카타 출발 전후 동선이 짧아지도록 숙소 위치와 현재 객실 조건을 함께 비교해보세요.',
          'Compare current stay options around Hakata to keep the route before and after the experience simple.',
          '体験前後の移動を短くできるよう、博多周辺の立地と現在の客室条件を比較してみましょう。',
        ),
      },
      {
        itemId: 'feat-flight-tripcom',
        title: L('후쿠오카 항공권 비교', 'Compare flights to Fukuoka', '福岡行き航空券を比較'),
        destinationLabel: L('서울 출발 · 후쿠오카 도착', 'Seoul to Fukuoka', 'ソウル発 · 福岡着'),
        reason: L(
          '체험일 앞뒤에 여유를 둘 수 있는 후쿠오카 노선을 항공사별로 비교해보세요.',
          'Compare flight options that leave enough time around the experience day.',
          '体験日の前後に余裕を持てる福岡便を、航空会社ごとに比較してみましょう。',
        ),
      },
      {
        itemId: 'esim-klook-japan',
        reason: L(
          '미팅 장소 확인과 사진 수령에 필요한 데이터를 일본 도착 전에 준비해두세요.',
          'Set up data before arrival for meeting-point checks and receiving your photographs.',
          '集合場所の確認や写真データの受取に備えて、到着前に通信手段を確認しておきましょう。',
        ),
      },
    ],
    mediaAssetIds: ['itoshima-coast-editorial-model-g-v2'],
    verifiedAt: '2026-07-30',
    sources: [
      { name: 'Klook activity 115689', url: 'https://www.klook.com/ko/activity/115689-fukuoka-itoshima-half-day-bus-tour/', verifiedAt: '2026-07-30', customerVisible: true },
      { name: 'MyRealTrip product 3196704', url: 'https://experiences.myrealtrip.com/products/3196704', verifiedAt: '2026-07-30', customerVisible: false },
    ],
  },
]

export function getExperienceEditorial(slug: string): ExperienceEditorial | undefined {
  return EXPERIENCE_EDITORIALS.find((experience) => experience.slug === slug)
}

