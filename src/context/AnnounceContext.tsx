'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { DOMESTIC_CURRENT } from '@/lib/i18n/data'

type ActiveProgram = (typeof DOMESTIC_CURRENT)[0]
type AnnounceCtx = { visible: boolean; dismiss: () => void }

const AnnounceContext = createContext<AnnounceCtx>({ visible: false, dismiss: () => {} })

export function AnnounceProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [activeProgram, setActiveProgram] = useState<ActiveProgram | null>(null)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    const active =
      DOMESTIC_CURRENT.find(
        (p) => today <= p.recruitEnd && !localStorage.getItem(`wb_ann_${p.id}`)
      ) ?? null
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage 확인 후 배너 노출 결정(mount 1회) — SSR 불일치 방지
    setActiveProgram(active)
    setVisible(active !== null)
  }, [])

  const dismiss = () => {
    if (activeProgram) {
      localStorage.setItem(`wb_ann_${activeProgram.id}`, '1')
    }
    setVisible(false)
  }

  return <AnnounceContext.Provider value={{ visible, dismiss }}>{children}</AnnounceContext.Provider>
}

export const useAnnounce = () => useContext(AnnounceContext)
