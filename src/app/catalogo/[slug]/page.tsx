import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCarBySlug, INVENTORY } from '@/features/catalog/data/inventory'
import { CarHero } from '@/features/catalog/components/car-detail/car-hero'
import { CarSpecs } from '@/features/catalog/components/car-detail/car-specs'
import { CarGallery } from '@/features/catalog/components/car-detail/car-gallery'
import { buildCarJsonLd } from '@/lib/seo'
import { siteConfig } from '@/config/site'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return INVENTORY.map((car) => ({ slug: car.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const car = getCarBySlug(slug)
  if (!car) return {}

  const imageUrl = car.cardImage.src.startsWith('http')
    ? car.cardImage.src
    : `${siteConfig.url}${car.cardImage.src}`

  return {
    title: car.metaTitle,
    description: car.metaDescription,
    keywords: [
      `${car.brand} ${car.model} Jujuy`,
      `${car.brand} ${car.year} Jujuy`,
      `${car.model} ${car.status === '0km' ? '0km' : 'usado'} Jujuy`,
      `comprar ${car.brand} Jujuy`,
      `${car.brand} ${car.model} San Salvador de Jujuy`,
      'Lizzu Multimarcas',
      'agencia autos Jujuy',
    ],
    alternates: {
      canonical: `${siteConfig.url}/catalogo/${car.slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: car.metaTitle,
      description: car.metaDescription,
      url: `${siteConfig.url}/catalogo/${car.slug}`,
      siteName: siteConfig.fullName,
      locale: 'es_AR',
      type: 'website',
      images: [{ url: imageUrl, alt: car.cardImage.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: car.metaTitle,
      description: car.metaDescription,
      images: [imageUrl],
    },
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params
  const car = getCarBySlug(slug)
  if (!car) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCarJsonLd(car)) }}
      />
      <CarHero car={car} />
      <CarSpecs car={car} />
      <CarGallery images={car.gallery} brand={car.brand} model={car.model} year={car.year} />
    </>
  )
}
