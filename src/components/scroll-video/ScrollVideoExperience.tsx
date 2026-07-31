"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { scrollChapters } from "@/config/scroll-experience";
import { VIDEO_SOURCES, VIDEO_PERFORMANCE_CONFIG } from "@/config/video-sources";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useVideoMetadata } from "@/hooks/useVideoMetadata";
import { useVideoFrameLoop } from "@/hooks/useVideoFrameLoop";
import { selectVideoSource } from "@/lib/video/select-video-source";
import { VideoSeekController } from "@/lib/video/video-seek-controller";
import { VideoDiagnostics } from "@/lib/video/video-diagnostics";
import { ScrollVideoStage } from "./ScrollVideoStage";
import { VideoLoader } from "./VideoLoader";
import { StaticExperienceFallback } from "./StaticExperienceFallback";
import { ScrollVideoDiagnostics } from "./ScrollVideoDiagnostics";

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

  // Performance controllers
  const seekControllerRef = useRef<VideoSeekController | null>(null);
  const diagnosticsRef = useRef<VideoDiagnostics>(new VideoDiagnostics());

  const [activeVideoSrc, setActiveVideoSrc] = useState<string>(VIDEO_SOURCES.desktop);
  const [totalScrollHeight, setTotalScrollHeight] = useState<string>("600vh");
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const activeChapterIndexRef = useRef<number>(0);
  const [timedOut, setTimedOut] = useState(false);

  const metadata = useVideoMetadata(videoRef);

  // Fallback if video takes longer than 4.5s to load or decode
  useEffect(() => {
    if (metadata.isLoaded || metadata.hasError) return;
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, [metadata.isLoaded, metadata.hasError]);

  // Sync ref to state to resolve React hook race conditions
  useEffect(() => {
    if (videoRef.current && videoRef.current !== videoElement) {
      setVideoElement(videoRef.current);
    }
  }, [metadata.isLoaded, videoElement]);

  // Determine initial source (desktop / mobile)
  useEffect(() => {
    const src = selectVideoSource();
    setActiveVideoSrc(src);

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const multiplier = isMobile
        ? VIDEO_PERFORMANCE_CONFIG.mobileScrollMultiplier
        : VIDEO_PERFORMANCE_CONFIG.desktopScrollMultiplier;
      setTotalScrollHeight(`${multiplier * 100}vh`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Instantiate seek controller when video element is ready
  useEffect(() => {
    if (videoRef.current) {
      seekControllerRef.current = new VideoSeekController(videoRef.current);
    }
    return () => {
      if (seekControllerRef.current) {
        seekControllerRef.current.destroy();
        seekControllerRef.current = null;
      }
    };
  }, [videoRef, metadata.isLoaded]);

  // Hook driving high-performance requestVideoFrameCallback/RAF loops
  useVideoFrameLoop({
    videoElement,
    seekControllerRef,
    diagnosticsRef,
    isLoaded: metadata.isLoaded,
    isReducedMotion,
  });

  // Single GSAP Timeline ScrollTrigger setup
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

      // Playhead target time reference (tracked by GSAP, read by loop controller)
      const playhead = { time: 0 };
      if (seekControllerRef.current) {
        seekControllerRef.current.updateTargetTime(0);
      }
      video.currentTime = 0;

      const isMobile = window.innerWidth < 768;
      const scrubValue = isMobile
        ? VIDEO_PERFORMANCE_CONFIG.mobileScrub
        : VIDEO_PERFORMANCE_CONFIG.desktopScrub;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: scrubValue, // Smooth interpolation matching Lenis
          pin: stageRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // 1. Direct DOM styling to avoid React renders
            const scrollCue = document.getElementById("scroll-cue");
            if (scrollCue) {
              scrollCue.style.opacity = self.progress > 0.03 ? "0" : "1";
            }

            const progressBar = document.getElementById("progress-bar-fill");
            if (progressBar) {
              progressBar.style.transform = `scaleX(${self.progress})`;
            }

            // 2. Resolve active chapter index and trigger state only on change
            const currentVideoTime = playhead.time;
            let currentIdx = 0;
            for (let i = 0; i < scrollChapters.length; i++) {
              const start = duration * scrollChapters[i].videoStart;
              const end = duration * scrollChapters[i].videoEnd;
              if (currentVideoTime >= start && currentVideoTime <= end) {
                currentIdx = i;
                break;
              }
            }

            if (currentIdx !== activeChapterIndexRef.current) {
              activeChapterIndexRef.current = currentIdx;

              // Update discrete text counter
              const counter = document.getElementById("chapter-counter-text");
              if (counter) {
                counter.innerText = `${String(currentIdx + 1).padStart(2, "0")} / ${String(
                  scrollChapters.length
                ).padStart(2, "0")}`;
              }
            }
          },
        },
      });

      // Build chapter animations onto timeline (transform & opacity only, NO GPU-heavy filters)
      scrollChapters.forEach((chapter, index) => {
        const textEl = chapterRefs.current[index];
        if (!textEl) return;

        const tStart = duration * chapter.videoStart;
        const tEnd = duration * chapter.videoEnd;

        const slowWeight = chapter.slowDownWeight ?? 0.85;
        const activeDuration = tEnd - tStart;

        const tFocus = tStart + activeDuration * 0.15;
        const tRelease = tStart + activeDuration * (0.15 + 0.75 * (1 - slowWeight));

        // 1. Entrance: text enters via translation & opacity, video moves to focus
        masterTl.to(
          playhead,
          {
            time: tFocus,
            duration: chapter.scrollWeight * 0.25,
            ease: "none",
            onUpdate: () => {
              if (seekControllerRef.current) {
                seekControllerRef.current.updateTargetTime(playhead.time);
              }
            },
          },
          `chapter-${index}-start`
        );

        masterTl.fromTo(
          textEl,
          { autoAlpha: 0, y: 24 }, // GPU friendly transform3d and opacity
          {
            autoAlpha: 1,
            y: 0,
            duration: chapter.scrollWeight * 0.25,
            ease: "power1.out",
          },
          `chapter-${index}-start`
        );

        // 2. Reading focus / slowdown phase: video advances micro-slowly
        masterTl.to(
          playhead,
          {
            time: tRelease,
            duration: chapter.scrollWeight * 1.2,
            ease: "sine.inOut",
            onUpdate: () => {
              if (seekControllerRef.current) {
                seekControllerRef.current.updateTargetTime(playhead.time);
              }
            },
          },
          `chapter-${index}-hold`
        );

        // 3. Exit: text leaves, video advances to end of chapter (smoothed/decelerated for the last chapter)
        const isLastChapter = index === scrollChapters.length - 1;
        masterTl.to(
          playhead,
          {
            time: tEnd,
            duration: chapter.scrollWeight * (isLastChapter ? 1.5 : 0.25),
            ease: isLastChapter ? "power1.out" : "none",
            onUpdate: () => {
              if (seekControllerRef.current) {
                seekControllerRef.current.updateTargetTime(playhead.time);
              }
            },
          },
          `chapter-${index}-exit`
        );

        if (!isLastChapter) {
          masterTl.to(
            textEl,
            {
              autoAlpha: 0,
              y: -20,
              duration: chapter.scrollWeight * 0.25,
              ease: "power1.in",
            },
            `chapter-${index}-exit`
          );
        }
      });

      ScrollTrigger.refresh();

      return () => {
        masterTl.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    {
      scope: containerRef,
      dependencies: [metadata.isLoaded, metadata.duration, isReducedMotion],
    }
  );

  // Fallback to static if reduced motion, load error, or loading timeout
  if (isReducedMotion || metadata.hasError || timedOut) {
    return (
      <StaticExperienceFallback
        videoSrc={activeVideoSrc}
        posterSrc={VIDEO_SOURCES.poster}
      />
    );
  }

  // Get current diagnostics details for dev overlay
  const getDiagnosticsData = () => {
    return diagnosticsRef.current.getDiagnostics(
      videoRef.current,
      seekControllerRef.current ? seekControllerRef.current.getTargetTime() : 0,
      seekControllerRef.current ? seekControllerRef.current.totalSeeksRequested : 0,
      seekControllerRef.current ? seekControllerRef.current.totalSeeksCompleted : 0
    );
  };

  return (
    <>
      <VideoLoader
        isLoaded={metadata.isLoaded}
        hasError={metadata.hasError}
        errorMessage={metadata.errorMessage}
      />

      {VIDEO_PERFORMANCE_CONFIG.debug && (
        <ScrollVideoDiagnostics getDiagnosticsData={getDiagnosticsData} />
      )}

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
