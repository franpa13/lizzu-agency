'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/features/shared/context/sidebar'
import { ThemeToggle } from '@/features/shared/components/theme-toggle'
import { WhatsAppButton } from '@/features/shared/components/whatsapp-button'
import { useActiveSection } from '@/features/shared/hooks/use-active-section'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/features/shared/constants/navigation'

export function Header() {
  const { isOpen, setIsOpen } = useSidebar()
  const pathname = usePathname()
  const activeHash = useActiveSection('#hero')

  function isActive(href: string): boolean {
    if (href.includes('#')) {
      // /#section links — only active on homepage
      return pathname === '/' && activeHash === '#' + href.split('#')[1]
    }
    if (href === '/') return pathname === '/' && activeHash === '#hero'
    return pathname === href || pathname.startsWith(href + '/')
  }

  /* lock body scroll while sidebar is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header className='sticky top-0 z-30 w-full border-b border-lizzu-steel/40 bg-linear-to-b from-slate-100/95 to-white/90 dark:from-lizzu-black/95 dark:via-lizzu-dark/95 dark:to-lizzu-dark/90 backdrop-blur-xl transition-colors duration-300'>
        <div className='flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8'>

          {/* Logo + nav — izquierda */}
          <div className='flex items-center gap-8'>
            <Link href='/' className='flex flex-col leading-none select-none shrink-0'>
              <Image src="/images/logo-white.png" alt="Lizzu Logo" width={60} height={64} className='w-4/5 md:w-auto dark:hidden' />
              <Image src="/images/logo-black.png" alt="Lizzu Logo" width={60} height={64} className='w-4/5 md:w-auto hidden dark:block' />
            </Link>

            {/* Desktop nav — junto al logo */}
            <nav aria-label='Navegación principal' className='hidden items-center gap-8 md:flex'>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative py-1 text-sm font-semibold transition-colors duration-200',
                      active
                        ? 'text-lizzu-blue-glow'
                        : 'text-muted-foreground hover:text-lizzu-blue-glow',
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-lizzu-blue-glow transition-transform duration-300',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Desktop right: toggle + CTA */}
          <div className='hidden items-center justify-end gap-3 md:flex'>
            <WhatsAppButton className='h-8 px-3 text-xs' />
            <ThemeToggle className='h-8 px-1 ' />
          </div>

          {/* Mobile: solo hamburger */}
          <div className='col-start-3 flex items-center justify-end md:hidden'>
            
              <Menu    onClick={() => setIsOpen(true)} className='w-full'/>
            
          </div>
        </div>
      </header>

      {/* ── Mobile sidebar (fuera del header para evitar stacking context) ──── */}

      {/* Backdrop */}
      <div
        aria-hidden='true'
        onClick={() => setIsOpen(false)}
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Panel */}
      <aside
        id='mobile-sidebar'
        aria-label='Menú móvil'
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-lizzu-steel/20 bg-background shadow-2xl transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Sidebar header */}
        <div className='flex  shrink-0 items-center justify-end   p-2.5'>

          <button
            type='button'
            onClick={() => setIsOpen(false)}
            aria-label='Cerrar menú'
            className=''
          >
            <X />
          </button>
        </div>
        <div className=' border-t border-border' />
        {/* Nav links */}
        <nav aria-label='Navegación' className='flex flex-col py-2'>
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center justify-between px-2.5 py-3.5 text-sm transition-colors',
                  active
                    ? 'bg-lizzu-navy/10 dark:bg-lizzu-blue/10 font-medium text-lizzu-blue-glow'
                    : 'text-muted-foreground hover:bg-muted hover:text-lizzu-blue',
                )}
              >
                {link.label}
                {active && (
                  <span className='size-1.5 rounded-full bg-lizzu-blue-glow' aria-hidden='true' />
                )}
              </Link>
            )
          })}
        </nav>

        <div className=' border-t border-border' />

        {/* WhatsApp CTA */}
        <div className='mt-auto flex items-center justify-between mb-3 p-2.5'>
          <WhatsAppButton
            className='h-9 px-4 text-sm'
            onAfterClick={() => setIsOpen(false)}
          />
          {/* Theme toggle row */}
          <ThemeToggle />
        </div>
      </aside>
    </>
  )
}
