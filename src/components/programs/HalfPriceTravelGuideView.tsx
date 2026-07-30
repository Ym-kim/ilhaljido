import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, FileCheck2, ReceiptText, WalletCards } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'

const OFFICIAL_SOURCE = 'https://www.mcst.go.kr/site/s_notice/press/pressView.jsp?pAction=&pCntPerPage=10&pCurrentPage=1&pMenuCD=0302010000&pSearchType=01&pSearchWord=&pSeq=22267&pTypeDept='

const COPY = {
  back: { KO: '지원 프로그램', EN: 'Support programs', JP: '支援プログラム' },
  eyebrow: { KO: 'REGIONAL TRAVEL SUPPORT', EN: 'REGIONAL TRAVEL SUPPORT', JP: 'REGIONAL TRAVEL SUPPORT' },
  title: { KO: '반값여행, 이름보다 조건부터', EN: 'Half-price travel starts with the conditions', JP: '「半額」より先に、制度の条件を確認' },
  desc: { KO: '지역사랑 휴가지원은 여행 전 신청하고, 승인된 조건에 맞춰 지출한 뒤 증빙을 제출해 일부를 지역화폐로 돌려받는 제도입니다. 모든 지역·비용이 자동으로 50% 환급되는 것은 아닙니다.', EN: 'Korea’s regional travel-support scheme generally requires advance application, eligible spending and proof before part of the cost is reimbursed in local currency. It is not an automatic 50% refund everywhere.', JP: '韓国の地域旅行支援は、旅行前の申請、条件に沿った支出、証明書類の提出後に地域通貨などで一部が還付される制度です。どの地域・費用でも自動的に50％還付されるわけではありません。' },
  official: { KO: '문화체육관광부 공식 안내', EN: 'Official MCST announcement', JP: '韓国文化体育観光部の公式案内' },
  checked: { KO: '제도 기본 구조 확인일 2026-07-30', EN: 'Framework checked Jul 30, 2026', JP: '制度の基本構造を2026-07-30に確認' },
  flowTitle: { KO: '보통의 진행 순서', EN: 'Typical process', JP: '一般的な流れ' },
  flow: {
    KO: ['지역별 공식 사업 확인', '여행 전 사전신청', '선정·참여 승인 확인', '지정 조건에 맞춰 여행', '영수증·사진 등 증빙 제출', '정산 심사', '지역화폐·상품권 등으로 지급'],
    EN: ['Find the official local program', 'Apply before travelling', 'Confirm approval or selection', 'Travel under the stated conditions', 'Submit receipts and required proof', 'Wait for reimbursement review', 'Receive local currency or vouchers'],
    JP: ['地域別の公式事業を確認', '旅行前に事前申請', '承認・選考結果を確認', '指定条件に沿って旅行', '領収書・写真などを提出', '精算審査', '地域通貨・商品券などで支給'],
  },
  checkTitle: { KO: '신청 전에 반드시 확인할 것', EN: 'Check before applying', JP: '申請前に必ず確認' },
  checks: {
    KO: ['거주지·연령·국적 조건', '신청 시점과 선착순 여부', '숙박 의무와 최소 체류일', '인정되는 업종·최소 사용액', '카드영수증·사진 등 증빙', '동행인·팀 구성 기준', '연간 참여 횟수와 중복 제한', '예산 소진·조기 종료 가능성'],
    EN: ['Residency, age and nationality', 'Application timing and selection method', 'Required nights or minimum stay', 'Eligible merchants and minimum spend', 'Receipts, photos and other proof', 'Companion or team rules', 'Annual or duplicate-use limits', 'Budget exhaustion or early closure'],
    JP: ['居住地・年齢・国籍条件', '申請時期・先着順かどうか', '宿泊義務・最低滞在日数', '対象業種・最低利用額', 'カード領収書・写真などの証明', '同行者・チーム条件', '年間利用回数・重複制限', '予算終了・早期締切の可能性'],
  },
  capTitle: { KO: '2026 시범사업의 기본 틀', EN: 'The 2026 pilot framework', JP: '2026年試行事業の基本枠' },
  capDesc: { KO: '문화체육관광부 안내 기준으로 개인은 최대 10만원, 단체는 최대 20만원 한도 내에서 여행경비의 50%를 모바일 지역사랑상품권으로 환급하는 기본 틀입니다. 지역별 세부 조건과 실제 모집 여부는 각 지자체 공고가 우선합니다.', EN: 'The Ministry’s 2026 pilot framework describes a 50% reimbursement in mobile local currency, capped at KRW 100,000 for individuals and KRW 200,000 for groups. Local notices determine actual eligibility and availability.', JP: '韓国文化体育観光部の2026年試行事業では、旅行経費の50％をモバイル地域通貨で還付し、上限は個人10万ウォン・団体20万ウォンとされています。実際の募集・条件は各自治体の公告が優先されます。' },
  caution: { KO: 'Wakation은 환급을 접수하거나 지급하지 않습니다. 여행 전에 지자체 공식 공고를 열어 현재 모집 여부와 증빙 조건을 다시 확인하세요.', EN: 'Wakation does not accept reimbursement claims or issue funds. Open the local official notice before travelling and reconfirm current availability and proof requirements.', JP: 'Wakationは還付申請の受付・支給を行いません。旅行前に自治体の公式公告で募集状況と証明条件を再確認してください。' },
  currentTitle: { KO: '현재 공고를 찾는 가장 안전한 방법', EN: 'The safest way to find a current notice', JP: '現在の公告を安全に探す方法' },
  currentDesc: { KO: '중앙 제도 안내와 지역별 모집 시점은 다를 수 있습니다. Wakation 지원 프로그램에서 최근 확인일을 비교하고, 마지막 단계는 반드시 공식 출처에서 마무리하세요.', EN: 'The national framework and local recruitment dates can differ. Compare verification dates in Wakation’s catalog, then finish your check at the official source.', JP: '国の制度案内と地域別の募集時期は異なる場合があります。Wakationの確認日を比較し、最後は必ず公式情報で確認してください。' },
  catalog: { KO: '지원 프로그램 찾아보기', EN: 'Browse support programs', JP: '支援プログラムを探す' },
  faqTitle: { KO: '자주 묻는 질문', EN: 'FAQ', JP: 'よくある質問' },
  faqs: {
    KO: [
      ['누구나 신청할 수 있나요?', '아닙니다. 거주지·연령·국적·동행인 조건이 지역마다 다릅니다.'],
      ['먼저 여행한 뒤 신청해도 되나요?', '대부분 사전신청이 핵심 조건입니다. 사후 신청은 인정되지 않을 수 있습니다.'],
      ['현금영수증도 인정되나요?', '지역별로 카드영수증, 현금영수증, 온라인 결제 인정 범위가 다르므로 공고를 확인해야 합니다.'],
      ['숙박이 필수인가요?', '사업마다 다릅니다. 숙박일수, 지정 숙소, 당일여행 허용 여부를 확인하세요.'],
      ['아이·반려동물과 함께 갈 수 있나요?', '여행 자체 가능 여부와 지원 대상 포함 여부는 별개입니다. 각각 공식 조건을 확인하세요.'],
      ['외국인도 신청할 수 있나요?', '확인되지 않은 경우가 많습니다. 주소지, 외국인등록증, 한국 휴대전화 인증, 지역화폐 수령 조건을 문의하세요.'],
      ['언제 환급되나요?', '증빙 심사와 지급 방식은 지역마다 다르며, 즉시 지급을 보장할 수 없습니다.'],
    ],
    EN: [
      ['Can anyone apply?', 'No. Residency, age, nationality and group rules vary by region.'],
      ['Can I apply after travelling?', 'Advance application is usually essential. Post-trip applications may not be accepted.'],
      ['Are cash receipts accepted?', 'Accepted payment proofs vary. Check cards, cash receipts and online-payment rules in the local notice.'],
      ['Is an overnight stay required?', 'It depends. Check required nights, designated stays and whether day trips qualify.'],
      ['Can children or pets join?', 'Being allowed on the trip and being included in support are separate questions. Confirm both.'],
      ['Can foreign residents apply?', 'Often unclear. Ask about address, residence-card, Korean phone verification and local-currency requirements.'],
      ['When is reimbursement paid?', 'Review and payment timing varies by region; immediate payment is not guaranteed.'],
    ],
    JP: [
      ['誰でも申請できますか？', 'いいえ。居住地・年齢・国籍・同行者条件は地域ごとに異なります。'],
      ['旅行後に申請できますか？', '多くは事前申請が必須です。旅行後の申請は認められない場合があります。'],
      ['現金領収書も認められますか？', 'カード・現金領収書・オンライン決済の扱いは地域ごとに異なります。'],
      ['宿泊は必須ですか？', '事業ごとに異なります。宿泊日数、指定宿泊先、日帰り可否を確認してください。'],
      ['子ども・ペットと参加できますか？', '同行可能かどうかと支援対象に含まれるかは別です。両方を確認してください。'],
      ['外国籍でも申請できますか？', '不明な場合が多いため、住所、在留カード、韓国の携帯認証、地域通貨の受取条件を確認してください。'],
      ['いつ還付されますか？', '審査・支給時期は地域ごとに異なり、即時支給は保証されません。'],
    ],
  },
} as const

function prefixFor(lang: Lang) {
  return lang === 'JP' ? '/ja' : lang === 'EN' ? '/en' : ''
}

export function HalfPriceTravelGuideView({ lang }: { lang: Lang }) {
  const prefix = prefixFor(lang)
  return (
    <main className={`min-h-screen bg-[#fbfaf6] ${lang === 'JP' ? '[word-break:normal]' : ''}`}>
      <div className="px-5 pb-2 pt-8 sm:px-6"><div className="mx-auto max-w-5xl"><Link href={`${prefix}/programs/support`} className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#74858d] hover:text-[#17647f]"><ArrowLeft className="h-3.5 w-3.5" />{COPY.back[lang]}</Link></div></div>

      <section className="px-5 pb-12 pt-8 sm:px-6 md:pb-16 md:pt-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-[0.6875rem] font-semibold tracking-[0.13em] text-[#317b98]">{COPY.eyebrow[lang]}</p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.35rem,7vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#17313b] text-balance">{COPY.title[lang]}</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#5f737b] sm:text-lg">{COPY.desc[lang]}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={OFFICIAL_SOURCE} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#153a49] px-6 text-sm font-bold text-white hover:bg-[#0e4d67]">{COPY.official[lang]} <ExternalLink className="h-4 w-4" /></a>
            <span className="text-xs text-[#7a898e]">{COPY.checked[lang]}</span>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e2e7e5] bg-white px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto grid min-w-0 max-w-5xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="min-w-0">
            <WalletCards className="h-7 w-7 text-[#317b98]" strokeWidth={ICON_STROKE} />
            <h2 className="mt-4 text-2xl font-bold tracking-[-0.025em] text-[#203943]">{COPY.capTitle[lang]}</h2>
            <p className="mt-4 text-sm leading-7 text-[#61747b]">{COPY.capDesc[lang]}</p>
            <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950/80">{COPY.caution[lang]}</p>
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-[-0.025em] text-[#203943]">{COPY.flowTitle[lang]}</h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {COPY.flow[lang].map((step, index) => <li key={step} className="grid grid-cols-[2.25rem_1fr] items-start gap-3 rounded-xl bg-[#f5f8f7] p-4 text-sm leading-6 text-[#496069]"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold text-[#17647f] shadow-sm">{index + 1}</span><span className="pt-1.5">{step}</span></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3"><ReceiptText className="h-6 w-6 text-[#317b98]" strokeWidth={ICON_STROKE} /><h2 className="text-2xl font-bold tracking-[-0.025em] text-[#203943]">{COPY.checkTitle[lang]}</h2></div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COPY.checks[lang].map((item) => <li key={item} className="flex min-h-24 items-start gap-2 rounded-xl border border-[#dfe6e5] bg-white p-4 text-sm font-semibold leading-6 text-[#465d66]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#317b98]" strokeWidth={ICON_STROKE} />{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6 md:pb-16">
        <div className="mx-auto max-w-5xl rounded-[1.5rem] bg-[#173b49] p-7 text-white sm:p-9">
          <FileCheck2 className="h-6 w-6 text-[#a9dbe9]" strokeWidth={ICON_STROKE} />
          <h2 className="mt-4 text-2xl font-bold">{COPY.currentTitle[lang]}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">{COPY.currentDesc[lang]}</p>
          <Link href={`${prefix}/programs/support`} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#153a49]">{COPY.catalog[lang]} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="border-t border-[#e3e8e6] bg-white px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-[-0.025em] text-[#203943]">{COPY.faqTitle[lang]}</h2>
          <div className="mt-6 divide-y divide-[#e5eae8] border-y border-[#e5eae8]">
            {COPY.faqs[lang].map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-6 text-base font-bold leading-7 text-[#29444e] marker:content-none">{question}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-[#63757d]">{answer}</p></details>)}
          </div>
        </div>
      </section>
    </main>
  )
}
