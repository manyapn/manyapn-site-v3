import type { Metadata } from "next";
import localFont from "next/font/local";
import { Besley, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import KonamiEgg from "@/components/KonamiEgg";
import Sunset from "@/components/Sunset";

const display = Besley({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const pixel = localFont({
  src: [{ path: "../../public/fonts/pixelify-sans-normal.woff2", style: "normal" }],
  weight: "400 700",
  variable: "--font-pixel",
  display: "swap",
});

const description =
  "cs + ai student at cornell. interested in agentic systems, human-ai interaction, and what makes software feel reliable, useful, and personal.";

export const metadata: Metadata = {
  metadataBase: new URL("https://manyapn.github.io"),
  title: { default: "manya pradeep narayan", template: "%s | manya pradeep narayan" },
  description,
  applicationName: "manya pradeep narayan",
  authors: [{ name: "Manya Pradeep Narayan", url: "https://manyapn.github.io" }],
  creator: "Manya Pradeep Narayan",
  keywords: ["Manya Pradeep Narayan", "Manya Narayan", "manyapn", "Cornell", "computer science", "AI", "agentic systems", "human-AI interaction", "Seattle"],
  // every page's canonical is its own url, so search engines index one copy of each
  alternates: { canonical: "./" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName: "manya pradeep narayan",
    title: "manya pradeep narayan",
    description,
    url: "https://manyapn.github.io",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "manya pradeep narayan",
    description: "cs + ai student at cornell. into agentic systems and software that feels personal.",
  },
  // paste the code from Google Search Console here once the site is added there
  // verification: { google: "..." },
};

/** Who this site is about, for search engines: the Person behind it and the site itself. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://manyapn.github.io/#person",
      name: "Manya Pradeep Narayan",
      alternateName: ["Manya Narayan", "Manya PN", "manyapn"],
      url: "https://manyapn.github.io",
      image: "https://manyapn.github.io/manya.jpg",
      email: "mailto:mp2343@cornell.edu",
      jobTitle: "computer science + ai student",
      affiliation: { "@type": "CollegeOrUniversity", name: "Cornell University" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Cornell University" },
      homeLocation: { "@type": "Place", name: "Seattle, Washington" },
      knowsAbout: ["agentic systems", "human-AI interaction", "software engineering", "machine learning"],
      sameAs: ["https://github.com/manyapn", "https://linkedin.com/in/manya-pn"],
    },
    {
      "@type": "WebSite",
      "@id": "https://manyapn.github.io/#website",
      url: "https://manyapn.github.io",
      name: "manya pradeep narayan",
      description,
      author: { "@id": "https://manyapn.github.io/#person" },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${pixel.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Nav />
        <main>{children}</main>
        <KonamiEgg />
        <Sunset />
      </body>
    </html>
  );
}
