import { BlurFade } from '@/features/shared/components/ui/blur-fade'
import { NumberTicker } from '@/features/shared/components/ui/number-ticker'
import { LIZZU_STATS } from '@/features/shared/data/stats'

export function StatsStrip() {
  return (
    <section
      aria-label="Estadísticas de Lizzu"
      className="relative overflow-hidden py-10 sm:py-12"
    >
      {/* Accent lines */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-lizzu-blue/40 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-lizzu-blue/40 to-transparent" />

      {/* Subtle radial glow center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{ background: 'radial-gradient(ellipse 70% 120% at 50% 50%, #1a42a8 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 sm:gap-0">
          {LIZZU_STATS.map((stat, i) => (
            <BlurFade key={stat.label} delay={i * 0.1} inView direction="up">
              <div
                className={[
                  'group flex flex-col items-center gap-2.5 px-3 py-1 text-center',
                  /* Vertical dividers between columns — desktop only */
                  i > 0 ? 'sm:border-l sm:border-lizzu-blue/15' : '',
                ].join(' ')}
              >
                {/* Icon */}
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-lizzu-blue/15 ring-1 ring-lizzu-blue/20 transition-all duration-300 group-hover:bg-lizzu-blue/25 group-hover:ring-lizzu-blue-glow/35">
                  <stat.icon
                    className="size-5 text-lizzu-blue-glow"
                    aria-hidden="true"
                  />
                </div>

                {/* Number + suffix */}
                <div className="flex items-baseline gap-0.5 leading-none">
                  <NumberTicker
                    value={stat.value}
                    decimalPlaces={stat.decimalPlaces ?? 0}
                    delay={i * 0.15}
                    className="text-xl font-black tracking-tight text-foreground "
                  />
                  <span className="text-lg font-black text-lizzu-blue dark:text-lizzu-blue-glow">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-xs font-semibold leading-tight text-foreground s">
                  {stat.label}
                </p>

                {/* Description */}
                <p className="text-[11px] leading-snug text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
