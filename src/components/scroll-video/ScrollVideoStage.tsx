"use client";

import React, { forwardRef, RefObject } from "react";
import { scrollChapters } from "@/config/scroll-experience";
import { VIDEO_SOURCES } from "@/config/video-sources";
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
      className="sticky top-0 left-0 w-screen h-[100dvh] overflow-hidden bg-[#080808] z-10"
      style={{ contain: "layout paint", isolation: "isolate" }}
    >
      {/* HTML5 Video Element with direct src for robust client seeking and event binding */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        poster={VIDEO_SOURCES.poster}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transform-gpu scroll-video-stage"
        aria-hidden="true"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Fallback sources if direct src binding is resolved differently by the browser */}
        <source src={videoSrc} type={videoSrc.endsWith(".MOV") || videoSrc.endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
        <source src={VIDEO_SOURCES.original} type="video/quicktime" />
      </video>

      {/* Cinematic Legibility & Transition Overlays */}
      {/* 1. Top Header Gradient */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-36 bg-gradient-to-b from-[#080808]/70 via-transparent to-transparent pointer-events-none z-15" />

      {/* 2. Soft Ambient Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 pointer-events-none bg-[#080808]/20" />

      {/* 3. Bottom Smooth Fade Gradient Transition (for seamless unpinning into next section) */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-48 md:h-64 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none z-20" />

      {/* Chapter Text Items */}
      <div className="relative w-full h-full pointer-events-none">
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
