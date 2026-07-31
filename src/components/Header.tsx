"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent bg-transparent ${
        isScrolled
          ? "py-4"
          : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="transition-opacity duration-300 hover:opacity-85"
        >
          <Image
            src="/logo.png"
            alt="Minimum Logo"
            width={160}
            height={60}
            priority
            className="w-[120px] md:w-[160px] h-auto object-contain brightness-0 invert"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[10px] font-mono tracking-widest text-[#f5f3ef]/80">
          <a
            href="#chapter-card-estrategia"
            onClick={(e) => handleLinkClick(e, "chapter-card-estrategia")}
            className="hover:text-accent transition-colors uppercase font-medium"
          >
            Estratégia
          </a>
          <a
            href="#chapter-card-design"
            onClick={(e) => handleLinkClick(e, "chapter-card-design")}
            className="hover:text-accent transition-colors uppercase font-medium"
          >
            Identidade
          </a>
          <a
            href="#chapter-card-presenca"
            onClick={(e) => handleLinkClick(e, "chapter-card-presenca")}
            className="hover:text-accent transition-colors uppercase font-medium"
          >
            Presença
          </a>
          <a
            href="#chapter-card-manifesto"
            onClick={(e) => handleLinkClick(e, "chapter-card-manifesto")}
            className="hover:text-accent transition-colors uppercase font-medium"
          >
            Reputação
          </a>
          <a
            href="#contato"
            onClick={(e) => handleLinkClick(e, "contato")}
            className="hover:text-accent transition-colors uppercase font-medium"
          >
            Contato
          </a>
        </nav>

        {/* WhatsApp Button */}
        <div className="flex items-center">
          <a
            href="https://wa.me/5521974959975?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20de%20design%20para%20minha%20marca!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border border-white/20 text-[#f5f3ef] hover:border-accent hover:text-[#080808] hover:bg-accent transition-all duration-300 text-[10px] font-mono tracking-widest uppercase font-medium"
          >
            Orçamento
          </a>
        </div>
      </div>
    </header>
  );
};
