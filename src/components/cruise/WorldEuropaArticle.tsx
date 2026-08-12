import Link from 'next/link'
import { Ship, Wifi, Sun, Leaf, Clock, AlertCircle, Plane } from 'lucide-react'
import { ShareButton } from '@/components/share/ShareButton'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// MSC 월드 유로파 카리브 워케이션 에디토리얼 — 3언어 뷰 (2026-08-13 i18n 추출)
// 팩트 검증 기록은 원본과 동일(2026-07-28) — 아래 KO 카피가 원문이며 EN/JP는 번역.
// 수치·날짜·가격은 3언어 동일 값 유지. 팩트 갱신 시 이 파일 한 곳만 수정한다.
// 원 검증 주석: 215,863GT·전장 333.3m·데크 22·객실 2,626(발코니 65%) = MSC 공식
// 프레스룸 / "세계 최대" 표현 금지(Icon of the Seas가 더 큼) / 스타링크 "2024년 초
// 설치(함대 전체는 2024년 5월까지)" / 카리브 8일 최저 ₩1,170,759 = kr.trip.com
// 실측 2026-07-28 / 시차 카리브 UTC-4 ↔ KST = 13시간.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const TRIP_HREF = 'https://kr.trip.com/cruises/ship-msc-cruises-msc-world-europa-944?curr=KRW&Allianceid=9024807'

const CTA_CLS =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all'

const C = {
  ctaTrip: { KO: 'Trip.com에서 일정·요금 보기', EN: 'See dates & fares on Trip.com', JP: 'Trip.comで日程・料金を見る' } as L,
  ctaAll: { KO: '크루즈 워케이션 전체 보기', EN: 'All cruise workations', JP: 'クルーズワーケーション一覧' } as L,
  heroTitle1: { KO: '21만 톤,', EN: '215,000 tons,', JP: '21万トン、' } as L,
  heroTitle2: { KO: '겨울의 반대편', EN: 'on the far side of winter', JP: '冬の反対側へ' } as L,
  heroLead: {
    KO: '한국이 가장 추운 12~2월, 카리브해는 건기의 한가운데입니다. MSC 함대 최대이자 첫 LNG 플래그십이 그 계절에 마르티니크를 돕니다 — 스타링크 와이파이와 함께.',
    EN: "December to February — Korea's coldest months — is the middle of the Caribbean dry season. MSC's largest ship and first LNG flagship sails out of Martinique in exactly that season, Starlink Wi-Fi on board.",
    JP: '韓国が最も寒い12〜2月、カリブ海は乾季の真ん中。MSC船団最大にして初のLNGフラッグシップが、その季節にマルティニークを巡ります — スターリンクWi-Fiとともに。',
  } as L,
  heroDisclosure: {
    KO: '제휴 링크입니다 · 요금과 운항 일정은 예약 페이지에서 최종 확인됩니다',
    EN: 'Affiliate links · Final fares and sailing dates are confirmed on the booking page',
    JP: 'アフィリエイトリンクです · 料金・運航日程は予約ページで最終確認されます',
  } as L,
  facts: {
    KO: [
      ['215,863톤 · 데크 22', 'MSC 함대 최대 · 첫 LNG (2022 취항)'],
      ['스타링크 + 무제한 패키지', 'Browse & Stream — 스트리밍·영상통화'],
      ['겨울 시즌 카리브 모항', '마르티니크·과들루프 (2026.12~2027.2)'],
      ['카리브 8일 ₩1,170,759~', '2027-02-27발 · 7.28 실측'],
    ],
    EN: [
      ['215,863 GT · 22 decks', "MSC's largest · first LNG (debuted 2022)"],
      ['Starlink + unlimited packages', 'Browse & Stream — streaming & video calls'],
      ['Caribbean home port in winter', 'Martinique · Guadeloupe (Dec 2026–Feb 2027)'],
      ['8-day Caribbean from ₩1,170,759', 'Departing 2027-02-27 · checked Jul 28'],
    ],
    JP: [
      ['215,863トン · 22デッキ', 'MSC船団最大 · 初のLNG（2022年就航）'],
      ['スターリンク＋無制限パッケージ', 'Browse & Stream — 配信・ビデオ通話'],
      ['冬季カリブ母港', 'マルティニーク・グアドループ（2026.12〜2027.2）'],
      ['カリブ8日 ₩1,170,759〜', '2027-02-27発 · 7/28実測'],
    ],
  } as Record<Lang, string[][]>,
  targetsTitle: { KO: '이런 분께 추천합니다', EN: 'Who this is for', JP: 'こんな方におすすめ' } as L,
  targets: {
    KO: [
      ['겨울을 피해 일하고 싶은 사람', '한국의 1~2월과 카리브의 건기를 맞바꾸는 역주행 워케이션. 매일 아침 다른 섬에 눈을 뜨면서도, 객실과 오피스는 그대로인 한 주입니다.'],
      ['화상회의를 끊을 수 없는 리모트 워커', '스타링크 기반 선내 와이파이에 스트리밍·영상통화용 무제한 패키지(Browse & Stream)가 공식 운영됩니다. 일별 요금이 공개돼 있어 예산 계산이 서는, 드문 크루즈입니다.'],
      ['유럽 여행에 한 주를 얹고 싶은 사람', '카리브 모항까지는 보통 파리 경유 — 어차피 유럽을 거친다면, 파리 일정 뒤에 카리브 8일을 이어 붙이는 설계가 이동을 아깝지 않게 만듭니다.'],
    ],
    EN: [
      ['Anyone who wants to work away from winter', "A reverse-season workation that trades Korea's January–February for the Caribbean dry season. You wake up by a different island each morning — while your cabin and office stay exactly where they are."],
      ["Remote workers who can't skip video calls", 'The ship runs Starlink-based Wi-Fi with an official unlimited package for streaming and video calls (Browse & Stream). Daily rates are published — a rare cruise where you can actually budget your connectivity.'],
      ['Travelers adding a week to a Europe trip', "Reaching the Caribbean home ports usually means connecting through Paris — so if you're passing through Europe anyway, stacking eight Caribbean days after Paris makes the long haul earn its keep."],
    ],
    JP: [
      ['冬を避けて働きたい人', '韓国・日本の1〜2月とカリブの乾季を入れ替える逆張りワーケーション。毎朝違う島の前で目覚めながら、客室とオフィスはそのまま — そんな1週間です。'],
      ['ビデオ会議を欠かせないリモートワーカー', 'スターリンクベースの船内Wi-Fiに、配信・ビデオ通話向けの無制限パッケージ（Browse & Stream）が公式に用意されています。日額料金が公開されており、予算計画が立てやすい珍しいクルーズです。'],
      ['ヨーロッパ旅行に1週間を足したい人', 'カリブの母港へは通常パリ経由 — どうせヨーロッパを通るなら、パリ日程の後にカリブ8日をつなげる設計が長距離移動を無駄にしません。'],
    ],
  } as Record<Lang, string[][]>,
  whyTitle: { KO: '왜 이 배인가', EN: 'Why this ship', JP: 'なぜこの船か' } as L,
  why1Title: { KO: 'MSC 함대의 최대·최신 플래그십', EN: "MSC's largest, newest flagship", JP: 'MSC船団最大・最新のフラッグシップ' } as L,
  why1Body: {
    KO: '215,863톤, 전장 333m, 22개 데크, 객실 2,626실(65%가 발코니). 선미에는 길이 약 104m의 개방형 월드 프로메나드가 LED 스카이 스크린 아래 펼쳐지고, 실내 중심가 월드 갤러리아(2,214㎡)는 LED 돔 천장으로 덮여 있습니다. 다이닝 13곳(스페셜티 6), 바·라운지 20곳, 그리고 11개 데크를 관통하는 드라이 슬라이드 ‘베놈 드롭’까지 — 2022년 카타르 도하에서 데뷔한 배입니다(월드컵 기간엔 숙박선으로 쓰였습니다).',
    EN: '215,863 gross tons, 333 meters long, 22 decks, 2,626 cabins (65% with balconies). At the stern, the open-air World Promenade stretches roughly 104 meters under an LED sky screen, and the indoor main street, the World Galleria (2,214㎡), sits beneath an LED dome ceiling. Thirteen dining venues (six specialty), twenty bars and lounges, and the Venom Drop — a dry slide cutting through eleven decks. The ship debuted in Doha, Qatar, in 2022 (serving as a hotel ship during the World Cup).',
    JP: '215,863トン、全長333m、22デッキ、客室2,626室（65%がバルコニー）。船尾には全長約104mの開放型ワールド・プロムナードがLEDスカイスクリーンの下に広がり、屋内メインストリートのワールド・ガレリア（2,214㎡）はLEDドーム天井に覆われています。ダイニング13カ所（スペシャリティ6）、バー・ラウンジ20カ所、そして11デッキを貫くドライスライダー「ベノム・ドロップ」まで — 2022年にカタール・ドーハでデビューした船です（W杯期間はホテルシップとして使用）。',
  } as L,
  why2Title: { KO: '요금이 공개된 스타링크 오피스', EN: 'A Starlink office with published rates', JP: '料金が公開されたスターリンク・オフィス' } as L,
  why2Body: {
    KO: 'MSC는 2024년 초 월드 유로파에 스타링크를 설치했고(함대 전체는 2024년 5월까지 완료), 와이파이 패키지는 웹서핑용 Browse와 스트리밍·영상통화용 Browse & Stream 두 종 — 둘 다 무제한이며 출항 전 구매 시 할인됩니다. Trip.com에 게재된 참고 요금은 카리브 항로 기기 1대 기준 하루 $8.44(2~13박), 항차가 길수록 단가가 내려갑니다(실제 가격은 선내 공지 기준). 하루 커피 두 잔 값으로 바다 위 사무실 회선이 서는 셈입니다.',
    EN: 'MSC installed Starlink on World Europa in early 2024 (fleet-wide completion by May 2024). There are two Wi-Fi packages — Browse for web use, Browse & Stream for streaming and video calls — both unlimited, discounted when purchased before sailing. Reference pricing listed on Trip.com runs $8.44 per device per day on Caribbean itineraries (2–13 nights), with longer sailings priced lower per day (actual prices follow onboard notices). Your office line at sea, for roughly the price of two coffees a day.',
    JP: 'MSCは2024年初頭にワールド・エウローパへスターリンクを設置（船団全体は2024年5月までに完了）。Wi-Fiパッケージはウェブ閲覧用のBrowseと、配信・ビデオ通話用のBrowse & Streamの2種 — どちらも無制限で、出航前購入で割引になります。Trip.com掲載の参考料金はカリブ航路で1台あたり1日$8.44（2〜13泊）、航海が長いほど単価が下がります（実際の価格は船内案内基準）。1日コーヒー2杯分で海上のオフィス回線が確保できる計算です。',
  } as L,
  why3Title: { KO: '한국의 겨울이 곧 카리브의 시즌', EN: "Korea's winter is the Caribbean's season", JP: '韓国の冬こそカリブのシーズン' } as L,
  why3Body: {
    KO: '2026-27 겨울, 월드 유로파는 마르티니크(포르드프랑스)·과들루프를 모항으로 카리브해를 돕니다 — 원래 아라비아만 시즌이었다가 2026년 3월 카리브 재배치가 발표되며 열린 일정입니다. 8일 일정이 매주 세인트루시아·앤티가·도미니카 등 섬 5곳을 순회하고, 2026년 7월 28일 실측 기준 최저 ₩1,170,759(2027년 2월 27일 출발)부터입니다. 12월 연말 출발은 ₩190만~250만원대로 성수기 프리미엄이 붙습니다.',
    EN: 'In winter 2026–27, World Europa sails the Caribbean from home ports in Martinique (Fort-de-France) and Guadeloupe — itineraries that opened after the original Arabian Gulf season was redeployed to the Caribbean, announced in March 2026. The 8-day itinerary loops five islands weekly — St. Lucia, Antigua, Dominica and more — from ₩1,170,759 (departing February 27, 2027) as checked on July 28, 2026. Late-December departures carry a peak-season premium at roughly ₩1.9–2.5 million.',
    JP: '2026-27年冬、ワールド・エウローパはマルティニーク（フォール・ド・フランス）・グアドループを母港にカリブ海を巡ります — 元はアラビア湾シーズンでしたが、2026年3月にカリブ再配置が発表されて開いた日程です。8日間の日程が毎週セントルシア・アンティグア・ドミニカなど5島を巡回し、2026年7月28日実測で最低₩1,170,759（2027年2月27日出発）から。12月の年末出発は₩190万〜250万台とピークシーズンのプレミアムが付きます。',
  } as L,
  why4Title: { KO: 'LNG와 연료전지 — 바다 위 친환경 실험실', EN: 'LNG and fuel cells — a green lab at sea', JP: 'LNGと燃料電池 — 海上のエコ実験室' } as L,
  why4Body: {
    KO: '월드 유로파는 MSC 함대 최초의 LNG(액화천연가스) 추진선이고, LNG 기반 150kW 고체산화물 연료전지(SOFC) 데모 유닛을 실었습니다 — MSC는 이를 현대 크루즈선 최초라고 발표했습니다. 일주일을 배에서 보내는 선택이 마음에 걸리는 워케이셔너에게, 업계에서 가장 앞선 축의 친환경 사양이라는 사실은 작지 않은 차이입니다.',
    EN: "World Europa is MSC's first LNG (liquefied natural gas) powered ship, and carries an LNG-based 150kW solid-oxide fuel cell (SOFC) demonstration unit — a first on a modern cruise ship, per MSC. For a workationer uneasy about spending a week on a ship, sailing on one of the industry's most advanced environmental platforms is no small difference.",
    JP: 'ワールド・エウローパはMSC船団初のLNG（液化天然ガス）推進船で、LNGベースの150kW固体酸化物形燃料電池（SOFC）デモユニットを搭載 — MSCはこれを現代クルーズ船初と発表しています。1週間を船で過ごす選択に迷いがあるワーケーショナーにとって、業界最先端クラスの環境仕様という事実は小さくない違いです。',
  } as L,
  tipsTitle: { KO: 'Wakation 실전 꿀팁', EN: 'Wakation field tips', JP: 'Wakation実践ヒント' } as L,
  tip1Title: { KO: '화상회의가 있다면 Browse & Stream을 사전 구매', EN: 'Video calls? Pre-buy Browse & Stream', JP: 'ビデオ会議があるならBrowse & Streamを事前購入' } as L,
  tip1Body: {
    KO: '출항 전 온라인 구매가 공식 할인 경로입니다. 텍스트 소통 위주면 Browse로 충분하고, 영상통화·스트리밍이 필요하면 Browse & Stream이 맞습니다. 위성 인터넷 특성상 지연이 있을 수 있으니, 실패하면 안 되는 발표는 기항일에 배치하세요.',
    EN: "Buying online before sailing is the official discount route. Browse covers text-based work; go Browse & Stream if you need video calls or streaming. Satellite internet can add latency, so schedule can't-fail presentations for port days.",
    JP: '出航前のオンライン購入が公式の割引ルートです。テキスト中心ならBrowseで十分、ビデオ通話・配信が必要ならBrowse & Streamが適切。衛星インターネットの特性上遅延があり得るので、失敗できない発表は寄港日に配置しましょう。',
  } as L,
  tip2Title: { KO: '13시간 시차 — 저녁에 한국 미팅, 낮은 통째로', EN: '13-hour gap — Korea meetings at night, days all yours', JP: '時差13時間 — 夜に韓国ミーティング、昼は丸ごと自由' } as L,
  tip2Body: {
    KO: '카리브(UTC-4)와 한국의 시차는 13시간. 한국의 오전 9~11시가 현지 저녁 8~10시라, 저녁에 한국 팀 미팅을 소화하면 현지의 낮 전체가 온전히 남습니다. 섬에 내리는 날과 딥 워크 데이를 항해 일정표에 맞춰 나누면 한 주가 깔끔하게 설계됩니다.',
    EN: "The Caribbean (UTC-4) sits 13 hours behind Korea. Korea's 9–11 a.m. is 8–10 p.m. local — handle Korea team meetings in the evening and the entire local day stays yours. Split island days and deep-work days along the sailing schedule and the week designs itself.",
    JP: 'カリブ（UTC-4）と韓国・日本の時差は13時間。韓国の午前9〜11時が現地の夜8〜10時なので、夜にチームミーティングをこなせば現地の昼が丸ごと残ります。島に降りる日とディープワークの日を航海スケジュールに合わせて分ければ、1週間がきれいに設計できます。',
  } as L,
  tip3Title: { KO: '항공은 유럽 경유 — 여정을 이어 붙이세요', EN: 'Flights route through Europe — chain your trip', JP: '航空便はヨーロッパ経由 — 旅程をつなげて' } as L,
  tip3Body: {
    KO: '한국에서 마르티니크·과들루프 직항은 없고 보통 파리를 경유합니다. 두 섬은 프랑스 해외 데파르트망이라 통화도 유로입니다. 파리·유럽 일정 뒤에 카리브 한 주를 얹는 구성이면 장거리 이동이 두 배로 일합니다.',
    EN: "There are no direct flights from Korea to Martinique or Guadeloupe — you'll usually connect in Paris. Both islands are French overseas departments, so the currency is the euro. Stack a Caribbean week after a Paris or Europe itinerary and the long-haul flight works twice as hard.",
    JP: '韓国・日本からマルティニーク・グアドループへの直行便はなく、通常パリ経由です。両島はフランスの海外県で通貨もユーロ。パリ・ヨーロッパ日程の後にカリブの1週間を載せる構成なら、長距離移動が2倍働きます。',
  } as L,
  tip4Title: { KO: '12월과 2월, 요금이 두 배 가까이 다릅니다', EN: 'December vs. February: fares nearly double', JP: '12月と2月で料金は2倍近く違う' } as L,
  tip4Body: {
    KO: '같은 8일 일정이 12월 연말 출발은 190만원대부터, 1월 중순~2월 출발은 110만원대부터 — 2026년 7월 28일 실측 기준입니다. 연말 연휴가 필수가 아니라면 1~2월이 유리합니다. 혼자라면 1인용 내부 객실(10㎡)도 운영됩니다.',
    EN: 'The same 8-day itinerary starts around ₩1.9M for late-December departures and around ₩1.1M for mid-January–February — as checked on July 28, 2026. If the year-end holidays are optional, January–February wins. Traveling solo? Single inside cabins (10㎡) are available too.',
    JP: '同じ8日間の日程でも、12月末出発は₩190万台から、1月中旬〜2月出発は₩110万台から — 2026年7月28日実測基準。年末年始が必須でなければ1〜2月が有利です。ひとりなら1人用内側客室（10㎡)もあります。',
  } as L,
  outroTitle: { KO: '올겨울, 지구 반대편에서.', EN: 'This winter, on the other side of the globe.', JP: 'この冬、地球の反対側で。' } as L,
  outroBody1: { KO: '한국의 한파와 카리브의 건기를 맞바꾸는 8일 —', EN: 'Eight days that trade the Korean cold snap for the Caribbean dry season —', JP: '韓国の寒波とカリブの乾季を交換する8日間 —' } as L,
  outroBody2: { KO: '21만 톤의 오피스가 겨울 시즌에만 그 바다에 있습니다.', EN: 'a 215,000-ton office that is only in those waters for the winter season.', JP: '21万トンのオフィスは冬のシーズンだけその海にいます。' } as L,
  shareTitle: { KO: '한겨울의 카리브 워케이션 — MSC 월드 유로파', EN: 'A midwinter Caribbean workation — MSC World Europa', JP: '真冬のカリブワーケーション — MSCワールド・エウローパ' } as L,
  factNote: {
    KO: '위 버튼은 제휴 링크이며, Wakation은 예약 주체가 아닙니다. 요금·운항 일정·환불 조건은 예약 페이지에서 최종 확인됩니다. 팩트 기준: MSC 공식 프레스룸·보도자료, CruiseMapper·Wikipedia·Cruise Industry News 교차, Trip.com 실측 (2026-07-28 확인).',
    EN: 'The buttons above are affiliate links; Wakation is not the booking party. Fares, sailing schedules and refund terms are confirmed on the booking page. Fact basis: MSC official pressroom and releases, cross-checked with CruiseMapper, Wikipedia and Cruise Industry News; Trip.com pricing checked 2026-07-28.',
    JP: '上のボタンはアフィリエイトリンクで、Wakationは予約主体ではありません。料金・運航日程・払い戻し条件は予約ページで最終確認されます。ファクト基準：MSC公式プレスルーム・発表資料、CruiseMapper・Wikipedia・Cruise Industry Newsで相互確認、Trip.com実測（2026-07-28確認）。',
  } as L,
  linkSerena: { KO: '바다 위에서 한 달 살기, 코스타 세레나 →', EN: 'A month at sea — Costa Serena →', JP: '海の上でひと月暮らし、コスタ・セレーナ →' } as L,
  linkStories: { KO: '모든 스토리 보기 →', EN: 'All stories →', JP: 'すべてのストーリー →' } as L,
}

function BookingCtas({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${compact ? '' : 'justify-center'}`}>
      <a
        href={TRIP_HREF}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={`${CTA_CLS} bg-brand-mid text-white hover:bg-brand-light shadow-md`}
      >
        <Ship className="w-4 h-4" />
        {C.ctaTrip[lang]}
      </a>
      <Link
        href={`${prefix}/cruise`}
        className={`${CTA_CLS} border border-gray-300 text-gray-600 hover:border-brand-mid hover:text-brand-mid`}
      >
        {C.ctaAll[lang]}
      </Link>
    </div>
  )
}

export function WorldEuropaArticle({ lang }: { lang: Lang }) {
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-cyan-950 via-blue-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-cyan-300 text-xs font-black tracking-widest uppercase mb-4">
            Winter Caribbean · MSC World Europa
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {C.heroTitle1[lang]}
            <br />
            {C.heroTitle2[lang]}
          </h1>
          <span className="block text-white/70 text-lg mt-5 max-w-xl mx-auto">{C.heroLead[lang]}</span>
          <div className="mt-8">
            <BookingCtas lang={lang} />
          </div>
          <span className="block text-white/40 text-xs mt-4">{C.heroDisclosure[lang]}</span>
        </div>
      </section>

      {/* 팩트 스트립 */}
      <section className="bg-[#ecfeff] border-b border-[#a5f3fc] px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {C.facts[lang].map(([v, l]) => (
            <div key={v}>
              <span className="block font-black text-[#155e75]">{v}</span>
              <span className="block text-xs text-[#0e7490] mt-0.5">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 추천 타겟 */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">{C.targetsTitle[lang]}</h2>
          <div className="space-y-5">
            {C.targets[lang].map(([t, d], i) => (
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
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">{C.whyTitle[lang]}</h2>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Ship className="w-5 h-5 text-brand-mid" />{C.why1Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why1Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Wifi className="w-5 h-5 text-brand-mid" />{C.why2Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why2Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Sun className="w-5 h-5 text-brand-mid" />{C.why3Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why3Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Leaf className="w-5 h-5 text-brand-mid" />{C.why4Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why4Body[lang]}</p>
          </div>
        </div>
      </section>

      {/* 실전 꿀팁 */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">{C.tipsTitle[lang]}</h2>
          <div className="space-y-5">
            {[
              [Wifi, C.tip1Title, C.tip1Body],
              [Clock, C.tip2Title, C.tip2Body],
              [Plane, C.tip3Title, C.tip3Body],
              [AlertCircle, C.tip4Title, C.tip4Body],
            ].map(([Icon, title, body]) => {
              const IconCmp = Icon as typeof Wifi
              const t = title as L
              const b = body as L
              return (
                <div key={t.KO} className="flex gap-4 rounded-2xl border border-gray-200 p-6">
                  <IconCmp className="shrink-0 w-6 h-6 text-brand-mid" />
                  <div>
                    <span className="block font-black text-gray-900">{t[lang]}</span>
                    <span className="block text-gray-500 text-sm mt-1 leading-relaxed">{b[lang]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-blue-950 to-cyan-950 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">{C.outroTitle[lang]}</h2>
          <span className="block text-white/70 mt-4">
            {C.outroBody1[lang]}
            <br />
            {C.outroBody2[lang]}
          </span>
          <div className="mt-8">
            <BookingCtas lang={lang} />
          </div>
          <div className="mt-4 flex justify-center">
            <ShareButton title={C.shareTitle[lang]} />
          </div>
          <span className="block text-white/40 text-xs mt-6 leading-relaxed">{C.factNote[lang]}</span>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`${prefix}/cruise/serena`} className="text-cyan-300 text-sm font-bold hover:text-cyan-200">
              {C.linkSerena[lang]}
            </Link>
            <Link href={`${prefix}/stories`} className="text-cyan-300 text-sm font-bold hover:text-cyan-200">
              {C.linkStories[lang]}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
