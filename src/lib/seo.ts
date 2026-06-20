import { siteConfig } from "@/config/site";
import type { Car } from "@/features/catalog/types/car";

const HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "21:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "09:00",
    closes: "21:00",
  },
] as const;

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.province,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.countryCode,
} as const;

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoDealer",
        "@id": `${siteConfig.url}/#autodealer`,
        name: siteConfig.fullName,
        alternateName: ["Lizzu", "Lizzu Autos", "Lizzu Agencia de Autos"],
        description:
          "Agencia de autos 0km y usados en San Salvador de Jujuy con financiación, asesoramiento y atención personalizada.",
        url: siteConfig.url,
        telephone: siteConfig.phone,
        address: ADDRESS,
        geo: {
          "@type": "GeoCoordinates",
          latitude: "-24.1857",
          longitude: "-65.2995",
        },
        areaServed: [
          { "@type": "City", name: "San Salvador de Jujuy" },
          { "@type": "State", name: "Jujuy" },
        ],
        openingHoursSpecification: HOURS,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          contactType: "customer service",
          availableLanguage: "Spanish",
          areaServed: "AR",
        },
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.facebook,
          siteConfig.social.tiktok,
        ].filter(Boolean),
        priceRange: "$$",
        currenciesAccepted: "ARS",
        paymentAccepted: "Cash, Credit Card, Financing",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Catálogo de autos 0km y usados — Lizzu Multimarcas",
          url: `${siteConfig.url}/catalogo`,
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.fullName,
        image: `${siteConfig.url}/images/logo-lizzu2.png`,
        url: siteConfig.url,
        telephone: siteConfig.phone,
        address: ADDRESS,
        hasMap: `https://maps.google.com/?q=${encodeURIComponent(
          `${siteConfig.address.street}, ${siteConfig.address.city}`
        )}`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.fullName,
        alternateName: "Lizzu Autos Jujuy",
        description:
          "Autos 0km y usados en Jujuy. Todas las marcas, financiación disponible.",
        inLanguage: "es-AR",
        publisher: { "@id": `${siteConfig.url}/#autodealer` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/catalogo?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function buildCarJsonLd(car: Car) {
  const isNew = car.status === "0km";
  const imageUrl = car.cardImage.src.startsWith("http")
    ? car.cardImage.src
    : `${siteConfig.url}${car.cardImage.src}`;

  return {
    "@context": "https://schema.org",
    "@type": "Car",
    "@id": `${siteConfig.url}/catalogo/${car.slug}`,
    name: `${car.brand} ${car.model} ${car.version} ${car.year}`,
    description: car.description,
    image: imageUrl,
    brand: { "@type": "Brand", name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.km,
      unitCode: "KMT",
    },
    itemCondition: isNew
      ? "https://schema.org/NewCondition"
      : "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      ...(car.price ? { price: car.price } : {}),
      availability:
        car.status === "reservado"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      seller: { "@id": `${siteConfig.url}/#autodealer` },
      url: `${siteConfig.url}/catalogo/${car.slug}`,
    },
    url: `${siteConfig.url}/catalogo/${car.slug}`,
  };
}

export function buildCatalogJsonLd(cars: Car[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo de autos 0km y usados en Jujuy — Lizzu Multimarcas",
    description:
      "Autos 0km y usados de todas las marcas disponibles en Lizzu Multimarcas, San Salvador de Jujuy.",
    url: `${siteConfig.url}/catalogo`,
    numberOfItems: cars.length,
    itemListElement: cars.map((car, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/catalogo/${car.slug}`,
      name: `${car.brand} ${car.model} ${car.version} ${car.year}`,
    })),
  };
}

export function buildWhatsAppUrl(message?: string): string {
  const text =
    message ??
    encodeURIComponent("Hola Lizzu, quiero consultar por un vehículo.");
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
