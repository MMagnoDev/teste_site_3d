import type { Metadata } from "next";
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
  title: "Experiência Digital Imersiva | Scroll-Driven Video",
  description:
    "Uma experiência landing page cinematográfica em que a narrativa e a reprodução de vídeo são integradas ao controle de rolagem do usuário.",
  keywords: [
    "Next.js",
    "GSAP",
    "ScrollTrigger",
    "Scroll Driven Video",
    "Design Cinematográfico",
    "Experiência Imersiva",
  ],
  authors: [{ name: "Front-End Senior Specialist" }],
  openGraph: {
    title: "Experiência Digital Imersiva | Scroll-Driven Video",
    description:
      "Acompanhe o movimento visual sincronizado à rolagem com acabamento editorial e fluidez de alta performance.",
    locale: "pt_BR",
    type: "website",
  },
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
