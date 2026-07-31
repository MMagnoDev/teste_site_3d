import { Header } from "@/components/Header";
import { ScrollVideoExperience } from "@/components/scroll-video/ScrollVideoExperience";
import { FooterCTA } from "@/components/FooterCTA";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="relative w-full min-h-screen bg-[#080808] overflow-x-hidden">
        {/* Scroll-Driven Video Viewport (Client Component with Lenis Smooth Scroll) */}
        <ScrollVideoExperience />

        {/* Normal Document Flow CTA & Footer Section */}
        <FooterCTA />
      </main>
    </SmoothScrollProvider>
  );
}
