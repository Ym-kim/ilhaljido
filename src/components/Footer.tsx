'use client'

import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { useLang } from '@/context/LanguageContext'
import { BUSINESS } from '@/lib/legal'
import { KAKAO_CHANNEL_URL } from '@/lib/publicConfig'
import { localizeHref, isRouteVisibleIn } from '@/lib/i18n/localePath'

export default function Footer() {
  const { tr, lang } = useLang()
  const companyName = lang === 'KO' ? BUSINESS.companyKo : BUSINESS.companyEn
  const address = lang === 'KO' ? BUSINESS.addressKo : BUSINESS.addressEn
  const bizLabel = lang === 'KO' ? '사업자등록번호' : lang === 'JP' ? '事業者登録番号' : 'Business reg. no.'
  const ceoLabel = lang === 'KO' ? '대표' : lang === 'JP' ? '代表' : 'CEO'
  const localePrefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  const mediaCreditsLabel = lang === 'KO' ? '미디어 출처' : lang === 'JP' ? 'メディア出典' : 'Media credits'
  // 브랜드 표기 라인 — KO는 한글 '와케이션' 병기(네이버 브랜드 검색 매칭), JP는 ワーケーション 키워드 (2026-08-05)
  const brandLine =
    lang === 'KO'
      ? '와케이션(Wakation) — 일하는 사람의 여행 플랫폼'
      : lang === 'JP'
        ? 'Wakation — 働く人のためのワーケーションプラットフォーム'
        : 'Wakation — the travel platform for working people'

  return (
    <footer className="bg-[#0a0a0a] text-white/70 py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* 사이트맵 확장 (2026-08-02 발견성 개선) — 상단 내비에 없는 세부 페이지들의 상시 진입로.
            운영자 피드백 "세세한 메뉴를 찾아보기 어렵다" 대응: 고아 라우트(온천·크루즈·모먼트·
            비자AI·성장·어학·인프라·B2B·양양 등)를 4열 그룹으로 전수 연결 */}
        <div className="grid min-w-0 gap-10 mb-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="min-w-0 md:col-span-2 lg:col-span-2">
            <Logo variant="light" className="mb-5" />
            <p className="text-[0.9375rem] leading-relaxed text-white/55 max-w-sm font-medium">
              Stay. Work. Grow.
            </p>
            <p className="text-caption-on-dark mt-2 max-w-full break-words">{tr('footer_tagline')}</p>
            <ul className="mt-6 space-y-2 text-[0.875rem] font-medium">
              <li className="break-all text-white/45">wakation.sf@gmail.com</li>
              <li className="flex flex-wrap gap-x-4 gap-y-1">
                <a href="https://cafe.naver.com/shcafa32" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {tr('footer_cafe')}
                </a>
                <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {tr('footer_kakao')}
                </a>
              </li>
            </ul>
          </div>
          {(
            [
              {
                title: { KO: '발견하기', EN: 'Discover', JP: '見つける' },
                links: [
                  { l: { KO: '30초 여행 찾기', EN: 'Find my trip', JP: '30秒で旅を探す' }, h: '/trip-match' },
                  { l: { KO: '목적지 가이드', EN: 'City guides', JP: '都市ガイド' }, h: '/guide' },
                  { l: { KO: '스토리', EN: 'Stories', JP: 'ストーリー' }, h: '/stories' },
                  { l: { KO: '모먼트', EN: 'Moments', JP: 'モーメント' }, h: '/moments' },
                  { l: { KO: '기획전 · Trip Set', EN: 'Collections & trip sets', JP: '特集 · トリップセット' }, h: '/collections' },
                  { l: { KO: '도시 비교', EN: 'Compare cities', JP: '都市を比較' }, h: '/destinations/compare' },
                ],
              },
              {
                title: { KO: '여행 준비', EN: 'Plan', JP: '旅の準備' },
                links: [
                  { l: { KO: '숙소', EN: 'Stays', JP: '宿泊' }, h: '/select/hotel' },
                  { l: { KO: '현지 체험', EN: 'Experiences', JP: '現地体験' }, h: '/select/activity' },
                  { l: { KO: 'eSIM', EN: 'eSIM', JP: 'eSIM' }, h: '/select/esim' },
                  { l: { KO: '온라인 강의', EN: 'Courses', JP: 'オンライン講座' }, h: '/select/learn' },
                  { l: { KO: '크루즈', EN: 'Cruises', JP: 'クルーズ' }, h: '/cruise' },
                  { l: { KO: '저장한 여행', EN: 'Saved trips', JP: '保存した旅' }, h: '/wishlist' },
                ],
              },
              {
                title: { KO: '프로그램', EN: 'Programs', JP: 'プログラム' },
                links: [
                  { l: { KO: '국내 워케이션', EN: 'Korea workations', JP: '韓国ワーケーション' }, h: '/programs/domestic' },
                  { l: { KO: '해외 워케이션·체류', EN: 'Overseas stays', JP: '海外滞在' }, h: '/programs/global' },
                  { l: { KO: '온천·료칸', EN: 'Onsen & ryokan', JP: '温泉 · 旅館' }, h: '/programs/onsen' },
                  { l: { KO: '네트워킹', EN: 'Networking', JP: 'ネットワーキング' }, h: '/programs/networking' },
                  { l: { KO: '지자체 지원사업', EN: 'Gov-support programs', JP: '自治体支援' }, h: '/programs/support' },
                  { l: { KO: '오픈 알림 받기', EN: 'Get open alerts', JP: 'オープン通知を受け取る' }, h: '/hosted' },
                  { l: { KO: '양양 1기 리포트', EN: 'Yangyang report', JP: '襄陽レポート' }, h: '/report/yangyang' },
                ],
              },
              {
                title: { KO: 'Wakation', EN: 'Wakation', JP: 'Wakation' },
                links: [
                  { l: { KO: '소개', EN: 'About', JP: '会社紹介' }, h: '/about' },
                  { l: { KO: '비자·체류 AI', EN: 'Visa & stay AI', JP: 'ビザ · 滞在AI' }, h: '/visa-ai' },
                  { l: { KO: '워케이션 진단', EN: 'Workation self-check', JP: 'ワーケーション診断' }, h: '/tools/diagnosis' },
                  { l: { KO: '성장 캠프', EN: 'Growth camp', JP: '成長キャンプ' }, h: '/growth' },
                  { l: { KO: '어학 체류', EN: 'Language stays', JP: '語学滞在' }, h: '/language' },
                  { l: { KO: '기업 워케이션 (B2B)', EN: 'Corporate (B2B)', JP: '企業向け (B2B)' }, h: '/business' },
                  { l: { KO: '파트너십', EN: 'Partnership', JP: 'パートナーシップ' }, h: '/partnership' },
                  { l: { KO: '문의', EN: 'Contact', JP: 'お問い合わせ' }, h: '/contact' },
                ],
              },
            ] as const
          ).map((col) => (
            <div key={col.title.KO} className="min-w-0">
              <h4 className="text-white/80 text-[0.8125rem] font-bold uppercase tracking-widest mb-4">
                {col.title[lang]}
              </h4>
              <ul className="space-y-2.5 text-[0.875rem] font-medium">
                {/* 해당 언어에 대응 화면이 없는 라우트는 숨김 — EN의 /trip-match (2026-08-07 구조 결정 ③) */}
                {col.links.filter((i) => isRouteVisibleIn(i.h, lang)).map((i) => (
                  <li key={i.h}>
                    {/* 로케일 라우트 실존분만 prefix (localizeHref) — KO 전용 라우트는 원경로 유지 (2026-08-04) */}
                    <Link href={localizeHref(i.h, lang)} className="hover:text-white transition-colors">
                      {i.l[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* 사업자 정보 — 전자상거래법·신뢰 시그널 */}
        <div className="border-t border-white/8 pt-6 mb-4 text-[0.8125rem] text-white/40 leading-relaxed">
          <p>{brandLine}</p>
          <p>{companyName} · {ceoLabel} {BUSINESS.ceo} · {bizLabel} {BUSINESS.bizNo}</p>
          <p>{address}</p>
          <p>{BUSINESS.email}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 text-[0.875rem] text-white/45">
          <span>{tr('footer_copy')}</span>
          <div className="flex gap-5">
            <Link href={`${localePrefix}/media-credits`} className="hover:text-white/80 transition-colors">
              {mediaCreditsLabel}
            </Link>
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
