'use client'
import { useLang } from '@/context/LanguageContext'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { getActivities } from '@/lib/i18n'

export default function ActivitiesPage() {
  const { lang, tr } = useLang()
  const acts = getActivities(lang)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="relative h-[55vh] flex items-end overflow-hidden dark-surface">
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{tr('act_badge')}</SectionEyebrow>
          <h1 className="text-5xl md:text-6xl font-black text-white">{tr('act_title')}</h1>
          <p className="text-lead-on-dark mt-3 max-w-md">{tr('act_desc')}</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acts.map((a) => (
            <div key={a.id} className="group rounded-3xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-shadow">
              <img src={a.img} alt={a.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="p-5">
                <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">{a.tag}</span>
                <h3 className="font-black text-gray-900 mt-3 mb-1">{a.title}</h3>
                <p className="text-gray-400 text-xs">{a.region}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
