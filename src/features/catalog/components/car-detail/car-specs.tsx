import { CheckCircle2 } from 'lucide-react'
import { CarCTAButton } from '@/features/shared/components/car-cta-button'
import { Card } from '@/features/shared/components/ui/card'
import type { Car } from '@/features/catalog/types/car'
import { BlurFade } from '@/features/shared/components/ui/blur-fade';

function StatCard({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <Card className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-card p-4 text-center shadow-sm">
      <p className="text-sm md:text-xl font-black tracking-tight text-foreground ">
        {value}
        {unit && <span className="ml-1 text-sm font-bold text-muted-foreground">{unit}</span>}
      </p>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
        {label}
      </p>
    </Card>
  )
}

export function CarSpecs({ car }: { car: Car }) {
  const { specs, features, brand, model, version, year, description } = car

  return (
    <>
      {/* ── Ficha técnica ──────────────────────────────────────────── */}
      <section id="ficha-tecnica" className="bg-background py-14 sm:py-24">

        <div className="flex flex-col md:flex-row md:justify-between  px-4 sm:px-6 lg:px-8">

          <BlurFade inView direction="up" >
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-lizzu-blue-glow">
              {brand} · {year}
            </p>
            <h1 className="text-2xl font-black uppercase leading-tight text-foreground sm:text-4xl">
              {model} <span className="text-muted-foreground/60">{version}</span>
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </BlurFade>

          <section className="w-full md:w-1/2">

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              <StatCard value={specs.power.split(' ')[0]} unit="CV" label="Potencia máx." />
              <StatCard value={specs.torque.split(' ')[0]} unit="Nm" label="Par motor" />
              <StatCard value={specs.displacement} label="Cilindrada" />
              <StatCard value={specs.transmission} label="Transmisión" />
              {specs.topSpeed && <StatCard value={specs.topSpeed} label="Vel. máxima" />}
              {specs.trunk && <StatCard value={specs.trunk} label="Volumen de baúl" />}
              {specs.tires && <StatCard value={specs.tires} label="Rodado" />}
              {specs.warranty && <StatCard value={specs.warranty} label="Garantía" />}
            </div>

            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 rounded-2xl border border-border/60 bg-muted/30 px-5 py-4">
              <span className="text-xs text-muted-foreground"><strong className="text-foreground">Combustible:</strong> {specs.fuel}</span>
              <span className="text-xs text-muted-foreground"><strong className="text-foreground">Tracción:</strong> {specs.traction}</span>
              <span className="text-xs text-muted-foreground"><strong className="text-foreground">Puertas:</strong> {specs.doors}</span>
              <span className="text-xs text-muted-foreground"><strong className="text-foreground">Plazas:</strong> {specs.seats}</span>
            </div>
          </section>

        </div>
      </section>

      {/* ── Equipamiento ───────────────────────────────────────────── */}
      <section className="border-t border-border/40 bg-muted/20 py-14 sm:py-24">
        <div className="px-4 sm:px-6 lg:px-8">

          <div className="mb-8 sm:mb-12">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.4em] text-lizzu-blue-glow">
              Equipamiento
            </p>
            <h2 className="text-2xl font-black uppercase sm:text-3xl">Todo lo que incluye</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((group) => (
              <Card key={group.category} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-lizzu-blue-glow">
                  {group.category}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" aria-hidden />
                      <span className="text-xs leading-snug text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
