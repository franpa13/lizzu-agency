import { HeroSection } from '@/features/hero/components/hero-section'
import { StatsStrip } from '@/features/hero/components/stats-strip'
import { BrandsSection } from '@/features/hero/components/brands/components/brands-section'
import { DestacadosSection } from '@/features/hero/components/destacados/components/destacados-section'
import { WhyUsSection } from '@/features/hero/components/why-us/components/why-us-section'
import { CtaSection } from '@/features/hero/components/cta/components/cta-section'

export default function Home() {
  return (
    <section className='flex flex-col '>
      <HeroSection />
      <div className='mb-16 flex flex-col gap-12 md:gap-16'>
        <BrandsSection />
        <WhyUsSection />
        <DestacadosSection />
        <StatsStrip />
        <CtaSection />
      </div>
    </section>
  )
}
