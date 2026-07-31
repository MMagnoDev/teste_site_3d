"use client";

import React from "react";
import { scrollChapters } from "@/config/scroll-experience";

interface StaticExperienceFallbackProps {
  videoSrc: string;
  posterSrc?: string;
}

export const StaticExperienceFallback: React.FC<StaticExperienceFallbackProps> = ({
  videoSrc,
  posterSrc,
}) => {
  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f5f3ef] px-6 py-24 md:px-16 lg:px-24">
      {/* Background Media */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <video
          src={videoSrc}
          poster={posterSrc}
          className="w-full h-full object-cover"
          muted
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto space-y-32">
        <header className="space-y-4 text-center pb-12 border-b border-white/10">
          <span className="text-xs font-mono tracking-widest text-accent uppercase">
            Modo de Acessibilidade
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[#f5f3ef]">
            Narrativa Visual Interativa
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto font-light">
            Experiência otimizada com movimento reduzido. Todo o conteúdo está disponível para navegação natural.
          </p>
        </header>

        {scrollChapters.map((chapter, index) => (
          <section
            key={chapter.id}
            id={chapter.id}
            className="space-y-4 p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
          >
            {chapter.eyebrow && (
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-accent">
                {String(index + 1).padStart(2, "0")} — {chapter.eyebrow}
              </span>
            )}
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#f5f3ef]">
              {chapter.title}
            </h2>
            {chapter.description && (
              <p className="text-base md:text-lg text-muted font-light leading-relaxed">
                {chapter.description}
              </p>
            )}
          </section>
        ))}
      </main>
    </div>
  );
};
