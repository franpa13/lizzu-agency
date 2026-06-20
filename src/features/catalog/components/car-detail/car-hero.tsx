import Image from 'next/image'
import Link from 'next/link'
import type { Car } from '@/features/catalog/types/car'

export function CarHero({ car }: { car: Car }) {
  const heroImage = car.gallery[0] ?? car.cardImage

  return (
    <section className="relative w-full sm:min-h-[88dvh] sm:overflow-hidden">

      {/* Image — landscape on mobile (normal flow), fills section on desktop */}
      <div className="relative aspect-video overflow-hidden sm:absolute sm:inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-[center_60%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/40 via-black/5 to-transparent sm:from-black/90 sm:via-black/25 sm:to-black/15"
        />
      </div>

      {/* Nav overlay */}
      <nav
        aria-label="Navegación del vehículo"
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 backdrop-blur-sm bg-black/20 sm:px-6 lg:px-8"
      >
        <Link
          href="/catalogo"
          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Catálogo
        </Link>

        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.15em]">
          <a href="#fotos" className="hidden px-3 py-1.5 text-white/60 transition-colors hover:text-white sm:block">Fotos</a>
          <span className="hidden text-white/20 sm:block">|</span>
          <a href="#ficha-tecnica" className="hidden px-3 py-1.5 text-white/60 transition-colors hover:text-white sm:block">Ficha Técnica</a>
          <a href="#consultar" className="ml-2 rounded-full bg-lizzu-blue px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-lizzu-blue-glow sm:px-5 sm:py-2">
            Consultar
          </a>
        </div>
      </nav>

      {/* Car info — normal flow below image on mobile, absolute overlay on desktop */}
    
      {/* Scroll indicator — desktop only */}
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 sm:flex">
        <div className="h-8 w-px bg-linear-to-b from-white/25 to-transparent" />
      </div>
    </section>
  )
}
