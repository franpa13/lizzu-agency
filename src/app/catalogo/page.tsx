import type { Metadata } from 'next'
import { PageHeader } from '@/features/shared/components/page-header'
import { CatalogGrid } from '@/features/catalog/components/catalog-grid'

export const metadata: Metadata = {
  title: 'Catálogo de Autos en Jujuy',
  description:
    'Explorá nuestro catálogo de autos usados y 0km en Jujuy. Todas las marcas, financiación disponible y atención personalizada en Lizzu Multimarcas.',
}

export default function CatalogoPage() {
  return (
    <>
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
