import Link from 'next/link'
import { ArrowLeft, ArrowRight, Smartphone, Wifi, Laptop } from 'lucide-react'
import type { Metadata } from 'next'
import type { Lang } from '@/lib/i18n/types'
import { localizeHref } from '@/lib/i18n/localePath'
import { SECURITY_GUIDE_COPY, SECURITY_GUIDE_LANGUAGES, SECURITY_GUIDE_REVIEWED, SECURITY_GUIDE_SOURCES } from '@/lib/connect/securityGuide'
import { SecurityGuideView } from './SecurityGuideView'

export function workSafelyMetadata(lang: Lang): Metadata {
  const copy = SECURITY_GUIDE_COPY[lang]
  const locale = lang === 'JP' ? 'ja' : lang === 'EN' ? 'en' : 'ko'
  return {
    title: copy.title, description: copy.description,
    alternates: { canonical: SECURITY_GUIDE_LANGUAGES[locale], languages: SECURITY_GUIDE_LANGUAGES },
    openGraph: { type: 'article', title: copy.title, description: copy.description,
      url: SECURITY_GUIDE_LANGUAGES[locale], siteName: 'Wakation',
      locale: { KO: 'ko_KR', EN: 'en_US', JP: 'ja_JP' }[lang],
      publishedTime: SECURITY_GUIDE_REVIEWED, modifiedTime: SECURITY_GUIDE_REVIEWED },
  }
}

export function WorkSafelyGuide({ lang }: { lang: Lang }) {
  const copy = SECURITY_GUIDE_COPY[lang]
  return (
    <article className="bg-[#faf9f6] text-[#111827]" data-security-guide={lang}>
      <SecurityGuideView lang={lang} />
      <header className="border-b border-[#e5e1da] bg-white px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Link href={localizeHref('/select/esim', lang)} className="inline-flex min-h-11 items-center gap-2 text-sm text-[#64748b]">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />Wakation Select · eSIM
          </Link>
          <p className="mt-6 text-xs font-bold tracking-wider text-brand-mid">{copy.category}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#64748b]">{copy.intro}</p>
          <p className="mt-5 text-xs text-[#64748b]">Wakation Editorial · {copy.reviewed} {SECURITY_GUIDE_REVIEWED}</p>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
        <div className="grid gap-3 border-b border-[#e5e1da] pb-8 sm:grid-cols-3">
          {[
            { Icon: Smartphone, label: 'MOBILE DATA', text: { KO: 'eSIM · 현지 데이터', EN: 'eSIM & local data', JP: 'eSIM・現地データ' }[lang] },
            { Icon: Wifi, label: 'INTERNET & WI-FI', text: { KO: '연결 환경 확인', EN: 'Know your connection', JP: '接続環境を確認' }[lang] },
            { Icon: Laptop, label: 'WORK SAFELY', text: { KO: '업무 계정 · 기기 준비', EN: 'Accounts & devices', JP: 'アカウント・端末の準備' }[lang] },
          ].map(({ Icon, label, text }) => <div key={label} className="flex items-center gap-3 rounded-xl border border-[#e5e1da] bg-white p-4">
            <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-mid" /><div>
              <p className="text-[0.6875rem] font-bold tracking-wide text-[#64748b]">{label}</p>
              <p className="mt-1 text-sm font-semibold">{text}</p>
            </div>
          </div>)}
        </div>
        <h2 className="mt-10 text-xl font-bold sm:text-2xl">{copy.checklist}</h2>
        <ol className="mt-6 divide-y divide-[#e5e1da]">
          {copy.steps.map((step, index) => <li key={step.title} className="flex gap-4 py-6 first:pt-0 sm:gap-6">
            <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7f3f7] text-sm font-bold text-[#17657c]">{index + 1}</span>
            <div className="min-w-0"><h3 className="text-base font-bold sm:text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#475569] sm:text-base">{step.body}</p>
            </div>
          </li>)}
        </ol>
        <aside className="mt-4 rounded-2xl border border-[#cce1e8] bg-[#edf6f8] p-5 text-sm leading-6 text-[#315566]">{copy.policy}</aside>
        <section className="mt-10 rounded-2xl border border-[#e5e1da] bg-white p-5 sm:p-7">
          <h2 className="text-lg font-bold">{copy.dataTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-[#64748b]">{copy.dataBody}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href={localizeHref('/select/esim', lang)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-mid px-4 py-3 text-center text-sm font-bold text-white">
              {copy.dataCta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
            <Link href={localizeHref('/infrastructure', lang)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#cce1e8] px-4 py-3 text-center text-sm font-bold text-[#315566]">
              {copy.workCta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </section>
        <footer className="mt-10 border-t border-[#e5e1da] pt-6 text-xs leading-6 text-[#64748b]">
          <h2 className="font-bold">{copy.sources}</h2>
          <ul className="mt-2 space-y-1">{SECURITY_GUIDE_SOURCES.map(source => <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{source.title}</a>
          </li>)}</ul>
          <p className="mt-4">{copy.disclaimer}</p>
        </footer>
      </div>
    </article>
  )
}
