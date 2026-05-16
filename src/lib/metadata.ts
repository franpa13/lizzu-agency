import type { Metadata } from "next";
import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    keywords: seoConfig.keywords,
    authors: [{ name: siteConfig.fullName }],
    creator: siteConfig.fullName,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: seoConfig.openGraph.locale,
      url: siteConfig.url,
      siteName: siteConfig.fullName,
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...overrides,
  };
}
