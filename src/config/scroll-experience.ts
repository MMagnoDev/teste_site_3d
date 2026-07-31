export type ScrollChapter = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  videoStart: number; // Normalized (0 - 1)
  videoEnd: number;   // Normalized (0 - 1)
  scrollWeight: number;    // Multiplier for scroll distance reserved for this chapter
  slowDownWeight?: number; // Duration of video deceleration / hold for reading (0 - 1)
  textPosition: "left" | "center" | "right";
  textWidth?: "small" | "medium" | "large";
};



export const scrollChapters: ScrollChapter[] = [
  {
    id: "estrategia",
    eyebrow: "01 — Estratégia & Posicionamento",
    title: "Uma marca forte começa antes do design.",
    description:
      "Investigamos o negócio, o mercado e a percepção que você deseja construir. A partir disso, definimos posicionamento, mensagem e direção para orientar cada escolha da marca.",
    videoStart: 0,
    videoEnd: 0.22,
    scrollWeight: 2.2,
    slowDownWeight: 0.85,
    textPosition: "left",
    textWidth: "medium",
  },
  {
    id: "design",
    eyebrow: "02 — Identidade & Sistema",
    title: "Design não é aparência. É percepção organizada.",
    description:
      "Transformamos estratégia em um sistema visual proprietário. Tipografia, cores, formas e aplicações trabalham juntas para gerar reconhecimento, coerência e valor.",
    videoStart: 0.22,
    videoEnd: 0.48,
    scrollWeight: 2.6,
    slowDownWeight: 0.90,
    textPosition: "right",
    textWidth: "medium",
  },
  {
    id: "presenca",
    eyebrow: "03 — Presença & Experiência",
    title: "A reputação da marca é construída em cada ponto de contato.",
    description:
      "Do Instagram ao site, da apresentação comercial ao atendimento, alinhamos linguagem, design e experiência para que a marca seja reconhecida e lembrada com consistência.",
    videoStart: 0.48,
    videoEnd: 0.75,
    scrollWeight: 2.4,
    slowDownWeight: 0.88,
    textPosition: "left",
    textWidth: "large",
  },
  {
    id: "manifesto",
    eyebrow: "04 — Consistência & Reputação",
    title: "Marcas fortes não impressionam uma vez. Confirmam quem são todos os dias.",
    description:
      "Criamos identidades preparadas para crescer sem perder coerência. Porque reputação não nasce de uma peça isolada, mas da repetição consistente de uma promessa bem cumprida.",
    videoStart: 0.85,
    videoEnd: 1.0,
    scrollWeight: 3.2,
    slowDownWeight: 0.85,
    textPosition: "left",
    textWidth: "medium",
  },
];
