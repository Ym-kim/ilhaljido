'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'
import { Star, Wifi, CheckCircle2 } from 'lucide-react'

const STAYS = [
  { name: '애월 오션 빌라', region: '제주', score: 9.8, price: '148,000', tag: '오션뷰', wifi: '500Mbps', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { name: '설악 포레스트 하우스', region: '강원', score: 9.6, price: '98,000', tag: '산속', wifi: '300Mbps', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80' },
  { name: '여수 하버뷰 레지던스', region: '전남', score: 9.4, price: '128,000', tag: '항구뷰', wifi: '400Mbps', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80' },
  { name: '부산 해운대 코리빙', region: '부산', score: 9.2, price: '88,000', tag: '도시', wifi: '1Gbps', img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80' },
  { name: '경주 고택 스테이', region: '경북', score: 9.0, price: '78,000', tag: '전통', wifi: '200Mbps', img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80' },
  { name: '전주 한옥마을 오피스', region: '전북', score: 9.1, price: '68,000', tag: '한옥', wifi: '300Mbps', img: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80' },
]

export default function StayPage() {
  const { tr } = useLang()
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-3">{tr('stay_badge')}</p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('stay_title')}</h1>
        </div>
      </section>

      {/* 검증 뱃지 */}
      <section className="bg-[#1a1a1a] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center">
          {['WiFi 실측 100Mbps+','전용 데스크 확인','소음 레벨 측정','현장 직접 방문'].map(b => (
            <div key={b} className="flex items-center gap-2 text-white/70 text-sm">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />{b}
            </div>
          ))}
        </div>
      </section>

      {/* 숙소 그리드 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAYS.map(s => (
            <div key={s.name} className="group rounded-3xl overflow-hidden cursor-pointer relative bg-[#1a1a1a]">
              <img src={s.img} alt={s.name} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4"><span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">{s.tag}</span></div>
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /><span className="text-white text-xs font-bold">{s.score}</span>
              </div>
              <div className="p-5">
                <p className="text-white/50 text-xs mb-1">{s.region}</p>
                <h3 className="text-white font-bold mb-3">{s.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-xs flex items-center gap-1"><Wifi className="w-3 h-3 text-teal-400" />{s.wifi}</span>
                  <span className="text-teal-400 font-black">₩{s.price}<span className="text-white/30 font-normal text-xs">/박</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
