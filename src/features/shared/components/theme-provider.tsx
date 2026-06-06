'use client'

import { useEffect } from 'react'
import { TooltipProvider } from '@/features/shared/components/ui/tooltip'
import { SidebarProvider } from '@/features/shared/context/sidebar'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    document.documentElement.classList.toggle('dark', stored === 'dark')
  }, [])

  return (
    <SidebarProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </SidebarProvider>
  )
}
