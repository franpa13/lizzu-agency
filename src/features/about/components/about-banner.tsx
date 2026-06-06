import Image from 'next/image'
import Link  from 'next/link'
import { ShieldCheck, HeartHandshake, Car, Banknote, ChevronRight } from 'lucide-react'
import { BlurFade }    from '@/features/shared/components/ui/blur-fade'
import { TextAnimate } from '@/features/shared/components/ui/text-animate'

const breadcrumb = [
  { label: 'Inicio',    href: '/'          },
  { label: 'Nosotros',  href: '/nosotros'  },
]

const photos = [
  {
    src: '/images/foto1entrega.jpg',
    alt: 'Entrega de Renault Duster a cliente satisfecho — Lizzu Multimarcas Jujuy',
  },
  {
    src: '/images/foto2entrega.jpg',
    alt: 'Entrega de Peugeot 2008 a familia feliz — Lizzu Multimarcas Jujuy',
  },
  {
    src: '/images/foto3entrega.jpg',
    alt: 'Familia recibiendo su Fiat Cronos — Lizzu Multimarcas Jujuy',
  },
  {
    src: '/images/foto4entrega.jpg',
    alt: 'Familia feliz con su Renault Duster — Lizzu Multimarcas Jujuy',
  },
  {
    src: '/images/foto5entrega.jpg',
    alt: 'Entrega de vehículo a clientes de Lizzu — San Salvador de Jujuy',
  },
  {
    src: '/images/foto6entrega.jpg',
    alt: 'Nueva entrega en Lizzu Multimarcas — Concesionaria en Jujuy',
  },
]

const pillars = [
  { Icon: ShieldCheck,    label: 'Confianza y transparencia' },
  { Icon: HeartHandshake, label: 'Atención personalizada'    },
  { Icon: Car,            label: 'Las mejores marcas'        },
  { Icon: Banknote,       label: 'Financiación a tu medida'  },
] as const



export function AboutBanner() {
  return (
    <section
      className="relative w-full overflow-hidden " 
      aria-label="Entregas y financiamiento Lizzu"
    >
      <div className="flex flex-col lg:h-96 lg:flex-row bg-linear-to-br from-lizzu-purple to-lizzu-blue">

        {/* ── LEFT: copy ────────────────────────────────────────────────────── */}
        <div className="relative flex flex-col justify-center px-6 py-6 sm:px-10 lg:h-full lg:w-[44%] lg:py-0">

          {/* top accent line */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-lizzu-blue-glow/40 to-transparent"
            aria-hidden="true"
          />

          {/* breadcrumb */}
          <BlurFade delay={0} direction="up" inView>
            <nav aria-label="Ubicación de página">
              <ol className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-white/40">
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
          </BlurFade>

          {/* headline */}
          <BlurFade delay={0.08} direction="up" inView>
            <h2 className="text-2xl font-black uppercase leading-tight text-lizzu-white sm:text-4xl ">
              El auto de tus sueños{' '}
              <span className="text-lizzu-blue-glow">
                está más cerca de lo que creés
              </span>
            </h2>
          </BlurFade>

          {/* body — animado palabra por palabra */}
          <BlurFade delay={0.16} direction="up" inView>
            <TextAnimate
              as="p"
              animation="blurInUp"
              by="word"
              startOnView
              once
              className="mt-4 max-w-sm text-sm leading-relaxed text-lizzu-silver sm:text-base"
            >
              Acompañamos a cientos de familias jujeñas a encontrar el vehículo ideal, con financiación accesible y atención personalizada.
            </TextAnimate>
          </BlurFade>

          {/* pillars */}
          <BlurFade delay={0.24} direction="up" inView>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3" role="list">
              {pillars.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-sm text-lizzu-silver-light"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </BlurFade>

        

          {/* bottom accent line */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-lizzu-blue-glow/40 to-transparent"
            aria-hidden="true"
          />

          {/* vertical divider desktop */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-linear-to-b from-transparent via-lizzu-blue/30 to-transparent lg:block"
            aria-hidden="true"
          />
        </div>

        {/* ── RIGHT: photo grid ──────────────────────────────────────────────── */}
        <div className="grid flex-1 grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 lg:h-full lg:grid-rows-2">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="group relative aspect-video overflow-hidden lg:aspect-auto"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                quality={90}
              />
            
              {/* cell border */}
              <div
                className="absolute inset-0 border border-white/10"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
