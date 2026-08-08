'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, PenLine } from 'lucide-react'
import type { TravelerNote } from '@/lib/moments'
import { useLang } from '@/context/LanguageContext'
import { localizeHref } from '@/lib/i18n/localePath'
import { ShareButton } from '@/components/share/ShareButton'
import { trackEvent } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

const UI: Record<string, L> = {
  back: { KO: '여행자 노트', EN: 'Traveler Notes', JP: 'トラベラーノート' },
  workTitle: { KO: '일하며 머물 때의 메모', EN: 'Notes for working while you stay', JP: '働きながら滞在するメモ' },
  checkTitle: { KO: '출발 전에 확인할 것', EN: 'Check before you leave', JP: '出発前に確認したいこと' },
  aboutAuthor: { KO: '이 글을 쓴 사람', EN: 'About this contributor', JP: 'このノートを書いた人' },
  editorialBody: { KO: '목적지를 처음 살펴보는 사람을 위해 공개 정보와 Wakation 가이드를 편집해 소개합니다. 직접 체험 후기와는 구분해 표시합니다.', EN: 'We edit public information and Wakation guides for people exploring a destination. Editor introductions are always separated from first-hand member reviews.', JP: '行き先を初めて調べる人のために、公開情報とWakationガイドを編集して紹介します。実体験の会員レビューとは明確に区別します。' },
  memberBody: { KO: '가입자가 실제 체류 경험을 바탕으로 남긴 글이며, Wakation 편집팀이 공개 전 기본 정보와 표현을 확인했습니다.', EN: 'A member note based on an actual stay. Wakation editors checked basic information and wording before publication.', JP: '会員が実際の滞在をもとに書いたノートです。Wakation編集部が公開前に基本情報と表現を確認しています。' },
  nextTitle: { KO: '이 도시를 다음 여행으로', EN: 'Turn this city into your next trip', JP: 'この街を次の旅へ' },
  nextEyebrow: { KO: '다음 단계', EN: 'Next step', JP: '次のステップ' },
  guide: { KO: '여행지 가이드 보기', EN: 'Open destination guide', JP: '行き先ガイドを見る' },
  stays: { KO: '이 도시 숙소 찾기', EN: 'Find stays in this city', JP: 'この街の宿を探す' },
  write: { KO: '나도 여행 노트 쓰기', EN: 'Write my own travel note', JP: '自分の旅ノートを書く' },
  published: { KO: '게시', EN: 'Published', JP: '公開' },
}

export function TravelerNoteDetailView({ note, forceLang }: { note: TravelerNote; forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const canonical = `https://www.wakation.kr${localizeHref(`/moments/${note.slug}`, lang)}`

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    trackEvent('traveler_note_detail_view', { slug: note.slug, destination: note.destinationSlug, source_type: note.sourceType, locale: lang })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang, note.slug])

  return (
    <main className="min-h-screen bg-[#f7f4ed]">
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <Link href={localizeHref('/moments', lang)} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#5f6761] hover:text-[#176c70]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {UI.back[lang]}
        </Link>
      </div>

      <article>
        <header className="mx-auto grid max-w-6xl gap-8 px-6 pb-12 pt-5 md:grid-cols-[1.08fr_0.92fr] md:items-stretch md:pb-18">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#d9e3df] md:aspect-auto md:min-h-[38rem]">
            <Image src={note.photo} alt={note.photoAlt[lang]} fill priority sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#173235]/88 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">{note.dest[lang]}</span>
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#244a4b] backdrop-blur-sm">{note.authorLabel[lang]}</span>
            </div>
          </div>
          <div className="flex flex-col justify-end border-y border-[#cbc5b9] py-8 md:px-4 md:py-10">
            <p className="text-[0.7rem] font-bold tracking-[0.15em] text-[#61716a] uppercase">{note.country[lang]} · {note.stayStyle[lang]}</p>
            <h1 className="mt-5 text-[clamp(2.55rem,5.5vw,4.8rem)] font-bold leading-[1.02] tracking-[-0.05em] text-[#17211f]">{note.title[lang]}</h1>
            <p className="mt-6 text-base leading-relaxed text-[#5d645e] md:text-lg">{note.summary[lang]}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {note.tags.map((tag) => <span key={tag.KO} className="rounded-full border border-[#cfc8bb] px-3 py-1.5 text-xs font-semibold text-[#626860]">{tag[lang]}</span>)}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#ddd7cc] pt-6">
              <div>
                <p className="text-sm font-bold text-[#253330]">{note.author[lang]}</p>
                <p className="mt-1 text-xs text-[#7c8079]">{UI.published[lang]} · {note.publishedAt}</p>
              </div>
              <ShareButton title={note.title[lang]} text={note.summary[lang]} url={canonical} tone="light" contentType="moment" slug={note.slug} />
            </div>
          </div>
        </header>

        <div className="border-y border-[#d8d2c6] bg-white">
          <div className="mx-auto max-w-3xl px-6 py-7">
            <p className="text-sm leading-relaxed text-[#626860]">{note.disclosure[lang]}</p>
          </div>
        </div>

        <section className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <div className="space-y-7">
            {note.body.map((paragraph) => <p key={paragraph.KO} className="text-[1.05rem] leading-[1.9] text-[#303632] md:text-lg">{paragraph[lang]}</p>)}
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <section className="border border-[#d2ccc0] bg-[#ecf3ef] p-6 md:p-7">
              <h2 className="text-xl font-bold text-[#18312f]">{UI.workTitle[lang]}</h2>
              <ul className="mt-5 space-y-4">
                {note.workNotes.map((item, index) => (
                  <li key={item.KO} className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-relaxed text-[#4e5c56]"><span className="font-bold text-[#1a7071]">{String(index + 1).padStart(2, '0')}</span><span>{item[lang]}</span></li>
                ))}
              </ul>
            </section>
            <section className="border border-[#d2ccc0] bg-white p-6 md:p-7">
              <h2 className="text-xl font-bold text-[#242d2a]">{UI.checkTitle[lang]}</h2>
              <ul className="mt-5 space-y-4">
                {note.checkBefore.map((item) => <li key={item.KO} className="border-t border-[#e5e0d7] pt-4 text-sm leading-relaxed text-[#5d635e] first:border-0 first:pt-0">{item[lang]}</li>)}
              </ul>
            </section>
          </div>

          <section className="mt-14 border-t border-[#cbc5b9] pt-8">
            <p className="text-[0.7rem] font-bold tracking-[0.15em] text-[#69746e] uppercase">{UI.aboutAuthor[lang]}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#173235] text-sm font-bold text-white">{note.author[lang].slice(0, 1).toUpperCase()}</div>
              <div>
                <p className="font-bold text-[#23302d]">{note.author[lang]} · {note.authorLabel[lang]}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#666b65]">{note.sourceType === 'editorial' ? UI.editorialBody[lang] : UI.memberBody[lang]}</p>
              </div>
            </div>
          </section>
        </section>

        <section className="border-y border-[#d2ccc0] bg-[#173235] text-white">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 md:grid-cols-[1fr_auto] md:items-end dark-surface">
            <div>
              <span className="block text-[0.7rem] font-bold tracking-[0.16em] text-[#8ed0cd] uppercase">{UI.nextEyebrow[lang]}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">{UI.nextTitle[lang]}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={localizeHref(`/guide/${note.destinationSlug}`, lang)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#173235] hover:bg-[#e7f3ef]">{UI.guide[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href={localizeHref(`/select/hotel#${note.anchor}`, lang)} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-sm font-bold text-white hover:border-white">{UI.stays[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14 text-center md:py-18">
          <h2 className="text-2xl font-bold text-[#1d2926]">{UI.write[lang]}</h2>
          <Link href={localizeHref('/moments/submit', lang)} onClick={() => trackEvent('traveler_note_write_start', { source: 'note_detail', note_slug: note.slug, locale: lang })} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#173235] px-6 py-3 text-sm font-bold text-white hover:bg-[#255156]"><PenLine className="h-4 w-4" aria-hidden="true" /> {UI.write[lang]}</Link>
        </section>
      </article>
    </main>
  )
}
