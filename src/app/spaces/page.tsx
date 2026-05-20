'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Brain, Wifi, Volume2, Star, Filter, Search } from 'lucide-react'
import { Space } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useLang } from '@/context/LanguageContext'
import { getLocalizedSpaces, getRegionLabel, getSpaceTypeLabel, getNoiseLevelLabel } from '@/lib/i18n'

const REGIONS = ['all', 'jeju', 'gangwon', 'jeonnam', 'busan', 'gyeongnam'] as const

export default function SpacesPage() {
  const { lang, tr } = useLang()
  const allSpaces = useMemo(() => getLocalizedSpaces(lang), [lang])
  const [query, setQuery] = useState('')
  const [aiResult, setAiResult] = useState<{ reasoning: string; tips: string[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>(allSpaces)
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  useEffect(() => {
    setFilteredSpaces(allSpaces)
  }, [allSpaces])

  async function handleAISearch() {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, spaces: allSpaces }),
      })
      const data = await res.json()
      setAiResult({ reasoning: data.reasoning, tips: data.tips })
      if (data.spaceIds?.length > 0) {
        const recommended = allSpaces.filter((s) => data.spaceIds.includes(s.id))
        const rest = allSpaces.filter((s) => !data.spaceIds.includes(s.id))
        setFilteredSpaces([...recommended, ...rest])
      }
    } catch {
      alert(tr('spaces_ai_error'))
    } finally {
      setLoading(false)
    }
  }

  const displayedSpaces =
    selectedRegion === 'all' ? filteredSpaces : filteredSpaces.filter((s) => s.region === selectedRegion)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-teal-500" />
            <span className="font-bold text-xl text-gray-900">{tr('spaces_brand')}</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-teal-500" />
            <h2 className="font-semibold text-gray-800">{tr('spaces_ai_title')}</h2>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                placeholder={tr('spaces_search_placeholder')}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
              />
            </div>
            <button
              type="button"
              onClick={handleAISearch}
              disabled={loading}
              className="bg-teal-500 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-teal-600 disabled:opacity-50 transition-colors"
            >
              {loading ? tr('spaces_searching') : tr('spaces_search_btn')}
            </button>
          </div>

          {aiResult && (
            <div className="mt-4 p-4 bg-teal-50 rounded-xl">
              <p className="text-sm text-teal-800 font-medium mb-2">AI</p>
              <p className="text-sm text-teal-700 mb-3">{aiResult.reasoning}</p>
              <div className="flex flex-wrap gap-2">
                {aiResult.tips.map((tip, i) => (
                  <span key={i} className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                    {tip}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRegion(r)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm transition-colors ${
                selectedRegion === r
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300'
              }`}
            >
              {r === 'all' ? tr('spaces_filter_all') : getRegionLabel(lang, r)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSpaces.map((space) => (
            <SpaceCard key={space.id} space={space} lang={lang} tr={tr} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SpaceCard({
  space,
  lang,
  tr,
}: {
  space: Space
  lang: ReturnType<typeof useLang>['lang']
  tr: ReturnType<typeof useLang>['tr']
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-gradient-to-br from-teal-100 to-teal-200 relative">
        <div className="absolute top-3 left-3">
          <span className="bg-white text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
            {getSpaceTypeLabel(lang, space.type)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {getRegionLabel(lang, space.region)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-base leading-tight">{space.name}</h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{space.rating}</span>
          </div>
        </div>

        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{space.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Wifi className="w-3.5 h-3.5 text-teal-400" />
            <span>{space.wifiSpeed}Mbps</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Volume2 className="w-3.5 h-3.5 text-teal-400" />
            <span>{getNoiseLevelLabel(lang, space.noiseLevel)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {space.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{formatPrice(space.pricePerDay)}</span>
            <span className="text-xs text-gray-400">{tr('spaces_per_day')}</span>
          </div>
          <button
            type="button"
            className="bg-teal-500 text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-teal-600 transition-colors"
          >
            {tr('learn_more')}
          </button>
        </div>
      </div>
    </div>
  )
}
