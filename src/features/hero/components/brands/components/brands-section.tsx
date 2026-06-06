
import { BlurFade } from '@/features/shared/components/ui/blur-fade'
import { Marquee } from '@/features/shared/components/ui/marquee'
import { BRANDS } from '../data/brands'
import { BrandCard } from './brand-card'



export function BrandsSection() {
  return (
    <section
      aria-label="Marcas disponibles en Lizzu"
      className="bg-blue-50 py-10 md:py-14  dark:bg-lizzu-black"
    >

      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade inView direction="up" className="text-center">
          <p className="md:mb-2 text-xs font-semibold uppercase tracking-widest text-lizzu-blue-glow">
            Multimarcas
          </p>
          <h2 className="text-xl font-bold text-foreground sm:text-3xl">
            Las marcas que trabajamos
          </h2>
          <p className="mx-auto mt-2  text-xs text-muted-foreground sm:text-base">
            Autos 0km y usados de las principales marcas del mercado en el norte Argentino.
          </p>
        </BlurFade>
      </div>

      {/* Marquee */}
      <div className="relative mt-8 sm:mt-12">
        {/* Edge fade left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-blue-50 to-transparent sm:w-24 dark:from-lizzu-black"
        />
        {/* Edge fade right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-blue-50 to-transparent sm:w-24 dark:from-lizzu-black"
        />

        <Marquee pauseOnHover className="py-3 [--duration:30s]">
          {BRANDS.map((brand) => (
            <BrandCard key={brand.slug} {...brand} />
          ))}
        </Marquee>
      </div>

    </section>
  )
}
