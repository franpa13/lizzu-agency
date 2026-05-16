'use client'

import { useEffect, useState } from 'react'

export function useActiveSection(defaultSection = '#hero') {
  const [activeHash, setActiveHash] = useState('')

  useEffect(() => {
    const update = () => {
      setActiveHash(window.location.hash || defaultSection)
    }
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [defaultSection])

  return activeHash
}
