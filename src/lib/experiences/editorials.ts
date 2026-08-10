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
  provider: 'Klook' | 'KKday'
  rating: number
  reviewCount?: number
  verifiedAt: string
  sourceUrl: string
  localizedSourceUrls?: Partial<Record<Lang, string>>
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
  heroEyebrow: LocalizedText
  heroContentSide: 'left' | 'right'
  title: LocalizedText
  subtitle: LocalizedText
  metaDescription: LocalizedText
  editorNote: LocalizedText
  bestFor: LocalizedText[]
  facts: ExperienceFact[]
  reasons: LocalizedText[]
  suggestedFlows: SuggestedFlow[]
  course: { morning: CourseStop[]; afternoon: CourseStop[] }
  courseLabels: { morning: LocalizedText; afternoon: LocalizedText }
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
  relatedLabels: { tripSet: LocalizedText; guide: LocalizedText }
  placementCopy: {
    guide: { eyebrow: LocalizedText; title: LocalizedText }
    tripSet: { eyebrow: LocalizedText; title: LocalizedText }
  }
  preparationDescription: LocalizedText
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
    heroEyebrow: L('FUKUOKA · ITOSHIMA · HALF DAY', 'FUKUOKA · ITOSHIMA · HALF DAY', 'FUKUOKA · ITOSHIMA · HALF DAY'),
    heroContentSide: 'left',
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
    courseLabels: {
      morning: L('오전 출발', 'Morning departure', '午前出発'),
      afternoon: L('오후 출발', 'Afternoon departure', '午後出発'),
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
    relatedLabels: {
      tripSet: L('후쿠오카 3박 4일 구성', 'Fukuoka 3N4D Trip Set', '福岡3泊4日 Trip Set'),
      guide: L('후쿠오카 여행지 가이드', 'Fukuoka destination guide', '福岡の旅行先ガイド'),
    },
    placementCopy: {
      guide: {
        eyebrow: L('반나절 근교 체험', 'HALF-DAY FROM THE CITY', '半日の郊外体験'),
        title: L('이토시마에서 보내는 오후', 'An afternoon in Itoshima', '糸島で過ごす午後'),
      },
      tripSet: {
        eyebrow: L('DAY 3 대안', 'DAY 3 OPTION', 'DAY 3 の選択肢'),
        title: L('하루를 비우기 어렵다면, 이토시마 반나절', 'If a full day is too much, take half a day for Itoshima', '一日を空けにくいなら、糸島を半日で'),
      },
    },
    preparationDescription: L(
      '하카타 숙소와 이동, 현지 연결 수단을 따로 헤매지 않도록 이 일정에 필요한 순서로 모았습니다.',
      'A short, itinerary-led list for the stay, journey and connectivity around this experience.',
      '博多の宿、移動、現地での通信を、この体験に合わせた順番でまとめました。',
    ),
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
  {
    slug: 'busan-coastal-highlights-day-tour',
    affiliateItemId: 'act-klook-busan-coastal-highlights',
    destinationSlug: 'busan',
    heroEyebrow: L('BUSAN · COASTAL HIGHLIGHTS · FULL DAY', 'BUSAN · COASTAL HIGHLIGHTS · FULL DAY', 'BUSAN · COASTAL HIGHLIGHTS · FULL DAY'),
    heroContentSide: 'right',
    title: L(
      '부산의 바다와 마을을 하루에 잇는 해안 하이라이트',
      'One day across Busan’s coast, villages and sea views',
      '釜山の海と街を一日でつなぐ、海岸ハイライト',
    ),
    subtitle: L(
      '해운대 블루라인파크와 감천문화마을 등 멀리 떨어진 부산의 주요 지점을 차량으로 묶어 보는 하루 일정입니다.',
      'A full-day vehicle itinerary connecting far-apart Busan highlights such as Blue Line Park and Gamcheon Culture Village.',
      '海雲台ブルーラインパークや甘川文化村など、離れた釜山の見どころを車でつなぐ一日プランです。',
    ),
    metaDescription: L(
      '부산 해안 하이라이트 일일투어의 소요시간, 언어 옵션, 주요 동선, 후기 확인 포인트와 2박 3일 일정 배치를 Wakation 관점으로 정리했습니다.',
      'A Wakation guide to the Busan coastal highlights day tour: duration, language options, route, review checks and how it fits a 2N3D stay.',
      '釜山海岸ハイライト日帰りツアーの所要時間、言語、主な動線、口コミの確認点、2泊3日への組み込み方をまとめました。',
    ),
    editorNote: L(
      '부산은 해운대와 감천문화마을처럼 주요 지점 사이 이동 거리가 큽니다. 업무가 없는 하루를 확보할 수 있고 여러 장소를 직접 환승하며 다니는 부담을 줄이고 싶을 때 맞는 선택입니다. 공개된 Klook 상품 정보와 후기 지표를 바탕으로 편집했으며 Wakation의 직접 체험 후기는 아닙니다.',
      'Busan’s key sights are spread widely across the city. This option suits travelers with one work-free day who want to reduce the burden of planning transfers. It is based on public Klook details and provider review metrics, not a first-hand Wakation review.',
      '釜山は海雲台と甘川文化村など、見どころ同士の距離が離れています。仕事を入れない一日を確保でき、乗り換えを自分で組む負担を減らしたい人に合う選択です。公開されているKlookの商品情報と口コミ指標をもとに編集しており、Wakationの実体験レビューではありません。',
    ),
    bestFor: [
      L('부산 첫 여행에서 주요 해안 명소를 한 번에 보고 싶은 사람', 'First-time visitors who want several coastal highlights in one day', '初めての釜山で海辺の主要スポットをまとめて見たい人'),
      L('일본어 가이드 옵션을 우선 확인하고 싶은 여행자', 'Travelers who want to check a Japanese-guide option first', '日本語ガイドの選択肢を優先して確認したい人'),
      L('2박 3일 중 하루는 관광, 나머지는 일과 휴식에 쓰고 싶은 사람', 'Travelers keeping one day for sightseeing and the rest for work and rest', '2泊3日の一日を観光、残りを仕事と休息に使いたい人'),
    ],
    facts: [
      { label: L('소요 시간', 'Duration', '所要時間'), value: L('약 9–12시간', 'About 9–12 hours', '約9〜12時間') },
      { label: L('출발 지역', 'Departure', '出発地'), value: L('부산 시내 지정 지점', 'Designated points in Busan', '釜山市内の指定場所') },
      { label: L('이동 방식', 'Transport', '移動'), value: L('가이드 동행 차량', 'Guided vehicle tour', 'ガイド同行の車両ツアー') },
      { label: L('언어 옵션', 'Language options', '言語'), value: L('영어·중국어·일본어', 'English, Chinese, Japanese', '英語・中国語・日本語') },
      { label: L('참여 방식', 'Format', '参加形態'), value: L('조인 또는 프라이빗', 'Join-in or private', '混乗またはプライベート') },
      { label: L('주요 지역', 'Key areas', '主なエリア'), value: L('해운대·감천 일대', 'Haeundae and Gamcheon areas', '海雲台・甘川エリア') },
    ],
    reasons: [
      L('부산 동서로 떨어진 해안·마을 명소를 개별 환승 없이 묶어 볼 수 있습니다.', 'It links coastal and village sights spread across Busan without planning each transfer.', '東西に離れた海辺と街の見どころを、乗り換えを組まずに巡れます。'),
      L('일본어 가이드가 표기된 옵션을 선택 날짜와 패키지에서 확인할 수 있습니다.', 'A Japanese-guide option is listed and can be checked for the selected date and package.', '日本語ガイド表記のあるプランを、利用日とパッケージで確認できます。'),
      L('관광을 하루에 모아 나머지 체류일에 업무와 해운대 산책 시간을 남기기 좋습니다.', 'Putting sightseeing into one day leaves the remaining stay open for work and Haeundae walks.', '観光を一日にまとめ、残りの日を仕事や海雲台の散歩に使いやすくなります。'),
    ],
    suggestedFlows: [
      {
        label: L('2박 3일', '2N3D option', '2泊3日'),
        title: L('둘째 날을 부산 해안에', 'Keep day two for the coast', '2日目を釜山の海辺へ'),
        items: [
          L('DAY 1 해운대 체크인 · 짧은 업무 · 저녁 산책', 'DAY 1 Check in at Haeundae · short work block · evening walk', 'DAY 1 海雲台にチェックイン · 軽く仕事 · 夜の散歩'),
          L('DAY 2 해안 하이라이트 일일투어', 'DAY 2 Coastal highlights day tour', 'DAY 2 海岸ハイライト日帰りツアー'),
          L('DAY 3 늦은 오전 업무 또는 카페 · 이동', 'DAY 3 Late-morning work or café · depart', 'DAY 3 午前は仕事かカフェ · 移動'),
        ],
      },
      {
        label: L('워케이션', 'Workation option', 'ワーケーション'),
        title: L('회의 없는 날에만 배치', 'Use a meeting-free day', '会議のない日に入れる'),
        items: [
          L('전날 중요한 업무와 화상회의 마무리', 'Finish important work and calls the day before', '前日に重要な仕事とオンライン会議を終える'),
          L('투어 당일 9–12시간을 비워두기', 'Keep 9–12 hours open on the tour day', 'ツアー当日は9〜12時間空ける'),
          L('다음 날 오전은 여유 있게 시작', 'Start the next morning without a tight schedule', '翌朝は余裕のある予定にする'),
        ],
      },
    ],
    course: {
      morning: [
        { time: 'AM', title: L('지정 미팅 지점에서 출발', 'Depart from the selected meeting point', '指定の集合場所から出発'), note: L('정확한 장소는 선택 패키지와 바우처에서 확인', 'Confirm the exact point in the selected package and voucher', '正確な場所は選択プランとバウチャーで確認') },
        { time: 'AM', title: L('부산 해안의 사찰·전망 지점', 'Coastal temple or viewpoint stop', '海辺の寺院・展望スポット'), note: L('방문지는 패키지에 따라 달라질 수 있음', 'Stops vary by package', '訪問先はプランにより異なる') },
        { time: 'NOON', title: L('개별 점심과 다음 지역 이동', 'Lunch and transfer to the next area', '各自昼食と次のエリアへ移動') },
      ],
      afternoon: [
        { time: 'PM', title: L('블루라인파크 또는 스카이캡슐 구간', 'Blue Line Park or Sky Capsule segment', 'ブルーラインパークまたはスカイカプセル区間'), note: L('티켓 포함 여부는 선택 옵션별 확인', 'Ticket inclusion depends on the selected option', 'チケットの有無は選択プランで確認') },
        { time: 'PM', title: L('감천문화마을 등 마을 산책', 'Village walk such as Gamcheon Culture Village', '甘川文化村などを散策') },
        { time: 'PM', title: L('지정 하차 지점으로 복귀', 'Return to the designated drop-off point', '指定の降車場所へ戻る'), note: L('교통 상황에 따라 종료 시각 변동 가능', 'Finish time can shift with traffic', '交通状況により終了時刻が変わる場合あり') },
      ],
    },
    courseLabels: {
      morning: L('오전 동선', 'Morning route', '午前の流れ'),
      afternoon: L('오후 동선', 'Afternoon route', '午後の流れ'),
    },
    included: [
      L('선택한 패키지에 표기된 차량 이동과 가이드', 'Vehicle transport and guide listed for the selected package', '選択プランに記載された車両移動とガイド'),
      L('선택 옵션에 포함으로 표시된 블루라인파크·스카이캡슐 티켓', 'Blue Line Park or Sky Capsule tickets only when listed in the selected option', '選択プランで「含む」と表示されたブルーラインパーク・スカイカプセルのチケット'),
      L('패키지별 지정 방문지', 'Stops listed in the selected package', '選択プランに記載された訪問先'),
    ],
    prepareSeparately: [
      L('점심·간식과 개인 쇼핑 비용', 'Lunch, snacks and personal shopping', '昼食・軽食・個人の買い物代'),
      L('걷기 편한 신발과 계절별 날씨 준비', 'Walking shoes and seasonal weather gear', '歩きやすい靴と季節に合う天候対策'),
      L('정확한 미팅 장소·언어·티켓 포함 여부 재확인', 'Reconfirm meeting point, language and ticket inclusions', '集合場所・言語・チケットの有無を再確認'),
    ],
    reviewSnapshot: {
      provider: 'Klook',
      rating: 4.9,
      reviewCount: 3600,
      verifiedAt: '2026-08-10',
      sourceUrl: 'https://www.klook.com/ko/activity/74132-busan-oneday-tour-busan/',
      localizedSourceUrls: {
        KO: 'https://www.klook.com/ko/activity/74132-busan-oneday-tour-busan/',
        EN: 'https://www.klook.com/en-US/activity/74132-busan-oneday-tour-busan/',
        JP: 'https://www.klook.com/ja/activity/74132-busan-oneday-tour-busan/',
      },
      summaryType: 'metrics_only',
    },
    reviewTopics: [
      L('가이드 언어와 설명', 'Guide language and commentary', 'ガイドの言語と案内'),
      L('미팅 장소 안내', 'Meeting-point directions', '集合場所の案内'),
      L('장소별 자유시간', 'Free time at each stop', '各スポットの自由時間'),
      L('차량 이동과 일정 속도', 'Vehicle transfers and pace', '車両移動と進行ペース'),
      L('더위·비 등 날씨 대응', 'Weather preparation for heat or rain', '暑さ・雨など天候への備え'),
    ],
    operator: L('Klook 상품 페이지의 선택 패키지별 운영사', 'The operator shown for the selected Klook package', 'Klookで選択したプランに表示される運営会社'),
    providers: [
      { provider: 'klook', status: 'active_affiliate', affiliateItemId: 'act-klook-busan-coastal-highlights', verifiedAt: '2026-08-10' },
    ],
    checks: [
      L('선택 날짜에 일본어 가이드 옵션이 실제 제공되는지', 'Whether a Japanese-guide option is offered on your selected date', '選択日に日本語ガイドのプランが実際にあるか'),
      L('블루라인파크·스카이캡슐 티켓 포함 여부', 'Whether Blue Line Park or Sky Capsule tickets are included', 'ブルーラインパーク・スカイカプセルのチケットが含まれるか'),
      L('정확한 미팅·하차 장소와 종료 예상 시각', 'Exact meeting and drop-off points and estimated finish time', '正確な集合・降車場所と終了予定時刻'),
      L('짐 보관 가능 여부와 차량 제한', 'Luggage capacity and vehicle restrictions', '荷物の積載可否と車両の制限'),
      L('취소·변경 기한과 날씨에 따른 운영 정책', 'Cancellation, change and weather-operation policies', 'キャンセル・変更期限と天候時の運営方針'),
    ],
    faq: [
      { question: L('일본어로 참여할 수 있나요?', 'Is a Japanese guide available?', '日本語で参加できますか？'), answer: L('공식 Klook 페이지에는 일본어가 언어 옵션으로 표시됩니다. 다만 모든 날짜·패키지에 동일하게 제공된다고 단정할 수 없으므로 선택 단계에서 일본어 옵션을 다시 확인하세요.', 'Klook lists Japanese as a language option, but availability may differ by date and package. Reconfirm it during option selection.', 'Klookでは日本語が言語オプションとして表示されています。ただし日程・プランにより異なる可能性があるため、選択画面で日本語プランを再確認してください。') },
      { question: L('워케이션 중에 넣기에는 너무 길지 않나요?', 'Is it too long for a workation?', 'ワーケーションに入れるには長すぎませんか？'), answer: L('약 9–12시간이어서 업무와 같은 날 병행하기보다는 회의가 없는 하루에 배치하는 편이 안전합니다. 전날과 다음 날에 업무 블록을 나누어 두세요.', 'At roughly 9–12 hours, it is safer to use a meeting-free day rather than combine it with work. Split work blocks across the day before and after.', '約9〜12時間のため、仕事と同日に組み合わせず、会議のない日に入れるのが安心です。仕事は前日と翌日に分けてください。') },
      { question: L('스카이캡슐 티켓이 항상 포함되나요?', 'Is the Sky Capsule ticket always included?', 'スカイカプセルのチケットは必ず含まれますか？'), answer: L('아니요. 공식 페이지에는 여러 패키지가 있으며 블루라인파크·스카이캡슐 티켓 포함 여부가 옵션별로 다르게 표시됩니다. 결제 전 패키지명을 확인하세요.', 'No. The page lists several packages, and Blue Line Park or Sky Capsule ticket inclusion differs by option. Check the package name before payment.', 'いいえ。複数のプランがあり、ブルーラインパーク・スカイカプセルのチケット有無はプランごとに異なります。決済前にプラン名を確認してください。') },
      { question: L('혼자 참여할 수 있나요?', 'Can I join alone?', 'ひとりでも参加できますか？'), answer: L('조인 투어 옵션이 표시되지만 선택 날짜의 최소 인원과 확정 조건은 달라질 수 있습니다. 제휴사 옵션에서 최종 확인하세요.', 'Join-in options are listed, but minimum participant and confirmation conditions can vary. Confirm them in the provider option.', '混乗プランが表示されていますが、最少催行人数や確定条件は日程により異なる場合があります。提携先の選択画面で確認してください。') },
      { question: L('큰 짐을 가지고 탈 수 있나요?', 'Can I bring large luggage?', '大きな荷物を持ち込めますか？'), answer: L('차량과 참여 인원에 따라 적재 공간이 달라질 수 있습니다. 여행 가방이 있다면 예약 전 제휴사에 보관 가능 여부를 확인하세요.', 'Vehicle storage varies with the group and vehicle. Ask the provider before booking if you have a suitcase.', '車両や参加人数により荷物スペースが異なります。スーツケースがある場合は予約前に提携先へ確認してください。') },
      { question: L('Wakation에서 직접 예약하나요?', 'Do I book with Wakation?', 'Wakationで直接予約しますか？'), answer: L('아니요. Wakation은 일정 판단을 돕고 외부 상품을 소개합니다. 최종 조건 확인과 예약·결제·변경·취소·환불은 Klook에서 진행합니다.', 'No. Wakation helps you judge how the activity fits and introduces an external product. Final checks, booking, payment, changes, cancellations and refunds are handled by Klook.', 'いいえ。Wakationは旅程への組み込み方を整理し、外部商品を紹介します。最終確認・予約・決済・変更・キャンセル・返金はKlookで行います。') },
    ],
    relatedTripSetSlugs: ['busan-weekend'],
    relatedGuideSlugs: ['busan'],
    relatedLabels: {
      tripSet: L('부산 주말 2박 3일 구성', 'Busan weekend 2N3D Trip Set', '釜山週末2泊3日 Trip Set'),
      guide: L('부산 여행지 가이드', 'Busan destination guide', '釜山の旅行先ガイド'),
    },
    placementCopy: {
      guide: {
        eyebrow: L('하루로 잇는 부산 해안', 'A FULL DAY ACROSS BUSAN', '一日でつなぐ釜山の海辺'),
        title: L('해운대부터 감천까지, 이동 부담을 줄인 하루', 'Haeundae to Gamcheon with fewer transfer decisions', '海雲台から甘川まで、移動の迷いを減らす一日'),
      },
      tripSet: {
        eyebrow: L('DAY 2 선택', 'DAY 2 OPTION', 'DAY 2 の選択肢'),
        title: L('업무 없는 하루에 부산의 바다와 마을을 한 번에', 'Use a work-free day for Busan’s coast and villages', '仕事を入れない一日に、釜山の海と街をまとめて'),
      },
    },
    preparationDescription: L(
      '해운대 숙소, 일본에서 부산으로 오는 이동, 도착 후 공항 이동을 이 일정과 이어지는 순서로 모았습니다.',
      'A short list for a Haeundae stay, travel into Busan and the airport transfer around this itinerary.',
      '海雲台の宿、日本から釜山への移動、到着後の空港送迎を、この旅程につながる順番でまとめました。',
    ),
    preparationItems: [
      {
        itemId: 'stay-uh-busan',
        reason: L(
          '긴 투어 전후 이동을 줄이려면 해운대 해변과 가까운 체류 거점의 현재 객실 조건을 먼저 확인해보세요.',
          'To reduce travel before and after a long tour, check current stay conditions near Haeundae Beach.',
          '長いツアーの前後移動を減らすなら、海雲台ビーチ近くの宿泊条件を先に確認しましょう。',
        ),
      },
      {
        itemId: 'cruise-panstar-miracle',
        title: L('오사카에서 부산으로 오는 밤바다 이동', 'Overnight sea route from Osaka to Busan', '大阪から釜山へ向かう夜の船旅'),
        destinationLabel: L('오사카 출발 · 부산 도착', 'Osaka to Busan', '大阪発 · 釜山着'),
        reason: L(
          '일본에서 출발한다면 이동 자체를 하룻밤 여정으로 바꾸는 부산 입국 동선도 비교해보세요.',
          'If arriving from Japan, compare an overnight sea route that turns the transfer into part of the trip.',
          '日本から出発するなら、移動そのものを一泊の旅に変える釜山への航路も比較してみましょう。',
        ),
      },
      {
        itemId: 'feat-transfer-klook',
        title: L('김해공항에서 숙소까지 이동', 'Transfer from Gimhae Airport to your stay', '金海空港から宿までの移動'),
        destinationLabel: L('김해공항 · 부산 시내', 'Gimhae Airport · Busan', '金海空港 · 釜山市内'),
        reason: L(
          '짐이 많거나 늦게 도착한다면 공항에서 숙소까지의 현재 픽업 조건을 미리 확인하세요.',
          'If you have luggage or arrive late, check current airport-transfer terms before departure.',
          '荷物が多い、または到着が遅い場合は、空港から宿までの送迎条件を事前に確認してください。',
        ),
      },
    ],
    mediaAssetIds: ['domestic-busan-model-h-haeundae-v4'],
    verifiedAt: '2026-08-10',
    sources: [
      { name: 'Klook activity 74132', url: 'https://www.klook.com/ja/activity/74132-busan-oneday-tour-busan/', verifiedAt: '2026-08-10', customerVisible: true },
    ],
  },
  {
    slug: 'hongdae-kpop-walk-dance',
    affiliateItemId: 'act-kkday-hongdae-kpop-walk',
    destinationSlug: 'seoul',
    heroEyebrow: L('SEOUL · HONGDAE · HALF DAY', 'SEOUL · HONGDAE · HALF DAY', 'SEOUL · HONGDAE · HALF DAY'),
    heroContentSide: 'left',
    title: L(
      '서울에서 반나절, 홍대의 리듬을 따라 걷고 춤추기',
      'Half a day in Seoul, walking and dancing to Hongdae’s rhythm',
      'ソウルで半日、弘大のリズムを歩いて踊る',
    ),
    subtitle: L(
      '오전에는 내 일을 마치고, 오후 4시간은 K-POP 댄스 클래스와 홍대 굿즈 숍을 잇는 체험에 쓰는 일정입니다.',
      'Finish your work in the morning, then use four afternoon hours for a K-pop dance class and a guided walk through Hongdae merchandise shops.',
      '午前は自分の仕事を終え、午後の4時間をK-POPダンスクラスと弘大のグッズショップ巡りに使うプランです。',
    ),
    metaDescription: L(
      '홍대 K-POP 워킹·댄스 체험의 시간, 일본어 안내, 합정역 미팅, 코스, 포함사항과 서울 3박 4일 배치를 Wakation 관점으로 정리했습니다.',
      'A Wakation guide to the Hongdae K-pop walk and dance experience: timing, languages, Hapjeong meeting point, route, inclusions and how it fits a Seoul stay.',
      '弘大K-POPウォーキング＆ダンス体験の時間、日本語案内、合井駅の集合場所、コース、含まれる内容、ソウル滞在への組み込み方をまとめました。',
    ),
    editorNote: L(
      '서울 3박 4일 중 하루를 통째로 비우지 않고도 문화 체험을 넣고 싶은 해외 여행자에게 맞는 구성입니다. 공개된 KKday 상품 정보를 바탕으로 편집했으며 Wakation이 직접 이용한 후기는 아닙니다. 공식 페이지에는 한국 국적 구매 제한이 표시되어 있어 신청 자격을 먼저 확인해야 합니다.',
      'This suits international visitors who want a cultural experience without giving up a full day of a three- or four-night Seoul stay. It is based on public KKday product details, not a first-hand Wakation review. The official page lists a purchase restriction for South Korean nationals, so eligibility should be checked first.',
      'ソウル3泊4日で一日を丸ごと空けずに文化体験を入れたい海外旅行者に合う構成です。公開されているKKdayの商品情報をもとに編集しており、Wakationの実体験レビューではありません。公式ページには韓国籍の方の購入制限が記載されているため、先に参加資格を確認してください。',
    ),
    bestFor: [
      L('일본어 안내가 가능한 서울 반나절 체험을 찾는 해외 여행자', 'International visitors looking for a half-day Seoul experience with Japanese guidance listed', '日本語案内が記載されたソウルの半日体験を探す海外旅行者'),
      L('오전 업무 후 홍대 문화를 가볍게 경험하고 싶은 사람', 'Travelers who want Hongdae culture after a focused work morning', '午前の仕事を終えてから弘大の文化を気軽に体験したい人'),
      L('혼자 계획하기 어려운 댄스 클래스와 굿즈 숍 동선을 함께 보고 싶은 사람', 'Travelers who want a dance class and merchandise-shop route arranged together', '自分で組みにくいダンスクラスとグッズショップ巡りをまとめたい人'),
    ],
    facts: [
      { label: L('소요 시간', 'Duration', '所要時間'), value: L('약 4시간', 'About 4 hours', '約4時間') },
      { label: L('미팅', 'Meeting point', '集合場所'), value: L('합정역 2번 출구', 'Hapjeong Station Exit 2', '合井駅 2番出口') },
      { label: L('시작', 'Start', '開始'), value: L('12:30', '12:30', '12:30') },
      { label: L('안내 언어', 'Languages', '案内言語'), value: L('영어·일본어·중국어', 'English, Japanese, Chinese', '英語・日本語・中国語') },
      { label: L('이동 방식', 'Format', '移動'), value: L('도보 체험', 'Walking experience', 'ウォーキング体験') },
      { label: L('판매 대상', 'Eligibility', '販売対象'), value: L('해외 여행자 대상', 'International visitors', '海外旅行者向け') },
    ],
    reasons: [
      L('약 4시간이라 오전 업무와 저녁 일정을 모두 남길 수 있습니다.', 'The four-hour format leaves room for both a work morning and an evening plan.', '約4時間なので、午前の仕事と夜の予定をどちらも残せます。'),
      L('합정역에서 만나 댄스 클래스와 홍대 워킹 코스를 한 번에 이어갑니다.', 'It connects a dance class and Hongdae walk from one Hapjeong meeting point.', '合井駅に集合し、ダンスクラスと弘大の街歩きを一つの流れで楽しめます。'),
      L('일본어가 공식 안내 언어로 표기되어 있지만 날짜·참가자 구성에 따른 실제 배정은 재확인이 필요합니다.', 'Japanese is listed as a guided language, but actual assignment should be reconfirmed for the date and participant mix.', '日本語が案内言語として記載されていますが、日程と参加者構成による実際の手配は再確認が必要です。'),
    ],
    suggestedFlows: [
      {
        label: L('업무를 먼저', 'Work-first option', '仕事を先に'),
        title: L('오전 집중, 오후에는 홍대', 'Focused morning, Hongdae afternoon', '午前は集中、午後は弘大へ'),
        items: [
          L('08:30–11:20 숙소 또는 카페 업무', '08:30–11:20 Work from your stay or a café', '08:30–11:20 宿またはカフェで仕事'),
          L('12:20 합정역 도착·미팅 확인', '12:20 Arrive at Hapjeong and check the meeting point', '12:20 合井駅に到着・集合場所を確認'),
          L('17:00 이후 홍대 저녁 또는 숙소 복귀', 'After 17:00 Dinner in Hongdae or return to your stay', '17:00以降 弘大で夕食、または宿へ戻る'),
        ],
      },
      {
        label: L('서울 3박 4일', 'Seoul 3N4D option', 'ソウル3泊4日'),
        title: L('둘째 날 오후에 문화 체험', 'Use the second afternoon for culture', '2日目の午後を文化体験に'),
        items: [
          L('DAY 1 도착·체크인·가벼운 동네 산책', 'DAY 1 Arrive · check in · short neighborhood walk', 'DAY 1 到着 · チェックイン · 近所を散歩'),
          L('DAY 2 오전 업무 · 홍대 반나절 체험', 'DAY 2 Morning work · Hongdae half-day experience', 'DAY 2 午前は仕事 · 弘大の半日体験'),
          L('DAY 3 서울 도심 또는 자유 일정', 'DAY 3 Central Seoul or a free day', 'DAY 3 ソウル中心部または自由行動'),
        ],
      },
    ],
    course: {
      morning: [
        { time: '12:20', title: L('합정역 2번 출구 미팅', 'Meet at Hapjeong Station Exit 2', '合井駅 2番出口で集合'), note: L('출발 10분 전 도착 권장', 'Arrive ten minutes before departure', '出発10分前の到着を推奨') },
        { time: '12:30', title: L('가이드와 출발', 'Depart with the guide', 'ガイドと出発') },
        { time: '13:00', title: L('K-POP 댄스 클래스', 'K-pop dance class', 'K-POPダンスクラス'), note: L('공식 일정 기준 약 90분', 'About 90 minutes in the listed schedule', '公式日程では約90分') },
      ],
      afternoon: [
        { time: '15:00', title: L('홍대 K-POP 워킹 코스', 'Hongdae K-pop walking route', '弘大 K-POPウォーキングコース'), note: L('굿즈 숍 등 방문지는 현장 상황에 따라 달라질 수 있음', 'Merchandise-shop stops may change with local conditions', 'グッズショップなどの訪問先は現地状況により変更の場合あり') },
        { time: '17:00', title: L('홍대에서 종료·해산', 'Finish in Hongdae', '弘大で終了・解散') },
      ],
    },
    courseLabels: {
      morning: L('미팅과 댄스', 'Meeting and dance', '集合とダンス'),
      afternoon: L('홍대 워킹 코스', 'Hongdae walking route', '弘大ウォーキング'),
    },
    included: [
      L('선택한 패키지에 표기된 가이드 안내', 'Guide service listed in the selected package', '選択プランに記載されたガイド案内'),
      L('K-POP 댄스 체험', 'K-pop dance experience', 'K-POPダンス体験'),
      L('공식 일정에 표기된 홍대 워킹 코스', 'Hongdae walking route listed in the official schedule', '公式日程に記載された弘大ウォーキングコース'),
    ],
    prepareSeparately: [
      L('식사·교통·굿즈 등 개인 비용', 'Meals, transport, merchandise and other personal costs', '食事・交通・グッズなどの個人費用'),
      L('여행자 보험과 걷기 편한 신발', 'Travel insurance and comfortable walking shoes', '旅行保険と歩きやすい靴'),
      L('참여 자격·최소 출발 인원·안내 언어 재확인', 'Reconfirm eligibility, minimum group size and guided language', '参加資格・最少催行人数・案内言語を再確認'),
    ],
    reviewSnapshot: {
      provider: 'KKday',
      rating: 5.0,
      verifiedAt: '2026-08-10',
      sourceUrl: 'https://www.kkday.com/ja/product/105485',
      localizedSourceUrls: {
        KO: 'https://www.kkday.com/ko/product/105485',
        EN: 'https://www.kkday.com/en/product/105485',
        JP: 'https://www.kkday.com/ja/product/105485',
      },
      summaryType: 'metrics_only',
    },
    reviewTopics: [
      L('일본어 안내 배정', 'Japanese-language assignment', '日本語案内の手配'),
      L('댄스 클래스 난이도', 'Dance-class difficulty', 'ダンスクラスの難易度'),
      L('합정역 미팅 안내', 'Hapjeong meeting directions', '合井駅の集合案内'),
      L('워킹 코스와 쇼핑 시간', 'Walking route and shopping time', '街歩きと買い物の時間'),
      L('최소 출발 인원과 확정 시점', 'Minimum group size and confirmation timing', '最少催行人数と確定時期'),
    ],
    operator: L('KKday 오리지널 투어 운영 파트너', 'KKday original-tour operating partner', 'KKdayオリジナルツアー運営パートナー'),
    providers: [
      { provider: 'kkday', status: 'active_affiliate', affiliateItemId: 'act-kkday-hongdae-kpop-walk', verifiedAt: '2026-08-10' },
    ],
    checks: [
      L('한국 국적 구매 제한과 본인의 참여 자격', 'The South Korean nationality restriction and your eligibility', '韓国籍の購入制限とご自身の参加資格'),
      L('선택 날짜에 일본어 안내가 실제 배정되는지', 'Whether Japanese guidance is assigned on your selected date', '選択日に日本語案内が実際に手配されるか'),
      L('최소 출발 인원 10명과 투어 확정 시점', 'The listed minimum of ten participants and confirmation timing', '最少催行人数10名と催行確定の時期'),
      L('12:20 미팅·12:30 출발과 지각 시 처리', 'The 12:20 meeting, 12:30 departure and late-arrival policy', '12:20集合・12:30出発と遅刻時の扱い'),
      L('취소 기한·날씨·코스 변경 조건', 'Cancellation deadline, weather and route-change terms', 'キャンセル期限・天候・コース変更条件'),
    ],
    faq: [
      { question: L('일본어로 참여할 수 있나요?', 'Is Japanese guidance available?', '日本語で参加できますか？'), answer: L('공식 페이지에는 일본어가 안내 언어로 표시됩니다. 다만 참가자 국적 구성이 섞이면 영어로 진행될 수 있다고 안내하므로 선택 날짜의 실제 언어를 KKday에서 재확인하세요.', 'Japanese is listed as a guided language. The page also notes that mixed-nationality groups may be guided in English, so reconfirm the actual language for your date with KKday.', '公式ページでは日本語が案内言語として記載されています。ただし参加者の国籍が混在する場合は英語進行になる可能性があるため、選択日の実際の言語をKKdayで再確認してください。') },
      { question: L('한국인도 신청할 수 있나요?', 'Can South Korean nationals book?', '韓国籍でも予約できますか？'), answer: L('2026년 8월 10일 확인한 공식 페이지에는 한국 국적 구매 제한이 표시되어 있습니다. 자격 조건은 변경될 수 있으므로 결제 전 최신 판매 대상 안내를 확인하세요.', 'The official page checked on 10 August 2026 lists a purchase restriction for South Korean nationals. Eligibility can change, so check the latest sales restrictions before payment.', '2026年8月10日に確認した公式ページには、韓国籍の方の購入制限が記載されています。条件は変更される場合があるため、決済前に最新の販売対象を確認してください。') },
      { question: L('투어 전후에 일할 시간이 있나요?', 'Can I work before or after?', '体験の前後に仕事時間を取れますか？'), answer: L('공식 일정은 12:30–17:00 사이 약 4시간으로 표기되어 있어 오전 업무와 저녁 일정을 남기기 좋습니다. 미팅 이동과 종료 지연을 고려해 화상회의는 바로 앞뒤에 두지 마세요.', 'The listed schedule runs roughly four hours between 12:30 and 17:00, leaving a work morning and evening free. Allow transfer time and avoid calls immediately before or after.', '公式日程は12:30〜17:00の間の約4時間で、午前の仕事と夜の予定を残しやすい構成です。移動と終了遅延を考え、直前・直後のオンライン会議は避けてください。') },
      { question: L('춤을 잘 추지 못해도 되나요?', 'Do I need dance experience?', 'ダンス初心者でも参加できますか？'), answer: L('공식 설명에는 수준에 맞춰 배울 수 있다고 안내되어 있습니다. 정확한 난이도와 신체 조건은 선택 날짜의 상품 안내에서 확인하세요.', 'The official description says the class can be adapted to participants’ level. Check the current product details for difficulty and physical requirements.', '公式説明ではレベルに合わせて学べると案内されています。難易度と身体条件は選択日の商品情報で確認してください。') },
      { question: L('취소는 어디에서 처리하나요?', 'Where do I cancel?', 'キャンセルはどこで行いますか？'), answer: L('예약·결제한 KKday에서 처리합니다. Wakation은 예약·변경·취소·환불을 처리하지 않습니다.', 'Use KKday, where the booking and payment were made. Wakation does not process bookings, changes, cancellations or refunds.', '予約・決済を行ったKKdayで手続きします。Wakationでは予約・変更・キャンセル・返金を扱いません。') },
      { question: L('Wakation에서 직접 예약하나요?', 'Do I book with Wakation?', 'Wakationで直接予約しますか？'), answer: L('아니요. Wakation은 여행 일정에 넣는 방법을 정리하고 외부 상품을 소개합니다. 최종 조건 확인과 예약·결제는 KKday에서 진행합니다.', 'No. Wakation explains how the experience fits your itinerary and introduces an external product. Final checks, booking and payment happen on KKday.', 'いいえ。Wakationは旅程への組み込み方を整理し、外部商品を紹介します。最終確認・予約・決済はKKdayで行います。') },
    ],
    relatedTripSetSlugs: ['seoul-3n4d'],
    relatedGuideSlugs: ['seoul'],
    relatedLabels: {
      tripSet: L('서울 3박 4일 구성', 'Seoul 3N4D Trip Set', 'ソウル3泊4日 Trip Set'),
      guide: L('서울 여행지 가이드', 'Seoul destination guide', 'ソウルの旅行先ガイド'),
    },
    placementCopy: {
      guide: {
        eyebrow: L('홍대 반나절 문화 체험', 'HALF-DAY HONGDAE CULTURE', '弘大の半日カルチャー体験'),
        title: L('오전 업무 후, 홍대의 리듬으로', 'After a work morning, follow Hongdae’s rhythm', '午前の仕事のあと、弘大のリズムへ'),
      },
      tripSet: {
        eyebrow: L('DAY 2 선택', 'DAY 2 OPTION', 'DAY 2 の選択肢'),
        title: L('서울의 오후를 K-POP과 홍대 산책으로', 'Use a Seoul afternoon for K-pop and Hongdae', 'ソウルの午後をK-POPと弘大の街歩きに'),
      },
    },
    preparationDescription: L(
      '서울 숙소, 한국 eSIM, 공항에서 숙소로 오는 이동을 이 체험 전후 순서로 모았습니다.',
      'A short list for a Seoul stay, South Korea eSIM and airport transfer around this experience.',
      'ソウルの宿、韓国eSIM、空港から宿までの移動を、この体験につながる順番でまとめました。',
    ),
    preparationItems: [
      {
        itemId: 'stay-fraser-seoul',
        reason: L(
          '오전 업무를 마치고 합정으로 이동하기 쉽도록 서울 체류 거점의 현재 객실 조건을 먼저 비교해보세요.',
          'Compare current Seoul stay conditions so you can finish morning work and reach Hapjeong without a rushed transfer.',
          '午前の仕事を終えて合井へ移動しやすいよう、ソウルの滞在拠点と現在の客室条件を比較しましょう。',
        ),
      },
      {
        itemId: 'esim-airalo-korea',
        reason: L(
          '미팅 위치와 바우처를 이동 중에도 확인할 수 있도록 한국 도착 전에 지원 단말과 데이터 플랜을 확인하세요.',
          'Check device support and a South Korea data plan before arrival so the meeting point and voucher stay accessible.',
          '移動中も集合場所とバウチャーを確認できるよう、到着前に対応端末と韓国向けデータプランを確認してください。',
        ),
      },
      {
        itemId: 'feat-transfer-klook',
        title: L('공항에서 서울 숙소까지 이동', 'Transfer from the airport to your Seoul stay', '空港からソウルの宿までの移動'),
        destinationLabel: L('인천·김포공항 · 서울', 'Incheon or Gimpo Airport · Seoul', '仁川・金浦空港 · ソウル'),
        reason: L(
          '늦게 도착하거나 짐이 많다면 첫날 동선을 단순하게 만드는 현재 공항 이동 조건을 확인하세요.',
          'If you arrive late or carry luggage, check current airport-transfer terms to simplify the first day.',
          '到着が遅い、または荷物が多い場合は、初日の移動を簡単にする空港送迎の条件を確認してください。',
        ),
      },
    ],
    mediaAssetIds: ['experience-seoul-model-i-kpop-studio-v2'],
    verifiedAt: '2026-08-10',
    sources: [
      { name: 'KKday product 105485', url: 'https://www.kkday.com/ja/product/105485', verifiedAt: '2026-08-10', customerVisible: true },
    ],
  },
  {
    slug: 'teamlab-planets-tokyo-evening',
    affiliateItemId: 'act-klook-teamlab-tokyo',
    destinationSlug: 'tokyo',
    heroEyebrow: L('TOKYO · TOYOSU · AFTER WORK', 'TOKYO · TOYOSU · AFTER WORK', 'TOKYO · TOYOSU · AFTER WORK'),
    heroContentSide: 'left',
    title: L(
      '퇴근 후 2시간, 도쿄의 빛 속으로',
      'After work, step into Tokyo’s immersive light',
      '仕事のあと、東京の光に入り込む',
    ),
    subtitle: L(
      '도요스의 몰입형 미디어아트를 저녁 일정에 넣고, 낮의 업무 리듬은 그대로 지키는 도쿄 체류 구성입니다.',
      'An evening in Toyosu’s immersive media art that keeps the daytime work rhythm of a Tokyo stay intact.',
      '豊洲の没入型メディアアートを夜に組み込み、昼の仕事のリズムを崩さない東京滞在プランです。',
    ),
    metaDescription: L(
      'teamLab Planets TOKYO를 퇴근 후 일정에 넣는 방법, 소요 시간, 신토요스 접근, 맨발·물 구역 준비와 Klook 후기 확인 포인트를 정리했습니다.',
      'A Wakation guide to fitting teamLab Planets TOKYO after work, including duration, Shin-Toyosu access, barefoot water areas and Klook review checks.',
      'teamLab Planets TOKYOを仕事後に組み込む流れ、所要時間、新豊洲からのアクセス、裸足・水エリアの準備、Klookの口コミ確認点をまとめました。',
    ),
    editorNote: L(
      '도쿄 3박 4일에서 전시 때문에 하루 전체를 비우고 싶지 않은 사람에게 잘 맞습니다. Klook 상품 정보와 teamLab Planets 공식 이용 안내를 바탕으로 정리했으며, Wakation이 직접 이용한 후기는 아닙니다. 페이지 이미지는 특정 작품이나 실제 전시장을 재현하지 않은 편집 장면입니다.',
      'This suits a three- or four-night Tokyo stay when you do not want an exhibition to take a whole day. It is based on Klook product information and official teamLab Planets visitor guidance, not a first-hand Wakation review. The page image is an editorial scene and does not reproduce a specific artwork or venue room.',
      '東京3泊4日で、展示のために一日を丸ごと空けたくない人に合います。Klookの商品情報とteamLab Planets公式利用案内をもとに編集しており、Wakationの実体験レビューではありません。ページ画像は特定の作品や実際の展示室を再現したものではありません。',
    ),
    bestFor: [
      L('낮에는 일하고 저녁에 도쿄다운 장면을 넣고 싶은 사람', 'Travelers who work by day and want a distinctly Tokyo evening', '昼は仕事をして、夜に東京らしい体験を入れたい人'),
      L('긴 이동 없이 1–3시간 체험을 찾는 사람', 'Travelers looking for a one-to-three-hour experience with simple access', '長い移動をせず、1〜3時間の体験を探している人'),
      L('사진보다 몸으로 느끼는 몰입형 전시에 관심 있는 사람', 'Travelers interested in a physical, immersive exhibition rather than only photographs', '写真を見るだけでなく、身体で感じる没入型展示に興味がある人'),
    ],
    facts: [
      { label: L('권장 소요', 'Suggested duration', '推奨所要時間'), value: L('1–3시간', '1–3 hours', '1〜3時間') },
      { label: L('장소', 'Area', 'エリア'), value: L('도쿄 · 도요스', 'Toyosu · Tokyo', '東京 · 豊洲') },
      { label: L('가까운 역', 'Nearest station', '最寄り駅'), value: L('신토요스역 도보 1분', '1 minute from Shin-Toyosu', '新豊洲駅から徒歩1分') },
      { label: L('입장', 'Admission', '入場'), value: L('선택 날짜·시간 확인', 'Confirm selected date and time', '選択日・時間を確認') },
      { label: L('관람 방식', 'Format', '鑑賞方法'), value: L('맨발·물 구역 포함', 'Barefoot with water areas', '裸足・水のエリアあり') },
      { label: L('일정 배치', 'Best timing', '入れどき'), value: L('업무 후 저녁', 'After work', '仕事後の夜') },
    ],
    reasons: [
      L('Klook 권장 소요가 1–3시간이라 낮의 업무 블록을 그대로 남길 수 있습니다.', 'Klook’s suggested duration is one to three hours, leaving a daytime work block intact.', 'Klookの推奨所要時間は1〜3時間で、昼の仕事時間をそのまま残せます。'),
      L('신토요스역에서 도보 1분이라 낯선 도시에서도 마지막 이동이 단순합니다.', 'The one-minute walk from Shin-Toyosu keeps the final transfer simple in an unfamiliar city.', '新豊洲駅から徒歩1分で、慣れない街でも最後の移動がシンプルです。'),
      L('빛을 보는 전시를 넘어 맨발과 물 구역을 포함해 몸으로 경험하는 일정입니다.', 'It goes beyond viewing light: the visit includes barefoot and water-based spaces experienced with the body.', '光を見るだけでなく、裸足や水のエリアを含め、身体で体験する展示です。'),
    ],
    suggestedFlows: [
      {
        label: L('업무를 먼저', 'Work-first evening', '仕事を先に'),
        title: L('낮에는 집중하고, 저녁은 도요스로', 'Focused daytime, Toyosu after log-off', '昼は集中、仕事後は豊洲へ'),
        items: [
          L('09:00–16:00 숙소 코워킹 또는 카페 업무', '09:00–16:00 Work from your stay or a café', '09:00–16:00 宿のコワーキングまたはカフェで仕事'),
          L('17:00 도요스 이동·가벼운 식사', '17:00 Travel to Toyosu and have a light meal', '17:00 豊洲へ移動・軽めの食事'),
          L('18:00 이후 선택 시간대 입장', 'From 18:00 Enter at the time selected on your ticket', '18:00以降 選択した時間枠で入場'),
        ],
      },
      {
        label: L('여유 있는 오후', 'Slower afternoon', 'ゆとりのある午後'),
        title: L('회의를 일찍 끝내고 도요스의 밤까지', 'Finish calls early and stay for Toyosu after dark', '会議を早めに終え、豊洲の夜まで'),
        items: [
          L('15:30 업무 종료·큰 짐은 숙소에 두기', '15:30 Finish work and leave large luggage at your stay', '15:30 仕事を終え、大きな荷物は宿に置く'),
          L('16:30 도요스 수변 산책', '16:30 Walk along the Toyosu waterfront', '16:30 豊洲の水辺を散歩'),
          L('선택 시간대 관람 후 도요스 또는 긴자에서 저녁', 'Visit at the selected time, then dine in Toyosu or Ginza', '選択した時間に鑑賞し、豊洲または銀座で夕食'),
        ],
      },
    ],
    course: {
      morning: [
        { time: '09:00', title: L('업무 블록 시작', 'Start a focused work block', '仕事ブロックを開始'), note: L('온라인 회의와 마감은 낮에 배치', 'Keep calls and deadlines in the daytime', 'オンライン会議と締め切りは昼にまとめる') },
        { time: '15:30', title: L('업무 종료·소지품 정리', 'Finish work and repack', '仕事を終え、荷物を整理'), note: L('큰 여행 가방은 숙소에 두는 편이 안전', 'It is safer to leave large suitcases at the stay', '大きなスーツケースは宿に置くのが安心') },
        { time: '17:00', title: L('도요스로 이동', 'Travel to Toyosu', '豊洲へ移動'), note: L('선택 입장 시간에 맞춰 여유 있게 출발', 'Leave enough time for the selected admission slot', '選択した入場時間に合わせて余裕を持って出発') },
      ],
      afternoon: [
        { time: '17:30', title: L('신토요스역 도착', 'Arrive at Shin-Toyosu', '新豊洲駅に到着'), note: L('공식 안내 기준 행사장까지 도보 약 1분', 'The official guide lists about a one-minute walk', '公式案内では会場まで徒歩約1分') },
        { time: '18:00', title: L('선택 시간대 입장', 'Enter at the selected time', '選択した時間枠で入場'), note: L('18시는 예시이며 실제 판매 시간대를 확인', '18:00 is an example; confirm the available slot', '18:00は例。実際の販売時間枠を確認') },
        { time: '19:30', title: L('관람 속도에 맞춰 마무리', 'Finish at your own pace', '自分のペースで鑑賞を終える'), note: L('권장 소요 1–3시간', 'Suggested duration: 1–3 hours', '推奨所要時間 1〜3時間') },
        { time: '20:30', title: L('도요스·긴자 저녁', 'Dinner in Toyosu or Ginza', '豊洲・銀座で夕食') },
      ],
    },
    courseLabels: {
      morning: L('입장 전 업무 흐름', 'Before the visit', '入場前の仕事の流れ'),
      afternoon: L('저녁 체험 흐름', 'Evening visit', '夜の体験の流れ'),
    },
    included: [
      L('선택한 패키지에 표기된 teamLab Planets TOKYO 입장권', 'teamLab Planets TOKYO admission listed for the selected package', '選択したプランに記載されたteamLab Planets TOKYO入場券'),
      L('선택 날짜·시간에 사용하는 모바일 바우처', 'Mobile voucher for the selected date and time', '選択した日時に使用するモバイルバウチャー'),
      L('선택 입장권 범위 안의 전시 관람', 'Access to exhibitions covered by the selected ticket', '選択した入場券の範囲内での展示鑑賞'),
    ],
    prepareSeparately: [
      L('맨발 관람과 무릎 높이까지 젖을 수 있는 물 구역에 맞는 복장', 'Clothing suitable for barefoot areas and water that may reach adult knee height', '裸足のエリアと、大人の膝ほどまで濡れる可能性がある水エリアに合う服装'),
      L('거울 바닥을 고려한 옷차림과 걷기 편한 신발', 'Clothing mindful of mirrored floors and comfortable shoes for the journey', '鏡張りの床に配慮した服装と、移動用の歩きやすい靴'),
      L('입장 시간·휴관일·취소 조건과 큰 짐 보관 가능 여부 재확인', 'Reconfirm admission time, closure dates, cancellation terms and large-luggage handling', '入場時間・休館日・キャンセル条件・大きな荷物の扱いを再確認'),
    ],
    reviewSnapshot: {
      provider: 'Klook',
      rating: 4.7,
      reviewCount: 20941,
      verifiedAt: '2026-08-06',
      sourceUrl: 'https://www.klook.com/ko/activity/25300-teamlab-planets-toyosu-tokyo-ticket/',
      localizedSourceUrls: {
        KO: 'https://www.klook.com/ko/activity/25300-teamlab-planets-toyosu-tokyo-ticket/',
        EN: 'https://www.klook.com/en-US/activity/25300-teamlab-planets-toyosu-tokyo-ticket/',
        JP: 'https://www.klook.com/ja/activity/25300-teamlab-planets-toyosu-tokyo-ticket/',
      },
      summaryType: 'metrics_only',
    },
    reviewTopics: [
      L('입장 대기 시간', 'Admission wait', '入場待ち時間'),
      L('시간대별 혼잡도', 'Crowds by time slot', '時間帯別の混雑'),
      L('맨발·물 구역 준비', 'Barefoot and water-area preparation', '裸足・水エリアの準備'),
      L('전시 관람 속도', 'Pace through the exhibits', '展示を見るペース'),
      L('신토요스 접근', 'Access from Shin-Toyosu', '新豊洲からのアクセス'),
      L('사진 촬영 환경', 'Photography conditions', '写真撮影の環境'),
    ],
    operator: L('teamLab Planets TOKYO 행사장 운영 주체', 'The teamLab Planets TOKYO venue operator', 'teamLab Planets TOKYOの会場運営主体'),
    providers: [
      { provider: 'klook', status: 'active_affiliate', affiliateItemId: 'act-klook-teamlab-tokyo', verifiedAt: '2026-08-10' },
    ],
    checks: [
      L('선택한 입장권의 날짜·시간과 입장 가능 범위', 'The date, time and admission scope of the selected ticket', '選択した入場券の日付・時間・入場範囲'),
      L('현재 운영시간·휴관일과 현장 대기 가능성', 'Current opening hours, closure dates and possible entry wait', '現在の営業時間・休館日と入場待ちの可能性'),
      L('맨발·물·거울 바닥 구역에 맞는 복장', 'Clothing for barefoot, water and mirrored-floor areas', '裸足・水・鏡張りの床に合う服装'),
      L('무료 보관함 크기와 큰 여행 가방 처리 방식', 'Free-locker dimensions and handling for large suitcases', '無料ロッカーの大きさと大型スーツケースの扱い'),
      L('선택 패키지의 변경·취소·환불 조건', 'Change, cancellation and refund terms for the selected package', '選択プランの変更・キャンセル・返金条件'),
    ],
    faq: [
      { question: L('관람에는 얼마나 걸리나요?', 'How long should I allow?', 'どのくらい時間がかかりますか？'), answer: L('Klook은 권장 소요시간을 1–3시간으로 안내합니다. 혼잡도와 관람 속도에 따라 달라질 수 있어, 저녁 회의는 관람 직후에 두지 않는 편이 안전합니다.', 'Klook suggests one to three hours. Crowds and your pace can change this, so avoid scheduling a call immediately after the visit.', 'Klookでは推奨所要時間を1〜3時間と案内しています。混雑と鑑賞ペースで変わるため、鑑賞直後のオンライン会議は避けるのが安心です。') },
      { question: L('정말 맨발로 들어가나요?', 'Do I really enter barefoot?', '本当に裸足で入りますか？'), answer: L('공식 이용 안내에는 행사장 내부를 맨발로 관람하고, 성인도 무릎 높이까지 젖을 수 있는 구역이 있다고 적혀 있습니다. 바지를 걷어 올릴 수 있는지와 거울 바닥에 맞는 옷차림을 확인하세요.', 'The official visitor guidance says guests enter barefoot and that some areas may wet adults up to knee height. Wear trousers that can be rolled up and consider the mirrored floors.', '公式利用案内では、館内は裸足で入り、大人でも膝ほどまで濡れる可能性があるエリアがあると案内されています。裾を上げられる服装と鏡張りの床への配慮が必要です。') },
      { question: L('업무 후에 가도 무리가 없나요?', 'Does it work after a workday?', '仕事のあとでも無理なく行けますか？'), answer: L('소요시간과 신토요스역 접근성을 보면 저녁에 넣기 좋은 편입니다. 다만 실제 입장 시간대와 운영시간은 날짜마다 달라질 수 있으므로 티켓 선택 화면에서 먼저 확인하세요.', 'Its duration and access from Shin-Toyosu make it suitable for an evening. Actual admission slots and opening hours can vary, so check the ticket selection screen first.', '所要時間と新豊洲駅からのアクセスを考えると夜に入れやすい体験です。ただし入場時間枠と営業時間は日によって変わるため、チケット選択画面で先に確認してください。') },
      { question: L('큰 여행 가방을 맡길 수 있나요?', 'Can I store a large suitcase?', '大きなスーツケースは預けられますか？'), answer: L('공식 안내의 무료 보관함은 폭 23cm·깊이 34cm·높이 37cm이며, 그보다 큰 짐을 수용하는 별도 클로크룸은 없다고 안내합니다. 큰 짐은 숙소에 두고 이동하는 편이 안전합니다.', 'The official guide lists free lockers at 23cm wide, 34cm deep and 37cm high, with no cloakroom for larger baggage. Leaving a large suitcase at your stay is the safer plan.', '公式案内の無料ロッカーは幅23cm・奥行34cm・高さ37cmで、それを超える荷物用のクロークはないと案内されています。大きな荷物は宿に置くのが安心です。') },
      { question: L('취소와 환불은 어디에서 확인하나요?', 'Where do I check cancellation and refunds?', 'キャンセル・返金はどこで確認しますか？'), answer: L('선택한 Klook 패키지의 이용 조건에서 확인하고 Klook에서 처리합니다. 일부 입장권은 취소 불가로 표시될 수 있으므로 결제 직전 조건을 다시 확인하세요.', 'Check the terms of the selected Klook package and handle requests through Klook. Some admission options may be marked non-refundable, so reconfirm before payment.', '選択したKlookプランの利用条件で確認し、Klookで手続きします。キャンセル不可と表示される入場券もあるため、決済直前に再確認してください。') },
      { question: L('Wakation에서 직접 예약하나요?', 'Do I book with Wakation?', 'Wakationで直接予約しますか？'), answer: L('아니요. Wakation은 일정 배치와 준비 정보를 편집해 소개합니다. 실제 예약·결제·변경·취소·환불은 Klook의 약관과 정책을 따릅니다.', 'No. Wakation editorially explains timing and preparation. Booking, payment, changes, cancellations and refunds follow Klook’s terms and policies.', 'いいえ。Wakationは旅程への入れ方と準備情報を編集して紹介します。予約・決済・変更・キャンセル・返金はKlookの規約とポリシーに従います。') },
    ],
    relatedTripSetSlugs: ['tokyo-allinone'],
    relatedGuideSlugs: ['tokyo'],
    relatedLabels: {
      tripSet: L('도쿄 워케이션 올인원 구성', 'Tokyo all-in-one Trip Set', '東京ワーケーション オールインワン'),
      guide: L('도쿄 여행지 가이드', 'Tokyo destination guide', '東京の旅行先ガイド'),
    },
    placementCopy: {
      guide: {
        eyebrow: L('퇴근 후 도쿄의 빛', 'TOKYO AFTER DARK', '仕事後の東京の光'),
        title: L('낮의 업무를 지키고, 저녁은 몰입형 전시로', 'Keep the workday, use the evening for immersive art', '昼の仕事を守り、夜は没入型アートへ'),
      },
      tripSet: {
        eyebrow: L('DAY 3 저녁', 'DAY 3 EVENING', 'DAY 3 の夜'),
        title: L('도쿄 3박 4일의 저녁을 빛과 물로', 'Give one Tokyo evening to light and water', '東京3泊4日の夜を、光と水の体験に'),
      },
    },
    preparationDescription: L(
      '도쿄 체류 거점, 일본 eSIM, 항공편을 이 저녁 일정에 맞춰 확인할 순서로 모았습니다.',
      'A short list for a Tokyo stay, Japan eSIM and flights around this evening itinerary.',
      '東京の滞在拠点、日本eSIM、航空券を、この夜の体験につながる順番でまとめました。',
    ),
    preparationItems: [
      {
        itemId: 'stay-millennials-shibuya',
        reason: L(
          '낮에는 숙소 안 코워킹에서 일하고 저녁에 도요스로 이동할 수 있도록 현재 객실 조건을 먼저 비교해보세요.',
          'Compare current room conditions for a stay where you can work in-house before traveling to Toyosu in the evening.',
          '昼は宿のコワーキングで働き、夜に豊洲へ移動できるよう、現在の客室条件を比較しましょう。',
        ),
      },
      {
        itemId: 'esim-klook-japan',
        reason: L(
          '입장 바우처와 이동 경로를 현장에서 열 수 있도록 출국 전에 지원 단말과 데이터 조건을 확인하세요.',
          'Check device support and data terms before departure so the voucher and route remain accessible on site.',
          '現地で入場バウチャーと経路を開けるよう、出発前に対応端末とデータ条件を確認してください。',
        ),
      },
      {
        itemId: 'feat-flight-tripcom',
        title: L('도쿄 항공편 비교', 'Compare flights to Tokyo', '東京行き航空券を比較'),
        destinationLabel: L('인천·김포 · 도쿄', 'Seoul · Tokyo', 'ソウル · 東京'),
        reason: L(
          '마지막 날 저녁 체험과 귀국편이 충돌하지 않도록 도착·출발 시간을 함께 비교하세요.',
          'Compare arrival and departure times so an evening visit does not conflict with the flight home.',
          '夜の体験と帰国便が重ならないよう、到着・出発時刻をあわせて比較してください。',
        ),
      },
    ],
    mediaAssetIds: ['experience-tokyo-model-d-immersive-gallery-v1'],
    verifiedAt: '2026-08-10',
    sources: [
      { name: 'Klook activity 25300', url: 'https://www.klook.com/ko/activity/25300-teamlab-planets-toyosu-tokyo-ticket/', verifiedAt: '2026-08-10', customerVisible: true },
      { name: 'teamLab Planets TOKYO official guide', url: 'https://teamlabplanets.dmm.com/en/guide', verifiedAt: '2026-08-10', customerVisible: true },
      { name: 'teamLab Planets TOKYO official visitor notices', url: 'https://teamlabplanets.dmm.com/en/group/ticket', verifiedAt: '2026-08-10', customerVisible: true },
    ],
  },
]

export function getExperienceEditorial(slug: string): ExperienceEditorial | undefined {
  return EXPERIENCE_EDITORIALS.find((experience) => experience.slug === slug)
}

