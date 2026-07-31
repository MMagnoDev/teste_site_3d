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
>(({ chapter }, ref) => {
  // On mobile: always bottom-center. On desktop: follow textPosition config.
  const positionClasses = {
    left:   "bottom-[14vh] left-0 right-0 px-5 text-left md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-14 lg:left-20 md:right-auto md:px-0",
    center: "bottom-[14vh] left-0 right-0 px-5 text-center md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:right-auto md:px-0",
    right:  "bottom-[14vh] left-0 right-0 px-5 text-left md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-14 lg:right-20 md:left-auto md:text-right md:px-0",
  }[chapter.textPosition];

  const widthClasses = {
    small:  "w-full md:max-w-sm",
    medium: "w-full md:max-w-lg",
    large:  "w-full md:max-w-2xl",
  }[chapter.textWidth || "medium"];

  return (
    <section
      ref={ref}
      id={`chapter-card-${chapter.id}`}
      data-chapter-id={chapter.id}
      aria-labelledby={`heading-${chapter.id}`}
      className={`absolute z-20 flex flex-col ${widthClasses} ${positionClasses} opacity-0 pointer-events-auto select-text`}
    >
      <header>
        <h2
          id={`heading-${chapter.id}`}
          className="text-[1.6rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#f5f3ef]"
        >
          {chapter.title}
        </h2>
      </header>

      {chapter.description && (
        <p className="mt-3 text-[13px] sm:text-sm md:text-base text-[#f5f3ef]/75 font-light leading-relaxed">
          {chapter.description}
        </p>
      )}
    </section>
  );
});

ScrollChapterContent.displayName = "ScrollChapterContent";
