import type { Metadata } from 'next'
import { ContactBanner } from '@/features/contact/components/contact-banner'
import { ContactForm }   from '@/features/contact/components/contact-form'
import { ContactInfo }   from '@/features/contact/components/contact-info'

export const metadata: Metadata = {
  title: 'Contacto | Lizzu Multimarcas — Agencia de Autos en Jujuy',
  description:
    'Contactá a Lizzu Multimarcas en San Salvador de Jujuy. Consultá por autos usados, financiación o tasación por WhatsApp. Almirante Brown N°10, Jujuy.',
  keywords: [
    'contacto agencia de autos Jujuy',
    'whatsapp concesionaria Jujuy',
    'Lizzu Multimarcas contacto',
    'agencia autos San Salvador de Jujuy',
    'comprar auto Jujuy WhatsApp',
    'financiación autos Jujuy',
    'tasación vehículos Jujuy',
  ],
  openGraph: {
    title: 'Contacto | Lizzu Multimarcas — Agencia de Autos en Jujuy',
    description:
      'Consultá por WhatsApp o visitanos en Almirante Brown N°10, San Salvador de Jujuy. Atención personalizada en autos usados y financiación.',
    url: 'https://lizzu.com.ar/contacto',
    siteName: 'Lizzu Multimarcas',
    locale: 'es_AR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lizzu.com.ar/contacto',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AutoDealer',
      '@id': 'https://lizzu.com.ar/#autodealer',
      name: 'Lizzu Multimarcas',
      description:
        'Agencia de autos usados en San Salvador de Jujuy con financiación, asesoramiento y atención personalizada.',
      url: 'https://lizzu.com.ar',
      telephone: '+5493885219798',
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
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '13:00',
        },
      ],
      sameAs: [
        'https://www.instagram.com/lizzu_multimarcas/',
        'https://www.facebook.com/profile.php?id=61577826077479',
        'https://www.tiktok.com/@lizzujujuy',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+5493885219798',
        contactType: 'customer service',
        availableLanguage: 'Spanish',
        areaServed: 'AR',
      },
    },
    {
      '@type': 'ContactPage',
      '@id': 'https://lizzu.com.ar/contacto',
      name: 'Contacto — Lizzu Multimarcas',
      url: 'https://lizzu.com.ar/contacto',
      description: 'Página de contacto de Lizzu Multimarcas, agencia de autos en San Salvador de Jujuy.',
    },
  ],
}

export default function ContactoPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactBanner />
      <ContactForm />
      <ContactInfo />
    </main>
  )
}
