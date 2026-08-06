import type { Lang } from '@/lib/i18n/types'

type VisaGuidance = {
  visaType: string
  requirement: string
  program: string
  official: string
}

const PURPOSE_PROGRAM: Record<string, Record<Lang, string>> = {
  workation: { KO: '해외 워케이션·체류', EN: 'Global workation stays', JP: '海外ワーケーション・滞在' },
  language: { KO: '어학·학습 프로그램', EN: 'Language and learning programs', JP: '語学・学習プログラム' },
  study: { KO: '어학·학습 프로그램', EN: 'Study and learning programs', JP: '留学・学習プログラム' },
  workingholiday: { KO: '해외 장기체류 준비', EN: 'Long-stay preparation', JP: '海外長期滞在の準備' },
  market: { KO: '시장조사·박람회', EN: 'Market research and events', JP: '市場調査・展示会' },
  business: { KO: '시장조사·박람회', EN: 'Business and market research', JP: 'ビジネス・市場調査' },
  nomad: { KO: '해외 워케이션·체류', EN: 'Global workation stays', JP: '海外ワーケーション・滞在' },
}

const GENERIC: Record<Lang, Omit<VisaGuidance, 'program'>> = {
  KO: {
    visaType: '공식 체류자격 확인이 필요합니다',
    requirement: '여권 국적, 체류 목적, 현지에서의 유급 업무 여부에 따라 필요한 자격이 달라집니다. 방문·관광 자격이 원격근무를 허용한다는 뜻은 아니므로 출국 전 대사관 또는 이민국에 확인하세요.',
    official: '아래 공식 출처가 있는 목적지는 원문을 확인하고, 그 외 목적지는 해당국 대사관·이민국 공식 사이트에서 다시 확인하세요.',
  },
  EN: {
    visaType: 'Official immigration status must be confirmed',
    requirement: 'Requirements vary by passport, purpose of stay and whether you will perform paid work locally. Visitor status does not automatically permit remote work, so confirm with the embassy or immigration authority before departure.',
    official: 'Use the official source below when available. For other destinations, recheck the relevant embassy or immigration authority.',
  },
  JP: {
    visaType: '公式の在留資格を確認してください',
    requirement: '旅券国籍、滞在目的、現地での有償業務の有無によって必要な資格が変わります。観光・訪問資格がリモートワークを許可するとは限らないため、出発前に大使館または入国管理当局へ確認してください。',
    official: '下記に公式情報がある場合は原文を確認し、それ以外は各国の大使館・入国管理当局で再確認してください。',
  },
}

// 국가별 검증 안내 — 각 국가 공식 페이지 원문을 직접 읽어 확인한 사실만 기재한다.
// 공식 페이지에 없는 수치는 2차 출처에 널리 퍼져 있어도 적지 않는다.
// (2026-08-06 실사 사례: 대만 노마드비자 '최대 2년'은 BOCA 공식 페이지에
//  기간 명시가 없어 제외. 헝가리 '저축 €10,000'도 팩트시트에 근거 없어 제외.)
// 각 항목의 출처·검증일은 research.ts VISA_OFFICIAL_SOURCES와 짝을 이룬다.
const VERIFIED_DESTINATION_NOTE: Partial<Record<string, Record<Lang, string>>> = {
  japan: {
    // 2026-08-06 출입국재류관리청(소관 부처) 원문으로 교체 — 기존 외무성 요약보다 요건이 구체적
    KO: '일본 출입국재류관리청은 디지털 노마드 재류자격의 체류 기간을 6개월로 정하고 갱신을 허용하지 않습니다. 신청 시점 연간 소득 1,000만 엔 이상이 필요하고, 체류 기간 전체를 커버하는 민간 의료보험(상해·질병 치료비 보장 1,000만 엔 이상)에 가입해야 합니다. 자격외활동 허가는 원칙적으로 인정되지 않아 일본 내 고용 계약은 불가하며, 배우자·자녀는 별도 고시(54호)로 동반할 수 있습니다. 재신청은 출국 후 6개월이 지나야 가능합니다. 대상 국적은 청이 첨부한 목록으로 확인하세요.',
    EN: 'Japan’s Immigration Services Agency sets the digital nomad status at six months with no renewal. Applicants need annual income of at least ¥10 million at the time of application and private medical insurance covering the whole stay, with injury and illness treatment cover of at least ¥10 million. Permission to work outside the designated activity is generally not granted, so local employment contracts are not allowed; spouses and children may accompany under a separate designation. Reapplication is only possible six months after leaving Japan. Eligible nationalities are listed in the agency’s attached document.',
    JP: '出入国在留管理庁はデジタルノマドの在留資格を6カ月とし、更新を認めていません。申請時点で年収1,000万円以上が必要で、滞在期間全体をカバーする民間医療保険（傷害・疾病の治療費用補償1,000万円以上）への加入が求められます。資格外活動許可は原則認められず日本国内での雇用契約は不可で、配偶者・子は別告示（54号）で帯同できます。再申請は出国後6カ月経過後に可能です。対象国籍は同庁の添付資料で確認してください。',
  },
  vietnam: {
    KO: '베트남 이민국 공식 포털은 전자비자의 체류 가능 기간을 최대 90일로 안내합니다. 실제 적용 여부는 국적과 신청 조건을 확인하세요.',
    EN: 'Vietnam’s official immigration portal states that an e-Visa may be valid for up to 90 days. Check nationality and application conditions.',
    JP: 'ベトナム入国管理局の公式ポータルでは、電子ビザの滞在可能期間を最長90日と案内しています。国籍と申請条件を確認してください。',
  },
  // 2026-08-06 확충 — 아래 3개국은 공식 원문 판독에 성공한 범위만 기재
  australia: {
    KO: '주한 호주대사관은 한국 여권 소지자가 ETA(601)로 관광·친지 방문·상용 목적에 한해 1회 최대 3개월 체류할 수 있다고 안내합니다. ETA 유효기간과 입국 횟수, 취업 가능 여부는 이 안내에 나와 있지 않으므로 신청 전 확인하세요.',
    EN: 'The Australian Embassy in Korea states that Korean passport holders may stay up to three months per entry on an ETA (601) for tourism, visiting friends or family, or business visits. The ETA’s validity, number of entries and whether work is permitted are not covered there, so confirm before applying.',
    JP: '駐韓オーストラリア大使館は、韓国旅券保持者がETA（601）で観光・親族訪問・商用目的に限り、1回あたり最長3カ月滞在できると案内しています。ETAの有効期間や入国回数、就労の可否はこの案内に記載がないため、申請前に確認してください。',
  },
  usa: {
    // 2026-08-07 보완: travel.state.gov 403·ESTA 사이트 SPA는 여전하나, 소관 기관인
    // CBP·DHS 본문 판독에 성공해 90일·한국 지정 여부를 확인. ESTA 유효기간은 세 페이지
    // 어디에도 없어 계속 미기재(추정 금지)
    KO: '미국 관세국경보호청(CBP)과 국토안보부(DHS)는 비자면제프로그램(VWP)이 지정국 국민에게 상용 또는 관광 목적으로 비자 없이 최대 90일 체류를 허용한다고 안내합니다. 대한민국은 DHS 지정국 명단에 등재돼 있습니다. VWP 이용에는 전자칩이 내장된 e-Passport가 필요하고, ESTA 승인은 여행 자격을 판단할 뿐 입국 허가를 보장하지 않으며 입국 가능 여부는 도착 시 CBP 심사관이 결정합니다. ESTA 유효기간은 위 안내에 명시돼 있지 않으니 ESTA 공식 사이트에서 확인하세요.',
    EN: 'U.S. Customs and Border Protection and the Department of Homeland Security state that the Visa Waiver Program lets citizens of designated countries travel for business or tourism and stay up to 90 days without a visa. The Republic of Korea is on the DHS designated-country list. Using the VWP requires an e-Passport with an embedded chip, and ESTA approval only establishes eligibility to travel — admissibility is decided by CBP officers on arrival. The ESTA validity period is not stated in this guidance, so check the official ESTA site.',
    JP: '米国税関国境警備局（CBP）と国土安全保障省（DHS）は、ビザ免除プログラム（VWP）により指定国の国民が商用または観光目的でビザなしに最長90日滞在できると案内しています。大韓民国はDHSの指定国リストに掲載されています。VWPの利用には電子チップ内蔵のe-Passportが必要で、ESTAの承認は渡航資格を判断するもので入国を保証せず、入国の可否は到着時にCBP審査官が決定します。ESTAの有効期間は本案内に記載がないため、ESTA公式サイトで確認してください。',
  },
  philippines: {
    KO: '필리핀 이민청 공식 안내에 따르면 무비자 대상 관광객은 최초 30일 체류가 허용되며, 비자 웨이버를 신청하면 29일이 추가됩니다. 이후에도 1개월·2개월 단위 연장이 가능하며 누적 체류 상한은 무비자 대상 국적 36개월, 비자 필요 국적 24개월입니다. 필요 서류는 이민청이 제공하는 체크리스트로 확인하세요.',
    EN: 'The Philippine Bureau of Immigration admits visa-free tourists for an initial 30 days, with a visa waiver adding 29 more days. Further extensions are available in one- or two-month blocks, up to a cumulative limit of 36 months for visa-free nationals and 24 months for visa-required nationals. Check the bureau’s checklist for the required documents.',
    JP: 'フィリピン入国管理局の公式案内によると、ビザ免除対象の観光客は当初30日の滞在が認められ、ビザウェーバーの申請でさらに29日が加算されます。その後も1カ月・2カ月単位の延長が可能で、通算滞在の上限はビザ免除対象国籍が36カ月、ビザが必要な国籍が24カ月です。必要書類は入管が提供するチェックリストで確認してください。',
  },
  singapore: {
    KO: '싱가포르 ICA는 입국 시점에 여권 잔여 유효기간 6개월 이상을 요구하며, 도착 3일 전까지 SG 도착카드(SGAC) 제출을 필수로 안내합니다. 체류 기간은 입국 시 부여되는 방문패스로 정해지므로 ICA의 유효기간 조회 도구로 확인해야 하고, 연장은 남은 유효기간이 14일 이하일 때 온라인으로만 신청할 수 있습니다(수수료 S$40, 비자 필요 국적은 S$30 추가). 초과 체류는 처벌 대상입니다.',
    EN: 'Singapore’s ICA requires at least six months of passport validity on entry and the SG Arrival Card submitted within three days before arrival. The length of stay is set by the visit pass granted at entry, so check ICA’s validity tool; extensions can only be filed online when 14 days or less remain (S$40, plus S$30 for visa-required nationals). Overstaying is a punishable offence.',
    JP: 'シンガポールICAは入国時点で旅券残存6カ月以上を求め、到着3日前までのSG到着カード提出を必須としています。滞在期間は入国時に付与される訪問パスで決まるため、ICAの有効期間確認ツールで確認が必要です。延長は残り14日以下の時点でオンラインのみ申請でき（手数料S$40、ビザが必要な国籍はS$30追加）、超過滞在は処罰の対象です。',
  },
  thailand: {
    // ⚠️ 대사관 페이지가 '유효기간 180일, 체류기간 5년'으로 병기 — 통상 알려진 구조와
    // 반대로 읽힐 여지가 있어 값을 해석하지 않고 원문 표기 그대로 옮기고 확인을 안내한다
    KO: '주한 태국대사관은 DTV를 복수 입국 비자로 안내하며, 신청 요건으로 잔고 50만 밧 이상을 3개월간 유지한 영문 은행거래내역서와 원격근무·프리랜서 증빙(재직증명 또는 계약서, 사업자등록증, 소득증명)을 요구합니다. 신청 시점에 한국에 체류 중이어야 하고 여권 잔여 유효기간은 6개월 이상이어야 합니다. 체류기간은 태국 현지 이민국에서 180일 추가 연장을 신청할 수 있습니다. 대사관 안내에는 유효기간과 체류기간이 각각 180일·5년으로 병기돼 있으므로, 어느 항목이 어디에 적용되는지는 신청 시 확인하세요.',
    EN: 'The Royal Thai Embassy in Seoul describes the DTV as a multiple-entry visa. Applicants must show an English bank statement holding at least THB 500,000 for three months plus evidence of remote or freelance work (employment certificate or contract, business registration, proof of income). You must be residing in Korea when applying and hold a passport valid for at least six months. A further 180-day extension can be requested from Thai Immigration. The embassy page lists the visa validity and length of stay as 180 days and five years respectively, so confirm which applies to which when you apply.',
    JP: '駐韓タイ大使館はDTVを数次入国査証として案内しています。申請には残高50万バーツ以上を3カ月間維持した英文銀行取引明細書と、リモートワーク・フリーランスの証明（在職証明または契約書、事業者登録証、所得証明）が必要です。申請時点で韓国に滞在しており、旅券残存有効期間は6カ月以上である必要があります。滞在期間はタイ現地の入国管理局で180日の延長申請が可能です。大使館の案内では有効期間と滞在期間が180日・5年と併記されているため、どちらがどの項目に当たるかは申請時に確認してください。',
  },
  indonesia: {
    KO: '인도네시아 이민총국 공식 FAQ에 따르면 E33G 원격근무 비자는 연소득 미화 6만 달러 이상을 증명해야 하고, 최근 3개월 개인 계좌 잔고 미화 2,000달러 이상도 요구됩니다. 비자는 발급일로부터 90일 이내에 입국에 사용해야 하며, KITAS 취득 후 최대 1년 체류가 가능합니다. 인도네시아 내 개인·기업으로부터 보수를 받는 근로와 현지에서의 재화·용역 판매는 금지됩니다.',
    EN: 'Indonesia’s immigration FAQ states the E33G remote worker visa requires proof of at least US$60,000 in annual income plus a personal bank balance of at least US$2,000 over the last three months. The visa must be used to enter within 90 days of issue, and the permit allows up to one year of stay. Receiving payment from Indonesian individuals or companies, and selling goods or services locally, are prohibited.',
    JP: 'インドネシア入国管理総局の公式FAQによると、E33Gリモートワーカー査証は年収6万米ドル以上の証明が必要で、直近3カ月の個人口座残高2,000米ドル以上も求められます。査証は発給日から90日以内に入国に使用する必要があり、KITAS取得後は最長1年の滞在が可能です。インドネシア国内の個人・企業から報酬を受ける就労や、現地での物品・サービス販売は禁止されています。',
  },
  taiwan: {
    KO: '대만 영사국은 한국 국적자의 무비자 체류를 최대 90일로 안내하며, 입국일 기준 여권 잔여 유효기간 6개월과 확약된 출국 항공권을 요구합니다. 무비자 체류는 원칙적으로 연장되지 않습니다. 디지털 노마드 방문비자는 무비자 대상국 국적자만 신청할 수 있고, 연소득 요건은 20~29세 미화 2만 달러·30세 이상 미화 4만 달러이며 최근 6개월 평균 잔고 미화 1만 달러를 함께 봅니다.',
    EN: 'Taiwan’s consular bureau allows visa-exempt stays of up to 90 days for Korean nationals, requiring six months of passport validity on entry and a confirmed onward ticket; visa-exempt stays are generally not extendable. The digital nomad visitor visa is open only to nationals of visa-exempt countries and requires annual income of US$20,000 (ages 20–29) or US$40,000 (30+), plus an average bank balance of US$10,000 over six months.',
    JP: '台湾領事事務局は韓国籍のビザ免除滞在を最長90日と案内し、入国時点で旅券残存6カ月と出国便の予約確約を求めます。ビザ免除滞在は原則延長できません。デジタルノマド訪問査証はビザ免除対象国の国籍者のみ申請でき、年収要件は20〜29歳が米ドル2万・30歳以上が米ドル4万、直近6カ月の平均残高1万米ドルも必要です。',
  },
  hungary: {
    KO: '헝가리 이민청은 화이트카드(디지털 노마드 체류허가)를 최대 1년으로 발급하며 1회에 한해 1년 연장할 수 있다고 안내합니다. 입국 전 6개월 이상 월 순소득 €3,000을 충족하고 체류 중에도 유지해야 하며, 헝가리 고용주를 위한 근로나 헝가리 기업 지분 보유는 불가합니다. 가족 동반(가족결합 체류허가)은 허용되지 않습니다.',
    EN: 'Hungary’s immigration authority issues the White Card for up to one year, extendable once for another year. Applicants must have net monthly income of €3,000 for at least six months before entry and maintain it during the stay; working for Hungarian employers or holding shares in Hungarian companies is not allowed, and family reunification permits are not granted.',
    JP: 'ハンガリー入国管理当局はホワイトカード（デジタルノマド滞在許可）を最長1年で発給し、1回に限り1年の延長が可能と案内しています。入国前6カ月以上、月の純収入€3,000を満たし滞在中も維持する必要があり、ハンガリーの雇用主のための就労や同国企業の持分保有は不可で、家族帯同の在留許可は認められません。',
  },
  italy: {
    // 소득 금액은 공식 페이지가 밝힌 기준 연도(2024)를 함께 적는다 — 의료세 연동이라 갱신 대상
    KO: '이탈리아 총영사관 공식 안내에 따르면 디지털 노마드·원격근무 비자는 프리랜서(디지털 노마드)와 회사 소속 원격근무자로 나뉘며, 학사 이상 학위 또는 3년 이상 경력을 갖춘 고숙련자가 대상입니다. 최소 연소득은 페이지가 제시한 2024년 기준 €24,789이고, 의료보험은 최소 €30,000 보장이 필요합니다. 비자 기간 전체를 커버하는 본인 명의 임대차·부동산 계약도 요구됩니다. 체류허가(Permesso di Soggiorno)는 1년으로 발급되며 현지에서 갱신합니다.',
    EN: 'Italy’s consular guidance splits the digital nomad / remote worker visa into freelancers and employees working remotely, and limits it to highly specialised applicants with a degree or at least three years of experience. Minimum annual income is €24,789 on the 2024 basis cited by the page, and health insurance must cover at least €30,000. A lease or property deed in the applicant’s name covering the whole visa period is also required. The residence permit is issued for one year and renewed locally.',
    JP: 'イタリア総領事館の公式案内によると、デジタルノマド・リモートワーカー査証はフリーランスと企業所属のリモート勤務者に分かれ、学位または3年以上の経験を持つ高度専門人材が対象です。最低年収はページが示す2024年基準で€24,789、医療保険は最低€30,000の補償が必要です。査証期間全体をカバーする本人名義の賃貸・不動産契約も求められます。滞在許可は1年で発給され、現地で更新します。',
  },
  germany: {
    KO: '독일 외무부는 전용 디지털 노마드 비자 대신 체류법 제21조의 두 경로를 안내합니다. 자영업(1항)은 사업의 경제적 효과와 자본·대출을 통한 자금 확보를 증명해야 하고, 자유업(5항)은 사업 자금·본인 생계 능력·해당 직업 수행 허가를 증명해야 합니다. 45세를 넘으면 노후 대비를 추가로 증명해야 하며, 사업이 자리 잡으면 체류허가를 우선 최대 3년까지 연장할 수 있습니다.',
    EN: 'Germany’s foreign office describes two routes under Section 21 of the Residence Act rather than a dedicated nomad visa. Self-employment (21(1)) requires showing economic benefit and secured financing through capital or an approved loan; the liberal-profession route (21(5)) requires funding for the project, ability to support yourself and a permit to practise the profession. Applicants over 45 must additionally prove retirement provision, and a successful business can have the permit extended initially for up to three years.',
    JP: 'ドイツ外務省は専用のデジタルノマド査証ではなく、滞在法第21条の2つの経路を案内しています。自営業（1項）は事業の経済的効果と、資本または融資承認による資金確保の証明が必要です。自由業（5項）は事業資金・自身の生計能力・当該職業の実施許可の証明が必要です。45歳を超える場合は老後の備えの証明が加わり、事業が軌道に乗れば滞在許可はまず最長3年まで延長できます。',
  },
  spain: {
    // 금액은 공식 페이지가 명시한 SMI 기준 연도(2025)를 함께 적는다 — 최저임금 인상 시 갱신 대상
    KO: '스페인 영사 공식 안내에 따르면 원격근무 비자는 최저임금(SMI)의 200% 소득이 필요하며, 페이지가 제시한 2025년 SMI €1,184 기준으로 월 €2,368입니다. 동반 가족은 첫 1인 75%·이후 1인당 25%가 가산됩니다. 비자 유효기간은 최대 1년이고, 인정 대학·전문학교 학위 또는 3년 이상 경력이 필요합니다. 근로자는 스페인 기업에서 일할 수 없고, 자영업자도 스페인 기업 업무 비중이 20%를 넘을 수 없습니다.',
    EN: 'Spain’s consular guidance requires income of 200% of the minimum wage (SMI) for the telework visa — €2,368 per month using the 2025 SMI of €1,184 cited on the page. Family adds 75% for the first member and 25% for each additional one. The visa is valid for a maximum of one year, and applicants need a degree from a recognised university or professional school, or at least three years of experience. Employees may not work for Spanish companies, and for the self-employed, work for Spanish companies may not exceed 20% of the total.',
    JP: 'スペイン領事の公式案内によると、テレワーク査証は最低賃金（SMI）の200%の収入が必要で、ページが示す2025年SMI €1,184を基準に月€2,368となります。同伴家族は1人目75%・以降1人あたり25%が加算されます。査証の有効期間は最長1年で、認定大学・専門学校の学位または3年以上の実務経験が必要です。被雇用者はスペイン企業で就労できず、自営業者もスペイン企業向け業務が全体の20%を超えてはなりません。',
  },
  canada: {
    KO: '캐나다 이민난민시민권부(IRCC) 안내에 따르면 eTA는 최대 5년 또는 여권 만료일 중 먼저 도래하는 때까지 유효하며, 유효한 동안에는 횟수 제한 없이 입국할 수 있어 매번 새로 신청할 필요가 없습니다. 방문자의 체류는 통상 최대 6개월까지 허용되지만, 실제 체류 가능 기간은 입국 시 국경 담당관이 결정해 여권에 표기합니다.',
    EN: 'Canada’s IRCC states that an eTA is valid for up to five years or until the passport expires, whichever comes first, and allows as many entries as you wish while valid, so it need not be reapplied for each trip. Visitors are normally allowed to stay up to six months, but the actual period is set by the border services officer on entry and recorded in the passport.',
    JP: 'カナダ移民・難民・市民権省（IRCC）の案内によると、eTAは最長5年または旅券の満了日のいずれか早い時点まで有効で、有効な間は回数制限なく入国できるため毎回申請し直す必要はありません。訪問者の滞在は通常最長6カ月まで認められますが、実際の期間は入国時に国境担当官が決定し旅券に記録されます。',
  },
  georgia: {
    KO: '대한민국 외교부 공관 공지에 따르면 한국 국민의 조지아 무비자 체류기간은 2015년 6월 9일부터 90일에서 1년으로 연장됐고, 장기 체류 시에도 별도 체류허가증 없이 거주할 수 있습니다. 다만 무비자 상태에서 허용되는 활동 범위(취업·사업 등)는 이 공지에 명시돼 있지 않으므로 현지 이민 당국에 확인하세요.',
    EN: 'A Korean embassy notice states that, since 9 June 2015, Korean nationals may stay in Georgia visa-free for one year instead of 90 days, and may reside there without a separate residence permit. The notice does not specify which activities (such as employment or business) are permitted while visa-free, so confirm with the local immigration authority.',
    JP: '韓国外交部在外公館の公示によると、韓国国民のジョージアでのビザ免除滞在は2015年6月9日から90日から1年に延長され、長期滞在時も別途の滞在許可証なしで居住できます。ただしビザ免除中に認められる活動範囲（就労・事業など）は公示に明記されていないため、現地の入国管理当局に確認してください。',
  },
  uae: {
    KO: '두바이 거주·외국인 총국(GDRFA)은 가상근무 거주허가의 월 소득 요건을 미화 3,500달러 이상으로 안내하며, 허가는 1년 유효하고 갱신할 수 있습니다. UAE 밖에서 원격으로 일한다는 증빙, 건강보험, 건강검진, 급여 증명이 필요하고 기본 수수료는 AED 200(별도 항목 추가)입니다. 허가 만료·취소 후 체류 유예기간은 60일입니다.',
    EN: 'Dubai’s GDRFA sets the virtual work residence permit income threshold at US$3,500 or more per month; the permit is valid for one year and renewable. Applicants must show proof of remote work for an entity outside the UAE, health insurance, a medical fitness test and a salary certificate, with a base fee of AED 200 plus additional charges. The grace period to remain after expiry or cancellation is 60 days.',
    JP: 'ドバイ居住・外国人総局（GDRFA）は、バーチャルワーク居住許可の月収要件を3,500米ドル以上とし、許可は1年間有効で更新可能と案内しています。UAE国外での遠隔勤務の証明、健康保険、健康診断、給与証明が必要で、基本手数料はAED 200（別途加算あり）です。満了・取消後の滞在猶予期間は60日です。',
  },
  czech: {
    KO: '체코 내무부 외국인 포털은 자영업·허가업종·법인 임원 등 사업 목적 체류에 장기비자를 안내하며, 최대 유효기간은 1년입니다. 영업허가부 또는 상업등기부 등록 증빙, 숙소·재정 증빙, 범죄경력증명, 의료보험이 필요하고 신청 수수료는 5,000CZK(연장 1,000CZK)입니다. 처리 기간은 90일(복잡한 사안 120일)이며, 연장을 포함해 1년을 넘겨 체류하려면 장기 체류허가로 전환해야 합니다.',
    EN: 'The Czech interior ministry’s foreigners portal describes a long-term visa for business purposes — self-employment, licensed trades or company officers — valid for up to one year. It requires proof of registration in the Trade Licensing or Commercial Register, accommodation and funds, a criminal record certificate and medical insurance, with a 5,000 CZK application fee (1,000 CZK for extension). Processing takes 90 days (120 in complex cases), and staying beyond one year in total requires switching to a long-term residence permit.',
    JP: 'チェコ内務省の外国人ポータルは、自営業・許可業種・法人役員などの事業目的の滞在に長期査証を案内しており、最長有効期間は1年です。営業許可登記または商業登記の登録証明、住居・資金の証明、犯罪経歴証明、医療保険が必要で、申請手数料は5,000CZK（延長は1,000CZK）です。処理期間は90日（複雑な案件は120日）で、延長を含め1年を超えて滞在するには長期滞在許可への切替が必要です。',
  },
  france: {
    KO: '프랑스 정부 공식 안내에 따르면 체류증을 대신하는 장기체류비자(VLS-TS)는 4개월~1년 체류에 적용되며, 이 비자가 있으면 도착 직후 도청에서 체류증을 따로 신청할 필요가 없습니다. 다만 입국 후 3개월 이내에 온라인 검증과 수수료 납부를 마쳐야 적법 체류가 유지되고 국경 통과가 가능합니다. 방문(visitor) 비자는 본인 재원으로 생활할 수 있어야 하며, 직업활동 가능 여부는 이 안내에 명시돼 있지 않으니 비자 종류별로 확인하세요.',
    EN: 'French government guidance states that the long-stay visa serving as a residence permit (VLS-TS) covers stays of four months to one year, removing the need to apply for a residence card at the prefecture on arrival. It must be validated online, with the associated fee paid, within three months of arrival to keep your stay lawful and allow border crossings. Visitor applicants must be able to live off their own resources; whether professional activity is allowed is not specified on this page, so check per visa category.',
    JP: 'フランス政府の公式案内によると、滞在許可を兼ねる長期査証（VLS-TS）は4カ月〜1年の滞在に適用され、到着後に県庁で滞在証を別途申請する必要がありません。ただし入国後3カ月以内にオンライン認証と手数料の納付を完了しないと適法な滞在が維持されず、国境通過もできません。訪問（visitor）区分は自己の資力で生活できることが求められ、就労の可否はこの案内に明記されていないため査証種別ごとに確認してください。',
  },
  croatia: {
    KO: '크로아티아 내무부는 디지털 노마드 임시체류를 최대 18개월로 허가하며, 18개월 미만으로 받은 경우 만료 60일 전에 최대 6개월 연장을 신청할 수 있다고 안내합니다. 월 소득 요건은 €3,622.50이며(12개월 €43,470·18개월 €65,205 기준), 이전 체류 종료 후 6개월이 지나야 다시 신청할 수 있습니다. 제출 서류는 크로아티아어 또는 영어여야 합니다.',
    EN: 'Croatia’s interior ministry grants digital nomad temporary stay for up to 18 months; if granted for less, an extension of up to six months can be requested 60 days before expiry. Monthly income must be €3,622.50 (€43,470 for 12 months, €65,205 for 18), and a new application is only possible six months after the previous stay ends. Documents must be in Croatian or English.',
    JP: 'クロアチア内務省はデジタルノマドの一時滞在を最長18カ月まで許可し、18カ月未満で許可された場合は満了60日前に最大6カ月の延長を申請できると案内しています。月収要件は€3,622.50（12カ月€43,470・18カ月€65,205）で、前回の滞在終了から6カ月経過後に再申請が可能です。提出書類はクロアチア語または英語である必要があります。',
  },
  portugal: {
    // 4배 규정과 RMMG 금액은 각각 다른 공식 페이지에 있어, 곱셈 결과임을 문장에 드러낸다
    KO: '포르투갈 영사 포털은 원격근무(디지털 노마드) 임시체류 비자에 최근 3개월 평균 월소득이 최저임금(RMMG)의 4배 이상일 것을 요구합니다. 같은 포털의 생계 수단 기준에 따르면 2026년 RMMG는 €920이므로 월 €3,680 수준이 됩니다. 동반 가족은 성인 50%·18세 미만 30%가 가산됩니다.',
    EN: 'Portugal’s consular portal requires, for the remote-work (digital nomad) temporary stay visa, average monthly income over the last three months of at least four times the minimum wage (RMMG). The same portal puts the 2026 RMMG at €920, which works out to about €3,680 per month. Accompanying family adds 50% per adult and 30% per child under 18.',
    JP: 'ポルトガル領事ポータルは、リモートワーク（デジタルノマド）一時滞在査証について、直近3カ月の平均月収が最低賃金（RMMG）の4倍以上であることを求めています。同ポータルの生計手段基準では2026年のRMMGは€920とされており、月額約€3,680に相当します。同伴家族は成人50%・18歳未満30%が加算されます。',
  },
  malaysia: {
    KO: '말레이시아 디지털경제공사(MDEC)의 DE Rantau 노마드 패스는 3~12개월 전문방문패스로 발급되며 12개월 추가 갱신이 가능합니다. 연소득 요건은 기술 직군 미화 2만 4천 달러 초과, 비기술 직군 미화 6만 달러 초과입니다.',
    EN: 'The DE Rantau Nomad Pass from Malaysia’s MDEC is issued as a Professional Visit Pass valid for 3–12 months, renewable for a further 12 months. Annual income must exceed US$24,000 for tech talent and US$60,000 for non-tech professionals.',
    JP: 'マレーシアMDECのDE Rantauノマドパスは3〜12カ月の専門訪問パスとして発給され、さらに12カ月の更新が可能です。年収要件は技術職が米ドル2万4千超、非技術職が米ドル6万超です。',
  },
}

export function getVisaVerifiedGuidance(lang: Lang, country: string, purpose: string): VisaGuidance {
  const base = GENERIC[lang]
  const verifiedNote = VERIFIED_DESTINATION_NOTE[country]?.[lang]

  return {
    ...base,
    requirement: verifiedNote ? `${verifiedNote} ${base.requirement}` : base.requirement,
    program: PURPOSE_PROGRAM[purpose]?.[lang] ?? PURPOSE_PROGRAM.workation[lang],
  }
}

