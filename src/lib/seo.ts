import { siteConfig } from "@/config/site";

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoDealer",
        "@id": `${siteConfig.url}/#autodealer`,
        name: siteConfig.fullName,
        description:
          "Agencia de autos usados y 0km en San Salvador de Jujuy con financiación, asesoramiento y atención personalizada.",
        url: siteConfig.url,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.province,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "-24.1857",
          longitude: "-65.2995",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "13:00",
          },
        ],
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.facebook,
          siteConfig.social.tiktok,
        ].filter(Boolean),
        priceRange: "$$",
        currenciesAccepted: "ARS",
        paymentAccepted: "Cash, Credit Card, Financing",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.fullName,
        image: `${siteConfig.url}/images/logo-lizzu2.png`,
        url: siteConfig.url,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.province,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.countryCode,
        },
        hasMap: `https://maps.google.com/?q=${encodeURIComponent(
          `${siteConfig.address.street}, ${siteConfig.address.city}`
        )}`,
      },
    ],
  };
}

export function buildWhatsAppUrl(message?: string): string {
  const text =
    message ??
    encodeURIComponent("Hola Lizzu, quiero consultar por un vehículo.");
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
