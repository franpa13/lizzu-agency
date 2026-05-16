'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { ThemeToggle } from '@/features/shared/components/theme-toggle'
import { useActiveSection } from '@/features/shared/hooks/use-active-section'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const WA_MESSAGE = encodeURIComponent('Hola Lizzu, quiero consultar por un vehículo.')

function getWhatsAppUrl() {
  if (!siteConfig.whatsapp) return '#contacto'
  return `https://wa.me/549${siteConfig.whatsapp}?text=${WA_MESSAGE}`
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const activeHash = useActiveSection('#hero')
  const whatsappUrl = getWhatsAppUrl()

  /* lock body scroll while sidebar is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header className='sticky top-0 z-30 w-full border-b border-border/50 bg-background/80 backdrop-blur-md transition-colors duration-300'>
        <div className='mx-auto grid h-16 grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8'>

          {/* Logo — izquierda */}
          <Link href='/' className='flex flex-col justify-self-start leading-none select-none'>
            <span className='text-xl font-bold tracking-[0.2em] text-foreground'>LIZZU</span>
            <span className='text-[9px] font-medium tracking-[0.35em] text-muted-foreground'>MULTIMARCAS</span>
          </Link>

          {/* Desktop nav — centro */}
          <nav aria-label='Navegación principal' className='hidden items-center gap-8 md:flex'>
            {NAV_LINKS.map((link) => {
              const isActive = activeHash === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative py-1 text-sm transition-colors duration-200',
                    isActive ? 'text-lizzu-violet' : 'text-muted-foreground hover:text-lizzu-violet',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-lizzu-violet transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              )
            })}
          </nav>

          {/* Desktop right: toggle + CTA */}
          <div className='hidden items-center justify-end gap-3 md:flex'>
            <ThemeToggle />
            <ShimmerButton
              aria-label='Consultar por WhatsApp'
              className='h-9 px-4 text-sm'
              onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
            >
              <WhatsAppIcon />
              Consultar por WhatsApp
            </ShimmerButton>
          </div>

          {/* Mobile: solo hamburger */}
          <div className='flex w-full items-center justify-end md:hidden'>
            <button
              type='button'
              onClick={() => setIsOpen(true)}
              aria-label='Abrir menú'
              aria-expanded={isOpen}
              aria-controls='mobile-sidebar'
              className='flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground'
            >
              <MenuIcon />
            </button>
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
          'fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Sidebar header */}
        <div className='flex h-16 shrink-0 items-center justify-between border-b border-border px-5'>
          <div className='flex flex-col leading-none'>
            <span className='text-lg font-bold tracking-[0.2em] text-foreground'>LIZZU</span>
            <span className='text-[9px] font-medium tracking-[0.35em] text-muted-foreground'>MULTIMARCAS</span>
          </div>
          <button
            type='button'
            onClick={() => setIsOpen(false)}
            aria-label='Cerrar menú'
            className='flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
          >
            <XIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label='Navegación' className='flex flex-col py-2'>
          {NAV_LINKS.map((link) => {
            const isActive = activeHash === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center justify-between px-5 py-3.5 text-sm transition-colors',
                  isActive
                    ? 'bg-accent/50 font-medium text-lizzu-violet'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {link.label}
                {isActive && (
                  <span className='size-1.5 rounded-full bg-lizzu-violet' aria-hidden='true' />
                )}
              </a>
            )
          })}
        </nav>

        <div className='mx-5 border-t border-border' />

        {/* Theme toggle row */}
        <div className='flex items-center justify-between px-5 py-4'>
          <span className='text-sm text-muted-foreground'>Apariencia</span>
          <ThemeToggle />
        </div>

        <div className='mx-5 border-t border-border' />

        {/* WhatsApp CTA */}
        <div className='mt-auto px-5 pb-8 pt-5'>
          <ShimmerButton
            aria-label='Consultar por WhatsApp'
            className='w-full justify-center py-3 text-sm'
            onClick={() => {
              window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
              setIsOpen(false)
            }}
          >
            <WhatsAppIcon />
            Consultar por WhatsApp
          </ShimmerButton>
        </div>
      </aside>
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg className='size-4 shrink-0' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg className='size-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className='size-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
    </svg>
  )
}
