import Link from 'next/link'
import { Ship, Wifi, Utensils, Anchor, Clock, AlertCircle, Users } from 'lucide-react'
import { ShareButton } from '@/components/share/ShareButton'
import { localizeOutboundHref } from '@/lib/affiliate/linkLocale'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// MSC 벨리시마 크루즈 워케이션 에디토리얼 — 3언어 뷰 (2026-08-13 i18n 추출)
// 팩트 검증 기록은 원본과 동일(2026-07-26) — KO 카피가 원문이며 EN/JP는 번역.
// 원 검증 주석 요지: 171,598GT·2019 취항·약 315m·데크 19·객실 2,244 = MSC 공식 /
// 스타링크·패키지 2종 = MSC 보도자료 2024-02-28 / 2027-06-14 인천 첫 출항·인천 연중
// 모항·롯데관광개발 3년 전세선·2028 2호선·2029 3호선 = 교차 확인 /
// ⚠️ "2026년 인천 출항"은 오보 — 2026년은 부산 승선만 / 가격 ₩341,523~(인천 3박4일)
// ·₩786,671~(부산 5일) = kr.trip.com 실측 2026-07-26.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const TRIP_HREF = 'https://kr.trip.com/cruises/ship-msc-mscbellissima-496?curr=KRW&Allianceid=9024807'

const CTA_CLS =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all'

const C = {
  ctaTrip: { KO: 'Trip.com에서 일정·요금 보기', EN: 'See dates & fares on Trip.com', JP: 'Trip.comで日程・料金を見る' } as L,
  ctaAll: { KO: '크루즈 워케이션 전체 보기', EN: 'All cruise workations', JP: 'クルーズワーケーション一覧' } as L,
  heroTitle1: { KO: '17만 톤의', EN: 'A 171,000-ton', JP: '17万トンの' } as L,
  heroTitle2: { KO: '스타링크 오피스', EN: 'Starlink office', JP: 'スターリンク・オフィス' } as L,
  heroLead: {
    KO: '바다 한가운데서도 끊기지 않는 와이파이, 다이닝 12곳, 96m 프로메나드. 2027년 6월부터는 인천이 이 배의 집이 됩니다 — 크루즈 워케이션의 다음 챕터.',
    EN: 'Wi-Fi that holds in the middle of the sea, twelve dining venues, a 96-meter promenade. From June 2027, Incheon becomes this ship’s home — the next chapter of the cruise workation.',
    JP: '海の真ん中でも途切れないWi-Fi、ダイニング12カ所、96mのプロムナード。2027年6月からは仁川がこの船の家になります — クルーズワーケーションの次の章。',
  } as L,
  heroDisclosure: {
    KO: '제휴 링크입니다 · 요금과 운항 일정은 예약 페이지에서 최종 확인됩니다',
    EN: 'Affiliate links · Final fares and sailing dates are confirmed on the booking page',
    JP: 'アフィリエイトリンクです · 料金・運航日程は予約ページで最終確認されます',
  } as L,
  facts: {
    KO: [
      ['171,598톤 · 19데크', '길이 약 315m · 객실 2,244실'],
      ['스타링크 와이파이', '2024년 설치 완료 (MSC 공식)'],
      ['다이닝 12 · 바 20', '96m 프로메나드 + LED 돔'],
      ['2027.6 인천 모항', '2026년은 부산 승선 판매 중'],
    ],
    EN: [
      ['171,598 GT · 19 decks', '~315m long · 2,244 cabins'],
      ['Starlink Wi-Fi', 'Installed 2024 (MSC official)'],
      ['12 dining · 20 bars', '96m promenade + LED dome'],
      ['Incheon home port Jun 2027', '2026 sails from Busan'],
    ],
    JP: [
      ['171,598トン · 19デッキ', '全長約315m · 客室2,244室'],
      ['スターリンクWi-Fi', '2024年設置完了（MSC公式）'],
      ['ダイニング12 · バー20', '96mプロムナード＋LEDドーム'],
      ['2027.6 仁川母港', '2026年は釜山乗船を販売中'],
    ],
  } as Record<Lang, string[][]>,
  targetsTitle: { KO: '이런 분께 추천합니다', EN: 'Who this is for', JP: 'こんな方におすすめ' } as L,
  targets: {
    KO: [
      ['화상회의를 끊을 수 없는 리모트 워커', '오프라인 몰입형 크루즈가 부담스러웠다면 이 배는 반대편 답입니다. 스타링크 기반 선내 와이파이와 스트리밍급 패키지로, 바다 위에서도 팀과 연결된 채 일할 수 있습니다.'],
      ['아이와 함께 떠나는 워케이셔너', '레고 키즈클럽과 아쿠아파크가 공식 시설로 갖춰져 있습니다. 아이가 노는 시간이 곧 나의 집중 시간 — 가족 워케이션의 현실적인 답안지입니다.'],
      ['크루즈가 처음인 워케이셔너', '3박 4일 인천 출발 일정이 30만원대부터 열려 있습니다(2026-07 기준 실측). 일주일씩 비울 수 없어도, 짧게 바다 위 오피스를 시험해 볼 수 있습니다.'],
    ],
    EN: [
      ["Remote workers who can't skip video calls", 'If offline-immersion cruises felt like a risk, this ship is the opposite answer: Starlink-based onboard Wi-Fi with a streaming-grade package keeps you connected to your team at sea.'],
      ['Workationers traveling with kids', 'A LEGO kids club and an aqua park are official facilities. The hours your child plays become your focus hours — a realistic answer sheet for the family workation.'],
      ['First-time cruise workationers', 'Incheon-departure 3-night itineraries open from the ₩300K range (checked July 2026). Even if you can’t take a week off, you can trial the office-at-sea in a short hop.'],
    ],
    JP: [
      ['ビデオ会議を欠かせないリモートワーカー', 'オフライン没入型クルーズが不安だったなら、この船は反対側の答えです。スターリンクベースの船内Wi-Fiと配信級パッケージで、海の上でもチームとつながったまま働けます。'],
      ['子ども連れのワーケーショナー', 'レゴキッズクラブとアクアパークが公式施設として揃っています。子どもが遊ぶ時間がそのまま自分の集中時間 — ファミリーワーケーションの現実的な答案です。'],
      ['クルーズ初体験のワーケーショナー', '3泊4日の仁川発日程が30万ウォン台から開いています（2026-07実測基準）。1週間空けられなくても、短く海上オフィスを試せます。'],
    ],
  } as Record<Lang, string[][]>,
  whyTitle: { KO: '왜 이 배인가', EN: 'Why this ship', JP: 'なぜこの船か' } as L,
  why1Title: { KO: '바다 위에서 끊기지 않는 오피스', EN: 'An office that stays online at sea', JP: '海の上で途切れないオフィス' } as L,
  why1Body: {
    KO: 'MSC는 2024년 전 함대에 스타링크 위성 인터넷 설치를 완료했다고 공식 발표했습니다. 벨리시마의 와이파이 패키지는 두 종 — 웹서핑·메신저 중심의 Browse, 스트리밍까지 커버하는 Browse & Stream. 둘 다 무제한 데이터에 24시간 사용이며, 출항 전 미리 구매하면 할인됩니다. ‘바다 위 = 오프라인’이라는 크루즈 워케이션의 오래된 전제가 이 배에서는 옵션이 됩니다.',
    EN: 'MSC officially announced fleet-wide Starlink installation completed in 2024. Bellissima runs two Wi-Fi packages — Browse for web and messaging, Browse & Stream covering streaming — both unlimited, 24-hour, discounted when pre-purchased before sailing. The old cruise-workation premise that “at sea = offline” becomes optional on this ship.',
    JP: 'MSCは2024年、全船団へのスターリンク衛星インターネット設置完了を公式発表しました。ベリッシマのWi-Fiパッケージは2種 — ウェブ・メッセンジャー中心のBrowseと、配信までカバーするBrowse & Stream。どちらも無制限データで24時間利用でき、出航前の事前購入で割引になります。「海の上＝オフライン」というクルーズワーケーションの古い前提が、この船ではオプションになります。',
  } as L,
  why2Title: { KO: '출퇴근이 산책이 되는 움직이는 도시', EN: 'A moving city where commuting becomes a stroll', JP: '通勤が散歩になる、動く都市' } as L,
  why2Body: {
    KO: '171,598톤, 약 315m, 19개 데크, 객실 2,244실. 배 안에는 다이닝 12곳과 바 20곳, 985석 런던 시어터, 1,100㎡ 스파가 들어 있습니다. 중심가는 길이 96m의 갤러리아 프로메나드 — 머리 위로 80m LED 돔 천장이 펼쳐지는 실내 거리입니다. 오전 업무를 마치고 프로메나드를 걸어 점심을 먹으러 가는 동선은, 사무실 복도가 아니라 도시의 산책로에 가깝습니다.',
    EN: '171,598 gross tons, about 315 meters, 19 decks, 2,244 cabins. Inside: twelve dining venues, twenty bars, a 985-seat London Theatre and an 1,100㎡ spa. The main street is the 96-meter Galleria promenade, an indoor boulevard under an 80-meter LED dome ceiling. Finishing the morning’s work and walking the promenade to lunch feels less like an office corridor and more like a city walk.',
    JP: '171,598トン、約315m、19デッキ、客室2,244室。船内にはダイニング12カ所とバー20カ所、985席のロンドン・シアター、1,100㎡のスパ。メインストリートは全長96mのガレリア・プロムナード — 頭上に80mのLEDドーム天井が広がる屋内街です。午前の仕事を終えてプロムナードを歩いてランチへ向かう動線は、オフィスの廊下ではなく都市の散歩道に近い。',
  } as L,
  why3Title: { KO: '2027년, 인천이 모항이 된다', EN: 'In 2027, Incheon becomes home port', JP: '2027年、仁川が母港になる' } as L,
  why3Body: {
    KO: '롯데관광개발이 MSC와 국내 첫 전세선 3년 파트너십을 맺으면서, 벨리시마는 2027년 6월 14일 인천에서 첫 출항합니다(인천→대만 기륭→일본 사세보, 6박 7일). 이후 인천 연중 모항으로 운항하며, 2028년 2호선·2029년 3호선 투입 계획도 발표돼 있습니다. 비행기 없이 집 앞에서 초대형 크루즈를 타는 시대 — 2026년 현재는 부산 승선 일정(상하이·서귀포 기항 5일 등)과 2027년 인천 출발 일정이 함께 판매되고 있습니다.',
    EN: 'With Lotte Tour Development signing Korea’s first three-year charter partnership with MSC, Bellissima makes her first Incheon departure on June 14, 2027 (Incheon → Keelung, Taiwan → Sasebo, Japan; 6 nights 7 days), then sails Incheon as a year-round home port — with a second ship planned for 2028 and a third for 2029. Boarding a mega-cruise from your doorstep, no flight required. As of 2026, Busan-boarding itineraries (5 days via Shanghai and Seogwipo, etc.) and 2027 Incheon departures are on sale together.',
    JP: 'ロッテ観光開発がMSCと韓国初のチャーター3年パートナーシップを結び、ベリッシマは2027年6月14日に仁川から初出航します（仁川→台湾・基隆→日本・佐世保、6泊7日）。以降は仁川を通年母港として運航し、2028年に2隻目・2029年に3隻目の投入計画も発表済み。飛行機なしで家の前から超大型クルーズに乗る時代 — 2026年現在は釜山乗船日程（上海・西帰浦寄港5日など）と2027年仁川出発日程が併売されています。',
  } as L,
  why4Title: { KO: '요금 하나에 숙박·다이닝·이동', EN: 'One fare: lodging, dining, transit', JP: '料金ひとつに宿泊・ダイニング・移動' } as L,
  why4Body: {
    KO: '크루즈 요금에는 숙박과 메인 다이닝·뷔페 식사가 기본 포함됩니다(스페셜티 레스토랑은 별도). 인천 출발 3박 4일 일정이 ₩341,523부터, 부산 출발 5일 일정이 ₩786,671부터 — 2026년 7월 26일 Trip.com 실측 기준이며, 객실 등급과 시즌에 따라 달라지니 예약 페이지에서 최종 확인하세요.',
    EN: 'Cruise fares include lodging plus main dining and buffet meals as standard (specialty restaurants extra). Incheon-departure 3-night itineraries from ₩341,523; Busan-departure 5-day itineraries from ₩786,671 — as checked on Trip.com on July 26, 2026. Fares vary by cabin class and season, so confirm on the booking page.',
    JP: 'クルーズ料金には宿泊とメインダイニング・ビュッフェの食事が基本で含まれます（スペシャリティレストランは別途）。仁川発3泊4日が₩341,523から、釜山発5日が₩786,671から — 2026年7月26日のTrip.com実測基準で、客室グレードとシーズンにより変わるため予約ページで最終確認を。',
  } as L,
  tipsTitle: { KO: 'Wakation 실전 꿀팁', EN: 'Wakation field tips', JP: 'Wakation実践ヒント' } as L,
  tip1Title: { KO: '와이파이 패키지는 출항 전에 사세요', EN: 'Buy the Wi-Fi package before sailing', JP: 'Wi-Fiパッケージは出航前に購入を' } as L,
  tip1Body: {
    KO: '사전 구매 할인이 공식 정책입니다. 화상회의·스트리밍이 필요하면 Browse & Stream, 텍스트 소통 위주면 Browse로 충분합니다. 다만 위성 인터넷 특성상 지연이 있을 수 있으니, 중요한 발표는 기항일에 배정하는 편이 안전합니다.',
    EN: 'Pre-purchase discounts are official policy. Go Browse & Stream for video calls and streaming; Browse covers text-centric work. Satellite internet can add latency, so scheduling important presentations for port days is the safer play.',
    JP: '事前購入割引が公式ポリシーです。ビデオ会議・配信が必要ならBrowse & Stream、テキスト中心ならBrowseで十分。ただし衛星インターネットの特性上遅延があり得るため、重要な発表は寄港日に配置するのが安全です。',
  } as L,
  tip2Title: { KO: '기항지 시간 = 업무 스프린트 or 완전 오프', EN: 'Port time = work sprint or full off', JP: '寄港地の時間＝ワークスプリント or 完全オフ' } as L,
  tip2Body: {
    KO: '일본 기항은 한국 여권 소지자 기준 단기 관광 무비자입니다(여권은 필수). 기항지에 내리는 날은 완전히 비우고, 항해일을 딥 워크 데이로 설계하면 일과 여행이 겹치지 않습니다.',
    EN: 'Japan port calls are visa-free for short-term tourism on a Korean passport (passport required). Empty the days you go ashore completely and design sailing days as deep-work days — work and travel stop competing.',
    JP: '日本寄港は韓国旅券保持者なら短期観光ビザ免除です（旅券は必須）。寄港地に降りる日は完全に空け、航海日をディープワークデーとして設計すれば、仕事と旅行が重なりません。',
  } as L,
  tip3Title: { KO: '저가 객실은 먼저 사라집니다', EN: 'Cheap cabins go first', JP: '低価格客室から先になくなります' } as L,
  tip3Body: {
    KO: '실측 시점에도 일부 일정의 내측 객실은 이미 매진이었습니다. 일정이 확정됐다면 등급 선택은 빠를수록 유리합니다. 멀미가 예민하다면 선체 중앙부·낮은 데크 객실이 정석입니다.',
    EN: 'Even at the time of checking, inside cabins on some itineraries were already sold out. Once your dates are fixed, the earlier you pick a cabin class, the better. Prone to seasickness? Midship, lower-deck cabins are the classic answer.',
    JP: '実測時点でも一部日程の内側客室はすでに満室でした。日程が確定したらグレード選びは早いほど有利。船酔いに敏感なら船体中央部・低層デッキの客室が定石です。',
  } as L,
  tip4Title: { KO: '가족 워케이션이라면 키즈클럽 시간표부터', EN: 'Family workation? Start with the kids club timetable', JP: 'ファミリーワーケーションならキッズクラブの時間割から' } as L,
  tip4Body: {
    KO: '승선 첫날 키즈클럽 운영 시간을 확인하고 내 업무 블록을 그 위에 얹으세요. 아이의 일정이 곧 나의 집중 시간표가 됩니다.',
    EN: 'On day one, check the kids club hours and lay your work blocks on top of them. Your child’s schedule becomes your focus timetable.',
    JP: '乗船初日にキッズクラブの運営時間を確認し、自分のワークブロックをその上に載せましょう。子どものスケジュールがそのまま自分の集中時間割になります。',
  } as L,
  outroTitle: { KO: '2027년 6월 14일, 인천항.', EN: 'June 14, 2027 — Incheon Port.', JP: '2027年6月14日、仁川港。' } as L,
  outroBody1: { KO: '그 전에 부산에서 먼저 타볼 수도 있습니다.', EN: 'Or board her from Busan before that.', JP: 'その前に釜山で先に乗ってみることもできます。' } as L,
  outroBody2: { KO: '바다 위 17만 톤의 오피스 — 일정이 열려 있을 때 자리를 잡으세요.', EN: 'A 171,000-ton office at sea — take your seat while the itineraries are open.', JP: '海の上の17万トンオフィス — 日程が開いているうちに席を確保しましょう。' } as L,
  shareTitle: { KO: '바다 위 스타링크 오피스 — MSC 벨리시마', EN: 'A Starlink office at sea — MSC Bellissima', JP: '海の上のスターリンク・オフィス — MSCベリッシマ' } as L,
  factNote: {
    KO: '위 버튼은 제휴 링크이며, Wakation은 예약 주체가 아닙니다. 요금·운항 일정·환불 조건은 예약 페이지에서 최종 확인됩니다. 팩트 기준: MSC 공식 프레스룸·보도자료, CruiseMapper·국내 언론 교차, Trip.com 실측 (2026-07-26 확인).',
    EN: 'The buttons above are affiliate links; Wakation is not the booking party. Fares, sailing schedules and refund terms are confirmed on the booking page. Fact basis: MSC official pressroom and releases, cross-checked with CruiseMapper and Korean media; Trip.com pricing checked 2026-07-26.',
    JP: '上のボタンはアフィリエイトリンクで、Wakationは予約主体ではありません。料金・運航日程・払い戻し条件は予約ページで最終確認されます。ファクト基準：MSC公式プレスルーム・発表資料、CruiseMapper・韓国メディアで相互確認、Trip.com実測（2026-07-26確認）。',
  } as L,
  linkMiracle: { KO: '부산—오사카 미라클호 이야기 →', EN: 'The Busan–Osaka Miracle story →', JP: '釜山—大阪ミラクル号の話 →' } as L,
  linkStories: { KO: '모든 스토리 보기 →', EN: 'All stories →', JP: 'すべてのストーリー →' } as L,
  linkBusanGuide: { KO: '승선 전 부산 가이드 →', EN: 'Busan guide before boarding →', JP: '乗船前の釜山ガイド →' } as L,
  linkBusanSet: { KO: '부산 주말 Trip Set →', EN: 'Busan weekend Trip Set →', JP: '釜山週末Trip Set →' } as L,
}

function BookingCtas({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${compact ? '' : 'justify-center'}`}>
      <a
        href={localizeOutboundHref(TRIP_HREF, lang)}
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

export function BellissimaArticle({ lang }: { lang: Lang }) {
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-sky-300 text-xs font-black tracking-widest uppercase mb-4">
            Office at Sea · MSC Bellissima
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
      <section className="bg-[#f0f9ff] border-b border-[#e0f2fe] px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {C.facts[lang].map(([v, l]) => (
            <div key={v}>
              <span className="block font-black text-[#0c4a6e]">{v}</span>
              <span className="block text-xs text-[#64748b] mt-0.5">{l}</span>
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
              <Wifi className="w-5 h-5 text-brand-mid" />{C.why1Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why1Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Ship className="w-5 h-5 text-brand-mid" />{C.why2Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why2Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Anchor className="w-5 h-5 text-brand-mid" />{C.why3Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why3Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Utensils className="w-5 h-5 text-brand-mid" />{C.why4Title[lang]}
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
              [Users, C.tip4Title, C.tip4Body],
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
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-950 px-6 py-20">
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
            <Link href={`${prefix}/cruise/miracle`} className="text-sky-300 text-sm font-bold hover:text-sky-200">
              {C.linkMiracle[lang]}
            </Link>
            <Link href={`${prefix}/stories`} className="text-sky-300 text-sm font-bold hover:text-sky-200">
              {C.linkStories[lang]}
            </Link>
          </div>

          {/* 크로스셀: 2026년은 부산 승선(인천 모항은 2027-06-14부터)이므로 부산 자산만 연결 */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href={`${prefix}/guide/busan`} className="text-white/70 text-sm font-bold hover:text-white">
              {C.linkBusanGuide[lang]}
            </Link>
            <Link href={`${prefix}/collections/busan-weekend`} className="text-white/70 text-sm font-bold hover:text-white">
              {C.linkBusanSet[lang]}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
