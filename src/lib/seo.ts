import { siteConfig } from "@/config/site";

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.province,
      addressCountry: siteConfig.address.countryCode,
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook].filter(
      Boolean
    ),
  };
}

export function buildWhatsAppUrl(message?: string): string {
  const text =
    message ??
    encodeURIComponent("Hola Lizzu, quiero consultar por un vehículo.");
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
