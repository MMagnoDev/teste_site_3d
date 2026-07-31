"use client";

import React, { forwardRef } from "react";
import { ScrollChapter } from "@/config/scroll-experience";

interface ScrollChapterContentProps {
  chapter: ScrollChapter;
  index: number;
}

export const ScrollChapterContent = forwardRef<
  HTMLDivElement,
  ScrollChapterContentProps
>(({ chapter, index }, ref) => {
  // Mobile: bottom centered for optimal video visibility and safe area.
  // Desktop: left / center / right positioning as configured.
  const positionClasses = {
    left: "bottom-24 left-1/2 -translate-x-1/2 text-center md:text-left md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:left-16 lg:left-24 md:translate-x-0 items-center md:items-start",
    center: "bottom-24 left-1/2 -translate-x-1/2 text-center md:top-1/2 md:bottom-auto md:-translate-y-1/2 items-center",
    right: "bottom-24 left-1/2 -translate-x-1/2 text-center md:text-right md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:right-16 lg:right-24 md:left-auto md:translate-x-0 items-center md:items-end",
  }[chapter.textPosition];

  // Responsive width classes
  const widthClasses = {
    small: "max-w-[90vw] sm:max-w-md",
    medium: "max-w-[90vw] sm:max-w-lg md:max-w-xl",
    large: "max-w-[92vw] sm:max-w-xl md:max-w-3xl",
  }[chapter.textWidth || "medium"];

  return (
    <section
      ref={ref}
      id={`chapter-card-${chapter.id}`}
      data-chapter-id={chapter.id}
      aria-labelledby={`heading-${chapter.id}`}
      className={`absolute z-20 flex flex-col px-4 sm:px-6 py-4 w-full ${widthClasses} ${positionClasses} opacity-0 pointer-events-auto select-text`}
    >
      <header className="space-y-2 sm:space-y-3">
        {chapter.eyebrow && (
          <span className="inline-block text-[10px] sm:text-xs font-mono tracking-widest text-accent uppercase font-medium">
            {String(index + 1).padStart(2, "0")} — {chapter.eyebrow}
          </span>
        )}

        <h2
          id={`heading-${chapter.id}`}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#f5f3ef] leading-[1.15] sm:leading-[1.12]"
        >
          {chapter.title}
        </h2>
      </header>

      {chapter.description && (
        <p className="mt-2 sm:mt-4 text-xs sm:text-base md:text-xl text-[#f5f3ef]/80 font-light leading-relaxed">
          {chapter.description}
        </p>
      )}
    </section>
  );
});

ScrollChapterContent.displayName = "ScrollChapterContent";
