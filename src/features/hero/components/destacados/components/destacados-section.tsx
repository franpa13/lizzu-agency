'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/features/shared/components/ui/carousel'
import { BlurFade } from '@/features/shared/components/ui/blur-fade'
import { CardCar } from '@/features/shared/components/card-car'

import { cn } from '@/lib/utils'
import { FEATURED_CARS } from '../data/destacados'
import { getWhatsAppUrl } from '@/features/shared/utils/whatsapp'

export function DestacadosSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  // Auto-play
  useEffect(() => {
    if (!api) return
    const id = setInterval(() => api.scrollNext(), 5000)
    return () => clearInterval(id)
  }, [api])

  const waUrl = getWhatsAppUrl('Hola Lizzu! Quisiera ver más vehículos disponibles.')

  return (
    <section
      id="catalogo"
      aria-label="Vehículos destacados disponibles en Lizzu Jujuy"
      className='bg-blue-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 dark:bg-lizzu-black'
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <div >
        <BlurFade inView direction="up" className="mb-8 sm:mb-10">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>

              <p className="md:mb-2 text-xs font-semibold uppercase tracking-widest text-lizzu-blue-glow">
                Catálogo
              </p>
              <h2 className="text-xl font-bold text-foreground sm:text-3xl">
                Vehículos destacados
              </h2>
              <p className="mx-auto mt-2  text-xs text-muted-foreground sm:text-base">
                Autos 0km y usados seleccionados para vos en Jujuy. Todos con financiación.
              </p>

            </div>

            {/* Desktop CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 text-sm font-semibold text-lizzu-blue-glow hover:text-lizzu-blue transition-colors sm:inline-flex shrink-0"
            >
              Ver todos
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </BlurFade>
      </div>

      {/* ── Carousel ────────────────────────────────────────────── */}
      <div >
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: 'start' }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {FEATURED_CARS.map((car, i) => (
              <CarouselItem
                key={car.id}
                className="basis-full pl-4 sm:basis-[50%] lg:basis-[25%]"
              >
                <BlurFade inView delay={i * 0.06} direction="up">
                  <CardCar {...car} priority={i === 0} />
                </BlurFade>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation arrows — desktop only */}
          <CarouselPrevious className="hidden -left-5 sm:flex" />
          <CarouselNext className="hidden -right-5 sm:flex" />
        </Carousel>

        {/* ── Dots ──────────────────────────────────────────────── */}
        <div
          className="mt-6 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Navegación del carrusel"
        >
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Ir al vehículo ${i + 1}`}
              aria-selected={i === current}
              onClick={() => api?.scrollTo(i)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={cn(
                  'block rounded-full transition-all duration-300',
                  i === current
                    ? 'h-2 w-6 bg-lizzu-blue-glow'
                    : 'h-2 w-2 bg-border',
                )}
              />
            </button>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-2 md:mt-8 flex justify-center sm:hidden">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-lizzu-blue-glow"
          >
            Ver todos los vehículos
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
