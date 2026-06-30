import Image from 'next/image'
import Link  from 'next/link'
import { MessageCircle, MapPin, Clock, AtSign, ChevronRight } from 'lucide-react'
import { BlurFade }    from '@/features/shared/components/ui/blur-fade'
import { TextAnimate } from '@/features/shared/components/ui/text-animate'

const breadcrumb = [
  { label: 'Inicio',   href: '/'          },
  { label: 'Contacto', href: '/contacto'  },
]

const pillars = [
  { Icon: MessageCircle, label: 'WhatsApp: +54 9 3884 34-4543' },
  { Icon: MapPin,        label: 'Almirante Brown N°10, Jujuy'  },
  { Icon: Clock,         label: 'Lun–Vie 9–21 h · Sáb 9–21 h*' },
  { Icon: AtSign,        label: '@lizzu_multimarcas'            },
] as const

export function ContactBanner() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Contacto Lizzu Multimarcas"
    >
      <div className="flex flex-col lg:h-96 lg:flex-row bg-lizzu-navy">

        {/* Dot texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* ── Breadcrumb — siempre en la misma posición ─────────────────────── */}
        <nav aria-label="Ubicación de página" className="absolute left-6 top-6 z-10 sm:left-10">
          <ol className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/40">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="size-3 shrink-0 text-white/25" aria-hidden="true" />
                )}
                {i < breadcrumb.length - 1 ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white/70">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-white/70">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* ── LEFT: copy ────────────────────────────────────────────────────── */}
        <div className="relative flex flex-col justify-center px-6 pt-16 pb-6 sm:px-10 lg:h-full lg:pb-0 lg:pt-0 lg:w-1/2 lg:py-0">

          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-lizzu-blue-glow/40 to-transparent"
            aria-hidden="true"
          />

          <BlurFade delay={0.08} direction="up" inView>
            <h2 className="text-lg md:text-2xl font-black uppercase leading-tight text-lizzu-white ">
              Estamos para{' '}
              <span className="text-lizzu-blue-glow">ayudarte</span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.16} direction="up" inView>
            <TextAnimate
              as="p"
              animation="blurInUp"
              by="word"
              startOnView
              once
              className="mt-3 max-w-sm text-sm leading-relaxed text-lizzu-silver"
            >
              Escribinos por WhatsApp, visitanos en nuestra agencia o seguinos en redes. Respondemos todas las consultas con atención personalizada.
            </TextAnimate>
          </BlurFade>

          <BlurFade delay={0.24} direction="up" inView>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5" role="list">
              {pillars.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-xs text-lizzu-silver-light sm:text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </BlurFade>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-lizzu-blue-glow/40 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-linear-to-b from-transparent via-lizzu-blue/30 to-transparent lg:block"
            aria-hidden="true"
          />
        </div>

        {/* ── RIGHT: single image ───────────────────────────────────────────── */}
        <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:flex-1 lg:h-full">
          <Image
            src="/images/contacto1.png"
            alt="Asesor de Lizzu Multimarcas atendiendo a un cliente en la agencia de San Salvador de Jujuy"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {/* gradient fade toward the copy panel */}
          <div
            className="absolute inset-0 bg-linear-to-r from-lizzu-navy/60 via-transparent to-transparent lg:block hidden"
            aria-hidden="true"
          />
        </div>

      </div>
    </section>
  )
}
