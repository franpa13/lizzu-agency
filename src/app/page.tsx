import type { Metadata } from 'next'
import { HeroSection } from '@/features/hero/components/hero-section'
import { StatsStrip } from '@/features/hero/components/stats-strip'
import { BrandsSection } from '@/features/hero/components/brands/components/brands-section'
import { DestacadosSection } from '@/features/hero/components/destacados/components/destacados-section'
import { WhyUsSection } from '@/features/hero/components/why-us/components/why-us-section'
import { CtaSection } from '@/features/hero/components/cta/components/cta-section'
import { DeliveryToast } from '@/features/shared/components/delivery-toast'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Autos 0km y Usados en Jujuy | Lizzu Multimarcas',
  description:
    'Comprá tu próximo auto en Jujuy. Lizzu Multimarcas ofrece autos 0km y usados de todas las marcas en San Salvador de Jujuy. Financiación disponible. Consultá por WhatsApp.',
  keywords: [
    'autos 0km Jujuy',
    'autos usados Jujuy',
    'agencia de autos Jujuy',
    'concesionaria Jujuy',
    'compra y venta de autos Jujuy',
    'vehículos usados Jujuy',
    'autos San Salvador de Jujuy',
    'Lizzu Multimarcas',
    'Lizzu autos',
    'Lizzu Jujuy',
    'financiación autos Jujuy',
    'auto Jujuy',
  ],
  alternates: {
    canonical: 'https://lizzu.com.ar',
  },
  openGraph: {
    title: 'Autos 0km y Usados en Jujuy | Lizzu Multimarcas',
    description:
      'Encontrá tu próximo vehículo en Jujuy. Autos 0km y usados de todas las marcas con financiación. Consultá por WhatsApp.',
    url: 'https://lizzu.com.ar',
    siteName: 'Lizzu Multimarcas',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autos 0km y Usados en Jujuy | Lizzu Multimarcas',
    description:
      'Encontrá tu próximo vehículo en Jujuy. Autos 0km y usados de todas las marcas con financiación. Consultá por WhatsApp.',
  },
}

export default function Home() {
  const jsonLd = buildJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DeliveryToast />
      <section className='flex flex-col'>
        <HeroSection />
        <div className='mb-16 flex flex-col gap-12 md:gap-16'>
          <BrandsSection />
          <WhyUsSection />
          <DestacadosSection />
          <StatsStrip />
          <CtaSection />
        </div>
      </section>
    </>
  )
}
