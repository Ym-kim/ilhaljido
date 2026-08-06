import type { Lang } from '@/lib/i18n/types'

export type ResearchSource = {
  id: string
  title: Record<Lang, string>
  sourceName: string
  sourceUrl: string
  sourceType: 'official' | 'tourism_board' | 'local_government' | 'provider' | 'editorial'
  verifiedAt: string
  note?: Record<Lang, string>
}

export const VISA_OFFICIAL_SOURCES: Record<string, ResearchSource[]> = {
  japan: [
    {
      id: 'japan-isa-digital-nomad',
      title: {
        KO: '일본 디지털 노마드 재류자격(특정활동) 공식 안내',
        EN: 'Japan digital nomad status of residence — Immigration Services Agency',
        JP: '在留資格「特定活動」（デジタルノマド）公式案内',
      },
      sourceName: 'Immigration Services Agency of Japan (出入国在留管理庁)',
      // 외무성(mofa.go.jp)은 curl·WebFetch 모두 403 → 소관 부처인 출입국재류관리청
      // 페이지에서 요건 원문 확보(2026-08-06). 재류자격 소관이라 1차 출처로 더 적합
      sourceUrl: 'https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '체류 기간·소득 요건·의료보험 보장액·갱신 제한이 소관 부처 안내에 명시돼 있습니다. 대상 국적은 첨부 문서 목록으로 확인합니다.',
        EN: 'The competent agency states the period of stay, income threshold, insurance coverage and renewal restrictions. Eligible nationalities are listed in an attached document.',
        JP: '滞在期間・収入要件・医療保険の補償額・更新制限が所管庁の案内に明記されています。対象国籍は添付資料の一覧で確認します。',
      },
    },
    {
      id: 'japan-mofa-digital-nomad',
      title: {
        KO: '일본 디지털 노마드 체류자격 안내',
        EN: 'Japan digital nomad visa guidance',
        JP: 'デジタルノマド向け在留資格案内',
      },
      sourceName: 'Ministry of Foreign Affairs of Japan',
      sourceUrl: 'https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html',
      sourceType: 'official',
      verifiedAt: '2026-08-01',
      note: {
        KO: '공식 안내는 체류기간과 소득·보험 등 신청 요건을 함께 설명합니다.',
        EN: 'The official guidance covers the period of stay and application conditions, including income and insurance.',
        JP: '滞在期間に加え、収入・保険などの申請条件が案内されています。',
      },
    },
  ],
  thailand: [
    {
      id: 'thailand-dtv-embassy-korea',
      title: { KO: '주한 태국대사관 DTV 비자 공식 안내', EN: 'Royal Thai Embassy Seoul — Destination Thailand Visa', JP: '駐韓タイ大使館 DTV査証の公式案内' },
      sourceName: 'Royal Thai Embassy, Seoul',
      // thaievisa.go.th 본체는 JS 렌더, 외교부 PDF는 CID 폰트라 판독 불가 →
      // 주한 대사관 한국어 페이지에서 신청 요건 원문 확보(2026-08-06)
      sourceUrl: 'https://seoul.thaiembassy.org/kr/publicservice/destination-thailand-visa-dtv?cate=5d661cd515e39c30180049a4',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '한국 거주자 기준 DTV 신청 요건과 재정 요건, 연장 가능 여부가 한국어로 안내돼 있습니다.',
        EN: 'Sets out DTV application and financial requirements for applicants residing in Korea, including extension.',
        JP: '韓国居住者を対象としたDTVの申請要件・資金要件・延長可否が案内されています。',
      },
    },
    {
      id: 'thailand-evisa',
      title: { KO: '태국 전자비자 공식 포털', EN: 'Thailand official e-Visa portal', JP: 'タイ電子ビザ公式ポータル' },
      sourceName: 'Thai e-Visa',
      sourceUrl: 'https://www.thaievisa.go.th/',
      sourceType: 'official',
      verifiedAt: '2026-08-01',
    },
  ],
  indonesia: [
    {
      id: 'indonesia-e33g-faq',
      title: { KO: '인도네시아 E33G 원격근무 비자 공식 FAQ', EN: 'Indonesia E33G remote worker visa — official FAQ', JP: 'インドネシアE33Gリモートワーカー査証 公式FAQ' },
      sourceName: 'Directorate General of Immigration Indonesia',
      sourceUrl: 'https://evisa.imigrasi.go.id/front/faq/e076131c-0d39-469b-afaf-75fc66aff923',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '연소득·잔고 요건, 입국 기한, 체류 기간, 인도네시아 내 영리활동 금지 조항이 명시돼 있습니다.',
        EN: 'States the income and balance requirements, the entry deadline, the length of stay and the ban on earning income inside Indonesia.',
        JP: '年収・残高要件、入国期限、滞在期間、インドネシア国内での収益活動禁止が明記されています。',
      },
    },
    {
      id: 'indonesia-evisa',
      title: { KO: '인도네시아 전자비자 공식 포털', EN: 'Indonesia official e-Visa portal', JP: 'インドネシア電子ビザ公式ポータル' },
      sourceName: 'Directorate General of Immigration Indonesia',
      sourceUrl: 'https://evisa.imigrasi.go.id/',
      sourceType: 'official',
      verifiedAt: '2026-08-01',
    },
  ],
  vietnam: [
    {
      id: 'vietnam-evisa',
      title: { KO: '베트남 전자비자 공식 포털', EN: 'Vietnam official e-Visa portal', JP: 'ベトナム電子ビザ公式ポータル' },
      sourceName: 'Vietnam Immigration Department',
      sourceUrl: 'https://evisa.gov.vn/',
      sourceType: 'official',
      verifiedAt: '2026-08-01',
      note: {
        KO: '공식 포털은 전자비자의 체류 가능 기간과 단수·복수 입국 조건을 안내합니다.',
        EN: 'The official portal explains the permitted e-Visa period and single- or multiple-entry options.',
        JP: '電子ビザの滞在可能期間と、一次・数次入国の条件が案内されています。',
      },
    },
  ],

  // ───────────────────────────────────────────────────────────────────────────
  // 2026-08-06 확충 — VISA_COUNTRIES 21개국 중 출처가 4개국뿐이라 17개국은
  // "공식 확인 필요" 일반 문구만 나오고 다음 행동이 없던 문제 해소.
  //
  // 수록 기준: 해당국 정부(이민국·외무부·영사국) 도메인만. 민간 비자대행·
  // 정보 사이트 전면 배제. sourceUrl은 전부 HTTP 200 실측(리다이렉트 추적).
  //
  // ⚠️ note는 원문을 실제로 읽어 확인한 내용만 기재한다. 최상위 포털에는
  // 체류일수·소득요건 같은 수치가 없는 경우가 많아, 확인 못 한 국가는
  // note 없이 링크만 제공한다(추측 서술 금지 — 이것이 이번 복원의 핵심 원칙).
  // ───────────────────────────────────────────────────────────────────────────
  australia: [
    {
      id: 'australia-eta-embassy-korea',
      title: { KO: '주한 호주대사관 ETA 안내', EN: 'Australian Embassy in Korea — ETA (601)', JP: '駐韓オーストラリア大使館 ETA案内' },
      sourceName: 'Australian Embassy, Republic of Korea',
      // 본청 immi.homeaffairs.gov.au는 curl·WebFetch 모두 403(WAF) — 같은 정부의
      // 주한 대사관 페이지가 한국 여권 기준을 직접 안내해 판독에 성공(2026-08-06)
      sourceUrl: 'https://southkorea.embassy.gov.au/seol/ETA601.html',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '한국 여권 소지자의 ETA 체류 기간과 허용 방문 목적이 명시돼 있습니다.',
        EN: 'States the ETA length of stay and the permitted purposes of visit for Korean passport holders.',
        JP: '韓国旅券保持者のETA滞在期間と、認められる訪問目的が明記されています。',
      },
    },
    {
      id: 'australia-eta-601',
      title: { KO: '호주 ETA(전자여행허가) 공식 안내', EN: 'Australia ETA (subclass 601) official page', JP: 'オーストラリアETA公式案内' },
      sourceName: 'Department of Home Affairs',
      sourceUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
  portugal: [
    {
      id: 'portugal-temporary-stay-docs',
      title: { KO: '포르투갈 임시체류 비자 필요서류(원격근무 포함)', EN: 'Portugal temporary stay visa — required documents', JP: 'ポルトガル一時滞在査証 必要書類' },
      sourceName: 'Ministério dos Negócios Estrangeiros',
      sourceUrl: 'https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/temporary-stay',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '원격근무(디지털 노마드) 항목에 최근 3개월 평균 월소득 요건이 최저임금의 4배로 명시돼 있습니다.',
        EN: 'The remote-work (digital nomad) section requires average monthly income over the last three months of four times the minimum wage.',
        JP: 'リモートワーク（デジタルノマド）項目に、直近3カ月の平均月収が最低賃金の4倍と明記されています。',
      },
    },
    {
      id: 'portugal-means-of-subsistence',
      title: { KO: '포르투갈 생계 수단 기준', EN: 'Portugal means of subsistence', JP: 'ポルトガル 生計手段の基準' },
      sourceName: 'Ministério dos Negócios Estrangeiros',
      sourceUrl: 'https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/means-of-subsistence',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '기준 최저임금(RMMG)과 동반 가족 가산율(성인 50%·미성년 30%)이 명시돼 있습니다.',
        EN: 'States the reference minimum wage and the family uplift rates (50% per additional adult, 30% per minor).',
        JP: '基準となる最低賃金と、同伴家族の加算率（成人50%・未成年30%）が明記されています。',
      },
    },
  ],
  taiwan: [
    {
      id: 'taiwan-boca-visa-exempt',
      title: { KO: '대만 무비자 입국 공식 안내', EN: 'Taiwan visa-exempt entry (official)', JP: '台湾 ビザ免除入国の公式案内' },
      sourceName: 'Bureau of Consular Affairs, MOFA',
      sourceUrl: 'https://www.boca.gov.tw/cp-149-4486-7785a-2.html',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '무비자 대상국 목록에 한국이 포함되며 체류 기간 90일로 명시돼 있습니다.',
        EN: 'The visa-exemption list includes the Republic of Korea with a 90-day duration of stay.',
        JP: 'ビザ免除対象国リストに韓国が含まれ、滞在期間90日と明記されています。',
      },
    },
    {
      id: 'taiwan-boca-nomad',
      title: { KO: '대만 디지털노마드 방문비자 공식 안내', EN: 'Taiwan digital nomad visitor visa (official)', JP: '台湾 デジタルノマド訪問査証' },
      sourceName: 'Bureau of Consular Affairs, MOFA',
      sourceUrl: 'https://www.boca.gov.tw/cp-158-7718-c0382-2.html',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '연령대별 소득·잔고 요건이 명시돼 있습니다. 다만 체류 허용 기간은 이 페이지에 표기돼 있지 않아, 기간은 신청 시 재확인이 필요합니다.',
        EN: 'Income and bank-balance requirements are stated by age band. The permitted length of stay is not stated on this page, so confirm it when applying.',
        JP: '年齢帯別の収入・残高要件が明記されています。ただし滞在可能期間はこのページに記載がないため、申請時に再確認が必要です。',
      },
    },
  ],
  philippines: [
    {
      id: 'philippines-visa-waiver',
      title: { KO: '필리핀 방문자 비자 웨이버 공식 안내', EN: 'Philippines — Temporary Visitor (9A) visa waiver', JP: 'フィリピン 一時訪問者ビザウェーバーの公式案内' },
      sourceName: 'Bureau of Immigration',
      sourceUrl: 'https://immigration.gov.ph/visas/visa-waiver/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '무비자 최초 체류 일수와 웨이버 연장 일수, 누적 체류 상한이 명시돼 있습니다.',
        EN: 'States the initial visa-free stay, the extension granted by the waiver and the cumulative stay limits.',
        JP: 'ビザ免除の当初滞在日数、ウェーバーによる延長日数、通算滞在の上限が明記されています。',
      },
    },
    {
      id: 'philippines-immigration',
      title: { KO: '필리핀 이민청 공식 사이트', EN: 'Philippine Bureau of Immigration', JP: 'フィリピン入国管理局' },
      sourceName: 'Bureau of Immigration',
      sourceUrl: 'https://immigration.gov.ph/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
  singapore: [
    {
      id: 'singapore-ica-extend',
      title: { KO: '싱가포르 단기방문패스 연장 공식 안내', EN: 'Singapore — extension of short-term visit pass', JP: 'シンガポール 短期訪問パス延長の公式案内' },
      sourceName: 'Immigration & Checkpoints Authority',
      sourceUrl: 'https://www.ica.gov.sg/enter-depart/extend_short_stay',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '연장 신청 가능 시점과 수수료, 온라인 접수 원칙이 명시돼 있습니다.',
        EN: 'States when an extension may be filed, the fees involved and that applications are online only.',
        JP: '延長申請が可能な時期と手数料、オンライン受付のみである旨が明記されています。',
      },
    },
    {
      id: 'singapore-ica-entry',
      title: { KO: '싱가포르 입국 요건 공식 안내', EN: 'Singapore entry requirements (ICA)', JP: 'シンガポール入国要件（ICA）' },
      sourceName: 'Immigration & Checkpoints Authority',
      sourceUrl: 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: 'ICA는 여권 잔여 유효기간 6개월 이상과 도착 3일 전 SG 도착카드(SGAC) 제출을 요구합니다.',
        EN: 'ICA requires at least six months of passport validity and the SG Arrival Card submitted within three days before arrival.',
        JP: 'ICAは旅券残存6カ月以上と、到着3日前までのSG到着カード提出を求めています。',
      },
    },
  ],
  malaysia: [
    {
      id: 'malaysia-de-rantau',
      title: { KO: 'DE Rantau 노마드 패스 공식 안내', EN: 'DE Rantau Nomad Pass (official)', JP: 'DE Rantau ノマドパス公式案内' },
      sourceName: 'Malaysia Digital Economy Corporation (MDEC)',
      sourceUrl: 'https://mdec.my/derantau',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '전문방문패스 유효기간과 직군별 연소득 요건이 명시돼 있습니다.',
        EN: 'States the Professional Visit Pass validity and annual income thresholds by talent category.',
        JP: '専門訪問パスの有効期間と職種別の年収要件が明記されています。',
      },
    },
    {
      id: 'malaysia-imi-visa',
      title: { KO: '말레이시아 이민국 비자 안내', EN: 'Malaysia Immigration Department visa services', JP: 'マレーシア入国管理局ビザ案内' },
      sourceName: 'Jabatan Imigresen Malaysia',
      sourceUrl: 'https://www.imi.gov.my/index.php/en/main-services/visa/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
  usa: [
    {
      id: 'usa-embassy-korea-visas',
      title: { KO: '주한 미국대사관 비자 안내', EN: 'U.S. Embassy in Korea — visas', JP: '駐韓米国大使館 ビザ案内' },
      sourceName: 'U.S. Embassy & Consulate in the Republic of Korea',
      // travel.state.gov는 curl·WebFetch 모두 403, ESTA 사이트는 JS SPA라 본문 판독 불가 →
      // 한국 거주자 진입점으로 주한 대사관 페이지를 1순위 출처로 채택(2026-08-06 판독 성공)
      sourceUrl: 'https://kr.usembassy.gov/visas/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '비자 종류 판별 도구(Visa Wizard)와 비이민 비자 신청서(DS-160) 경로가 안내돼 있습니다.',
        EN: 'Provides the Visa Wizard for identifying the right visa type and the DS-160 nonimmigrant application route.',
        JP: 'ビザ種別を判定するVisa Wizardと、非移民ビザ申請（DS-160）の経路が案内されています。',
      },
    },
    {
      id: 'usa-esta',
      title: { KO: '미국 ESTA 공식 신청 사이트', EN: 'Official U.S. ESTA application site', JP: '米国ESTA公式申請サイト' },
      sourceName: 'U.S. Customs and Border Protection',
      sourceUrl: 'https://esta.cbp.dhs.gov/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
  spain: [
    {
      id: 'spain-telework-visa',
      title: { KO: '스페인 원격근무(디지털 노마드) 비자 공식 안내', EN: 'Spain telework (digital nomad) visa — official', JP: 'スペイン テレワーク（デジタルノマド）査証の公式案内' },
      sourceName: 'Ministerio de Asuntos Exteriores (Consulate General, Washington)',
      sourceUrl: 'https://www.exteriores.gob.es/Consulados/washington/en/ServiciosConsulares/Paginas/Consular/Telework-visa.aspx',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '소득 요건(SMI 대비 비율)·비자 유효기간·자격 요건·스페인 기업 업무 비중 상한이 명시돼 있습니다. 표기된 SMI 기준 연도를 함께 확인하세요.',
        EN: 'States the income threshold as a share of the minimum wage, the visa validity, eligibility criteria and the cap on work for Spanish companies. Check which minimum-wage year the figures use.',
        JP: '最低賃金比の収入要件・査証の有効期間・資格要件・スペイン企業向け業務の上限が明記されています。基準となる最低賃金の年度も併せて確認してください。',
      },
    },
    {
      id: 'spain-consular',
      title: { KO: '스페인 외무부 영사 서비스', EN: 'Spain consular services', JP: 'スペイン外務省領事サービス' },
      sourceName: 'Ministerio de Asuntos Exteriores',
      sourceUrl: 'https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Servicios-consulares.aspx',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
  italy: [
    {
      id: 'italy-digital-nomad-visa',
      title: { KO: '이탈리아 디지털 노마드·원격근무 비자 공식 안내', EN: 'Italy digital nomad / remote worker visa — official', JP: 'イタリア デジタルノマド・リモートワーカー査証の公式案内' },
      sourceName: 'Consolato Generale d’Italia (New York)',
      sourceUrl: 'https://consnewyork.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/visas-to-enter-italy/digital-nomad-remote-worker-visa/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '최소 연소득·의료보험 보장액·숙소 계약 요건이 명시돼 있습니다. 금액은 페이지가 밝힌 기준 연도를 함께 확인하세요.',
        EN: 'States the minimum annual income, health-insurance coverage and accommodation requirements. Check the reference year the page cites for the amounts.',
        JP: '最低年収・医療保険の補償額・住居契約の要件が明記されています。金額はページが示す基準年度も併せて確認してください。',
      },
    },
    {
      id: 'italy-maeci-visa',
      title: { KO: '이탈리아 입국 비자 공식 안내', EN: 'Italy entry visa official guidance', JP: 'イタリア入国査証の公式案内' },
      sourceName: 'Ministero degli Affari Esteri (MAECI)',
      sourceUrl: 'https://www.esteri.it/en/servizi-opportunita/ingressosoggiornoinitalia/visto_ingresso/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '셰겐 단일비자(USV)는 최대 90일 단기 체류, 90일을 넘는 체류는 국가비자(NV)와 체류허가가 필요하다고 안내합니다.',
        EN: 'A Uniform Schengen Visa covers short stays up to 90 days; stays beyond 90 days require a National Visa and a residence permit.',
        JP: 'シェンゲン統一査証は最長90日の短期滞在用で、90日を超える滞在は国別査証と滞在許可が必要と案内されています。',
      },
    },
  ],
  germany: [
    {
      id: 'germany-self-employment',
      title: { KO: '독일 자영업·프리랜서 체류허가 공식 FAQ', EN: 'Germany self-employment / freelance residence permit — official FAQ', JP: 'ドイツ 自営業・フリーランス滞在許可の公式FAQ' },
      sourceName: 'Auswärtiges Amt (Federal Foreign Office)',
      sourceUrl: 'https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/12-own-business/606752',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '체류법 제21조의 자영업(1항)·자유업(5항) 경로와 45세 초과 시 추가 요건이 명시돼 있습니다.',
        EN: 'Sets out the self-employment (Section 21(1)) and liberal-profession (Section 21(5)) routes and the extra condition for applicants over 45.',
        JP: '滞在法第21条の自営業（1項）・自由業（5項）の経路と、45歳超の追加要件が明記されています。',
      },
    },
    {
      id: 'germany-visa-service',
      title: { KO: '독일 외무부 비자 서비스', EN: 'German Federal Foreign Office visa service', JP: 'ドイツ外務省ビザサービス' },
      sourceName: 'Auswärtiges Amt',
      sourceUrl: 'https://www.auswaertiges-amt.de/en/visa-service',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
  czech: [
    {
      id: 'czech-business-long-term-visa',
      title: {
        KO: '체코 사업 목적 장기비자 공식 안내',
        EN: 'Czech long-term visa for the purpose of doing business',
        JP: 'チェコ 事業目的の長期査証の公式案内',
      },
      sourceName: 'Ministry of the Interior of the Czech Republic',
      sourceUrl: 'https://ipc.gov.cz/en/visa-and-residence-permit-types/third-country-nationals/long-term-visa/long-term-visa-for-the-purpose-of-doing-business/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '대상 활동·최대 유효기간·필요 서류·수수료·처리 기간이 명시돼 있습니다. 재정 요건 금액은 이 페이지에 없어 별도 확인이 필요합니다.',
        EN: 'Covers eligible activities, maximum validity, required documents, fees and processing times. The financial threshold is not stated on this page.',
        JP: '対象活動・最長有効期間・必要書類・手数料・処理期間が明記されています。資金要件の金額はこのページにありません。',
      },
    },
    {
      id: 'czech-ipc-portal',
      title: { KO: '체코 외국인 공식 정보 포털', EN: 'Czech official information portal for foreigners', JP: 'チェコ 外国人向け公式情報ポータル' },
      sourceName: 'Ministry of the Interior of the Czech Republic',
      // 내무부 안내가 이 포털을 참조처로 지정. frs.gov.cz → ipc.gov.cz로 301 이전됨(2026-08-06 실측)
      sourceUrl: 'https://ipc.gov.cz/en/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '비자·체류허가 종류와 신청 안내가 이 포털에 모여 있습니다. 디지털 노마드 전용 제도는 확인되지 않았습니다.',
        EN: 'Visa and residence permit types and application guides are consolidated here. No dedicated digital nomad scheme was found.',
        JP: '査証・滞在許可の種類と申請案内がこのポータルに集約されています。デジタルノマド専用制度は確認できませんでした。',
      },
    },
    {
      id: 'czech-mvcr',
      title: { KO: '체코 내무부 외국인 체류 안내', EN: 'Czech Ministry of the Interior — residence of foreigners', JP: 'チェコ内務省 外国人滞在案内' },
      sourceName: 'Ministerstvo vnitra ČR',
      // mvcr.cz → mv.gov.cz 도메인 이전 확인(2026-08-06 리다이렉트 실측)
      sourceUrl: 'https://mv.gov.cz/mvcren/',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
  hungary: [
    {
      id: 'hungary-white-card',
      title: { KO: '헝가리 화이트카드(디지털 노마드) 공식 안내', EN: 'Hungary White Card (digital nomad) factsheet', JP: 'ハンガリー ホワイトカード公式案内' },
      sourceName: 'National Directorate-General for Aliens Policing',
      sourceUrl: 'https://oif.gov.hu/factsheets/white-card-residency-for-digital-nomads',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
  croatia: [
    {
      id: 'croatia-digital-nomads',
      title: { KO: '크로아티아 디지털 노마드 임시체류 공식 안내', EN: 'Croatia — temporary stay of digital nomads', JP: 'クロアチア デジタルノマド一時滞在の公式案内' },
      sourceName: 'Ministarstvo unutarnjih poslova',
      sourceUrl: 'https://mup.gov.hr/aliens-281621/stay-and-work/temporary-stay-of-digital-nomads/286833',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '체류 기간·월 소득 요건·재신청 대기 기간이 내무부 공식 안내에 명시돼 있습니다.',
        EN: 'The interior ministry states the permitted period, monthly income threshold and the waiting period before reapplying.',
        JP: '滞在期間・月収要件・再申請までの待機期間が内務省の公式案内に明記されています。',
      },
    },
  ],
  georgia: [
    {
      id: 'georgia-korea-mofa-notice',
      title: {
        KO: '조지아 무비자 체류기간 1년 — 대한민국 대사관 공지',
        EN: 'Georgia one-year visa-free stay — Korean embassy notice',
        JP: 'ジョージアのビザ免除滞在1年 — 韓国大使館の公示',
      },
      sourceName: '주아제르바이잔 대한민국 대사관 (외교부)',
      // geoconsul.gov.ge는 전 경로가 JS 포털이라 판독 불가 → 한국 여권 기준을 직접
      // 다루는 우리 정부 공관 공지를 채택(2026-08-06). 한국인 대상 여부가 명시돼 더 적합
      sourceUrl: 'https://aze.mofa.go.kr/az-ko/brd/m_8247/view.do?seq=1151253',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '한국 국민의 무비자 체류기간이 90일에서 1년으로 연장된 시행일과 근거가 공지돼 있습니다.',
        EN: 'States when the visa-free stay for Korean nationals was extended from 90 days to one year, and the basis for it.',
        JP: '韓国国民のビザ免除滞在が90日から1年に延長された施行日と根拠が案内されています。',
      },
    },
    {
      id: 'georgia-consul',
      title: { KO: '조지아 외무부 영사 포털', EN: 'Georgia consular portal', JP: 'ジョージア外務省領事ポータル' },
      sourceName: 'Ministry of Foreign Affairs of Georgia',
      sourceUrl: 'https://geoconsul.gov.ge/en',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '무비자 여행·입국 요건 항목이 영사 포털에 별도로 제공됩니다.',
        EN: 'The consular portal provides dedicated visa-free travel and entry sections.',
        JP: 'ビザ免除渡航・入国要件の項目が領事ポータルに用意されています。',
      },
    },
  ],
  canada: [
    {
      id: 'canada-ircc-eta-stay',
      title: {
        KO: '캐나다 eTA 체류 기간·유효기간 (IRCC 헬프센터)',
        EN: 'Canada eTA — length of stay and validity (IRCC Help Centre)',
        JP: 'カナダeTAの滞在期間・有効期間（IRCCヘルプセンター）',
      },
      sourceName: 'Immigration, Refugees and Citizenship Canada',
      // canada.ca 본체는 curl·WebFetch 모두 403(WAF)이나 **ircc.canada.ca 헬프센터는 판독 가능**
      // (2026-08-06 발견). 같은 IRCC 공식 답변이므로 1차 출처로 사용
      sourceUrl: 'https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=1198&top=16',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '체류 허용 기간과 최종 결정 주체(입국 시 국경 담당관)가 명시돼 있습니다.',
        EN: 'States the permitted length of stay and that a border services officer decides it on entry.',
        JP: '許可される滞在期間と、入国時に国境担当官が決定する旨が明記されています。',
      },
    },
    {
      id: 'canada-visa-eta',
      title: { KO: '캐나다 비자·eTA 필요 여부 확인', EN: 'Canada — find out if you need a visa or eTA', JP: 'カナダ ビザ・eTA要否の確認' },
      sourceName: 'Immigration, Refugees and Citizenship Canada',
      // canada.ca는 WAF가 비브라우저 요청을 403으로 차단해 본문 판독 불가.
      // 대신 캐나다 정부 구 도메인(cic.gc.ca/english/visit/visas.asp)이 이 URL로
      // 301 리다이렉트하는 것을 실측 — 정부가 직접 가리키는 현행 경로임이 확인됨.
      // 본문을 읽지 못했으므로 note는 달지 않는다.
      sourceUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/check-visa-eta.html',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
  france: [
    {
      id: 'france-vls-ts',
      title: {
        KO: '프랑스 장기체류비자(VLS-TS) 공식 안내',
        EN: 'France long-stay visa serving as a residence permit (VLS-TS)',
        JP: 'フランス 滞在許可を兼ねる長期査証（VLS-TS）',
      },
      sourceName: 'service-public.gouv.fr (프랑스 정부 공식 행정안내)',
      // france-visas.gouv.fr 본체는 403 지속 → 정부 공식 행정안내 포털로 대체 판독 성공
      sourceUrl: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F16162?lang=en',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '체류 기간, 체류증 대체 여부, 입국 후 온라인 검증 기한이 명시돼 있습니다.',
        EN: 'States the period of stay, that the visa replaces a residence card, and the online validation deadline after arrival.',
        JP: '滞在期間、滞在許可証の代替可否、入国後のオンライン認証期限が明記されています。',
      },
    },
    {
      id: 'france-mfa-visa',
      title: { KO: '프랑스 비자 신청 공식 안내', EN: 'France — requesting a visa (MFA)', JP: 'フランス査証申請の公式案内' },
      sourceName: 'Ministère de l’Europe et des Affaires étrangères',
      // france-visas.gouv.fr 본체는 봇 차단(403)이라 외무부 안내 페이지를 채택.
      // 이 페이지가 France-Visas를 "공식 비자 사이트"로 안내하므로 진입점으로 충분.
      sourceUrl: 'https://www.diplomatie.gouv.fr/en/services-to-foreigners/visiting-france/requesting-a-visa',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '외무부는 France-Visas를 공식 비자 사이트로 안내하며, 비자 종류 확인은 포털의 Visa Wizard를 거치도록 합니다.',
        EN: 'The foreign ministry designates France-Visas as the official visa site and directs applicants to its Visa Wizard.',
        JP: '外務省はFrance-Visasを公式査証サイトとし、査証種別の確認はポータルのVisa Wizardを案内しています。',
      },
    },
  ],
  uae: [
    {
      id: 'uae-gdrfa-virtual-work',
      title: {
        KO: '두바이 가상근무 거주허가 발급 (GDRFA)',
        EN: 'Dubai virtual work residence permit (GDRFA)',
        JP: 'ドバイ バーチャルワーク居住許可（GDRFA）',
      },
      sourceName: 'General Directorate of Residency and Foreigners Affairs, Dubai',
      // u.ae 심층 경로는 사이트 개편으로 404 → 소관 기관(두바이 이민국) 서비스 페이지 채택
      sourceUrl: 'https://www.gdrfad.gov.ae/en/services/f52024e3-b812-11ed-5210-4cd98f768936',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
      note: {
        KO: '월 소득 요건·유효기간·필요 서류·수수료·만료 후 유예기간이 소관 기관 서비스 안내에 명시돼 있습니다.',
        EN: 'The competent authority lists the monthly income threshold, validity, required documents, fees and the post-expiry grace period.',
        JP: '月収要件・有効期間・必要書類・手数料・満了後の猶予期間が所管機関の案内に明記されています。',
      },
    },
    {
      id: 'uae-visa-services',
      title: { KO: 'UAE 정부 공식 비자 안내', EN: 'UAE government visa information', JP: 'UAE政府 公式ビザ案内' },
      sourceName: 'The United Arab Emirates’ Government portal',
      sourceUrl: 'https://u.ae/en/information-and-services/visa-and-emirates-id',
      sourceType: 'official',
      verifiedAt: '2026-08-06',
    },
  ],
}

