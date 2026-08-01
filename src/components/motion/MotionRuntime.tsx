'use client'

import { useLayoutEffect } from 'react'
import { trackEvent } from '@/lib/track'

const TARGET = '[data-motion="reveal"]'

function targetsWithin(root: ParentNode) {
  const targets: HTMLElement[] = []
  if (root instanceof HTMLElement && root.matches(TARGET)) targets.push(root)
  root.querySelectorAll<HTMLElement>(TARGET).forEach((target) => targets.push(target))
  return targets
}

export function MotionRuntime() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    trackEvent('motion_preference_detected', {
      reduced_motion: reduced ? 'true' : 'false',
    })

    if (reduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll<HTMLElement>(TARGET).forEach((target) => {
        target.dataset.motionState = 'visible'
      })
      root.dataset.wakMotion = 'reduced'
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const target = entry.target as HTMLElement
        target.dataset.motionState = 'visible'
        observer.unobserve(target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    const observe = (scope: ParentNode) => {
      targetsWithin(scope).forEach((target) => {
        if (target.dataset.motionObserved === 'true') return
        target.dataset.motionObserved = 'true'
        const rect = target.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight * 0.92) {
          target.dataset.motionState = 'visible'
        } else {
          observer.observe(target)
        }
      })
    }

    observe(document)
    root.dataset.wakMotion = 'ready'

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) observe(node)
        })
      })
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      delete root.dataset.wakMotion
    }
  }, [])

  return null
}
