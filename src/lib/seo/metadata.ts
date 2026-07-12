import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

function formatDocumentTitle(title: string): string {
  const brand = siteConfig.name;
  if (title.includes(brand)) {
    return title;
  }
  return `${title} | ${brand}`;
}

export function buildPageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}/og-default.png`;
  const documentTitle = formatDocumentTitle(title);

  return {
    title: documentTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/brand/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/brand/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.ico"],
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    verification: {
      google: "googlef91513d4d4cddbfe",
    },
  };
}
