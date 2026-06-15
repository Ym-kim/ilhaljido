'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { DOMESTIC_CURRENT } from '@/lib/i18n/data'

type AnnounceCtx = { visible: boolean; dismiss: () => void }

const AnnounceContext = createContext<AnnounceCtx>({ visible: false, dismiss: () => {} })

const STORAGE_KEY = 'wb_ann_v2'

export function AnnounceProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (DOMESTIC_CURRENT.length > 0 && !localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  return (
    <AnnounceContext.Provider value={{ visible, dismiss }}>
      {children}
    </AnnounceContext.Provider>
  )
}

export const useAnnounce = () => useContext(AnnounceContext)
