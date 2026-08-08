'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, PenLine } from 'lucide-react'
import { TRAVELER_NOTES, type TravelerNote } from '@/lib/moments'
import { useLang } from '@/context/LanguageContext'
import { localizeHref } from '@/lib/i18n/localePath'
import { trackEvent } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'

type FeedFilter = 'all' | 'editorial' | 'member'
type L = Record<Lang, string>

const UI: Record<string, L> = {
  contentFiltersAria: { KO: '여행자 노트 유형 필터', EN: 'Traveler note type filters', JP: '旅のノート種別フィルター' },
  destinationFiltersAria: { KO: '여행지 필터', EN: 'Destination filters', JP: '行き先フィルター' },
  eyebrow: { KO: 'Traveler Notes', EN: 'Traveler Notes', JP: 'Traveler Notes' },
  title: { KO: '머물러 본 도시를\n서로의 언어로', EN: 'Cities, shared by\nthe people who stayed', JP: '滞在した街を\nそれぞれの言葉で' },
  desc: {
    KO: 'Wakation 에디터의 여행지 소개로 시작해, 가입자의 솔직한 체류 리뷰가 함께 쌓이는 공간입니다.',
    EN: 'A shared space that starts with destination introductions from Wakation editors and grows with honest notes from members.',
    JP: 'Wakation編集部の行き先紹介から始まり、会員の率直な滞在レビューが積み重なる場所です。',
  },
  write: { KO: '내 여행 노트 쓰기', EN: 'Write my travel note', JP: '旅のノートを書く' },
  reviewPolicy: { KO: '모든 회원 글은 공개 전 확인합니다', EN: 'Every member note is reviewed before publication', JP: '会員投稿は公開前に内容を確認します' },
  noFake: { KO: '가짜 후기·평점 없이 경험과 팁만', EN: 'Real context and tips, without fabricated ratings', JP: '作られた評価ではなく、体験とヒントを' },
  all: { KO: '전체', EN: 'All', JP: 'すべて' },
  editorial: { KO: '에디터 소개', EN: 'Editor introductions', JP: '編集部の紹介' },
  member: { KO: '회원 여행 후기', EN: 'Member reviews', JP: '会員の旅行レビュー' },
  allDestinations: { KO: '모든 여행지', EN: 'All destinations', JP: 'すべての行き先' },
  read: { KO: '노트 읽기', EN: 'Read note', JP: 'ノートを読む' },
  results: { KO: '개의 노트', EN: 'notes', JP: '件のノート' },
  emptyTitle: { KO: '첫 번째 회원 여행 노트를 기다리고 있어요', EN: 'We are waiting for the first member travel note', JP: '最初の会員トラベルノートをお待ちしています' },
  emptyDesc: { KO: '실제로 머물렀던 도시의 업무 환경, 동선, 예상 밖의 팁을 알려주세요. 검수 후 작성자 표시와 함께 공개합니다.', EN: 'Share the workspace, daily route and unexpected tips from a city where you actually stayed. We publish it with credit after review.', JP: '実際に滞在した街の仕事環境、日々の動線、意外なヒントを教えてください。確認後、投稿者名とともに公開します。' },
  inviteTitle: { KO: '다녀온 여행이 누군가의 다음 선택이 되도록', EN: 'Let your past trip shape someone’s next one', JP: 'あなたの旅を、誰かの次の選択へ' },
  community: { KO: '여행자 커뮤니티', EN: 'Traveler community', JP: '旅人コミュニティ' },
  inviteDesc: { KO: '잘한 선택뿐 아니라 불편했던 점도 좋아요. 사진이 없어도 작성할 수 있고, 닉네임으로 공개할 수 있습니다.', EN: 'Good choices and inconvenient moments are both useful. A photo is optional, and you can publish under a nickname.', JP: '良かったことだけでなく、不便だった点も歓迎します。写真なしでも、ニックネームでも投稿できます。' },
  editorialBasis: { KO: '공개 정보·가이드 기반', EN: 'Based on public information and guides', JP: '公開情報・ガイドをもとに作成' },
}

function NoteCard({ note, lang, featured = false }: { note: TravelerNote; lang: Lang; featured?: boolean }) {
  const href = localizeHref(`/moments/${note.slug}`, lang)
  return (
    <Link
      href={href}
      data-ui-card="story"
      onClick={() => trackEvent('traveler_note_open', { slug: note.slug, destination: note.destinationSlug, source_type: note.sourceType, locale: lang })}
      className={`group flex h-full flex-col overflow-hidden border border-[#ded9cf] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#9d9688] hover:shadow-[0_20px_50px_rgba(39,43,36,0.10)] ${featured ? 'md:grid md:grid-cols-[1.16fr_0.84fr]' : ''}`}
    >
      <div className={`relative overflow-hidden bg-[#dfe8e5] ${featured ? 'aspect-[4/3] md:aspect-auto md:min-h-[31rem]' : 'aspect-[4/3]'}`}>
        <Image
          src={note.photo}
          alt={note.photoAlt[lang]}
          fill
          priority={featured}
          sizes={featured ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className="rounded-full bg-[#142f32]/88 px-3 py-1.5 text-[0.68rem] font-bold text-white backdrop-blur-sm">{note.dest[lang]}</span>
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[0.68rem] font-bold text-[#2f4f50] backdrop-blur-sm">{note.authorLabel[lang]}</span>
        </div>
      </div>
      <div className={`flex flex-1 flex-col ${featured ? 'justify-end p-7 md:p-10' : 'p-5 md:p-6'}`}>
        <p className="text-[0.68rem] font-bold tracking-[0.12em] text-[#65756f] uppercase">{note.country[lang]} · {note.stayStyle[lang]}</p>
        <h2 className={`${featured ? 'mt-4 text-3xl md:text-4xl' : 'mt-3 text-xl'} font-bold leading-[1.18] tracking-[-0.025em] text-[#17211f]`}>{note.title[lang]}</h2>
        <p className={`${featured ? 'mt-5 text-base' : 'mt-3 text-sm line-clamp-3'} leading-relaxed text-[#626760]`}>{note.summary[lang]}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {note.tags.slice(0, featured ? 3 : 2).map((tag) => (
            <span key={tag.KO} className="rounded-full border border-[#d8d3ca] px-2.5 py-1 text-[0.68rem] font-semibold text-[#626760]">{tag[lang]}</span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#ece8e0] pt-5">
          <div>
            <p className="text-xs font-bold text-[#273b39]">{note.author[lang]}</p>
            <p className="mt-1 text-[0.66rem] text-[#85877f]">{note.sourceType === 'editorial' ? UI.editorialBasis[lang] : note.publishedAt}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#186d70]">
            {UI.read[lang]} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function MomentsView({ forceLang }: { forceLang?: Lang } = {}) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const [feedFilter, setFeedFilter] = useState<FeedFilter>('all')
  const [destination, setDestination] = useState('all')

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const destinations = useMemo(() => {
    const seen = new Set<string>()
    return TRAVELER_NOTES.filter((note) => {
      if (seen.has(note.destinationSlug)) return false
      seen.add(note.destinationSlug)
      return true
    }).map((note) => ({ slug: note.destinationSlug, label: note.dest[lang] }))
  }, [lang])

  const filtered = useMemo(() => TRAVELER_NOTES.filter((note) => {
    if (feedFilter !== 'all' && note.sourceType !== feedFilter) return false
    return destination === 'all' || note.destinationSlug === destination
  }), [feedFilter, destination])

  const featured = feedFilter === 'all' && destination === 'all' ? filtered[0] : undefined
  const gridNotes = featured ? filtered.slice(1) : filtered
  const submitHref = localizeHref('/moments/submit', lang)

  return (
    <main className="min-h-screen bg-[#f7f4ed]">
      <section className="border-b border-[#dcd6ca] bg-[#173235] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_0.72fr] md:items-end md:py-24 dark-surface">
          <div>
            <span className="block text-[0.7rem] font-bold tracking-[0.18em] text-[#8fd4d2] uppercase">{UI.eyebrow[lang]}</span>
            <h1 className="mt-5 whitespace-pre-line text-[clamp(2.7rem,7vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.055em]">{UI.title[lang]}</h1>
          </div>
          <div className="pb-1">
            <span className="block text-base leading-relaxed text-white/72 md:text-lg">{UI.desc[lang]}</span>
            <Link
              href={submitHref}
              onClick={() => trackEvent('traveler_note_write_start', { source: 'hub_hero', locale: lang })}
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f3c67a] px-6 py-3 text-sm font-bold text-[#182827] transition-colors hover:bg-[#ffd590]"
            >
              <PenLine className="h-4 w-4" aria-hidden="true" /> {UI.write[lang]}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[#ded9cf] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs font-semibold text-[#5f685f] sm:flex-row sm:items-center sm:gap-8">
          <span>{UI.reviewPolicy[lang]}</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#b6b1a7] sm:block" aria-hidden="true" />
          <span>{UI.noFake[lang]}</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-5 border-b border-[#dcd6ca] pb-7">
          <div className="flex flex-wrap gap-2" aria-label={UI.contentFiltersAria[lang]}>
            {(['all', 'editorial', 'member'] as const).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={feedFilter === key}
                onClick={() => { setFeedFilter(key); trackEvent('traveler_note_filter', { filter: key, locale: lang }) }}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${feedFilter === key ? 'border-[#173235] bg-[#173235] text-white' : 'border-[#ccc5b8] bg-white text-[#555b55] hover:border-[#7c877e]'}`}
              >
                {UI[key][lang]}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label={UI.destinationFiltersAria[lang]}>
            <button type="button" aria-pressed={destination === 'all'} onClick={() => setDestination('all')} className={`min-h-10 shrink-0 rounded-full px-3.5 text-xs font-bold ${destination === 'all' ? 'bg-[#d7e9e5] text-[#174f51]' : 'text-[#757870] hover:bg-white'}`}>{UI.allDestinations[lang]}</button>
            {destinations.map((item) => (
              <button key={item.slug} type="button" aria-pressed={destination === item.slug} onClick={() => setDestination(item.slug)} className={`min-h-10 shrink-0 rounded-full px-3.5 text-xs font-bold ${destination === item.slug ? 'bg-[#d7e9e5] text-[#174f51]' : 'text-[#757870] hover:bg-white'}`}>{item.label}</button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs font-semibold text-[#777a73]" aria-live="polite">{filtered.length} {UI.results[lang]}</p>

        {filtered.length === 0 ? (
          <div className="mt-6 border border-[#d8d2c6] bg-white px-6 py-14 text-center md:px-12">
            <p className="text-2xl font-bold text-[#1e2927]">{UI.emptyTitle[lang]}</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#666b65]">{UI.emptyDesc[lang]}</p>
            <Link href={submitHref} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#173235] px-6 py-3 text-sm font-bold text-white hover:bg-[#245054]">{UI.write[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        ) : (
          <>
            {featured && <div className="mt-7"><NoteCard note={featured} lang={lang} featured /></div>}
            <div data-ui-grid="story" className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridNotes.map((note) => <NoteCard key={note.id} note={note} lang={lang} />)}
            </div>
          </>
        )}
      </section>

      <section className="border-y border-[#d9d3c7] bg-[#eee8dc]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-18">
          <div>
            <span className="text-[0.7rem] font-bold tracking-[0.16em] text-[#69766e] uppercase">{UI.community[lang]}</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.03em] text-[#1c2927] md:text-4xl">{UI.inviteTitle[lang]}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#636760] md:text-base">{UI.inviteDesc[lang]}</p>
          </div>
          <Link href={submitHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#173235] px-6 py-3 text-sm font-bold text-[#173235] hover:bg-[#173235] hover:text-white">{UI.write[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  )
}
