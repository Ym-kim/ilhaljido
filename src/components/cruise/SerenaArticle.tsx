import Link from 'next/link'
import { Ship, Wifi, Utensils, Anchor, Clock, AlertCircle, Compass, Globe } from 'lucide-react'
import { ShareButton } from '@/components/share/ShareButton'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 코스타 세레나 그랜드 보야지 에디토리얼 — 3언어 뷰 (2026-08-13 i18n 추출)
// 팩트 검증 기록은 원본과 동일(2026-07-28) — KO 카피가 원문이며 EN/JP는 번역.
// 수치·날짜·가격은 3언어 동일 값 유지. 팩트 갱신 시 이 파일 한 곳만 수정한다.
// 원 검증 주석 요지: 약 11만 4천 톤·2007 취항·객실 1,507 / 스타링크 = Carnival
// 2024-05 함대 완료 발표에 Costa 명시 / 와이파이 공식 가격 미검증 → 수치 미표기·
// 실탑승 불만 정직 명시 / 2027-04 출항 4개 일정 ₩1,553,197~ = kr.trip.com 실측
// 2026-07-28 / 일당 약 8만원대 = 최저가 기준 산술.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const TRIP_HREF = 'https://kr.trip.com/cruises/ship-costa-costaserena-35?curr=KRW&Allianceid=9024807'

const CTA_CLS =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all'

const C = {
  ctaTrip: { KO: 'Trip.com에서 일정·요금 보기', EN: 'See dates & fares on Trip.com', JP: 'Trip.comで日程・料金を見る' } as L,
  ctaAll: { KO: '크루즈 워케이션 전체 보기', EN: 'All cruise workations', JP: 'クルーズワーケーション一覧' } as L,
  heroTitle1: { KO: '한 달 살기,', EN: 'A month-long stay —', JP: 'ひと月暮らし、' } as L,
  heroTitle2: { KO: '이번엔 바다 위', EN: 'this time, at sea', JP: '今度は海の上' } as L,
  heroLead: {
    KO: '남미에서 유럽까지, 19~23일의 대서양 횡단. 숙박과 식사가 요금 하나에 묶인 리포지셔닝 크루즈 — 배가 이사하는 3주에 올라타는 가장 긴 워케이션입니다.',
    EN: 'South America to Europe: a 19–23 day Atlantic crossing. A repositioning cruise bundles lodging and meals into one fare — the longest workation you can board, riding the three weeks a ship takes to move house.',
    JP: '南米からヨーロッパへ、19〜23日の大西洋横断。宿泊と食事がひとつの料金にまとまったリポジショニングクルーズ — 船が引っ越す3週間に乗り込む、最長のワーケーションです。',
  } as L,
  heroDisclosure: {
    KO: '제휴 링크입니다 · 요금과 운항 일정은 예약 페이지에서 최종 확인됩니다',
    EN: 'Affiliate links · Final fares and sailing dates are confirmed on the booking page',
    JP: 'アフィリエイトリンクです · 料金・運航日程は予約ページで最終確認されます',
  } as L,
  facts: {
    KO: [
      ['약 11만 4천 톤 · 객실 1,507', '2007 취항 · 전장 289.6m'],
      ['스타링크 함대', 'Carnival 2024년 5월 완료 발표'],
      ['2025년 11월 리핏', '레스토랑 3곳 신설 · 풀덱 리노베이션'],
      ['19~23일 ₩1,553,197~', '하루 약 8만원대 (7.28 실측)'],
    ],
    EN: [
      ['~114,000 GT · 1,507 cabins', 'Debuted 2007 · 289.6m long'],
      ['Starlink fleet', 'Carnival announced completion May 2024'],
      ['Nov 2025 refit', '3 new restaurants · pool deck renovated'],
      ['19–23 days from ₩1,553,197', 'About ₩80K per day (checked Jul 28)'],
    ],
    JP: [
      ['約11万4千トン · 客室1,507', '2007年就航 · 全長289.6m'],
      ['スターリンク船団', 'Carnival 2024年5月完了発表'],
      ['2025年11月リフィット', 'レストラン3カ所新設 · プールデッキ改装'],
      ['19〜23日 ₩1,553,197〜', '1日約8万ウォン台（7/28実測）'],
    ],
  } as Record<Lang, string[][]>,
  targetsTitle: { KO: '이런 분께 추천합니다', EN: 'Who this is for', JP: 'こんな方におすすめ' } as L,
  targets: {
    KO: [
      ['안식월을 계획 중인 사람', '퇴사와 이직 사이, 긴 프로젝트가 끝난 뒤의 공백. 비행기표 여러 장과 숙소 예약 대신, 체크인 한 번으로 3주가 통째로 설계됩니다. 숙박·식사·이동이 요금 하나에 묶여 있으니까요.'],
      ['비동기로 일하는 리모트 워커', '문서와 코드로 일하고 회의가 적다면, 대양 항해는 그 자체로 딥 워크 리트리트입니다. 다만 대양 한가운데의 위성 연결은 편차가 있습니다 — 실시간 화상회의보다 비동기 업무에 어울리는 배입니다.'],
      ['한 달 살기의 다음 편을 찾는 사람', '치앙마이도 발리도 다녀왔다면, 다음 목적지는 도시가 아니라 항로일 수 있습니다. 매일 아침 위도가 바뀌는 한 달 — 항해가 끝나면 당신은 반대편 대륙에 있습니다.'],
    ],
    EN: [
      ['Anyone planning a sabbatical month', 'Between jobs, or after a long project wraps. Instead of a stack of flight tickets and hotel bookings, one check-in designs three whole weeks — lodging, meals and the crossing itself bundled into a single fare.'],
      ['Remote workers who work async', "If your work lives in documents and code with few meetings, an ocean crossing is a deep-work retreat in itself. But satellite connectivity mid-ocean does vary — this is a ship for asynchronous work, not live video calls."],
      ['People looking for the next month-long stay', "Done Chiang Mai, done Bali? Your next destination may be a route, not a city. A month where the latitude changes every morning — and when the crossing ends, you're on the opposite continent."],
    ],
    JP: [
      ['サバティカル月を計画中の人', '退職と転職の間、長いプロジェクトが終わった後の空白に。何枚もの航空券と宿の予約の代わりに、チェックイン1回で3週間がまるごと設計されます。宿泊・食事・移動がひとつの料金にまとまっているからです。'],
      ['非同期で働くリモートワーカー', 'ドキュメントとコードで働き会議が少ないなら、大洋航海はそれ自体がディープワーク・リトリートです。ただし大洋のど真ん中の衛星接続にはムラがあります — リアルタイムのビデオ会議より非同期業務に向いた船です。'],
      ['ひと月暮らしの次の一手を探す人', 'チェンマイもバリも行ったなら、次の目的地は都市ではなく航路かもしれません。毎朝緯度が変わるひと月 — 航海が終わると、あなたは反対側の大陸にいます。'],
    ],
  } as Record<Lang, string[][]>,
  whyTitle: { KO: '왜 이 항해인가', EN: 'Why this voyage', JP: 'なぜこの航海か' } as L,
  why1Title: { KO: '배가 이사하는 날, 요금 구조가 달라진다', EN: 'When a ship moves house, the fare structure changes', JP: '船が引っ越す日、料金構造が変わる' } as L,
  why1Body: {
    KO: '크루즈선은 시즌이 끝나면 다음 시즌의 바다로 편도 이동합니다 — 이것이 리포지셔닝(재배치) 항해입니다. 코스타 세레나는 2026년 11월부터 남미 시즌을 보낸 뒤, 2027년 4월 유럽으로 돌아갑니다. 부에노스아이레스·리우데자네이루에서 출발해 브라질 해안을 오르고, 대서양을 건너 스페인·포르투갈을 거쳐 마르세유·사보나에 닿는 19~23일 — 4개 일정이 열려 있고, 2026년 7월 28일 실측 기준 ₩1,553,197부터입니다.',
    EN: 'When a season ends, a cruise ship sails one-way to its next sea — that is a repositioning voyage. Costa Serena spends the South America season from November 2026, then returns to Europe in April 2027. Departing Buenos Aires or Rio de Janeiro, climbing the Brazilian coast, crossing the Atlantic via Spain and Portugal to reach Marseille or Savona in 19–23 days — four itineraries are open, from ₩1,553,197 as checked on July 28, 2026.',
    JP: 'クルーズ船はシーズンが終わると次のシーズンの海へ片道移動します — これがリポジショニング（再配置）航海です。コスタ・セレーナは2026年11月から南米シーズンを過ごした後、2027年4月にヨーロッパへ戻ります。ブエノスアイレス・リオデジャネイロを出発してブラジル沿岸を北上し、大西洋を渡ってスペイン・ポルトガルを経てマルセイユ・サボナに着く19〜23日 — 4つの日程が開いており、2026年7月28日実測で₩1,553,197からです。',
  } as L,
  why2Title: { KO: '하루 8만원대에 숙박·식사·대륙 이동까지', EN: 'Lodging, meals and a continent crossing — around ₩80K a day', JP: '1日8万ウォン台で宿泊・食事・大陸移動まで' } as L,
  why2Body: {
    KO: '최저가 19일 일정 기준으로 나누면 하루 약 8만 2천원. 여기에 객실 숙박, 메인 다이닝·뷔페 식사, 그리고 남미에서 유럽까지의 이동이 모두 포함됩니다(스페셜티 레스토랑·음료 패키지는 별도). 2025년 11월 드라이독 리핏에서는 미쉐린 스타 셰프 3인이 협업한 스페셜티 레스토랑 아키펠라고와 피자리아, 스시 바가 새로 들어왔고 풀덱과 메인 레스토랑이 리노베이션됐습니다 — 3주 항해의 저녁이 단조롭지 않도록.',
    EN: "Divide the lowest 19-day fare and it comes to roughly ₩82,000 a day — covering your cabin, main dining and buffet meals, and the crossing from South America to Europe (specialty restaurants and drink packages are extra). The November 2025 dry-dock refit added Archipelago, a specialty restaurant created with three Michelin-starred chefs, plus a pizzeria and a sushi bar, and renovated the pool deck and main restaurants — so three weeks of dinners don't wear thin.",
    JP: '最安の19日日程で割ると1日約8万2千ウォン。そこに客室宿泊、メインダイニング・ビュッフェの食事、そして南米からヨーロッパまでの移動がすべて含まれます（スペシャリティレストラン・ドリンクパッケージは別途）。2025年11月のドライドック・リフィットでは、ミシュラン星付きシェフ3人が協業したスペシャリティレストラン「アーキペラゴ」とピッツェリア、寿司バーが新設され、プールデッキとメインレストランが改装されました — 3週間の航海の夜が単調にならないように。',
  } as L,
  why3Title: { KO: '스타링크 함대가 된 코스타 — 단, 정직하게', EN: 'Costa joined the Starlink fleet — with an honest caveat', JP: 'スターリンク船団になったコスタ — ただし正直に' } as L,
  why3Body: {
    KO: 'Carnival 그룹은 2024년 5월 전 세계 함대 100%에 스타링크 설치를 완료했다고 발표했고, 이 명단에 Costa가 명시돼 있습니다. 와이파이 패키지는 메신저·SNS·무제한 3단계로 나뉘며 가격은 항로마다 다릅니다(예약 후 공식 채널에서 확인 권장). 다만 실탑승 후기에는 속도·가격 불만도 있습니다 — 화상회의가 업무의 중심이라면 이 배는 답이 아닙니다. 문서·코드 중심의 비동기 업무를 전제로 설계하고, 실시간이 필요한 일정은 기항일에 배치하는 편이 안전합니다.',
    EN: "In May 2024, Carnival Corporation announced Starlink installation completed across 100% of its global fleet, with Costa named on the list. Wi-Fi packages come in three tiers — messenger, social, unlimited — with prices varying by route (confirm via official channels after booking). That said, passenger reviews do include complaints about speed and price — if video calls are the center of your work, this is not your ship. Plan around document- and code-centric async work, and schedule anything real-time for port days.",
    JP: 'Carnivalグループは2024年5月、全世界の船団100%へのスターリンク設置完了を発表し、そのリストにCostaが明記されています。Wi-Fiパッケージはメッセンジャー・SNS・無制限の3段階で、価格は航路ごとに異なります（予約後に公式チャネルでの確認推奨）。ただし実乗船レビューには速度・価格への不満もあります — ビデオ会議が業務の中心ならこの船は答えではありません。ドキュメント・コード中心の非同期業務を前提に設計し、リアルタイムが必要な予定は寄港日に配置するのが安全です。',
  } as L,
  why4Title: { KO: '아시아에 상주해온, 한국과 인연이 깊은 배', EN: 'An Asia-based ship with deep Korean ties', JP: 'アジアに常駐してきた、韓国と縁の深い船' } as L,
  why4Body: {
    KO: '코스타 세레나는 2015년부터 아시아에 상주해 왔고, 2023년엔 팬데믹 이후 한국 아웃바운드 크루즈(부산·속초·포항 출발)를 가장 먼저 재개한 국제 선사가 됐습니다. 2026년에도 일본·대만·한국을 도는 아시아 일정을 운항 중이며, 10월 18일 도쿄에서 66일 월드크루즈로 출항해 12월 22일 부에노스아이레스에 닿습니다. 그리고 이듬해 4월, 이 그랜드 보야지로 유럽에 돌아갑니다 — 지금 판매 중인 4개 일정이 바로 그 마지막 구간입니다.',
    EN: 'Costa Serena has been based in Asia since 2015, and in 2023 Costa became the first international line to restart Korea-outbound cruises after the pandemic (departing Busan, Sokcho and Pohang). Through 2026 she keeps sailing Asian itineraries around Japan, Taiwan and Korea, then departs Tokyo on October 18 on a 66-day world cruise, reaching Buenos Aires on December 22. The following April she returns to Europe on this grand voyage — the four itineraries on sale now are that final leg.',
    JP: 'コスタ・セレーナは2015年からアジアに常駐し、2023年にはパンデミック後の韓国アウトバウンドクルーズ（釜山・束草・浦項発）を最初に再開した国際船社になりました。2026年も日本・台湾・韓国を巡るアジア日程を運航中で、10月18日に東京から66日のワールドクルーズに出航し、12月22日にブエノスアイレスへ。そして翌年4月、このグランドボヤージュでヨーロッパに戻ります — いま販売中の4日程がまさにその最終区間です。',
  } as L,
  tipsTitle: { KO: 'Wakation 실전 꿀팁', EN: 'Wakation field tips', JP: 'Wakation実践ヒント' } as L,
  tip1Title: { KO: '와이파이는 전 일정 패키지, 업무는 비동기 설계', EN: 'Buy the full-voyage Wi-Fi package; design work async', JP: 'Wi-Fiは全日程パッケージ、業務は非同期設計' } as L,
  tip1Body: {
    KO: '장기 항해는 일 단위 구매보다 전 일정 패키지가 정석입니다. 공식 가격은 항로별로 달라 예약 후 코스타 공식 채널에서 확인하세요. 마감·발표처럼 실패하면 안 되는 일정은 위성 연결에 걸지 말고, 기항일의 육지 네트워크에 배치하는 게 안전합니다.',
    EN: "On long voyages, the full-voyage package beats daily purchases. Official prices vary by route — confirm through Costa's official channels after booking. Don't stake deadlines or presentations on the satellite link; schedule them for shore networks on port days.",
    JP: '長期航海は日単位購入より全日程パッケージが定石です。公式価格は航路ごとに異なるので、予約後にコスタ公式チャネルで確認を。締め切りや発表など失敗できない予定は衛星接続に賭けず、寄港日の陸上ネットワークに配置するのが安全です。',
  } as L,
  tip2Title: { KO: '시차 적응이 공짜다 — 하루하루 조금씩', EN: 'Jet-lag adjustment comes free — an hour at a time', JP: '時差調整がタダ — 毎日少しずつ' } as L,
  tip2Body: {
    KO: '비행기로 대륙을 건너면 시차병이 따라오지만, 배는 시간대를 며칠에 한 시간씩 통과합니다. 남미 출발 시점엔 한국과 밤낮이 거의 반대지만, 유럽에 가까워질수록 한국의 오후와 겹치는 저녁 협업 시간이 생깁니다. 한국 팀과 일한다면 실시간 미팅은 항해 후반부에 몰아두세요.',
    EN: "Cross a continent by plane and jet lag follows; a ship passes time zones an hour every few days. At the South American start, day and night are nearly reversed from Korea — but as you near Europe, your evenings start overlapping Korea's afternoons. Working with a Korean team? Pack real-time meetings into the second half of the voyage.",
    JP: '飛行機で大陸を渡ると時差ボケがついてきますが、船は数日に1時間ずつタイムゾーンを通過します。南米出発時点では韓国・日本と昼夜がほぼ逆ですが、ヨーロッパに近づくほど、こちらの夕方が韓国の午後と重なる協業時間が生まれます。実時間ミーティングは航海の後半にまとめましょう。',
  } as L,
  tip3Title: { KO: '3주 항해의 현실 체크', EN: 'A reality check for three weeks at sea', JP: '3週間航海の現実チェック' } as L,
  tip3Body: {
    KO: '내측 객실은 13㎡ — 사흘은 아늑해도 3주는 다릅니다. 장기 항해일수록 창문과 발코니의 가치가 커지고, 저가 객실은 먼저 소진됩니다. 그리고 편도 항해라는 점도 기억하세요: 남미로 가는 항공편과 유럽에서 돌아오는 항공편, 두 장이 총예산에 들어갑니다.',
    EN: "Inside cabins are 13㎡ — cozy for three days, different for three weeks. The longer the voyage, the more windows and balconies matter, and the cheapest cabins sell out first. And remember it's one-way: a flight to South America and a flight back from Europe both belong in your total budget.",
    JP: '内側客室は13㎡ — 3日なら心地よくても3週間は別物です。長期航海ほど窓とバルコニーの価値が増し、低価格客室から先に売り切れます。そして片道航海であることもお忘れなく：南米行きの航空券とヨーロッパからの帰りの航空券、2枚が総予算に入ります。',
  } as L,
  tip4Title: { KO: '19일이냐 23일이냐 — 출발 도시로 고르기', EN: '19 days or 23 — choose by departure city', JP: '19日か23日か — 出発都市で選ぶ' } as L,
  tip4Body: {
    KO: '리우데자네이루 출발(4/8)이 19~20일로 더 짧고 저렴하고, 부에노스아이레스 출발(4/5)은 22~23일로 깁니다. 도착지도 마르세유(프랑스)와 사보나(이탈리아)로 나뉘니, 항해 뒤 유럽 일정에 맞춰 고르세요. 네 일정 모두 2027년 4월 출항 — 준비 시간은 충분합니다.',
    EN: 'Rio de Janeiro departures (Apr 8) run shorter and cheaper at 19–20 days; Buenos Aires departures (Apr 5) run longer at 22–23. Arrival ports split between Marseille (France) and Savona (Italy), so pick by your post-voyage Europe plans. All four itineraries sail in April 2027 — plenty of time to prepare.',
    JP: 'リオデジャネイロ発（4/8）が19〜20日で短く安価、ブエノスアイレス発（4/5）は22〜23日と長め。到着地もマルセイユ（フランス）とサボナ（イタリア）に分かれるので、航海後のヨーロッパ日程に合わせて選びましょう。4日程すべて2027年4月出航 — 準備時間は十分です。',
  } as L,
  outroTitle: { KO: '2027년 4월, 남미에서 유럽으로.', EN: 'April 2027 — South America to Europe.', JP: '2027年4月、南米からヨーロッパへ。' } as L,
  outroBody1: { KO: '배가 이사하는 3주에 올라타는 것 —', EN: 'Boarding the three weeks a ship takes to move house —', JP: '船が引っ越す3週間に乗り込むこと —' } as L,
  outroBody2: { KO: '바다 위 한 달 살기는 그렇게 시작됩니다.', EN: 'that is how a month-long stay at sea begins.', JP: '海の上のひと月暮らしはそうして始まります。' } as L,
  shareTitle: { KO: '바다 위에서 한 달 살기 — 코스타 세레나 그랜드 보야지', EN: 'A month at sea — Costa Serena Grand Voyage', JP: '海の上でひと月暮らし — コスタ・セレーナ グランドボヤージュ' } as L,
  factNote: {
    KO: '위 버튼은 제휴 링크이며, Wakation은 예약 주체가 아닙니다. 요금·운항 일정·환불 조건은 예약 페이지에서 최종 확인됩니다. 팩트 기준: Carnival Corp·Costa 공식 보도자료, VesselFinder·CruiseMapper·Cruise Industry News 교차, Trip.com 실측 (2026-07-28 확인).',
    EN: 'The buttons above are affiliate links; Wakation is not the booking party. Fares, sailing schedules and refund terms are confirmed on the booking page. Fact basis: Carnival Corp and Costa official releases, cross-checked with VesselFinder, CruiseMapper and Cruise Industry News; Trip.com pricing checked 2026-07-28.',
    JP: '上のボタンはアフィリエイトリンクで、Wakationは予約主体ではありません。料金・運航日程・払い戻し条件は予約ページで最終確認されます。ファクト基準：Carnival Corp・Costa公式発表資料、VesselFinder・CruiseMapper・Cruise Industry Newsで相互確認、Trip.com実測（2026-07-28確認）。',
  } as L,
  linkBellissima: { KO: '17만 톤의 스타링크 오피스, MSC 벨리시마 →', EN: 'A 171,000-ton Starlink office — MSC Bellissima →', JP: '17万トンのスターリンク・オフィス、MSCベリッシマ →' } as L,
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

export function SerenaArticle({ lang }: { lang: Lang }) {
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-amber-950 via-orange-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-amber-300 text-xs font-black tracking-widest uppercase mb-4">
            Grand Voyage · Costa Serena
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
      <section className="bg-[#fffbeb] border-b border-[#fde68a] px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {C.facts[lang].map(([v, l]) => (
            <div key={v}>
              <span className="block font-black text-[#78350f]">{v}</span>
              <span className="block text-xs text-[#a16207] mt-0.5">{l}</span>
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
              <Anchor className="w-5 h-5 text-brand-mid" />{C.why1Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why1Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Utensils className="w-5 h-5 text-brand-mid" />{C.why2Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why2Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Wifi className="w-5 h-5 text-brand-mid" />{C.why3Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why3Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Globe className="w-5 h-5 text-brand-mid" />{C.why4Title[lang]}
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
              [AlertCircle, C.tip3Title, C.tip3Body],
              [Compass, C.tip4Title, C.tip4Body],
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
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-orange-950 to-amber-950 px-6 py-20">
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
            <Link href={`${prefix}/cruise/bellissima`} className="text-amber-300 text-sm font-bold hover:text-amber-200">
              {C.linkBellissima[lang]}
            </Link>
            <Link href={`${prefix}/stories`} className="text-amber-300 text-sm font-bold hover:text-amber-200">
              {C.linkStories[lang]}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
