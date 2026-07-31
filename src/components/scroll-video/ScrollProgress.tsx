"use client";

import React, { forwardRef } from "react";

export interface ScrollProgressProps {
  totalChapters: number;
}

export const ScrollProgress = forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ totalChapters }, ref) => {
    return (
      <aside
        ref={ref}
        aria-label="Progresso da experiência"
        className="fixed bottom-4 left-4 sm:bottom-8 sm:left-12 z-30 flex items-center space-x-4 sm:space-x-6 text-[#f5f3ef]/70 select-none pointer-events-none"
      >
        {/* Subtle Horizontal Progress Line Indicator */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 sm:w-12 h-[2px] bg-white/15 rounded-full overflow-hidden relative">
            <div
              id="progress-bar-fill"
              className="absolute inset-y-0 left-0 bg-accent w-full origin-left transform scale-x-0 transition-transform duration-100 ease-linear"
            />
          </div>
          <span
            id="chapter-counter-text"
            className="text-[10px] sm:text-xs font-mono tracking-widest text-accent/90"
          >
            01 / {String(totalChapters).padStart(2, "0")}
          </span>
        </div>
      </aside>
    );
  }
);

ScrollProgress.displayName = "ScrollProgress";
