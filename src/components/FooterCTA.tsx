"use client";

import React from "react";

export const FooterCTA: React.FC = () => {
  return (
    <footer className="relative z-20 bg-[#080808] border-t border-white/10 text-[#f5f3ef] px-6 py-28 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono tracking-widest uppercase">
          <span>Capítulo Final</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
          Pronto para transformar sua narrativa digital?
        </h2>

        <p className="text-lg md:text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed">
          Combine a força da imagem em movimento com precisão de interatividade.
          Elevamos produtos, marcas e experiências ao próximo nível visual.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contato"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#f5f3ef] text-[#080808] font-medium text-sm hover:bg-accent transition-colors duration-300 shadow-lg shadow-white/5"
          >
            Iniciar Projeto
          </a>
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-[#f5f3ef] font-medium text-sm hover:border-accent hover:text-accent transition-colors duration-300"
          >
            Explorar Portfólio
          </a>
        </div>

        <div className="pt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-muted font-mono space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Scroll Driven Experience. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-accent transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Acessibilidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
