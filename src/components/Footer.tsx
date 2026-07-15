'use client'

import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { useLang } from '@/context/LanguageContext'
import { BUSINESS } from '@/lib/legal'

export default function Footer() {
  const { tr, lang } = useLang()
  const companyName = lang === 'KO' ? BUSINESS.companyKo : BUSINESS.companyEn
  const address = lang === 'KO' ? BUSINESS.addressKo : BUSINESS.addressEn
  const bizLabel = lang === 'KO' ? '사업자등록번호' : lang === 'JP' ? '事業者登録番号' : 'Business reg. no.'
  const ceoLabel = lang === 'KO' ? '대표' : lang === 'JP' ? '代表' : 'CEO'

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
                { k: 'nav_select_collections', h: '/collections' },
                { k: 'nav_infrastructure', h: '/infrastructure' },
                { k: 'footer_spaces', h: '/spaces' },
                { k: 'nav_visa', h: '/visa-ai' },
                { k: 'nav_growth', h: '/growth' },
                { k: 'nav_prog_business', h: '/business' },
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
              <li className="text-white/55">wakation.sf@gmail.com</li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {tr('nav_contact')}
                </Link>
              </li>
              {/* 공식 커뮤니티 — 신뢰·리텐션 채널 */}
              <li>
                <a
                  href="https://cafe.naver.com/shcafa32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {tr('footer_cafe')}
                </a>
              </li>
              <li>
                <a
                  href="https://pf.kakao.com/_xiPxbXG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {tr('footer_kakao')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* 사업자 정보 — 전자상거래법·신뢰 시그널 */}
        <div className="border-t border-white/8 pt-6 mb-4 text-[0.8125rem] text-white/40 leading-relaxed">
          <p>{companyName} · {ceoLabel} {BUSINESS.ceo} · {bizLabel} {BUSINESS.bizNo}</p>
          <p>{address}</p>
          <p>{BUSINESS.email}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 text-[0.875rem] text-white/45">
          <span>{tr('footer_copy')}</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white/80 transition-colors font-medium">
              {tr('footer_privacy')}
            </Link>
            <Link href="/terms" className="hover:text-white/80 transition-colors">
              {tr('footer_terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
