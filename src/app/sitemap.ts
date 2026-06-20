import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { INVENTORY } from "@/features/catalog/data/inventory";

export default function sitemap(): MetadataRoute.Sitemap {
  const carPages: MetadataRoute.Sitemap = INVENTORY.map((car) => ({
    url: `${siteConfig.url}/catalogo/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...carPages,
  ];
}
