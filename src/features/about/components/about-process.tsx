import { MessageCircle, Car, Banknote, KeyRound } from 'lucide-react'
import { BlurFade } from '@/features/shared/components/ui/blur-fade'
import { TextAnimate } from '@/features/shared/components/ui/text-animate'

const STEPS = [
  {
    icon: MessageCircle,
    title: 'Nos escribís por WhatsApp',
    description: 'Contanos qué auto buscás, tu presupuesto y forma de pago.',
  },
  {
    icon: Car,
    title: 'Ves y probás el auto',
    description: 'Coordinamos una visita a la agencia para que lo revises y lo pruebes vos mismo.',
  },
  {
    icon: Banknote,
    title: 'Armamos la financiación',
    description: 'Te asesoramos con la opción de pago que mejor se adapte a vos.',
  },
  {
    icon: KeyRound,
    title: 'Retirás tu auto',
    description: 'Entrega con toda la documentación en regla y garantía incluida.',
  },
] as const

export function AboutProcess() {
  return (
    <section
      aria-label="Cómo comprar tu auto con Lizzu"
      className="bg-muted/40 px-4 py-16 dark:bg-lizzu-deep/60 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <BlurFade direction="up" inView>
          <div className="text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-lizzu-blue-glow">
              Cómo comprar
            </p>
            <TextAnimate
              as="h2"
              animation="blurInUp"
              by="word"
              startOnView
              once
              className="text-2xl font-extrabold tracking-tight text-foreground dark:text-lizzu-white sm:text-3xl"
            >
              Así es comprar tu auto con nosotros
            </TextAnimate>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground dark:text-lizzu-silver sm:text-base">
              Sin vueltas ni letra chica: cuatro pasos, del primer mensaje a las llaves en tu mano.
            </p>
          </div>
        </BlurFade>

        {/* Steps */}
        <div className="relative mt-12 sm:mt-16">

          {/* Línea conectora — solo desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-border lg:block dark:bg-white/10"
          />

          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-6">
            {STEPS.map(({ icon: Icon, title, description }, i) => (
              <BlurFade key={title} delay={i * 0.1} direction="up" inView>
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-lizzu-blue-glow bg-card dark:bg-lizzu-deep">
                    <Icon className="size-6 text-lizzu-blue-glow" aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-lizzu-blue-glow text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-foreground dark:text-lizzu-white">
                    {title}
                  </h3>
                  <p className="mt-1.5 max-w-[230px] text-xs leading-relaxed text-muted-foreground dark:text-lizzu-silver/70">
                    {description}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
