"use client";

import React from "react";

interface VideoLoaderProps {
  isLoaded: boolean;
  hasError: boolean;
  errorMessage?: string | null;
}

export const VideoLoader: React.FC<VideoLoaderProps> = ({
  isLoaded,
  hasError,
  errorMessage,
}) => {
  if (isLoaded && !hasError) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] text-[#f5f3ef] transition-opacity duration-700 ${
        isLoaded && !hasError ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
      aria-busy={!isLoaded && !hasError}
    >
      {hasError ? (
        <div className="max-w-md p-8 text-center bg-red-950/40 border border-red-800/50 rounded-2xl backdrop-blur-md">
          <p className="text-accent text-sm uppercase tracking-widest font-mono mb-2">
            Aviso de carregamento
          </p>
          <h2 className="text-xl font-medium mb-3">Vídeo indisponível</h2>
          <p className="text-sm text-[#f5f3ef]/70 mb-4">
            {errorMessage || "Não foi possível carregar a sequência de vídeo."}
          </p>
          <p className="text-xs text-[#f5f3ef]/50">
            A experiência continuará em modo estático e acessível.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-white/10 border-b-white/60 animate-spin [animation-direction:reverse]" />
          </div>
          <div className="text-center">
            <p className="text-xs font-mono tracking-widest text-accent uppercase mb-1">
              Iniciando
            </p>
            <p className="text-sm font-light tracking-wider text-[#f5f3ef]/80">
              Carregando experiência cinematográfica...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
