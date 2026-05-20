'use client'

import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { useLang } from '@/context/LanguageContext'

export default function Footer() {
  const { tr } = useLang()

  return (
    <footer className="bg-[#0a0a0a] text-white/70 py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Logo variant="light" className="mb-5" />
            <p className="text-[0.9375rem] leading-relaxed text-white/55 max-w-sm font-medium">
              Stay. Work. Grow.
            </p>
            <p className="text-caption-on-dark mt-2">{tr('footer_tagline')}</p>
          </div>
          <div>
            <h4 className="text-white/80 text-[0.8125rem] font-bold uppercase tracking-widest mb-4">
              {tr('footer_service')}
            </h4>
            <ul className="space-y-2.5 text-[0.9375rem] font-medium">
              {[
                { k: 'nav_programs', h: '/programs' },
                { k: 'nav_infrastructure', h: '/infrastructure' },
                { k: 'nav_visa', h: '/visa-ai' },
                { k: 'nav_growth', h: '/growth' },
                { k: 'nav_partnership', h: '/partnership' },
              ].map((i) => (
                <li key={i.k}>
                  <Link href={i.h} className="hover:text-white transition-colors">
                    {tr(i.k)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/80 text-[0.8125rem] font-bold uppercase tracking-widest mb-4">
              {tr('footer_contact')}
            </h4>
            <ul className="space-y-2.5 text-[0.9375rem] font-medium">
              <li className="text-white/55">hello@wakation.kr</li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {tr('nav_contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-[0.875rem] text-white/45">
          <span>{tr('footer_copy')}</span>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-white/80 transition-colors">
              {tr('footer_privacy')}
            </Link>
            <Link href="#" className="hover:text-white/80 transition-colors">
              {tr('footer_terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
