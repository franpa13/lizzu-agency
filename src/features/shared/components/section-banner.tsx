import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, CheckCircle2 } from 'lucide-react'
import { BlurFade } from '@/features/shared/components/ui/blur-fade'
import { AnimatedGradientText } from '@/features/shared/components/ui/animated-gradient-text'
import { BorderBeam } from '@/features/shared/components/ui/border-beam'
import { cn } from '@/lib/utils'

export interface SectionBannerPerk {
  label: string
}

export interface SectionBannerImage {
  src: string
  alt: string
}

export interface SectionBannerStats {
  primary: { label: string; value: string }
  secondary?: { label: string; value: string }
}

export interface SectionBannerProps {
  breadcrumb: { label: string; href: string }[]
  overline: string
  title: string
  titleHighlight?: string
  description: string
  perks: SectionBannerPerk[]
  image?: SectionBannerImage
  imageStats?: SectionBannerStats
  className?: string
}

export function SectionBanner({
  breadcrumb,
  overline,
  title,
  titleHighlight,
  description,
  perks,
  image,
  imageStats,
  className,
}: SectionBannerProps) {
  const titleParts = titleHighlight ? title.split(titleHighlight) : [title]

  return (
    <section
      aria-label={title}
      className={cn('relative overflow-hidden bg-lizzu-black px-4 sm:px-6 lg:px-8', className)}
      style={{
        backgroundImage: [
          'radial-gradient(ellipse 75% 80% at 10% 55%, oklch(0.19 0.10 263 / 0.55) 0%, transparent 65%)',
          'radial-gradient(ellipse 55% 55% at 90% 15%, oklch(0.33 0.17 292 / 0.18) 0%, transparent 55%)',
          'radial-gradient(ellipse 45% 50% at 55% 95%, oklch(0.15 0.010 252 / 0.35) 0%, transparent 55%)',
        ].join(', '),
      }}
    >
      {/* ── Dot grid texture ──────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: 'radial-gradient(circle, #7a8ea8 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* ── Vignette edges ────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-r from-lizzu-black/80 via-transparent to-lizzu-black/60" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-lizzu-black/50 via-transparent to-lizzu-black/80" />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <div className="flex flex-col-reverse gap-8 py-12 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-20">

          {/* ────────── Left: text ────────── */}
          <div className="min-w-0 flex-1 w-full">

            {/* Breadcrumb */}
            <BlurFade delay={0} direction="up">
              <nav aria-label="Ubicación de página">
                <ol className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-lizzu-silver/40">
                  {breadcrumb.map((crumb, i) => (
                    <li key={crumb.href} className="flex items-center gap-1.5">
                      {i > 0 && (
                        <ChevronRight className="size-3 shrink-0 text-lizzu-silver/25" aria-hidden="true" />
                      )}
                      {i < breadcrumb.length - 1 ? (
                        <Link href={crumb.href} className="transition-colors hover:text-lizzu-silver/70">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="font-semibold text-lizzu-silver/70">{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </BlurFade>

            {/* Glass badge / overline */}
            <BlurFade delay={0.08} direction="up">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
                <span className="text-[11px] font-semibold tracking-widest text-lizzu-silver-light/80 uppercase">
                  {overline}
                </span>
              </div>
            </BlurFade>

            {/* Heading — large and dramatic */}
            <BlurFade delay={0.15} direction="up">
              <h1 className="text-xs font-black leading-[1.05] tracking-tight text-lizzu-white ">
                {titleHighlight ? (
                  <>
                    <span className="block">{titleParts[0].trim()}</span>
                    <AnimatedGradientText
                      colorFrom="#1a42a8"
                      colorTo="#93c5fd"
                      speed={0.5}
                      className="block"
                    >
                      {titleHighlight}
                    </AnimatedGradientText>
                    {titleParts[1]?.trim() && (
                      <span className="block">{titleParts[1].trim()}</span>
                    )}
                  </>
                ) : (
                  title
                )}
              </h1>
            </BlurFade>

            {/* Description */}
            <BlurFade delay={0.22} direction="up">
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-lizzu-silver/65 sm:text-base">
                {description}
              </p>
            </BlurFade>

            {/* Perks */}
            <BlurFade delay={0.3} direction="up">
              <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Características">
                {perks.map((perk) => (
                  <li
                    key={perk.label}
                    className="flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3.5 py-2 text-xs font-medium text-lizzu-silver-light backdrop-blur-sm"
                  >
                    <CheckCircle2
                      className="size-3.5 shrink-0 text-lizzu-blue-glow"
                      aria-hidden="true"
                    />
                    {perk.label}
                  </li>
                ))}
              </ul>
            </BlurFade>

          </div>

          {/* ────────── Right: image card ────────── */}
          {image && (
            <BlurFade
              delay={0.35}
              direction="left"
              className="w-full shrink-0 sm:max-w-sm lg:max-w-none lg:w-auto"
            >
              {/* Outer glow ring */}
              <div className="relative h-56 w-full sm:h-72 lg:h-110 lg:w-85 xl:h-125 xl:w-97.5">
                <div
                  aria-hidden="true"
                  className="absolute -inset-1.5 rounded-3xl bg-gradient-to-b from-lizzu-blue/35 via-lizzu-navy/20 to-transparent blur-sm"
                />

                {/* Card */}
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10">
                  <BorderBeam
                    colorFrom="#2d65d8"
                    colorTo="#93c5fd"
                    duration={5}
                    size={140}
                    borderWidth={1.5}
                  />

                  {/* Image */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1280px) 340px, 390px"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-lizzu-black/90 via-lizzu-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-lizzu-black/30 to-transparent" />

                  {/* Top-right live badge */}
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-lizzu-black/60 px-2.5 py-1.5 backdrop-blur-sm">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
                    <span className="text-[10px] font-semibold text-lizzu-silver-light">Stock activo</span>
                  </div>

                  {/* Bottom floating stats */}
                  {imageStats && (
                    <div className="absolute inset-x-4 bottom-4 flex items-end gap-3">
                      <div className="flex-1 rounded-2xl border border-white/8 bg-lizzu-black/70 px-4 py-3.5 backdrop-blur-md">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-lizzu-silver/55">
                          {imageStats.primary.label}
                        </p>
                        <p className="mt-1 text-2xl font-black leading-none text-lizzu-white">
                          {imageStats.primary.value}
                        </p>
                      </div>
                      {imageStats.secondary && (
                        <div className="rounded-2xl border border-lizzu-blue-glow/25 bg-lizzu-blue/70 px-4 py-3.5 backdrop-blur-md">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-lizzu-silver-light/55">
                            {imageStats.secondary.label}
                          </p>
                          <p className="mt-1 text-xl font-black leading-none text-lizzu-white">
                            {imageStats.secondary.value}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </BlurFade>
          )}

        </div>
      </div>
    </section>
  )
}
