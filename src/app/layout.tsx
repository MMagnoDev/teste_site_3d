import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minimum | Estúdio de Branding, Identidade Visual & Design de Marcas",
  description:
    "Criamos identidade visual do zero para marcas que querem se destacar com estratégia, presença e sofisticação. Design minimalista de alto padrão para negócios de destaque.",
  keywords: [
    "Design de marcas",
    "Identidade visual",
    "Branding de luxo",
    "Design minimalista",
    "Agência de design",
    "Estúdio de branding",
    "Minimum Studio",
    "Estratégia de marca",
  ],
  authors: [{ name: "Minimum Studio" }],
  openGraph: {
    title: "Minimum | Estúdio de Branding, Identidade Visual & Design de Marcas",
    description:
      "Criamos identidade visual do zero para marcas que querem se destacar com estratégia, presença e sofisticação.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#080808] text-[#f5f3ef] selection:bg-accent selection:text-[#080808]">
        {children}
      </body>
    </html>
  );
}
