"use client";

import React from "react";

export const FooterCTA: React.FC = () => {
  return (
    <footer id="contato" className="relative z-20 bg-[#080808] border-t border-white/10 text-[#f5f3ef] px-6 py-28 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto text-center space-y-8">


        <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
          Pronto para transformar percepção em reputação?
        </h2>

        <p className="text-lg md:text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed">
          Unimos estratégia, identidade e presença digital para construir marcas reconhecidas, confiáveis e valiosas. Vamos criar uma marca à altura do seu negócio.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5521974959975?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20de%20design%20para%20minha%20marca!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#f5f3ef] text-[#080808] font-medium text-sm hover:bg-accent hover:text-[#080808] transition-colors duration-300 shadow-lg shadow-white/5"
          >
            Solicitar proposta
          </a>
          <a
            href="https://www.instagram.com/agenciaminimum/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-[#f5f3ef] font-medium text-sm hover:border-accent hover:text-accent transition-colors duration-300"
          >
            Conhecer projetos
          </a>
        </div>

        <div className="pt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-muted font-mono space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Minimum Studio. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/agenciaminimum/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              Instagram
            </a>
            <a href="mailto:agenciaminimumdesign@gmail.com" className="hover:text-accent transition-colors">
              E-mail
            </a>
            <a href="https://wa.me/5521974959975" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
