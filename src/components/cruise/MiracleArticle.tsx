import Link from 'next/link'
import { Ship, Wifi, Luggage, Utensils, Clock, AlertCircle } from 'lucide-react'
import { ShareButton } from '@/components/share/ShareButton'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 팬스타 미라클호 크루즈 워케이션 에디토리얼 — 3언어 뷰 (2026-08-13 i18n 추출)
// 팩트 검증 기록은 원본과 동일(2026-07-18) — KO 카피가 원문이며 EN/JP는 번역.
// 원 검증 주석: 취항 2025-04-13·사우나·야외수영장·저궤도 위성 와이파이 = 팬스타 공식
// 보도자료 / 뷔페 2식 포함 = 판매 3사 상품 구성 일치 / 17시간 = 부산 오후 출항→익일
// 10시 오사카 도착 / 가격은 실측 불가 → 미표기 정책. "삼겹살 무제한" 등 미검증 문구 금지.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const KLOOK_HREF =
  'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F150798-busan-osaka-ferry-ticket%2F'
const KKDAY_HREF = 'https://www.kkday.com/ko/product/284256?cid=25833'

const CTA_CLS =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all'

const C = {
  ctaKlook: { KO: 'Klook에서 승선권 보기', EN: 'See tickets on Klook', JP: 'Klookで乗船券を見る' } as L,
  ctaKkday: { KO: 'KKday에서 비교하기', EN: 'Compare on KKday', JP: 'KKdayで比較する' } as L,
  heroEyebrow: { KO: 'Transit Workation · 부산 ↔ 오사카', EN: 'Transit Workation · Busan ↔ Osaka', JP: 'Transit Workation · 釜山 ↔ 大阪' } as L,
  heroTitle1: { KO: '바다 위 17시간,', EN: '17 hours at sea —', JP: '海の上の17時間、' } as L,
  heroTitle2: { KO: '인생에서 가장 깊은 몰입', EN: 'the deepest focus of your life', JP: '人生でいちばん深い没入' } as L,
  heroLead: {
    KO: '알림이 닿지 않는 바다 한가운데. 노트북 하나, 수평선 하나. 숙박·식사·사우나·국경 이동까지 — 이동이 곧 리트릿이 되는 새로운 워케이션.',
    EN: 'The middle of the sea, where notifications cannot reach. One laptop, one horizon. Lodging, meals, a sauna and a border crossing — a new kind of workation where the transit itself is the retreat.',
    JP: '通知の届かない海の真ん中。ノートPCひとつ、水平線ひとつ。宿泊・食事・サウナ・国境移動まで — 移動そのものがリトリートになる新しいワーケーション。',
  } as L,
  heroDisclosure: {
    KO: '제휴 링크입니다 · 요금과 운항 일정은 예약 페이지에서 최종 확인됩니다',
    EN: 'Affiliate links · Final fares and sailing dates are confirmed on the booking page',
    JP: 'アフィリエイトリンクです · 料金・運航日程は予約ページで最終確認されます',
  } as L,
  facts: {
    KO: [
      ['약 17시간', '부산 오후 출항 → 익일 10시 도착'],
      ['뷔페 2식 포함', '조식·석식 (승선권 기본 구성)'],
      ['위성 와이파이', '저궤도 위성 기반 (공식)'],
      ['2025년 취항', '국내 첫 럭셔리 크루즈페리'],
    ],
    EN: [
      ['About 17 hours', 'Busan afternoon departure → 10 a.m. arrival'],
      ['Two buffet meals included', 'Dinner & breakfast (standard ticket)'],
      ['Satellite Wi-Fi', 'Low-earth-orbit based (official)'],
      ['Debuted 2025', "Korea's first luxury cruise ferry"],
    ],
    JP: [
      ['約17時間', '釜山午後出航 → 翌朝10時到着'],
      ['ビュッフェ2食付き', '夕食・朝食（乗船券基本構成）'],
      ['衛星Wi-Fi', '低軌道衛星ベース（公式）'],
      ['2025年就航', '韓国初のラグジュアリークルーズフェリー'],
    ],
  } as Record<Lang, string[][]>,
  targetsTitle: { KO: '이런 분께 추천합니다', EN: 'Who this is for', JP: 'こんな方におすすめ' } as L,
  targets: {
    KO: [
      ['마감을 안고 떠나는 기획자', '기획안은 써야 하는데 사무실에선 도무지 안 써지는 분. 출항부터 다음 날 아침까지, 회의도 호출도 없는 강제 딥 워크 타임이 주어집니다.'],
      ['장비가 많은 장기 노마드', '모니터·키보드·삼각대까지 챙기면 항공 수하물 규정 앞에서 늘 작아지던 분. 배는 다릅니다. 짐의 무게가 아니라 일의 무게만 고민하세요.'],
      ['디지털 디톡스가 필요한 리모트 워커', '슬랙과 알림에 잠식된 일상에서 합법적으로 로그아웃하고 싶은 분. 바다 위에서는 오프라인이 변명이 아니라 환경입니다.'],
    ],
    EN: [
      ['Planners sailing with a deadline', "You have a proposal to write and the office just won't let it happen. From departure until the next morning, you get enforced deep-work time — no meetings, no one calling you over."],
      ['Long-haul nomads with heavy gear', "If packing a monitor, keyboard and tripod always made you shrink before airline baggage rules — ships are different. Worry about the weight of your work, not your luggage."],
      ['Remote workers overdue for a digital detox', 'If Slack and notifications have colonized your day, this is a legitimate way to log out. At sea, being offline is not an excuse — it is the environment.'],
    ],
    JP: [
      ['締め切りを抱えて旅立つプランナー', '企画書は書かなきゃいけないのに、オフィスではどうにも書けない方へ。出航から翌朝まで、会議も呼び出しもない強制ディープワークタイムが与えられます。'],
      ['機材の多い長期ノマド', 'モニター・キーボード・三脚まで持つと航空手荷物規定の前でいつも小さくなっていた方へ。船は違います。荷物の重さではなく、仕事の重さだけ考えてください。'],
      ['デジタルデトックスが必要なリモートワーカー', 'Slackと通知に侵食された日常から合法的にログアウトしたい方へ。海の上ではオフラインは言い訳ではなく、環境です。'],
    ],
  } as Record<Lang, string[][]>,
  whyTitle: { KO: '왜 배로 건너는가', EN: 'Why cross by ship', JP: 'なぜ船で渡るのか' } as L,
  why1Title: { KO: '17시간의 완벽한 딥 워크 & 디톡스', EN: '17 hours of perfect deep work & detox', JP: '17時間の完璧なディープワーク＆デトックス' } as L,
  why1Body: {
    KO: '부산에서 오후에 출항해 오사카에 다음 날 오전 10시 도착. 이 17시간은 비행기의 ‘버리는 이동 시간’이 아니라 통째로 주어지는 몰입 블록입니다. 출항 직후 2~3시간은 밀린 문서를 정리하고, 저녁 식사 후에는 갑판에서 생각을 비우고, 아침 수평선과 함께 기획을 여는 리듬 — 육지에서는 설계할 수 없는 하루입니다.',
    EN: "Depart Busan in the afternoon, arrive in Osaka at 10 the next morning. These 17 hours aren't a flight's throwaway transit time — they're one uninterrupted block of focus. Clear the document backlog in the two or three hours after departure, empty your head on deck after dinner, open the next plan with the morning horizon — a day you simply cannot design on land.",
    JP: '釜山を午後に出航し、大阪に翌朝10時到着。この17時間は飛行機の「捨てる移動時間」ではなく、丸ごと与えられる没入ブロックです。出航直後の2〜3時間で溜まった書類を片付け、夕食後はデッキで頭を空にし、朝の水平線とともに企画を開くリズム — 陸では設計できない一日です。',
  } as L,
  why2Title: { KO: '승선권 하나 = 숙박 + 뷔페 2식 + 국경 이동', EN: 'One ticket = lodging + two buffets + a border crossing', JP: '乗船券1枚＝宿泊＋ビュッフェ2食＋国境移動' } as L,
  why2Body: {
    KO: '따져보면 이 배는 ‘움직이는 숙소’입니다. 하룻밤 숙박, 조식·석식 뷔페 2회, 사우나와 야외 수영장 같은 부대시설, 그리고 한국—일본 국가 간 이동까지 승선권 하나에 담겨 있습니다. 오사카행 항공권에 첫날 숙박비와 두 끼 식사를 더해 보면 계산은 금방 끝납니다. 요금은 객실 등급·시즌에 따라 달라지니 예약 페이지에서 확인하세요.',
    EN: "Do the math and this ship is a moving hotel: a night's stay, dinner and breakfast buffets, amenities like the sauna and outdoor pool, and the Korea–Japan crossing itself — all in one ticket. Add a first night's hotel and two meals to an Osaka airfare and the comparison settles itself quickly. Fares vary by cabin class and season, so check the booking page.",
    JP: '考えてみればこの船は「動く宿」です。ひと晩の宿泊、夕食・朝食のビュッフェ2回、サウナや屋外プールなどの施設、そして韓国—日本の国家間移動まで、乗船券1枚に収まっています。大阪行き航空券に初日の宿泊費と2食を足してみれば、計算はすぐ終わります。料金は客室グレード・シーズンで変わるので予約ページでご確認を。',
  } as L,
  why3Title: { KO: '수하물 스트레스 제로', EN: 'Zero baggage stress', JP: '手荷物ストレスゼロ' } as L,
  why3Body: {
    KO: '장기 워케이션의 최대 난관은 일정이 아니라 짐입니다. 항공사의 무게 규정과 추가 요금 대신, 배는 듀얼 모니터도 한 달 치 짐도 관대합니다. 오사카에서 한 달 살기를 계획 중이라면, 들어가는 길은 배가 정답입니다.',
    EN: "The hardest part of a long workation isn't the schedule — it's the luggage. Instead of airline weight rules and excess fees, a ship is generous with dual monitors and a month's worth of packing. Planning a month-long stay in Osaka? The way in is by sea.",
    JP: '長期ワーケーション最大の難関はスケジュールではなく荷物です。航空会社の重量規定と追加料金の代わりに、船はデュアルモニターにもひと月分の荷物にも寛大です。大阪でのひと月暮らしを計画中なら、行きは船が正解です。',
  } as L,
  why4Title: { KO: '5성급 무드의 선상 리트릿', EN: 'A shipboard retreat with five-star mood', JP: '5つ星ムードの船上リトリート' } as L,
  why4Body: {
    KO: '2025년 4월 취항한 국내 첫 럭셔리 크루즈페리 — 사우나에서 하루의 피로를 풀고, 야외 수영장과 조깅트랙, 갑판 산책으로 리커버리하세요. 일과 휴식의 전환이 계단 몇 개 차이입니다.',
    EN: "Korea's first luxury cruise ferry, in service since April 2025 — melt the day's fatigue in the sauna, then recover on the outdoor pool, the jogging track or a deck walk. Switching between work and rest is a matter of a few stairs.",
    JP: '2025年4月就航の韓国初ラグジュアリークルーズフェリー — サウナで一日の疲れをほぐし、屋外プールやジョギングトラック、デッキ散歩でリカバリーを。仕事と休息の切り替えは階段数段の差です。',
  } as L,
  tipsTitle: { KO: 'Wakation 실전 꿀팁', EN: 'Wakation field tips', JP: 'Wakation実践ヒント' } as L,
  tip1Title: { KO: '인터넷은 ‘보조’, 오프라인이 ‘주력’', EN: "Internet is the backup; offline is the main engine", JP: 'ネットは「補助」、オフラインが「主力」' } as L,
  tip1Body: {
    KO: '미라클호는 저궤도 위성 기반 선내 와이파이를 갖추고 있어 가벼운 검색과 텍스트 소통은 가능합니다. 다만 해상 특성상 끊김이 있을 수 있으니, 출항 전 문서·자료를 로컬로 받아 두고 화상회의 대신 오프라인 초안 작업과 기획 구상을 배정하세요. 어쩌면 이 제약이 이 상품의 진짜 기능일지도 모릅니다.',
    EN: "The Miracle carries low-earth-orbit satellite Wi-Fi, so light browsing and text-based communication work. But connections can drop at sea — download documents and materials locally before departure, and assign offline drafting and planning instead of video calls. That constraint may well be this product's real feature.",
    JP: 'ミラクル号は低軌道衛星ベースの船内Wi-Fiを備えており、軽い検索やテキストのやり取りは可能です。ただし海上の特性上途切れることがあるので、出航前に資料をローカルに落とし、ビデオ会議の代わりにオフラインの下書きや企画構想を割り当てましょう。もしかするとこの制約こそ、この商品の本当の機能かもしれません。',
  } as L,
  tip2Title: { KO: '연계 교통은 최소 2시간 버퍼', EN: 'Leave a 2-hour buffer for onward transport', JP: '乗り継ぎ交通は最低2時間のバッファ' } as L,
  tip2Body: {
    KO: '하선과 입국 수속은 상황에 따라 지연될 수 있습니다. 도착 후 연계 열차를 예약한다면 도착 예정 시각 + 2시간 이후 편성으로. 그 사이 항구 근처에서 커피 한 잔이 훨씬 우아합니다.',
    EN: 'Disembarkation and immigration can run late. If you book an onward train, choose a departure at least two hours after the scheduled arrival — a coffee near the port in between is far more graceful than a sprint.',
    JP: '下船と入国手続きは状況により遅れることがあります。到着後の連絡列車を予約するなら、到着予定時刻＋2時間以降の便で。その間に港近くでコーヒー1杯のほうがずっと優雅です。',
  } as L,
  tip3Title: { KO: '멀미가 걱정된다면', EN: 'If seasickness worries you', JP: '船酔いが心配なら' } as L,
  tip3Body: {
    KO: '배는 미세하게 흔들립니다. 멀미약은 승선 30분~1시간 전 복용이 일반적이니 미리 준비해 두세요. 예민한 분은 선체 중앙부 객실을 선택하는 것도 방법입니다.',
    EN: 'Ships do sway, subtly. Motion-sickness medicine is typically taken 30 minutes to an hour before boarding, so have it ready. If you are sensitive, choosing a midship cabin also helps.',
    JP: '船はかすかに揺れます。酔い止めは乗船30分〜1時間前の服用が一般的なので、あらかじめ用意を。敏感な方は船体中央部の客室を選ぶのも手です。',
  } as L,
  outroTitle: { KO: '다음 출항일 오후 5시, 부산항.', EN: 'Next sailing: 5 p.m., Busan Port.', JP: '次の出航日、午後5時、釜山港。' } as L,
  outroBody1: { KO: '노트북을 덮는 순간 숙소 체크인이 끝나 있고, 눈을 뜨면 오사카입니다.', EN: 'Close your laptop and check-in is already done; open your eyes and it is Osaka.', JP: 'ノートPCを閉じた瞬間に宿のチェックインは済んでいて、目を開ければ大阪です。' } as L,
  outroBody2: { KO: '좌석이 아니라 17시간의 몰입을 예약하세요.', EN: 'Book 17 hours of focus, not a seat.', JP: '座席ではなく、17時間の没入を予約してください。' } as L,
  shareTitle: { KO: '바다 위 17시간, 부산—오사카 크루즈 워케이션', EN: '17 hours at sea — the Busan–Osaka cruise workation', JP: '海の上の17時間、釜山—大阪クルーズワーケーション' } as L,
  factNote: {
    KO: '위 버튼은 제휴 링크이며, Wakation은 예약 주체가 아닙니다. 요금·운항 일정·환불 조건은 각 예약 페이지에서 최종 확인됩니다. 팩트 기준: 팬스타 공식 보도자료·판매처 상품 구성 (2026-07-18 확인).',
    EN: 'The buttons above are affiliate links; Wakation is not the booking party. Fares, sailing schedules and refund terms are confirmed on each booking page. Fact basis: Panstar official releases and seller product listings (checked 2026-07-18).',
    JP: '上のボタンはアフィリエイトリンクで、Wakationは予約主体ではありません。料金・運航日程・払い戻し条件は各予約ページで最終確認されます。ファクト基準：パンスター公式発表資料・販売各社の商品構成（2026-07-18確認）。',
  } as L,
  linkAllCruise: { KO: '← 크루즈 워케이션 전체 보기', EN: '← All cruise workations', JP: '← クルーズワーケーション一覧' } as L,
  linkStories: { KO: '스토리 전체 보기 →', EN: 'All stories →', JP: 'すべてのストーリー →' } as L,
  crossSellTitle: { KO: '이 항로의 두 도시', EN: 'The two cities on this route', JP: 'この航路の2都市' } as L,
  linkBusanGuide: { KO: '부산 워케이션 가이드 →', EN: 'Busan workation guide →', JP: '釜山ワーケーションガイド →' } as L,
  linkOsakaGuide: { KO: '오사카 워케이션 가이드 →', EN: 'Osaka workation guide →', JP: '大阪ワーケーションガイド →' } as L,
  linkBusanSet: { KO: '부산 주말 Trip Set →', EN: 'Busan weekend Trip Set →', JP: '釜山週末Trip Set →' } as L,
  linkOsakaSet: { KO: '오사카 Trip Set →', EN: 'Osaka Trip Set →', JP: '大阪Trip Set →' } as L,
}

function BookingCtas({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${compact ? '' : 'justify-center'}`}>
      <a
        href={KLOOK_HREF}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={`${CTA_CLS} bg-brand-mid text-white hover:bg-brand-light shadow-md`}
      >
        <Ship className="w-4 h-4" />
        {C.ctaKlook[lang]}
      </a>
      <a
        href={KKDAY_HREF}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={`${CTA_CLS} border border-gray-300 text-gray-600 hover:border-brand-mid hover:text-brand-mid`}
      >
        {C.ctaKkday[lang]}
      </a>
    </div>
  )
}

export function MiracleArticle({ lang }: { lang: Lang }) {
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="dark-surface bg-gradient-to-b from-sky-950 via-blue-950 to-slate-950 px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-sky-300 text-xs font-black tracking-widest uppercase mb-4">
            {C.heroEyebrow[lang]}
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
              <Clock className="w-5 h-5 text-brand-mid" />{C.why1Title[lang]}
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
              <Luggage className="w-5 h-5 text-brand-mid" />{C.why3Title[lang]}
            </h3>
            <p className="text-gray-600 leading-relaxed">{C.why3Body[lang]}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-black text-gray-900 text-lg mb-2">
              <Ship className="w-5 h-5 text-brand-mid" />{C.why4Title[lang]}
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
      <section className="dark-surface bg-gradient-to-b from-slate-950 via-blue-950 to-sky-950 px-6 py-20">
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
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <Link href={`${prefix}/cruise`} className="text-sky-300 text-sm font-bold hover:text-sky-200">
              {C.linkAllCruise[lang]}
            </Link>
            <Link href={`${prefix}/stories`} className="text-sky-300 text-sm font-bold hover:text-sky-200">
              {C.linkStories[lang]}
            </Link>
          </div>

          {/* 크로스셀: 이 항로의 출발·도착 도시로 이어지는 실존 가이드·Trip Set만 연결 */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="text-xs font-black uppercase tracking-widest text-sky-300/80 mb-4">
              {C.crossSellTitle[lang]}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link href={`${prefix}/guide/busan`} className="text-white/80 text-sm font-bold hover:text-white">
                {C.linkBusanGuide[lang]}
              </Link>
              <Link href={`${prefix}/guide/osaka`} className="text-white/80 text-sm font-bold hover:text-white">
                {C.linkOsakaGuide[lang]}
              </Link>
              <Link href={`${prefix}/collections/busan-weekend`} className="text-white/80 text-sm font-bold hover:text-white">
                {C.linkBusanSet[lang]}
              </Link>
              <Link href={`${prefix}/collections/osaka-friends`} className="text-white/80 text-sm font-bold hover:text-white">
                {C.linkOsakaSet[lang]}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
