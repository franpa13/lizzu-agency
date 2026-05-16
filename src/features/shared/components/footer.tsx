import { siteConfig } from '@/config/site'

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

export function Footer() {
  const whatsappUrl = getWhatsAppUrl()
  const year = new Date().getFullYear()

  return (
    <footer className='border-t border-border bg-card'>
      <div className='mx-auto px-4 py-14 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3'>

          {/* Brand */}
          <div className='space-y-5'>
            <div>
              <p className='text-xl font-bold tracking-[0.2em] text-foreground'>LIZZU</p>
              <p className='text-[9px] font-medium tracking-[0.35em] text-muted-foreground'>MULTIMARCAS</p>
            </div>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              Agencia de autos usados en San Salvador de Jujuy. Vehículos seleccionados con atención personalizada.
            </p>
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
              <SocialLink href={whatsappUrl} label='WhatsApp de Lizzu'>
                <WhatsAppIcon />
              </SocialLink>
            </div>
          </div>

          {/* Nav */}
          <div className='space-y-5'>
            <h2 className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
              Navegación
            </h2>
            <nav aria-label='Navegación del footer'>
              <ul className='flex flex-col gap-2'>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className='space-y-5'>
            <h2 className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
              Contacto
            </h2>
            <address className='not-italic space-y-3'>
              <p className='flex items-start gap-2 text-sm text-muted-foreground'>
                <LocationIcon />
                <span>
                  {siteConfig.address.street ? `${siteConfig.address.street}, ` : ''}
                  {siteConfig.address.city}, {siteConfig.address.province}
                </span>
              </p>
              {siteConfig.whatsapp && (
                <a
                  href={whatsappUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-lizzu-glow'
                >
                  <WhatsAppIcon />
                  <span>{siteConfig.whatsapp}</span>
                </a>
              )}
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className='flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
                >
                  <EmailIcon />
                  <span>{siteConfig.email}</span>
                </a>
              )}
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row'>
          <p className='text-xs text-muted-foreground/70'>
            © {year} {siteConfig.fullName}. Todos los derechos reservados.
          </p>
          <p className='text-xs text-muted-foreground/70'>
            {siteConfig.address.city}, {siteConfig.address.province}, {siteConfig.address.country}
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
      className='flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-lizzu-violet hover:text-lizzu-glow'
    >
      {children}
    </a>
  )
}

function WhatsAppIcon() {
  return (
    <svg className='size-4 shrink-0' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className='size-4' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
      <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className='size-4' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
      <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
    </svg>
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
