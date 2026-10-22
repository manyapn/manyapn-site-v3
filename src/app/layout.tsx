import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import KonamiEgg from "@/components/KonamiEgg";

const display = localFont({
  src: [
    { path: "../../public/fonts/fraunces-normal.woff2", style: "normal" },
    { path: "../../public/fonts/fraunces-italic.woff2", style: "italic" },
  ],
  weight: "300 700",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: [
    { path: "../../public/fonts/instrument-sans-normal.woff2", style: "normal" },
    { path: "../../public/fonts/instrument-sans-italic.woff2", style: "italic" },
  ],
  weight: "400 700",
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
  metadataBase: new URL("https://manyapn.com"),
  title: "manya pradeep narayan",
  description,
  openGraph: {
    type: "website",
    siteName: "manya pradeep narayan",
    title: "manya pradeep narayan",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "manya pradeep narayan",
    description: "cs + ai student at cornell. into agentic systems and software that feels personal.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${pixel.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <KonamiEgg />
      </body>
    </html>
  );
}
