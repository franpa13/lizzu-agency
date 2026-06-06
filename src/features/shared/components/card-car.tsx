import Image from 'next/image'
import { Gauge, MapPin } from 'lucide-react'
import { CarCTAButton } from '@/features/shared/components/car-cta-button'
import { cn } from '@/lib/utils'

export type CarBadge = '0km' | 'usado' | 'destacado' | 'reservado'

export interface CarCardData {
  id: string | number
  image: string
  alt: string
  brand: string
  model: string
  year: number
  price: number
  km: number
  badge?: CarBadge
}

interface CardCarProps extends CarCardData {
  className?: string
  priority?: boolean
}

const BADGE_MAP: Record<CarBadge, { label: string; className: string }> = {
  '0km':      { label: '0 km',      className: 'bg-emerald-500 text-white' },
  destacado:  { label: 'Destacado', className: 'bg-lizzu-blue-glow text-white' },
  usado:      { label: 'Usado',     className: 'bg-lizzu-steel/90 text-white' },
  reservado:  { label: 'Reservado', className: 'bg-amber-500 text-black' },
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(n)
}

function formatKm(n: number) {
  if (n === 0) return '0 km'
  return `${new Intl.NumberFormat('es-AR').format(n)} km`
}

export function CardCar({
  image, alt, brand, model, year, price, km, badge, className, priority = false,
}: CardCarProps) {
  const badgeInfo = badge ? BADGE_MAP[badge] : null

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl',
        'border border-border/60 bg-card shadow-sm',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-lizzu-blue-glow/35',
        className,
      )}
    >
      {/* ── Image ─────────────────────────────────────────────── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 46vw, 32vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bottom gradient */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent"
        />

        {/* Badge */}
        {badgeInfo && (
          <span
            className={cn(
              'absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm',
              badgeInfo.className,
            )}
          >
            {badgeInfo.label}
          </span>
        )}

        {/* Year */}
        <span className="absolute bottom-2.5 right-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          {year}
        </span>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">

        {/* Title + specs */}
        <div>
          <h3 className="text-base font-bold leading-snug text-foreground sm:text-[1.05rem]">
            {brand} {model}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Gauge className="size-3 shrink-0" aria-hidden />
              {formatKm(km)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3 shrink-0" aria-hidden />
              Jujuy
            </span>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-xl font-extrabold tracking-tight text-lizzu-blue-glow sm:text-2xl">
            {formatPrice(price)}
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">
            Financiación disponible
          </p>
        </div>

        {/* CTA */}
        <CarCTAButton brand={brand} model={model} year={year} />

      </div>
    </article>
  )
}
