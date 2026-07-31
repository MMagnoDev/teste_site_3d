"use client";

import { useEffect, useRef } from "react";
import { VideoSeekController } from "@/lib/video/video-seek-controller";
import { VideoDiagnostics } from "@/lib/video/video-diagnostics";

interface UseVideoFrameLoopProps {
  videoElement: HTMLVideoElement | null;
  seekControllerRef: React.MutableRefObject<VideoSeekController | null>;
  diagnosticsRef: React.MutableRefObject<VideoDiagnostics>;
  isLoaded: boolean;
  isReducedMotion: boolean;
}

export function useVideoFrameLoop({
  videoElement,
  seekControllerRef,
  diagnosticsRef,
  isLoaded,
  isReducedMotion,
}: UseVideoFrameLoopProps): void {
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (isReducedMotion || !isLoaded || !videoElement) return;

    let disposed = false;

    // Use requestAnimationFrame loop to drive seeks continuously while paused
    const tick = () => {
      if (disposed) return;

      // Update FPS counter in diagnostics
      diagnosticsRef.current.updateFps();

      // Trigger seek update
      if (seekControllerRef.current) {
        seekControllerRef.current.applySeek();
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    // Start loop
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [videoElement, seekControllerRef, diagnosticsRef, isLoaded, isReducedMotion]);
}
