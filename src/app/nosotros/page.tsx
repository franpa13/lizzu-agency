import { AboutBanner }   from '@/features/about/components/about-banner'
import { AboutContent }  from '@/features/about/components/about-content'
import { AboutProcess }  from '@/features/about/components/about-process'
import { AboutReviews }  from '@/features/about/components/about-reviews'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiénes Somos | Lizzu Multimarcas — Agencia de Autos en Jujuy',
  description:
    'Conocé a Lizzu Multimarcas, agencia de autos usados en San Salvador de Jujuy. Más de 100 familias jujeñas confían en nosotros para comprar su próximo vehículo con financiación y atención personalizada.',
  keywords: [
    'agencia de autos Jujuy',
    'concesionaria Jujuy',
    'Lizzu Multimarcas',
    'autos usados Jujuy',
    'compra venta autos San Salvador de Jujuy',
    'financiación autos Jujuy',
  ],
  openGraph: {
    title: 'Quiénes Somos | Lizzu Multimarcas',
    description:
      'Agencia de autos usados en San Salvador de Jujuy. Financiación, asesoramiento y atención personalizada.',
    url: 'https://lizzu.com.ar/nosotros',
    siteName: 'Lizzu Multimarcas',
    locale: 'es_AR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lizzu.com.ar/nosotros',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AutoDealer',
      '@id': 'https://lizzu.com.ar/#autodealers',
      name: 'Lizzu Multimarcas',
      description:
        'Agencia de autos usados en San Salvador de Jujuy con financiación, asesoramiento y servicio integral.',
      url: 'https://lizzu.com.ar',
      telephone: '+5493884344543',
      email: '',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Almirante Brown N°10',
        addressLocality: 'San Salvador de Jujuy',
        addressRegion: 'Jujuy',
        postalCode: '4600',
        addressCountry: 'AR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '-24.1857',
        longitude: '-65.2995',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '21:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '21:00',
        },
      ],
      sameAs: [
        'https://www.instagram.com/lizzu_multimarcas/',
        'https://www.facebook.com/profile.php?id=61577826077479',
        'https://www.tiktok.com/@lizzujujuy',
      ],
      priceRange: '$$',
      currenciesAccepted: 'ARS',
      paymentAccepted: 'Cash, Credit Card, Financing',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://lizzu.com.ar/#localbusiness',
      name: 'Lizzu Multimarcas',
      image: 'https://lizzu.com.ar/images/logo-lizzu2.png',
      url: 'https://lizzu.com.ar',
      telephone: '+5493884344543',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Almirante Brown N°10',
        addressLocality: 'San Salvador de Jujuy',
        addressRegion: 'Jujuy',
        postalCode: '4600',
        addressCountry: 'AR',
      },
      hasMap: 'https://maps.google.com/?q=Almirante+Brown+10,+San+Salvador+de+Jujuy',
    },
  ],
}

export default function SobreNosotrosPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutBanner />
      <AboutContent />
      <AboutProcess />
      <AboutReviews />
    </main>
  )
}
