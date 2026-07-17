import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";
import CanonicalRedirect from "@/components/CanonicalRedirect";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oxford Grammar School — CBSE School in Marikal, Telangana",
    template: "%s · Oxford Grammar School",
  },
  description:
    "Oxford Grammar School, Marikal — a CBSE-affiliated school nurturing curious, confident, future-ready children. Admissions open for 2026–27.",
  keywords: ["Oxford Grammar School", "Oxford Grammar School Marikal", "CBSE school Marikal", "school in Marikal", "Marikal Telangana school", "CBSE admissions Marikal"],
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Oxford Grammar School — CBSE, Marikal",
    description: "Future-ready CBSE education in Marikal, Telangana. Admissions open 2026–27.",
    url: SITE_URL,
    siteName: "Oxford Grammar School",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Oxford Grammar School",
  alternateName: "Oxford Grammar School Marikal",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "A CBSE-affiliated school in Marikal, Telangana.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marikal",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1f3c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="grain">
        <CanonicalRedirect />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
