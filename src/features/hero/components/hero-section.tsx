'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/features/shared/components/ui/carousel'
import { cn } from '@/lib/utils'
import { HERO_SLIDES } from '../data/slides'

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  useEffect(() => {
    if (!api) return
    const id = setInterval(() => api.scrollNext(), 5000)
    return () => clearInterval(id)
  }, [api])

  return (
    <section
      id="hero"
      aria-label="Lizzu — Autos 0km y Usados en Jujuy"
      className="relative w-full overflow-hidden"
    >
      {/* ── Carousel ────────────────────────────────────────────────────── */}
      <div className="w-full hero-carousel">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent className="ml-0">
            {HERO_SLIDES.map((slide, i) => (
              <CarouselItem key={i} className="relative aspect-video sm:aspect-1983/793 pl-0">

                {slide.type === 'image' ? (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover object-center"
                    priority={i === 0}
                    quality={i === 0 ? 100 : 85}
                    sizes="(max-width: 1983px) 100vw, 1983px"
                  />
                ) : (
                  /* ── Feature slide — banner estilizado con auto ─────── */
                  <div className="absolute inset-0 flex items-center overflow-hidden bg-linear-to-r from-lizzu-black via-lizzu-navy to-lizzu-purple/60">
                    {/* Glow radial decorativo */}
                    <div
                      className="pointer-events-none absolute -left-20 top-1/2 h-[200%] w-1/2 -translate-y-1/2 rounded-full opacity-20"
                      style={{ background: 'radial-gradient(circle, #2d65d8 0%, transparent 70%)' }}
                      aria-hidden="true"
                    />

                    {/* Texto lado izquierdo */}
                    <div className="relative z-10 flex flex-col gap-1 pl-[6%] sm:gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lizzu-blue-glow sm:text-xs">
                        {slide.brand}
                      </span>
                      <p className="text-2xl font-extrabold leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {slide.model}
                      </p>
                      <p className="text-[10px] text-lizzu-silver/80 sm:text-sm">
                        {slide.tagline}
                      </p>
                      <a
                        href="#catalogo"
                        className="mt-1 inline-flex h-7 w-fit items-center gap-1.5 rounded-lg bg-lizzu-blue px-3 text-[10px] font-semibold text-white transition-colors hover:bg-lizzu-blue-glow sm:mt-2 sm:h-9 sm:px-4 sm:text-xs"
                      >
                        Consultar
                        <ArrowRight className="size-3 sm:size-3.5" aria-hidden="true" />
                      </a>
                    </div>

                    {/* Auto lado derecho */}
                    <div className="absolute right-0 top-1/2 h-[85%] w-[55%] -translate-y-1/2 sm:w-[50%]">
                      <Image
                        src={slide.carSrc}
                        alt={slide.carAlt}
                        fill
                        className="object-contain object-bottom-right drop-shadow-2xl"
                        priority={i === 0}
                        quality={90}
                        sizes="(max-width: 640px) 55vw, 50vw"
                      />
                    </div>
                  </div>
                )}



              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>


      {/* ── Dots de navegación ───────────────────────────────────────────── */}
      <div
        className="hidden md:flex items-center absolute bottom-0 right-1/2 justify-center gap-2 py-2.5"
        role="tablist"
        aria-label="Slides del carrusel"
      >
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`Slide ${i + 1} de ${HERO_SLIDES.length}`}
            aria-selected={i === current}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              'rounded-full transition-all duration-300',
              i === current
                ? 'h-1.5 w-3 md:w-6 bg-lizzu-blue-glow'
                : 'h-1.5 w-1.5 bg-white/30 hover:bg-white/60',
            )}
          />
        ))}
      </div>

      {/* <div className="absolute inset-0 z-10 flex items-center w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-8 sm:py-14">
          <div className="max-w-xl lg:max-w-2xl">

            <BlurFade delay={0} direction="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 md:py-1.5 backdrop-blur-sm sm:px-4">
                <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
                <AnimatedGradientText
                  colorFrom="#60a5fa"
                  colorTo="#e0f2fe"
                  speed={0.5}
                  className="text-[10px] font-semibold sm:text-xs"
                >
                  Agencia verificada · San Salvador de Jujuy
                </AnimatedGradientText>
              </div>
            </BlurFade>


            <BlurFade delay={0.08} direction="up">
              <h1 className="text-[1.2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl ">
                Manejá el auto<br />
                <AnimatedGradientText
                  colorFrom="#2d65d8"
                  colorTo="#7dd3fc"
                  speed={0.7}
                >
                  que siempre quisiste
                </AnimatedGradientText>
              </h1>
            </BlurFade>

      
            <TextAnimate
              as="p"
              animation="blurInUp"
              by="character"
              once
              delay={0.4}
              className="mt-3 text-xs font-semibold text-lizzu-silver-light sm:text-xl"
            >
              Tu próximo vehículo está esperándote.
            </TextAnimate>

      
            <BlurFade delay={0.22} direction="up">
              <p className="mt-2 max-w-md text-xs leading-relaxed text-lizzu-silver/80 sm:mt-3 sm:text-base">
                En Lizzu Multimarcas encontrás autos 0km y usados de todas las marcas
                en Jujuy. Todos los presupuestos, financiación disponible y
                atención personalizada en minutos.
              </p>
            </BlurFade>

 
            <BlurFade delay={0.28} direction="up">
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 sm:mt-4 sm:gap-x-5">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-1.5 text-xs font-medium text-lizzu-silver-light/80">
                    <CheckCircle2 className="size-3.5 shrink-0 text-lizzu-blue-glow" aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>
            </BlurFade>

       
            <BlurFade delay={0.35} direction="up">
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">

          
                <a
                  href="#catalogo"
                  className="inline-flex h-8 md:h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/8 px-5 text-xs md:text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15 hover:text-white sm:w-auto sm:justify-start"
                >
                  Ver catálogo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </BlurFade>

     
            <BlurFade delay={0.43} direction="up">
              <div
                className="mt-6 flex items-center gap-2 sm:mt-8"
                role="tablist"
                aria-label="Slides del carrusel"
              >
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-label={`Slide ${i + 1} de ${HERO_SLIDES.length}`}
                    aria-selected={i === current}
                    onClick={() => api?.scrollTo(i)}
                    className={cn(
                      'rounded-full transition-all duration-300',
                      i === current
                        ? 'h-1.5 w-6 bg-white'
                        : 'h-1.5 w-1.5 bg-white/35 hover:bg-white/65',
                    )}
                  />
                ))}
              </div>
            </BlurFade>

          </div>
        </div>
      </div> */}
    </section>
  )
}
