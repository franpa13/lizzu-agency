import { MapPin, Clock, Share2 } from 'lucide-react'
import { BlurFade }   from '@/features/shared/components/ui/blur-fade'
import { BorderBeam } from '@/features/shared/components/ui/border-beam'
import { businessHours } from '@/config/site'

const DAY_NAMES: Record<number, string> = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  0: 'Domingo',
}

const SOCIALS = [
  {
    label: 'Instagram',
    handle: '@lizzu_multimarcas',
    href: 'https://www.instagram.com/lizzu_multimarcas/',
    color: 'text-pink-500 dark:text-pink-400',
  },
  {
    label: 'Facebook',
    handle: 'Lizzu Multimarcas',
    href: 'https://www.facebook.com/profile.php?id=61577826077479',
    color: 'text-blue-500 dark:text-blue-400',
  },
  {
    label: 'TikTok',
    handle: '@lizzujujuy',
    href: 'https://www.tiktok.com/@lizzujujuy',
    color: 'text-foreground dark:text-lizzu-white',
  },
] as const

const MAPS_SRC =
  'https://www.google.com/maps?q=Almirante+Brown+10,+San+Salvador+de+Jujuy,+Jujuy,+Argentina&output=embed&z=16&hl=es'

export function ContactInfo() {
  return (
    <section
      aria-label="Información de contacto y ubicación"
      className="bg-muted/40 px-4 py-16 dark:bg-lizzu-deep/60 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}
        <BlurFade direction="up" inView>
          <div className="text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-lizzu-blue-glow">
              Cómo llegarnos
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground dark:text-lizzu-white sm:text-3xl">
              Encontranos en Jujuy
            </h2>
          </div>
        </BlurFade>

        {/* Info cards */}
        <div className="grid gap-4 sm:grid-cols-3">

          {/* Dirección */}
          <BlurFade delay={0} direction="up" inView>
            <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 dark:border-white/8 dark:bg-lizzu-deep">
              <BorderBeam
                colorFrom="var(--lizzu-blue)"
                colorTo="var(--lizzu-blue-glow)"
                size={60}
                duration={10}
                borderWidth={1}
              />
              <div className="flex size-10 items-center justify-center rounded-xl bg-lizzu-blue/10 dark:bg-lizzu-blue/20">
                <MapPin className="size-5 text-lizzu-blue-glow" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-bold text-foreground dark:text-lizzu-white">
                  Dónde estamos
                </h3>
                <address className="not-italic text-xs leading-relaxed text-muted-foreground dark:text-lizzu-silver">
                  Almirante Brown N°10<br />
                  San Salvador de Jujuy<br />
                  Jujuy, Argentina
                </address>
                <a
                  href="https://maps.google.com/?q=Almirante+Brown+10,+San+Salvador+de+Jujuy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs font-medium text-lizzu-blue-glow underline-offset-2 hover:underline"
                  aria-label="Abrir ubicación en Google Maps"
                >
                  Ver en Google Maps →
                </a>
              </div>
            </div>
          </BlurFade>

          {/* Horarios */}
          <BlurFade delay={0.08} direction="up" inView>
            <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 dark:border-white/8 dark:bg-lizzu-deep">
              <BorderBeam
                colorFrom="var(--lizzu-blue)"
                colorTo="var(--lizzu-blue-glow)"
                size={60}
                duration={10}
                delay={2}
                borderWidth={1}
              />
              <div className="flex size-10 items-center justify-center rounded-xl bg-lizzu-blue/10 dark:bg-lizzu-blue/20">
                <Clock className="size-5 text-lizzu-blue-glow" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-bold text-foreground dark:text-lizzu-white">
                  Horarios de atención
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground dark:text-lizzu-silver">
                  {Object.entries(businessHours).map(([dayIdx, hours]) => {
                    const day = DAY_NAMES[Number(dayIdx)]
                    return (
                      <li key={dayIdx} className="flex justify-between gap-4">
                        <span className="font-medium text-foreground dark:text-lizzu-silver-light">
                          {day}
                        </span>
                        <span>
                          {hours ? `${hours.open} – ${hours.close}` : 'Cerrado'}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </BlurFade>

          {/* Redes sociales */}
          <BlurFade delay={0.16} direction="up" inView>
            <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 dark:border-white/8 dark:bg-lizzu-deep">
              <BorderBeam
                colorFrom="var(--lizzu-blue)"
                colorTo="var(--lizzu-blue-glow)"
                size={60}
                duration={10}
                delay={4}
                borderWidth={1}
              />
              <div className="flex size-10 items-center justify-center rounded-xl bg-lizzu-blue/10 dark:bg-lizzu-blue/20">
                <Share2 className="size-5 text-lizzu-blue-glow" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-3 text-sm font-bold text-foreground dark:text-lizzu-white">
                  Seguinos en redes
                </h3>
                <ul className="space-y-3">
                  {SOCIALS.map(({ label, handle, href, color }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-2"
                        aria-label={`${label} de Lizzu Multimarcas`}
                      >
                        <span className="text-xs font-semibold text-foreground dark:text-lizzu-silver-light">
                          {label}
                        </span>
                        <span className={`text-xs font-medium transition-opacity group-hover:opacity-80 ${color}`}>
                          {handle}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </BlurFade>

        </div>

        {/* Google Maps embed */}
        <BlurFade delay={0.2} direction="up" inView>
          <div className="overflow-hidden rounded-2xl border border-border dark:border-white/8">
            <iframe
              title="Ubicación de Lizzu Multimarcas en San Salvador de Jujuy"
              src={MAPS_SRC}
              width="100%"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
              aria-label="Mapa con la ubicación de Lizzu Multimarcas"
            />
          </div>
        </BlurFade>

      </div>
    </section>
  )
}
