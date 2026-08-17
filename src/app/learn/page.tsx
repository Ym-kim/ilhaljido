'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { ArtDirectedEditorialHero } from '@/components/media/ArtDirectedEditorialHero'
import { useLang } from '@/context/LanguageContext'
import { CourseCard } from '@/components/affiliate/CourseCard'
import { FEATURED_COURSES } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { localizeHref } from '@/lib/i18n/localePath'
import { getMediaAsset } from '@/lib/media/assets'
import { trackEvent } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  eyebrow: { KO: '일과 성장', EN: 'Work & growth', JP: '仕事と成長' },
  title: { KO: '이동해도,\n일의 감각은 이어지도록', EN: 'Keep your work moving,\nwherever you stay', JP: '場所が変わっても、\n仕事の感覚をつなぐ' },
  sub: {
    KO: '준비되지 않은 워크숍 대신, 지금 확인할 수 있는 강의와 워케이션 중 바로 써볼 학습 흐름을 골랐습니다.',
    EN: 'Instead of unconfirmed workshops, explore currently available courses and practical learning paths for a workation.',
    JP: '未確定のワークショップではなく、今確認できる講座と、滞在中に試せる学び方を選びました。',
  },
  path_eyebrow: { KO: 'LEARNING PATHS', EN: 'LEARNING PATHS', JP: 'LEARNING PATHS' },
  path_title: { KO: '여행 중에도 부담 없는 세 가지 흐름', EN: 'Three lightweight ways to learn while away', JP: '旅先でも無理なく続ける3つの学び方' },
  courses_title: { KO: '현재 확인 가능한 실무 강의', EN: 'Practical courses available now', JP: '現在確認できる実務講座' },
  courses_sub: {
    KO: '업무 자동화·콘텐츠·1인 비즈니스에 바로 적용할 수 있는 활성 제휴 강의만 보여드립니다.',
    EN: 'Only active partner courses for automation, content and solo-business skills are shown.',
    JP: '業務自動化・コンテンツ・個人ビジネスに活かせる、提携中の講座のみ掲載します。',
  },
  all_courses: { KO: '모든 강의와 언어학습 보기', EN: 'See all courses and language learning', JP: 'すべての講座・語学学習を見る' },
  partner_eyebrow: { KO: 'PARTNERSHIP', EN: 'PARTNERSHIP', JP: 'PARTNERSHIP' },
  partner_title: { KO: '실제 운영 가능한 교육 프로그램을 제안해 주세요', EN: 'Propose a learning program you can operate', JP: '実際に運営できる学習プログラムをご提案ください' },
  partner_sub: {
    KO: '모집 일정과 운영 주체가 확인된 프로그램만 검토 후 소개합니다. 제안이 곧 게시나 모집을 의미하지는 않습니다.',
    EN: 'We review programs with a confirmed operator and schedule. A proposal does not guarantee publication or recruitment.',
    JP: '運営主体と日程が確認できる企画のみ審査します。提案は掲載・募集を保証するものではありません。',
  },
  inquire: { KO: '교육 파트너 문의', EN: 'Learning partner inquiry', JP: '教育パートナーのお問い合わせ' },
  // 2026-08-07 구조 결정 ① — /growth(성장 캠프 리드)와 /learn(제휴 강의 커머스)은 수익 구조가
  // 달라 분리 유지하되, 온라인 학습 ↔ 현장 캠프 맥락으로 상호 크로스링크 1개씩 연결
  camp_lead: {
    KO: '현장에서 함께 배우고 싶다면',
    EN: 'Prefer to learn together, on site?',
    JP: '現地で一緒に学びたいなら',
  },
  camp_cta: { KO: '성장 캠프 살펴보기', EN: 'See the growth camp', JP: '成長キャンプを見る' },
}

const PATHS: Array<{ label: L; title: L; desc: L }> = [
  {
    label: { KO: '30분', EN: '30 minutes', JP: '30分' },
    title: { KO: '이동 전, 반복 업무 하나 줄이기', EN: 'Remove one repetitive task before departure', JP: '出発前に反復作業を一つ減らす' },
    desc: { KO: 'AI 자동화 강의에서 필요한 챕터만 골라, 이번 여행의 업무 루틴에 적용합니다.', EN: 'Pick one relevant automation lesson and apply it to your travel work routine.', JP: 'AI自動化講座から必要な章を選び、旅先の仕事ルーティンに活かします。' },
  },
  {
    label: { KO: '한 저녁', EN: 'One evening', JP: '夜のひととき' },
    title: { KO: '오늘 본 장면을 콘텐츠로 정리하기', EN: 'Turn today’s scenes into useful content', JP: '今日の景色をコンテンツにまとめる' },
    desc: { KO: '사진과 메모를 정리한 뒤 마케팅·이미지 실무 강의로 표현 방식을 다듬습니다.', EN: 'Organize photos and notes, then refine the output with practical marketing or image lessons.', JP: '写真とメモを整理し、マーケティングや画像制作の実務講座で表現を磨きます。' },
  },
  {
    label: { KO: '여행 후', EN: 'After the trip', JP: '旅のあと' },
    title: { KO: '배운 것을 수익 구조로 연결하기', EN: 'Connect what you learned to your work', JP: '学びを仕事の仕組みにつなげる' },
    desc: { KO: '여행 중 만든 결과물을 1인 비즈니스의 채널·상품·업무 방식으로 이어갑니다.', EN: 'Carry what you made into your channel, offer or solo-business workflow.', JP: '旅先で作ったものを、個人ビジネスの発信・商品・仕事の進め方につなげます。' },
  },
]

const LEARN_HERO_DESKTOP = getMediaAsset('growth-model-b-urban-learning-desktop-v2')
const LEARN_HERO_MOBILE = getMediaAsset('growth-model-b-urban-learning-mobile-v2')

export default function LearnPage() {
  const { lang } = useLang()
  // 2026-08-18 slice(0,6) 제거 — 신규 강의(n8n·리액트·GA4)가 잘려 나가던 것 수정. 9강의 = 3×3 정렬
  const activeCourses = FEATURED_COURSES.filter((course) => course.status === 'active_affiliate')
    .map((course) => localizeAffiliateItem(course, lang))

  useEffect(() => {
    trackEvent('visual_asset_view', {
      assetId: LEARN_HERO_DESKTOP?.id ?? 'growth-model-b-urban-learning-desktop-v2',
      mobileAssetId: LEARN_HERO_MOBILE?.id ?? 'growth-model-b-urban-learning-mobile-v2',
      modelId: 'WAK-MODEL-B',
      route: '/learn',
      section: 'learn_hero',
      locale: lang,
      placement: 'hero',
    })
  }, [lang])

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative flex min-h-[34rem] items-end overflow-hidden">
        {LEARN_HERO_DESKTOP && LEARN_HERO_MOBILE && (
          <ArtDirectedEditorialHero
            desktopSrc={LEARN_HERO_DESKTOP.src}
            mobileSrc={LEARN_HERO_MOBILE.src}
            alt={LEARN_HERO_DESKTOP.alt[lang]}
            desktopWidth={1536}
            desktopHeight={1024}
            mobileWidth={960}
            mobileHeight={1280}
            className="absolute inset-0 h-full w-full object-cover object-[62%_57%] md:object-[72%_12%]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/15" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
          <SectionEyebrow onDark>{COPY.eyebrow[lang]}</SectionEyebrow>
          <h1 className="max-w-3xl whitespace-pre-line text-4xl font-black leading-[1.08] text-white md:text-6xl">
            {COPY.title[lang]}
          </h1>
          <span className="mt-5 block max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">{COPY.sub[lang]}</span>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <span className="text-eyebrow-on-dark mb-3 block">{COPY.path_eyebrow[lang]}</span>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl">{COPY.path_title[lang]}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PATHS.map((path) => (
              <article key={path.title.KO} className="flex h-full flex-col border-t border-white/25 py-6">
                <span className="text-xs font-bold text-sky-300">{path.label[lang]}</span>
                <h3 className="mt-3 text-xl font-bold leading-snug text-white">{path.title[lang]}</h3>
                <span className="mt-3 block text-sm leading-relaxed text-white/55">{path.desc[lang]}</span>
              </article>
            ))}
          </div>

          <Link
            href={localizeHref('/growth', lang)}
            className="group mt-10 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/20 px-6 py-3 transition-colors hover:border-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <span className="text-sm text-white/55">{COPY.camp_lead[lang]}</span>
            <span className="text-sm font-bold text-white">{COPY.camp_cta[lang]}</span>
            <ArrowRight className="h-4 w-4 text-white/40 transition-colors group-hover:text-sky-300" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 2026-08-18 클래스101풍 강의 그리드로 교체(운영자 지시) — select/learn과 동일 카드 */}
      <section className="border-t border-white/10 bg-[#111] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <span className="text-eyebrow-on-dark mb-3 block">WAKATION SELECT</span>
          <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">{COPY.courses_title[lang]}</h2>
          <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-white/55">{COPY.courses_sub[lang]}</span>
          <div className="mt-8 grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {activeCourses.map((item) => (
              <CourseCard key={item.id} item={item} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0d0d0d] px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-eyebrow-on-dark mb-3 block">{COPY.partner_eyebrow[lang]}</span>
            <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">{COPY.partner_title[lang]}</h2>
            <span className="mt-3 block text-sm leading-relaxed text-white/55">{COPY.partner_sub[lang]}</span>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row">
            <Link href="/select/learn" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#111] hover:bg-sky-100">
              {COPY.all_courses[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="mailto:wakation.sf@gmail.com?subject=Learning%20partnership" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white hover:border-sky-300">
              <Mail className="h-4 w-4" aria-hidden="true" /> {COPY.inquire[lang]}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
