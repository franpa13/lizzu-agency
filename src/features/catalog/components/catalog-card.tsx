import Image from 'next/image'
import Link from 'next/link'
import { Gauge } from 'lucide-react'
import { CarCTAButton } from '@/features/shared/components/car-cta-button'
import { Badge } from '@/features/shared/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
} from '@/features/shared/components/ui/card'
import { cn } from '@/lib/utils'
import type { Car, CarStatus } from '@/features/catalog/types/car'

interface CatalogCardProps {
  car: Car
  priority?: boolean
  className?: string
}

const STATUS_CONFIG: Record<CarStatus, { label: string; className: string }> = {
  '0km':     { label: '0 km',      className: 'bg-emerald-500 text-white border-transparent uppercase tracking-wide' },
  destacado: { label: 'Destacado', className: 'bg-lizzu-blue-glow text-white border-transparent uppercase tracking-wide' },
  usado:     { label: 'Usado',     className: 'bg-lizzu-steel/90 text-white border-transparent uppercase tracking-wide' },
  reservado: { label: 'Reservado', className: 'bg-amber-500 text-black border-transparent uppercase tracking-wide' },
}

function formatKm(n: number) {
  if (n === 0) return '0 km'
  return `${new Intl.NumberFormat('es-AR').format(n)} km`
}

export function CatalogCard({ car, priority = false, className }: CatalogCardProps) {
  const { slug, brand, model, version, year, km, status, cardImage } = car
  const statusConfig = STATUS_CONFIG[status]

  return (
    <Card
      className={cn(
        'group py-0 transition-all duration-300 gap-2',
        'border-border/60 hover:border-lizzu-blue-glow/30',
        'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-lizzu-black/50',
        className,
      )}
    >
      {/* ── Image (links to detail page) ───────────────────────────── */}
      <Link href={`/catalogo/${slug}`} className="block" tabIndex={-1} aria-hidden>
        <div className="relative aspect-16/10 overflow-hidden rounded-t-xl bg-muted/40 dark:bg-lizzu-deep/50">
          {/* Flip wrapper is separate from hover-scale so transforms don't conflict */}
          <div className="absolute inset-4 md:inset-10">
            <Image
              src={cardImage.src}
              alt={cardImage.alt}
              fill
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
              className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div aria-hidden className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/35 to-transparent" />

          <Badge
            className={cn(
              'absolute left-3 top-3 text-[10px] font-bold shadow-sm',
              statusConfig.className,
            )}
          >
            {statusConfig.label}
          </Badge>

          <span className="absolute bottom-2.5 right-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            {year}
          </span>
        </div>
      </Link>

      {/* ── Content ────────────────────────────────────────────────── */}
      <CardContent className="flex flex-1 flex-col pt-2 pb-0 gap-0.5">
        <Link href={`/catalogo/${slug}`} className="group/title">
          <h3 className="text-sm leading-snug">
            <span className="font-normal text-muted-foreground">{brand} </span>
            <span className="font-extrabold text-foreground transition-colors group-hover/title:text-lizzu-blue-glow">
              {model}
            </span>
          </h3>
        </Link>
        <p className="text-[11px] font-medium text-muted-foreground/80">{version}</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground/60">
          <Gauge className="size-3 shrink-0" aria-hidden />
          {formatKm(km)}
        </p>
      </CardContent>

      {/* ── Footer / CTA ───────────────────────────────────────────── */}
      <CardFooter className="px-4 pb-3 pt-2 sm:px-4 bg-transparent border-t-0">
        <CarCTAButton brand={brand} model={model} year={year} />
      </CardFooter>
    </Card>
  )
}
