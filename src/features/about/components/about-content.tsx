import { ShieldCheck, Handshake, Star, FileCheck, BadgeCheck } from 'lucide-react'
import { BlurFade }    from '@/features/shared/components/ui/blur-fade'
import { TextAnimate } from '@/features/shared/components/ui/text-animate'
import { BorderBeam }  from '@/features/shared/components/ui/border-beam'

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Confianza',
    description: 'Trabajamos con transparencia y honestidad en cada operación.',
  },
  {
    icon: Handshake,
    title: 'Responsabilidad',
    description: 'Cumplimos lo que prometemos, antes, durante y después de la compra.',
  },
  {
    icon: Star,
    title: 'Atención cercana',
    description: 'Acompañamos a cada cliente con dedicación y trato personalizado.',
  },
  {
    icon: FileCheck,
    title: 'Servicio integral',
    description: 'Seguros, financiación y gestión automotor todo en un solo lugar.',
  },
] as const

export function AboutContent() {
  return (
    <section
      aria-label="Comprometidos con cada cliente"
      className="bg-background px-4 py-16 dark:bg-lizzu-dark   sm:px-10 "
    >
      
        <div className=" gap-10 flex flex-col md:flex-row justify-between items-center lg:gap-16">

          {/* ── Main copy ──────────────────────────────────────────────────── */}
          <BlurFade delay={0} direction="up" inView>
            <div className="flex flex-col gap-6">

              <div className="flex items-center gap-3">
                <BadgeCheck
                  className="mt-0.5 h-8 w-8 shrink-0 text-primary dark:text-lizzu-blue-glow"
                  aria-hidden="true"
                />
                <TextAnimate
                  as="h2"
                  animation="blurInUp"
                  by="word"
                  startOnView
                  once
                  className="text-2xl font-extrabold leading-snug tracking-tight text-foreground dark:text-lizzu-white sm:text-3xl"
                >
                  Comprometidos con cada cliente
                </TextAnimate>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground dark:text-lizzu-silver/80 sm:text-base">
                Somos una empresa comprometida con nuestros clientes, ofreciendo vehículos
                seleccionados, asesoramiento personalizado y diferentes opciones de financiación
                adaptadas a cada necesidad. Nuestro objetivo principal es que cada persona
                encuentre el auto ideal con seguridad y tranquilidad.
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground dark:text-lizzu-silver/80 sm:text-base">
                Trabajamos día a día para construir relaciones basadas en la confianza, la
                responsabilidad y la atención cercana, acompañando a cada cliente antes,
                durante y después de su compra.
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground dark:text-lizzu-silver/80 sm:text-base">
                Además, contamos con asesoramiento en seguros, financiación y gestión
                automotor, brindando un servicio integral para que nuestros clientes tengan
                todo en un solo lugar.
              </p>

            </div>
          </BlurFade>

          {/* ── Values grid ──────────────────────────────────────────────── */}
          <BlurFade delay={0.15} direction="up" inView>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list">
              {VALUES.map(({ icon: Icon, title, description }, i) => (
                <BlurFade key={title} delay={0.2 + i * 0.08} direction="up" inView>
                  <li className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-5 dark:border-white/8 dark:bg-lizzu-deep">
                    <BorderBeam
                      size={60}
                      duration={10}
                      delay={i * 2}
                      colorFrom="var(--lizzu-blue)"
                      colorTo="var(--lizzu-blue-glow)"
                      borderWidth={1}
                    />
                    <div className="flex size-10 items-center justify-center rounded-xl bg-secondary dark:bg-lizzu-navy/60">
                      <Icon
                        className="size-5 text-primary dark:text-lizzu-blue-glow"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm font-bold text-foreground dark:text-lizzu-white">
                      {title}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground dark:text-lizzu-silver/65">
                      {description}
                    </p>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </BlurFade>

        </div>
      
    </section>
  )
}
