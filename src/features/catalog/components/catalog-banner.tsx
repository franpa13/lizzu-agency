import { SectionBanner } from '@/features/shared/components/section-banner'

export function CatalogBanner() {
  return (
    <SectionBanner
      breadcrumb={[
        { label: 'Inicio', href: '/' },
        { label: 'Catálogo', href: '/catalogo' },
      ]}
      overline="STOCK DISPONIBLE"
      title="Nuestros Autos"
      titleHighlight="Autos"
      description="Vehículos reales, revisados mecánicamente, con opciones de financiación y marcas reconocidas dentro del mercado argentino."
      perks={[
        { label: 'Garantía incluida' },
        { label: 'Financiación propia' },
        { label: '+70 puntos de revisión' },
      ]}
      image={{
        src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=85&auto=format&fit=crop',
        alt: 'Autos disponibles en Lizzu concesionaria multimarcas San Salvador de Jujuy',
      }}
      imageStats={{
        primary: { label: 'Disponibles', value: '12 autos' },
        secondary: { label: 'Desde', value: '$14M' },
      }}
    />
  )
}
