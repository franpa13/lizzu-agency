"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

function AvatarFallback({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-lizzu-blue/20 text-xs font-semibold text-lizzu-blue">
      {initials}
    </div>
  )
}
import { cn } from '@/lib/utils'
import { BlurFade }   from '@/features/shared/components/ui/blur-fade'
import { BorderBeam } from '@/features/shared/components/ui/border-beam'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/features/shared/components/ui/carousel'

export interface Review {
  author_name: string
  profile_photo_url: string
  rating: number
  text: string
  relative_time_description: string
}

interface Props {
  reviews: Review[]
  overallRating: number
  totalRatings: number
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 dark:border-white/8 dark:bg-lizzu-deep">
      <BorderBeam
        size={60}
        duration={12}
        delay={index * 3}
        colorFrom="var(--lizzu-blue)"
        colorTo="var(--lizzu-blue-glow)"
        borderWidth={1}
      />

      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          {imgError || !review.profile_photo_url ? (
            <AvatarFallback name={review.author_name} />
          ) : (
            <Image
              src={review.profile_photo_url}
              alt={`Foto de ${review.author_name}`}
              fill
              className="object-cover"
              sizes="40px"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground dark:text-lizzu-white">
            {review.author_name}
          </p>
          <p className="text-xs text-muted-foreground dark:text-lizzu-silver">
            {review.relative_time_description}
          </p>
        </div>
      </div>

      <StarRating rating={review.rating} />

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground dark:text-lizzu-silver/80">
        "{review.text}"
      </p>

      <div className="mt-auto flex items-center gap-1.5 border-t border-border/50 pt-4 dark:border-white/5">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="text-xs text-muted-foreground dark:text-lizzu-silver">
          Reseña de Google
        </span>
      </div>
    </div>
  )
}

export function ReviewsCarousel({ reviews, overallRating, totalRatings }: Props) {
  const [api, setApi]         = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  // — mismo patrón que HeroSection —
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
    <div>
      {/* header */}
      <BlurFade delay={0} direction="up" inView>
        <div className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
          <h2
            id="reviews-heading"
            className="text-2xl font-extrabold tracking-tight text-foreground dark:text-lizzu-white sm:text-3xl"
          >
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(overallRating)} />
            <span className="text-sm font-semibold text-foreground dark:text-lizzu-white">
              {overallRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground dark:text-lizzu-silver">
              · {totalRatings} reseñas en Google
            </span>
          </div>
        </div>
      </BlurFade>

      {/* carousel */}
      <BlurFade delay={0.1} direction="up" inView>
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: 'start' }}
          className="w-full"
          aria-label="Reseñas de clientes"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, i) => (
              <CarouselItem
                key={i}
                className="pl-4 basis-full sm:basis-[85%] lg:basis-1/3"
              >
                <ReviewCard review={review} index={i} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* dots — mismo estilo que hero */}
        <div
          className={cn(
            'mt-6 flex items-center justify-center gap-2',
            reviews.length <= 3 && 'lg:hidden',
          )}
          role="tablist"
          aria-label="Reseñas"
        >
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Reseña ${i + 1} de ${reviews.length}`}
              aria-selected={i === current}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'rounded-full transition-all duration-300',
                i === current
                  ? 'h-1.5 w-6 bg-lizzu-blue-glow'
                  : 'h-1.5 w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60 dark:bg-white/30 dark:hover:bg-white/60',
              )}
            />
          ))}
        </div>
      </BlurFade>
    </div>
  )
}
