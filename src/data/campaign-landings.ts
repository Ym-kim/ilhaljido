import type { Lang } from '@/lib/i18n/types'
import type { TripSetSlug } from '@/lib/tripSetCampaign'

export type CampaignChoice = {
  slug: TripSetSlug
  name: string
  eyebrow: string
  summary: string
  image: string
  alt: string
  imagePosition: string
  accent: 'coral' | 'ocean'
  duration: string
  mood: string
  company: string
  work: string
  experience: string
  transport: string
  cta: string
}

export type CampaignLandingConfig = {
  id: 'japan-short-stay' | 'korea-weekend'
  lang: Lang
  locale: 'ko' | 'ja'
  canonicalPath: string
  eyebrow: string
  title: string
  lead: string
  heroImage: string
  heroAlt: string
  heroPosition: string
  heroSecondaryImage?: string
  heroSecondaryAlt?: string
  heroSecondaryPosition?: string
  choicePrompt: string
  matchCta: string
  compareTitle: string
  compareLabels: string[]
  choices: [CampaignChoice, CampaignChoice]
  prepareEyebrow: string
  prepareTitle: string
  prepareLead: string
  prepareLinks: { label: string; detail: string; href: string }[]
  stayEyebrow?: string
  stayTitle?: string
  stayLead?: string
  stayLinks?: { city: string; label: string; title: string; detail: string; note: string; href: string }[]
  practicalTitle?: string
  practicalLead?: string
  practicalItems?: { label: string; title: string; detail: string }[]
  shareTitle: string
  shareLead: string
  shareCta: string
  disclosureTitle: string
  disclosure: string[]
  closeNote: string
  closeHref: string
  closeCta: string
}

export const CAMPAIGN_LANDINGS: Record<CampaignLandingConfig['id'], CampaignLandingConfig> = {
  'japan-short-stay': {
    id: 'japan-short-stay',
    lang: 'KO',
    locale: 'ko',
    canonicalPath: '/campaign/japan-short-stay',
    eyebrow: 'JAPAN · 3 NIGHTS, 4 DAYS',
    title: '가까운 일본, 지금 내게 맞는 쪽은?',
    lead: '카페와 온천의 후쿠오카, 친구와 장면을 모으는 오사카. 여행의 속도부터 고르면 준비는 짧아집니다.',
    heroImage: '/campaign/trip-sets/fukuoka-3n4d-editorial-v1.webp',
    heroAlt: '창가에서 차를 마시며 쉬는 여행자의 에디토리얼 이미지',
    heroPosition: '48% 48%',
    choicePrompt: '이번 여행은 어떤 쪽인가요?',
    matchCta: '아직 고민된다면, 내 여행 추천받기',
    compareTitle: '20초 비교',
    compareLabels: ['분위기', '기간', '동행', '업무 병행', '대표 경험', '추천 이동'],
    choices: [
      {
        slug: 'fukuoka-3n4d',
        name: '후쿠오카',
        eyebrow: 'SLOW & WARM',
        summary: '일을 조금 이어가면서도 온전히 쉬고 싶은 짧은 체류',
        image: '/campaign/trip-sets/fukuoka-3n4d-editorial-v1.webp',
        alt: '차분한 창가에서 머무는 후쿠오카 감성의 에디토리얼 이미지',
        imagePosition: '48% 48%',
        accent: 'coral',
        duration: '3박 4일',
        mood: '차분한 카페 · 온천',
        company: '혼자 또는 느긋한 둘',
        work: '오전 1~2시간에 잘 맞음',
        experience: '하카타 산책 · 근교 온천',
        transport: '공항철도 + 도보 중심',
        cta: '후쿠오카 구성 보기',
      },
      {
        slug: 'osaka-friends',
        name: '오사카',
        eyebrow: 'BRIGHT & LIVELY',
        summary: '맛있는 것과 새로운 장면을 친구와 함께 채우는 여행',
        image: '/campaign/trip-sets/osaka-friends-editorial-v1.webp',
        alt: '저녁 골목을 걷는 친구들의 오사카 감성 에디토리얼 이미지',
        imagePosition: '58% 49%',
        accent: 'ocean',
        duration: '3박 4일',
        mood: '활기찬 거리 · 미식',
        company: '친구와 둘 또는 소규모',
        work: '짧은 정리 업무 정도',
        experience: '시장 · 테마파크 · 야경',
        transport: '전철 + 교통 패스',
        cta: '오사카 구성 보기',
      },
    ],
    prepareEyebrow: 'PREP, PIECE BY PIECE',
    prepareTitle: '선택했다면, 필요한 것만 준비하세요',
    prepareLead: '숙소·항공·eSIM은 하나의 패키지가 아닙니다. 내 일정에 필요한 항목을 각각 비교하고 예약할 수 있습니다.',
    prepareLinks: [
      { label: '일본 숙소 보기', detail: '업무 공간과 이동 동선을 함께 확인', href: '/select/hotel' },
      { label: 'eSIM 준비', detail: '출국 전에 설치하고 도착 후 연결', href: '/select/esim' },
      { label: '항공·이동 보기', detail: '출발 시간과 현지 이동을 한 번 더 확인', href: '/select' },
    ],
    shareTitle: '아직 못 골랐다면, 같이 갈 사람에게',
    shareLead: '두 도시를 한 화면에서 비교할 수 있도록 이 페이지를 공유하세요.',
    shareCta: '친구에게 공유하기',
    disclosureTitle: '예약 전 확인',
    disclosure: [
      '일부 외부 링크를 통해 Wakation에 수익이 발생할 수 있습니다.',
      '각 상품은 제휴사에서 개별 확인·예약하며, 결제·취소·환불은 각 제휴사 약관을 따릅니다.',
      '표시된 이미지와 여행 흐름은 목적지 선택을 돕는 에디토리얼 예시이며 특정 숙소나 패키지 상품을 의미하지 않습니다.',
    ],
    closeNote: '다음 일본 워케이션 소식을 천천히 받아보고 싶다면',
    closeHref: '/programs',
    closeCta: 'Wakation Hosted 소식 보기',
  },
  'korea-weekend': {
    id: 'korea-weekend',
    lang: 'JP',
    locale: 'ja',
    canonicalPath: '/ja/campaign/korea-weekend',
    eyebrow: 'KOREA · A SHORT ESCAPE',
    title: 'ソウルと釜山、今の気分はどちら？',
    lead: '街の日常に近づくソウル。海のそばで余白を取り戻す釜山。まずは、今回ほしい時間から選んでみてください。',
    heroImage: '/media/destinations/seoul-editorial-v1.webp',
    heroAlt: '灯りとハングルの看板が連なるソウルの夕暮れの路地',
    heroPosition: '50% 54%',
    heroSecondaryImage: '/media/destinations/busan-editorial-v1.webp',
    heroSecondaryAlt: '海雲台ビーチとマリンシティを望む釜山の風景',
    heroSecondaryPosition: '47% 50%',
    choicePrompt: '今回の韓国旅、どちらから見る？',
    matchCta: '迷ったら、3つ選んで旅を見つける',
    compareTitle: '20秒で比べる',
    compareLabels: ['空気感', '日数', '誰と', '仕事時間', '過ごし方', '移動の軸'],
    choices: [
      {
        slug: 'seoul-3n4d',
        name: 'ソウル',
        eyebrow: 'EVERYDAY CITY',
        summary: 'カフェと街歩きで、観光より少しだけ日常に近づく旅',
        image: '/campaign/trip-sets/seoul-3n4d-editorial-v1.webp',
        alt: '窓辺でソウルの街を眺める旅人のエディトリアルイメージ',
        imagePosition: '60% 52%',
        accent: 'coral',
        duration: '3泊4日',
        mood: 'カフェ · 街の刺激',
        company: 'ひとりでも友達とでも',
        work: '午前の短い作業に合う',
        experience: '聖水 · 延南 · ナイトカルチャー',
        transport: '地下鉄 + 街歩き',
        cta: 'ソウルの旅を見る',
      },
      {
        slug: 'busan-weekend',
        name: '釜山',
        eyebrow: 'SEA & BREATH',
        summary: '海を眺めて、食べて、歩く。短い休みに余白をつくる旅',
        image: '/campaign/trip-sets/busan-weekend-editorial-v1.webp',
        alt: '海辺を歩く釜山の週末を表現したエディトリアルイメージ',
        imagePosition: '56% 50%',
        accent: 'ocean',
        duration: '2泊3日',
        mood: '海 · ローカルフード',
        company: '友達との週末に',
        work: '仕事を置いて休む日に',
        experience: '海辺 · 市場 · 夜景',
        transport: 'KTXまたは飛行機 + 地下鉄',
        cta: '釜山の旅を見る',
      },
    ],
    prepareEyebrow: 'BEFORE YOU GO',
    prepareTitle: '行き先が決まったら、必要な準備だけ',
    prepareLead: '宿・体験・eSIM・空港移動は、それぞれの提携先で確認・予約します。セット販売ではありません。',
    prepareLinks: [
      { label: '韓国の宿を見る', detail: '滞在エリアとワーク環境を確認', href: '/ja/select/hotel' },
      { label: '現地体験を見る', detail: '街歩きから週末のアクティビティまで', href: '/ja/select/activity' },
      { label: 'eSIMと移動を準備', detail: '到着後すぐ動けるように', href: '/ja/select/esim' },
    ],
    stayEyebrow: 'STAY A LITTLE CLOSER',
    stayTitle: '観光だけで終わらせない、韓国での過ごし方',
    stayLead: '日本との時差はありません。朝に短く仕事をして、午後は街へ。週末旅行にも、少し長い滞在にもつながる入口をまとめました。',
    stayLinks: [
      {
        city: 'SEOUL',
        label: 'ソウル滞在ガイド',
        title: '街のリズムに近づく',
        detail: '聖水・延南を歩き、カフェやコワーキングを使いながら、観光と日常の間で過ごす。',
        note: '3泊4日から、仕事を挟む滞在へ',
        href: '/ja/guide/seoul',
      },
      {
        city: 'BUSAN',
        label: '釜山滞在ガイド',
        title: '海のそばで余白をつくる',
        detail: '海雲台の朝、田浦のカフェ、必要なら釜山駅のワーケーション拠点へ。',
        note: '2泊3日の週末から、海辺のワークステイへ',
        href: '/ja/guide/busan',
      },
    ],
    practicalTitle: '出発前に、これだけ確認',
    practicalLead: 'Wakationは旅行商品を一括販売しません。自分の予定に合わせ、必要な項目だけを各提携先で確認します。',
    practicalItems: [
      { label: 'TIME', title: '日本との時差なし', detail: '普段の連絡時間を変えず、朝の短い仕事時間も組みやすい環境です。' },
      { label: 'STAY', title: '宿はエリアから選ぶ', detail: 'ソウルは街歩きの動線、釜山は海と駅へのアクセスを先に確認します。' },
      { label: 'BOOKING', title: '予約・変更は各提携先で', detail: '宿、体験、eSIMは個別商品です。料金と条件は移動先のページで確定します。' },
    ],
    shareTitle: '迷ったら、一緒に行く人へ',
    shareLead: 'ソウルと釜山を同じ画面で比べられるよう、このページをLINEやOSの共有機能で送れます。',
    shareCta: '友達にシェア',
    disclosureTitle: '予約前にご確認ください',
    disclosure: [
      '一部の外部リンクを通じてWakationに収益が発生する場合があります。',
      '商品は各提携先で個別に確認・予約し、決済・キャンセル・返金は各社の規約に従います。',
      '画像と旅の流れは選択を助けるエディトリアル表現で、特定の宿やパッケージ商品を示すものではありません。',
    ],
    closeNote: '次の韓国滞在プログラムの情報も見てみたい方へ',
    closeHref: '/ja/programs',
    closeCta: 'Wakation Hostedのお知らせ',
  },
}
