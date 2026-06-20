'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { CarImage } from '@/features/catalog/types/car'
import { CarCTAButton } from '@/features/shared/components/car-cta-button'

interface Props {
  images: CarImage[]
  brand: string
  model: string
  year:number
}

export function CarGallery({ images, brand, model, year}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const isOpen = lightboxIndex !== null

  const close = useCallback(() => setLightboxIndex(null), [])

  const prev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length],
  )

  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    },
    [close, prev, next],
  )

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (images.length === 0) return null

  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null

  return (
    <>
      <section id="fotos" className="bg-background py-14 sm:py-24">
        <div className="px-4 sm:px-6 lg:px-8">

          <div className="mb-10 sm:mb-14">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-lizzu-blue-glow">
              Galería
            </p>
            <h2 className="text-3xl font-black uppercase text-foreground sm:text-4xl">
              {brand} {model} en imágenes
            </h2>
          </div>

          {/* ── Uniform grid — todas las imágenes iguales ──────────── */}
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Ver imagen completa: ${img.alt}`}
                className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-md"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex size-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm">
                    <ZoomIn className="size-4 text-white" aria-hidden />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      {isOpen && currentImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={close}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar visor"
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X className="size-5" aria-hidden />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Imagen anterior"
              className="absolute left-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-5 sm:size-12"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
          )}

          {/* Image — stop propagation so clicking image doesn't close */}
          <div
            className="relative mx-16 h-[85dvh] w-[85vw] sm:mx-24"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="85vw"
              priority
              className="object-contain"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Imagen siguiente"
              className="absolute right-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-5 sm:size-12"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          )}

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold tabular-nums text-white/40">
            {(lightboxIndex ?? 0) + 1} / {images.length}
          </p>
        </div>
      )}
      
      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section id="consultar" className="bg-lizzu-black py-14 sm:py-24">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-lizzu-blue-glow">
            Disponible en Jujuy
          </p>
          <h2 className="text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
            ¿Te interesa el {brand} {model}?
          </h2>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-white/50">
            Consultá con nuestro equipo en San Salvador de Jujuy. Te respondemos al instante por WhatsApp.
          </p>
          <div className="mt-8">
            <CarCTAButton brand={brand} model={model} year={year} />
          </div>
        </div>
      </section>
    </>
  )
}
