import type { Metadata } from 'next'
import { PageHeader } from '@/features/shared/components/page-header'
import { CatalogGrid } from '@/features/catalog/components/catalog-grid'
import { INVENTORY } from '@/features/catalog/data/inventory'
import { buildCatalogJsonLd } from '@/lib/seo'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Catálogo de Autos 0km y Usados en Jujuy',
  description:
    'Explorá nuestro catálogo de autos 0km y usados en Jujuy. Citroën, Peugeot, Fiat y más marcas con financiación disponible. Lizzu Multimarcas, San Salvador de Jujuy.',
  keywords: [
    'catálogo autos Jujuy',
    'autos 0km Jujuy',
    'autos usados Jujuy',
    'comprar auto Jujuy',
    'Citroën Jujuy',
    'Peugeot Jujuy',
    'Fiat Jujuy',
    'financiación autos Jujuy',
    'Lizzu catálogo',
    'Lizzu autos Jujuy',
  ],
  alternates: {
    canonical: `${siteConfig.url}/catalogo`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Catálogo de Autos 0km y Usados en Jujuy | Lizzu Multimarcas',
    description:
      'Autos 0km y usados de todas las marcas con financiación en San Salvador de Jujuy. Consultá disponibilidad por WhatsApp.',
    url: `${siteConfig.url}/catalogo`,
    siteName: siteConfig.fullName,
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de Autos 0km y Usados en Jujuy | Lizzu Multimarcas',
    description:
      'Autos 0km y usados de todas las marcas con financiación en San Salvador de Jujuy.',
  },
}

export default function CatalogoPage() {
  const jsonLd = buildCatalogJsonLd(INVENTORY)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Catálogo', href: '/catalogo' },
        ]}
        title="Autos usados y nuevos en Jujuy"
        description="Encontrá el auto usado o 0km que más se adapta a tus necesidades en Lizzu Multimarcas, San Salvador de Jujuy."
        leftImage={{
          src: '/images/kardian-removebg-preview.png',
          alt: 'Kia Kardian disponible en Lizzu agencia de autos Jujuy',
        }}
        rightImage={{
          src: '/images/cronos-rojo.png',
          alt: 'Fiat Cronos disponible en Lizzu multimarcas San Salvador de Jujuy',
        }}
      />
      <CatalogGrid />
    </>
  )
}
