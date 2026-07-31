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

export type VideoSourceConfig = {
  desktopSrc: string;
  mobileSrc?: string;
  posterSrc?: string;
  desktopScrollMultiplier: number;
  mobileScrollMultiplier: number;
};

export const VIDEO_CONFIG: VideoSourceConfig = {
  desktopSrc: "/videos/scroll-video.mp4",
  mobileSrc: "/videos/scroll-video.mp4",
  posterSrc: "/videos/scroll-video-poster.webp",
  desktopScrollMultiplier: 6.0, // Expanded total scroll distance relative to viewport height for maximum smoothness
  mobileScrollMultiplier: 4.5,
};

export const scrollChapters: ScrollChapter[] = [
  {
    id: "introducao",
    eyebrow: "Introdução",
    title: "Toda transformação começa com um movimento.",
    description:
      "Uma experiência imersiva construída no encontro entre imagem, tempo e narrativa visual.",
    videoStart: 0,
    videoEnd: 0.22,
    scrollWeight: 2.2,
    slowDownWeight: 0.85, // Video decelerates significantly while text is 100% visible
    textPosition: "left",
    textWidth: "medium",
  },
  {
    id: "detalhes",
    eyebrow: "Detalhes",
    title: "Quando a atenção aumenta, o tempo desacelera.",
    description:
      "A imagem continua avançando de maneira sutil enquanto a mensagem ganha protagonismo absoluto.",
    videoStart: 0.22,
    videoEnd: 0.48,
    scrollWeight: 2.6,
    slowDownWeight: 0.90, // Ultra-slow video drift for reading emphasis
    textPosition: "right",
    textWidth: "medium",
  },
  {
    id: "experiencia",
    eyebrow: "Experiência",
    title: "Cada trecho revela uma nova perspectiva.",
    description:
      "A narrativa acompanha o movimento natural da página, sem interromper a exploração do usuário.",
    videoStart: 0.48,
    videoEnd: 0.75,
    scrollWeight: 2.4,
    slowDownWeight: 0.88,
    textPosition: "left",
    textWidth: "large",
  },
  {
    id: "encerramento",
    eyebrow: "Conclusão",
    title: "Uma história construída no ritmo de quem observa.",
    description:
      "O vídeo chega ao seu último frame com precisão impecável antes de liberar a sequência final da página.",
    videoStart: 0.75,
    videoEnd: 1.0,
    scrollWeight: 3.2, // Increased from 2.2 for ultra-smooth final deceleration
    slowDownWeight: 0.85,
    textPosition: "center",
    textWidth: "medium",
  },
];
