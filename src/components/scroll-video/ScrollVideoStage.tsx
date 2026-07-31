"use client";

import React, { forwardRef, RefObject } from "react";
import { scrollChapters, VIDEO_CONFIG } from "@/config/scroll-experience";
import { ScrollChapterContent } from "./ScrollChapterContent";
import { ScrollProgress } from "./ScrollProgress";

interface ScrollVideoStageProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  chapterRefs: RefObject<(HTMLDivElement | null)[]>;
  progressRef: RefObject<HTMLDivElement | null>;
  videoSrc: string;
}

export const ScrollVideoStage = forwardRef<
  HTMLDivElement,
  ScrollVideoStageProps
>(({ videoRef, chapterRefs, progressRef, videoSrc }, ref) => {
  return (
    <div
      ref={ref}
      className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden bg-[#080808] z-10"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        poster={VIDEO_CONFIG.posterSrc}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transform-gpu"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
        <source src="/videos/scroll-video.mp4" type="video/mp4" />
        <source src="/videos/video_site.MOV" type="video/quicktime" />
      </video>

      {/* Cinematic Legibility & Transition Overlays */}
      {/* 1. Global Base Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-80" />

      {/* 2. Top Header Gradient */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-40 bg-gradient-to-b from-[#080808]/90 via-[#080808]/40 to-transparent pointer-events-none z-15" />

      {/* 3. Soft Ambient Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#080808]/75 via-[#080808]/30 to-[#080808]/75" />

      {/* 4. Bottom Smooth Fade Gradient Transition (for seamless unpinning into next section) */}
      <div className="absolute inset-x-0 bottom-0 h-36 sm:h-52 md:h-72 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent pointer-events-none z-20" />

      {/* Chapter Text Items */}
      <div className="relative w-full h-full max-w-7xl mx-auto pointer-events-none">
        {scrollChapters.map((chapter, index) => (
          <ScrollChapterContent
            key={chapter.id}
            chapter={chapter}
            index={index}
            ref={(el) => {
              if (chapterRefs.current) {
                chapterRefs.current[index] = el;
              }
            }}
          />
        ))}
      </div>

      {/* Initial Scroll Cue */}
      <div
        id="scroll-cue"
        className="absolute bottom-16 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center space-y-2 pointer-events-none text-[#f5f3ef]/60 transition-opacity duration-500"
      >
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase">
          Role para explorar
        </span>
        <div className="w-4 h-7 sm:w-5 sm:h-8 border border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-1.5 sm:h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>

      {/* Minimal Progress Indicator */}
      <ScrollProgress
        ref={progressRef}
        totalChapters={scrollChapters.length}
      />
    </div>
  );
});

ScrollVideoStage.displayName = "ScrollVideoStage";
