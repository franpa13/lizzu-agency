import { BlurFade } from '@/features/shared/components/ui/blur-fade'
import { TextAnimate } from '@/features/shared/components/ui/text-animate'
import { ContactForm } from '@/features/contact/components/contact-form'
import { ContactInfo } from '@/features/contact/components/contact-info'

const MAPS_SRC =
  'https://www.google.com/maps?q=Almirante+Brown+10,+San+Salvador+de+Jujuy,+Jujuy,+Argentina&output=embed&z=16&hl=es'

export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-label="Formulario de contacto y ubicación"
      className="bg-background px-4 py-16 dark:bg-lizzu-dark sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <BlurFade direction="up" inView>
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-lizzu-blue-glow">
              Contacto
            </p>
            <TextAnimate
              as="h2"
              animation="blurInUp"
              by="word"
              startOnView
              once
              className="text-2xl font-extrabold tracking-tight text-foreground dark:text-lizzu-white sm:text-3xl"
            >
              Hablemos de tu próximo auto
            </TextAnimate>
            <p className="mx-auto mt-2 text-sm text-muted-foreground dark:text-lizzu-silver sm:text-base">
              Completá el formulario o visitanos en Almirante Brown N°10. Respondemos por WhatsApp a la brevedad.
            </p>
          </div>
        </BlurFade>

        {/* Form + info, un solo bloque compuesto */}
        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-10">

          <BlurFade delay={0.05} direction="up" inView>
            <ContactForm />
          </BlurFade>

          {/* Línea cromada — divisor de mostrador, eco del banner */}
          <div
            aria-hidden="true"
            className="hidden lg:block"
            style={{
              backgroundImage:
                'linear-gradient(180deg, transparent 0%, var(--border) 15%, var(--border) 85%, transparent 100%)',
            }}
          />

          <BlurFade delay={0.1} direction="up" inView>
            <ContactInfo />
          </BlurFade>

        </div>

        {/* Mapa — a todo el ancho, debajo de las dos columnas */}
        <BlurFade delay={0.15} direction="up" inView>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border dark:border-white/8">
            <iframe
              title="Ubicación de Lizzu Multimarcas en San Salvador de Jujuy"
              src={MAPS_SRC}
              width="100%"
              height="340"
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
