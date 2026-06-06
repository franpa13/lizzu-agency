import Image from 'next/image'
import { CarCTAButton } from '@/features/shared/components/car-cta-button'
import { Badge } from '@/features/shared/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
} from '@/features/shared/components/ui/card'
import { Separator } from '@/features/shared/components/ui/separator'
import { cn } from '@/lib/utils'
import type { CarCardData, CarBadge } from '@/features/shared/components/card-car'

const BADGE_CONFIG: Record<CarBadge, { label: string; className: string }> = {
  '0km':     { label: '0 km',      className: 'bg-emerald-500 text-white border-transparent uppercase tracking-wide' },
  destacado: { label: 'Destacado', className: 'bg-lizzu-blue-glow text-white border-transparent uppercase tracking-wide' },
  usado:     { label: 'Usado',     className: 'bg-lizzu-steel/90 text-white border-transparent uppercase tracking-wide' },
  reservado: { label: 'Reservado', className: 'bg-amber-500 text-black border-transparent uppercase tracking-wide' },
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('es-AR', {
    style:                 'currency',
    currency:              'ARS',
    maximumFractionDigits: 0,
  }).format(n)
}

function formatKm(n: number) {
  if (n === 0) return '0 km'
  return `${new Intl.NumberFormat('es-AR').format(n)} km`
}

interface CatalogCardProps extends CarCardData {
  priority?: boolean
  className?: string
}

export function CatalogCard({
  image, alt, brand, model, year, price, km, badge, priority = false, className,
}: CatalogCardProps) {
  const badgeConfig = badge ? BADGE_CONFIG[badge] : null

  return (
    <Card
      className={cn(
        'group py-0 transition-all duration-300 gap-2',
        'border-border/60 hover:border-lizzu-blue-glow/30',
        'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-lizzu-black/50',
        className,
      )}
    >
      {/* ── Image ──────────────────────────────────────────────────────── */}
      <div className="relative aspect-16/10 overflow-hidden rounded-t-xl bg-muted/40 dark:bg-lizzu-deep/50">
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bottom scrim */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/35 to-transparent" />

        {/* Badge */}
        {badgeConfig && (
          <Badge
            className={cn(
              'absolute left-3 top-3 text-[10px] font-bold shadow-sm',
              badgeConfig.className,
            )}
          >
            {badgeConfig.label}
          </Badge>
        )}

        {/* Year chip */}
        <span className="absolute bottom-2.5 right-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          {year}
        </span>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <CardContent className="flex flex-1 flex-col pt-1.5 pb-0">

        {/* Brand + model */}
        <h3 className="text-sm leading-snug">
          <span className="font-normal text-muted-foreground">{brand} </span>
          <span className="font-extrabold text-foreground">{model}</span>
        </h3>
        <p className="mt-1 text-[11px] text-muted-foreground/80">
          {formatKm(km)} · {km === 0 ? 'Nuevo' : 'Usado'}
        </p>

        <Separator className="my-1.5" />

        {/* Price */}
        <div className="mb-1">
          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">
            Desde
          </p>
          <p className="mt-0.5 text-2xl font-black tracking-tight text-foreground sm:text-[1.6rem]">
            {formatPrice(price)}
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground/60">
            Financiación disponible
          </p>
        </div>

      </CardContent>

      {/* ── Footer / CTA ───────────────────────────────────────────────── */}
      <CardFooter className="px-4 pb-2 pt-2 sm:px-4 sm:pb-3 bg-transparent border-t-0">
        <CarCTAButton brand={brand} model={model} year={year} />
      </CardFooter>
    </Card>
  )
}
