# Scroll-Driven Video Experience (Next.js + GSAP + ScrollTrigger)

Uma landing page imersiva, cinematográfica e de alto acabamento editorial desenvolvida em **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP** e **ScrollTrigger**.

O elemento de vídeo principal preenche toda a viewport (100dvh) e seu `currentTime` é sincronizado diretamente à rolagem nativa do navegador. Conforme o usuário rola a página para baixo, o vídeo avança; ao rolar para cima, ele retrocede suavemente.

---

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router, Server Components)
- **Linguagem**: TypeScript em modo estrito (`strict: true`)
- **Estilização**: Tailwind CSS + CSS Variables (`:root`)
- **Animação & Scroll**: GSAP + ScrollTrigger + `@gsap/react`
- **Vídeo**: HTML5 `<video>` com sincronização de tempo via GSAP Timeline (`safeSeekVideo`)
- **Fontes**: `next/font/google` (`Inter` e `Playfair Display`)

---

## 📂 Estrutura de Arquivos

```
src/
├── app/
│   ├── globals.css              # Tokens do sistema de design & gradientes
│   ├── layout.tsx               # Root Layout com SEO, fontes e idioma pt-BR
│   └── page.tsx                 # Server Component principal da landing page
├── components/
│   ├── FooterCTA.tsx            # Seção final em fluxo normal pós-vídeo
│   └── scroll-video/
│       ├── ScrollChapterContent.tsx  # Overlay semântico de cada capítulo
│       ├── ScrollProgress.tsx        # Indicador discreto de progresso
│       ├── ScrollVideoExperience.tsx # Client Component com GSAP ScrollTrigger
│       ├── ScrollVideoStage.tsx      # Palco fixado 100dvh e elemento <video>
│       ├── StaticExperienceFallback.tsx # Fallback para prefers-reduced-motion
│       └── VideoLoader.tsx           # Tela de carregamento elegante
├── config/
│   └── scroll-experience.ts     # Configuração central de capítulos e vídeo
├── hooks/
│   ├── useReducedMotion.ts      # Hook de acessibilidade para movimento reduzido
│   └── useVideoMetadata.ts      # Gerenciador de eventos de metadados do vídeo
└── lib/
    ├── clamp.ts                 # Utilitário matemático de clamp
    └── scroll-video.ts          # Cálculos de tempo e busca segura de frames
public/
└── videos/
    ├── scroll-video.mp4         # Vídeo principal em MP4 H.264
    ├── video_site.MOV           # Arquivo original de vídeo fornecido
    └── scroll-video-poster.webp # Poster estático para carregamento/fallback
```

---

## 📦 Como Instalar e Iniciar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### 3. Verificar linting e tipos TypeScript
```bash
npm run lint
```

### 4. Executar build de produção
```bash
npm run build
npm run start
```

---

## 🎬 Como Funciona o Sistema de Capítulos

Toda a experiência de rolagem e narrativa é controlada no arquivo:
`src/config/scroll-experience.ts`

### Estrutura do `ScrollChapter`:

```typescript
export type ScrollChapter = {
  id: string;               // Identificador único do capítulo
  eyebrow?: string;         // Pequeno subtítulo/categoria acima do título
  title: string;            // Título principal do capítulo
  description?: string;     // Descrição detalhada
  videoStart: number;       // Percentual inicial do vídeo (0.0 a 1.0)
  videoEnd: number;         // Percentual final do vídeo (0.0 a 1.0)
  scrollWeight: number;     // Multiplicador da distância de rolagem reservada
  slowDownWeight?: number;  // Fração da rolagem em que o vídeo fica desacelerado (0.0 a 1.0)
  textPosition: "left" | "center" | "right"; // Posicionamento do bloco textual
  textWidth?: "small" | "medium" | "large";  // Largura máxima do container de texto
};
```

---

## ⚙️ Parâmetros de Ajuste Fino

### Como alterar os momentos do vídeo
Os campos `videoStart` e `videoEnd` utilizam valores normalizados de `0.0` (início do vídeo) a `1.0` (final do vídeo).
O código calcula os segundos exatos dinamicamente com base em `video.duration`:
`tempoEmSegundos = duration * chapter.videoStart`

### Como aumentar a desaceleração (Efeito Câmera Lenta)
1. **Aumente o `scrollWeight`**: Um valor maior reservará mais distância de rolagem da página para o trecho do capítulo.
2. **Aumente o `slowDownWeight`**: Valores próximos a `0.7` fazem o vídeo percorrer um intervalo minúsculo de tempo enquanto o usuário rola bastante, criando o efeito de pausa/leitura cinematográfica sem saltos abruptos.

---

## 🎥 Guia de Otimização de Vídeo

Para garantir uma reprodução suave via scroll scrubbing em qualquer dispositivo ou conexão:

1. **Codec de Vídeo**: Use **H.264 (AVC)** com perfil `Main` ou `High`.
2. **Flag FastStart**: Adicione a flag `-movflags +faststart` para permitir carregamento progressivo de metadados.
3. **Keyframe Interval (GOP)**: Defina o intervalo de keyframes curto (ex: `-g 15` ou 1 keyframe a cada 0.5 segundo). Isso torna o tempo de resposta do `video.currentTime` instantâneo.
4. **Resolução Sugerida**: 1080p (`1920x1080`) a 30fps para Desktop e 720p (`1280x720`) para Mobile.

### Comando FFmpeg Recomendado:
```bash
ffmpeg -i video_site.MOV -vcodec libx264 -crf 22 -preset slow -pix_fmt yuv420p -g 15 -an -movflags +faststart public/videos/scroll-video.mp4
```

---

## 🎨 Personalização Visual (Cores & Tipografia)

As variáveis principais do tema estão centralizadas em `src/app/globals.css`:

```css
:root {
  --background: #080808;         /* Fundo escuro predominantemente cinematográfico */
  --foreground: #f5f3ef;         /* Texto principal com alto contraste */
  --muted: rgba(245, 243, 239, 0.68); /* Texto secundário com transparência elegante */
  --accent: #d6b98c;             /* Cor de destaque dourada/champanhe */
  --overlay-strength: 0.42;      /* Intensidade da vinheta sobre o vídeo */
}
```

---

## ♿ Acessibilidade e Prefers-Reduced-Motion

O projeto inclui suporte completo ao parâmetro `prefers-reduced-motion: reduce`:
- Detecta a preferência do sistema operacional via hook `useReducedMotion()`.
- Substitui automaticamente a experiência de scroll-scrub por uma página estática limpa (`StaticExperienceFallback.tsx`).
- Mantém a hierarquia de headings HTML5 (`<header>`, `<h1>`, `<h2>`, `<p>`).
- O elemento `<video>` possui `aria-hidden="true"` e a navegação por teclado é completamente preservada.

---

## 🛡️ Licença
Desenvolvido com foco em desempenho, experiência editorial e padrões modernos de código.
