'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type SidebarCtx = { isOpen: boolean; setIsOpen: (v: boolean) => void }

const SidebarContext = createContext<SidebarCtx>({ isOpen: false, setIsOpen: () => {} })

export const useSidebar = () => useContext(SidebarContext)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>
}
