"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { scrollChapters, VIDEO_CONFIG } from "@/config/scroll-experience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useVideoMetadata } from "@/hooks/useVideoMetadata";
import { clamp } from "@/lib/clamp";
import { ScrollVideoStage } from "./ScrollVideoStage";
import { VideoLoader } from "./VideoLoader";
import { StaticExperienceFallback } from "./StaticExperienceFallback";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const ScrollVideoExperience: React.FC = () => {
  const isReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth lerp seeking refs
  const targetSeekRef = useRef<number>(0);
  const currentSeekRef = useRef<number>(0);

  const [activeVideoSrc, setActiveVideoSrc] = useState<string>(
    VIDEO_CONFIG.desktopSrc
  );
  const [totalScrollHeight, setTotalScrollHeight] = useState<string>("600vh");

  const metadata = useVideoMetadata(videoRef);

  // Set appropriate src & scroll height based on viewport width
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const src = isMobile
        ? VIDEO_CONFIG.mobileSrc || VIDEO_CONFIG.desktopSrc
        : VIDEO_CONFIG.desktopSrc;
      const multiplier = isMobile
        ? VIDEO_CONFIG.mobileScrollMultiplier
        : VIDEO_CONFIG.desktopScrollMultiplier;

      setActiveVideoSrc(src);
      setTotalScrollHeight(`${multiplier * 100}vh`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // High-precision RAF Lerp Loop for liquid-smooth video frame interpolation
  useEffect(() => {
    if (isReducedMotion || !metadata.isLoaded || !videoRef.current) return;

    let rafId: number;
    const video = videoRef.current;

    const lerpLoop = () => {
      if (video && video.duration) {
        const target = targetSeekRef.current;
        const current = currentSeekRef.current;

        // Velvety Lerp Factor (0.09 for ultra-smooth fluid video seeking)
        const diff = target - current;

        if (Math.abs(diff) > 0.00005) {
          const nextTime = clamp(current + diff * 0.09, 0, video.duration);
          currentSeekRef.current = nextTime;

          try {
            video.currentTime = nextTime;
          } catch {
            // Ignore seek interruptions during rapid scrolling
          }
        }
      }

      rafId = requestAnimationFrame(lerpLoop);
    };

    rafId = requestAnimationFrame(lerpLoop);
    return () => cancelAnimationFrame(rafId);
  }, [metadata.isLoaded, isReducedMotion]);

  // GSAP ScrollTrigger timeline setup
  useGSAP(
    () => {
      if (
        isReducedMotion ||
        !metadata.isLoaded ||
        !metadata.duration ||
        !videoRef.current ||
        !containerRef.current ||
        !stageRef.current
      ) {
        return;
      }

      const video = videoRef.current;
      const duration = metadata.duration;

      // Playhead object animated by GSAP
      const playhead = { time: 0 };
      targetSeekRef.current = 0;
      currentSeekRef.current = 0;
      video.currentTime = 0;

      // Create master timeline pinned to container
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Direct scrub to Lenis smooth scroll
          pin: stageRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update initial scroll cue visibility
            const scrollCue = document.getElementById("scroll-cue");
            if (scrollCue) {
              scrollCue.style.opacity = self.progress > 0.03 ? "0" : "1";
            }

            // Update progress bar scale
            const progressBar = document.getElementById("progress-bar-fill");
            if (progressBar) {
              progressBar.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // Build chapter animations onto timeline
      scrollChapters.forEach((chapter, index) => {
        const textEl = chapterRefs.current[index];
        if (!textEl) return;

        const tStart = duration * chapter.videoStart;
        const tEnd = duration * chapter.videoEnd;

        // Break time into 3 segments: Entrance -> Reading Focus (Ultra Slowdown) -> Exit
        const slowWeight = chapter.slowDownWeight ?? 0.85;
        const activeDuration = tEnd - tStart;

        // Intermediate video time targets
        const tFocus = tStart + activeDuration * 0.15;
        const tRelease = tStart + activeDuration * (0.15 + 0.75 * (1 - slowWeight));

        // 1. Entrance: Text appears smoothly, targetSeek advances to tFocus
        masterTl.to(
          playhead,
          {
            time: tFocus,
            duration: chapter.scrollWeight * 0.25,
            ease: "none",
            onUpdate: () => {
              targetSeekRef.current = playhead.time;
            },
          },
          `chapter-${index}-start`
        );

        masterTl.fromTo(
          textEl,
          { autoAlpha: 0, y: 36, filter: "blur(10px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: chapter.scrollWeight * 0.25,
            ease: "power2.out",
          },
          `chapter-${index}-start`
        );

        // 2. Reading Focus / Deceleration: Text is 100% visible, video moves in micro-drift from tFocus to tRelease
        masterTl.to(
          playhead,
          {
            time: tRelease,
            duration: chapter.scrollWeight * 1.2, // Extended scroll distance for reading focus
            ease: "sine.inOut",
            onUpdate: () => {
              targetSeekRef.current = playhead.time;
            },
          },
          `chapter-${index}-hold`
        );

        // 3. Exit: Text fades out smoothly, targetSeek advances to tEnd
        masterTl.to(
          playhead,
          {
            time: tEnd,
            duration: chapter.scrollWeight * 0.25,
            ease: "none",
            onUpdate: () => {
              targetSeekRef.current = playhead.time;
            },
          },
          `chapter-${index}-exit`
        );

        masterTl.to(
          textEl,
          {
            autoAlpha: 0,
            y: -28,
            filter: "blur(8px)",
            duration: chapter.scrollWeight * 0.25,
            ease: "power2.in",
          },
          `chapter-${index}-exit`
        );
      });

      // Ensure ScrollTrigger refreshes accurately
      ScrollTrigger.refresh();

      return () => {
        masterTl.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: containerRef, dependencies: [metadata.isLoaded, metadata.duration, isReducedMotion] }
  );

  // Reduced Motion Fallback
  if (isReducedMotion) {
    return <StaticExperienceFallback videoSrc={activeVideoSrc} posterSrc={VIDEO_CONFIG.posterSrc} />;
  }

  return (
    <>
      <VideoLoader
        isLoaded={metadata.isLoaded}
        hasError={metadata.hasError}
        errorMessage={metadata.errorMessage}
      />

      <div
        ref={containerRef}
        style={{ height: totalScrollHeight }}
        className="relative w-full bg-[#080808]"
      >
        <ScrollVideoStage
          ref={stageRef}
          videoRef={videoRef}
          chapterRefs={chapterRefs}
          progressRef={progressRef}
          videoSrc={activeVideoSrc}
        />
      </div>
    </>
  );
};
