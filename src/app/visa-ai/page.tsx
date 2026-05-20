'use client'

import { useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'

type Step = 1 | 2 | 3 | 4

const COUNTRIES = ['일본', '태국', '인도네시아', '베트남', '호주', '캐나다', '포르투갈', '기타']
const PURPOSES = ['워케이션', '어학연수', '유학', '시장조사', '비즈니스', '디지털 노마드']
const DURATIONS = ['1개월 이하', '1-3개월', '3-6개월', '6개월 이상']

interface Selections {
  country: string
  purpose: string
  duration: string
}

function getMockResult(s: Selections) {
  const visaMap: Record<string, string> = {
    '일본': '관광 비자(단기체류 90일 무비자) / 취업·연수 비자',
    '태국': '관광 비자(30일) / TR-O 비자 / METV 복수비자',
    '인도네시아': '소셜·문화 비자(B211A) / 비즈니스 비자',
    '베트남': '전자 비자(E-Visa 90일) / 비즈니스 비자',
    '호주': '워킹홀리데이 비자(482) / 학생 비자(500)',
    '캐나다': '워킹홀리데이 비자(IEC) / 학생 비자',
    '포르투갈': '디지털 노마드 비자 / D7 패시브 인컴 비자',
    '기타': '목적지별 개별 확인 필요',
  }

  const reqMap: Record<string, string> = {
    '1개월 이하': '대부분의 국가에서 무비자 또는 도착비자로 입국 가능합니다.',
    '1-3개월': '복수비자 또는 비즈니스 비자를 권장합니다. 체류 연장 가능 여부를 확인하세요.',
    '3-6개월': '장기 체류 비자(학생·취업·노마드 비자) 신청을 권장합니다.',
    '6개월 이상': '장기 거주 허가 또는 특화 비자(D7, 디지털 노마드 등) 신청이 필요합니다.',
  }

  const programMap: Record<string, string> = {
    '워케이션': '글로벌 워케이션 프로그램',
    '어학연수': '어학·유학 프로그램',
    '유학': '어학·유학 프로그램',
    '시장조사': '시장조사단·박람회 프로그램',
    '비즈니스': '시장조사단·박람회 프로그램',
    '디지털 노마드': '글로벌 워케이션 프로그램',
  }

  return {
    visaType: visaMap[s.country] ?? '목적지별 개별 확인 필요',
    requirement: reqMap[s.duration] ?? '상세 요건을 확인하세요.',
    program: programMap[s.purpose] ?? '프로그램 문의 필요',
    official: `${s.country} 주한 대사관 또는 이민국 공식 홈페이지`,
  }
}

export default function VisaAiPage() {
  const [step, setStep] = useState<Step>(1)
  const [selections, setSelections] = useState<Selections>({ country: '', purpose: '', duration: '' })
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  function selectCountry(c: string) {
    setSelections(p => ({ ...p, country: c }))
    setStep(2)
  }

  function selectPurpose(p: string) {
    setSelections(prev => ({ ...prev, purpose: p }))
    setStep(3)
  }

  function selectDuration(d: string) {
    setSelections(prev => ({ ...prev, duration: d }))
    setLoading(true)
    setStep(4)
    setTimeout(() => {
      setLoading(false)
      setShowResult(true)
    }, 1800)
  }

  function reset() {
    setStep(1)
    setSelections({ country: '', purpose: '', duration: '' })
    setLoading(false)
    setShowResult(false)
  }

  const result = showResult ? getMockResult(selections) : null

  const stepLabels = ['국가 선택', '체류 목적', '체류 기간', '결과']

  return (
    <div className="min-h-screen bg-[#0f0f0f]">

      {/* ── Hero text ── */}
      <section className="pt-28 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold px-4 py-2 rounded-full mb-6">
          정식 서비스 준비중
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-5">비자·체류 AI</h1>
        <p className="text-gray-400 text-lg md:text-xl mb-3">국가·목적·기간별 맞춤 체류 정보</p>
        <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
          데이터·AI 기반 글로벌 체류 플랫폼으로 확장 중입니다. 현재는 주요 국가 기본 정보를 제공하며,
          정식 서비스에서는 실시간 비자 API 연동으로 더욱 정확한 안내를 제공할 예정입니다.
        </p>
      </section>

      {/* ── Step UI ── */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {stepLabels.map((label, i) => {
              const s = (i + 1) as Step
              const isActive = step === s
              const isDone = step > s
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    isDone ? 'bg-teal-500 text-white' :
                    isActive ? 'bg-white text-gray-900' :
                    'bg-white/10 text-gray-500'
                  }`}>
                    {isDone ? '✓' : s}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-white' : 'text-gray-500'}`}>{label}</span>
                  {i < stepLabels.length - 1 && <div className="w-6 h-px bg-white/20" />}
                </div>
              )
            })}
          </div>

          {/* Step 1: 국가 선택 */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-black text-white mb-6 text-center">어느 국가로 가시나요?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COUNTRIES.map(c => (
                  <button
                    key={c}
                    onClick={() => selectCountry(c)}
                    className="bg-white/10 border border-white/20 text-white font-bold py-4 rounded-2xl hover:bg-teal-500/20 hover:border-teal-500/50 transition-all hover:-translate-y-0.5">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: 체류 목적 */}
          {step === 2 && (
            <div>
              <p className="text-teal-400 text-sm text-center mb-2">{selections.country} 선택됨</p>
              <h2 className="text-2xl font-black text-white mb-6 text-center">체류 목적이 무엇인가요?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PURPOSES.map(p => (
                  <button
                    key={p}
                    onClick={() => selectPurpose(p)}
                    className="bg-white/10 border border-white/20 text-white font-bold py-4 rounded-2xl hover:bg-teal-500/20 hover:border-teal-500/50 transition-all hover:-translate-y-0.5">
                    {p}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="block mx-auto mt-6 text-gray-500 text-sm hover:text-gray-300 transition-colors">
                ← 이전 단계
              </button>
            </div>
          )}

          {/* Step 3: 체류 기간 */}
          {step === 3 && (
            <div>
              <p className="text-teal-400 text-sm text-center mb-2">{selections.country} · {selections.purpose}</p>
              <h2 className="text-2xl font-black text-white mb-6 text-center">체류 기간은 얼마나 되나요?</h2>
              <div className="grid grid-cols-2 gap-3">
                {DURATIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => selectDuration(d)}
                    className="bg-white/10 border border-white/20 text-white font-bold py-6 rounded-2xl hover:bg-teal-500/20 hover:border-teal-500/50 transition-all hover:-translate-y-0.5 text-lg">
                    {d}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="block mx-auto mt-6 text-gray-500 text-sm hover:text-gray-300 transition-colors">
                ← 이전 단계
              </button>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && (
            <div>
              {loading && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                  <p className="text-white font-bold text-lg">AI 분석 중...</p>
                  <p className="text-gray-500 text-sm mt-2">{selections.country} · {selections.purpose} · {selections.duration}</p>
                </div>
              )}

              {showResult && result && (
                <div>
                  <div className="text-center mb-8">
                    <p className="text-teal-400 text-sm mb-2">{selections.country} · {selections.purpose} · {selections.duration}</p>
                    <h2 className="text-2xl font-black text-white">AI 분석 결과</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                      <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">비자 종류 추천</p>
                      <p className="text-white font-bold">{result.visaType}</p>
                    </div>

                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                      <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">체류 요건 요약</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{result.requirement}</p>
                    </div>

                    <div className="bg-[#1a1a1a] border border-teal-500/30 rounded-2xl p-6">
                      <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">관련 Wakation 프로그램</p>
                      <p className="text-white font-bold mb-3">{result.program}</p>
                      <a href="/programs" className="inline-flex items-center gap-1 text-teal-400 text-sm font-semibold hover:gap-2 transition-all">
                        프로그램 보기 <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
                      <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">공식 확인 안내</p>
                      <p className="text-gray-400 text-xs">{result.official}</p>
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="flex items-center gap-2 mx-auto mt-8 text-gray-400 text-sm hover:text-white transition-colors">
                    <RotateCcw className="w-4 h-4" /> 다시 검색하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Legal disclaimer ── */}
      <section className="border-t border-white/10 py-10 px-6 bg-[#111]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500 text-xs leading-relaxed">
            본 안내는 일반 정보 제공 목적이며, 최종 비자 발급 가능 여부는 각국 대사관·이민국의 최신 안내를 확인하세요.
            Wakation은 비자 발급 결과에 대한 법적 책임을 지지 않습니다.
          </p>
          <p className="text-gray-600 text-xs mt-4">
            데이터·AI 기반 글로벌 체류 플랫폼으로의 확장을 위해 정식 비자 API 연동을 준비 중입니다.
          </p>
        </div>
      </section>
    </div>
  )
}
