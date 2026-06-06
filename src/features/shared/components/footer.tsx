"use client"
import { useEffect, useState } from 'react'
import { siteConfig, businessHours } from '@/config/site'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ShimmerButton } from './ui/shimmer-button'
import { NAV_LINKS } from '@/features/shared/constants/navigation'
import { getWhatsAppUrl } from '@/features/shared/utils/whatsapp'
import { useActiveSection } from '@/features/shared/hooks/use-active-section'
import { WhatsAppIcon } from '@/features/shared/icons/wpp'
import { InstagramIcon, FacebookIcon, TikTokIcon } from '@/features/shared/icons/social'

const DAY_NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

function parseMinutes(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function getBusinessStatus() {
  const now = new Date()
  const day = now.getDay()
  const cur = now.getHours() * 60 + now.getMinutes()
  const today = businessHours[day]

  if (today && cur >= parseMinutes(today.open) && cur < parseMinutes(today.close)) {
    return { isOpen: true, label: `Abierto · cierra a las ${today.close}` }
  }

  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7
    const h = businessHours[next]
    if (h) {
      const when = i === 1 ? 'mañana' : `el ${DAY_NAMES[next]}`
      return { isOpen: false, label: `Cerrado · abre ${when} a las ${h.open}` }
    }
  }
  return { isOpen: false, label: 'Cerrado' }
}

function BusinessStatus() {
  const [status, setStatus] = useState<{ isOpen: boolean; label: string } | null>(null)

  useEffect(() => {
    setStatus(getBusinessStatus())
    const id = setInterval(() => setStatus(getBusinessStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (!status) return null

  return (
    <div className='flex items-center gap-1.5'>
      <span className={cn(
        'size-1.5 shrink-0 rounded-full',
        status.isOpen
          ? 'bg-emerald-500 shadow-[0_0_5px_1px_oklch(0.72_0.19_162/0.5)]'
          : 'bg-lizzu-steel/50'
      )} />
      <span className={cn(
        'text-xs',
        status.isOpen
          ? 'text-emerald-600 dark:text-emerald-400'
          : 'text-lizzu-dark/50 dark:text-lizzu-silver/60'
      )}>
        {status.label}
      </span>
    </div>
  )
}

export function Footer() {
  const whatsappUrl = getWhatsAppUrl()
  const activeHash = useActiveSection('#hero')
  const year = new Date().getFullYear()

  return (
    <footer className='border-t border-lizzu-steel/20 bg-linear-to-b from-slate-100 to-white dark:from-lizzu-black dark:via-lizzu-dark dark:to-lizzu-black'>
      <div className='py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='grid grid-cols-2 gap-6  sm:grid-cols-3 lg:grid-cols-5'>

          {/* Brand Section */}
          <div className='col-span-2 sm:col-span-1 space-y-3'>
            <Link href='/' className='flex flex-col leading-none select-none shrink-0'>
              <Image src="/images/logo-white.png" alt="Lizzu Logo" width={60} height={64} className='w-1/4 dark:hidden' />
              <Image src="/images/logo-black.png" alt="Lizzu Logo" width={60} height={64} className='w-1/4 hidden dark:block' />
            </Link>
            <BusinessStatus />
            <div className='flex gap-2'>
              {siteConfig.social.instagram && (
                <SocialLink
                  href={siteConfig.social.instagram}
                  label='Instagram de Lizzu'
                >
                  <InstagramIcon />
                </SocialLink>
              )}
              {siteConfig.social.facebook && (
                <SocialLink
                  href={siteConfig.social.facebook}
                  label='Facebook de Lizzu'
                >
                  <FacebookIcon />
                </SocialLink>
              )}
              {siteConfig.social.tiktok && (
                <SocialLink
                  href={siteConfig.social.tiktok}
                  label='TikTok de Lizzu'
                >
                  <TikTokIcon />
                </SocialLink>
              )}
              <SocialLink href={whatsappUrl} label='WhatsApp de Lizzu'>
                <WhatsAppIcon />
              </SocialLink>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label='Navegación del footer' className='space-y-2'>
            <h3 className='text-xs font-semibold tracking-wider text-lizzu-dark/50 dark:text-lizzu-silver uppercase'>Menu</h3>
            <ul className='flex flex-col gap-1.5'>
              {NAV_LINKS.map((link) => {
                const isActive = activeHash === link.href
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'relative inline-block py-0.5 text-xs font-semibold transition-colors duration-200',
                        isActive
                          ? 'text-lizzu-blue-glow'
                          : 'text-lizzu-dark/60 dark:text-lizzu-silver-light hover:text-lizzu-blue-glow',
                      )}
                    >
                      {link.label}
                      <span className={cn(
                        'absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-lizzu-blue-glow transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                      )} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Contact Section */}
          <address className='not-italic space-y-2'>
            <h3 className='text-xs font-semibold tracking-wider text-lizzu-dark/50 dark:text-lizzu-silver uppercase'>Ubicación</h3>
            <p className='flex items-start gap-1.5 text-xs text-lizzu-dark/60 dark:text-lizzu-silver-light leading-snug'>
              <LocationIcon />
              <span>
                {siteConfig.address.street && `${siteConfig.address.street}, `}
                {siteConfig.address.city}, {siteConfig.address.province}
              </span>
            </p>
          </address>

          {/* Contact Info */}
          <div className='space-y-2'>
            <h3 className='text-xs font-semibold tracking-wider text-lizzu-dark/50 dark:text-lizzu-silver uppercase'>Contacto</h3>
            <div className='flex flex-col gap-1.5'>
              {siteConfig.whatsapp && (
                <a
                  href={whatsappUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1.5 text-xs text-lizzu-dark/60 dark:text-lizzu-silver-light transition-colors duration-200 hover:text-lizzu-blue-glow'
                >
                  <WhatsAppIcon />
                  <span>{siteConfig.whatsapp}</span>
                </a>
              )}
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className='flex items-center gap-1.5 text-xs text-lizzu-dark/60 dark:text-lizzu-silver-light transition-colors duration-200 hover:text-lizzu-blue-glow'
                >
                  <EmailIcon />
                  <span className='truncate'>{siteConfig.email}</span>
                </a>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className='col-span-2 sm:col-span-1 flex flex-col items-start gap-2'>
            <h3 className='text-xs font-semibold tracking-wider text-lizzu-dark/50 dark:text-lizzu-silver uppercase'>Consulta</h3>
            <ShimmerButton
              aria-label='Consultar por WhatsApp'
              className='h-8 px-3 text-xs'
              onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
            >
              <WhatsAppIcon />
              Consultar por WhatsApp
            </ShimmerButton>
          </div>
        </div>

        {/* Divider */}
        <div className='mt-3 border-t border-lizzu-steel/10' />

        {/* Copyright */}
        <div className='flex flex-col items-center justify-center gap-1 py-2'>
          <p className='text-[10px] text-lizzu-dark/50 dark:text-lizzu-silver/70'>
            © {year} {siteConfig.fullName} — Jujuy, Argentina
          </p>
          <p className='text-[9px] text-lizzu-dark/40 dark:text-lizzu-silver/50'>
            Agencia de autos usados multimarcas
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      className='flex size-7 items-center justify-center rounded-md border border-lizzu-steel/30 text-lizzu-dark/50 dark:text-lizzu-silver transition-all duration-200 hover:border-lizzu-blue-glow hover:bg-lizzu-blue/10 hover:text-lizzu-blue-glow'
    >
      {children}
    </a>
  )
}

function LocationIcon() {
  return (
    <svg className='mt-0.5 size-4 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className='size-4 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
    </svg>
  )
}
