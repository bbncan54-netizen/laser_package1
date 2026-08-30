import type { Metadata } from "next";
// TEMP-QA-VERIFICATION: swapped out next/font/google (sandbox blocks fonts.googleapis.com)
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { business, siteConfig } from "@/lib/business-data";
import "../styles/globals.css";

const fraunces = { variable: "" };
const inter = { variable: "" };

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s — ${business.name}`,
  },
  description: siteConfig.defaultDescription,
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: business.name,
  description: siteConfig.defaultDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address,
    addressLocality: business.city,
    addressRegion: business.province,
    addressCountry: "CA",
  },
  telephone: business.phone,
  email: business.email,
  url: siteConfig.baseUrl,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {/* Fictional demo business — structured data reflects placeholder
            values only and must be replaced with real, verified business
            information before any production use. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
