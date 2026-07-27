import { MapPin, Clock, Share2 } from 'lucide-react'
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

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const

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

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lizzu-blue/10 dark:bg-lizzu-blue/20">
        <Icon className="size-5 text-lizzu-blue-glow" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1.5 text-sm font-bold text-foreground dark:text-lizzu-white">
          {title}
        </h3>
        {children}
      </div>
    </div>
  )
}

export function ContactInfo() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 dark:border-white/8 dark:bg-lizzu-deep sm:p-8">
      <BorderBeam
        colorFrom="var(--lizzu-blue)"
        colorTo="var(--lizzu-blue-glow)"
        size={80}
        duration={10}
        borderWidth={1}
      />

      <div className="divide-y divide-border dark:divide-white/8">

        <InfoRow icon={MapPin} title="Dónde estamos">
          <address className="not-italic text-xs leading-relaxed text-muted-foreground dark:text-lizzu-silver">
            Almirante Brown N°10, San Salvador de Jujuy, Jujuy
          </address>
          <a
            href="https://maps.google.com/?q=Almirante+Brown+10,+San+Salvador+de+Jujuy"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs font-medium text-lizzu-blue-glow underline-offset-2 hover:underline"
            aria-label="Abrir ubicación en Google Maps"
          >
            Cómo llegar →
          </a>
        </InfoRow>

        <InfoRow icon={Clock} title="Horarios de atención">
          <ul className="space-y-1 text-xs text-muted-foreground dark:text-lizzu-silver">
            {DAY_ORDER.map(dayIdx => {
              const hours = businessHours[dayIdx]
              return (
                <li key={dayIdx} className="flex justify-between gap-4">
                  <span className="font-medium text-foreground dark:text-lizzu-silver-light">
                    {DAY_NAMES[dayIdx]}
                  </span>
                  <span>
                    {hours ? `${hours.open} – ${hours.close}` : 'Cerrado'}
                  </span>
                </li>
              )
            })}
          </ul>
        </InfoRow>

        <InfoRow icon={Share2} title="Seguinos en redes">
          <ul className="space-y-2.5">
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
        </InfoRow>

      </div>
    </div>
  )
}
