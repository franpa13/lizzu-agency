import { BlurFade } from '@/features/shared/components/ui/blur-fade'
import { BorderBeam } from '@/features/shared/components/ui/border-beam'
import { WHY_US_FEATURES } from '../data/features'

export function WhyUsSection() {
  return (
    <section
      id="nosotros"
      aria-label="Por qué elegir Lizzu"
      className="bg-background dark:bg-lizzu-dark "
    >
      <div className="px-4 sm:px-6 lg:px-8 ">

        {/* Header */}
        <BlurFade inView direction="up">
          <div className="mb-10 text-center sm:mb-14">
            <p className="md:mb-2 text-xs font-semibold uppercase tracking-widest text-lizzu-blue-glow">
              Por qué elegirnos
            </p>
            <h2 className="text-xl font-bold text-foreground sm:text-3xl">
              Una experiencia diferente
            </h2>
            <p className="mx-auto mt-2  text-xs text-muted-foreground sm:text-base">
              Más que vender autos, construimos relaciones de confianza con nuestros clientes.
            </p>

          </div>
        </BlurFade>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 ">
          {WHY_US_FEATURES.map((feature, i) => (
            <BlurFade key={feature.title} inView delay={i * 0.1} direction="up">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-black/30">
                <BorderBeam
                  size={70}
                  duration={8}
                  delay={i * 2}
                  colorFrom="var(--lizzu-blue)"
                  colorTo="var(--lizzu-blue-glow)"
                  borderWidth={1}
                />

                {/* Icon */}
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-lizzu-blue/10 dark:bg-lizzu-blue-glow/15 transition-colors duration-300 group-hover:bg-lizzu-blue/15">
                  <feature.icon
                    className="size-5 text-lizzu-blue-glow"
                    aria-hidden="true"
                  />
                </div>

                {/* Text */}
                <h3 className="mb-2 text-sm font-bold text-foreground sm:text-[0.95rem]">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>

      </div>
    </section>
  )
}
