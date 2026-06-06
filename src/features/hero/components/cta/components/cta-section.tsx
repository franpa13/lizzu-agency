import { MessageCircle, Phone, ShieldCheck, ArrowRight } from 'lucide-react'
import { BlurFade } from '@/features/shared/components/ui/blur-fade'
import { AnimatedGradientText } from '@/features/shared/components/ui/animated-gradient-text'
import { getWhatsAppUrl } from '@/features/shared/utils/whatsapp'
import { siteConfig } from '@/config/site'
import { WhatsAppIcon } from '@/features/shared/icons/wpp'
import { cn } from '@/lib/utils'
import { Button } from '@/features/shared/components/ui/button'
import Link from 'next/link'

const BENEFITS = [
  'Respuesta rápida',
  'Asesoramiento personalizado',
  'Sin compromiso',
]

export function CtaSection() {
  const waUrl = getWhatsAppUrl('Hola Lizzu! Quiero asesoramiento para encontrar el auto ideal.')

  return (
    <section
      id="contacto"
      aria-label="Contacto y asesoramiento personalizado"

    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade inView direction="up">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md dark:shadow-black/30">

            {/* Ambient glow orbs */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <div className="absolute -right-28 -top-28 size-80 rounded-full bg-lizzu-blue/10 blur-[72px] dark:bg-lizzu-blue/18" />
              <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-lizzu-blue-glow/8 blur-[60px] dark:bg-lizzu-blue-glow/14" />
            </div>

            {/* Periodic shimmer sweep */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <div className="absolute inset-y-0 w-2/5 bg-linear-to-r from-transparent via-white/[0.05] to-transparent [animation:card-shimmer_6s_ease-in-out_infinite]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* ── Left ─────────────────────────────────────── */}
              <div className="flex flex-col justify-center gap-6 p-8 sm:p-10">

                {/* Badge */}
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1">
                  <MessageCircle className="size-3.5 shrink-0 text-lizzu-blue-glow" aria-hidden />
                  <AnimatedGradientText
                    colorFrom="var(--lizzu-blue)"
                    colorTo="var(--lizzu-blue-glow)"
                    className="text-xs font-semibold"
                  >
                    Te ayudamos a encontrarlo
                  </AnimatedGradientText>
                </div>

                {/* Headline */}
                <div>
                  <h2 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl lg:text-[2.1rem]">
                    ¿No viste el auto
                    <br className="hidden sm:block" /> que buscás?
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Contanos qué modelo tenés en mente y te ayudamos a encontrar una opción que se adapte a tu presupuesto, tus necesidades y tu forma de compra.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/contacto">
                    <Button> Quiero asesoramiento <ArrowRight className="relative size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" aria-hidden /></Button>
                  </Link>

                  <Link href="/catalogo">
                    <Button variant="outline">

                      Ver stock disponible
                    </Button>
                  </Link>


                </div>
              </div>

              {/* ── Right ────────────────────────────────────── */}
              <div className="flex flex-col justify-center gap-6 border-t border-border/60 p-8 sm:p-10 lg:border-l lg:border-t-0">

                {/* Contact */}
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-lizzu-blue/10 dark:bg-lizzu-blue-glow/15">
                    {siteConfig.phone ? (
                      <Phone className="size-5 text-lizzu-blue-glow" aria-hidden />
                    ) : (
                      <WhatsAppIcon className="size-5 text-lizzu-blue-glow" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Atención directa</p>
                    {siteConfig.phone ? (
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="text-xl font-bold text-foreground transition-colors hover:text-lizzu-blue-glow"
                      >
                        {siteConfig.phone}
                      </a>
                    ) : (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-foreground transition-colors hover:text-lizzu-blue-glow"
                      >
                        Escribinos por WhatsApp
                      </a>
                    )}
                  </div>
                </div>

                {/* Benefits */}
                <ul className="flex flex-col gap-2.5" aria-label="Beneficios del asesoramiento">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <ShieldCheck className="size-4 shrink-0 text-lizzu-blue-glow" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Note */}
                <div className="rounded-xl border border-border/50 bg-background/70 px-4 py-3">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    También podés escribirnos para consultar financiación, permuta o disponibilidad.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
