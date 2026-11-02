import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

// Fonte ultra-pesada dos cartazes gerados
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "O Mercado Falhou — O Estado é o Povo",
  description:
    "Manifesto por um Estado forte, contra a concentração de riqueza e a ditadura do capital financeiro.",
  openGraph: {
    title: "O Mercado Falhou — O Estado é o Povo",
    description:
      "Manifesto por um Estado forte, contra a concentração de riqueza e a ditadura do capital financeiro.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebas.variable} ${anton.variable} ${inter.variable} ${space.variable}`}
    >
      <body className="grain bg-ink text-paper antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
