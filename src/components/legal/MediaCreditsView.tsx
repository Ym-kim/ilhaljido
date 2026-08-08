'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/types'
import { useLang } from '@/context/LanguageContext'

const COPY = {
  title: {
    KO: '미디어 출처와 사용 범위',
    EN: 'Media sources and usage',
    JP: 'メディアの出典と利用範囲',
  },
  intro: {
    KO: 'Wakation은 직접 제작한 이미지와 사용 권한을 확인한 사진을 구분해 관리합니다. 생성 이미지는 실제 제휴 숙소·객실·프로그램 현장 사진으로 사용하지 않습니다.',
    EN: 'Wakation separates in-house visuals from photographs with verified usage rights. Generated images are never presented as exact partner stays, rooms or program locations.',
    JP: 'Wakationは自社制作画像と、利用権を確認した写真を分けて管理しています。生成画像を実在の提携宿泊施設・客室・プログラム会場の写真として表示しません。',
  },
  licensed: { KO: '라이선스 사진', EN: 'Licensed photographs', JP: 'ライセンス写真' },
  generated: { KO: '자체 제작 이미지', EN: 'In-house visuals', JP: '自社制作画像' },
  generatedDesc: {
    KO: 'OpenAI 이미지 생성 도구로 제작하고 Wakation이 편집·최적화했습니다. 이미지별 출처와 사용 범위는 내부 자산 매니페스트에서 관리합니다.',
    EN: 'Created with OpenAI image generation, then edited and optimized by Wakation. Source and usage scope are maintained in the internal asset manifest.',
    JP: 'OpenAIの画像生成ツールで制作し、Wakationが編集・最適化しています。画像ごとの出典と利用範囲は内部アセット台帳で管理します。',
  },
  back: { KO: 'Wakation 홈으로', EN: 'Back to Wakation', JP: 'Wakationホームへ' },
} satisfies Record<string, Record<Lang, string>>

const LICENSED = [
  {
    title: { KO: '전주 한옥마을', EN: 'Jeonju Hanok Village', JP: '全州韓屋村' },
    author: 'Jjw',
    license: 'CC BY 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:20240727_Jeonju_Hanok_Village_001.jpg',
    changes: { KO: '크기 조정·WebP 변환', EN: 'Resized and converted to WebP', JP: 'リサイズ・WebP変換' },
  },
  {
    title: { KO: '여수 항구', EN: 'Yeosu Harbor', JP: '麗水港' },
    author: 'LWY',
    license: 'CC BY 2.0',
    href: 'https://commons.wikimedia.org/wiki/File:Korea-Yeosu-Harbor-01.jpg',
    changes: { KO: '크기 조정·WebP 변환', EN: 'Resized and converted to WebP', JP: 'リサイズ・WebP変換' },
  },
] satisfies Array<{
  title: Record<Lang, string>
  author: string
  license: string
  href: string
  changes: Record<Lang, string>
}>

export function MediaCreditsView({ lang }: { lang: Lang }) {
  const { lang: contextLang, setLang } = useLang()
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''

  useEffect(() => {
    if (contextLang !== lang) setLang(lang)
  }, [contextLang, lang, setLang])

  return (
    <main className="min-h-screen bg-[#f7f3ec] px-5 py-16 text-[#14202b] sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#317b98]">Transparency</span>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{COPY.title[lang]}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#52636e] sm:text-lg">{COPY.intro[lang]}</p>

        <section className="mt-14">
          <h2 className="text-2xl font-bold">{COPY.licensed[lang]}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {LICENSED.map((item) => (
              <article key={item.href} className="border border-[#d8d3c9] bg-white p-6 shadow-[0_12px_32px_rgba(20,32,43,0.06)]">
                <h3 className="text-lg font-bold">{item.title[lang]}</h3>
                <p className="mt-2 text-sm leading-6 text-[#65747e]">
                  {item.author} · {item.license}<br />{item.changes[lang]}
                </p>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-[#0369a1] underline underline-offset-4">
                  Wikimedia Commons
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-[#d8d3c9] pt-10">
          <h2 className="text-2xl font-bold">{COPY.generated[lang]}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52636e]">{COPY.generatedDesc[lang]}</p>
        </section>

        <Link href={prefix || '/'} className="mt-14 inline-flex min-h-11 items-center font-bold text-[#0369a1] underline underline-offset-4">
          {COPY.back[lang]}
        </Link>
      </div>
    </main>
  )
}
