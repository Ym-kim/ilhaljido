import type { Lang } from '@/lib/i18n/types'

export const SECURITY_GUIDE_PATH = '/select/esim/work-safely'
export const SECURITY_GUIDE_REVIEWED = '2026-09-04'
export const SECURITY_GUIDE_LANGUAGES = {
  ko: `https://www.wakation.kr${SECURITY_GUIDE_PATH}`,
  en: `https://www.wakation.kr/en${SECURITY_GUIDE_PATH}`,
  ja: `https://www.wakation.kr/ja${SECURITY_GUIDE_PATH}`,
  'x-default': `https://www.wakation.kr${SECURITY_GUIDE_PATH}`,
}

type GuideCopy = {
  title: string; description: string; category: string; cardTitle: string; cardSub: string
  cta: string; intro: string; policy: string; checklist: string
  steps: readonly { title: string; body: string }[]
  dataTitle: string; dataBody: string; dataCta: string; workCta: string
  sources: string; reviewed: string; businessTitle: string; businessBody: string
  businessItems: readonly string[]; disclaimer: string
}

export const SECURITY_GUIDE_COPY: Record<Lang, GuideCopy> = {
  KO: {
    title: '해외에서 일할 때, 인터넷·보안 체크리스트',
    description: 'eSIM부터 공용 Wi-Fi, 업무 계정과 기기 잠금까지. 출발 전에 확인할 일곱 가지와 회사 정책에 맞춘 원격업무 준비.',
    category: '연결 · 보안 준비', cardTitle: '공용 Wi-Fi와 업무 계정, 출발 전에 확인하세요',
    cardSub: '연결은 가볍게, 업무 준비는 꼼꼼하게. 해외에서 일할 때 챙길 일곱 가지.', cta: '인터넷·보안 체크리스트',
    intro: '카페에서 메일을 보내고, 숙소에서 팀과 만나는 하루. 데이터 요금제와 함께 계정·기기 설정을 살펴두면 현지에서 확인할 일이 줄어듭니다.',
    policy: '회사 IT·보안 정책이 이 안내보다 우선합니다. 공용 Wi-Fi가 모두 위험한 것은 아니며, HTTPS도 사이트 자체의 신뢰성을 보장하지는 않습니다.',
    checklist: '출발 전부터 현지 접속까지',
    steps: [
      { title: '네트워크 이름부터 확인하기', body: '호텔·카페·공항 직원에게 Wi-Fi 이름(SSID)을 확인하세요. 공용 네트워크 자동 연결은 끄고, 사용 후에는 저장된 연결을 삭제해 두세요.' },
      { title: '업무 계정에 추가 인증 켜기', body: '메일·클라우드·업무 계정의 MFA(다단계 인증)를 확인하세요. 해외에서도 승인된 인증 수단을 쓸 수 있는지 출발 전에 점검하세요.' },
      { title: '업데이트는 출발 전에', body: '운영체제·브라우저·주요 앱을 최신 상태로 준비하세요. 업데이트는 신뢰할 수 있는 연결에서 진행하고 회사의 관리 지침을 따르세요.' },
      { title: '잠금과 분실 대비 함께 챙기기', body: '자리에서 일어나면 화면을 잠그세요. 기기 찾기와 백업 설정을 확인하고, 업무 기기 분실 시 연락할 담당자도 메모해 두세요.' },
      { title: '공용 PC에는 업무 계정으로 로그인하지 않기', body: '호텔 로비 등의 공용 PC 대신 회사가 허용한 기기를 사용하세요. 필요한 파일과 앱은 승인된 원격접속 방식으로 이용하세요.' },
      { title: '민감한 업무는 승인된 연결로', body: 'HTTPS 등 암호화된 연결을 확인하고 경고를 무시하지 마세요. 기업 VPN이나 보안 접속 도구가 필요하면 회사가 승인한 수단을 사용하세요. VPN만으로 모든 위험이 해결되지는 않습니다.' },
      { title: '마지막 기준은 회사 정책', body: '방문 국가, 외부 네트워크, 개인 기기 사용에 관한 회사 규정을 먼저 확인하세요. 접속이 막히면 임의로 우회하지 말고 IT 담당자에게 문의하세요.' },
    ],
    dataTitle: '데이터 준비와 업무 준비를 함께', dataBody: '출국 전에 eSIM이나 회사가 허용한 예비 데이터 연결을 준비하세요. eSIM은 현지 데이터 연결 수단입니다. 기기 호환·테더링·사용량 조건과 계정 보안은 각각 확인하세요.',
    dataCta: 'eSIM 준비하기', workCta: '업무 환경 체크하기', sources: '참고 자료', reviewed: '자료 확인',
    businessTitle: '외부에서도 업무가 이어지도록', businessBody: '팀 워케이션은 장소만큼 업무 연결 준비도 중요합니다. 출발 전, 팀의 IT 담당자와 함께 확인해 보세요.',
    businessItems: ['업무공간 Wi-Fi', '회사 계정 MFA', '승인된 원격접속 방식', '기기 보안정책', '외부 네트워크 사용 가이드'],
    disclaimer: '일반적인 준비 안내입니다. Wakation이 기업 네트워크 보안 구축이나 전문 보안 진단을 제공한다는 의미는 아닙니다.',
  },
  EN: {
    title: 'Working abroad: your connectivity & security checklist',
    description: 'Seven checks for working away: mobile data, public Wi-Fi, work accounts, device settings and your organization’s remote-access policy.',
    category: 'Connect & Work Safely', cardTitle: 'Check your Wi-Fi and work accounts before you go',
    cardSub: 'A little preparation for a smoother working day abroad. Start with these seven checks.', cta: 'Read the connectivity checklist',
    intro: 'Email at a café, a team call from your stay. Review your accounts and devices alongside your data plan, so there is less to work out on arrival.',
    policy: 'Your organization’s IT and security policies take priority. Public Wi-Fi is not inherently unsafe; HTTPS does not prove that a website itself is trustworthy.',
    checklist: 'Before departure and when you connect',
    steps: [
      { title: 'Confirm the network name', body: 'Ask hotel, café or airport staff for the Wi-Fi name (SSID). Turn off automatic joining for public networks and forget the connection after use.' },
      { title: 'Enable extra account protection', body: 'Check MFA (multifactor authentication) on email, cloud and work accounts. Confirm that your approved sign-in method will work abroad before departure.' },
      { title: 'Update before you leave', body: 'Bring your operating system, browser and essential apps up to date on a trusted connection. Follow your organization’s device-management rules.' },
      { title: 'Prepare for a misplaced device', body: 'Lock the screen when you step away. Check device-finding and backup settings, and keep your work-device incident contact handy.' },
      { title: 'Keep work accounts off shared computers', body: 'Use an approved device rather than a hotel lobby PC. Access work files and applications only through your organization’s permitted methods.' },
      { title: 'Use approved connections for sensitive work', body: 'Check for encryption such as HTTPS and do not dismiss warnings. If required, use your organization’s approved VPN or secure-access tool. A VPN does not address every risk.' },
      { title: 'Let company policy lead', body: 'Check rules for your destination, external networks and personal devices. If access is blocked, ask your IT team rather than bypassing restrictions.' },
    ],
    dataTitle: 'Plan your connection and your workday', dataBody: 'Before departure, prepare an eSIM or an approved backup data connection. An eSIM supplies mobile data. Check compatibility, tethering and usage limits separately from account-security settings.',
    dataCta: 'Prepare your eSIM', workCta: 'Check your work setup', sources: 'Further reading', reviewed: 'Sources checked',
    businessTitle: 'Keep work moving, wherever the team goes', businessBody: 'A team workation needs a connection plan as well as a place. Review these points with your IT contact before departure.',
    businessItems: ['Workspace Wi-Fi', 'MFA for work accounts', 'Approved remote access', 'Device security policy', 'External-network guidelines'],
    disclaimer: 'General preparation guidance, not enterprise network-security implementation or a professional security assessment by Wakation.',
  },
  JP: {
    title: '海外で働く前に。通信・セキュリティのチェックリスト',
    description: 'eSIM、公衆Wi-Fi、仕事用アカウント、端末の設定まで。出発前の7つの確認と、勤務先のルールに沿ったリモートワーク準備。',
    category: '通信・仕事の安心準備', cardTitle: 'Wi-Fiと仕事用アカウント、出発前に確認を',
    cardSub: '旅先での仕事をスムーズに。通信と端末の準備、7つのポイント。', cta: '通信・セキュリティのチェックリスト',
    intro: 'カフェでメールを送り、滞在先からチームと話す一日。データプランと一緒にアカウントや端末の設定も確認しておきましょう。',
    policy: '勤務先のIT・セキュリティ方針を優先してください。公衆Wi-Fiがすべて危険なわけではなく、HTTPSもサイト自体の信頼性を保証しません。',
    checklist: '出発前から現地での接続まで',
    steps: [
      { title: 'ネットワーク名を確認する', body: 'ホテル・カフェ・空港のスタッフにWi-Fi名（SSID）を確認しましょう。公衆ネットワークへの自動接続はオフにし、利用後は接続情報を削除します。' },
      { title: 'アカウントの追加認証を有効に', body: 'メール・クラウド・仕事用アカウントのMFA（多要素認証）を確認。承認済みの認証方法が海外でも使えるか、出発前に確かめましょう。' },
      { title: 'アップデートは出発前に', body: 'OS・ブラウザー・主要アプリを、信頼できる接続で最新にしましょう。勤務先の端末管理ルールに従ってください。' },
      { title: '画面ロックと紛失対策', body: '席を離れるときは画面をロック。端末を探す機能やバックアップを確認し、業務端末を紛失した際の連絡先も控えておきます。' },
      { title: '共有PCで仕事用アカウントを使わない', body: 'ホテルのロビーなどの共有PCではなく、勤務先が認めた端末を使いましょう。ファイルやアプリへの接続も承認済みの方法で。' },
      { title: '機密業務は承認された接続で', body: 'HTTPSなどの暗号化された接続を確認し、警告を無視しないでください。必要に応じて勤務先が承認したVPN等を使います。VPNだけですべてのリスクは解決できません。' },
      { title: '勤務先のルールを最優先に', body: '渡航先・外部ネットワーク・個人端末の利用規定を確認。接続できない場合は独自に回避せず、IT担当者へ相談しましょう。' },
    ],
    dataTitle: '通信と仕事環境を一緒に準備', dataBody: '出発前にeSIMや、勤務先が認めた予備の通信手段を準備しましょう。eSIMは現地でのデータ通信手段です。端末の対応状況・テザリング・利用上限と、アカウントの保護設定は別々に確認しましょう。',
    dataCta: 'eSIMを準備する', workCta: '仕事環境を確認する', sources: '参考資料', reviewed: '資料確認日',
    businessTitle: '外出先でも仕事を続けられるように', businessBody: 'チームのワーケーションは、場所だけでなく接続の準備も大切です。出発前にIT担当者と確認しましょう。',
    businessItems: ['仕事場のWi-Fi', '仕事用アカウントのMFA', '承認済みのリモート接続', '端末のセキュリティ方針', '外部ネットワーク利用ルール'],
    disclaimer: '一般的な準備情報です。Wakationによる企業ネットワークのセキュリティ構築や専門的な診断を意味するものではありません。',
  },
}

export const SECURITY_GUIDE_SOURCES = [
  { title: 'FTC · Public Wi-Fi', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know' },
  { title: 'FTC · Cybersecurity for Small Business', url: 'https://www.ftc.gov/business-guidance/small-businesses/cybersecurity' },
  { title: 'CISA · Secure Our World', url: 'https://www.cisa.gov/secure-our-world' },
]
