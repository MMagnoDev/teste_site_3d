import { ScrollVideoExperience } from "@/components/scroll-video/ScrollVideoExperience";
import { FooterCTA } from "@/components/FooterCTA";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#080808]">
        {/* Scroll-Driven Video Viewport (Client Component with Lenis Smooth Scroll) */}
        <ScrollVideoExperience />

        {/* Normal Document Flow CTA & Footer Section */}
        <FooterCTA />
      </main>
    </SmoothScrollProvider>
  );
}
