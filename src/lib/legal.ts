import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 법적 고지 — 사업자 정보 + 개인정보처리방침 + 이용약관 (3언어)
// 운영사: 주식회사 스테이포워드 / 사업자등록증 기준
// 개인정보보호법 §30(처리방침 공개), §15(수집·이용 고지) 대응
// ─────────────────────────────────────────────────────────────────────────────

export const BUSINESS = {
  companyKo: '주식회사 스테이포워드',
  companyEn: 'StayForward Co., Ltd.',
  ceo: '김용민',
  bizNo: '812-86-04005', // 사업자등록번호
  corpNo: '120111-0153058', // 법인등록번호
  addressKo: '인천광역시 연수구 송도미래로 30, 디동 1311-디18호(송도동, 송도 BRC 스마트밸리 지식산업센터)',
  addressEn: 'D-1311-D18, 30 Songdomirae-ro, Yeonsu-gu, Incheon, Republic of Korea',
  email: 'wakation.sf@gmail.com',
  service: 'Wakation (wakation.kr)',
  privacyOfficer: '김용민',
  effectiveDate: '2026-08-08',
}

type L = Record<Lang, string>
export type LegalSection = { heading: L; body: L }

// ── 개인정보처리방침 ──────────────────────────────────────────────────────────
export const PRIVACY: { title: L; intro: L; sections: LegalSection[]; updated: L } = {
  title: { KO: '개인정보처리방침', EN: 'Privacy Policy', JP: 'プライバシーポリシー' },
  intro: {
    KO: `${BUSINESS.companyKo}(이하 "회사")는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 회사가 운영하는 ${BUSINESS.service} 서비스에 적용됩니다.`,
    EN: `${BUSINESS.companyEn} ("the Company") values your personal data and complies with the Personal Information Protection Act and related laws. This policy applies to the ${BUSINESS.service} service operated by the Company.`,
    JP: `${BUSINESS.companyEn}（以下「当社」）は利用者の個人情報を重視し、「個人情報保護法」等の関連法令を遵守します。本方針は当社が運営する${BUSINESS.service}サービスに適用されます。`,
  },
  updated: { KO: `시행일: ${BUSINESS.effectiveDate}`, EN: `Effective date: ${BUSINESS.effectiveDate}`, JP: `施行日: ${BUSINESS.effectiveDate}` },
  sections: [
    {
      heading: { KO: '1. 수집하는 개인정보 항목', EN: '1. Personal data we collect', JP: '1. 収集する個人情報の項目' },
      body: {
        KO: '· 프로그램 신청·문의: 이름, 연락처(전화번호), 이메일, 직업, 업무 스타일, 관심 분야, 휴식 선호, 예산·희망 기간, 문의 내용\n· 회원가입: 이름, 이메일, (소셜 로그인 시) 제공사로부터 받은 프로필 정보\n· 여행자 노트: 계정 이메일, 공개 닉네임, 여행지·여행 시기·여행 방식, 작성 내용, 사진 링크(선택)\n· 자동 수집: 서비스 이용 기록, 접속 로그(익명 집계)',
        EN: '· Program applications/inquiries: name, phone, email, occupation, work style, interests, rest preferences, budget/duration, message\n· Sign-up: name, email, and (for social login) profile data from the provider\n· Traveler Notes: account email, public nickname, destination/travel month/travel style, submitted text, photo link (optional)\n· Automatically collected: service usage records, access logs (anonymous aggregate)',
        JP: '· プログラム申込・問い合わせ: 氏名、連絡先（電話番号）、メール、職業、勤務スタイル、関心分野、休息の好み、予算・希望期間、問い合わせ内容\n· 会員登録: 氏名、メール、（ソーシャルログイン時）提供元から受領するプロフィール情報\n· トラベラーノート: アカウントメール、公開ニックネーム、行き先・旅行月・旅行スタイル、投稿内容、写真リンク（任意）\n· 自動収集: サービス利用記録、アクセスログ（匿名集計）',
      },
    },
    {
      heading: { KO: '2. 수집·이용 목적', EN: '2. Purpose of collection and use', JP: '2. 収集・利用目的' },
      body: {
        KO: '· 프로그램 안내·신청 접수 및 상담, 문의 응대\n· 회원 식별 및 서비스 제공, 맞춤 추천\n· 여행자 노트 검수·편집 연락 및 사전 확인 후 콘텐츠 게재\n· 서비스 개선 및 통계 분석',
        EN: '· Program guidance, application handling, consultation, and inquiry response\n· Member identification, service delivery, personalized recommendations\n· Traveler Note review, editorial contact and publication after confirmation\n· Service improvement and statistical analysis',
        JP: '· プログラム案内・申込受付・相談、問い合わせ対応\n· 会員識別およびサービス提供、パーソナライズ推薦\n· トラベラーノートの確認・編集連絡および確認後の掲載\n· サービス改善および統計分析',
      },
    },
    {
      heading: { KO: '3. 보유·이용 기간', EN: '3. Retention period', JP: '3. 保有・利用期間' },
      body: {
        KO: '· 회원 정보: 회원 탈퇴 시까지\n· 프로그램 신청·문의·여행자 노트 제출 정보: 목적 달성 후 1년 이내 파기\n· 공개된 여행자 노트는 동의 철회 또는 삭제 요청 시까지 보관하며, 요청 시 공개본과 제출 정보를 지체 없이 처리합니다.\n· 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.',
        EN: '· Member data: until account deletion\n· Applications, inquiries and Traveler Note submissions: destroyed within 1 year after the purpose is fulfilled\n· Published Traveler Notes are retained until consent is withdrawn or deletion is requested; the public copy and submission data are then handled without delay.\n· Data is retained for legally required periods where applicable.',
        JP: '· 会員情報: 退会時まで\n· 申込・問い合わせ・トラベラーノート投稿情報: 目的達成後1年以内に破棄\n· 公開済みのトラベラーノートは同意撤回または削除依頼まで保管し、依頼時は公開内容と投稿情報を遅滞なく処理します。\n· 関係法令により保存が必要な場合は当該期間保管します。',
      },
    },
    {
      heading: { KO: '4. 처리 위탁 및 국외 이전', EN: '4. Processing consignment & overseas transfer', JP: '4. 処理委託および国外移転' },
      body: {
        KO: '회사는 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁하며, 일부는 국외에서 처리됩니다.\n· Supabase (데이터베이스·인증 호스팅)\n· Vercel (웹 호스팅·익명 트래픽 분석)\n· AI 추천·비자 안내 기능: 신청 정보 중 직접 식별자(이름·연락처·이메일)를 제외한 선호·질의 정보가 AI 처리 사업자(예: Google 등)의 API로 전송·처리될 수 있습니다.\n이용자는 국외 이전을 원치 않을 경우 해당 기능 이용을 중단하거나 문의처로 요청할 수 있습니다.',
        EN: 'To provide the service, the Company consigns processing as below; some occurs overseas.\n· Supabase (database & auth hosting)\n· Vercel (web hosting & anonymous traffic analytics)\n· AI recommendation/visa guidance: preference and query data — excluding direct identifiers (name, phone, email) — may be sent to and processed by an AI provider (e.g., Google) via API.\nIf you object to overseas transfer, you may stop using the feature or contact us.',
        JP: '当社はサービス提供のため以下のとおり個人情報処理を委託し、一部は国外で処理されます。\n· Supabase（データベース・認証ホスティング）\n· Vercel（Webホスティング・匿名トラフィック分析）\n· AI推薦・ビザ案内機能: 申込情報のうち直接識別子（氏名・連絡先・メール）を除く選好・照会情報がAI処理事業者（例: Google等）のAPIへ送信・処理される場合があります。\n国外移転を望まない場合は当該機能の利用を中止するか、問い合わせ先へ請求できます。',
      },
    },
    {
      heading: { KO: '5. 쿠키 및 유사 기술', EN: '5. Cookies and similar technologies', JP: '5. クッキーおよび類似技術' },
      body: {
        KO: '· 인증 쿠키: 로그인 상태 유지를 위한 필수 쿠키(Supabase)\n· 기능 쿠키: 언어 설정 저장(wakation_lang)\n· 분석: 쿠키를 사용하지 않는 익명 방문 통계(Vercel Analytics)\n회사는 광고·마케팅 추적 쿠키를 사용하지 않습니다. 브라우저 설정에서 쿠키를 차단할 수 있으나, 인증 쿠키 차단 시 로그인 기능이 제한됩니다.',
        EN: '· Auth cookies: essential cookies to keep you logged in (Supabase)\n· Functional cookies: saving language preference (wakation_lang)\n· Analytics: cookieless anonymous visit stats (Vercel Analytics)\nWe do not use advertising/marketing tracking cookies. You may block cookies in your browser, but blocking auth cookies limits login.',
        JP: '· 認証クッキー: ログイン状態維持のための必須クッキー（Supabase）\n· 機能クッキー: 言語設定の保存（wakation_lang）\n· 分析: クッキーを使用しない匿名訪問統計（Vercel Analytics）\n当社は広告・マーケティング追跡クッキーを使用しません。ブラウザ設定でクッキーを拒否できますが、認証クッキーを拒否するとログイン機能が制限されます。',
      },
    },
    {
      heading: { KO: '6. 외부 제휴 링크', EN: '6. External affiliate links', JP: '6. 外部提携リンク' },
      body: {
        KO: '서비스 내 일부 링크는 제휴 마케팅 링크(Booking.com, Trip.com 등)입니다. 제휴 링크를 통해 파트너사 사이트로 이동하면 해당 사이트가 예약 추적을 위한 자체 쿠키를 설정할 수 있으며, 이는 각 파트너사의 개인정보 정책을 따릅니다. 예약·결제·환불은 전적으로 파트너사에서 이루어집니다.',
        EN: 'Some links are affiliate marketing links (Booking.com, Trip.com, etc.). When you move to a partner site via such links, that site may set its own tracking cookies subject to its own privacy policy. Booking, payment, and refunds occur entirely on the partner site.',
        JP: 'サービス内の一部リンクは提携マーケティングリンク（Booking.com、Trip.com等）です。提携リンクからパートナーサイトへ移動すると、当該サイトが予約追跡のための独自クッキーを設定する場合があり、各パートナーのプライバシーポリシーに従います。予約・決済・返金はすべてパートナーサイトで行われます。',
      },
    },
    {
      heading: { KO: '7. 이용자의 권리', EN: '7. Your rights', JP: '7. 利用者の権利' },
      body: {
        KO: '이용자는 언제든 자신의 개인정보에 대한 열람·정정·삭제·처리정지를 요청할 수 있습니다. 요청은 아래 개인정보 보호책임자 연락처로 접수하며, 회사는 지체 없이 조치합니다.',
        EN: 'You may at any time request access to, correction, deletion of, or suspension of processing of your personal data. Contact the privacy officer below; we act without delay.',
        JP: '利用者はいつでも自己の個人情報の閲覧・訂正・削除・処理停止を請求できます。以下の個人情報保護責任者へご連絡ください。当社は遅滞なく対応します。',
      },
    },
    {
      heading: { KO: '8. 개인정보 보호책임자', EN: '8. Privacy officer', JP: '8. 個人情報保護責任者' },
      body: {
        KO: `· 회사: ${BUSINESS.companyKo}\n· 대표자: ${BUSINESS.ceo}\n· 보호책임자: ${BUSINESS.privacyOfficer}\n· 이메일: ${BUSINESS.email}\n· 주소: ${BUSINESS.addressKo}\n· 사업자등록번호: ${BUSINESS.bizNo}`,
        EN: `· Company: ${BUSINESS.companyEn}\n· CEO: ${BUSINESS.ceo}\n· Privacy officer: ${BUSINESS.privacyOfficer}\n· Email: ${BUSINESS.email}\n· Address: ${BUSINESS.addressEn}\n· Business reg. no.: ${BUSINESS.bizNo}`,
        JP: `· 会社: ${BUSINESS.companyEn}\n· 代表者: ${BUSINESS.ceo}\n· 保護責任者: ${BUSINESS.privacyOfficer}\n· メール: ${BUSINESS.email}\n· 住所: ${BUSINESS.addressEn}\n· 事業者登録番号: ${BUSINESS.bizNo}`,
      },
    },
  ],
}

// ── 이용약관 ──────────────────────────────────────────────────────────────────
export const TERMS: { title: L; intro: L; sections: LegalSection[]; updated: L } = {
  title: { KO: '이용약관', EN: 'Terms of Service', JP: '利用規約' },
  intro: {
    KO: `본 약관은 ${BUSINESS.companyKo}(이하 "회사")가 제공하는 ${BUSINESS.service} 서비스의 이용 조건을 규정합니다.`,
    EN: `These terms govern the use of the ${BUSINESS.service} service provided by ${BUSINESS.companyEn} ("the Company").`,
    JP: `本規約は${BUSINESS.companyEn}（以下「当社」）が提供する${BUSINESS.service}サービスの利用条件を定めます。`,
  },
  updated: { KO: `시행일: ${BUSINESS.effectiveDate}`, EN: `Effective date: ${BUSINESS.effectiveDate}`, JP: `施行日: ${BUSINESS.effectiveDate}` },
  sections: [
    {
      heading: { KO: '제1조 (목적)', EN: 'Article 1 (Purpose)', JP: '第1条（目的）' },
      body: {
        KO: '본 약관은 회사가 제공하는 워케이션 프로그램 안내·신청, 제휴 상품 정보 제공, AI 안내 등 서비스의 이용과 관련하여 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.',
        EN: 'These terms define the rights, obligations, and responsibilities of the Company and users regarding workation program guidance/application, affiliate product information, AI guidance, and related services.',
        JP: '本規約は、当社が提供するワーケーションプログラム案内・申込、提携商品情報提供、AI案内等のサービス利用に関し、当社と利用者の権利・義務・責任事項を定めることを目的とします。',
      },
    },
    {
      heading: { KO: '제2조 (제휴 서비스의 성격)', EN: 'Article 2 (Nature of affiliate services)', JP: '第2条（提携サービスの性格）' },
      body: {
        KO: '회사가 제공하는 숙소·체험·eSIM 등 제휴 상품 정보는 파트너사(Booking.com, Trip.com 등)의 상품을 안내하는 것이며, 실제 예약·결제·환불·이용 조건은 전적으로 각 파트너사의 약관을 따릅니다. 회사는 제휴 링크를 통해 수수료를 받을 수 있으나 예약의 당사자가 아니며, 파트너사 상품의 하자·취소·분쟁에 대해 책임지지 않습니다. 요금과 상품 조건은 파트너사 사이트에서 최종 확인됩니다.',
        EN: 'Affiliate product information (stays, activities, eSIM, etc.) refers to partner products (Booking.com, Trip.com, etc.). Actual booking, payment, refund, and terms are governed solely by each partner. The Company may earn commissions via affiliate links but is not a party to the booking and is not liable for partner product defects, cancellations, or disputes. Prices and terms are finalized on the partner site.',
        JP: '当社が提供する宿泊・体験・eSIM等の提携商品情報はパートナー（Booking.com、Trip.com等）の商品を案内するものであり、実際の予約・決済・返金・利用条件は各パートナーの規約に従います。当社は提携リンクを通じ手数料を得る場合がありますが予約の当事者ではなく、パートナー商品の瑕疵・キャンセル・紛争について責任を負いません。料金と条件はパートナーサイトで最終確認されます。',
      },
    },
    {
      heading: { KO: '제3조 (자체 프로그램)', EN: 'Article 3 (Own programs)', JP: '第3条（自社プログラム）' },
      body: {
        KO: '회사가 직접 운영하는 워케이션 프로그램은 별도로 명시되며, 모집 정원·일정·환불 규정은 각 프로그램 안내 및 신청 시 고지된 내용에 따릅니다.',
        EN: 'Programs operated directly by the Company are separately indicated; capacity, schedule, and refund rules follow the terms disclosed for each program at application.',
        JP: '当社が直接運営するワーケーションプログラムは別途明示され、募集定員・日程・返金規定は各プログラム案内および申込時に告知された内容に従います。',
      },
    },
    {
      heading: { KO: '제4조 (AI 안내의 한계)', EN: 'Article 4 (Limitations of AI guidance)', JP: '第4条（AI案内の限界）' },
      body: {
        KO: '비자·체류 안내 등 AI 기반 정보는 참고용이며, 최신성·정확성을 보장하지 않습니다. 비자 등 중요한 사항은 반드시 해당국 대사관·공식 사이트에서 최종 확인하시기 바랍니다. AI 안내에 의존하여 발생한 손해에 대해 회사는 책임지지 않습니다.',
        EN: 'AI-based information (visa/stay guidance, etc.) is for reference only and does not guarantee currency or accuracy. Always confirm important matters such as visas with the relevant embassy/official sources. The Company is not liable for damages arising from reliance on AI guidance.',
        JP: 'ビザ・滞在案内等のAIベース情報は参考用であり、最新性・正確性を保証しません。ビザ等の重要事項は必ず該当国大使館・公式サイトで最終確認してください。AI案内に依拠して生じた損害について当社は責任を負いません。',
      },
    },
    {
      heading: { KO: '제5조 (이용자의 의무)', EN: "Article 5 (User's obligations)", JP: '第5条（利用者の義務）' },
      body: {
        KO: '이용자는 신청·문의·여행자 노트 작성 시 정확한 정보를 제공해야 하며, 타인의 정보를 도용하거나 서비스 운영을 방해해서는 안 됩니다. 여행자 노트의 글과 사진은 직접 작성·촬영했거나 게재 권한이 있는 콘텐츠여야 하며, 광고·허위 후기·개인정보·차별적 표현을 포함해서는 안 됩니다.',
        EN: 'Users must provide accurate information and must not misuse others’ data or disrupt the service. Text and photos submitted to Traveler Notes must be original or authorized for publication and must not contain advertising, fabricated reviews, personal data, or discriminatory content.',
        JP: '利用者は申込・問い合わせ・トラベラーノート投稿時に正確な情報を提供し、他人の情報を盗用したりサービス運営を妨害してはなりません。投稿する文章・写真は自作・自撮影または掲載権限のあるものに限り、広告、虚偽の口コミ、個人情報、差別的表現を含めてはなりません。',
      },
    },
    {
      heading: { KO: '제6조 (책임의 제한)', EN: 'Article 6 (Limitation of liability)', JP: '第6条（責任の制限）' },
      body: {
        KO: '회사는 천재지변, 파트너사·외부 서비스의 장애 등 회사의 통제를 벗어난 사유로 인한 서비스 중단이나 손해에 대해 책임을 지지 않습니다. 무료로 제공되는 정보·기능에 대해서는 관련 법령이 허용하는 최대 범위에서 책임이 제한됩니다.',
        EN: 'The Company is not liable for service interruptions or damages caused by force majeure or failures of partners/external services beyond its control. For information/features provided free of charge, liability is limited to the maximum extent permitted by law.',
        JP: '当社は天災地変、パートナー・外部サービスの障害等、当社の統制を超える事由によるサービス中断や損害について責任を負いません。無料で提供される情報・機能については、関連法令が許容する最大範囲で責任が制限されます。',
      },
    },
    {
      heading: { KO: '제7조 (약관의 변경)', EN: 'Article 7 (Changes to terms)', JP: '第7条（規約の変更）' },
      body: {
        KO: '회사는 필요 시 본 약관을 변경할 수 있으며, 변경 시 서비스 내 공지합니다. 변경된 약관은 공지된 시행일부터 효력이 발생합니다.',
        EN: 'The Company may amend these terms as needed and will announce changes within the service. Amended terms take effect from the announced effective date.',
        JP: '当社は必要に応じ本規約を変更でき、変更時はサービス内で告知します。変更後の規約は告知された施行日から効力を生じます。',
      },
    },
    {
      heading: { KO: '제8조 (사업자 정보 및 문의)', EN: 'Article 8 (Business info & contact)', JP: '第8条（事業者情報・問い合わせ）' },
      body: {
        KO: `· 상호: ${BUSINESS.companyKo}\n· 대표자: ${BUSINESS.ceo}\n· 사업자등록번호: ${BUSINESS.bizNo}\n· 주소: ${BUSINESS.addressKo}\n· 이메일: ${BUSINESS.email}`,
        EN: `· Company: ${BUSINESS.companyEn}\n· CEO: ${BUSINESS.ceo}\n· Business reg. no.: ${BUSINESS.bizNo}\n· Address: ${BUSINESS.addressEn}\n· Email: ${BUSINESS.email}`,
        JP: `· 商号: ${BUSINESS.companyEn}\n· 代表者: ${BUSINESS.ceo}\n· 事業者登録番号: ${BUSINESS.bizNo}\n· 住所: ${BUSINESS.addressEn}\n· メール: ${BUSINESS.email}`,
      },
    },
  ],
}

// 폼 개인정보 수집·이용 동의 (간이 고지 — 폼 하단 체크박스용)
export const CONSENT: { label: L; detail: L } = {
  label: {
    KO: '개인정보 수집·이용에 동의합니다 (필수)',
    EN: 'I agree to the collection and use of my personal data (required)',
    JP: '個人情報の収集・利用に同意します（必須）',
  },
  detail: {
    KO: '수집 항목: 이름·연락처·이메일 및 입력 정보 / 목적: 문의·신청 처리 및 안내 / 보유: 목적 달성 후 1년 이내 파기. 자세한 내용은 개인정보처리방침을 확인하세요. 동의를 거부할 수 있으나, 이 경우 신청·문의가 제한됩니다.',
    EN: 'Items: name, contact, email and entered data / Purpose: handling inquiries·applications / Retention: destroyed within 1 year. See the Privacy Policy. You may decline, but this limits application/inquiry.',
    JP: '項目: 氏名・連絡先・メール及び入力情報 / 目的: 問い合わせ・申込処理および案内 / 保有: 目的達成後1年以内に破棄。詳細はプライバシーポリシーをご確認ください。同意を拒否できますが、その場合申込・問い合わせが制限されます。',
  },
}
