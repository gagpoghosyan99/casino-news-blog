import type { Metadata } from "next";
import Script from "next/script";
import { Cinzel, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import LayoutShell from "@/components/LayoutShell";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-numeric",
  display: "swap",
});

export const metadata: Metadata = buildPageMetadata({
  title: "Casino Reviews & Payment Guides",
  description: siteConfig.description,
  path: "/",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = organizationSchema();
  const siteSchema = websiteSchema();

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D9E947T20R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D9E947T20R');
          `}
        </Script>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <LayoutShell>{children}</LayoutShell>
          </div>
        </Providers>
      </body>
    </html>
  );
}
